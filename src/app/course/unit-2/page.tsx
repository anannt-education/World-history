import type { Metadata } from "next";
import Link from "next/link";
import { FormatYear } from "@/components/chrome/brand";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CENTRAL_QUESTION, OBJECTIVES, UNIT2_SESSION } from "@/content/course";
import { LESSON_BLOCKS } from "@/content/unit2/lesson";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Unit 2 Networks of Exchange",
  description:
    "Anannt Education’s published Unit 2 lesson for AP World History: Modern — Networks of Exchange, c. 1200–1450. Assessable objectives, lesson structure, and links into practice and the 2027-style short response.",
  path: "/course/unit-2",
});

export default function Unit2Page() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <Badge variant="secondary">Published</Badge>
        <h1 className="font-heading text-3xl tracking-tight">
          Unit 2 · Networks of Exchange
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          {CENTRAL_QUESTION}
        </p>
        <p className="text-sm text-muted-foreground">
          {UNIT2_SESSION.rangeNote} <FormatYear />
        </p>
      </header>
      <div className="flex flex-wrap gap-2">
        <Button render={<Link href="/learn/unit-2" />}>
          Start the Unit 2 lesson
        </Button>
        <Button variant="outline" render={<Link href="/practice" />}>
          Open the stimulus practice set
        </Button>
        <Button variant="outline" render={<Link href="/writing" />}>
          Open the source-based short response
        </Button>
      </div>
      <section>
        <h2 className="font-heading text-xl">Assessable objectives</h2>
        <ul className="mt-3 space-y-3">
          {OBJECTIVES.map((o) => (
            <li key={o.id} className="rounded-xl border border-border p-4">
              <p className="font-medium">
                {o.id} · {o.title}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {o.assessableStatement}
              </p>
            </li>
          ))}
        </ul>
      </section>
      <Card>
        <CardHeader>
          <CardTitle>Lesson structure ({UNIT2_SESSION.estimatedMinutes} min)</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-1 text-sm">
            {LESSON_BLOCKS.map((b) => (
              <li key={b.id}>
                {b.title} — {b.estimatedMinutes} min
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
