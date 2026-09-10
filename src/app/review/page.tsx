import type { Metadata } from "next";
import { ReviewPage } from "@/components/review/review-page";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Delayed check on a Boccaccio source",
  description:
    "Second public Unit 2 sitting: a delayed check on a fresh Boccaccio plague source. Public-domain translation. Unit 2 pilot — not nine units. Anannt Education, Dubai. No account.",
  path: "/review",
});

export default function ReviewRoute() {
  return <ReviewPage />;
}
