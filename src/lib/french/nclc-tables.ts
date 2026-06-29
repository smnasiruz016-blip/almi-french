// Official IRCC score → NCLC/CLB conversion tables for TEF Canada and TCF Canada.
//
// AMAANAT NOTE: these power an immigration-scoring engine, so they must be exact.
// VERIFIED 2026-06-29 against the official Government of Canada / IRCC page
// "How to find your language level based on your test results" (canada.ca, page
// modified 2025-09-08), bracket "after December 10, 2023" — supplied verbatim by
// the founder from the official page (canada.ca bot-blocks automated fetches).
// All 28 rows (TEF + TCF × 4 skills × NCLC 4–10) confirmed cell-by-cell; the
// earlier independently-sourced NCLC 7/8/9 anchors matched with no conflicts.
// Full transcript + provenance: docs/ircc-nclc-tables.md.
//
// Bracket: this is the CURRENT "after December 10, 2023" table. Older brackets
// exist on the same page but are intentionally not built (the tool estimates
// today's test). IRCC results are valid 2 years — surfaced on result/guide pages.

import type { Nclc, Skill } from "./cefr";

export type Band = { nclc: Nclc; min: number; max: number };
export type SkillTable = Band[]; // ordered high→low

export type NclcTable = {
  exam: "TEF" | "TCF";
  source: string;
  fetchedOn: string;
  verified: boolean;
  verifyNote: string;
  // score range per skill that yields each NCLC band
  skills: Record<Skill, SkillTable>;
};

// TEF Canada (test sittings on/after 2023-12-10). Each skill scored 0–699.
export const TEF_CANADA: NclcTable = {
  exam: "TEF",
  source:
    "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/language-test.html",
  fetchedOn: "2026-06-29",
  verified: true,
  verifyNote:
    "Official IRCC table (canada.ca, page modified 2025-09-08), bracket 'after December 10, 2023'; all NCLC 4–10 rows confirmed cell-by-cell 2026-06-29. Provenance: docs/ircc-nclc-tables.md.",
  skills: {
    listening: [
      { nclc: 10, min: 546, max: 699 },
      { nclc: 9, min: 503, max: 545 },
      { nclc: 8, min: 462, max: 502 },
      { nclc: 7, min: 434, max: 461 },
      { nclc: 6, min: 393, max: 433 },
      { nclc: 5, min: 352, max: 392 },
      { nclc: 4, min: 306, max: 351 },
    ],
    reading: [
      { nclc: 10, min: 546, max: 699 },
      { nclc: 9, min: 503, max: 545 },
      { nclc: 8, min: 462, max: 502 },
      { nclc: 7, min: 434, max: 461 },
      { nclc: 6, min: 393, max: 433 },
      { nclc: 5, min: 352, max: 392 },
      { nclc: 4, min: 306, max: 351 },
    ],
    writing: [
      { nclc: 10, min: 558, max: 699 },
      { nclc: 9, min: 512, max: 557 },
      { nclc: 8, min: 472, max: 511 },
      { nclc: 7, min: 428, max: 471 },
      { nclc: 6, min: 379, max: 427 },
      { nclc: 5, min: 330, max: 378 },
      { nclc: 4, min: 268, max: 329 },
    ],
    speaking: [
      { nclc: 10, min: 556, max: 699 },
      { nclc: 9, min: 518, max: 555 },
      { nclc: 8, min: 494, max: 517 },
      { nclc: 7, min: 456, max: 493 },
      { nclc: 6, min: 422, max: 455 },
      { nclc: 5, min: 387, max: 421 },
      { nclc: 4, min: 328, max: 386 },
    ],
  },
};

// TCF Canada. Listening & Reading 0–699; Speaking & Writing 0–20.
export const TCF_CANADA: NclcTable = {
  exam: "TCF",
  source:
    "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/language-test.html",
  fetchedOn: "2026-06-29",
  verified: true,
  verifyNote:
    "Official IRCC table (canada.ca, page modified 2025-09-08), bracket 'after December 10, 2023'; all NCLC 4–10 rows confirmed cell-by-cell 2026-06-29. Provenance: docs/ircc-nclc-tables.md.",
  skills: {
    listening: [
      { nclc: 10, min: 549, max: 699 },
      { nclc: 9, min: 523, max: 548 },
      { nclc: 8, min: 503, max: 522 },
      { nclc: 7, min: 458, max: 502 },
      { nclc: 6, min: 398, max: 457 },
      { nclc: 5, min: 369, max: 397 },
      { nclc: 4, min: 331, max: 368 },
    ],
    reading: [
      { nclc: 10, min: 549, max: 699 },
      { nclc: 9, min: 524, max: 548 },
      { nclc: 8, min: 499, max: 523 },
      { nclc: 7, min: 453, max: 498 },
      { nclc: 6, min: 406, max: 452 },
      { nclc: 5, min: 375, max: 405 },
      { nclc: 4, min: 342, max: 374 },
    ],
    writing: [
      { nclc: 10, min: 16, max: 20 },
      { nclc: 9, min: 14, max: 15 },
      { nclc: 8, min: 12, max: 13 },
      { nclc: 7, min: 10, max: 11 },
      { nclc: 6, min: 7, max: 9 },
      { nclc: 5, min: 6, max: 6 },
      { nclc: 4, min: 4, max: 5 },
    ],
    speaking: [
      { nclc: 10, min: 16, max: 20 },
      { nclc: 9, min: 14, max: 15 },
      { nclc: 8, min: 12, max: 13 },
      { nclc: 7, min: 10, max: 11 },
      { nclc: 6, min: 7, max: 9 },
      { nclc: 5, min: 6, max: 6 },
      { nclc: 4, min: 4, max: 5 },
    ],
  },
};

// Resolve a raw score to an NCLC band for a given skill table (0 = below NCLC 4).
export function scoreToNclc(table: SkillTable, score: number): Nclc {
  for (const b of table) if (score >= b.min && score <= b.max) return b.nclc;
  // above top band → cap at 10; below lowest → 0
  if (table.length && score > table[0].max) return 10;
  return 0;
}
