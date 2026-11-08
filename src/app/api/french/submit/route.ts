// Score a practice attempt. Reading/Listening: deterministic marking (free).
// Writing/Speaking: AI grader through aiGate() (Pro, or one of each in the free 48 hours,
// RR-397). Both convert to the chosen exam's scale and route to its engine for an
// honest per-skill estimate. No fabricated official score; we always tell the user to
// confirm with the official body.

import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { hasPaidAccess, isEmailVerified } from "@/lib/billing/plans";
import { aiGate } from "@/lib/billing/free-access";
import { findExam } from "@/lib/french/exams";
import { isObjective } from "@/lib/french/types";
import { markObjective, estimateSkill, toCefrSkill, type ObjectiveResponse } from "@/lib/french/scoring";
import { answerKey } from "@/lib/french/session";
import { gradeProductive } from "@/lib/french/grader";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request): Promise<NextResponse> {
  const user = await requireUser();
  let body: { itemId?: string; examId?: string; response?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body.itemId || !body.examId) {
    return NextResponse.json({ error: "itemId and examId are required" }, { status: 400 });
  }
  const exam = findExam(body.examId);
  if (!exam) return NextResponse.json({ error: "Unknown exam" }, { status: 400 });

  const item = await prisma.frenchItem.findUnique({ where: { id: body.itemId } });
  if (!item || !item.active) return NextResponse.json({ error: "Item not found" }, { status: 404 });

  const cefrSkill = toCefrSkill(item.skill);
  let fraction: number;
  let feedback: unknown = null;
  let aiModel: string | null = null;
  let costCents: number | null = null;
  let latencyMs: number | null = null;
  let pointsEarned = 0;
  let pointsMax = 0;

  if (isObjective(item.skill)) {
    const resp = (body.response ?? { answers: {} }) as ObjectiveResponse;
    const mark = markObjective(answerKey(item), resp);
    fraction = mark.fraction;
    pointsEarned = mark.correct;
    pointsMax = mark.total;
  } else {
    // RR-397: productive (Writing/Speaking): paid users as before; a free account (48 hours, no card) gets ONE AI-scored
    // Expression écrite and ONE AI-scored Expression orale, within today's free-AI budget.
    if (!hasPaidAccess(user) && !isEmailVerified(user)) {
      return NextResponse.json(
        { error: "Please verify your email before getting AI feedback." },
        { status: 403 },
      );
    }
    const skill = item.skill;
    const r = (body.response ?? {}) as { text?: string; transcript?: string };
    const text = (r.text ?? r.transcript ?? "").trim();
    if (!text) return NextResponse.json({ error: "Empty response" }, { status: 400 });
    const gate = await aiGate(user, skill === "EXPRESSION_ORALE" ? "SPEAKING" : "WRITING", () =>
      prisma.frenchAttempt.count({ where: { userId: user.id, skill, status: "SCORED" } }),
    );
    if (!gate.ok) return NextResponse.json(gate.body, { status: gate.status });
    const payload = item.payload as Record<string, unknown>;
    const taskPrompt = [item.prompt, payload?.situation, payload?.instruction, payload?.taskPrompt]
      .filter((x): x is string => typeof x === "string" && x.length > 0)
      .join("\n");
    let grade: Awaited<ReturnType<typeof gradeProductive>> & { latencyMs?: number };
    try {
      grade = (await gradeProductive({
        exam,
        level: item.level,
        skill: item.skill,
        taskPrompt,
        response: text,
        userId: user.id,
      })) as Awaited<ReturnType<typeof gradeProductive>> & { latencyMs?: number };
    } catch (err) {
      // RR-399 A3: the AI call failed, so the learner received nothing: give the free use back before the error goes out.
      await gate.release();
      throw err;
    }
    fraction = grade.fraction;
    feedback = {
      levelEstimate: grade.level_estimate,
      strengths: grade.strengths,
      improvements: grade.improvements,
      summary: grade.summary,
    };
    aiModel = "claude-sonnet-4-6";
    latencyMs = grade.latencyMs ?? null;
  }

  const estimate = estimateSkill(exam, cefrSkill, fraction);

  const attempt = await prisma.frenchAttempt.create({
    data: {
      userId: user.id,
      itemId: item.id,
      level: item.level,
      skill: item.skill,
      taskType: item.taskType,
      examId: exam.id,
      status: "SCORED",
      response: (body.response ?? {}) as object,
      pointsEarned,
      pointsMax,
      scoreEstimate: estimate as object,
      feedback: feedback as object,
      aiModel,
      costCents,
      latencyMs,
      submittedAt: new Date(),
    },
  });

  return NextResponse.json({ attemptId: attempt.id, estimate, feedback });
}
