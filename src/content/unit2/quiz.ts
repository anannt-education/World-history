import type { McqItem } from "@/lib/types";

export const QUIZ_META = {
  id: "U2-PRC-01",
  title: "Unit 2 stimulus set — Networks of Exchange",
  formatYear: 2027 as const,
  estimatedMinutes: 18,
  note: "Original items for the 2027 digital exam format. These are not AP Classroom or released-exam questions. Explanations address every option.",
};

export const QUIZ_ITEMS: McqItem[] = [
  {
    id: "q1",
    stimulusFamily: "PEG-1340",
    reusesStimulusFamily: "PEG-1340",
    stimulusId: "pegolotti",
    stimulusIntro:
      "Related stimulus: this excerpt is from the same Pegolotti handbook used in the lesson (family PEG-1340). It is not fully fresh evidence of the underlying skill.",
    prompt:
      "Pegolotti’s statement that the Tana–Cathay road is “perfectly safe … according to what the merchants say” is best used to support which claim?",
    options: [
      {
        id: "A",
        text: "Italian merchants believed overland travel under Mongol-era arrangements could be commercially routine, at least between successions.",
        rationale:
          "Correct. The phrase attributes the claim to merchants who used the road, and the same chapter immediately qualifies safety. That is evidence of perceived routine, not of paradise.",
      },
      {
        id: "B",
        text: "The Mongol world-empire had abolished local rulers along the entire route.",
        rationale:
          "The text still speaks of “the lord of the country” taking a dead merchant’s goods. Local lordship remains.",
      },
      {
        id: "C",
        text: "Pegolotti’s bias as a Christian Florentine makes the passage unusable.",
        rationale:
          "Bias shapes what he notices (costs, silk, Franks). It does not automatically cancel a commercial handbook. Sourcing means using the bias, not binning the source.",
      },
      {
        id: "D",
        text: "Paper money had already replaced silver everywhere between Tana and Cathay.",
        rationale:
          "Paper money appears in Cathay after silver is surrendered. Earlier stages still use silver sommi. The option smuggles a later, total replacement.",
      },
    ],
    correct: "A",
    objectiveIds: ["U2-LO3", "U2-LO1"],
    skillTags: ["sourcing", "claims-evidence"],
    difficulty: "moderate",
    formatYear: 2027,
    askConfidence: true,
  },
  {
    id: "q2",
    stimulusFamily: "PEG-1340",
    reusesStimulusFamily: "PEG-1340",
    stimulusIntro:
      "Same handbook family as the lesson source. Pegolotti on money in Cathay.",
    prompt:
      "According to Pegolotti, what happens to silver that merchants bring into Cathay?",
    options: [
      {
        id: "A",
        text: "It is taken into the lord’s treasury and replaced with sealed paper money that people are bound to accept for goods including silk.",
        rationale:
          "Correct. The extract states the exchange and the legal tender claim. That is a state-backed commercial technology, not a traveler’s souvenir.",
      },
      {
        id: "B",
        text: "It is secretly shaved by dragomen, which is why Pegolotti forbids hiring them.",
        rationale:
          "He insists on hiring a good dragoman. He does not describe shaving silver as the monetary system.",
      },
      {
        id: "C",
        text: "It is minted into florins so Italians can avoid Yuan taxes.",
        rationale:
          "Florins are Pegolotti’s home unit of account. The Yuan system described here is paper balishi, not Florentine coin.",
      },
      {
        id: "D",
        text: "It is refused because Cathay only accepts gold dust from Sofala.",
        rationale:
          "Sofala gold belongs to the Indian Ocean/Swahili system in Ibn Battuta, not to this handbook.",
      },
    ],
    correct: "A",
    objectiveIds: ["U2-LO1"],
    skillTags: ["developments"],
    difficulty: "moderate",
    formatYear: 2027,
  },
  {
    id: "q3",
    stimulusFamily: "TEACH-SAHARA",
    stimulusId: "transSaharanParaphrase",
    stimulusIntro:
      "Teaching paraphrase (not a primary-source quotation). Gold, salt, and Mali.",
    prompt:
      "Which statement best captures why trans-Saharan exchange could enrich a court without transforming every gold-producing community in the same way?",
    options: [
      {
        id: "A",
        text: "Mali occupied every Saharan oasis and therefore made rural producers identical to Timbuktu scholars.",
        rationale:
          "The paraphrase says Mali did not need to occupy every oasis. Uniformity is the error.",
      },
      {
        id: "B",
        text: "Camel caravans, oasis wells, and imperial protection lowered desert crossing costs, while towns and courts captured Islamic and commercial institutions more fully than many gold-producing countrysides.",
        rationale:
          "Correct. Mechanism (lowered crossing cost) plus uneven institutional capture. That is the Unit 2 comparison skill.",
      },
      {
        id: "C",
        text: "West African societies were isolated until Mansa Musa’s hajj created the Sahara.",
        rationale:
          "Corridors predate 1324. The hajj is an illustration of visibility, not a creation myth.",
      },
      {
        id: "D",
        text: "Salt was valuable only as a religious symbol and had no commercial role.",
        rationale:
          "Salt is a staple trade good in this corridor. The option invents symbolism to avoid economics.",
      },
    ],
    correct: "B",
    objectiveIds: ["U2-LO2", "U2-LO1"],
    skillTags: ["comparison", "causation"],
    difficulty: "challenging",
    formatYear: 2027,
    askConfidence: true,
  },
  {
    id: "q4",
    stimulusFamily: "IBN-1331-SWAHILI",
    stimulusId: "ibnBattutaKilwa",
    prompt:
      "Ibn Battuta describes young men in small boats claiming arriving merchants as guests and then buying and selling for them in Mogadishu. A historian would most reasonably infer that this custom",
    options: [
      {
        id: "A",
        text: "eliminated all possibility of fraud in the Indian Ocean.",
        rationale:
          "The source says sales without the host are treated as invalid — a local enforcement rule, not a universal end to fraud.",
      },
      {
        id: "B",
        text: "tied a foreign merchant’s access to the market to a local intermediary, which could both protect and constrain the visitor.",
        rationale:
          "Correct. The text states the host sells and buys, and that bypassing the host voids the sale. Protection and constraint are two sides of the same practice.",
      },
      {
        id: "C",
        text: "proves that Mogadishu had no sultan and was run only by visiting Maghribis.",
        rationale:
          "Ibn Battuta also describes a shaykh/sultan, a qadi, and palace ceremony. The option contradicts the same extract.",
      },
      {
        id: "D",
        text: "cannot be used because Ibn Battuta liked generous hosts and is therefore unreliable on every point.",
        rationale:
          "His taste for hospitality is a sourcing issue: he may over-praise piety. The boat custom is still a specific, usable description of port practice.",
      },
    ],
    correct: "B",
    objectiveIds: ["U2-LO3", "U2-LO2"],
    skillTags: ["sourcing", "developments"],
    difficulty: "challenging",
    formatYear: 2027,
  },
  {
    id: "q5",
    stimulusFamily: "TEACH-MONSOON",
    stimulusId: "monsoonParaphrase",
    stimulusIntro: "Teaching paraphrase (not a primary-source quotation).",
    prompt:
      "The monsoon system is a cause of increased Indian Ocean exchange primarily because it",
    options: [
      {
        id: "A",
        text: "made departure and return calendars predictable enough to support regular, including bulk, cargoes.",
        rationale:
          "Correct. Predictable wind reversal is the mechanism. The paraphrase contrasts that with Inner Asian weight costs.",
      },
      {
        id: "B",
        text: "removed the need for any political authority in Swahili city-states.",
        rationale:
          "Ports still had sultans, hosts, and taxes. Wind does not abolish politics.",
      },
      {
        id: "C",
        text: "forced all inland societies to become identical to Kilwa.",
        rationale:
          "The paraphrase’s point is the opposite: inland districts could supply gold without becoming ports.",
      },
      {
        id: "D",
        text: "began only after 1498, when Atlantic Europeans entered the ocean.",
        rationale:
          "Monsoon sailing long predates late-fifteenth-century Atlantic entry. Unit 2 is c. 1200–1450.",
      },
    ],
    correct: "A",
    objectiveIds: ["U2-LO1"],
    skillTags: ["causation"],
    difficulty: "moderate",
    formatYear: 2027,
  },
  {
    id: "q6",
    stimulusFamily: "PEG-1340",
    stimulusIntro:
      "No new quotation. Use the lesson’s account of Mongol-era overland exchange and Pegolotti’s exceptions.",
    prompt:
      "Which explanation best links Mongol-era state power to increased overland exchange without treating conquest as gentle?",
    options: [
      {
        id: "A",
        text: "After conquest, linked polities could sell protection and punish robbery along corridors they valued, even though succession crises and earlier destruction remained real.",
        rationale:
          "Correct. The mechanism is protection and information on a held corridor, with explicit limits (death of a lord; prior sackings).",
      },
      {
        id: "B",
        text: "Mongol rulers abolished trade taxes, so exchange was free and ungoverned.",
        rationale:
          "Pegolotti is full of duties, charges, and paper-money monopoly. Ungoverned free trade is not the claim.",
      },
      {
        id: "C",
        text: "Merchants traveled only after 1368, when the Ming restored the Silk Roads.",
        rationale:
          "The Pegolotti horizon is earlier, under Yuan-era Cathay. The option reverses the sequence.",
      },
      {
        id: "D",
        text: "Overland exchange increased solely because Europeans demanded spices.",
        rationale:
          "Demand matters, but the Unit 2 mechanism here is Eurasian state power and commercial technique, not a later Atlantic story.",
      },
    ],
    correct: "A",
    objectiveIds: ["U2-LO1", "U2-LO2"],
    skillTags: ["causation"],
    difficulty: "challenging",
    formatYear: 2027,
  },
  {
    id: "q7",
    stimulusFamily: "BOCC-1348",
    stimulusId: "boccaccioPlague",
    stimulusIntro:
      "Content notice: epidemic disease and death. This item introduces a source you will meet again in the delayed check; the delayed check uses a different task, not this exact question.",
    prompt:
      "Boccaccio says the 1348 pestilence in Florence had originated “some years before in the East” and spread “from place to place.” The most historically responsible use of that sentence is to",
    options: [
      {
        id: "A",
        text: "treat it as laboratory proof of a unique origin city and a single caravan.",
        rationale:
          "A literary eyewitness cannot settle phylogeny. Over-precision is the trap.",
      },
      {
        id: "B",
        text: "show that a Mediterranean writer understood the disaster as something that had traveled, which is consistent with (but not identical to) historians’ argument that dense long-distance networks moved pathogens.",
        rationale:
          "Correct. Direction-of-travel is a contemporary claim; networks as a condition of spread is the historical argument. Keep them nested, not collapsed.",
      },
      {
        id: "C",
        text: "prove that Florentines caused the plague by refusing sick people at the gates.",
        rationale:
          "He lists precautions that failed. Failure of quarantine is not a claim that Florence originated the disease.",
      },
      {
        id: "D",
        text: "discard the source because Boccaccio also mentions divine wrath and therefore cannot observe anything.",
        rationale:
          "Multiple causal languages (God, stars, contagion by clothes) are typical of the period. They do not erase his observation of spread and social collapse.",
      },
    ],
    correct: "B",
    objectiveIds: ["U2-LO4", "U2-LO3"],
    skillTags: ["contextualization", "sourcing"],
    difficulty: "challenging",
    formatYear: 2027,
    askConfidence: true,
  },
];
