// RR-401 · proofs for the AlmiFrench content factory: parser, word counts against the pack's table, the grammar gate (French
// answers, English notes), the NCLC 5 note check, idempotence, blocked items staying out, the owner's seed (dry run writes
// nothing; the write is idempotent), and the BUILD's seed never inserting a factory item. Offline and free: LanguageTool's
// answers are fixtures here; the database is an in-memory fake that runs the real seed path.
//   npx tsx scripts/factory/factory.test.ts
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parsePack, countTaskWords, taskId } from "../../src/lib/factory/pack";
import { importPack, itemKey, mergeData, MODEL_ANSWER_LABEL, TRADEMARK_LINE, type FactoryData } from "../../src/lib/factory/import";
import type { Lt, LtMatch } from "../../src/lib/factory/grammar-gate";
import { planSeed, runSeed, seedRowFor, shouldUpdate, shouldWrite, type LiveRow, type SeedRow } from "../../src/lib/factory/seed-plan";
import { expectedCells, keptKeys } from "../../src/lib/factory/build-seed";
import { FACTORY_DATA, FACTORY_KEYS } from "../../src/lib/factory/bank";
import { TCF_EXPRESSION } from "../../src/lib/french/exam-structure";
import { ITEMS as A1 } from "../seed/a1";
import { ITEMS as A2 } from "../seed/a2";
import { ITEMS as B1 } from "../seed/b1";
import { ITEMS as B2 } from "../seed/b2";
import { ITEMS as C1 } from "../seed/c1";
import { ITEMS as C2 } from "../seed/c2";

let passed = 0, failed = 0;
const tests: [string, () => void | Promise<void>][] = [];
const t = (name: string, fn: () => void | Promise<void>) => tests.push([name, fn]);

const FILE = "AlmiFrench_Pack1.md";
const MD = readFileSync(join(process.cwd(), "scripts", "factory", "fixtures", FILE), "utf8");
const pack = parsePack(MD, FILE);
const BANK = [...A1, ...A2, ...B1, ...B2, ...C1, ...C2];
const BANK_KEYS = BANK.map((i) => itemKey({ level: String(i.level), skill: String(i.skill), title: String(i.title) }));

const clean: Lt = () => [];
const flag = (text: string, word: string, category = "TYPOS", issueType = "misspelling", id = "FR_SPELLING_RULE"): LtMatch[] => {
  const i = text.indexOf(word); if (i < 0) return [];
  return [{ offset: i, length: word.length, message: "flagged", replacements: [{ value: "x" }], rule: { id, issueType, category: { id: category } } }];
};
/** the one finding LanguageTool really returned for Pack 1 (8 Nov 2026, cached): COND_VS_FUTUR on Tâche 2.2 NCLC 9+ */
const recorded: Lt = (text, lang) => (lang === "fr" && text.includes("Si des contraintes budgétaires expliquent") ? flag(text, "expliquent", "CAT_GRAMMAIRE", "uncategorized", "COND_VS_FUTUR") : []);

console.log("parser and word counts");
t("parses Pack 1: 6 written tasks + 1 oral model, 16 model answers, 15 table rows, front matter read", () => {
  assert.equal(pack.tasks.filter((x) => x.kind === "ecrite").length, 6);
  assert.equal(pack.tasks.filter((x) => x.kind === "orale").length, 1);
  assert.equal(pack.tasks.reduce((n, x) => n + x.models.length, 0), 16);
  assert.equal(pack.wordTable.length, 15);
  assert.equal(pack.packNo, 1); assert.equal(pack.author, "beta-g"); assert.equal(pack.date, "2026-11-08");
  for (const x of pack.tasks) for (const m of x.models) assert.ok(m.note.length > 20, `${x.ref} NCLC ${m.level} has a note`);
});
t("word counts recomputed equal EVERY row of the pack's own table (15/15)", () => {
  let n = 0;
  for (const x of pack.tasks.filter((y) => y.kind === "ecrite")) for (const m of x.models) {
    const row = pack.wordTable.find((r) => r.ref === x.ref && r.level === m.level)!;
    assert.ok(row, `${x.ref} NCLC ${m.level} has a table row`);
    assert.equal(countTaskWords(m.text), row.words, `${x.ref} NCLC ${m.level}`); n++;
  }
  assert.equal(n, 15);
});
t("text is copied exactly: every model answer is a substring of the pack", () => {
  const src = MD.replace(/\r\n/g, "\n");
  for (const x of pack.tasks) for (const m of x.models) { assert.ok(src.includes(m.text)); assert.ok(src.includes(m.note)); }
});

