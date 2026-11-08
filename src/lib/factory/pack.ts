/**
 * RR-401 · the AlmiFrench content factory: reads a factory pack (.md, written and checked by beta-g) into plain data.
 * Pure functions only (no network, no database), so every gate is tested on fixtures. Same pattern as the AlmiPrep
 * factory (RR-393). The owner's rule: CC never rewrites content. These functions copy the text exactly; they only
 * parse, count and check.
 */

export type NclcLevel = "9+" | "7" | "5";
export const NCLC_LEVELS: NclcLevel[] = ["9+", "7", "5"];

/** one model answer at one NCLC level, with its note (both copied exactly from the pack) */
export type PackModel = { level: NclcLevel; text: string; note: string };
/** a written task (Tâche 1–3) or the oral model (Partie D) */
export type PackTask = {
  /** "1.1" … "3.2" for written tasks; "oral-3" for the oral model */
  ref: string;
  kind: "ecrite" | "orale";
  /** Tâche number: 1, 2 or 3 */
  tache: 1 | 2 | 3;
  /** the heading after the dash, e.g. "Invitation à un pique-nique"; for the oral model, the subject line */
  heading: string;
  /** the task as the learner reads it: the bold "> " line(s), stars removed, one line per quoted line */
  promptLines: string[];
  models: PackModel[];
};
export type PackWordRow = { ref: string; level: NclcLevel; words: number };
export type Pack = { file: string; title: string; packNo: number; author: string; date: string; tasks: PackTask[]; wordTable: PackWordRow[] };

const MONTHS: Record<string, string> = { jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06", jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12" };

const unstar = (s: string) => s.replace(/\*\*/g, "").trim();
const levelOf = (s: string): NclcLevel | null => (/^9\+$/.test(s) ? "9+" : s === "7" ? "7" : s === "5" ? "5" : null);

