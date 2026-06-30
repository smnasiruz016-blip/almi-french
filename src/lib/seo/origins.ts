// Wave-2 SEO — origin countries for the "study in France from [origin]" layer.
//
// REAL-DATA GATE: the indexable origin tier is the set of countries where the
// "Études en France" (EEF / Campus France) procedure is MANDATORY — that is a
// genuine, official per-origin difference (these applicants must go through the
// online Campus France procedure before a visa), not a country-name swap.
//
// Source (verified 2026-06-30): Campus France, "Which countries are affected by
// the Études en France procedure?"
// https://www.campusfrance.org/en/faq/which-countries-are-affected-by-the-etudes-en-france-studying-in-france-procedure
// NOTE: the page states "73 countries" but its enumerated list contains 72 distinct
// countries (a source count/list discrepancy). We encode exactly the 72 named
// countries — we do NOT invent a 73rd to match the stated count.
//
// Origins NOT in this list apply directly to the institution (no EEF procedure).
// They are intentionally treated as the non-indexable tier (real-data-or-noindex):
// their page would differ only by country name, so it is noindex by default.

export type OriginRegion =
  | "Maghreb & North Africa"
  | "Sub-Saharan Africa"
  | "Middle East & Gulf"
  | "South Asia"
  | "East & Southeast Asia"
  | "Europe & Caucasus"
  | "North America"
  | "Latin America & Caribbean";

export type Origin = {
  slug: string;
  name: string;
  iso2: string;
  /** EEF (Études en France) procedure is mandatory for this nationality. */
  eef: boolean;
  region: OriginRegion;
};

