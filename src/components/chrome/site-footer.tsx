import Link from "next/link";
import { EXAM_2027 } from "@/content/exam-2027";
import { ORG_NAME, PRODUCT_NAME } from "@/lib/site";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-2">
            <p className="font-heading text-lg tracking-tight">{ORG_NAME}</p>
            <p className="text-sm text-muted-foreground">{PRODUCT_NAME}</p>
            <p className="text-sm text-muted-foreground">
              Limited Unit 2 (Networks of Exchange) pilot, pinned to the May
              2027 exam. Original items and diagnosis-linked practice — not a
              complete self-study course.
            </p>
          </div>
          <nav aria-label="Footer">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Explore
            </p>
            <ul className="mt-2 space-y-1.5 text-sm">
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
                <Link href="/help#privacy" className="hover:underline">
                  Where work is stored
                </Link>
              </li>
              <li>
                <Link href="/onboarding" className="hover:underline">
                  Set a Unit 2 study plan
                </Link>
              </li>
              <li>
                <Link href="/course" className="hover:underline">
                  Course map (Unit 2 published)
                </Link>
              </li>
            </ul>
          </nav>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="text-xs font-medium tracking-wide uppercase">
              2027 format
            </p>
            <p>
              All three SAQs are required and source-based. The LEQ is a single
              required prompt, not a menu of three.
            </p>
            <p>
              Official exam specifications are published by the College Board,
              the source of the AP World History: Modern Course and Exam
              Description. {ORG_NAME} is independent.
            </p>
          </div>
        </div>
        <Separator className="my-6" />
        <p className="text-xs leading-relaxed text-muted-foreground">
          {EXAM_2027.disclaimer} Learner work in this pilot is stored locally in
          your browser on this device. There is no account and no remote student
          database. Clearing site data deletes the demo record.
        </p>
      </div>
    </footer>
  );
}
