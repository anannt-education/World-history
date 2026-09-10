import { CENTRAL_QUESTION, UNIT2_SESSION } from "@/content/course";
import { SOURCES } from "@/content/unit2/sources";
import type { ObjectiveId } from "@/lib/types";

export type LessonBlockType =
  | "objective"
  | "map"
  | "explain"
  | "worked"
  | "source"
  | "retrieval"
  | "transfer"
  | "exit";

export interface LessonBlock {
  id: string;
  type: LessonBlockType;
  title: string;
  estimatedMinutes: number;
  objectiveIds: ObjectiveId[];
}

export const LESSON_META = {
  id: "U2-L1",
  title: UNIT2_SESSION.title,
  centralQuestion: CENTRAL_QUESTION,
  estimatedMinutes: UNIT2_SESSION.estimatedMinutes,
  formatYear: 2027 as const,
};

export const LESSON_BLOCKS: LessonBlock[] = [
  {
    id: "objective",
    type: "objective",
    title: "Objective and question",
    estimatedMinutes: 2,
    objectiveIds: ["U2-LO1", "U2-LO2"],
  },
  {
    id: "map",
    type: "map",
    title: "Networks, c. 1200–1450",
    estimatedMinutes: 5,
    objectiveIds: ["U2-LO1"],
  },
  {
    id: "explain",
    type: "explain",
    title: "Why exchange intensified",
    estimatedMinutes: 8,
    objectiveIds: ["U2-LO1", "U2-LO2", "U2-LO4"],
  },
  {
    id: "worked",
    type: "worked",
    title: "Worked comparison: two settings",
    estimatedMinutes: 5,
    objectiveIds: ["U2-LO2"],
  },
  {
    id: "source",
    type: "source",
    title: "Source: Pegolotti’s handbook",
    estimatedMinutes: 8,
    objectiveIds: ["U2-LO3", "U2-LO1"],
  },
  {
    id: "retrieval",
    type: "retrieval",
    title: "Retrieval checks",
    estimatedMinutes: 4,
    objectiveIds: ["U2-LO1", "U2-LO3"],
  },
  {
    id: "transfer",
    type: "transfer",
    title: "Transfer: monsoon routes",
    estimatedMinutes: 5,
    objectiveIds: ["U2-LO2"],
  },
  {
    id: "exit",
    type: "exit",
    title: "Exit check and review",
    estimatedMinutes: 3,
    objectiveIds: ["U2-LO2"],
  },
];

export const TIMELINE = [
  {
    date: "c. 1200",
    text: "Silk Roads, Indian Ocean, and trans-Saharan corridors are already in use. Unit 2 asks why volume, regularity, and consequences change — not when trade “begins.”",
  },
  {
    date: "1206",
    text: "Temüjin is proclaimed Chinggis Khan in the conventional dating. Mongol conquests over the next decades remake security, destruction, and communication across Inner Asia.",
  },
  {
    date: "1258",
    text: "Mongol capture of Baghdad. Exchange can expand after conquest even where the conquest itself was catastrophic. Do not collapse those two facts into one moral.",
  },
  {
    date: "1271–1368",
    text: "Yuan dynasty in China. Italian merchants call much of this commercial world “Cathay.” That is a period name in their usage, not a modern country.",
  },
  {
    date: "1324–25",
    text: "Mansa Musa’s hajj, a well-attested illustration of Mali’s gold wealth and of Islam along Sahara–Nile–Hijaz routes. It is an illustrative case, not the whole trans-Saharan system.",
  },
  {
    date: "c. 1330–1340",
    text: "Pegolotti compiles merchant advice on the Tana–Cathay road while Mongol-era overland traffic is still commercially thinkable for Italians.",
  },
  {
    date: "c. 1331",
    text: "Ibn Battuta on the Swahili coast (conventional placement). A different network: monsoon sailing rather than camel waggons.",
  },
  {
    date: "1347–1351",
    text: "Plague reaches the Mediterranean in these years. Exact origin and every pathway remain debated; that networks moved people and goods is not.",
  },
  {
    date: "1368",
    text: "Ming overthrow of the Yuan. Overland security and Italian access to Cathay look different afterward. Sequence matters; modern borders do not belong on this timeline.",
  },
];

