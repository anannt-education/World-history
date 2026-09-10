import Link from "next/link";
import { FormatYear } from "@/components/chrome/brand";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EXAM_2027 } from "@/content/exam-2027";
import { CENTRAL_QUESTION } from "@/content/course";
import { ORG_NAME } from "@/lib/site";
import {
  EXAM_SITTING,
  HONESTY,
  HONESTY_PILOT,
  PUBLIC_LESSONS,
  QUIET_LINE,
  VOICE,
  gateHref,
} from "@/lib/mount";

export function LandingPage() {
  return (
    <div className="space-y-12">
      <section className="max-w-2xl space-y-4">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {ORG_NAME} · self-prep · {EXAM_SITTING.dateLabel} {EXAM_SITTING.session}
        </p>
        <h1 className="font-heading text-4xl leading-tight tracking-tight sm:text-5xl">
          World History, one honest sitting.
        </h1>
        <p className="text-lg text-muted-foreground">{VOICE}</p>
        <p className="text-sm font-medium">{HONESTY}</p>
        <p className="text-sm text-muted-foreground">{HONESTY_PILOT}</p>
        <p className="text-sm text-muted-foreground">{QUIET_LINE}</p>
        <p className="text-sm text-muted-foreground">{CENTRAL_QUESTION}</p>
      </section>

      <ol className="max-w-2xl space-y-4">
        {PUBLIC_LESSONS.map((lesson, i) => (
          <li key={lesson.id} className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Lesson {i + 1} · public · Unit 2
            </p>
            <h2 className="mt-1 font-heading text-2xl">{lesson.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {i === 0
                ? "Objective, schematic map, Pegolotti’s merchant handbook. Public-domain translation (Yule). No account."
                : "A delayed check on a fresh Boccaccio plague source (Rigg). Teaching paraphrases stay labelled. No invented quotations."}
            </p>
            <Button
              className="mt-4"
              render={<Link href={lesson.path} />}
              variant={i === 0 ? "default" : "outline"}
            >
              {i === 0 ? "Start lesson 1 — free, no account" : "Open lesson 2"}
            </Button>
          </li>
        ))}
      </ol>

      <Card className="max-w-2xl">
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
            All three SAQs are required and source-based. There is a single LEQ, not a menu of three
            prompts. This desk is not a mock engine.
          </p>
        </CardContent>
      </Card>

      <p className="max-w-2xl rounded-xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
        After those two sittings — or if you open practice, writing, or mocks — we send you to
        study.anannt.ae/start. Parent WhatsApp is required there. Under 13: a parent should finish that
        form.
      </p>

      <div className="flex flex-wrap gap-3 text-sm">
        <Link href="/exam/2027" className="underline-offset-2 hover:underline">
          2027 exam guide
        </Link>
        <Link href="/course" className="underline-offset-2 hover:underline">
          Honesty map
        </Link>
        <Link href="/about" className="underline-offset-2 hover:underline">
          About
        </Link>
        <Link href="/help" className="underline-offset-2 hover:underline">
          Help
        </Link>
        <a href={gateHref("u2")} className="underline-offset-2 hover:underline">
          After two lessons
        </a>
      </div>
    </div>
  );
}
