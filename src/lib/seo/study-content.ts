// Wave-2 SEO — shared copy + helpers for the "study in France" formation pages.
// AMAANAT: we never invent a per-formation French level. The French requirement
// is France-wide (Campus France / «Études en France» / DAP), so we state the real
// rule and defer specifics to the establishment + Campus France.

import type { FormationRecord } from "./formations";
import type { Origin } from "./origins";

// Vetted native search phrasing (founder-provided / verifiable). Only populated
// where we have a confident real phrase — never an invented translation. Other
// origins use the honest English "study in France from {country}" intent.
const NATIVE_PHRASE: Record<string, string> = {
  pakistan: "France mein parhai",
  brazil: "estudar na França",
  morocco: "الدراسة في فرنسا",
  egypt: "الدراسة في فرنسا", // standard Arabic (same MSA phrase as Morocco)
  algeria: "الدراسة في فرنسا",
  tunisia: "الدراسة في فرنسا",
  lebanon: "الدراسة في فرنسا",
  "saudi-arabia": "الدراسة في فرنسا",
  "united-arab-emirates": "الدراسة في فرنسا",
  qatar: "الدراسة في فرنسا",
  // Francophone Africa — they search in French ("étudier en France depuis …").
  senegal: "étudier en France",
  "cote-divoire": "étudier en France",
  cameroon: "étudier en France",
  // Latin America (Spanish) + Turkey + Iran (Persian) + Indonesia.
  mexico: "estudiar en Francia",
  colombia: "estudiar en Francia",
  argentina: "estudiar en Francia",
  chile: "estudiar en Francia",
  peru: "estudiar en Francia",
  bolivia: "estudiar en Francia",
  jordan: "الدراسة في فرنسا",
  turkey: "Fransa'da okumak",
  iran: "تحصیل در فرانسه",
  indonesia: "kuliah di Prancis",
  // Eastern Europe (Cyrillic) + East Asia.
  russia: "учёба во Франции",
  ukraine: "навчання у Франції",
  japan: "フランス留学",
  "south-korea": "프랑스 유학",
};
export function nativePhrase(slug: string): string | null {
  return NATIVE_PHRASE[slug] ?? null;
}

