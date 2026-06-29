// The scoring bridge: turn a raw practice performance into a per-skill estimate
// on the CHOSEN EXAM's scale, then route to that exam's engine. Reading/Listening
// are marked deterministically (correct/total → fraction); Writing/Speaking get a
// quality fraction from the AI grader. The fraction → scale step is an honest
// ESTIMATE (we say so) — practice can't reproduce the official calibration.

import type { Exam } from "./exams";
import type { Skill } from "./cefr";
import { SKILLS } from "./cefr";
import { scoreTef, type TefResult } from "./engines/tef";
import { scoreTcf, TCF_MAX, type TcfResult } from "./engines/tcf";
import { scoreDelf, type DelfResult } from "./engines/delf";
import type { FrenchSkill } from "@prisma/client";
import { SKILL_SLUG } from "./types";

// Prisma FrenchSkill → the engines' lowercase Skill ("listening"|"reading"|…).
export function toCefrSkill(s: FrenchSkill): Skill {
  return SKILL_SLUG[s] as Skill;
}

// ---- Deterministic marking for objective tasks (Reading / Listening) ----
export type AnswerKey = { id: string; answer: string; exact?: boolean };
export type ObjectiveResponse = { answers: Record<string, string | string[]> };

function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ").replace(/[.,;:!?]+$/g, "");
}
function firstValue(v: string | string[] | undefined): string {
  return Array.isArray(v) ? (v[0] ?? "") : (v ?? "");
}

export type MarkResult = {
  correct: number;
  total: number;
  fraction: number;
  detail: { id: string; correct: boolean }[];
};

export function markObjective(key: AnswerKey[], response: ObjectiveResponse): MarkResult {
  let correct = 0;
  const detail: { id: string; correct: boolean }[] = [];
  for (const k of key) {
    const given = firstValue(response.answers[k.id]);
    const ok = k.exact ? given.trim() === k.answer.trim() : normalize(given) === normalize(k.answer);
    if (ok) correct += 1;
    detail.push({ id: k.id, correct: ok });
  }
  const total = key.length || 1;
  return { correct, total: key.length, fraction: correct / total, detail };
}

// ---- Fraction → the exam's per-skill scale ----
export function scaleMax(exam: Exam, skill: Skill): number {
  if (exam.family === "DELF-DALF") return 25;
  if (exam.family === "TCF") return TCF_MAX[skill]; // L/R 699, W/S 20
  return 699; // TEF: all skills 0–699
}

export function fractionToScore(exam: Exam, skill: Skill, fraction: number): number {
  const f = Math.max(0, Math.min(1, Number.isFinite(fraction) ? fraction : 0));
  return Math.round(f * scaleMax(exam, skill));
}

export type ExamScore =
  | { family: "TEF"; result: TefResult }
  | { family: "TCF"; result: TcfResult }
  | { family: "DELF-DALF"; result: DelfResult };

// Score a set of per-skill fractions on the exam's scale → the engine result.
// Missing skills default to 0 (so a single-skill practice fills just one).
export function scoreExam(exam: Exam, fractions: Partial<Record<Skill, number>>): ExamScore {
  const scores = {} as Record<Skill, number>;
  for (const s of SKILLS) scores[s] = fractionToScore(exam, s, fractions[s] ?? 0);
  if (exam.family === "TEF") return { family: "TEF", result: scoreTef(scores) };
  if (exam.family === "TCF") return { family: "TCF", result: scoreTcf(scores) };
  return { family: "DELF-DALF", result: scoreDelf(scores) };
}

// A compact, storable per-skill estimate for FrenchAttempt.scoreEstimate.
export type SkillEstimate = {
  family: Exam["family"];
  skill: Skill;
  scale: number; // max on this exam scale for this skill
  score: number; // estimated score on that scale
  fraction: number;
  // TEF/TCF
  nclc?: number;
  cefr?: string;
  b2Inferieur?: boolean;
  // DELF/DALF
  outOf25?: number;
  eliminated?: boolean; // below the 5/25 floor
  note: string;
  confirm: string;
};

// Estimate one skill end-to-end (single-skill practice).
export function estimateSkill(exam: Exam, skill: Skill, fraction: number): SkillEstimate {
  const score = fractionToScore(exam, skill, fraction);
  const scored = scoreExam(exam, { [skill]: fraction });
  const base = {
    family: exam.family,
    skill,
    scale: scaleMax(exam, skill),
    score,
    fraction,
    confirm: scored.result.confirm,
  };
  if (scored.family === "TEF") {
    const r = scored.result.perSkill[skill];
    return {
      ...base,
      nclc: r.nclc,
      cefr: r.cefr,
      b2Inferieur: r.b2Inferieur,
      note: r.b2Inferieur
        ? `Estimated NCLC ${r.nclc} (${r.cefr}). "B2 inférieur" — technically B2 but below NCLC 7, so 0 immigration bonus on this skill.`
        : `Estimated NCLC ${r.nclc} (${r.cefr}) on this skill.`,
    };
  }
  if (scored.family === "TCF") {
    const r = scored.result.perSkill[skill];
    return { ...base, nclc: r.nclc, cefr: r.cefr, note: `Estimated NCLC ${r.nclc} (${r.cefr}) on this skill.` };
  }
  const r = scored.result.perSkill[skill]; // /25
  const eliminated = r < 5;
  return {
    ...base,
    outOf25: r,
    eliminated,
    note: eliminated
      ? `Estimated ${r}/25 — below the 5/25 floor (note éliminatoire: this alone fails a DELF/DALF session).`
      : `Estimated ${r}/25 on this skill.`,
  };
}
