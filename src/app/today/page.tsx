import type { Metadata } from "next";
import { TodayDashboard } from "@/components/today/today-dashboard";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Today",
  description:
    "Today’s Unit 2 tasks for Anannt AP World History: Modern — the next lesson, practice, writing, or delayed check, with evidence-based progress rather than a predicted AP score.",
  path: "/today",
});

export default function TodayPage() {
  return <TodayDashboard />;
}
