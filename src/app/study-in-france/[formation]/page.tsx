// Wave-2 SEO — formation hub: /study-in-france/[formation]
// On-demand ISR (no generateStaticParams; first hit renders + caches).

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFormationBySlug } from "@/lib/seo/formations";
import { FormationView } from "@/components/seo/FormationView";
import { formationHeading, locationLine, courseJsonLd } from "@/lib/seo/study-content";
import { SITE_URL } from "@/lib/site";

export const revalidate = 604800; // 7 days

type Params = { params: Promise<{ formation: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { formation } = await params;
  const f = await getFormationBySlug(formation);
  if (!f) return { title: "Programme not found" };
  const url = `${SITE_URL}/study-in-france/${f.slug}`;
  const loc = locationLine(f);
  return {
    title: `${formationHeading(f)} — ${f.establishment} | Study in France`,
    description: `French-language requirement and application route for ${formationHeading(f)} (${f.diplomaType}) at ${f.establishment}${loc ? `, ${loc}` : ""}. Prove French with the TCF/TEF or DELF/DALF via Campus France.`,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
  };
}

export default async function Page({ params }: Params) {
  const { formation } = await params;
  const f = await getFormationBySlug(formation);
  if (!f) notFound();
  const url = `${SITE_URL}/study-in-france/${f.slug}`;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd(f, url)) }} />
      <FormationView formation={f} origin={null} />
    </>
  );
}
