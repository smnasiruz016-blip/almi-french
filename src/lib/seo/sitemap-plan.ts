// Single source of truth for the chunked-sitemap plan, shared by the sitemap
// chunk route (app/sitemap.ts) and the sitemap index route
// (app/sitemap-index.xml/route.ts) so the two can never drift.
//
// The programmatic /study-in-france/* pages were removed (they now answer 410
// Gone from src/proxy.ts), so the sitemap lists the core pages only.

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const CORE: { path: string; priority: number }[] = [
  { path: "/", priority: 1.0 },
  { path: "/which-french-test", priority: 0.9 },
  { path: "/french-level-for-citizenship-2026", priority: 0.8 },
  { path: "/pricing", priority: 0.7 },
  { path: "/signup", priority: 0.4 },
  { path: "/login", priority: 0.3 },
];

export const CHUNK = 50_000;
export const TOTAL = CORE.length;
export const CHUNKS = Math.ceil(TOTAL / CHUNK);

type Entry = MetadataRoute.Sitemap[number];

export function entryForIndex(i: number): Entry {
  return { url: `${SITE_URL}${CORE[i].path}`, changeFrequency: "weekly", priority: CORE[i].priority };
}
