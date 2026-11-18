// AP Central: https://apcentral.collegeboard.org/courses/ap-world-history/exam (2027 update checked 2026-11-18).
export const EXAM_SPEC_2027 = {
  year: 2027,
  digital: true,
  mcq: { count: 55, minutes: 55, weight: 40, setSize: [3, 4] },
  saq: { count: 3, minutes: 40, weight: 20, pointsEach: 3, sources: ["secondary-text", "primary-text", "non-text"] },
  essay: { minutes: 100, dbq: { count: 1, documents: 7, points: 7, weight: 25, recommendedMinutes: 60, readingMinutes: 15 }, leq: { count: 1, points: 6, weight: 15, recommendedMinutes: 40 } },
} as const;
