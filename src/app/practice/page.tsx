import type { Metadata } from "next";
import { QuizPlayer } from "@/components/quiz/quiz-player";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Unit 2 stimulus practice",
  description:
    "Original Anannt stimulus-based multiple-choice items for Unit 2 Networks of Exchange, labeled for the 2027 AP World History: Modern format. Every option has a rationale. Not AP Classroom questions.",
  path: "/practice",
});

export default function PracticePage() {
  return <QuizPlayer />;
}
