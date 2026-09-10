"use client";

import { FormatYear } from "@/components/chrome/brand";
import { SourceWorkspace } from "@/components/source/source-workspace";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  DELAYED_CHECK_META,
  DELAYED_ITEMS,
} from "@/content/unit2/delayed-check";
import { isoDate } from "@/lib/storage";
import {
  simulateDelayedCheck,
  submitDelayedCheck,
  useLearner,
} from "@/lib/store";
import { toast } from "sonner";
import { redirectToGate } from "@/lib/gate-client";
import { HONESTY_PILOT } from "@/lib/mount";

export function DelayedCheck() {
  const { state, patch } = useLearner();
  const d = state.delayedCheck;
  const today = isoDate();
  const due = d.scheduledFor;
  const open = true;
  const submitted = Boolean(d.submittedAt);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">Review</Badge>
          <FormatYear />
        </div>
        <h1 className="font-heading text-3xl tracking-tight">
          {DELAYED_CHECK_META.title}
        </h1>
        <p className="max-w-3xl text-muted-foreground">
          Second public sitting. {DELAYED_CHECK_META.demoNote} {HONESTY_PILOT} Struggle after a week
          is expected; that is why the check exists. Public-domain translation (Rigg). Teaching
          paraphrases stay labelled.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Scheduled review state</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            Lesson completed:{" "}
            {state.lesson.completedAt
              ? new Date(state.lesson.completedAt).toLocaleString()
              : "not yet"}
          </p>
          <p>Due date (real rule): {due ?? "set when the lesson is finished"}</p>
          <p>Today: {today}</p>
          <p>
            Unlock: {open ? "open" : "locked until due (or demo simulation)"}
          </p>
          {d.simulated ? (
            <Badge variant="outline">Demo: 7-day wait simulated</Badge>
          ) : null}
        </CardContent>
      </Card>

      {!open && !submitted ? (
        <div className="space-y-3">
          <p className="text-sm">
            Retention is not claimed yet, and that is the correct state — not a
            failing grade. Wait for {due ?? "the due date"} or simulate the
            delay to inspect the rest of the loop. The honest next action is
            still the quiz or writing if those are open.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              simulateDelayedCheck(patch);
              toast(
                "Seven-day wait simulated and labeled. The delayed check is now open — still a demo, not time travel.",
              );
            }}
          >
            Simulate 7-day delayed check
          </Button>
        </div>
      ) : null}

      {open && !submitted ? (
        <div className="space-y-6">
          <Alert>
            <AlertTitle>Content notice</AlertTitle>
            <AlertDescription>
              {DELAYED_CHECK_META.contentNotice} Fresh stimulus family BOCC-1348
              — not an exact repeat of Pegolotti or Ibn Battuta.
            </AlertDescription>
          </Alert>
          <SourceWorkspace sourceId="boccaccioPlague" />
          {DELAYED_ITEMS.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle className="text-base">
                  {item.prompt} <FormatYear />
                </CardTitle>
              </CardHeader>
              <CardContent>
                {item.kind === "mcq" && item.options ? (
                  <RadioGroup
                    value={d.answers[item.id] ?? ""}
                    onValueChange={(v) =>
                      patch((s) => ({
                        ...s,
                        delayedCheck: {
                          ...s.delayedCheck,
                          answers: {
                            ...s.delayedCheck.answers,
                            [item.id]: String(v),
                          },
                        },
                      }))
                    }
                  >
                    {item.options.map((opt) => (
                      <Label
                        key={opt.id}
                        className="flex cursor-pointer items-start gap-2 rounded-lg p-2 hover:bg-muted/60"
                      >
                        <RadioGroupItem value={opt.id} />
                        <span>
                          <strong className="mr-1">{opt.id}.</strong>
                          {opt.text}
                        </span>
                      </Label>
                    ))}
                  </RadioGroup>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="d3">Independent short explanation</Label>
                    <Textarea
                      id="d3"
                      rows={8}
                      value={d.answers.d3 ?? ""}
                      onChange={(e) =>
                        patch((s) => ({
                          ...s,
                          delayedCheck: {
                            ...s.delayedCheck,
                            answers: {
                              ...s.delayedCheck.answers,
                              d3: e.target.value,
                            },
                          },
                        }))
                      }
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          <Button
            disabled={
              !d.answers.d1 || !d.answers.d2 || (d.answers.d3 ?? "").trim().length < 40
            }
            onClick={() => {
              submitDelayedCheck(patch);
              toast(
                "Delayed check recorded. Parent WhatsApp is required on the next page.",
              );
              redirectToGate("u2");
            }}
          >
            Submit delayed check
          </Button>
        </div>
      ) : null}

      {submitted ? (
        <Alert>
          <AlertTitle>Delayed check recorded</AlertTitle>
          <AlertDescription>
            Independent work on a fresh family is now in the evidence log. That
            can support a retained judgment when the answers hold; it is still
            not a predicted AP score. Explanations for the MCQs:
            <ul className="mt-2 list-disc pl-5">
              {DELAYED_ITEMS.filter((i) => i.options).map((i) => {
                const pick = d.answers[i.id];
                const key = i.correct;
                const opt = i.options?.find((o) => o.id === key);
                return (
                  <li key={i.id}>
                    {i.id}: you chose {pick}; key {key}. {opt?.rationale}
                  </li>
                );
              })}
            </ul>
            Next: continue on study.anannt.ae/start. Parent WhatsApp is required.
          </AlertDescription>
        </Alert>
      ) : null}
    </div>
  );
}
