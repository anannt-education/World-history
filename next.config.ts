import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js 16 blocks Turbopack/HMR dev resources unless the browser origin
  // is allowed. Without this, http://127.0.0.1:43127 never hydrates, so the
  // client never leaves the SSR "Restoring your study record…" screen.
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
