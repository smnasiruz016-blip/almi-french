// ENGINE A — TEF (all TEF versions; immigration mapping uses TEF Canada).
// Each skill scored 0–699 → NCLC/CLB + CEFR. NO single pass %.
// Surfaces the "B2 inférieur" trap: a writing/speaking score that is technically
// B2 by CEFR but maps below NCLC 7 — so it earns ZERO immigration bonus points.

import type { Skill, Nclc, CefrLevel } from "../cefr";
import { SKILLS, nclcToCefr, CONFIRM_LINE } from "../cefr";
import { TEF_CANADA, scoreToNclc } from "../nclc-tables";

export const TEF_TABLE_VERIFIED = TEF_CANADA.verified;
export const TEF_SCORE_MAX = 699;

export type TefSkillScores = Record<Skill, number>; // each 0–699

export type TefSkillResult = {
  score: number;
  nclc: Nclc;
  cefr: CefrLevel;
  b2Inferieur: boolean; // CEFR B2 but NCLC < 7 (no immigration bonus)
};

export type TefResult = {
  exam: "TEF";
  perSkill: Record<Skill, TefSkillResult>;
  lowestNclc: Nclc; // immigration counts the weakest skill
  nclc7AllSkills: boolean; // up to 50 CRS bonus (with English CLB 5+)
  bonusNote: string;
  b2InferieurSkills: Skill[];
  trapNote: string | null;
  tableVerified: boolean;
  confirm: string;
};

function clamp(n: number): number {
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(TEF_SCORE_MAX, n));
}

export function scoreTef(scores: TefSkillScores): TefResult {
  const perSkill = {} as Record<Skill, TefSkillResult>;
  for (const s of SKILLS) {
    const score = clamp(scores[s]);
    const nclc = scoreToNclc(TEF_CANADA.skills[s], score);
    const cefr = nclcToCefr(nclc);
    // B2 inférieur: certificate may read B2 while NCLC is still 6 — show honestly.
    const b2Inferieur = nclc === 6;
    perSkill[s] = { score, nclc, cefr, b2Inferieur };
  }

  const lowestNclc = SKILLS.reduce(
    (min, s) => (perSkill[s].nclc < min ? perSkill[s].nclc : min),
    10 as Nclc,
  );
  const nclc7AllSkills = SKILLS.every((s) => perSkill[s].nclc >= 7);
  const b2InferieurSkills = SKILLS.filter((s) => perSkill[s].b2Inferieur);

  return {
    exam: "TEF",
    perSkill,
    lowestNclc,
    nclc7AllSkills,
    bonusNote: nclc7AllSkills
      ? "NCLC 7 in all four skills — up to 50 CRS bonus points (with English at CLB 5+)."
      : "Reach NCLC 7 in all four skills for up to 50 CRS bonus points (with English at CLB 5+).",
    b2InferieurSkills,
    trapNote: b2InferieurSkills.length
      ? `Watch the "B2 inférieur" trap: ${b2InferieurSkills.join(", ")} sits in lower-B2 territory — technically B2 by CEFR, but below NCLC 7, so it earns 0 immigration bonus points. You need to push into NCLC 7. (TCF has no equivalent trap.)`
      : null,
    tableVerified: TEF_CANADA.verified,
    confirm: CONFIRM_LINE,
  };
}
