/** RR-401 · the AlmiFrench grammar-gate report for beta-g: what was blocked, the exact line, the rule and LanguageTool's
 *  suggestion. No clock, so the same import gives the same report. */
import type { Pack } from "./pack";
import type { ImportResult } from "./import";

export function renderReport(pack: Pack, res: ImportResult): string {
  const models = res.data.items.reduce((n, i) => n + i.payload.models.length, 0);
  const packModels = pack.tasks.reduce((n, t) => n + t.models.length, 0);
  const L: string[] = [];
  L.push("## AlmiFrench", "");
  L.push(`Pack: ${pack.file}. The gate checks every task text, every NCLC 9+ and NCLC 7 model answer in French (LanguageTool "fr"), and every note in English (blocked only when British AND American English both flag it; the French words in *italics* inside a note are exempt). NCLC 5 answers are not grammar-checked (their mistakes are on purpose); their notes must name the mistakes. Every written word count must equal the pack's own table (punctuation, greeting, closing and signature not counted; an elided form like *j'espère* counts as two words). Style-only hints never block.`, "");
  L.push("| Result | Count |", "|---|---|");
  L.push(`| Tasks in the pack | ${pack.tasks.length} |`, `| Model answers in the pack | ${packModels} |`, `| Items imported (dry run) | ${res.data.items.length} |`, `| Model answers imported | ${models} |`, `| **Blocked** | **${res.blocked.length}** |`, `| Duplicates of existing items (skipped) | ${res.skippedDuplicates.length} |`, `| Texts checked | ${res.checkedTexts} |`, `| Style hints (count only; never block) | ${res.hints} |`, "");
  if (!res.blocked.length) L.push("**Nothing was blocked.** Nothing for beta-g to fix in this pack.", "");
  for (const b of res.blocked) {
    L.push(`### Blocked: ${b.where}`, "", `Reason: ${b.reason}`, "");
    for (const f of b.findings ?? []) L.push(`- "${f.text}" in: …${f.snippet}… · rule \`${f.rule}\` (${f.category}) · ${f.message}${f.suggestion ? ` · suggestion: ${f.suggestion}` : ""}`);
    L.push("");
  }
  for (const d of res.skippedDuplicates) L.push(`- Skipped: ${d}`);
  L.push("", "CC did not change any text. Blocked items stay out of AlmiFrench until beta-g sends a corrected pack.", "");
  return L.join("\n");
}
