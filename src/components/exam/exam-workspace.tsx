"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { advance, score, settleExpired, start, type Attempt } from "@/lib/exam/engine";
import { validateForm, type ExamForm, type Source } from "@/lib/exam/forms";
import { loadAttempt, saveAttempt } from "@/lib/exam/storage";

const labels = { mcq: "Section I, Part A — Multiple choice", saq: "Section I, Part B — Short answer", essay: "Section II — DBQ and long essay" };
function SourceView({ source }: { source: Source }) { return <div className="rounded border p-3 text-sm"><strong>{source.label}</strong><p className="whitespace-pre-wrap">{source.text}</p></div>; }

export function ExamWorkspace({ form, resultsOnly = false }: { form: ExamForm; resultsOnly?: boolean }) {
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [ready, setReady] = useState(false);
  const [now, setNow] = useState(0);
  const [saved, setSaved] = useState(true);
  const errors = validateForm(form);
  useEffect(() => {
    const timer = window.setTimeout(() => { const currentTime = Date.now(); const loaded = loadAttempt(form.id); const restored = loaded ? settleExpired(form, loaded, currentTime) : null; if (restored && restored !== loaded) setSaved(saveAttempt(restored)); setAttempt(restored); setNow(currentTime); setReady(true); }, 0);
    return () => window.clearTimeout(timer);
  }, [form]);
  useEffect(() => {
    if (!attempt || attempt.section === "results") return;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [attempt]);
  useEffect(() => {
    if (!attempt || attempt.section === "results" || !now || now < attempt.deadline) return;
    const timer = window.setTimeout(() => { const next = settleExpired(form, attempt, Date.now()); setSaved(saveAttempt(next)); setAttempt(next); }, 0);
    return () => window.clearTimeout(timer);
  }, [attempt, now, form]);
  function update(next: Attempt) { setSaved(saveAttempt(next)); setAttempt(next); }
  function response(id: string, value: string, currentTime: number) { if (attempt && attempt.section !== "results" && currentTime < attempt.deadline) update({ ...attempt, responses: { ...attempt.responses, [id]: value } }); }
  if (errors.length) return <div><h1>Form unavailable</h1><p>This form cannot start until its structure is complete.</p><ul>{errors.map(e => <li key={e}>{e}</li>)}</ul></div>;
  if (!ready) return <p>Loading this device’s saved sitting…</p>;
  if (resultsOnly && (!attempt || attempt.section !== "results")) return <p>No completed sitting on this device. <Link className="underline" href={`/mock-exams/${form.id}`}>Return to the sitting</Link>.</p>;
  if (!attempt) return <div className="space-y-4"><h1 className="font-heading text-3xl">{form.title}</h1><p>Allow 55 minutes for multiple choice, 40 for short answer, and 100 for the shared writing section. Each section starts when you move to it; leaving this page does not pause its clock.</p><p className="text-sm text-muted-foreground">Work is saved in this browser on this device. Clearing site data removes it. Official testing is in Bluebook.</p><button className="rounded bg-primary px-4 py-2 text-primary-foreground" onClick={() => update(start(form, Date.now()))}>Start sitting</button></div>;
  if (attempt.section === "results") {
    const result = score(form, attempt);
    const weighted = form.kind === "full" ? 40 * result.mcq / result.mcqTotal + 20 * result.saqs.reduce((sum, q) => sum + q.score, 0) / 9 + 25 * (result.dbq ?? 0) / 7 + 15 * (result.leq ?? 0) / 6 : null;
    const written = [...form.saqs, ...(form.dbq ? [form.dbq] : []), ...(form.leq ? [form.leq] : [])];
    return <div className="space-y-6"><h1 className="font-heading text-3xl">Results · {form.title}</h1><p>Multiple choice: {result.mcq} / {result.mcqTotal}</p>{weighted !== null && <p>Weighted practice result: {weighted.toFixed(1)}% (including your self-scores).</p>}<p>Score your written responses using each point below. These are your own judgments.</p>{written.map(q => <section className="space-y-3 rounded border p-4" key={q.id}><h2 className="font-semibold">{q.id}</h2><p className="whitespace-pre-wrap">{q.prompt}</p><p className="whitespace-pre-wrap rounded bg-muted p-3">{attempt.responses[q.id] || "No response."}</p><fieldset><legend>Self-score: {q.rubric.filter(p => attempt.points[`${q.id}:${p.id}`]).length} / {q.rubric.length}</legend>{q.rubric.map(p => <label className="mt-2 flex gap-2" key={p.id}><input type="checkbox" checked={!!attempt.points[`${q.id}:${p.id}`]} onChange={e => update({ ...attempt, points: { ...attempt.points, [`${q.id}:${p.id}`]: e.target.checked } })} />{p.description}</label>)}</fieldset></section>)}<p className="text-sm">Anannt Education is not affiliated with or endorsed by College Board; practice scores are not AP scores.</p><div className="flex gap-4"><Link className="underline" href={`/mock-exams/${form.id}/results`}>Results page</Link><Link className="underline" href="/mock-exams">Mock exams</Link></div></div>;
  }
  const remaining = Math.max(0, Math.ceil((attempt.deadline - now) / 1000));
  const locked = now >= attempt.deadline;
  return <div className="space-y-6"><header className="space-y-2"><p className="text-sm text-muted-foreground">{form.title}</p><h1 className="font-heading text-3xl">{labels[attempt.section]}</h1><p role="timer">Time remaining: {Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, "0")}</p><p role="status" className="text-sm">{saved ? "Saved on this device." : "Could not save on this device. Check browser storage before continuing."}</p></header>
  {attempt.section === "mcq" && form.mcqSets.map(set => <section key={set.id} className="space-y-4"><SourceView source={set.source} />{set.questions.map((q, i) => <fieldset key={q.id} disabled={locked} className="space-y-2 rounded border p-4"><legend className="font-semibold">{i + 1}. {q.stem}</legend>{q.options.map(o => <label key={o.id} className="flex gap-2"><input type="radio" name={q.id} value={o.id} checked={attempt.responses[q.id] === o.id} onChange={() => response(q.id, o.id, Date.now())} />{o.id}. {o.text}</label>)}</fieldset>)}</section>)}
  {attempt.section === "saq" && form.saqs.map(q => <section key={q.id} className="space-y-3"><SourceView source={q.source} /><label className="block font-semibold" htmlFor={q.id}>{q.prompt}</label><textarea id={q.id} disabled={locked} className="min-h-48 w-full rounded border p-3" value={attempt.responses[q.id] ?? ""} onChange={e => response(q.id, e.target.value, Date.now())} /></section>)}
  {attempt.section === "essay" && <><p>Recommended: 60 minutes for the DBQ, including 15 minutes reading; 40 minutes for the long essay. The 100-minute clock is shared.</p>{form.dbq && <section className="space-y-3"><h2 className="text-xl font-semibold">Document-based question</h2><p>{form.dbq.prompt}</p>{form.dbq.documents.map((d, i) => <SourceView key={i} source={d} />)}<label htmlFor={form.dbq.id}>Your DBQ response</label><textarea id={form.dbq.id} disabled={locked} className="min-h-64 w-full rounded border p-3" value={attempt.responses[form.dbq.id] ?? ""} onChange={e => response(form.dbq!.id, e.target.value, Date.now())} /></section>}{form.leq && <section className="space-y-3"><h2 className="text-xl font-semibold">Long essay</h2><label htmlFor={form.leq.id}>{form.leq.prompt}</label><textarea id={form.leq.id} disabled={locked} className="min-h-64 w-full rounded border p-3" value={attempt.responses[form.leq.id] ?? ""} onChange={e => response(form.leq!.id, e.target.value, Date.now())} /></section>}</>}
  <button disabled={locked} className="rounded bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50" onClick={() => { if (window.confirm("Submit this section? You cannot return to it.")) update(settleExpired(form, advance(form, attempt, Date.now()), Date.now())); }}>Submit section</button></div>;
}
