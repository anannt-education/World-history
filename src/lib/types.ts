export type Role = "student" | "mentor";

export type StudyRoute = "foundation" | "standard" | "revision";

export type LearningState =
  | "unassessed"
  | "exposure"
  | "developing"
  | "provisionally_secure"
  | "retained";

export type AssistanceLevel = "guided" | "hint" | "independent" | "timed";

export type EvidenceKind =
  | "exposure"
  | "assisted"
  | "independent"
  | "retention"
  | "pending";

export type DiagnosisKind =
  | "factual_knowledge"
  | "weak_evidence"
  | "unexplained_relationship"
  | "sourcing"
  | "task_interpretation"
  | "adequate";

export type TaskKind =
  | "onboarding"
  | "lesson"
  | "source"
  | "quiz"
  | "writing"
  | "revision"
  | "delayed_check"
  | "review";

export type ObjectiveId =
  | "U2-LO1"
  | "U2-LO2"
  | "U2-LO3"
  | "U2-LO4";

export interface CourseVersion {
  id: string;
  examYear: 2027;
  title: string;
  status: "limited-pilot";
  effectiveDate: string;
}

export interface UnitSummary {
  id: number;
  officialName: string;
  weighting: string;
  published: boolean;
  statusLabel: string;
}

export interface LearningObjective {
  id: ObjectiveId;
  unit: 2;
  title: string;
  assessableStatement: string;
  skillTags: string[];
  themeTags: string[];
}

export interface Provenance {
  creator: string;
  dateRange: string;
  originalContext: string;
  sourceType: string;
  repository: string;
  translationNotes: string;
  rightsStatus: string;
  academicNote: string;
}

export type SourceKind = "primary_extract" | "teaching_paraphrase";

export interface SourceAsset {
  id: string;
  stimulusFamily: string;
  kind: SourceKind;
  title: string;
  excerpt: string;
  accessibilityText: string;
  provenance: Provenance;
  paraphraseLabel?: string;
}

export interface McqOption {
  id: "A" | "B" | "C" | "D";
  text: string;
  rationale: string;
}

export interface McqItem {
  id: string;
  stimulusFamily: string;
  reusesStimulusFamily?: string;
  stimulusId?: string;
  stimulusIntro?: string;
  prompt: string;
  options: McqOption[];
  correct: "A" | "B" | "C" | "D";
  objectiveIds: ObjectiveId[];
  skillTags: string[];
  difficulty: "moderate" | "challenging";
  formatYear: 2027;
  askConfidence?: boolean;
}

export interface SaqPart {
  id: "A" | "B" | "C";
  prompt: string;
  acceptableEvidence: string[];
  commonErrors: string[];
}

export interface SaqSet {
  id: string;
  formatYear: 2027;
  formatNote: string;
  stimulusId: string;
  task: string;
  parts: SaqPart[];
  rubricVersion: string;
}

export interface DelayedCheckItem {
  id: string;
  kind: "mcq" | "short";
  prompt: string;
  stimulusId?: string;
  options?: McqOption[];
  correct?: "A" | "B" | "C" | "D";
  acceptable?: string[];
  objectiveIds: ObjectiveId[];
  formatYear: 2027;
}

export interface StudyTask {
  id: string;
  kind: TaskKind;
  title: string;
  purpose: string;
  estimatedMinutes: number;
  href: string;
  dueDate: string;
  reason: string;
}

export interface EvidenceRecord {
  id: string;
  at: string;
  objectiveId: ObjectiveId;
  kind: EvidenceKind;
  assistance: AssistanceLevel;
  result: "correct" | "incorrect" | "partial" | "incomplete" | "exposure";
  itemId: string;
  notes?: string;
}

export interface MasterySnapshot {
  objectiveId: ObjectiveId;
  state: LearningState;
  independentCorrect: number;
  independentAttempts: number;
  sessions: number;
  stimulusFamilies: string[];
  lastIndependentAt?: string;
  retainedAt?: string;
  visibleGap: boolean;
}

export interface WritingFeedback {
  status: "provisional";
  rubricVersion: string;
  generatedAt: string;
  parts: Array<{
    partId: "A" | "B" | "C";
    addressed: boolean;
    missing: string;
    citedPassage: string;
    explanation: string;
    pointDecision: "likely_credit" | "likely_no_credit" | "borderline";
  }>;
  diagnosis: DiagnosisKind;
  highestPriorityImprovement: string;
  revisionTask: string;
  nextAction: {
    label: string;
    href: string;
    why: string;
  };
}

export interface OnboardingState {
  completed: boolean;
  examYear: 2027;
  weeklyHours: number;
  preferredDays: string[];
  route: StudyRoute;
  priorExposure: "none" | "some" | "substantial";
  completedAt?: string;
}

export interface LessonProgress {
  currentBlockIndex: number;
  completedBlockIds: string[];
  startedAt?: string;
  completedAt?: string;
  retrieval: Record<string, { answer: string; submitted: boolean }>;
  transfer?: { answer: string; submitted: boolean };
  exitCheck?: { answer: string; submitted: boolean };
  annotations: Array<{
    id: string;
    sourceId: string;
    quote: string;
    note: string;
    layer: "observation" | "inference";
    at: string;
  }>;
  guided: {
    observe: string;
    claim: string;
    evidence: string;
    context: string;
    submitted: boolean;
  };
}

export interface QuizProgress {
  answers: Record<string, "A" | "B" | "C" | "D" | undefined>;
  confidence: Record<string, "low" | "medium" | "high">;
  submittedAt?: string;
  currentIndex: number;
}

export interface WritingProgress {
  parts: Record<"A" | "B" | "C", string>;
  submittedAt?: string;
  originalSnapshot?: Record<"A" | "B" | "C", string>;
  revision: string;
  revisionSubmittedAt?: string;
  feedback?: WritingFeedback;
  disputed: boolean;
}

export interface DelayedCheckProgress {
  scheduledFor?: string;
  simulated: boolean;
  unlocked: boolean;
  answers: Record<string, string>;
  submittedAt?: string;
}

export interface ReviewItem {
  id: string;
  createdAt: string;
  reason: string;
  href: string;
  title: string;
  objectiveId: ObjectiveId;
  resolved: boolean;
  exactRepeat: boolean;
}

export interface LearnerState {
  version: 1;
  role: Role;
  displayName: string;
  onboarding: OnboardingState;
  lesson: LessonProgress;
  quiz: QuizProgress;
  writing: WritingProgress;
  delayedCheck: DelayedCheckProgress;
  evidence: EvidenceRecord[];
  reviewQueue: ReviewItem[];
  events: Array<{ name: string; at: string; detail?: string }>;
}

export const STORAGE_KEY = "anannt-apwh-unit2-pilot-v1";
export const COURSE_VERSION: CourseVersion = {
  id: "apwh-modern-2027-unit2-pilot",
  examYear: 2027,
  title: "AP World History: Modern — Unit 2 pilot",
  status: "limited-pilot",
  effectiveDate: "2026-09-09",
};
