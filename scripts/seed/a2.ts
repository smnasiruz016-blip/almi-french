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
    title: "TEF — Petit message : annuler un rendez-vous",
    prompt: "Rédigez le message demandé.",
    difficulty: "FOUNDATION", topicTag: "vie-pratique",
    payload: { situation: "Vous ne pouvez pas aller à un rendez-vous avec un ami demain.", instruction: "Écrivez-lui un message pour annuler, dire pourquoi et proposer un autre jour.", wordMin: 40, wordMax: 60 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF — Courriel : remercier pour un cadeau",
    prompt: "Rédigez le courriel demandé.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { situation: "Une amie vous a offert un cadeau pour votre anniversaire.", instruction: "Écrivez-lui un courriel pour la remercier, dire si vous aimez le cadeau et proposer de vous voir bientôt.", wordMin: 40, wordMax: 70 },
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
    title: "TEF — Courriel : réserver une table",
    prompt: "Rédigez le message demandé.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { situation: "Vous voulez réserver une table dans un restaurant pour vendredi soir.", instruction: "Écrivez un courriel au restaurant. Donnez le jour, l'heure, le nombre de personnes et demandez une table près de la fenêtre.", wordMin: 50, wordMax: 80 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF — Note : laisser un mot à un voisin",
    prompt: "Rédigez la note demandée.",
    difficulty: "FOUNDATION", topicTag: "habitat",
    payload: { situation: "Vous partez en voyage une semaine et vous demandez à un voisin d'arroser vos plantes.", instruction: "Écrivez une note au voisin. Expliquez ce que vous demandez, pour combien de temps, et remerciez-le.", wordMin: 40, wordMax: 60 },
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
    title: "TEF — Message : demander un renseignement",
    prompt: "Rédigez le message demandé.",
    difficulty: "CORE", topicTag: "education",
    payload: { situation: "Vous voulez vous inscrire à un cours de cuisine.", instruction: "Écrivez un courriel à l'école pour demander les jours, l'heure et le prix du cours.", wordMin: 40, wordMax: 70 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF — Courriel : s'excuser auprès d'un collègue",
    prompt: "Rédigez le courriel demandé.",
    difficulty: "CORE", topicTag: "travail",
    payload: { situation: "Vous n'avez pas pu venir à une réunion importante au travail.", instruction: "Écrivez un courriel à un collègue pour vous excuser, expliquer pourquoi et demander ce qui a été décidé.", wordMin: 50, wordMax: 80 },
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
    title: "TEF — Courriel : changer une commande",
    prompt: "Rédigez le message demandé.",
    difficulty: "STRETCH", topicTag: "commerces",
    payload: { situation: "Vous avez commandé une veste rouge sur internet, mais vous voulez la bleue.", instruction: "Écrivez un courriel au magasin pour changer la couleur de votre commande et demander si c'est possible.", wordMin: 50, wordMax: 80 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF — Message : proposer une sortie",
    prompt: "Rédigez le message demandé.",
    difficulty: "CORE", topicTag: "loisirs",
    payload: { situation: "Vous voulez aller au musée dimanche avec un ami.", instruction: "Écrivez un message pour proposer cette sortie. Donnez le jour, l'heure du rendez-vous et le lieu.", wordMin: 40, wordMax: 60 },
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
    title: "TEF — Message : féliciter un ami",
    prompt: "Rédigez le message demandé.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { situation: "Un ami a trouvé un nouveau travail.", instruction: "Écrivez-lui un message pour le féliciter, lui poser une ou deux questions sur son travail et proposer de fêter ça.", wordMin: 40, wordMax: 60 },
  },
  {
    level: "A2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF — Courriel : signaler un objet perdu",
    prompt: "Rédigez le courriel demandé.",
    difficulty: "STRETCH", topicTag: "vie-pratique",
    payload: { situation: "Vous avez oublié votre sac dans un train.", instruction: "Écrivez un courriel au service des objets trouvés. Décrivez le sac, dites dans quel train vous étiez et demandez ce qu'il faut faire.", wordMin: 50, wordMax: 80 },
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
    title: "TEF — Acheter un billet de train",
    prompt: "Jouez la situation à l'oral, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "transports",
    payload: { taskPrompt: "Vous êtes à la gare. Vous voulez acheter un billet pour Marseille. Demandez l'heure du train, le prix et la voie de départ.", prepSeconds: 15, speakSeconds: 90 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF — Parler de sa famille",
    prompt: "Répondez à l'oral, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Parlez de votre famille. Combien de personnes y a-t-il ? Que font-elles ? Avec qui vous entendez-vous le mieux ?", prepSeconds: 10, speakSeconds: 90 },
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
    title: "TEF — Au magasin de vêtements",
    prompt: "Jouez la situation à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "commerces",
    payload: { taskPrompt: "Vous cherchez un pull dans un magasin. Demandez au vendeur le prix, la taille et la couleur. Demandez si vous pouvez l'essayer.", prepSeconds: 15, speakSeconds: 90 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF — Décrire sa journée typique",
    prompt: "Répondez à l'oral, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Décrivez une journée typique de la semaine : à quelle heure vous vous levez, ce que vous faites le matin, l'après-midi et le soir.", prepSeconds: 10, speakSeconds: 90 },
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
    title: "TEF — Réserver une chambre d'hôtel",
    prompt: "Jouez la situation à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "voyages",
    payload: { taskPrompt: "Vous téléphonez à un hôtel. Vous voulez une chambre pour deux nuits. Demandez le prix, si le petit-déjeuner est compris et s'il y a un parking.", prepSeconds: 15, speakSeconds: 90 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF — Parler de son travail ou de ses études",
    prompt: "Répondez à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "travail",
    payload: { taskPrompt: "Parlez de votre travail ou de vos études. Qu'est-ce que vous faites ? Qu'est-ce que vous aimez et qu'est-ce qui est difficile ?", prepSeconds: 10, speakSeconds: 90 },
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
    title: "TEF — Chez le médecin",
    prompt: "Jouez la situation à l'oral, puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "vie-pratique",
    payload: { taskPrompt: "Vous êtes malade. Vous allez chez le médecin. Expliquez vos symptômes, depuis quand vous êtes malade et posez une question sur les médicaments.", prepSeconds: 15, speakSeconds: 90 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF — Parler de ses vacances",
    prompt: "Répondez à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "voyages",
    payload: { taskPrompt: "Parlez de vos dernières vacances. Où êtes-vous allé ? Avec qui ? Qu'est-ce que vous avez fait et avez-vous aimé ?", prepSeconds: 10, speakSeconds: 90 },
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
    title: "TEF — Demander son chemin",
    prompt: "Jouez la situation à l'oral, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "vie-pratique",
    payload: { taskPrompt: "Vous êtes perdu dans une ville. Vous cherchez la gare. Arrêtez un passant, demandez votre chemin et vérifiez combien de temps il faut à pied.", prepSeconds: 15, speakSeconds: 90 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF — Décrire son logement",
    prompt: "Répondez à l'oral, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "habitat",
    payload: { taskPrompt: "Décrivez votre logement. Combien de pièces y a-t-il ? Comment est-il ? Qu'est-ce que vous aimez ou n'aimez pas chez vous ?", prepSeconds: 10, speakSeconds: 90 },
  },
  {
    level: "A2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF A2 — Monologue : un ami important",
    prompt: "Parlez environ une minute et demie, puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Parlez d'un ami important pour vous. Comment l'avez-vous rencontré ? Comment est-il ? Pourquoi est-il important pour vous ?", prepSeconds: 10, speakSeconds: 90 },
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
