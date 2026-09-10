import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { GATED_PREFIXES, SESSION_COOKIE, gateHref } from "@/lib/mount";

function isGated(pathname: string) {
  return GATED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (request.cookies.get(SESSION_COOKIE)?.value) {
    return NextResponse.next();
  }
  if (!isGated(pathname)) {
    return NextResponse.next();
  }
  return NextResponse.redirect(gateHref("u2"));
}

export const config = {
  matcher: [
    "/today",
    "/today/:path*",
    "/practice",
    "/practice/:path*",
    "/writing",
    "/writing/:path*",
    "/mock-exams",
    "/mock-exams/:path*",
    "/progress",
    "/progress/:path*",
    "/mentor",
    "/mentor/:path*",
    "/onboarding",
    "/onboarding/:path*",
  ],
};
