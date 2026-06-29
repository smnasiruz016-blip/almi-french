// The three honest French scoring engines, and the routing from an exam family
// to its engine. French is NOT one exam with one pass mark — each family scores
// differently, so each routes to its own engine. (No single 60% pass mark anywhere.)

export * from "./delf";
export * from "./tef";
export * from "./tcf";

export type EngineId = "A" | "B" | "C"; // A=TEF, B=TCF, C=DELF/DALF
export type ExamFamily = "TEF" | "TCF" | "DELF-DALF";

export const ENGINE_FOR_FAMILY: Record<ExamFamily, EngineId> = {
  TEF: "A",
  TCF: "B",
  "DELF-DALF": "C",
};

export const ENGINE_SUMMARY: Record<EngineId, string> = {
  A: "TEF — each skill 0–699, mapped to CEFR and Canada's NCLC. No single pass %.",
  B: "TCF — Listening & Reading 0–699, Speaking & Writing 0–20, mapped to CEFR and NCLC. No single pass %.",
  C: "DELF/DALF — each skill /25, total /100; pass = 50/100 AND at least 5/25 in every skill (note éliminatoire).",
};
