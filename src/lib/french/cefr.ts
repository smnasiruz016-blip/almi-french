// Shared CEFR + NCLC primitives for the French exam engines. CEFR is the common
// scale across TEF/TCF/DELF/DALF; NCLC (= CLB in French) is Canada's immigration
// benchmark, used by IRCC for Express Entry. These are scale definitions only —
// the per-exam score→level mapping lives in the engine files.

export const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
export type CefrLevel = (typeof CEFR_LEVELS)[number];

export const CEFR_LABEL: Record<CefrLevel, string> = {
  A1: "A1 — Beginner",
  A2: "A2 — Elementary",
  B1: "B1 — Intermediate",
  B2: "B2 — Upper Intermediate",
  C1: "C1 — Advanced",
  C2: "C2 — Mastery",
};

// NCLC/CLB benchmarks relevant to immigration (IRCC reports 4–10+ from TEF/TCF).
export type Nclc = 0 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

// The four skills, with the French exam names.
export const SKILLS = ["listening", "reading", "writing", "speaking"] as const;
export type Skill = (typeof SKILLS)[number];

export const SKILL_FR: Record<Skill, string> = {
  listening: "Compréhension de l'oral",
  reading: "Compréhension écrite",
  writing: "Expression écrite",
  speaking: "Expression orale",
};

export const SKILL_EN: Record<Skill, string> = {
  listening: "Listening",
  reading: "Reading",
  writing: "Writing",
  speaking: "Speaking",
};

// Honest, documented approximate NCLC→CEFR bridge. The exam certificate's own
// CEFR is authoritative; this is for display alongside an NCLC estimate.
export function nclcToCefr(nclc: Nclc): CefrLevel {
  if (nclc >= 9) return "C1";
  if (nclc >= 7) return "B2";
  if (nclc >= 5) return "B1";
  if (nclc >= 4) return "A2";
  return "A1";
}

// Confirm-with-the-body line reused across engine outputs (honesty doctrine).
export const CONFIRM_LINE =
  "This is a practice estimate, not an official result. Confirm with the official body (CCI Paris–Le français des affaires for TEF, France Éducation International for TCF/DELF/DALF, and IRCC for immigration levels).";
