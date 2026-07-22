// Item selection for a practice run. Content is keyed by (skill, level); Reading/
// Listening items are shared (examFamily = null), Writing/Speaking can be
// exam-specific. We pull shared items plus any that match the chosen exam's
// family, and strip answer keys before anything reaches the client.
//
// ── SESSION ENGINE ───────────────────────────────────────────────────────────
// Ported from the production-proven engines in almi-celpip and almi-goethe
// (src/lib/celpip/session.ts): a session owns `currentStep`, each served item is
// recorded, and the next pick EXCLUDES everything already served so a run never
// repeats itself. Selection is random over the remaining pool, so across repeated
// sessions the whole bank is reachable.
//
// WHY THIS EXISTS. Before it, `/practice/run` called pickItems({limit: 1}) and
// rendered items[0] with `orderBy: createdAt asc` — no rotation of any kind. Every
// visit to a given (exam, level, skill) served the SAME item forever: 48 of 384
// items reachable (12.5%), the other 336 unreachable by any route through the UI.
//
// ONE DELIBERATE DIFFERENCE FROM THE CELPIP ORIGINAL. celpip pre-creates an
// IN_PROGRESS attempt per step, so it can derive excludeIds from
// session.attempts.map(a => a.itemId). AlmiFrench creates the attempt at SUBMIT
// time (api/french/submit), so mid-session there is no attempt row for the item
// currently on screen — deriving excludeIds from attempts would re-serve it. We
// therefore persist the served item ids on the session's existing `plan` JSON
// column (declared, previously unused, so no migration). Same semantics, and it
// also survives a user who abandons a step without submitting.

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import type { CefrLevel, ExamFamily, FrenchItem, FrenchSkill } from "@prisma/client";
import { findExam, type Exam } from "./exams";
import { isObjective } from "./types";
import { inFamilyPool, plannedSteps } from "./pool";

// exams.ts family ("DELF-DALF") → prisma ExamFamily enum ("DELF_DALF").
export function toExamFamilyEnum(family: Exam["family"]): ExamFamily {
  return family === "DELF-DALF" ? "DELF_DALF" : family;
}

export async function pickItems(args: {
  level: CefrLevel;
  skill: FrenchSkill;
  exam: Exam;
  limit?: number;
}): Promise<FrenchItem[]> {
  const fam = toExamFamilyEnum(args.exam.family);
  return prisma.frenchItem.findMany({
    where: {
      level: args.level,
      skill: args.skill,
      active: true,
      OR: [{ examFamily: null }, { examFamily: fam }],
    },
    orderBy: { createdAt: "asc" },
    take: args.limit ?? 8,
  });
}

/** The DB half of the pool rule: narrow on the indexed columns only. The FAMILY
 *  decision is made by inFamilyPool() in pool.ts — one definition, used here in
 *  production and by the reachability proof. See pool.ts for why. */
function candidateWhere(level: CefrLevel, skill: FrenchSkill) {
  return { level, skill, active: true };
}

/** Ids a door may serve for a cell, minus anything already served this run. */
async function poolIds(
  level: CefrLevel,
  skill: FrenchSkill,
  fam: ExamFamily,
  excludeIds: string[],
): Promise<string[]> {
  const rows = await prisma.frenchItem.findMany({
    where: {
      ...candidateWhere(level, skill),
      ...(excludeIds.length ? { id: { notIn: excludeIds } } : {}),
    },
    select: { id: true, examFamily: true },
  });
  return rows.filter((r) => inFamilyPool(r, fam)).map((r) => r.id);
}

/** Count the items a door can reach for a cell — used to size a run so it never
 *  targets more steps than there is content (which would end the run early). */
export async function poolSize(level: CefrLevel, skill: FrenchSkill, exam: Exam): Promise<number> {
  return (await poolIds(level, skill, toExamFamilyEnum(exam.family), [])).length;
}

/** Pick one item at random from the cell, excluding everything already served in
 *  this session. Returns null when the pool is exhausted — the caller ends the run
 *  rather than repeating an item.
 *
 *  Exported so the reachability proof (scripts/reachability-proof.ts) can exercise
 *  THIS function rather than a re-implementation of it — a proof that tests a copy
 *  of the logic proves nothing about the logic that ships. */