console.log("importer and gates");
const r1 = importPack(pack, MD, clean, BANK_KEYS);
t("clean import: 7 items, 16 model answers, nothing blocked, no duplicate of the bank", () => {
  assert.equal(r1.data.items.length, 7); assert.equal(r1.data.items.reduce((n, i) => n + i.payload.models.length, 0), 16);
  assert.equal(r1.blocked.length, 0); assert.equal(r1.skippedDuplicates.length, 0);
});
t("the committed data equals a fresh import with LanguageTool's recorded answers (beta-g exempted 2.2's flag: 16 models)", () => {
  const r = importPack(pack, MD, recorded, BANK_KEYS);
  assert.equal(r.blocked.length, 0);
  assert.equal(r.data.items.reduce((n, i) => n + i.payload.models.length, 0), 16);
  assert.equal(JSON.stringify(mergeData(null, r.data)), JSON.stringify(FACTORY_DATA));
});
t("beta-g's COND_VS_FUTUR exemption is exact: the same rule elsewhere, or another rule on the same word, still blocks", () => {
  const elsewhere = importPack(pack, MD, (text, lang) => (lang === "fr" ? flag(text, "inoubliables", "CAT_GRAMMAIRE", "uncategorized", "COND_VS_FUTUR") : []), BANK_KEYS);
  assert.equal(elsewhere.blocked.length, 1);
  const otherRule = importPack(pack, MD, (text, lang) => (lang === "fr" && text.includes("Si des contraintes budgétaires expliquent") ? flag(text, "expliquent", "CAT_GRAMMAIRE", "uncategorized", "OTHER_RULE") : []), BANK_KEYS);
  assert.equal(otherRule.blocked.length, 1); assert.match(otherRule.blocked[0].where, /Tâche 2\.2 · NCLC 9\+/);
});
t("idempotent: importing again, and merging into itself, gives byte-identical data", () => {
  const r2 = importPack(parsePack(MD, FILE), MD, clean, BANK_KEYS);
  assert.equal(JSON.stringify(r2.data), JSON.stringify(r1.data));
  assert.equal(JSON.stringify(mergeData(r1.data, r2.data)), JSON.stringify(mergeData(null, r1.data)));
});
t("stable ids, labels and mapping: TCF, B2, the product's task types, the TCF word ranges and oral timing", () => {
  assert.equal(taskId(1, "2.1"), "fac-fr-p1-2-1");
  assert.equal(r1.data.label, MODEL_ANSWER_LABEL); assert.equal(r1.data.trademark, TRADEMARK_LINE);
  const valid = TCF_EXPRESSION.ecrite.map((s) => `${s.wordMin}-${s.wordMax}`);
  for (const i of r1.data.items) {
    assert.equal(i.examFamily, "TCF"); assert.equal(i.level, "B2");
    if (i.skill === "EXPRESSION_ECRITE") { assert.equal(i.taskType, "WRITING_TASK"); assert.ok(valid.includes(`${i.payload.wordMin}-${i.payload.wordMax}`), i.title); }
    else { assert.equal(i.taskType, "SPEAKING_TASK"); assert.equal(`${i.payload.prepSeconds}/${i.payload.speakSeconds}`, "0/270"); }
  }
  const t11 = r1.data.items.find((i) => i.factoryId === "fac-fr-p1-1-1")!;
  assert.deepEqual(t11.payload.models.map((m) => m.level), ["NCLC 9+", "NCLC 7", "NCLC 5"]);
  assert.equal(`${t11.payload.situation} ${t11.payload.instruction}`, pack.tasks[0].promptLines.join(" "));
});
t("a French spelling error in an NCLC 9+ answer blocks that answer only; the item keeps its other levels", () => {
  const r = importPack(pack, MD, (text, lang) => (lang === "fr" ? flag(text, "inoubliables") : []), BANK_KEYS);
  assert.equal(r.blocked.length, 1); assert.match(r.blocked[0].where, /1\.2 · NCLC 9\+/);
  const it = r.data.items.find((i) => i.factoryId === "fac-fr-p1-1-2")!;
  assert.deepEqual(it.payload.models.map((m) => m.level), ["NCLC 7"]);
});
t("a French GRAMMAR finding (CAT_GRAMMAIRE, issueType uncategorized) blocks too", () => {
  const r = importPack(pack, MD, (text, lang) => (lang === "fr" ? flag(text, "inoubliables", "CAT_GRAMMAIRE", "uncategorized", "X") : []), BANK_KEYS);
  assert.equal(r.blocked.length, 1);
});
t("a blocked TASK stays out: the item is not imported, and the seed rows do not contain it", () => {
  const r = importPack(pack, MD, (text, lang) => (lang === "fr" ? flag(text, "pique-nique au parc") : []), BANK_KEYS);
  assert.ok(r.blocked.some((b) => /1\.1 · task text/.test(b.where)));
  assert.equal(r.data.items.length, 6);
  assert.ok(!r.data.items.map(seedRowFor).some((s) => /pique-nique/.test(s.title)));
});
t("NCLC 5 answers are not grammar-checked (their mistakes are on purpose)", () => {
  const r = importPack(pack, MD, (text, lang) => (lang === "fr" ? flag(text, "Dites moi") : []), BANK_KEYS);
  assert.equal(r.blocked.length, 0);
});
t("an NCLC 5 note that names no mistake blocks", () => {
  const bad = MD.replace("**Notes (NCLC 5):** under 60 words, and the place is vague. Errors: a missing accent (*a midi* → *à midi*), *le manger* (→ *à manger* or *de la nourriture*), the wrong gender (*le boisson* → *les boissons*), and a missing hyphen (*Dites moi* → *Dites-moi*).", "**Notes (NCLC 5):** under 60 words, and the place is vague; several errors.");
  assert.notEqual(bad, MD);
  const r = importPack(parsePack(bad, FILE), bad, clean, BANK_KEYS);
  assert.ok(r.blocked.some((b) => /1\.1 · NCLC 5/.test(b.where) && /names no error/.test(b.reason)));
});
t("a word count that differs from the table blocks (107 → 108)", () => {
  const bad = MD.replace("| Tâche 1.1 | NCLC 9+ | 107 |", "| Tâche 1.1 | NCLC 9+ | 108 |");
  const r = importPack(parsePack(bad, FILE), bad, clean, BANK_KEYS);
  assert.ok(r.blocked.some((b) => /1\.1 · NCLC 9\+/.test(b.where) && /word count differs/.test(b.reason)));
});
t("English notes: a French *italic* never blocks; British-only never blocks; both British and American block", () => {
  const italic = importPack(pack, MD, (text, lang) => (lang !== "fr" ? flag(text, "boisson") : []), BANK_KEYS);
  assert.equal(italic.blocked.length, 0);
  const gbOnly = importPack(pack, MD, (text, lang) => (lang === "en-GB" ? flag(text, "precise") : []), BANK_KEYS);
  assert.equal(gbOnly.blocked.length, 0);
  const both = importPack(pack, MD, (text, lang) => (lang !== "fr" ? flag(text, "precise") : []), BANK_KEYS);
  assert.ok(both.blocked.some((b) => /note/.test(b.where)));
});
t("a factory item whose (level, skill, title) is already in the bank is skipped, never imported twice", () => {
  const key = itemKey(r1.data.items[0]);
  const r = importPack(pack, MD, clean, [...BANK_KEYS, key]);
  assert.equal(r.skippedDuplicates.length, 1); assert.equal(r.data.items.length, 6);
});

