// B1 proof-of-pipeline slice — original French items, never copied from CCI Paris
// or France Éducation International. ~4 per skill. Reading/Listening are SHARED
// (examFamily null, reused across exams); Writing/Speaking carry an examFamily so
// the prompt can be exam-specific. Bulk B1–C1 content is the next sub-wave.
//
// Run: npm run seed:b1   (needs DATABASE_URL set)

import { PrismaClient, Prisma } from "@prisma/client";
import { isDirectRun } from "./_entry";

const prisma = new PrismaClient();

export const ITEMS: Prisma.FrenchItemCreateManyInput[] = [
  // ---------- Compréhension écrite (Reading) — shared ----------
  {
    level: "B1", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Un courriel de la médiathèque",
    prompt: "Lisez le courriel et répondez aux questions.",
    difficulty: "CORE", topicTag: "vie-pratique",
    payload: {
      passages: [{ id: "p1", heading: "Médiathèque municipale", body: "Bonjour,\n\nNous vous rappelons que les livres empruntés le mois dernier doivent être rendus avant le 30 juin. Après cette date, une pénalité de 0,20 € par jour et par document sera appliquée. Vous pouvez aussi prolonger votre emprunt en ligne, une seule fois, depuis votre compte.\n\nCordialement,\nL'équipe de la médiathèque" }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Que doit faire le lecteur avant le 30 juin ?", options: [{ id: "a", text: "Payer une pénalité" }, { id: "b", text: "Rendre les livres" }, { id: "c", text: "Créer un compte" }], answer: "b" },
        { id: "q2", kind: "mcq", stem: "Combien de fois peut-on prolonger un emprunt en ligne ?", options: [{ id: "a", text: "Une seule fois" }, { id: "b", text: "Deux fois" }, { id: "c", text: "Autant que l'on veut" }], answer: "a" },
      ],
    },
  },
  {
    level: "B1", skill: "COMPREHENSION_ECRITE", taskType: "VRAI_FAUX", examFamily: null,
    title: "Annonce : fermeture du parc",
    prompt: "Lisez l'annonce et indiquez si chaque phrase est vraie ou fausse.",
    difficulty: "CORE", topicTag: "vie-publique",
    payload: {
      passages: [{ id: "p1", body: "En raison de travaux, le parc des Tilleuls sera fermé du lundi au vendredi la semaine prochaine. Il restera ouvert le week-end, de 9 h à 19 h. Les chiens y sont acceptés s'ils sont tenus en laisse." }],
      questions: [
        { id: "q1", kind: "truefalse", stem: "Le parc sera fermé le samedi.", answer: "false" },
        { id: "q2", kind: "truefalse", stem: "Les chiens doivent être tenus en laisse.", answer: "true" },
      ],
    },
  },
  {
    level: "B1", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Article : le vélo en ville",
    prompt: "Lisez l'extrait et répondez.",
    difficulty: "STRETCH", topicTag: "societe",
    payload: {
      passages: [{ id: "p1", body: "De plus en plus d'habitants choisissent le vélo pour aller travailler. La ville a doublé le nombre de pistes cyclables en trois ans. Pourtant, certains cyclistes estiment que la sécurité reste insuffisante aux grands carrefours." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Qu'a fait la ville en trois ans ?", options: [{ id: "a", text: "Interdit les voitures" }, { id: "b", text: "Doublé les pistes cyclables" }, { id: "c", text: "Supprimé les carrefours" }], answer: "b" },
        { id: "q2", kind: "mcq", stem: "Que pensent certains cyclistes ?", options: [{ id: "a", text: "La sécurité est insuffisante" }, { id: "b", text: "Le vélo coûte cher" }, { id: "c", text: "Il y a trop de pistes" }], answer: "a" },
      ],
    },
  },
  {
    level: "B1", skill: "COMPREHENSION_ECRITE", taskType: "VRAI_FAUX", examFamily: null,
    title: "Consignes : la nouvelle cafétéria",
    prompt: "Lisez le message interne et indiquez vrai ou faux.",
    difficulty: "FOUNDATION", topicTag: "travail",
    payload: {
      passages: [{ id: "p1", body: "À partir de lundi, la cafétéria ouvre à 7 h 30. Le paiement se fait uniquement par carte ou par badge ; les espèces ne sont plus acceptées. Le menu végétarien est disponible tous les jours." }],
      questions: [
        { id: "q1", kind: "truefalse", stem: "On peut encore payer en espèces.", answer: "false" },
        { id: "q2", kind: "truefalse", stem: "Un menu végétarien est proposé chaque jour.", answer: "true" },
      ],
    },
  },

  // ---------- Compréhension de l'oral (Listening) — shared ----------
  {
    level: "B1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Annonce en gare",
    prompt: "Écoutez l'annonce et répondez aux questions.",
    difficulty: "CORE", topicTag: "transports",
    payload: {
      audioScript: "Mesdames et messieurs, votre attention s'il vous plaît. Le train à destination de Lyon, prévu à 14 h 10, partira avec un retard d'environ vingt minutes, voie 8. Nous vous prions de nous excuser pour la gêne occasionnée.",
      speakers: [{ role: "Annonceur", voice: "onyx" }],
      questions: [
        { id: "q1", stem: "Quel est le retard annoncé ?", options: [{ id: "a", text: "Dix minutes" }, { id: "b", text: "Vingt minutes" }, { id: "c", text: "Une heure" }], answer: "b" },
        { id: "q2", stem: "De quelle voie part le train ?", options: [{ id: "a", text: "Voie 8" }, { id: "b", text: "Voie 18" }, { id: "c", text: "Voie 2" }], answer: "a" },
      ],
    },
  },
  {
    level: "B1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Au téléphone : prendre rendez-vous",
    prompt: "Écoutez la conversation et répondez.",
    difficulty: "CORE", topicTag: "vie-pratique",
    payload: {
      audioScript: "Secrétaire : Cabinet du docteur Mercier, bonjour. Patient : Bonjour, je voudrais un rendez-vous cette semaine, si possible. Secrétaire : Jeudi à 11 h, cela vous convient ? Patient : Plutôt en fin de journée, j'ai du mal à me libérer le matin. Secrétaire : Alors jeudi à 17 h 30. Patient : Parfait, merci.",
      speakers: [{ role: "Secrétaire", voice: "shimmer" }, { role: "Patient", voice: "echo" }],
      questions: [
        { id: "q1", stem: "Quand le patient préfère-t-il venir ?", options: [{ id: "a", text: "Le matin" }, { id: "b", text: "En fin de journée" }, { id: "c", text: "Le week-end" }], answer: "b" },
        { id: "q2", stem: "Quel rendez-vous est finalement fixé ?", options: [{ id: "a", text: "Jeudi à 11 h" }, { id: "b", text: "Jeudi à 17 h 30" }, { id: "c", text: "Vendredi à 17 h 30" }], answer: "b" },
      ],
    },
  },
  {
    level: "B1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Message vocal d'un ami",
    prompt: "Écoutez le message et répondez.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: {
      audioScript: "Salut, c'est Karim. Je t'appelle parce que le film de samedi commence finalement à 20 h, pas à 21 h. On se retrouve devant le cinéma à 19 h 45 pour acheter les billets. N'oublie pas ta carte d'étudiant, il y a une réduction. À samedi !",
      speakers: [{ role: "Karim", voice: "fable" }],
      questions: [
        { id: "q1", stem: "À quelle heure commence le film ?", options: [{ id: "a", text: "19 h 45" }, { id: "b", text: "20 h" }, { id: "c", text: "21 h" }], answer: "b" },
        { id: "q2", stem: "Que faut-il apporter ?", options: [{ id: "a", text: "La carte d'étudiant" }, { id: "b", text: "De l'argent liquide" }, { id: "c", text: "Les billets" }], answer: "a" },
      ],
    },
  },
  {
    level: "B1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "À la boulangerie",
    prompt: "Écoutez la scène et répondez.",
    difficulty: "FOUNDATION", topicTag: "commerces",
    payload: {
      audioScript: "Cliente : Bonjour, je voudrais une baguette et deux croissants, s'il vous plaît. Boulanger : Voilà. Ce sera tout ? Cliente : Oui. Ça fait combien ? Boulanger : Trois euros quarante. Cliente : Tenez. Boulanger : Merci, bonne journée !",
      speakers: [{ role: "Cliente", voice: "nova" }, { role: "Boulanger", voice: "onyx" }],
      questions: [
        { id: "q1", stem: "Qu'achète la cliente ?", options: [{ id: "a", text: "Une baguette et deux croissants" }, { id: "b", text: "Deux baguettes" }, { id: "c", text: "Un gâteau" }], answer: "a" },
        { id: "q2", stem: "Combien paie-t-elle ?", options: [{ id: "a", text: "3,14 €" }, { id: "b", text: "3,40 €" }, { id: "c", text: "4,30 €" }], answer: "b" },
      ],
    },
  },

  // ---------- Expression écrite (Writing) — exam-specific ----------
  {
    level: "B1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF B1 — Essai : les transports en commun",
    prompt: "Exprimez votre opinion personnelle dans un texte construit.",
    difficulty: "CORE", topicTag: "societe",
    payload: { situation: "Le journal de votre ville organise un débat sur les transports.", instruction: "Écrivez un texte (lettre, article ou essai) pour donner votre avis : faut-il rendre les transports en commun gratuits ? Donnez des exemples et des arguments.", wordMin: 160, wordMax: 180 },
  },
  {
    level: "B1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF — Section A : message à un service",
    prompt: "Rédigez le message demandé.",
    difficulty: "CORE", topicTag: "vie-pratique",
    payload: { situation: "Vous avez acheté un appareil en ligne qui est arrivé endommagé.", instruction: "Écrivez au service client pour décrire le problème et demander un remboursement ou un échange. Soyez clair et poli.", wordMin: 80, wordMax: 120 },
  },
  {
    level: "B1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF — Tâche : courriel à un collègue",
    prompt: "Rédigez le courriel demandé.",
    difficulty: "FOUNDATION", topicTag: "travail",
    payload: { situation: "Vous ne pourrez pas assister à une réunion prévue demain.", instruction: "Écrivez un courriel à votre collègue pour vous excuser, expliquer la raison et proposer une autre date.", wordMin: 60, wordMax: 120 },
  },
  {
    level: "B1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF B1 — Lettre à la mairie",
    prompt: "Rédigez une lettre construite et argumentée.",
    difficulty: "STRETCH", topicTag: "vie-publique",
    payload: { situation: "Le terrain de jeux de votre quartier est en mauvais état.", instruction: "Écrivez une lettre au maire pour signaler le problème, expliquer ses conséquences et proposer des solutions.", wordMin: 160, wordMax: 180 },
  },

  // ---------- Expression orale (Speaking) — exam-specific ----------
  {
    level: "B1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF B1 — Monologue suivi : les loisirs",
    prompt: "Parlez environ deux minutes sur le sujet, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Présentez vos loisirs préférés. Expliquez pourquoi vous les aimez et comment ils ont changé au fil du temps.", prepSeconds: 60, speakSeconds: 120 },
  },
  {
    level: "B1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF — Section A : obtenir des renseignements",
    prompt: "Jouez la situation à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "vie-pratique",
    payload: { taskPrompt: "Vous voyez une annonce pour un cours de cuisine. Vous téléphonez pour obtenir des informations (horaires, prix, niveau, matériel). Posez au moins quatre questions.", prepSeconds: 30, speakSeconds: 120 },
  },
  {
    level: "B1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF — Tâche 2 : exprimer un point de vue",
    prompt: "Répondez à l'oral, puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { taskPrompt: "Selon vous, vaut-il mieux vivre en ville ou à la campagne ? Donnez votre avis et justifiez-le avec des exemples.", prepSeconds: 30, speakSeconds: 120 },
  },
  {
    level: "B1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF B1 — Exercice en interaction",
    prompt: "Jouez le dialogue à l'oral, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Vous voulez vous inscrire à une activité sportive avec un ami, mais il hésite. Convainquez-le en présentant les avantages et en répondant à ses objections.", prepSeconds: 30, speakSeconds: 120 },
  },
];

async function main() {
  let created = 0;
  for (const item of ITEMS) {
    const exists = await prisma.frenchItem.findFirst({
      where: { level: item.level, skill: item.skill, title: item.title },
      select: { id: true },
    });
    if (exists) continue;
    await prisma.frenchItem.create({ data: item });
    created += 1;
  }
  console.log(`seed:b1 — ${created} created, ${ITEMS.length - created} already present`);
}

if (isDirectRun(import.meta.url)) {
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(() => prisma.$disconnect());
}
