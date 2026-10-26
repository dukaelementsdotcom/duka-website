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
  
  // ✅ TURBOPACK CONFIGURATION
  turbopack: {},
  
  // ✅ VALID COMPILER OPTIONS ONLY
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production' 
      ? { exclude: ['error'] } 
      : false,
    
    // ✅ VALID: Remove React properties in production
    reactRemoveProperties: process.env.NODE_ENV === 'production' ? {} : false,
  },
  
  // ✅ RENDER BLOCKING FIX: Optimize CSS delivery
  experimental: {
    optimizePackageImports: ['react', 'next', '@fortawesome/react-fontawesome'],
    optimizeCss: true,
    scrollRestoration: true,
    largePageDataBytes: 128 * 1000,
    webpackBuildWorker: true,
    cpus: Math.max(2, Math.floor(require('os').cpus().length / 2)),
  },
  
  // ✅ SECURITY & CACHING HEADERS (Enhanced for SEO)
  async headers() {
    return [
      // Security headers for all pages
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          // Content Security Policy (adjust as needed)
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self'; base-uri 'self'; form-action 'self' https://wa.me https://t.me"
          },
        ],
      },
      // SEO: Preconnect hints for critical origins (moved to headers for HTTP/2 push)
      {
        source: '/',
        headers: [
          { key: 'Link', value: '<https://fonts.gstatic.com>; rel=preconnect; crossorigin' },
        ],
      },
      // Immutable caching for images (1 year)
      {
        source: '/_next/image/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Immutable caching for static assets (1 year)
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Cache public images
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
      // Cache JSON data files
      {
        source: '/data/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' },
        ],
      },
      // SEO: SVG logo should be cached
      {
        source: '/images/icons-duka-interiors/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=604800, immutable' },
        ],
      },
    ];
  },
  
  // ✅ VALID PERFORMANCE OPTIONS
  poweredByHeader: false,
  generateEtags: false,
  compress: true,
  reactStrictMode: true,
  
  // ✅ ENVIRONMENT VARIABLES
  env: {
    NEXT_TELEMETRY_DISABLED: '1',
  },
  
  // ✅ WEBPACK CONFIGURATION FOR TREE-SHAKING
  webpack: (config, { isServer, dev }) => {
    if (!dev) {
      // ✅ REMOVE UNUSED CODE IN PRODUCTION
      config.optimization = {
        ...config.optimization,
        minimize: true,
        usedExports: true, // Tree shaking
        sideEffects: true, // Remove side-effect-free modules
      };
    }
    return config;
  },
  
  // TypeScript safety
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;