export const EXAM_2027 = {
  year: 2027 as const,
  planningBaseline: "May 2027 AP World History: Modern exam",
  sections: [
    {
      name: "Multiple choice",
      work: "55 questions",
      time: "55 minutes",
      weight: "40%",
    },
    {
      name: "Short answer",
      work: "3 required source-based SAQs",
      time: "40 minutes",
      weight: "20%",
    },
    {
      name: "Document-based question",
      work: "1 essay using a seven-document set (DBQ topics 1200–2001)",
      time: "Recommended 60 minutes, including reading, within the 100-minute writing section",
      weight: "25%",
    },
    {
      name: "Long essay",
      work: "1 required broad LEQ (not a menu of three prompts)",
      time: "Recommended 40 minutes within the shared 100-minute section",
      weight: "15%",
    },
  ],
  changes2027: [
    "All three SAQs are required and source-based: secondary text, primary text, and non-text material respectively.",
    "The LEQ is one required broad prompt with choice inside the response, not a choice among three separate prompts.",
    "Published updates left scoring rubrics unchanged; older practice still needs a format-year label.",
    "The exam is fully digital in Bluebook. This platform is not Bluebook and does not grant official accommodations.",
  ],
  disclaimer:
    "Anannt Education is not affiliated with or endorsed by the College Board. Official exam facts are cited for planning. The College Board is the official source of the AP World History: Modern Course and Exam Description. Nothing here is official AP scoring, an official practice exam, or a predicted AP 1–5 score.",
};

export const HELP_LOOP = [
  {
    title: "Source before summary",
    body: "You meet an unfamiliar extract with provenance. Observation is not inference. A biased source can still be used — that is the first mentoring move on Unit 2.",
  },
  {
    title: "Lesson with a mechanism",
    body: "A 25–40 minute Unit 2 session: dated map, explanation, worked comparison, retrieval that waits for your answer, transfer, exit check.",
  },
  {
    title: "Quiz with every-option rationales",
    body: "Stimulus-based MCQs written for this pilot. Related stimuli are labeled. Confidence is asked only on some items.",
  },
  {
    title: "Short response and revision",
    body: "A 2027-style source-based SAQ. Feedback is provisional, quotes your sentence, and names a diagnosis (sourcing, causation, or knowledge). You revise one paragraph; both versions stay visible.",
  },
  {
    title: "Delayed check",
    body: "A fresh task at least seven days later is required before an objective can be marked retained. This pilot can simulate that wait so mentors can see the rule.",
  },
  {
    title: "Mentor report",
    body: "The same device can switch to Mentor. Anannt academic staff see exposure, assisted work, independent work, retention, and pending scores, then name a next intervention rather than “watch it again.”",
  },
];