// Deepened localization — ONLY for the origins researched in the AlmiWorld Origin
// Localization Playbook (Pakistan, India, Bangladesh, Nepal, Nigeria). Each leads
// with that origin's real angle (PK→cost+funding, IN→ROI+post-study work,
// BD/NP/NG→scholarships), grounded in real France facts (Eiffel Excellence
// Scholarship, low public tuition, the ~€615/mo financial guarantee as an
// estimate, ~964 hrs/yr part-time work, the 12-month APS job-search permit), each
// stated as an estimate to confirm with Campus France. No invented per-country
// claims; un-researched origins intentionally get no lead block.
const LOCALIZED_LEAD: Record<string, string> = {
  pakistan:
    "Students from Pakistan most often weigh cost and whether they can realistically be admitted and funded. France is more affordable than most English-speaking destinations: public universities charge relatively low tuition, and the French government's Eiffel Excellence Scholarship funds selected master's and doctoral students. For the student visa you show a financial guarantee (an estimate of around €615 per month — confirm the current figure with Campus France Pakistan). You apply directly — no agent is required, and no one should charge you a fee to apply.",
  india:
    "Students from India tend to weigh return on investment and what follows the degree. France grants a 12-month post-study job-search residence permit (APS) to master's graduates and above, public-university tuition is low next to the UK, US, or Australia, and international students may work part-time (up to about 964 hours a year). Confirm current fees and permit rules with Campus France India and the establishment.",
  bangladesh:
    "Affordability leads for students from Bangladesh, so funded routes matter most. The French government's Eiffel Excellence Scholarship funds selected master's and doctoral candidates, and public-university tuition in France is low compared with English-speaking destinations. Scholarships are free to apply for — no one should charge you a fee. Confirm eligibility and deadlines with Campus France Bangladesh.",
  nepal:
    "Students from Nepal often look for funding, the ability to work while studying, and the option to stay afterwards. International students in France may work part-time (up to about 964 hours a year), the Eiffel Excellence Scholarship funds selected master's and doctoral students, and a 12-month job-search permit (APS) is open to master's graduates. Confirm the current work-hour limit and permit rules with Campus France Nepal.",
  nigeria:
    "Students from Nigeria focus on funding and visa approval. France's public-university tuition is low, the Eiffel Excellence Scholarship funds selected master's and doctoral students, and for the visa you show a financial guarantee (an estimate of around €615 per month — confirm with Campus France Nigeria). Apply directly — no agent is required, and no one should charge a fee to apply or “guarantee” a visa.",
  // Phase-1 origins — researched 2026-06-30 (Campus France country sites).
  philippines:
    "A strong funded route for Filipino students is the France Excellence Philippines scholarship (Campus France), for master's and doctoral candidates — it covers a return flight from Manila and exempts the long-stay student-visa fee. Public-university tuition is otherwise low. Confirm eligibility and deadlines with Campus France Philippines.",
  china:
    "Chinese students often target France's grandes écoles and research universities. Alongside the Eiffel Excellence Scholarship, the China Scholarship Council (CSC) co-funds Chinese students at institutions such as Sciences Po and Institut Polytechnique de Paris. Secure admission to your programme first — the scholarship follows the admission. Confirm details with Campus France China.",
  vietnam:
    "Vietnam has a long, established corridor to France — roughly 5,000 Vietnamese students study there, with about 1,600 arriving each year. Public-university tuition is low (commonly around €2,700–3,500 a year), and co-sponsored and institutional scholarships are widely available. Confirm current fees and scholarships with Campus France Vietnam.",
  "sri-lanka":
    "Funded routes for Sri Lankan students include the Eiffel Excellence Scholarship and the French Government Master's scholarship, which can provide a monthly allowance (around €860) plus tuition exemption at most public institutions. Plan for living costs of roughly €12,000–15,000 a year. Confirm eligibility with Campus France Sri Lanka (Colombo).",
  egypt:
    "Egyptian students apply through Campus France Egypt, which includes an interview at the nearest office. Beyond the Eiffel Excellence Scholarship, the Egypt-specific Rifaa Al-Tahtawi scholarship offers a monthly allowance (around €860 for ten months) and fee exemption for eligible students who have completed four years of higher education in Egypt. Confirm eligibility with Campus France Egypt.",
  // Maghreb + Francophone Africa + Lebanon — researched 2026-06-30 (Campus France country sites).
  morocco:
    "Morocco sends more students to France than any other country, applying through the DAP / «Études en France» procedure. As a francophone country, Moroccan students are usually exempt from a French-language test, though B2-level French (often a DELF/DALF B2 for academic programmes) is still expected. Morocco and France share one of the world's strongest bilateral scholarship ties, including an Excellence Scholarship for the French grandes écoles. Confirm exemptions and scholarships with Campus France Maroc.",
  algeria:
    "Algeria is the second-largest source of international students in France — about four in five Algerians who study abroad choose France. The «Études en France» procedure is mandatory, and as a francophone country Algerian students are usually exempt from a French-language test (B2-level French is still expected). Budget for the visa fee (around €100) and proof of funds (an estimate of around €615 per month). Confirm details with Campus France Algérie.",
  tunisia:
    "France is the top destination for Tunisian students, helped by close linguistic and cultural ties. The «Études en France» procedure is mandatory, and as a francophone country Tunisian students are usually exempt from a French-language test. Funded routes include the Eiffel Excellence Scholarship and bilateral French-government scholarships. Confirm exemptions and deadlines with Campus France Tunisie.",
  senegal:
    "Senegal applies through Campus France Senegal and the mandatory «Études en France» procedure. As a francophone country, most French universities do not require a DELF/DALF test from Senegalese students — though some business schools may ask for the TCF, so verify with your target institution. Confirm eligibility and scholarships with Campus France Sénégal.",
  "cote-divoire":
    "Students from Côte d'Ivoire apply through Campus France Abidjan and the mandatory «Études en France» procedure. As a country where French is official, Ivorian students may be exempt from the French-language test — but some institutions still ask for the TEF/TCF or a DELF/DALF diploma even when you are exempt, and the level is usually B2 (sometimes C1). Confirm with Campus France Côte d'Ivoire.",
  cameroon:
    "Cameroon applies through Campus France Cameroon and the mandatory «Études en France» procedure. French-educated Cameroonian students are usually exempt from a French-language test, while English-educated applicants should check the level their programme requires. The Eiffel Excellence and France Excellence Major scholarships fund selected master's and doctoral students. Confirm with Campus France Cameroun.",
  lebanon:
    "Lebanon has deep French educational ties and applies through Campus France Liban and the mandatory «Études en France» procedure. France runs the Maa'kum («With you») scholarship programme specifically for Lebanese students, and some universities have waived registration fees for them. Confirm current scholarships and exemptions with Campus France Liban.",
  // Latin America + Turkey/Iran/Indonesia — researched 2026-06-30 (Campus France country sites).
  brazil:
    "Brazil has a strong engineering corridor to France through the BRAFITEC programme, which has sent thousands of Brazilian engineering students to French institutions, often funded on the Brazilian side by CAPES. The «Études en France» procedure is mandatory, and the Eiffel Excellence Scholarship funds selected master's and doctoral students. Confirm current programmes with Campus France Brésil.",
  mexico:
    "Mexico has long-standing mobility agreements with France: Campus France funds around 200 Mexican students a year for a study period at French institutes of technology, integrated into their Mexican degree. The «Études en France» procedure is mandatory, and the Eiffel Excellence Scholarship funds selected master's and doctoral students. Confirm current programmes with Campus France México.",
  colombia:
    "Colombian students reach France through several funded routes: COLFUTURO's loan-scholarship (up to around USD 50,000) for master's and doctoral study, MINCIENCIAS, and the Eiffel Excellence Scholarship. The «Études en France» procedure is mandatory. Confirm eligibility and deadlines with Campus France Colombie.",
  turkey:
    "Turkish students complete the mandatory «Études en France» procedure and book the visa appointment through a VFS Global centre in Turkey (visa fee around €50, proof of funds an estimate of around €615 per month). The Eiffel Excellence Scholarship and a range of institutional scholarships fund selected students. Confirm details with Campus France Turquie.",
  iran:
    "Iranian students apply through the mandatory «Études en France» procedure. Beyond the Eiffel Excellence Scholarship for master's and doctoral study, France offers short-scientific-stay grants for Iranian researchers (one to four months), notably in environmental and medical fields. Confirm eligibility with Campus France Iran.",
  indonesia:
    "Indonesian students apply through the mandatory «Études en France» procedure. The French Institute of Indonesia (IFI) runs France Excellence scholarships — for undergraduate (D3/S1) entry and for master's (M1/M2), the latter with a tuition-fee waiver — alongside the Eiffel Excellence Scholarship. Confirm current programmes with Campus France / IFI Indonesia.",
  // Gulf + anglophone Africa — researched 2026-06-30 (Campus France country sites).
  "saudi-arabia":
    "Saudi students apply through the mandatory «Études en France» procedure, with the Campus France interview held at the French Embassy in Riyadh or the Consulate in Jeddah. Saudi government scholarships — including the Custodian of the Two Holy Mosques programme and the AlUla scholarship (tourism, archaeology, heritage) — support study abroad, and many programmes in France are taught in English. Confirm details with Campus France Saudi Arabia.",
  "united-arab-emirates":
    "The UAE has strong French academic ties — Sorbonne University Abu Dhabi has offered French higher education locally since 2006. Emirati and resident students apply to France through the mandatory «Études en France» procedure, and many French programmes are taught in English. Confirm options with Campus France UAE.",
  qatar:
    "Qatar has a direct French link through HEC Paris in Qatar, with pathways to HEC's Master's in Management in France. Students apply through the mandatory «Études en France» procedure, and many French programmes are taught in English. Funding routes include HEC and regional Campus France scholarships. Confirm with Campus France Qatar.",
  ghana:
    "Ghana is anglophone, and studying in France does not have to mean studying in French: French universities offer many programmes taught entirely in English, for which French proficiency is not required. The French Embassy in Ghana funds master's students (STEM, health, environment, heritage and more). For French-taught programmes you generally need around B2. Apply through the mandatory «Études en France» procedure; confirm with Campus France Ghana.",
  kenya:
    "Studying in France isn't only for French speakers: over 1,700 courses in France are taught entirely in English. For French-taught degrees, the Classes Internationales programme (from 2025) lets Kenyan students learn French for one or two semesters before enrolling. Funding includes the Eiffel scholarship and French Embassy Kenya scholarships. Apply through the mandatory «Études en France» procedure; confirm with Campus France Kenya.",
  ethiopia:
    "Ethiopian students apply through the mandatory «Études en France» procedure. Campus France manages scholarships from the Ethiopian Ministry of Higher Education, co-financed by the French Embassy, alongside the Eiffel Excellence Scholarship; France also grants many tuition-fee exemptions to students from Sub-Saharan Africa. Many French programmes are taught in English. Confirm with Campus France Ethiopia.",
  // Eastern Europe/Caucasus + East Asia — researched 2026-06-30 (Campus France country sites).
  russia:
    "Russian students apply through the mandatory «Études en France» procedure. Funding routes include the Eiffel Excellence Scholarship for master's and doctoral study and French-government scholarships awarded through the French Embassy (SCAC). Confirm current programmes with Campus France Russia.",
  ukraine:
    "France runs a dedicated scholarship programme for Ukrainian students, continuing the emergency support set up in 2023: a monthly allowance (around €700 for a French-language course, or around €860 for study) for up to six months, with around 2,000 displaced Ukrainian students already welcomed into French higher education. Students apply through the «Études en France» platform or directly to institutions. Confirm current support with Campus France Ukraine.",
  georgia:
    "Georgian students apply through the mandatory «Études en France» procedure. Alongside the Eiffel Excellence Scholarship, a Georgia-specific master's programme runs through an agreement between Georgia's International Education Center and the French Institute. Confirm eligibility with Campus France Georgia.",
  japan:
    "Japanese students apply through the mandatory «Études en France» procedure. Franco-Japanese academic exchange is well established, with scholarships granted jointly by a Franco-Japanese board, alongside the Eiffel Excellence Scholarship. Confirm current programmes with Campus France Japan.",
  "south-korea":
    "Korean students apply through the mandatory «Études en France» procedure. Since 2005 the French Embassy in Korea has run a France Excellence government scholarship for master's and doctoral study, with a monthly allowance (around €860 for master's, €1,588 for doctorate) and university housing where available. Confirm current calls with Campus France Korea.",
  thailand:
    "Thai students apply through the mandatory «Études en France» procedure. The selective Franco-Thai Scholarship Program (for applicants under 35) funds master's and doctoral study with a monthly allowance, a round-trip ticket and social protection — though not tuition fees — and selects around 20–25 candidates a year. Confirm current calls with Campus France Thailand.",
  // LatAm tail + Jordan/Azerbaijan — researched 2026-06-30 (Campus France country sites).
  argentina:
    "Argentina has a strong engineering link to France through the ARFITEC programme, which exchanges final-year engineering students between Argentine and French institutions (around €500–600 per month plus travel support). The «Études en France» procedure is mandatory, and the Eiffel Excellence Scholarship funds selected master's and doctoral students. Confirm current programmes with Campus France Argentine.",
  chile:
    "Chilean students can fund postgraduate study in France through BECAS Chile (ANID), the national agency's programme covering tuition, a living stipend, airfare and health insurance, alongside the Eiffel Excellence Scholarship. The «Études en France» procedure is mandatory. Confirm eligibility with Campus France Chili.",
  peru:
    "Peru's PRONABEC runs a France-specific scholarship (Beca Francia): a stipend of up to around €860 per month for master's study, plus exemption from registration fees, the CVEC student fee, and the student-visa fee. The «Études en France» procedure is mandatory. Confirm current calls with Campus France Pérou / PRONABEC.",
  bolivia:
    "Bolivian students apply through the mandatory «Études en France» procedure. The Eiffel Excellence Scholarship funds selected master's and doctoral students, and Campus Bourses lists further French and bilateral scholarships. Confirm options with Campus France Bolivie.",
  jordan:
    "Jordanian students complete the mandatory «Études en France» procedure through the Espace Campus France in Amman before applying for the student visa at the French Embassy. The Eiffel Excellence Scholarship and other French-government and institutional scholarships are available. Confirm options with Campus France Jordan.",
  azerbaijan:
    "Azerbaijani students apply through the mandatory «Études en France» procedure via Campus France Baku. Alongside the Eiffel Excellence Scholarship, students may be eligible for the IsDB-France scholarship programme (for member countries of the Islamic Development Bank). Confirm eligibility with Campus France Azerbaijan.",
};
export function localizedLead(slug: string): string | null {
  return LOCALIZED_LEAD[slug] ?? null;
}

