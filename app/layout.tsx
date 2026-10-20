import type { Metadata, Viewport } from "next";
import { SITE_URL } from "@/lib/seo";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
// Font Awesome: ship its CSS with the page instead of injecting it at runtime,
// so icons render at the right size on first paint (no flash of giant icons).
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config as faConfig } from "@fortawesome/fontawesome-svg-core";
faConfig.autoAddCss = false;
import GlobalProtection from "./components/GlobalProtection";

// Self-hosted Geist fonts (no Google Fonts request at build or runtime)
const geistSans = GeistSans;
const geistMono = GeistMono;

const HOME_TITLE = "Interior Design & Office Fit-Out in Addis Ababa | Duka Interiors";
const HOME_DESCRIPTION =
  "Design-and-build interior firm in Addis Ababa since 2015. Office partitioning, renovation, fit-out and custom furniture for companies across Ethiopia.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Duka Interiors",
    default: HOME_TITLE,
  },
  description: HOME_DESCRIPTION,
  icons: {
    icon: "/images/icons-duka-interiors/logo-duka-interiors-big.svg",
    apple: "/images/icons-duka-interiors/logo-duka-interiors-big.svg",
  },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    siteName: "Duka Interiors",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Duka Interiors - office design and build in Addis Ababa",
      },
    ],
    locale: "en_ET",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const logoPath = "/images/icons-duka-interiors/logo-duka-interiors-big.svg";
  const fullLogoUrl = `https://www.dukainteriors.com${logoPath}`;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.dukainteriors.com/#business",
    "name": "Duka Interiors P.L.C",
    "url": "https://www.dukainteriors.com",
    "telephone": "+251940607055",
    "email": "contact@dukainteriors.com",
    "foundingDate": "2015",
    "founder": [
      { "@type": "Person", "name": "Dagmawi Tilahun" },
      { "@type": "Person", "name": "Henok Teshome" }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Djibouti Street, Welela Building, 5th Floor, Suite 507",
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
    "image": "https://www.dukainteriors.com/og-image.jpg",
    "logo": fullLogoUrl,
    "description": "Interior design and office partitioning company in Addis Ababa since 2015, specializing in commercial office fit-outs, custom furniture production, and design-build services.",
    "areaServed": ["Addis Ababa", "Ethiopia"],
    "hasMap": "https://maps.app.goo.gl/FNBrMacYUefLEH7k8",
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
    "sameAs": [
      "https://t.me/dukainteriorsplc",
      "https://www.instagram.com/dukainteriors",
      "https://www.linkedin.com/company/duka-interiors",
      "https://www.facebook.com/dukainteriors",
      "https://www.tiktok.com/@duka.interiors.plc"
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.dukainteriors.com"
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
          html {
            font-display: swap;
          }
        ` }} />
        
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
        
        {/* ✅ PERFORMANCE: DNS prefetch */}
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