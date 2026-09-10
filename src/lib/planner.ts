import { UNIT2_SESSION } from "@/content/course";
import type { LearnerState, StudyTask } from "@/lib/types";
import { addDays, isoDate } from "@/lib/storage";

export function routeCopy(route: LearnerState["onboarding"]["route"]) {
  switch (route) {
    case "foundation":
      return {
        label: "Foundation",
        envelope: "Planning hypothesis: 28–32 weeks, about 5–7 hours/week.",
        fit: "First-time learner needing full instruction. This pilot still only publishes Unit 2 — Foundation is a hypothesis, not a nine-unit course.",
      };
    case "standard":
      return {
        label: "Standard",
        envelope: "Planning hypothesis: 18–22 weeks, about 7–9 hours/week.",
        fit: "Some school support or prior exposure. Hours are a hypothesis, not a promise.",
      };
    case "revision":
      return {
        label: "Revision",
        envelope: "Planning hypothesis: 8–10 weeks, about 8–10 hours/week.",
        fit: "Substantial prior coverage. This route is not full first-time instruction.",
      };
  }
}

export function buildPlan(state: LearnerState, today = isoDate()): StudyTask[] {
  const start = state.onboarding.completedAt?.slice(0, 10) ?? today;
  const lessonDue = start;
  const quizDue = addDays(start, 0);
  const writingDue = addDays(start, 1);
  const revisionDue = addDays(start, 2);
  const delayedDue =
    state.delayedCheck.scheduledFor ??
    (state.lesson.completedAt
      ? addDays(state.lesson.completedAt.slice(0, 10), 7)
      : addDays(start, 7));

  const tasks: StudyTask[] = [
    {
      id: "task-lesson",
      kind: "lesson",
      title: UNIT2_SESSION.title,
      purpose:
        "Build a mechanism: why exchange increased, and why effects differed.",
      estimatedMinutes: UNIT2_SESSION.estimatedMinutes,
      href: "/learn/unit-2",
      dueDate: lessonDue,
      reason: "Published Unit 2 core session. Unassessed until you work independently — reading is exposure, which is the right first step.",
    },
    {
      id: "task-quiz",
      kind: "quiz",
      title: "Unit 2 stimulus MCQ set",
      purpose: "Independent retrieval on sourcing, causation, and comparison.",
      estimatedMinutes: 18,
      href: "/practice",
      dueDate: quizDue,
      reason: "Practice after the lesson, not during sealed reading of explanations.",
    },
    {
      id: "task-writing",
      kind: "writing",
      title: "Source-based short response (2027 SAQ style)",
      purpose: "Explain exchange using Ibn Battuta without collapsing bias into uselessness.",
      estimatedMinutes: 22,
      href: "/writing",
      dueDate: writingDue,
      reason: "Writing is required evidence for explanation objectives.",
    },
    {
      id: "task-revision",
      kind: "revision",
      title: "Revise one paragraph from feedback",
      purpose: "Repair the highest-priority gap: knowledge, evidence, or relationship.",
      estimatedMinutes: 12,
      href: "/writing#revision",
      dueDate: revisionDue,
      reason: "Feedback is unused until a revision exists beside the original.",
    },
    {
      id: "task-delayed",
      kind: "delayed_check",
      title: "Delayed check on a fresh plague source",
      purpose: "Show retention on a fresh stimulus family, not a repeat of Kilwa or Pegolotti.",
      estimatedMinutes: 16,
      href: "/review",
      dueDate: delayedDue,
      reason: state.delayedCheck.simulated
        ? "Due date simulated for this demo of the seven-day rule."
        : "Retained requires a fresh check after at least seven days.",
    },
  ];

  return tasks;
}

export function nextOpenTasks(state: LearnerState, today = isoDate()) {
  const plan = buildPlan(state, today);
  const done = new Set<string>();
  if (state.lesson.completedAt) done.add("task-lesson");
  if (state.quiz.submittedAt) done.add("task-quiz");
  if (state.writing.submittedAt) done.add("task-writing");
  if (state.writing.revisionSubmittedAt) done.add("task-revision");
  if (state.delayedCheck.submittedAt) done.add("task-delayed");

  const open = plan.filter((t) => !done.has(t.id));
  const overdue = open.filter((t) => t.dueDate < today && t.kind !== "delayed_check");
  const delayedOverdue =
    Boolean(state.delayedCheck.scheduledFor) &&
    !state.delayedCheck.submittedAt &&
    (state.delayedCheck.unlocked ||
      (state.delayedCheck.scheduledFor ?? "") <= today);

  return { plan, open, overdue, nextThree: open.slice(0, 3), delayedOverdue, done };
}

export function hoursWarning(weeklyHours: number, route: LearnerState["onboarding"]["route"]) {
  const need =
    route === "foundation" ? 5 : route === "revision" ? 8 : 7;
  if (weeklyHours < need) {
    return `This ${route} route usually assumes at least ${need} hours/week. You entered ${weeklyHours}. The planner will not silently drop required Unit 2 tasks; it will show the squeeze.`;
  }
  return null;
}
