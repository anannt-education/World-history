import type { ExamForm } from "../../lib/exam/forms.ts";

// Content authors register completed full ExamForm objects here; see qa/FORM-NOTES.md.
export const forms: ExamForm[] = [];
export function getForm(id: string) { return forms.find(form => form.kind === "full" && form.id === id); }
