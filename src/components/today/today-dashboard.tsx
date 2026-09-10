"use client";

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
import { OBJECTIVES } from "@/content/course";
import { stateLabel } from "@/lib/mastery";
import { routeCopy } from "@/lib/planner";
import { useDerived, useLearner } from "@/lib/store";

export function TodayDashboard() {
  const { state } = useLearner();
  const { plan, mastery } = useDerived();
  const next = plan.nextThree[0];
  const retained = mastery.filter((m) => m.state === "retained").length;
  const developing = mastery.filter((m) => m.state === "developing").length;
  const copy = routeCopy(state.onboarding.route);
  const currentUnit = "Unit 2 · Networks of Exchange";
  const progressSignal =
    retained === 4
      ? "All four Unit 2 objectives now have delayed independent evidence on this device. That is retention under Anannt’s product rule — still not a predicted AP score. Reopen any stage if a mechanism has gone thin."
      : retained > 0
        ? `${retained} of 4 objectives retained; ${developing} still developing. Unassessed work is insufficient evidence, not a failing grade. Next practice should follow the open task, not a full lesson replay.`
        : `${retained} of 4 objectives retained. Unassessed or developing objectives are listed as insufficient evidence, not as a predicted AP score.`;

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs tracking-wide text-muted-foreground uppercase">
          Today · {currentUnit}
        </p>
        <h1 className="font-heading text-3xl tracking-tight">
          {next ? next.title : "Unit 2 loop complete on this device"}
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          {next
            ? `${next.purpose} About ${next.estimatedMinutes} minutes. ${next.reason}`
            : "You can still reopen any stage. Mentors on this device see the same evidence. If a comparison still feels like a list of goods, rewrite one causal sentence rather than starting over."}
        </p>
        {next ? (
          <Button size="lg" render={<Link href={next.href} />}>
            {next.kind === "lesson"
              ? "Open the Unit 2 lesson"
              : next.kind === "quiz"
                ? "Open the stimulus practice set"
                : next.kind === "writing"
                  ? "Open the source-based short response"
                  : next.kind === "revision"
                    ? "Open the revision paragraph"
                    : "Open the delayed check"}
          </Button>
        ) : (
          <Button render={<Link href="/mentor" />}>
            Open the mentor evidence report
          </Button>
        )}
      </header>

      <section className="space-y-3">
        <h2 className="font-heading text-xl">Next three tasks</h2>
        {plan.nextThree.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No open tasks in the Unit 2 sequence. Full-course planning is not
            published in this pilot — that is a scope limit, not a hidden
            library.
          </p>
        ) : (
          <div className="grid gap-3 md:grid-cols-3">
            {plan.nextThree.map((t, i) => (
              <Card key={t.id}>
                <CardHeader>
                  <CardDescription>
                    {i === 0 ? "Up next" : `Then`} · due {t.dueDate} ·{" "}
                    {t.estimatedMinutes} min
                  </CardDescription>
                  <CardTitle className="text-base">{t.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>{t.purpose}</p>
                  <p className="text-muted-foreground">{t.reason}</p>
                  <Button size="sm" variant="outline" render={<Link href={t.href} />}>
                    {i === 0 ? "Start this task" : "Open this task"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Overdue reviews</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            {plan.overdue.length === 0 && !plan.delayedOverdue ? (
              <p className="text-muted-foreground">
                None overdue. A missed week would replan rather than pile every
                leftover item — finish the open task in front of you.
              </p>
            ) : (
              <ul className="list-disc pl-5">
                {plan.overdue.map((t) => (
                  <li key={t.id}>
                    {t.title} (due {t.dueDate})
                  </li>
                ))}
                {plan.delayedOverdue ? (
                  <li>The delayed check is due or simulated-open — that is the retention evidence, not extra lesson minutes.</li>
                ) : null}
              </ul>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Progress signal <FormatYear />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>{progressSignal}</p>
            <ul className="space-y-1">
              {mastery.map((m) => (
                <li key={m.objectiveId} className="flex justify-between gap-2">
                  <span>
                    {m.objectiveId}{" "}
                    {OBJECTIVES.find((o) => o.id === m.objectiveId)?.title}
                  </span>
                  <Badge variant="outline">{stateLabel(m.state)}</Badge>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground">
              Route: {copy.label}. {copy.envelope}
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
