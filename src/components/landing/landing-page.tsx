import Link from "next/link";
import { FormatYear } from "@/components/chrome/brand";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EXAM_2027, HELP_LOOP } from "@/content/exam-2027";
import { CENTRAL_QUESTION, OBJECTIVES, UNIT2_SESSION } from "@/content/course";
import { ORG_NAME, PRODUCT_NAME } from "@/lib/site";

const INCLUDES = [
  "One complete Unit 2 learning loop: lesson, stimulus MCQ set, source-based short response, revision, delayed check.",
  "Original items written for the 2027 digital format, with every-option rationales.",
  "Primary extracts with provenance; teaching paraphrases labeled as paraphrases.",
  "Provisional, rubric-linked writing feedback a student can dispute — not generative AI scoring.",
  "A mentor report on the same device that names evidence and a next intervention.",
];

const EXCLUDES = [
  "Units 1 and 3–9 — unpublished. This is not a complete self-study course.",
  "A timed mock engine, reserved forms, or Bluebook simulation.",
  "Accounts, billing, or a remote gradebook. Work stays in this browser.",
  "A predicted AP 1–5 score or any claim of official AP scoring.",
];

const WHO = [
  {
    title: "First-time independent learners",
    body: "If you are building Unit 2 without a daily classroom, the loop still expects you to source, explain a mechanism, and come back later. Foundation is a planning hypothesis, not a promise that one unit replaces a year.",
  },
  {
    title: "Students with some school coverage",
    body: "Use the Standard plan if you have notes but weak sourcing or causation. The lesson will not pretend you already know Kilwa’s gold path.",
  },
  {
    title: "Revision after substantial teaching",
    body: "If most units are already taught, this pilot is still only Unit 2. Use it to practice 2027 SAQ habits on a fresh source, not as a full recap of world history.",
  },
  {
    title: "Teachers and academic staff",
    body: "Switch to Mentor on the same device. The report distinguishes exposure, assisted work, independent work, and retention, and it refuses a replay-the-video default.",
  },
];

export function LandingPage() {
  return (
    <div className="space-y-16">
      <section className="grid gap-8 lg:grid-cols-[1.35fr_0.9fr] lg:items-end">
        <div className="space-y-4">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {ORG_NAME} · {PRODUCT_NAME}
          </p>
          <h1 className="font-heading text-4xl leading-tight tracking-tight sm:text-5xl">
            Unit 2 Networks of Exchange, taught the way a history mentor sits
            beside you
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            {CENTRAL_QUESTION} This limited pilot walks that question through a
            lesson, original stimulus items, a 2027-style source-based short
            response, and a delayed check on a fresh plague source. It is exam
            prep with craft — not a slogan, and not a nine-unit course.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" render={<Link href="/onboarding" />}>
              Set a Unit 2 study plan
            </Button>
            <Button variant="outline" size="lg" render={<Link href="/about" />}>
              About Anannt Education
            </Button>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardDescription>Pinned to the May 2027 exam</CardDescription>
            <CardTitle className="flex items-center gap-2 text-xl">
              What 2027 actually changed <FormatYear />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {EXAM_2027.sections.map((s) => (
              <p key={s.name}>
                <span className="font-medium">{s.name}.</span>{" "}
                <span className="text-muted-foreground">
                  {s.work} · {s.time} · {s.weight}
                </span>
              </p>
            ))}
            <p className="text-muted-foreground">
              All three SAQs are required and source-based. There is a single
              LEQ, not a menu of three prompts. {ORG_NAME} cites the College
              Board as the official source of those facts and remains
              independent.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4" aria-labelledby="loop-heading">
        <h2 id="loop-heading" className="font-heading text-2xl tracking-tight">
          The Unit 2 learning loop
        </h2>
        <p className="max-w-3xl text-muted-foreground">
          About {UNIT2_SESSION.estimatedMinutes} minutes in the core lesson,
          then assessed tasks. Each stage names a skill — sourcing, causation,
          or knowledge — so a miss tells you what to practice next.
        </p>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {HELP_LOOP.map((h, i) => (
            <Card key={h.title}>
              <CardHeader>
                <CardDescription>Step {i + 1}</CardDescription>
                <CardTitle className="text-base">{h.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {h.body}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="objectives-heading">
        <h2 id="objectives-heading" className="font-heading text-2xl tracking-tight">
          What Unit 2 asks you to be able to do
        </h2>
        <ul className="grid gap-3 md:grid-cols-2">
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

      <section className="grid gap-6 lg:grid-cols-2" aria-labelledby="scope-heading">
        <div className="space-y-3">
          <h2 id="scope-heading" className="font-heading text-2xl tracking-tight">
            What this pilot includes
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">
            {INCLUDES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <h2 className="font-heading text-2xl tracking-tight">
            What it deliberately leaves out
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">
            {EXCLUDES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="who-heading">
        <h2 id="who-heading" className="font-heading text-2xl tracking-tight">
          Who it is for
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {WHO.map((w) => (
            <Card key={w.title}>
              <CardHeader>
                <CardTitle className="text-base">{w.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {w.body}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 sm:p-8" aria-labelledby="sme-heading">
        <Badge variant="outline">Expertise, not slogans</Badge>
        <h2 id="sme-heading" className="mt-3 font-heading text-2xl tracking-tight">
          How {ORG_NAME} shows up in the work
        </h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          You will not find a ranking, a student-count, or a guaranteed score
          here. You will find original curriculum for Networks of Exchange,
          2027 format literacy written into every task label, and feedback that
          cites the student’s own sentence. Human review is still the authority:
          provisional checks can be disputed. The College Board publishes the
          CED; Anannt is not affiliated with or endorsed by the College Board.
        </p>
        <div className="mt-4">
          <Button variant="outline" render={<Link href="/about" />}>
            Read the full About page
          </Button>
        </div>
      </section>

      <section className="space-y-3 pb-4">
        <h2 className="font-heading text-2xl tracking-tight">
          Start with an honest plan
        </h2>
        <p className="max-w-2xl text-muted-foreground">
          Onboarding asks for weekly hours you can keep, then marks every
          objective unassessed until you work. That is the first mentoring
          move: no diagnostic AP score, just a dated sequence for Unit 2.
        </p>
        <Button size="lg" render={<Link href="/onboarding" />}>
          Open onboarding for the Unit 2 loop
        </Button>
      </section>
    </div>
  );
}
