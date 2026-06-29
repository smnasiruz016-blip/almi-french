// C1 content wave — original French items, never copied from CCI Paris or France
// Éducation International. ~16 per skill. Reading/Listening are SHARED (examFamily
// null, reused across exams); Writing/Speaking carry an examFamily so the prompt
// can be exam-specific (the C1 diploma is DALF C1). C1 register: near-native —
// nuance, implicit stance, irony, sophisticated abstract argumentation.
//
// Run: npm run seed:c1   (needs DATABASE_URL set)

import { PrismaClient, Prisma } from "@prisma/client";
import { isDirectRun } from "./_entry";

const prisma = new PrismaClient();

export const ITEMS: Prisma.FrenchItemCreateManyInput[] = [
  // ---------- Compréhension écrite (Reading) — shared (examFamily null) ----------
  {
    level: "C1", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Essai : l'économie de l'attention",
    prompt: "Lisez l'essai et répondez aux questions.",
    difficulty: "CORE", topicTag: "medias",
    payload: {
      passages: [{ id: "p1", heading: "Ce que captent nos écrans", body: "On présente volontiers la profusion d'informations comme une richesse. Pourtant, ce n'est pas l'information qui manque, mais le temps et la disponibilité d'esprit pour la traiter. Dès lors, la ressource rare n'est plus le contenu : c'est l'attention. Les plateformes l'ont compris avant nous, et l'ont érigée en monnaie. Leur prospérité ne se mesure pas à ce qu'elles nous apprennent, mais au nombre de minutes qu'elles nous arrachent. Le paradoxe est cruel : plus l'accès au savoir s'élargit, plus notre capacité à nous y consacrer se rétrécit." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Selon l'auteur, quelle est la véritable ressource rare ?", options: [{ id: "a", text: "L'information" }, { id: "b", text: "L'attention" }, { id: "c", text: "Le contenu gratuit" }], answer: "b" },
        { id: "q2", kind: "mcq", stem: "Quel « paradoxe » l'auteur souligne-t-il ?", options: [{ id: "a", text: "Le savoir s'élargit mais notre disponibilité se réduit" }, { id: "b", text: "Les plateformes nous instruisent davantage" }, { id: "c", text: "L'information devient payante" }], answer: "a" },
      ],
    },
  },
  {
    level: "C1", skill: "COMPREHENSION_ECRITE", taskType: "VRAI_FAUX", examFamily: null,
    title: "Tribune : éloge mesuré de la lenteur",
    prompt: "Lisez la tribune et indiquez si chaque affirmation est vraie ou fausse.",
    difficulty: "CORE", topicTag: "societe",
    payload: {
      passages: [{ id: "p1", body: "Qu'on ne s'y trompe pas : faire l'éloge de la lenteur n'est pas prôner l'immobilisme. Il ne s'agit pas de ralentir par principe, mais de refuser que la vitesse devienne une valeur en soi, indiscutée. Aller vite a un coût que l'on tait souvent : l'erreur, la fatigue, l'appauvrissement de la relation aux choses. La lenteur revendiquée ici est une exigence, non une paresse — celle de faire bien plutôt que de faire beaucoup." }],
      questions: [
        { id: "q1", kind: "truefalse", stem: "L'auteur défend l'immobilisme.", answer: "false" },
        { id: "q2", kind: "truefalse", stem: "Pour l'auteur, la vitesse a un coût souvent passé sous silence.", answer: "true" },
        { id: "q3", kind: "truefalse", stem: "La lenteur est ici assimilée à de la paresse.", answer: "false" },
      ],
    },
  },
  {
    level: "C1", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Analyse : l'intelligence artificielle et la création",
    prompt: "Lisez le texte et répondez aux questions.",
    difficulty: "STRETCH", topicTag: "technologie",
    payload: {
      passages: [{ id: "p1", body: "Faut-il craindre que les machines se mettent à créer ? La question, posée ainsi, est mal formulée. Une machine recombine, à une échelle inédite, ce qui a déjà été produit ; elle excelle à imiter des styles, non à éprouver le besoin d'en inventer un. Ce qui distingue l'artiste n'est pas la virtuosité technique — la machine l'égale, parfois la dépasse — mais l'intention, le risque assumé d'un écart. Tant qu'elle ne désire rien, la machine reste un outil remarquable, fût-il déroutant." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Pourquoi l'auteur juge-t-il la question « mal formulée » ?", options: [{ id: "a", text: "Parce que les machines ne recombinent rien" }, { id: "b", text: "Parce que créer suppose une intention que la machine n'a pas" }, { id: "c", text: "Parce que la technique suffit à définir l'art" }], answer: "b" },
        { id: "q2", kind: "mcq", stem: "Quelle est la position finale de l'auteur sur la machine ?", options: [{ id: "a", text: "Un outil remarquable mais dépourvu de désir" }, { id: "b", text: "Un véritable artiste" }, { id: "c", text: "Une menace inévitable" }], answer: "a" },
      ],
    },
  },
  {
    level: "C1", skill: "COMPREHENSION_ECRITE", taskType: "MATCHING", examFamily: null,
    title: "Trois regards sur la décroissance",
    prompt: "Associez chaque opinion à son auteur (A, B ou C).",
    difficulty: "STRETCH", topicTag: "environnement",
    payload: {
      passages: [
        { id: "A", heading: "Camille", body: "La décroissance n'est pas un recul : c'est choisir ce qui compte plutôt que d'accumuler ce qui encombre." },
        { id: "B", heading: "Driss", body: "Méfions-nous des mots d'ordre : sans transition industrielle massive, la décroissance restera un luxe de privilégiés." },
        { id: "C", heading: "Léa", body: "Le débat est mal posé : l'enjeu n'est pas moins, mais autrement — réorienter, pas seulement réduire." },
      ],
      questions: [
        { id: "q1", kind: "match", stem: "Qui estime que l'enjeu est de réorienter plutôt que de réduire ?", options: [{ id: "A", text: "Camille" }, { id: "B", text: "Driss" }, { id: "C", text: "Léa" }], answer: "C" },
        { id: "q2", kind: "match", stem: "Qui redoute que la décroissance ne profite qu'aux plus aisés ?", options: [{ id: "A", text: "Camille" }, { id: "B", text: "Driss" }, { id: "C", text: "Léa" }], answer: "B" },
        { id: "q3", kind: "match", stem: "Qui y voit un choix de priorités plutôt qu'un recul ?", options: [{ id: "A", text: "Camille" }, { id: "B", text: "Driss" }, { id: "C", text: "Léa" }], answer: "A" },
      ],
    },
  },
  {
    level: "C1", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Essai : la langue et le pouvoir",
    prompt: "Lisez l'essai et répondez.",
    difficulty: "CORE", topicTag: "langue",
    payload: {
      passages: [{ id: "p1", body: "On affirme volontiers que la langue ne fait que décrire le monde. C'est oublier qu'elle le découpe. Nommer, c'est déjà choisir ce que l'on rend visible et ce que l'on laisse dans l'ombre. Les termes que l'administration retient, ceux qu'elle écarte, dessinent une carte du pensable. Aussi le combat pour les mots n'est-il jamais purement esthétique : il est, souterrainement, un combat pour ce qu'il sera permis de concevoir." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Quelle thèse l'auteur conteste-t-il ?", options: [{ id: "a", text: "Que la langue se contente de décrire le monde" }, { id: "b", text: "Que la langue découpe le réel" }, { id: "c", text: "Que les mots ont un enjeu politique" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "Que signifie « une carte du pensable » ?", options: [{ id: "a", text: "Un plan administratif" }, { id: "b", text: "Les limites de ce qu'on peut concevoir" }, { id: "c", text: "Un dictionnaire officiel" }], answer: "b" },
      ],
    },
  },
  {
    level: "C1", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Critique : une rétrospective trop sage",
    prompt: "Lisez la critique et répondez (attention au ton).",
    difficulty: "STRETCH", topicTag: "culture",
    payload: {
      passages: [{ id: "p1", body: "Tout, dans cette rétrospective, est irréprochable : l'accrochage, l'éclairage, la signalétique. On en ressort avec le sentiment troublant d'avoir visité non pas une œuvre, mais sa mise en conformité. À force de vouloir tout expliquer, l'exposition n'a rien laissé à éprouver. C'est une réussite de musée — et c'est précisément ce qu'on lui reprochera." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Quel est le jugement réel du critique ?", options: [{ id: "a", text: "Élogieux sans réserve" }, { id: "b", text: "Critique sous une apparence de compliment" }, { id: "c", text: "Indifférent" }], answer: "b" },
        { id: "q2", kind: "mcq", stem: "Que reproche-t-il à l'exposition ?", options: [{ id: "a", text: "De ne rien laisser à éprouver à force de tout expliquer" }, { id: "b", text: "Un mauvais éclairage" }, { id: "c", text: "Une signalétique confuse" }], answer: "a" },
      ],
    },
  },
  {
    level: "C1", skill: "COMPREHENSION_ECRITE", taskType: "VRAI_FAUX", examFamily: null,
    title: "Article : la mémoire collective",
    prompt: "Lisez l'article et indiquez si chaque phrase est vraie ou fausse.",
    difficulty: "CORE", topicTag: "histoire",
    payload: {
      passages: [{ id: "p1", body: "La mémoire collective n'est pas un dépôt fidèle du passé ; elle est une reconstruction permanente, façonnée par les besoins du présent. Ce qu'une société choisit de commémorer en dit souvent davantage sur ses préoccupations actuelles que sur l'événement lui-même. Oublier, à cet égard, n'est pas toujours une défaillance : c'est parfois une condition pour avancer. Encore faut-il distinguer l'oubli qui apaise de celui qui efface les responsabilités." }],
      questions: [
        { id: "q1", kind: "truefalse", stem: "Selon le texte, la mémoire collective conserve fidèlement le passé.", answer: "false" },
        { id: "q2", kind: "truefalse", stem: "Les choix de commémoration reflètent les préoccupations présentes.", answer: "true" },
        { id: "q3", kind: "truefalse", stem: "L'auteur juge tout oubli également souhaitable.", answer: "false" },
      ],
    },
  },
  {
    level: "C1", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Essai : le travail et le sens",
    prompt: "Lisez le texte et répondez.",
    difficulty: "CORE", topicTag: "travail",
    payload: {
      passages: [{ id: "p1", body: "On répète qu'il faut « donner du sens » au travail, comme si le sens était un supplément que l'on ajouterait après coup, une fois la tâche définie. Or le sens ne se décrète pas : il naît, ou non, de l'autonomie laissée à celui qui agit, de la reconnaissance de ce qu'il fait, de l'utilité qu'il peut en percevoir. Faute de ces conditions, les discours sur le sens ne sont qu'un vernis posé sur une organisation inchangée." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Quelle idée l'auteur critique-t-il ?", options: [{ id: "a", text: "Que le sens serait un supplément ajouté après coup" }, { id: "b", text: "Que l'autonomie compte" }, { id: "c", text: "Que la reconnaissance est utile" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "À quoi compare-t-il les discours sur le sens en l'absence de conditions réelles ?", options: [{ id: "a", text: "À un vernis sur une organisation inchangée" }, { id: "b", text: "À une révolution" }, { id: "c", text: "À une utopie" }], answer: "a" },
      ],
    },
  },
  {
    level: "C1", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Chronique : l'injonction à la transparence",
    prompt: "Lisez la chronique et répondez.",
    difficulty: "STRETCH", topicTag: "societe",
    payload: {
      passages: [{ id: "p1", body: "La transparence s'est imposée comme une vertu qu'on ne discute plus. Qui oserait défendre l'opacité ? Et pourtant. Une société où tout doit être exposé n'est pas nécessairement plus libre : elle peut devenir celle où chacun se surveille, anticipe le regard, lisse ses aspérités. La part d'ombre n'est pas toujours coupable ; elle est aussi l'espace où se forment des pensées encore incertaines, qu'une exposition prématurée tuerait dans l'œuf." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Quelle est la position nuancée de l'auteur ?", options: [{ id: "a", text: "La transparence totale n'est pas nécessairement un progrès" }, { id: "b", text: "L'opacité doit toujours l'emporter" }, { id: "c", text: "La transparence est sans effet" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "Que défend l'auteur à propos de la « part d'ombre » ?", options: [{ id: "a", text: "Elle est toujours coupable" }, { id: "b", text: "Elle protège des pensées encore incertaines" }, { id: "c", text: "Elle empêche toute liberté" }], answer: "b" },
      ],
    },
  },
  {
    level: "C1", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Essai : la mondialisation des goûts",
    prompt: "Lisez l'essai et répondez.",
    difficulty: "CORE", topicTag: "culture",
    payload: {
      passages: [{ id: "p1", body: "On déplore l'uniformisation des cultures, et le reproche n'est pas sans fondement. Mais le tableau est plus retors qu'il n'y paraît. Les mêmes flux qui diffusent partout les mêmes produits permettent aussi à des formes longtemps confinées de trouver un public lointain. L'uniformisation et la diversification ne s'excluent pas : elles avancent de concert, et c'est cette ambivalence, plutôt que la déploration, qu'il faudrait apprendre à penser." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Quelle nuance l'auteur apporte-t-il au reproche d'uniformisation ?", options: [{ id: "a", text: "Les mêmes flux favorisent aussi la diversité" }, { id: "b", text: "L'uniformisation n'existe pas" }, { id: "c", text: "La diversité a disparu" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "Que reproche-t-il implicitement ?", options: [{ id: "a", text: "De s'en tenir à la déploration plutôt que de penser l'ambivalence" }, { id: "b", text: "D'exagérer la diversité" }, { id: "c", text: "De défendre les flux mondiaux" }], answer: "a" },
      ],
    },
  },
  {
    level: "C1", skill: "COMPREHENSION_ECRITE", taskType: "VRAI_FAUX", examFamily: null,
    title: "Texte : le doute en science",
    prompt: "Lisez le texte et indiquez vrai ou faux.",
    difficulty: "CORE", topicTag: "sciences",
    payload: {
      passages: [{ id: "p1", body: "Le grand public attend souvent de la science des certitudes ; or le doute n'est pas son échec, mais son moteur. Une hypothèse vaut tant qu'elle résiste aux tentatives de la réfuter ; le jour où elle cède, la connaissance progresse. Confondre cette révision permanente avec de l'inconstance, c'est se méprendre sur la démarche elle-même. Ce qui doit inquiéter, ce n'est pas une science qui se corrige, mais un discours qui ne se corrige jamais." }],
      questions: [
        { id: "q1", kind: "truefalse", stem: "Selon le texte, le doute est un échec de la science.", answer: "false" },
        { id: "q2", kind: "truefalse", stem: "Une hypothèse vaut tant qu'elle résiste aux tentatives de réfutation.", answer: "true" },
        { id: "q3", kind: "truefalse", stem: "Un discours qui ne se corrige jamais est présenté comme rassurant.", answer: "false" },
      ],
    },
  },
  {
    level: "C1", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Billet : la nostalgie comme refuge",
    prompt: "Lisez le billet et répondez.",
    difficulty: "CORE", topicTag: "societe",
    payload: {
      passages: [{ id: "p1", body: "La nostalgie a ceci de commode qu'elle embellit ce qui n'est plus et nous dispense de juger ce qui est. On regrette un passé recomposé, débarrassé de ses pesanteurs, pour mieux se soustraire à l'effort d'agir sur le présent. Rien n'interdit de chérir une époque ; encore faut-il ne pas en faire l'alibi d'un renoncement." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Quel risque l'auteur associe-t-il à la nostalgie ?", options: [{ id: "a", text: "Qu'elle serve d'alibi au renoncement à agir" }, { id: "b", text: "Qu'elle améliore le présent" }, { id: "c", text: "Qu'elle juge trop sévèrement le passé" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "Le passé regretté est décrit comme…", options: [{ id: "a", text: "Recomposé et embelli" }, { id: "b", text: "Fidèlement restitué" }, { id: "c", text: "Pénible" }], answer: "a" },
      ],
    },
  },
  {
    level: "C1", skill: "COMPREHENSION_ECRITE", taskType: "MATCHING", examFamily: null,
    title: "Débat : faut-il noter les élèves ?",
    prompt: "Associez chaque position à son intervenant (A, B ou C).",
    difficulty: "STRETCH", topicTag: "education",
    payload: {
      passages: [
        { id: "A", heading: "Une enseignante", body: "La note rassure les familles, mais elle réduit un apprentissage vivant à un chiffre qui en dit peu." },
        { id: "B", heading: "Un inspecteur", body: "Supprimer la note sans repenser l'évaluation, c'est troquer une illusion contre une autre." },
        { id: "C", heading: "Un parent", body: "Sans repère chiffré, comment savoir où en est réellement mon enfant ?" },
      ],
      questions: [
        { id: "q1", kind: "match", stem: "Qui craint de remplacer une illusion par une autre ?", options: [{ id: "A", text: "L'enseignante" }, { id: "B", text: "L'inspecteur" }, { id: "C", text: "Le parent" }], answer: "B" },
        { id: "q2", kind: "match", stem: "Qui tient à un repère chiffré ?", options: [{ id: "A", text: "L'enseignante" }, { id: "B", text: "L'inspecteur" }, { id: "C", text: "Le parent" }], answer: "C" },
        { id: "q3", kind: "match", stem: "Qui juge que la note réduit l'apprentissage à un chiffre ?", options: [{ id: "A", text: "L'enseignante" }, { id: "B", text: "L'inspecteur" }, { id: "C", text: "Le parent" }], answer: "A" },
      ],
    },
  },
  {
    level: "C1", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Essai : l'utopie a-t-elle encore un sens ?",
    prompt: "Lisez l'essai et répondez.",
    difficulty: "STRETCH", topicTag: "idees",
    payload: {
      passages: [{ id: "p1", body: "On enterre régulièrement l'utopie, accusée d'avoir nourri les pires aventures. Le procès est expéditif. L'utopie n'est pas un programme à appliquer de force ; c'est un horizon qui permet de mesurer l'écart entre ce qui est et ce qui pourrait être. Privée d'horizon, une société ne devient pas plus raisonnable : elle se contente du présent, faute de pouvoir l'imaginer autrement. Le danger n'est pas de rêver trop grand, mais de ne plus rêver du tout." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Comment l'auteur définit-il l'utopie ?", options: [{ id: "a", text: "Un programme à imposer" }, { id: "b", text: "Un horizon pour mesurer l'écart entre le réel et le possible" }, { id: "c", text: "Une illusion dangereuse" }], answer: "b" },
        { id: "q2", kind: "mcq", stem: "Quel est, selon lui, le véritable danger ?", options: [{ id: "a", text: "Rêver trop grand" }, { id: "b", text: "Ne plus rêver du tout" }, { id: "c", text: "Appliquer l'utopie" }], answer: "b" },
      ],
    },
  },
  {
    level: "C1", skill: "COMPREHENSION_ECRITE", taskType: "MCQ", examFamily: null,
    title: "Analyse : la donnée, nouvelle ressource ?",
    prompt: "Lisez le texte et répondez.",
    difficulty: "CORE", topicTag: "technologie",
    payload: {
      passages: [{ id: "p1", body: "Comparer les données au pétrole est devenu un lieu commun ; la formule séduit, mais elle égare. Le pétrole se consume quand on l'utilise ; la donnée, elle, se duplique sans s'épuiser et ne vaut qu'une fois traitée, croisée, interprétée. Surtout, elle porte sur des personnes, ce qui en fait moins une matière première qu'une responsabilité. Filer la métaphore industrielle, c'est risquer d'oublier précisément ce qui devrait nous retenir." }],
      questions: [
        { id: "q1", kind: "mcq", stem: "Pourquoi la comparaison avec le pétrole « égare »-t-elle ?", options: [{ id: "a", text: "La donnée se duplique et porte sur des personnes" }, { id: "b", text: "La donnée s'épuise plus vite" }, { id: "c", text: "Le pétrole vaut davantage" }], answer: "a" },
        { id: "q2", kind: "mcq", stem: "Que devrait nous « retenir », selon l'auteur ?", options: [{ id: "a", text: "Le fait que la donnée engage une responsabilité envers les personnes" }, { id: "b", text: "Le rendement industriel" }, { id: "c", text: "La rareté de la donnée" }], answer: "a" },
      ],
    },
  },
  {
    level: "C1", skill: "COMPREHENSION_ECRITE", taskType: "VRAI_FAUX", examFamily: null,
    title: "Tribune : l'engagement associatif",
    prompt: "Lisez la tribune et indiquez vrai ou faux.",
    difficulty: "CORE", topicTag: "vie-publique",
    payload: {
      passages: [{ id: "p1", body: "On célèbre l'engagement bénévole comme un remède à l'effritement du lien social. Le mérite est réel, mais gardons-nous d'y voir une solution suffisante. Lorsque l'initiative privée comble systématiquement les manques des services publics, elle finit par les légitimer. Reconnaître le dévouement des bénévoles ne devrait pas dispenser la collectivité de ses propres responsabilités ; ce serait transformer une générosité en supplétif commode." }],
      questions: [
        { id: "q1", kind: "truefalse", stem: "L'auteur nie tout mérite au bénévolat.", answer: "false" },
        { id: "q2", kind: "truefalse", stem: "Il met en garde contre le fait que le bénévolat légitime le retrait des services publics.", answer: "true" },
        { id: "q3", kind: "truefalse", stem: "Selon lui, le bénévolat dispense la collectivité de ses responsabilités.", answer: "false" },
      ],
    },
  },

  // ---------- Compréhension orale (Listening) — shared (examFamily null) ----------
  {
    level: "C1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Conférence : le cerveau et l'habitude",
    prompt: "Écoutez l'extrait de conférence et répondez.",
    difficulty: "CORE", topicTag: "sciences",
    payload: {
      audioScript: "Ce que nous appelons volonté est bien plus fragile que nous aimons le croire. La plupart de nos actes quotidiens relèvent de l'habitude, c'est-à-dire d'automatismes que le cerveau a installés pour s'épargner de l'effort. La bonne nouvelle, c'est que ces automatismes se reprogramment : non par la seule décision, qui s'épuise vite, mais en modifiant l'environnement qui les déclenche. On ne change pas une habitude en la combattant ; on la change en changeant ce qui l'appelle.",
      speakers: [{ role: "Conférencière", voice: "nova" }],
      questions: [
        { id: "q1", stem: "Selon l'intervenante, la plupart de nos actes relèvent…", options: [{ id: "a", text: "De la volonté pure" }, { id: "b", text: "de l'habitude" }, { id: "c", text: "du hasard" }], answer: "b" },
        { id: "q2", stem: "Comment changer une habitude, d'après elle ?", options: [{ id: "a", text: "En modifiant l'environnement qui la déclenche" }, { id: "b", text: "Par la seule décision" }, { id: "c", text: "En la combattant frontalement" }], answer: "a" },
      ],
    },
  },
  {
    level: "C1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Débat : faut-il réguler les algorithmes ?",
    prompt: "Écoutez le débat et répondez.",
    difficulty: "STRETCH", topicTag: "technologie",
    payload: {
      audioScript: "Animateur : Faut-il réguler les algorithmes de recommandation ? Invitée : La régulation est nécessaire, mais elle ne suffira pas. Invité : Voilà au moins un point d'accord. Invitée : Tant que le modèle économique récompense le temps passé plutôt que la qualité, on traitera les symptômes, pas la cause. Invité : Je vous rejoins sur le diagnostic ; je diverge sur le remède. Imposer la transparence du code n'éclairera personne ; ce qu'il faut, c'est rendre des comptes sur les effets.",
      speakers: [{ role: "Animateur", voice: "echo" }, { role: "Invitée", voice: "shimmer" }, { role: "Invité", voice: "onyx" }],
      questions: [
        { id: "q1", stem: "Sur quoi les deux invités s'accordent-ils ?", options: [{ id: "a", text: "Que la régulation seule ne suffira pas" }, { id: "b", text: "Qu'il ne faut rien faire" }, { id: "c", text: "Qu'il faut publier le code" }], answer: "a" },
        { id: "q2", stem: "Que propose l'invité plutôt que la transparence du code ?", options: [{ id: "a", text: "Rendre des comptes sur les effets" }, { id: "b", text: "Interdire les algorithmes" }, { id: "c", text: "Augmenter le temps passé" }], answer: "a" },
      ],
    },
  },
  {
    level: "C1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Entretien : une historienne de l'alimentation",
    prompt: "Écoutez l'entretien et répondez.",
    difficulty: "CORE", topicTag: "histoire",
    payload: {
      audioScript: "Journaliste : On présente souvent la cuisine traditionnelle comme immuable. Historienne : C'est un contresens séduisant. Ce qu'on tient pour ancestral est souvent récent, et ce qu'on croit local a beaucoup voyagé. La tradition n'est pas ce qui ne change pas ; c'est ce qu'une époque décide de garder, et qu'elle pare d'ancienneté pour mieux la légitimer.",
      speakers: [{ role: "Journaliste", voice: "fable" }, { role: "Historienne", voice: "nova" }],
      questions: [
        { id: "q1", stem: "Quel « contresens » l'historienne relève-t-elle ?", options: [{ id: "a", text: "Croire la cuisine traditionnelle immuable" }, { id: "b", text: "Croire qu'elle a voyagé" }, { id: "c", text: "Croire qu'elle est récente" }], answer: "a" },
        { id: "q2", stem: "Comment définit-elle la tradition ?", options: [{ id: "a", text: "Ce qu'une époque décide de garder" }, { id: "b", text: "Ce qui ne change jamais" }, { id: "c", text: "Ce qui vient toujours d'ailleurs" }], answer: "a" },
      ],
    },
  },
  {
    level: "C1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Cours : l'économie comportementale",
    prompt: "Écoutez l'extrait de cours et répondez.",
    difficulty: "STRETCH", topicTag: "economie",
    payload: {
      audioScript: "L'idée que nous serions des agents parfaitement rationnels a longtemps structuré l'économie. Les travaux récents l'ont sérieusement entamée. Nous décidons sous l'influence du contexte, de la manière dont les choix nous sont présentés, de notre aversion à la perte. Cela ne signifie pas que nous serions irrationnels au sens d'imprévisibles : nos écarts sont systématiques, donc, paradoxalement, modélisables. C'est ce déplacement — de la rationalité supposée aux biais réguliers — qui a renouvelé la discipline.",
      speakers: [{ role: "Enseignant", voice: "onyx" }],
      questions: [
        { id: "q1", stem: "Quelle idée les travaux récents ont-ils « entamée » ?", options: [{ id: "a", text: "Celle d'agents parfaitement rationnels" }, { id: "b", text: "Celle de biais systématiques" }, { id: "c", text: "Celle de l'aversion à la perte" }], answer: "a" },
        { id: "q2", stem: "Pourquoi nos écarts restent-ils « modélisables » ?", options: [{ id: "a", text: "Parce qu'ils sont systématiques" }, { id: "b", text: "Parce qu'ils sont imprévisibles" }, { id: "c", text: "Parce qu'ils sont rares" }], answer: "a" },
      ],
    },
  },
  {
    level: "C1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Table ronde : l'avenir de la presse",
    prompt: "Écoutez la table ronde et répondez.",
    difficulty: "STRETCH", topicTag: "medias",
    payload: {
      audioScript: "Première intervenante : On a cru que l'information gratuite était un progrès ; elle a surtout fragilisé ce qui la rend fiable, le temps de l'enquête. Second intervenant : N'idéalisons pas l'avant. Première intervenante : Je ne l'idéalise pas, je constate qu'un public habitué à ne rien payer hésite à financer un travail coûteux. Second intervenant : D'accord là-dessus ; mais la solution n'est pas de revenir en arrière, c'est de convaincre que la qualité a un prix.",
      speakers: [{ role: "Première intervenante", voice: "shimmer" }, { role: "Second intervenant", voice: "echo" }],
      questions: [
        { id: "q1", stem: "Qu'a « surtout fragilisé » la gratuité, selon la première intervenante ?", options: [{ id: "a", text: "Le temps de l'enquête" }, { id: "b", text: "La publicité" }, { id: "c", text: "La diffusion" }], answer: "a" },
        { id: "q2", stem: "Sur quoi s'accordent finalement les intervenants ?", options: [{ id: "a", text: "Qu'il faut convaincre que la qualité a un prix" }, { id: "b", text: "Qu'il faut revenir en arrière" }, { id: "c", text: "Que la gratuité est idéale" }], answer: "a" },
      ],
    },
  },
  {
    level: "C1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Entretien : un architecte et la ville",
    prompt: "Écoutez l'entretien et répondez.",
    difficulty: "CORE", topicTag: "urbanisme",
    payload: {
      audioScript: "Journaliste : Que manque-t-il à nos villes ? Architecte : Souvent, du vide. On a tellement appris à rentabiliser chaque mètre carré qu'on a oublié l'utilité de ce qui ne sert apparemment à rien : une place où s'asseoir sans consommer, un détour agréable. Une ville n'est pas qu'une machine à fonctions ; elle est un lieu où l'on doit pouvoir flâner, et la flânerie suppose précisément des espaces qui ne sont pas saturés d'usage.",
      speakers: [{ role: "Journaliste", voice: "fable" }, { role: "Architecte", voice: "onyx" }],
      questions: [
        { id: "q1", stem: "Que manque-t-il aux villes, selon l'architecte ?", options: [{ id: "a", text: "Du vide, des espaces non saturés d'usage" }, { id: "b", text: "Plus de commerces" }, { id: "c", text: "Plus de fonctions" }], answer: "a" },
        { id: "q2", stem: "Que suppose la flânerie, d'après lui ?", options: [{ id: "a", text: "Des espaces qui ne sont pas saturés d'usage" }, { id: "b", text: "Des rues commerçantes" }, { id: "c", text: "Une circulation rapide" }], answer: "a" },
      ],
    },
  },
  {
    level: "C1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Conférence : apprendre une langue adulte",
    prompt: "Écoutez l'extrait et répondez.",
    difficulty: "CORE", topicTag: "langue",
    payload: {
      audioScript: "On entend souvent qu'il serait trop tard, passé un certain âge, pour apprendre une langue. C'est faux, mais l'idée est tenace, et elle a un coût : elle décourage avant même d'essayer. L'adulte n'apprend pas comme l'enfant ; il apprend autrement, en s'appuyant sur ce qu'il sait déjà, sur sa capacité d'analyse. Ce qui lui manque, ce n'est pas l'aptitude, c'est le temps et, surtout, l'occasion régulière de pratiquer sans craindre l'erreur.",
      speakers: [{ role: "Conférencier", voice: "echo" }],
      questions: [
        { id: "q1", stem: "Quelle idée le conférencier qualifie-t-il de fausse mais tenace ?", options: [{ id: "a", text: "Qu'il serait trop tard pour apprendre une langue adulte" }, { id: "b", text: "Que l'adulte apprend comme l'enfant" }, { id: "c", text: "Que la pratique est inutile" }], answer: "a" },
        { id: "q2", stem: "Que manque-t-il surtout à l'adulte, selon lui ?", options: [{ id: "a", text: "Le temps et l'occasion de pratiquer sans craindre l'erreur" }, { id: "b", text: "L'aptitude" }, { id: "c", text: "La mémoire" }], answer: "a" },
      ],
    },
  },
  {
    level: "C1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Débat : le revenu et l'automatisation",
    prompt: "Écoutez le débat et répondez.",
    difficulty: "STRETCH", topicTag: "travail",
    payload: {
      audioScript: "Animatrice : L'automatisation va-t-elle détruire l'emploi ? Économiste 1 : Détruire, non ; déplacer, oui, et c'est déjà considérable. Économiste 2 : Le déplacement n'est pas neutre : ceux qui perdent leur poste ne sont pas ceux qui occupent les nouveaux. Économiste 1 : C'est juste, et c'est là que l'accompagnement compte plus que la prédiction du nombre d'emplois. Économiste 2 : Sur ce point, aucun désaccord : la vraie question est sociale, pas seulement technologique.",
      speakers: [{ role: "Animatrice", voice: "nova" }, { role: "Économiste 1", voice: "onyx" }, { role: "Économiste 2", voice: "echo" }],
      questions: [
        { id: "q1", stem: "Comment l'économiste 1 corrige-t-il le terme « détruire » ?", options: [{ id: "a", text: "Il parle plutôt de déplacement de l'emploi" }, { id: "b", text: "Il nie tout effet" }, { id: "c", text: "Il prévoit une création massive" }], answer: "a" },
        { id: "q2", stem: "Sur quoi les deux s'accordent-ils ?", options: [{ id: "a", text: "Que la vraie question est sociale, pas seulement technologique" }, { id: "b", text: "Qu'il n'y a pas de problème" }, { id: "c", text: "Qu'il faut arrêter l'automatisation" }], answer: "a" },
      ],
    },
  },
  {
    level: "C1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Entretien : une cinéaste",
    prompt: "Écoutez l'entretien et répondez.",
    difficulty: "CORE", topicTag: "culture",
    payload: {
      audioScript: "Journaliste : Vos films laissent beaucoup de place au silence. Cinéaste : Parce que tout dire, c'est ne rien laisser au spectateur. Le silence n'est pas un vide à combler ; c'est un espace que j'offre. Je me méfie des œuvres qui expliquent tout : elles flattent, mais elles infantilisent. Je préfère un public qui repart avec des questions qu'un public qu'on aurait rassasié.",
      speakers: [{ role: "Journaliste", voice: "fable" }, { role: "Cinéaste", voice: "shimmer" }],
      questions: [
        { id: "q1", stem: "Pourquoi la cinéaste laisse-t-elle place au silence ?", options: [{ id: "a", text: "Pour laisser un espace au spectateur" }, { id: "b", text: "Par manque de moyens" }, { id: "c", text: "Pour tout expliquer" }], answer: "a" },
        { id: "q2", stem: "De quoi se méfie-t-elle ?", options: [{ id: "a", text: "Des œuvres qui expliquent tout" }, { id: "b", text: "Du public exigeant" }, { id: "c", text: "Des questions" }], answer: "a" },
      ],
    },
  },
  {
    level: "C1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Chronique radio : l'éloge de l'ennui",
    prompt: "Écoutez la chronique et répondez.",
    difficulty: "CORE", topicTag: "societe",
    payload: {
      audioScript: "Nous avons déclaré la guerre à l'ennui, et nous l'avons presque gagnée : au moindre temps mort, un écran s'offre à le combler. Mais à force de ne plus jamais nous ennuyer, nous avons perdu quelque chose. L'ennui, ce n'est pas rien ; c'est souvent le moment où l'esprit, laissé sans tâche, se met à vagabonder, à associer, à inventer. En supprimant l'ennui, nous avons peut-être aussi supprimé l'une des conditions discrètes de la créativité.",
      speakers: [{ role: "Chroniqueur", voice: "echo" }],
      questions: [
        { id: "q1", stem: "Qu'avons-nous « peut-être supprimé » avec l'ennui ?", options: [{ id: "a", text: "Une condition discrète de la créativité" }, { id: "b", text: "Le temps de travail" }, { id: "c", text: "Les écrans" }], answer: "a" },
        { id: "q2", stem: "Comment l'ennui est-il présenté ?", options: [{ id: "a", text: "Comme un moment où l'esprit vagabonde et invente" }, { id: "b", text: "Comme une pure perte" }, { id: "c", text: "Comme une maladie" }], answer: "a" },
      ],
    },
  },
  {
    level: "C1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Conférence : statistiques et intuition",
    prompt: "Écoutez l'extrait et répondez.",
    difficulty: "STRETCH", topicTag: "sciences",
    payload: {
      audioScript: "Notre intuition est un guide précieux dans la vie courante et un piètre conseiller face aux grands nombres. Elle nous fait surestimer le rare et le spectaculaire, sous-estimer le fréquent et le discret. C'est pourquoi un fait divers marquant pèse, dans nos décisions, bien plus lourd qu'une statistique pourtant accablante. Comprendre cela ne nous rend pas plus rationnels d'un coup ; mais cela nous apprend, au moins, à nous méfier de nos premières impressions.",
      speakers: [{ role: "Conférencière", voice: "nova" }],
      questions: [
        { id: "q1", stem: "Que nous fait faire l'intuition face aux grands nombres ?", options: [{ id: "a", text: "Surestimer le rare, sous-estimer le fréquent" }, { id: "b", text: "Tout calculer correctement" }, { id: "c", text: "Ignorer le spectaculaire" }], answer: "a" },
        { id: "q2", stem: "Que nous apprend, « au moins », cette prise de conscience ?", options: [{ id: "a", text: "À nous méfier de nos premières impressions" }, { id: "b", text: "À devenir aussitôt rationnels" }, { id: "c", text: "À ignorer les statistiques" }], answer: "a" },
      ],
    },
  },
  {
    level: "C1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Entretien : la sobriété énergétique",
    prompt: "Écoutez l'entretien et répondez.",
    difficulty: "CORE", topicTag: "environnement",
    payload: {
      audioScript: "Journaliste : La sobriété, n'est-ce pas demander des efforts aux particuliers pour épargner les vrais responsables ? Spécialiste : C'est un risque réel, et il faut le nommer. Mais opposer gestes individuels et décisions structurelles est un faux dilemme commode. Les deux se renforcent : une société qui change ses habitudes rend aussi les décisions politiques plus acceptables, et réciproquement. Le piège, ce serait de transformer la sobriété en culpabilisation des seuls individus.",
      speakers: [{ role: "Journaliste", voice: "fable" }, { role: "Spécialiste", voice: "onyx" }],
      questions: [
        { id: "q1", stem: "Comment le spécialiste qualifie-t-il l'opposition individus / structures ?", options: [{ id: "a", text: "Un faux dilemme commode" }, { id: "b", text: "Une vérité incontestable" }, { id: "c", text: "Un détail" }], answer: "a" },
        { id: "q2", stem: "Quel est le « piège » qu'il identifie ?", options: [{ id: "a", text: "Culpabiliser les seuls individus" }, { id: "b", text: "Agir trop vite" }, { id: "c", text: "Ignorer les habitudes" }], answer: "a" },
      ],
    },
  },
  {
    level: "C1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Cours : la notion de patrimoine",
    prompt: "Écoutez l'extrait de cours et répondez.",
    difficulty: "STRETCH", topicTag: "histoire",
    payload: {
      audioScript: "Le patrimoine n'est pas donné, il est désigné. Un édifice ne devient « patrimoine » qu'au moment où une société décide qu'il mérite d'être conservé, et ce choix n'a rien d'innocent. Préserver, c'est sélectionner ; et sélectionner, c'est hiérarchiser une mémoire. La question intéressante n'est donc pas seulement « que conserve-t-on ? », mais « qui décide, et au nom de quoi ? ». Le patrimoine en dit autant sur ceux qui le classent que sur ce qu'il classe.",
      speakers: [{ role: "Enseignante", voice: "shimmer" }],
      questions: [
        { id: "q1", stem: "Quelle est la thèse centrale ?", options: [{ id: "a", text: "Le patrimoine est désigné, non donné" }, { id: "b", text: "Le patrimoine est neutre" }, { id: "c", text: "Tout doit être conservé" }], answer: "a" },
        { id: "q2", stem: "Quelle question l'enseignante juge « intéressante » ?", options: [{ id: "a", text: "Qui décide, et au nom de quoi" }, { id: "b", text: "Combien cela coûte" }, { id: "c", text: "Où exposer" }], answer: "a" },
      ],
    },
  },
  {
    level: "C1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Débat : faut-il un service civique obligatoire ?",
    prompt: "Écoutez le débat et répondez.",
    difficulty: "STRETCH", topicTag: "vie-publique",
    payload: {
      audioScript: "Animateur : Un service civique obligatoire renforcerait-il le lien entre citoyens ? Pour : Faire se rencontrer des jeunes d'horizons différents, oui, c'est précieux. Contre : Précieux, mais « obligatoire » et « rencontre » font mauvais ménage : on ne décrète pas la fraternité. Pour : On ne la décrète pas, on crée les occasions. Contre : Alors offrons-les sans contraindre ; un engagement imposé n'a pas la même valeur qu'un engagement choisi.",
      speakers: [{ role: "Animateur", voice: "echo" }, { role: "Pour", voice: "nova" }, { role: "Contre", voice: "onyx" }],
      questions: [
        { id: "q1", stem: "Quelle objection soulève l'intervenant « Contre » ?", options: [{ id: "a", text: "Un engagement imposé n'a pas la valeur d'un engagement choisi" }, { id: "b", text: "Les rencontres sont inutiles" }, { id: "c", text: "Le service coûte trop cher" }], answer: "a" },
        { id: "q2", stem: "Que répond l'intervenant « Pour » sur la fraternité ?", options: [{ id: "a", text: "On ne la décrète pas, on en crée les occasions" }, { id: "b", text: "On peut la rendre obligatoire" }, { id: "c", text: "Elle est impossible" }], answer: "a" },
      ],
    },
  },
  {
    level: "C1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Entretien : une chercheuse en santé publique",
    prompt: "Écoutez l'entretien et répondez.",
    difficulty: "CORE", topicTag: "sante",
    payload: {
      audioScript: "Journaliste : La prévention coûte-t-elle moins cher que le soin ? Chercheuse : Souvent, mais l'argument économique est à double tranchant. S'il faut justifier la prévention par ses seules économies, que fait-on de ce qui en rapporte peu mais évite des souffrances ? La santé publique ne devrait pas être suspendue à un calcul de rentabilité. Le bon argument pour prévenir, ce n'est pas qu'on dépensera moins, c'est qu'on vivra mieux.",
      speakers: [{ role: "Journaliste", voice: "fable" }, { role: "Chercheuse", voice: "shimmer" }],
      questions: [
        { id: "q1", stem: "Pourquoi l'argument économique est-il « à double tranchant » ?", options: [{ id: "a", text: "Il néglige ce qui évite des souffrances sans rapporter" }, { id: "b", text: "La prévention coûte toujours plus cher" }, { id: "c", text: "Le soin est gratuit" }], answer: "a" },
        { id: "q2", stem: "Quel est le « bon argument » selon la chercheuse ?", options: [{ id: "a", text: "Qu'on vivra mieux, pas seulement qu'on dépensera moins" }, { id: "b", text: "Qu'on dépensera moins, avant tout" }, { id: "c", text: "Qu'il faut renoncer à prévenir" }], answer: "a" },
      ],
    },
  },

  {
    level: "C1", skill: "COMPREHENSION_ORALE", taskType: "MCQ", examFamily: null,
    title: "Conférence : à quoi sert l'art ?",
    prompt: "Écoutez l'extrait et répondez.",
    difficulty: "CORE", topicTag: "culture",
    payload: {
      audioScript: "On demande sans cesse à l'art de servir à quelque chose : éduquer, apaiser, rassembler. Ces effets existent, mais en faire la justification de l'art, c'est passer à côté de l'essentiel. L'art n'a pas à se rendre utile pour avoir le droit d'exister ; sa valeur tient justement à ce qu'il échappe au calcul de l'utilité. Vouloir le rentabiliser à tout prix, c'est risquer de ne garder que ce qui rapporte, et de perdre ce qui dérange ou interroge.",
      speakers: [{ role: "Conférencier", voice: "onyx" }],
      questions: [
        { id: "q1", stem: "Que critique le conférencier ?", options: [{ id: "a", text: "Faire de l'utilité la justification de l'art" }, { id: "b", text: "Que l'art éduque" }, { id: "c", text: "Que l'art existe" }], answer: "a" },
        { id: "q2", stem: "Quel risque voit-il à « rentabiliser » l'art ?", options: [{ id: "a", text: "Ne garder que ce qui rapporte et perdre ce qui dérange" }, { id: "b", text: "Le rendre trop populaire" }, { id: "c", text: "Le rendre gratuit" }], answer: "a" },
      ],
    },
  },

  // ---------- Expression écrite (Writing) — exam-tagged ----------
  {
    level: "C1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DALF C1 — Essai argumenté : culture et marché",
    prompt: "Rédigez un essai argumenté et structuré.",
    difficulty: "CORE", topicTag: "culture",
    payload: { situation: "Un débat oppose ceux qui jugent la culture menacée par sa marchandisation et ceux qui y voient une démocratisation.", instruction: "Rédigez un essai argumenté dans lequel vous prenez position de façon nuancée. Construisez un raisonnement progressif, appuyez chaque idée sur des arguments et des exemples précis, et intégrez une objection que vous réfuterez.", wordMin: 450, wordMax: 500 },
  },
  {
    level: "C1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DALF C1 — Synthèse de documents : le télétravail",
    prompt: "Rédigez une synthèse objective des documents fournis.",
    difficulty: "STRETCH", topicTag: "travail",
    payload: { situation: "On vous remet trois documents (un article de presse, une étude chiffrée, un témoignage) portant sur les effets du télétravail.", instruction: "Rédigez une synthèse organisée et objective qui dégage les idées principales communes et divergentes des documents, sans donner votre opinion ni recopier de phrases. Reformulez, hiérarchisez, et reliez les sources entre elles.", wordMin: 220, wordMax: 240 },
  },
  {
    level: "C1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DALF C1 — Prise de position : l'évaluation à l'université",
    prompt: "Rédigez un texte argumenté pour le journal de l'université.",
    difficulty: "CORE", topicTag: "education",
    payload: { situation: "Votre université envisage de remplacer une partie des examens finaux par un contrôle continu.", instruction: "Vous écrivez au journal de l'université pour défendre une position argumentée sur cette réforme. Adoptez un registre soutenu, structurez clairement votre propos et anticipez les contre-arguments.", wordMin: 450, wordMax: 500 },
  },
  {
    level: "C1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DALF C1 — Essai : la place du silence",
    prompt: "Rédigez un essai personnel et argumenté.",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { situation: "« Une société qui ne supporte plus le silence a-t-elle encore le temps de penser ? »", instruction: "Développez une réflexion argumentée et nuancée à partir de cette question. Articulez votre raisonnement, illustrez-le d'exemples variés et soignez les transitions.", wordMin: 450, wordMax: 500 },
  },
  {
    level: "C1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DALF C1 — Lettre formelle : un projet contesté",
    prompt: "Rédigez une lettre formelle argumentée.",
    difficulty: "CORE", topicTag: "vie-publique",
    payload: { situation: "Votre commune prévoit de transformer un parc en parking.", instruction: "Au nom d'un collectif d'habitants, écrivez une lettre argumentée aux élus pour vous opposer au projet. Exposez les conséquences, mobilisez des arguments solides, proposez une alternative et adoptez un ton ferme et courtois.", wordMin: 250, wordMax: 290 },
  },
  {
    level: "C1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DALF C1 — Essai : progrès technique et liberté",
    prompt: "Rédigez un essai argumenté.",
    difficulty: "STRETCH", topicTag: "technologie",
    payload: { situation: "« Chaque nouvelle commodité technique nous libère-t-elle, ou nous lie-t-elle davantage ? »", instruction: "Rédigez un essai nuancé répondant à cette question. Construisez une argumentation progressive, appuyée sur des exemples concrets, et intégrez une objection discutée.", wordMin: 450, wordMax: 500 },
  },
  {
    level: "C1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF — Expression écrite, section B : opinion argumentée",
    prompt: "Donnez votre opinion argumentée sur le thème proposé.",
    difficulty: "CORE", topicTag: "societe",
    payload: { situation: "Certains affirment que les réseaux sociaux nuisent à la qualité du débat public ; d'autres y voient un espace d'expression élargi.", instruction: "Rédigez un texte argumenté présentant votre point de vue. Annoncez votre position, développez deux ou trois arguments illustrés et concluez clairement.", wordMin: 200, wordMax: 250 },
  },
  {
    level: "C1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF — Expression écrite, section A : poursuivre un fait divers",
    prompt: "Rédigez la suite de l'article à partir du début fourni.",
    difficulty: "STRETCH", topicTag: "medias",
    payload: { situation: "Début d'article : « Hier soir, une coupure d'électricité a plongé tout un quartier dans le noir pendant trois heures. »", instruction: "Poursuivez l'article de presse de façon cohérente et neutre : rapportez des faits plausibles, citez des réactions, respectez le registre journalistique et la logique du récit.", wordMin: 80, wordMax: 120 },
  },
  {
    level: "C1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF — Expression écrite, section B : lettre de réclamation",
    prompt: "Rédigez une lettre formelle.",
    difficulty: "CORE", topicTag: "vie-pratique",
    payload: { situation: "Un service auquel vous êtes abonné a augmenté ses tarifs sans préavis et dégradé sa qualité.", instruction: "Écrivez une lettre de réclamation argumentée : exposez le problème, justifiez votre mécontentement, formulez une demande précise et gardez un ton ferme et courtois.", wordMin: 200, wordMax: 250 },
  },
  {
    level: "C1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF — Expression écrite, section B : prendre parti",
    prompt: "Réagissez de façon argumentée au point de vue exposé.",
    difficulty: "STRETCH", topicTag: "environnement",
    payload: { situation: "Un lecteur affirme dans un courrier : « Limiter la voiture en ville, c'est pénaliser ceux qui travaillent. »", instruction: "Rédigez une réponse argumentée à ce courrier, en nuançant ou en contestant ce point de vue. Structurez vos arguments et illustrez-les.", wordMin: 200, wordMax: 250 },
  },
  {
    level: "C1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF — Épreuve d'expression écrite, tâche 3 : comparer deux points de vue",
    prompt: "Comparez les deux points de vue et donnez le vôtre.",
    difficulty: "STRETCH", topicTag: "idees",
    payload: { situation: "Point de vue 1 : « Le progrès passe par la spécialisation. » Point de vue 2 : « Les grandes avancées naissent du croisement des disciplines. »", instruction: "Rédigez un texte qui présente et compare ces deux points de vue, puis expose votre position de façon argumentée et nuancée.", wordMin: 200, wordMax: 250 },
  },
  {
    level: "C1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF — Expression écrite, tâche 2 : article pour un magazine",
    prompt: "Rédigez un article destiné à un magazine.",
    difficulty: "CORE", topicTag: "culture",
    payload: { situation: "Un magazine francophone lance un dossier : « Lire encore, à l'ère des écrans ? »", instruction: "Rédigez un article informatif et personnel sur la place de la lecture aujourd'hui : décrivez la situation, nuancez les idées reçues et proposez une réflexion. Soignez l'organisation et le registre.", wordMin: 120, wordMax: 150 },
  },
  {
    level: "C1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF — Expression écrite, tâche 3 : opinion nuancée",
    prompt: "Donnez votre opinion argumentée.",
    difficulty: "CORE", topicTag: "travail",
    payload: { situation: "« La réussite professionnelle devrait-elle se mesurer autrement que par le salaire ? »", instruction: "Rédigez un texte argumenté répondant à cette question. Présentez votre position, développez des arguments illustrés et concluez de façon nuancée.", wordMin: 200, wordMax: 250 },
  },
  {
    level: "C1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TCF",
    title: "TCF — Expression écrite, tâche 2 : courrier des lecteurs",
    prompt: "Rédigez une contribution au courrier des lecteurs.",
    difficulty: "CORE", topicTag: "societe",
    payload: { situation: "Un journal demande à ses lecteurs : « Faut-il encadrer le temps d'écran des adultes, et pas seulement des enfants ? »", instruction: "Rédigez une contribution claire et argumentée exposant votre point de vue, avec au moins deux arguments illustrés et une conclusion.", wordMin: 120, wordMax: 150 },
  },
  {
    level: "C1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "DELF_DALF",
    title: "DALF C1 — Essai : mémoire et oubli",
    prompt: "Rédigez un essai argumenté.",
    difficulty: "STRETCH", topicTag: "histoire",
    payload: { situation: "« Une société a-t-elle parfois besoin d'oublier pour avancer ? »", instruction: "Développez une réflexion nuancée à partir de cette question, en distinguant les formes d'oubli. Construisez un plan clair, illustrez d'exemples et soignez la langue.", wordMin: 450, wordMax: 500 },
  },
  {
    level: "C1", skill: "EXPRESSION_ECRITE", taskType: "WRITING_TASK", examFamily: "TEF",
    title: "TEF — Expression écrite, section B : répondre à une enquête",
    prompt: "Rédigez une réponse argumentée à l'enquête.",
    difficulty: "CORE", topicTag: "urbanisme",
    payload: { situation: "Votre ville mène une enquête : « Que faudrait-il pour rendre les espaces publics plus accueillants ? »", instruction: "Rédigez une réponse argumentée et concrète : identifiez les manques, proposez des améliorations justifiées et hiérarchisez vos priorités.", wordMin: 200, wordMax: 250 },
  },

  // ---------- Expression orale (Speaking) — exam-tagged ----------
  {
    level: "C1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DALF C1 — Exposé à partir de documents : la mobilité",
    prompt: "Préparez un exposé structuré, puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "urbanisme",
    payload: { taskPrompt: "À partir d'un dossier de courts documents sur la mobilité urbaine (que vous résumerez de mémoire), dégagez une problématique, présentez un exposé organisé qui confronte les points de vue, puis défendez une position personnelle nuancée.", prepSeconds: 3600, speakSeconds: 600 },
  },
  {
    level: "C1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DALF C1 — Monologue suivi : culture et accessibilité",
    prompt: "Présentez un point de vue construit, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "culture",
    payload: { taskPrompt: "« Faut-il rendre la culture gratuite pour la rendre accessible ? » Présentez un monologue suivi et structuré : posez le problème, développez une argumentation nuancée appuyée d'exemples, et concluez.", prepSeconds: 3600, speakSeconds: 480 },
  },
  {
    level: "C1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DALF C1 — Exposé : technologie et autonomie",
    prompt: "Préparez un exposé argumenté, puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "technologie",
    payload: { taskPrompt: "À partir de l'idée « les outils numériques nous rendent-ils plus autonomes ou plus dépendants ? », construisez un exposé organisé confrontant les positions, puis défendez un point de vue personnel et anticipez les objections.", prepSeconds: 3600, speakSeconds: 600 },
  },
  {
    level: "C1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DALF C1 — Monologue suivi : le travail et le sens",
    prompt: "Défendez un point de vue construit, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "travail",
    payload: { taskPrompt: "« Peut-on vraiment “donner du sens” au travail par des discours ? » Présentez un monologue suivi argumenté : analysez la question, développez votre position avec des exemples, et nuancez.", prepSeconds: 3600, speakSeconds: 480 },
  },
  {
    level: "C1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DALF C1 — Exposé : information et attention",
    prompt: "Préparez un exposé structuré, puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "medias",
    payload: { taskPrompt: "À partir du thème « trop d'information tue-t-il l'information ? », dégagez une problématique, présentez un exposé organisé, confrontez les points de vue et défendez une position personnelle.", prepSeconds: 3600, speakSeconds: 600 },
  },
  {
    level: "C1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DALF C1 — Monologue suivi : sobriété et liberté",
    prompt: "Présentez un point de vue nuancé, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "environnement",
    payload: { taskPrompt: "« La sobriété est-elle une contrainte ou une forme de liberté ? » Présentez un monologue suivi : posez la question, argumentez de façon nuancée avec des exemples, et concluez.", prepSeconds: 3600, speakSeconds: 480 },
  },
  {
    level: "C1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF — Expression orale, section B : convaincre",
    prompt: "Préparez votre intervention, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "societe",
    payload: { taskPrompt: "Vous voulez convaincre un proche de s'engager dans une association de quartier. Présentez des arguments adaptés, répondez aux réticences que vous imaginez, et adoptez un ton persuasif mais respectueux.", prepSeconds: 120, speakSeconds: 300 },
  },
  {
    level: "C1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF — Expression orale, section A : obtenir des informations",
    prompt: "Préparez vos questions, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "vie-pratique",
    payload: { taskPrompt: "Vous souhaitez vous inscrire à une formation dont une annonce ne donne que peu de détails. Imaginez l'échange : posez les questions utiles (contenu, horaires, coût, conditions) pour obtenir toutes les informations nécessaires.", prepSeconds: 60, speakSeconds: 180 },
  },
  {
    level: "C1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF — Expression orale, section B : défendre un choix",
    prompt: "Préparez votre argumentation, puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "idees",
    payload: { taskPrompt: "Vous proposez à un groupe de consacrer un budget commun à un projet plutôt qu'à un autre. Défendez votre choix de façon argumentée, anticipez les objections et cherchez à emporter l'adhésion.", prepSeconds: 120, speakSeconds: 300 },
  },
  {
    level: "C1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF — Expression orale, section B : réagir à une opinion",
    prompt: "Préparez votre réaction, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "culture",
    payload: { taskPrompt: "Quelqu'un affirme : « Lire des romans est une perte de temps à l'âge adulte. » Réagissez de façon argumentée et nuancée, en défendant votre position avec des exemples.", prepSeconds: 120, speakSeconds: 300 },
  },
  {
    level: "C1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF — Expression orale, tâche 3 : exprimer et défendre une opinion",
    prompt: "Préparez votre intervention, puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "education",
    payload: { taskPrompt: "« Faut-il enseigner l'esprit critique comme une matière à part entière ? » Exprimez votre opinion et défendez-la de manière organisée, avec des arguments illustrés et une prise en compte des objections.", prepSeconds: 0, speakSeconds: 270 },
  },
  {
    level: "C1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF — Expression orale, tâche 2 : interaction / jeu de rôle",
    prompt: "Préparez l'échange, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "vie-pratique",
    payload: { taskPrompt: "Vous organisez un événement avec un collègue qui n'est d'accord ni sur la date ni sur le lieu. Menez l'échange pour parvenir à un compromis : exposez vos contraintes, écoutez les siennes, proposez des solutions.", prepSeconds: 0, speakSeconds: 210 },
  },
  {
    level: "C1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF — Expression orale, tâche 3 : trancher une question",
    prompt: "Préparez votre position, puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "technologie",
    payload: { taskPrompt: "« La rapidité est-elle toujours un progrès ? » Prenez position de façon argumentée et nuancée, illustrez par des exemples et concluez clairement.", prepSeconds: 0, speakSeconds: 270 },
  },
  {
    level: "C1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TCF",
    title: "TCF — Expression orale, tâche 2 : convaincre un interlocuteur",
    prompt: "Préparez votre échange, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "sante",
    payload: { taskPrompt: "Vous voulez convaincre un proche réticent d'adopter une habitude plus saine (sommeil, marche, alimentation). Menez l'échange : argumentez, répondez à ses objections, proposez un premier pas réaliste.", prepSeconds: 0, speakSeconds: 210 },
  },
  {
    level: "C1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "DELF_DALF",
    title: "DALF C1 — Monologue suivi : la transparence",
    prompt: "Présentez un point de vue nuancé, puis tapez votre transcription.",
    difficulty: "STRETCH", topicTag: "societe",
    payload: { taskPrompt: "« Une société entièrement transparente serait-elle plus libre ? » Présentez un monologue suivi et nuancé : posez le problème, argumentez avec des exemples, et défendez une position personnelle.", prepSeconds: 3600, speakSeconds: 480 },
  },
  {
    level: "C1", skill: "EXPRESSION_ORALE", taskType: "SPEAKING_TASK", examFamily: "TEF",
    title: "TEF — Expression orale, section A : organiser une sortie",
    prompt: "Préparez vos questions, puis tapez votre transcription.",
    difficulty: "CORE", topicTag: "vie-pratique",
    payload: { taskPrompt: "Vous appelez un lieu culturel pour organiser une visite de groupe à partir d'une annonce incomplète. Posez toutes les questions utiles (tarifs de groupe, créneaux, accessibilité, réservation) pour planifier la sortie.", prepSeconds: 60, speakSeconds: 180 },
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
  console.log(`seed:c1 — ${created} created, ${ITEMS.length - created} already present`);
}

if (isDirectRun(import.meta.url)) {
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(() => prisma.$disconnect());
}
