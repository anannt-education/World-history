import type { MetadataRoute } from "next";
import { absUrl } from "@/lib/mount";

const PUBLIC_PATHS = [
  "/",
  "/about",
  "/help",
  "/exam/2027",
  "/course",
  "/course/unit-2",
  "/learn/unit-2",
  "/review",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PUBLIC_PATHS.map((path) => ({
    url: absUrl(path),
    lastModified,
    changeFrequency: path === "/" || path === "/about" || path === "/help" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/learn/unit-2" || path === "/review" ? 0.9 : 0.7,
  }));
}
