// CONFORMANCE GATE — does each item match a REAL task of its own exam?
//
// Rule #7 counts items. It cannot tell whether an item belongs to the exam it is
// filed under. That gap shipped: 53 of 105 TEF items carried parameters no TEF task
// has — A1/A2 TEF items used DELF word counts (20–35, 40–60 mots) and DELF timings
// (prep 10 s / speak 60 s); TEF C2 écrite asked for 450–550 mots, which matches no
// TEF task at all; and TEF C2 orale used prep 0 s / speak 270 s, which is TCF
// Tâche 3's timing sitting inside a TEF item.
//
// ROOT CAUSE, and why this gate is the actual fix: TEF and TCF had NO structure
// metadata in this repo until tef-tcf-structure.ts was written. Items were authored
// per level on DELF-shaped assumptions because nothing recorded what a TEF or TCF
// task IS. Now that it is recorded, the mismatch is machine-checkable — so check it,
// rather than trusting the next author to remember.
//
// Without this gate, topping every cell to 15 would turn Rule #7 GREEN while half
// the bank taught learners a format their exam does not use. A green gate measuring
// the wrong thing is the failure mode this product keeps having; this closes it for
// the item-vs-exam class.
//
// ── HOW EACH FAMILY IS CHECKED, and why they differ ──────────────────────────
// TEF and TCF are checked STRICTLY. They are single fixed-format exams (see
// tef-tcf-structure.ts): every written task has an exact word range and every
// spoken task an exact prep/speak pair, identical at every CEFR level. An item
// either matches one of those tasks or it is malformed. No tolerance is warranted.
//
// DELF is checked as a BAND. France Éducation International states its productions
// as "about 40 words", "about 160 words" — an approximation, not a range — so a
// hard equality test would fail correct content. The bands below bracket the FEI
// figure generously; they exist to catch an item authored to the WRONG LEVEL's
// task (a 40-word item filed at B2), not to police ±10 words.
//
// DELF ORAL TIMINGS ARE NOT CHECKED, deliberately. FEI publishes the duration of
// the whole épreuve (e.g. B1 "15 min" across 3 parts), not a per-item speaking
// time. Our prepSeconds/speakSeconds are a PRACTICE convention, so there is no
// authority to check them against. Inventing a rule here would be the same
// fabrication this gate exists to prevent.
//
// Run: npx tsx scripts/items/conformance-gate.mts

import type { CefrLevel, ExamFamily, FrenchSkill } from "@prisma/client";
import { ITEMS as A1 } from "../seed/a1";
import { ITEMS as A2 } from "../seed/a2";
import { ITEMS as B1 } from "../seed/b1";
import { ITEMS as B2 } from "../seed/b2";
import { ITEMS as C1 } from "../seed/c1";
import { ITEMS as C2 } from "../seed/c2";
import { TEF_EXPRESSION, TCF_EXPRESSION } from "../../src/lib/french/tef-tcf-structure";

const ALL = [...A1, ...A2, ...B1, ...B2, ...C1, ...C2].filter((i) => i.active !== false);

/** Valid (wordMin,wordMax) and (prep,speak) pairs, derived from the recorded
 *  structure rather than restated — if the structure file changes, so does this. */
const validWritten = (fam: "TEF" | "TCF") =>
  (fam === "TEF" ? TEF_EXPRESSION.ecrite : TCF_EXPRESSION.ecrite).map(
    (t) => `${t.wordMin}-${t.wordMax}`,
  );
const validSpoken = (fam: "TEF" | "TCF") =>
  (fam === "TEF" ? TEF_EXPRESSION.orale : TCF_EXPRESSION.orale).map(
    (t) => `${t.prepSeconds}/${t.speakSeconds}`,
  );

/** DELF written bands, bracketing the FEI "about N words" figure per level.
 *  Purpose: catch an item authored to another level's task, not ±10 words. */
const DELF_BAND: Partial<Record<CefrLevel, [number, number]>> = {
  A1: [10, 60],    // FEI: "a message of about 40 words"
  A2: [30, 100],   // FEI: "two productions of about 60 words each"
  B1: [130, 210],  // FEI: "one production of about 160 words"
  B2: [210, 330],  // FEI: "one production of about 250 words"
};

type Row = { level?: unknown; skill?: unknown; examFamily?: unknown; title?: unknown; payload?: unknown };

const violations: string[] = [];
let checked = 0;
let skipped = 0;

for (const raw of ALL as Row[]) {
  const skill = raw.skill as FrenchSkill;
  if (skill !== "EXPRESSION_ECRITE" && skill !== "EXPRESSION_ORALE") continue;

  const fam = raw.examFamily as ExamFamily | null;
  if (!fam) continue; // shared items carry no family; expression items always do
  const level = raw.level as CefrLevel;
  const title = String(raw.title ?? "(untitled)");
  const p = (raw.payload ?? {}) as Record<string, unknown>;

  if (fam === "TEF" || fam === "TCF") {
    checked++;
    if (skill === "EXPRESSION_ECRITE") {
      const got = `${p.wordMin}-${p.wordMax}`;
      const ok = validWritten(fam);
      if (!ok.includes(got)) {
        violations.push(`${fam.padEnd(4)} ${level} ÉCRITE  ${got.padEnd(9)} — no such task (valid: ${ok.join(" | ")})\n        ${title}`);
      }
    } else {
      const got = `${p.prepSeconds}/${p.speakSeconds}`;
      const ok = validSpoken(fam);
      if (!ok.includes(got)) {
        violations.push(`${fam.padEnd(4)} ${level} ORALE   ${got.padEnd(9)} — no such task (valid: ${ok.join(" | ")})\n        ${title}`);
      }
    }
    continue;
  }

  if (fam === "DELF_DALF") {
    if (skill === "EXPRESSION_ORALE") { skipped++; continue; } // see header
    const band = DELF_BAND[level];
    if (!band) { skipped++; continue; }                        // DALF C1/C2: no verified structure
    checked++;
    const min = Number(p.wordMin);
    const max = Number(p.wordMax);
    if (!(min >= band[0] && max <= band[1])) {
      violations.push(`DELF ${level} ÉCRITE  ${min}-${max}     — outside the FEI band for this level (${band[0]}–${band[1]})\n        ${title}`);
    }
  }
}

if (violations.length) {
  console.error(`\n✗ CONFORMANCE GATE FAILED — ${violations.length} item(s) do not match any task of their own exam.\n`);
  for (const v of violations) console.error(`  ${v}`);
  console.error(`\n  ${violations.length} of ${checked} checked. Fix the ITEM to a real task of its exam —`);
  console.error("  adjust the parameters AND the prompt so the situation genuinely supports the");
  console.error("  task. Never re-file an item under another family to make this pass.\n");
  process.exit(1);
}

console.log(`✓ Conformance gate: ${checked} expression items match a real task of their exam.`);
console.log(`  (${skipped} skipped: DELF oral timings and DALF C1/C2 have no verified structure to check against.)`);
