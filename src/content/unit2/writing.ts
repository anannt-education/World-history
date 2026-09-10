import type { SaqSet } from "@/lib/types";

export const SAQ: SaqSet = {
  id: "U2-SAQ-01",
  formatYear: 2027,
  formatNote:
    "2027 format: all three SAQs are required and source-based (secondary text, primary text, and non-text respectively on the official exam). This pilot item is a primary-text SAQ. It is not an official College Board prompt and is not officially scored.",
  stimulusId: "ibnBattutaKilwa",
  task: "Use the excerpt and your knowledge of Unit 2 (c. 1200–1450).",
  parts: [
    {
      id: "A",
      prompt:
        "Identify one specific way Indian Ocean exchange is visible in the excerpt.",
      acceptableEvidence: [
        "merchant-host system at Mogadishu / sumbuqs meeting ships",
        "cereals imported to Mombasa",
        "gold dust reported via Sofala to Kilwa",
        "horses exported from Dhofar to India with a favoring wind",
        "rice imported from India to Dhofar",
        "wooden mosques; visiting Muslim scholar hosted by elites",
      ],
      commonErrors: [
        "Generic 'they traded a lot' with no excerpt detail",
        "Silk Roads or Sahara examples that are not in this source",
        "Claiming Ibn Battuta is a Swahili merchant",
      ],
    },
    {
      id: "B",
      prompt:
        "Explain one way Ibn Battuta’s position as a traveling Muslim scholar and guest of local elites might shape what he emphasizes.",
      acceptableEvidence: [
        "He notices piety, mosques, generous sultans, and hospitality because he is hosted as a jurist/visitor",
        "He may under-describe non-Muslim inland producers or ordinary sailors",
        "Hearsay about gold (“I was told by a merchant”) still reflects who he could interview",
        "A courtly rihla rewards striking generosity and ceremonial detail",
      ],
      commonErrors: [
        "He is biased so the source is useless",
        "He is an objective modern economist",
        "Confusing him with Pegolotti or Marco Polo",
      ],
    },
    {
      id: "C",
      prompt:
        "Explain one reason the effects of Indian Ocean exchange differed between a Swahili coast port and an inland society not sitting on the monsoon harbors. Use specific historical knowledge as well as the excerpt.",
      acceptableEvidence: [
        "Ports capture brokerage, taxes, and Islamic institutions; inland gold/ivory suppliers meet the network as demand",
        "Monsoon hulls concentrate people and specialists in harbors",
        "Kilwa’s reported Sofala gold path vs. a mining district a month inland",
        "Dhofar merchants living 'entirely on trade' vs. agricultural interiors",
      ],
      commonErrors: [
        "Both places became identical because of Islam",
        "No mechanism — only a list of goods",
        "Atlantic slavery or post-1498 Portuguese control as the main cause in this period",
      ],
    },
  ],
  rubricVersion: "anannt-saq-u2-2027-v1",
};

export const WRITING_STUDIO_META = {
  title: "Short response — Indian Ocean ports",
  estimatedMinutes: 22,
  revisionMinutes: 12,
};
