import { SAQ } from "@/content/unit2/writing";
import type { DiagnosisKind, WritingFeedback } from "@/lib/types";

function norm(s: string) {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

function hasAny(text: string, needles: string[]) {
  const n = norm(text);
  return needles.some((x) => n.includes(x.toLowerCase()));
}

function quoteSnippet(text: string, max = 140) {
  const t = text.trim().replace(/\s+/g, " ");
  if (!t) return "(no prose submitted for this part)";
  return t.length > max ? `${t.slice(0, max)}…` : t;
}

const PART_A_KEYS = [
  "mogadishu",
  "host",
  "sumbuq",
  "guest",
  "mombasa",
  "cereal",
  "grain",
  "kilwa",
  "kulwa",
  "gold",
  "sofala",
  "sufala",
  "dhofar",
  "horse",
  "rice",
  "india",
  "monsoon",
  "wind",
  "mosque",
  "merchant",
];

const PART_B_KEYS = [
  "guest",
  "host",
  "scholar",
  "muslim",
  "islam",
  "elite",
  "sultan",
  "pious",
  "piety",
  "mosque",
  "generos",
  "jurist",
  "rihla",
  "travel",
  "hearsay",
  "told by",
  "audience",
  "emphas",
];

const PART_C_KEYS = [
  "inland",
  "interior",
  "port",
  "coast",
  "harbor",
  "harbour",
  "kilwa",
  "gold",
  "tax",
  "broker",
  "monsoon",
  "wind",
  "institution",
  "mosque",
  "farmer",
  "miner",
  "differ",
  "uneven",
  "not the same",
];

const MECHANISM_KEYS = [
  "because",
  "which led",
  "so that",
  "therefore",
  "mechanism",
  "this meant",
  "allowed",
  "which meant",
  "as a result",
  "thereby",
];

const BIAS_USELESS = [
  "useless",
  "cannot be used",
  "can't be used",
  "unreliable so ignore",
  "too biased",
  "biased so",
];

export function scoreSaq(parts: Record<"A" | "B" | "C", string>): WritingFeedback {
  const a = parts.A ?? "";
  const b = parts.B ?? "";
  const c = parts.C ?? "";

  const aHit = hasAny(a, PART_A_KEYS);
  const bHit = hasAny(b, PART_B_KEYS);
  const cHit = hasAny(c, PART_C_KEYS);
  const cMech = hasAny(c, MECHANISM_KEYS) || /because|which|so that/i.test(c);
  const bUseless = hasAny(b, BIAS_USELESS);
  const tooShort = (t: string) => t.trim().split(/\s+/).filter(Boolean).length < 12;

  const partA = {
    partId: "A" as const,
    addressed: aHit && !tooShort(a),
    missing: aHit
      ? tooShort(a)
        ? "The detail is thin. Name the practice or cargo as it appears in the excerpt."
        : ""
      : "No excerpt-specific marker (host system, imported grain, Sofala gold, monsoon horses/rice, mosques).",
    citedPassage: quoteSnippet(a),
    explanation: aHit
      ? "Part A can be credited when a reader can see Indian Ocean exchange in a concrete source detail — a host, cargo, wind, or mosque, not a Unit 2 slogan."
      : "Part A asks for identification from the source. A thin first attempt is common; name what is on the page, then we will talk mechanism.",
    pointDecision: (aHit && !tooShort(a)
      ? "likely_credit"
      : aHit
        ? "borderline"
        : "likely_no_credit") as WritingFeedback["parts"][0]["pointDecision"],
  };

  const partB = {
    partId: "B" as const,
    addressed: bHit && !bUseless && !tooShort(b),
    missing: bUseless
      ? "The response treats bias as automatic uselessness — the opposite of the sourcing skill."
      : bHit
        ? tooShort(b)
          ? "Say how the position shapes emphasis, not only that he was a traveler."
          : ""
        : "Does not connect traveler/guest/Muslim scholar position to what the rihla highlights or omits.",
    citedPassage: quoteSnippet(b),
    explanation:
      "Part B is sourcing: audience, situation, and purpose. A courtly guest will see sultans and piety more clearly than inland miners. Bias explains emphasis; it does not shred the source.",
    pointDecision: (bUseless
      ? "likely_no_credit"
      : bHit && !tooShort(b)
        ? "likely_credit"
        : "likely_no_credit") as WritingFeedback["parts"][0]["pointDecision"],
  };

  const partC = {
    partId: "C" as const,
    addressed: cHit && cMech && !tooShort(c),
    missing: !cHit
      ? "Needs a coast/port versus inland contrast with a named mechanism (tax, brokerage, monsoon concentration, gold path)."
      : cMech
        ? tooShort(c)
          ? "Expand the relationship: how does the harbor position produce a different effect?"
          : ""
        : "Lists places or goods without explaining the relationship between exchange and uneven effects.",
    citedPassage: quoteSnippet(c),
    explanation:
      "Part C is the Unit 2 heart: same ocean, different locations in the chain. A list of commodities is not yet an argument. One causal sentence is the next practice.",
    pointDecision: (cHit && cMech && !tooShort(c)
      ? "likely_credit"
      : cHit
        ? "borderline"
        : "likely_no_credit") as WritingFeedback["parts"][0]["pointDecision"],
  };

  let diagnosis: DiagnosisKind = "adequate";
  if (bUseless) diagnosis = "sourcing";
  else if (!partA.addressed && !partC.addressed) diagnosis = "factual_knowledge";
  else if (partA.addressed && cHit && !cMech) diagnosis = "unexplained_relationship";
  else if (partA.addressed && !cHit) diagnosis = "weak_evidence";
  else if (!partB.addressed) diagnosis = "sourcing";
  else if (!partA.addressed) diagnosis = "task_interpretation";
  else if (!partC.addressed) diagnosis = "unexplained_relationship";

  const next =
    diagnosis === "sourcing"
      ? {
          label: "Guided sourcing on Pegolotti",
          href: "/learn/unit-2?block=source",
          why: "The issue is how an author’s situation shapes usable evidence, not a missing video.",
        }
      : diagnosis === "unexplained_relationship"
        ? {
            label: "Rebuild the worked comparison",
            href: "/learn/unit-2?block=worked",
            why: "You have pieces of knowledge; the next drill is naming a mechanism that links exchange to change in two settings.",
          }
        : diagnosis === "factual_knowledge" || diagnosis === "weak_evidence"
          ? {
              label: "Targeted retrieval on networks",
              href: "/practice",
              why: "The gap is specific evidence (ports, gold path, monsoon, paper money), not “watch the lesson again.”",
            }
          : diagnosis === "task_interpretation"
            ? {
                label: "Re-read the SAQ parts",
                href: "/writing",
                why: "Part A wants a source identification. Answer the verb before adding extra essay architecture.",
              }
            : {
                label: "Delayed check when due",
                href: "/review",
                why: "Independent explanation looks usable. Retention still needs a fresh source later.",
              };

  const priority =
    diagnosis === "sourcing"
      ? "Rewrite Part B so bias explains emphasis; do not bin the source."
      : diagnosis === "unexplained_relationship"
        ? "In revision, write one causal sentence: port position → institution or tax → different inland effect."
        : diagnosis === "factual_knowledge"
          ? "Return to the excerpt and name one cargo, custom, or place actually on the page."
          : diagnosis === "weak_evidence"
            ? "Attach Part C to a specific gold path, host custom, or monsoon cargo rather than “trade increased.”"
            : diagnosis === "task_interpretation"
              ? "Separate the three parts. Do not spend Part A on a thesis paragraph."
              : "Tighten one sentence of Part C so a mentor can see the mechanism without rereading the source.";

  return {
    status: "provisional",
    rubricVersion: SAQ.rubricVersion,
    generatedAt: new Date().toISOString(),
    parts: [partA, partB, partC],
    diagnosis,
    highestPriorityImprovement: priority,
    revisionTask:
      "Revise only Part C (or Part B if sourcing was the diagnosis) into one tighter paragraph. Keep the original visible. Do not inflate length; name the mechanism.",
    nextAction: next,
  };
}

export function scoreDelayedShort(text: string) {
  const n = norm(text);
  const hits = [
    "plague",
    "pest",
    "pathogen",
    "disease",
    "east",
    "network",
    "trade",
    "exchange",
    "city",
    "florence",
    "countr",
    "labor",
    "labour",
    "uneven",
    "differ",
    "caravan",
    "because",
  ].filter((k) => n.includes(k)).length;
  const mech = /because|which|so that|as a result|thereby|this meant/i.test(text);
  const longEnough = text.trim().split(/\s+/).length >= 40;
  const correct = hits >= 5 && mech && longEnough;
  const partial = hits >= 3 && longEnough;
  return { correct, partial, hits };
}
