// Wave-2 SEO — formation ingest + merge + dedup pipeline.
//
// Pulls the current-year records from three MESR open datasets (Licence Ouverte
// v2.0 / Etalab — commercial reuse with attribution), normalizes them to one
// Formation shape, and merges them on (UAI + level + normalized programme title)
// — the "merged programme grain": one page per establishment × programme, with
// parcours / sub-specialties collapsed into the richest record.
//
// It writes data/formations.json (gitignored, regenerable) and prints the EXACT
// deduped count + breakdown. No DB, no prod impact. Run: npm run ingest:formations
//
// Attribution to carry on every built page:
//   "Données : MESR / data.gouv.fr — Licence Ouverte v2.0 (Etalab)"

import { writeFileSync, mkdirSync } from "node:fs";

const API = "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets";

type Formation = {
  key: string; // dedup key: uai::level::slug(title)
  uai: string;
  establishment: string;
  wikidataId: string | null;
  level: string; // L | M | D | BTS | CPGE | other
  diplomaType: string; // Licence, Master, BUT, BTS, Doctorat, ...
  title: string; // programme intitulé / mention / formation label
  specialism: string | null; // intitule_2 / parcours (detail, not part of the key)
  discipline: string | null;
  region: string | null;
  department: string | null;
  city: string | null;
  parcoursupUrl: string | null;
  sources: string[]; // which datasets contributed
};

const stripAccents = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "");
const slug = (s: string) =>
  stripAccents((s ?? "").toString().toLowerCase())
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
const first = (v: unknown): string =>
  Array.isArray(v) ? String(v[0] ?? "") : v == null ? "" : String(v);
const nn = (s: string): string | null => (s && s.trim() ? s.trim() : null);

async function fetchDataset(
  id: string,
  select: string,
  where?: string,
): Promise<Record<string, unknown>[]> {
  const p = new URLSearchParams({ select });
  if (where) p.set("where", where);
  const url = `${API}/${id}/exports/json?${p.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${id}: HTTP ${res.status}`);
  const rows = (await res.json()) as Record<string, unknown>[];
  console.log(`  fetched ${id}: ${rows.length} rows`);
  return rows;
}

// principaux-diplomes (universities' L/M/D + BUT) ---------------------------
function fromDiplomes(r: Record<string, unknown>): Formation | null {
  const uai = first(r.etablissement_id_uai);
  const title = first(r.libelle_intitule_1);
  if (!uai || !title) return null;
  const lmd = first(r.cursus_lmd).toUpperCase(); // L | M | D
  const level = ["L", "M", "D"].includes(lmd) ? lmd : "other";
  const loc = first(r.etablissement_localisation).split(">").map((x) => x.trim());
  return {
    key: `${uai}::${level}::${slug(title)}`,
    uai,
    establishment: first(r.etablissement_lib),
    wikidataId: nn(first(r.etablissement_id_wikidata)),
    level,
    diplomaType: first(r.diplome_lib) || first(r.diplome),
    title,
    specialism: nn(first(r.libelle_intitule_2)),
    discipline: nn(first(r.gd_disciscipline_lib)) ?? nn(first(r.disciplines_selection)),
    region: nn(loc[0] ?? ""),
    department: null,
    city: nn(loc[loc.length - 1] ?? ""),
    parcoursupUrl: null,
    sources: ["principaux-diplomes"],
  };
}

// Parcoursup cartographie (post-bac: BTS, CPGE, BUT, Licence, private) ------
function parcoursupLevel(tf: string, fl: string): { level: string; type: string } {
  const s = `${tf} ${fl}`.toLowerCase();
  if (s.includes("bts")) return { level: "BTS", type: "BTS" };
  if (s.includes("but")) return { level: "L", type: "BUT" };
  if (s.includes("cpge") || s.includes("classe pr")) return { level: "CPGE", type: "CPGE" };
  if (s.includes("licence pro")) return { level: "L", type: "Licence professionnelle" };
  if (s.includes("licence")) return { level: "L", type: "Licence" };
  if (s.includes("master")) return { level: "M", type: "Master" };
  if (s.includes("deust")) return { level: "L", type: "DEUST" };
  if (s.includes("made")) return { level: "L", type: "DN MADE" };
  return { level: "other", type: nn(tf) ?? "Formation" };
}
function fromParcoursup(r: Record<string, unknown>): Formation | null {
  const uai = first(r.etab_uai);
  const fl = first(r.fl);
  const nm = first(r.nm);
  const title = fl || nm;
  if (!uai || !title) return null;
  const { level, type } = parcoursupLevel(first(r.tf), fl);
  return {
    key: `${uai}::${level}::${slug(title)}`,
    uai,
    establishment: first(r.etab_nom),
    wikidataId: null,
    level,
    diplomaType: type,
    title,
    specialism: nn(nm) && nm !== fl ? nm : null,
    discipline: null,
    region: nn(first(r.region)),
    department: nn(first(r.departement)),
    city: nn(first(r.commune)),
    parcoursupUrl: nn(first(r.fiche)),
    sources: ["parcoursup"],
  };
}