console.log("owner's seed (in-memory database, real seed path)");
const fakeDb = () => {
  const rows: (SeedRow & { id: string; active: boolean })[] = [];
  return {
    rows,
    db: {
      find: async (rs: SeedRow[]) => rows.filter((l) => rs.some((r) => itemKey(r) === itemKey(l))).map((l) => ({ id: l.id, level: l.level, skill: l.skill, title: l.title, taskType: l.taskType, examFamily: l.examFamily, prompt: l.prompt, payload: JSON.parse(JSON.stringify(l.payload)), active: l.active } as LiveRow)),
      create: async (r: SeedRow) => { rows.push({ ...JSON.parse(JSON.stringify(r)), id: `row${rows.length}`, active: true }); },
    },
  };
};
const seedRows = FACTORY_DATA.items.map(seedRowFor);
t("the write needs BOTH --confirm AND FACTORY_WRITE=yes", () => {
  assert.equal(shouldWrite([], {}), false);
  assert.equal(shouldWrite(["--confirm"], {}), false);
  assert.equal(shouldWrite([], { FACTORY_WRITE: "yes" }), false);
  assert.equal(shouldWrite(["--confirm"], { FACTORY_WRITE: "no" }), false);
  assert.equal(shouldWrite(["--confirm"], { FACTORY_WRITE: "yes" }), true);
});
t("dry run writes nothing", async () => {
  const f = fakeDb();
  const res = await runSeed(f.db, seedRows, false);
  assert.equal(res.create.length, 7); assert.equal(res.written, 0); assert.equal(f.rows.length, 0);
});
t("the write is idempotent: first run creates 7, the second creates 0 and reports 7 equal", async () => {
  const f = fakeDb();
  const a = await runSeed(f.db, seedRows, true);
  assert.equal(a.written, 7); assert.equal(f.rows.length, 7);
  const b = await runSeed(f.db, seedRows, true);
  assert.equal(b.written, 0); assert.equal(b.equal.length, 7); assert.equal(f.rows.length, 7);
});
t("a live row that differs is listed and NOT changed", () => {
  const live: LiveRow[] = [{ id: "x", level: seedRows[0].level, skill: seedRows[0].skill, title: seedRows[0].title, taskType: seedRows[0].taskType, examFamily: "TCF", prompt: "changed", payload: seedRows[0].payload, active: true }];
  const p = planSeed(seedRows, live);
  assert.equal(p.create.length, 6); assert.equal(p.differs.length, 1);
});

