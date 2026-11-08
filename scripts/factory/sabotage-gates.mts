// RR-401 · every gate must turn RED when broken. Break the source, run the factory test, require exit != 0 AND a failure
// naming that gate, restore the file byte-for-byte (checked), then the clean run must be GREEN.
// Run: npx tsx scripts/factory/sabotage-gates.mts
import { readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const CASES = [
  { gate: "French grammar categories", file: "src/lib/factory/grammar-gate.ts", from: '"CONFUSED_WORDS", "CAT_GRAMMAIRE", ', to: '"CONFUSED_WORDS", ', fail: "FAIL  a French GRAMMAR finding" },
  { gate: "word-count rule (elisions)", file: "src/lib/factory/pack.ts", from: "return text.split(/[\\s'’]+/).filter", to: "return text.split(/\\s+/).filter", fail: "FAIL  word counts recomputed" },
  { gate: "NCLC 5 note names its mistakes", file: "src/lib/factory/grammar-gate.ts", from: 'return "the note names no error (no *mistake* → *correction*)";', to: "return null;", fail: "FAIL  an NCLC 5 note" },
  { gate: "owner-only write (--confirm AND FACTORY_WRITE)", file: "src/lib/factory/seed-plan.ts", from: 'argv.includes("--confirm") && env.FACTORY_WRITE === "yes"', to: 'argv.includes("--confirm") || env.FACTORY_WRITE === "yes"', fail: "FAIL  the write needs BOTH" },
  { gate: "build reconcile keeps seeded factory rows", file: "src/lib/factory/build-seed.ts", from: "return new Set([...bank.map(k), ...factoryKeys]);", to: "return new Set([...bank.map(k)]);", fail: "FAIL  reconcile keeps" },
  { gate: "build seed inserts only the bank", file: "scripts/seed/append.ts", from: "for (const item of ALL) {", to: "for (const item of [...ALL]) {", fail: "FAIL  append.ts INSERTS only the bank" },
];
const run = () => spawnSync("npx", ["tsx", "scripts/factory/factory.test.ts"], { encoding: "utf8", shell: true });
const out: { gate: string; red: boolean; reason: string }[] = [];
for (const c of CASES) {
  const raw = readFileSync(c.file, "utf8");
  const crlf = raw.includes("\r\n"), lf = raw.replace(/\r\n/g, "\n");
  if (!lf.includes(c.from)) throw new Error(`anchor missing for: ${c.gate}`);
  try {
    const bad = lf.replace(c.from, c.to);
    writeFileSync(c.file, crlf ? bad.replace(/\n/g, "\r\n") : bad);
    const r = run();
    const text = r.stdout + r.stderr;
    const line = text.split("\n").find((l) => l.includes(c.fail)) ?? "";
    const why = text.split("\n")[text.split("\n").indexOf(line) + 1]?.trim() ?? "";
    out.push({ gate: c.gate, red: r.status !== 0 && !!line, reason: `${line.trim()} → ${why}` });
  } finally { writeFileSync(c.file, raw); }
  if (readFileSync(c.file, "utf8") !== raw) throw new Error(`${c.file} NOT restored`);
}
const clean = run();
for (const o of out) console.log(`  [${o.red ? "RED as required" : "STAYED GREEN — BLIND"}] ${o.gate}\n      ${o.reason}`);
console.log(`  restored, clean run: ${clean.status === 0 ? "GREEN" : "NOT GREEN"} (${(clean.stdout.match(/\d+ passed, \d+ failed/) ?? [""])[0]})`);
const ok = out.every((o) => o.red) && clean.status === 0;
console.log(ok ? `\nSABOTAGE PASS — ${out.length}/${out.length} gates turn RED when broken, GREEN again after restore` : "\nSABOTAGE FAIL");
process.exitCode = ok ? 0 : 1;
