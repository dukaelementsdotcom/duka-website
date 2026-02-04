import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalProtection from "./components/GlobalProtection";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  weight: ['400', '500', '600'],
});

// ✅ FIXED SYNTAX: export const metadata: Metadata (NOT "me ta Metadata")
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
  // ✅ FIXED: Added viewport configuration for better accessibility
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  // ✅ FIXED: Added theme color for better mobile experience
  themeColor: '#ffffff',
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* ✅ FIXED: Preconnect to own domain for faster DNS lookup */}
        <link rel="preconnect" href="https://www.dukainteriors.com" />
        
        {/* ✅ FIXED: Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* ✅ FIXED: Preload critical fonts */}
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800;900&display=swap" 
          as="style" 
        />
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&display=swap" 
          as="style" 
        />
        
        {/* ✅ FIXED: Schema markup with proper URLs (no extra spaces) */}
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
      </head>
      <body>
        <GlobalProtection />
        {children}
      </body>
    </html>
  );
}