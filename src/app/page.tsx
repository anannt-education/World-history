import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/landing-page";
import { OG_DESCRIPTION, OG_TITLE } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: OG_TITLE,
  },
  description: OG_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
  },
};

export default function HomePage() {
  return <LandingPage />;
}
