#!/usr/bin/env node
// Run with Node's type stripping: node --experimental-strip-types scripts/export-form-for-qa.mjs FORM_ID
import { mkdir, writeFile } from "node:fs/promises";
import { getForm } from "../src/content/forms/index.ts";
import { validateForm } from "../src/lib/exam/forms.ts";
const id = process.argv[2];
const form = id && getForm(id);
if (!form) { console.error("Usage: node --experimental-strip-types scripts/export-form-for-qa.mjs FORM_ID (registered form required)"); process.exit(1); }
const errors = validateForm(form);
if (errors.length) { console.error(`Invalid form: ${errors.join(" ")}`); process.exit(1); }
const without = (object, key) => Object.fromEntries(Object.entries(object).filter(([name]) => name !== key));
const stems = { ...form, mcqSets: form.mcqSets.map(set => ({ ...set, questions: set.questions.map(q => without(q, "answer")) })), saqs: form.saqs.map(q => without(q, "rubric")), dbq: form.dbq && without(form.dbq, "rubric"), leq: form.leq && without(form.leq, "rubric") };
const keys = { id: form.id, mcq: form.mcqSets.flatMap(set => set.questions.map(q => ({ id: q.id, answer: q.answer }))), saqs: form.saqs.map(q => ({ id: q.id, rubric: q.rubric })), dbq: form.dbq && { id: form.dbq.id, rubric: form.dbq.rubric }, leq: form.leq && { id: form.leq.id, rubric: form.leq.rubric } };
await mkdir("qa", { recursive: true });
await Promise.all([writeFile("qa/form-stems.json", JSON.stringify(stems, null, 2) + "\n"), writeFile("qa/form-keys.json", JSON.stringify(keys, null, 2) + "\n")]);
console.log(`Exported ${form.id} to qa/form-stems.json and qa/form-keys.json`);