// The application corridor, branched HONESTLY by EEF status — each origin states
// only its own truth (never an EEF procedure for a non-EEF country, and never
// "apply directly" for an EEF country).
export function applicationCorridor(origin: Origin): { heading: string; body: string } {
  if (origin.isEEF) {
    return {
      heading: `Applying from ${origin.name}`,
      body:
        `${origin.name} is one of the countries where the Campus France «Études en France» procedure is ` +
        `mandatory. From ${origin.name}, you complete the online «Études en France» application before your ` +
        `student visa — it runs from the enrolment request through to the visa. Your French proof (TCF / TEF, ` +
        `or DELF / DALF) is submitted within that procedure, at the level the establishment requires.`,
    };
  }
  return {
    heading: `Applying from ${origin.name}`,
    body:
      `From ${origin.name} there is no «Études en France» pre-procedure. You apply directly to the ` +
      `establishment (or through the DAP procedure for first-year undergraduate), and once admitted you ` +
      `request your student visa at the French consulate or embassy serving ${origin.name}. Your French ` +
      `proof (TCF / TEF, or DELF / DALF) goes to the establishment at the level it requires.`,
  };
}

export const DATA_ATTRIBUTION =
  "Données : MESR / data.gouv.fr — Licence Ouverte v2.0 (Etalab).";

