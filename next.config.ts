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
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dukainteriors.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'googleusercontent.com',
        pathname: '/**',
      },
    ],
    // Optimized for mobile-first: Smaller device sizes for mobile
    deviceSizes: [320, 420, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // AVIF first for best compression (then WebP as fallback)
    formats: ['image/avif', 'image/webp'],
    // Adjust cache TTL for better CDN performance
    minimumCacheTTL: 3600, // Increased to 1 hour
    disableStaticImages: false,
    // Optimize image loading
    loader: 'default',
    loaderFile: '',
    // Content Security Policy for images
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // 4. SWC COMPILER OPTIMIZATIONS - REDUCE JS BUNDLE SIZE
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // 5. ESMODULES OPTIMIZATION - BETTER TREE SHAKING
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/free-brands-svg-icons',
      '@fortawesome/react-fontawesome',
      'react',
      'react-dom',
      'next',
    ],
  },

  // 6. HEADERS FOR PERFORMANCE & SECURITY
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
      // Cache images aggressively
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      // Cache static assets
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  },

  // 7. REDIRECTS FOR SEO & USER EXPERIENCE
  async redirects() {
    return [
      {
        source: '/services/design-and-build',
        destination: '/services/design-build/',
        permanent: true,
      },
      {
        source: '/services/office-design',
        destination: '/services/design-build/',
        permanent: true,
      },
      {
        source: '/interior-design-addis-ababa',
        destination: '/services/',
        permanent: true,
      },
      {
        source: '/office-partitioning-addis-ababa',
        destination: '/services/',
        permanent: true,
      },
    ];
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false, // Changed to false to catch errors
  },

  // 8. WEBPACK OPTIMIZATIONS
  webpack: (config, { isServer }) => {
    // Optimize bundle splitting
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            name: 'framework',
            test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
            priority: 40,
            enforce: true,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const match = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
              if (!match) return 'vendor';
              const packageName = match[1];
              return `npm.${packageName.replace('@', '')}`;
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
        },
      };
    }

    return config;
  },
};

export default nextConfig;