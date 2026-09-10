import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/world-history",
  trailingSlash: false,
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