// MonMaster (master's mentions) --------------------------------------------
function fromMonMaster(r: Record<string, unknown>): Formation | null {
  const uai = first(r.eta_uai);
  const title = first(r.mention);
  if (!uai || !title) return null;
  const lieu = first(r.lieux).split("|")[0] ?? "";
  const cityMatch = lieu.match(/-\s*([A-ZÀ-Ÿ' -]+)\s*\(\d/);
  return {
    key: `${uai}::M::${slug(title)}`,
    uai,
    establishment: first(r.eta_nom),
    wikidataId: null,
    level: "M",
    diplomaType: "Master",
    title,
    specialism: nn(first(r.parcours)),
    discipline: null,
    region: nn(first(r.acad_reg_lib)),
    department: null,
    city: cityMatch ? cityMatch[1].trim() : null,
    parcoursupUrl: null,
    sources: ["monmaster"],
  };
}

// Merge a new record into the map (richest wins; union sources) -------------
function score(f: Formation): number {
  return (
    (f.wikidataId ? 2 : 0) +
    (f.parcoursupUrl ? 2 : 0) +
    (f.discipline ? 1 : 0) +
    (f.specialism ? 1 : 0) +
    (f.city ? 1 : 0) +
    (f.region ? 1 : 0)
  );
}
function merge(into: Map<string, Formation>, f: Formation) {
  const cur = into.get(f.key);
  if (!cur) {
    into.set(f.key, f);
    return;
  }
  // keep the richer record's scalar fields, but always union sources +
  // backfill the high-value fields from whichever source has them.
  const winner = score(f) > score(cur) ? f : cur;
  const other = winner === f ? cur : f;
  winner.wikidataId ??= other.wikidataId;
  winner.parcoursupUrl ??= other.parcoursupUrl;
  winner.discipline ??= other.discipline;
  winner.specialism ??= other.specialism;
  winner.city ??= other.city;
  winner.region ??= other.region;
  winner.department ??= other.department;
  winner.sources = Array.from(new Set([...cur.sources, ...f.sources]));
  into.set(f.key, winner);
}

async function main() {
  console.log("Fetching current-year records from MESR open data…");
  const [dip, pcs, mm] = await Promise.all([
    fetchDataset(
      "fr-esr-principaux-diplomes-et-formations-prepares-etablissements-publics",
      "etablissement_id_uai,etablissement_lib,etablissement_id_wikidata,etablissement_localisation,cursus_lmd,diplome,diplome_lib,libelle_intitule_1,libelle_intitule_2,disciplines_selection,gd_disciscipline_lib",
      `annee_universitaire="2024-25"`,
    ),
    fetchDataset(
      "fr-esr-cartographie_formations_parcoursup",
      "etab_uai,etab_nom,tc,tf,fl,nm,region,departement,commune,fiche",
      `annee="2026"`,
    ),
    fetchDataset("fr-esr-mon_master", "eta_uai,eta_nom,mention,parcours,acad_reg_lib,lieux,alternance,modalite_enseignement"),
  ]);

  const map = new Map<string, Formation>();
  let raw = 0;
  for (const r of dip) { const f = fromDiplomes(r); if (f) { merge(map, f); raw++; } }
  for (const r of pcs) { const f = fromParcoursup(r); if (f) { merge(map, f); raw++; } }
  for (const r of mm) { const f = fromMonMaster(r); if (f) { merge(map, f); raw++; } }

  const all = [...map.values()];
  // breakdowns
  const byLevel: Record<string, number> = {};
  const bySourceSet: Record<string, number> = {};
  const estabs = new Set<string>();
  let merged = 0, withWiki = 0, withPcs = 0;
  for (const f of all) {
    byLevel[f.level] = (byLevel[f.level] ?? 0) + 1;
    const ss = f.sources.slice().sort().join("+");
    bySourceSet[ss] = (bySourceSet[ss] ?? 0) + 1;
    estabs.add(f.uai);
    if (f.sources.length > 1) merged++;
    if (f.wikidataId) withWiki++;
    if (f.parcoursupUrl) withPcs++;
  }

  mkdirSync("data", { recursive: true });
  writeFileSync("data/formations.json", JSON.stringify(all));

  const N = all.length;
  console.log("\n================ EXACT DEDUPED FORMATION COUNT ================");
  console.log(`raw normalized records        : ${raw}`);
  console.log(`UNIQUE FORMATIONS (merged grain): ${N}`);
  console.log(`distinct establishments (UAI)  : ${estabs.size}`);
  console.log(`cross-source merged formations : ${merged}`);
  console.log(`with Wikidata id               : ${withWiki}`);
  console.log(`with Parcoursup link           : ${withPcs}`);
  console.log("by level:", JSON.stringify(byLevel));
  console.log("by source set:", JSON.stringify(bySourceSet));
  console.log(`\n× 196 origins = ${(N * 196).toLocaleString("en-US")} pages`);
  console.log("wrote data/formations.json");
}

main().catch((e) => { console.error(e); process.exit(1); });
