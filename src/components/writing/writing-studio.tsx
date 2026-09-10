"use client";

import Link from "next/link";
import { FormatYear } from "@/components/chrome/brand";
import { SourceWorkspace } from "@/components/source/source-workspace";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { SAQ, WRITING_STUDIO_META } from "@/content/unit2/writing";
import { submitRevision, submitWriting, useLearner } from "@/lib/store";
import { toast } from "sonner";

export function WritingStudio() {
  const { state, patch } = useLearner();
  const w = state.writing;
  const submitted = Boolean(w.submittedAt);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">Writing studio</Badge>
          <FormatYear />
        </div>
        <h1 className="font-heading text-3xl tracking-tight">
          {WRITING_STUDIO_META.title}
        </h1>
        <p className="max-w-3xl text-muted-foreground">
          {SAQ.formatNote} About {WRITING_STUDIO_META.estimatedMinutes} minutes,
          plus {WRITING_STUDIO_META.revisionMinutes} for revision. Original,
          feedback, revision, and rubric version remain independently accessible.
          Feedback will quote your sentence and name a next drill — sourcing,
          causation, or knowledge — the way a teacher would in the margin.
        </p>
      </header>

      <Alert>
        <AlertTitle>Desktop is better for long writing</AlertTitle>
        <AlertDescription>
          This short response is usable on a phone; a full mock (locked in this
          pilot) would warn before starting on a small viewport. Autosave is
          local to this browser.
        </AlertDescription>
      </Alert>

      <SourceWorkspace sourceId={SAQ.stimulusId} />

      <p className="text-sm font-medium">{SAQ.task}</p>

      <Tabs defaultValue="compose">
        <TabsList>
          <TabsTrigger value="compose">Compose</TabsTrigger>
          <TabsTrigger value="feedback" disabled={!w.feedback}>
            Feedback
          </TabsTrigger>
          <TabsTrigger value="revision">Revision</TabsTrigger>
          <TabsTrigger value="rubric">Rubric {SAQ.rubricVersion}</TabsTrigger>
        </TabsList>
        <TabsContent value="compose" className="space-y-4 pt-4">
          {SAQ.parts.map((part) => (
            <div key={part.id} className="space-y-2">
              <Label htmlFor={`part-${part.id}`} className="text-base">
                {part.id}. {part.prompt}
              </Label>
              <Textarea
                id={`part-${part.id}`}
                rows={part.id === "C" ? 8 : 5}
                value={w.parts[part.id]}
                onChange={(e) =>
                  patch((s) => ({
                    ...s,
                    writing: {
                      ...s.writing,
                      parts: { ...s.writing.parts, [part.id]: e.target.value },
                    },
                  }))
                }
                disabled={submitted}
              />
            </div>
          ))}
          <Button
            disabled={submitted || !w.parts.A.trim() || !w.parts.B.trim() || !w.parts.C.trim()}
            onClick={() => {
              submitWriting(patch);
              toast(
                "Provisional feedback is ready. It quotes your sentence and names one revision — not an official AP score.",
              );
            }}
          >
            Submit for provisional feedback
          </Button>
          {submitted ? (
            <p className="text-sm text-muted-foreground">
              Original locked. Open Feedback, then Revision. You can still read
              every part. Struggle on Part C is common; the next move is one
              causal sentence, not a longer essay.
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Word count is not a rubric point. Empty parts cannot be scored.
            </p>
          )}
        </TabsContent>
        <TabsContent value="feedback" className="space-y-4 pt-4">
          {w.feedback ? <FeedbackPanel /> : <Empty>Submit the three parts first — feedback cannot invent a score from a blank page.</Empty>}
        </TabsContent>
        <TabsContent value="revision" className="space-y-4 pt-4" id="revision">
          {submitted ? <RevisionPanel /> : <Empty>Submit an original first. Revision is the repair pass, not a second first draft.</Empty>}
        </TabsContent>
        <TabsContent value="rubric" className="space-y-3 pt-4 text-sm leading-relaxed">
          <p>
            Rubric version <code>{SAQ.rubricVersion}</code>, exam year 2027.
            Provisional machine checks look for task-part coverage, source
            detail, sourcing language, and a causal relationship. They do not
            award points for length or template phrases.
          </p>
          {SAQ.parts.map((p) => (
            <div key={p.id}>
              <p className="font-medium">
                {p.id}. Acceptable evidence examples (not a whitelist)
              </p>
              <ul className="list-disc pl-5 text-muted-foreground">
                {p.acceptableEvidence.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <p className="mt-1 font-medium">Common errors</p>
              <ul className="list-disc pl-5 text-muted-foreground">
                {p.commonErrors.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}

function FeedbackPanel() {
  const { state, patch } = useLearner();
  const f = state.writing.feedback;
  if (!f) return null;
  return (
    <div className="space-y-4">
      <Alert>
        <AlertTitle>Provisional — not official AP scoring</AlertTitle>
        <AlertDescription>
          Status: {f.status}. Rubric {f.rubricVersion}. Diagnosis:{" "}
          {f.diagnosis.replaceAll("_", " ")}. This is Anannt staff-style
          marking on this device: evidence-linked, and a mentor can dispute
          it. It is not a predicted AP 1–5 score.
        </AlertDescription>
      </Alert>
      {f.parts.map((p) => (
        <Card key={p.partId}>
          <CardHeader>
            <CardTitle className="flex flex-wrap items-center gap-2">
              Part {p.partId}{" "}
              <Badge variant={p.addressed ? "secondary" : "destructive"}>
                {p.pointDecision.replaceAll("_", " ")}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <strong>Addressed?</strong>{" "}
              {p.addressed
                ? "Yes, provisionally — a reader can see the task in this passage."
                : "Not yet — the part is still open, which is information for the revision."}
            </p>
            {p.missing ? (
              <p>
                <strong>Missing:</strong> {p.missing}
              </p>
            ) : null}
            <p>
              <strong>Cited student passage:</strong> {p.citedPassage}
            </p>
            <p>{p.explanation}</p>
          </CardContent>
        </Card>
      ))}
      <div className="rounded-xl bg-muted/50 p-4 text-sm leading-relaxed">
        <p>
          <strong>Highest-priority improvement.</strong> {f.highestPriorityImprovement}
        </p>
        <p className="mt-2">
          <strong>Revision task.</strong> {f.revisionTask}
        </p>
        <p className="mt-2">
          <strong>Next learning action.</strong> {f.nextAction.why}{" "}
          <Link className="underline" href={f.nextAction.href}>
            {f.nextAction.label}
          </Link>
        </p>
      </div>
      <Button
        variant="outline"
        onClick={() => {
          patch((s) => ({
            ...s,
            writing: { ...s.writing, disputed: true },
            reviewQueue: [
              ...s.reviewQueue,
              {
                id: `disp-${Date.now()}`,
                createdAt: new Date().toISOString(),
                reason: "Student disputed provisional writing feedback.",
                href: "/mentor",
                title: "Disputed short response",
                objectiveId: "U2-LO2",
                resolved: false,
                exactRepeat: false,
              },
            ],
          }));
          toast(
            "Disputed. The mentor queue on this device now holds the item for human review.",
          );
        }}
      >
        Dispute this feedback
      </Button>
      {state.writing.disputed ? (
        <p className="text-sm">In the mentor review queue as a disputed item.</p>
      ) : null}
    </div>
  );
}

function RevisionPanel() {
  const { state, patch } = useLearner();
  const original = state.writing.originalSnapshot ?? state.writing.parts;
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Original Part C (locked)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap text-sm leading-relaxed">
            {original.C || "—"}
          </p>
          <Separator className="my-3" />
          <p className="text-xs text-muted-foreground">
            Parts A and B remain on the Compose tab. Both versions stay on this
            device.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Revision paragraph</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            rows={12}
            value={state.writing.revision}
            onChange={(e) =>
              patch((s) => ({
                ...s,
                writing: { ...s.writing, revision: e.target.value },
              }))
            }
            disabled={Boolean(state.writing.revisionSubmittedAt)}
          />
          <Button
            disabled={
              Boolean(state.writing.revisionSubmittedAt) ||
              state.writing.revision.trim().length < 20
            }
            onClick={() => {
              submitRevision(patch);
              toast(
                "Revision saved as assisted work. Next: the delayed check when it is due — retention still needs a fresh source.",
              );
            }}
          >
            Submit revision
          </Button>
          {state.writing.revisionSubmittedAt ? (
            <p className="text-sm text-muted-foreground">
              Revision saved. It is assisted work after feedback, so it cannot
              independently establish mastery. Next: the delayed check on a
              fresh plague source when it is due (or simulated for this demo).
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              {state.writing.feedback?.revisionTask}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
