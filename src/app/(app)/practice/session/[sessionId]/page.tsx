// The practice runner. Renders the item for the session's current step and
// advances to a NOT-YET-SERVED item — the rotation almi-french previously lacked.
//
// Ported from the production-proven session pages in almi-celpip and almi-goethe:
// a server action calls advanceSession() and redirects back into the same session,
// so `currentStep` moves forward and the next pick excludes everything already
// served (see src/lib/french/session.ts).

import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { findExam } from "@/lib/french/exams";
import { SKILL_LABEL } from "@/lib/french/types";
import { advanceSession, currentItem, getSessionView, stripAnswers } from "@/lib/french/session";
import { Composer, type ComposerItem } from "@/components/french/Composer";

export const metadata = { title: "Practice run" };

export default async function SessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const user = await requireUser();
  const { sessionId } = await params;
  const session = await getSessionView(sessionId, user.id);
  if (!session || !session.skill) notFound();

  const exam = findExam(session.examId);
  if (!exam) notFound();

  const stepLabel = `Item ${session.currentStep + 1} of ${session.targetCount}`;
  const isLast = session.currentStep + 1 >= session.targetCount;

  if (session.status === "COMPLETED") {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h1 className="font-display text-2xl font-bold text-almi-ink">Run complete</h1>
        <p className="mt-3 text-sm text-almi-text-muted">
          You worked through {session.targetCount}{" "}
          {session.targetCount === 1 ? "item" : "items"} of {SKILL_LABEL[session.skill]} at{" "}
          {session.level}. Each item was different — start another run for a fresh set.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href={`/practice?exam=${exam.id}&level=${session.level}`}
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-almi-coral px-7 py-3 font-semibold text-almi-ink hover:bg-almi-coral-deep"
          >
            Practise again
          </Link>
          <Link href="/practice" className="inline-flex min-h-[48px] items-center font-semibold text-almi-coral hover:underline">
            ← Back to practice
          </Link>
        </div>
      </div>
    );
  }

  const item = await currentItem(session);
  // The step's item was deactivated or removed mid-run: end the run honestly
  // rather than rendering a blank composer.
  if (!item) notFound();

  async function advance() {
    "use server";
    const u = await requireUser();
    await advanceSession(sessionId, u.id);
    redirect(`/practice/session/${sessionId}`);
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <p className="text-xs font-semibold uppercase tracking-wide text-almi-text-muted">
        {exam.name} · {session.level} · {SKILL_LABEL[session.skill]}
      </p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-almi-text-muted">{stepLabel}</p>

      <Composer item={stripAnswers(item) as unknown as ComposerItem} examId={exam.id} />

      <form action={advance} className="mt-8 border-t border-almi-line pt-6">
        <button
          type="submit"
          className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-almi-coral px-7 py-3 text-base font-semibold text-almi-ink hover:bg-almi-coral-deep"
        >
          {isLast ? "Finish run →" : "Next item →"}
        </button>
        <p className="mt-2 text-xs text-almi-text-muted">
          Submit your answer above to see the read-out, then move on. The next item is one you have
          not seen in this run.
        </p>
      </form>
    </div>
  );
}
