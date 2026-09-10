import type { Metadata } from "next";
import { WritingStudio } from "@/components/writing/writing-studio";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Source-based short response",
  description:
    "Write a 2027-style source-based short response on Ibn Battuta and Indian Ocean ports. Anannt feedback is provisional, evidence-linked, and diagnosis-driven — not official AP scoring.",
  path: "/writing",
});

export default function WritingPage() {
  return <WritingStudio />;
}
