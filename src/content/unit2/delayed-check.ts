import type { DelayedCheckItem } from "@/lib/types";

export const DELAYED_CHECK_META = {
  id: "U2-REV-01",
  title: "Delayed check — exchange and its costs",
  formatYear: 2027 as const,
  estimatedMinutes: 16,
  delayDays: 7,
  demoNote:
    "A retained judgment on an objective requires a fresh independent check at least seven days after earlier success. This screen can wait for the real due date, or you can simulate the delay to demonstrate the rule. Simulation is labeled. It is not time travel.",
  contentNotice:
    "The stimulus describes epidemic disease and death in 1348 Florence. The academic content is required; you may pause and return.",
};

export const DELAYED_ITEMS: DelayedCheckItem[] = [
  {
    id: "d1",
    kind: "mcq",
    stimulusId: "boccaccioPlague",
    prompt:
      "Boccaccio reports that Florence’s precautions (cleansing, keeping the sick out) failed, and that contact with the sick and their belongings seemed to spread the malady. Combined with his claim that the pestilence had come from the East “from place to place,” the best Unit 2 use of this source is that",
    options: [
      {
        id: "A",
        text: "long-distance networks that moved people and goods could also move a pathogen, and a dense city then experienced local, person-to-person disaster.",
        rationale:
          "Correct. Two scales: hemispheric travel, then urban contagion. That is an environmental/demographic consequence of connectivity.",
      },
      {
        id: "B",
        text: "the plague proves that medieval people never tried to explain disease naturally.",
        rationale:
          "He lists celestial influence, divine wrath, and contagion by cloth. Multiple languages of cause are present.",
      },
      {
        id: "C",
        text: "Florence must have been the origin point because the Decameron is set there.",
        rationale:
          "He locates origin in the East years earlier. Setting ≠ origin.",
      },
      {
        id: "D",
        text: "literary sources cannot be used for environmental history.",
        rationale:
          "Genre requires care, not disposal. This is a dated urban testimony about a traveling pestilence.",
      },
    ],
    correct: "A",
    objectiveIds: ["U2-LO4", "U2-LO3"],
    formatYear: 2027,
  },
  {
    id: "d2",
    kind: "mcq",
    prompt:
      "A student argues: “Because Boccaccio is emotional about family members abandoning the sick, we should ignore him and only use Pegolotti.” The strongest reply is that",
    options: [
      {
        id: "A",
        text: "emotional testimony can still document social breakdown; Pegolotti cannot replace a Florentine urban witness, and neither source is a full map of Eurasia.",
        rationale:
          "Correct. Different sources, different uses. Emotion is a sourcing clue, not a shredder.",
      },
      {
        id: "B",
        text: "Pegolotti is unbiased because he lists prices.",
        rationale:
          "Price lists are still from a Florentine merchant’s world. Bias is not absent; it is different.",
      },
      {
        id: "C",
        text: "only official College Board documents may be used as sources.",
        rationale:
          "False, and this course is not College Board. Primary extracts are the point of the skill.",
      },
      {
        id: "D",
        text: "the student is right: one biased word ruins a source.",
        rationale:
          "This is the misconception the lesson rejects.",
      },
    ],
    correct: "A",
    objectiveIds: ["U2-LO3"],
    formatYear: 2027,
  },
  {
    id: "d3",
    kind: "short",
    prompt:
      "Fresh task (not the lesson’s Kilwa/Pegolotti comparison). In 5–7 sentences, explain one mechanism by which increased exchange c. 1200–1450 could produce both commercial intensification and demographic disaster, and why a caravan city, a Mediterranean commune, and a countryside might not experience those effects in the same way. You may use Boccaccio and your Unit 2 knowledge. Do not copy your earlier short response.",
    acceptable: [
      "networks move goods and pathogens",
      "urban density vs rural labor loss",
      "uneven state capacity",
      "dated 1340s Mediterranean arrival",
      "not a single moral of trade",
    ],
    objectiveIds: ["U2-LO4", "U2-LO2"],
    formatYear: 2027,
  },
];
