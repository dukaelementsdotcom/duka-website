import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Ensures /services/design-and-build/ always works
  trailingSlash: true,
  
  // 2. Clean up URLs
  skipTrailingSlashRedirect: false,
  
  // 3. BASIC IMAGE CONFIGURATION
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.dukainteriors.com',
      },
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'googleusercontent.com',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 64, 96, 128],
  },
  
  // 4. Enable compression
  compress: true,
  
  // 5. REMOVED eslint config - it's causing warnings
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;