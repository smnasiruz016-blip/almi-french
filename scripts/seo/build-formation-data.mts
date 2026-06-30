// Wave-2 SEO — turn the raw deduped formation set (data/formations.json, produced
// by ingest-formations.mts) into the committed, deployable data layer the page
// routes consume: unique URL slugs + 16 slug-sharded JSON files under
// src/data/formations/ (each an object keyed by slug). The page hashes a slug to
// its shard and dynamic-imports just that shard.
//
// Run AFTER ingest:  npm run ingest:formations && npm run build:formation-data

import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";

type Raw = {
  uai: string;
  establishment: string;
  wikidataId: string | null;
  level: string;
  diplomaType: string;
  title: string;
  specialism: string | null;
  discipline: string | null;
  region: string | null;
  department: string | null;
  city: string | null;
  parcoursupUrl: string | null;
  sources: string[];
};

export type FormationRecord = Raw & { slug: string };

const stripAccents = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");
const slugify = (s: string) =>
  stripAccents((s ?? "").toString().toLowerCase())
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

// Deterministic slug → shard ('0'..'f'). MUST match src/lib/seo/formations.ts.
export function shardOf(slug: string): string {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0;
  return (Math.abs(h) % 16).toString(16);
}

function main() {
  const raw: Raw[] = JSON.parse(readFileSync("data/formations.json", "utf8"));
  console.log("loaded", raw.length, "formations");

  // Build a descriptive, unique slug: <title>-<establishment>, disambiguated.
  const used = new Map<string, number>();
  const records: FormationRecord[] = [];
  for (const r of raw) {
    let base = slugify(`${r.title}-${r.establishment}`);
    // keep slugs reasonable; trim trailing fragments past ~90 chars on a boundary
    if (base.length > 90) base = base.slice(0, 90).replace(/-[^-]*$/, "");
    const n = used.get(base) ?? 0;
    used.set(base, n + 1);
    const slug = n === 0 ? base : `${base}-${n + 1}`;
    records.push({ ...r, slug });
  }

  // Shard — store only the fields the pages render (drop uai/department/sources).
  const trim = (r: FormationRecord) => ({
    slug: r.slug,
    establishment: r.establishment,
    city: r.city,
    region: r.region,
    level: r.level,
    diplomaType: r.diplomaType,
    title: r.title,
    specialism: r.specialism,
    discipline: r.discipline,
    wikidataId: r.wikidataId,
    parcoursupUrl: r.parcoursupUrl,
  });
  const shards: Record<string, Record<string, ReturnType<typeof trim>>> = {};
  for (let i = 0; i < 16; i++) shards[i.toString(16)] = {};
  for (const rec of records) shards[shardOf(rec.slug)][rec.slug] = trim(rec);

  const dir = "src/data/formations";
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  let total = 0;
  const sizes: Record<string, number> = {};
  for (const [sh, obj] of Object.entries(shards)) {
    const json = JSON.stringify(obj);
    writeFileSync(`${dir}/${sh}.json`, json);
    sizes[sh] = Object.keys(obj).length;
    total += Object.keys(obj).length;
  }
  writeFileSync(
    `${dir}/_manifest.json`,
    JSON.stringify({ count: total, shards: 16, generatedFrom: "MESR open data (Licence Ouverte v2.0)", perShard: sizes }, null, 2),
  );
  // Lightweight ordered slug manifest for sitemap enumeration (avoids loading
  // the full shards). Order is stable = the deduped ingest order.
  writeFileSync("src/data/formation-slugs.json", JSON.stringify(records.map((r) => r.slug)));
  console.log("wrote", total, "records across 16 shards →", dir);
  console.log("wrote src/data/formation-slugs.json");
  console.log("per-shard:", JSON.stringify(sizes));
}

main();
