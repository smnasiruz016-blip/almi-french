// Chunked sitemap (root) — core pages + the study-in-france surface.
// generateSitemaps() yields one chunk per 50,000 URLs; chunks are served at
// /sitemap/[id].xml. The index is served by app/sitemap-index.xml/route.ts
// (Next 16 does not auto-serve an index at /sitemap.xml). Ordering + math live in
// @/lib/seo/sitemap-plan so the chunks and the index can never drift.

import type { MetadataRoute } from "next";
import { CHUNK, CHUNKS, TOTAL, entryForIndex } from "@/lib/seo/sitemap-plan";

export const revalidate = 86_400; // 1 day

export async function generateSitemaps() {
  return Array.from({ length: CHUNKS }, (_, id) => ({ id }));
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  // Next 16 passes `id` as a Promise resolving to the chunk's string id (e.g.
  // "0"); await + Number normalizes it for both the type and the runtime.
  const n = Number(await id);
  const start = n * CHUNK;
  const end = Math.min(TOTAL, start + CHUNK);
  const out: MetadataRoute.Sitemap = [];
  for (let i = start; i < end; i++) out.push(entryForIndex(i));
  return out;
}
