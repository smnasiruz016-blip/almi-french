// The AlmiFrench exam map — every French exam the product covers, grouped by
// family, each routed to its scoring engine (Part 2). Doors are exam-named and
// goal-named; honest key fact per exam. (Children/workplace variants are noted
// as out-of-scope — a different audience, not a deferred piece of this product.)

import type { ExamFamily, EngineId } from "./engines";
import { ENGINE_FOR_FAMILY } from "./engines";

export type Exam = {
  id: string;
  name: string;
  body: string;
  family: ExamFamily;
  engine: EngineId;
  purpose: string;
  keyHonestFact: string;
};

function mk(
  id: string,
  name: string,
  body: string,
  family: ExamFamily,
  purpose: string,
  keyHonestFact: string,
): Exam {
  return { id, name, body, family, engine: ENGINE_FOR_FAMILY[family], purpose, keyHonestFact };
}

export const EXAMS: Exam[] = [
  // TEF family — CCI Paris / Le français des affaires
  mk("tef-canada", "TEF Canada", "CCI Paris — Le français des affaires", "TEF",
    "Canada immigration (Express Entry, PNP, citizenship)",
    "Scored 0–699 per skill → CEFR + NCLC. NCLC 7 across all four skills = up to 50 CRS bonus points (with English CLB 5+). Valid 2 years."),
  mk("tefaq", "TEFAQ / TEF Québec", "CCI Paris — Le français des affaires", "TEF",
    "Quebec immigration (MIFI)",
    "Quebec uses MIFI rules (PEQ/PSTQ are in active reform) — verify the currently accepted versions and levels with MIFI."),
  mk("tef-naturalisation", "TEF Naturalisation", "CCI Paris — Le français des affaires", "TEF",
    "French citizenship / residence card",
    "Accepted for naturalisation, but since 1 Jan 2026 the standard is B2 in both oral and written French, with no compensation between skills, alongside a new civic exam (Décret 2025-648). Confirm the current requirement with the French authority."),
  mk("tef-etudes", "TEF Études", "CCI Paris — Le français des affaires", "TEF",
    "Study in France (Campus France)",
    "Confirm the exact level your programme needs with the university / Campus France."),

  // TCF family — France Éducation International (same body as DELF/DALF)
  mk("tcf-canada", "TCF Canada", "France Éducation International", "TCF",
    "Canada immigration (Express Entry, PNP)",
    "Listening & Reading 0–699, Speaking & Writing 0–20 → CEFR + NCLC. Four skills only (no 'structures de la langue' section). Valid 2 years."),
  mk("tcf-quebec", "TCF Québec", "France Éducation International", "TCF",
    "Quebec immigration (MIFI)",
    "Quebec uses MIFI rules (PEQ/PSTQ in active reform) — verify accepted versions/levels with MIFI."),
  mk("tcf-irn", "TCF Naturalisation (IRN)", "France Éducation International", "TCF",
    "French citizenship / résidence",
    "Accepted for naturalisation; since 1 Jan 2026 the standard is B2 in both oral and written French, with no compensation between skills, alongside a new civic exam (Décret 2025-648). Confirm with the French authority."),
  mk("tcf-dap", "TCF DAP", "France Éducation International", "TCF",
    "University admission in France (demande d'admission préalable)",
    "Used for first-year/licence admission — confirm the required level with the university."),
  mk("tcf-tp", "TCF Tout Public", "France Éducation International", "TCF",
    "General level certification",
    "A general-purpose level certificate; not all versions are accepted for every official purpose — check what your goal requires."),

  // DELF / DALF — French Ministry of Education (lifetime diplomas)
  mk("delf-a1", "DELF A1", "France Éducation International", "DELF-DALF",
    "Beginner lifetime diploma", "Each skill /25, total /100; pass = 50/100 AND at least 5/25 per skill. Lifetime valid."),
  mk("delf-a2", "DELF A2", "France Éducation International", "DELF-DALF",
    "Elementary lifetime diploma; A2 = multi-year residence permit", "/25 per skill, 50/100 pass with a 5/25 floor. Lifetime valid."),
  mk("delf-b1", "DELF B1", "France Éducation International", "DELF-DALF",
    "Intermediate; B1 = 10-year resident card", "/25 per skill, 50/100 pass with a 5/25 floor. Lifetime valid."),
  mk("delf-b2", "DELF B2", "France Éducation International", "DELF-DALF",
    "Upper-intermediate; B2 = French naturalisation since 1 Jan 2026", "/25 per skill, 50/100 pass with a 5/25 floor. Lifetime valid. IRCC does NOT accept DELF for Canada PR."),
  mk("dalf-c1", "DALF C1", "France Éducation International", "DELF-DALF",
    "Advanced; often for study in France", "/25 per skill, 50/100 pass with a 5/25 floor. Lifetime valid."),
  mk("dalf-c2", "DALF C2", "France Éducation International", "DELF-DALF",
    "Mastery lifetime diploma", "/25 per skill, 50/100 pass with a 5/25 floor. Lifetime valid."),
];

export const EXAM_FAMILIES: ExamFamily[] = ["TEF", "TCF", "DELF-DALF"];

export function examsByFamily(family: ExamFamily): Exam[] {
  return EXAMS.filter((e) => e.family === family);
}

export function findExam(id: string): Exam | undefined {
  return EXAMS.find((e) => e.id === id);
}

// Out-of-core scope — a different audience, noted so it's never silently built
// into the core product.
export const OUT_OF_SCOPE_NOTE =
  "DELF Prim and DELF Junior (children) and DELF Pro (workplace) are separate audiences, not part of the core AlmiFrench build.";
