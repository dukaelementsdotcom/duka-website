import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ORGANIC SEO METADATA - Focused on "Best in Addis" intent
export const metadata: Metadata = {
  metadataBase: new URL("https://www.dukainteriors.com"),
  title: {
    template: "%s | Duka Interiors Addis Ababa",
    default: "The Best Interior Design Company in Addis Ababa | Duka Interiors",
  },
  description: "Duka Interiors is the best interior design company in Addis Ababa, Ethiopia. Expert office partitioning, professional renovation, and interior decoration since 2015.",
  keywords: [
    "Best interior design company in Addis Ababa",
    "Office partitioning Addis Ababa",
    "Office renovation Ethiopia",
    "Interior decoration Addis Ababa",
    "Furniture production Ethiopia",
    "Duka Interiors Ethiopia"
  ],
  alternates: {
    canonical: "/",
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
        alt: "Duka Interiors - Best Interiors in Addis Ababa",
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
  
  // VERIFIED BUSINESS SCHEMA (Synced with your Google Business Link)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "InteriorDesign",
    "name": "Duka Interiors P.L.C",
    "alternateName": "The Best Interior Design Company in Addis Ababa",
    "image": "https://www.dukainteriors.com/logo.png", 
    "@id": "https://www.dukainteriors.com",
    "url": "https://www.dukainteriors.com",
    "telephone": "+251940607055",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Welela Building, 5th Floor, Djibouti Street",
      "addressLocality": "Bole, Addis Ababa",
      "addressRegion": "Addis Ababa",
      "addressCountry": "ET"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 9.00026,
      "longitude": 38.788051
    },
    "hasMap": "https://maps.google.com/?cid=11124327244819294980&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNl",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "08:00",
        "closes": "17:00"
      }
    ],
    "sameAs": [
      "https://t.me/dukainteriorsplc",
      "https://www.instagram.com/dukainteriors"
    ],
    "knowsAbout": [
      "Office Partitioning Addis Ababa",
      "Office Renovation Ethiopia",
      "Interior Decoration",
      "Custom Furniture Production"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}