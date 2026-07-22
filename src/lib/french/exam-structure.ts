// TEF and TCF EXPRESSION STRUCTURE — task format per family.
//
// WHY THIS FILE EXISTS. DELF's structure has lived in delf-structure.ts since
// 2026-07-15, but TEF and TCF had NO structure metadata anywhere in this repo.
// The expression items authored before this file therefore carried word counts and
// timings with nothing behind them — TEF C1 écrite held both 80–120 and 200–250
// with no record of which task each represented. Topping those modules up to the
// Rule #7 minimum meant either recording the real structure or inventing one, and
// inventing one is the fabrication delf-structure.ts already refuses. So: recorded.
//
// THE KEY DIFFERENCE FROM DELF. DELF is level-specific: a B1 paper and a B2 paper
// are different exams with different tasks. TEF and TCF are NOT. Each is a SINGLE
// exam whose result is placed on the CEFR/NCLC scale — the task format is FIXED and
// the candidate's level is what their answer demonstrates. So an item written for a
// TEF cell at A2 and one at C1 share the same task, word count and timing; only the
// topic, register and expected complexity of the prompt differ.
//
// ── SOURCES ────────────────────────────────────────────────────────────────
// TEF expression orale — Le français des affaires (the exam's own administrator),
//   "Prepare yourself for the oral expression test of the TEF", read 2026-07-22:
//   https://www.lefrancaisdesaffaires.fr/en/prepare-yourself-for-the-oral-expression-test-of-the-tef/
//   Verbatim: Section A, 5 minutes, "obtain as much information as possible";
//   Section B, 10 minutes, "present an activity to your interlocutor" and convince
//   them to participate; 15 minutes total. The simplified version used for TEF IRN
//   / carte de résident runs 10 minutes and requires ONLY Section B.
//   NOTE: this page does NOT state a preparation time. The prepSeconds used by our
//   items is a PRACTICE convention (a moment to gather thoughts), not an official
//   figure, and must not be presented to learners as the exam's own timing.
//
// TEF + TCF expression écrite — learnfrenchinvancouver.com guide, read 2026-07-22:
//   https://learnfrenchinvancouver.com/blog/tef-tcf-expression-ecrite-guide/
//   TEF: Section A narrative/descriptive, Section B argumentative essay; 15 min /
//   40 min / 5 min review; 60 min total; scored 0–450 with CLB 7 at 310/450.
//   TCF: three tâches, 10 / 15 / 30 min + 5 min review; 60 min total; scored 0–20
//   with CLB 7 at 12/20. SECONDARY SOURCE — a language school's guide, with no
//   publisher or date stated on the page. Ranked below the administrator above.
//
// TCF Canada tâches — Prep2Pass, read 2026-07-22: https://prep2pass.ca/exam-explanation
//   Écrite verbatim: Tâche 1 "Short message responding to a situation. Expected
//   length: 60–120 words."; Tâche 2 "Letter, email, or short article in a structured
//   context. Expected length: 120–150 words."; Tâche 3 "Opinion piece comparing
//   documents or presenting a viewpoint. Expected length: 120–180 words."
//   Orale verbatim: Tâche 1 "2 minutes — guided interview (no preparation)";
//   Tâche 2 "2 minutes preparation + 3 minutes 30 interaction", asking 8–12
//   questions; Tâche 3 "4 minutes 30 — express and defend a point of view (no
//   preparation)".
//
// ONE RESOLVED CONFLICT, recorded so it is not silently re-litigated: the
// learnfrenchinvancouver guide describes TCF Tâche 3 as "180+ words", while
// Prep2Pass gives "120–180 words". We use 120–180 — it is the more specific claim,
// it comes from the TCF-focused source, and a floor of 180 would contradict the
// same page's own 30-minute allowance. If the official CIEP/France Éducation
// International page later states otherwise, that page wins over both.
//
// DALF C1/C2 IS NOT HERE, deliberately — its structure was not in this verified set.

export type ExpressionTask = {
  /** Task label as the exam itself names it. */
  label: string;
  /** What the candidate produces. */
  task: string;
  /** Written tasks only. */
  wordMin?: number;
  wordMax?: number;
  /** Spoken tasks only, in seconds. */
  prepSeconds?: number;
  speakSeconds?: number;
};

/** TEF — fixed format, level-independent (see header). */
export const TEF_EXPRESSION = {
  ecrite: [
    { label: "Section A", task: "Descriptive message or letter responding to a situation", wordMin: 80, wordMax: 120 },
    { label: "Section B", task: "Argumentative essay defending one position", wordMin: 200, wordMax: 260 },
  ] satisfies ExpressionTask[],
  orale: [
    { label: "Section A", task: "Role-play: obtain as much information as possible by questioning", prepSeconds: 60, speakSeconds: 300 },
    { label: "Section B", task: "Role-play: present an activity and persuade the interlocutor to take part", prepSeconds: 60, speakSeconds: 600 },
  ] satisfies ExpressionTask[],
  /** TEF IRN / carte de résident runs Section B only — Section A is not sat. */
  irnOraleSections: ["Section B"] as const,
};

