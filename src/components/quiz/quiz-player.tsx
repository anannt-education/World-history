"use client";

import { useState } from "react";
import Link from "next/link";
import { FormatYear } from "@/components/chrome/brand";
import { SourceWorkspace } from "@/components/source/source-workspace";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QUIZ_ITEMS, QUIZ_META } from "@/content/unit2/quiz";
import { submitQuiz, useDerived, useLearner } from "@/lib/store";
import { toast } from "sonner";
import type { McqItem } from "@/lib/types";

function diagnoseQuiz(answers: Record<string, string | undefined>) {
  const missed = QUIZ_ITEMS.filter((q) => answers[q.id] !== q.correct);
  let sourcing = 0;
  let causation = 0;
  let knowledge = 0;
  for (const q of missed) {
    if (q.skillTags.includes("sourcing") || q.skillTags.includes("claims-evidence")) {
      sourcing += 1;
    } else if (
      q.skillTags.includes("causation") ||
      q.skillTags.includes("comparison")
    ) {
      causation += 1;
    } else {
      knowledge += 1;
    }
  }
  const correct = QUIZ_ITEMS.length - missed.length;
  if (missed.length === 0) {
    return {
      title: `${correct} / ${QUIZ_ITEMS.length} independent items — every best answer on this set`,
      body: "That is retrieval evidence on these stimuli, not an AP score. Related families are still labeled below. Next: write the source-based short response while Kilwa and Pegolotti details are in working memory.",
      href: "/writing",
      nextLabel: "Open the source-based short response",
    };
  }
  const dominant =
    sourcing >= causation && sourcing >= knowledge
      ? "sourcing"
      : causation >= knowledge
        ? "causation"
        : "knowledge";
  if (dominant === "sourcing") {
    return {
      title: `${correct} / ${QUIZ_ITEMS.length} independent items — misses cluster on sourcing`,
      body: "You often had the commercial fact; the trap was treating bias as a shredder or over-reading what a handbook can prove. A miss here is diagnostic, not a verdict. Next practice is observation vs inference on Pegolotti, not a full lesson replay.",
      href: "/learn/unit-2?block=source",
      nextLabel: "Return to guided sourcing on Pegolotti",
    };
  }
  if (dominant === "causation") {
    return {
      title: `${correct} / ${QUIZ_ITEMS.length} independent items — misses cluster on mechanism`,
      body: "Lists of goods or empires are showing up where a switchable cause belongs (wind, protection, paper money, brokerage). Next: rebuild the worked comparison until one sentence names why a port and an inland district diverge.",
      href: "/learn/unit-2?block=worked",
      nextLabel: "Rebuild the worked comparison",
    };
  }
  return {
    title: `${correct} / ${QUIZ_ITEMS.length} independent items — misses cluster on specific evidence`,
    body: "The next drill is named facts from the sources (gold path, paper money, monsoon timing), not “watch the lesson again.” Wrong and low-confidence items are in the review queue.",
    href: "/review",
    nextLabel: "Open the targeted review queue",
  };
}

function itemNextHint(q: McqItem, ok: boolean) {
  if (ok) {
    return "This item can count as independent retrieval on its family. Related stimuli still cannot by themselves prove transfer.";
  }
  if (q.skillTags.includes("sourcing") || q.skillTags.includes("claims-evidence")) {
    return "Next practice: say what the text states, then how the author’s situation shapes emphasis — do not bin the source.";
  }
  if (q.skillTags.includes("causation") || q.skillTags.includes("comparison")) {
    return "Next practice: name a mechanism that can switch (protection, wind, tax, brokerage), then why two settings differ.";
  }
  return "Next practice: retrieve the dated fact from the extract or paraphrase, then return to the short response.";
}

