// THE POOL RULE — which items a given exam door may be served.
//
// Reading and Listening items are SHARED across every door (examFamily = null);
// Writing and Speaking are authored per exam family. So a door sees: shared items
// + its own family's items, and nothing else.
//
// WHY THIS LIVES IN ITS OWN FILE, AS A PLAIN PREDICATE.
// The rule used to be expressed only as a Prisma `where` clause
// (`OR: [{ examFamily: null }, { examFamily: fam }]`). A proof of the runner then
// has two bad options: query the database (needs production credentials that are
// Vercel-sensitive by design), or re-write the rule in the test — and a test that
// re-implements the rule proves nothing about the rule that ships.
//
// So the family rule is a PURE FUNCTION that production actually calls. The DB
// query narrows on (level, skill, active) — indexed, cheap — and this predicate
// makes the family decision, in the app and in the proof, from one definition.
// If this function is wrong, both the product and the proof are wrong together;
// they can never quietly disagree.

import type { ExamFamily } from "@prisma/client";

/** Does this item belong to the pool a `fam` door may serve?
 *  Shared items (examFamily null/undefined) always qualify. */
export function inFamilyPool(
  item: { examFamily?: ExamFamily | null },
  fam: ExamFamily,
): boolean {
  return item.examFamily == null || item.examFamily === fam;
}

/** Steps a run aims for. Objective skills are cheap to mark, so runs are longer;
 *  productive skills each cost an AI grade, so runs are shorter. Mirrors celpip's
 *  PRACTICE_SET_STEPS split between DETERMINISTIC and AI-scored task types. */
export const STEPS_OBJECTIVE = 8;
export const STEPS_PRODUCTIVE = 3;

/** A run must never promise more steps than the pool can serve without repeating.
 *  Shared with the proof so "never over-promises" is checked against the real rule. */
export function plannedSteps(objective: boolean, poolSize: number): number {
  return Math.min(objective ? STEPS_OBJECTIVE : STEPS_PRODUCTIVE, poolSize);
}
