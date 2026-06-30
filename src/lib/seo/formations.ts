// Wave-2 SEO — runtime lookup for the committed, slug-sharded formation data
// (src/data/formations/*.json, produced by scripts/seo/build-formation-data.mts).
// A slug hashes to one of 16 shards, dynamically imported on demand — no DB, and
// only the needed shard is loaded per request.

export type FormationRecord = {
  slug: string;
  establishment: string;
  city: string | null;
  region: string | null;
  level: string; // L | M | D | BTS | CPGE | other
  diplomaType: string;
  title: string;
  specialism: string | null;
  discipline: string | null;
  wikidataId: string | null;
  parcoursupUrl: string | null;
};

// MUST match shardOf() in scripts/seo/build-formation-data.mts.
export function shardOf(slug: string): string {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0;
  return (Math.abs(h) % 16).toString(16);
}

type Shard = Record<string, FormationRecord>;
const cache = new Map<string, Shard>();

async function loadShard(sh: string): Promise<Shard> {
  const hit = cache.get(sh);
  if (hit) return hit;
  // Template-literal dynamic import → bundler includes all 16 shard files; each
  // is loaded lazily and cached in module scope per lambda.
  const mod = (await import(`@/data/formations/${sh}.json`)) as { default: Shard };
  cache.set(sh, mod.default);
  return mod.default;
}

export async function getFormationBySlug(slug: string): Promise<FormationRecord | null> {
  if (!slug) return null;
  const shard = await loadShard(shardOf(slug));
  return shard[slug] ?? null;
}

// All slugs (for sitemap enumeration). Loads every shard — call only in sitemap
// generation / build, never in a hot page render.
export async function allFormationSlugs(): Promise<string[]> {
  const slugs: string[] = [];
  for (let i = 0; i < 16; i++) {
    const shard = await loadShard(i.toString(16));
    slugs.push(...Object.keys(shard));
  }
  return slugs;
}
