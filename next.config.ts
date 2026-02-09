import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Ensures /services/design-and-build/ always works
  trailingSlash: true,
  
  // 2. Clean up URLs
  skipTrailingSlashRedirect: false,
  
  // 3. OPTIMIZED IMAGE CONFIGURATION FOR WEBP
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
    // Optimized sizes for mobile
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 64, 96, 128],
    // formats: ['image/webp'], // Remove this line in Next.js 16
    // quality: 70, // Remove this line in Next.js 16
  },
  
  // 4. Enable compression - This is valid
  compress: true,
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;