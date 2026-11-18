import type { Attempt } from "./engine.ts";
const key = (id: string) => `anannt-world-exam-v1:${id}`;
export function loadAttempt(id: string): Attempt | null {
  try { const raw = localStorage.getItem(key(id)); const value = raw ? JSON.parse(raw) as Attempt : null; return value?.version === 1 && value.formId === id && ["mcq", "saq", "essay", "results"].includes(value.section) && Number.isFinite(value.deadline) && value.responses && typeof value.responses === "object" && !Array.isArray(value.responses) && value.points && typeof value.points === "object" && !Array.isArray(value.points) ? value : null; } catch { return null; }
}
export function saveAttempt(attempt: Attempt): boolean {
  try { localStorage.setItem(key(attempt.formId), JSON.stringify(attempt)); return true; } catch { return false; }
}