export const EXPLANATION = {
  lead: "Exchange increased in this period because several networks became cheaper, safer, or more predictable at the same time — not because the world suddenly discovered trade. Effects differed because a port, a caravan city, a royal court, and a countryside sat in different places on each chain.",
  paragraphs: [
    {
      heading: "Four corridors, not one world-system",
      body: "Treat the Silk Roads, the Indian Ocean, the Sahara, and Mongol-era relay routes as overlapping corridors. Goods, people, technologies, beliefs, and pathogens moved along them at different speeds. A silk bale that crossed Inner Asia was typically high in value relative to weight; an Indian Ocean hull could carry rice or timber that would ruin a camel budget. If you flatten all four into “globalization,” you will miss the mechanism the exam wants.",
    },
    {
      heading: "Why volume rose",
      body: "Three clusters of causes recur. First, transport knowledge: compass and larger dhows and junks in the Indian Ocean; camel saddles and oasis wells in the Sahara; relay stations and passports in Mongol territories. Second, commercial practice: money-changers, paper instruments in Yuan China, merchant-host customs in Swahili ports, contracts and partnerships among Italian and Muslim merchants. Third, state power: empires that taxed rather than only plundered, and that could punish robbery along a route they cared about. Mongol rule is the clearest illustration of the third — and also of its limits. Pegolotti’s merchants call the Tana–Cathay road safe “according to what the merchants say,” and then list what happens when a lord dies. Relative security is not the same as an absence of politics.",
    },
    {
      heading: "Mongol exchange without romance",
      body: "Historians sometimes use “Pax Mongolica” as a shorthand for reduced banditry and more information along the steppe after conquest. It is a later label, not a fourteenth-century slogan, and it should never mean that Mongol expansion was gentle. Cities were destroyed; others were later rebuilt as nodes. The mechanism to keep is this: once a corridor is held by linked khanates, a merchant can buy protection, change silver for paper money in Cathay, and move silk west. When succession is unsettled, the same corridor becomes irregular. That is causation with a switch, not a story about cultural sympathy.",
    },
    {
      heading: "Cultural traffic was not conversion-by-caravan",
      body: "Islam’s spread into the Swahili coast, the Sahara, and parts of Southeast Asia in this period followed merchants, jurists, and local rulers who found Islamic legal and commercial tools useful. Buddhism and other traditions also moved. The right inference is not that every traveler converted every host. The right inference is that exchange created repeated contact in which religious specialists could settle, write, and advise courts. Ibn Battuta notices wooden mosques and pious hosts because that is the world he can enter. A gold miner a month inland might meet the network only as demand for dust.",
    },
    {
      heading: "Disease as an environmental consequence",
      body: "The same routes moved Yersinia pestis (in the conventional teaching account) into the Mediterranean by the late 1340s. Boccaccio, in Florence in 1348, says the pestilence had originated “some years before in the East” and spread “from place to place.” That is a contemporary claim about direction of travel, not a laboratory result. Do not teach a single siege story as settled science. Do teach that denser long-distance contact made a hemispheric mortality event possible, and that outcomes differed: a city that emptied, a countryside that lost labor, a state that could not staff its courts. Exchange does not have a single moral sign.",
    },
  ],
};

