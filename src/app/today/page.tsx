import type { Metadata } from "next";
import { TodayDashboard } from "@/components/today/today-dashboard";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Today",
  description: "Gated Unit 2 planner. After two public lessons this path opens on study.anannt.ae/start.",
  path: "/today",
  index: false,
});

export default function TodayPage() {
  return <TodayDashboard />;
}
