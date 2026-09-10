import type { LearningObjective, UnitSummary } from "@/lib/types";

export const UNITS: UnitSummary[] = [
  {
    id: 1,
    officialName: "The Global Tapestry",
    weighting: "8–10%",
    published: false,
    statusLabel: "Unpublished in this pilot",
  },
  {
    id: 2,
    officialName: "Networks of Exchange",
    weighting: "8–10%",
    published: true,
    statusLabel: "Published — complete learning loop",
  },
  {
    id: 3,
    officialName: "Land-Based Empires",
    weighting: "12–15%",
    published: false,
    statusLabel: "Unpublished in this pilot",
  },
  {
    id: 4,
    officialName: "Transoceanic Interconnections",
    weighting: "12–15%",
    published: false,
    statusLabel: "Unpublished in this pilot",
  },
  {
    id: 5,
    officialName: "Revolutions",
    weighting: "12–15%",
    published: false,
    statusLabel: "Unpublished in this pilot",
  },
  {
    id: 6,
    officialName: "Consequences of Industrialization",
    weighting: "12–15%",
    published: false,
    statusLabel: "Unpublished in this pilot",
  },
  {
    id: 7,
    officialName: "Global Conflict",
    weighting: "8–10%",
    published: false,
    statusLabel: "Unpublished in this pilot",
  },
  {
    id: 8,
    officialName: "Cold War and Decolonization",
    weighting: "8–10%",
    published: false,
    statusLabel: "Unpublished in this pilot",
  },
  {
    id: 9,
    officialName: "Globalization",
    weighting: "8–10%",
    published: false,
    statusLabel: "Unpublished in this pilot",
  },
];

export const OBJECTIVES: LearningObjective[] = [
  {
    id: "U2-LO1",
    unit: 2,
    title: "Why exchange expanded",
    assessableStatement:
      "Explain why long-distance exchange intensified c. 1200–1450, using dated examples of commercial practice, state power, and transport knowledge — without treating any single network as the whole story.",
    skillTags: ["developments", "causation"],
    themeTags: ["economics", "technology"],
  },
  {
    id: "U2-LO2",
    unit: 2,
    title: "Uneven effects of exchange",
    assessableStatement:
      "Explain a mechanism linking exchange to cultural, political, or commercial change in two different settings, and account for why outcomes were not uniform.",
    skillTags: ["causation", "comparison"],
    themeTags: ["culture", "governance"],
  },
  {
    id: "U2-LO3",
    unit: 2,
    title: "Sourcing exchange evidence",
    assessableStatement:
      "Analyze a source on exchange by separating what the text states from a reasonable inference, and by explaining how the author’s situation affects interpretation. A biased source is not automatically useless.",
    skillTags: ["sourcing", "claims-evidence"],
    themeTags: ["exchange"],
  },
  {
    id: "U2-LO4",
    unit: 2,
    title: "Environmental and demographic costs",
    assessableStatement:
      "Explain how the same networks that moved goods and ideas also moved pathogens and pressures, producing effects that differed by place and social position.",
    skillTags: ["causation", "contextualization"],
    themeTags: ["environment", "demography"],
  },
];

export const CENTRAL_QUESTION =
  "Why did exchange increase, and why did its effects differ across societies?";

export const UNIT2_SESSION = {
  title: "Networks of Exchange, c. 1200–1450",
  estimatedMinutes: 32,
  rangeNote:
    "Core session designed for 25–40 minutes of focused work. Writing, quiz, and delayed check are additional assessed tasks in the same loop.",
};
