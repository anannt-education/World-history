import type { Metadata } from "next";
import { ProgressView } from "@/components/progress/progress-view";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Progress",
  description: "Gated Unit 2 evidence log. Not a predicted AP score. Not indexed.",
  path: "/progress",
  index: false,
});

export default function ProgressPage() {
  return <ProgressView />;
}
