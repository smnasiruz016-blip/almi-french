// Read-only: how much headroom does each module have above the Rule #7 floor?
// A bank sitting exactly at 15 everywhere passes today and fails the moment the
// floor moves. Reported, not enforced — this is a brittleness signal, not a defect.
//
// Run: npx tsx scripts/headroom-check.ts

import { ITEMS as A1 } from "./seed/a1";
import { ITEMS as A2 } from "./seed/a2";
import { ITEMS as B1 } from "./seed/b1";
import { ITEMS as B2 } from "./seed/b2";
import { ITEMS as C1 } from "./seed/c1";
import { ITEMS as C2 } from "./seed/c2";
import { EXAM_FAMILIES } from "../src/lib/french/exams";
import { LEVELS } from "../src/lib/french/types";
import { inFamilyPool } from "../src/lib/french/pool";
import type { CefrLevel, ExamFamily, FrenchSkill } from "@prisma/client";

const ALL = [...A1, ...A2, ...B1, ...B2, ...C1, ...C2].filter((i) => i.active !== false);
const SKILLS: FrenchSkill[] = ["COMPREHENSION_ECRITE", "COMPREHENSION_ORALE", "EXPRESSION_ECRITE", "EXPRESSION_ORALE"];
const famEnum = (f: string): ExamFamily => (f === "DELF-DALF" ? "DELF_DALF" : (f as ExamFamily));

const dist: Record<number, number> = {};
let cells = 0;
let exactly15 = 0;
const tight: string[] = [];

for (const f of EXAM_FAMILIES) {
  for (const level of LEVELS as CefrLevel[]) {
    for (const skill of SKILLS) {
      const n = ALL.filter(
        (i) => i.level === level && i.skill === skill && inFamilyPool(i, famEnum(f)),
      ).length;
      cells++;
      dist[n] = (dist[n] ?? 0) + 1;
      if (n === 15) {
        exactly15++;
        tight.push(`${f} ${level} ${skill}`);
      }
    }
  }
}

console.log(`cells: ${cells} | exactly 15 (zero headroom): ${exactly15}`);
console.log(
  "size distribution: " +
    Object.entries(dist)
      .sort((a, b) => Number(a[0]) - Number(b[0]))
      .map(([k, v]) => `${k}→${v}`)
      .join("  "),
);
if (tight.length) {
  console.log("\nzero-headroom modules (fail immediately if the floor rises):");
  for (const t of tight) console.log(`  ${t}`);
}
