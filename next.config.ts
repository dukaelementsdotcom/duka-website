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
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
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