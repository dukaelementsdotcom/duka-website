import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalProtection from "./components/GlobalProtection";

// Optimize fonts with next/font
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  preload: true, // Enable preload
  fallback: ['system-ui', 'arial'], // Fallback fonts
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  weight: ['400', '500', '600'],
  preload: false, // Disable preload for secondary font
});

// ✅ FIXED SYNTAX: export const metadata: Metadata (NOT "meta Metadata")
export const metadata: Metadata = {
  metadataBase: new URL("https://www.dukainteriors.com"),
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
    url: "https://www.dukainteriors.com",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const logoPath = "/images/icons-duka-interiors/logo-duka-interiors-big.svg";
  const fullLogoUrl = `https://www.dukainteriors.com${logoPath}`;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.dukainteriors.com/#business",
    "name": "Duka Interiors P.L.C",
    "url": "https://www.dukainteriors.com",
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
    "image": "https://www.dukainteriors.com/og-image.jpg",
    "logo": fullLogoUrl,
    "description": "Ethiopia's leading interior design and office partitioning company in Addis Ababa since 2015. Specializing in commercial office fit-outs, custom furniture production, and design-build services.",
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
    "keywords": "office partitioning Addis Ababa, office renovation Ethiopia, interior design Addis Ababa, custom furniture Ethiopia, design build Addis Ababa",
    "sameAs": [
      "https://t.me/dukainteriorsplc",
      "https://www.instagram.com/dukainteriors",
      "https://www.linkedin.com/company/duka-interiors"
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
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://www.dukainteriors.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for other domains */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />

        {/* Preload critical resources */}
        <link 
          rel="preload" 
          href={logoPath} 
          as="image" 
          type="image/svg+xml"
          crossOrigin="anonymous"
        />
        
        {/* Inline critical CSS for above-the-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS - ensures above-the-fold content renders quickly */
            html { scroll-behavior: smooth; }
            body { margin: 0; font-family: ${geistSans.style.fontFamily}, system-ui, -apple-system, sans-serif; }
            /* Prevent layout shifts */
            img { max-width: 100%; height: auto; }
            /* Hide scrollbar during load */
            html.loading { overflow: hidden; }
          `
        }} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
          defer // Use defer to not block rendering
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          defer
        />

        {/* Viewport settings for better mobile performance */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        
        {/* Theme color for better PWA experience */}
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white text-gray-900`}>
        {/* Loading state handler */}
        <script dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              document.documentElement.classList.remove('loading');
            });
            document.documentElement.classList.add('loading');
          `
        }} />
        
        <GlobalProtection />
        {children}
        
        {/* ✅ UNREGISTER OLD SERVICE WORKER */}
        <script defer dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.getRegistrations().then(registrations => {
                  registrations.forEach(registration => {
                    registration.unregister();
                  });
                });
              });
            }
          `
        }} />
        
        {/* Load non-critical scripts after page load */}
        <script defer src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js"></script>
      </body>
    </html>
  );
}