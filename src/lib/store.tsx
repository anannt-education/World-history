"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { QUIZ_ITEMS } from "@/content/unit2/quiz";
import { DELAYED_ITEMS } from "@/content/unit2/delayed-check";
import { LESSON_BLOCKS } from "@/content/unit2/lesson";
import { masteryFor } from "@/lib/mastery";
import { nextOpenTasks } from "@/lib/planner";
import { scoreDelayedShort, scoreSaq } from "@/lib/scoring";
import {
  addDays,
  defaultLearnerState,
  isoDate,
  loadState,
  saveState,
  uid,
} from "@/lib/storage";
import type {
  EvidenceRecord,
  LearnerState,
  ObjectiveId,
  ReviewItem,
} from "@/lib/types";

type Store = {
  ready: boolean;
  state: LearnerState;
  patch: (fn: (s: LearnerState) => LearnerState) => void;
  reset: () => void;
};

const Ctx = createContext<Store | null>(null);

function subscribeToClientMount() {
  return () => {};
}

function getClientMounted() {
  return true;
}

function getServerMounted() {
  return false;
}

function readStoredState(): LearnerState {
  try {
    return loadState();
  } catch {
    return defaultLearnerState();
  }
}

function pushEvent(s: LearnerState, name: string, detail?: string): LearnerState {
  return {
    ...s,
    events: [...s.events, { name, at: new Date().toISOString(), detail }].slice(
      -80,
    ),
  };
}

function addEvidence(
  s: LearnerState,
  row: Omit<EvidenceRecord, "id" | "at">,
): LearnerState {
  const rec: EvidenceRecord = {
    ...row,
    id: uid("ev"),
    at: new Date().toISOString(),
  };
  return { ...s, evidence: [...s.evidence, rec] };
}

