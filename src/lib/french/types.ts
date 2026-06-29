// Shared Goethe domain primitives.
//
// The French exam reports a SEPARATE result per module (Lesen, Hören,
// Schreiben, Sprechen) at a chosen CEFR level (A1–C2). Each module is scored to a
// points maximum with a 60% pass threshold; AlmiFrench shows an honest practice
// POINTS estimate RANGE per module and a pass/borderline/not-yet verdict, never a
// fabricated overall total. We always tell the user to confirm the real
// requirement with the the official exam body / their university / the German authority.

import type { GoetheLevel, GoetheModule } from "@prisma/client";

export type { GoetheLevel, GoetheModule, GoetheTaskType } from "@prisma/client";

// A practice points range, e.g. [55, 72].
export type Range = readonly [number, number];

export type Verdict = "passed" | "borderline" | "not-yet";

// Per-module practice estimate. null = not enough evidence yet.
export type ModuleScore = {
  pointsEst: Range;
  percent: number;
  verdict: Verdict;
  passThreshold: number; // points needed to pass this module (60% of maxPoints)
  maxPoints: number;
} | null;

export const MODULE_LABEL: Record<GoetheModule, string> = {
  LESEN: "Lesen (Reading)",
  HOEREN: "Hören (Listening)",
  SCHREIBEN: "Schreiben (Writing)",
  SPRECHEN: "Sprechen (Speaking)",
};

// The order modules run in a full mock (the Goethe written exam order).
export const MODULE_ORDER: GoetheModule[] = ["LESEN", "HOEREN", "SCHREIBEN", "SPRECHEN"];

export const LEVEL_LABEL: Record<GoetheLevel, string> = {
  A1: "A1 — Beginner",
  A2: "A2 — Elementary",
  B1: "B1 — Intermediate",
  B2: "B2 — Upper Intermediate",
  C1: "C1 — Advanced",
  C2: "C2 — Mastery",
};

export const LEVELS: GoetheLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

// ---- Per-task payload (stimulus + answer key) and response shapes ----
// payload lives on GoetheItem.payload; response on GoetheAttempt.response. Answer
// keys inside payloads are stripped server-side before reaching the client.

export type Speaker = { role: string; voice: string };
export type McqOption = { id: string; text: string };
export type McqQuestion = {
  id: string;
  stem: string;
  options: McqOption[];
  answer: string; // option id — stripped before client send
};

// HÖREN (Listening) — German audio (TTS) + multiple choice / true-false.
export type HoerenPayload = {
  audioScript: string;
  speakers: Speaker[];
  questions: McqQuestion[];
};

// LESEN (Reading) — German passages + MCQ (+ matching / richtig-falsch).
export type LesenText = { id: string; heading?: string; body: string };
export type LesenQuestion = {
  id: string;
  kind: "mcq" | "match" | "truefalse";
  stem: string;
  options?: McqOption[];
  answer: string;
};
export type LesenPayload = {
  passages: LesenText[];
  questions: LesenQuestion[];
};

// SCHREIBEN (Writing) — level-aware German writing task (message / letter / essay).
export type SchreibenPayload = {
  situation: string;
  instruction: string;
  wordMin: number;
  wordMax: number;
};
export type WritingResponse = { text: string };

// SPRECHEN (Speaking) — level-aware spoken task; some show an image.
export type SprechenPayload = {
  taskPrompt: string;
  prepSeconds: number;
  speakSeconds: number;
  imageUrl?: string;
  imageAlt?: string;
};
export type SpeakingResponse = { transcript: string };

// Objective (Lesen/Hören) response.
export type ObjectiveResponse = { answers: Record<string, string | string[]> };
