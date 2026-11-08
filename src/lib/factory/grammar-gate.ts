/**
 * RR-401 · the AlmiFrench grammar gate. Pure: it classifies LanguageTool matches that the importer fetched; it never calls
 * the network itself, so it is tested on fixtures. Same rules as the AlmiPrep gate (RR-393), in French.
 *
 * - The task texts and the NCLC 9+ and NCLC 7 model answers are checked in French ("fr").
 * - The notes are written in ENGLISH for learners, so they are checked in English, and a match blocks only when British
 *   AND American English both flag it. Inside a note, the French words in *italics* (the quoted learner mistakes and their
 *   corrections) are the point of the note, so text inside quotes never blocks.
 * - A match blocks only when it is a real spelling or grammar error. Style-only hints never block.
 * - Proper names in the pack (people and places) are on the allowlist: a name is not an error.
 */

export type LtMatch = {
  offset: number;
  length: number;
  message: string;
  replacements?: { value: string }[];
  rule: { id: string; issueType?: string; category: { id: string; name?: string } };
};
export type Lang = "fr" | "en-GB" | "en-US";
export type Lt = (text: string, lang: Lang) => LtMatch[];

/** English categories, and LanguageTool's French ones for grammar, confused words, elision and conjugation (its French rules
 *  file them under CAT_* ids, often with issueType "uncategorized": without these the French gate would be blind to
 *  grammar). Style, typography and usage ("tours critiques") never block. */
const BLOCKING_CATEGORIES = new Set(["TYPOS", "GRAMMAR", "CONFUSED_WORDS", "CAT_GRAMMAIRE", "CAT_HOMONYMES_PARONYMES", "CAT_ELISION", "CAT_CONJUGAISON"]);
const BLOCKING_ISSUES = new Set(["misspelling", "grammar"]);

/** our own names, the exam terms, and the proper names used in Pack 1 (people and places). One loanword: "empanadas" (a dish
 *  named in a list of dishes, Tâche 2.1), which LanguageTool's French dictionary does not know; it is not a spelling error.
 *  beta-g confirmed it (BETA-G_DECISIONS_ROUND2.md: "Exempt, as CC did"). */
export const ALLOWLIST = new Set(
  ["AlmiFrench", "AlmiWorld", "TCF", "TEF", "NCLC", "CEFR", "beta-g", "Nadia", "Karim", "Gaspésie", "Bonaventure", "Leblanc", "Tremblay", "Fontaine", "Érables", "empanadas"].map((w) => w.toLowerCase()),
);

export const isBlockingKind = (m: LtMatch) => BLOCKING_CATEGORIES.has(m.rule.category.id) || BLOCKING_ISSUES.has(m.rule.issueType ?? "");

/** ranges of text inside quotes (straight, curly or French guillemets) */
export function quotedRanges(text: string): [number, number][] {
  const out: [number, number][] = [];
  const re = /"[^"\n]*"|“[^”\n]*”|«[^»\n]*»/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) out.push([m.index, m.index + m[0].length]);
  return out;
}

export type GateFinding = { text: string; offset: number; snippet: string; rule: string; category: string; message: string; suggestion: string };

const finding = (text: string, m: LtMatch): GateFinding => ({
  text: text.slice(m.offset, m.offset + m.length),
  offset: m.offset,
  snippet: text.slice(Math.max(0, m.offset - 40), m.offset + m.length + 40).replace(/\s+/g, " "),
  rule: m.rule.id,
  category: m.rule.category.id,
  message: m.message,
  suggestion: (m.replacements ?? []).slice(0, 3).map((r) => r.value).join(" / "),
});

/** Exact flags beta-g has ruled correct (C:\Projects\_handoffs\factory\BETA-G_DECISIONS_ROUND2.md, 8 Nov 2026). Each one
 *  exempts ONE rule on ONE flagged word inside ONE exact passage; the same rule still blocks anywhere else. */
export const EXEMPT_FLAGS: { rule: string; word: string; passage: string; why: string }[] = [
  {
    // beta-g: "The condition states a real fact, and the conditional is for politeness, so this is correct French. Exempt."
    rule: "COND_VS_FUTUR",
    word: "expliquent",
    passage: "Si des contraintes budgétaires expliquent cette décision",
    why: "Tâche 2.2 NCLC 9+ · beta-g, BETA-G_DECISIONS_ROUND2.md",
  },
];

export const isExemptFlag = (text: string, m: LtMatch) =>
  EXEMPT_FLAGS.some((e) => {
    if (m.rule.id !== e.rule || text.slice(m.offset, m.offset + m.length) !== e.word) return false;
    for (let at = text.indexOf(e.passage); at >= 0; at = text.indexOf(e.passage, at + 1)) {
      if (m.offset >= at && m.offset + m.length <= at + e.passage.length) return true;
    }
    return false;
  });

/** French text (task, NCLC 9+ or NCLC 7 answer): every real error LanguageTool flags in "fr" blocks, except allowlisted names
 *  and the exact flags beta-g ruled correct */
export function frenchFindings(text: string, fr: LtMatch[]): GateFinding[] {
  return fr
    .filter((m) => isBlockingKind(m) && !ALLOWLIST.has(text.slice(m.offset, m.offset + m.length).toLowerCase()) && !isExemptFlag(text, m))
    .map((m) => finding(text, m));
}

/** an English note: blocks only when en-GB AND en-US both flag the same span, outside quotes, not allowlisted */
export function englishNoteFindings(text: string, gb: LtMatch[], us: LtMatch[]): GateFinding[] {
  const quotes = quotedRanges(text);
  const inQuote = (m: LtMatch) => quotes.some(([a, b]) => m.offset >= a && m.offset + m.length <= b);
  const usHas = (m: LtMatch) => us.some((u) => u.offset === m.offset && u.length === m.length && isBlockingKind(u));
  return gb
    .filter((m) => isBlockingKind(m) && usHas(m) && !inQuote(m) && !ALLOWLIST.has(text.slice(m.offset, m.offset + m.length).toLowerCase()))
    .map((m) => finding(text, m));
}

/** style-only hints, kept for information: they never block */
export const hintCount = (ms: LtMatch[]) => ms.filter((m) => !isBlockingKind(m)).length;

/** what LanguageTool reads for a note: **bold** loses its marks; a French *italic* (a quoted mistake or its correction)
 *  is put inside quotes, so it is exempt. Without this, "*le boisson*" reads as an English spelling error. */
export const plainNote = (t: string) => t.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "“$1”").replace(/\*/g, "");

/** NCLC 5 is not grammar-checked: its mistakes are on purpose. Its note must exist and must NAME its errors (at least one
 *  quoted mistake in *italics* with its correction after "→"). */
export function nclc5NoteProblem(note: string): string | null {
  if (note.trim().length < 20) return "the note is missing or empty";
  if (!/\*[^*]+\*\s*\(?→/.test(note) && !/→\s*\*[^*]+\*/.test(note)) return "the note names no error (no *mistake* → *correction*)";
  return null;
}
