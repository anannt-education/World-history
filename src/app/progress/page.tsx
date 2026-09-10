import type { Metadata } from "next";
import { ProgressView } from "@/components/progress/progress-view";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Progress",
  description:
    "Honest Unit 2 learning states on this device: unassessed, exposure, developing, provisionally secure, or retained. Anannt Education never predicts an AP 1–5 score.",
  path: "/progress",
});

export default function ProgressPage() {
  return <ProgressView />;
}
