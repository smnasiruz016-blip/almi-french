// Build-time FORK HYGIENE GATE — the AlmiWorld §7 rule, enforced instead of trusted.
//
// WHY THIS EXISTS. This repo forked from AlmiGoethe:
//   almi-celpip → almi-goethe → almi-french (you are here)
// Proven, not assumed — french's own commits "remove stray AlmiGoethe HRK doc (de-Goethe
// complete)" and "strip inherited Goethe pass-mark comments" show it carried Goethe types,
// and its first commit (2026-06-29) is two days after goethe's (2026-06-27). The engine
// root is AlmiCELPIP (Canadian English). So the leak surfaces are German (Goethe) and
// Canadian English (CELPIP) — a French product has no reason to name either.
//
// NOTE on descendants: AlmiSpanish forked FROM this repo (celpip→goethe→french→spanish).
// Descendant nouns are NOT banned here — a fork only inherits its ANCESTORS' facts. So
// Spanish's DELE/Cervantes and the "french" slug itself are never banned; and bare "Spain"
// is legitimate content (France names its neighbours).
//
// Recurring lesson (documented in almi-swiss): the dangerous case is the LABEL localized
// while the FACT was not, and an identifier shipped in a spelling the banned list didn't
// hold. Product names are ENUMERATED in all four shapes.
//
// ⚠️ RE-CUT NOTES:
//  1. French nouns are THIS product's subject and are NOT banned: TEF, TCF, DELF, DALF, fr-FR.
//  2. German SKILL words (Schreiben/Sprechen/Hören/Lesen) banned by WORD BOUNDARY + case;
//     French words differ, and a baseline probe found no collision.
//  3. Bare country names are NOT banned — a French item may name Germany/Canada/Spain as
//     content. Only the ancestors' exam/authority/institution/product/locale nouns leak.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SCAN_DIRS = ["src", "scripts", "prisma"];
const SCAN_EXT = /\.(ts|tsx|js|mjs|json|prisma|css|md)$/;

// ── ROOT FILES — a network-wide blind spot, closed here ──────────────────────
// Every fork-hygiene gate in the network scanned only src/scripts/prisma, so the
// repo's own IDENTITY files were never checked. A 2026-07-21 sweep found six repos
// misdescribing themselves at the root: icelandic, danish, norwegian and dutch all
// carried "AlmiPortuguese" package.json descriptions; portuguese's README was titled
// "# AlmiGoethe"; swiss described itself as AlmiSwedish. This repo was the same —
// its README body was AlmiDET's verbatim, down to "Canadian English Language
// Proficiency Index Program (DET)", "Read and Select", the 10–160 scale and
// DetItem ↔ DetAttempt. Only the title and subdomain were French.
//
// NAMED FILES ONLY, not the whole root directory: the root also holds
// package-lock.json and other generated files, and scanning those would drown the
// gate in noise and invite someone to switch it off. These two are the identity
// surface — what the repo says it IS, to GitHub and to every tool that reads
// package.json.
const SCAN_ROOT_FILES = ["package.json", "README.md"];

const ALLOWLIST = new Map([
  ["src/lib/nav/family.ts", "links to sibling AlmiWorld products by name"],
  ["scripts/seo/fork-hygiene-gate.mjs", "documents the banned nouns"],
]);

const LINE_ESCAPE = "hygiene-allow";

// Ancestor (German + CELPIP) proper nouns. ⚠️ RE-CUT AT EVERY FORK. French nouns are NOT
// here (this product's subject); bare country names are not here.
const BANNED = [
  // — German (Goethe parent) — institution / exam / locale —
  "Goethe-Institut", "Goethe-Zertifikat", "TestDaF",
  "de-DE",
  // — CELPIP (root) — Canadian ENGLISH test. Only the TEST NAME is a leak signal here:
  // unlike the other forks, a French product legitimately lives in the Canadian-immigration
  // domain (TEF Canada / TCF Canada are IRCC-accepted French exams, scored on Canada's NCLC).
  // So IRCC, CLB and "Canadian Language Benchmark" are SHARED CONTEXT french owns, NOT leaks —
  // they were removed after the baseline caught IRCC 3× in legitimate home/account copy. What
  // stays banned is "CELPIP" itself: a French product has no reason to name the English test.
  "CELPIP",
  // CELPIP spelled out. The acronym alone missed the real leak: this repo's README
  // described it as "Canadian English Language Proficiency Index Program (DET)"
  // practice — CELPIP's full name, never abbreviated, so a gate banning only the
  // acronym read it as clean. Ban what was actually written, not the tidy form.
  "Canadian English Language Proficiency Index Program",
  // — OTHER-PRODUCT identities. Not ancestors of this repo, but the README arrived
  // from AlmiDET's chassis and carried DET's task names, scale and Prisma models.
  // A French product naming another AlmiWorld product's exam in its OWN identity
  // files is the same class of leak, whichever direction the fork ran.
  "Read and Select", "Write About the Photo", "Speak About the Photo",
  "DetItem", "DetAttempt",
  // Sibling/ancestor PRODUCT names appended below — GENERATED, not hand-listed.
];

const ANCESTOR_PRODUCTS = ["celpip", "goethe"];
/** Every form a product slug ships in: almi-x · almi_x · almix · AlmiX. */
function productNameForms(p) {
  return [`almi-${p}`, `almi_${p}`, `almi${p}`, `Almi${p[0].toUpperCase()}${p.slice(1)}`];
}
for (const p of ANCESTOR_PRODUCTS) BANNED.push(...productNameForms(p));
BANNED.push("AlmiCELPIP");

