import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // This will let the build finish even if there are type warnings
    ignoreBuildErrors: true,
  },
  eslint: {
    // This prevents linting errors from stopping the build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;