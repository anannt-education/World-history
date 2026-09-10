"use client";

import Link from "next/link";
import { FormatYear } from "@/components/chrome/brand";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OBJECTIVES } from "@/content/course";
import { stateHelp, stateLabel } from "@/lib/mastery";
import { useDerived, useLearner } from "@/lib/store";
import { toast } from "sonner";

export function ProgressView() {
  const { state, reset } = useLearner();
  const { mastery, quizScore } = useDerived();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-heading text-3xl tracking-tight">Progress</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Honest states only, the way a mentor would keep a markbook. This page
          will never show a predicted AP 1–5 score. Untested work is insufficient
          evidence — a blank is not a fail, and a completed lesson is not retained.
        </p>
      </header>
      <div className="grid gap-4">
        {mastery.map((m) => {
          const obj = OBJECTIVES.find((o) => o.id === m.objectiveId)!;
          return (
            <Card key={m.objectiveId}>
              <CardHeader>
                <CardTitle className="flex flex-wrap items-center justify-between gap-2">
                  <span>
                    {obj.id} · {obj.title}
                  </span>
                  <Badge variant="outline">{stateLabel(m.state)}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>{obj.assessableStatement}</p>
                <p className="text-muted-foreground">{stateHelp(m.state)}</p>
                <p>
                  Independent correct/attempts {m.independentCorrect}/
                  {m.independentAttempts}. Stimulus families seen:{" "}
                  {m.stimulusFamilies.length || "none yet"}.
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Assessments on this device <FormatYear />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            Quiz:{" "}
            {quizScore
              ? `${quizScore.correct}/${quizScore.total}`
              : "not submitted"}
          </p>
          <p>
            Short response:{" "}
            {state.writing.submittedAt ? "submitted (provisional feedback)" : "not submitted"}
          </p>
          <p>
            Revision:{" "}
            {state.writing.revisionSubmittedAt ? "submitted (assisted)" : "not submitted"}
          </p>
          <p>
            Delayed check:{" "}
            {state.delayedCheck.submittedAt
              ? "submitted"
              : state.delayedCheck.scheduledFor
                ? `scheduled ${state.delayedCheck.scheduledFor}`
                : "not scheduled"}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Review queue</CardTitle>
        </CardHeader>
        <CardContent>
          {state.reviewQueue.filter((r) => !r.resolved).length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No open targeted reviews. Wrong or uncertain answers create items
              here. An empty queue means we lack a repair list, not that every
              objective is retained.
            </p>
          ) : (
            <ul className="space-y-2 text-sm">
              {state.reviewQueue
                .filter((r) => !r.resolved)
                .map((r) => (
                  <li key={r.id}>
                    <Link className="underline" href={r.href}>
                      {r.title}
                    </Link>
                    <span className="text-muted-foreground"> — {r.reason}</span>
                    {r.exactRepeat ? (
                      <Badge variant="outline" className="ml-2">
                        Related stimulus
                      </Badge>
                    ) : null}
                  </li>
                ))}
            </ul>
          )}
        </CardContent>
      </Card>
      <Button
        variant="outline"
        onClick={() => {
          reset();
          toast(
            "Local study record cleared. Every objective is unassessed again on this device.",
          );
        }}
      >
        Reset this device’s demo record
      </Button>
    </div>
  );
}
