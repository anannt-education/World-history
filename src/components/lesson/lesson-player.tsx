"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormatYear } from "@/components/chrome/brand";
import { NetworksMap } from "@/components/lesson/networks-map";
import { SourceWorkspace } from "@/components/source/source-workspace";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  EXIT_CHECK,
  EXPLANATION,
  LESSON_BLOCKS,
  LESSON_META,
  RETRIEVAL_CHECKS,
  TIMELINE,
  TRANSFER_TASK,
  WORKED_EXAMPLE,
} from "@/content/unit2/lesson";
import { SOURCES } from "@/content/unit2/sources";
import { completeLesson, markLessonExposure, recordHint, useLearner } from "@/lib/store";
import { toast } from "sonner";

export function LessonPlayer() {
  const { state, patch } = useLearner();
  const router = useRouter();
  const params = useSearchParams();
  const blockParam = params.get("block");

  useEffect(() => {
    markLessonExposure(patch);
  }, [patch]);

  useEffect(() => {
    if (!blockParam) return;
    const idx = LESSON_BLOCKS.findIndex((b) => b.id === blockParam);
    if (idx >= 0 && idx !== state.lesson.currentBlockIndex) {
      patch((s) => ({
        ...s,
        lesson: { ...s.lesson, currentBlockIndex: idx },
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockParam]);

  const index = Math.min(
    state.lesson.currentBlockIndex,
    LESSON_BLOCKS.length - 1,
  );
  const block = LESSON_BLOCKS[index];
  const pct = Math.round(((index + 1) / LESSON_BLOCKS.length) * 100);

  function go(next: number) {
    const clamped = Math.max(0, Math.min(LESSON_BLOCKS.length - 1, next));
    const id = LESSON_BLOCKS[clamped].id;
    patch((s) => ({
      ...s,
      lesson: {
        ...s.lesson,
        currentBlockIndex: clamped,
        completedBlockIds: Array.from(
          new Set([...s.lesson.completedBlockIds, block.id]),
        ),
      },
    }));
    router.replace(`/learn/unit-2?block=${id}`);
  }

  return (
    <article className="space-y-6">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">Unit 2 · published</Badge>
          <FormatYear />
          <span className="text-xs text-muted-foreground">
            About {LESSON_META.estimatedMinutes} minutes core session
          </span>
        </div>
        <h1 className="font-heading text-3xl tracking-tight">
          {LESSON_META.title}
        </h1>
        <p className="max-w-3xl text-lg text-muted-foreground">
          {LESSON_META.centralQuestion}
        </p>
        <Progress value={pct} className="max-w-md">
          <span className="text-xs text-muted-foreground">
            Step {index + 1} of {LESSON_BLOCKS.length} · {block.title} ·{" "}
            {block.estimatedMinutes} min
          </span>
        </Progress>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>{block.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {block.type === "objective" ? <ObjectiveBlock /> : null}
          {block.type === "map" ? <MapBlock /> : null}
          {block.type === "explain" ? <ExplainBlock /> : null}
          {block.type === "worked" ? <WorkedBlock /> : null}
          {block.type === "source" ? (
            <SourceWorkspace sourceId="pegolotti" guided />
          ) : null}
          {block.type === "retrieval" ? <RetrievalBlock /> : null}
          {block.type === "transfer" ? <TransferBlock /> : null}
          {block.type === "exit" ? <ExitBlock /> : null}
        </CardContent>
      </Card>

      <div className="flex flex-wrap justify-between gap-2">
        <Button
          variant="outline"
          disabled={index === 0}
          onClick={() => go(index - 1)}
        >
          Previous
        </Button>
        {index < LESSON_BLOCKS.length - 1 ? (
          <Button onClick={() => go(index + 1)}>
            Continue · {LESSON_BLOCKS[index + 1].title}
          </Button>
        ) : (
          <Button
            onClick={() => {
              completeLesson(patch);
              toast(
                "Lesson marked complete on this device (exposure plus the checks you submitted). Next: the stimulus set, while the mechanisms are still warm.",
              );
              router.push("/today");
            }}
          >
            Finish lesson and open Today
          </Button>
        )}
      </div>
    </article>
  );
}

function ObjectiveBlock() {
  return (
    <div className="space-y-4 text-[15px] leading-relaxed">
      <p>
        <strong>Assessable objective.</strong> By the end of this loop you
        should be able to explain why long-distance exchange intensified c.
        1200–1450 and to name a mechanism that produced different effects in two
        settings — a Swahili port and a Mongol-era overland corridor — using
        dated evidence.
      </p>
      <p>
        <strong>Motivating question.</strong>{" "}
        {LESSON_META.centralQuestion} The tempting wrong answers are “people
        wanted luxury goods” (too thin) and “the world became one market” (too
        flat). Hold onto causes that can switch: protection, wind, pack animals,
        paper money, brokerage.
      </p>
      <p className="text-sm text-muted-foreground">
        Estimated {LESSON_BLOCKS[0].estimatedMinutes} minutes. Later quiz and
        writing are separate assessed tasks. Reading this page is exposure,
        not mastery — that is a normal first pass, not a verdict.
      </p>
    </div>
  );
}

function MapBlock() {
  return (
    <div className="space-y-5">
      <p>
        Location and sequence both matter here. The diagram is schematic on
        purpose: it refuses modern borders. Dates below carry uncertainty where
        historians disagree on pathway or emphasis.
      </p>
      <NetworksMap />
      <ol className="space-y-3">
        {TIMELINE.map((row) => (
          <li key={row.date} className="grid gap-1 sm:grid-cols-[9rem_1fr]">
            <div className="font-medium">{row.date}</div>
            <p className="text-muted-foreground">{row.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ExplainBlock() {
  return (
    <div className="space-y-5 text-[15px] leading-relaxed">
      <p className="text-base">{EXPLANATION.lead}</p>
      {EXPLANATION.paragraphs.map((p) => (
        <section key={p.heading} className="space-y-2">
          <h3 className="font-heading text-lg">{p.heading}</h3>
          <p>{p.body}</p>
        </section>
      ))}
      <Alert>
        <AlertTitle>Content notice</AlertTitle>
        <AlertDescription>
          The environmental paragraph concerns epidemic disease and mass death
          in the fourteenth century. The academic claim stays: networks that
          moved silk also moved pathogens. You will meet a primary extract on
          this in the delayed check.
        </AlertDescription>
      </Alert>
    </div>
  );
}

function WorkedBlock() {
  return (
    <div className="space-y-4">
      <p className="text-[15px] leading-relaxed">
        <strong>Worked historical reasoning (causation / comparison).</strong>{" "}
        The annotations show the mechanism, not a list of famous names.
      </p>
      <blockquote className="rounded-xl bg-muted/50 p-4 text-[15px] leading-relaxed">
        {WORKED_EXAMPLE.claim}
      </blockquote>
      <ol className="space-y-3">
        {WORKED_EXAMPLE.annotations.map((a) => (
          <li key={a.label} className="rounded-lg border border-border p-3">
            <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {a.label}
            </div>
            <p className="mt-1 text-[15px] leading-relaxed">{a.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function RetrievalBlock() {
  const { state, patch } = useLearner();
  return (
    <div className="space-y-6">
      <p>
        Answer first. Explanations stay closed until you submit that item. A
        miss here is information: it tells us whether the next drill is sourcing
        or a mechanism. Hint-assisted answers cannot independently establish
        mastery — using a hint is allowed, and it is logged as assisted work.
      </p>
      {RETRIEVAL_CHECKS.map((q) => {
        const row = state.lesson.retrieval[q.id];
        const submitted = row?.submitted;
        return (
          <div key={q.id} className="space-y-3 rounded-xl border border-border p-4">
            <p className="font-medium">{q.prompt}</p>
            <RadioGroup
              value={row?.answer ?? ""}
              onValueChange={(value) =>
                patch((s) => ({
                  ...s,
                  lesson: {
                    ...s.lesson,
                    retrieval: {
                      ...s.lesson.retrieval,
                      [q.id]: { answer: String(value), submitted: false },
                    },
                  },
                }))
              }
              disabled={submitted}
            >
              {q.options.map((opt) => (
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
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                disabled={!row?.answer || submitted}
                onClick={() =>
                  patch((s) => ({
                    ...s,
                    lesson: {
                      ...s.lesson,
                      retrieval: {
                        ...s.lesson.retrieval,
                        [q.id]: { answer: row?.answer ?? "", submitted: true },
                      },
                    },
                    events: [
                      ...s.events,
                      {
                        name: "lesson_check_submitted",
                        at: new Date().toISOString(),
                        detail: q.id,
                      },
                    ],
                  }))
                }
              >
                Submit answer
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => recordHint(patch, "U2-LO1", `retrieval:${q.id}`)}
              >
                I needed a hint
              </Button>
            </div>
            {submitted ? (
              <Alert>
                <AlertTitle>
                  {row.answer === q.correct
                    ? "Defensible choice — it stays with what the source can support."
                    : "Not the best answer — a common Unit 2 miss, not a character judgment."}
                </AlertTitle>
                <AlertDescription>
                  {q.explanation} Next: continue the remaining check, then the
                  monsoon transfer — do not replay the whole explanation unless
                  the miss was a named fact (gold path, paper money, wind).
                </AlertDescription>
              </Alert>
            ) : (
              <p className="text-sm text-muted-foreground">
                Explanation hidden until you answer, the way a mentor would wait.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function TransferBlock() {
  const { state, patch } = useLearner();
  const t = state.lesson.transfer;
  const source = SOURCES[TRANSFER_TASK.sourceId];
  return (
    <div className="space-y-4">
      <Badge variant="outline">{source.paraphraseLabel}</Badge>
      <p>{TRANSFER_TASK.prompt}</p>
      <blockquote className="whitespace-pre-wrap rounded-xl bg-muted/40 p-4 text-sm leading-relaxed">
        {source.excerpt}
      </blockquote>
      <Label htmlFor="transfer">Your transfer paragraph</Label>
      <Textarea
        id="transfer"
        rows={6}
        value={t?.answer ?? ""}
        onChange={(e) =>
          patch((s) => ({
            ...s,
            lesson: {
              ...s.lesson,
              transfer: { answer: e.target.value, submitted: false },
            },
          }))
        }
      />
      <Button
        onClick={() =>
          patch((s) => ({
            ...s,
            lesson: {
              ...s.lesson,
              transfer: { answer: t?.answer ?? "", submitted: true },
            },
          }))
        }
      >
        Save transfer
      </Button>
      {t?.submitted ? (
        <p className="text-sm text-muted-foreground">
          Saved on this device. {TRANSFER_TASK.successHint} Next: the exit
          check, then independent work on the quiz.
        </p>
      ) : null}
    </div>
  );
}

function ExitBlock() {
  const { state, patch } = useLearner();
  const e = state.lesson.exitCheck;
  return (
    <div className="space-y-4">
      <p>{EXIT_CHECK.prompt}</p>
      <Textarea
        rows={6}
        value={e?.answer ?? ""}
        onChange={(ev) =>
          patch((s) => ({
            ...s,
            lesson: {
              ...s.lesson,
              exitCheck: { answer: ev.target.value, submitted: false },
            },
          }))
        }
      />
      <Button
        onClick={() =>
          patch((s) => ({
            ...s,
            lesson: {
              ...s.lesson,
              exitCheck: { answer: e?.answer ?? "", submitted: true },
            },
          }))
        }
      >
        Save exit check
      </Button>
      <Alert>
        <AlertTitle>Scheduled review — retention is a later check</AlertTitle>
        <AlertDescription>{EXIT_CHECK.reviewNote}</AlertDescription>
      </Alert>
    </div>
  );
}
