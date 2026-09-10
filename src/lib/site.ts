import type { Metadata } from "next";

export const ORG_NAME = "Anannt Education";
export const PRODUCT_NAME = "Anannt AP World History: Modern";
export const TITLE_BRAND = "Anannt AP World History";
export const EXAM_YEAR = 2027;
export const EXAM_BASELINE = "May 2027";

export function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;
  return "http://127.0.0.1:43127";
}

export const SITE_URL = getSiteUrl();

export const DEFAULT_DESCRIPTION =
  "Anannt Education’s Unit 2 (Networks of Exchange) pilot for AP World History: Modern. A lesson, stimulus practice, source-based short response, and delayed check for the May 2027 exam. Independent of the College Board. Not a complete nine-unit course.";

export const OG_TITLE =
  "Anannt AP World History: Modern — Unit 2 mentorship for the 2027 exam";

export const OG_DESCRIPTION =
  "A limited Networks of Exchange loop from Anannt Education: original items, diagnosis-linked practice, and honest local progress. Not a College Board product and not a predicted AP score.";

export const PUBLIC_NAV = [
  { href: "/about", label: "About" },
  { href: "/help", label: "Help" },
] as const;

export const GATED_PREFIXES = [
  "/today",
  "/course",
  "/practice",
  "/writing",
  "/review",
  "/mock-exams",
  "/progress",
  "/mentor",
  "/learn",
] as const;

export function isPublicPath(pathname: string) {
  return (
    pathname === "/" ||
    pathname.startsWith("/help") ||
    pathname.startsWith("/about")
  );
}

export function isOnboardingPath(pathname: string) {
  return pathname.startsWith("/onboarding");
}

export function isGatedPath(pathname: string) {
  return GATED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
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
  const canonical = path || "/";
  return {
    title,
    description,
    alternates: { canonical },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      title: `${title} | ${TITLE_BRAND}`,
      description,
      url: canonical,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${TITLE_BRAND}`,
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
        description:
          "Anannt Education designs original AP World History: Modern curriculum and human-reviewed writing feedback. This site is a limited Unit 2 pilot, independent of the College Board.",
        url,
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
        name: "AP World History: Modern",
        alternateName: PRODUCT_NAME,
        description:
          "Limited Unit 2 (Networks of Exchange) learning loop for the May 2027 AP World History: Modern exam. Original items, source-based short-answer practice, and delayed independent checks. Not a complete self-study course and not official AP scoring.",
        provider: { "@id": `${url}/#organization` },
        educationalLevel: "High school",
        inLanguage: "en",
        isAccessibleForFree: true,
        teaches:
          "AP World History: Modern Unit 2 Networks of Exchange, c. 1200–1450, including sourcing, causation, and comparison for the 2027 exam format.",
        about: [
          {
            "@type": "Thing",
            name: "AP World History: Modern exam",
            description: `Planning baseline ${EXAM_BASELINE}. All three SAQs required and source-based; a single LEQ.`,
          },
          {
            "@type": "Thing",
            name: "Networks of Exchange",
            description: "College Board Unit 2 topic area, c. 1200–1450.",
          },
        ],
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
