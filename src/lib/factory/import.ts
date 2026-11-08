/**
 * RR-401 · the AlmiFrench importer core: pack + LanguageTool results → FrenchItem rows (with their model answers in the
 * payload) + the gate report. Pure and deterministic (no clock, no randomness, sorted output), so re-importing the same
 * pack gives byte-identical data: idempotent by construction.
 *
 * Mapping (the product's existing data model, no schema change):
 *   written Tâche 1–3 → FrenchItem EXPRESSION_ECRITE · WRITING_TASK · examFamily TCF · payload { situation, instruction,
 *                        wordMin, wordMax } with the TCF word range of that tâche (src/lib/french/exam-structure.ts)
 *   oral tâche 3      → FrenchItem EXPRESSION_ORALE · SPEAKING_TASK · examFamily TCF · payload { taskPrompt, prepSeconds,
 *                        speakSeconds } with the TCF oral Tâche 3 timing the product already uses
 *   CEFR level B2: the pack's middle model is NCLC 7 (about B2); TCF tasks are the same at every level.
 *   The model answers ride in payload.models (shown to the learner with their notes). Scoring is untouched.
 */
import { TCF_EXPRESSION } from "../french/exam-structure";
import { NCLC_LEVELS, countTaskWords, taskId, type NclcLevel, type Pack, type PackTask } from "./pack";
import { englishNoteFindings, frenchFindings, hintCount, nclc5NoteProblem, plainNote, type GateFinding, type Lt } from "./grammar-gate";

export const FACTORY_LEVEL = "B2" as const;
import { MODEL_ANSWER_LABEL, TRADEMARK_LINE } from "./labels";
export { MODEL_ANSWER_LABEL, TRADEMARK_LINE };
export const CEFR_FOR: Record<NclcLevel, string> = { "9+": "about C1", "7": "about B2", "5": "about B1" };

/** the product's own Tâche prompts (the line under the title), as the existing TCF items already say them */
const PROMPT_FOR: Record<string, string> = {
  "ecrite-1": "Rédigez le message demandé (Tâche 1).",
  "ecrite-2": "Rédigez le texte demandé (Tâche 2).",
  "ecrite-3": "Comparez les deux points de vue puis donnez le vôtre (Tâche 3).",
  "orale-3": "Exprimez et défendez un point de vue (Tâche 3), puis tapez votre transcription.",
};
/** topic tags already used in the bank */
const TOPIC_FOR: Record<string, string> = { "1.1": "vie-quotidienne", "1.2": "voyages", "2.1": "societe", "2.2": "vie-pratique", "3.1": "education", "3.2": "travail", "oral-3": "societe" };
/** beta-g's own task line for Tâche 3 (pack, Partie C), copied exactly */
const TACHE3_TASK_LINE = /^\*(Task:\s*.+)\*\s*$/m;

export type FactoryModel = { level: string; cefr: string; text: string; note: string; wordCount: number; withMistakes: boolean };
export type FactoryItem = {
  factoryId: string;
  level: typeof FACTORY_LEVEL;
  skill: "EXPRESSION_ECRITE" | "EXPRESSION_ORALE";
  taskType: "WRITING_TASK" | "SPEAKING_TASK";
  examFamily: "TCF";
  title: string;
  prompt: string;
  difficulty: "CORE";
  topicTag: string;
  payload: Record<string, unknown> & { factoryId: string; models: FactoryModel[] };
};
export type FactoryData = { schema: 1; label: string; trademark: string; provenance: { author: string; date: string; file: string }[]; items: FactoryItem[] };
export type Blocked = { where: string; reason: string; findings?: GateFinding[] };
export type ImportResult = { data: FactoryData; blocked: Blocked[]; hints: number; checkedTexts: number; skippedDuplicates: string[] };

export const itemKey = (r: { level: string; skill: string; title: string }) => `${r.level}|${r.skill}|${r.title}`;

const titleFor = (t: PackTask) => (t.kind === "orale" ? `TCF Tâche 3 — Point de vue : ${t.heading.replace(/^«\s*|\s*»$/g, "")}` : `TCF Tâche ${t.tache} — ${t.heading}`);

/** split a written task line at its "Écrivez" sentence: what happened (situation) / what to write (instruction). The text is
 *  not changed; the two parts joined by one space give the pack's line back. Tâche 3: the two documents / beta-g's task line. */
export function stimulusFor(t: PackTask, packMd: string): { situation: string; instruction: string } {
  if (t.tache === 3) {
    const line = TACHE3_TASK_LINE.exec(packMd.replace(/\r\n/g, "\n"))?.[1]?.trim();
    if (!line) throw new Error("the pack has no *Task: …* line for Tâche 3");
    return { situation: t.promptLines.join("\n"), instruction: line };
  }
  const whole = t.promptLines.join(" ");
  const i = whole.indexOf(" Écrivez");
  return i > 0 ? { situation: whole.slice(0, i), instruction: whole.slice(i + 1) } : { situation: "", instruction: whole };
}

/**
 * existingKeys: (level|skill|title) of every item already in the bank (scripts/seed/*.ts), so a factory item can never collide
 * with append.ts's dedupe key. A collision is skipped and listed, never imported.
 */
