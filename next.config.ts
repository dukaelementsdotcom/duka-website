import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. THE FIX: Ensures /services/design-and-build/ always works
  trailingSlash: true,
  
  // 2. Clean up URLs
  skipTrailingSlashRedirect: false,
  
  // 3. OPTIMIZED IMAGE CONFIGURATION
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
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // ✅ FIXED: Add experimental optimizations to reduce legacy JS and unused JS
  experimental: {
    optimizePackageImports: [
      'react',
      'next',
      '@fortawesome/react-fontawesome'
    ]
  }
};

export default nextConfig;