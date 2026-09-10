import type { Metadata } from "next";
import { MentorReport } from "@/components/mentor/mentor-report";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Mentor report",
  description: "Gated mentor view of the local Unit 2 record. Not indexed.",
  path: "/mentor",
  index: false,
});

export default function MentorPage() {
  return <MentorReport />;
}
