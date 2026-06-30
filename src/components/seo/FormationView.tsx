// Wave-2 SEO — shared body for the formation hub and formation×origin pages.
// Server component. Renders real formation fields + the honest France-wide French
// requirement + per-origin routing + internal links + doctrine + attribution.

import Link from "next/link";
import type { FormationRecord } from "@/lib/seo/formations";
import { ORIGINS, REGION_ORDER, type Origin } from "@/lib/seo/origins";
import {
  ADMISSION_NOT_VISA,
  DATA_ATTRIBUTION,
  applicationCorridor,
  frenchRequirement,
  formationHeading,
  levelLabel,
  locationLine,
  nativePhrase,
  originFaq,
  searchIntentLine,
} from "@/lib/seo/study-content";

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-almi-bg-peach bg-almi-paper px-4 py-3">
      <dt className="text-xs font-medium uppercase tracking-wide text-almi-purple">{label}</dt>
      <dd className="mt-1 text-sm text-almi-ink">{children}</dd>
    </div>
  );
}

export function FormationView({ formation: f, origin }: { formation: FormationRecord; origin: Origin | null }) {
  const heading = formationHeading(f);
  const loc = locationLine(f);
  const native = origin ? nativePhrase(origin.slug) : null;
  const byRegion = new Map<string, Origin[]>();
  for (const o of ORIGINS) {
    const arr = byRegion.get(o.region) ?? [];
    arr.push(o);
    byRegion.set(o.region, arr);
  }
  const orderedRegions = REGION_ORDER.filter((r) => byRegion.has(r));

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-almi-teal">
        Study in France{origin ? ` · for students from ${origin.name}` : ""}
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-almi-ink sm:text-3xl">
        {heading}
        {origin ? <> — from {origin.name}</> : null}
      </h1>
      <p className="mt-3 text-sm text-almi-text-muted">
        {f.diplomaType} at {f.establishment}
        {loc ? ` (${loc})` : ""}. This page explains the French-language requirement and the
        application route{origin ? ` for applicants from ${origin.name}` : ""}.
      </p>

      {/* Real, sourced facts */}
      <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Fact label="Establishment">{f.establishment}</Fact>
        <Fact label="Diploma / level">{f.diplomaType} — {levelLabel(f.level)}</Fact>
        {f.discipline ? <Fact label="Field">{f.discipline}</Fact> : null}
        {loc ? <Fact label="Location">{loc}</Fact> : null}
      </dl>

      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        {f.parcoursupUrl ? (
          <a href={f.parcoursupUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-almi-coral hover:underline">
            Official Parcoursup listing →
          </a>
        ) : null}
        {f.wikidataId ? (
          <a href={`https://www.wikidata.org/wiki/${f.wikidataId}`} target="_blank" rel="noopener noreferrer" className="font-medium text-almi-coral hover:underline">
            Establishment on Wikidata →
          </a>
        ) : null}
      </div>

      {/* The honest French-language requirement (France-wide, no fabricated level) */}
      <section className="mt-8 rounded-2xl border border-almi-bg-peach bg-almi-paper p-6">
        <h2 className="text-lg font-semibold text-almi-ink">French-language requirement</h2>
        <p className="mt-2 text-sm text-almi-text">{frenchRequirement(f.level)}</p>
      </section>

      {/* Per-origin route — branched honestly by EEF status */}
      {origin ? (
        (() => {
          const corridor = applicationCorridor(origin);
          const faq = originFaq(f, origin);
          return (
            <>
              <section className="mt-6 rounded-2xl border border-almi-bg-peach bg-almi-paper p-6">
                <h2 className="text-lg font-semibold text-almi-ink">{corridor.heading}</h2>
                <p className="mt-2 text-sm text-almi-text">{corridor.body}</p>
                <p className="mt-3 text-sm text-almi-text-muted">{searchIntentLine(origin)}</p>
                {native ? (
                  <p className="mt-2 text-xs text-almi-text-muted">Also searched as «{native}».</p>
                ) : null}
              </section>
              <section className="mt-6 rounded-2xl border border-almi-bg-peach bg-almi-paper p-6">
                <h2 className="text-lg font-semibold text-almi-ink">
                  Studying {heading} in France from {origin.name} — common questions
                </h2>
                <dl className="mt-3 space-y-4">
                  {faq.map((item) => (
                    <div key={item.q}>
                      <dt className="text-sm font-semibold text-almi-ink">{item.q}</dt>
                      <dd className="mt-1 text-sm text-almi-text">{item.a}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            </>
          );
        })()
      ) : (
        <section className="mt-6 rounded-2xl border border-almi-bg-peach bg-almi-paper p-6">
          <h2 className="text-lg font-semibold text-almi-ink">Where are you applying from?</h2>
          <p className="mt-2 text-sm text-almi-text-muted">
            The application route depends on your country: in the «Études en France» countries the
            online Campus France procedure is mandatory before a visa; from the others you apply
            directly to the establishment and request the visa at the French consulate. Pick yours
            for the route that applies to you.
          </p>
          <div className="mt-4 space-y-4">
            {orderedRegions.map((region) => (
              <div key={region}>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-almi-purple">{region}</h3>
                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-sm">
                  {byRegion.get(region)!.map((o) => (
                    <Link key={o.slug} href={`/study-in-france/${f.slug}/from-${o.slug}`} className="text-almi-coral hover:underline">
                      {o.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Internal links into the practice product + corridors */}
      <section className="mt-6 rounded-2xl border border-almi-bg-peach bg-almi-paper p-6">
        <h2 className="text-lg font-semibold text-almi-ink">Prepare for the French test you'll need</h2>
        <ul className="mt-2 space-y-1 text-sm">
          <li><Link href="/which-french-test" className="font-medium text-almi-coral hover:underline">Which French test do you need? — TEF vs TCF vs DELF/DALF →</Link></li>
          <li><Link href="/" className="font-medium text-almi-coral hover:underline">Practise TEF · TCF · DELF · DALF with honest AI feedback →</Link></li>
          <li><Link href="/which-french-test" className="text-almi-text-muted hover:underline">Going to Canada too? See the TEF/TCF → CEFR &amp; NCLC mapping →</Link></li>
        </ul>
      </section>

      <p className="mt-8 text-sm text-almi-text-muted">{ADMISSION_NOT_VISA}</p>
      <p className="mt-3 text-xs text-almi-text-muted">{DATA_ATTRIBUTION}</p>
    </article>
  );
}
