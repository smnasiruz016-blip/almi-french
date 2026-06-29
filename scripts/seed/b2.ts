// B2 content wave — original French items, never copied from CCI Paris or France
// Éducation International. ~16 per skill. Reading/Listening are SHARED (examFamily
// null, reused across exams); Writing/Speaking carry an examFamily so the prompt
// can be exam-specific. B2 register: argumentative, abstract, implicit meaning —
// clearly a step above B1.
//
// Run: npm run seed:b2   (needs DATABASE_URL set)

import { PrismaClient, Prisma } from "@prisma/client";
import { isDirectRun } from "./_entry";

const prisma = new PrismaClient();

export const ITEMS: Prisma.FrenchItemCreateManyInput[] = [
  // ---------- Compréhension écrite (Reading) — shared (examFamily null) ----------
  {
    level: "B2", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Tribune : le télétravail en question",
    prompt: "Lisez la tribune et répondez aux questions.",
    difficulty: "CORE", topicTag: "travail",
    payload: {
      passages: [{ id: "p1", heading: "Travailler de chez soi, vraiment mieux ?", body: "On a longtemps présenté le télétravail comme une évidence : moins de transports, plus d'autonomie, un meilleur équilibre. L'expérience récente nuance ce tableau. Si beaucoup de salariés apprécient la souplesse, certains décrivent un isolement pesant et une frontière de plus en plus floue entre vie privée et vie professionnelle. Les entreprises, de leur côté, s'inquiètent d'une cohésion d'équipe plus difficile à maintenir à distance. La solution ne réside sans doute ni dans le tout-présentiel ni dans le tout-distanciel, mais dans une organisation hybride, négociée au cas par cas." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Quel est le point de vue de l'auteur sur le télétravail ?", options: [{ id: "a", text: "Il est toujours préférable" }, { id: "b", text: "Il présente des avantages et des limites" }, { id: "c", text: "Il devrait être interdit" }], answer: "b" },
        { id: "q2", kind: "mcq", stem: "Quelle organisation l'auteur recommande-t-il ?", options: [{ id: "a", text: "Le tout-présentiel" }, { id: "b", text: "Le tout-distanciel" }, { id: "c", text: "Un modèle hybride négocié" }], answer: "c" },
      ],
    },
  },
  {
    level: "B2", skill: "COMPREHENSION_ECRITE", taskType: "VRAI_FAUX", examFamily: null,
    title: "Consommer autrement",
    prompt: "Lisez le texte et indiquez si chaque affirmation est vraie ou fausse.",
    difficulty: "CORE", topicTag: "societe",
    payload: {
      passages: [{ id: "p1", body: "La consommation responsable ne se limite pas à acheter des produits étiquetés « écologiques ». Elle suppose d'abord de s'interroger sur ses besoins réels et de réduire le gaspillage. Acheter mieux, c'est souvent acheter moins. Certains y voient une contrainte ; d'autres, au contraire, une forme de liberté retrouvée face à la pression publicitaire." }],
      questions: [
        { id: "q1", kind: "truefalse", stem: "Selon le texte, consommer responsable se résume à choisir des produits écologiques.", answer: "false" },
        { id: "q2", kind: "truefalse", stem: "L'auteur évoque la réduction du gaspillage.", answer: "true" },
        { id: "q3", kind: "truefalse", stem: "Le texte présente un seul regard sur cette démarche.", answer: "false" },
      ],
    },
  },
  {
    level: "B2", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Critique : une exposition immersive",
    prompt: "Lisez la critique et répondez.",
    difficulty: "STRETCH", topicTag: "culture",
    payload: {
      passages: [{ id: "p1", body: "Annoncée à grand renfort de publicité, cette exposition « immersive » consacrée aux impressionnistes tient à moitié ses promesses. La projection des toiles sur des murs immenses impressionne, c'est indéniable. Mais à trop privilégier l'effet spectaculaire, l'ensemble finit par négliger ce qui fait la valeur de ces œuvres : le détail, la touche, le geste du peintre. On sort ébloui, mais pas nécessairement plus savant." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Quel est le jugement global du critique ?", options: [{ id: "a", text: "Enthousiaste" }, { id: "b", text: "Nuancé, plutôt réservé" }, { id: "c", text: "Totalement négatif" }], answer: "b" },
        { id: "q2", kind: "mcq", stem: "Que reproche-t-il à l'exposition ?", options: [{ id: "a", text: "De négliger le détail des œuvres" }, { id: "b", text: "D'être trop chère" }, { id: "c", text: "De manquer de publicité" }], answer: "a" },
      ],
    },
  },
  {
    level: "B2", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Réponse d'une administration",
    prompt: "Lisez le courrier administratif et répondez.",
    difficulty: "CORE", topicTag: "vie-pratique",
    payload: {
      passages: [{ id: "p1", heading: "Objet : votre demande de subvention", body: "Madame, Monsieur,\n\nNous accusons réception de votre dossier de demande de subvention pour votre association. Après examen, il apparaît que certaines pièces justificatives manquent, notamment le bilan financier de l'année précédente. Sans ce document, votre demande ne pourra être instruite. Nous vous invitons à le transmettre avant le 15 du mois prochain, faute de quoi le dossier sera classé sans suite.\n\nVeuillez agréer nos salutations distinguées." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Pourquoi le dossier ne peut-il pas être traité ?", options: [{ id: "a", text: "Il a été envoyé trop tard" }, { id: "b", text: "Une pièce justificative manque" }, { id: "c", text: "L'association n'existe pas" }], answer: "b" },
        { id: "q2", kind: "mcq", stem: "Que se passe-t-il si le document n'est pas transmis à temps ?", options: [{ id: "a", text: "Le dossier sera classé sans suite" }, { id: "b", text: "La subvention sera doublée" }, { id: "c", text: "Un rendez-vous sera fixé" }], answer: "a" },
      ],
    },
  },
  {
    level: "B2", skill: "COMPREHENSION_ECRITE", taskType: "VRAI_FAUX", examFamily: null,
    title: "Rapport : la qualité de l'air",
    prompt: "Lisez l'extrait du rapport et répondez par vrai ou faux.",
    difficulty: "STRETCH", topicTag: "environnement",
    payload: {
      passages: [{ id: "p1", body: "Le rapport souligne une amélioration globale de la qualité de l'air dans l'agglomération sur les dix dernières années, sans pour autant atteindre les seuils recommandés par l'Organisation mondiale de la santé. Les pics de pollution restent fréquents en hiver, liés au chauffage et au trafic. Les auteurs appellent à ne pas relâcher les efforts, les progrès observés demeurant fragiles." }],
      questions: [
        { id: "q1", kind: "truefalse", stem: "La qualité de l'air s'est globalement améliorée.", answer: "true" },
        { id: "q2", kind: "truefalse", stem: "Les seuils de l'OMS sont désormais respectés.", answer: "false" },
        { id: "q3", kind: "truefalse", stem: "Les pics de pollution sont surtout estivaux.", answer: "false" },
      ],
    },
  },
  {
    level: "B2", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Éditorial : information et réseaux sociaux",
    prompt: "Lisez l'éditorial et répondez.",
    difficulty: "STRETCH", topicTag: "medias",
    payload: {
      passages: [{ id: "p1", body: "S'informer n'a jamais semblé aussi simple : une notification, un fil qui défile, et l'actualité vient à nous. Pourtant, cette facilité a un revers. À force de consommer l'information par fragments, triée par des algorithmes qui privilégient ce qui nous fait réagir, nous perdons le fil et le recul. La rapidité l'emporte sur la vérification. Le véritable enjeu n'est plus d'accéder à l'information, mais d'apprendre à la hiérarchiser." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Quel revers l'auteur identifie-t-il ?", options: [{ id: "a", text: "Une information fragmentée et peu vérifiée" }, { id: "b", text: "Un manque total d'information" }, { id: "c", text: "Le coût des abonnements" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "Selon l'éditorial, quel est le véritable enjeu aujourd'hui ?", options: [{ id: "a", text: "Accéder à l'information" }, { id: "b", text: "Hiérarchiser l'information" }, { id: "c", text: "Produire plus d'information" }], answer: "b" },
      ],
    },
  },
  {
    level: "B2", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Le tourisme de masse",
    prompt: "Lisez l'article et répondez.",
    difficulty: "CORE", topicTag: "societe",
    payload: {
      passages: [{ id: "p1", body: "Certaines villes, autrefois fières d'attirer les visiteurs, commencent à réguler leur affluence. Quotas de bateaux de croisière, taxe de séjour augmentée, limitation des locations de courte durée : les mesures se multiplient. L'objectif n'est pas de fermer la porte aux touristes, mais de préserver la vie des habitants et la qualité même de l'expérience, menacée par la surfréquentation." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Que cherchent à faire ces villes ?", options: [{ id: "a", text: "Interdire le tourisme" }, { id: "b", text: "Réguler l'affluence" }, { id: "c", text: "Attirer plus de croisières" }], answer: "b" },
        { id: "q2", kind: "mcq", stem: "Quel est l'objectif annoncé ?", options: [{ id: "a", text: "Préserver la vie des habitants" }, { id: "b", text: "Augmenter les recettes uniquement" }, { id: "c", text: "Construire des hôtels" }], answer: "a" },
      ],
    },
  },
  {
    level: "B2", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "La semaine de quatre jours",
    prompt: "Lisez le texte argumentatif et répondez.",
    difficulty: "CORE", topicTag: "travail",
    payload: {
      passages: [{ id: "p1", body: "Plusieurs entreprises ont expérimenté la semaine de quatre jours, sans baisse de salaire. Les premiers retours font état d'employés moins fatigués et tout aussi productifs. Les sceptiques objectent que le modèle est difficilement transposable à tous les secteurs, en particulier ceux qui exigent une présence continue. Le débat reste ouvert, mais l'idée, hier marginale, est désormais prise au sérieux." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Que montrent les premiers retours d'expérience ?", options: [{ id: "a", text: "Une productivité maintenue" }, { id: "b", text: "Une forte baisse de production" }, { id: "c", text: "Une hausse des salaires" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "Quelle objection est mentionnée ?", options: [{ id: "a", text: "Le modèle convient à tous les métiers" }, { id: "b", text: "Le modèle est dur à appliquer partout" }, { id: "c", text: "Les employés sont plus fatigués" }], answer: "b" },
      ],
    },
  },
  {
    level: "B2", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Une étude sur le sommeil",
    prompt: "Lisez le compte rendu et répondez.",
    difficulty: "CORE", topicTag: "sante",
    payload: {
      passages: [{ id: "p1", body: "Une étude récente confirme ce que l'on soupçonnait : l'exposition aux écrans en soirée retarde l'endormissement. Mais elle apporte une nuance intéressante. Ce n'est pas tant la lumière des appareils que le contenu consulté qui perturbe le sommeil : une vidéo qui stimule ou angoisse a davantage d'effet qu'un simple éclairage. Les auteurs recommandent moins d'éteindre les écrans que de choisir ce qu'on y regarde avant de dormir." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Quelle nuance l'étude apporte-t-elle ?", options: [{ id: "a", text: "Le contenu compte plus que la lumière" }, { id: "b", text: "La lumière est le seul facteur" }, { id: "c", text: "Les écrans n'ont aucun effet" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "Que recommandent les auteurs ?", options: [{ id: "a", text: "Éteindre tout appareil électrique" }, { id: "b", text: "Choisir ce que l'on regarde le soir" }, { id: "c", text: "Dormir avec la lumière allumée" }], answer: "b" },
      ],
    },
  },
  {
    level: "B2", skill: "COMPREHENSION_ECRITE", taskType: "VRAI_FAUX", examFamily: null,
    title: "L'intelligence artificielle au travail",
    prompt: "Lisez l'avis d'expert et répondez par vrai ou faux.",
    difficulty: "STRETCH", topicTag: "technologie",
    payload: {
      passages: [{ id: "p1", body: "Pour cette spécialiste, l'intelligence artificielle ne remplacera pas la plupart des métiers, mais elle en transformera l'exercice. Les tâches répétitives seront automatisées, libérant du temps pour des activités à plus forte valeur ajoutée. Encore faut-il, prévient-elle, que les salariés soient formés : sans accompagnement, l'outil risque de creuser les écarts plutôt que de les réduire." }],
      questions: [
        { id: "q1", kind: "truefalse", stem: "L'experte pense que l'IA va remplacer la plupart des métiers.", answer: "false" },
        { id: "q2", kind: "truefalse", stem: "Elle insiste sur l'importance de la formation.", answer: "true" },
      ],
    },
  },
  {
    level: "B2", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Lire à l'ère numérique",
    prompt: "Lisez la chronique et répondez.",
    difficulty: "CORE", topicTag: "culture",
    payload: {
      passages: [{ id: "p1", body: "On a souvent prédit la mort du livre. Or les chiffres racontent une autre histoire : on lit toujours, mais différemment. L'écran a habitué nos yeux à parcourir plutôt qu'à approfondir. Le défi n'est donc pas de revenir au papier à tout prix, mais de préserver, à côté de la lecture rapide, ces moments d'attention prolongée que seul un texte long permet vraiment." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Que disent les chiffres selon l'auteur ?", options: [{ id: "a", text: "On ne lit plus du tout" }, { id: "b", text: "On lit encore, mais autrement" }, { id: "c", text: "On lit uniquement sur papier" }], answer: "b" },
        { id: "q2", kind: "mcq", stem: "Quel est, selon lui, le véritable défi ?", options: [{ id: "a", text: "Préserver l'attention prolongée" }, { id: "b", text: "Interdire les écrans" }, { id: "c", text: "Imprimer plus de livres" }], answer: "a" },
      ],
    },
  },
  {
    level: "B2", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Programme de bénévolat",
    prompt: "Lisez l'annonce détaillée et répondez.",
    difficulty: "FOUNDATION", topicTag: "vie-publique",
    payload: {
      passages: [{ id: "p1", heading: "Devenez bénévole cet été", body: "Notre association recherche des bénévoles pour accompagner des personnes âgées isolées. Aucune expérience n'est exigée : une formation d'une demi-journée est assurée. L'engagement demandé est de deux heures par semaine, sur une durée minimale de trois mois. Les frais de transport sont remboursés sur justificatif. Inscriptions jusqu'au 20 mai." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Quelle condition est requise pour devenir bénévole ?", options: [{ id: "a", text: "Une longue expérience" }, { id: "b", text: "Aucune expérience préalable" }, { id: "c", text: "Un diplôme spécifique" }], answer: "b" },
        { id: "q2", kind: "mcq", stem: "Quel engagement est demandé ?", options: [{ id: "a", text: "Deux heures par semaine pendant au moins trois mois" }, { id: "b", text: "Une journée par mois" }, { id: "c", text: "Dix heures par semaine" }], answer: "a" },
      ],
    },
  },
  {
    level: "B2", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Manger local",
    prompt: "Lisez l'article et répondez.",
    difficulty: "CORE", topicTag: "alimentation",
    payload: {
      passages: [{ id: "p1", body: "Privilégier les produits locaux séduit de plus en plus de consommateurs, soucieux de soutenir les agriculteurs de leur région et de réduire l'impact des transports. Les experts rappellent toutefois qu'un produit local n'est pas toujours le plus écologique : une tomate cultivée sous serre chauffée en hiver peut peser plus lourd qu'une tomate importée en pleine saison. Le critère décisif reste la saison, plus encore que la distance." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Quel critère est présenté comme décisif ?", options: [{ id: "a", text: "La distance parcourue" }, { id: "b", text: "La saison" }, { id: "c", text: "Le prix" }], answer: "b" },
        { id: "q2", kind: "mcq", stem: "Que rappellent les experts ?", options: [{ id: "a", text: "Local rime toujours avec écologique" }, { id: "b", text: "Un produit local n'est pas forcément le plus écologique" }, { id: "c", text: "Les serres chauffées sont sans impact" }], answer: "b" },
    ],
    },
  },
  {
    level: "B2", skill: "COMPREHENSION_ECRITE", taskType: "VRAI_FAUX", examFamily: null,
    title: "La mobilité électrique",
    prompt: "Lisez le texte et répondez par vrai ou faux.",
    difficulty: "CORE", topicTag: "environnement",
    payload: {
      passages: [{ id: "p1", body: "La voiture électrique progresse, portée par des aides publiques et une offre élargie. Ses partisans mettent en avant l'absence d'émissions à l'usage. Ses détracteurs pointent la fabrication des batteries et la question, encore mal résolue, de leur recyclage. Tous s'accordent au moins sur un point : sans une électricité elle-même peu carbonée, le bénéfice environnemental reste limité." }],
      questions: [
        { id: "q1", kind: "truefalse", stem: "La voiture électrique fait l'unanimité.", answer: "false" },
        { id: "q2", kind: "truefalse", stem: "Le recyclage des batteries reste un point de débat.", answer: "true" },
        { id: "q3", kind: "truefalse", stem: "L'origine de l'électricité influence le bénéfice écologique.", answer: "true" },
      ],
    },
  },
  {
    level: "B2", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "L'apprentissage des langues",
    prompt: "Lisez le texte et répondez.",
    difficulty: "STRETCH", topicTag: "education",
    payload: {
      passages: [{ id: "p1", body: "On entend souvent qu'il serait trop tard, passé un certain âge, pour apprendre une langue. Les recherches récentes contredisent ce préjugé tenace. Un adulte progresse certes différemment d'un enfant, mais il dispose d'atouts : capacité d'analyse, motivation, stratégies d'apprentissage. Ce qui manque le plus souvent, ce n'est pas le talent, mais la régularité et l'exposition à la langue." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Quel préjugé le texte conteste-t-il ?", options: [{ id: "a", text: "Qu'il serait trop tard pour apprendre adulte" }, { id: "b", text: "Que les enfants n'apprennent pas vite" }, { id: "c", text: "Que les langues sont inutiles" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "Que manque-t-il le plus souvent à l'adulte, selon l'auteur ?", options: [{ id: "a", text: "Le talent" }, { id: "b", text: "La régularité et l'exposition" }, { id: "c", text: "La mémoire" }], answer: "b" },
      ],
    },
  },
  {
    level: "B2", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Le retour des centres-villes",
    prompt: "Lisez l'article et répondez.",
    difficulty: "CORE", topicTag: "societe",
    payload: {
      passages: [{ id: "p1", body: "Désertés un temps au profit des zones commerciales périphériques, certains centres-villes reprennent vie. La recette tient en quelques ingrédients : des rues rendues aux piétons, des commerces de proximité soutenus, des logements rénovés. Là où ces efforts ont été menés ensemble, et non isolément, les habitants reviennent. La leçon est claire : un centre-ville ne se redresse pas par une seule mesure spectaculaire, mais par une stratégie d'ensemble patiente." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Quelle est la leçon principale de l'article ?", options: [{ id: "a", text: "Une seule mesure spectaculaire suffit" }, { id: "b", text: "Une stratégie d'ensemble est nécessaire" }, { id: "c", text: "Les centres-villes sont condamnés" }], answer: "b" },
        { id: "q2", kind: "mcq", stem: "Quel ingrédient est cité ?", options: [{ id: "a", text: "Des rues rendues aux piétons" }, { id: "b", text: "Plus de grandes surfaces en périphérie" }, { id: "c", text: "La suppression des logements" }], answer: "a" },
      ],
    },
  },

  // ---------- Compréhension orale (Listening) — shared (examFamily null) ----------
  {
    level: "B2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Interview : un climatologue",
    prompt: "Écoutez l'interview et répondez aux questions.",
    difficulty: "STRETCH", topicTag: "environnement",
    payload: {
      audioScript: "Journaliste : Professeur, peut-on encore inverser la tendance ? Climatologue : Inverser, le mot est trop fort. Ce que nous pouvons encore faire, c'est limiter l'ampleur des dérèglements. Chaque dixième de degré évité compte. Journaliste : Le citoyen a-t-il un rôle ? Climatologue : Bien sûr, mais ne nous trompons pas d'échelle : les gestes individuels sont utiles, ils ne remplaceront pas les décisions collectives et politiques qui, elles, changent vraiment la donne.",
      speakers: [{ role: "Journaliste", voice: "shimmer" }, { role: "Climatologue", voice: "onyx" }],
      questions: [
        { id: "q1", stem: "Que peut-on encore faire, selon le climatologue ?", options: [{ id: "a", text: "Inverser totalement la tendance" }, { id: "b", text: "Limiter l'ampleur des dérèglements" }, { id: "c", text: "Ne rien changer" }], answer: "b" },
        { id: "q2", stem: "Quel est son point de vue sur les gestes individuels ?", options: [{ id: "a", text: "Ils suffisent à tout régler" }, { id: "b", text: "Ils sont inutiles" }, { id: "c", text: "Utiles, mais insuffisants seuls" }], answer: "c" },
      ],
    },
  },
  {
    level: "B2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Débat : la voiture en ville",
    prompt: "Écoutez le débat et répondez.",
    difficulty: "STRETCH", topicTag: "societe",
    payload: {
      audioScript: "Animateur : La voiture a-t-elle encore sa place en centre-ville ? Invité 1 : Pour moi, la réduire, c'est exclure ceux qui en dépendent, les artisans, les familles. Invitée 2 : Je comprends, mais on ne peut pas continuer ainsi. L'idée n'est pas d'interdire, c'est d'offrir des alternatives crédibles : transports fréquents, pistes sûres. Sans cela, bien sûr, on pénalise les gens. Invité 1 : Sur ce point, nous sommes d'accord : l'alternative d'abord, la contrainte ensuite.",
      speakers: [{ role: "Animateur", voice: "echo" }, { role: "Invité 1", voice: "onyx" }, { role: "Invitée 2", voice: "nova" }],
      questions: [
        { id: "q1", stem: "Sur quoi les deux invités finissent-ils par s'accorder ?", options: [{ id: "a", text: "Interdire la voiture immédiatement" }, { id: "b", text: "Proposer des alternatives avant de contraindre" }, { id: "c", text: "Ne rien changer" }], answer: "b" },
        { id: "q2", stem: "Que craint l'invité 1 ?", options: [{ id: "a", text: "Exclure ceux qui dépendent de la voiture" }, { id: "b", text: "Trop de pistes cyclables" }, { id: "c", text: "Le coût des transports" }], answer: "a" },
      ],
    },
  },
  {
    level: "B2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Conférence : l'histoire du café",
    prompt: "Écoutez l'extrait de conférence et répondez.",
    difficulty: "CORE", topicTag: "culture",
    payload: {
      audioScript: "Conférencière : Le café, avant d'être une boisson du quotidien, a d'abord été un produit de luxe, puis un véritable phénomène social. Au dix-huitième siècle, les cafés deviennent des lieux où l'on discute, où l'on débat, où circulent les idées nouvelles. Ce n'est pas un hasard si certains les ont surnommés les « universités du peuple ». Le café n'a pas seulement réveillé les corps : il a, à sa manière, stimulé les esprits.",
      speakers: [{ role: "Conférencière", voice: "nova" }],
      questions: [
        { id: "q1", stem: "Comme quoi certains cafés ont-ils été surnommés ?", options: [{ id: "a", text: "Des « universités du peuple »" }, { id: "b", text: "Des bibliothèques" }, { id: "c", text: "Des marchés" }], answer: "a" },
        { id: "q2", stem: "Quelle idée la conférencière souligne-t-elle ?", options: [{ id: "a", text: "Le café a un rôle social et intellectuel" }, { id: "b", text: "Le café est resté un produit de luxe" }, { id: "c", text: "Le café était interdit" }], answer: "a" },
      ],
    },
  },
  {
    level: "B2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Journal : actualité économique",
    prompt: "Écoutez le bulletin et répondez.",
    difficulty: "CORE", topicTag: "economie",
    payload: {
      audioScript: "Présentateur : En économie, l'emploi continue de progresser ce trimestre, mais à un rythme plus lent qu'attendu. Les créations de postes restent concentrées dans les services. Les économistes appellent à la prudence : la consommation des ménages, elle, marque le pas, freinée par la hausse des prix. La croissance, sans être menacée, devrait rester modérée dans les mois à venir.",
      speakers: [{ role: "Présentateur", voice: "fable" }],
      questions: [
        { id: "q1", stem: "Comment évolue l'emploi ce trimestre ?", options: [{ id: "a", text: "Il progresse, mais plus lentement que prévu" }, { id: "b", text: "Il chute fortement" }, { id: "c", text: "Il est stable depuis des années" }], answer: "a" },
        { id: "q2", stem: "Qu'est-ce qui freine la consommation ?", options: [{ id: "a", text: "La hausse des prix" }, { id: "b", text: "La baisse des impôts" }, { id: "c", text: "Le manque de magasins" }], answer: "a" },
      ],
    },
  },
  {
    level: "B2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Reportage : le bénévolat",
    prompt: "Écoutez le reportage et répondez.",
    difficulty: "CORE", topicTag: "vie-publique",
    payload: {
      audioScript: "Reporter : Ils sont retraités, étudiants, ou actifs sur leur temps libre. Ce qui les réunit ici, chaque samedi, c'est l'envie d'être utiles. Une bénévole : Au début, je pensais donner un peu de mon temps. En réalité, c'est moi qui reçois le plus : des rencontres, un sentiment d'appartenance. Reporter : Un constat partagé par beaucoup : on s'engage pour les autres, on y trouve aussi quelque chose pour soi.",
      speakers: [{ role: "Reporter", voice: "echo" }, { role: "Bénévole", voice: "shimmer" }],
      questions: [
        { id: "q1", stem: "Que découvre la bénévole en s'engageant ?", options: [{ id: "a", text: "Qu'elle reçoit beaucoup en retour" }, { id: "b", text: "Que c'est une perte de temps" }, { id: "c", text: "Qu'elle préfère être seule" }], answer: "a" },
        { id: "q2", stem: "Qui sont les bénévoles présentés ?", options: [{ id: "a", text: "Uniquement des retraités" }, { id: "b", text: "Des profils variés" }, { id: "c", text: "Des employés de l'association" }], answer: "b" },
      ],
    },
  },
  {
    level: "B2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Au travail : un entretien annuel",
    prompt: "Écoutez la conversation et répondez.",
    difficulty: "STRETCH", topicTag: "travail",
    payload: {
      audioScript: "Responsable : Globalement, votre année est très satisfaisante. J'aimerais qu'on parle de la suite. Salarié : Justement, j'aimerais évoluer vers un poste avec plus de responsabilités. Responsable : C'est envisageable, mais cela suppose une formation, et un peu de patience : un poste se libérera plutôt en fin d'année. Salarié : Cela me convient, à condition qu'on fixe ensemble des objectifs clairs d'ici là. Responsable : Tout à fait, c'est la bonne façon de procéder.",
      speakers: [{ role: "Responsable", voice: "onyx" }, { role: "Salarié", voice: "fable" }],
      questions: [
        { id: "q1", stem: "Que souhaite le salarié ?", options: [{ id: "a", text: "Évoluer vers plus de responsabilités" }, { id: "b", text: "Changer d'entreprise" }, { id: "c", text: "Travailler moins" }], answer: "a" },
        { id: "q2", stem: "Quelle condition le salarié pose-t-il ?", options: [{ id: "a", text: "Une augmentation immédiate" }, { id: "b", text: "Des objectifs clairs fixés ensemble" }, { id: "c", text: "Un poste tout de suite" }], answer: "b" },
      ],
    },
  },
  {
    level: "B2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Chronique : un festival de quartier",
    prompt: "Écoutez la chronique et répondez.",
    difficulty: "FOUNDATION", topicTag: "culture",
    payload: {
      audioScript: "Chroniqueuse : Ce week-end, le quartier des Halles se transforme en scène à ciel ouvert. Au programme : concerts gratuits, ateliers pour enfants et marché d'artisans. Une nouveauté cette année : la soirée de clôture se tiendra non pas sur la place habituelle, mais au bord du canal, pour profiter du coucher de soleil. En cas de pluie, tout est reporté au dimanche.",
      speakers: [{ role: "Chroniqueuse", voice: "nova" }],
      questions: [
        { id: "q1", stem: "Quelle est la nouveauté de cette année ?", options: [{ id: "a", text: "La soirée de clôture au bord du canal" }, { id: "b", text: "Les concerts payants" }, { id: "c", text: "L'absence d'ateliers" }], answer: "a" },
        { id: "q2", stem: "Que se passe-t-il en cas de pluie ?", options: [{ id: "a", text: "Tout est annulé" }, { id: "b", text: "Tout est reporté au dimanche" }, { id: "c", text: "Rien ne change" }], answer: "b" },
      ],
    },
  },
  {
    level: "B2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Émission santé : bien dormir",
    prompt: "Écoutez l'extrait et répondez.",
    difficulty: "CORE", topicTag: "sante",
    payload: {
      audioScript: "Médecin : La première règle, et de loin la plus efficace, c'est la régularité : se coucher et se lever à des heures stables, même le week-end. On sous-estime à quel point le corps aime les repères. Le reste — la chambre fraîche, l'absence d'écran — compte aussi, mais vient après. Inutile de tout changer d'un coup : un seul bon réflexe, tenu dans la durée, vaut mieux que dix résolutions abandonnées.",
      speakers: [{ role: "Médecin", voice: "onyx" }],
      questions: [
        { id: "q1", stem: "Quelle est la règle la plus efficace selon le médecin ?", options: [{ id: "a", text: "La régularité des horaires" }, { id: "b", text: "Dormir le plus longtemps possible" }, { id: "c", text: "Changer de chambre" }], answer: "a" },
        { id: "q2", stem: "Que conseille-t-il sur la méthode ?", options: [{ id: "a", text: "Tout changer d'un coup" }, { id: "b", text: "Tenir un seul bon réflexe dans la durée" }, { id: "c", text: "Abandonner si c'est difficile" }], answer: "b" },
      ],
    },
  },
  {
    level: "B2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Interview : créer son entreprise",
    prompt: "Écoutez l'interview et répondez.",
    difficulty: "STRETCH", topicTag: "travail",
    payload: {
      audioScript: "Journaliste : Quel conseil donneriez-vous à ceux qui hésitent à se lancer ? Entrepreneuse : De ne pas attendre le projet parfait. On apprend en faisant. Mon erreur, au début, a été de vouloir tout maîtriser avant de commencer. Journaliste : Et la peur de l'échec ? Entrepreneuse : Elle ne disparaît jamais vraiment. On apprend juste à avancer avec elle, plutôt qu'à l'attendre qu'elle parte.",
      speakers: [{ role: "Journaliste", voice: "echo" }, { role: "Entrepreneuse", voice: "shimmer" }],
      questions: [
        { id: "q1", stem: "Quel conseil donne l'entrepreneuse ?", options: [{ id: "a", text: "Attendre le projet parfait" }, { id: "b", text: "Ne pas attendre, apprendre en faisant" }, { id: "c", text: "Ne jamais se lancer seul" }], answer: "b" },
        { id: "q2", stem: "Que dit-elle de la peur de l'échec ?", options: [{ id: "a", text: "Elle disparaît vite" }, { id: "b", text: "On apprend à avancer avec elle" }, { id: "c", text: "Elle empêche de réussir" }], answer: "b" },
      ],
    },
  },
  {
    level: "B2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Table ronde : l'école et le numérique",
    prompt: "Écoutez l'extrait et répondez.",
    difficulty: "STRETCH", topicTag: "education",
    payload: {
      audioScript: "Modératrice : Faut-il plus d'écrans à l'école ? Enseignant : L'outil n'est ni bon ni mauvais en soi ; tout dépend de l'usage. Une tablette qui remplace la réflexion appauvrit ; une tablette qui ouvre sur des ressources nouvelles enrichit. Chercheuse : J'ajouterais que rien ne remplace le rôle de l'enseignant. La technologie est un moyen, jamais une fin. Le vrai sujet, c'est la formation des professeurs, pas le nombre d'appareils.",
      speakers: [{ role: "Modératrice", voice: "nova" }, { role: "Enseignant", voice: "fable" }, { role: "Chercheuse", voice: "shimmer" }],
      questions: [
        { id: "q1", stem: "Quel est le point de vue de l'enseignant sur l'outil numérique ?", options: [{ id: "a", text: "Tout dépend de l'usage" }, { id: "b", text: "Il est toujours bénéfique" }, { id: "c", text: "Il faut le bannir" }], answer: "a" },
        { id: "q2", stem: "Quel est le vrai sujet selon la chercheuse ?", options: [{ id: "a", text: "Le nombre d'appareils" }, { id: "b", text: "La formation des professeurs" }, { id: "c", text: "Le prix des tablettes" }], answer: "b" },
      ],
    },
  },
  {
    level: "B2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Annonce d'entreprise : réorganisation",
    prompt: "Écoutez l'annonce et répondez.",
    difficulty: "CORE", topicTag: "travail",
    payload: {
      audioScript: "Directrice : Chers collègues, à partir du mois prochain, les équipes seront réorganisées par projet, et non plus par service. L'objectif est de fluidifier la communication et de raccourcir les délais de décision. Je tiens à être claire : cette réorganisation n'entraînera aucune suppression de poste. Des réunions d'information se tiendront la semaine prochaine pour répondre à toutes vos questions.",
      speakers: [{ role: "Directrice", voice: "nova" }],
      questions: [
        { id: "q1", stem: "Comment les équipes seront-elles désormais organisées ?", options: [{ id: "a", text: "Par projet" }, { id: "b", text: "Par service" }, { id: "c", text: "Par ancienneté" }], answer: "a" },
        { id: "q2", stem: "Que précise la directrice ?", options: [{ id: "a", text: "Des postes seront supprimés" }, { id: "b", text: "Aucun poste ne sera supprimé" }, { id: "c", text: "Les salaires baisseront" }], answer: "b" },
      ],
    },
  },
  {
    level: "B2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Reportage : le tourisme durable",
    prompt: "Écoutez le reportage et répondez.",
    difficulty: "CORE", topicTag: "environnement",
    payload: {
      audioScript: "Reporter : Dans ce village de montagne, on a fait un choix : moins de visiteurs, mais mieux accueillis. Une habitante : On a refusé d'agrandir sans fin les parkings. On préfère que les gens viennent en train, qu'ils restent plus longtemps, qu'ils consomment local. Reporter : Le pari semble tenu : la fréquentation a légèrement baissé, mais les retombées pour les commerçants, elles, ont augmenté.",
      speakers: [{ role: "Reporter", voice: "echo" }, { role: "Habitante", voice: "shimmer" }],
      questions: [
        { id: "q1", stem: "Quel choix le village a-t-il fait ?", options: [{ id: "a", text: "Moins de visiteurs, mieux accueillis" }, { id: "b", text: "Le maximum de visiteurs" }, { id: "c", text: "Fermer aux touristes" }], answer: "a" },
        { id: "q2", stem: "Quel est le résultat pour les commerçants ?", options: [{ id: "a", text: "Des retombées en hausse" }, { id: "b", text: "Une faillite générale" }, { id: "c", text: "Aucun changement" }], answer: "a" },
      ],
    },
  },
  {
    level: "B2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Podcast : mieux s'organiser",
    prompt: "Écoutez l'extrait et répondez.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: {
      audioScript: "Animateur : On croit souvent que s'organiser, c'est remplir son agenda. C'est l'inverse. Bien s'organiser, c'est d'abord décider de ce qu'on ne fera pas. Tant qu'on dit oui à tout, on subit ses journées au lieu de les choisir. Mon conseil de la semaine : chaque matin, identifiez une seule tâche vraiment importante, et protégez le temps de la faire avant tout le reste.",
      speakers: [{ role: "Animateur", voice: "fable" }],
      questions: [
        { id: "q1", stem: "Selon l'animateur, bien s'organiser, c'est surtout :", options: [{ id: "a", text: "Décider de ce qu'on ne fera pas" }, { id: "b", text: "Remplir son agenda" }, { id: "c", text: "Dire oui à tout" }], answer: "a" },
        { id: "q2", stem: "Quel est son conseil de la semaine ?", options: [{ id: "a", text: "Protéger le temps d'une tâche importante" }, { id: "b", text: "Travailler le soir" }, { id: "c", text: "Faire dix choses à la fois" }], answer: "a" },
      ],
    },
  },
  {
    level: "B2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Interview : un artiste de rue",
    prompt: "Écoutez l'interview et répondez.",
    difficulty: "CORE", topicTag: "culture",
    payload: {
      audioScript: "Journaliste : Pourquoi la rue, plutôt qu'une galerie ? Artiste : Parce que la rue ne choisit pas son public. En galerie, viennent ceux qui s'intéressent déjà à l'art. Dans la rue, je touche quelqu'un qui ne serait jamais entré dans un musée. Journaliste : Et l'éphémère ne vous gêne pas ? Artiste : Au contraire. Une œuvre qui s'efface oblige les gens à la regarder maintenant, pas demain.",
      speakers: [{ role: "Journaliste", voice: "echo" }, { role: "Artiste", voice: "onyx" }],
      questions: [
        { id: "q1", stem: "Pourquoi l'artiste préfère-t-il la rue ?", options: [{ id: "a", text: "Elle ne choisit pas son public" }, { id: "b", text: "Elle rapporte plus d'argent" }, { id: "c", text: "Elle est plus calme" }], answer: "a" },
        { id: "q2", stem: "Comment voit-il le caractère éphémère de son art ?", options: [{ id: "a", text: "Comme un problème" }, { id: "b", text: "Comme une force qui invite à regarder maintenant" }, { id: "c", text: "Comme sans importance" }], answer: "b" },
      ],
    },
  },
  {
    level: "B2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Météo et conséquences",
    prompt: "Écoutez le bulletin et répondez.",
    difficulty: "FOUNDATION", topicTag: "vie-pratique",
    payload: {
      audioScript: "Présentatrice : Une vague de chaleur s'installe sur l'ensemble du pays pour les prochains jours, avec des températures dépassant localement les 35 degrés. Les autorités appellent à la prudence : il est recommandé de boire régulièrement, d'éviter les efforts aux heures les plus chaudes et de prendre des nouvelles des personnes âgées. La circulation sera par ailleurs ralentie sur les grands axes, en raison des départs en vacances.",
      speakers: [{ role: "Présentatrice", voice: "nova" }],
      questions: [
        { id: "q1", stem: "Quelle recommandation est donnée ?", options: [{ id: "a", text: "Éviter les efforts aux heures chaudes" }, { id: "b", text: "Faire du sport à midi" }, { id: "c", text: "Rester sans boire" }], answer: "a" },
        { id: "q2", stem: "Pourquoi la circulation sera-t-elle ralentie ?", options: [{ id: "a", text: "À cause des départs en vacances" }, { id: "b", text: "À cause de la neige" }, { id: "c", text: "À cause d'une grève" }], answer: "a" },
      ],
    },
  },

  {
    level: "B2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Reportage : la mode de seconde main",
    prompt: "Écoutez le reportage et répondez.",
    difficulty: "CORE", topicTag: "societe",
    payload: {
      audioScript: "Reporter : Longtemps réservée aux petits budgets, la mode de seconde main séduit aujourd'hui un public bien plus large. Une vendeuse : Nos clients ne viennent plus seulement pour économiser. Beaucoup veulent consommer autrement, donner une deuxième vie aux vêtements. Reporter : Le succès est tel que de grandes enseignes s'y mettent à leur tour. Reste une question : cet engouement durera-t-il, ou n'est-il qu'une mode de plus, vite remplacée par la suivante ?",
      speakers: [{ role: "Reporter", voice: "echo" }, { role: "Vendeuse", voice: "shimmer" }],
      questions: [
        { id: "q1", stem: "Qu'est-ce qui a changé chez les clients ?", options: [{ id: "a", text: "Ils ne viennent plus seulement pour économiser" }, { id: "b", text: "Ils achètent uniquement du neuf" }, { id: "c", text: "Ils ne s'intéressent plus à la mode" }], answer: "a" },
        { id: "q2", stem: "Quelle question le reporter pose-t-il à la fin ?", options: [{ id: "a", text: "Si cet engouement va durer" }, { id: "b", text: "Si les prix vont monter" }, { id: "c", text: "Si les magasins vont fermer" }], answer: "a" },
      ],
    },
  },

  // ---------- Expression écrite (Writing) — exam-tagged ----------
  {
    level: "B2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF B2 — Prise de position : les écrans à l'école",
    prompt: "Rédigez un texte argumenté et construit.",
    difficulty: "CORE", topicTag: "education",
    payload: { situation: "Le conseil de votre établissement envisage d'équiper toutes les classes de tablettes numériques.", instruction: "Vous écrivez au journal de l'établissement pour donner votre opinion argumentée sur cette décision. Présentez votre point de vue de façon claire, appuyez-le sur des arguments et des exemples, et anticipez une objection.", wordMin: 250, wordMax: 280 },
  },
  {
    level: "B2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF B2 — Lettre formelle : une décision contestée",
    prompt: "Rédigez une lettre formelle argumentée.",
    difficulty: "STRETCH", topicTag: "vie-publique",
    payload: { situation: "Votre municipalité a décidé de supprimer une ligne de bus que vous utilisez quotidiennement.", instruction: "Écrivez une lettre au maire pour contester cette décision. Exposez les conséquences concrètes, avancez des arguments solides et proposez une solution alternative. Adoptez un ton courtois mais ferme.", wordMin: 250, wordMax: 290 },
  },
  {
    level: "B2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF B2 — Essai : consommer moins",
    prompt: "Rédigez un essai argumentatif.",
    difficulty: "CORE", topicTag: "societe",
    payload: { situation: "Un magazine lance un débat : « Faut-il apprendre à consommer moins ? »", instruction: "Rédigez un article qui défend une position nuancée. Structurez votre texte (introduction, arguments, conclusion) et illustrez vos idées par des exemples concrets.", wordMin: 250, wordMax: 280 },
  },
  {
    level: "B2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF B2 — Courrier des lecteurs : le télétravail",
    prompt: "Rédigez une réponse argumentée.",
    difficulty: "CORE", topicTag: "travail",
    payload: { situation: "Un article affirmait récemment que « le télétravail nuit à la cohésion des entreprises ».", instruction: "Réagissez dans le courrier des lecteurs. Donnez votre avis, nuancez l'affirmation de l'article et appuyez-vous sur votre expérience ou des exemples.", wordMin: 250, wordMax: 280 },
  },
  {
    level: "B2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF — Section B : argumenter une opinion",
    prompt: "Rédigez le texte argumenté demandé.",
    difficulty: "CORE", topicTag: "environnement",
    payload: { situation: "Un débat public porte sur la limitation de la voiture individuelle en ville.", instruction: "Rédigez un texte clair et structuré dans lequel vous prenez position pour ou contre cette limitation. Justifiez votre opinion avec au moins trois arguments et donnez des exemples.", wordMin: 200, wordMax: 250 },
  },
  {
    level: "B2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF — Section A : lettre de réclamation",
    prompt: "Rédigez la lettre demandée.",
    difficulty: "FOUNDATION", topicTag: "vie-pratique",
    payload: { situation: "Vous avez réservé une formation en ligne qui ne correspond pas du tout à la description annoncée.", instruction: "Écrivez au service concerné pour décrire le problème, exprimer votre mécontentement de façon mesurée et demander un remboursement ou une solution.", wordMin: 150, wordMax: 200 },
  },
  {
    level: "B2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF — Section B : réagir à une idée",
    prompt: "Rédigez votre texte argumenté.",
    difficulty: "STRETCH", topicTag: "medias",
    payload: { situation: "Une tribune affirme que « les réseaux sociaux nous informent mieux que les journaux ».", instruction: "Rédigez un texte argumenté qui répond à cette affirmation. Développez votre point de vue, organisez vos arguments et concluez clairement.", wordMin: 200, wordMax: 250 },
  },
  {
    level: "B2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF — Section A : message à un collègue",
    prompt: "Rédigez le message demandé.",
    difficulty: "FOUNDATION", topicTag: "travail",
    payload: { situation: "Vous devez vous absenter une semaine et confier un dossier important à un collègue.", instruction: "Écrivez-lui un message clair : expliquez la situation, donnez les consignes essentielles, indiquez où trouver les informations et remerciez-le.", wordMin: 150, wordMax: 200 },
  },
  {
    level: "B2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF — Tâche 3 : essai argumentatif",
    prompt: "Rédigez un texte structuré et argumenté.",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { situation: "Sujet : « Le tourisme de masse fait-il plus de bien que de mal aux villes ? »", instruction: "Rédigez un texte argumenté qui développe une position personnelle. Exposez des arguments contrastés avant de conclure de manière nuancée.", wordMin: 200, wordMax: 250 },
  },
  {
    level: "B2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF — Tâche 2 : article informatif",
    prompt: "Rédigez l'article demandé.",
    difficulty: "CORE", topicTag: "culture",
    payload: { situation: "Le bulletin de votre association vous demande de présenter un événement culturel de votre région.", instruction: "Rédigez un article qui présente l'événement, explique son intérêt et donne envie d'y participer. Soyez clair et structuré.", wordMin: 150, wordMax: 200 },
  },
  {
    level: "B2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF — Tâche 3 : prendre position",
    prompt: "Rédigez votre texte argumenté.",
    difficulty: "CORE", topicTag: "travail",
    payload: { situation: "Sujet : « La semaine de quatre jours devrait-elle se généraliser ? »", instruction: "Rédigez un texte qui présente votre opinion, l'appuie sur des arguments et des exemples, et tient compte d'un avis contraire.", wordMin: 200, wordMax: 250 },
  },
  {
    level: "B2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF — Tâche 2 : courriel formel",
    prompt: "Rédigez le courriel demandé.",
    difficulty: "FOUNDATION", topicTag: "education",
    payload: { situation: "Vous souhaitez vous inscrire à une formation et il vous manque plusieurs informations.", instruction: "Écrivez un courriel à l'organisme : présentez-vous brièvement, posez vos questions (dates, tarif, niveau requis, modalités) et demandez une réponse rapide.", wordMin: 150, wordMax: 200 },
  },
  {
    level: "B2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF B2 — Essai : l'apprentissage tout au long de la vie",
    prompt: "Rédigez un essai construit.",
    difficulty: "STRETCH", topicTag: "education",
    payload: { situation: "On dit souvent qu'« il n'y a pas d'âge pour apprendre ».", instruction: "Rédigez un texte argumenté qui discute cette affirmation. Développez vos idées, nuancez et illustrez par des exemples tirés de la vie réelle.", wordMin: 250, wordMax: 280 },
  },
  {
    level: "B2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF — Section B : un changement de société",
    prompt: "Rédigez votre texte argumenté.",
    difficulty: "CORE", topicTag: "technologie",
    payload: { situation: "Sujet : « L'intelligence artificielle va-t-elle améliorer notre travail ? »", instruction: "Rédigez un texte argumenté présentant votre point de vue. Appuyez-vous sur des arguments et anticipez une objection avant de conclure.", wordMin: 200, wordMax: 250 },
  },
  {
    level: "B2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF — Tâche 3 : ville et nature",
    prompt: "Rédigez un texte argumenté.",
    difficulty: "CORE", topicTag: "environnement",
    payload: { situation: "Sujet : « Faut-il rendre plus de place à la nature dans les villes ? »", instruction: "Rédigez un texte structuré qui défend une position. Donnez des arguments concrets et un exemple, puis concluez.", wordMin: 200, wordMax: 250 },
  },
  {
    level: "B2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF B2 — Lettre ouverte : la lecture",
    prompt: "Rédigez une lettre ouverte argumentée.",
    difficulty: "CORE", topicTag: "culture",
    payload: { situation: "Une bibliothèque de quartier risque de fermer faute de moyens.", instruction: "Rédigez une lettre ouverte pour défendre son maintien. Montrez son rôle pour les habitants, argumentez et proposez des pistes concrètes pour la sauver.", wordMin: 250, wordMax: 280 },
  },

  // ---------- Expression orale (Speaking) — exam-tagged ----------
  {
    level: "B2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF B2 — Monologue : la place du sport",
    prompt: "Présentez et défendez votre point de vue, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "sante",
    payload: { taskPrompt: "À partir de l'idée « le sport devrait occuper plus de place dans la vie quotidienne », dégagez un point de vue personnel et défendez-le de manière organisée, avec des arguments et des exemples.", prepSeconds: 600, speakSeconds: 180 },
  },
  {
    level: "B2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF B2 — Monologue : le bénévolat",
    prompt: "Défendez un point de vue construit, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "vie-publique",
    payload: { taskPrompt: "À partir de l'idée « l'engagement bénévole devrait être encouragé dès l'école », présentez votre opinion et défendez-la avec des arguments structurés.", prepSeconds: 600, speakSeconds: 180 },
  },
  {
    level: "B2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF B2 — Interaction : convaincre",
    prompt: "Jouez la situation à l'oral, puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "travail",
    payload: { taskPrompt: "Vous proposez à votre responsable de mettre en place une journée de télétravail par semaine. Présentez votre demande, anticipez ses réticences et négociez une solution acceptable pour les deux parties.", prepSeconds: 60, speakSeconds: 180 },
  },
  {
    level: "B2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF B2 — Monologue : les écrans et les enfants",
    prompt: "Défendez votre point de vue, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "education",
    payload: { taskPrompt: "À partir de l'idée « il faudrait limiter le temps d'écran des enfants », exposez et défendez votre opinion avec des arguments et des exemples concrets.", prepSeconds: 600, speakSeconds: 180 },
  },
  {
    level: "B2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF — Section B : donner et défendre son avis",
    prompt: "Exprimez votre opinion à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "societe",
    payload: { taskPrompt: "On vous demande votre avis sur l'affirmation : « Les grandes villes sont devenues invivables. » Donnez votre point de vue, justifiez-le avec des arguments et illustrez par des exemples.", prepSeconds: 120, speakSeconds: 180 },
  },
  {
    level: "B2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF — Section A : obtenir une information détaillée",
    prompt: "Jouez la situation à l'oral, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "vie-pratique",
    payload: { taskPrompt: "Vous voyez l'annonce d'un programme de formation professionnelle. Vous téléphonez pour obtenir des précisions (contenu, durée, financement possible, débouchés). Posez des questions claires et rebondissez sur les réponses.", prepSeconds: 60, speakSeconds: 150 },
  },
  {
    level: "B2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF — Section B : réagir à un sujet d'actualité",
    prompt: "Présentez votre position à l'oral, puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "environnement",
    payload: { taskPrompt: "Réagissez à l'affirmation : « Chacun devrait pouvoir voyager autant qu'il le souhaite. » Présentez un point de vue nuancé, avec des arguments et un exemple, puis concluez.", prepSeconds: 120, speakSeconds: 180 },
  },
  {
    level: "B2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF — Section A : organiser un projet commun",
    prompt: "Jouez la situation à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Avec un ami, vous organisez une fête de quartier. Vous l'appelez pour vous répartir les tâches : proposez des idées, réagissez aux siennes et mettez-vous d'accord sur un plan.", prepSeconds: 60, speakSeconds: 150 },
  },
  {
    level: "B2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF — Tâche 3 : exprimer une opinion argumentée",
    prompt: "Développez votre point de vue à l'oral, puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "medias",
    payload: { taskPrompt: "Sujet : « Faut-il se méfier de l'information trouvée sur les réseaux sociaux ? » Donnez votre opinion, développez plusieurs arguments et illustrez par des exemples.", prepSeconds: 120, speakSeconds: 180 },
  },
  {
    level: "B2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF — Tâche 2 : décrire et comparer",
    prompt: "Répondez à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Comparez la vie en ville et la vie à la campagne. Décrivez les avantages et les inconvénients de chacune, puis dites laquelle vous conviendrait le mieux et pourquoi.", prepSeconds: 60, speakSeconds: 150 },
  },
  {
    level: "B2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF — Tâche 3 : un choix de société",
    prompt: "Présentez votre point de vue à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "travail",
    payload: { taskPrompt: "Sujet : « Vaut-il mieux un travail bien payé ou un travail qui a du sens ? » Présentez votre point de vue, nuancez et appuyez-vous sur des exemples.", prepSeconds: 120, speakSeconds: 180 },
  },
  {
    level: "B2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF — Tâche 2 : raconter une expérience",
    prompt: "Répondez à l'oral, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "culture",
    payload: { taskPrompt: "Racontez un événement culturel (concert, exposition, festival) qui vous a marqué. Décrivez-le, expliquez pourquoi il vous a plu et ce qu'il vous a apporté.", prepSeconds: 60, speakSeconds: 150 },
  },
  {
    level: "B2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF B2 — Monologue : la ville de demain",
    prompt: "Défendez votre vision, puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "environnement",
    payload: { taskPrompt: "À partir de l'idée « la ville de demain devra faire une plus grande place à la nature », présentez votre point de vue et défendez-le de façon organisée.", prepSeconds: 600, speakSeconds: 180 },
  },
  {
    level: "B2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF — Section B : technologie et quotidien",
    prompt: "Donnez votre avis à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "technologie",
    payload: { taskPrompt: "Réagissez à l'affirmation : « La technologie nous fait gagner du temps. » Présentez un avis nuancé avec des arguments et au moins un exemple, puis concluez.", prepSeconds: 120, speakSeconds: 180 },
  },
  {
    level: "B2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF — Tâche 3 : l'éducation et le numérique",
    prompt: "Présentez votre opinion à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "education",
    payload: { taskPrompt: "Sujet : « Le numérique améliore-t-il vraiment l'éducation ? » Développez votre point de vue avec des arguments contrastés et concluez de façon nuancée.", prepSeconds: 120, speakSeconds: 180 },
  },
  {
    level: "B2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF B2 — Interaction : trouver un compromis",
    prompt: "Jouez la situation à l'oral, puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Vous partagez un logement et votre colocataire souhaite adopter un animal, ce qui vous pose problème. Échangez vos points de vue et cherchez ensemble une solution acceptable pour tous les deux.", prepSeconds: 60, speakSeconds: 180 },
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
  console.log(`seed:b2 — ${created} created, ${ITEMS.length - created} already present`);
}

if (isDirectRun(import.meta.url)) {
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(() => prisma.$disconnect());
}
