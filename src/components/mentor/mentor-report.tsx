"use client";

import Link from "next/link";
import { FormatYear } from "@/components/chrome/brand";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { OBJECTIVES } from "@/content/course";
import { stateHelp, stateLabel } from "@/lib/mastery";
import { useDerived, useLearner } from "@/lib/store";

export function MentorReport() {
  const { state } = useLearner();
  const { mastery, quizScore, plan } = useDerived();
  const f = state.writing.feedback;

  const misconception =
    f?.diagnosis === "sourcing"
      ? "Treats bias as automatic uselessness, or never explains how a guest-scholar’s situation shapes emphasis."
      : f?.diagnosis === "unexplained_relationship"
        ? "Can name ports or goods but does not state a mechanism linking exchange to uneven effects."
        : f?.diagnosis === "factual_knowledge" || f?.diagnosis === "weak_evidence"
          ? "Lacks excerpt-specific evidence (host custom, Sofala gold, monsoon cargo)."
          : f?.diagnosis === "task_interpretation"
            ? "Did not answer the SAQ verb for a part."
            : f
              ? "No dominant misconception on the short response; watch retention on the plague family."
              : "Writing not yet submitted — pending constructed-response evidence.";

  const intervention =
    f?.diagnosis === "sourcing"
      ? "Sourcing practice: observation vs inference on Pegolotti, then a fresh Ibn Battuta purpose question — not a lesson replay."
      : f?.diagnosis === "unexplained_relationship"
        ? "Argument-building: rewrite one causal sentence comparing a port and an inland district."
        : f?.diagnosis === "factual_knowledge" || f?.diagnosis === "weak_evidence"
          ? "Knowledge retrieval: gold path, paper money, monsoon timing — short targeted items."
          : "If writing is strong, protect the delayed check rather than adding more lesson minutes.";

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>Mentor</Badge>
          <FormatYear />
        </div>
        <h1 className="font-heading text-3xl tracking-tight">
          Evidence-linked report
        </h1>
        <p className="text-muted-foreground">
          Assigned learner: {state.displayName} (this device). Same persisted
          record as the student view. Anannt academic staff use this to name
          a next intervention — not a predicted AP 1–5 score.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {mastery.map((m) => {
          const obj = OBJECTIVES.find((o) => o.id === m.objectiveId);
          return (
            <Card key={m.objectiveId}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2">
                  <span>
                    {m.objectiveId} · {obj?.title}
                  </span>
                  <Badge variant="outline">{stateLabel(m.state)}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                <p>{stateHelp(m.state)}</p>
                <p>
                  Independent: {m.independentCorrect}/{m.independentAttempts} ·
                  sessions {m.sessions} · families {m.stimulusFamilies.length}
                </p>
                {m.visibleGap ? (
                  <p>Visible gap: progression is allowed, with this hole marked.</p>
                ) : null}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Work by kind</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm sm:grid-cols-2">
          <p>
            <strong>Exposure.</strong>{" "}
            {state.lesson.startedAt
              ? "Lesson opened. Does not count as mastery — exposure only."
              : "Lesson not opened."}
          </p>
          <p>
            <strong>Assisted.</strong>{" "}
            {state.evidence.filter((e) => e.kind === "assisted").length} logged
            rows (hints or revision). Cannot independently establish mastery.
          </p>
          <p>
            <strong>Independent.</strong>{" "}
            {quizScore
              ? `Quiz ${quizScore.correct}/${quizScore.total}. `
              : "Quiz pending. "}
            {state.writing.submittedAt
              ? "SAQ submitted."
              : "SAQ pending."}
          </p>
          <p>
            <strong>Retention.</strong>{" "}
            {state.delayedCheck.submittedAt
              ? "Delayed check submitted on family BOCC-1348."
              : "Pending — seven-day fresh check not yet done."}
          </p>
          <p>
            <strong>Pending scores.</strong>{" "}
            {state.writing.disputed
              ? "Disputed writing awaits human review."
              : state.writing.feedback
                ? "Writing feedback is provisional only."
                : "No writing evaluation yet."}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Misconception and intervention</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed">
          <p>
            <strong>Exact issue.</strong> {misconception}
          </p>
          <p>
            <strong>Suggested next action.</strong> {intervention}
          </p>
          {f ? (
            <p>
              <strong>Do not assign:</strong> “watch the lesson again.” The
              product next action is{" "}
              <Link className="underline" href={f.nextAction.href}>
                {f.nextAction.label}
              </Link>
              .
            </p>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Writing and dispute queue</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {state.writing.submittedAt ? (
            <div>
              <p>
                Short response submitted{" "}
                {new Date(state.writing.submittedAt).toLocaleString()}. Rubric{" "}
                {f?.rubricVersion}. Status: provisional
                {state.writing.disputed ? " · disputed" : ""}.
              </p>
              <Button className="mt-2" size="sm" render={<Link href="/writing" />}>
                Open student writing
              </Button>
            </div>
          ) : (
            <p className="text-muted-foreground">
              No constructed response yet. Independent writing is still pending
              — do not fill the gap with a lesson replay.
            </p>
          )}
          <Separator />
          {state.reviewQueue.length === 0 ? (
            <p className="text-muted-foreground">
              Review queue is empty. Nothing has been missed or disputed yet.
            </p>
          ) : (
            <ul className="space-y-2">
              {state.reviewQueue.map((r) => (
                <li key={r.id} className="rounded-lg border border-border p-3">
                  <p className="font-medium">{r.title}</p>
                  <p className="text-muted-foreground">{r.reason}</p>
                  {r.exactRepeat ? (
                    <Badge variant="outline">Exact/related stimulus family</Badge>
                  ) : null}
                  {r.resolved ? <Badge variant="secondary">Resolved</Badge> : null}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground">
        Next student task: {plan.nextThree[0]?.title ?? "Loop complete on this device."}{" "}
        Assign that task, not an undifferentiated “review Unit 2.”
      </p>
    </div>
  );
}
