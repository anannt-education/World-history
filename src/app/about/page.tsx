import type { Metadata } from "next";
import Link from "next/link";
import { FormatYear } from "@/components/chrome/brand";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EXAM_2027 } from "@/content/exam-2027";
import { ORG_NAME, PRODUCT_NAME, pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About Anannt Education",
  description:
    "Anannt Education designs original AP World History: Modern curriculum. This About page explains the Unit 2 Networks of Exchange pilot, 2027 format literacy, original items, and independent relationship to the College Board.",
  path: "/about",
});

const CRAFT = [
  {
    title: "Original curriculum design",
    body: "Unit 2 is built around one assessable question — why exchange increased, and why effects differed — then taught with dated corridors, a worked comparison, and sources that have provenance. The lesson is not a textbook recap with a quiz glued on.",
  },
  {
    title: "2027 format literacy",
    body: "Every assessed task is labeled for the May 2027 exam: all three SAQs required and source-based; a single LEQ. Older materials cannot silently become 2027 simulations. Official facts are cited from the College Board; Anannt does not claim partnership.",
  },
  {
    title: "Original items",
    body: "The stimulus MCQ set and the Kilwa short response were written for this pilot. They are not AP Classroom or released-exam questions. Related stimulus families are labeled so a repeat cannot quietly inflate retention.",
  },
  {
    title: "Human-reviewed writing feedback, labeled provisional",
    body: "Short-response checks are deterministic against a published rubric version plus heuristics. They quote the student’s sentence, name a diagnosis (sourcing, causation, knowledge), and assign one revision. A student can dispute the item. That is not official AP scoring.",
  },
  {
    title: "Diagnosis-linked practice",
    body: "Feedback always points to the next practice, not “watch the lesson again.” Mentors on the same device see exposure versus independent work. Retained requires a fresh check after at least seven days.",
  },
];

export default function AboutPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {ORG_NAME}
        </p>
        <h1 className="font-heading text-3xl tracking-tight sm:text-4xl">
          Subject-matter expertise, shown in the work
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          {PRODUCT_NAME} is a course product from {ORG_NAME}. This site is a
          limited Unit 2 (Networks of Exchange) pilot for the May 2027 exam.
          We infer expertise from sourcing, mechanisms, and honest evidence
          states — not from rankings or guaranteed scores.
        </p>
      </header>

      <div className="grid gap-3">
        {CRAFT.map((c) => (
          <Card key={c.title}>
            <CardHeader>
              <CardTitle className="text-lg">{c.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              {c.body}
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="space-y-3">
        <h2 className="font-heading text-2xl tracking-tight">
          Independence and the CED
        </h2>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Unit names and published exam weightings follow the College Board
          AP World History: Modern Course and Exam Description, which remains
          the official source. {ORG_NAME} is not affiliated with or endorsed by
          the College Board. Nothing here is an official practice exam.{" "}
          <FormatYear />
        </p>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {EXAM_2027.disclaimer}
        </p>
      </section>

      <div className="flex flex-wrap gap-3">
        <Button render={<Link href="/onboarding" />}>
          Set a Unit 2 study plan
        </Button>
        <Button variant="outline" render={<Link href="/help" />}>
          Open Help and FAQ
        </Button>
      </div>
    </article>
  );
}
