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
import { HONESTY, HONESTY_PILOT, PUBLIC_LESSONS, waitlistHref } from "@/lib/mount";

export const metadata: Metadata = pageMetadata({
  title: "Honesty map — Unit 2 only",
  description:
    "Unit 2 Networks of Exchange is on this desk. The other eight units are unpublished. Not nine units. Not a mock engine. Anannt Education, Dubai.",
  path: "/course",
});

export default function CoursePage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-heading text-3xl tracking-tight">Course</h1>
        <p className="max-w-2xl text-muted-foreground">
          {HONESTY} {HONESTY_PILOT} Official unit names and published exam weightings from the College
          Board CED — cited here as the official source. Anannt Education is independent. Units 1 and
          3–9 are listed so you can see the map. They are not published journeys.
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
                <Button render={<Link href={PUBLIC_LESSONS[0].path} />}>
                  Open the Unit 2 lesson
                </Button>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Unpublished on this desk.{" "}
                  <a className="underline underline-offset-2" href={waitlistHref(`u${u.id}`)}>
                    Ask to be told when Unit {u.id} lesson 1 is ready
                  </a>
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
