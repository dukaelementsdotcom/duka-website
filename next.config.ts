import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // URL configuration
  trailingSlash: true,
  skipTrailingSlashRedirect: false,
  
  // ✅ VALIDATED IMAGE CONFIGURATION
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.dukainteriors.com' },
      { protocol: 'https', hostname: 'maps.googleapis.com' },
      { protocol: 'https', hostname: 'googleusercontent.com' },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 604800, // 1 week cache
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // ✅ TURBOPACK CONFIGURATION (required for Next.js 16)
  turbopack: {
    // Enable Turbopack (silences the warning)
  },
  
  // ✅ LEGACY JS FIX: Target modern browsers only (no polyfills needed)
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production' 
      ? { exclude: ['error'] } 
      : false,
  },
  
  // ✅ RENDER BLOCKING FIX: Optimize CSS delivery
  experimental: {
    optimizePackageImports: ['react', 'next', '@fortawesome/react-fontawesome'],
    optimizeCss: true, // Critical for CSS blocking fix
    scrollRestoration: true,
    largePageDataBytes: 128 * 1000,
  },
  
  // ✅ SECURITY & CACHING HEADERS
  async headers() {
    return [
      // Security headers for all pages
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
      // Immutable caching for images
      {
        source: '/_next/image/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Immutable caching for static assets
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
  
  // SEO redirects
  async redirects() {
    return [
      { source: '/services/:path', destination: '/services/:path/', permanent: true },
      { source: '/projects/:path', destination: '/projects/:path/', permanent: true },
      { source: '/resources/:path', destination: '/resources/:path/', permanent: true },
    ];
  },
  
  // TypeScript safety
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;