export const ADMISSION_NOT_VISA =
  "Admission or registration is not a visa — confirm current rules with the establishment, Campus France, and the French authority.";

// Readable label for the LMD / formation level stored on each record.
export function levelLabel(level: string): string {
  switch (level) {
    case "L": return "Undergraduate (Licence / BUT — LMD level L)";
    case "M": return "Master's (LMD level M)";
    case "D": return "Doctorate (LMD level D)";
    case "BTS": return "BTS (two-year vocational)";
    case "CPGE": return "CPGE (preparatory class)";
    default: return "Higher-education programme";
  }
}

// Short cycle word for sentences.
function cycleWord(level: string): string {
  if (level === "M") return "master's";
  if (level === "D") return "doctoral";
  if (level === "BTS") return "BTS";
  if (level === "CPGE") return "preparatory-class";
  return "undergraduate";
}

// The REAL, France-wide French-language requirement — no fabricated per-course
// level. Cycle-aware wording, always deferring the exact level to the institution.
export function frenchRequirement(level: string): string {
  const cycle = cycleWord(level);
  const undergradNote =
    level === "L" || level === "BTS" || level === "CPGE"
      ? " For first-year undergraduate (Licence) study, the level commonly sits around B2, set through the DAP / «Études en France» procedure."
      : "";
  return (
    `French-taught programmes in France require proof of French for non-francophone applicants. ` +
    `This is set France-wide through the Campus France / «Études en France» procedure — not course by course.` +
    undergradNote +
    ` The exact level for this ${cycle} programme is decided by the establishment; accepted proof includes the TCF or TEF, or a DELF / DALF diploma. ` +
    `Confirm the requirement with the establishment and Campus France before you apply.`
  );
}

