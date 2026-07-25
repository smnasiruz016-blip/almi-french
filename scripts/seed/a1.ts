// A1 wave — original French items at the beginner register (very short texts: signs,
// forms, simple messages; present tense, basic vocabulary — numbers, days, family,
// food, prices). Never translated from German, never copied from CCI Paris or France
// Éducation International. Reading/Listening are SHARED (examFamily null); Writing/
// Speaking carry an examFamily. ~16 items per skill.
//
// Run: npm run seed:a1   (needs DATABASE_URL set)

import { PrismaClient, Prisma } from "@prisma/client";
import { isDirectRun } from "./_entry";

const prisma = new PrismaClient();

export const ITEMS: Prisma.FrenchItemCreateManyInput[] = [
  // ---------- Compréhension écrite (Reading) — shared ----------
  {
    level: "A1", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Petit mot d'un ami",
    prompt: "Lisez le message et répondez aux questions.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: {
      passages: [{ id: "p1", body: "Salut ! Rendez-vous à 14 h au café. À tout à l'heure ! Marc" }],
      questions: [
        { id: "q1", kind: "mcq", stem: "À quelle heure est le rendez-vous ?", options: [{ id: "b", text: "14 h" }, { id: "a", text: "4 h" }, { id: "c", text: "40 h" }], answer: "b" },
        { id: "q2", kind: "mcq", stem: "Où est le rendez-vous ?", options: [{ id: "b", text: "À la gare" }, { id: "a", text: "Au café" }, { id: "c", text: "À la maison" }], answer: "a" },
      ],
    },
  },
  {
    level: "A1", skill: "COMPREHENSION_ECRITE", taskType: "VRAI_FAUX", examFamily: null,
    title: "Panneau du magasin",
    prompt: "Lisez le panneau et indiquez vrai ou faux.",
    difficulty: "FOUNDATION", topicTag: "commerces",
    payload: {
      passages: [{ id: "p1", body: "Ouvert du lundi au samedi. De 9 h à 19 h. Fermé le dimanche." }],
      questions: [
        { id: "q1", kind: "truefalse", stem: "Le magasin est ouvert le dimanche.", answer: "false" },
        { id: "q2", kind: "truefalse", stem: "Le magasin ouvre à 9 h.", answer: "true" },
      ],
    },
  },
  {
    level: "A1", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Carte d'anniversaire",
    prompt: "Lisez la carte et répondez.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: {
      passages: [{ id: "p1", body: "Joyeux anniversaire, Léa ! Tu as 20 ans aujourd'hui. Gros bisous. Ta grand-mère." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Quel âge a Léa ?", options: [{ id: "a", text: "10 ans" }, { id: "c", text: "12 ans" }, { id: "b", text: "20 ans" }], answer: "b" },
        { id: "q2", kind: "mcq", stem: "Qui écrit la carte ?", options: [{ id: "a", text: "Sa grand-mère" }, { id: "b", text: "Sa sœur" }, { id: "c", text: "Son ami" }], answer: "a" },
      ],
    },
  },
  {
    level: "A1", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Liste de courses",
    prompt: "Lisez la liste et répondez.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: {
      passages: [{ id: "p1", body: "Courses : du pain, du lait, six œufs, des pommes et du café." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Combien d'œufs faut-il acheter ?", options: [{ id: "a", text: "Trois" }, { id: "b", text: "Six" }, { id: "c", text: "Dix" }], answer: "b" },
        { id: "q2", kind: "mcq", stem: "Quel fruit est sur la liste ?", options: [{ id: "c", text: "Des oranges" }, { id: "b", text: "Des bananes" }, { id: "a", text: "Des pommes" }], answer: "a" },
      ],
    },
  },
  {
    level: "A1", skill: "COMPREHENSION_ECRITE", taskType: "VRAI_FAUX", examFamily: null,
    title: "Panneau dans le parc",
    prompt: "Lisez le panneau et indiquez vrai ou faux.",
    difficulty: "FOUNDATION", topicTag: "vie-publique",
    payload: {
      passages: [{ id: "p1", body: "Parc municipal. Les chiens sont interdits. Ne marchez pas sur les fleurs. Merci." }],
      questions: [
        { id: "q1", kind: "truefalse", stem: "Les chiens sont interdits dans le parc.", answer: "true" },
        { id: "q2", kind: "truefalse", stem: "On peut marcher sur les fleurs.", answer: "false" },
      ],
    },
  },
  {
    level: "A1", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Carte de visite",
    prompt: "Lisez la carte et répondez.",
    difficulty: "CORE", topicTag: "vie-pratique",
    payload: {
      passages: [{ id: "p1", body: "Docteur Sophie Martin. Médecin. 12, rue des Lilas, Paris. Téléphone : 01 45 67 89 10." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Quel est le métier de Sophie Martin ?", options: [{ id: "a", text: "Médecin" }, { id: "b", text: "Professeur" }, { id: "c", text: "Avocate" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "Dans quelle ville travaille-t-elle ?", options: [{ id: "a", text: "Lyon" }, { id: "b", text: "Paris" }, { id: "c", text: "Nice" }], answer: "b" },
      ],
    },
  },
  {
    level: "A1", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Menu enfant",
    prompt: "Lisez le menu et répondez.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: {
      passages: [{ id: "p1", heading: "Menu enfant — 8 €", body: "Steak et frites. Un dessert : glace ou gâteau. Une boisson : jus ou eau." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Combien coûte le menu enfant ?", options: [{ id: "c", text: "80 €" }, { id: "b", text: "18 €" }, { id: "a", text: "8 €" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "Quel dessert peut-on choisir ?", options: [{ id: "a", text: "Une glace" }, { id: "b", text: "Une tarte" }, { id: "c", text: "Un fruit" }], answer: "a" },
      ],
    },
  },
  {
    level: "A1", skill: "COMPREHENSION_ECRITE", taskType: "VRAI_FAUX", examFamily: null,
    title: "Mot sur la porte",
    prompt: "Lisez le mot et indiquez vrai ou faux.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: {
      passages: [{ id: "p1", body: "Je suis au supermarché. Je rentre à 18 h. La clé est sous le tapis. Maman" }],
      questions: [
        { id: "q1", kind: "truefalse", stem: "La mère rentre à 18 h.", answer: "true" },
        { id: "q2", kind: "truefalse", stem: "La clé est dans la boîte aux lettres.", answer: "false" },
      ],
    },
  },
  {
    level: "A1", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Horaires du bus",
    prompt: "Lisez les horaires et répondez.",
    difficulty: "CORE", topicTag: "transports",
    payload: {
      passages: [{ id: "p1", body: "Bus numéro 5. Départs : 8 h, 10 h, 12 h, 14 h. Arrêt : place de la Mairie." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Quel est le numéro du bus ?", options: [{ id: "b", text: "8" }, { id: "a", text: "5" }, { id: "c", text: "15" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "À quelle heure part le premier bus ?", options: [{ id: "c", text: "12 h" }, { id: "b", text: "10 h" }, { id: "a", text: "8 h" }], answer: "a" },
      ],
    },
  },
  {
    level: "A1", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "SMS : annuler",
    prompt: "Lisez le SMS et répondez.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: {
      passages: [{ id: "p1", body: "Désolé, je suis malade. Je ne viens pas ce soir. On se voit demain ? Tom" }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Pourquoi Tom ne vient pas ?", options: [{ id: "a", text: "Il est malade" }, { id: "b", text: "Il travaille" }, { id: "c", text: "Il est fatigué" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "Quand veut-il se voir ?", options: [{ id: "b", text: "Ce soir" }, { id: "a", text: "Demain" }, { id: "c", text: "Lundi" }], answer: "a" },
      ],
    },
  },
  {
    level: "A1", skill: "COMPREHENSION_ECRITE", taskType: "VRAI_FAUX", examFamily: null,
    title: "Affiche : cours de yoga",
    prompt: "Lisez l'affiche et indiquez vrai ou faux.",
    difficulty: "CORE", topicTag: "loisirs",
    payload: {
      passages: [{ id: "p1", body: "Cours de yoga. Le mardi et le jeudi. À 18 h. Salle 2. Premier cours gratuit." }],
      questions: [
        { id: "q1", kind: "truefalse", stem: "Le cours a lieu le mardi.", answer: "true" },
        { id: "q2", kind: "truefalse", stem: "Le premier cours coûte 10 euros.", answer: "false" },
      ],
    },
  },
  {
    level: "A1", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Formulaire d'inscription",
    prompt: "Lisez le formulaire et répondez.",
    difficulty: "CORE", topicTag: "vie-pratique",
    payload: {
      passages: [{ id: "p1", body: "Nom : Dupont. Prénom : Julie. Âge : 25 ans. Ville : Lyon. Téléphone : 06 11 22 33 44." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Quel est le prénom ?", options: [{ id: "c", text: "Lyon" }, { id: "b", text: "Dupont" }, { id: "a", text: "Julie" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "Quel âge a Julie ?", options: [{ id: "a", text: "25 ans" }, { id: "b", text: "52 ans" }, { id: "c", text: "15 ans" }], answer: "a" },
      ],
    },
  },
  {
    level: "A1", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Carte du café",
    prompt: "Lisez la carte et répondez.",
    difficulty: "FOUNDATION", topicTag: "commerces",
    payload: {
      passages: [{ id: "p1", body: "Café : 2 €. Thé : 2,50 €. Jus d'orange : 3 €. Eau : 1,50 €." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Combien coûte un café ?", options: [{ id: "b", text: "3 €" }, { id: "a", text: "2 €" }, { id: "c", text: "1,50 €" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "Quelle est la boisson la plus chère ?", options: [{ id: "c", text: "L'eau" }, { id: "b", text: "Le café" }, { id: "a", text: "Le jus d'orange" }], answer: "a" },
      ],
    },
  },
  {
    level: "A1", skill: "COMPREHENSION_ECRITE", taskType: "VRAI_FAUX", examFamily: null,
    title: "Note du professeur",
    prompt: "Lisez la note et indiquez vrai ou faux.",
    difficulty: "FOUNDATION", topicTag: "education",
    payload: {
      passages: [{ id: "p1", body: "Demain, pas de cours le matin. Rendez-vous à 14 h. Apportez un cahier et un stylo." }],
      questions: [
        { id: "q1", kind: "truefalse", stem: "Il y a cours demain matin.", answer: "false" },
        { id: "q2", kind: "truefalse", stem: "Il faut apporter un stylo.", answer: "true" },
      ],
    },
  },
  {
    level: "A1", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Présentation : nouvel élève",
    prompt: "Lisez le texte et répondez.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: {
      passages: [{ id: "p1", body: "Bonjour, je m'appelle Karim. J'ai 18 ans. Je suis étudiant. J'aime le football et la musique. Je viens du Maroc." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Que fait Karim ?", options: [{ id: "a", text: "Il est étudiant" }, { id: "b", text: "Il est professeur" }, { id: "c", text: "Il est serveur" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "Qu'est-ce qu'il aime ?", options: [{ id: "b", text: "Le cinéma" }, { id: "a", text: "Le football et la musique" }, { id: "c", text: "La cuisine" }], answer: "a" },
      ],
    },
  },
  {
    level: "A1", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Affiche : fête de l'école",
    prompt: "Lisez l'affiche et répondez.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: {
      passages: [{ id: "p1", heading: "Fête de l'école", body: "Samedi 15 juin. À partir de 15 h. Dans la cour. Musique, jeux et gâteaux. Entrée gratuite." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Quel jour est la fête ?", options: [{ id: "c", text: "Samedi 5 juin" }, { id: "b", text: "Dimanche 15 juin" }, { id: "a", text: "Samedi 15 juin" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "Combien coûte l'entrée ?", options: [{ id: "a", text: "C'est gratuit" }, { id: "b", text: "5 euros" }, { id: "c", text: "15 euros" }], answer: "a" },
      ],
    },
  },

  // ---------- Compréhension de l'oral (Listening) — shared ----------
  {
    level: "A1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Se présenter",
    prompt: "Écoutez et répondez aux questions.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: {
      audioScript: "Bonjour ! Je m'appelle Anna. J'ai vingt-deux ans. J'habite à Toulouse. Je suis étudiante.",
      speakers: [{ role: "Anna", voice: "nova" }],
      questions: [
        { id: "q1", stem: "Comment s'appelle-t-elle ?", options: [{ id: "a", text: "Anna" }, { id: "b", text: "Emma" }, { id: "c", text: "Sara" }], answer: "a" },
        { id: "q2", stem: "Où habite-t-elle ?", options: [{ id: "b", text: "À Paris" }, { id: "a", text: "À Toulouse" }, { id: "c", text: "À Lyon" }], answer: "a" },
      ],
    },
  },
  {
    level: "A1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "À la boulangerie",
    prompt: "Écoutez et répondez.",
    difficulty: "FOUNDATION", topicTag: "commerces",
    payload: {
      audioScript: "Cliente : Bonjour, une baguette, s'il vous plaît. Boulanger : Voilà. Un euro. Cliente : Merci. Au revoir !",
      speakers: [{ role: "Cliente", voice: "shimmer" }, { role: "Boulanger", voice: "onyx" }],
      questions: [
        { id: "q1", stem: "Qu'achète la cliente ?", options: [{ id: "c", text: "Un gâteau" }, { id: "b", text: "Un croissant" }, { id: "a", text: "Une baguette" }], answer: "a" },
        { id: "q2", stem: "Combien coûte la baguette ?", options: [{ id: "a", text: "Un euro" }, { id: "b", text: "Deux euros" }, { id: "c", text: "Trois euros" }], answer: "a" },
      ],
    },
  },
  {
    level: "A1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "L'heure",
    prompt: "Écoutez et répondez.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: {
      audioScript: "Excusez-moi, quelle heure est-il ? Il est trois heures et demie. Merci beaucoup !",
      speakers: [{ role: "Passant", voice: "echo" }],
      questions: [
        { id: "q1", stem: "Quelle heure est-il ?", options: [{ id: "b", text: "Deux heures" }, { id: "a", text: "Trois heures et demie" }, { id: "c", text: "Quatre heures" }], answer: "a" },
        { id: "q2", stem: "Que dit la personne à la fin ?", options: [{ id: "c", text: "Au revoir" }, { id: "b", text: "Bonne nuit" }, { id: "a", text: "Merci beaucoup" }], answer: "a" },
      ],
    },
  },
  {
    level: "A1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Au téléphone",
    prompt: "Écoutez et répondez.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: {
      audioScript: "Allô ? Bonjour, c'est Lucas. Est-ce que Marie est là ? Non, elle n'est pas là. Elle rentre à six heures. D'accord, merci.",
      speakers: [{ role: "Lucas", voice: "fable" }, { role: "Voisin", voice: "onyx" }],
      questions: [
        { id: "q1", stem: "Qui téléphone ?", options: [{ id: "a", text: "Lucas" }, { id: "b", text: "Marie" }, { id: "c", text: "Paul" }], answer: "a" },
        { id: "q2", stem: "À quelle heure rentre Marie ?", options: [{ id: "b", text: "À deux heures" }, { id: "a", text: "À six heures" }, { id: "c", text: "À dix heures" }], answer: "a" },
      ],
    },
  },
  {
    level: "A1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Au café",
    prompt: "Écoutez et répondez.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: {
      audioScript: "Serveur : Bonjour, vous désirez ? Client : Un café, s'il vous plaît. Serveur : Avec du sucre ? Client : Non, merci.",
      speakers: [{ role: "Serveur", voice: "onyx" }, { role: "Client", voice: "echo" }],
      questions: [
        { id: "q1", stem: "Que commande le client ?", options: [{ id: "c", text: "Une eau" }, { id: "b", text: "Un thé" }, { id: "a", text: "Un café" }], answer: "a" },
        { id: "q2", stem: "Veut-il du sucre ?", options: [{ id: "a", text: "Non" }, { id: "b", text: "Oui" }, { id: "c", text: "Un peu" }], answer: "a" },
      ],
    },
  },
  {
    level: "A1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Annonce à l'école",
    prompt: "Écoutez l'annonce et répondez.",
    difficulty: "CORE", topicTag: "education",
    payload: {
      audioScript: "Attention, le cours de musique de cet après-midi est annulé. Les élèves rentrent à la maison à quinze heures. Merci.",
      speakers: [{ role: "Directrice", voice: "shimmer" }],
      questions: [
        { id: "q1", stem: "Quel cours est annulé ?", options: [{ id: "b", text: "Le cours de sport" }, { id: "a", text: "Le cours de musique" }, { id: "c", text: "Le cours de maths" }], answer: "a" },
        { id: "q2", stem: "À quelle heure rentrent les élèves ?", options: [{ id: "c", text: "À 13 h" }, { id: "b", text: "À 17 h" }, { id: "a", text: "À 15 h" }], answer: "a" },
      ],
    },
  },
  {
    level: "A1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Présenter sa famille",
    prompt: "Écoutez et répondez.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: {
      audioScript: "Voici ma famille. J'ai un frère et deux sœurs. Mon père est cuisinier. Ma mère est infirmière. Nous avons un chat.",
      speakers: [{ role: "Sami", voice: "fable" }],
      questions: [
        { id: "q1", stem: "Combien de sœurs a la personne ?", options: [{ id: "a", text: "Deux" }, { id: "b", text: "Une" }, { id: "c", text: "Trois" }], answer: "a" },
        { id: "q2", stem: "Quel est le métier du père ?", options: [{ id: "b", text: "Médecin" }, { id: "a", text: "Cuisinier" }, { id: "c", text: "Professeur" }], answer: "a" },
      ],
    },
  },
  {
    level: "A1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Le temps qu'il fait",
    prompt: "Écoutez et répondez.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: {
      audioScript: "Aujourd'hui, il fait beau et il y a du soleil. Il fait vingt degrés. C'est une belle journée pour se promener.",
      speakers: [{ role: "Présentateur", voice: "nova" }],
      questions: [
        { id: "q1", stem: "Quel temps fait-il aujourd'hui ?", options: [{ id: "c", text: "Il neige" }, { id: "b", text: "Il pleut" }, { id: "a", text: "Il fait beau" }], answer: "a" },
        { id: "q2", stem: "Quelle température fait-il ?", options: [{ id: "a", text: "Vingt degrés" }, { id: "b", text: "Dix degrés" }, { id: "c", text: "Trente degrés" }], answer: "a" },
      ],
    },
  },
  {
    level: "A1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Au marché",
    prompt: "Écoutez et répondez.",
    difficulty: "CORE", topicTag: "commerces",
    payload: {
      audioScript: "Cliente : Bonjour, je voudrais des pommes. Vendeur : Un kilo ? Cliente : Oui, un kilo. Vendeur : Deux euros, s'il vous plaît.",
      speakers: [{ role: "Cliente", voice: "shimmer" }, { role: "Vendeur", voice: "onyx" }],
      questions: [
        { id: "q1", stem: "Qu'achète la cliente ?", options: [{ id: "b", text: "Des oranges" }, { id: "a", text: "Des pommes" }, { id: "c", text: "Des poires" }], answer: "a" },
        { id: "q2", stem: "Combien paie-t-elle ?", options: [{ id: "c", text: "Douze euros" }, { id: "b", text: "Dix euros" }, { id: "a", text: "Deux euros" }], answer: "a" },
      ],
    },
  },
  {
    level: "A1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Invitation simple",
    prompt: "Écoutez et répondez.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: {
      audioScript: "Salut ! Tu viens à ma fête samedi ? C'est chez moi, à vingt heures. Réponds-moi vite !",
      speakers: [{ role: "Amie", voice: "nova" }],
      questions: [
        { id: "q1", stem: "Quel jour est la fête ?", options: [{ id: "a", text: "Samedi" }, { id: "b", text: "Dimanche" }, { id: "c", text: "Vendredi" }], answer: "a" },
        { id: "q2", stem: "À quelle heure ?", options: [{ id: "b", text: "À 10 h" }, { id: "a", text: "À 20 h" }, { id: "c", text: "À 12 h" }], answer: "a" },
      ],
    },
  },
  {
    level: "A1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Dans le métro",
    prompt: "Écoutez l'annonce et répondez.",
    difficulty: "CORE", topicTag: "transports",
    payload: {
      audioScript: "Prochaine station : Opéra. Attention à la marche en descendant du train. Les portes vont se fermer.",
      speakers: [{ role: "Annonce", voice: "echo" }],
      questions: [
        { id: "q1", stem: "Quelle est la prochaine station ?", options: [{ id: "c", text: "Nation" }, { id: "b", text: "Bastille" }, { id: "a", text: "Opéra" }], answer: "a" },
        { id: "q2", stem: "Que vont faire les portes ?", options: [{ id: "a", text: "Se fermer" }, { id: "b", text: "S'ouvrir" }, { id: "c", text: "Rester ouvertes" }], answer: "a" },
      ],
    },
  },
  {
    level: "A1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Demander un prix",
    prompt: "Écoutez et répondez.",
    difficulty: "FOUNDATION", topicTag: "commerces",
    payload: {
      audioScript: "Client : Bonjour, combien coûte ce livre ? Vendeuse : Douze euros. Client : D'accord, je le prends.",
      speakers: [{ role: "Client", voice: "fable" }, { role: "Vendeuse", voice: "shimmer" }],
      questions: [
        { id: "q1", stem: "Combien coûte le livre ?", options: [{ id: "b", text: "Deux euros" }, { id: "a", text: "Douze euros" }, { id: "c", text: "Vingt euros" }], answer: "a" },
        { id: "q2", stem: "Que décide le client ?", options: [{ id: "c", text: "Il revient demain" }, { id: "b", text: "Il part" }, { id: "a", text: "Il prend le livre" }], answer: "a" },
      ],
    },
  },
  {
    level: "A1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Message court",
    prompt: "Écoutez le message et répondez.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: {
      audioScript: "Bonjour, c'est le docteur Petit. Votre rendez-vous est demain à dix heures. À demain !",
      speakers: [{ role: "Secrétaire", voice: "nova" }],
      questions: [
        { id: "q1", stem: "Quand est le rendez-vous ?", options: [{ id: "a", text: "Demain à 10 h" }, { id: "b", text: "Aujourd'hui à 10 h" }, { id: "c", text: "Demain à 12 h" }], answer: "a" },
        { id: "q2", stem: "Qui laisse le message ?", options: [{ id: "b", text: "La banque" }, { id: "a", text: "Le cabinet du docteur" }, { id: "c", text: "L'école" }], answer: "a" },
      ],
    },
  },
  {
    level: "A1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Au restaurant : l'addition",
    prompt: "Écoutez et répondez.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: {
      audioScript: "Client : L'addition, s'il vous plaît. Serveuse : Voilà. Ça fait quinze euros. Client : Merci, voilà.",
      speakers: [{ role: "Client", voice: "echo" }, { role: "Serveuse", voice: "shimmer" }],
      questions: [
        { id: "q1", stem: "Que demande le client ?", options: [{ id: "c", text: "Un café" }, { id: "b", text: "Le menu" }, { id: "a", text: "L'addition" }], answer: "a" },
        { id: "q2", stem: "Combien ça fait ?", options: [{ id: "a", text: "Quinze euros" }, { id: "b", text: "Cinq euros" }, { id: "c", text: "Cinquante euros" }], answer: "a" },
      ],
    },
  },
  {
    level: "A1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Les jours de la semaine",
    prompt: "Écoutez et répondez.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: {
      audioScript: "Léa : Tu travailles quels jours ? Max : Du lundi au vendredi. Le week-end, je me repose. Léa : Et tu commences à quelle heure ? Max : À neuf heures.",
      speakers: [{ role: "Léa", voice: "nova" }, { role: "Max", voice: "fable" }],
      questions: [
        { id: "q1", stem: "Quels jours Max travaille-t-il ?", options: [{ id: "b", text: "Le week-end" }, { id: "a", text: "Du lundi au vendredi" }, { id: "c", text: "Tous les jours" }], answer: "a" },
        { id: "q2", stem: "À quelle heure commence-t-il ?", options: [{ id: "c", text: "À onze heures" }, { id: "b", text: "À sept heures" }, { id: "a", text: "À neuf heures" }], answer: "a" },
      ],
    },
  },
  {
    level: "A1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "À la gare",
    prompt: "Écoutez l'annonce et répondez.",
    difficulty: "STRETCH", topicTag: "transports",
    payload: {
      audioScript: "Le train pour Lille part à quatorze heures, voie numéro trois. Les voyageurs sont priés de monter dans le train. Bon voyage !",
      speakers: [{ role: "Annonce", voice: "onyx" }],
      questions: [
        { id: "q1", stem: "Pour quelle ville est le train ?", options: [{ id: "a", text: "Lille" }, { id: "b", text: "Lyon" }, { id: "c", text: "Nice" }], answer: "a" },
        { id: "q2", stem: "De quelle voie part le train ?", options: [{ id: "b", text: "Voie 13" }, { id: "a", text: "Voie 3" }, { id: "c", text: "Voie 2" }], answer: "a" },
      ],
    },
  },

  // ---------- Expression écrite (Writing) — exam-specific ----------
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF A1 — Remplir une fiche",
    prompt: "Écrivez les informations demandées.",
    difficulty: "FOUNDATION", topicTag: "vie-pratique",
    payload: { situation: "Vous vous inscrivez à la bibliothèque.", instruction: "Écrivez une fiche avec vos informations : nom, prénom, âge, ville, et une activité que vous aimez.", wordMin: 15, wordMax: 30 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section A — Message : se présenter à ses nouveaux voisins",
    prompt: "Rédigez le message demandé (Section A).",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { situation: "Vous venez d'emménager dans un immeuble et vous voulez vous faire connaître de vos voisins.", instruction: "Écrivez un mot à afficher dans l'entrée. Présentez-vous, dites d'où vous venez et à quel étage vous habitez, signalez que des travaux sont prévus chez vous la semaine prochaine, excusez-vous du bruit, et proposez un moyen de vous joindre.", wordMin: 80, wordMax: 120 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF Tâche 1 — Carte postale de vacances",
    prompt: "Écrivez une carte postale.",
    difficulty: "FOUNDATION", topicTag: "voyages",
    payload: { situation: "Vous êtes en vacances à la mer.", instruction: "Écrivez une carte postale à un ami. Dites où vous êtes et avec qui, décrivez le temps et le lieu, racontez deux choses que vous avez faites, dites ce que vous préférez ici, et annoncez quand vous rentrez.", wordMin: 60, wordMax: 120 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF A1 — Liste de courses avec un mot",
    prompt: "Écrivez le message demandé.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { situation: "Vous demandez à votre colocataire de faire des courses.", instruction: "Écrivez un petit mot : saluez, demandez d'acheter trois choses (par exemple du pain, du lait, des fruits) et dites merci.", wordMin: 15, wordMax: 30 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section A — Message : organiser un anniversaire",
    prompt: "Rédigez le message demandé (Section A).",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { situation: "Vous fêtez votre anniversaire samedi et vous invitez plusieurs amis.", instruction: "Écrivez le message d'invitation. Donnez le jour, l'heure et l'adresse, expliquez comment venir en transport, dites ce qui est prévu pour le repas, précisez s'il faut apporter quelque chose, et demandez une réponse avant jeudi.", wordMin: 80, wordMax: 120 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF Tâche 1 — Présentation sur le site d'un club",
    prompt: "Écrivez un court texte.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { situation: "Vous écrivez sur le site d'un club de sport.", instruction: "Écrivez votre présentation pour le site du club. Donnez votre nom, votre âge et votre ville, dites depuis quand vous pratiquez ce sport, expliquez pourquoi vous voulez rejoindre le club, indiquez vos jours disponibles, et dites ce que vous attendez du groupe.", wordMin: 60, wordMax: 120 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF A1 — Message : dire merci",
    prompt: "Écrivez un petit message.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { situation: "Un ami vous a aidé à déménager.", instruction: "Écrivez-lui un petit message pour le remercier et proposer de prendre un café ensemble.", wordMin: 15, wordMax: 30 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section A — Courriel : se renseigner sur un cours de français",
    prompt: "Rédigez le message demandé (Section A).",
    difficulty: "CORE", topicTag: "education",
    payload: { situation: "Vous voulez vous inscrire à un cours de français dans une école de votre ville.", instruction: "Écrivez un courriel à l'école. Présentez-vous et indiquez votre niveau, demandez les jours et les horaires, le prix et le nombre d'élèves par classe, dites quand vous êtes disponible, et demandez comment s'inscrire.", wordMin: 80, wordMax: 120 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF Tâche 1 — Message : prévenir d'un retard",
    prompt: "Écrivez le message demandé.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { situation: "Vous arrivez en retard à un rendez-vous avec un ami.", instruction: "Écrivez le message. Dites que vous êtes en retard, expliquez pourquoi, donnez l'heure à laquelle vous arrivez, proposez à votre ami ce qu'il peut faire en attendant, et excusez-vous.", wordMin: 60, wordMax: 120 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF A1 — Décrire sa journée (présent)",
    prompt: "Écrivez un court texte.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { situation: "Un ami veut savoir comment se passe votre journée.", instruction: "Écrivez quelques phrases au présent : ce que vous faites le matin, l'après-midi et le soir.", wordMin: 25, wordMax: 40 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section A — Message : annuler et reporter un rendez-vous",
    prompt: "Rédigez le message demandé (Section A).",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { situation: "Vous deviez retrouver un ami cet après-midi mais votre travail vous retient.", instruction: "Écrivez-lui un message. Annoncez que vous ne pourrez pas venir, expliquez pourquoi, excusez-vous, proposez deux autres moments dans la semaine, et demandez lequel lui convient le mieux.", wordMin: 80, wordMax: 120 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF Tâche 1 — Message : décrire son logement en photo",
    prompt: "Écrivez un court texte.",
    difficulty: "FOUNDATION", topicTag: "habitat",
    payload: { situation: "Vous montrez une photo de votre chambre à un ami.", instruction: "Écrivez le message qui accompagne la photo. Décrivez la pièce et sa taille, dites ce qu'il y a comme meubles, parlez de la lumière et de la vue, dites ce que vous aimez et ce que vous changeriez.", wordMin: 60, wordMax: 120 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF A1 — Parler de ce qu'on aime",
    prompt: "Écrivez un court texte.",
    difficulty: "FOUNDATION", topicTag: "loisirs",
    payload: { situation: "Vous remplissez votre profil sur un site de loisirs.", instruction: "Écrivez quelques phrases : ce que vous aimez (un sport, une nourriture, une couleur) et ce que vous n'aimez pas.", wordMin: 20, wordMax: 35 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section A — Message : changer un lieu de rendez-vous",
    prompt: "Rédigez le message demandé (Section A).",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { situation: "Le cinéma où vous deviez retrouver un ami est fermé ce soir.", instruction: "Écrivez-lui un message. Expliquez la situation, proposez une autre salle ou une autre activité, indiquez la nouvelle adresse et l'heure, expliquez comment s'y rendre, et demandez-lui de confirmer.", wordMin: 80, wordMax: 120 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF Tâche 1 — Mot : organiser un départ",
    prompt: "Écrivez le message demandé.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { situation: "Vous partez avant le retour de votre colocataire.", instruction: "Écrivez le mot que vous laissez. Dites où se trouve la clé, expliquez à quelle heure vous partez et quand vous rentrez, signalez deux choses à ne pas oublier dans l'appartement, et laissez un moyen de vous joindre.", wordMin: 60, wordMax: 120 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF A1 — Carte : bonnes vacances",
    prompt: "Écrivez une courte carte.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { situation: "Un ami part en vacances demain.", instruction: "Écrivez-lui une carte courte : souhaitez de bonnes vacances et demandez d'envoyer une photo.", wordMin: 15, wordMax: 30 },
  },

  // ---------- Expression orale (Speaking) — exam-specific ----------
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF A1 — Entretien : se présenter",
    prompt: "Parlez environ une minute, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Présentez-vous : dites votre nom, votre âge, votre nationalité, où vous habitez et ce que vous faites (travail ou études).", prepSeconds: 10, speakSeconds: 60 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section A — Se renseigner : commander un buffet à la boulangerie",
    prompt: "Posez le maximum de questions utiles (Section A), puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "commerces",
    payload: { taskPrompt: "Vous organisez un déjeuner pour une vingtaine de personnes et vous appelez une boulangerie qui propose des buffets. Posez le maximum de questions : les formules et leur contenu, le prix par personne, les possibilités sans gluten, le délai de commande, la livraison, et le mode de paiement.", prepSeconds: 60, speakSeconds: 300 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 1 — Entretien guidé : parler de soi",
    prompt: "Répondez à l'oral, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Parlez de vous : votre nom, votre âge, votre ville, et une chose que vous aimez faire.", prepSeconds: 0, speakSeconds: 120 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF A1 — Poser des questions simples",
    prompt: "Posez les questions à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Vous rencontrez une nouvelle personne. Posez-lui des questions simples : son nom, son âge, où elle habite, ce qu'elle aime.", prepSeconds: 10, speakSeconds: 60 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section A — Se renseigner : préparer un trajet inconnu",
    prompt: "Posez le maximum de questions utiles (Section A), puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "vie-pratique",
    payload: { taskPrompt: "Vous devez vous rendre demain dans une ville que vous ne connaissez pas. Au guichet d'information, posez le maximum de questions : les horaires de départ, la durée du trajet, les correspondances, le prix et les réductions, ce qui se passe en cas de retard, et comment rejoindre le centre-ville à l'arrivée.", prepSeconds: 60, speakSeconds: 300 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 1 — Entretien guidé : votre famille",
    prompt: "Répondez à l'oral, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Parlez de votre famille : combien vous êtes, qui sont vos parents, si vous avez des frères ou des sœurs.", prepSeconds: 0, speakSeconds: 120 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF A1 — Au café",
    prompt: "Jouez la situation à l'oral, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Vous êtes au café. Saluez le serveur, commandez une boisson, demandez le prix et payez.", prepSeconds: 10, speakSeconds: 60 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section A — Se renseigner : choisir un titre de transport",
    prompt: "Posez le maximum de questions utiles (Section A), puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "transports",
    payload: { taskPrompt: "Vous venez d'arriver dans la ville et vous hésitez entre un carnet de tickets et un abonnement. Posez le maximum de questions : les prix comparés, la durée de validité, les zones couvertes, les réductions possibles, où recharger, et ce qu'il faut faire en cas de perte.", prepSeconds: 60, speakSeconds: 300 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 1 — Entretien guidé : vos goûts",
    prompt: "Répondez à l'oral, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "loisirs",
    payload: { taskPrompt: "Dites ce que vous aimez et ce que vous n'aimez pas : une nourriture, un sport, une couleur, une saison.", prepSeconds: 0, speakSeconds: 120 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF A1 — Décrire une photo simple",
    prompt: "Parlez environ une minute, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Décrivez une photo de votre famille ou de vos amis : qui est sur la photo, où ils sont et ce qu'ils font.", prepSeconds: 10, speakSeconds: 60 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section A — Se renseigner : avant un achat en magasin",
    prompt: "Posez le maximum de questions utiles (Section A), puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "commerces",
    payload: { taskPrompt: "Vous voulez acheter un manteau mais vous hésitez. Posez au vendeur le maximum de questions : les tailles disponibles, la matière et l'entretien, le prix et les promotions à venir, la possibilité d'essayer, les conditions d'échange, et le délai de retour.", prepSeconds: 60, speakSeconds: 300 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 1 — Entretien guidé : votre ville",
    prompt: "Répondez à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Parlez de votre ville : son nom, si elle est grande ou petite, et une chose que vous aimez y faire.", prepSeconds: 0, speakSeconds: 120 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF A1 — Dire la date et l'heure",
    prompt: "Répondez à l'oral, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Dites quel jour on est aujourd'hui, quelle heure il est, et à quelle heure vous vous levez le matin.", prepSeconds: 10, speakSeconds: 60 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section A — Se renseigner : réserver pour un repas de groupe",
    prompt: "Posez le maximum de questions utiles (Section A), puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Vous organisez un repas d'équipe pour douze personnes et vous appelez un restaurant. Posez le maximum de questions : la disponibilité aux dates envisagées, la salle et son isolement, les menus de groupe et leur prix, les options végétariennes, l'accessibilité, et les conditions d'annulation.", prepSeconds: 60, speakSeconds: 300 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 1 — Entretien guidé : votre journée",
    prompt: "Répondez à l'oral, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Décrivez votre journée : à quelle heure vous vous levez, ce que vous mangez le matin, et ce que vous faites l'après-midi.", prepSeconds: 0, speakSeconds: 120 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF A1 — Inviter un ami",
    prompt: "Jouez la situation à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Vous voulez inviter un ami à manger chez vous. Dites quel jour, à quelle heure, et ce que vous allez préparer.", prepSeconds: 10, speakSeconds: 60 },
  },

  // ---------- DELF A1 top-up (Rule #7: 6 -> 15 per expression module) ----------
  // Structure per src/lib/french/delf-structure.ts, verified against France
  // Éducation International 2026-07-15: production écrite = "complete a form, then
  // write a message of about 40 words"; production orale = 3 parts (entretien
  // dirigé, échange d'informations, dialogue simulé), 5–7 min.
  // A1 register only: present tense, everyday situations, no subordinate clauses.
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF A1 — Fiche d'inscription au cours de natation",
    prompt: "Remplissez la fiche, puis écrivez un court message.",
    difficulty: "FOUNDATION", topicTag: "vie-pratique",
    payload: { situation: "Vous voulez apprendre à nager à la piscine municipale.", instruction: "Écrivez vos informations (nom, prénom, âge, ville, téléphone). Puis écrivez un message à la piscine : dites quel jour vous êtes libre et à quelle heure.", wordMin: 25, wordMax: 40 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF A1 — Message : je suis malade",
    prompt: "Écrivez un message simple pour prévenir quelqu'un.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { situation: "Vous êtes malade et vous ne pouvez pas aller au cours de français.", instruction: "Écrivez un message à votre professeur. Dites que vous êtes malade, dites pourquoi vous ne venez pas, et dites quand vous revenez.", wordMin: 20, wordMax: 35 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF A1 — Carte postale de la mer",
    prompt: "Écrivez une carte postale courte.",
    difficulty: "FOUNDATION", topicTag: "loisirs",
    payload: { situation: "Vous êtes en vacances à la mer avec votre famille.", instruction: "Écrivez une carte postale à un ami. Dites où vous êtes, avec qui, le temps qu'il fait, et une chose que vous aimez ici.", wordMin: 25, wordMax: 40 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF A1 — Petite annonce : je cherche un vélo",
    prompt: "Écrivez une annonce simple et claire.",
    difficulty: "CORE", topicTag: "vie-pratique",
    payload: { situation: "Vous voulez acheter un vélo d'occasion dans votre quartier.", instruction: "Écrivez une annonce pour le panneau du supermarché. Dites ce que vous cherchez, la couleur que vous préférez, votre prix, et comment vous contacter.", wordMin: 25, wordMax: 40 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF A1 — Fiche de la bibliothèque + message",
    prompt: "Remplissez la fiche, puis écrivez un message court.",
    difficulty: "FOUNDATION", topicTag: "vie-pratique",
    payload: { situation: "Vous rendez un livre en retard à la bibliothèque.", instruction: "Écrivez vos informations (nom, prénom, adresse). Puis écrivez un message : dites pardon pour le retard et dites quel jour vous venez.", wordMin: 20, wordMax: 35 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF A1 — Message : mon nouvel appartement",
    prompt: "Décrivez un lieu avec des phrases simples.",
    difficulty: "CORE", topicTag: "logement",
    payload: { situation: "Vous habitez dans un nouvel appartement depuis une semaine.", instruction: "Écrivez un message à un ami. Dites où est l'appartement, combien il y a de pièces, et une chose que vous aimez.", wordMin: 25, wordMax: 40 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF A1 — Invitation à un anniversaire",
    prompt: "Écrivez une invitation courte.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { situation: "C'est votre anniversaire samedi et vous invitez des amis.", instruction: "Écrivez une invitation. Dites le jour, l'heure, l'adresse, et demandez une réponse.", wordMin: 20, wordMax: 35 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF A1 — Message au voisin : le colis",
    prompt: "Écrivez un message simple à un voisin.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { situation: "Votre voisin a reçu un colis pour vous.", instruction: "Écrivez un mot à votre voisin. Dites merci, demandez quand vous pouvez venir chercher le colis, et donnez votre numéro de téléphone.", wordMin: 25, wordMax: 40 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DELF A1 — Fiche au cabinet médical",
    prompt: "Remplissez la fiche, puis écrivez une phrase d'explication.",
    difficulty: "FOUNDATION", topicTag: "sante",
    payload: { situation: "Vous prenez un rendez-vous chez le médecin pour la première fois.", instruction: "Écrivez vos informations (nom, prénom, date de naissance, adresse). Puis écrivez deux phrases : dites pourquoi vous venez et quel jour vous préférez.", wordMin: 20, wordMax: 35 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF A1 — Entretien : parler de sa famille",
    prompt: "Jouez la situation à l'oral, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Parlez de votre famille. Dites combien vous êtes, qui habite avec vous, et ce que vous faites ensemble le week-end.", prepSeconds: 10, speakSeconds: 60 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF A1 — Échange d'informations : à la boulangerie",
    prompt: "Jouez la situation à l'oral, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Vous achetez du pain et deux croissants. Demandez le prix, payez, et dites au revoir.", prepSeconds: 10, speakSeconds: 60 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF A1 — Dialogue simulé : demander son chemin",
    prompt: "Jouez la situation à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "vie-pratique",
    payload: { taskPrompt: "Vous cherchez la gare. Demandez le chemin à une personne dans la rue, dites merci, et répétez la direction pour vérifier.", prepSeconds: 10, speakSeconds: 60 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF A1 — Parler de son travail ou de ses études",
    prompt: "Jouez la situation à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "travail",
    payload: { taskPrompt: "Parlez de votre travail ou de vos études. Dites ce que vous faites, où, et quels jours.", prepSeconds: 10, speakSeconds: 60 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF A1 — Dialogue simulé : prendre un rendez-vous",
    prompt: "Jouez la situation à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "sante",
    payload: { taskPrompt: "Vous téléphonez chez le dentiste. Dites votre nom, demandez un rendez-vous, et proposez un jour et une heure.", prepSeconds: 10, speakSeconds: 60 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF A1 — Parler du temps qu'il fait",
    prompt: "Jouez la situation à l'oral, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Dites le temps qu'il fait aujourd'hui dans votre ville, quelle saison vous préférez, et pourquoi.", prepSeconds: 10, speakSeconds: 60 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF A1 — Échange d'informations : au marché",
    prompt: "Jouez la situation à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Vous achetez des fruits au marché. Demandez le prix d'un kilo de pommes, demandez si c'est cher, et achetez.", prepSeconds: 10, speakSeconds: 60 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF A1 — Parler de ses transports",
    prompt: "Jouez la situation à l'oral, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "vie-pratique",
    payload: { taskPrompt: "Dites comment vous allez au travail ou à l'école : à pied, en bus, en voiture ? Dites combien de temps vous mettez.", prepSeconds: 10, speakSeconds: 60 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF A1 — Dialogue simulé : au guichet du musée",
    prompt: "Jouez la situation à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "loisirs",
    payload: { taskPrompt: "Vous êtes au musée avec un ami. Demandez le prix de deux billets, demandez l'heure de fermeture, et remerciez.", prepSeconds: 10, speakSeconds: 60 },
  },

  // ---------- TEF A1 top-up (Rule #7: 5 -> 15 per expression module) ----------
  // Structure per src/lib/french/exam-structure.ts. TEF is NOT level-specific:
  // one exam placed on the CEFR/NCLC scale, so the task FORMAT is fixed at every
  // level — écrite Section A 80–120 mots, Section B 200–260 mots; orale Section A
  // 300 s (obtain information), Section B 600 s (persuade). Only the topic and the
  // expected register change with the cell's level. At A1 the situations are
  // concrete and everyday; the word counts stay the exam's.
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section A — Message : prévenir d'un retard",
    prompt: "Rédigez le message demandé (Section A).",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { situation: "Votre bus est bloqué et vous arriverez en retard à un rendez-vous.", instruction: "Écrivez un message à la personne qui vous attend. Dites pourquoi vous êtes en retard, à quelle heure vous arrivez, et proposez de la prévenir en arrivant.", wordMin: 80, wordMax: 120 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section A — Courriel : réserver une place au cours de danse",
    prompt: "Rédigez le message demandé (Section A).",
    difficulty: "FOUNDATION", topicTag: "loisirs",
    payload: { situation: "Vous voulez vous inscrire à un cours de danse le mercredi soir.", instruction: "Écrivez un courriel à l'association. Présentez-vous, dites quel cours vous intéresse, demandez le prix et l'heure, et demandez s'il reste de la place.", wordMin: 80, wordMax: 120 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section A — Message : demander un service au voisin",
    prompt: "Rédigez le message demandé (Section A).",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { situation: "Vous partez trois jours et vos plantes ont besoin d'eau.", instruction: "Écrivez un mot à votre voisin. Expliquez votre absence, demandez son aide, dites ce qu'il faut faire, et proposez de le remercier à votre retour.", wordMin: 80, wordMax: 120 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section A — Courriel : changer une commande",
    prompt: "Rédigez le message demandé (Section A).",
    difficulty: "CORE", topicTag: "vie-pratique",
    payload: { situation: "Vous avez commandé une table en ligne mais vous préférez une autre couleur.", instruction: "Écrivez au magasin. Rappelez votre commande, dites ce que vous voulez changer, et demandez si c'est encore possible.", wordMin: 80, wordMax: 120 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section A — Message : proposer de se retrouver",
    prompt: "Rédigez le message demandé (Section A).",
    difficulty: "FOUNDATION", topicTag: "loisirs",
    payload: { situation: "Un ami arrive dans votre ville samedi pour la première fois.", instruction: "Écrivez-lui un message. Proposez un lieu et une heure, expliquez comment y venir, et demandez ce qu'il aimerait visiter.", wordMin: 80, wordMax: 120 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section B — Convaincre : venir habiter dans ma ville",
    prompt: "Rédigez un texte argumenté défendant une position (Section B).",
    difficulty: "CORE", topicTag: "logement",
    payload: { situation: "Un ami hésite entre votre ville et une autre pour s'installer.", instruction: "Écrivez-lui pour le convaincre de choisir votre ville. Donnez au moins trois raisons concrètes (transports, prix, vie quotidienne) et répondez à une inquiétude qu'il pourrait avoir.", wordMin: 200, wordMax: 260 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section B — Convaincre : faire du sport ensemble",
    prompt: "Rédigez un texte argumenté défendant une position (Section B).",
    difficulty: "CORE", topicTag: "loisirs",
    payload: { situation: "Votre ami dit qu'il n'a pas le temps de faire du sport.", instruction: "Écrivez-lui pour le convaincre de commencer avec vous. Expliquez les avantages, proposez un moment précis dans la semaine, et montrez que c'est possible malgré son emploi du temps.", wordMin: 200, wordMax: 260 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section B — Convaincre : cuisiner plutôt qu'acheter",
    prompt: "Rédigez un texte argumenté défendant une position (Section B).",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { situation: "Un ami achète tous ses repas déjà préparés.", instruction: "Écrivez-lui pour le convaincre de cuisiner lui-même. Parlez du prix, du goût et de la santé, donnez un exemple de repas simple, et répondez à l'argument du manque de temps.", wordMin: 200, wordMax: 260 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section B — Convaincre : apprendre le français en classe",
    prompt: "Rédigez un texte argumenté défendant une position (Section B).",
    difficulty: "CORE", topicTag: "etudes",
    payload: { situation: "Une amie veut apprendre le français seule avec une application.", instruction: "Écrivez-lui pour défendre le cours en classe. Donnez vos raisons, reconnaissez un avantage de l'application, et expliquez pourquoi la classe reste utile.", wordMin: 200, wordMax: 260 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section B — Convaincre : prendre le train plutôt que la voiture",
    prompt: "Rédigez un texte argumenté défendant une position (Section B).",
    difficulty: "CORE", topicTag: "vie-pratique",
    payload: { situation: "Votre famille veut partir en voiture pour un long voyage.", instruction: "Écrivez pour proposer le train. Donnez des arguments (fatigue, prix, temps, environnement), et répondez à l'objection des bagages.", wordMin: 200, wordMax: 260 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section A — Se renseigner : un cours de natation",
    prompt: "Posez le maximum de questions utiles (Section A), puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "loisirs",
    payload: { taskPrompt: "Vous avez vu une annonce pour des cours de natation. Téléphonez et posez le maximum de questions : jours, horaires, prix, niveau demandé, matériel à apporter, et comment s'inscrire.", prepSeconds: 60, speakSeconds: 300 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section A — Se renseigner : un appartement à louer",
    prompt: "Posez le maximum de questions utiles (Section A), puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "logement",
    payload: { taskPrompt: "Une annonce propose un appartement à louer. Appelez le propriétaire et posez le maximum de questions : le loyer, les charges, le nombre de pièces, l'étage, les transports à côté, et quand on peut le visiter.", prepSeconds: 60, speakSeconds: 300 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section A — Se renseigner : une place en crèche",
    prompt: "Posez le maximum de questions utiles (Section A), puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "vie-pratique",
    payload: { taskPrompt: "Vous cherchez une place en crèche pour votre enfant. Téléphonez et posez le maximum de questions : les horaires, le prix, les documents nécessaires, les repas, et le délai d'attente.", prepSeconds: 60, speakSeconds: 300 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section A — Se renseigner : un vélo d'occasion",
    prompt: "Posez le maximum de questions utiles (Section A), puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "vie-pratique",
    payload: { taskPrompt: "Quelqu'un vend un vélo d'occasion. Appelez et posez le maximum de questions : l'âge du vélo, la taille, l'état des freins, le prix, et où le voir.", prepSeconds: 60, speakSeconds: 300 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section A — Se renseigner : un stage de cuisine",
    prompt: "Posez le maximum de questions utiles (Section A), puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "loisirs",
    payload: { taskPrompt: "Une école propose un stage de cuisine pendant les vacances. Renseignez-vous : les dates, la durée, le prix, le nombre de participants, ce qu'on cuisine, et s'il faut apporter du matériel.", prepSeconds: 60, speakSeconds: 300 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section B — Persuader : venir au marché du samedi",
    prompt: "Présentez et convainquez votre interlocuteur (Section B), puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Vous voulez emmener un ami au marché du samedi matin. Présentez-lui le marché et convainquez-le de venir : ce qu'on y trouve, les prix, l'ambiance. Il préfère dormir le samedi — répondez à cette objection.", prepSeconds: 60, speakSeconds: 600 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section B — Persuader : s'inscrire à la bibliothèque",
    prompt: "Présentez et convainquez votre interlocuteur (Section B), puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "etudes",
    payload: { taskPrompt: "Convainquez un ami de s'inscrire à la bibliothèque de quartier. Présentez ce qu'on y trouve et ce que ça coûte. Il pense qu'il n'a pas le temps de lire — montrez-lui d'autres usages possibles.", prepSeconds: 60, speakSeconds: 600 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section B — Persuader : partager une voiture pour aller au travail",
    prompt: "Présentez et convainquez votre interlocuteur (Section B), puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "travail",
    payload: { taskPrompt: "Un collègue habite près de chez vous. Proposez-lui de partager la voiture pour aller au travail et convainquez-le : le prix, le stationnement, la fatigue. Il craint de dépendre de vos horaires — rassurez-le.", prepSeconds: 60, speakSeconds: 600 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section B — Persuader : visiter un parc plutôt qu'un centre commercial",
    prompt: "Présentez et convainquez votre interlocuteur (Section B), puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "loisirs",
    payload: { taskPrompt: "Vous préférez passer dimanche dans un parc, votre ami veut aller au centre commercial. Présentez le parc et convainquez-le. Il dit qu'il fera peut-être froid — proposez une solution.", prepSeconds: 60, speakSeconds: 600 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section B — Persuader : essayer un cours de français le soir",
    prompt: "Présentez et convainquez votre interlocuteur (Section B), puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "etudes",
    payload: { taskPrompt: "Présentez à un ami le cours de français du soir que vous suivez et convainquez-le de s'inscrire : le rythme, le groupe, les progrès. Il trouve que c'est cher — répondez à cet argument.", prepSeconds: 60, speakSeconds: 600 },
  },

  // ---------- TCF A1 top-up (Rule #7: 5 -> 15 per expression module) ----------
  // Fixed TCF format (src/lib/french/exam-structure.ts), level-independent:
  // écrite T1 60–120 / T2 120–150 / T3 120–180; orale T1 prep 0 speak 120 (entretien
  // guidé), T2 prep 120 speak 210 (interaction, 8–12 questions), T3 prep 0 speak 270
  // (point de vue). Each module carries all three tâches. A1 shifts topic only.
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF Tâche 1 — Message : remercier après un dîner",
    prompt: "Rédigez le message demandé (Tâche 1).",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { situation: "Des amis vous ont invité à dîner chez eux samedi.", instruction: "Écrivez-leur un message. Remerciez-les, dites ce que vous avez aimé pendant la soirée, donnez des nouvelles de votre retour, et proposez de les recevoir chez vous.", wordMin: 60, wordMax: 120 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF Tâche 1 — Message : donner de ses nouvelles",
    prompt: "Rédigez le message demandé (Tâche 1).",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { situation: "Vous habitez dans une nouvelle ville depuis un mois.", instruction: "Écrivez à un ami resté loin. Dites où vous habitez, parlez de votre travail ou de vos cours, décrivez une habitude nouvelle, et demandez de ses nouvelles.", wordMin: 60, wordMax: 120 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF Tâche 1 — Message : organiser un pique-nique",
    prompt: "Rédigez le message demandé (Tâche 1).",
    difficulty: "CORE", topicTag: "loisirs",
    payload: { situation: "Vous organisez un pique-nique dimanche avec des amis.", instruction: "Écrivez le message d'organisation. Donnez le lieu et l'heure, dites comment y aller, répartissez ce que chacun apporte, et demandez qui vient.", wordMin: 60, wordMax: 120 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF Tâche 2 — Courriel : demander un renseignement à une mairie",
    prompt: "Rédigez le texte demandé (Tâche 2).",
    difficulty: "CORE", topicTag: "vie-pratique",
    payload: { situation: "Vous voulez inscrire votre enfant à l'école de votre quartier.", instruction: "Écrivez un courriel à la mairie. Présentez-vous, indiquez l'âge de votre enfant et votre adresse, demandez les documents nécessaires et les dates d'inscription, et demandez s'il faut prendre rendez-vous.", wordMin: 120, wordMax: 150 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF Tâche 2 — Courriel : réserver une activité de groupe",
    prompt: "Rédigez le texte demandé (Tâche 2).",
    difficulty: "CORE", topicTag: "loisirs",
    payload: { situation: "Vous voulez réserver une visite guidée pour huit personnes.", instruction: "Écrivez au service des visites. Indiquez le nombre de participants et les dates possibles, demandez la durée et le prix, signalez qu'une personne se déplace difficilement, et demandez comment payer.", wordMin: 120, wordMax: 150 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF Tâche 2 — Article : présenter son quartier au journal du club",
    prompt: "Rédigez le texte demandé (Tâche 2).",
    difficulty: "CORE", topicTag: "logement",
    payload: { situation: "Le journal de votre club demande à chaque membre de présenter son quartier.", instruction: "Écrivez un court article. Situez le quartier, décrivez ce qu'on y trouve, parlez des transports, racontez un moment agréable que vous y avez vécu, et dites à qui vous le conseillez.", wordMin: 120, wordMax: 150 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF Tâche 3 — Comparer : la ville ou le village",
    prompt: "Comparez les deux points de vue puis donnez le vôtre (Tâche 3).",
    difficulty: "CORE", topicTag: "societe",
    payload: { situation: "Un ami dit : « En ville, on trouve tout. » Un autre répond : « Au village, on vit mieux. »", instruction: "Présentez les deux points de vue, dites ce que chacun a de vrai, puis donnez votre position et expliquez-la avec un exemple de votre vie.", wordMin: 120, wordMax: 180 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF Tâche 3 — Comparer : cuisiner ou manger dehors",
    prompt: "Comparez les deux points de vue puis donnez le vôtre (Tâche 3).",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { situation: "Certains disent qu'il vaut mieux cuisiner à la maison ; d'autres préfèrent manger au restaurant.", instruction: "Présentez les deux avis avec leurs raisons, puis donnez le vôtre. Parlez du prix, du temps et du plaisir, et donnez un exemple concret.", wordMin: 120, wordMax: 180 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF Tâche 3 — Comparer : travailler seul ou en groupe",
    prompt: "Comparez les deux points de vue puis donnez le vôtre (Tâche 3).",
    difficulty: "CORE", topicTag: "etudes",
    payload: { situation: "Dans votre cours, certains préfèrent travailler seuls, d'autres en groupe.", instruction: "Présentez les avantages de chaque façon de faire, puis dites ce que vous préférez et pourquoi, avec un exemple tiré de votre expérience.", wordMin: 120, wordMax: 180 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF Tâche 3 — Comparer : apprendre avec un professeur ou seul",
    prompt: "Comparez les deux points de vue puis donnez le vôtre (Tâche 3).",
    difficulty: "CORE", topicTag: "etudes",
    payload: { situation: "Une amie apprend le français seule ; une autre suit des cours.", instruction: "Présentez les deux façons d'apprendre et ce qu'elles apportent, puis donnez votre position et justifiez-la par votre propre expérience.", wordMin: 120, wordMax: 180 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 1 — Entretien guidé : votre logement",
    prompt: "Répondez à l'entretien guidé (Tâche 1), puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "logement",
    payload: { taskPrompt: "Parlez de votre logement : où il se trouve, combien il y a de pièces, avec qui vous habitez, et ce que vous aimez chez vous.", prepSeconds: 0, speakSeconds: 120 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 1 — Entretien guidé : vos loisirs",
    prompt: "Répondez à l'entretien guidé (Tâche 1), puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "loisirs",
    payload: { taskPrompt: "Parlez de ce que vous faites pendant votre temps libre : vos activités, avec qui, quand, et pourquoi vous les aimez.", prepSeconds: 0, speakSeconds: 120 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 1 — Entretien guidé : vos repas",
    prompt: "Répondez à l'entretien guidé (Tâche 1), puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Parlez de vos repas : ce que vous mangez le matin, à midi et le soir, qui cuisine chez vous, et votre plat préféré.", prepSeconds: 0, speakSeconds: 120 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 2 — Interaction : se renseigner sur un cours de sport",
    prompt: "Posez 8 à 12 questions dans l'échange (Tâche 2), puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "loisirs",
    payload: { taskPrompt: "Vous voulez vous inscrire à un cours de sport. Posez entre 8 et 12 questions : les jours, les horaires, le prix, le niveau demandé, la tenue, le nombre de participants, le lieu exact, et comment s'inscrire.", prepSeconds: 120, speakSeconds: 210 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 2 — Interaction : louer un appartement",
    prompt: "Posez 8 à 12 questions dans l'échange (Tâche 2), puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "logement",
    payload: { taskPrompt: "Vous visitez un appartement à louer. Posez entre 8 et 12 questions : le loyer, les charges, le nombre de pièces, l'étage, le chauffage, les transports à côté, la date libre, et les documents demandés.", prepSeconds: 120, speakSeconds: 210 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 2 — Interaction : à la poste",
    prompt: "Posez 8 à 12 questions dans l'échange (Tâche 2), puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "vie-pratique",
    payload: { taskPrompt: "Vous voulez envoyer un colis dans un autre pays. Posez entre 8 et 12 questions : le prix, le délai, le poids maximum, l'emballage, le suivi, l'assurance, ce qui est interdit, et les horaires du bureau.", prepSeconds: 120, speakSeconds: 210 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 3 — Point de vue : les transports en ville",
    prompt: "Exprimez et défendez un point de vue (Tâche 3), puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "societe",
    payload: { taskPrompt: "Vaut-il mieux se déplacer en bus, à vélo ou en voiture dans une ville ? Donnez votre point de vue, expliquez vos raisons, et donnez des exemples de votre vie quotidienne.", prepSeconds: 0, speakSeconds: 270 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 3 — Point de vue : vivre près ou loin du travail",
    prompt: "Exprimez et défendez un point de vue (Tâche 3), puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "travail",
    payload: { taskPrompt: "Est-il préférable d'habiter près de son travail, même dans un logement plus petit, ou plus loin dans un logement plus grand ? Donnez votre avis et justifiez-le.", prepSeconds: 0, speakSeconds: 270 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 3 — Point de vue : le téléphone au quotidien",
    prompt: "Exprimez et défendez un point de vue (Tâche 3), puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "societe",
    payload: { taskPrompt: "Le téléphone rend-il la vie plus simple ou plus compliquée ? Donnez votre point de vue et illustrez-le avec des exemples de votre journée.", prepSeconds: 0, speakSeconds: 270 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 3 — Point de vue : faire ses courses au marché",
    prompt: "Exprimez et défendez un point de vue (Tâche 3), puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Est-il mieux de faire ses courses au marché ou au supermarché ? Donnez votre point de vue en parlant du prix, de la qualité et du temps, avec des exemples.", prepSeconds: 0, speakSeconds: 270 },
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
  console.log(`seed:a1 — ${created} created, ${ITEMS.length - created} already present`);
}

if (isDirectRun(import.meta.url)) {
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(() => prisma.$disconnect());
}
