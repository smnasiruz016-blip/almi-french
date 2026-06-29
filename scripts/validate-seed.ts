// Dev-only: validate every seed item's payload against a Zod schema for its skill,
// so a malformed payload is caught here, not at scoring time.
// Run: npm run validate:seed
import { z } from "zod";
import { ITEMS as B1 } from "./seed/b1";
import { ITEMS as B2 } from "./seed/b2";

const ITEMS = [...B1, ...B2];

const mcqQuestion = z.object({
  id: z.string(),
  stem: z.string(),
  options: z.array(z.object({ id: z.string(), text: z.string() })),
  answer: z.string(),
});

const readingQuestion = z.object({
  id: z.string(),
  kind: z.enum(["mcq", "match", "truefalse"]),
  stem: z.string(),
  options: z.array(z.object({ id: z.string(), text: z.string() })).optional(),
  answer: z.string(),
});

const readingSchema = z.object({
  passages: z.array(z.object({ id: z.string(), heading: z.string().optional(), body: z.string() })),
  questions: z.array(readingQuestion),
});

const listeningSchema = z.object({
  audioScript: z.string(),
  speakers: z.array(z.object({ role: z.string(), voice: z.string() })),
  questions: z.array(mcqQuestion),
});

const writingSchema = z.object({
  situation: z.string(),
  instruction: z.string(),
  wordMin: z.number(),
  wordMax: z.number(),
});

const speakingSchema = z.object({
  taskPrompt: z.string(),
  prepSeconds: z.number(),
  speakSeconds: z.number(),
});

type Schema = { safeParse: (v: unknown) => { success: boolean; error?: unknown } };

function schemaFor(skill: string): Schema | null {
  if (skill === "COMPREHENSION_ECRITE") return readingSchema;
  if (skill === "COMPREHENSION_ORALE") return listeningSchema;
  if (skill === "EXPRESSION_ECRITE") return writingSchema;
  if (skill === "EXPRESSION_ORALE") return speakingSchema;
  return null;
}

// Productive items must carry an examFamily; shared (reading/listening) must not.
let bad = 0;
const titles = new Set<string>();
for (const it of ITEMS) {
  const sc = schemaFor(it.skill as string);
  if (!sc) {
    bad++;
    console.error(`FAIL [${it.skill}] ${it.title}: no schema`);
    continue;
  }
  const res = sc.safeParse(it.payload);
  if (!res.success) {
    bad++;
    console.error(`FAIL [${it.level} ${it.skill}] ${it.title}:`, JSON.stringify(res.error).slice(0, 300));
  }
  const productive = it.skill === "EXPRESSION_ECRITE" || it.skill === "EXPRESSION_ORALE";
  if (productive && !it.examFamily) {
    bad++;
    console.error(`FAIL [${it.skill}] ${it.title}: productive item needs examFamily`);
  }
  if (!productive && it.examFamily) {
    bad++;
    console.error(`FAIL [${it.skill}] ${it.title}: shared item must not set examFamily`);
  }
  const key = `${it.level}/${it.skill}/${it.title}`;
  if (titles.has(key)) {
    bad++;
    console.error(`FAIL duplicate: ${key}`);
  }
  titles.add(key);
}
console.log(bad ? `\n${bad} invalid item(s)` : `All ${ITEMS.length} items valid ✓`);
process.exit(bad ? 1 : 0);
