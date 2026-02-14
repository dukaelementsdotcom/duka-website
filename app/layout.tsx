import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalProtection from "./components/GlobalProtection";

// ✅ OPTIMIZED FONT LOADING STRATEGY
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap', // ✅ Prevents FOUC (Flash of Unstyled Text)
  weight: ['400', '500', '600', '700', '800', '900'],
  preload: true, // ✅ Preload critical font
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  weight: ['400', '500', '600'],
  preload: false, // ✅ Don't preload non-critical font
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dukainteriors.com"), // ✅ FIXED: Removed trailing spaces
  title: {
    template: "%s | Duka Interiors Addis Ababa",
    default: "The Best Interior Design Company in Addis Ababa Ethiopia | Duka Interiors",
  },
  description: "Duka Interiors is Ethiopia's leading interior design company in Addis Ababa. Expert office partitioning, renovation, and custom furniture production since 2015.",
  icons: {
    icon: "/images/icons-duka-interiors/logo-duka-interiors-big.svg",
    apple: "/images/icons-duka-interiors/logo-duka-interiors-big.svg",
  },
  keywords: [
    "office partitioning Addis Ababa",
    "office renovation Ethiopia",
    "interior design Addis Ababa", 
    "custom furniture Ethiopia",
    "design build Addis Ababa",
    "Duka Interiors"
  ],
  openGraph: {
    title: "The Best Interior Design Company in Addis Ababa Ethiopia | Duka Interiors",
    description: "Ethiopia's leading firm for office partitioning, renovation, and professional interior decoration in Addis Ababa since 2015.",
    url: "https://www.dukainteriors.com", // ✅ FIXED: Removed trailing spaces
    siteName: "Duka Interiors",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Duka Interiors - Office Design Experts in Addis Ababa",
      },
    ],
    locale: "en_ET",
    type: "website",
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: '#ffffff',
  // ✅ ADD PERFORMANCE HEADERS
  other: {
    'referrer-policy': 'strict-origin-when-cross-origin',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const logoPath = "/images/icons-duka-interiors/logo-duka-interiors-big.svg";
  const fullLogoUrl = `https://www.dukainteriors.com${logoPath}`; // ✅ FIXED: Removed trailing spaces

  const localBusinessSchema = {
    "@context": "https://schema.org", // ✅ FIXED: Removed trailing spaces
    "@type": "LocalBusiness",
    "@id": "https://www.dukainteriors.com/#business", // ✅ FIXED
    "name": "Duka Interiors P.L.C",
    "url": "https://www.dukainteriors.com", // ✅ FIXED
    "telephone": "+251940607055",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Welelay Building, 5th Floor, Office 507, Djibouti Street",
      "addressLocality": "Bole",
      "addressRegion": "Addis Ababa",
      "postalCode": "1000",
      "addressCountry": "ET"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 9.00026,
      "longitude": 38.78805
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "08:30",
        "closes": "18:00"
      }
    ],
    "priceRange": "$$$",
    "image": "https://www.dukainteriors.com/og-image.jpg", // ✅ FIXED
    "logo": fullLogoUrl,
    "description": "Ethiopia's leading interior design and office partitioning company in Addis Ababa since 2015. Specializing in commercial office fit-outs, custom furniture production, and design-build services.",
    "areaServed": ["Addis Ababa", "Ethiopia"],
    "hasMap": "https://maps.app.goo.gl/FNBrMacYUefLEH7k8", // ✅ FIXED
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+251940607055",
      "contactType": "customer service",
      "areaServed": "ET",
      "availableLanguage": ["English", "Amharic"]
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 9.00026,
        "longitude": 38.78805
      },
      "geoRadius": "25000"
    },
    "keywords": "office partitioning Addis Ababa, office renovation Ethiopia, interior design Addis Ababa, custom furniture Ethiopia, design build Addis Ababa",
    "sameAs": [
      "https://t.me/dukainteriorsplc", // ✅ FIXED
      "https://www.instagram.com/dukainteriors", // ✅ FIXED
      "https://www.linkedin.com/company/duka-interiors" // ✅ FIXED
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org", // ✅ FIXED
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.dukainteriors.com" // ✅ FIXED
    }]
  };

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* ✅ CRITICAL PERFORMANCE: Preconnect to essential origins */}
        <link rel="preconnect" href="https://www.dukainteriors.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://googleusercontent.com" />
        
        {/* ✅ CRITICAL CSS: Inline critical above-the-fold styles */}
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --primary: #e53935;
            --secondary: #212121;
            --background: #ffffff;
          }
          body {
            margin: 0;
            font-family: var(--font-geist-sans);
            background-color: var(--background);
            color: var(--secondary);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          * {
            box-sizing: border-box;
          }
          /* Prevent layout shift on font load */
          html {
            font-display: swap;
          }
        ` }} />
        
        {/* ✅ DEFER NON-CRITICAL CSS */}
        <link 
          rel="stylesheet" 
          href="/styles/non-critical.css" 
          media="print" 
          onLoad="this.media='all'" 
          referrerPolicy="strict-origin-when-cross-origin"
        />
        
        {/* Schema markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema)
          }}
        />
        
        {/* ✅ PERFORMANCE: DNS prefetch for secondary resources */}
        <link rel="dns-prefetch" href="https://www.dukainteriors.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body>
        <GlobalProtection />
        {children}
      </body>
    </html>
  );
}