export function importPack(pack: Pack, packMd: string, lt: Lt, existingKeys: string[] = []): ImportResult {
  const blocked: Blocked[] = [];
  const skippedDuplicates: string[] = [];
  const items: FactoryItem[] = [];
  const existing = new Set(existingKeys);
  const seen = new Set<string>();
  let hints = 0, checkedTexts = 0;
  const fr = (text: string) => { checkedTexts++; const m = lt(text, "fr"); hints += hintCount(m); return frenchFindings(text, m); };
  const en = (text: string) => { checkedTexts++; const gb = lt(text, "en-GB"), us = lt(text, "en-US"); hints += hintCount(gb); return englishNoteFindings(text, gb, us); };

  for (const t of pack.tasks) {
    const id = taskId(pack.packNo, t.ref);
    const where = `${pack.file} · ${t.kind === "orale" ? `Expression orale, tâche ${t.tache}` : `Tâche ${t.ref}`}`;
    if (seen.has(id)) throw new Error(`${where}: id ${id} appears twice`);
    seen.add(id);
    const skill = t.kind === "ecrite" ? "EXPRESSION_ECRITE" : "EXPRESSION_ORALE";
    const title = titleFor(t);
    if (existing.has(itemKey({ level: FACTORY_LEVEL, skill, title }))) { skippedDuplicates.push(`${where}: "${title}" is already in the AlmiFrench bank at ${FACTORY_LEVEL}`); continue; }

    const stim = t.kind === "ecrite" ? stimulusFor(t, packMd) : { situation: "", instruction: "" };
    // the task in French; Tâche 3's task line is beta-g's English, so it is checked in English
    const frTask = t.kind === "orale" ? t.heading : t.tache === 3 ? stim.situation : [stim.situation, stim.instruction].filter(Boolean).join("\n");
    const pf = fr(frTask);
    if (pf.length) { blocked.push({ where: `${where} · task text`, reason: "grammar or spelling (fr)", findings: pf }); continue; }
    if (t.kind === "ecrite" && t.tache === 3) {
      const ef = en(stim.instruction);
      if (ef.length) { blocked.push({ where: `${where} · task line`, reason: "grammar or spelling (English)", findings: ef }); continue; }
    }

    const models: FactoryModel[] = [];
    for (const m of t.models) {
      const w = `${where} · NCLC ${m.level}`;
      const words = countTaskWords(m.text);
      if (t.kind === "ecrite") {
        const row = pack.wordTable.find((r) => r.ref === t.ref && r.level === m.level);
        if (!row) { blocked.push({ where: w, reason: "no row in the pack's word-count table" }); continue; }
        if (row.words !== words) { blocked.push({ where: w, reason: `word count differs from the pack's table: counted ${words}, table ${row.words}` }); continue; }
      }
      if (m.level === "5") {
        const prob = nclc5NoteProblem(m.note);
        if (prob) { blocked.push({ where: w, reason: `NCLC 5 note: ${prob}` }); continue; }
      } else {
        const af = fr(m.text);
        if (af.length) { blocked.push({ where: `${w} · answer`, reason: "grammar or spelling (fr)", findings: af }); continue; }
      }
      const nf = en(plainNote(m.note));
      if (nf.length) { blocked.push({ where: `${w} · note`, reason: "grammar or spelling (English note)", findings: nf }); continue; }
      models.push({ level: `NCLC ${m.level}`, cefr: CEFR_FOR[m.level], text: m.text, note: m.note, wordCount: words, withMistakes: m.level === "5" });
    }
    if (!models.length) { blocked.push({ where, reason: "no model answer passed the gates, so the task is not imported" }); continue; }
    models.sort((a, b) => NCLC_LEVELS.indexOf(a.level.slice(5) as NclcLevel) - NCLC_LEVELS.indexOf(b.level.slice(5) as NclcLevel));

    const w = TCF_EXPRESSION.ecrite[t.tache - 1];
    const o = TCF_EXPRESSION.orale[t.tache - 1];
    const payload: FactoryItem["payload"] =
      t.kind === "ecrite"
        ? { situation: stim.situation, instruction: stim.instruction, wordMin: w.wordMin, wordMax: w.wordMax, factoryId: id, models }
        : { taskPrompt: t.heading, prepSeconds: o.prepSeconds, speakSeconds: o.speakSeconds, factoryId: id, models };
    items.push({
      factoryId: id,
      level: FACTORY_LEVEL,
      skill,
      taskType: t.kind === "ecrite" ? "WRITING_TASK" : "SPEAKING_TASK",
      examFamily: "TCF",
      title,
      prompt: PROMPT_FOR[`${t.kind}-${t.tache}`],
      difficulty: "CORE",
      topicTag: TOPIC_FOR[t.ref] ?? "general",
      payload,
    });
  }
  items.sort((a, b) => a.factoryId.localeCompare(b.factoryId));
  return {
    data: { schema: 1, label: MODEL_ANSWER_LABEL, trademark: TRADEMARK_LINE, provenance: [{ author: pack.author, date: pack.date, file: pack.file }], items },
    blocked, hints, checkedTexts, skippedDuplicates,
  };
}

/** merge a fresh import into the data already in the repo: same id → replaced, others kept; provenance de-duplicated */
export function mergeData(prev: FactoryData | null, next: FactoryData): FactoryData {
  const byId = new Map((prev?.items ?? []).map((i) => [i.factoryId, i]));
  for (const i of next.items) byId.set(i.factoryId, i);
  const prov = new Map([...(prev?.provenance ?? []), ...next.provenance].map((p) => [p.file, p]));
  return { ...next, provenance: [...prov.values()].sort((a, b) => a.file.localeCompare(b.file)), items: [...byId.values()].sort((a, b) => a.factoryId.localeCompare(b.factoryId)) };
}
