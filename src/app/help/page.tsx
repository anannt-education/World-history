import type { Metadata } from "next";
import { HelpPage } from "@/components/help/help-page";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Help and FAQ",
  description:
    "Unit 2 Networks of Exchange. The other eight units are not on this desk. Two public sittings, then the Burjuman gate. Anannt Education, Dubai. Thursday 6 May 2027 Session 1.",
  path: "/help",
});

export default function HelpRoute() {
  return <HelpPage />;
}
