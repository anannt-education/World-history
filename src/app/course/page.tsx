import type { Metadata } from "next";
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
import { UNITS } from "@/content/course";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Course map",
  description:
    "AP World History: Modern unit map from Anannt Education. Unit 2 Networks of Exchange is published in this pilot; Units 1 and 3–9 remain unpublished. Weightings follow the College Board CED.",
  path: "/course",
});

export default function CoursePage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-heading text-3xl tracking-tight">Course</h1>
        <p className="max-w-2xl text-muted-foreground">
          Official unit names and published exam weightings from the College
          Board CED — cited here as the official source. Anannt Education is
          independent. Only Unit 2 is published in this limited pilot; the
          gaps are visible on purpose so this is not mistaken for a full
          self-study course.
        </p>
      </header>
      <div className="grid gap-3">
        {UNITS.map((u) => (
          <Card key={u.id}>
            <CardHeader>
              <CardDescription>
                Unit {u.id} · {u.weighting} of the exam
              </CardDescription>
              <CardTitle className="flex flex-wrap items-center gap-2">
                {u.officialName}
                <Badge variant={u.published ? "secondary" : "outline"}>
                  {u.statusLabel}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {u.published ? (
                <Button render={<Link href="/course/unit-2" />}>
                  Open Unit 2 Networks of Exchange
                </Button>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Unpublished in this pilot. A partial library is not a complete
                  self-study course. Finish the Unit 2 loop on this device rather
                  than waiting on units that are not here yet.
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Weightings follow the College Board course overview and are used for
        balance, not as permission to skip low-weight units in a full launch.{" "}
        <FormatYear />
      </p>
    </div>
  );
}
