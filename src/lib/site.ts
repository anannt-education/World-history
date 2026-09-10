import type { Metadata } from "next";
import {
  HONESTY,
  HONESTY_PILOT,
  SITE_ORIGIN,
  SITE_URL as MOUNT_SITE_URL,
  absUrl,
} from "@/lib/mount";

export const ORG_NAME = "Anannt Education";
export const PRODUCT_NAME = "Anannt self-prep for AP® World History";
export const TITLE_BRAND = "Anannt self-prep for AP® World History";
export const EXAM_YEAR = 2027;
export const EXAM_BASELINE = "May 2027";
export const SITE_URL = MOUNT_SITE_URL;

export function getSiteUrl() {
  return SITE_URL;
}

export const DEFAULT_DESCRIPTION =
  "Unit 2 Networks of Exchange only. The other eight units are not on this desk. Two public sittings, no account. Anannt Education, Dubai. Thursday 6 May 2027 Session 1.";

export const OG_TITLE = "World History · Unit 2 pilot | Anannt self-prep for AP® World History";

export const OG_DESCRIPTION = DEFAULT_DESCRIPTION;

export const PUBLIC_NAV = [
  { href: "/about", label: "About" },
  { href: "/help", label: "Help" },
  { href: "/exam/2027", label: "2027 exam" },
] as const;

export {
  GATED_PREFIXES,
  isGatedPath,
  isOnboardingPath,
  isPublicPath,
} from "@/lib/mount";

export function pageTitle(page: string) {
  const suffix = ` | ${TITLE_BRAND}`;
  const max = 70;
  if (page.length + suffix.length <= max) return `${page}${suffix}`;
  const budget = Math.max(12, max - suffix.length - 1);
  return `${page.slice(0, budget).trim()}…${suffix}`;
}

export function pageMetadata({
  title,
  description,
  path,
  index = true,
}: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
}): Metadata {
  const url = absUrl(path);
  const fullTitle = pageTitle(title);
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    robots: index ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: ORG_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export function jsonLdGraph() {
  const url = SITE_URL;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": `${url}/#organization`,
        name: ORG_NAME,
        url,
        email: "wecare@anannt.ae",
        telephone: "+971585853551",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Office 105, Bank Street Building, Burjuman Metro Exit 2",
          addressLocality: "Dubai",
          addressCountry: "AE",
        },
        description: `${HONESTY} ${HONESTY_PILOT}`,
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        name: PRODUCT_NAME,
        url,
        description: DEFAULT_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": `${url}/#organization` },
      },
      {
        "@type": "Course",
        "@id": `${url}/#course`,
        name: "AP World History: Modern — Unit 2 pilot",
        alternateName: PRODUCT_NAME,
        description: `${HONESTY} ${HONESTY_PILOT} Self-study supplement for Thursday 6 May 2027 Session 1.`,
        provider: { "@id": `${url}/#organization` },
        educationalLevel: "High school",
        inLanguage: "en",
        isAccessibleForFree: true,
        teaches:
          "AP World History: Modern Unit 2 Networks of Exchange, c. 1200–1450, including sourcing, causation, and comparison.",
        hasCourseInstance: {
          "@type": "CourseInstance",
          name: "Unit 2 Networks of Exchange pilot",
          courseMode: "online",
          courseWorkload: "PT32M",
        },
      },
    ],
  };
}

export { SITE_ORIGIN } from "@/lib/mount";
