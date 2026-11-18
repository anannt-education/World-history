import { test } from "node:test";
import { strict as assert } from "node:assert";
import { EXAM_SPEC_2027 as spec } from "../src/lib/exam/spec.ts";
import { validateForm } from "../src/lib/exam/forms.ts";
import { advance, score, start } from "../src/lib/exam/engine.ts";
import { runnerFixture } from "../src/content/forms/runner-fixture.ts";

// Official AP Central course exam: https://apcentral.collegeboard.org/courses/ap-world-history/exam (2027 format checked 2026-11-18).
test("2027 section geometry, timings, and weights", () => {
  assert.deepEqual([spec.mcq.count, spec.mcq.minutes, spec.mcq.weight], [55, 55, 40]);
  assert.deepEqual([spec.saq.count, spec.saq.minutes, spec.saq.weight, spec.saq.pointsEach], [3, 40, 20, 3]);
  assert.deepEqual(spec.saq.sources, ["secondary-text", "primary-text", "non-text"]);
  assert.deepEqual([spec.essay.minutes, spec.essay.dbq.documents, spec.essay.dbq.points, spec.essay.dbq.weight, spec.essay.dbq.recommendedMinutes, spec.essay.dbq.readingMinutes, spec.essay.leq.count, spec.essay.leq.points, spec.essay.leq.weight, spec.essay.leq.recommendedMinutes], [100, 7, 7, 25, 60, 15, 1, 6, 15, 40]);
});
test("a malformed full paper cannot start", () => {
  const invalid = { ...runnerFixture, kind: "full" as const };
  assert.ok(validateForm(invalid).some(e => e.includes("Section counts")));
  assert.throws(() => start(invalid, 0), /Section counts/);
});
test("fixture runs in order, saves responses and self-scores", () => {
  assert.deepEqual(validateForm(runnerFixture), []);
  const attempt = start(runnerFixture, 1000);
  assert.equal(attempt.deadline, 1000 + 55 * 60000);
  const saq = advance(runnerFixture, { ...attempt, responses: { "fixture-mcq-1": "A" } }, 2000);
  assert.equal(saq.section, "saq"); assert.equal(saq.deadline, 2000 + 40 * 60000);
  const done = advance(runnerFixture, { ...saq, points: { "fixture-saq:point-1": true } }, 3000);
  assert.equal(done.section, "results"); assert.equal(score(runnerFixture, done).mcq, 1); assert.equal(score(runnerFixture, done).saqs[0].score, 1);
});

test("fixture is not available through the production registry", async () => {
  const { forms, getForm } = await import("../src/content/forms/index.ts");
  assert.deepEqual(forms, []);
  assert.equal(getForm(runnerFixture.id), undefined);
});
test("expired sections retain their deadlines across navigation and reload", async () => {
  const { settleExpired, minutes } = await import("../src/lib/exam/engine.ts");
  const { saveAttempt, loadAttempt } = await import("../src/lib/exam/storage.ts");
  const data = new Map<string, string>();
  const storage = { getItem: (key: string) => data.get(key) ?? null, setItem: (key: string, value: string) => { data.set(key, value); } };
  Object.defineProperty(globalThis, "localStorage", { value: storage, configurable: true });
  try {
    const attempt = { ...start(runnerFixture, 1000), responses: { "fixture-mcq-1": "A" } };
    assert.equal(saveAttempt(attempt), true);
    const restored = loadAttempt(runnerFixture.id)!;
    assert.deepEqual(restored, attempt);
    const later = attempt.deadline + 10000;
    const saq = settleExpired(runnerFixture, restored, later);
    assert.equal(saq.deadline, attempt.deadline + minutes("saq") * 60000);
    assert.equal(saq.responses["fixture-mcq-1"], "A");
    assert.equal(settleExpired(runnerFixture, restored, saq.deadline).section, "results");
    assert.equal(advance(runnerFixture, restored, later).deadline, saq.deadline);
  } finally { delete (globalThis as { localStorage?: Storage }).localStorage; }
});
test("results require a submitted attempt", () => {
  const attempt = start(runnerFixture, 0);
  assert.throws(() => score(runnerFixture, attempt), /not been submitted/);
});
test("section durations are fixed by the spec", async () => {
  const { minutes } = await import("../src/lib/exam/engine.ts");
  assert.deepEqual([minutes("mcq"), minutes("saq"), minutes("essay")], [spec.mcq.minutes, spec.saq.minutes, spec.essay.minutes]);
});
