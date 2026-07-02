import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Which French test do you need? TEF vs TCF vs DELF/DALF",
  description:
    "An honest guide to choosing the right French exam for your goal — Canada immigration (TEF/TCF), French citizenship (DELF B2), study in France, or a lifetime diploma. Mapped to CEFR and Canada's NCLC.",
  alternates: { canonical: `${SITE_URL}/which-french-test` },
};

type Row = { goal: string; exam: string; fact: string };

const ROWS: Row[] = [
  {
    goal: "Canada PR / Express Entry",
    exam: "TEF Canada or TCF Canada",
    fact: "NCLC 7 across all four skills = up to 50 bonus CRS points (with English at CLB 5+). IRCC does NOT accept DELF/DALF for PR.",
  },
  {
    goal: "Canada citizenship",
    exam: "TEF Canada / TCF Canada",
    fact: "A lower bar — around NCLC 4, with an oral focus.",
  },
  {
    goal: "Quebec immigration",
    exam: "TEFAQ / TEF Québec or TCF Québec",
    fact: "Quebec uses MIFI rules (PEQ/PSTQ are in active reform) — verify the currently accepted versions and levels with MIFI.",
  },
  {
    goal: "French citizenship / naturalisation",
    exam: "DELF B2 / DALF C1–C2 (since 1 Jan 2026), or TEF/TCF at B2",
    fact: "B2 — in both oral and written French, with no compensation between skills — is the standard since 1 January 2026, alongside a new civic exam. DELF B1 is for the 10-year resident card; A2 for the multi-year residence permit.",
  },
  {
    goal: "Study in France",
    exam: "TCF DAP, or DELF B2 / DALF C1",
    fact: "Confirm the exact requirement with the university or Campus France.",
  },
  {
    goal: "A lifetime credential",
    exam: "DELF A1–B2 / DALF C1–C2",
    fact: "DELF and DALF diplomas are valid for life. TEF and TCF results expire after 2 years.",
  },
];

const CONFIRM =
  "Admission or registration is not a visa — confirm current rules with IRCC, MIFI, the French authority, or the university.";

export default function WhichFrenchTestPage() {
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Which French test do you need?",
    itemListElement: ROWS.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${r.goal} → ${r.exam}`,
    })),
  };

  return (
    <main className="px-6 py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-almi-coral">ALMIFRENCH GUIDE</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-almi-ink">
          Which French test do you need?
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-almi-text">
          French isn&apos;t one exam. The right test depends entirely on your goal — and the wrong
          one can mean zero immigration points or a diploma that doesn&apos;t count. Here is the
          honest version, mapped to CEFR and Canada&apos;s NCLC.
        </p>
        <p className="mt-4 text-sm text-almi-text">
          Applying for French citizenship? The required French level rose from B1 to B2 for
          applications filed from 1 January 2026 —{" "}
          <Link href="/french-level-for-citizenship-2026" className="font-semibold text-almi-coral hover:underline">
            what changed and who it affects
          </Link>
          .
        </p>

        <div className="mt-10 space-y-4">
          {ROWS.map((r) => (
            <div key={r.goal} className="rounded-2xl border border-almi-bg-peach bg-almi-paper p-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h2 className="font-display text-lg font-semibold text-almi-ink">{r.goal}</h2>
                <span className="text-sm font-semibold text-almi-coral">{r.exam}</span>
              </div>
              <p className="mt-2 text-sm text-almi-text">{r.fact}</p>
              <p className="mt-2 text-xs text-almi-text-muted">{CONFIRM}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-almi-bg-peach bg-almi-bg-peach/40 p-6 text-sm text-almi-text">
          <p className="font-semibold text-almi-ink">How the scoring differs</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li><strong>TEF</strong> — each skill 0–699 → CEFR + NCLC. No single pass %.</li>
            <li><strong>TCF</strong> — Listening &amp; Reading 0–699, Speaking &amp; Writing 0–20 → CEFR + NCLC. No single pass %.</li>
            <li><strong>DELF / DALF</strong> — each skill /25, total /100; pass = 50/100 <em>and</em> at least 5/25 in every skill (the note éliminatoire).</li>
          </ul>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/signup"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-almi-coral px-7 py-3 text-base font-semibold text-almi-ink hover:bg-almi-coral-deep"
          >
            Practise free for your exam
          </Link>
        </div>
      </div>
    </main>
  );
}