// The 73 EEF countries (procedure mandatory) — the indexable origin tier.
export const EEF_ORIGINS: Origin[] = [
  { slug: "algeria", name: "Algeria", iso2: "DZ", eef: true, region: "Maghreb & North Africa" },
  { slug: "morocco", name: "Morocco", iso2: "MA", eef: true, region: "Maghreb & North Africa" },
  { slug: "tunisia", name: "Tunisia", iso2: "TN", eef: true, region: "Maghreb & North Africa" },
  { slug: "egypt", name: "Egypt", iso2: "EG", eef: true, region: "Maghreb & North Africa" },
  { slug: "angola", name: "Angola", iso2: "AO", eef: true, region: "Sub-Saharan Africa" },
  { slug: "benin", name: "Benin", iso2: "BJ", eef: true, region: "Sub-Saharan Africa" },
  { slug: "burkina-faso", name: "Burkina Faso", iso2: "BF", eef: true, region: "Sub-Saharan Africa" },
  { slug: "burundi", name: "Burundi", iso2: "BI", eef: true, region: "Sub-Saharan Africa" },
  { slug: "cameroon", name: "Cameroon", iso2: "CM", eef: true, region: "Sub-Saharan Africa" },
  { slug: "central-african-republic", name: "Central African Republic", iso2: "CF", eef: true, region: "Sub-Saharan Africa" },
  { slug: "chad", name: "Chad", iso2: "TD", eef: true, region: "Sub-Saharan Africa" },
  { slug: "comoros", name: "Comoros", iso2: "KM", eef: true, region: "Sub-Saharan Africa" },
  { slug: "congo", name: "Congo", iso2: "CG", eef: true, region: "Sub-Saharan Africa" },
  { slug: "cote-divoire", name: "Côte d'Ivoire", iso2: "CI", eef: true, region: "Sub-Saharan Africa" },
  { slug: "dr-congo", name: "Democratic Republic of the Congo", iso2: "CD", eef: true, region: "Sub-Saharan Africa" },
  { slug: "djibouti", name: "Djibouti", iso2: "DJ", eef: true, region: "Sub-Saharan Africa" },
  { slug: "ethiopia", name: "Ethiopia", iso2: "ET", eef: true, region: "Sub-Saharan Africa" },
  { slug: "gabon", name: "Gabon", iso2: "GA", eef: true, region: "Sub-Saharan Africa" },
  { slug: "ghana", name: "Ghana", iso2: "GH", eef: true, region: "Sub-Saharan Africa" },
  { slug: "guinea", name: "Guinea", iso2: "GN", eef: true, region: "Sub-Saharan Africa" },
  { slug: "kenya", name: "Kenya", iso2: "KE", eef: true, region: "Sub-Saharan Africa" },
  { slug: "madagascar", name: "Madagascar", iso2: "MG", eef: true, region: "Sub-Saharan Africa" },
  { slug: "mali", name: "Mali", iso2: "ML", eef: true, region: "Sub-Saharan Africa" },
  { slug: "mauritania", name: "Mauritania", iso2: "MR", eef: true, region: "Sub-Saharan Africa" },
  { slug: "mauritius", name: "Mauritius", iso2: "MU", eef: true, region: "Sub-Saharan Africa" },
  { slug: "niger", name: "Niger", iso2: "NE", eef: true, region: "Sub-Saharan Africa" },
  { slug: "nigeria", name: "Nigeria", iso2: "NG", eef: true, region: "Sub-Saharan Africa" },
  { slug: "senegal", name: "Senegal", iso2: "SN", eef: true, region: "Sub-Saharan Africa" },
  { slug: "south-africa", name: "South Africa", iso2: "ZA", eef: true, region: "Sub-Saharan Africa" },
  { slug: "togo", name: "Togo", iso2: "TG", eef: true, region: "Sub-Saharan Africa" },
  { slug: "bahrain", name: "Bahrain", iso2: "BH", eef: true, region: "Middle East & Gulf" },
  { slug: "iran", name: "Iran", iso2: "IR", eef: true, region: "Middle East & Gulf" },
  { slug: "israel", name: "Israel", iso2: "IL", eef: true, region: "Middle East & Gulf" },
  { slug: "jordan", name: "Jordan", iso2: "JO", eef: true, region: "Middle East & Gulf" },
  { slug: "kuwait", name: "Kuwait", iso2: "KW", eef: true, region: "Middle East & Gulf" },
  { slug: "lebanon", name: "Lebanon", iso2: "LB", eef: true, region: "Middle East & Gulf" },
  { slug: "qatar", name: "Qatar", iso2: "QA", eef: true, region: "Middle East & Gulf" },
  { slug: "saudi-arabia", name: "Saudi Arabia", iso2: "SA", eef: true, region: "Middle East & Gulf" },
  { slug: "united-arab-emirates", name: "United Arab Emirates", iso2: "AE", eef: true, region: "Middle East & Gulf" },
  { slug: "india", name: "India", iso2: "IN", eef: true, region: "South Asia" },
  { slug: "pakistan", name: "Pakistan", iso2: "PK", eef: true, region: "South Asia" },
  { slug: "nepal", name: "Nepal", iso2: "NP", eef: true, region: "South Asia" },
  { slug: "cambodia", name: "Cambodia", iso2: "KH", eef: true, region: "East & Southeast Asia" },
  { slug: "china", name: "China", iso2: "CN", eef: true, region: "East & Southeast Asia" },
  { slug: "hong-kong", name: "Hong Kong", iso2: "HK", eef: true, region: "East & Southeast Asia" },
  { slug: "indonesia", name: "Indonesia", iso2: "ID", eef: true, region: "East & Southeast Asia" },
  { slug: "japan", name: "Japan", iso2: "JP", eef: true, region: "East & Southeast Asia" },
  { slug: "malaysia", name: "Malaysia", iso2: "MY", eef: true, region: "East & Southeast Asia" },
  { slug: "singapore", name: "Singapore", iso2: "SG", eef: true, region: "East & Southeast Asia" },
  { slug: "south-korea", name: "South Korea", iso2: "KR", eef: true, region: "East & Southeast Asia" },
  { slug: "taiwan", name: "Taiwan", iso2: "TW", eef: true, region: "East & Southeast Asia" },
  { slug: "thailand", name: "Thailand", iso2: "TH", eef: true, region: "East & Southeast Asia" },
  { slug: "vietnam", name: "Vietnam", iso2: "VN", eef: true, region: "East & Southeast Asia" },
  { slug: "armenia", name: "Armenia", iso2: "AM", eef: true, region: "Europe & Caucasus" },
  { slug: "azerbaijan", name: "Azerbaijan", iso2: "AZ", eef: true, region: "Europe & Caucasus" },
  { slug: "georgia", name: "Georgia", iso2: "GE", eef: true, region: "Europe & Caucasus" },
  { slug: "russia", name: "Russia", iso2: "RU", eef: true, region: "Europe & Caucasus" },
  { slug: "turkey", name: "Turkey", iso2: "TR", eef: true, region: "Europe & Caucasus" },
  { slug: "ukraine", name: "Ukraine", iso2: "UA", eef: true, region: "Europe & Caucasus" },
  { slug: "united-kingdom", name: "United Kingdom", iso2: "GB", eef: true, region: "Europe & Caucasus" },
  { slug: "canada", name: "Canada", iso2: "CA", eef: true, region: "North America" },
  { slug: "united-states", name: "United States", iso2: "US", eef: true, region: "North America" },
  { slug: "mexico", name: "Mexico", iso2: "MX", eef: true, region: "Latin America & Caribbean" },
  { slug: "argentina", name: "Argentina", iso2: "AR", eef: true, region: "Latin America & Caribbean" },
  { slug: "bolivia", name: "Bolivia", iso2: "BO", eef: true, region: "Latin America & Caribbean" },
  { slug: "brazil", name: "Brazil", iso2: "BR", eef: true, region: "Latin America & Caribbean" },
  { slug: "chile", name: "Chile", iso2: "CL", eef: true, region: "Latin America & Caribbean" },
  { slug: "colombia", name: "Colombia", iso2: "CO", eef: true, region: "Latin America & Caribbean" },
  { slug: "dominican-republic", name: "Dominican Republic", iso2: "DO", eef: true, region: "Latin America & Caribbean" },
  { slug: "ecuador", name: "Ecuador", iso2: "EC", eef: true, region: "Latin America & Caribbean" },
  { slug: "haiti", name: "Haiti", iso2: "HT", eef: true, region: "Latin America & Caribbean" },
  { slug: "peru", name: "Peru", iso2: "PE", eef: true, region: "Latin America & Caribbean" },
];

const BY_SLUG = new Map(EEF_ORIGINS.map((o) => [o.slug, o]));

export function findOrigin(slug: string): Origin | undefined {
  return BY_SLUG.get(slug);
}

/** Only EEF origins carry a real, differentiated procedure → indexable. */
export function isIndexableOrigin(slug: string): boolean {
  return BY_SLUG.has(slug);
}

export const EEF_COUNT = EEF_ORIGINS.length; // 72 (see source note above)
