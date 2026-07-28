import type { MetadataRoute } from "next";

const SITE_URL = "https://almifrench.almiworld.com";

// Private / app-only paths — blocked for ALL bots (unchanged from current).
const PRIVATE = ["/practice/", "/account", "/admin", "/api/"];

// Deep per-origin long-tail leaves: /study-in-france/<formation>/from-<origin>
// (~7M URLs). The ~35k /study-in-france/<formation> hubs and all landing/index
// pages stay crawlable; only the ×176-origin leaves are trimmed for generic bots.
const DEEP_LEAVES = ["/study-in-france/*/from-"];

// Heavy crawlers that burn Vercel invocations + edge requests with ~no SEO upside.
// robots.txt is advisory — these DO obey it; truly abusive scrapers need BotID/WAF.
// Google-Extended = Gemini/Vertex TRAINING token, NOT search — blocking it does not
// affect ranking. Trim this list if you want AI-search (ChatGPT/Perplexity) citations.
const HEAVY_BOTS = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "anthropic-ai",
  "CCBot", "Bytespider", "Amazonbot", "PerplexityBot", "Google-Extended",
  "AhrefsBot", "SemrushBot", "MJ12bot", "DotBot", "DataForSeoBot", "PetalBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Real search engines: full access to the long-tail leaves — that IS the pSEO product.
      // DEEP_LEAVES applies to Googlebot and Bingbot TOO. Leaving them out is the same
      // hole that cost danish/icelandic/dutch $124 in ISR writes in the 2026-07 cycle:
      // `*` was closed to the leaf space while the two crawlers most able to walk it
      // kept `allow: "/"`. It is LATENT here rather than active — french's routes are
      // not an on-demand page factory, which is why french billed $0.00 while its
      // siblings did not — but it is one route change away from mattering.
      //
      // Found by AlmiMonitor's crawl-guard check on its first live run (2026-07-28),
      // which compares the robots groups to each other precisely so this asymmetry
      // cannot hide.
      { userAgent: ["Googlebot", "Bingbot"], allow: "/", disallow: [...PRIVATE, ...DEEP_LEAVES] },
      // Everyone else: landing + hubs only, skip the per-origin leaves, gentle pace.
      { userAgent: "*", allow: "/", disallow: [...PRIVATE, ...DEEP_LEAVES], crawlDelay: 10 },
      // Heavy, no-SEO-value crawlers: off entirely.
      { userAgent: HEAVY_BOTS, disallow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap-index.xml`,
  };
}
