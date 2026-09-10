import {
  STORAGE_KEY,
  type LearnerState,
  type LessonProgress,
} from "@/lib/types";

export function emptyLesson(): LessonProgress {
  return {
    currentBlockIndex: 0,
    completedBlockIds: [],
    retrieval: {},
    annotations: [],
    guided: {
      observe: "",
      claim: "",
      evidence: "",
      context: "",
      submitted: false,
    },
  };
}

export function defaultLearnerState(): LearnerState {
  return {
    version: 1,
    role: "student",
    displayName: "Demo student",
    onboarding: {
      completed: false,
      examYear: 2027,
      weeklyHours: 7,
      preferredDays: ["Mon", "Wed", "Sat"],
      route: "standard",
      priorExposure: "some",
    },
    lesson: emptyLesson(),
    quiz: { answers: {}, confidence: {}, currentIndex: 0 },
    writing: {
      parts: { A: "", B: "", C: "" },
      revision: "",
      disputed: false,
    },
    delayedCheck: {
      simulated: false,
      unlocked: false,
      answers: {},
    },
    evidence: [],
    reviewQueue: [],
    events: [],
  };
}

export function loadState(): LearnerState {
  if (typeof window === "undefined") return defaultLearnerState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultLearnerState();
    const parsed = JSON.parse(raw) as LearnerState;
    if (parsed.version !== 1) return defaultLearnerState();
    const base = defaultLearnerState();
    return {
      ...base,
      ...parsed,
      lesson: { ...base.lesson, ...parsed.lesson },
      quiz: { ...base.quiz, ...parsed.quiz },
      writing: { ...base.writing, ...parsed.writing },
      delayedCheck: { ...base.delayedCheck, ...parsed.delayedCheck },
    };
  } catch {
    return defaultLearnerState();
  }
}

export function saveState(state: LearnerState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Private mode or a full quota must not trap the study UI.
  }
}

export function isoDate(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

export function addDays(dateIso: string, days: number) {
  const d = new Date(`${dateIso}T12:00:00`);
  d.setDate(d.getDate() + days);
  return isoDate(d);
}

export function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}