// ── DALF C1 / C2 ────────────────────────────────────────────────────────────
// ⚠️ THIS IS THE WEAKEST-SOURCED BLOCK IN THIS FILE, and that is stated rather
// than hidden. France Éducation International — the awarding body, and the source
// behind delf-structure.ts — bot-blocks automated fetching, so it could not be read
// directly. What follows rests on a secondary guide, cross-read against the
// official règlement.
//
// SOURCE RANKING: BY CURRENCY, NOT BY PUBLISHER. The instinct is to rank
// education.gouv.fr above a private guide. Here that would be wrong:
//   • education.gouv.fr, Bulletin Officiel 2005 n°29, annexe DELF/DALF —
//     https://www.education.gouv.fr/bo/BoAnnexes/2005/29/DELF_DALF.pdf (read
//     2026-07-22). It is the ORIGINAL règlement and is TWENTY-ONE YEARS OLD. Its
//     figures contradict current practice (C1 écrite 3 h and /50, where the exam
//     now runs 2 h 30 and /25), and it cannot speak to any change made after 2005.
//   • Polyglottes, "DALF C1-C2 : guide complet", updated 2026-01-05 —
//     https://polyglottes.org/dalf-c1-c2-guide-complet-ressources-outils/ (read
//     2026-07-22). Secondary, but current, and specific.
// So the 2026 guide wins on everything that changed after 2005; the 2005 BO is
// cited ONLY for the point both agree on and that has not moved: C1 production
// écrite comprises TWO tasks. If FEI's own page is ever readable, it outranks both.
//
// WORD MAXIMA ARE OUR CONVENTION, NOT THE EXAM'S. The sources give MINIMA — C1
// synthèse "200-240", C1 essai "250+", C2 "700+ words minimum". A real DALF sets a
// floor, not a ceiling. Our wordMax exists because the practice field needs a
// bound; it must never be presented to a learner as a limit the exam imposes.
//
// C2 IS NOT A STANDALONE WRITTEN EXAM. The guide describes DALF C2 as compréhension
// ET production combined in one integrated épreuve (/50): the candidate works from a
// dossier of roughly 2 000 words and produces a single structured text. We model
// only the PRODUCTION side of that épreuve, because that is what a writing item can
// be. The same is true orally: the C2 épreuve runs compte rendu → développement
// personnel → débat, and our item covers the production, not the listening.
//
// TODO — CONFIRM WITH FEI, DO NOT HARD-CODE: the guide states "Depuis 2020, les
// domaines de spécialité ont été supprimés" (the old lettres-et-sciences-humaines
// vs sciences split). We could not confirm that at the awarding body. It is
// therefore NOT modelled as an axis; items use general topics, which is correct
// whether or not the split still exists. Do not add a domain axis on this claim
// alone.
export const DALF_EXPRESSION = {
  C1: {
    ecrite: [
      { label: "Synthèse", task: "Reformulate a dossier of documents into a structured, objective synthesis", wordMin: 200, wordMax: 240 },
      { label: "Essai argumenté", task: "Reasoned personal position on the dossier's theme", wordMin: 250, wordMax: 320 },
    ] satisfies ExpressionTask[],
    orale: [
      { label: "Exposé + débat", task: "Presentation built from documents, then debate with the examiners", prepSeconds: 3600, speakSeconds: 600 },
    ] satisfies ExpressionTask[],
  },
  C2: {
    ecrite: [
      { label: "Production intégrée", task: "Single structured text (article, report, speech) from a ~2 000-word dossier, integrating the candidate's own knowledge", wordMin: 700, wordMax: 850 },
    ] satisfies ExpressionTask[],
    orale: [
      { label: "Compte rendu + développement + débat", task: "Report on a ~14-minute audio document, then personal development and debate", prepSeconds: 3600, speakSeconds: 600 },
    ] satisfies ExpressionTask[],
  },
};

/** TCF — fixed format, level-independent (see header). */
export const TCF_EXPRESSION = {
  ecrite: [
    { label: "Tâche 1", task: "Short everyday message responding to a situation", wordMin: 60, wordMax: 120 },
    { label: "Tâche 2", task: "Formal letter, email or short article in a structured context", wordMin: 120, wordMax: 150 },
    { label: "Tâche 3", task: "Comparative/synthesis piece: both views, then a reasoned position", wordMin: 120, wordMax: 180 },
  ] satisfies ExpressionTask[],
  orale: [
    { label: "Tâche 1", task: "Guided interview on familiar topics", prepSeconds: 0, speakSeconds: 120 },
    { label: "Tâche 2", task: "Interaction: ask 8–12 questions in a role-play scenario", prepSeconds: 120, speakSeconds: 210 },
    { label: "Tâche 3", task: "Express and defend a point of view on a general topic", prepSeconds: 0, speakSeconds: 270 },
  ] satisfies ExpressionTask[],
};
