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

  // ===== B1 wave (2b) — bulk content, ~12 more per skill =====

  // ---------- Compréhension écrite (Reading) — shared ----------
  {
    level: "B1", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Annonce : recherche colocataire",
    prompt: "Lisez l'annonce et répondez.",
    difficulty: "CORE", topicTag: "habitat",
    payload: {
      passages: [{ id: "p1", body: "Cherche colocataire pour appartement de trois pièces, proche du métro. Loyer : 420 € par mois, charges comprises. Chambre meublée, internet inclus. Non-fumeur de préférence. Disponible à partir du 1er septembre." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Que comprend le loyer ?", options: [{ id: "a", text: "Les charges" }, { id: "b", text: "Les repas" }, { id: "c", text: "Le téléphone" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "À partir de quand la chambre est-elle libre ?", options: [{ id: "a", text: "Le 1er août" }, { id: "b", text: "Le 1er septembre" }, { id: "c", text: "Le 1er octobre" }], answer: "b" },
      ],
    },
  },
  {
    level: "B1", skill: "COMPREHENSION_ECRITE", taskType: "VRAI_FAUX", examFamily: null,
    title: "Règlement de la piscine municipale",
    prompt: "Lisez le règlement et indiquez vrai ou faux.",
    difficulty: "FOUNDATION", topicTag: "loisirs",
    payload: {
      passages: [{ id: "p1", body: "Piscine municipale : le bonnet de bain est obligatoire. La piscine est fermée le lundi. Les enfants de moins de huit ans doivent être accompagnés d'un adulte." }],
      questions: [
        { id: "q1", kind: "truefalse", stem: "Le bonnet de bain est facultatif.", answer: "false" },
        { id: "q2", kind: "truefalse", stem: "La piscine est fermée le lundi.", answer: "true" },
      ],
    },
  },
  {
    level: "B1", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Article : le télétravail",
    prompt: "Lisez l'extrait et répondez.",
    difficulty: "STRETCH", topicTag: "travail",
    payload: {
      passages: [{ id: "p1", body: "Depuis la pandémie, de nombreuses entreprises proposent le télétravail deux ou trois jours par semaine. Les salariés apprécient le gain de temps de transport, mais certains regrettent le manque de contact avec leurs collègues. Les responsables, eux, doivent apprendre à gérer leurs équipes à distance." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Que regrettent certains salariés ?", options: [{ id: "a", text: "Le salaire" }, { id: "b", text: "Le manque de contact" }, { id: "c", text: "Les transports" }], answer: "b" },
        { id: "q2", kind: "mcq", stem: "Que doivent apprendre les responsables ?", options: [{ id: "a", text: "Gérer à distance" }, { id: "b", text: "Travailler le week-end" }, { id: "c", text: "Changer de bureau" }], answer: "a" },
      ],
    },
  },
  {
    level: "B1", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Courriel : confirmation de commande",
    prompt: "Lisez le courriel et répondez.",
    difficulty: "FOUNDATION", topicTag: "vie-pratique",
    payload: {
      passages: [{ id: "p1", heading: "Confirmation de commande", body: "Bonjour, votre commande n° 4521 a bien été enregistrée. Elle sera livrée sous trois à cinq jours ouvrés à l'adresse indiquée. Vous recevrez un message dès l'expédition." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Quand la commande sera-t-elle livrée ?", options: [{ id: "a", text: "Le jour même" }, { id: "b", text: "Sous trois à cinq jours" }, { id: "c", text: "Dans un mois" }], answer: "b" },
        { id: "q2", kind: "mcq", stem: "Que recevra le client à l'expédition ?", options: [{ id: "a", text: "Un message" }, { id: "b", text: "Un appel" }, { id: "c", text: "Une facture papier" }], answer: "a" },
      ],
    },
  },
  {
    level: "B1", skill: "COMPREHENSION_ECRITE", taskType: "VRAI_FAUX", examFamily: null,
    title: "Forum : conseils de voyage",
    prompt: "Lisez le message et indiquez vrai ou faux.",
    difficulty: "CORE", topicTag: "voyages",
    payload: {
      passages: [{ id: "p1", body: "Message sur un forum : Je reviens du Portugal, c'était super ! Pour ceux qui partent, réservez les hôtels à l'avance, surtout en été. Les transports en commun sont pratiques et pas chers. Évitez de louer une voiture en ville, le stationnement est difficile." }],
      questions: [
        { id: "q1", kind: "truefalse", stem: "L'auteur conseille de réserver les hôtels à l'avance.", answer: "true" },
        { id: "q2", kind: "truefalse", stem: "L'auteur recommande de louer une voiture en ville.", answer: "false" },
      ],
    },
  },
  {
    level: "B1", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Brochure : cours du soir",
    prompt: "Lisez la brochure et répondez.",
    difficulty: "CORE", topicTag: "education",
    payload: {
      passages: [{ id: "p1", body: "Cours du soir : la mairie propose des cours de langues, d'informatique et de cuisine. Les inscriptions ont lieu en septembre. Le premier cours est gratuit pour essayer. Tarif réduit pour les étudiants et les demandeurs d'emploi." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Quand ont lieu les inscriptions ?", options: [{ id: "a", text: "En juin" }, { id: "b", text: "En septembre" }, { id: "c", text: "En décembre" }], answer: "b" },
        { id: "q2", kind: "mcq", stem: "Qui bénéficie d'un tarif réduit ?", options: [{ id: "a", text: "Les étudiants" }, { id: "b", text: "Les enfants" }, { id: "c", text: "Les touristes" }], answer: "a" },
      ],
    },
  },
  {
    level: "B1", skill: "COMPREHENSION_ECRITE", taskType: "VRAI_FAUX", examFamily: null,
    title: "Note de service : tri des déchets",
    prompt: "Lisez la note et indiquez vrai ou faux.",
    difficulty: "CORE", topicTag: "travail",
    payload: {
      passages: [{ id: "p1", heading: "Note de service", body: "À partir de lundi, de nouvelles poubelles seront installées à chaque étage. Le papier va dans le bac bleu, le plastique dans le bac jaune. Les déchets alimentaires ne sont pas acceptés dans ces bacs ; merci d'utiliser la cuisine." }],
      questions: [
        { id: "q1", kind: "truefalse", stem: "Le papier va dans le bac jaune.", answer: "false" },
        { id: "q2", kind: "truefalse", stem: "Les déchets alimentaires ne vont pas dans ces bacs.", answer: "true" },
      ],
    },
  },
  {
    level: "B1", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Article : les marchés de producteurs",
    prompt: "Lisez l'extrait et répondez.",
    difficulty: "STRETCH", topicTag: "societe",
    payload: {
      passages: [{ id: "p1", body: "Les marchés de producteurs connaissent un grand succès. Les clients y trouvent des fruits et légumes de saison, souvent cultivés à quelques kilomètres seulement. Acheter directement au producteur permet de payer un prix juste et de réduire le transport. Le seul inconvénient : les marchés n'ont lieu que certains jours." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Quel est l'avantage d'acheter au producteur ?", options: [{ id: "a", text: "C'est ouvert tous les jours" }, { id: "b", text: "Un prix juste et moins de transport" }, { id: "c", text: "Des produits importés" }], answer: "b" },
        { id: "q2", kind: "mcq", stem: "Quel est l'inconvénient mentionné ?", options: [{ id: "a", text: "Les prix élevés" }, { id: "b", text: "La mauvaise qualité" }, { id: "c", text: "Les marchés n'ont lieu que certains jours" }], answer: "c" },
      ],
    },
  },
  {
    level: "B1", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Message : reporter un rendez-vous",
    prompt: "Lisez le message et répondez.",
    difficulty: "FOUNDATION", topicTag: "vie-pratique",
    payload: {
      passages: [{ id: "p1", body: "Bonjour, je suis désolée mais je dois reporter notre rendez-vous de mardi. Seriez-vous disponible jeudi à la même heure ? Si cela ne vous convient pas, proposez-moi un autre moment. Merci de votre compréhension." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Que veut faire l'auteure ?", options: [{ id: "a", text: "Annuler définitivement" }, { id: "b", text: "Reporter le rendez-vous" }, { id: "c", text: "Avancer le rendez-vous" }], answer: "b" },
        { id: "q2", kind: "mcq", stem: "Quel jour propose-t-elle ?", options: [{ id: "a", text: "Lundi" }, { id: "b", text: "Mardi" }, { id: "c", text: "Jeudi" }], answer: "c" },
      ],
    },
  },
  {
    level: "B1", skill: "COMPREHENSION_ECRITE", taskType: "VRAI_FAUX", examFamily: null,
    title: "Mode d'emploi : la cafetière",
    prompt: "Lisez les instructions et indiquez vrai ou faux.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: {
      passages: [{ id: "p1", body: "Pour préparer un café : remplissez le réservoir d'eau froide, placez un filtre et ajoutez deux cuillères de café. Appuyez sur le bouton rouge. Ne mettez jamais d'eau chaude dans le réservoir. Nettoyez la machine une fois par semaine." }],
      questions: [
        { id: "q1", kind: "truefalse", stem: "Il faut utiliser de l'eau froide.", answer: "true" },
        { id: "q2", kind: "truefalse", stem: "Il faut nettoyer la machine tous les jours.", answer: "false" },
      ],
    },
  },
  {
    level: "B1", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Annonce : recherche de bénévoles",
    prompt: "Lisez l'annonce et répondez.",
    difficulty: "CORE", topicTag: "societe",
    payload: {
      passages: [{ id: "p1", body: "L'association Solidarité recherche des bénévoles pour aider les enfants à faire leurs devoirs après l'école. Aucune expérience n'est nécessaire : il suffit d'être patient et disponible deux heures par semaine. Une petite formation est proposée au début." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Que feront les bénévoles ?", options: [{ id: "a", text: "Aider aux devoirs" }, { id: "b", text: "Cuisiner" }, { id: "c", text: "Faire le ménage" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "Que faut-il pour devenir bénévole ?", options: [{ id: "a", text: "Un diplôme" }, { id: "b", text: "De la patience et du temps" }, { id: "c", text: "Une voiture" }], answer: "b" },
      ],
    },
  },
  {
    level: "B1", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Offre d'emploi saisonnier",
    prompt: "Lisez l'offre et répondez.",
    difficulty: "STRETCH", topicTag: "travail",
    payload: {
      passages: [{ id: "p1", heading: "Offre d'emploi", body: "Restaurant au bord de la mer recherche serveurs pour la saison d'été (juillet et août). Travail en soirée et le week-end. Débutants acceptés, formation assurée. Logement possible sur place. Envoyez votre candidature avant le 15 juin." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Quand le travail a-t-il lieu ?", options: [{ id: "a", text: "Le matin uniquement" }, { id: "b", text: "En soirée et le week-end" }, { id: "c", text: "Toute la journée en hiver" }], answer: "b" },
        { id: "q2", kind: "mcq", stem: "Que propose l'employeur aux débutants ?", options: [{ id: "a", text: "Une formation" }, { id: "b", text: "Un salaire élevé" }, { id: "c", text: "Des vacances" }], answer: "a" },
      ],
    },
  },

  // ---------- Compréhension de l'oral (Listening) — shared ----------
  {
    level: "B1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Promotion au supermarché",
    prompt: "Écoutez l'annonce et répondez.",
    difficulty: "FOUNDATION", topicTag: "commerces",
    payload: {
      audioScript: "Chers clients, profitez de notre offre du jour : pour deux paquets de café achetés, le troisième est offert. Cette promotion est valable jusqu'à ce soir, dix-neuf heures, au rayon boissons chaudes. Bonnes courses à tous.",
      speakers: [{ role: "Annonceur", voice: "nova" }],
      questions: [
        { id: "q1", stem: "Quelle est l'offre ?", options: [{ id: "a", text: "Deux achetés, un offert" }, { id: "b", text: "Moitié prix sur tout" }, { id: "c", text: "Livraison gratuite" }], answer: "a" },
        { id: "q2", stem: "Jusqu'à quand l'offre est-elle valable ?", options: [{ id: "a", text: "Demain matin" }, { id: "b", text: "Ce soir à 19 h" }, { id: "c", text: "Toute la semaine" }], answer: "b" },
      ],
    },
  },
  {
    level: "B1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "À l'office de tourisme",
    prompt: "Écoutez la conversation et répondez.",
    difficulty: "CORE", topicTag: "voyages",
    payload: {
      audioScript: "Touriste : Bonjour, qu'est-ce qu'on peut visiter dans la région en une journée ? Employée : Le château est incontournable, et il y a aussi un joli village médiéval à vingt minutes en bus. Touriste : Le château est ouvert le dimanche ? Employée : Oui, de dix heures à dix-huit heures.",
      speakers: [{ role: "Touriste", voice: "echo" }, { role: "Employée", voice: "shimmer" }],
      questions: [
        { id: "q1", stem: "Que recommande l'employée ?", options: [{ id: "a", text: "Le château et un village" }, { id: "b", text: "Un musée" }, { id: "c", text: "La plage" }], answer: "a" },
        { id: "q2", stem: "Le château ferme à quelle heure le dimanche ?", options: [{ id: "a", text: "16 h" }, { id: "b", text: "18 h" }, { id: "c", text: "20 h" }], answer: "b" },
      ],
    },
  },
  {
    level: "B1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Message du cabinet médical",
    prompt: "Écoutez le message et répondez.",
    difficulty: "FOUNDATION", topicTag: "vie-pratique",
    payload: {
      audioScript: "Bonjour, c'est le cabinet du docteur Lambert. Nous vous rappelons votre rendez-vous de demain à quinze heures. Si vous ne pouvez pas venir, merci de nous prévenir au moins vingt-quatre heures à l'avance. Bonne journée.",
      speakers: [{ role: "Secrétaire", voice: "fable" }],
      questions: [
        { id: "q1", stem: "À quelle heure est le rendez-vous ?", options: [{ id: "a", text: "5 h" }, { id: "b", text: "15 h" }, { id: "c", text: "13 h" }], answer: "b" },
        { id: "q2", stem: "Que faut-il faire en cas d'empêchement ?", options: [{ id: "a", text: "Prévenir 24 h à l'avance" }, { id: "b", text: "Venir un autre jour sans prévenir" }, { id: "c", text: "Envoyer un courriel" }], answer: "a" },
      ],
    },
  },
  {
    level: "B1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Réserver une table",
    prompt: "Écoutez la conversation et répondez.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: {
      audioScript: "Serveur : Restaurant Le Jardin, bonjour. Cliente : Bonjour, je voudrais réserver une table pour quatre personnes samedi soir. Serveur : À quelle heure ? Cliente : Vingt heures, si possible. Serveur : C'est noté, une table pour quatre à vingt heures. À quel nom ? Cliente : Au nom de Durand.",
      speakers: [{ role: "Serveur", voice: "onyx" }, { role: "Cliente", voice: "nova" }],
      questions: [
        { id: "q1", stem: "Pour combien de personnes la cliente réserve-t-elle ?", options: [{ id: "a", text: "Deux" }, { id: "b", text: "Quatre" }, { id: "c", text: "Six" }], answer: "b" },
        { id: "q2", stem: "À quelle heure est la réservation ?", options: [{ id: "a", text: "18 h" }, { id: "b", text: "20 h" }, { id: "c", text: "22 h" }], answer: "b" },
      ],
    },
  },
  {
    level: "B1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "La météo de demain",
    prompt: "Écoutez le bulletin et répondez.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: {
      audioScript: "Voici la météo pour demain. La matinée sera grise avec quelques pluies sur le nord du pays. L'après-midi, le soleil reviendra et les températures monteront jusqu'à vingt-deux degrés. Pensez tout de même à prendre un parapluie le matin.",
      speakers: [{ role: "Présentateur", voice: "echo" }],
      questions: [
        { id: "q1", stem: "Quel temps fera-t-il l'après-midi ?", options: [{ id: "a", text: "Pluvieux" }, { id: "b", text: "Ensoleillé" }, { id: "c", text: "Neigeux" }], answer: "b" },
        { id: "q2", stem: "Que conseille-t-on de prendre le matin ?", options: [{ id: "a", text: "Un parapluie" }, { id: "b", text: "Des lunettes de soleil" }, { id: "c", text: "Un manteau" }], answer: "a" },
      ],
    },
  },
  {
    level: "B1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "À l'agence de location de voitures",
    prompt: "Écoutez la conversation et répondez.",
    difficulty: "STRETCH", topicTag: "voyages",
    payload: {
      audioScript: "Employé : Bonjour, vous avez réservé une voiture ? Client : Oui, pour trois jours, au nom de Petit. Employé : Très bien. Le plein est fait, merci de la rendre avec le plein également. L'assurance est comprise. Voici les clés, la voiture est sur la place numéro douze.",
      speakers: [{ role: "Employé", voice: "shimmer" }, { role: "Client", voice: "echo" }],
      questions: [
        { id: "q1", stem: "Pour combien de temps le client loue-t-il la voiture ?", options: [{ id: "a", text: "Un jour" }, { id: "b", text: "Trois jours" }, { id: "c", text: "Une semaine" }], answer: "b" },
        { id: "q2", stem: "Que doit faire le client en rendant la voiture ?", options: [{ id: "a", text: "La laver" }, { id: "b", text: "Faire le plein" }, { id: "c", text: "Changer les pneus" }], answer: "b" },
      ],
    },
  },
  {
    level: "B1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Répondeur d'une entreprise",
    prompt: "Écoutez le message et répondez.",
    difficulty: "FOUNDATION", topicTag: "travail",
    payload: {
      audioScript: "Vous êtes bien chez Multiservices. Nos bureaux sont ouverts du lundi au vendredi, de neuf heures à dix-sept heures. Nous sommes actuellement fermés. Laissez un message après le signal ou rappelez pendant nos horaires d'ouverture. Merci.",
      speakers: [{ role: "Répondeur", voice: "nova" }],
      questions: [
        { id: "q1", stem: "Quels jours les bureaux sont-ils ouverts ?", options: [{ id: "a", text: "Tous les jours" }, { id: "b", text: "Du lundi au vendredi" }, { id: "c", text: "Le week-end" }], answer: "b" },
        { id: "q2", stem: "Que peut-on faire maintenant ?", options: [{ id: "a", text: "Laisser un message" }, { id: "b", text: "Visiter les bureaux" }, { id: "c", text: "Parler à un employé" }], answer: "a" },
      ],
    },
  },
  {
    level: "B1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "À la pharmacie",
    prompt: "Écoutez la conversation et répondez.",
    difficulty: "CORE", topicTag: "vie-pratique",
    payload: {
      audioScript: "Client : Bonjour, j'ai mal à la gorge depuis hier. Pharmacienne : Avez-vous de la fièvre ? Client : Non, juste mal à la gorge. Pharmacienne : Je vous conseille ces pastilles, une toutes les quatre heures. Si ça ne va pas mieux dans trois jours, consultez un médecin.",
      speakers: [{ role: "Client", voice: "echo" }, { role: "Pharmacienne", voice: "shimmer" }],
      questions: [
        { id: "q1", stem: "Quel est le problème du client ?", options: [{ id: "a", text: "Mal à la tête" }, { id: "b", text: "Mal à la gorge" }, { id: "c", text: "Mal au dos" }], answer: "b" },
        { id: "q2", stem: "Que conseille la pharmacienne si ça ne s'améliore pas ?", options: [{ id: "a", text: "Consulter un médecin" }, { id: "b", text: "Prendre plus de pastilles" }, { id: "c", text: "Se reposer une semaine" }], answer: "a" },
      ],
    },
  },
  {
    level: "B1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Interview d'un sportif",
    prompt: "Écoutez l'interview et répondez.",
    difficulty: "STRETCH", topicTag: "societe",
    payload: {
      audioScript: "Journaliste : Félicitations pour votre victoire ! Quel est votre secret ? Sportif : Il n'y a pas de secret, juste beaucoup d'entraînement et une bonne hygiène de vie. Je m'entraîne six jours sur sept. Journaliste : Et la pression ? Sportif : J'apprends à rester calme, c'est aussi important que le physique.",
      speakers: [{ role: "Journaliste", voice: "onyx" }, { role: "Sportif", voice: "fable" }],
      questions: [
        { id: "q1", stem: "Combien de jours s'entraîne-t-il ?", options: [{ id: "a", text: "Trois" }, { id: "b", text: "Six" }, { id: "c", text: "Sept" }], answer: "b" },
        { id: "q2", stem: "Qu'est-ce qui est aussi important que le physique, selon lui ?", options: [{ id: "a", text: "Rester calme" }, { id: "b", text: "L'argent" }, { id: "c", text: "Le public" }], answer: "a" },
      ],
    },
  },
  {
    level: "B1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Annonce d'embarquement",
    prompt: "Écoutez l'annonce et répondez.",
    difficulty: "CORE", topicTag: "transports",
    payload: {
      audioScript: "Mesdames et messieurs, le vol AF 230 à destination de Montréal va embarquer porte 22. Nous invitons les passagers voyageant avec des enfants à se présenter en priorité. L'embarquement se terminera quinze minutes avant le décollage. Merci de préparer votre carte d'embarquement.",
      speakers: [{ role: "Annonceur", voice: "shimmer" }],
      questions: [
        { id: "q1", stem: "Quelle est la destination du vol ?", options: [{ id: "a", text: "Paris" }, { id: "b", text: "Montréal" }, { id: "c", text: "Lyon" }], answer: "b" },
        { id: "q2", stem: "Qui peut embarquer en priorité ?", options: [{ id: "a", text: "Les passagers avec enfants" }, { id: "b", text: "Les hommes d'affaires" }, { id: "c", text: "Les personnes pressées" }], answer: "a" },
      ],
    },
  },
  {
    level: "B1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Chez le coiffeur",
    prompt: "Écoutez la conversation et répondez.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: {
      audioScript: "Coiffeur : Bonjour, qu'est-ce qu'on vous fait aujourd'hui ? Cliente : Juste une coupe, pas trop court. Coiffeur : On garde la longueur sur le devant ? Cliente : Oui, je veux juste rafraîchir un peu. Coiffeur : Très bien, installez-vous.",
      speakers: [{ role: "Coiffeur", voice: "onyx" }, { role: "Cliente", voice: "nova" }],
      questions: [
        { id: "q1", stem: "Que veut la cliente ?", options: [{ id: "a", text: "Une couleur" }, { id: "b", text: "Une coupe pas trop courte" }, { id: "c", text: "Une coiffure de mariage" }], answer: "b" },
        { id: "q2", stem: "Que veut-elle garder ?", options: [{ id: "a", text: "La longueur sur le devant" }, { id: "b", text: "Sa frange" }, { id: "c", text: "Ses cheveux longs derrière" }], answer: "a" },
      ],
    },
  },
  {
    level: "B1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Organiser un week-end",
    prompt: "Écoutez la conversation et répondez.",
    difficulty: "STRETCH", topicTag: "vie-quotidienne",
    payload: {
      audioScript: "Léa : On part toujours à la montagne ce week-end ? Tom : Oui, mais la météo annonce de la pluie samedi. Léa : Alors on pourrait partir seulement dimanche ? Tom : Bonne idée, on évite la pluie et c'est moins cher. Je réserve le refuge pour dimanche soir.",
      speakers: [{ role: "Léa", voice: "shimmer" }, { role: "Tom", voice: "echo" }],
      questions: [
        { id: "q1", stem: "Pourquoi changent-ils leurs plans ?", options: [{ id: "a", text: "À cause de la pluie samedi" }, { id: "b", text: "Parce que c'est trop loin" }, { id: "c", text: "Parce que Tom est malade" }], answer: "a" },
        { id: "q2", stem: "Quand vont-ils finalement partir ?", options: [{ id: "a", text: "Samedi" }, { id: "b", text: "Dimanche" }, { id: "c", text: "Vendredi" }], answer: "b" },
      ],
    },
  },

  // ---------- Expression écrite (Writing) — exam-specific ----------
  {
    level: "B1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF B1 — Essai : les réseaux sociaux",
    prompt: "Rédigez un texte construit et argumenté.",
    difficulty: "CORE", topicTag: "societe",
    payload: { situation: "Un magazine pour jeunes adultes prépare un dossier sur les réseaux sociaux.", instruction: "Rédigez un texte argumenté : les réseaux sociaux rapprochent-ils vraiment les gens ? Donnez votre opinion avec des exemples et des arguments.", wordMin: 160, wordMax: 180 },
  },
  {
    level: "B1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF — Réclamation à un hôtel",
    prompt: "Rédigez le message demandé.",
    difficulty: "CORE", topicTag: "voyages",
    payload: { situation: "Vous avez passé une nuit dans un hôtel et la chambre n'était pas conforme à la description (bruit, propreté).", instruction: "Écrivez à la direction de l'hôtel pour décrire les problèmes et demander un geste commercial.", wordMin: 80, wordMax: 120 },
  },
  {
    level: "B1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF — Demande d'information : une formation",
    prompt: "Rédigez le courriel demandé.",
    difficulty: "FOUNDATION", topicTag: "education",
    payload: { situation: "Vous avez vu une annonce pour une formation en informatique.", instruction: "Écrivez un courriel à l'organisme pour demander les dates, le prix et le niveau requis.", wordMin: 60, wordMax: 120 },
  },
  {
    level: "B1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF B1 — Proposer une sortie au club",
    prompt: "Rédigez un message construit.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { situation: "Vous faites partie d'un club de loisirs.", instruction: "Écrivez aux membres pour proposer une sortie : présentez votre idée, la date, le lieu, et invitez-les à participer.", wordMin: 160, wordMax: 180 },
  },
  {
    level: "B1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF — Répondre à une invitation",
    prompt: "Rédigez le message demandé.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { situation: "Un ami vous invite à son anniversaire samedi soir.", instruction: "Répondez-lui : acceptez ou refusez, expliquez pourquoi, et posez une question pratique (heure, cadeau, adresse).", wordMin: 80, wordMax: 120 },
  },
  {
    level: "B1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF — Organiser un pot de départ",
    prompt: "Rédigez le courriel demandé.",
    difficulty: "CORE", topicTag: "travail",
    payload: { situation: "Une collègue quitte l'entreprise.", instruction: "Écrivez un courriel aux collègues pour organiser un pot de départ : proposez une date, un lieu et demandez une participation.", wordMin: 60, wordMax: 120 },
  },
  {
    level: "B1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF B1 — Essai : seul ou en colocation",
    prompt: "Rédigez un texte construit et argumenté.",
    difficulty: "STRETCH", topicTag: "habitat",
    payload: { situation: "Le journal de votre université publie des témoignages d'étudiants.", instruction: "Rédigez un texte : vaut-il mieux vivre seul ou en colocation ? Présentez les avantages et les inconvénients, puis donnez votre avis.", wordMin: 160, wordMax: 180 },
  },
  {
    level: "B1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF — Signaler un problème au gardien",
    prompt: "Rédigez le message demandé.",
    difficulty: "CORE", topicTag: "habitat",
    payload: { situation: "L'ascenseur de votre immeuble est en panne depuis plusieurs jours.", instruction: "Écrivez un message au gardien pour signaler le problème, expliquer la gêne et demander une réparation rapide.", wordMin: 80, wordMax: 120 },
  },
  {
    level: "B1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF — Demander un congé",
    prompt: "Rédigez le courriel demandé.",
    difficulty: "CORE", topicTag: "travail",
    payload: { situation: "Vous souhaitez prendre une semaine de congé le mois prochain.", instruction: "Écrivez un courriel à votre responsable pour demander ce congé, indiquer les dates et proposer une organisation pour votre travail.", wordMin: 60, wordMax: 120 },
  },
  {
    level: "B1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF B1 — Lettre au journal : la lecture",
    prompt: "Rédigez une lettre construite et argumentée.",
    difficulty: "CORE", topicTag: "societe",
    payload: { situation: "Un journal demande aux lecteurs si la lecture a encore sa place aujourd'hui.", instruction: "Écrivez une lettre pour donner votre opinion : lit-on moins qu'avant ? Pourquoi ? Donnez des exemples.", wordMin: 160, wordMax: 180 },
  },
  {
    level: "B1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF — Recommander un restaurant",
    prompt: "Rédigez le message demandé.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { situation: "Un collègue cherche un bon restaurant pour un repas de famille.", instruction: "Écrivez-lui un message pour recommander un restaurant : décrivez-le (cuisine, ambiance, prix) et expliquez pourquoi vous le conseillez.", wordMin: 80, wordMax: 120 },
  },
  {
    level: "B1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF — Refuser poliment une proposition",
    prompt: "Rédigez le courriel demandé.",
    difficulty: "STRETCH", topicTag: "travail",
    payload: { situation: "On vous propose de participer à un projet supplémentaire, mais vous n'avez pas le temps.", instruction: "Écrivez un courriel pour refuser poliment, expliquer vos raisons et proposer une autre solution.", wordMin: 60, wordMax: 120 },
  },

  // ---------- Expression orale (Speaking) — exam-specific ----------
  {
    level: "B1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF B1 — Monologue : l'alimentation",
    prompt: "Parlez environ deux minutes, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Présentez vos habitudes alimentaires. Mangez-vous sainement ? Qu'est-ce qui a changé dans votre façon de manger ces dernières années ?", prepSeconds: 60, speakSeconds: 120 },
  },
  {
    level: "B1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF — Renseignements : salle de sport",
    prompt: "Jouez la situation à l'oral, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "vie-pratique",
    payload: { taskPrompt: "Vous voulez vous inscrire dans une salle de sport. Vous téléphonez pour obtenir des informations (horaires, tarifs, cours proposés, abonnement). Posez au moins quatre questions.", prepSeconds: 30, speakSeconds: 120 },
  },
  {
    level: "B1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF — Point de vue : la technologie",
    prompt: "Répondez à l'oral, puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { taskPrompt: "La technologie nous rend-elle la vie plus facile ou plus compliquée ? Donnez votre avis et justifiez-le avec des exemples concrets.", prepSeconds: 30, speakSeconds: 120 },
  },
  {
    level: "B1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF — Présentation : un projet personnel",
    prompt: "Répondez à l'oral, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Présentez-vous et parlez d'un projet qui vous tient à cœur pour les prochaines années. Expliquez pourquoi ce projet est important pour vous.", prepSeconds: 15, speakSeconds: 120 },
  },
  {
    level: "B1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF — Opinion : les écrans et les enfants",
    prompt: "Répondez à l'oral, puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { taskPrompt: "Selon vous, à partir de quel âge les enfants devraient-ils utiliser un téléphone ou une tablette ? Donnez votre opinion et vos arguments.", prepSeconds: 30, speakSeconds: 120 },
  },
  {
    level: "B1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF B1 — Monologue : une fête importante",
    prompt: "Parlez environ deux minutes, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "societe",
    payload: { taskPrompt: "Présentez une fête importante dans votre pays ou votre culture. Comment la célèbre-t-on ? Pourquoi est-elle importante pour vous ?", prepSeconds: 60, speakSeconds: 120 },
  },
  {
    level: "B1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF B1 — Interaction : un voisin bruyant",
    prompt: "Jouez le dialogue à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Votre voisin fait souvent du bruit tard le soir. Vous allez le voir pour en parler calmement et trouver une solution ensemble.", prepSeconds: 30, speakSeconds: 120 },
  },
  {
    level: "B1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF — Interaction : échanger un article",
    prompt: "Jouez la situation à l'oral, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "commerces",
    payload: { taskPrompt: "Vous avez acheté un vêtement qui ne vous va pas. Vous retournez au magasin pour l'échanger ou être remboursé. Expliquez la situation au vendeur et répondez à ses questions.", prepSeconds: 30, speakSeconds: 120 },
  },
  {
    level: "B1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF — Point de vue : étudier à l'étranger",
    prompt: "Répondez à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "education",
    payload: { taskPrompt: "Pensez-vous qu'il soit utile d'étudier à l'étranger ? Quels sont les avantages et les difficultés ? Donnez votre avis.", prepSeconds: 30, speakSeconds: 120 },
  },
  {
    level: "B1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF B1 — Monologue : la place du sport",
    prompt: "Parlez environ deux minutes, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Parlez de la place du sport dans votre vie. Quels sont, selon vous, les bienfaits du sport au quotidien ?", prepSeconds: 60, speakSeconds: 120 },
  },
  {
    level: "B1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF — Interaction : un déplacement professionnel",
    prompt: "Jouez la situation à l'oral, puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "travail",
    payload: { taskPrompt: "Vous devez organiser un déplacement professionnel avec un collègue. Téléphonez à une agence pour comparer les options de transport et d'hébergement, puis faites un choix.", prepSeconds: 30, speakSeconds: 120 },
  },
  {
    level: "B1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF — Opinion : la publicité",
    prompt: "Répondez à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "societe",
    payload: { taskPrompt: "La publicité influence-t-elle vraiment nos choix ? Donnez votre opinion et illustrez-la avec des exemples.", prepSeconds: 30, speakSeconds: 120 },
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
