import type { Metadata } from "next";
import { Suspense } from "react";
import { LessonPlayer } from "@/components/lesson/lesson-player";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Unit 2 lesson",
  description:
    "First public sitting: Networks of Exchange, c. 1200–1450. Dated schematic map, Pegolotti task, retrieval before explanations. Unit 2 pilot — not nine units. No account. Anannt Education, Dubai.",
  path: "/learn/unit-2",
});

export default function LessonPage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Opening the Unit 2 lesson…</p>}>
      <LessonPlayer />
    </Suspense>
  );
}
