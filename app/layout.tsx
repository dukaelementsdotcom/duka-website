import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// IMPORT THE PROTECTOR
import GlobalProtection from "./components/GlobalProtection";

// OPTIMIZED FONT IMPORTS WITH font-display: swap
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap', // Ensures text is visible during font load
  weight: ['400', '500', '600', '700', '800', '900'], // Only load needed weights
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap', // Ensures text is visible during font load
  weight: ['400', '500', '600'], // Only load needed weights
});

// UPDATED METADATA WITH CORRECT LOGO PATH (FIXED TRAILING SPACES)
export const metadata: Metadata = {
  metadataBase: new URL("https://www.dukainteriors.com"),
  title: {
    template: "%s | Duka Interiors Addis Ababa",
    default: "The Best Interior Design Company in Addis Ababa | Duka Interiors",
  },
  description: "Duka Interiors is the best interior design company in Addis Ababa, Ethiopia. Expert office partitioning, professional renovation, and interior decoration since 2015.",
  icons: {
    icon: "/images/icons-duka-interiors/logo-duka-interiors-big.svg",
    apple: "/images/icons-duka-interiors/logo-duka-interiors-big.svg",
  },
  keywords: [
    "Best interior design company in Addis Ababa",
    "Office partitioning Addis Ababa",
    "Office renovation Ethiopia",
    "Interior decoration Addis Ababa",
    "Best interior designers in Ethiopia",
    "Duka Interiors"
  ],
  alternates: {
    canonical: "https://www.dukainteriors.com",
  },
  openGraph: {
    title: "The Best Interior Design Company in Addis Ababa | Duka Interiors",
    description: "Ethiopia's leading firm for office partitioning, renovation, and professional interior decoration in Addis Ababa.",
    url: "https://www.dukainteriors.com",
    siteName: "Duka Interiors",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Duka Interiors - Best Interior Design in Addis Ababa",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // CORRECTED LOGO PATH FOR BROWSER/AI CRAWLERS (FIXED TRAILING SPACES)
  const logoPath = "/images/icons-duka-interiors/logo-duka-interiors-big.svg";
  const fullLogoUrl = `https://www.dukainteriors.com${logoPath}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "InteriorDesign",
    "name": "Duka Interiors P.L.C",
    "alternateName": "The Best Interior Design Company in Addis Ababa",
    "logo": {
      "@type": "ImageObject",
      "url": fullLogoUrl
    },
    "image": fullLogoUrl, 
    "@id": "https://www.dukainteriors.com",
    "url": "https://www.dukainteriors.com",
    "telephone": "+251940607055",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Welelay Building, 5th Floor, Djibouti Street",
      "addressLocality": "Bole, Addis Ababa",
      "addressRegion": "Addis Ababa",
      "addressCountry": "ET"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 9.00026,
      "longitude": 38.78805
    },
    "hasMap": "http://googleusercontent.com/maps.google.com/9", 
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "08:30",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://t.me/dukainteriorsplc",
      "https://www.instagram.com/dukainteriors",
      "https://www.linkedin.com/company/duka-interiors"
    ],
    "knowsAbout": [
      "Office Partitioning Addis Ababa",
      "Office Renovation Ethiopia",
      "Interior Decoration in Addis Ababa",
      "Custom Furniture Production"
    ]
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "The Best Interior Design Company in Addis Ababa",
      "item": "https://www.dukainteriors.com"
    }]
  };

  return (
    <html lang="en">
      <head>
        {/* CRITICAL PERFORMANCE OPTIMIZATION - PRECONNECT */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://maps.googleapis.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />

        {/* REMOVED FONTAWESOME CDN - NOW USING TREE-SHAKEN ICONS */}
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* THIS COMPONENT PROTECTS ALL IMAGES WITHOUT BREAKING THE BUILD */}
        <GlobalProtection />
        
        {children}
      </body>
    </html>
  );
}