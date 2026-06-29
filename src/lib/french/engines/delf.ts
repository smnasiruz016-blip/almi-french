// ENGINE C — DELF / DALF (France Éducation International). VERIFIED.
// Each of the 4 skills is scored /25 → total /100. Pass requires BOTH:
//   • total ≥ 50/100, AND
//   • every skill ≥ 5/25  (the "note éliminatoire": any skill < 5/25 fails the
//     whole exam even if the total clears 50).
// Applies to DELF A1/A2/B1/B2 and DALF C1/C2. Confirmed against France Éducation
// International scoring rules (2026-06).

import type { Skill } from "../cefr";
import { SKILLS, CONFIRM_LINE } from "../cefr";

export const DELF_VERIFIED = true;
export const DELF_PASS_TOTAL = 50; // /100
export const DELF_SKILL_FLOOR = 5; // /25 — note éliminatoire
export const DELF_SKILL_MAX = 25;

export type DelfSkillScores = Record<Skill, number>; // each 0–25

export type DelfResult = {
  exam: "DELF-DALF";
  perSkill: Record<Skill, number>; // /25
  total: number; // /100
  passTotal: number;
  passed: boolean;
  eliminated: Skill[]; // skills below the 5/25 floor
  eliminatedFail: boolean; // true if a floor breach forces a fail despite total
  message: string;
  confirm: string;
};

function clamp(n: number, max: number): number {
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(max, n));
}

export function scoreDelf(scores: DelfSkillScores): DelfResult {
  const perSkill = {} as Record<Skill, number>;
  for (const s of SKILLS) perSkill[s] = clamp(scores[s], DELF_SKILL_MAX);

  const total = SKILLS.reduce((sum, s) => sum + perSkill[s], 0);
  const eliminated = SKILLS.filter((s) => perSkill[s] < DELF_SKILL_FLOOR);
  const eliminatedFail = eliminated.length > 0;
  const passed = total >= DELF_PASS_TOTAL && !eliminatedFail;

  let message: string;
  if (eliminatedFail) {
    const names = eliminated.join(", ");
    message =
      total >= DELF_PASS_TOTAL
        ? `Your total is ${total}/100 (above the 50 pass mark) but ${names} is below 5/25 — the note éliminatoire fails the whole exam. This is the most common way real candidates fail.`
        : `Below the 50/100 pass mark, and ${names} is also under the 5/25 floor (note éliminatoire).`;
  } else if (passed) {
    message = `Estimated pass: ${total}/100, every skill at or above the 5/25 floor.`;
  } else {
    message = `Estimated ${total}/100 — below the 50/100 pass mark (no skill under 5/25, so no note éliminatoire).`;
  }

  return {
    exam: "DELF-DALF",
    perSkill,
    total,
    passTotal: DELF_PASS_TOTAL,
    passed,
    eliminated,
    eliminatedFail,
    message,
    confirm: CONFIRM_LINE,
  };
}
