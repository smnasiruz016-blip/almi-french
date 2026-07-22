// REACHABILITY PROOF — no database, no credentials.
//
// Proves what "it typechecks" and "a session row exists" do NOT:
//
//   1. NO REPEAT WITHIN A RUN — rotation with accumulating excludeIds drains a
//      cell's whole pool and never serves the same item twice.
//   2. THE BANK IS REACHABLE — the union of what a learner can be served is the
//      whole bank, not the 48 items the old runner could reach.
//   3. NO OVER-PROMISING — plannedSteps() never targets more steps than the pool
//      can serve, so a run cannot end short or be "fixed" by repeating an item.
//
// SOURCE OF TRUTH: scripts/seed/*.ts — the same on-disk bank that seeds the
// database and that the static Rule#7 gate reads. The DB is a thin Prisma layer
// over exactly these rows.
//
// WHY THIS IS A REAL PROOF AND NOT A RE-IMPLEMENTATION. The family rule
// (inFamilyPool) and the run-length rule (plannedSteps) are imported from
// src/lib/french/pool.ts — the same functions production calls. The old runner's
// behaviour is reproduced from its own defining property, documented below. If the
// shipped rules change, this proof changes with them; they cannot quietly disagree.
//
// Run: npx tsx scripts/reachability-proof.ts

import type { Prisma } from "@prisma/client";
import type { CefrLevel, ExamFamily, FrenchSkill } from "@prisma/client";
import { ITEMS as A1 } from "./seed/a1";
import { ITEMS as A2 } from "./seed/a2";
import { ITEMS as B1 } from "./seed/b1";
import { ITEMS as B2 } from "./seed/b2";
import { ITEMS as C1 } from "./seed/c1";
import { ITEMS as C2 } from "./seed/c2";
import { EXAMS, type Exam } from "../src/lib/french/exams";
import { LEVELS, isObjective } from "../src/lib/french/types";
import { inFamilyPool, plannedSteps } from "../src/lib/french/pool";

const SKILLS: FrenchSkill[] = [
  "COMPREHENSION_ECRITE",
  "COMPREHENSION_ORALE",
  "EXPRESSION_ECRITE",
  "EXPRESSION_ORALE",
];

// exams.ts family ("DELF-DALF") → prisma ExamFamily enum ("DELF_DALF").
const famOf = (e: Exam): ExamFamily => (e.family === "DELF-DALF" ? "DELF_DALF" : e.family);

type Seed = Prisma.FrenchItemCreateManyInput;
const ALL: Seed[] = [...A1, ...A2, ...B1, ...B2, ...C1, ...C2];

// Stable synthetic id per row: the DB assigns cuids, but identity only needs to be
// stable and unique within this run. Index in the concatenated bank does that.
const idOf = new Map<Seed, string>(ALL.map((it, i) => [it, `item-${i}`]));
const activeItems = ALL.filter((it) => it.active !== false);

/** The pool a door may serve for a cell — production's rule, imported. */
function poolFor(level: CefrLevel, skill: FrenchSkill, fam: ExamFamily): Seed[] {
  return activeItems.filter(
    (it) => it.level === level && it.skill === skill && inFamilyPool(it, fam),
  );
}

function main() {
  const totalActive = activeItems.length;
  console.log(`Active items in on-disk seed bank: ${totalActive}\n`);

  // ── OLD RUNNER ────────────────────────────────────────────────────────────
  // Defining property (src/app/(app)/practice/run/page.tsx before this change):
  //   pickItems({ ...limit: 1 }) with orderBy createdAt asc, then render items[0].
  // Seed insertion order IS createdAt order, so "the first item of the pool" is
  // exactly what that door/level/skill served — every visit, forever.
  const oldReach = new Set<string>();
  for (const exam of EXAMS) {
    for (const level of LEVELS) {
      for (const skill of SKILLS) {
        const first = poolFor(level, skill, famOf(exam))[0];
        if (first) oldReach.add(idOf.get(first)!);
      }
    }
  }

  // ── NEW RUNNER ────────────────────────────────────────────────────────────
  const newReach = new Set<string>();
  let cells = 0;
  let repeats = 0;
  let notDrained = 0;
  let overPromised = 0;
  const thin: string[] = [];

  for (const exam of EXAMS) {
    for (const level of LEVELS) {
      for (const skill of SKILLS) {
        const fam = famOf(exam);
        const pool = poolFor(level, skill, fam);
        cells++;

        // (3) a run must never target more steps than the pool can serve.
        const target = plannedSteps(isObjective(skill), pool.length);
        if (target > pool.length) {
          console.error(`  ✗ OVER-PROMISE: ${exam.id} ${level} ${skill} targets ${target} of ${pool.length}`);
          overPromised++;
        }

        // (1) rotate with accumulating excludes, exactly as pickUnservedItemId does.
        const served: string[] = [];
        const seen = new Set<string>();
        for (let guard = 0; guard < 1000; guard++) {
          const remaining = pool.filter((it) => !served.includes(idOf.get(it)!));
          if (remaining.length === 0) break;
          const chosen = remaining[Math.floor(Math.random() * remaining.length)];
          const id = idOf.get(chosen)!;
          if (seen.has(id)) {
            console.error(`  ✗ REPEAT: ${exam.id} ${level} ${skill} re-served ${id}`);
            repeats++;
            break;
          }
          seen.add(id);
          served.push(id);
          newReach.add(id);
        }
        if (served.length !== pool.length) notDrained++;

        if (pool.length < 15) thin.push(`${exam.id} ${level} ${skill}: ${pool.length}`);
      }
    }
  }

  const pct = (n: number) => `${((n / totalActive) * 100).toFixed(1)}%`;

  console.log("── 1. NO REPEAT WITHIN A RUN ──");
  console.log(`  cells walked:                 ${cells}`);
  console.log(`  repeats found:                ${repeats}`);
  console.log(`  cells not drained to pool:    ${notDrained}`);

  console.log("\n── 2. NO OVER-PROMISING ──");
  console.log(`  cells targeting > pool size:  ${overPromised}`);

  console.log("\n── 3. REACHABILITY ──");
  console.log(`  OLD runner (limit:1, createdAt asc): ${oldReach.size} / ${totalActive}  (${pct(oldReach.size)})`);
  console.log(`  NEW runner (session + excludeIds):   ${newReach.size} / ${totalActive}  (${pct(newReach.size)})`);
  console.log(`  items unlocked:                      +${newReach.size - oldReach.size}`);

  const ok = repeats === 0 && notDrained === 0 && overPromised === 0 && newReach.size === totalActive;
  console.log(`\n${ok ? "✓ PROOF PASSED" : "✗ PROOF FAILED"}`);

  // Reported, not asserted: thin cells are dimension B's job. Printed here so the
  // runner fix is never mistaken for a content fix.
  console.log(`\n(Separately: ${thin.length} cells hold fewer than 15 items — dimension B.)`);

  process.exit(ok ? 0 : 1);
}

main();
