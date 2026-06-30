// Wave-2 SEO — shared copy + helpers for the "study in France" formation pages.
// AMAANAT: we never invent a per-formation French level. The French requirement
// is France-wide (Campus France / «Études en France» / DAP), so we state the real
// rule and defer specifics to the establishment + Campus France.

import type { FormationRecord } from "./formations";
import type { Origin } from "./origins";

// Vetted native search phrasing (founder-provided / verifiable). Only populated
// where we have a confident real phrase — never an invented translation. Other
// origins use the honest English "study in France from {country}" intent.
const NATIVE_PHRASE: Record<string, string> = {
  pakistan: "France mein parhai",
  brazil: "estudar na França",
  morocco: "الدراسة في فرنسا",
};
export function nativePhrase(slug: string): string | null {
  return NATIVE_PHRASE[slug] ?? null;
}

// The application corridor, branched HONESTLY by EEF status — each origin states
// only its own truth (never an EEF procedure for a non-EEF country, and never
// "apply directly" for an EEF country).
export function applicationCorridor(origin: Origin): { heading: string; body: string } {
  if (origin.isEEF) {
    return {
      heading: `Applying from ${origin.name}`,
      body:
        `${origin.name} is one of the countries where the Campus France «Études en France» procedure is ` +
        `mandatory. From ${origin.name}, you complete the online «Études en France» application before your ` +
        `student visa — it runs from the enrolment request through to the visa. Your French proof (TCF / TEF, ` +
        `or DELF / DALF) is submitted within that procedure, at the level the establishment requires.`,
    };
  }
  return {
    heading: `Applying from ${origin.name}`,
    body:
      `From ${origin.name} there is no «Études en France» pre-procedure. You apply directly to the ` +
      `establishment (or through the DAP procedure for first-year undergraduate), and once admitted you ` +
      `request your student visa at the French consulate or embassy serving ${origin.name}. Your French ` +
      `proof (TCF / TEF, or DELF / DALF) goes to the establishment at the level it requires.`,
  };
}

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

// Honest, search-tuned intent line (real universal search patterns, not invented
// per-country claims) — makes each origin page substantive and findable.
export function searchIntentLine(origin: Origin): string {
  return (
    `People in ${origin.name} search this as “study in France from ${origin.name}”, ` +
    `“${origin.name} student visa for France”, and “French university admission from ${origin.name}”.`
  );
}

// Branched FAQ — every answer is honest and universal-true (corridor by EEF, the
// real French rule, the no-agent honesty edge). Powers visible Q&A + FAQ schema.
export function originFaq(f: FormationRecord, origin: Origin): { q: string; a: string }[] {
  const eefA = origin.isEEF
    ? `Yes. From ${origin.name} the online Campus France «Études en France» procedure is mandatory before your student visa.`
    : `No. From ${origin.name} there is no «Études en France» pre-procedure — you apply directly to the establishment (or via DAP for first-year undergraduate) and request the visa at the French consulate or embassy serving ${origin.name}.`;
  return [
    { q: `Do students from ${origin.name} need the «Études en France» procedure?`, a: eefA },
    { q: "What level of French is required?", a: frenchRequirement(f.level) },
    {
      q: `Can you apply from ${origin.name} without an agent?`,
      a: `Yes. You apply directly to the establishment and to the French consulate — no agent or paid intermediary is required, and no one should charge you a fee simply to apply.`,
    },
    {
      q: "Which French test should you take — TCF, TEF, DELF or DALF?",
      a: `The establishment sets the level. The TCF and TEF are common for admission and immigration; DELF and DALF are lifetime diplomas. See the “which French test do you need?” guide to pick the one your goal needs.`,
    },
  ];
}

export function faqJsonLd(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: { "@type": "Answer", text: x.a },
    })),
  };
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
