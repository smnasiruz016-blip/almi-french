// Wave-2 SEO — shared copy + helpers for the "study in France" formation pages.
// AMAANAT: we never invent a per-formation French level. The French requirement
// is France-wide (Campus France / «Études en France» / DAP), so we state the real
// rule and defer specifics to the establishment + Campus France.

import type { FormationRecord } from "./formations";

export const DATA_ATTRIBUTION =
  "Données : MESR / data.gouv.fr — Licence Ouverte v2.0 (Etalab).";

export const ADMISSION_NOT_VISA =
  "Admission or registration is not a visa — confirm current rules with the establishment, Campus France, and the French authority.";

// Readable label for the LMD / formation level stored on each record.
export function levelLabel(level: string): string {
  switch (level) {
    case "L": return "Undergraduate (Licence / BUT — LMD level L)";
    case "M": return "Master's (LMD level M)";
    case "D": return "Doctorate (LMD level D)";
    case "BTS": return "BTS (two-year vocational)";
    case "CPGE": return "CPGE (preparatory class)";
    default: return "Higher-education programme";
  }
}

// Short cycle word for sentences.
function cycleWord(level: string): string {
  if (level === "M") return "master's";
  if (level === "D") return "doctoral";
  if (level === "BTS") return "BTS";
  if (level === "CPGE") return "preparatory-class";
  return "undergraduate";
}

// The REAL, France-wide French-language requirement — no fabricated per-course
// level. Cycle-aware wording, always deferring the exact level to the institution.
export function frenchRequirement(level: string): string {
  const cycle = cycleWord(level);
  const undergradNote =
    level === "L" || level === "BTS" || level === "CPGE"
      ? " For first-year undergraduate (Licence) study, the level commonly sits around B2, set through the DAP / «Études en France» procedure."
      : "";
  return (
    `French-taught programmes in France require proof of French for non-francophone applicants. ` +
    `This is set France-wide through the Campus France / «Études en France» procedure — not course by course.` +
    undergradNote +
    ` The exact level for this ${cycle} programme is decided by the establishment; accepted proof includes the TCF or TEF, or a DELF / DALF diploma. ` +
    `Confirm the requirement with the establishment and Campus France before you apply.`
  );
}

// Page H1 + descriptive lead.
export function formationHeading(f: FormationRecord): string {
  return f.specialism && f.specialism !== f.title
    ? `${f.title} — ${f.specialism}`
    : f.title;
}

export function locationLine(f: FormationRecord): string | null {
  const parts = [f.city, f.region].filter(Boolean);
  return parts.length ? parts.join(", ") : null;
}

// Course JSON-LD from real fields only.
export function courseJsonLd(f: FormationRecord, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: formationHeading(f),
    ...(f.discipline ? { about: f.discipline } : {}),
    provider: {
      "@type": "CollegeOrUniversity",
      name: f.establishment,
      ...(f.wikidataId ? { sameAs: `https://www.wikidata.org/wiki/${f.wikidataId}` } : {}),
    },
    ...(locationLine(f) ? { locationCreated: locationLine(f) } : {}),
    url,
  };
}
