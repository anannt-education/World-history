/** Study host mount contract. Do not invent a second catalog or gate form. */

export const SITE_ORIGIN = "https://study.anannt.ae";
export const BASE_PATH = "/world-history";
export const SUBJECT_SLUG = "world-history";
export const SITE_URL = `${SITE_ORIGIN}${BASE_PATH}`;
export const SESSION_COOKIE = "anannt_study_session";
export const DEV_PORT = 43136;
export const MONEY_PAGE = "https://anannt.ae/ap-world-history-dubai";

export const PUBLIC_LESSONS = [
  {
    id: "unit-2-networks",
    path: "/learn/unit-2",
    unit: "u2",
    title: "Networks of Exchange, c. 1200–1450",
    label: "Networks of Exchange",
  },
  {
    id: "boccaccio-check",
    path: "/review",
    unit: "u2",
    title: "Delayed check: a fresh Boccaccio source",
    label: "A sourced comparison from Unit 2",
  },
] as const;

export const HONESTY =
  "Unit 2 Networks of Exchange. The other eight units are not on this desk.";
export const HONESTY_PILOT = "Unit 2 pilot. Not nine units. Not a mock engine.";
export const QUIET_LINE =
  "If you want a person in the room later, we are at Office 105, Bank Street Building, Burjuman Metro Exit 2. You do not need us to begin.";
export const VOICE =
  "College will hand you a source and wait. Unit 2 is one sitting: a map, a merchant handbook, a check a week later. It is not nine units.";

export const LEGAL = {
  ap: "AP® is a trademark registered by the College Board, which is not affiliated with, and does not endorse, this website.",
  psat: "PSAT/NMSQT® is a registered trademark of the College Board and the National Merit Scholarship Corporation, which are not affiliated with, and do not endorse, this website.",
  supplement:
    "This studio is a self-study supplement. It does not predict an official AP score and is not Bluebook or AP Classroom.",
  nap: "Anannt Education · Office 105, Bank Street Building, Burjuman Metro Exit 2, Dubai · +971 58585 3551 · wecare@anannt.ae",
} as const;

export const EXAM_SITTING = {
  dateLabel: "Thursday 6 May 2027",
  session: "Session 1",
  localTime: "11:00 Dubai (UTC+4)",
} as const;

export function absUrl(path = "/") {
  const p = !path || path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}

export function gateHref(unit = "u2") {
  const url = new URL("/start", SITE_ORIGIN);
  url.searchParams.set("subject", SUBJECT_SLUG);
  if (unit) url.searchParams.set("unit", unit);
  return url.toString();
}

export function waitlistHref(unit = "") {
  const url = new URL("/start", SITE_ORIGIN);
  url.searchParams.set("subject", SUBJECT_SLUG);
  if (unit) url.searchParams.set("unit", unit);
  url.searchParams.set("intent", "waitlist");
  return url.toString();
}

export function whatsappHelpUrl(sku = "doubts") {
  const text = `Hi Anannt Burjuman — I started ${SUBJECT_SLUG} on study.anannt.ae and want help with ${sku}`;
  return `https://wa.me/971585853551?text=${encodeURIComponent(text)}`;
}

export const ROBOTS_DISALLOW = [
  `${BASE_PATH}/mock-exams`,
  `${BASE_PATH}/practice`,
  `${BASE_PATH}/writing`,
  `${BASE_PATH}/today`,
  `${BASE_PATH}/progress`,
  `${BASE_PATH}/mentor`,
  `${BASE_PATH}/onboarding`,
  `${BASE_PATH}/keys`,
  `${BASE_PATH}/api`,
  "/mock-exams",
  "/practice",
  "/writing",
  "/today",
  "/progress",
  "/mentor",
  "/onboarding",
  "/keys",
  "/api",
];

export const GATED_PREFIXES = [
  "/today",
  "/practice",
  "/writing",
  "/mock-exams",
  "/progress",
  "/mentor",
  "/onboarding",
];

export const PUBLIC_EXACT = new Set([
  "/",
  "/about",
  "/help",
  "/exam/2027",
  "/course",
  "/course/unit-2",
  "/learn/unit-2",
  "/review",
]);

export function isPublicPath(pathname: string) {
  const p = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname || "/";
  if (PUBLIC_EXACT.has(p)) return true;
  if (p.startsWith("/learn/unit-2")) return true;
  if (p.startsWith("/help") || p.startsWith("/about") || p.startsWith("/exam")) return true;
  return false;
}

export function isOnboardingPath(pathname: string) {
  return pathname === "/onboarding" || pathname.startsWith("/onboarding/");
}

export function isGatedPath(pathname: string) {
  return GATED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}