export function QuizPlayer() {
  const { state, patch } = useLearner();
  const { quizScore } = useDerived();
  const [localIndex, setLocalIndex] = useState(state.quiz.currentIndex);
  const submitted = Boolean(state.quiz.submittedAt);
  const item = QUIZ_ITEMS[Math.min(localIndex, QUIZ_ITEMS.length - 1)];
  const answers = state.quiz.answers;

  function setAnswer(id: string, value: "A" | "B" | "C" | "D") {
    patch((s) => ({
      ...s,
      quiz: { ...s.quiz, answers: { ...s.quiz.answers, [id]: value } },
    }));
  }

  if (submitted && quizScore) {
    const diagnosis = diagnoseQuiz(answers);
    return (
      <div className="space-y-6">
        <Header />
        <Alert>
          <AlertTitle>{diagnosis.title}</AlertTitle>
          <AlertDescription>{diagnosis.body}</AlertDescription>
        </Alert>
        <Button render={<Link href={diagnosis.href} />}>{diagnosis.nextLabel}</Button>
        <div className="space-y-4">
          {QUIZ_ITEMS.map((q, i) => {
            const pick = answers[q.id];
            const ok = pick === q.correct;
            return (
              <Card key={q.id}>
                <CardHeader>
                  <CardTitle className="flex flex-wrap items-center gap-2 text-base">
                    Question {i + 1}{" "}
                    <FormatYear />
                    {q.reusesStimulusFamily ? (
                      <Badge variant="outline">Related stimulus family</Badge>
                    ) : null}
                    <Badge variant={ok ? "secondary" : "outline"}>
                      {ok ? "Best answer selected" : "Not the best answer"}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p>{q.prompt}</p>
                  <ul className="space-y-2">
                    {q.options.map((opt) => (
                      <li
                        key={opt.id}
                        className="rounded-lg border border-border p-3 text-sm"
                      >
                        <p>
                          <strong>{opt.id}.</strong> {opt.text}{" "}
                          {opt.id === q.correct ? (
                            <Badge className="ml-1">Key</Badge>
                          ) : null}
                          {pick === opt.id && opt.id !== q.correct ? (
                            <Badge variant="outline" className="ml-1">
                              Your choice
                            </Badge>
                          ) : null}
                        </p>
                        <p className="mt-1 text-muted-foreground">
                          {opt.rationale}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-muted-foreground">{itemNextHint(q, ok)}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <Button render={<Link href={diagnosis.href} />}>{diagnosis.nextLabel}</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header />
      <Progress value={((localIndex + 1) / QUIZ_ITEMS.length) * 100}>
        <span className="text-xs text-muted-foreground">
          Item {localIndex + 1} of {QUIZ_ITEMS.length} · {item.difficulty} ·{" "}
          {item.skillTags.join(", ")}
        </span>
      </Progress>
      {item.stimulusIntro ? (
        <p className="text-sm text-muted-foreground">{item.stimulusIntro}</p>
      ) : null}
      {item.stimulusId ? (
        <details className="rounded-xl border border-border p-3">
          <summary className="cursor-pointer text-sm font-medium">
            Open stimulus
          </summary>
          <div className="pt-3">
            <SourceWorkspace sourceId={item.stimulusId} />
          </div>
        </details>
      ) : null}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {item.prompt} <FormatYear />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup
            value={answers[item.id] ?? ""}
            onValueChange={(v) => setAnswer(item.id, v as "A" | "B" | "C" | "D")}
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
          {item.askConfidence ? (
            <div className="space-y-2">
              <p className="text-sm">Optional confidence (not every item):</p>
              <div className="flex gap-2">
                {(["low", "medium", "high"] as const).map((c) => (
                  <Button
                    key={c}
                    size="sm"
                    variant={
                      state.quiz.confidence[item.id] === c ? "default" : "outline"
                    }
                    onClick={() =>
                      patch((s) => ({
                        ...s,
                        quiz: {
                          ...s.quiz,
                          confidence: { ...s.quiz.confidence, [item.id]: c },
                        },
                      }))
                    }
                  >
                    {c}
                  </Button>
                ))}
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <Button
          variant="outline"
          disabled={localIndex === 0}
          onClick={() => setLocalIndex((i) => i - 1)}
        >
          Previous
        </Button>
        {localIndex < QUIZ_ITEMS.length - 1 ? (
          <Button
            disabled={!answers[item.id]}
            onClick={() => setLocalIndex((i) => i + 1)}
          >
            Next
          </Button>
        ) : (
          <Button
            disabled={QUIZ_ITEMS.some((q) => !answers[q.id])}
            onClick={() => {
              submitQuiz(patch, answers);
              toast(
                "Set submitted. Feedback names the skill cluster — sourcing, mechanism, or knowledge — then one next practice.",
              );
            }}
          >
            Submit set
          </Button>
        )}
      </div>
      {QUIZ_ITEMS.some((q) => !answers[q.id]) && localIndex === QUIZ_ITEMS.length - 1 ? (
        <p className="text-sm text-muted-foreground">
          Answer every item before submitting. Explanations appear after the
          set is closed so a later item cannot coach an earlier one.
        </p>
      ) : null}
    </div>
  );
}

function Header() {
  return (
    <header className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary">Practice</Badge>
        <FormatYear />
      </div>
      <h1 className="font-heading text-3xl tracking-tight">{QUIZ_META.title}</h1>
      <p className="max-w-3xl text-muted-foreground">
        {QUIZ_META.note} About {QUIZ_META.estimatedMinutes} minutes. 2027
        digital exam items are stimulus-based; these are original Anannt
        Education items. Explanations wait until the set is closed, the way a
        mentor would.
      </p>
    </header>
  );
}
