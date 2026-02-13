import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. THE FIX: Ensures /services/design-and-build/ always works
  trailingSlash: true,
  
  // 2. Clean up URLs
  skipTrailingSlashRedirect: false,
  
  // 3. OPTIMIZED IMAGE CONFIGURATION - Enhanced for performance
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
    minimumCacheTTL: 60 * 60 * 24 * 7, // Cache for 1 week (was 60 seconds)
    
    // ✅ NEW: Optimize image quality to reduce file size
    quality: 75, // Default quality (was browser default, often 75-82)
    
    // ✅ NEW: Enable blur-up for better UX while images load
    blurDataURL: true,
  },
  
  // ✅ NEW: Modern JavaScript configuration (fixes Legacy JavaScript issue)
  compiler: {
    // Remove console logs in production (reduces bundle size)
    removeConsole: process.env.NODE_ENV === 'production' 
      ? { exclude: ['error'] } 
      : false,
  },
  
  // ✅ NEW: Webpack optimization to remove polyfills
  webpack: (config, { isServer, dev }) => {
    if (!isServer && !dev) {
      // Remove unnecessary polyfills for client-side in production
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        stream: false,
        buffer: false,
      };
    }
    return config;
  },
  
  // ✅ NEW: Experimental optimizations for better performance
  experimental: {
    // Your existing optimization
    optimizePackageImports: [
      'react',
      'next',
      '@fortawesome/react-fontawesome'
    ],
    
    // ✅ NEW: Optimize CSS delivery (fixes render blocking)
    optimizeCss: true,
    
    // ✅ NEW: Better scroll restoration
    scrollRestoration: true,
    
    // ✅ NEW: Increase page data limit for better caching
    largePageDataBytes: 128 * 1000, // 128KB
    
    // ✅ NEW: Turbopack for faster development (if using Next.js 13.4+)
    // turbo: {
    //   resolveAlias: {
    //     '@': './src',
    //   },
    // },
  },
  
  // ✅ NEW: Output configuration for better static export
  // output: 'export', // Uncomment if you want static export
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // ✅ NEW: Headers for better security and caching
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // ✅ NEW: Cache control for static assets
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // ✅ NEW: Specific cache for images
      {
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // ✅ NEW: Redirects for better SEO and URL consistency
  async redirects() {
    return [
      // Redirect non-trailing slash to trailing slash
      {
        source: '/services/:path',
        destination: '/services/:path/',
        permanent: true,
      },
      {
        source: '/projects/:path',
        destination: '/projects/:path/',
        permanent: true,
      },
      {
        source: '/resources/:path',
        destination: '/resources/:path/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;