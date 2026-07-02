// Self-canonical explainer: France raised the naturalisation French level from
// B1 to B2 for applications filed from 1 Jan 2026 (Décret n° 2025-648 du 15
// juillet 2025), and added a civic exam. Verified against service-public.fr
// (F11926) and Légifrance (JORFTEXT000051900519). No claim beyond those facts;
// the DELF/DALF and TEF/TCF exams themselves are unchanged — this is an
// acceptance-policy change. Requirement-not-guarantee framing throughout.

import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const revalidate = 86_400;

const URL = `${SITE_URL}/french-level-for-citizenship-2026`;
const TITLE = "France Raised the French Level for Citizenship — B1 to B2 (2026)";
const DESCRIPTION =
  "For French nationality applications filed from 1 January 2026, the required French level rose from B1 to B2 (oral and written, no compensation between skills), and a new civic exam was added — Décret n° 2025-648. What changed, who it affects, and which proof now counts.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, type: "article" },
};

const SERVICE_PUBLIC = "https://www.service-public.fr/particuliers/vosdroits/F11926";
const LEGIFRANCE = "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000051900519";

const FAQ = [
  {
    q: "What French level do you need for French citizenship in 2026?",
    a: "B2 on the CEFR scale, in both oral and written French, for naturalisation and declaration-by-marriage applications filed from 1 January 2026 (Décret n° 2025-648).",
  },
  {
    q: "Does DELF B1 still count for naturalisation?",
    a: "Not for applications filed from 2026. DELF B2, DALF C1–C2, or a TEF/TCF attestation at B2 is now required. Complete applications filed by 31 December 2025 remain under the earlier B1 regime.",
  },
  {
    q: "Did the DELF/DALF or TEF/TCF exams change?",
    a: "No. This is an acceptance-policy change — which level counts for nationality — not a change to any exam. The exams' formats, scales and pass marks are unchanged.",
  },
];

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 rounded-2xl border border-almi-bg-peach bg-almi-paper p-6">
      <h2 className="font-display text-lg font-semibold text-almi-ink">{title}</h2>
      <div className="mt-2 space-y-2 text-sm text-almi-text">{children}</div>
    </section>
  );
}

export default function CitizenshipFrenchLevelPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="px-6 py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-almi-coral">ALMIFRENCH · FRANCE 2026</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-almi-ink">
          France raised the French level for citizenship — B1 to B2
        </h1>
        <p className="mt-4 text-lg text-almi-text">
          For French nationality applications filed from 1 January 2026, the required level of French
          rose from B1 to B2 — in both speaking and writing — and a new civic exam was added. Here is
          what changed, who it affects, and which proof now counts. Meeting the level is a requirement,
          not a guarantee: it is one condition among several, and a language level is not the same as
          nationality.
        </p>

        <Card title="What changed">
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              The French level required for naturalisation, reintegration, and declaration of nationality
              by marriage rose from <strong>B1 to B2</strong> on the CEFR scale.
            </li>
            <li>
              B2 is required in <strong>both oral and written French, with no compensation between
              skills</strong> — a strong result in one skill cannot offset a weaker one.
            </li>
            <li>A new <strong>civic exam</strong> was added, covering knowledge of French history, culture and society.</li>
            <li>
              Legal basis:{" "}
              <a href={LEGIFRANCE} target="_blank" rel="noopener noreferrer" className="font-semibold text-almi-coral hover:underline">
                Décret n° 2025-648 du 15 juillet 2025
              </a>
              .
            </li>
          </ul>
        </Card>

        <Card title="From when — the filing-date rule">
          <p>
            The B2 requirement applies to naturalisation and reintegration applications <strong>filed
            from 1 January 2026</strong>, and to declarations of nationality by marriage subscribed from
            that date.
          </p>
          <p>
            Complete applications filed by <strong>31 December 2025</strong> remain under the earlier B1
            language regime. If you applied earlier, check your file&apos;s status with the authority
            handling it.
          </p>
        </Card>

        <Card title="Who is affected">
          <p>
            Applicants for naturalisation or reintegration, and people acquiring French nationality by
            marriage, whose application is filed from 1 January 2026.
          </p>
        </Card>

        <Card title="What proof now counts">
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              A recognised French qualification or test attestation at <strong>B2 or above</strong>:{" "}
              <strong>DELF B2</strong>, <strong>DALF C1 / C2</strong> (lifetime diplomas), or a{" "}
              <strong>TEF / TCF</strong> attestation showing B2 (e.g. TEF/TCF for naturalisation).
            </li>
            <li><strong>DELF B1 no longer suffices</strong> for applications filed from 2026.</li>
            <li>Confirm the exact list of accepted proofs with the French authority before you book an exam.</li>
          </ul>
        </Card>

        <Card title="The civic exam">
          <p>
            Alongside the language level, a civic examination now checks knowledge of French history,
            culture and society (organised by France Éducation International). Confirm the current format
            and how to sit it via the official sources below.
          </p>
        </Card>

        <Card title="The exams themselves haven't changed">
          <p>
            DELF, DALF, TEF and TCF formats, scales and pass marks are unchanged. This is an
            acceptance-policy change — which level counts for nationality — not a change to any exam.
          </p>
        </Card>

        <Card title="Not the same as a residence permit">
          <p>
            Residence-permit French levels are separate requirements: the multi-year residence permit
            references A2, and the 10-year resident card references B1. These are different from
            naturalisation and are unaffected by the B2 nationality rule.
          </p>
        </Card>

        <div className="mt-8 rounded-2xl border border-almi-bg-peach bg-almi-bg-peach/40 p-6 text-sm text-almi-text">
          <p className="font-semibold text-almi-ink">Before you act</p>
          <p className="mt-2">
            Meeting B2 is a requirement, not a guarantee. A language level is not the same as nationality,
            and other conditions apply. Always confirm the current rules with the official sources:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <a href={SERVICE_PUBLIC} target="_blank" rel="noopener noreferrer" className="font-semibold text-almi-coral hover:underline">
                service-public.fr — French level for nationality (F11926)
              </a>
            </li>
            <li>
              <a href={LEGIFRANCE} target="_blank" rel="noopener noreferrer" className="font-semibold text-almi-coral hover:underline">
                Légifrance — Décret n° 2025-648 du 15 juillet 2025
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-10">
          <h2 className="font-display text-xl font-semibold text-almi-ink">Common questions</h2>
          <div className="mt-4 space-y-4">
            {FAQ.map((f) => (
              <div key={f.q}>
                <p className="text-sm font-semibold text-almi-ink">{f.q}</p>
                <p className="mt-1 text-sm text-almi-text">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 text-xs text-almi-text-muted">
          25% of AlmiWorld income supports the Shamool Foundation&apos;s free school in Lahore — free
          education and a daily meal for underprivileged children.
        </p>

        <div className="mt-6 text-center">
          <Link
            href="/signup"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-almi-coral px-7 py-3 text-base font-semibold text-almi-ink hover:bg-almi-coral-deep"
          >
            Practise free for DELF B2, TEF or TCF
          </Link>
        </div>
      </div>
    </main>
  );
}
