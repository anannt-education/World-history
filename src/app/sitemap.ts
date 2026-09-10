import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const paths = [
    "/",
    "/about",
    "/help",
    "/onboarding",
    "/course",
    "/course/unit-2",
    "/today",
    "/practice",
    "/writing",
    "/review",
    "/progress",
    "/mock-exams",
    "/learn/unit-2",
  ];
  return paths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === "/" || path === "/about" || path === "/help" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/about" || path === "/help" ? 0.8 : 0.5,
  }));
}