console.log("RR-404: jsonb key order, the short diff, and the owner's update mode");
/** a jsonb read-back: Postgres returns object keys in its own order (shorter keys first, then by bytes), not the order written */
const jsonbOrder = (v: unknown): unknown => Array.isArray(v) ? v.map(jsonbOrder) : v && typeof v === "object" ? Object.fromEntries(Object.keys(v).sort((a, b) => a.length - b.length || (a < b ? -1 : a > b ? 1 : 0)).map((k) => [k, jsonbOrder((v as Record<string, unknown>)[k])])) : v;
const liveOf = (r: SeedRow, id: string, over: Partial<LiveRow> = {}): LiveRow => ({ id, level: r.level, skill: r.skill, title: r.title, taskType: r.taskType, examFamily: r.examFamily, prompt: r.prompt, payload: jsonbOrder(JSON.parse(JSON.stringify(r.payload))), active: true, ...over });
t("🔴 a row read back from jsonb (keys reordered) is EQUAL, not 'different'", () => {
  const live = seedRows.map((r, i) => liveOf(r, `row${i}`));
  assert.notEqual(JSON.stringify(live[0].payload), JSON.stringify(seedRows[0].payload), "the fake must reorder keys, or this test proves nothing");
  const p = planSeed(seedRows, live);
  assert.equal(p.equal.length, 7); assert.equal(p.differs.length, 0);
});
t("a real difference is listed with a short diff naming the field", () => {
  const r = seedRows[0], payload = JSON.parse(JSON.stringify(r.payload)); payload.models[0].text = `${payload.models[0].text} AJOUT`;
  const p = planSeed([r], [liveOf(r, "x", { payload, prompt: `${r.prompt}!` })]);
  assert.equal(p.differs.length, 1); const d = p.differs[0].diff.join("\n");
  assert.match(d, /^prompt at \d+:/m); assert.match(d, /payload\.models\[0\]\.text at \d+:/); assert.ok(d.length < 600, d);
});
t("the update needs BOTH --confirm AND FACTORY_UPDATE=yes (FACTORY_WRITE does not update)", () => {
  assert.equal(shouldUpdate([], {}), false); assert.equal(shouldUpdate(["--confirm"], {}), false);
  assert.equal(shouldUpdate([], { FACTORY_UPDATE: "yes" }), false); assert.equal(shouldUpdate(["--confirm"], { FACTORY_WRITE: "yes" }), false);
  assert.equal(shouldUpdate(["--confirm"], { FACTORY_UPDATE: "yes" }), true);
});
t("update mode brings ONLY the 7 differing rows to the pack, by id; other rows and the bank are untouched; a rerun changes nothing", async () => {
  const other = { id: "bank1", level: "B1", skill: "EXPRESSION_ECRITE", title: "not a factory item", taskType: "WRITING_TASK", examFamily: "TCF", prompt: "p", payload: { a: 1 }, active: true } as LiveRow;
  const live: LiveRow[] = [other, ...seedRows.map((r, i) => liveOf(r, `row${i}`, { prompt: `${r.prompt} (old)` }))], calls: string[] = [];
  const db = {
    find: async (rs: SeedRow[]) => live.filter((l) => rs.some((r) => itemKey(r) === itemKey(l))),
    create: async () => { calls.push("create"); },
    update: async (id: string, r: SeedRow) => { calls.push(`update ${id}`); const l = live.find((x) => x.id === id)!; Object.assign(l, { taskType: r.taskType, examFamily: r.examFamily, prompt: r.prompt, payload: jsonbOrder(JSON.parse(JSON.stringify(r.payload))), active: true }); },
  };
  const dry = await runSeed(db, seedRows, false, false);
  assert.equal(dry.differs.length, 7); assert.equal(calls.length, 0);
  const a = await runSeed(db, seedRows, false, true);
  assert.equal(a.updated, 7); assert.deepEqual(calls, seedRows.map((_, i) => `update row${i}`));
  assert.deepEqual(other, { id: "bank1", level: "B1", skill: "EXPRESSION_ECRITE", title: "not a factory item", taskType: "WRITING_TASK", examFamily: "TCF", prompt: "p", payload: { a: 1 }, active: true });
  const b = await runSeed(db, seedRows, false, true);
  assert.equal(b.updated, 0); assert.equal(b.equal.length, 7); assert.equal(calls.length, 7);
});

