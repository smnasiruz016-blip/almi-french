// Wave-2 SEO — formation × origin: /study-in-france/[formation]/from-[origin]
// The [origin] segment value is "from-<originSlug>". Only the verified EEF origins
// resolve (each carries a real mandatory-procedure difference → indexable); any
// other origin 404s, so there are no thin country-name-swap pages.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFormationBySlug } from "@/lib/seo/formations";
import { findOrigin } from "@/lib/seo/origins";
import { FormationView } from "@/components/seo/FormationView";
import { formationHeading, locationLine, courseJsonLd, originFaq, faqJsonLd } from "@/lib/seo/study-content";
import { SITE_URL } from "@/lib/site";

export const revalidate = 604800; // 7 days

type Params = { params: Promise<{ formation: string; origin: string }> };

function parseOrigin(seg: string) {
  return seg.startsWith("from-") ? findOrigin(seg.slice(5)) : undefined;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { formation, origin } = await params;
  const o = parseOrigin(origin);
  const f = await getFormationBySlug(formation);
  if (!f || !o) return { title: "Page not found" };
  const url = `${SITE_URL}/study-in-france/${f.slug}/from-${o.slug}`;
  const loc = locationLine(f);
  const route = o.isEEF
    ? "the mandatory Campus France «Études en France» procedure"
    : "direct application to the establishment and the French consulate";
  return {
    title: `${formationHeading(f)} from ${o.name} — ${f.establishment} | Study in France`,
    description: `How students from ${o.name} apply to ${formationHeading(f)} (${f.diplomaType}) at ${f.establishment}${loc ? `, ${loc}` : ""}: ${route} and the French requirement (TCF/TEF or DELF/DALF).`,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
  };
}

export default async function Page({ params }: Params) {
  const { formation, origin } = await params;
  const o = parseOrigin(origin);
  const f = await getFormationBySlug(formation);
  if (!f || !o) notFound();
  const url = `${SITE_URL}/study-in-france/${f.slug}/from-${o.slug}`;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd(f, url)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(originFaq(f, o))) }} />
      <FormationView formation={f} origin={o} />
    </>
  );
}
