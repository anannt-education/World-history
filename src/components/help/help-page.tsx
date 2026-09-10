"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FormatYear } from "@/components/chrome/brand";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HELP_FAQS } from "@/content/help";
import { EXAM_2027, HELP_LOOP } from "@/content/exam-2027";
import { ORG_NAME } from "@/lib/site";
import { useLearner } from "@/lib/store";

export function HelpPage() {
  const { reset } = useLearner();
  const router = useRouter();

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-heading text-3xl tracking-tight">Help</h1>
        <p className="max-w-2xl text-muted-foreground">
          How mentorship works in this Unit 2 pilot, what {ORG_NAME} will and
          will not claim, and how to use the loop without treating local progress
          as an AP score.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>The learning loop</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {HELP_LOOP.map((h) => (
            <div key={h.title}>
              <p className="font-medium">{h.title}</p>
              <p className="text-sm text-muted-foreground">{h.body}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <section className="space-y-3" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="font-heading text-2xl tracking-tight">
          Questions students and parents actually ask
        </h2>
        <div className="divide-y rounded-xl border border-border">
          {HELP_FAQS.map((faq) => (
            <details
              key={faq.id}
              id={faq.id}
              className="group px-4 py-3"
            >
              <summary className="cursor-pointer font-medium leading-snug">
                {faq.question}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            2027 exam changes <FormatYear />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-2 pl-5 text-sm">
            {EXAM_2027.changes2027.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card id="privacy">
        <CardHeader>
          <CardTitle>Independence, scoring, and this device</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed">
          <p>{EXAM_2027.disclaimer}</p>
          <p>
            Writing feedback is provisional and deterministic from a published
            rubric version plus heuristics. It is not official scoring and not
            generative AI. A mentor on this device can still disagree with it.
          </p>
          <p>
            Work is stored in this browser’s localStorage. There is no account
            and no remote database. Clearing site data deletes the demo student
            record.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => {
                reset();
                toast(
                  "Local study record cleared. Set a new plan when you are ready — every objective will be unassessed again.",
                );
                router.push("/");
              }}
            >
              Reset local study record
            </Button>
            <Button variant="ghost" render={<Link href="/about" />}>
              About Anannt Education
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