export const WORKED_EXAMPLE = {
  claim:
    "Exchange changed Kilwa and a Yuan-facing Silk Road caravan town by different mechanisms: one captured monsoon-season gold and hospitality rents on the coast; the other converted silver into state paper money to buy silk under Mongol-era protection.",
  annotations: [
    {
      label: "Settings",
      text: "Kilwa (Swahili coast) and the Tana–Cathay corridor (Black Sea to Yuan China). These are not “Africa” and “Asia” as blobs. They are a port polity and an overland commercial chain.",
    },
    {
      label: "Mechanism A — Indian Ocean",
      text: "Monsoon timing makes regular sailings possible. Kilwa sits where gold dust reported from the Sofala hinterland can meet visiting merchants. Ibn Battuta also records a host system at Mogadishu that binds a stranger’s sale to a local broker. The port’s elite captures tax, reputation, and Islamic hospitality; inland miners do not automatically receive the same institutions.",
    },
    {
      label: "Mechanism B — Silk Roads / Mongol relay",
      text: "Pegolotti’s handbook assumes ox-waggons, camel-waggons, a dragoman, and Mongol armed men on the road. Silver is surrendered in Cathay and replaced with sealed paper money that must be accepted for silk. The state is inside the transaction, not hovering outside it. Protection is priced; it fails at a ruler’s death.",
    },
    {
      label: "Why effects differ",
      text: "Same period, different bottlenecks. On the ocean, wind and harbor custom matter. On the steppe and oases, pack animals, succession, and a paper-money monopoly matter. If your paragraph only lists “trade increased in both places,” you have not yet explained a mechanism.",
    },
    {
      label: "What this is not",
      text: "It is not a claim that Kilwa was isolated from the Islamic world, or that Yuan paper money made Italian merchants “Chinese.” It is a comparison of how surplus was captured.",
    },
  ],
};

export const RETRIEVAL_CHECKS = [
  {
    id: "r1",
    prompt:
      "Pegolotti writes that the road from Tana to Cathay is “perfectly safe … according to what the merchants say who have used it,” then warns about a merchant’s death and a lord’s death. Which statement is the most defensible?",
    options: [
      {
        id: "A",
        text: "The handbook proves that Mongol Eurasia had no political violence.",
      },
      {
        id: "B",
        text: "The text reports relative commercial security while also recording situations in which that security failed.",
      },
      {
        id: "C",
        text: "Because Pegolotti is a biased Italian, the passage cannot be used as historical evidence.",
      },
      {
        id: "D",
        text: "Pegolotti himself completed the journey to Cathay and is describing his own caravan.",
      },
    ],
    correct: "B",
    explanation:
      "B stays with what the source states and what a reader may reasonably infer: merchants described the road as safe, and the same chapter lists exceptions. A overclaims. C treats bias as automatic uselessness — a habit this course rejects. D is not in the text; Pegolotti is compiling others’ advice.",
  },
  {
    id: "r2",
    prompt:
      "Why did Indian Ocean exchange often move heavier cargoes than Inner Asian caravans in this period?",
    options: [
      {
        id: "A",
        text: "Because Asian land routes did not exist until Europeans arrived.",
      },
      {
        id: "B",
        text: "Because monsoon sailing and hull capacity lowered the cost per unit of weight compared with pack animals.",
      },
      {
        id: "C",
        text: "Because West African gold made the Sahara the only bulk route.",
      },
      {
        id: "D",
        text: "Because Yuan paper money banned overland silk.",
      },
    ],
    correct: "B",
    explanation:
      "Water transport and seasonal wind reversal are the mechanism. A is factually false. C confuses a different corridor. D invents a ban the sources do not support; paper money facilitated silk purchase in Cathay.",
  },
];

export const TRANSFER_TASK = {
  sourceId: "monsoonParaphrase" as const,
  prompt:
    "Using the teaching paraphrase (not a primary quotation), explain in 4–6 sentences how monsoon predictability could increase exchange while still producing different effects for a Swahili port and an inland gold-producing district. Name the mechanism. Do not rewrite the Pegolotti paragraph.",
  successHint:
    "A strong answer mentions wind reversal, a specific cargo or gold path, and a contrast in institutions or revenue between coast and interior.",
};

export const EXIT_CHECK = {
  prompt:
    "In your own words: why did exchange increase c. 1200–1450, and why did its effects differ? Write 3–5 sentences. Use at least two networks.",
  reviewNote:
    "A spaced review is scheduled seven days after you finish this lesson. Watching the lesson counts as exposure only. Independent work on the quiz, short response, and delayed check is what can move an objective toward provisionally secure and then retained.",
};

export const LESSON_SOURCE_ID = SOURCES.pegolotti.id;
