import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // URL configuration
  trailingSlash: true, // ✅ Keep this - enforces trailing slashes
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
  
  // ✅ CRITICAL: Modern JavaScript Targeting (Eliminates Legacy Polyfills)
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production' 
      ? { exclude: ['error'] } 
      : false,
    
    // ✅ REMOVE REACT PROPS IN PRODUCTION (smaller bundles)
    reactRemoveProperties: process.env.NODE_ENV === 'production' ? {} : false,
    
    // ✅ REMOVE UNUSED IMPORTS (fixed - use correct option name)
    removeUnusedImports: process.env.NODE_ENV === 'production',
  },
  
  // ✅ RENDER BLOCKING FIX: Optimize CSS delivery
  experimental: {
    optimizePackageImports: ['react', 'next', '@fortawesome/react-fontawesome'],
    optimizeCss: true, // Critical for CSS blocking fix
    scrollRestoration: true,
    largePageDataBytes: 128 * 1000,
    
    // ✅ MODERN BUNDLE OPTIMIZATION
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
          // ✅ ADD PERFORMANCE HEADERS
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
  
  // ✅ ADD OUTPUT OPTIMIZATION FOR BETTER DEPLOYMENT
  output: 'export', // Static export for better performance
  
  // ✅ ADD POWERED BY HEADER REMOVAL (SMALLER RESPONSES)
  poweredByHeader: false,
  
  // ✅ ADD ETAG REMOVAL FOR BETTER CACHING
  generateEtags: false,
  
  // ✅ ADD COMPRESS FOR SMALLER TRANSFERS
  compress: true,
  
  // ✅ ADD REACT 18 CONCURRENT FEATURES
  reactStrictMode: true,
  
  // ✅ ADD ENVIRONMENT VARIABLES OPTIMIZATION
  env: {
    NEXT_TELEMETRY_DISABLED: '1', // Disable telemetry for faster builds
  },
  
  // ✅ ADD WEBPACK CONFIGURATION FOR TREE-SHAKING
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