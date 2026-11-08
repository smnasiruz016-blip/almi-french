// RR-401 · the AlmiFrench factory importer. Reads a factory pack (.md, written and checked by beta-g), gates every item, and
// writes:
//   - src/content/factory/fr-factory-items.json  (merged by stable id, so re-importing changes nothing)
//   - the grammar-gate section for beta-g          (--report=<path>, a whole file of its own; never another product's file)
// It touches NO database. The rows reach the database only through scripts/factory/seed-fr-factory.ts, run by the owner.
// Grammar: LanguageTool's free public API (no key, no cost), at most 1 request every 3.5 s, every answer cached on disk
// (FACTORY_LT_CACHE, default outside the repo) so a re-import makes no request at all.
// Run: npx tsx scripts/factory/import-fr-pack.mts <pack.md> [--report=<path>]
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parsePack } from "../../src/lib/factory/pack";
import { importPack, itemKey, mergeData, type FactoryData } from "../../src/lib/factory/import";
import type { Lang, LtMatch } from "../../src/lib/factory/grammar-gate";
import { renderReport } from "../../src/lib/factory/report";
import { ITEMS as A1 } from "../seed/a1";
import { ITEMS as A2 } from "../seed/a2";
import { ITEMS as B1 } from "../seed/b1";
import { ITEMS as B2 } from "../seed/b2";
import { ITEMS as C1 } from "../seed/c1";
import { ITEMS as C2 } from "../seed/c2";

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith("--"));
const reportPath = args.find((a) => a.startsWith("--report="))?.slice(9);
if (!file) throw new Error("usage: import-fr-pack.mts <pack.md> [--report=<path>]");

export const OUT = join(process.cwd(), "src", "content", "factory", "fr-factory-items.json");
const CACHE = process.env.FACTORY_LT_CACHE ?? "C:/Projects/_handoffs/rr401-tools/scratch/almifrench/lt-cache";
mkdirSync(CACHE, { recursive: true });
const key = (text: string, lang: Lang) => createHash("sha256").update(`${lang}\n${text}`).digest("hex");
const cached = (text: string, lang: Lang): LtMatch[] | null => { const f = join(CACHE, `${key(text, lang)}.json`); return existsSync(f) ? JSON.parse(readFileSync(f, "utf8")) : null; };

async function fetchLt(text: string, lang: Lang): Promise<LtMatch[]> {
  for (let tries = 0; tries < 5; tries++) {
    const r = await fetch("https://api.languagetool.org/v2/check", { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded", "user-agent": "AlmiFrench-content-factory/1.0" }, body: new URLSearchParams({ text, language: lang }) });
    if (r.ok) { const j = (await r.json()) as { matches: LtMatch[] }; return j.matches; }
    console.error(`  LanguageTool ${r.status}, waiting`); await new Promise((z) => setTimeout(z, 20000));
  }
  throw new Error("LanguageTool did not answer");
}

const md = readFileSync(file, "utf8");
const pack = parsePack(md, file.split(/[\\/]/).pop()!);
const bankKeys = [...A1, ...A2, ...B1, ...B2, ...C1, ...C2].map((i) => itemKey({ level: String(i.level), skill: String(i.skill), title: String(i.title) }));

// pass 1: learn every text the gates will check; fetch what is not cached yet
const wanted: { text: string; lang: Lang }[] = [];
importPack(pack, md, (text, lang) => { wanted.push({ text, lang }); return []; }, bankKeys);
let fetched = 0;
for (const { text, lang } of wanted) {
  if (cached(text, lang)) continue;
  const matches = await fetchLt(text, lang);
  writeFileSync(join(CACHE, `${key(text, lang)}.json`), JSON.stringify(matches));
  fetched++;
  await new Promise((z) => setTimeout(z, 3500));
}
// pass 2: the real import, from the cache only
const res = importPack(pack, md, (text, lang) => cached(text, lang) ?? (() => { throw new Error("cache miss"); })(), bankKeys);
const prev: FactoryData | null = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : null;
const merged = mergeData(prev, res.data);
const body = JSON.stringify(merged, null, 1) + "\n";
const changed = !prev || JSON.stringify(prev, null, 1) + "\n" !== body;
mkdirSync(join(process.cwd(), "src", "content", "factory"), { recursive: true });
if (changed) writeFileSync(OUT, body);
if (reportPath) writeFileSync(reportPath, renderReport(pack, res));
const models = res.data.items.reduce((n, i) => n + i.payload.models.length, 0);
console.log(`tasks in pack ${pack.tasks.length} · items imported ${res.data.items.length} · model answers imported ${models} · blocked ${res.blocked.length} · duplicates skipped ${res.skippedDuplicates.length} · texts checked ${res.checkedTexts} · style hints (not blocking) ${res.hints} · LanguageTool requests ${fetched} · data ${changed ? "WRITTEN" : "unchanged"}`);
for (const b of res.blocked) console.log(`  BLOCKED ${b.where}: ${b.reason}${b.findings ? ` — ${b.findings.map((f) => `"${f.text}" (${f.rule}: ${f.message})`).join(", ")}` : ""}`);
