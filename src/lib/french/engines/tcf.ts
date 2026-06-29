// ENGINE B — TCF (all TCF versions; immigration mapping uses TCF Canada).
// Listening & Reading scored 0–699; Speaking & Writing scored 0–20. Each maps to
// NCLC/CLB + CEFR. NO single pass %. Unlike TEF, TCF has no "B2 inférieur" trap.

import type { Skill, Nclc, CefrLevel } from "../cefr";
import { SKILLS, nclcToCefr, CONFIRM_LINE } from "../cefr";
import { TCF_CANADA, scoreToNclc } from "../nclc-tables";

export const TCF_TABLE_VERIFIED = TCF_CANADA.verified;
export const TCF_MAX: Record<Skill, number> = {
  listening: 699,
  reading: 699,
  writing: 20,
  speaking: 20,
};

export type TcfSkillScores = Record<Skill, number>;

export type TcfSkillResult = {
  score: number;
  outOf: number;
  nclc: Nclc;
  cefr: CefrLevel;
};

export type TcfResult = {
  exam: "TCF";
  perSkill: Record<Skill, TcfSkillResult>;
  lowestNclc: Nclc;
  nclc7AllSkills: boolean;
  bonusNote: string;
  tableVerified: boolean;
  confirm: string;
};

function clamp(n: number, max: number): number {
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(max, n));
}

export function scoreTcf(scores: TcfSkillScores): TcfResult {
  const perSkill = {} as Record<Skill, TcfSkillResult>;
  for (const s of SKILLS) {
    const outOf = TCF_MAX[s];
    const score = clamp(scores[s], outOf);
    const nclc = scoreToNclc(TCF_CANADA.skills[s], score);
    perSkill[s] = { score, outOf, nclc, cefr: nclcToCefr(nclc) };
  }

  const lowestNclc = SKILLS.reduce(
    (min, s) => (perSkill[s].nclc < min ? perSkill[s].nclc : min),
    10 as Nclc,
  );
  const nclc7AllSkills = SKILLS.every((s) => perSkill[s].nclc >= 7);

  return {
    exam: "TCF",
    perSkill,
    lowestNclc,
    nclc7AllSkills,
    bonusNote: nclc7AllSkills
      ? "NCLC 7 in all four skills — up to 50 CRS bonus points (with English at CLB 5+)."
      : "Reach NCLC 7 in all four skills for up to 50 CRS bonus points (with English at CLB 5+).",
    tableVerified: TCF_CANADA.verified,
    confirm: CONFIRM_LINE,
  };
}
