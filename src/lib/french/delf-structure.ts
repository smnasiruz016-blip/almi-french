// DELF exam STRUCTURE — per level, per épreuve. Source: France Éducation
// International (the awarding body), official per-level pages; verified by the
// founder against those pages on 2026-07-15 (the FEI site bot-blocks automated
// fetching, so this was read off the authority's own pages by hand).
//
// This is the NEW DELF format: comprehension (orale + écrite) is delivered as
// multiple-choice (QCM). The tell that these are new-format durations and not
// the old ones is B1 compréhension écrite at 45 min (the old format ran 35 min).
//
// SCOPE: DELF A1–B2 only. DALF C1/C2 structures are deliberately ABSENT — they
// were not part of the verified set, and a guessed structure is exactly the kind
// of fabrication this product refuses. Add them only from the FEI pages.
//
// Scoring is NOT repeated here — it lives in engines/delf.ts (each épreuve /25,
// total /100, pass 50/100, 5/25 note éliminatoire) and already matches FEI.

import type { CefrLevel, Skill } from "./cefr";

export type DelfEpreuve = {
  skill: Skill;
  /** Number of exercises, where FEI states one. Null = FEI describes parts, not exercises. */
  exercises: number | null;
  /** Number of parts, for the oral. Null = not expressed in parts. */
  parts: number | null;
  /** Duration exactly as FEI expresses it. */
  duration: string;
  /** Preparation time before the oral, where the level has one. */
  prep: string | null;
  /** What the candidate produces, for the written/oral productions. */
  task: string | null;
};

export type DelfLevelStructure = {
  level: Extract<CefrLevel, "A1" | "A2" | "B1" | "B2">;
  epreuves: DelfEpreuve[];
  /** Total across the four épreuves, as FEI scores it. */
  totalNote: string;
};

const ep = (
  skill: Skill,
  exercises: number | null,
  parts: number | null,
  duration: string,
  task: string | null = null,
  prep: string | null = null,
): DelfEpreuve => ({ skill, exercises, parts, duration, prep, task });

export const DELF_STRUCTURE: Record<"A1" | "A2" | "B1" | "B2", DelfLevelStructure> = {
  A1: {
    level: "A1",
    epreuves: [
      ep("listening", 4, null, "20 min"),
      ep("reading", 4, null, "30 min"),
      ep("writing", 2, null, "30 min", "Complete a form, then write a message of about 40 words"),
      ep("speaking", null, 3, "5–7 min"),
    ],
    totalNote: "/100 — each épreuve /25",
  },
  A2: {
    level: "A2",
    epreuves: [
      ep("listening", 4, null, "25 min"),
      ep("reading", 4, null, "30 min"),
      ep("writing", 2, null, "45 min", "Two productions of about 60 words each"),
      ep("speaking", null, 3, "6–8 min"),
    ],
    totalNote: "/100 — each épreuve /25",
  },
  B1: {
    level: "B1",
    epreuves: [
      ep("listening", 3, null, "25 min"),
      ep("reading", 2, null, "45 min"),
      ep("writing", 1, null, "45 min", "One production of about 160 words"),
      ep("speaking", null, 3, "15 min"),
    ],
    totalNote: "/100 — each épreuve /25",
  },
  B2: {
    level: "B2",
    epreuves: [
      ep("listening", 2, null, "30 min"),
      ep("reading", 2, null, "1 h"),
      ep("writing", 1, null, "1 h", "One production of about 250 words"),
      ep("speaking", null, 2, "20 min", null, "30 min preparation"),
    ],
    totalNote: "/100 — each épreuve /25",
  },
};

/** In the new format both comprehension épreuves are multiple-choice. */
export const DELF_COMPREHENSION_IS_QCM = true;

export const DELF_COMPREHENSION_NOTE =
  "In the new DELF format, compréhension de l'oral and compréhension écrite are answered as multiple-choice questions (QCM).";

export const DELF_STRUCTURE_SOURCE =
  "Structure per France Éducation International, the awarding body. Confirm the current format and timings for your session with your exam centre.";

export function delfStructureFor(level: CefrLevel): DelfLevelStructure | null {
  return level === "A1" || level === "A2" || level === "B1" || level === "B2"
    ? DELF_STRUCTURE[level]
    : null; // DALF C1/C2 not verified — no guess.
}
