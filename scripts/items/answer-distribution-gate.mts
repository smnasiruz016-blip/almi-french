// ANSWER-DISTRIBUTION GATE — is the correct answer gameable from its position?
//
// French items are DB-seeded from scripts/seed/*.ts and served with options in ARRAY
// ORDER (Composer renders q.options top-to-bottom, showing only o.text; the id is the
// internal radio value, never displayed). So the axis a learner games is the POSITION
// of the correct option in the array — if the correct option is almost always first,
// "pick the top one" scores high knowing no French. This gate reads the seed bank (the
// source the DB is reconciled to) and flags gameable key positions per served surface.
//
// TWO rules, because a small section can be gameable in a way a spread threshold misses:
//   1. SPREAD (needs volume) — the top position holds more than its fair share.
//      Requires n ≥ MIN_N: below that a lean is as likely chance as design.
//   2. EXTREME SKEW (needs almost none) — one value holds ≥ EXTREME_SKEW of the section
//      (incl. all-same), at any n ≥ EXTREME_MIN_N. Catches small skewed sections MIN_N hides.
//   MULTI (MCQ)      — POSITION CLUSTERING, threshold CLUSTER.
//   BINARY (VRAI_FAUX) — BALANCE, threshold BINARY_SKEW.
//   MATCHING is not single-index gameable and is excluded.
//
// Scope = one served surface `${level}::${skill}::${taskType}` (Reading/Listening are
// exam-family-shared, so level+skill+task is the pool a learner actually practises).
//
// Run: npm run gate:answer-distribution

import { ITEMS as A1 } from "../seed/a1";
import { ITEMS as A2 } from "../seed/a2";
import { ITEMS as B1 } from "../seed/b1";
import { ITEMS as B2 } from "../seed/b2";
import { ITEMS as C1 } from "../seed/c1";
import { ITEMS as C2 } from "../seed/c2";

const CLUSTER = 0.6; // a MULTI position past this share is clustered (spread rule)
const BINARY_SKEW = 0.75; // a VRAI_FAUX value past this share is skewed (spread rule)
const MIN_N = 6; // spread rule: too few answers below this to tell a pattern from chance
const EXTREME_SKEW = 0.8; // extreme-skew rule: one value at/above this share is gameable…
const EXTREME_MIN_N = 3; // …at any section of at least this many answers (incl. all-same)

type Row = { scope: string; kind: string; n: number; share: number; top: string; binary: boolean; reason: "spread" | "extreme" | null };

const all: any[] = [...A1, ...A2, ...B1, ...B2, ...C1, ...C2];

// Group positional answers by surface + kind. MCQ → array index of the correct option;
// VRAI_FAUX → the true/false value. MATCHING is skipped (options unused by design).
const byKey = new Map<string, { values: (number | string)[]; binary: boolean }>();
for (const it of all) {
  const qs: any[] = it.payload?.questions ?? [];
  for (const q of qs) {
    const isBin = q.kind === "truefalse" || q.answer === "true" || q.answer === "false";
    if (isBin) {
      const key = `${it.level}::${it.skill}::${it.taskType}::VRAI_FAUX`;
      (byKey.get(key) ?? byKey.set(key, { values: [], binary: true }).get(key)!).values.push(q.answer);
    } else if (Array.isArray(q.options)) {
      if (it.taskType === "MATCHING") continue; // options intentionally unused
      const pos = q.options.findIndex((o: any) => o.id === q.answer);
      if (pos < 0) continue; // answer not among options → not a positional key
      const key = `${it.level}::${it.skill}::${it.taskType}::MCQ`;
      (byKey.get(key) ?? byKey.set(key, { values: [], binary: false }).get(key)!).values.push(pos);
    }
  }
}

const rows: Row[] = [];
for (const [key, { values, binary }] of byKey) {
  const n = values.length;
  if (n < EXTREME_MIN_N) continue;
  const count = new Map<number | string, number>();
  for (const v of values) count.set(v, (count.get(v) ?? 0) + 1);
  let topKey: number | string = "";
  let topN = 0;
  for (const [k, v] of count) if (v > topN) [topKey, topN] = [k, v];
  const share = topN / n;
  const spread = n >= MIN_N && share > (binary ? BINARY_SKEW : CLUSTER);
  const extreme = share >= EXTREME_SKEW;
  const reason = spread ? "spread" : extreme ? "extreme" : null;
  const scope = key.slice(0, key.lastIndexOf("::"));
  rows.push({ scope, kind: binary ? "VRAI_FAUX" : "MCQ", n, share, top: binary ? String(topKey) : `pos ${topKey}`, binary, reason });
}

const flagged = rows.filter((r) => r.reason !== null).sort((a, b) => b.share - a.share);

if (flagged.length > 0) {
  console.error(`\n✗ ANSWER-DISTRIBUTION GATE FAILED — ${flagged.length} of ${rows.length} objective sections are gameable from position.\n`);
  for (const r of flagged) {
    const rule = r.reason === "extreme" ? `extreme ≥80% @ n≥3` : r.binary ? "spread binary >75%" : "spread multi >60%";
    console.error(`  ${Math.round(r.share * 100)}% → ${r.top}   ${r.scope}  (n=${r.n}, ${rule})`);
  }
  console.error(`\n  Fix: permute order-independent MCQ deterministically (reorder options; the id-keyed answer travels with its option), author-balance VRAI_FAUX — preserve single-answer and decidability, never make an item wrong to satisfy a count.\n`);
  process.exit(1);
}

console.log(`✓ ANSWER-DISTRIBUTION GATE: ${rows.length} objective sections scanned; no gameable position pattern.`);
