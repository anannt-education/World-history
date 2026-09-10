import type { Metadata } from "next";
import { MentorReport } from "@/components/mentor/mentor-report";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Mentor report",
  description:
    "Anannt academic staff view of the same local Unit 2 record: exposure, assisted work, independent work, retention, and a next intervention. Not a predicted AP score.",
  path: "/mentor",
});

export default function MentorPage() {
  return <MentorReport />;
}
