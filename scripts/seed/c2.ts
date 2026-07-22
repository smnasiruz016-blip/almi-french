// C2 wave — original French items at the mastery register (dense argumentative,
// academic and literary prose; implicit meaning, authorial stance, nuanced lexis and
// connectors; DALF C2 long-form productive tasks). Never translated from German, never
// copied from CCI Paris or France Éducation International. Reading/Listening are SHARED
// (examFamily null); Writing/Speaking carry an examFamily. ~16 items per skill.
//
// Run: npm run seed:c2   (needs DATABASE_URL set)

import { PrismaClient, Prisma } from "@prisma/client";
import { isDirectRun } from "./_entry";

const prisma = new PrismaClient();

export const ITEMS: Prisma.FrenchItemCreateManyInput[] = [
  // ---------- Compréhension écrite (Reading) — shared ----------
  {
    level: "C2", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Essai : la mémoire et l'oubli",
    prompt: "Lisez l'extrait et répondez aux questions.",
    difficulty: "CORE", topicTag: "philosophie",
    payload: {
      passages: [{ id: "p1", body: "On célèbre volontiers la mémoire comme une vertu et l'on tient l'oubli pour une défaillance. Or rien n'est plus discutable. Une mémoire qui retiendrait tout, sans hiérarchie ni effacement, ne serait pas une mémoire mais un fardeau : l'esprit y serait submergé par la masse indistincte du passé. L'oubli n'est donc pas l'envers de la mémoire ; il en est la condition de possibilité. Se souvenir, c'est d'abord trier, et trier suppose de laisser tomber. Loin d'être une perte, l'oubli est le travail silencieux qui rend le souvenir pensable." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Quelle est la thèse centrale de l'auteur ?", options: [{ id: "a", text: "L'oubli est une condition de la mémoire" }, { id: "b", text: "La mémoire doit tout retenir" }, { id: "c", text: "L'oubli est toujours une défaillance" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "Que signifie l'expression « le travail silencieux » à la fin du texte ?", options: [{ id: "a", text: "Un processus discret mais nécessaire" }, { id: "b", text: "Une activité bruyante" }, { id: "c", text: "Un effort volontaire et conscient" }], answer: "a" },
      ],
    },
  },
  {
    level: "C2", skill: "COMPREHENSION_ECRITE", taskType: "VRAI_FAUX", examFamily: null,
    title: "Chronique : l'illusion de la neutralité technique",
    prompt: "Lisez la chronique et indiquez si chaque affirmation est vraie ou fausse, en vous appuyant sur le texte.",
    difficulty: "STRETCH", topicTag: "societe",
    payload: {
      passages: [{ id: "p1", body: "L'idée selon laquelle une technique serait en soi neutre, et que seuls comptent les usages qu'on en fait, a la commodité des évidences. Elle dispense de s'interroger sur ce que l'outil, par sa forme même, rend probable ou improbable. Or un dispositif n'est jamais une page blanche : il oriente, incite, décourage. Prétendre qu'il attend passivement nos intentions, c'est ignorer qu'il les façonne en amont. La neutralité affichée n'est pas une absence de parti pris ; elle en est le déguisement le plus efficace." }],
      questions: [
        { id: "q1", kind: "truefalse", stem: "Selon l'auteur, une technique oriente les usages avant même qu'on en décide.", answer: "true" },
        { id: "q2", kind: "truefalse", stem: "L'auteur défend l'idée que la technique est réellement neutre.", answer: "false" },
      ],
    },
  },
  {
    level: "C2", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Critique littéraire : le silence du narrateur",
    prompt: "Lisez l'extrait et répondez.",
    difficulty: "STRETCH", topicTag: "litterature",
    payload: {
      passages: [{ id: "p1", body: "Ce qui frappe dans ce roman, ce n'est pas ce que le narrateur dit, mais l'ampleur de ce qu'il tait. Les silences y sont si calculés qu'ils deviennent éloquents : chaque ellipse oblige le lecteur à combler le vide, à devenir, malgré lui, coauteur du récit. L'auteur ne nous épargne pas l'inconfort de l'incertitude ; il en fait son matériau. On sort de ces pages avec le sentiment d'avoir compris davantage que ce qui était écrit, et c'est précisément là que réside sa réussite." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Qu'est-ce qui caractérise le roman selon le critique ?", options: [{ id: "a", text: "L'importance de ce qui n'est pas dit" }, { id: "b", text: "L'abondance des descriptions" }, { id: "c", text: "La clarté des explications du narrateur" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "Quel rôle le lecteur est-il amené à jouer ?", options: [{ id: "a", text: "Celui de coauteur qui comble les vides" }, { id: "b", text: "Celui d'un spectateur passif" }, { id: "c", text: "Celui d'un correcteur du texte" }], answer: "a" },
      ],
    },
  },
  {
    level: "C2", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Tribune : croissance et sobriété",
    prompt: "Lisez la tribune et répondez.",
    difficulty: "CORE", topicTag: "ecologie",
    payload: {
      passages: [{ id: "p1", body: "Opposer la sobriété à la prospérité relève d'un malentendu tenace. On présente volontiers toute modération de la consommation comme un renoncement, voire un appauvrissement consenti. Mais cette équivalence entre quantité de biens et qualité de vie ne va nullement de soi. Réduire le superflu n'est pas se priver de l'essentiel ; c'est parfois le redécouvrir. La véritable question n'est pas de savoir si nous consommerons moins, mais selon quels critères nous redéfinirons ce qui compte. À cet égard, la sobriété n'est pas une contrainte subie : elle peut être un choix lucide." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Quel « malentendu » l'auteur dénonce-t-il ?", options: [{ id: "a", text: "Confondre la quantité de biens et la qualité de vie" }, { id: "b", text: "Croire que la sobriété est un choix lucide" }, { id: "c", text: "Penser que l'essentiel est superflu" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "Comment l'auteur présente-t-il la sobriété en conclusion ?", options: [{ id: "a", text: "Comme un choix possible plutôt qu'une contrainte subie" }, { id: "b", text: "Comme un appauvrissement inévitable" }, { id: "c", text: "Comme un renoncement à l'essentiel" }], answer: "a" },
      ],
    },
  },
  {
    level: "C2", skill: "COMPREHENSION_ECRITE", taskType: "VRAI_FAUX", examFamily: null,
    title: "Article : l'histoire et ses récits",
    prompt: "Lisez l'article et indiquez vrai ou faux, d'après le texte.",
    difficulty: "STRETCH", topicTag: "histoire",
    payload: {
      passages: [{ id: "p1", body: "L'historien n'exhume pas le passé tel qu'il fut, comme on déterrerait un objet intact. Il le reconstruit à partir de traces lacunaires, et toute reconstruction implique des choix : ce que l'on met au premier plan, ce que l'on relègue, ce que l'on relie. Reconnaître cette part de construction n'est pas verser dans le relativisme, où tous les récits se vaudraient. C'est au contraire poser les conditions d'une rigueur : un récit historique se juge à la solidité de ses preuves et à la cohérence de ses inférences, non à sa prétendue transparence." }],
      questions: [
        { id: "q1", kind: "truefalse", stem: "Selon l'auteur, reconnaître la part de construction conduit nécessairement au relativisme.", answer: "false" },
        { id: "q2", kind: "truefalse", stem: "Pour l'auteur, un récit historique se juge notamment à la solidité de ses preuves.", answer: "true" },
      ],
    },
  },
  {
    level: "C2", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Essai : l'attention comme ressource rare",
    prompt: "Lisez l'extrait et répondez.",
    difficulty: "CORE", topicTag: "societe",
    payload: {
      passages: [{ id: "p1", body: "Dans un monde saturé de sollicitations, ce n'est plus l'information qui manque, mais la capacité de s'y arrêter. L'attention est devenue la denrée que tout se dispute, et sa rareté en fait le véritable enjeu de notre temps. Celui qui capte notre regard une seconde a déjà obtenu quelque chose de précieux ; celui qui le retient durablement exerce un pouvoir. Apprendre à choisir ce à quoi l'on prête attention n'est donc pas un raffinement de moraliste : c'est, désormais, une forme élémentaire de liberté." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Selon l'auteur, qu'est-ce qui est devenu rare ?", options: [{ id: "a", text: "La capacité de s'arrêter sur l'information" }, { id: "b", text: "L'information elle-même" }, { id: "c", text: "Les sollicitations" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "Comment l'auteur qualifie-t-il le fait de choisir son attention ?", options: [{ id: "a", text: "Une forme élémentaire de liberté" }, { id: "b", text: "Un raffinement de moraliste" }, { id: "c", text: "Une perte de temps" }], answer: "a" },
      ],
    },
  },
  {
    level: "C2", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Page de fiction : la maison vide",
    prompt: "Lisez l'extrait littéraire et répondez.",
    difficulty: "STRETCH", topicTag: "litterature",
    payload: {
      passages: [{ id: "p1", body: "Elle poussa la porte et la maison lui rendit son silence, intact, comme si trente ans ne s'étaient pas écoulés. Les meubles étaient à leur place, et pourtant tout avait changé : non les choses, mais le regard qu'elle portait sur elles. Ce qui l'avait jadis rassurée la laissait à présent étrangement froide. Elle comprit, sans amertume, qu'on ne revient jamais dans un lieu ; on revient seulement dans le souvenir qu'on s'en est fait, et ce souvenir, lui, ne nous attend pas." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Qu'est-ce qui a réellement changé, selon le passage ?", options: [{ id: "a", text: "Le regard du personnage, non les objets" }, { id: "b", text: "La disposition des meubles" }, { id: "c", text: "Le silence de la maison" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "Quelle réflexion le personnage tire-t-il de sa visite ?", options: [{ id: "a", text: "On revient dans un souvenir, jamais dans un lieu" }, { id: "b", text: "Les lieux nous attendent fidèlement" }, { id: "c", text: "Le passé peut être retrouvé intact" }], answer: "a" },
      ],
    },
  },
  {
    level: "C2", skill: "COMPREHENSION_ECRITE", taskType: "VRAI_FAUX", examFamily: null,
    title: "Analyse : démocratie et délibération",
    prompt: "Lisez l'analyse et indiquez vrai ou faux, d'après le texte.",
    difficulty: "STRETCH", topicTag: "politique",
    payload: {
      passages: [{ id: "p1", body: "On réduit trop souvent la démocratie au seul moment du vote, comme si compter les voix suffisait à fonder la légitimité d'une décision. Or le suffrage n'est que l'aboutissement d'un processus dont la délibération constitue le cœur. Une majorité qui ne s'est formée qu'au terme d'un débat tronqué, où les arguments minoritaires n'ont pu être entendus, ne tire pas du nombre une autorité supplémentaire. La force d'une décision démocratique ne tient pas seulement à ceux qui l'approuvent, mais à la qualité des échanges qui l'ont précédée." }],
      questions: [
        { id: "q1", kind: "truefalse", stem: "Selon l'auteur, le vote suffit à fonder la légitimité d'une décision.", answer: "false" },
        { id: "q2", kind: "truefalse", stem: "L'auteur accorde une importance déterminante à la qualité de la délibération.", answer: "true" },
      ],
    },
  },
  {
    level: "C2", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Essai : l'expert et le profane",
    prompt: "Lisez l'extrait et répondez.",
    difficulty: "CORE", topicTag: "sciences",
    payload: {
      passages: [{ id: "p1", body: "L'expertise scientifique se trouve aujourd'hui dans une position inconfortable. On lui demande des certitudes là où elle ne peut offrir que des probabilités, et l'on s'indigne ensuite de ses révisions, comme si changer d'avis devant des données nouvelles était un aveu d'incompétence. Pourtant, c'est l'inverse : la capacité à corriger ses conclusions est la marque même de la démarche scientifique. Le malentendu vient de ce que le public attend de la science une autorité dogmatique, quand elle ne peut être qu'une autorité révisable." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Pourquoi le public s'indigne-t-il parfois des révisions scientifiques ?", options: [{ id: "a", text: "Il y voit à tort un aveu d'incompétence" }, { id: "b", text: "Il préfère les probabilités aux certitudes" }, { id: "c", text: "Il refuse toute forme d'autorité" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "Quelle est, selon l'auteur, la marque de la démarche scientifique ?", options: [{ id: "a", text: "La capacité à corriger ses conclusions" }, { id: "b", text: "L'autorité dogmatique" }, { id: "c", text: "Le refus de toute incertitude" }], answer: "a" },
      ],
    },
  },
  {
    level: "C2", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Tribune : la valeur du travail invisible",
    prompt: "Lisez la tribune et répondez.",
    difficulty: "STRETCH", topicTag: "societe",
    payload: {
      passages: [{ id: "p1", body: "Nos économies mesurent avec une précision obsessionnelle ce qui s'échange contre de l'argent, et restent aveugles à tout le reste. Le soin apporté aux proches, l'entretien des liens, l'éducation quotidienne : ces tâches, parce qu'elles ne génèrent aucune transaction, échappent aux statistiques et, par là, à la reconnaissance. On en conclut un peu vite qu'elles ne valent rien. C'est confondre l'absence de prix avec l'absence de valeur. Or une société qui ne sait nommer que ce qu'elle facture finit par négliger ce qui la tient debout." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Quelle confusion l'auteur reproche-t-il à nos économies ?", options: [{ id: "a", text: "Confondre l'absence de prix avec l'absence de valeur" }, { id: "b", text: "Confondre le soin et l'éducation" }, { id: "c", text: "Confondre les statistiques et l'argent" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "Pourquoi le travail de soin échappe-t-il aux statistiques ?", options: [{ id: "a", text: "Parce qu'il ne génère pas de transaction" }, { id: "b", text: "Parce qu'il est mal exécuté" }, { id: "c", text: "Parce qu'il est trop coûteux" }], answer: "a" },
      ],
    },
  },
  {
    level: "C2", skill: "COMPREHENSION_ECRITE", taskType: "VRAI_FAUX", examFamily: null,
    title: "Réflexion : le doute et la conviction",
    prompt: "Lisez le texte et indiquez vrai ou faux, d'après ce qui est écrit.",
    difficulty: "STRETCH", topicTag: "philosophie",
    payload: {
      passages: [{ id: "p1", body: "On oppose d'ordinaire le doute à la conviction, comme la faiblesse à la force. Cette opposition est trompeuse. Une conviction qui n'a jamais affronté le doute n'est pas une force, mais une habitude qui s'ignore. À l'inverse, le doute méthodique n'affaiblit pas la pensée : il l'aguerrit, car il l'oblige à se justifier au lieu de se contenter de s'affirmer. Les convictions les plus solides ne sont pas celles qui n'ont jamais vacillé, mais celles qui, ayant traversé l'épreuve de l'examen, en sont ressorties éclairées." }],
      questions: [
        { id: "q1", kind: "truefalse", stem: "Pour l'auteur, une conviction jamais éprouvée par le doute est une véritable force.", answer: "false" },
        { id: "q2", kind: "truefalse", stem: "Selon le texte, le doute méthodique oblige la pensée à se justifier.", answer: "true" },
      ],
    },
  },
  {
    level: "C2", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Article : la ville et l'anonymat",
    prompt: "Lisez l'article et répondez.",
    difficulty: "CORE", topicTag: "societe",
    payload: {
      passages: [{ id: "p1", body: "On déplore volontiers l'anonymat des grandes villes, où l'on côtoie chaque jour des inconnus sans jamais les connaître. Mais cet anonymat tant décrié a son revers heureux : il offre une liberté que les communautés trop resserrées ne tolèrent guère. Là où chacun se sait observé, la moindre singularité devient suspecte ; là où l'on passe inaperçu, on peut au contraire se réinventer. L'indifférence de la foule n'est pas seulement une froideur ; elle est aussi, pour qui veut échapper au regard pesant des siens, une promesse de recommencement." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Quel « revers heureux » l'auteur attribue-t-il à l'anonymat urbain ?", options: [{ id: "a", text: "Une liberté de se réinventer" }, { id: "b", text: "Une plus grande solidarité" }, { id: "c", text: "Une surveillance bienveillante" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "Que reproche l'auteur aux communautés « trop resserrées » ?", options: [{ id: "a", text: "Elles tolèrent mal la singularité" }, { id: "b", text: "Elles favorisent le recommencement" }, { id: "c", text: "Elles sont indifférentes à leurs membres" }], answer: "a" },
      ],
    },
  },
  {
    level: "C2", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Essai : traduire, trahir ?",
    prompt: "Lisez l'extrait et répondez.",
    difficulty: "STRETCH", topicTag: "langue",
    payload: {
      passages: [{ id: "p1", body: "L'adage italien qui assimile le traducteur à un traître a la séduction des formules brèves et le défaut de leur paresse. Sans doute toute traduction perd-elle quelque chose ; mais elle gagne aussi ce que l'original ignorait de lui-même. En passant d'une langue à l'autre, un texte se découvre des résonances inattendues, des zones d'ombre qu'il n'avait jamais eu à éclaircir. Loin de n'être qu'une déperdition, la traduction est une seconde lecture, et souvent la plus exigeante : celle qui ne peut feindre d'avoir compris ce qu'elle n'a pas su redire." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Quelle nuance l'auteur apporte-t-il à l'adage sur le traducteur ?", options: [{ id: "a", text: "La traduction peut aussi révéler ce que l'original ignorait" }, { id: "b", text: "La traduction ne perd jamais rien" }, { id: "c", text: "Le traducteur est nécessairement un traître" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "Pourquoi la traduction est-elle qualifiée de « lecture la plus exigeante » ?", options: [{ id: "a", text: "Elle ne peut feindre d'avoir compris" }, { id: "b", text: "Elle est plus rapide que la lecture ordinaire" }, { id: "c", text: "Elle dispense de comprendre le texte" }], answer: "a" },
      ],
    },
  },
  {
    level: "C2", skill: "COMPREHENSION_ECRITE", taskType: "VRAI_FAUX", examFamily: null,
    title: "Analyse : le progrès et ses promesses",
    prompt: "Lisez l'analyse et indiquez vrai ou faux, d'après le texte.",
    difficulty: "STRETCH", topicTag: "sciences",
    payload: {
      passages: [{ id: "p1", body: "Croire que chaque avancée technique nous rapproche mécaniquement d'un mieux-être collectif relève d'une foi plus que d'un constat. L'histoire récente abonde en innovations dont les bénéfices, réels, se sont accompagnés de coûts longtemps minimisés, parfois découverts trop tard. Cela ne condamne nullement le progrès ; cela invite à en peser les effets avant de s'en émerveiller. La prudence dont il est ici question n'a rien de la frilosité : elle est la condition d'un progrès qui mérite son nom, c'est-à-dire qui ne se contente pas d'aller vite, mais sait où il va." }],
      questions: [
        { id: "q1", kind: "truefalse", stem: "L'auteur estime que toute avancée technique améliore mécaniquement le bien-être collectif.", answer: "false" },
        { id: "q2", kind: "truefalse", stem: "Pour l'auteur, la prudence n'est pas de la frilosité mais une condition du progrès.", answer: "true" },
      ],
    },
  },
  {
    level: "C2", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Essai : l'art et l'utilité",
    prompt: "Lisez l'extrait et répondez.",
    difficulty: "CORE", topicTag: "art",
    payload: {
      passages: [{ id: "p1", body: "Sommer l'art de se justifier par son utilité, c'est déjà l'avoir mal compris. Une œuvre ne sert à rien au sens où sert un outil, et c'est précisément cette inutilité apparente qui fait sa valeur. Là où l'objet utile s'efface une fois sa fonction remplie, l'œuvre persiste, parce qu'elle n'a jamais eu d'autre fin qu'elle-même. Exiger qu'elle rapporte, qu'elle instruise ou qu'elle console, c'est lui assigner une mission qui lui est étrangère. L'art ne nous est pas nécessaire comme le pain ; il nous est nécessaire autrement, et ce « autrement » est tout son mystère." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Selon l'auteur, qu'est-ce qui fait la valeur d'une œuvre d'art ?", options: [{ id: "a", text: "Son inutilité apparente" }, { id: "b", text: "Sa capacité à instruire" }, { id: "c", text: "Le profit qu'elle rapporte" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "Que veut dire l'auteur en affirmant que l'art nous est « nécessaire autrement » ?", options: [{ id: "a", text: "D'une nécessité différente de celle des besoins matériels" }, { id: "b", text: "Qu'il n'est en réalité pas nécessaire" }, { id: "c", text: "Qu'il remplace le pain" }], answer: "a" },
      ],
    },
  },
  {
    level: "C2", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Tribune : la nostalgie et le présent",
    prompt: "Lisez la tribune et répondez.",
    difficulty: "STRETCH", topicTag: "societe",
    payload: {
      passages: [{ id: "p1", body: "La nostalgie a ceci de trompeur qu'elle embellit un passé qui, vécu, fut rarement aussi doux qu'il nous revient. Elle ne restitue pas ce qui fut ; elle compose une image consolante à partir de fragments choisis. Rien de répréhensible à cela, tant que l'on n'en fait pas une politique. Car ériger le regret en programme, prétendre restaurer un âge d'or qui n'a jamais existé, c'est se condamner à juger le présent à l'aune d'une fiction. Le passé peut nourrir le présent ; il ne saurait en tenir lieu." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Pourquoi la nostalgie est-elle « trompeuse » selon l'auteur ?", options: [{ id: "a", text: "Elle compose une image embellie plutôt que de restituer le passé" }, { id: "b", text: "Elle oublie complètement le passé" }, { id: "c", text: "Elle juge le passé trop sévèrement" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "Que reproche l'auteur au fait d'« ériger le regret en programme » ?", options: [{ id: "a", text: "Cela revient à juger le présent à l'aune d'une fiction" }, { id: "b", text: "Cela nourrit utilement le présent" }, { id: "c", text: "Cela restaure réellement un âge d'or" }], answer: "a" },
      ],
    },
  },

  // ---------- Compréhension de l'oral (Listening) — shared ----------
  {
    level: "C2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Conférence : le hasard en science",
    prompt: "Écoutez l'extrait de conférence et répondez aux questions.",
    difficulty: "STRETCH", topicTag: "sciences",
    payload: {
      audioScript: "Conférencière : On imagine souvent le savant comme celui qui élimine le hasard pour ne laisser place qu'à la loi. C'est une vue de l'esprit. Bien des découvertes majeures procèdent d'un accident bien observé : ce qui distingue le chercheur, ce n'est pas qu'il échappe au hasard, c'est qu'il sait reconnaître, dans l'imprévu, ce qui mérite d'être interrogé. L'observation fortuite ne devient féconde que pour un esprit préparé à en saisir la portée. Le hasard, en somme, ne favorise que ceux qui ont appris à le lire.",
      speakers: [{ role: "Conférencière", voice: "shimmer" }],
      questions: [
        { id: "q1", stem: "Quel est le point central de la conférencière ?", options: [{ id: "a", text: "Le chercheur sait reconnaître l'imprévu fécond" }, { id: "b", text: "Le savant élimine totalement le hasard" }, { id: "c", text: "Le hasard n'a aucun rôle en science" }], answer: "a" },
        { id: "q2", stem: "À qui le hasard profite-t-il, selon elle ?", options: [{ id: "a", text: "À ceux qui ont appris à le lire" }, { id: "b", text: "À tous, indistinctement" }, { id: "c", text: "À personne" }], answer: "a" },
      ],
    },
  },
  {
    level: "C2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Débat : faut-il tout archiver ?",
    prompt: "Écoutez le débat et répondez.",
    difficulty: "STRETCH", topicTag: "societe",
    payload: {
      audioScript: "Animateur : Faut-il conserver toute trace numérique de nos vies ? Invité : Je m'en méfie. Conserver indéfiniment, c'est interdire à quiconque d'évoluer, de se défaire d'un passé qui ne le définit plus. Le droit à l'oubli n'est pas un caprice : c'est la condition pour qu'une faute ancienne ne pèse pas éternellement. Animateur : Mais effacer, n'est-ce pas réécrire l'histoire ? Invité : Tout dépend de qui efface et pourquoi. Distinguons l'oubli choisi par l'individu de la falsification imposée par le pouvoir : confondre les deux, c'est se tromper de combat.",
      speakers: [{ role: "Animateur", voice: "onyx" }, { role: "Invité", voice: "echo" }],
      questions: [
        { id: "q1", stem: "Comment l'invité justifie-t-il le droit à l'oubli ?", options: [{ id: "a", text: "Il permet à une personne d'évoluer sans être définie par son passé" }, { id: "b", text: "Il facilite la falsification de l'histoire" }, { id: "c", text: "Il sert le pouvoir en place" }], answer: "a" },
        { id: "q2", stem: "Quelle distinction l'invité juge-t-il essentielle ?", options: [{ id: "a", text: "Entre l'oubli choisi et la falsification imposée" }, { id: "b", text: "Entre le numérique et le papier" }, { id: "c", text: "Entre l'individu et l'animateur" }], answer: "a" },
      ],
    },
  },
  {
    level: "C2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Entretien : l'écriture d'un romancier",
    prompt: "Écoutez l'entretien et répondez.",
    difficulty: "CORE", topicTag: "litterature",
    payload: {
      audioScript: "Journaliste : On dit votre style dépouillé. Est-ce un choix ? Romancier : Le mot « dépouillé » laisse croire à une facilité ; or rien n'est plus laborieux que la simplicité. J'écris d'abord trop, puis je retranche. Chaque adjectif que je supprime me coûte, mais le texte y gagne en force. La phrase juste n'est pas celle où l'on ne peut plus rien ajouter, c'est celle où l'on ne peut plus rien ôter. Journaliste : Vous réécrivez beaucoup ? Romancier : Sans cesse. Un livre n'est jamais fini, il est seulement abandonné à temps.",
      speakers: [{ role: "Journaliste", voice: "nova" }, { role: "Romancier", voice: "fable" }],
      questions: [
        { id: "q1", stem: "Comment le romancier conçoit-il « la phrase juste » ?", options: [{ id: "a", text: "Celle où l'on ne peut plus rien ôter" }, { id: "b", text: "Celle où l'on ne peut plus rien ajouter" }, { id: "c", text: "Celle qui contient le plus d'adjectifs" }], answer: "a" },
        { id: "q2", stem: "Que veut-il dire en affirmant qu'un livre est « abandonné à temps » ?", options: [{ id: "a", text: "Qu'on ne le finit jamais vraiment, on cesse d'y travailler" }, { id: "b", text: "Qu'il faut le publier le plus vite possible" }, { id: "c", text: "Qu'il ne faut jamais le réécrire" }], answer: "a" },
      ],
    },
  },
  {
    level: "C2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Chronique radio : l'éloge de la lenteur",
    prompt: "Écoutez la chronique et répondez.",
    difficulty: "CORE", topicTag: "societe",
    payload: {
      audioScript: "Chroniqueur : On nous vante la vitesse comme un progrès en soi, comme si arriver plus tôt valait toujours mieux qu'arriver à temps. Mais la précipitation a un coût rarement comptabilisé : elle nous prive de l'épaisseur des choses. Lire vite, c'est lire moins ; décider vite, c'est souvent décider mal. Je ne plaide pas pour la paresse, mais pour le droit de prendre le temps que les choses méritent. La lenteur n'est pas un retard ; c'est parfois la seule manière d'être vraiment présent à ce que l'on fait.",
      speakers: [{ role: "Chroniqueur", voice: "echo" }],
      questions: [
        { id: "q1", stem: "Que reproche le chroniqueur au culte de la vitesse ?", options: [{ id: "a", text: "Il nous prive de l'épaisseur des choses" }, { id: "b", text: "Il encourage la paresse" }, { id: "c", text: "Il fait toujours arriver en retard" }], answer: "a" },
        { id: "q2", stem: "Quelle nuance le chroniqueur tient-il à préciser ?", options: [{ id: "a", text: "Qu'il défend la lenteur, non la paresse" }, { id: "b", text: "Qu'il préfère la vitesse à la lenteur" }, { id: "c", text: "Qu'il faut tout faire le plus vite possible" }], answer: "a" },
      ],
    },
  },
  {
    level: "C2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Conférence : langue et pensée",
    prompt: "Écoutez l'extrait et répondez.",
    difficulty: "STRETCH", topicTag: "langue",
    payload: {
      audioScript: "Linguiste : On a longtemps cru qu'une langue se contentait d'habiller des pensées déjà formées. La réalité est plus subtile. Notre langue ne dicte pas ce que nous pouvons penser, mais elle rend certaines distinctions plus faciles, d'autres plus laborieuses. Là où un idiome possède un mot unique, un autre devra recourir à une périphrase, et cette différence, sans nous emprisonner, infléchit nos habitudes mentales. Bref, la langue ne nous enferme pas ; elle nous incline. Reconnaître cette inclination, c'est déjà commencer à s'en affranchir.",
      speakers: [{ role: "Linguiste", voice: "onyx" }],
      questions: [
        { id: "q1", stem: "Quelle est la position nuancée du linguiste ?", options: [{ id: "a", text: "La langue incline la pensée sans la déterminer" }, { id: "b", text: "La langue dicte entièrement nos pensées" }, { id: "c", text: "La langue n'a aucun effet sur la pensée" }], answer: "a" },
        { id: "q2", stem: "Selon lui, que permet le fait de reconnaître cette « inclination » ?", options: [{ id: "a", text: "De commencer à s'en affranchir" }, { id: "b", text: "De s'y enfermer davantage" }, { id: "c", text: "De changer de langue" }], answer: "a" },
      ],
    },
  },
  {
    level: "C2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Table ronde : mécénat et liberté de l'artiste",
    prompt: "Écoutez la table ronde et répondez.",
    difficulty: "STRETCH", topicTag: "art",
    payload: {
      audioScript: "Modératrice : Le financement privé menace-t-il la liberté des artistes ? Intervenant : Le danger n'est pas tant la censure ouverte, devenue rare, que l'autocensure feutrée. Un créateur qui dépend d'un mécène apprend vite, sans qu'on le lui dise, ce qui plaît et ce qu'il vaut mieux taire. La contrainte la plus efficace est celle qu'on s'impose à soi-même en croyant rester libre. Modératrice : Faut-il alors préférer le financement public ? Intervenant : Il a ses propres servitudes. Aucune source d'argent n'est innocente ; l'essentiel est d'en avoir plusieurs, pour qu'aucune ne devienne indispensable.",
      speakers: [{ role: "Modératrice", voice: "shimmer" }, { role: "Intervenant", voice: "fable" }],
      questions: [
        { id: "q1", stem: "Quel danger principal l'intervenant identifie-t-il ?", options: [{ id: "a", text: "L'autocensure feutrée de l'artiste" }, { id: "b", text: "La censure ouverte et fréquente" }, { id: "c", text: "L'absence totale de financement" }], answer: "a" },
        { id: "q2", stem: "Quelle solution privilégie-t-il ?", options: [{ id: "a", text: "Multiplier les sources de financement" }, { id: "b", text: "Choisir uniquement le financement public" }, { id: "c", text: "Refuser tout financement" }], answer: "a" },
      ],
    },
  },
  {
    level: "C2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Entretien : l'incertitude économique",
    prompt: "Écoutez l'entretien et répondez.",
    difficulty: "STRETCH", topicTag: "economie",
    payload: {
      audioScript: "Journaliste : Vos prévisions se sont parfois révélées fausses. Cela ne décrédibilise-t-il pas votre discipline ? Économiste : Prévoir n'est pas prédire. L'économie n'est pas la météorologie d'un ciel sans volonté : elle étudie des acteurs qui réagissent aux prévisions elles-mêmes. Annoncez une crise, et vous modifiez les comportements au point parfois de l'éviter, ou de la précipiter. Cette réflexivité interdit l'exactitude qu'on nous réclame. Notre honnêteté consiste non à promettre des certitudes, mais à expliciter les hypothèses sous lesquelles nos scénarios tiennent.",
      speakers: [{ role: "Journaliste", voice: "nova" }, { role: "Économiste", voice: "onyx" }],
      questions: [
        { id: "q1", stem: "Pourquoi, selon l'économiste, l'exactitude est-elle hors d'atteinte ?", options: [{ id: "a", text: "Parce que les acteurs réagissent aux prévisions" }, { id: "b", text: "Parce que les données manquent toujours" }, { id: "c", text: "Parce que l'économie ignore les hypothèses" }], answer: "a" },
        { id: "q2", stem: "En quoi consiste l'honnêteté revendiquée par l'économiste ?", options: [{ id: "a", text: "Expliciter les hypothèses de ses scénarios" }, { id: "b", text: "Promettre des certitudes" }, { id: "c", text: "Refuser de faire des prévisions" }], answer: "a" },
      ],
    },
  },
  {
    level: "C2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Cours : l'origine des malentendus",
    prompt: "Écoutez l'extrait de cours et répondez.",
    difficulty: "CORE", topicTag: "philosophie",
    payload: {
      audioScript: "Enseignant : Nous croyons que le malentendu naît d'un défaut de communication, qu'il suffirait de mieux s'expliquer pour le dissiper. C'est une illusion réconfortante. Bien des désaccords les plus profonds ne reposent pas sur une incompréhension, mais sur une compréhension parfaite : on s'est très bien compris, et c'est justement pour cela qu'on ne s'accorde pas. Confondre le désaccord avec le malentendu, c'est espérer résoudre par la pédagogie ce qui relève d'un conflit de valeurs. Toutes les explications du monde ne réconcilient pas ce que sépare une divergence de fond.",
      speakers: [{ role: "Enseignant", voice: "echo" }],
      questions: [
        { id: "q1", stem: "Quelle « illusion » l'enseignant dénonce-t-il ?", options: [{ id: "a", text: "Croire que mieux s'expliquer dissipe tout désaccord" }, { id: "b", text: "Croire que le malentendu n'existe pas" }, { id: "c", text: "Croire que la pédagogie est inutile" }], answer: "a" },
        { id: "q2", stem: "Selon lui, certains désaccords profonds reposent sur :", options: [{ id: "a", text: "Une compréhension parfaite, non un malentendu" }, { id: "b", text: "Un simple défaut d'explication" }, { id: "c", text: "Une absence de communication" }], answer: "a" },
      ],
    },
  },
  {
    level: "C2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Débat : le mérite est-il juste ?",
    prompt: "Écoutez le débat et répondez.",
    difficulty: "STRETCH", topicTag: "societe",
    payload: {
      audioScript: "Animatrice : La méritocratie est-elle un idéal de justice ? Invitée : Elle en a l'apparence et parfois le contraire. Récompenser le mérite suppose que chacun parte d'un même point, ce qui est rarement le cas. Quand les talents eux-mêmes dépendent du milieu, de l'éducation reçue, de mille avantages invisibles, célébrer les « méritants » revient souvent à honorer des privilégiés en leur prêtant le seul mérite d'avoir réussi. Animatrice : Faut-il renoncer au mérite ? Invitée : Non, mais cesser d'en faire l'alibi des inégalités qu'il sert si commodément à justifier.",
      speakers: [{ role: "Animatrice", voice: "shimmer" }, { role: "Invitée", voice: "nova" }],
      questions: [
        { id: "q1", stem: "Quelle critique l'invitée adresse-t-elle à la méritocratie ?", options: [{ id: "a", text: "Elle suppose à tort une égalité des points de départ" }, { id: "b", text: "Elle récompense trop peu les talents" }, { id: "c", text: "Elle ignore complètement le mérite" }], answer: "a" },
        { id: "q2", stem: "Que propose finalement l'invitée ?", options: [{ id: "a", text: "Ne plus faire du mérite l'alibi des inégalités" }, { id: "b", text: "Renoncer entièrement au mérite" }, { id: "c", text: "Récompenser uniquement les privilégiés" }], answer: "a" },
      ],
    },
  },
  {
    level: "C2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Conférence : la beauté du transitoire",
    prompt: "Écoutez l'extrait et répondez.",
    difficulty: "CORE", topicTag: "art",
    payload: {
      audioScript: "Intervenante : Nous associons spontanément la beauté à la durée, comme si seul méritait notre admiration ce qui résiste au temps. Pourtant, une part essentielle de l'émotion esthétique tient précisément à la fragilité de son objet. La fleur nous touche parce qu'elle fanera ; le concert, parce qu'il ne se répétera pas à l'identique. Vouloir tout fixer, tout enregistrer, c'est risquer de perdre ce que l'éphémère a d'irremplaçable. Ce n'est pas malgré sa disparition que l'instant est précieux : c'est en raison d'elle.",
      speakers: [{ role: "Intervenante", voice: "shimmer" }],
      questions: [
        { id: "q1", stem: "Quelle idée reçue l'intervenante remet-elle en question ?", options: [{ id: "a", text: "Que la beauté tiendrait surtout à la durée" }, { id: "b", text: "Que l'éphémère est sans valeur" }, { id: "c", text: "Que la fragilité empêche toute émotion" }], answer: "a" },
        { id: "q2", stem: "Pourquoi l'instant est-il précieux, selon elle ?", options: [{ id: "a", text: "En raison même de sa disparition" }, { id: "b", text: "Parce qu'on peut l'enregistrer" }, { id: "c", text: "Parce qu'il se répète à l'identique" }], answer: "a" },
      ],
    },
  },
  {
    level: "C2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Entretien : enseigner à l'ère des moteurs de recherche",
    prompt: "Écoutez l'entretien et répondez.",
    difficulty: "STRETCH", topicTag: "education",
    payload: {
      audioScript: "Journaliste : À quoi bon faire mémoriser, puisque tout se trouve en ligne ? Pédagogue : Cet argument confond l'accès à l'information et le savoir. Disposer d'une donnée n'équivaut pas à la comprendre, encore moins à la mobiliser à propos. On ne pense pas avec ce qu'on peut consulter, mais avec ce qu'on a intériorisé. Un esprit vide qu'on relie au monde entier ne devient pas savant ; il devient dépendant. La mémoire n'est pas le contraire de l'intelligence : elle en est la matière première.",
      speakers: [{ role: "Journaliste", voice: "echo" }, { role: "Pédagogue", voice: "fable" }],
      questions: [
        { id: "q1", stem: "Quelle confusion le pédagogue dénonce-t-il ?", options: [{ id: "a", text: "Confondre l'accès à l'information et le savoir" }, { id: "b", text: "Confondre la mémoire et l'oubli" }, { id: "c", text: "Confondre l'intelligence et la rapidité" }], answer: "a" },
        { id: "q2", stem: "Comment conçoit-il le rôle de la mémoire ?", options: [{ id: "a", text: "Comme la matière première de l'intelligence" }, { id: "b", text: "Comme le contraire de l'intelligence" }, { id: "c", text: "Comme une faculté devenue inutile" }], answer: "a" },
      ],
    },
  },
  {
    level: "C2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Chronique : l'unanimité suspecte",
    prompt: "Écoutez la chronique et répondez.",
    difficulty: "STRETCH", topicTag: "politique",
    payload: {
      audioScript: "Chroniqueuse : Méfions-nous des unanimités trop promptes. Quand une opinion ne rencontre plus aucune objection, ce n'est pas toujours qu'elle a triomphé par la force de ses raisons ; c'est parfois que la contradiction a cessé d'oser se dire. Le consensus peut être le fruit d'un débat fécond comme le symptôme d'un conformisme installé. Distinguer les deux demande de regarder non le résultat, mais le chemin : un accord obtenu sans que nul n'ait pu objecter n'est pas un accord, c'est un silence qu'on a pris pour une adhésion.",
      speakers: [{ role: "Chroniqueuse", voice: "nova" }],
      questions: [
        { id: "q1", stem: "Pourquoi la chroniqueuse se méfie-t-elle des unanimités rapides ?", options: [{ id: "a", text: "La contradiction peut avoir cessé d'oser se dire" }, { id: "b", text: "Elles reposent toujours sur de bonnes raisons" }, { id: "c", text: "Elles sont impossibles à obtenir" }], answer: "a" },
        { id: "q2", stem: "Comment, selon elle, distinguer un vrai accord d'un faux ?", options: [{ id: "a", text: "En regardant le chemin, non le seul résultat" }, { id: "b", text: "En comptant le nombre de partisans" }, { id: "c", text: "En se fiant à la rapidité du consensus" }], answer: "a" },
      ],
    },
  },
  {
    level: "C2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Cours : le vivant et la machine",
    prompt: "Écoutez l'extrait et répondez.",
    difficulty: "STRETCH", topicTag: "sciences",
    payload: {
      audioScript: "Professeure : Comparer le vivant à une machine est une métaphore féconde, à condition de ne pas oublier que c'est une métaphore. Une machine est conçue de l'extérieur, en vue d'une fin que son concepteur lui assigne ; l'organisme, lui, se construit de l'intérieur, sans plan préalable, et n'a d'autre fin que de persévérer dans son existence. Filer la comparaison au-delà de ce point, c'est prêter au vivant une intention qui n'y est pas, ou refuser à la machine une finalité qui pourtant la définit. La métaphore éclaire ; elle ne remplace pas.",
      speakers: [{ role: "Professeure", voice: "shimmer" }],
      questions: [
        { id: "q1", stem: "Quelle différence la professeure souligne-t-elle ?", options: [{ id: "a", text: "L'organisme se construit de l'intérieur, sans plan préalable" }, { id: "b", text: "La machine se construit sans concepteur" }, { id: "c", text: "Le vivant est conçu en vue d'une fin extérieure" }], answer: "a" },
        { id: "q2", stem: "Quelle mise en garde formule-t-elle sur la métaphore ?", options: [{ id: "a", text: "Elle éclaire mais ne remplace pas le réel" }, { id: "b", text: "Elle est totalement trompeuse" }, { id: "c", text: "Elle prouve l'identité du vivant et de la machine" }], answer: "a" },
      ],
    },
  },
  {
    level: "C2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Débat : voyager change-t-il vraiment ?",
    prompt: "Écoutez le débat et répondez.",
    difficulty: "CORE", topicTag: "societe",
    payload: {
      audioScript: "Animateur : On prête au voyage le pouvoir de nous transformer. Mythe ou réalité ? Invité : Tout dépend de la disposition du voyageur. On peut parcourir le monde et n'y chercher partout que le reflet de ses propres certitudes ; on revient alors inchangé, simplement conforté. Le voyage qui instruit n'est pas celui qui accumule les lieux, mais celui qui accepte d'être dérangé dans ses évidences. Sans cette ouverture, le dépaysement n'est qu'un divertissement ; avec elle, le moindre déplacement devient une école.",
      speakers: [{ role: "Animateur", voice: "onyx" }, { role: "Invité", voice: "echo" }],
      questions: [
        { id: "q1", stem: "À quelle condition le voyage instruit-il, selon l'invité ?", options: [{ id: "a", text: "Accepter d'être dérangé dans ses évidences" }, { id: "b", text: "Accumuler le plus de lieux possible" }, { id: "c", text: "Y retrouver ses propres certitudes" }], answer: "a" },
        { id: "q2", stem: "Que devient le voyage sans cette ouverture ?", options: [{ id: "a", text: "Un simple divertissement" }, { id: "b", text: "Une véritable école" }, { id: "c", text: "Une transformation profonde" }], answer: "a" },
      ],
    },
  },
  {
    level: "C2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Conférence : la confiance et le contrôle",
    prompt: "Écoutez l'extrait et répondez.",
    difficulty: "STRETCH", topicTag: "societe",
    payload: {
      audioScript: "Sociologue : On imagine pouvoir remplacer la confiance par le contrôle, comme si multiplier les vérifications dispensait de se fier à autrui. C'est méconnaître que tout contrôle repose lui-même sur une confiance ultime : qui vérifie le vérificateur ? À vouloir tout surveiller, une organisation ne supprime pas le besoin de confiance, elle le déplace, et souvent l'alourdit. La défiance généralisée a un coût que l'on chiffre rarement : elle ralentit, elle décourage, elle insulte ceux-là mêmes dont on aurait besoin qu'ils s'engagent. Un peu de confiance accordée est parfois plus efficace que beaucoup de méfiance organisée.",
      speakers: [{ role: "Sociologue", voice: "fable" }],
      questions: [
        { id: "q1", stem: "Pourquoi le contrôle ne peut-il remplacer entièrement la confiance ?", options: [{ id: "a", text: "Tout contrôle repose lui-même sur une confiance ultime" }, { id: "b", text: "Le contrôle est toujours gratuit" }, { id: "c", text: "La confiance est impossible à accorder" }], answer: "a" },
        { id: "q2", stem: "Quel est le « coût » de la défiance généralisée ?", options: [{ id: "a", text: "Elle ralentit et décourage l'engagement" }, { id: "b", text: "Elle renforce la confiance" }, { id: "c", text: "Elle n'a aucun effet mesurable" }], answer: "a" },
      ],
    },
  },
  {
    level: "C2", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Entretien : l'ironie et le sérieux",
    prompt: "Écoutez l'entretien et répondez.",
    difficulty: "STRETCH", topicTag: "litterature",
    payload: {
      audioScript: "Journaliste : On vous reproche parfois une ironie permanente. N'est-ce pas une manière de ne jamais s'engager ? Essayiste : C'est l'inverse qu'il faudrait dire. L'ironie bien comprise n'est pas une fuite ; c'est une exigence. Elle refuse les certitudes faciles, elle oblige le lecteur à penser contre la pente du discours. Ce qui passe pour de la légèreté est souvent la forme la plus discrète du sérieux. Le danger, je vous l'accorde, c'est l'ironie qui se contente de tout moquer sans rien proposer : celle-là, en effet, dispense de penser au lieu d'y inviter.",
      speakers: [{ role: "Journaliste", voice: "nova" }, { role: "Essayiste", voice: "onyx" }],
      questions: [
        { id: "q1", stem: "Comment l'essayiste défend-il l'ironie ?", options: [{ id: "a", text: "Comme une exigence qui oblige à penser" }, { id: "b", text: "Comme une manière de ne jamais s'engager" }, { id: "c", text: "Comme une simple légèreté" }], answer: "a" },
        { id: "q2", stem: "Quelle ironie l'essayiste juge-t-il dangereuse ?", options: [{ id: "a", text: "Celle qui moque tout sans rien proposer" }, { id: "b", text: "Celle qui invite à penser" }, { id: "c", text: "Celle qui refuse les certitudes faciles" }], answer: "a" },
      ],
    },
  },

  // ---------- Expression écrite (Writing) — exam-specific ----------
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DALF C2 — Synthèse argumentée : le travail à l'ère de l'automatisation",
    prompt: "Rédigez un texte structuré et nuancé prenant clairement position.",
    difficulty: "CORE", topicTag: "societe",
    payload: { situation: "Une revue d'idées vous confie un dossier de points de vue contradictoires sur l'automatisation du travail.", instruction: "Rédigez un article qui dégage les enjeux du dossier, confronte les thèses en présence et défend une position personnelle argumentée. Structurez votre propos, maniez les nuances et soignez les transitions.", wordMin: 700, wordMax: 850 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DALF C2 — Article critique : faut-il tout patrimonialiser ?",
    prompt: "Rédigez un article d'opinion construit et stylistiquement maîtrisé.",
    difficulty: "STRETCH", topicTag: "culture",
    payload: { situation: "Un magazine culturel ouvre ses colonnes à un débat sur la tendance à classer et conserver toujours plus d'objets, de lieux et de pratiques au titre du patrimoine.", instruction: "Rédigez un article qui interroge cette tendance, en pesant ses bénéfices et ses dérives possibles, et qui aboutit à une thèse personnelle clairement assumée.", wordMin: 700, wordMax: 850 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF — Essai argumenté : le bien commun face aux intérêts privés",
    prompt: "Rédigez un essai argumenté et nuancé.",
    difficulty: "CORE", topicTag: "societe",
    payload: { situation: "On vous demande de traiter, pour un public exigeant, la tension entre la défense du bien commun et la liberté des intérêts particuliers.", instruction: "Rédigez un essai qui expose le problème, examine les arguments opposés et défend une position personnelle, en évitant les formules toutes faites et en illustrant par des exemples précis.", wordMin: 200, wordMax: 260 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF — Texte argumenté : l'utilité des humanités",
    prompt: "Rédigez un texte argumenté à destination d'un lectorat averti.",
    difficulty: "CORE", topicTag: "education",
    payload: { situation: "Un débat oppose ceux qui jugent les disciplines littéraires et philosophiques dépassées à ceux qui les estiment plus nécessaires que jamais.", instruction: "Rédigez un texte qui prend parti de manière argumentée, anticipe les objections adverses et les réfute, dans une langue précise et soutenue.", wordMin: 120, wordMax: 180 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DALF C2 — Lettre ouverte : la place du silence dans l'espace public",
    prompt: "Rédigez une lettre ouverte construite et persuasive.",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { situation: "Une association vous invite à réagir, sous forme de lettre ouverte, à l'omniprésence du bruit et de la sollicitation sonore dans les lieux publics.", instruction: "Rédigez une lettre ouverte adressée aux pouvoirs publics : posez le problème, argumentez avec rigueur, et formulez des propositions concrètes, sans tomber dans la simple déploration.", wordMin: 700, wordMax: 850 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF — Essai : peut-on légiférer sur la mémoire ?",
    prompt: "Rédigez un essai argumenté et nuancé.",
    difficulty: "STRETCH", topicTag: "histoire",
    payload: { situation: "La question de savoir si la loi doit dire comment une société se souvient de son passé suscite des avis tranchés.", instruction: "Rédigez un essai qui examine les arguments en présence, mesure les risques et les bénéfices d'une mémoire encadrée par la loi, et aboutit à une position personnelle motivée.", wordMin: 200, wordMax: 260 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF — Texte argumenté : l'anonymat en ligne, liberté ou danger ?",
    prompt: "Rédigez un texte argumenté équilibré puis tranché.",
    difficulty: "CORE", topicTag: "societe",
    payload: { situation: "Faut-il garantir l'anonymat sur les plateformes en ligne ou exiger l'identification des utilisateurs ?", instruction: "Rédigez un texte qui pèse les arguments des deux camps, distingue les situations, et défend une position nuancée mais claire, dans une langue précise.", wordMin: 120, wordMax: 180 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DALF C2 — Compte rendu critique : un essai sur l'attention",
    prompt: "Rédigez un compte rendu critique structuré.",
    difficulty: "STRETCH", topicTag: "litterature",
    payload: { situation: "On vous demande de rendre compte, pour une revue intellectuelle, d'un essai consacré à l'économie de l'attention.", instruction: "Rédigez un compte rendu qui restitue fidèlement la thèse de l'ouvrage, en dégage les points forts et les limites, et porte un jugement argumenté, sans paraphrase ni complaisance.", wordMin: 700, wordMax: 850 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF — Essai : faut-il craindre l'uniformisation des cultures ?",
    prompt: "Rédigez un essai argumenté et illustré.",
    difficulty: "CORE", topicTag: "culture",
    payload: { situation: "La circulation mondiale des biens culturels nourrit la crainte d'un appauvrissement des particularités locales.", instruction: "Rédigez un essai qui interroge cette crainte, en distingue la part fondée de la part exagérée, et défend une thèse personnelle appuyée sur des exemples précis.", wordMin: 200, wordMax: 260 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF — Texte argumenté : la gratuité a-t-elle un prix ?",
    prompt: "Rédigez un texte argumenté pour un lectorat exigeant.",
    difficulty: "STRETCH", topicTag: "economie",
    payload: { situation: "De nombreux services dits « gratuits » se rémunèrent par d'autres moyens, souvent invisibles pour l'usager.", instruction: "Rédigez un texte qui analyse ce que recouvre la gratuité apparente, en expose les contreparties, et formule un jugement nuancé mais ferme.", wordMin: 120, wordMax: 180 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DALF C2 — Article : éloge ou critique de la spécialisation ?",
    prompt: "Rédigez un article structuré qui prend nettement position.",
    difficulty: "CORE", topicTag: "societe",
    payload: { situation: "Une revue interroge les effets de la spécialisation croissante des savoirs et des métiers.", instruction: "Rédigez un article qui confronte les bénéfices de la spécialisation et le risque d'un émiettement des savoirs, puis défend une position personnelle argumentée.", wordMin: 700, wordMax: 850 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF — Essai : l'erreur a-t-elle une valeur ?",
    prompt: "Rédigez un essai argumenté et nuancé.",
    difficulty: "CORE", topicTag: "education",
    payload: { situation: "Notre culture valorise la réussite et stigmatise volontiers l'échec, alors que beaucoup d'apprentissages passent par l'erreur.", instruction: "Rédigez un essai qui examine le rôle de l'erreur dans la connaissance et l'action, en distinguant les erreurs fécondes des fautes évitables, et défend une thèse personnelle.", wordMin: 200, wordMax: 260 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF — Texte argumenté : la transparence est-elle toujours souhaitable ?",
    prompt: "Rédigez un texte argumenté équilibré puis tranché.",
    difficulty: "STRETCH", topicTag: "politique",
    payload: { situation: "On érige souvent la transparence en vertu absolue, dans la vie publique comme privée.", instruction: "Rédigez un texte qui interroge cet idéal, en distingue les bienfaits des dérives possibles, et aboutit à une position nuancée, dans une langue soutenue.", wordMin: 120, wordMax: 180 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DALF C2 — Tribune : ce que mesurer fait perdre",
    prompt: "Rédigez une tribune argumentée et stylistiquement maîtrisée.",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { situation: "La multiplication des indicateurs chiffrés transforme la manière d'évaluer le travail, la santé ou l'éducation.", instruction: "Rédigez une tribune qui interroge ce que la quantification éclaire et ce qu'elle laisse dans l'ombre, et défend une position personnelle nourrie d'exemples concrets.", wordMin: 700, wordMax: 850 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF — Essai : l'hospitalité, devoir ou choix ?",
    prompt: "Rédigez un essai argumenté et nuancé.",
    difficulty: "CORE", topicTag: "societe",
    payload: { situation: "L'accueil de l'étranger oscille, dans nos sociétés, entre l'obligation morale et la décision politique.", instruction: "Rédigez un essai qui clarifie les termes du débat, confronte les arguments, et défend une position personnelle argumentée, sans céder aux facilités rhétoriques.", wordMin: 200, wordMax: 260 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF — Texte argumenté : peut-on se passer de frontières ?",
    prompt: "Rédigez un texte argumenté pour un lectorat averti.",
    difficulty: "STRETCH", topicTag: "politique",
    payload: { situation: "L'idée d'un monde sans frontières séduit autant qu'elle inquiète.", instruction: "Rédigez un texte qui examine ce que les frontières séparent et ce qu'elles protègent, pèse les arguments contradictoires, et aboutit à une thèse personnelle motivée.", wordMin: 120, wordMax: 180 },
  },

  // ---------- Expression orale (Speaking) — exam-specific ----------
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DALF C2 — Exposé puis débat : science et opinion publique",
    prompt: "Préparez un exposé structuré à partir d'un dossier, puis défendez votre point de vue. Tapez ensuite votre transcription.",
    difficulty: "CORE", topicTag: "sciences",
    payload: { taskPrompt: "À partir d'un dossier de documents sur les rapports entre expertise scientifique et opinion publique, dégagez une problématique, construisez un exposé argumenté défendant un point de vue, puis soutenez-le dans un débat contradictoire avec l'examinateur.", prepSeconds: 3600, speakSeconds: 600 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DALF C2 — Exposé puis débat : mémoire et identité collective",
    prompt: "Préparez un exposé structuré à partir d'un dossier, puis défendez votre point de vue. Tapez ensuite votre transcription.",
    difficulty: "STRETCH", topicTag: "histoire",
    payload: { taskPrompt: "À partir d'un dossier sur la place de la mémoire dans la construction de l'identité collective, formulez une problématique, présentez un exposé nuancé et argumenté, puis défendez votre thèse face aux objections de l'examinateur.", prepSeconds: 3600, speakSeconds: 600 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DALF C2 — Exposé puis débat : l'art a-t-il des devoirs ?",
    prompt: "Préparez un exposé structuré à partir d'un dossier, puis défendez votre point de vue. Tapez ensuite votre transcription.",
    difficulty: "STRETCH", topicTag: "art",
    payload: { taskPrompt: "À partir d'un dossier interrogeant la responsabilité morale ou sociale des artistes, construisez une problématique, développez un exposé argumenté, puis engagez un débat où vous soutenez et nuancez votre position.", prepSeconds: 3600, speakSeconds: 600 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DALF C2 — Exposé puis débat : la place du numérique à l'école",
    prompt: "Préparez un exposé structuré à partir d'un dossier, puis défendez votre point de vue. Tapez ensuite votre transcription.",
    difficulty: "CORE", topicTag: "education",
    payload: { taskPrompt: "À partir d'un dossier sur l'introduction des outils numériques dans l'enseignement, dégagez les enjeux, présentez un exposé prenant clairement position, puis défendez-le dans un échange contradictoire.", prepSeconds: 3600, speakSeconds: 600 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF — Point de vue argumenté : la valeur du temps libre",
    prompt: "Exposez et défendez votre point de vue à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "societe",
    payload: { taskPrompt: "Certains voient dans la réduction du temps de travail une conquête sociale, d'autres une menace économique. Présentez un point de vue argumenté et nuancé sur la valeur que nos sociétés devraient accorder au temps libre, et soyez prêt à le défendre.", prepSeconds: 60, speakSeconds: 600 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF — Point de vue argumenté : faut-il se méfier des chiffres ?",
    prompt: "Exposez et défendez votre point de vue à l'oral, puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { taskPrompt: "Les indicateurs chiffrés guident un nombre croissant de décisions. Présentez un point de vue argumenté sur ce que la quantification apporte et ce qu'elle risque de faire perdre, en illustrant par des exemples concrets.", prepSeconds: 60, speakSeconds: 600 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF — Expression d'un point de vue : tradition et modernité",
    prompt: "Développez votre point de vue à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "societe",
    payload: { taskPrompt: "On oppose souvent le respect des traditions à l'exigence de modernité. Développez un point de vue argumenté qui dépasse cette opposition simpliste, en montrant ce que chacune peut devoir à l'autre.", prepSeconds: 0, speakSeconds: 270 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF — Expression d'un point de vue : l'engagement individuel suffit-il ?",
    prompt: "Développez votre point de vue à l'oral, puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "ecologie",
    payload: { taskPrompt: "Face aux grands défis collectifs, on en appelle souvent aux gestes individuels. Développez un point de vue argumenté sur la portée et les limites de l'action individuelle par rapport aux décisions collectives.", prepSeconds: 0, speakSeconds: 270 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DALF C2 — Exposé puis débat : faut-il tout dire ?",
    prompt: "Préparez un exposé structuré à partir d'un dossier, puis défendez votre point de vue. Tapez ensuite votre transcription.",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { taskPrompt: "À partir d'un dossier sur la sincérité et ses limites dans la vie sociale et publique, dégagez une problématique, présentez un exposé argumenté, puis défendez votre position dans un débat avec l'examinateur.", prepSeconds: 3600, speakSeconds: 600 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF — Point de vue argumenté : la célébrité a-t-elle un sens ?",
    prompt: "Exposez et défendez votre point de vue à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "societe",
    payload: { taskPrompt: "La notoriété est devenue, pour beaucoup, une aspiration en soi. Présentez un point de vue argumenté sur ce que révèle ce désir de célébrité et sur la valeur qu'on peut lui accorder.", prepSeconds: 60, speakSeconds: 600 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF — Expression d'un point de vue : a-t-on le droit de ne pas savoir ?",
    prompt: "Développez votre point de vue à l'oral, puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "sciences",
    payload: { taskPrompt: "Les progrès de la science permettent de connaître des choses qu'on préférerait parfois ignorer. Développez un point de vue argumenté sur l'existence d'un éventuel « droit de ne pas savoir » et ses limites.", prepSeconds: 0, speakSeconds: 270 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF — Point de vue argumenté : l'utopie est-elle utile ?",
    prompt: "Exposez et défendez votre point de vue à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "politique",
    payload: { taskPrompt: "On reproche aux utopies leur irréalisme, tout en leur reconnaissant un pouvoir d'entraînement. Présentez un point de vue argumenté sur l'utilité, ou la nocivité, des idéaux que l'on sait inatteignables.", prepSeconds: 60, speakSeconds: 600 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DALF C2 — Exposé puis débat : nature et culture",
    prompt: "Préparez un exposé structuré à partir d'un dossier, puis défendez votre point de vue. Tapez ensuite votre transcription.",
    difficulty: "STRETCH", topicTag: "philosophie",
    payload: { taskPrompt: "À partir d'un dossier interrogeant la frontière entre ce qui relève de la nature et ce qui relève de la culture, formulez une problématique, présentez un exposé nuancé, puis soutenez votre thèse dans un débat contradictoire.", prepSeconds: 3600, speakSeconds: 600 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF — Expression d'un point de vue : faut-il se fier à l'intuition ?",
    prompt: "Développez votre point de vue à l'oral, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "philosophie",
    payload: { taskPrompt: "On oppose volontiers l'intuition au raisonnement méthodique. Développez un point de vue argumenté sur la confiance qu'on peut accorder à l'intuition dans la connaissance et la décision.", prepSeconds: 0, speakSeconds: 270 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF — Point de vue argumenté : la critique est-elle un art ?",
    prompt: "Exposez et défendez votre point de vue à l'oral, puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "art",
    payload: { taskPrompt: "On considère parfois la critique comme un simple jugement de second ordre, parasitaire de la création. Présentez un point de vue argumenté sur la valeur propre de l'activité critique et sur ce qu'elle apporte aux œuvres.", prepSeconds: 60, speakSeconds: 600 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DALF C2 — Exposé puis débat : la ville de demain",
    prompt: "Préparez un exposé structuré à partir d'un dossier, puis défendez votre point de vue. Tapez ensuite votre transcription.",
    difficulty: "CORE", topicTag: "societe",
    payload: { taskPrompt: "À partir d'un dossier sur les transformations des espaces urbains, dégagez les enjeux, construisez un exposé argumenté défendant une vision de la ville souhaitable, puis défendez-la dans un débat avec l'examinateur.", prepSeconds: 3600, speakSeconds: 600 },
  },

  // ---------- TEF C2 top-up (Rule #7: 5 -> 15 per expression module) ----------
  // Fixed TEF format: écrite Section A 80–120 / Section B 200–260; orale Section A
  // 300 s / Section B 600 s. At C2 the constraint bites hardest: the candidate must
  // compress an abstract position into the exam's short formats without losing
  // nuance. The task does not grow with the level — the answer does.
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section A — Courriel : décliner une invitation sans rompre le lien",
    prompt: "Rédigez le message demandé (Section A).",
    difficulty: "STRETCH", topicTag: "travail",
    payload: { situation: "On vous invite à siéger dans un comité dont vous contestez la méthode, mais dont vous soutenez l'objectif.", instruction: "Écrivez votre réponse. Déclinez sans ambiguïté, exposez la réserve de fond en une phrase nette, distinguez-la de l'objectif que vous approuvez, et laissez une porte ouverte à une autre forme de contribution.", wordMin: 80, wordMax: 120 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section A — Message : rectifier une citation tronquée",
    prompt: "Rédigez le message demandé (Section A).",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { situation: "Une de vos formules est reprise dans un débat public en lui faisant dire l'inverse de votre propos.", instruction: "Écrivez à l'auteur de la reprise. Restituez le sens initial, montrez précisément où la coupe déplace le propos, demandez une rectification, et évitez toute polémique personnelle.", wordMin: 80, wordMax: 120 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section A — Courriel : refuser une facilité de langage dans un rapport",
    prompt: "Rédigez le message demandé (Section A).",
    difficulty: "STRETCH", topicTag: "travail",
    payload: { situation: "La synthèse d'un rapport collectif présente une corrélation comme une causalité.", instruction: "Écrivez aux rédacteurs. Identifiez la formulation en cause, expliquez pourquoi elle excède les données, proposez une reformulation exacte, et indiquez ce qui serait nécessaire pour soutenir la thèse forte.", wordMin: 80, wordMax: 120 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section A — Message : proposer un désaccord public loyal",
    prompt: "Rédigez le message demandé (Section A).",
    difficulty: "CORE", topicTag: "societe",
    payload: { situation: "Vous souhaitez répondre publiquement à une position défendue par une personne dont vous êtes proche.", instruction: "Écrivez-lui avant publication. Annoncez votre intention, résumez loyalement sa thèse, indiquez le point exact du désaccord, et proposez qu'elle réponde dans le même espace.", wordMin: 80, wordMax: 120 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section A — Courriel : demander la levée d'une ambiguïté éthique",
    prompt: "Rédigez le message demandé (Section A).",
    difficulty: "STRETCH", topicTag: "travail",
    payload: { situation: "Un financement proposé à votre structure provient d'un acteur dont l'activité contredit votre objet.", instruction: "Écrivez au conseil. Exposez la tension sans dramatiser, distinguez le risque réel du risque d'image, demandez une position formelle, et proposez le critère qui devrait trancher.", wordMin: 80, wordMax: 120 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section B — Prendre parti : la neutralité est-elle tenable ?",
    prompt: "Rédigez un texte argumenté défendant une position (Section B).",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { situation: "On exige des institutions une neutralité que certains jugent impossible et d'autres indispensable.", instruction: "Défendez une position argumentée. Distinguez neutralité et impartialité, éprouvez votre thèse contre l'objection la plus forte, et tranchez sans esquiver.", wordMin: 200, wordMax: 260 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section B — Prendre parti : le droit à l'oubli",
    prompt: "Rédigez un texte argumenté défendant une position (Section B).",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { situation: "Effacer une information exacte mais ancienne oppose la protection des personnes et l'intégrité de la mémoire collective.", instruction: "Défendez une position argumentée. Traitez ce que l'oubli protège et ce qu'il efface, distinguez les cas, et assumez une règle générale.", wordMin: 200, wordMax: 260 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section B — Prendre parti : peut-on enseigner le jugement ?",
    prompt: "Rédigez un texte argumenté défendant une position (Section B).",
    difficulty: "STRETCH", topicTag: "etudes",
    payload: { situation: "On attend de l'école qu'elle forme au jugement critique, sans s'accorder sur la possibilité de l'enseigner.", instruction: "Défendez une position argumentée. Interrogez ce que serait un tel enseignement, opposez-lui l'objection de la transmission de contenus, et concluez sur ce qui est réellement transmissible.", wordMin: 200, wordMax: 260 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section B — Prendre parti : l'expertise face au débat démocratique",
    prompt: "Rédigez un texte argumenté défendant une position (Section B).",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { situation: "Les décisions techniques échappent largement au débat public, faute de compétence partagée.", instruction: "Défendez une position argumentée. Traitez la légitimité du savoir et celle du nombre, refusez les solutions de facilité, et proposez une articulation défendable.", wordMin: 200, wordMax: 260 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF Section B — Prendre parti : la lenteur a-t-elle une valeur ?",
    prompt: "Rédigez un texte argumenté défendant une position (Section B).",
    difficulty: "CORE", topicTag: "societe",
    payload: { situation: "L'accélération générale des rythmes est tantôt dénoncée, tantôt revendiquée comme un progrès.", instruction: "Défendez une position argumentée. Évitez l'éloge convenu de la lenteur, distinguez les domaines où elle est un gain de ceux où elle est un coût, et tranchez.", wordMin: 200, wordMax: 260 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section A — Se renseigner : les conditions d'une expertise indépendante",
    prompt: "Posez le maximum de questions utiles (Section A), puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "travail",
    payload: { taskPrompt: "Vous confiez une expertise externe sur un dossier sensible. Posez le maximum de questions : les garanties d'indépendance, les conflits d'intérêts déclarés, la méthode retenue, l'accès aux données, la propriété du rapport, et les conditions de sa publication.", prepSeconds: 60, speakSeconds: 300 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section A — Se renseigner : céder des droits sur une œuvre",
    prompt: "Posez le maximum de questions utiles (Section A), puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { taskPrompt: "On vous propose de céder les droits d'exploitation d'un travail personnel. Posez le maximum de questions : l'étendue et la durée de la cession, les territoires, les adaptations autorisées, le droit de retrait, la rémunération, et ce qu'il advient en cas de revente à un tiers.", prepSeconds: 60, speakSeconds: 300 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section A — Se renseigner : anonymiser des données d'enquête",
    prompt: "Posez le maximum de questions utiles (Section A), puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "etudes",
    payload: { taskPrompt: "Vous préparez la diffusion de données d'enquête sensibles. Auprès du référent compétent, posez le maximum de questions : les techniques d'anonymisation admises, le risque de réidentification, les durées de conservation, les autorisations requises, les mentions à porter aux participants, et les responsabilités engagées.", prepSeconds: 60, speakSeconds: 300 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section A — Se renseigner : reprendre la direction d'une structure fragilisée",
    prompt: "Posez le maximum de questions utiles (Section A), puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "travail",
    payload: { taskPrompt: "On vous propose de reprendre la direction d'une structure en difficulté. Posez le maximum de questions : la situation financière réelle, les engagements en cours, l'état des relations sociales, le mandat que l'on vous donnerait, les marges de manœuvre, et les critères d'évaluation attendus.", prepSeconds: 60, speakSeconds: 300 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section A — Se renseigner : les limites d'un dispositif d'aide",
    prompt: "Posez le maximum de questions utiles (Section A), puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "societe",
    payload: { taskPrompt: "Un dispositif d'aide publique semble exclure une partie de ceux qu'il vise. Auprès de l'organisme gestionnaire, posez le maximum de questions : les critères exacts, les cas d'exclusion constatés, les dérogations possibles, les voies de recours, les évaluations conduites, et les évolutions envisagées.", prepSeconds: 60, speakSeconds: 300 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section B — Persuader : renoncer à un argument efficace mais fragile",
    prompt: "Présentez et convainquez votre interlocuteur (Section B), puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { taskPrompt: "Votre campagne repose sur un chiffre frappant que vous savez discutable. Convainquez l'équipe d'y renoncer. On vous répond que c'est le seul argument qui porte auprès du public — traitez cette objection sans la mépriser.", prepSeconds: 60, speakSeconds: 600 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section B — Persuader : publier un résultat négatif",
    prompt: "Présentez et convainquez votre interlocuteur (Section B), puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "etudes",
    payload: { taskPrompt: "Vos travaux n'ont pas confirmé l'hypothèse de départ. Convainquez votre équipe de publier ce résultat. On vous objecte que cela nuira au financement futur — répondez précisément.", prepSeconds: 60, speakSeconds: 600 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section B — Persuader : accepter une décision impopulaire mais juste",
    prompt: "Présentez et convainquez votre interlocuteur (Section B), puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "travail",
    payload: { taskPrompt: "Une répartition plus équitable des moyens désavantagera le service le plus visible. Présentez la décision et convainquez ses représentants. On vous oppose le mérite et les résultats obtenus — traitez l'argument de front.", prepSeconds: 60, speakSeconds: 600 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section B — Persuader : maintenir un désaccord dans un collectif",
    prompt: "Présentez et convainquez votre interlocuteur (Section B), puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { taskPrompt: "Un collectif veut afficher une position unanime dont vous ne partagez pas un point essentiel. Défendez la mention publique du désaccord et convainquez le groupe. On vous répond que la division affaiblit le message — répondez-y.", prepSeconds: 60, speakSeconds: 600 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF Section B — Persuader : différer une annonce attendue",
    prompt: "Présentez et convainquez votre interlocuteur (Section B), puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "travail",
    payload: { taskPrompt: "Une annonce très attendue repose sur des éléments encore incertains. Convainquez la direction de la différer de trois semaines. On vous oppose la pression du calendrier et l'impatience du public — proposez une manière de tenir les deux.", prepSeconds: 60, speakSeconds: 600 },
  },

  // ---------- TCF C2 top-up (Rule #7: 5/4 -> 15 per expression module) ----------
  // Fixed TCF format: écrite T1 60–120 / T2 120–150 / T3 120–180; orale T1 prep 0
  // speak 120, T2 prep 120 speak 210 (8–12 questions), T3 prep 0 speak 270.
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF Tâche 1 — Message : retirer une affirmation publiée",
    prompt: "Rédigez le message demandé (Tâche 1).",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { situation: "Une donnée que vous avez citée publiquement s'avère provenir d'une source non vérifiée.", instruction: "Écrivez le message de rectification. Reconnaissez l'erreur sans la minimiser, indiquez ce qui reste valable dans votre propos, précisez la source défaillante, et dites ce que vous ferez pour l'éviter.", wordMin: 60, wordMax: 120 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF Tâche 1 — Message : refuser une simplification demandée",
    prompt: "Rédigez le message demandé (Tâche 1).",
    difficulty: "STRETCH", topicTag: "travail",
    payload: { situation: "On vous demande de résumer un résultat nuancé en une formule frappante.", instruction: "Écrivez votre réponse. Expliquez ce que la formule ferait perdre, proposez une version courte mais exacte, et indiquez ce que vous accepteriez de simplifier.", wordMin: 60, wordMax: 120 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF Tâche 1 — Message : signaler un conflit d'intérêts",
    prompt: "Rédigez le message demandé (Tâche 1).",
    difficulty: "CORE", topicTag: "travail",
    payload: { situation: "Vous devez évaluer un dossier présenté par une personne avec qui vous avez collaboré.", instruction: "Écrivez au responsable. Décrivez le lien de manière factuelle, indiquez en quoi il peut affecter votre impartialité, proposez de vous retirer, et suggérez une solution de remplacement.", wordMin: 60, wordMax: 120 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF Tâche 2 — Article : exposer un résultat contre-intuitif",
    prompt: "Rédigez le texte demandé (Tâche 2).",
    difficulty: "STRETCH", topicTag: "etudes",
    payload: { situation: "Une étude aboutit à un résultat qui contredit une idée largement partagée.", instruction: "Rédigez l'article de présentation. Exposez le résultat et la méthode, expliquez pourquoi l'intuition commune est trompeuse ici, indiquez les limites de l'étude, et évitez d'en tirer plus qu'elle ne permet.", wordMin: 120, wordMax: 150 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF Tâche 2 — Lettre : demander l'arbitrage d'une instance",
    prompt: "Rédigez le texte demandé (Tâche 2).",
    difficulty: "STRETCH", topicTag: "travail",
    payload: { situation: "Deux services appliquent des règles contradictoires au même dossier.", instruction: "Écrivez à l'instance compétente. Exposez la contradiction sans désigner de responsable, montrez ses effets concrets, demandez une position claire, et proposez la règle qui vous paraît devoir prévaloir.", wordMin: 120, wordMax: 150 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF Tâche 2 — Article : rendre compte d'un échec",
    prompt: "Rédigez le texte demandé (Tâche 2).",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { situation: "Un dispositif expérimental que vous avez soutenu n'a pas produit les effets attendus.", instruction: "Rédigez le compte rendu public. Décrivez l'intention initiale, exposez les résultats réels, analysez ce qui a manqué, et indiquez ce qui mérite d'être conservé malgré l'échec.", wordMin: 120, wordMax: 150 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF Tâche 3 — Comparer : la mémoire et l'oubli collectifs",
    prompt: "Comparez les deux points de vue puis donnez le vôtre (Tâche 3).",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { situation: "On soutient tantôt qu'une société doit tout conserver de son passé, tantôt qu'elle doit savoir en effacer une part.", instruction: "Restituez les deux thèses dans leur version la plus exigeante, dégagez le présupposé de chacune, puis défendez une position en assumant ce qu'elle sacrifie.", wordMin: 120, wordMax: 180 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF Tâche 3 — Comparer : universalité et particularité culturelles",
    prompt: "Comparez les deux points de vue puis donnez le vôtre (Tâche 3).",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { situation: "Les uns défendent des principes valables partout ; les autres soutiennent que toute norme est située.", instruction: "Exposez les deux positions sans les affaiblir, montrez où le désaccord porte réellement, puis prenez position et répondez à l'objection décisive.", wordMin: 120, wordMax: 180 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF Tâche 3 — Comparer : décider vite ou décider bien",
    prompt: "Comparez les deux points de vue puis donnez le vôtre (Tâche 3).",
    difficulty: "CORE", topicTag: "travail",
    payload: { situation: "Une école de pensée valorise la rapidité de décision, une autre la délibération prolongée.", instruction: "Présentez les deux approches et les contextes qui les favorisent, puis défendez une position en précisant les conditions dans lesquelles elle vaut.", wordMin: 120, wordMax: 180 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF Tâche 3 — Comparer : l'art doit-il quelque chose au public ?",
    prompt: "Comparez les deux points de vue puis donnez le vôtre (Tâche 3).",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { situation: "Certains estiment qu'une œuvre financée publiquement doit être accessible ; d'autres que l'exigence artistique prime.", instruction: "Exposez les deux thèses avec leurs meilleurs arguments, distinguez accessibilité et complaisance, puis défendez votre position.", wordMin: 120, wordMax: 180 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 1 — Entretien guidé : un texte qui vous a marqué",
    prompt: "Répondez à l'entretien guidé (Tâche 1), puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "loisirs",
    payload: { taskPrompt: "Parlez d'un livre ou d'un texte qui a compté pour vous : ce dont il traite, ce qu'il a changé dans votre façon de voir, et pourquoi vous y revenez.", prepSeconds: 0, speakSeconds: 120 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 1 — Entretien guidé : une idée que vous avez abandonnée",
    prompt: "Répondez à l'entretien guidé (Tâche 1), puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { taskPrompt: "Parlez d'une conviction que vous ne défendez plus : ce que vous pensiez, ce qui l'a ébranlée, et ce que vous en concluez sur la manière de se forger un avis.", prepSeconds: 0, speakSeconds: 120 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 1 — Entretien guidé : votre méthode de travail",
    prompt: "Répondez à l'entretien guidé (Tâche 1), puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "travail",
    payload: { taskPrompt: "Décrivez votre manière de conduire un travail exigeant : comment vous commencez, comment vous vérifiez, ce que vous faites quand vous bloquez, et ce que vous avez appris à ne plus faire.", prepSeconds: 0, speakSeconds: 120 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 2 — Interaction : négocier les conditions d'une expertise",
    prompt: "Posez 8 à 12 questions dans l'échange (Tâche 2), puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "travail",
    payload: { taskPrompt: "On vous confie une expertise sur un sujet sensible. Posez entre 8 et 12 questions : le mandat exact, l'accès aux données, l'indépendance éditoriale, les délais, la rémunération, la propriété du rapport, les conditions de publication, et ce qui se passe si vos conclusions déplaisent.", prepSeconds: 120, speakSeconds: 210 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 2 — Interaction : préparer une prise de fonction",
    prompt: "Posez 8 à 12 questions dans l'échange (Tâche 2), puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "travail",
    payload: { taskPrompt: "Vous prenez la direction d'un service en tension. Posez entre 8 et 12 questions : l'historique du conflit, les positions en présence, les marges budgétaires, le mandat qui vous est donné, les soutiens, les échéances, les précédents essais, et les critères sur lesquels vous serez jugé.", prepSeconds: 120, speakSeconds: 210 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 2 — Interaction : encadrer une collecte de données sensibles",
    prompt: "Posez 8 à 12 questions dans l'échange (Tâche 2), puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "etudes",
    payload: { taskPrompt: "Vous préparez une enquête portant sur des données personnelles. Posez entre 8 et 12 questions : la base légale, le consentement recueilli, l'anonymisation, la durée de conservation, les accès, les transferts éventuels, l'information des participants, et la procédure en cas d'incident.", prepSeconds: 120, speakSeconds: 210 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 3 — Point de vue : la spécialisation du savoir",
    prompt: "Exprimez et défendez un point de vue (Tâche 3), puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "etudes",
    payload: { taskPrompt: "La spécialisation croissante des savoirs rend-elle le débat public impossible ? Défendez une position argumentée en interrogeant le constat et ses conséquences.", prepSeconds: 0, speakSeconds: 270 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 3 — Point de vue : faut-il protéger les gens d'eux-mêmes ?",
    prompt: "Exprimez et défendez un point de vue (Tâche 3), puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { taskPrompt: "Jusqu'où une société peut-elle restreindre des choix individuels pour protéger ceux qui les font ? Défendez une position et traitez l'objection libérale la plus forte.", prepSeconds: 0, speakSeconds: 270 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 3 — Point de vue : l'exemplarité de ceux qui décident",
    prompt: "Exprimez et défendez un point de vue (Tâche 3), puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "societe",
    payload: { taskPrompt: "Exige-t-on trop, ou pas assez, de ceux qui exercent une responsabilité publique ? Défendez une position argumentée en distinguant la vie privée de l'exercice de la fonction.", prepSeconds: 0, speakSeconds: 270 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 3 — Point de vue : la valeur de ce qui ne se mesure pas",
    prompt: "Exprimez et défendez un point de vue (Tâche 3), puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { taskPrompt: "Ce qui échappe à la mesure est-il condamné à être négligé dans nos décisions ? Défendez une position argumentée avec des exemples précis.", prepSeconds: 0, speakSeconds: 270 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF Tâche 3 — Point de vue : hériter d'un patrimoine encombrant",
    prompt: "Exprimez et défendez un point de vue (Tâche 3), puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { taskPrompt: "Que faire des monuments ou des noms liés à un passé contesté ? Défendez une position argumentée, en évitant les deux facilités que sont l'effacement et le maintien sans examen.", prepSeconds: 0, speakSeconds: 270 },
  },

  // ---------- DALF C2 top-up (Rule #7: 6/7 -> 15 per expression module) ----------
  // Structure per src/lib/french/exam-structure.ts. At C2 the épreuve is INTEGRATED
  // (compréhension ET production, /50): the candidate works from a dossier of roughly
  // 2 000 mots and produces ONE structured text of 700+ mots — our 850 ceiling is a
  // stated practice convention, not a limit the exam imposes. We model the PRODUCTION
  // side only, which is what a writing item can be. Orally the épreuve runs compte
  // rendu → développement personnel → débat, with an hour of preparation.
  // Dossier extracts are ORIGINAL, written for this exercise.
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DALF C2 — Production intégrée : à qui appartient une découverte ?",
    prompt: "Produisez un texte structuré à partir du dossier (700–850 mots).",
    difficulty: "STRETCH", topicTag: "etudes",
    payload: { situation: "Dossier (extraits) — 1. « Sans brevet, aucun laboratoire privé n'engagerait ces sommes. » 2. « Une molécule financée sur fonds publics devrait revenir au public qui l'a payée. » 3. « Les licences obligatoires existent, mais leur mise en œuvre reste rare et lente. » 4. « Le partage précoce des résultats accélère la recherche autant qu'il expose ses auteurs. »", instruction: "Rédigez un article de fond destiné à un lectorat exigeant. Dégagez les enjeux du dossier, articulez-les à vos propres connaissances, défendez une position construite, et traitez l'objection la plus solide.", wordMin: 700, wordMax: 850 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DALF C2 — Production intégrée : la ville face à ses habitants",
    prompt: "Produisez un texte structuré à partir du dossier (700–850 mots).",
    difficulty: "STRETCH", topicTag: "logement",
    payload: { situation: "Dossier (extraits) — 1. « Le centre s'embellit et se vide de ceux qui y vivaient. » 2. « Sans rénovation, ces immeubles seraient inhabitables dans dix ans. » 3. « Les dispositifs d'encadrement des loyers produisent des effets contrastés selon la tension du marché. » 4. « Les habitants consultés le sont souvent après que l'essentiel est arbitré. »", instruction: "Rédigez un texte structuré pour une revue urbaine. Exposez la tension centrale, mobilisez vos connaissances propres, défendez une orientation, et montrez ce qu'elle coûte.", wordMin: 700, wordMax: 850 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DALF C2 — Production intégrée : ce que l'automatisation déplace",
    prompt: "Produisez un texte structuré à partir du dossier (700–850 mots).",
    difficulty: "STRETCH", topicTag: "travail",
    payload: { situation: "Dossier (extraits) — 1. « Les tâches disparaissent plus vite que les métiers. » 2. « La productivité gagnée ne se traduit pas mécaniquement en temps libéré. » 3. « Les reconversions réussies supposent un accompagnement long, rarement financé. » 4. « Les métiers les moins automatisables sont souvent les moins rémunérés. »", instruction: "Rédigez un texte structuré. Dégagez ce que le dossier établit et ce qu'il laisse ouvert, appuyez-vous sur vos connaissances, et défendez une analyse personnelle argumentée.", wordMin: 700, wordMax: 850 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DALF C2 — Production intégrée : la confiance dans l'information",
    prompt: "Produisez un texte structuré à partir du dossier (700–850 mots).",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { situation: "Dossier (extraits) — 1. « La défiance ne vient pas d'un manque d'information mais de son abondance contradictoire. » 2. « Les rectifications atteignent une fraction du public touché par l'erreur initiale. » 3. « La vérification systématique est coûteuse et peu visible. » 4. « Signaler une source ne suffit pas si le lecteur n'a pas les moyens de l'apprécier. »", instruction: "Rédigez un texte de réflexion. Construisez une problématique à partir du dossier, intégrez vos connaissances, et défendez une position en évitant le constat désabusé.", wordMin: 700, wordMax: 850 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DALF C2 — Production intégrée : soigner ce qui ne guérit pas",
    prompt: "Produisez un texte structuré à partir du dossier (700–850 mots).",
    difficulty: "STRETCH", topicTag: "sante",
    payload: { situation: "Dossier (extraits) — 1. « La médecine sait prolonger des vies qu'elle ne sait pas rendre supportables. » 2. « Les soins d'accompagnement restent inégalement répartis sur le territoire. » 3. « La décision revient au patient, à condition qu'il ait été mis en mesure de décider. » 4. « Le temps du soin et le temps administratif ne coïncident pas. »", instruction: "Rédigez un texte structuré destiné à un public averti. Dégagez les enjeux, mobilisez vos connaissances, et défendez une position argumentée sans céder au pathos.", wordMin: 700, wordMax: 850 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DALF C2 — Production intégrée : enseigner à l'ère des machines",
    prompt: "Produisez un texte structuré à partir du dossier (700–850 mots).",
    difficulty: "STRETCH", topicTag: "etudes",
    payload: { situation: "Dossier (extraits) — 1. « Un devoir peut désormais être produit sans avoir été pensé. » 2. « Interdire l'outil revient à ignorer ce que les élèves feront ensuite. » 3. « L'évaluation orale résiste mieux, mais coûte du temps d'enseignant. » 4. « Ce que l'on mesure finit par définir ce que l'on enseigne. »", instruction: "Rédigez un texte structuré. Construisez la problématique, intégrez vos connaissances propres, et défendez une orientation pédagogique argumentée.", wordMin: 700, wordMax: 850 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DALF C2 — Production intégrée : le prix du silence",
    prompt: "Produisez un texte structuré à partir du dossier (700–850 mots).",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { situation: "Dossier (extraits) — 1. « Le bruit est devenu la nuisance la plus citée par les habitants des grandes villes. » 2. « Les logements les plus exposés sont aussi les plus abordables. » 3. « L'isolation acoustique reste absente de la plupart des aides à la rénovation. » 4. « Le silence est devenu un bien qui se loue. »", instruction: "Rédigez un texte structuré. Dégagez ce que le dossier révèle d'une inégalité, appuyez-vous sur vos connaissances, et défendez une position argumentée.", wordMin: 700, wordMax: 850 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DALF C2 — Production intégrée : conserver ou transmettre",
    prompt: "Produisez un texte structuré à partir du dossier (700–850 mots).",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { situation: "Dossier (extraits) — 1. « Une archive que personne ne consulte est-elle conservée ou seulement stockée ? » 2. « La numérisation sauve le contenu et perd l'objet. » 3. « Les budgets de conservation croissent moins vite que les volumes produits. » 4. « Choisir ce qu'on garde, c'est déjà écrire l'histoire. »", instruction: "Rédigez un texte de réflexion structuré. Construisez la problématique à partir du dossier, mobilisez vos connaissances, et défendez une position en assumant ses conséquences.", wordMin: 700, wordMax: 850 },
  },
  {
    level: "C2", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DALF C2 — Production intégrée : la frontière du privé",
    prompt: "Produisez un texte structuré à partir du dossier (700–850 mots).",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { situation: "Dossier (extraits) — 1. « Le consentement recueilli en un clic protège surtout celui qui le demande. » 2. « L'anonymat parfait n'existe pas dès lors que les jeux de données se croisent. » 3. « Les usages utiles et les usages intrusifs reposent sur la même collecte. » 4. « Ce qui est légal aujourd'hui a été rendu possible par des choix techniques d'hier. »", instruction: "Rédigez un texte structuré pour une revue généraliste exigeante. Dégagez les enjeux, intégrez vos connaissances, et défendez une position argumentée et nuancée.", wordMin: 700, wordMax: 850 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DALF C2 — Compte rendu, développement et débat : la sobriété énergétique",
    prompt: "Rendez compte du document, développez votre point de vue, puis débattez.",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { taskPrompt: "Document sonore (environ 14 minutes) : une table ronde sur les politiques de sobriété énergétique, où s'opposent la contrainte réglementaire et l'incitation. Rendez-en compte fidèlement, développez ensuite votre propre analyse, puis défendez-la dans un débat avec l'examinateur.", prepSeconds: 3600, speakSeconds: 600 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DALF C2 — Compte rendu, développement et débat : la valeur du travail domestique",
    prompt: "Rendez compte du document, développez votre point de vue, puis débattez.",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { taskPrompt: "Document sonore (environ 14 minutes) : un entretien sur la place du travail non rémunéré dans l'économie et sur les tentatives de le comptabiliser. Rendez-en compte, développez votre analyse personnelle, puis soutenez-la en débat.", prepSeconds: 3600, speakSeconds: 600 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DALF C2 — Compte rendu, développement et débat : la justice et le temps",
    prompt: "Rendez compte du document, développez votre point de vue, puis débattez.",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { taskPrompt: "Document sonore (environ 14 minutes) : un débat sur les délais judiciaires et sur ce que l'attente fait aux parties. Rendez-en compte sans en trahir les nuances, développez votre point de vue, puis défendez-le face aux objections.", prepSeconds: 3600, speakSeconds: 600 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DALF C2 — Compte rendu, développement et débat : la langue et le pouvoir",
    prompt: "Rendez compte du document, développez votre point de vue, puis débattez.",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { taskPrompt: "Document sonore (environ 14 minutes) : une conférence sur la manière dont le vocabulaire administratif oriente la perception des politiques publiques. Rendez-en compte, développez votre analyse, puis débattez-en.", prepSeconds: 3600, speakSeconds: 600 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DALF C2 — Compte rendu, développement et débat : la recherche et l'urgence",
    prompt: "Rendez compte du document, développez votre point de vue, puis débattez.",
    difficulty: "STRETCH", topicTag: "etudes",
    payload: { taskPrompt: "Document sonore (environ 14 minutes) : une discussion sur le financement de la recherche fondamentale à l'heure où les priorités sont fixées par l'urgence. Rendez-en compte, développez votre position, puis défendez-la en débat.", prepSeconds: 3600, speakSeconds: 600 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DALF C2 — Compte rendu, développement et débat : l'école et l'orientation",
    prompt: "Rendez compte du document, développez votre point de vue, puis débattez.",
    difficulty: "STRETCH", topicTag: "etudes",
    payload: { taskPrompt: "Document sonore (environ 14 minutes) : une table ronde sur l'âge auquel les élèves doivent choisir une voie, et sur ce que ce choix détermine. Rendez-en compte, développez votre analyse, puis soutenez-la face aux objections.", prepSeconds: 3600, speakSeconds: 600 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DALF C2 — Compte rendu, développement et débat : le tourisme et ses limites",
    prompt: "Rendez compte du document, développez votre point de vue, puis débattez.",
    difficulty: "CORE", topicTag: "societe",
    payload: { taskPrompt: "Document sonore (environ 14 minutes) : un reportage sur des territoires qui limitent l'accueil touristique et sur les effets économiques de ces mesures. Rendez-en compte, développez votre position, puis débattez-en.", prepSeconds: 3600, speakSeconds: 600 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DALF C2 — Compte rendu, développement et débat : ce que l'on doit aux générations suivantes",
    prompt: "Rendez compte du document, développez votre point de vue, puis débattez.",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { taskPrompt: "Document sonore (environ 14 minutes) : un débat philosophique sur la portée de nos obligations envers ceux qui ne sont pas encore nés. Rendez-en compte fidèlement, développez votre propre analyse, puis défendez-la en débat.", prepSeconds: 3600, speakSeconds: 600 },
  },
  {
    level: "C2", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DALF C2 — Compte rendu, développement et débat : l'expertise contestée",
    prompt: "Rendez compte du document, développez votre point de vue, puis débattez.",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { taskPrompt: "Document sonore (environ 14 minutes) : une émission sur la manière dont les avis d'experts sont reçus, discutés et parfois rejetés dans le débat public. Rendez-en compte, développez votre analyse, puis soutenez-la en débat.", prepSeconds: 3600, speakSeconds: 600 },
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
  console.log(`seed:c2 — ${created} created, ${ITEMS.length - created} already present`);
}

if (isDirectRun(import.meta.url)) {
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(() => prisma.$disconnect());
}
