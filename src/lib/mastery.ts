import { OBJECTIVES } from "@/content/course";
import type {
  EvidenceRecord,
  LearningState,
  MasterySnapshot,
  ObjectiveId,
} from "@/lib/types";

function unique<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

export function masteryFor(
  evidence: EvidenceRecord[],
  delayedSubmitted: boolean,
  delayedCorrect: boolean,
): MasterySnapshot[] {
  return OBJECTIVES.map((obj) => {
    const rows = evidence.filter((e) => e.objectiveId === obj.id);
    const independent = rows.filter(
      (e) => e.kind === "independent" || e.assistance === "independent",
    );
    const independentCorrect = independent.filter(
      (e) => e.result === "correct" || e.result === "partial",
    ).length;
    const independentAttempts = independent.length;
    const families = unique(
      rows.map((e) => e.itemId.split(":")[0] ?? e.itemId),
    );
    const sessionStamps = unique(rows.map((e) => e.at.slice(0, 10)));
    const hadExposure = rows.some((e) => e.kind === "exposure");
    const lastIndependent = independent.at(-1)?.at;

    let state: LearningState = "unassessed";
    if (delayedSubmitted && delayedCorrect && independentCorrect >= 2) {
      state = "retained";
    } else if (independentCorrect >= 2 && families.length >= 2) {
      state = "provisionally_secure";
    } else if (independentAttempts > 0 || rows.some((e) => e.kind === "assisted")) {
      state = "developing";
    } else if (hadExposure) {
      state = "exposure";
    }

    const visibleGap =
      state === "unassessed" ||
      state === "exposure" ||
      state === "developing";

    return {
      objectiveId: obj.id as ObjectiveId,
      state,
      independentCorrect,
      independentAttempts,
      sessions: sessionStamps.length,
      stimulusFamilies: families,
      lastIndependentAt: lastIndependent,
      retainedAt:
        state === "retained" ? independent.at(-1)?.at : undefined,
      visibleGap,
    };
  });
}

export function stateLabel(state: LearningState) {
  switch (state) {
    case "unassessed":
      return "Unassessed";
    case "exposure":
      return "Exposure only";
    case "developing":
      return "Developing";
    case "provisionally_secure":
      return "Provisionally secure";
    case "retained":
      return "Retained";
  }
}

export function stateHelp(state: LearningState) {
  switch (state) {
    case "unassessed":
      return "Insufficient evidence. This objective has not been independently checked. That is a starting state, not a failing grade.";
    case "exposure":
      return "The lesson was opened. Watching or reading is not mastery. Next: produce independent work on the quiz or short response.";
    case "developing":
      return "Some independent or assisted attempts exist. Accuracy, freshness, or a second stimulus family is still missing — a normal middle of the loop.";
    case "provisionally_secure":
      return "Independent work looks acceptable across more than one stimulus family. A delayed fresh check is still required for retained.";
    case "retained":
      return "A later independent check on a fresh task supported the earlier work. This is a product rule, not a psychometric score.";
  }
}
