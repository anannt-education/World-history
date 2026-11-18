import type { Metadata } from "next";
import { FormatYear } from "@/components/chrome/brand";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { forms } from "@/content/forms";
import { EXAM_2027 } from "@/content/exam-2027";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Mock exams (locked)",
  description:
    "2027 mock exam format and gated practice sittings.",
  path: "/mock-exams",
  index: false,
});

export default function MockExamsPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <Badge variant="outline">Locked in this pilot</Badge>
        <h1 className="font-heading text-3xl tracking-tight">Mock exams</h1>
        <p className="max-w-2xl text-muted-foreground">
          {forms.length === 0 ? "The timed runner is ready, but no full paper is published yet. Use this page to learn the exam shape while a paper is prepared." : "The timed runner is ready. Use this page to learn the exam shape."}
        </p>
      </header>
      <Alert>
        <AlertTitle>Small screens</AlertTitle>
        <AlertDescription>
          A full mock is desktop/laptop-first. For a full sitting, use a laptop or desktop if you can. Official testing is in
          Bluebook; this site is not Bluebook and cannot grant official
          accommodations.
        </AlertDescription>
      </Alert>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            May 2027 configuration <FormatYear />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {EXAM_2027.sections.map((s) => (
            <div key={s.name}>
              <p className="font-medium">{s.name}</p>
              <p className="text-muted-foreground">
                {s.work} · {s.time} · {s.weight} of the composite
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>2027 changes you must not ignore</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-2 pl-5 text-sm">
            {EXAM_2027.changes2027.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <p className="text-xs text-muted-foreground">{EXAM_2027.disclaimer}</p>
    </div>
  );
}
