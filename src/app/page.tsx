import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { CEFR_LEVELS, CEFR_LABEL } from "@/lib/french/cefr";

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
};

const EXAM_FAMILIES = [
  { tag: "TEF", line: "TEF Canada · TEFAQ / TEF Québec · TEF Naturalisation · TEF Études" },
  { tag: "TCF", line: "TCF Canada · TCF Québec · TCF Naturalisation (IRN) · TCF DAP · TCF Tout Public" },
  { tag: "DELF / DALF", line: "DELF A1–B2 · DALF C1–C2 — lifetime diplomas" },
];

const SKILLS = [
  { fr: "Compréhension de l'oral", en: "Listening", tier: "Auto-marked · Free" },
  { fr: "Compréhension écrite", en: "Reading", tier: "Auto-marked · Free" },
  { fr: "Expression écrite", en: "Writing", tier: "AI feedback · Pro" },
  { fr: "Expression orale", en: "Speaking", tier: "AI feedback · Pro" },
];

const VALUE_PROPS = [
  {
    title: "Built around the real exam formats",
    body: "Practise the same task types as TEF, TCF, DELF and DALF — reading and listening layouts, written and spoken prompts — built to mirror the real exam, never copied from the test-makers.",
  },
  {
    title: "Honest scores on the real scale",
    body: "Each exam is scored differently, so we estimate on its own scale and map it to CEFR — and to Canada's NCLC for immigration. Ranges, not an invented precise overall.",
  },
  {
    title: "The right test for your goal",
    body: "Use the \"which French test do you need?\" guide: TEF/TCF for Canada (IRCC does not accept DELF), DELF B2 for French citizenship, DELF/DALF for a lifetime diploma.",
  },
  {
    title: "Giving back with every attempt",
    body: "25% of all AlmiWorld income supports the Shamool Foundation's free school in Lahore — free education and a daily meal for underprivileged children.",
  },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="px-6 pt-16 pb-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-almi-coral">
            ALMIFRENCH · TEF · TCF · DELF · DALF PRACTICE
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold text-almi-ink sm:text-5xl">
            Practise the French exams with honest AI feedback.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-almi-text">
            Real task formats for TEF, TCF, DELF and DALF — all four skills, every CEFR level
            (A1–C2) — with an honest estimate mapped to CEFR and Canada&apos;s NCLC, so you know
            which test you need and where you stand.
          </p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/signup"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-almi-coral px-7 py-3 text-base font-semibold text-almi-ink hover:bg-almi-coral-deep"
            >
              Practise free
            </Link>
            <span className="text-sm text-almi-text-muted">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-almi-ink hover:underline">
                Log in →
              </Link>
            </span>
          </div>
          <p className="mt-5 text-xs text-almi-text-muted">
            $12/month · 7-day free trial · cancel anytime · Listening &amp; Reading free · Original
            French material, never copied
          </p>
        </div>

        {/* exam family chips */}
        <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-3">
          {EXAM_FAMILIES.map((f) => (
            <div key={f.tag} className="rounded-2xl border border-almi-bg-peach bg-almi-paper p-5">
              <p className="font-display text-sm font-bold uppercase tracking-wide text-almi-coral">{f.tag}</p>
              <p className="mt-2 text-sm text-almi-text">{f.line}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="border-t border-almi-bg-peach bg-almi-paper px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-display text-3xl font-semibold text-almi-ink">
            An honest estimate, and the right test for your goal.
          </h2>
          <p className="mt-5 text-base text-almi-text">
            French isn&apos;t one exam. For Canada it&apos;s TEF Canada or TCF Canada (and IRCC does
            not accept DELF). For French citizenship it&apos;s DELF B2. For a lifetime diploma it&apos;s
            DELF or DALF. Each is scored differently — so AlmiFrench gives you an honest estimate on
            the real scale for your exam, mapped to CEFR (and NCLC for Canada), and points you to the
            test your goal actually needs. Then confirm with the official body.
          </p>
          <div className="mt-7 text-center">
            <Link
              href="/which-french-test"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-almi-ink/15 px-6 py-2.5 text-sm font-semibold text-almi-ink hover:bg-almi-bg-peach/50"
            >
              Which French test do you need? →
            </Link>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-3xl font-semibold text-almi-ink">The four skills</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-base text-almi-text-muted">
            Listening and Reading are auto-marked and free to practise. Writing and Speaking are
            graded with honest AI feedback against the official criteria for your exam and level.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {SKILLS.map((s) => (
              <li key={s.en} className="flex flex-col rounded-2xl border border-almi-bg-peach bg-almi-paper p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-lg font-semibold text-almi-ink">{s.fr}</h3>
                  <span className="text-xs text-almi-text-muted">{s.tier}</span>
                </div>
                <p className="mt-1 text-sm text-almi-text-muted">{s.en}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Levels */}
      <section className="border-t border-almi-bg-peach bg-almi-bg-peach/40 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-display text-3xl font-semibold text-almi-ink">
            Six levels, every exam
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-base text-almi-text-muted">
            Choose your exam and level and every module runs at that standard.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CEFR_LEVELS.map((v) => (
              <li key={v} className="rounded-2xl border border-almi-bg-peach bg-almi-paper p-5">
                <h3 className="text-base font-semibold text-almi-ink">{CEFR_LABEL[v]}</h3>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Value props */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <ul className="grid gap-4 sm:grid-cols-2">
            {VALUE_PROPS.map((v) => (
              <li key={v.title} className="rounded-2xl border border-almi-bg-peach bg-almi-paper p-6">
                <h3 className="font-display text-lg font-semibold text-almi-ink">{v.title}</h3>
                <p className="mt-2 text-sm text-almi-text">{v.body}</p>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-almi-text-muted">
            Admission or registration is not a visa — confirm current rules with IRCC, MIFI, the
            French authority, or your university.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-almi-bg-peach bg-almi-paper px-6 py-16">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl font-semibold text-almi-ink">Simple, honest pricing</h2>
          <p className="mt-3 text-base text-almi-text">
            $12/month — 7-day free trial, cancel anytime. Listening &amp; Reading practice is free;
            AI feedback on Writing &amp; Speaking is Pro.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              href="/signup"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-almi-coral px-7 py-3 text-base font-semibold text-almi-ink hover:bg-almi-coral-deep"
            >
              Practise free
            </Link>
            <Link
              href="/pricing"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-almi-ink/15 px-6 py-3 text-base font-semibold text-almi-ink hover:bg-almi-bg-peach/50"
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
