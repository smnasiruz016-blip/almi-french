// Entry point for a practice run: starts a SESSION for the chosen exam + level +
// skill and redirects into it.
//
// This page used to BE the runner: it called pickItems({limit: 1}) and rendered
// items[0]. With `orderBy: createdAt asc` that served the same single item on every
// visit forever — 48 of 384 items reachable (12.5%). It is now a starter, so every
// existing /practice/run?exam=..&level=..&skill=.. link keeps working and lands the
// learner in a rotating multi-item run instead.

import Link from "next/link";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { findExam } from "@/lib/french/exams";
import { LEVELS, SKILL_SLUG } from "@/lib/french/types";
import type { CefrLevel, FrenchSkill } from "@prisma/client";
import { startSession } from "@/lib/french/session";

export const metadata = { title: "Practice run" };

const SLUG_TO_SKILL = Object.fromEntries(
  Object.entries(SKILL_SLUG).map(([skill, slug]) => [slug, skill as FrenchSkill]),
) as Record<string, FrenchSkill>;

export default async function RunPage({
  searchParams,
}: {
  searchParams: Promise<{ exam?: string; level?: string; skill?: string }>;
}) {
  const user = await requireUser();
  const sp = await searchParams;
  const exam = findExam(sp.exam ?? "");
  const level = sp.level as CefrLevel | undefined;
  const skill = SLUG_TO_SKILL[sp.skill ?? ""];

  if (!exam || !level || !LEVELS.includes(level) || !skill) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <p className="text-almi-text">That practice link is incomplete.</p>
        <Link href="/practice" className="mt-4 inline-block font-semibold text-almi-coral hover:underline">
          ← Back to practice
        </Link>
      </div>
    );
  }

  const sessionId = await startSession({ userId: user.id, exam, level, skill });

  // No content for this cell yet — say so plainly rather than rendering an empty run.
  if (!sessionId) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <h1 className="font-display text-2xl font-bold text-almi-ink">
          No items at {level} for {exam.name} yet
        </h1>
        <p className="mt-3 text-sm text-almi-text-muted">
          Original French content is being added wave by wave. Try another level or skill.
        </p>
        <Link href="/practice" className="mt-5 inline-block font-semibold text-almi-coral hover:underline">
          ← Back to practice
        </Link>
      </div>
    );
  }

  redirect(`/practice/session/${sessionId}`);
}
