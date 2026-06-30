// Wave-2 SEO — generate the full origin set (~196 countries) for the study-in-
// France pages. Source: ISO 3166-1 (stable static dataset). We keep sovereign
// states (drop dependent territories), flag isEEF from the verified Campus France
// «Études en France» list, and write src/data/origins.json.
//
// Run: npm run build:origins

import { writeFileSync } from "node:fs";

const ISO_URL =
  "https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/all/all.json";

// Verified EEF (Études en France mandatory) — Campus France, 2026-06-30 (72).
const EEF_ISO = new Set([
  "DZ","MA","TN","EG","AO","BJ","BF","BI","CM","CF","TD","KM","CG","CI","CD","DJ","ET","GA","GH","GN","KE","MG","ML","MR","MU","NE","NG","SN","ZA","TG",
  "BH","IR","IL","JO","KW","LB","QA","SA","AE","IN","PK","NP","KH","CN","HK","ID","JP","MY","SG","KR","TW","TH","VN",
  "AM","AZ","GE","RU","TR","UA","GB","CA","US","MX","AR","BO","BR","CL","CO","DO","EC","HT","PE",
]);

// Dependent territories / non-sovereign codes to drop (keep real origin states).
const EXCLUDE = new Set([
  "AQ","AX","AS","AI","AW","BM","BV","IO","KY","CX","CC","CK","CW","FK","FO","GF","PF","TF","GI","GL","GP","GU","GG","HM","IM","JE","MO","MQ","YT","MS","NC","NU","NF","MP","PN","PR","RE","BL","SH","MF","PM","SX","GS","SJ","TK","TC","UM","VG","VI","WF","EH","VA",
]);

// Clean display names for verbose ISO entries.
const NAME_OVERRIDE: Record<string, string> = {
  US: "United States", GB: "United Kingdom", AE: "United Arab Emirates", KR: "South Korea", KP: "North Korea",
  RU: "Russia", IR: "Iran", SY: "Syria", VE: "Venezuela", BO: "Bolivia", TZ: "Tanzania", MD: "Moldova",
  LA: "Laos", BN: "Brunei", CD: "DR Congo", CG: "Congo", CI: "Côte d'Ivoire", CV: "Cape Verde",
  TL: "Timor-Leste", MK: "North Macedonia", CZ: "Czechia", PS: "Palestine", FM: "Micronesia",
  VN: "Vietnam", TR: "Türkiye", DO: "Dominican Republic", KH: "Cambodia", SZ: "Eswatini",
  GM: "Gambia", BA: "Bosnia and Herzegovina",
};

const SLUG_OVERRIDE: Record<string, string> = {
  CI: "cote-divoire", CD: "dr-congo", TR: "turkey", VA: "vatican",
};

const slugify = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

function cleanName(iso2: string, raw: string): string {
  if (NAME_OVERRIDE[iso2]) return NAME_OVERRIDE[iso2];
  // Fallback: strip "(...)" and ", ... of" tails from verbose ISO names.
  return raw.replace(/\s*\(.*\)\s*/g, "").replace(/,.*$/, "").trim();
}

async function main() {
  const res = await fetch(ISO_URL);
  const iso = (await res.json()) as Array<{ name: string; "alpha-2": string; region: string; "sub-region": string }>;

  const origins: { slug: string; name: string; iso2: string; isEEF: boolean; region: string }[] = [];
  const seenSlug = new Set<string>();
  for (const c of iso) {
    const iso2 = c["alpha-2"];
    if (!iso2) continue;
    const keep = EEF_ISO.has(iso2) || !EXCLUDE.has(iso2);
    if (!keep) continue;
    const name = cleanName(iso2, c.name);
    const slug = SLUG_OVERRIDE[iso2] ?? slugify(name);
    if (seenSlug.has(slug)) { console.warn("dup slug", slug, iso2); continue; }
    seenSlug.add(slug);
    origins.push({ slug, name, iso2, isEEF: EEF_ISO.has(iso2), region: c["sub-region"] || c.region || "Other" });
  }
  origins.sort((a, b) => a.name.localeCompare(b.name));

  // sanity: every EEF iso2 must be present
  const present = new Set(origins.map((o) => o.iso2));
  const missingEef = [...EEF_ISO].filter((c) => !present.has(c));
  writeFileSync("src/data/origins.json", JSON.stringify(origins, null, 0));

  console.log(`origins: ${origins.length} | EEF: ${origins.filter((o) => o.isEEF).length} | non-EEF: ${origins.filter((o) => !o.isEEF).length}`);
  if (missingEef.length) console.error("MISSING EEF iso2:", missingEef.join(", "));
  else console.log("all 72 EEF present ✓");
  console.log("regions:", [...new Set(origins.map((o) => o.region))].join(" | "));
}

main().catch((e) => { console.error(e); process.exit(1); });