// SELF-CHECK — a global find-replace can rewrite this list to ban our own name.
const SELF_NAMES = ["AlmiFrench", "almi-french", "almi_french", "almifrench"];
for (const n of SELF_NAMES) {
  if (BANNED.some((b) => b.toLowerCase() === n.toLowerCase())) {
    console.error("");
    console.error(`FORK-HYGIENE GATE IS MISCONFIGURED: BANNED contains "${n}", which is THIS product's own name.`);
    console.error("Every legitimate mention of ourselves would be reported as an ancestor leak. Fix BANNED.");
    console.error("");
    process.exit(2);
  }
}

// Word-boundary bans (\b) — case matters for the German nouns (Capitalised). telc is a
// German exam. NOTE: CLB and IRCC are DELIBERATELY absent — they are legitimate
// Canadian-immigration context for a French-for-Canada product (see the CELPIP note above);
// the other forks ban them because they don't teach Canada-bound exams.
const BANNED_WORD = ["telc", "Schreiben", "Sprechen", "Hören", "Lesen"];

// ── Scanning machinery (real-entity-gate design: strip comments, scan STRING values).

function stripComments(text) {
  let out = "";
  let i = 0;
  let quote = null;
  let inLine = false;
  let inBlock = false;
  while (i < text.length) {
    const c = text[i];
    const n = text[i + 1];
    if (inLine) {
      if (c === "\n") { inLine = false; out += c; }
      else out += " ";
      i++; continue;
    }
    if (inBlock) {
      if (c === "*" && n === "/") { inBlock = false; out += "  "; i += 2; continue; }
      out += c === "\n" ? c : " ";
      i++; continue;
    }
    if (quote) {
      if (c === "\\") { out += text.slice(i, i + 2); i += 2; continue; }
      if (c === quote) quote = null;
      out += c; i++; continue;
    }
    if (c === '"' || c === "'" || c === "`") { quote = c; out += c; i++; continue; }
    if (c === "/" && n === "/") { inLine = true; out += "  "; i += 2; continue; }
    if (c === "/" && n === "*") { inBlock = true; out += "  "; i += 2; continue; }
    out += c; i++;
  }
  return out;
}

// Prisma comments are `//` and `///` — NOT `#`. stripComments handles `//` while
// respecting string literals, so prisma reuses it.

function jsonStrings(node, out = []) {
  if (typeof node === "string") out.push(node);
  else if (Array.isArray(node)) for (const v of node) jsonStrings(v, out);
  else if (node && typeof node === "object") for (const v of Object.values(node)) jsonStrings(v, out);
  return out;
}

function walk(dir, out = []) {
  let entries;
  try { entries = readdirSync(dir); } catch { return out; }
  for (const e of entries) {
    if (e === "node_modules" || e === ".next" || e === ".git") continue;
    const full = join(dir, e);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (SCAN_EXT.test(e)) out.push(full);
  }
  return out;
}

const violations = [];

/** Every file to scan: the source trees, plus the named root identity files. */
const targets = [
  ...SCAN_DIRS.flatMap((dir) => walk(join(ROOT, dir))),
  ...SCAN_ROOT_FILES.map((f) => join(ROOT, f)).filter((f) => {
    try { return statSync(f).isFile(); } catch { return false; }
  }),
];

{
  for (const file of targets) {
    const rel = relative(ROOT, file).replace(/\\/g, "/");
    if (ALLOWLIST.has(rel)) continue;
    const raw = readFileSync(file, "utf8");
    let text;
    if (rel.endsWith(".json")) {
      try { text = jsonStrings(JSON.parse(raw)).join("\n"); }
      catch { text = raw; }
    } else if (rel.endsWith(".md")) {
      // Markdown is scanned RAW. It has no code comments, and running it through
      // stripComments would treat the // in every https:// URL as the start of a
      // line comment and blank the rest of the line — silently HIDING a leak in
      // exactly the file most likely to carry one.
      text = raw;
    } else {
      text = stripComments(raw);   // .ts/.tsx/.js/.mjs/.css, and .prisma (also //)
    }
    const lines = text.split(/\r?\n/);
    const rawLines = raw.split(/\r?\n/);

    lines.forEach((line, i) => {
      if ((rawLines[i] ?? "").includes(LINE_ESCAPE)) return;
      for (const term of BANNED) {
        if (line.includes(term)) {
          violations.push(`${rel}:${i + 1}  banned ancestor noun "${term}"\n      ${line.trim().slice(0, 120)}`);
        }
      }
      for (const term of BANNED_WORD) {
        if (new RegExp(`\\b${term}\\b`).test(line)) {
          violations.push(`${rel}:${i + 1}  banned ancestor noun "${term}"\n      ${line.trim().slice(0, 120)}`);
        }
      }
    });
  }
}

if (violations.length) {
  console.error("\n✗ FORK HYGIENE GATE FAILED — ancestor content found.\n");
  console.error("  France must read as France. These are leaks from the fork lineage");
  console.error("  (celpip → goethe → french).\n");
  for (const v of [...new Set(violations)]) console.error(`  ${v}`);
  console.error(`\n  ${violations.length} violation(s). Fix the FACT, not just the label.\n`);
  process.exit(1);
}

console.log(`✓ Fork hygiene gate: clean (no ancestor nouns across ${SCAN_DIRS.join(", ")} + ${SCAN_ROOT_FILES.join(", ")}).`);
