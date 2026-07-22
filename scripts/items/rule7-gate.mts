// RULE #7 GATE — >= 15 items per module, counted at the granularity a learner
// actually practises: (exam family x level x skill).
//
// WHY THAT GRANULARITY. /api/status groups by (level, skill) only. Reading and
// Listening items are SHARED across every exam door, but Writing and Speaking are
// authored per family — so three thin families (5 + 5 + 6) summed to an apparent
// 16 and looked healthy. They were not: a learner practising TEF Writing at B1 saw
// only the TEF-tagged items. Counting at the served granularity is the whole point
// of this gate; counting at (level, skill) is what let the gap hide.
//
// The pool rule is NOT re-implemented here. It is inFamilyPool() from
// src/lib/french/pool.ts — the same function the runner calls in production and
// the reachability proof imports. If the rule changes, the product, the proof and
// this gate move together; they cannot quietly disagree.
//
// SOURCE: scripts/seed/*.ts, the on-disk bank that seeds the database. Verified
// against production cell-by-cell by scripts/seed-vs-live.ts (24 cells, 0
// mismatches), so counting the seed source is counting what ships.
//
// Run: npx tsx scripts/items/rule7-gate.mts

import type { CefrLevel, ExamFamily, FrenchSkill } from "@prisma/client";
import { ITEMS as A1 } from "../seed/a1";
import { ITEMS as A2 } from "../seed/a2";
import { ITEMS as B1 } from "../seed/b1";
import { ITEMS as B2 } from "../seed/b2";
import { ITEMS as C1 } from "../seed/c1";
import { ITEMS as C2 } from "../seed/c2";
import { EXAM_FAMILIES } from "../../src/lib/french/exams";
import { LEVELS } from "../../src/lib/french/types";
import { inFamilyPool } from "../../src/lib/french/pool";

const MIN_PER_MODULE = 15;

const SKILLS: FrenchSkill[] = [
  "COMPREHENSION_ECRITE",
  "COMPREHENSION_ORALE",
  "EXPRESSION_ECRITE",
  "EXPRESSION_ORALE",
];

const ALL = [...A1, ...A2, ...B1, ...B2, ...C1, ...C2].filter((i) => i.active !== false);

// exams.ts family ("DELF-DALF") -> prisma ExamFamily enum ("DELF_DALF").
const famEnum = (f: string): ExamFamily => (f === "DELF-DALF" ? "DELF_DALF" : (f as ExamFamily));

const violations: string[] = [];
let cells = 0;

for (const familyLabel of EXAM_FAMILIES) {
  const fam = famEnum(familyLabel);
  for (const level of LEVELS as CefrLevel[]) {
    for (const skill of SKILLS) {
      const n = ALL.filter(
        (it) => it.level === level && it.skill === skill && inFamilyPool(it, fam),
      ).length;
      cells++;
      if (n < MIN_PER_MODULE) {
        violations.push(`${familyLabel.padEnd(10)} ${level}  ${skill.padEnd(22)} ${n} / ${MIN_PER_MODULE}`);
      }
    }
  }
}

if (violations.length) {
  console.error(`\n✗ RULE #7 GATE FAILED — ${violations.length} of ${cells} modules below ${MIN_PER_MODULE} items.\n`);
  console.error("  Counted per (exam family x level x skill) — what a learner actually practises.\n");
  for (const v of violations) console.error(`  ${v}`);
  console.error("\n  Top up with ORIGINAL, level-appropriate tasks. Never pad, never re-label an");
  console.error("  item into another family, and never copy an official bank.\n");
  process.exit(1);
}

console.log(`✓ Rule #7 gate: all ${cells} modules hold >= ${MIN_PER_MODULE} items (exam family x level x skill).`);
