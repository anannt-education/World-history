import type { Metadata } from "next";
import { ReviewPage } from "@/components/review/review-page";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Review and delayed check",
  description:
    "Delayed independent check on a fresh Boccaccio plague source, plus a targeted review queue. Retained in Anannt’s Unit 2 pilot requires a later check — not an exact repeat of Pegolotti or Kilwa.",
  path: "/review",
});

export default function ReviewRoute() {
  return <ReviewPage />;
}
