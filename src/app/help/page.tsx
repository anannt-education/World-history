import type { Metadata } from "next";
import { HelpPage } from "@/components/help/help-page";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Help and FAQ",
  description:
    "How Anannt mentorship works, what Anannt Education does and does not do, 2027 AP World History: Modern format changes, accessibility, local storage, and how to use the Unit 2 loop.",
  path: "/help",
});

export default function HelpRoute() {
  return <HelpPage />;
}
