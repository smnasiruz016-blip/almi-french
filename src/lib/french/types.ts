// Practice-layer types for AlmiFrench. CEFR levels + the four French skills, plus
// the per-task payload (stimulus + answer key) and response shapes. The scoring
// lives in src/lib/french/engines (TEF / TCF / DELF-DALF) — there is NO single
// pass mark; each exam family scores on its own scale and we always tell the user
// to confirm the real requirement with the official body.

import type { CefrLevel, FrenchSkill, FrenchTaskType } from "@prisma/client";

export type { CefrLevel, FrenchSkill, FrenchTaskType } from "@prisma/client";

// The four skills, in the order a full mock runs them.
export const SKILL_ORDER: FrenchSkill[] = [
  "COMPREHENSION_ORALE",
  "COMPREHENSION_ECRITE",
  "EXPRESSION_ECRITE",
  "EXPRESSION_ORALE",
];

// Objective (auto-marked, free) vs productive (AI-graded, Pro).
export const OBJECTIVE_SKILLS: FrenchSkill[] = ["COMPREHENSION_ORALE", "COMPREHENSION_ECRITE"];
export const PRODUCTIVE_SKILLS: FrenchSkill[] = ["EXPRESSION_ECRITE", "EXPRESSION_ORALE"];

export function isObjective(skill: FrenchSkill): boolean {
  return OBJECTIVE_SKILLS.includes(skill);
}

export const SKILL_LABEL: Record<FrenchSkill, string> = {
  COMPREHENSION_ORALE: "Compréhension de l'oral (Listening)",
  COMPREHENSION_ECRITE: "Compréhension écrite (Reading)",
  EXPRESSION_ECRITE: "Expression écrite (Writing)",
  EXPRESSION_ORALE: "Expression orale (Speaking)",
};

export const SKILL_SLUG: Record<FrenchSkill, string> = {
  COMPREHENSION_ORALE: "listening",
  COMPREHENSION_ECRITE: "reading",
  EXPRESSION_ECRITE: "writing",
  EXPRESSION_ORALE: "speaking",
};

export const LEVEL_LABEL: Record<CefrLevel, string> = {
  A1: "A1 — Beginner",
  A2: "A2 — Elementary",
  B1: "B1 — Intermediate",
  B2: "B2 — Upper Intermediate",
  C1: "C1 — Advanced",
  C2: "C2 — Mastery",
};

export const LEVELS: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

// ---- Per-task payload (stimulus + answer key) and response shapes ----
// payload lives on FrenchItem.payload; response on FrenchAttempt.response. Answer
// keys inside payloads are stripped server-side before reaching the client.

export type Speaker = { role: string; voice: string };
export type McqOption = { id: string; text: string };

// Compréhension écrite (Reading) — French passages + questions.
export type ReadingText = { id: string; heading?: string; body: string };
export type ReadingQuestion = {
  id: string;
  kind: "mcq" | "match" | "truefalse";
  stem: string;
  options?: McqOption[];
  answer: string; // option id / "true"|"false" — stripped before client send
};
export type ReadingPayload = {
  passages: ReadingText[];
  questions: ReadingQuestion[];
};

// Compréhension de l'oral (Listening) — French audio (TTS) + questions.
export type ListeningQuestion = {
  id: string;
  stem: string;
  options: McqOption[];
  answer: string; // option id — stripped before client send
};
export type ListeningPayload = {
  audioScript: string;
  speakers: Speaker[];
  questions: ListeningQuestion[];
};

// Expression écrite (Writing) — level + exam aware production écrite.
export type WritingPayload = {
  situation: string;
  instruction: string;
  wordMin: number;
  wordMax: number;
};
export type WritingResponse = { text: string };

// Expression orale (Speaking) — monologue / interaction; some show an image.
export type SpeakingPayload = {
  taskPrompt: string;
  prepSeconds: number;
  speakSeconds: number;
  imageUrl?: string;
  imageAlt?: string;
};
export type SpeakingResponse = { transcript: string };

// Objective (Reading/Listening) response.
export type ObjectiveResponse = { answers: Record<string, string | string[]> };
