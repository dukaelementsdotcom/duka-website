import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. THE FIX: Ensures /services/design-and-build/ always works
  // and matches the production server's folder structure.
  trailingSlash: true,
  
  // 2. Clean up URLs by removing the .html extension in production
  skipTrailingSlashRedirect: false,
  
  // 3. OPTIMIZED IMAGE CONFIGURATION - BETTER COMPRESSION
  images: {
    // Only allow your own domain + trusted CDNs
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
    // Limit maximum image size to prevent oversized images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Enable WebP format for better compression
    formats: ['image/webp', 'image/avif'],
    // Minimum cache time for optimized images
    minimumCacheTTL: 60,
  },
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;