console.log("the BUILD's seed (scripts/seed/append.ts, run by npm run build as seed:prod)");
t("🔴 RR-404: append.ts's insert loop skips any factory key before it can create a row", () => {
  const src = readFileSync(join(process.cwd(), "scripts", "seed", "append.ts"), "utf8");
  assert.match(src, /for \(const item of ALL\) \{\s*\/\/[^\n]*\n\s*if \(FACTORY_KEYS\.has\(key\(\{ level: String\(item\.level\), skill: String\(item\.skill\), title: String\(item\.title\) \}\)\)\) continue;\s*const exists/);
});
t("no factory item shares append.ts's key with the bank", () => {
  for (const k of FACTORY_KEYS) assert.ok(!BANK_KEYS.includes(k), k);
});
t("append.ts INSERTS only the bank: its insert loop walks ALL, and ALL is built from scripts/seed/*.ts only", () => {
  const src = readFileSync(join(process.cwd(), "scripts", "seed", "append.ts"), "utf8");
  assert.match(src, /const ALL: Prisma\.FrenchItemCreateManyInput\[\] = \[\.\.\.A1, \.\.\.A2, \.\.\.B1, \.\.\.B2, \.\.\.C1, \.\.\.C2\];/);
  assert.match(src, /for \(const item of ALL\) \{/);
  assert.equal((src.match(/frenchItem\.create\(/g) ?? []).length, 1);
  assert.ok(!/FACTORY_ITEMS|FACTORY_DATA/.test(src), "append.ts must not read the factory rows themselves");
});
t("reconcile keeps owner-seeded factory rows (they are not 'absent from the bank')", () => {
  const kept = keptKeys(BANK.map((i) => ({ level: String(i.level), skill: String(i.skill), title: String(i.title) })), FACTORY_KEYS);
  for (const k of FACTORY_KEYS) assert.ok(kept.has(k), k);
});
t("verify counts factory rows only when they are live: before the owner's seed the check is unchanged", () => {
  const bank = [{ level: "B2", skill: "EXPRESSION_ECRITE" }, { level: "B2", skill: "EXPRESSION_ECRITE" }];
  assert.deepEqual(expectedCells(bank, []), { "B2.EXPRESSION_ECRITE": 2 });
  assert.deepEqual(expectedCells(bank, [{ level: "B2", skill: "EXPRESSION_ECRITE" }]), { "B2.EXPRESSION_ECRITE": 3 });
});

(async () => {
  for (const [name, fn] of tests) {
    try { await fn(); passed++; console.log(`  PASS  ${name}`); }
    catch (e) { failed++; process.exitCode = 1; console.log(`  FAIL  ${name}\n        ${String((e as Error).message).split("\n")[0]}`); }
  }
  console.log(`\n${passed} passed, ${failed} failed`);
})();
