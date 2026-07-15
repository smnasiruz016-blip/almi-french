// Practice picker: choose an exam → CEFR level → skill, then run a practice item.
// Reading/Listening are free (auto-marked); Writing/Speaking are Pro (AI feedback).

import Link from "next/link";
import { EXAMS, EXAM_FAMILIES, examsByFamily } from "@/lib/french/exams";
import { LEVELS, LEVEL_LABEL, SKILL_ORDER, SKILL_LABEL, SKILL_SLUG, isObjective } from "@/lib/french/types";
import { SKILL_FR } from "@/lib/french/cefr";
import {
  delfStructureFor,
  DELF_COMPREHENSION_NOTE,
  DELF_STRUCTURE_SOURCE,
} from "@/lib/french/delf-structure";

// DELF exams are level-named (delf-b1), so the structure follows the exam id
// rather than the picker. DALF C1/C2 have no verified structure → nothing shown.
const DELF_LEVEL_BY_EXAM_ID: Record<string, "A1" | "A2" | "B1" | "B2"> = {
  "delf-a1": "A1",
  "delf-a2": "A2",
  "delf-b1": "B1",
  "delf-b2": "B2",
};

export const metadata = { title: "Practice" };

export default async function PracticePage({
  searchParams,
}: {
  searchParams: Promise<{ exam?: string; level?: string }>;
}) {
  const { exam: examId, level } = await searchParams;
  const exam = EXAMS.find((e) => e.id === examId);
  const delfLevel = exam ? DELF_LEVEL_BY_EXAM_ID[exam.id] : undefined;
  const structure = delfLevel ? delfStructureFor(delfLevel) : null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="font-display text-3xl font-bold text-almi-ink">Choose your practice</h1>
      <p className="mt-2 text-sm text-almi-text-muted">
        Pick the exam your goal needs, your level, then a skill. Compréhension de l&apos;oral &amp; écrite
        are free; Expression écrite &amp; orale get AI feedback (Pro). Estimates only — confirm with the
        official body.
      </p>

      {/* Step 1 — exam */}
      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold text-almi-ink">1. Exam</h2>
        <div className="mt-3 space-y-4">
          {EXAM_FAMILIES.map((fam) => (
            <div key={fam}>
              <p className="text-xs font-semibold uppercase tracking-wide text-almi-text-muted">{fam}</p>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {examsByFamily(fam).map((e) => (
                  <Link
                    key={e.id}
                    href={`/practice?exam=${e.id}`}
                    className={`rounded-full border px-3 py-1.5 text-sm ${
                      e.id === examId
                        ? "border-almi-coral bg-almi-coral/10 font-semibold text-almi-ink"
                        : "border-almi-bg-peach text-almi-text hover:border-almi-coral/50"
                    }`}
                  >
                    {e.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {exam && (
        <section className="mt-8">
          <h2 className="font-display text-lg font-semibold text-almi-ink">2. Level</h2>
          <p className="mt-1 text-xs text-almi-text-muted">{exam.keyHonestFact}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {LEVELS.map((l) => (
              <Link
                key={l}
                href={`/practice?exam=${exam.id}&level=${l}`}
                className={`rounded-full border px-3 py-1.5 text-sm ${
                  l === level
                    ? "border-almi-coral bg-almi-coral/10 font-semibold text-almi-ink"
                    : "border-almi-bg-peach text-almi-text hover:border-almi-coral/50"
                }`}
              >
                {LEVEL_LABEL[l]}
              </Link>
            ))}
          </div>
        </section>
      )}

      {structure && (
        <section className="mt-8">
          <h2 className="font-display text-lg font-semibold text-almi-ink">
            What {exam?.name} actually looks like
          </h2>
          <p className="mt-1 text-xs text-almi-text-muted">{DELF_COMPREHENSION_NOTE}</p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-almi-bg-peach">
                  <th className="py-2 pr-4 font-display font-semibold text-almi-ink">Épreuve</th>
                  <th className="py-2 pr-4 font-display font-semibold text-almi-ink">Length</th>
                  <th className="py-2 font-display font-semibold text-almi-ink">Duration</th>
                </tr>
              </thead>
              <tbody>
                {structure.epreuves.map((e) => (
                  <tr key={e.skill} className="border-b border-almi-bg-peach/60 align-top">
                    <td className="py-2 pr-4 text-almi-text">
                      {SKILL_FR[e.skill]}
                      {e.task && (
                        <span className="block text-xs text-almi-text-muted">{e.task}</span>
                      )}
                    </td>
                    <td className="py-2 pr-4 text-almi-text">
                      {e.exercises !== null
                        ? `${e.exercises} exercise${e.exercises > 1 ? "s" : ""}`
                        : e.parts !== null
                          ? `${e.parts} parts`
                          : "—"}
                    </td>
                    <td className="py-2 text-almi-text">
                      {e.duration}
                      {e.prep && (
                        <span className="block text-xs text-almi-text-muted">+ {e.prep}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-almi-text-muted">
            Scored {structure.totalNote}; pass = 50/100 with at least 5/25 in every épreuve — any
            épreuve under 5/25 fails the whole exam (note éliminatoire). {DELF_STRUCTURE_SOURCE}
          </p>
        </section>
      )}

      {exam && level && (
        <section className="mt-8">
          <h2 className="font-display text-lg font-semibold text-almi-ink">3. Skill</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {SKILL_ORDER.map((s) => (
              <Link
                key={s}
                href={`/practice/run?exam=${exam.id}&level=${level}&skill=${SKILL_SLUG[s]}`}
                className="flex flex-col rounded-2xl border border-almi-bg-peach bg-almi-paper p-4 hover:border-almi-coral/50"
              >
                <span className="font-display font-semibold text-almi-ink">{SKILL_LABEL[s]}</span>
                <span className="mt-1 text-xs text-almi-text-muted">
                  {isObjective(s) ? "Auto-marked · Free" : "AI feedback · Pro"}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <p className="mt-10 text-xs text-almi-text-muted">
        Not sure which exam?{" "}
        <Link href="/which-french-test" className="font-semibold text-almi-coral hover:underline">
          Which French test do you need? →
        </Link>
      </p>
    </div>
  );
}
