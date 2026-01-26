import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. THE FIX: Ensures /services/design-and-build/ always works 
  // and matches the production server's folder structure.
  trailingSlash: true,

  // 2. Clean up URLs by removing the .html extension in production
  skipTrailingSlashRedirect: false,

  // 3. Image Optimization: Allows Next.js to optimize images from your own domain
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows images from any secure source
      },
    ],
  },

  typescript: {
    // Keep this if you want to skip type checks for faster deploys
    ignoreBuildErrors: true,
  },
  eslint: {
    // Keep this to skip linting during build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;