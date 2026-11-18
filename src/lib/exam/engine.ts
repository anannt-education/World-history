import { EXAM_SPEC_2027 } from "./spec.ts";
import { validateForm, type ExamForm } from "./forms.ts";
export type Section = "mcq" | "saq" | "essay";
export type Attempt = { version: 1; formId: string; section: Section | "results"; deadline: number; responses: Record<string, string>; points: Record<string, boolean>; };
export function sections(form: ExamForm): Section[] { return form.kind === "runner-fixture" ? ["mcq", "saq"] : ["mcq", "saq", "essay"]; }
export function minutes(section: Section) { return section === "mcq" ? EXAM_SPEC_2027.mcq.minutes : section === "saq" ? EXAM_SPEC_2027.saq.minutes : EXAM_SPEC_2027.essay.minutes; }
export function start(form: ExamForm, now: number): Attempt {
  const errors = validateForm(form); if (errors.length) throw new Error(errors.join(" "));
  return { version: 1, formId: form.id, section: "mcq", deadline: now + minutes("mcq") * 60000, responses: {}, points: {} };
}
export function advance(form: ExamForm, attempt: Attempt, now: number): Attempt {
  if (attempt.section === "results") return attempt;
  const next = sections(form)[sections(form).indexOf(attempt.section) + 1];
  const transitionTime = Math.min(now, attempt.deadline);
  return { ...attempt, section: next ?? "results", deadline: next ? transitionTime + minutes(next) * 60000 : 0 };
}
export function settleExpired(form: ExamForm, attempt: Attempt, now: number): Attempt {
  let current = attempt;
  while (current.section !== "results" && now >= current.deadline) current = advance(form, current, now);
  return current;
}
export function score(form: ExamForm, attempt: Attempt) {
  if (attempt.formId !== form.id || attempt.section !== "results") throw new Error("Sitting has not been submitted.");
  const questions = form.mcqSets.flatMap(s => s.questions);
  const mcq = questions.filter(q => attempt.responses[q.id] === q.answer).length;
  const rubricScore = (q: { id: string; rubric: { id: string }[] }) => q.rubric.filter(p => attempt.points[`${q.id}:${p.id}`]).length;
  return { mcq, mcqTotal: questions.length, saqs: form.saqs.map(q => ({ id: q.id, score: rubricScore(q), total: q.rubric.length })), dbq: form.dbq ? rubricScore(form.dbq) : null, leq: form.leq ? rubricScore(form.leq) : null };
}
