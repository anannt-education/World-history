"use client";

import { useState } from "react";
import { FormatYear } from "@/components/chrome/brand";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { SOURCES } from "@/content/unit2/sources";
import { uid } from "@/lib/storage";
import { useLearner } from "@/lib/store";
import type { SourceAsset } from "@/lib/types";

export function ProvenanceBlock({ source }: { source: SourceAsset }) {
  const p = source.provenance;
  return (
    <dl className="grid gap-2 text-sm sm:grid-cols-2">
      <div>
        <dt className="text-muted-foreground">Creator</dt>
        <dd>{p.creator}</dd>
      </div>
      <div>
        <dt className="text-muted-foreground">Date / range</dt>
        <dd>{p.dateRange}</dd>
      </div>
      <div className="sm:col-span-2">
        <dt className="text-muted-foreground">Original context</dt>
        <dd>{p.originalContext}</dd>
      </div>
      <div>
        <dt className="text-muted-foreground">Source type</dt>
        <dd>{p.sourceType}</dd>
      </div>
      <div>
        <dt className="text-muted-foreground">Rights</dt>
        <dd>{p.rightsStatus}</dd>
      </div>
      <div className="sm:col-span-2">
        <dt className="text-muted-foreground">Repository / translation</dt>
        <dd>{p.repository}. {p.translationNotes}</dd>
      </div>
      <div className="sm:col-span-2">
        <dt className="text-muted-foreground">Academic note</dt>
        <dd>{p.academicNote}</dd>
      </div>
    </dl>
  );
}

export function SourceWorkspace({
  sourceId,
  guided,
}: {
  sourceId: string;
  guided?: boolean;
}) {
  const source = SOURCES[sourceId];
  const { state, patch } = useLearner();
  const [quote, setQuote] = useState("");
  const [note, setNote] = useState("");
  const [layer, setLayer] = useState<"observation" | "inference">("observation");
  const [font, setFont] = useState(1);

  if (!source) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Source missing</CardTitle>
        </CardHeader>
        <CardContent>
          This source id is not in the Unit 2 library. Return to the lesson
          map or Help rather than treating a blank as a primary extract.
        </CardContent>
      </Card>
    );
  }

  const annotations = state.lesson.annotations.filter(
    (a) => a.sourceId === sourceId,
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary">{source.kind === "primary_extract" ? "Primary extract" : "Teaching paraphrase"}</Badge>
        <FormatYear />
        {source.paraphraseLabel ? (
          <Badge variant="outline">{source.paraphraseLabel}</Badge>
        ) : null}
      </div>
      <h2 className="font-heading text-xl leading-snug">{source.title}</h2>
      <ProvenanceBlock source={source} />
      <Separator />
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground">
          Zoom text without altering the wording. Accessibility rendering matches
          the extract.
        </p>
        <div className="flex gap-1">
          <Button size="sm" variant="outline" onClick={() => setFont((n) => Math.max(0.9, n - 0.1))}>
            A−
          </Button>
          <Button size="sm" variant="outline" onClick={() => setFont((n) => Math.min(1.4, n + 0.1))}>
            A+
          </Button>
        </div>
      </div>
      <blockquote
        className="max-h-[28rem] overflow-auto whitespace-pre-wrap rounded-xl bg-card p-4 leading-relaxed ring-1 ring-foreground/10"
        style={{ fontSize: `${font}rem` }}
      >
        {source.excerpt}
      </blockquote>
      <p className="text-sm text-muted-foreground">{source.accessibilityText}</p>

      <Card>
        <CardHeader>
          <CardTitle>Annotate — keep layers separate</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Observation: what the text states. Inference: what you reasonably
            conclude. Keep them in separate boxes — mixing them is the habit
            that later shows up as a sourcing miss on the SAQ.
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={layer === "observation" ? "default" : "outline"}
              onClick={() => setLayer("observation")}
            >
              Observation
            </Button>
            <Button
              size="sm"
              variant={layer === "inference" ? "default" : "outline"}
              onClick={() => setLayer("inference")}
            >
              Inference
            </Button>
          </div>
          <Label htmlFor="quote">Passage (copy a short phrase)</Label>
          <Textarea
            id="quote"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            rows={2}
          />
          <Label htmlFor="note">Your note</Label>
          <Textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
          />
          <Button
            onClick={() => {
              if (!quote.trim() || !note.trim()) return;
              patch((s) => ({
                ...s,
                lesson: {
                  ...s.lesson,
                  annotations: [
                    ...s.lesson.annotations,
                    {
                      id: uid("an"),
                      sourceId,
                      quote: quote.trim(),
                      note: note.trim(),
                      layer,
                      at: new Date().toISOString(),
                    },
                  ],
                },
              }));
              setQuote("");
              setNote("");
            }}
          >
            Save annotation
          </Button>
          {annotations.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No annotations yet on this source. Start with one observation:
              a short phrase the text actually states, not the argument you
              want to make.
            </p>
          ) : (
            <ul className="space-y-2">
              {annotations.map((a) => (
                <li key={a.id} className="rounded-lg bg-muted/60 p-3 text-sm">
                  <Badge variant="outline" className="mb-1">
                    {a.layer}
                  </Badge>
                  <p className="italic">“{a.quote}”</p>
                  <p className="mt-1">{a.note}</p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {guided ? (
        <Card>
          <CardHeader>
            <CardTitle>Guided sourcing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              A biased or interested source is not automatically useless. Say what
              it is good for — that is the sourcing skill, and it is allowed to
              feel slow the first time.
            </p>
            {(
              [
                ["observe", "What do you observe? (statement, not your theory)"],
                ["claim", "What claim is the source making, or what advice is it giving?"],
                ["evidence", "What evidence in the wording supports that?"],
                ["context", "How does context (merchant handbook, Italian audience, Mongol-era road) affect interpretation?"],
              ] as const
            ).map(([key, label]) => (
              <div key={key} className="space-y-1">
                <Label htmlFor={key}>{label}</Label>
                <Textarea
                  id={key}
                  rows={3}
                  value={state.lesson.guided[key]}
                  onChange={(e) =>
                    patch((s) => ({
                      ...s,
                      lesson: {
                        ...s.lesson,
                        guided: { ...s.lesson.guided, [key]: e.target.value },
                      },
                    }))
                  }
                />
              </div>
            ))}
            <Button
              variant="secondary"
              onClick={() =>
                patch((s) => ({
                  ...s,
                  lesson: {
                    ...s.lesson,
                    guided: { ...s.lesson.guided, submitted: true },
                  },
                  events: [
                    ...s.events,
                    {
                      name: "source_task_submitted",
                      at: new Date().toISOString(),
                    },
                  ],
                }))
              }
            >
              Save guided notes
            </Button>
            {state.lesson.guided.submitted ? (
              <p className="text-sm">
              Saved on this device. A mentor can read these notes beside your
              later SAQ. Next: retrieval checks, then independent practice —
              these notes are guided work, not mastery.
              </p>
            ) : null}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
