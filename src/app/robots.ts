import type { MetadataRoute } from "next";
import { BASE_PATH, ROBOTS_DISALLOW, SITE_ORIGIN, absUrl } from "@/lib/mount";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          `${BASE_PATH}$`,
          `${BASE_PATH}/`,
          `${BASE_PATH}/learn/unit-2`,
          `${BASE_PATH}/review`,
          `${BASE_PATH}/exam/2027`,
          `${BASE_PATH}/course`,
          `${BASE_PATH}/about`,
          `${BASE_PATH}/help`,
          "/learn/unit-2",
          "/review",
          "/exam/2027",
          "/course",
          "/about",
          "/help",
        ],
        disallow: ROBOTS_DISALLOW,
      },
    ],
    sitemap: absUrl("/sitemap.xml"),
    host: SITE_ORIGIN,
  };
}