export function StoreProvider({ children }: { children: ReactNode }) {
  "use no memo";

  const [state, setState] = useState<LearnerState>(() => defaultLearnerState());
  const [ready, setReady] = useState(false);
  const hydratedRef = useRef(false);

  // useSyncExternalStore flips to the client snapshot after hydration without
  // waiting on a user effect. That is what unblocks the shell if useEffect
  // is skipped (Strict Mode, a thrown storage read, or a stalled HMR client).
  const mounted = useSyncExternalStore(
    subscribeToClientMount,
    getClientMounted,
    getServerMounted,
  );

  if (mounted && !hydratedRef.current) {
    hydratedRef.current = true;
    setState(readStoredState());
    setReady(true);
  }

  const finishHydration = useCallback(() => {
    if (hydratedRef.current && ready) return;
    hydratedRef.current = true;
    try {
      setState(readStoredState());
    } catch {
      setState(defaultLearnerState());
    } finally {
      setReady(true);
    }
  }, [ready]);

  useEffect(() => {
    finishHydration();
  }, [finishHydration]);

  useEffect(() => {
    if (!ready) return;
    saveState(state);
  }, [state, ready]);

  const patch = useCallback((fn: (s: LearnerState) => LearnerState) => {
    setState((prev) => fn(prev));
  }, []);

  const reset = useCallback(() => {
    const next = defaultLearnerState();
    setState(next);
    saveState(next);
  }, []);

  const value = useMemo(() => ({ ready, state, patch, reset }), [ready, state, patch, reset]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLearner() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLearner must be used within StoreProvider");
  return ctx;
}

export function useDerived() {
  const { state } = useLearner();
  const delayedCorrect = useMemo(() => {
    if (!state.delayedCheck.submittedAt) return false;
    const d1 = DELAYED_ITEMS[0];
    const d2 = DELAYED_ITEMS[1];
    const a1 = state.delayedCheck.answers[d1.id] === d1.correct;
    const a2 = state.delayedCheck.answers[d2.id] === d2.correct;
    const short = scoreDelayedShort(state.delayedCheck.answers.d3 ?? "");
    return a1 && a2 && (short.correct || short.partial);
  }, [state.delayedCheck]);

  const mastery = useMemo(
    () =>
      masteryFor(
        state.evidence,
        Boolean(state.delayedCheck.submittedAt),
        delayedCorrect,
      ),
    [state.evidence, state.delayedCheck.submittedAt, delayedCorrect],
  );

  const plan = useMemo(() => nextOpenTasks(state), [state]);

  const quizScore = useMemo(() => {
    if (!state.quiz.submittedAt) return null;
    const total = QUIZ_ITEMS.length;
    const correct = QUIZ_ITEMS.filter(
      (q) => state.quiz.answers[q.id] === q.correct,
    ).length;
    return { correct, total };
  }, [state.quiz]);

  return { mastery, plan, quizScore, delayedCorrect };
}

export function completeOnboarding(
  patch: Store["patch"],
  data: LearnerState["onboarding"],
) {
  patch((s) =>
    pushEvent(
      {
        ...s,
        onboarding: {
          ...data,
          completed: true,
          completedAt: new Date().toISOString(),
        },
      },
      "diagnostic_completed",
      data.route,
    ),
  );
}

export function markLessonExposure(patch: Store["patch"]) {
  patch((s) => {
    if (s.lesson.startedAt) return s;
    let next: LearnerState = {
      ...s,
      lesson: { ...s.lesson, startedAt: new Date().toISOString() },
    };
    const ids: ObjectiveId[] = ["U2-LO1", "U2-LO2", "U2-LO3", "U2-LO4"];
    for (const id of ids) {
      next = addEvidence(next, {
        objectiveId: id,
        kind: "exposure",
        assistance: "guided",
        result: "exposure",
        itemId: "lesson:U2-L1",
        notes: "Opened the Unit 2 lesson. Exposure only.",
      });
    }
    return pushEvent(next, "lesson_started");
  });
}

export function completeLesson(patch: Store["patch"]) {
  patch((s) => {
    const scheduledFor = addDays(isoDate(), 7);
    const next: LearnerState = {
      ...s,
      lesson: {
        ...s.lesson,
        completedAt: s.lesson.completedAt ?? new Date().toISOString(),
        currentBlockIndex: LESSON_BLOCKS.length - 1,
        completedBlockIds: LESSON_BLOCKS.map((b) => b.id),
      },
      delayedCheck: {
        ...s.delayedCheck,
        scheduledFor: s.delayedCheck.scheduledFor ?? scheduledFor,
      },
    };
    return pushEvent(next, "lesson_check_submitted", "exit");
  });
}

export function submitQuiz(patch: Store["patch"], answers: LearnerState["quiz"]["answers"]) {
  patch((s) => {
    let next: LearnerState = {
      ...s,
      quiz: {
        ...s.quiz,
        answers,
        submittedAt: new Date().toISOString(),
      },
    };
    const review: ReviewItem[] = [...next.reviewQueue];
    for (const item of QUIZ_ITEMS) {
      const pick = answers[item.id];
      const ok = pick === item.correct;
      const conf = s.quiz.confidence[item.id];
      next = addEvidence(next, {
        objectiveId: item.objectiveIds[0],
        kind: "independent",
        assistance: "independent",
        result: ok ? "correct" : "incorrect",
        itemId: `${item.stimulusFamily}:${item.id}`,
        notes: conf ? `confidence:${conf}` : undefined,
      });
      if (!ok || conf === "low") {
        review.push({
          id: uid("rv"),
          createdAt: new Date().toISOString(),
          reason: !ok
            ? `Incorrect on ${item.id}. Fresh practice should not silently reuse this exact item as mastery.`
            : `Correct but low confidence on ${item.id}.`,
          href: "/practice",
          title: item.prompt.slice(0, 80),
          objectiveId: item.objectiveIds[0],
          resolved: false,
          exactRepeat: Boolean(item.reusesStimulusFamily),
        });
      }
    }
    next.reviewQueue = review;
    return pushEvent(next, "quiz_submitted");
  });
}

export function submitWriting(patch: Store["patch"]) {
  patch((s) => {
    const feedback = scoreSaq(s.writing.parts);
    let next: LearnerState = {
      ...s,
      writing: {
        ...s.writing,
        submittedAt: new Date().toISOString(),
        originalSnapshot: { ...s.writing.parts },
        feedback,
      },
    };
    const allAddressed = feedback.parts.every((p) => p.addressed);
    next = addEvidence(next, {
      objectiveId: "U2-LO3",
      kind: "independent",
      assistance: "independent",
      result: feedback.parts[1].addressed
        ? allAddressed
          ? "correct"
          : "partial"
        : "incorrect",
      itemId: "SAQ:U2-SAQ-01:B",
    });
    next = addEvidence(next, {
      objectiveId: "U2-LO2",
      kind: "independent",
      assistance: "independent",
      result: feedback.parts[2].addressed
        ? "correct"
        : feedback.diagnosis === "unexplained_relationship"
          ? "partial"
          : "incorrect",
      itemId: "SAQ:U2-SAQ-01:C",
    });
    if (!allAddressed) {
      next.reviewQueue = [
        ...next.reviewQueue,
        {
          id: uid("rv"),
          createdAt: new Date().toISOString(),
          reason: `Writing diagnosis: ${feedback.diagnosis}. ${feedback.highestPriorityImprovement}`,
          href: "/writing#revision",
          title: "Short response needs revision",
          objectiveId: "U2-LO2",
          resolved: false,
          exactRepeat: false,
        },
      ];
    }
    return pushEvent(next, "writing_submitted", feedback.diagnosis);
  });
}

export function submitRevision(patch: Store["patch"]) {
  patch((s) => {
    let next: LearnerState = {
      ...s,
      writing: {
        ...s.writing,
        revisionSubmittedAt: new Date().toISOString(),
      },
    };
    next = addEvidence(next, {
      objectiveId: "U2-LO2",
      kind: "assisted",
      assistance: "guided",
      result: s.writing.revision.trim().length > 40 ? "partial" : "incomplete",
      itemId: "SAQ:U2-SAQ-01:revision",
      notes: "Revision after provisional feedback. Cannot independently establish mastery.",
    });
    next.reviewQueue = next.reviewQueue.map((r) =>
      r.title.includes("Short response") ? { ...r, resolved: true } : r,
    );
    return pushEvent(next, "revision_submitted");
  });
}

export function simulateDelayedCheck(patch: Store["patch"]) {
  patch((s) =>
    pushEvent(
      {
        ...s,
        delayedCheck: {
          ...s.delayedCheck,
          simulated: true,
          unlocked: true,
        },
      },
      "delayed_check_simulated",
    ),
  );
}

export function submitDelayedCheck(patch: Store["patch"]) {
  patch((s) => {
    const short = scoreDelayedShort(s.delayedCheck.answers.d3 ?? "");
    const d1ok = s.delayedCheck.answers.d1 === DELAYED_ITEMS[0].correct;
    const d2ok = s.delayedCheck.answers.d2 === DELAYED_ITEMS[1].correct;
    let next: LearnerState = {
      ...s,
      delayedCheck: {
        ...s.delayedCheck,
        submittedAt: new Date().toISOString(),
      },
    };
    next = addEvidence(next, {
      objectiveId: "U2-LO4",
      kind: "retention",
      assistance: "independent",
      result: d1ok ? "correct" : "incorrect",
      itemId: "BOCC-1348:d1",
    });
    next = addEvidence(next, {
      objectiveId: "U2-LO3",
      kind: "retention",
      assistance: "independent",
      result: d2ok ? "correct" : "incorrect",
      itemId: "BOCC-1348:d2",
    });
    next = addEvidence(next, {
      objectiveId: "U2-LO4",
      kind: "retention",
      assistance: "independent",
      result: short.correct ? "correct" : short.partial ? "partial" : "incorrect",
      itemId: "BOCC-1348:d3",
    });
    return pushEvent(next, "delayed_check_completed");
  });
}

export function recordHint(patch: Store["patch"], objectiveId: ObjectiveId, itemId: string) {
  patch((s) =>
    addEvidence(s, {
      objectiveId,
      kind: "assisted",
      assistance: "hint",
      result: "partial",
      itemId,
      notes: "Hint used. Cannot independently establish mastery.",
    }),
  );
}