export async function pickUnservedItemId(
  level: CefrLevel,
  skill: FrenchSkill,
  fam: ExamFamily,
  excludeIds: string[],
): Promise<string | null> {
  const pool = await poolIds(level, skill, fam, excludeIds);
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

/** Item ids already served in this session, in step order. Stored on `plan`. */
function servedIds(plan: Prisma.JsonValue | null): string[] {
  return Array.isArray(plan) ? (plan as unknown[]).filter((v): v is string => typeof v === "string") : [];
}

/** Start a practice run. Returns the session id, or null when the cell has no
 *  content at all (the caller shows the honest "no items yet" surface). */
export async function startSession(input: {
  userId: string;
  exam: Exam;
  level: CefrLevel;
  skill: FrenchSkill;
}): Promise<string | null> {
  const fam = toExamFamilyEnum(input.exam.family);
  const available = (await poolIds(input.level, input.skill, fam, [])).length;
  if (available === 0) return null;

  // Never target more steps than there are items: a run that promises 8 and can
  // only serve 5 would look broken and would tempt a future fix to repeat items.
  const targetCount = plannedSteps(isObjective(input.skill), available);

  const firstId = await pickUnservedItemId(input.level, input.skill, fam, []);
  if (!firstId) return null;

  const session = await prisma.frenchSession.create({
    data: {
      userId: input.userId,
      mode: "PRACTICE_SET",
      examId: input.exam.id,
      level: input.level,
      skill: input.skill,
      targetCount,
      currentStep: 0,
      plan: [firstId] as unknown as Prisma.InputJsonValue,
    },
  });
  return session.id;
}

export async function getSessionView(sessionId: string, userId: string) {
  return prisma.frenchSession.findFirst({
    where: { id: sessionId, userId },
    include: { attempts: { orderBy: { sessionStep: "asc" } } },
  });
}

/** The item on screen for the session's current step. */
export async function currentItem(session: {
  plan: Prisma.JsonValue | null;
  currentStep: number;
}): Promise<FrenchItem | null> {
  const ids = servedIds(session.plan);
  const id = ids[session.currentStep];
  if (!id) return null;
  return prisma.frenchItem.findUnique({ where: { id } });
}

/** Advance to the next step, picking an item this session has not served.
 *  Completes the run at targetCount, or early if the pool runs dry. */
export async function advanceSession(sessionId: string, userId: string): Promise<void> {
  const session = await prisma.frenchSession.findFirst({ where: { id: sessionId, userId } });
  if (!session || session.status === "COMPLETED") return;

  const served = servedIds(session.plan);
  const nextStep = session.currentStep + 1;

  if (nextStep >= session.targetCount) {
    await prisma.frenchSession.update({
      where: { id: session.id },
      data: { status: "COMPLETED", completedAt: new Date() },
    });
    return;
  }

  // The session stores the exam ID (a door, e.g. "tef-canada"); the pool is keyed
  // by FAMILY, so resolve door → family exactly as the start path did.
  const exam = findExam(session.examId);
  if (!exam || !session.skill) {
    await prisma.frenchSession.update({
      where: { id: session.id },
      data: { status: "COMPLETED", completedAt: new Date() },
    });
    return;
  }

  const nextId = await pickUnservedItemId(session.level, session.skill, toExamFamilyEnum(exam.family), served);
  if (!nextId) {
    await prisma.frenchSession.update({
      where: { id: session.id },
      data: { status: "COMPLETED", completedAt: new Date() },
    });
    return;
  }

  await prisma.frenchSession.update({
    where: { id: session.id },
    data: {
      currentStep: nextStep,
      plan: [...served, nextId] as unknown as Prisma.InputJsonValue,
    },
  });
}

// Remove server-side answer keys from a payload before sending to the client.
export function stripAnswers(item: FrenchItem): FrenchItem {
  const payload = item.payload as Record<string, unknown> | null;
  if (!payload || typeof payload !== "object") return item;
  const clone: Record<string, unknown> = JSON.parse(JSON.stringify(payload));
  if (Array.isArray(clone.questions)) {
    clone.questions = (clone.questions as Record<string, unknown>[]).map((q) => {
      const { answer: _drop, ...rest } = q;
      void _drop;
      return rest;
    });
  }
  // Listening: the audioScript carries content but not answers; the audio is
  // served via the TTS route, so keep the script server-only by dropping it here.
  if (typeof clone.audioScript === "string") delete clone.audioScript;
  return { ...item, payload: clone as FrenchItem["payload"] };
}

// Build the server-side answer key for an objective item.
export function answerKey(item: FrenchItem): { id: string; answer: string; exact?: boolean }[] {
  const payload = item.payload as { questions?: { id: string; answer: string; kind?: string }[] } | null;
  if (!payload?.questions) return [];
  return payload.questions.map((q) => ({ id: q.id, answer: q.answer, exact: true }));
}