// Page H1 + descriptive lead.
export function formationHeading(f: FormationRecord): string {
  return f.specialism && f.specialism !== f.title
    ? `${f.title} — ${f.specialism}`
    : f.title;
}

export function locationLine(f: FormationRecord): string | null {
  const parts = [f.city, f.region].filter(Boolean);
  return parts.length ? parts.join(", ") : null;
}

// Honest, search-tuned intent line (real universal search patterns, not invented
// per-country claims) — makes each origin page substantive and findable.
export function searchIntentLine(origin: Origin): string {
  return (
    `People in ${origin.name} search this as “study in France from ${origin.name}”, ` +
    `“${origin.name} student visa for France”, and “French university admission from ${origin.name}”.`
  );
}

// Branched FAQ — every answer is honest and universal-true (corridor by EEF, the
// real French rule, the no-agent honesty edge). Powers visible Q&A + FAQ schema.
export function originFaq(f: FormationRecord, origin: Origin): { q: string; a: string }[] {
  const eefA = origin.isEEF
    ? `Yes. From ${origin.name} the online Campus France «Études en France» procedure is mandatory before your student visa.`
    : `No. From ${origin.name} there is no «Études en France» pre-procedure — you apply directly to the establishment (or via DAP for first-year undergraduate) and request the visa at the French consulate or embassy serving ${origin.name}.`;
  return [
    { q: `Do students from ${origin.name} need the «Études en France» procedure?`, a: eefA },
    { q: "What level of French is required?", a: frenchRequirement(f.level) },
    {
      q: `Can you apply from ${origin.name} without an agent?`,
      a: `Yes. You apply directly to the establishment and to the French consulate — no agent or paid intermediary is required, and no one should charge you a fee simply to apply.`,
    },
    {
      q: "Which French test should you take — TCF, TEF, DELF or DALF?",
      a: `The establishment sets the level. The TCF and TEF are common for admission and immigration; DELF and DALF are lifetime diplomas. See the “which French test do you need?” guide to pick the one your goal needs.`,
    },
  ];
}

export function faqJsonLd(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: { "@type": "Answer", text: x.a },
    })),
  };
}

// Course JSON-LD from real fields only.
export function courseJsonLd(f: FormationRecord, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: formationHeading(f),
    ...(f.discipline ? { about: f.discipline } : {}),
    provider: {
      "@type": "CollegeOrUniversity",
      name: f.establishment,
      ...(f.wikidataId ? { sameAs: `https://www.wikidata.org/wiki/${f.wikidataId}` } : {}),
    },
    ...(locationLine(f) ? { locationCreated: locationLine(f) } : {}),
    url,
  };
}
