import type { Metadata } from "next";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Set a Unit 2 study plan",
  description: "The start form lives on study.anannt.ae. Parent WhatsApp is required. This app does not collect a second form.",
  path: "/onboarding",
  index: false,
});

export default function OnboardingPage() {
  return <OnboardingFlow />;
}
