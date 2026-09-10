import type { Metadata } from "next";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Set a Unit 2 study plan",
  description:
    "Pin Anannt AP World History: Modern to the May 2027 exam, choose honest weekly hours, and enter the Unit 2 Networks of Exchange loop. This is a planning hypothesis, not a diagnostic AP score.",
  path: "/onboarding",
});

export default function OnboardingPage() {
  return <OnboardingFlow />;
}
