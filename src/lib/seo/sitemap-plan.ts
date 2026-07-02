// Single source of truth for the chunked-sitemap plan, shared by the sitemap
// chunk route (app/sitemap.ts) and the sitemap index route
// (app/sitemap-index.xml/route.ts) so the two can never drift.

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { INDEXABLE_ORIGINS } from "./origins";
import slugsData from "@/data/formation-slugs.json";

export const slugs = slugsData as string[];

export const CORE: { path: string; priority: number }[] = [
  { path: "/", priority: 1.0 },
  { path: "/which-french-test", priority: 0.9 },
  { path: "/french-level-for-citizenship-2026", priority: 0.8 },
  { path: "/pricing", priority: 0.7 },
  { path: "/signup", priority: 0.4 },
  { path: "/login", priority: 0.3 },
];

export const CHUNK = 50_000;
export const HUBS = slugs.length; // 35,757
export const ORIGINS = INDEXABLE_ORIGINS.length; // ~176 (197 − micro-states)
export const TOTAL = CORE.length + HUBS + HUBS * ORIGINS;
export const CHUNKS = Math.ceil(TOTAL / CHUNK);

type Entry = MetadataRoute.Sitemap[number];

// Map a global index to its sitemap entry (no need to materialize all URLs).
export function entryForIndex(i: number): Entry {
  if (i < CORE.length) {
    return { url: `${SITE_URL}${CORE[i].path}`, changeFrequency: "weekly", priority: CORE[i].priority };
  }
  if (i < CORE.length + HUBS) {
    const fi = i - CORE.length;
    return { url: `${SITE_URL}/study-in-france/${slugs[fi]}`, changeFrequency: "monthly", priority: 0.6 };
  }
  const off = i - CORE.length - HUBS;
  const fi = Math.floor(off / ORIGINS);
  const oi = off % ORIGINS;
  return {
    url: `${SITE_URL}/study-in-france/${slugs[fi]}/from-${INDEXABLE_ORIGINS[oi].slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  };
}