export function parsePack(md: string, file: string): Pack {
  const src = md.replace(/\r\n/g, "\n");
  const title = /^title:\s*"([^"]+)"/m.exec(src)?.[1] ?? "";
  const subtitle = /^subtitle:\s*"([^"]+)"/m.exec(src)?.[1] ?? "";
  const packNo = Number(/Pack\s+(\d+)/.exec(title)?.[1] ?? NaN);
  const author = subtitle.split("·")[0].trim();
  const d = /(\d{1,2})\s+([A-Za-z]{3})[a-z]*\s+(\d{4})/.exec(subtitle);
  const date = d ? `${d[3]}-${MONTHS[d[2].toLowerCase()]}-${d[1].padStart(2, "0")}` : "";
  if (!title || !Number.isFinite(packNo) || !author || !date) throw new Error(`${file}: front matter must give title (with "Pack N"), author and date`);

  const tasks: PackTask[] = [];
  let wordTable: PackWordRow[] = [];
  // split on level-1 headings; the word table sits under a level-2 heading in the last block
  for (const block of src.split(/^# /m).slice(1)) {
    const head = block.split("\n", 1)[0].trim();
    const tableAt = block.search(/^## Nombre de mots/m);
    const body = tableAt >= 0 ? block.slice(0, tableAt) : block;
    if (tableAt >= 0) wordTable = parseWordTable(block.slice(tableAt));

    const promptLines = [...body.matchAll(/^>\s*(.+)$/gm)].map((m) => unstar(m[1]));

    const tm = /^Tâche\s+([123])\.(\d+)\s+[—–-]\s+(.+)$/.exec(head);
    if (tm) {
      if (!promptLines.length) throw new Error(`${file}: Tâche ${tm[1]}.${tm[2]} has no "> **task**" line`);
      const models: PackModel[] = [];
      for (const part of body.split(/^## /m).slice(1)) {
        const lm = /^NCLC\s+(\S+)\s*$/.exec(part.split("\n", 1)[0].trim());
        const level = lm ? levelOf(lm[1]) : null;
        if (!level) continue;
        const rest = part.slice(part.indexOf("\n") + 1);
        const nm = /^\*\*Notes \(NCLC [^)]*\):\*\*\s*(.+)$/m.exec(rest);
        if (!nm) throw new Error(`${file}: Tâche ${tm[1]}.${tm[2]} NCLC ${level} has no "**Notes (NCLC …):**" line`);
        const text = rest.slice(0, nm.index).replace(/\n-{3,}\s*$/m, "").trim();
        models.push({ level, text, note: nm[1].trim() });
      }
      tasks.push({ ref: `${tm[1]}.${tm[2]}`, kind: "ecrite", tache: Number(tm[1]) as 1 | 2 | 3, heading: tm[3].trim(), promptLines, models });
      continue;
    }

    const om = /^Partie\s+\S+\s+[—–-]\s+Expression orale,\s+tâche\s+([123])/i.exec(head);
    if (om) {
      const mm = /^\*\*Modèle NCLC\s+(\S+)[^*]*\*\*\s*$/m.exec(body);
      const nm = /^\*\*Notes:\*\*\s*(.+)$/m.exec(body);
      if (!mm || !nm) throw new Error(`${file}: the oral model needs a "**Modèle NCLC …**" line and a "**Notes:**" line`);
      const level = levelOf(mm[1]);
      if (!level) throw new Error(`${file}: the oral model has an unknown level "${mm[1]}"`);
      const text = body.slice(mm.index + mm[0].length, nm.index).trim();
      const sujet = promptLines.map((l) => l.replace(/^Sujet\s*:\s*/, "")).join(" ");
      tasks.push({ ref: `oral-${om[1]}`, kind: "orale", tache: Number(om[1]) as 1 | 2 | 3, heading: sujet, promptLines, models: [{ level, text, note: nm[1].trim() }] });
    }
  }
  return { file, title, packNo, author, date, tasks, wordTable };
}

function parseWordTable(block: string): PackWordRow[] {
  const rows: PackWordRow[] = [];
  for (const line of block.split("\n")) {
    const m = /^\|\s*Tâche\s+(\d\.\d+)\s*\|\s*NCLC\s+(\S+)\s*\|\s*(\d+)\s*\|/.exec(line);
    const level = m ? levelOf(m[2]) : null;
    if (m && level) rows.push({ ref: m[1], level, words: Number(m[3]) });
  }
  return rows;
}

/** The pack's own rule (TCF): punctuation is not counted; the greeting and the closing + signature are not counted.
 *  A word is a run between spaces or apostrophes that holds a letter or a digit: an elided form counts as two words
 *  (j'espère = j' + espère), a hyphenated word counts once (pique-nique), and a lone "!", ":" or "…" does not count.
 *  This rule reproduces all 15 rows of the Pack 1 table exactly (measured, 8 Nov 2026); the space-only rule does not.
 *  Greeting = the first paragraph when it is a single short line ending in "," or "!" (Bonjour à tous, / Madame, Monsieur,).
 *  Closing + signature = the last paragraph when it is short (≤ 3 lines) and ends in a line without sentence
 *  punctuation (a name), e.g. "À samedi, j'espère !\nNadia", "Merci\nNadia", "Sophie Tremblay". */
export function countWords(text: string): number {
  return text.split(/[\s'’]+/).filter((t) => /[\p{L}\p{N}]/u.test(t)).length;
}

export function countedBody(text: string): string {
  const paras = text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  if (paras.length > 1 && !paras[0].includes("\n") && /[,!]$/.test(paras[0]) && countWords(paras[0]) <= 5) paras.shift();
  const last = paras[paras.length - 1];
  if (paras.length > 1 && last) {
    const lines = last.split("\n");
    if (lines.length <= 3 && !/[.?!:;…]$/.test(lines[lines.length - 1].trim()) && countWords(lines[lines.length - 1]) <= 3) paras.pop();
  }
  return paras.join("\n\n");
}

export const countTaskWords = (text: string) => countWords(countedBody(text));

/** stable ids: pack number + task ref, never a database default */
export const taskId = (packNo: number, ref: string) => `fac-fr-p${packNo}-${ref.replace(".", "-")}`;
