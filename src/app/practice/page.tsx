import type { Metadata } from "next";
import { QuizPlayer } from "@/components/quiz/quiz-player";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Unit 2 stimulus practice",
  description: "Gated Unit 2 stimulus practice. After two public lessons this path opens on study.anannt.ae/start.",
  path: "/practice",
  index: false,
});

export default function PracticePage() {
  return <QuizPlayer />;
}
