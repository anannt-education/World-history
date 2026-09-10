import type { Metadata } from "next";
import { Suspense } from "react";
import { LessonPlayer } from "@/components/lesson/lesson-player";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Unit 2 lesson",
  description:
    "Anannt Education’s Unit 2 lesson on Networks of Exchange, c. 1200–1450: dated schematic map, mechanism-first explanation, worked comparison, sourced Pegolotti task, and retrieval before explanations.",
  path: "/learn/unit-2",
});

export default function LessonPage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Opening the Unit 2 lesson…</p>}>
      <LessonPlayer />
    </Suspense>
  );
}
