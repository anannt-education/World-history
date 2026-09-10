import type { Metadata } from "next";
import { WritingStudio } from "@/components/writing/writing-studio";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Source-based short response",
  description: "Gated Unit 2 writing studio. After two public lessons this path opens on study.anannt.ae/start.",
  path: "/writing",
  index: false,
});

export default function WritingPage() {
  return <WritingStudio />;
}
