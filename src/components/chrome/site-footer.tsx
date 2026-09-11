import Link from "next/link";
import { EXAM_2027 } from "@/content/exam-2027";
import { ORG_NAME, PRODUCT_NAME } from "@/lib/site";
import { Separator } from "@/components/ui/separator";
import {
  EXAM_SITTING,
  HONESTY,
  HONESTY_PILOT,
  LEGAL,
  MONEY_PAGE,
  PUBLIC_LESSONS,
  gateHref,
  whatsappHelpUrl,
} from "@/lib/mount";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-2">
            <p className="font-heading text-lg tracking-tight">{ORG_NAME}</p>
            <p className="text-sm text-muted-foreground">{PRODUCT_NAME}</p>
            <p className="text-sm text-muted-foreground">{HONESTY}</p>
            <p className="text-sm text-muted-foreground">{HONESTY_PILOT}</p>
          </div>
          <nav aria-label="Footer">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Explore
            </p>
            <ul className="mt-2 space-y-1.5 text-sm">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href={PUBLIC_LESSONS[0].path} className="hover:underline">
                  Lesson 1 · Networks of Exchange
                </Link>
              </li>
              <li>
                <Link href={PUBLIC_LESSONS[1].path} className="hover:underline">
                  Lesson 2 · Boccaccio check
                </Link>
              </li>
              <li>
                <Link href="/exam/2027" className="hover:underline">
                  2027 exam guide
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  About Anannt Education
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:underline">
                  Help and FAQ
                </Link>
              </li>
              <li>
                <Link href="/course" className="hover:underline">
                  Honesty map (Unit 2 only)
                </Link>
              </li>
              <li>
                <a href={gateHref("u2")} className="hover:underline">
                  Tell us who is sitting
                </a>
              </li>
              <li>
                <a href={whatsappHelpUrl("doubts")} className="hover:underline">
                  WhatsApp Burjuman
                </a>
              </li>
              <li>
                <a href={MONEY_PAGE} className="hover:underline">
                  Talk to a mentor in Burjuman
                </a>
              </li>
            </ul>
          </nav>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="text-xs font-medium tracking-wide uppercase">2027 sitting</p>
            <p>
              {EXAM_SITTING.dateLabel} {EXAM_SITTING.session} · {EXAM_SITTING.localTime}
            </p>
            <p>
              All three SAQs are required and source-based. The LEQ is a single required prompt, not
              a menu of three.
            </p>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="space-y-2 text-xs leading-relaxed text-muted-foreground">
          <p>{EXAM_2027.disclaimer}</p>
          <p>{LEGAL.ap}</p>
          <p>{LEGAL.psat}</p>
          <p>{LEGAL.supplement}</p>
          <p>{LEGAL.nap}</p>
        </div>
      </div>
    </footer>
  );
}
