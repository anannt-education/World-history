"use client";

import Link from "next/link";
import { DelayedCheck } from "@/components/review/delayed-check";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLearner } from "@/lib/store";

export function ReviewPage() {
  const { state } = useLearner();
  const open = state.reviewQueue.filter((r) => !r.resolved);

  return (
    <div className="space-y-8">
      <DelayedCheck />
      <Card>
        <CardHeader>
          <CardTitle>Targeted review queue</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {open.length === 0 ? (
            <p className="text-muted-foreground">
              The queue is empty because nothing has been missed or marked
              low-confidence yet. That is not the same as mastery — it means we
              do not yet have a repair list. Wrong or uncertain answers will
              appear here, with related stimulus families labeled so they cannot
              quietly inflate retention.
            </p>
          ) : (
            <ul className="space-y-2">
              {open.map((r) => (
                <li key={r.id} className="rounded-lg border border-border p-3">
                  <p className="font-medium">{r.title}</p>
                  <p className="text-muted-foreground">{r.reason}</p>
                  {r.exactRepeat ? (
                    <Badge variant="outline">Related stimulus family</Badge>
                  ) : (
                    <Badge variant="secondary">Fresh targeting</Badge>
                  )}
                  <div className="mt-2">
                    <Button size="sm" variant="outline" render={<Link href={r.href} />}>
                      Open this review task
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
