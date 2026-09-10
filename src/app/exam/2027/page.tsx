import Link from "next/link";
import { pageMetadata } from "@/lib/site";
import {
  EXAM_SITTING,
  HONESTY,
  HONESTY_PILOT,
  MONEY_PAGE,
  gateHref,
} from "@/lib/mount";
import { EXAM_2027 } from "@/content/exam-2027";

export const metadata = pageMetadata({
  title: "May 2027 World History exam guide",
  description:
    "Thursday 6 May 2027 Session 1. Unit 2 pilot only — not nine units. Self-study supplement from Anannt Education in Dubai. Confirm the sitting with College Board.",
  path: "/exam/2027",
});

export default function Exam2027Page() {
  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Anannt exam review · commentary
        </p>
        <h1 className="font-heading text-4xl tracking-tight">
          2027 AP World History: Modern exam guide
        </h1>
        <p className="text-lg text-muted-foreground">
          College Board lists AP World History: Modern on {EXAM_SITTING.dateLabel}, {EXAM_SITTING.session}.
          In Dubai that is morning local time ({EXAM_SITTING.localTime}). This page is a self-study
          supplement. It is not a College Board document.
        </p>
      </header>
      <section className="space-y-3">
        <h2 className="font-heading text-2xl">What this desk covers</h2>
        <p className="text-sm leading-relaxed">{HONESTY}</p>
        <p className="text-sm leading-relaxed">{HONESTY_PILOT}</p>
      </section>
      <section className="space-y-3">
        <h2 className="font-heading text-2xl">2027 format we rehearse against</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">
          {EXAM_2027.sections.map((s) => (
            <li key={s.name}>
              <strong>{s.name}.</strong> {s.work} · {s.time} · {s.weight}
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground">{EXAM_2027.disclaimer}</p>
      </section>
      <p className="text-sm">
        Confirm the sitting with College Board and your school. After the two public sittings,{" "}
        <a href={gateHref("u2")} className="underline-offset-2 hover:underline">
          continue on study.anannt.ae/start
        </a>
        . Talk in person via{" "}
        <a href={MONEY_PAGE} className="underline-offset-2 hover:underline">
          the World History money page on anannt.ae
        </a>
        .
      </p>
      <p className="text-sm">
        <Link href="/learn/unit-2" className="underline-offset-2 hover:underline">
          Start the Unit 2 lesson
        </Link>
        <span className="mx-2">·</span>
        <Link href="/" className="underline-offset-2 hover:underline">
          World History home
        </Link>
      </p>
    </article>
  );
}
