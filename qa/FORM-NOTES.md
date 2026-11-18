# 2027 form authoring

Official course exam reference: https://apcentral.collegeboard.org/courses/ap-world-history/exam (format supplied as checked 2026-11-18).

Create `src/content/forms/<form-id>.ts` exporting an object of type `ExamForm` from `src/lib/exam/forms.ts`, with `kind: "full"`. Supply 55 MCQs in source sets of 3–4, three required SAQs in the source order secondary text, primary text, non-text and with three distinct period labels (1200–2001), one DBQ with seven documents, and one required broad LEQ. Supply a correct option ID per MCQ and one rubric criterion per available point (3 per SAQ, 7 DBQ, 6 LEQ). Give every set and question a unique ID, and each rubric criterion a unique ID within its question. Register the object in `src/content/forms/index.ts`. The runner rejects forms failing validation; content and historical period accuracy still require author review. Add a link to the registered form from the gated mock-exams page only when the paper is ready.

Run `node --experimental-strip-types scripts/export-form-for-qa.mjs <form-id>` to produce `qa/form-stems.json` (no answers or rubrics) and `qa/form-keys.json` (answers and rubrics). Treat the latter as answer-bearing material. The runner-fixture is deliberately fake and is not a real paper.
