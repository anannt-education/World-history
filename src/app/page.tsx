import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/landing-page";
import { DEFAULT_DESCRIPTION, pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "World History · Unit 2 pilot",
  description: DEFAULT_DESCRIPTION,
  path: "/",
});

export default function HomePage() {
  return <LandingPage />;
}
