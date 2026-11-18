import { EXAM_SPEC_2027 } from "./spec.ts";

export type RubricPoint = { id: string; description: string };
export type Source = { label: string; text: string; kind: "primary-text" | "secondary-text" | "non-text"; period: string };
export type ExamForm = {
  id: string; title: string; kind: "full" | "runner-fixture";
  mcqSets: { id: string; source: Source; questions: { id: string; stem: string; options: { id: string; text: string }[]; answer: string }[] }[];
  saqs: { id: string; source: Source; prompt: string; rubric: RubricPoint[] }[];
  dbq: { id: string; prompt: string; documents: Source[]; rubric: RubricPoint[] } | null;
  leq: { id: string; prompt: string; rubric: RubricPoint[] } | null;
};

/** Returns reasons a paper cannot start. Fixture geometry is explicitly separate from a full sitting. */
export function validateForm(form: ExamForm): string[] {
  const errors: string[] = [];
  const mcqs = form.mcqSets.flatMap(s => s.questions);
  const expected = form.kind === "full" ? [EXAM_SPEC_2027.mcq.count, EXAM_SPEC_2027.saq.count, EXAM_SPEC_2027.essay.dbq.count, EXAM_SPEC_2027.essay.leq.count] : [3, 1, 0, 0];
  const counts = [mcqs.length, form.saqs.length, Number(!!form.dbq), Number(!!form.leq)];
  if (counts.some((n, i) => n !== expected[i])) errors.push(`Section counts must be ${expected.join("/")}.`);
  if (form.kind === "full") {
    if (form.mcqSets.some(s => !EXAM_SPEC_2027.mcq.setSize.includes(s.questions.length as 3 | 4))) errors.push("MCQ sets must contain 3–4 questions.");
    if (form.saqs.some((s, i) => i === 2 ? s.source.kind !== "non-text" : s.source.kind !== EXAM_SPEC_2027.saq.sources[i])) errors.push("SAQ sources must follow the 2027 sequence.");
    if (new Set(form.saqs.map(s => s.source.period)).size !== 3 || form.saqs.some(s => !s.source.period.trim())) errors.push("SAQs must use three distinct periods.");
    if (form.dbq?.documents.length !== EXAM_SPEC_2027.essay.dbq.documents) errors.push("The DBQ must have seven documents.");
  }
  const ids = [...form.mcqSets.map(s => s.id), ...mcqs.map(q => q.id), ...form.saqs.map(q => q.id), ...(form.dbq ? [form.dbq.id] : []), ...(form.leq ? [form.leq.id] : [])];
  if (ids.some(id => !id.trim()) || new Set(ids).size !== ids.length) errors.push("Set and question IDs must be nonempty and unique.");
  if (mcqs.some(q => q.options.length < 2 || new Set(q.options.map(o => o.id)).size !== q.options.length || !q.options.some(o => o.id === q.answer))) errors.push("Each MCQ needs distinct options and a valid answer.");
  if (form.saqs.some(q => q.rubric.length !== EXAM_SPEC_2027.saq.pointsEach) || (form.dbq && form.dbq.rubric.length !== EXAM_SPEC_2027.essay.dbq.points) || (form.leq && form.leq.rubric.length !== EXAM_SPEC_2027.essay.leq.points)) errors.push("Rubrics must contain one criterion per available point.");
  for (const q of [...form.saqs, ...(form.dbq ? [form.dbq] : []), ...(form.leq ? [form.leq] : [])]) {
    if (q.rubric.some(p => !p.id.trim() || !p.description.trim()) || new Set(q.rubric.map(p => p.id)).size !== q.rubric.length) errors.push(`Invalid rubric: ${q.id}.`);
  }
  return errors;
}
