import type { ExamForm } from "../../lib/exam/forms.ts";

// Test fixture only. Deliberately fictional and never linked from a page.
export const runnerFixture: ExamForm = {
  id: "runner-fixture", title: "runner-fixture — test only", kind: "runner-fixture",
  mcqSets: [{ id: "fixture-set", source: { label: "Fixture source", text: "Fixture source: nothing historical.", kind: "secondary-text", period: "fixture" }, questions: [1, 2, 3].map(n => ({ id: `fixture-mcq-${n}`, stem: `Fixture item ${n}: choose A.`, options: [{ id: "A", text: "A" }, { id: "B", text: "B" }], answer: "A" })) }],
  saqs: [{ id: "fixture-saq", source: { label: "Fixture source", text: "Fixture text.", kind: "secondary-text", period: "fixture" }, prompt: "Fixture response: type anything.", rubric: [1, 2, 3].map(n => ({ id: `point-${n}`, description: `Fixture point ${n}.` })) }],
  dbq: null, leq: null,
};
