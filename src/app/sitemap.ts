import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Flat sitemap for milestone 1 (core pages only). The programmatic exam × goal ×
// origin SEO surface is a later milestone and will switch to a chunked sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    { path: "/", priority: 1.0 },
    { path: "/which-french-test", priority: 0.9 },
    { path: "/pricing", priority: 0.7 },
    { path: "/login", priority: 0.3 },
    { path: "/signup", priority: 0.4 },
  ];
  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: r.priority,
  }));
}
