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
        { id: "q1", kind: "mcq", stem: "À quelle heure est le rendez-vous ?", options: [{ id: "a", text: "4 h" }, { id: "b", text: "14 h" }, { id: "c", text: "40 h" }], answer: "b" },
        { id: "q2", kind: "mcq", stem: "Où est le rendez-vous ?", options: [{ id: "a", text: "Au café" }, { id: "b", text: "À la gare" }, { id: "c", text: "À la maison" }], answer: "a" },
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
        { id: "q1", kind: "mcq", stem: "Quel âge a Léa ?", options: [{ id: "a", text: "10 ans" }, { id: "b", text: "20 ans" }, { id: "c", text: "12 ans" }], answer: "b" },
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
        { id: "q2", kind: "mcq", stem: "Quel fruit est sur la liste ?", options: [{ id: "a", text: "Des pommes" }, { id: "b", text: "Des bananes" }, { id: "c", text: "Des oranges" }], answer: "a" },
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
        { id: "q1", kind: "mcq", stem: "Combien coûte le menu enfant ?", options: [{ id: "a", text: "8 €" }, { id: "b", text: "18 €" }, { id: "c", text: "80 €" }], answer: "a" },
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
        { id: "q1", kind: "mcq", stem: "Quel est le numéro du bus ?", options: [{ id: "a", text: "5" }, { id: "b", text: "8" }, { id: "c", text: "15" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "À quelle heure part le premier bus ?", options: [{ id: "a", text: "8 h" }, { id: "b", text: "10 h" }, { id: "c", text: "12 h" }], answer: "a" },
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
        { id: "q2", kind: "mcq", stem: "Quand veut-il se voir ?", options: [{ id: "a", text: "Demain" }, { id: "b", text: "Ce soir" }, { id: "c", text: "Lundi" }], answer: "a" },
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
        { id: "q1", kind: "mcq", stem: "Quel est le prénom ?", options: [{ id: "a", text: "Julie" }, { id: "b", text: "Dupont" }, { id: "c", text: "Lyon" }], answer: "a" },
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
        { id: "q1", kind: "mcq", stem: "Combien coûte un café ?", options: [{ id: "a", text: "2 €" }, { id: "b", text: "3 €" }, { id: "c", text: "1,50 €" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "Quelle est la boisson la plus chère ?", options: [{ id: "a", text: "Le jus d'orange" }, { id: "b", text: "Le café" }, { id: "c", text: "L'eau" }], answer: "a" },
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
        { id: "q2", kind: "mcq", stem: "Qu'est-ce qu'il aime ?", options: [{ id: "a", text: "Le football et la musique" }, { id: "b", text: "Le cinéma" }, { id: "c", text: "La cuisine" }], answer: "a" },
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
        { id: "q1", kind: "mcq", stem: "Quel jour est la fête ?", options: [{ id: "a", text: "Samedi 15 juin" }, { id: "b", text: "Dimanche 15 juin" }, { id: "c", text: "Samedi 5 juin" }], answer: "a" },
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
        { id: "q2", stem: "Où habite-t-elle ?", options: [{ id: "a", text: "À Toulouse" }, { id: "b", text: "À Paris" }, { id: "c", text: "À Lyon" }], answer: "a" },
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
        { id: "q1", stem: "Qu'achète la cliente ?", options: [{ id: "a", text: "Une baguette" }, { id: "b", text: "Un croissant" }, { id: "c", text: "Un gâteau" }], answer: "a" },
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
        { id: "q1", stem: "Quelle heure est-il ?", options: [{ id: "a", text: "Trois heures et demie" }, { id: "b", text: "Deux heures" }, { id: "c", text: "Quatre heures" }], answer: "a" },
        { id: "q2", stem: "Que dit la personne à la fin ?", options: [{ id: "a", text: "Merci beaucoup" }, { id: "b", text: "Bonne nuit" }, { id: "c", text: "Au revoir" }], answer: "a" },
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
        { id: "q2", stem: "À quelle heure rentre Marie ?", options: [{ id: "a", text: "À six heures" }, { id: "b", text: "À deux heures" }, { id: "c", text: "À dix heures" }], answer: "a" },
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
        { id: "q1", stem: "Que commande le client ?", options: [{ id: "a", text: "Un café" }, { id: "b", text: "Un thé" }, { id: "c", text: "Une eau" }], answer: "a" },
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
        { id: "q1", stem: "Quel cours est annulé ?", options: [{ id: "a", text: "Le cours de musique" }, { id: "b", text: "Le cours de sport" }, { id: "c", text: "Le cours de maths" }], answer: "a" },
        { id: "q2", stem: "À quelle heure rentrent les élèves ?", options: [{ id: "a", text: "À 15 h" }, { id: "b", text: "À 17 h" }, { id: "c", text: "À 13 h" }], answer: "a" },
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
        { id: "q2", stem: "Quel est le métier du père ?", options: [{ id: "a", text: "Cuisinier" }, { id: "b", text: "Médecin" }, { id: "c", text: "Professeur" }], answer: "a" },
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
        { id: "q1", stem: "Quel temps fait-il aujourd'hui ?", options: [{ id: "a", text: "Il fait beau" }, { id: "b", text: "Il pleut" }, { id: "c", text: "Il neige" }], answer: "a" },
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
        { id: "q1", stem: "Qu'achète la cliente ?", options: [{ id: "a", text: "Des pommes" }, { id: "b", text: "Des oranges" }, { id: "c", text: "Des poires" }], answer: "a" },
        { id: "q2", stem: "Combien paie-t-elle ?", options: [{ id: "a", text: "Deux euros" }, { id: "b", text: "Dix euros" }, { id: "c", text: "Douze euros" }], answer: "a" },
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
        { id: "q2", stem: "À quelle heure ?", options: [{ id: "a", text: "À 20 h" }, { id: "b", text: "À 10 h" }, { id: "c", text: "À 12 h" }], answer: "a" },
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
        { id: "q1", stem: "Quelle est la prochaine station ?", options: [{ id: "a", text: "Opéra" }, { id: "b", text: "Bastille" }, { id: "c", text: "Nation" }], answer: "a" },
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
        { id: "q1", stem: "Combien coûte le livre ?", options: [{ id: "a", text: "Douze euros" }, { id: "b", text: "Deux euros" }, { id: "c", text: "Vingt euros" }], answer: "a" },
        { id: "q2", stem: "Que décide le client ?", options: [{ id: "a", text: "Il prend le livre" }, { id: "b", text: "Il part" }, { id: "c", text: "Il revient demain" }], answer: "a" },
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
        { id: "q2", stem: "Qui laisse le message ?", options: [{ id: "a", text: "Le cabinet du docteur" }, { id: "b", text: "La banque" }, { id: "c", text: "L'école" }], answer: "a" },
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
        { id: "q1", stem: "Que demande le client ?", options: [{ id: "a", text: "L'addition" }, { id: "b", text: "Le menu" }, { id: "c", text: "Un café" }], answer: "a" },
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
        { id: "q1", stem: "Quels jours Max travaille-t-il ?", options: [{ id: "a", text: "Du lundi au vendredi" }, { id: "b", text: "Le week-end" }, { id: "c", text: "Tous les jours" }], answer: "a" },
        { id: "q2", stem: "À quelle heure commence-t-il ?", options: [{ id: "a", text: "À neuf heures" }, { id: "b", text: "À sept heures" }, { id: "c", text: "À onze heures" }], answer: "a" },
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
        { id: "q2", stem: "De quelle voie part le train ?", options: [{ id: "a", text: "Voie 3" }, { id: "b", text: "Voie 13" }, { id: "c", text: "Voie 2" }], answer: "a" },
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
    title: "TEF — Petit mot : dire bonjour",
    prompt: "Écrivez un petit message.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { situation: "Vous arrivez dans un nouvel appartement.", instruction: "Écrivez un petit mot à vos voisins pour vous présenter : votre nom, d'où vous venez et que vous êtes content d'être là.", wordMin: 20, wordMax: 35 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF — Carte postale courte",
    prompt: "Écrivez une carte postale.",
    difficulty: "FOUNDATION", topicTag: "voyages",
    payload: { situation: "Vous êtes en vacances à la mer.", instruction: "Écrivez une carte postale à un ami : dites où vous êtes, quel temps il fait et que vous êtes content.", wordMin: 20, wordMax: 35 },
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
    title: "TEF — Inviter un ami",
    prompt: "Écrivez le message demandé.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { situation: "C'est votre anniversaire samedi.", instruction: "Écrivez un message court pour inviter un ami : dites le jour, l'heure et le lieu.", wordMin: 20, wordMax: 35 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF — Se présenter par écrit",
    prompt: "Écrivez un court texte.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { situation: "Vous écrivez sur le site d'un club de sport.", instruction: "Présentez-vous : votre nom, votre âge, votre ville et le sport que vous aimez.", wordMin: 20, wordMax: 35 },
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
    title: "TEF — Courriel : demander l'heure d'un cours",
    prompt: "Écrivez le courriel demandé.",
    difficulty: "CORE", topicTag: "education",
    payload: { situation: "Vous voulez suivre un cours de français.", instruction: "Écrivez un courriel très simple à l'école : saluez, demandez le jour et l'heure du cours, dites merci.", wordMin: 20, wordMax: 35 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF — Petit mot : je suis en retard",
    prompt: "Écrivez le message demandé.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { situation: "Vous arrivez en retard à un rendez-vous avec un ami.", instruction: "Écrivez un message court : dites que vous êtes en retard, de combien de minutes, et demandez de vous attendre.", wordMin: 15, wordMax: 30 },
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
    title: "TEF — Petit message : annuler un café",
    prompt: "Écrivez le message demandé.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { situation: "Vous ne pouvez pas prendre un café avec un ami cet après-midi.", instruction: "Écrivez un message court : dites que vous ne pouvez pas venir, pourquoi, et proposez demain.", wordMin: 20, wordMax: 35 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF — Décrire sa chambre",
    prompt: "Écrivez un court texte.",
    difficulty: "FOUNDATION", topicTag: "habitat",
    payload: { situation: "Vous montrez une photo de votre chambre à un ami.", instruction: "Écrivez quelques phrases pour décrire votre chambre : ce qu'il y a dedans et la couleur.", wordMin: 20, wordMax: 35 },
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
    title: "TEF — Message : où es-tu ?",
    prompt: "Écrivez le message demandé.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { situation: "Vous attendez un ami au cinéma, mais il n'est pas là.", instruction: "Écrivez un message court : demandez où il est et dites où vous attendez.", wordMin: 15, wordMax: 30 },
  },
  {
    level: "A1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF — Petit mot : laisser la clé",
    prompt: "Écrivez le message demandé.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { situation: "Vous partez avant le retour de votre colocataire.", instruction: "Écrivez un petit mot : dites où vous allez, à quelle heure vous rentrez et où est la clé.", wordMin: 20, wordMax: 35 },
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
    title: "TEF — Acheter du pain",
    prompt: "Jouez la situation à l'oral, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "commerces",
    payload: { taskPrompt: "Vous êtes à la boulangerie. Vous voulez une baguette et un croissant. Saluez, demandez, demandez le prix et payez.", prepSeconds: 10, speakSeconds: 60 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF — Parler de soi",
    prompt: "Répondez à l'oral, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Parlez de vous : votre nom, votre âge, votre ville, et une chose que vous aimez faire.", prepSeconds: 10, speakSeconds: 60 },
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
    title: "TEF — Demander l'heure et le chemin",
    prompt: "Jouez la situation à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "vie-pratique",
    payload: { taskPrompt: "Vous êtes dans la rue. Demandez à un passant l'heure et où se trouve la gare. Dites merci.", prepSeconds: 10, speakSeconds: 60 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF — Décrire sa famille",
    prompt: "Répondez à l'oral, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Parlez de votre famille : combien vous êtes, qui sont vos parents, si vous avez des frères ou des sœurs.", prepSeconds: 10, speakSeconds: 60 },
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
    title: "TEF — Acheter un billet de bus",
    prompt: "Jouez la situation à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "transports",
    payload: { taskPrompt: "Vous voulez un billet de bus. Demandez le prix, dites où vous allez et demandez à quelle heure part le bus.", prepSeconds: 10, speakSeconds: 60 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF — Parler de ses goûts",
    prompt: "Répondez à l'oral, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "loisirs",
    payload: { taskPrompt: "Dites ce que vous aimez et ce que vous n'aimez pas : une nourriture, un sport, une couleur, une saison.", prepSeconds: 10, speakSeconds: 60 },
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
    title: "TEF — Au magasin : demander un prix",
    prompt: "Jouez la situation à l'oral, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "commerces",
    payload: { taskPrompt: "Vous voulez acheter un tee-shirt. Demandez le prix, la taille et la couleur. Dites si vous le prenez.", prepSeconds: 10, speakSeconds: 60 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF — Parler de sa ville",
    prompt: "Répondez à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Parlez de votre ville : son nom, si elle est grande ou petite, et une chose que vous aimez y faire.", prepSeconds: 10, speakSeconds: 60 },
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
    title: "TEF — Réserver une table simple",
    prompt: "Jouez la situation à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Vous téléphonez à un restaurant. Demandez une table pour deux personnes ce soir et dites à quelle heure vous voulez venir.", prepSeconds: 10, speakSeconds: 60 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF — Parler de sa journée",
    prompt: "Répondez à l'oral, puis tapez votre transcription.",
    difficulty: "FOUNDATION", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Décrivez votre journée : à quelle heure vous vous levez, ce que vous mangez le matin, et ce que vous faites l'après-midi.", prepSeconds: 10, speakSeconds: 60 },
  },
  {
    level: "A1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DELF A1 — Inviter un ami",
    prompt: "Jouez la situation à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "vie-quotidienne",
    payload: { taskPrompt: "Vous voulez inviter un ami à manger chez vous. Dites quel jour, à quelle heure, et ce que vous allez préparer.", prepSeconds: 10, speakSeconds: 60 },
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
