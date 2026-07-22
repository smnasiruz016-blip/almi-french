// A2 wave — original French items at the elementary register (short everyday texts,
// present / passé composé / futur proche, basic connectors). Never translated from
// German, never copied from CCI Paris or France Éducation International.
// Reading/Listening are SHARED (examFamily null, reused across exams); Writing/Speaking
// carry an examFamily so the prompt can be exam-specific. ~16 items per skill.
//
// Run: npm run seed:a2   (needs DATABASE_URL set)

import { PrismaClient, Prisma } from "@prisma/client";
import { isDirectRun } from "./_entry";

const prisma = new PrismaClient();

export const ITEMS: Prisma.FrenchItemCreateManyInput[] = [
  // ---------- Compréhension écrite (Reading) — shared ----------
  {
    level: "A2", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "SMS d'une amie",
    prompt: "Lisez le message et répondez aux questions.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: {
      passages: [{ id: "p1", body: "Salut ! On se retrouve à 18 h devant le cinéma. J'ai déjà acheté les billets. N'oublie pas ton écharpe, il fait froid ce soir. Bisous, Sophie." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "À quelle heure est le rendez-vous ?", options: [{ id: "a", text: "16 h" }, { id: "b", text: "18 h" }, { id: "c", text: "20 h" }], answer: "b" },
        { id: "q2", kind: "mcq", stem: "Qu'a déjà fait Sophie ?", options: [{ id: "a", text: "Elle a acheté les billets" }, { id: "b", text: "Elle a réservé un taxi" }, { id: "c", text: "Elle a appelé le cinéma" }], answer: "a" },
      ],
    },
  },
  {
    level: "A2", skill: "COMPREHENSION_ECRITE", taskType: "VRAI_FAUX", examFamily: null,
    title: "Affiche : horaires de la boulangerie",
    prompt: "Lisez l'affiche et indiquez si chaque phrase est vraie ou fausse.",
    difficulty: "FOUNDATION", topicTag: "commerces",
    payload: {
      passages: [{ id: "p1", body: "Boulangerie Au Bon Pain. Ouvert du mardi au dimanche, de 7 h à 13 h et de 16 h à 19 h 30. Fermé le lundi. Pain frais toute la journée." }],
      questions: [
        { id: "q1", kind: "truefalse", stem: "La boulangerie est fermée le lundi.", answer: "true" },
        { id: "q2", kind: "truefalse", stem: "La boulangerie est ouverte à 14 h.", answer: "false" },
      ],
    },
  },
  {
    level: "A2", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Carte postale de vacances",
    prompt: "Lisez la carte postale et répondez.",
    difficulty: "CORE", topicTag: "voyages",
    payload: {
      passages: [{ id: "p1", body: "Chère Mamie, je suis à Nice depuis trois jours. Il fait très beau et la mer est bonne. Hier, j'ai visité un petit musée et j'ai mangé une glace au chocolat. Je rentre dimanche. Gros bisous, Léo." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Où est Léo ?", options: [{ id: "a", text: "À Paris" }, { id: "b", text: "À Nice" }, { id: "c", text: "À Lyon" }], answer: "b" },
        { id: "q2", kind: "mcq", stem: "Qu'a fait Léo hier ?", options: [{ id: "a", text: "Il a visité un musée" }, { id: "b", text: "Il a pris le train" }, { id: "c", text: "Il a joué au foot" }], answer: "a" },
      ],
    },
  },
  {
    level: "A2", skill: "COMPREHENSION_ECRITE", taskType: "VRAI_FAUX", examFamily: null,
    title: "Note sur le frigo",
    prompt: "Lisez la note et indiquez vrai ou faux.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: {
      passages: [{ id: "p1", body: "Je suis parti faire les courses. Il n'y a plus de lait ni de pain. Si tu as faim, il y a des pâtes dans le placard. Je rentre vers 17 h. Papa." }],
      questions: [
        { id: "q1", kind: "truefalse", stem: "Il reste du lait à la maison.", answer: "false" },
        { id: "q2", kind: "truefalse", stem: "Le père rentre vers 17 h.", answer: "true" },
      ],
    },
  },
  {
    level: "A2", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Petite annonce : vélo à vendre",
    prompt: "Lisez l'annonce et répondez.",
    difficulty: "CORE", topicTag: "vie-pratique",
    payload: {
      passages: [{ id: "p1", body: "À vendre : vélo de ville, bon état, couleur bleue. Prix : 90 euros. Idéal pour aller au travail. Téléphone : 06 12 34 56 78. Disponible le week-end." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Quelle est la couleur du vélo ?", options: [{ id: "a", text: "Rouge" }, { id: "b", text: "Bleue" }, { id: "c", text: "Verte" }], answer: "b" },
        { id: "q2", kind: "mcq", stem: "Combien coûte le vélo ?", options: [{ id: "a", text: "19 euros" }, { id: "b", text: "90 euros" }, { id: "c", text: "190 euros" }], answer: "b" },
      ],
    },
  },
  {
    level: "A2", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Menu du jour",
    prompt: "Lisez le menu et répondez.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: {
      passages: [{ id: "p1", heading: "Menu du jour — 13 €", body: "Entrée : salade verte ou soupe de légumes. Plat : poulet et riz ou poisson et pommes de terre. Dessert : tarte aux pommes ou yaourt. Café compris." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Combien coûte le menu ?", options: [{ id: "a", text: "13 €" }, { id: "b", text: "30 €" }, { id: "c", text: "3 €" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "Quel plat peut-on choisir ?", options: [{ id: "a", text: "Poulet et riz" }, { id: "b", text: "Pizza" }, { id: "c", text: "Pâtes" }], answer: "a" },
      ],
    },
  },
  {
    level: "A2", skill: "COMPREHENSION_ECRITE", taskType: "VRAI_FAUX", examFamily: null,
    title: "Mot du professeur",
    prompt: "Lisez le mot et indiquez vrai ou faux.",
    difficulty: "CORE", topicTag: "education",
    payload: {
      passages: [{ id: "p1", body: "Chers parents, la sortie au zoo aura lieu vendredi prochain. Le départ est à 8 h 30, le retour vers 16 h. Les enfants doivent apporter un pique-nique et de l'eau. Le bus est gratuit." }],
      questions: [
        { id: "q1", kind: "truefalse", stem: "La sortie est au musée.", answer: "false" },
        { id: "q2", kind: "truefalse", stem: "Les enfants doivent apporter un pique-nique.", answer: "true" },
      ],
    },
  },
  {
    level: "A2", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Programme du week-end",
    prompt: "Lisez le programme et répondez.",
    difficulty: "CORE", topicTag: "loisirs",
    payload: {
      passages: [{ id: "p1", body: "Samedi matin : marché sur la place. Samedi après-midi : match de football au stade. Dimanche : concert gratuit dans le parc à 15 h. En cas de pluie, le concert aura lieu à la salle des fêtes." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Quand a lieu le concert ?", options: [{ id: "a", text: "Samedi matin" }, { id: "b", text: "Dimanche à 15 h" }, { id: "c", text: "Vendredi soir" }], answer: "b" },
        { id: "q2", kind: "mcq", stem: "Où va le concert s'il pleut ?", options: [{ id: "a", text: "Au stade" }, { id: "b", text: "À la salle des fêtes" }, { id: "c", text: "Au marché" }], answer: "b" },
      ],
    },
  },
  {
    level: "A2", skill: "COMPREHENSION_ECRITE", taskType: "VRAI_FAUX", examFamily: null,
    title: "Règles de la bibliothèque",
    prompt: "Lisez les règles et indiquez vrai ou faux.",
    difficulty: "FOUNDATION", topicTag: "vie-publique",
    payload: {
      passages: [{ id: "p1", body: "Bibliothèque : on peut emprunter cinq livres pour trois semaines. Il faut parler doucement. Il est interdit de manger dans les salles. Le wifi est gratuit pour tous." }],
      questions: [
        { id: "q1", kind: "truefalse", stem: "On peut manger dans les salles.", answer: "false" },
        { id: "q2", kind: "truefalse", stem: "Le wifi est gratuit.", answer: "true" },
      ],
    },
  },
  {
    level: "A2", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Courriel : invitation à dîner",
    prompt: "Lisez le courriel et répondez.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: {
      passages: [{ id: "p1", heading: "Invitation", body: "Bonjour Marie, je t'invite à dîner samedi soir à 20 h chez moi. Je prépare un couscous. Tu peux venir avec ton frère. Réponds-moi avant jeudi, s'il te plaît. À bientôt, Nadia." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Que prépare Nadia ?", options: [{ id: "a", text: "Un couscous" }, { id: "b", text: "Une pizza" }, { id: "c", text: "Une soupe" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "Avant quand faut-il répondre ?", options: [{ id: "a", text: "Avant lundi" }, { id: "b", text: "Avant jeudi" }, { id: "c", text: "Avant samedi" }], answer: "b" },
      ],
    },
  },
  {
    level: "A2", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Panneau dans le train",
    prompt: "Lisez le panneau et répondez.",
    difficulty: "FOUNDATION", topicTag: "transports",
    payload: {
      passages: [{ id: "p1", body: "Voiture 12 : places réservées. Merci de garder votre billet pendant tout le voyage. Le wagon-bar se trouve à la voiture 8. Il est interdit de fumer dans le train." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Où se trouve le wagon-bar ?", options: [{ id: "a", text: "Voiture 8" }, { id: "b", text: "Voiture 12" }, { id: "c", text: "Voiture 2" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "Qu'est-ce qui est interdit ?", options: [{ id: "a", text: "Manger" }, { id: "b", text: "Fumer" }, { id: "c", text: "Téléphoner" }], answer: "b" },
      ],
    },
  },
  {
    level: "A2", skill: "COMPREHENSION_ECRITE", taskType: "VRAI_FAUX", examFamily: null,
    title: "Recette simple : la salade de fruits",
    prompt: "Lisez la recette et indiquez vrai ou faux.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: {
      passages: [{ id: "p1", body: "Salade de fruits : coupez une pomme, une banane et une orange. Ajoutez un peu de jus de citron et une cuillère de sucre. Mélangez bien. Mettez au frais une heure avant de servir." }],
      questions: [
        { id: "q1", kind: "truefalse", stem: "On ajoute du jus de citron.", answer: "true" },
        { id: "q2", kind: "truefalse", stem: "On sert la salade tout de suite.", answer: "false" },
      ],
    },
  },
  {
    level: "A2", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Annonce du supermarché",
    prompt: "Lisez l'annonce et répondez.",
    difficulty: "CORE", topicTag: "commerces",
    payload: {
      passages: [{ id: "p1", body: "Cette semaine, les oranges sont en promotion : 2 euros le kilo. Le rayon poissonnerie est fermé le mardi. Le magasin ouvre à 9 h et ferme à 20 h, du lundi au samedi." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Combien coûte un kilo d'oranges ?", options: [{ id: "a", text: "2 euros" }, { id: "b", text: "9 euros" }, { id: "c", text: "20 euros" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "Quel jour la poissonnerie est-elle fermée ?", options: [{ id: "a", text: "Le lundi" }, { id: "b", text: "Le mardi" }, { id: "c", text: "Le samedi" }], answer: "b" },
      ],
    },
  },
  {
    level: "A2", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Message au travail",
    prompt: "Lisez le message et répondez.",
    difficulty: "CORE", topicTag: "travail",
    payload: {
      passages: [{ id: "p1", body: "Bonjour à tous, la réunion de lundi est reportée à mardi à 10 h, salle 3. Merci d'apporter le rapport du mois. Le café sera offert. Bonne journée, le directeur." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Quand a lieu la réunion maintenant ?", options: [{ id: "a", text: "Lundi à 10 h" }, { id: "b", text: "Mardi à 10 h" }, { id: "c", text: "Mardi à 15 h" }], answer: "b" },
        { id: "q2", kind: "mcq", stem: "Que faut-il apporter ?", options: [{ id: "a", text: "Le rapport du mois" }, { id: "b", text: "Un ordinateur" }, { id: "c", text: "Le café" }], answer: "a" },
      ],
    },
  },
  {
    level: "A2", skill: "COMPREHENSION_ECRITE", taskType: "VRAI_FAUX", examFamily: null,
    title: "Plan : aller à la poste",
    prompt: "Lisez les indications et indiquez vrai ou faux.",
    difficulty: "CORE", topicTag: "vie-pratique",
    payload: {
      passages: [{ id: "p1", body: "Pour aller à la poste : sortez de la gare, tournez à droite. Continuez tout droit jusqu'au feu rouge. La poste est à gauche, à côté de la pharmacie. C'est à cinq minutes à pied." }],
      questions: [
        { id: "q1", kind: "truefalse", stem: "La poste est à côté de la pharmacie.", answer: "true" },
        { id: "q2", kind: "truefalse", stem: "Il faut une heure pour y aller.", answer: "false" },
      ],
    },
  },
  {
    level: "A2", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Blog : ma nouvelle ville",
    prompt: "Lisez le texte et répondez.",
    difficulty: "STRETCH", topicTag: "vie-quotidienne",
    payload: {
      passages: [{ id: "p1", body: "Depuis le mois dernier, j'habite à Rennes. Au début, je ne connaissais personne, mais maintenant j'ai des amis au cours de danse. La ville est agréable et il y a beaucoup de parcs. Le seul problème, c'est qu'il pleut souvent !" }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Où l'auteur a-t-il rencontré des amis ?", options: [{ id: "a", text: "Au cours de danse" }, { id: "b", text: "Au travail" }, { id: "c", text: "Au parc" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "Quel est le seul problème ?", options: [{ id: "a", text: "Il pleut souvent" }, { id: "b", text: "La ville est chère" }, { id: "c", text: "Il n'y a pas de parcs" }], answer: "a" },
      ],
    },
  },

  // ---------- Compréhension de l'oral (Listening) — shared ----------
  {
    level: "A2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Message sur le répondeur",
    prompt: "Écoutez le message et répondez aux questions.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: {
      audioScript: "Bonjour, c'est Camille. Je t'appelle pour samedi. On se retrouve à la maison à midi pour déjeuner. Apporte un dessert si tu veux. À samedi, bisous !",
      speakers: [{ role: "Camille", voice: "nova" }],
      questions: [
        { id: "q1", stem: "Quel jour est le rendez-vous ?", options: [{ id: "a", text: "Vendredi" }, { id: "b", text: "Samedi" }, { id: "c", text: "Dimanche" }], answer: "b" },
        { id: "q2", stem: "Que peut apporter la personne ?", options: [{ id: "a", text: "Un dessert" }, { id: "b", text: "Du pain" }, { id: "c", text: "Une boisson" }], answer: "a" },
      ],
    },
  },
  {
    level: "A2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Au marché",
    prompt: "Écoutez la conversation et répondez.",
    difficulty: "FOUNDATION", topicTag: "commerces",
    payload: {
      audioScript: "Cliente : Bonjour, je voudrais un kilo de tomates, s'il vous plaît. Vendeur : Voilà. Et avec ça ? Cliente : Une salade aussi. Ça fait combien ? Vendeur : Trois euros cinquante. Cliente : Merci, voilà.",
      speakers: [{ role: "Cliente", voice: "shimmer" }, { role: "Vendeur", voice: "onyx" }],
      questions: [
        { id: "q1", stem: "Qu'achète la cliente ?", options: [{ id: "a", text: "Des tomates et une salade" }, { id: "b", text: "Des pommes" }, { id: "c", text: "Du pain" }], answer: "a" },
        { id: "q2", stem: "Combien paie-t-elle ?", options: [{ id: "a", text: "3,50 €" }, { id: "b", text: "13 €" }, { id: "c", text: "5,30 €" }], answer: "a" },
      ],
    },
  },
  {
    level: "A2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Annonce dans le métro",
    prompt: "Écoutez l'annonce et répondez.",
    difficulty: "CORE", topicTag: "transports",
    payload: {
      audioScript: "Attention, la station Bastille est fermée aujourd'hui pour travaux. Pour continuer votre voyage, descendez à la station suivante et prenez le bus numéro 29. Merci de votre compréhension.",
      speakers: [{ role: "Annonceur", voice: "echo" }],
      questions: [
        { id: "q1", stem: "Pourquoi la station est-elle fermée ?", options: [{ id: "a", text: "Pour travaux" }, { id: "b", text: "Pour une fête" }, { id: "c", text: "À cause de la pluie" }], answer: "a" },
        { id: "q2", stem: "Quel bus faut-il prendre ?", options: [{ id: "a", text: "Le bus 9" }, { id: "b", text: "Le bus 29" }, { id: "c", text: "Le bus 92" }], answer: "b" },
      ],
    },
  },
  {
    level: "A2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Chez le médecin",
    prompt: "Écoutez la conversation et répondez.",
    difficulty: "CORE", topicTag: "vie-pratique",
    payload: {
      audioScript: "Médecin : Bonjour, qu'est-ce qui ne va pas ? Patient : J'ai mal à la tête depuis hier et je suis fatigué. Médecin : Vous avez de la fièvre ? Patient : Un peu. Médecin : Reposez-vous deux jours et buvez beaucoup d'eau.",
      speakers: [{ role: "Médecin", voice: "onyx" }, { role: "Patient", voice: "fable" }],
      questions: [
        { id: "q1", stem: "Quel est le problème du patient ?", options: [{ id: "a", text: "Il a mal à la tête" }, { id: "b", text: "Il a mal au pied" }, { id: "c", text: "Il a mal aux dents" }], answer: "a" },
        { id: "q2", stem: "Que conseille le médecin ?", options: [{ id: "a", text: "Se reposer et boire de l'eau" }, { id: "b", text: "Faire du sport" }, { id: "c", text: "Manger plus" }], answer: "a" },
      ],
    },
  },
  {
    level: "A2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Invitation au téléphone",
    prompt: "Écoutez la conversation et répondez.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: {
      audioScript: "Paul : Allô, Julie ? Tu veux venir au cinéma ce soir ? Julie : Ce soir, je ne peux pas, je travaille. Et demain ? Paul : Demain, d'accord. Il y a une séance à 19 h. Julie : Parfait, à demain !",
      speakers: [{ role: "Paul", voice: "echo" }, { role: "Julie", voice: "nova" }],
      questions: [
        { id: "q1", stem: "Pourquoi Julie ne peut-elle pas venir ce soir ?", options: [{ id: "a", text: "Elle travaille" }, { id: "b", text: "Elle est malade" }, { id: "c", text: "Elle est fatiguée" }], answer: "a" },
        { id: "q2", stem: "Quand vont-ils au cinéma ?", options: [{ id: "a", text: "Ce soir" }, { id: "b", text: "Demain à 19 h" }, { id: "c", text: "Samedi" }], answer: "b" },
      ],
    },
  },
  {
    level: "A2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "À l'hôtel",
    prompt: "Écoutez la conversation et répondez.",
    difficulty: "CORE", topicTag: "voyages",
    payload: {
      audioScript: "Réceptionniste : Bonjour, vous avez une réservation ? Client : Oui, au nom de Bernard, pour deux nuits. Réceptionniste : Très bien, chambre 24, au deuxième étage. Le petit-déjeuner est servi de 7 h à 10 h. Client : Merci beaucoup.",
      speakers: [{ role: "Réceptionniste", voice: "shimmer" }, { role: "Client", voice: "onyx" }],
      questions: [
        { id: "q1", stem: "Pour combien de nuits est la réservation ?", options: [{ id: "a", text: "Une nuit" }, { id: "b", text: "Deux nuits" }, { id: "c", text: "Trois nuits" }], answer: "b" },
        { id: "q2", stem: "Jusqu'à quelle heure le petit-déjeuner est-il servi ?", options: [{ id: "a", text: "9 h" }, { id: "b", text: "10 h" }, { id: "c", text: "11 h" }], answer: "b" },
      ],
    },
  },
  {
    level: "A2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "La météo du week-end",
    prompt: "Écoutez le bulletin et répondez.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: {
      audioScript: "Voici la météo du week-end. Samedi, il fera beau et chaud, avec vingt-cinq degrés. Dimanche, attention, des orages sont prévus l'après-midi. Pensez à prendre un parapluie si vous sortez dimanche.",
      speakers: [{ role: "Présentatrice", voice: "nova" }],
      questions: [
        { id: "q1", stem: "Quel temps fera-t-il samedi ?", options: [{ id: "a", text: "Beau et chaud" }, { id: "b", text: "Froid" }, { id: "c", text: "Pluvieux" }], answer: "a" },
        { id: "q2", stem: "Que faut-il prendre dimanche ?", options: [{ id: "a", text: "Un parapluie" }, { id: "b", text: "Des lunettes de soleil" }, { id: "c", text: "Un manteau chaud" }], answer: "a" },
      ],
    },
  },
  {
    level: "A2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Demander son chemin",
    prompt: "Écoutez la conversation et répondez.",
    difficulty: "CORE", topicTag: "vie-pratique",
    payload: {
      audioScript: "Touriste : Excusez-moi, où est la gare, s'il vous plaît ? Passant : Continuez tout droit, puis tournez à gauche après la banque. C'est à dix minutes à pied. Touriste : Merci beaucoup ! Passant : Je vous en prie.",
      speakers: [{ role: "Touriste", voice: "fable" }, { role: "Passant", voice: "echo" }],
      questions: [
        { id: "q1", stem: "Où faut-il tourner à gauche ?", options: [{ id: "a", text: "Après la banque" }, { id: "b", text: "Après l'église" }, { id: "c", text: "Après le parc" }], answer: "a" },
        { id: "q2", stem: "Combien de temps faut-il à pied ?", options: [{ id: "a", text: "Dix minutes" }, { id: "b", text: "Une heure" }, { id: "c", text: "Deux minutes" }], answer: "a" },
      ],
    },
  },
  {
    level: "A2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Au restaurant : commander",
    prompt: "Écoutez la scène et répondez.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: {
      audioScript: "Serveur : Vous avez choisi ? Cliente : Oui, je prends le poulet avec des frites. Serveur : Et comme boisson ? Cliente : Une eau gazeuse, s'il vous plaît. Serveur : Très bien, je vous apporte ça.",
      speakers: [{ role: "Serveur", voice: "onyx" }, { role: "Cliente", voice: "shimmer" }],
      questions: [
        { id: "q1", stem: "Que commande la cliente comme plat ?", options: [{ id: "a", text: "Du poulet avec des frites" }, { id: "b", text: "Du poisson" }, { id: "c", text: "Une salade" }], answer: "a" },
        { id: "q2", stem: "Quelle boisson choisit-elle ?", options: [{ id: "a", text: "Une eau gazeuse" }, { id: "b", text: "Un café" }, { id: "c", text: "Un jus d'orange" }], answer: "a" },
      ],
    },
  },
  {
    level: "A2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Message d'un collègue",
    prompt: "Écoutez le message et répondez.",
    difficulty: "CORE", topicTag: "travail",
    payload: {
      audioScript: "Salut, c'est Thomas. Je suis un peu en retard ce matin, j'ai raté le bus. Je serai au bureau vers neuf heures et demie. Si le client appelle, dis-lui que je le rappelle tout de suite après. Merci !",
      speakers: [{ role: "Thomas", voice: "echo" }],
      questions: [
        { id: "q1", stem: "Pourquoi Thomas est-il en retard ?", options: [{ id: "a", text: "Il a raté le bus" }, { id: "b", text: "Il est malade" }, { id: "c", text: "Il a trop dormi" }], answer: "a" },
        { id: "q2", stem: "Que doit-on dire au client ?", options: [{ id: "a", text: "Que Thomas le rappelle" }, { id: "b", text: "Que le bureau est fermé" }, { id: "c", text: "De rappeler demain" }], answer: "a" },
      ],
    },
  },
  {
    level: "A2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Réserver une place de cinéma",
    prompt: "Écoutez la conversation et répondez.",
    difficulty: "CORE", topicTag: "loisirs",
    payload: {
      audioScript: "Employé : Cinéma Rex, bonjour. Cliente : Bonjour, je voudrais deux places pour le film de 21 h. Employé : Il reste des places. Ça fait seize euros. Cliente : Très bien. Employé : Venez dix minutes avant, s'il vous plaît.",
      speakers: [{ role: "Employé", voice: "onyx" }, { role: "Cliente", voice: "nova" }],
      questions: [
        { id: "q1", stem: "Combien de places veut la cliente ?", options: [{ id: "a", text: "Une" }, { id: "b", text: "Deux" }, { id: "c", text: "Trois" }], answer: "b" },
        { id: "q2", stem: "Combien coûtent les places ?", options: [{ id: "a", text: "6 euros" }, { id: "b", text: "16 euros" }, { id: "c", text: "60 euros" }], answer: "b" },
      ],
    },
  },
  {
    level: "A2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Au guichet de la gare",
    prompt: "Écoutez la conversation et répondez.",
    difficulty: "STRETCH", topicTag: "transports",
    payload: {
      audioScript: "Voyageur : Bonjour, un billet pour Bordeaux, s'il vous plaît. Employée : Aller simple ou aller-retour ? Voyageur : Aller-retour. Employée : Le prochain train part à quatorze heures, voie 5. Ça fait quarante euros. Voyageur : Parfait, merci.",
      speakers: [{ role: "Voyageur", voice: "fable" }, { role: "Employée", voice: "shimmer" }],
      questions: [
        { id: "q1", stem: "Quel type de billet le voyageur achète-t-il ?", options: [{ id: "a", text: "Aller simple" }, { id: "b", text: "Aller-retour" }, { id: "c", text: "Un abonnement" }], answer: "b" },
        { id: "q2", stem: "À quelle heure part le train ?", options: [{ id: "a", text: "14 h" }, { id: "b", text: "4 h" }, { id: "c", text: "12 h" }], answer: "a" },
      ],
    },
  },
  {
    level: "A2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Inviter un ami à faire du sport",
    prompt: "Écoutez la conversation et répondez.",
    difficulty: "FOUNDATION", topicTag: "loisirs",
    payload: {
      audioScript: "Léa : Tu veux courir avec moi demain matin ? Marc : Oui, à quelle heure ? Léa : Sept heures, dans le parc. Marc : Sept heures, c'est tôt ! D'accord, mais juste trente minutes. Léa : Parfait, à demain !",
      speakers: [{ role: "Léa", voice: "nova" }, { role: "Marc", voice: "echo" }],
      questions: [
        { id: "q1", stem: "Que vont-ils faire demain ?", options: [{ id: "a", text: "Courir dans le parc" }, { id: "b", text: "Nager" }, { id: "c", text: "Jouer au tennis" }], answer: "a" },
        { id: "q2", stem: "Combien de temps Marc veut-il courir ?", options: [{ id: "a", text: "Trente minutes" }, { id: "b", text: "Une heure" }, { id: "c", text: "Sept minutes" }], answer: "a" },
      ],
    },
  },
  {
    level: "A2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "À la banque",
    prompt: "Écoutez la conversation et répondez.",
    difficulty: "STRETCH", topicTag: "vie-pratique",
    payload: {
      audioScript: "Employé : Bonjour, que puis-je faire pour vous ? Cliente : Je voudrais ouvrir un compte, s'il vous plaît. Employé : Bien sûr. Vous avez une pièce d'identité et un justificatif de domicile ? Cliente : Oui, voilà. Employé : Parfait, ça prend dix minutes.",
      speakers: [{ role: "Employé", voice: "onyx" }, { role: "Cliente", voice: "shimmer" }],
      questions: [
        { id: "q1", stem: "Que veut faire la cliente ?", options: [{ id: "a", text: "Ouvrir un compte" }, { id: "b", text: "Retirer de l'argent" }, { id: "c", text: "Fermer son compte" }], answer: "a" },
        { id: "q2", stem: "Que doit-elle présenter ?", options: [{ id: "a", text: "Une pièce d'identité et un justificatif" }, { id: "b", text: "Une photo" }, { id: "c", text: "Un billet de train" }], answer: "a" },
      ],
    },
  },
  {
    level: "A2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Au téléphone : un rendez-vous chez le coiffeur",
    prompt: "Écoutez la conversation et répondez.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: {
      audioScript: "Coiffeur : Salon Belle Coupe, bonjour. Client : Bonjour, je voudrais un rendez-vous cette semaine. Coiffeur : Jeudi à quinze heures, ça vous va ? Client : Plutôt le matin, si possible. Coiffeur : Alors jeudi à dix heures. Client : Très bien, merci.",
      speakers: [{ role: "Coiffeur", voice: "echo" }, { role: "Client", voice: "fable" }],
      questions: [
        { id: "q1", stem: "Quand le client préfère-t-il venir ?", options: [{ id: "a", text: "Le matin" }, { id: "b", text: "L'après-midi" }, { id: "c", text: "Le soir" }], answer: "a" },
        { id: "q2", stem: "Quel rendez-vous est fixé ?", options: [{ id: "a", text: "Jeudi à 10 h" }, { id: "b", text: "Jeudi à 15 h" }, { id: "c", text: "Vendredi à 10 h" }], answer: "a" },
      ],
    },
  },
  {
    level: "A2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Annonce à la piscine",
    prompt: "Écoutez l'annonce et répondez.",
    difficulty: "FOUNDATION", topicTag: "loisirs",
    payload: {
      audioScript: "Mesdames et messieurs, la piscine va fermer dans quinze minutes. Merci de sortir de l'eau et de libérer les cabines. La piscine rouvre demain à neuf heures. Bonne soirée à tous.",
      speakers: [{ role: "Annonceur", voice: "onyx" }],
      questions: [
        { id: "q1", stem: "Dans combien de temps la piscine ferme-t-elle ?", options: [{ id: "a", text: "Quinze minutes" }, { id: "b", text: "Une heure" }, { id: "c", text: "Cinq minutes" }], answer: "a" },
        { id: "q2", stem: "À quelle heure rouvre-t-elle demain ?", options: [{ id: "a", text: "9 h" }, { id: "b", text: "10 h" }, { id: "c", text: "8 h" }], answer: "a" },
      ],
    },
  },

  // ---------- Expression écrite (Writing) — exam-specific ----------
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF A2 — Carte postale de vacances",
    prompt: "Rédigez une courte carte postale.",
    difficulty: "FOUNDATION", topicTag: "voyages",
    payload: { situation: "Vous êtes en vacances dans une ville que vous aimez.", instruction: "Écrivez une carte postale à un ami. Dites où vous êtes, quel temps il fait et ce que vous avez fait hier.", wordMin: 40, wordMax: 60 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section A — Message : annuler et réorganiser une rencontre",
    prompt: "Rédigez le message demandé (Section A).",
    difficulty: "FOUNDATION", topicTag: "vie-pratique",
    payload: { situation: "Vous deviez voir un ami demain, mais une obligation familiale vous en empêche.", instruction: "Écrivez-lui. Annoncez l'annulation, expliquez la raison, excusez-vous, proposez deux nouvelles dates, indiquez un lieu qui vous arrange tous les deux, et demandez confirmation.", wordMin: 80, wordMax: 120 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF — Courriel : remercier pour un cadeau",
    prompt: "Rédigez le courriel demandé.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { situation: "Une amie vous a offert un cadeau pour votre anniversaire.", instruction: "Écrivez-lui un courriel pour la remercier, dire si vous aimez le cadeau et proposer de vous voir bientôt.", wordMin: 60, wordMax: 120 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF A2 — Message : inviter un ami",
    prompt: "Rédigez un court message.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { situation: "Vous voulez inviter un ami à dîner chez vous samedi.", instruction: "Écrivez un message pour l'inviter. Indiquez le jour, l'heure et ce que vous allez préparer.", wordMin: 40, wordMax: 60 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section A — Courriel : réserver et préciser une demande",
    prompt: "Rédigez le message demandé (Section A).",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { situation: "Vous réservez un restaurant vendredi soir pour fêter un départ.", instruction: "Écrivez au restaurant. Donnez la date, l'heure et le nombre de convives, demandez une table au calme, signalez deux régimes particuliers, demandez s'il est possible d'apporter un gâteau, et sollicitez une confirmation écrite.", wordMin: 80, wordMax: 120 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF — Note : laisser un mot à un voisin",
    prompt: "Rédigez la note demandée.",
    difficulty: "FOUNDATION", topicTag: "habitat",
    payload: { situation: "Vous partez en voyage une semaine et vous demandez à un voisin d'arroser vos plantes.", instruction: "Écrivez une note au voisin. Expliquez ce que vous demandez, pour combien de temps, et remerciez-le.", wordMin: 60, wordMax: 120 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF A2 — Raconter une journée",
    prompt: "Rédigez un court texte au passé.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { situation: "Vous avez passé une bonne journée le week-end dernier.", instruction: "Écrivez un texte pour raconter cette journée : ce que vous avez fait, où vous êtes allé et avec qui.", wordMin: 60, wordMax: 80 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section A — Courriel : se renseigner sur un cours de cuisine",
    prompt: "Rédigez le message demandé (Section A).",
    difficulty: "CORE", topicTag: "education",
    payload: { situation: "Vous envisagez de vous inscrire à un cours de cuisine du soir.", instruction: "Écrivez à l'école. Présentez-vous, demandez les jours et horaires, le prix et ce qui est compris, le nombre de participants, si le matériel est fourni, et s'il est possible d'assister à une séance d'essai.", wordMin: 80, wordMax: 120 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF — Courriel : s'excuser auprès d'un collègue",
    prompt: "Rédigez le courriel demandé.",
    difficulty: "CORE", topicTag: "travail",
    payload: { situation: "Vous n'avez pas pu venir à une réunion importante au travail.", instruction: "Écrivez un courriel à un collègue pour vous excuser, expliquer pourquoi et demander ce qui a été décidé.", wordMin: 60, wordMax: 120 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF A2 — Décrire sa ville",
    prompt: "Rédigez un court texte.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { situation: "Un ami étranger veut connaître votre ville.", instruction: "Écrivez un texte pour décrire votre ville : ce qu'on peut y voir, y faire, et ce que vous aimez.", wordMin: 60, wordMax: 80 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section A — Courriel : modifier une commande en cours",
    prompt: "Rédigez le message demandé (Section A).",
    difficulty: "STRETCH", topicTag: "commerces",
    payload: { situation: "Vous avez commandé une veste en ligne et vous souhaitez changer la couleur avant l'expédition.", instruction: "Écrivez au service client. Rappelez la référence et la date de commande, expliquez le changement souhaité, demandez si cela modifie le prix ou le délai, demandez confirmation avant expédition, et indiquez comment vous joindre.", wordMin: 80, wordMax: 120 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF — Message : proposer une sortie",
    prompt: "Rédigez le message demandé.",
    difficulty: "CORE", topicTag: "loisirs",
    payload: { situation: "Vous voulez aller au musée dimanche avec un ami.", instruction: "Écrivez un message pour proposer cette sortie. Donnez le jour, l'heure du rendez-vous et le lieu.", wordMin: 60, wordMax: 120 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF A2 — Parler de ses projets",
    prompt: "Rédigez un court texte sur vos projets.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { situation: "Un ami vous demande ce que vous allez faire pendant les prochaines vacances.", instruction: "Écrivez un texte pour parler de vos projets : où vous allez aller, avec qui et ce que vous allez faire.", wordMin: 60, wordMax: 80 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section A — Message : féliciter et proposer de se revoir",
    prompt: "Rédigez le message demandé (Section A).",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { situation: "Un ami vient d'être recruté dans une entreprise où il souhaitait travailler.", instruction: "Écrivez-lui. Félicitez-le, posez-lui des questions précises sur le poste et sur son début, dites ce que vous savez de cette entreprise, proposez de fêter cela et suggérez deux moments possibles.", wordMin: 80, wordMax: 120 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF — Courriel : signaler un objet perdu",
    prompt: "Rédigez le courriel demandé.",
    difficulty: "STRETCH", topicTag: "vie-pratique",
    payload: { situation: "Vous avez oublié votre sac dans un train.", instruction: "Écrivez un courriel au service des objets trouvés. Décrivez le sac, dites dans quel train vous étiez et demandez ce qu'il faut faire.", wordMin: 60, wordMax: 120 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF A2 — Donner son avis sur un film",
    prompt: "Rédigez un court texte.",
    difficulty: "CORE", topicTag: "loisirs",
    payload: { situation: "Vous avez vu un film récemment.", instruction: "Écrivez un texte pour un forum : présentez le film, dites si vous l'avez aimé et pourquoi.", wordMin: 60, wordMax: 80 },
  },

  // ---------- Expression orale (Speaking) — exam-specific ----------
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF A2 — Se présenter",
    prompt: "Parlez environ une minute, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Présentez-vous : votre nom, votre âge, où vous habitez, votre travail ou vos études, et ce que vous aimez faire le week-end.", prepSeconds: 10, speakSeconds: 90 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section A — Se renseigner : organiser un voyage en train",
    prompt: "Posez le maximum de questions utiles (Section A), puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "transports",
    payload: { taskPrompt: "Vous préparez un voyage vers une autre ville avec un bagage encombrant. Au guichet, posez le maximum de questions : les horaires et la durée, le prix selon la période, les réductions possibles, les règles concernant les bagages, l'échange ou le remboursement du billet, et ce qui est prévu en cas de correspondance manquée.", prepSeconds: 60, speakSeconds: 300 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 1 — Entretien guidé : votre famille",
    prompt: "Répondez à l'oral, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Parlez de votre famille. Combien de personnes y a-t-il ? Que font-elles ? Avec qui vous entendez-vous le mieux ?", prepSeconds: 0, speakSeconds: 120 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF A2 — Monologue : mes loisirs",
    prompt: "Parlez environ une minute et demie, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "loisirs",
    payload: { taskPrompt: "Parlez de vos loisirs préférés. Que faites-vous pendant votre temps libre ? Quand et avec qui ? Pourquoi aimez-vous ces activités ?", prepSeconds: 10, speakSeconds: 90 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section A — Se renseigner : avant d'acheter un vêtement",
    prompt: "Posez le maximum de questions utiles (Section A), puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "commerces",
    payload: { taskPrompt: "Vous cherchez un pull pour l'hiver mais vous hésitez. Posez au vendeur le maximum de questions : les tailles et les coupes disponibles, la composition et l'entretien, la différence de prix entre deux modèles, les promotions à venir, les conditions d'échange, et la possibilité de commander une autre couleur.", prepSeconds: 60, speakSeconds: 300 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 1 — Entretien guidé : une journée typique",
    prompt: "Répondez à l'oral, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Décrivez une journée typique de la semaine : à quelle heure vous vous levez, ce que vous faites le matin, l'après-midi et le soir.", prepSeconds: 0, speakSeconds: 120 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF A2 — Interaction : inviter un ami",
    prompt: "Jouez le dialogue à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Vous voulez inviter un ami à voir un match de football. Proposez le jour et l'heure, répondez à ses questions et trouvez un lieu de rendez-vous.", prepSeconds: 15, speakSeconds: 90 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section A — Se renseigner : réserver un séjour à l'hôtel",
    prompt: "Posez le maximum de questions utiles (Section A), puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "voyages",
    payload: { taskPrompt: "Vous appelez un hôtel pour deux nuits avec un enfant. Posez le maximum de questions : les chambres disponibles et leur prix, ce que comprend le petit-déjeuner, le lit d'appoint, le stationnement, les horaires d'arrivée et de départ, et les conditions d'annulation.", prepSeconds: 60, speakSeconds: 300 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 1 — Entretien guidé : travail ou études",
    prompt: "Répondez à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "travail",
    payload: { taskPrompt: "Parlez de votre travail ou de vos études. Qu'est-ce que vous faites ? Qu'est-ce que vous aimez et qu'est-ce qui est difficile ?", prepSeconds: 0, speakSeconds: 120 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF A2 — Monologue : mon plat préféré",
    prompt: "Parlez environ une minute et demie, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Parlez de votre plat préféré. Qu'est-ce que c'est ? Quand le mangez-vous ? Savez-vous le cuisiner ?", prepSeconds: 10, speakSeconds: 90 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section A — Se renseigner : un traitement et son suivi",
    prompt: "Posez le maximum de questions utiles (Section A), puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "vie-pratique",
    payload: { taskPrompt: "Le médecin vous prescrit un traitement pour plusieurs semaines. Posez le maximum de questions : la façon de le prendre, la durée, les effets indésirables possibles, ce qu'il faut faire en cas d'oubli, les activités à éviter, et la nécessité d'une visite de contrôle.", prepSeconds: 60, speakSeconds: 300 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 1 — Entretien guidé : vos dernières vacances",
    prompt: "Répondez à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "voyages",
    payload: { taskPrompt: "Parlez de vos dernières vacances. Où êtes-vous allé ? Avec qui ? Qu'est-ce que vous avez fait et avez-vous aimé ?", prepSeconds: 0, speakSeconds: 120 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF A2 — Interaction : au restaurant",
    prompt: "Jouez le dialogue à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Vous êtes au restaurant avec un ami. Commandez un plat et une boisson, posez des questions au serveur sur le menu et demandez l'addition.", prepSeconds: 15, speakSeconds: 90 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section A — Se renseigner : s'orienter dans une ville inconnue",
    prompt: "Posez le maximum de questions utiles (Section A), puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "vie-pratique",
    payload: { taskPrompt: "Vous arrivez dans une ville que vous ne connaissez pas et devez rejoindre un rendez-vous. À l'office de tourisme, posez le maximum de questions : l'itinéraire à pied et en transport, la durée de chaque option, où acheter un titre de transport, les repères sur le trajet, et une solution de secours en cas de retard.", prepSeconds: 60, speakSeconds: 300 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 1 — Entretien guidé : votre logement",
    prompt: "Répondez à l'oral, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "habitat",
    payload: { taskPrompt: "Décrivez votre logement. Combien de pièces y a-t-il ? Comment est-il ? Qu'est-ce que vous aimez ou n'aimez pas chez vous ?", prepSeconds: 0, speakSeconds: 120 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF A2 — Monologue : un ami important",
    prompt: "Parlez environ une minute et demie, puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Parlez d'un ami important pour vous. Comment l'avez-vous rencontré ? Comment est-il ? Pourquoi est-il important pour vous ?", prepSeconds: 10, speakSeconds: 90 },
  },

  // ---------- DELF A2 top-up (Rule #7: 6 -> 15 per expression module) ----------
  // Structure per src/lib/french/delf-structure.ts, verified against France
  // Éducation International 2026-07-15: production écrite = "two productions of
  // about 60 words each"; production orale = 3 parts, 6–8 min.
  // A2 register: past and near-future, simple connectors, concrete everyday topics.
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF A2 — Message : un colis abîmé",
    prompt: "Écrivez un message pour expliquer un problème.",
    difficulty: "CORE", topicTag: "vie-pratique",
    payload: { situation: "Vous avez reçu un colis, mais l'objet à l'intérieur est cassé.", instruction: "Écrivez au magasin. Expliquez ce que vous avez commandé, ce qui est arrivé, et ce que vous demandez (échange ou remboursement).", wordMin: 60, wordMax: 80 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF A2 — Raconter un week-end à la campagne",
    prompt: "Racontez au passé, avec des détails simples.",
    difficulty: "CORE", topicTag: "loisirs",
    payload: { situation: "Vous avez passé le week-end dernier chez des amis à la campagne.", instruction: "Écrivez à un ami. Racontez où vous êtes allé, ce que vous avez fait, le temps qu'il faisait, et ce que vous avez préféré.", wordMin: 60, wordMax: 80 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF A2 — Courriel : changer un rendez-vous",
    prompt: "Écrivez un courriel poli et clair.",
    difficulty: "FOUNDATION", topicTag: "vie-pratique",
    payload: { situation: "Vous avez un rendez-vous jeudi mais vous devez travailler ce jour-là.", instruction: "Écrivez un courriel. Dites pourquoi vous ne pouvez pas venir, proposez deux autres jours, et excusez-vous.", wordMin: 40, wordMax: 60 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF A2 — Donner son avis sur un restaurant",
    prompt: "Donnez votre opinion avec des raisons simples.",
    difficulty: "CORE", topicTag: "loisirs",
    payload: { situation: "Vous avez mangé dans un nouveau restaurant de votre quartier.", instruction: "Écrivez un petit avis pour un site internet. Dites ce que vous avez mangé, si c'était bon, si le prix est correct, et si vous conseillez ce restaurant.", wordMin: 60, wordMax: 80 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF A2 — Message : proposer de garder un chat",
    prompt: "Écrivez un message pour proposer votre aide.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { situation: "Votre voisine part en vacances et cherche quelqu'un pour son chat.", instruction: "Écrivez-lui un message. Proposez votre aide, dites pourquoi vous pouvez le faire, et demandez ce qu'il faut donner au chat.", wordMin: 40, wordMax: 60 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF A2 — Raconter un premier jour de travail",
    prompt: "Racontez une expérience au passé.",
    difficulty: "CORE", topicTag: "travail",
    payload: { situation: "Vous avez commencé un nouveau travail la semaine dernière.", instruction: "Écrivez à un ami. Racontez votre premier jour : où vous travaillez, avec qui, ce que vous avez fait, et comment vous vous êtes senti.", wordMin: 60, wordMax: 80 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF A2 — Message : organiser un cadeau commun",
    prompt: "Écrivez un message pour organiser quelque chose.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { situation: "Un collègue part et vous voulez lui offrir un cadeau avec l'équipe.", instruction: "Écrivez un message aux collègues. Proposez une idée de cadeau, dites combien chacun doit donner, et demandez une réponse avant vendredi.", wordMin: 40, wordMax: 60 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF A2 — Décrire son quartier idéal",
    prompt: "Décrivez et expliquez vos préférences.",
    difficulty: "STRETCH", topicTag: "logement",
    payload: { situation: "Un ami cherche un logement dans votre ville et vous demande conseil.", instruction: "Écrivez-lui. Décrivez le quartier que vous conseillez, dites ce qu'il y a autour, et expliquez pourquoi c'est pratique pour lui.", wordMin: 60, wordMax: 80 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF A2 — Message : je ne trouve pas la salle",
    prompt: "Écrivez un message court pour demander de l'aide.",
    difficulty: "FOUNDATION", topicTag: "vie-pratique",
    payload: { situation: "Vous arrivez pour un cours du soir mais vous ne trouvez pas la bonne salle.", instruction: "Écrivez un message au secrétariat. Dites où vous êtes, quel cours vous cherchez, à quelle heure il commence, et demandez comment y aller.", wordMin: 40, wordMax: 60 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF A2 — Monologue : mes habitudes du matin",
    prompt: "Parlez environ une minute et demie, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Décrivez une matinée normale chez vous : à quelle heure vous vous levez, ce que vous faites avant de sortir, et ce que vous prenez au petit-déjeuner.", prepSeconds: 10, speakSeconds: 90 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF A2 — Interaction : à la pharmacie",
    prompt: "Jouez la situation à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "sante",
    payload: { taskPrompt: "Vous avez mal à la gorge depuis deux jours. Expliquez votre problème au pharmacien, demandez un médicament, et demandez combien de fois par jour il faut le prendre.", prepSeconds: 15, speakSeconds: 90 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF A2 — Monologue : un voyage que j'ai fait",
    prompt: "Parlez environ une minute et demie, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "loisirs",
    payload: { taskPrompt: "Racontez un voyage que vous avez fait. Dites où vous êtes allé, avec qui, ce que vous avez visité, et ce que vous avez aimé.", prepSeconds: 10, speakSeconds: 90 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF A2 — Interaction : rendre un vêtement au magasin",
    prompt: "Jouez la situation à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "vie-pratique",
    payload: { taskPrompt: "Vous avez acheté un pull qui ne va pas. Allez au magasin, expliquez le problème, demandez à l'échanger, et demandez jusqu'à quand c'est possible.", prepSeconds: 15, speakSeconds: 90 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF A2 — Monologue : le sport et moi",
    prompt: "Parlez environ une minute et demie, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "loisirs",
    payload: { taskPrompt: "Parlez du sport dans votre vie. Dites quel sport vous faites ou vous aimez regarder, quand, et pourquoi il vous plaît.", prepSeconds: 10, speakSeconds: 90 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF A2 — Interaction : s'inscrire à un cours de cuisine",
    prompt: "Jouez la situation à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "loisirs",
    payload: { taskPrompt: "Vous voulez vous inscrire à un cours de cuisine. Demandez les jours et les horaires, le prix, et s'il faut apporter quelque chose.", prepSeconds: 15, speakSeconds: 90 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF A2 — Monologue : une fête chez moi",
    prompt: "Parlez environ une minute et demie, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Décrivez une fête importante dans votre pays ou votre famille. Dites quand elle a lieu, ce qu'on mange, et ce que vous faites ce jour-là.", prepSeconds: 10, speakSeconds: 90 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF A2 — Interaction : signaler une panne au propriétaire",
    prompt: "Jouez la situation à l'oral, puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "logement",
    payload: { taskPrompt: "Le chauffage de votre appartement ne marche plus depuis hier. Téléphonez au propriétaire, expliquez le problème, demandez quand quelqu'un peut venir, et proposez un moment où vous êtes chez vous.", prepSeconds: 15, speakSeconds: 90 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF A2 — Monologue : apprendre le français",
    prompt: "Parlez environ une minute et demie, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "etudes",
    payload: { taskPrompt: "Expliquez pourquoi vous apprenez le français, depuis combien de temps, ce qui est facile pour vous et ce qui est difficile.", prepSeconds: 10, speakSeconds: 90 },
  },

  // ---------- TEF A2 top-up (Rule #7: 5 -> 15 per expression module) ----------
  // Fixed TEF format (see src/lib/french/exam-structure.ts): écrite Section A
  // 80–120 mots / Section B 200–260 mots; orale Section A 300 s / Section B 600 s.
  // A2 shifts topic and register only — the word counts stay the exam's.
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section A — Courriel : signaler une erreur de facture",
    prompt: "Rédigez le message demandé (Section A).",
    difficulty: "CORE", topicTag: "vie-pratique",
    payload: { situation: "Votre facture d'électricité est beaucoup plus élevée que d'habitude.", instruction: "Écrivez au service client. Donnez votre numéro de client, expliquez ce que vous avez remarqué, demandez une vérification, et dites comment vous joindre.", wordMin: 80, wordMax: 120 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section A — Message : organiser un covoiturage",
    prompt: "Rédigez le message demandé (Section A).",
    difficulty: "FOUNDATION", topicTag: "travail",
    payload: { situation: "Plusieurs collègues habitent votre quartier et viennent en voiture.", instruction: "Écrivez un message au groupe. Proposez un covoiturage, donnez vos horaires, expliquez comment partager les frais, et demandez qui est intéressé.", wordMin: 80, wordMax: 120 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section A — Courriel : reporter des vacances",
    prompt: "Rédigez le message demandé (Section A).",
    difficulty: "CORE", topicTag: "loisirs",
    payload: { situation: "Vous avez réservé un séjour mais vous devez changer les dates.", instruction: "Écrivez à l'agence. Rappelez votre réservation, expliquez pourquoi vous devez la déplacer, proposez de nouvelles dates, et demandez s'il y a des frais.", wordMin: 80, wordMax: 120 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section A — Message : proposer de remplacer un collègue",
    prompt: "Rédigez le message demandé (Section A).",
    difficulty: "CORE", topicTag: "travail",
    payload: { situation: "Une collègue est absente et personne ne peut couvrir son service jeudi.", instruction: "Écrivez à votre responsable. Proposez de la remplacer, dites à quelles conditions vous êtes disponible, et demandez confirmation.", wordMin: 80, wordMax: 120 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section A — Courriel : demander un certificat",
    prompt: "Rédigez le message demandé (Section A).",
    difficulty: "FOUNDATION", topicTag: "etudes",
    payload: { situation: "Vous avez besoin d'une attestation de votre école pour un dossier.", instruction: "Écrivez au secrétariat. Présentez-vous, dites quel document vous demandez et pourquoi, indiquez la date limite, et demandez comment le récupérer.", wordMin: 80, wordMax: 120 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section B — Convaincre : garder la cantine du personnel",
    prompt: "Rédigez un texte argumenté défendant une position (Section B).",
    difficulty: "CORE", topicTag: "travail",
    payload: { situation: "Votre entreprise envisage de fermer la cantine pour faire des économies.", instruction: "Écrivez pour défendre son maintien. Donnez des arguments concrets (temps, coût pour les salariés, vie d'équipe) et répondez à l'argument des économies.", wordMin: 200, wordMax: 260 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section B — Convaincre : installer un local à vélos",
    prompt: "Rédigez un texte argumenté défendant une position (Section B).",
    difficulty: "CORE", topicTag: "logement",
    payload: { situation: "Les habitants de votre immeuble laissent leurs vélos dans le couloir.", instruction: "Écrivez au syndic pour demander un local à vélos. Expliquez le problème actuel, donnez les avantages pour tous, et répondez à l'objection du coût.", wordMin: 200, wordMax: 260 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section B — Convaincre : passer aux courses en ligne",
    prompt: "Rédigez un texte argumenté défendant une position (Section B).",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { situation: "Un proche perd beaucoup de temps à faire ses courses chaque semaine.", instruction: "Écrivez-lui pour le convaincre d'essayer les courses en ligne. Donnez des arguments de temps et d'organisation, et répondez à son inquiétude sur la qualité des produits frais.", wordMin: 200, wordMax: 260 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section B — Convaincre : organiser une fête de quartier",
    prompt: "Rédigez un texte argumenté défendant une position (Section B).",
    difficulty: "CORE", topicTag: "societe",
    payload: { situation: "Vous voulez organiser une fête entre voisins au printemps.", instruction: "Écrivez aux habitants pour les convaincre de participer. Présentez l'idée, montrez ce que cela apporte au quartier, et répondez à ceux qui craignent le bruit et l'organisation.", wordMin: 200, wordMax: 260 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section B — Convaincre : suivre une formation le soir",
    prompt: "Rédigez un texte argumenté défendant une position (Section B).",
    difficulty: "CORE", topicTag: "etudes",
    payload: { situation: "Un ami hésite à reprendre une formation en plus de son travail.", instruction: "Écrivez-lui pour le convaincre. Présentez les bénéfices à moyen terme, proposez une organisation réaliste de sa semaine, et répondez à sa crainte de la fatigue.", wordMin: 200, wordMax: 260 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section A — Se renseigner : une assurance habitation",
    prompt: "Posez le maximum de questions utiles (Section A), puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "logement",
    payload: { taskPrompt: "Vous emménagez et devez assurer votre logement. Appelez une agence et posez le maximum de questions : ce qui est couvert, le prix par mois, la franchise, les documents à fournir, et le délai pour être assuré.", prepSeconds: 60, speakSeconds: 300 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section A — Se renseigner : une formation professionnelle",
    prompt: "Posez le maximum de questions utiles (Section A), puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "travail",
    payload: { taskPrompt: "Un organisme propose une formation courte dans votre domaine. Renseignez-vous : la durée, le rythme, le coût et les aides possibles, le diplôme obtenu, et les conditions d'inscription.", prepSeconds: 60, speakSeconds: 300 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section A — Se renseigner : un abonnement de transport",
    prompt: "Posez le maximum de questions utiles (Section A), puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "vie-pratique",
    payload: { taskPrompt: "Vous voulez un abonnement mensuel de transport. Au guichet, posez le maximum de questions : le prix, les zones couvertes, les réductions possibles, où charger la carte, et que faire en cas de perte.", prepSeconds: 60, speakSeconds: 300 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section A — Se renseigner : garde d'enfants après l'école",
    prompt: "Posez le maximum de questions utiles (Section A), puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Vous cherchez une solution de garde après l'école. Téléphonez au centre de loisirs et posez le maximum de questions : les horaires, le prix, le goûter, les activités proposées, et l'inscription en cours d'année.", prepSeconds: 60, speakSeconds: 300 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section A — Se renseigner : réparer un téléphone",
    prompt: "Posez le maximum de questions utiles (Section A), puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "vie-pratique",
    payload: { taskPrompt: "L'écran de votre téléphone est cassé. Appelez un réparateur et posez le maximum de questions : le prix, la durée de la réparation, la garantie, s'il faut prendre rendez-vous, et si vous perdez vos données.", prepSeconds: 60, speakSeconds: 300 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section B — Persuader : partager un jardin collectif",
    prompt: "Présentez et convainquez votre interlocuteur (Section B), puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "societe",
    payload: { taskPrompt: "Un terrain libre pourrait devenir un jardin partagé. Présentez le projet à un voisin et convainquez-le de s'y engager. Il pense qu'il n'aura pas le temps de s'en occuper — proposez une organisation.", prepSeconds: 60, speakSeconds: 600 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section B — Persuader : changer d'horaires de réunion",
    prompt: "Présentez et convainquez votre interlocuteur (Section B), puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "travail",
    payload: { taskPrompt: "Les réunions ont lieu à 17 h, ce qui pose problème à plusieurs collègues. Présentez une autre organisation à votre responsable et convainquez-le. Il craint que tout le monde ne soit pas disponible le matin — répondez-y.", prepSeconds: 60, speakSeconds: 600 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section B — Persuader : essayer les transports en commun",
    prompt: "Présentez et convainquez votre interlocuteur (Section B), puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "vie-pratique",
    payload: { taskPrompt: "Un ami prend sa voiture pour tous ses trajets. Présentez-lui l'abonnement de transport et convainquez-le d'essayer un mois. Il dit que le bus est trop lent — comparez honnêtement et répondez.", prepSeconds: 60, speakSeconds: 600 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section B — Persuader : adopter un animal en refuge",
    prompt: "Présentez et convainquez votre interlocuteur (Section B), puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Une amie veut acheter un chat chez un éleveur. Présentez-lui l'adoption en refuge et convainquez-la. Elle craint que l'animal soit malade ou difficile — répondez avec des arguments concrets.", prepSeconds: 60, speakSeconds: 600 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section B — Persuader : organiser les vacances à la montagne",
    prompt: "Présentez et convainquez votre interlocuteur (Section B), puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "loisirs",
    payload: { taskPrompt: "Votre famille hésite entre la mer et la montagne cet été. Présentez la montagne et convainquez-les : activités, température, budget. On vous objecte que c'est fatigant avec des enfants — proposez une solution.", prepSeconds: 60, speakSeconds: 600 },
  },

  // ---------- TCF A2 top-up (Rule #7: 5 -> 15 per expression module) ----------
  // Fixed TCF format: écrite T1 60–120 / T2 120–150 / T3 120–180; orale T1 prep 0
  // speak 120, T2 prep 120 speak 210 (8–12 questions), T3 prep 0 speak 270.
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF Tâche 1 — Message : raconter un déménagement",
    prompt: "Rédigez le message demandé (Tâche 1).",
    difficulty: "CORE", topicTag: "logement",
    payload: { situation: "Vous avez déménagé le week-end dernier.", instruction: "Écrivez à un ami. Racontez comment s'est passée la journée, dites qui vous a aidé, décrivez le nouveau logement, et dites ce qu'il reste à faire.", wordMin: 60, wordMax: 120 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF Tâche 1 — Message : annoncer une bonne nouvelle",
    prompt: "Rédigez le message demandé (Tâche 1).",
    difficulty: "FOUNDATION", topicTag: "travail",
    payload: { situation: "Vous avez réussi un examen important la semaine dernière.", instruction: "Écrivez à un proche. Annoncez la nouvelle, racontez comment s'est passé l'examen, dites ce que cela change pour vous, et proposez de fêter cela.", wordMin: 60, wordMax: 120 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF Tâche 1 — Message : demander un service à un collègue",
    prompt: "Rédigez le message demandé (Tâche 1).",
    difficulty: "CORE", topicTag: "travail",
    payload: { situation: "Vous devez partir plus tôt vendredi pour un rendez-vous médical.", instruction: "Écrivez à un collègue. Expliquez la situation, demandez-lui de vous remplacer, précisez ce qu'il aura à faire, et proposez de lui rendre le service.", wordMin: 60, wordMax: 120 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF Tâche 2 — Courriel : réclamer après une livraison abîmée",
    prompt: "Rédigez le texte demandé (Tâche 2).",
    difficulty: "CORE", topicTag: "vie-pratique",
    payload: { situation: "Le meuble que vous avez commandé est arrivé rayé et incomplet.", instruction: "Écrivez au service client. Rappelez la commande et la date, décrivez précisément les dommages et ce qui manque, indiquez ce que vous demandez, et fixez un délai de réponse.", wordMin: 120, wordMax: 150 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF Tâche 2 — Courriel : candidater à un emploi saisonnier",
    prompt: "Rédigez le texte demandé (Tâche 2).",
    difficulty: "CORE", topicTag: "travail",
    payload: { situation: "Une annonce propose un emploi saisonnier dans un centre de vacances.", instruction: "Écrivez votre candidature. Présentez-vous, indiquez votre expérience et vos disponibilités, expliquez pourquoi ce poste vous intéresse, et demandez la suite de la procédure.", wordMin: 120, wordMax: 150 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF Tâche 2 — Article : présenter une fête de son pays",
    prompt: "Rédigez le texte demandé (Tâche 2).",
    difficulty: "FOUNDATION", topicTag: "societe",
    payload: { situation: "Le journal de votre école prépare un numéro sur les fêtes du monde.", instruction: "Écrivez un court article. Présentez une fête importante de votre pays, dites quand elle a lieu et ce qu'on y fait, décrivez ce qu'on mange, et expliquez ce qu'elle représente pour vous.", wordMin: 120, wordMax: 150 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF Tâche 3 — Comparer : les vacances actives ou reposantes",
    prompt: "Comparez les deux points de vue puis donnez le vôtre (Tâche 3).",
    difficulty: "CORE", topicTag: "loisirs",
    payload: { situation: "Certains veulent visiter et bouger pendant leurs vacances ; d'autres veulent seulement se reposer.", instruction: "Présentez les deux façons de voir avec leurs raisons, puis donnez votre position et justifiez-la avec une expérience personnelle.", wordMin: 120, wordMax: 180 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF Tâche 3 — Comparer : acheter neuf ou d'occasion",
    prompt: "Comparez les deux points de vue puis donnez le vôtre (Tâche 3).",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { situation: "Une amie n'achète que d'occasion ; une autre préfère toujours le neuf.", instruction: "Présentez les arguments de chacune, parlez du prix, de la qualité et de l'environnement, puis donnez votre avis avec un exemple précis.", wordMin: 120, wordMax: 180 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF Tâche 3 — Comparer : les animaux en appartement",
    prompt: "Comparez les deux points de vue puis donnez le vôtre (Tâche 3).",
    difficulty: "FOUNDATION", topicTag: "logement",
    payload: { situation: "Certains pensent qu'on ne devrait pas avoir d'animal dans un petit appartement ; d'autres ne sont pas d'accord.", instruction: "Présentez les deux positions et ce qui les justifie, puis donnez la vôtre en expliquant à quelles conditions cela vous paraît possible.", wordMin: 120, wordMax: 180 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF Tâche 3 — Comparer : étudier le soir ou le matin",
    prompt: "Comparez les deux points de vue puis donnez le vôtre (Tâche 3).",
    difficulty: "CORE", topicTag: "etudes",
    payload: { situation: "Deux camarades ne s'accordent pas : l'un révise tôt le matin, l'autre tard le soir.", instruction: "Présentez les avantages de chaque habitude, puis dites ce qui marche le mieux pour vous et pourquoi, avec un exemple concret.", wordMin: 120, wordMax: 180 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 1 — Entretien guidé : vos amis",
    prompt: "Répondez à l'entretien guidé (Tâche 1), puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Parlez de vos amis : comment vous les avez rencontrés, ce que vous faites ensemble, et ce que vous appréciez chez eux.", prepSeconds: 0, speakSeconds: 120 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 1 — Entretien guidé : vos déplacements",
    prompt: "Répondez à l'entretien guidé (Tâche 1), puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "vie-pratique",
    payload: { taskPrompt: "Parlez de vos déplacements : comment vous allez au travail ou en cours, combien de temps cela prend, et ce que vous changeriez si vous pouviez.", prepSeconds: 0, speakSeconds: 120 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 1 — Entretien guidé : votre week-end",
    prompt: "Répondez à l'entretien guidé (Tâche 1), puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "loisirs",
    payload: { taskPrompt: "Parlez de votre week-end habituel : ce que vous faites le samedi et le dimanche, avec qui, et ce que vous préférez.", prepSeconds: 0, speakSeconds: 120 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 2 — Interaction : inscrire un enfant à une activité",
    prompt: "Posez 8 à 12 questions dans l'échange (Tâche 2), puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "loisirs",
    payload: { taskPrompt: "Vous inscrivez votre enfant à une activité du mercredi. Posez entre 8 et 12 questions : les horaires, le prix, l'âge minimum, l'encadrement, le matériel, le lieu, les absences, et l'inscription en cours d'année.", prepSeconds: 120, speakSeconds: 210 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 2 — Interaction : ouvrir un abonnement internet",
    prompt: "Posez 8 à 12 questions dans l'échange (Tâche 2), puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "vie-pratique",
    payload: { taskPrompt: "Vous souscrivez un abonnement internet. Posez entre 8 et 12 questions : le prix mensuel, la durée d'engagement, les frais d'installation, le débit, le délai de raccordement, le matériel fourni, l'assistance, et la résiliation.", prepSeconds: 120, speakSeconds: 210 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 2 — Interaction : réserver un voyage en car",
    prompt: "Posez 8 à 12 questions dans l'échange (Tâche 2), puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "loisirs",
    payload: { taskPrompt: "Vous réservez un voyage en car pour un week-end. Posez entre 8 et 12 questions : le prix, les horaires de départ et de retour, la durée, les arrêts, les bagages, l'hôtel compris ou non, les repas, et les conditions d'annulation.", prepSeconds: 120, speakSeconds: 210 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 3 — Point de vue : le travail le week-end",
    prompt: "Exprimez et défendez un point de vue (Tâche 3), puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "travail",
    payload: { taskPrompt: "Faut-il travailler le week-end quand c'est mieux payé ? Donnez votre point de vue, expliquez vos raisons, et illustrez avec des situations concrètes.", prepSeconds: 0, speakSeconds: 270 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 3 — Point de vue : apprendre plusieurs langues",
    prompt: "Exprimez et défendez un point de vue (Tâche 3), puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "etudes",
    payload: { taskPrompt: "Est-il utile d'apprendre plusieurs langues, ou vaut-il mieux en maîtriser une seule très bien ? Donnez votre avis et défendez-le avec des exemples.", prepSeconds: 0, speakSeconds: 270 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 3 — Point de vue : la télévision et les enfants",
    prompt: "Exprimez et défendez un point de vue (Tâche 3), puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "societe",
    payload: { taskPrompt: "Combien de temps un enfant devrait-il passer devant un écran chaque jour ? Donnez votre point de vue, justifiez-le, et proposez une règle qui vous paraît raisonnable.", prepSeconds: 0, speakSeconds: 270 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 3 — Point de vue : habiter seul ou en colocation",
    prompt: "Exprimez et défendez un point de vue (Tâche 3), puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "logement",
    payload: { taskPrompt: "Vaut-il mieux vivre seul ou partager un logement ? Donnez votre point de vue en parlant du prix, de la tranquillité et de la vie sociale, avec des exemples.", prepSeconds: 0, speakSeconds: 270 },
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
  console.log(`seed:a2 — ${created} created, ${ITEMS.length - created} already present`);
}

if (isDirectRun(import.meta.url)) {
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(() => prisma.$disconnect());
}
