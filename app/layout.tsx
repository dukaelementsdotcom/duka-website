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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dukainteriors.com"),
  title: {
    template: "%s | Duka Interiors Addis Ababa",
    default: "Duka Interiors | Elite Interior Design & Build in Addis Ababa",
  },
  description: "Duka Interiors: Ethiopia's leading office interior design and construction firm. Specializing in modern fit-outs, technology integration, and furniture production in Addis Ababa.",
  keywords: [
    "Interior Design Addis Ababa", 
    "Office Fit-out Ethiopia", 
    "Office Furniture Addis Ababa", 
    "Furniture Production Ethiopia", // Added
    "Smart Office Technology Addis", // Added
    "Duka Interiors"
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Duka Interiors | Elite Interior Design & Build",
    description: "Premium interior design and turnkey construction services in Addis Ababa, Ethiopia.",
    url: "https://www.dukainteriors.com",
    siteName: "Duka Interiors",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Duka Interiors Project Showcase",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // UPDATED SCHEMA: Using your actual contact details for Google Indexing
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "InteriorDesign",
    "name": "Duka Interiors P.L.C",
    "alternateName": "Duka Interiors",
    "image": "https://www.dukainteriors.com/logo.png", 
    "@id": "https://www.dukainteriors.com",
    "url": "https://www.dukainteriors.com",
    "telephone": "+251940607055", // Updated
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Welelay Building, 5th Floor, Djibouti Street", // Updated
      "addressLocality": "Bole, Addis Ababa",
      "addressRegion": "Addis Ababa",
      "addressCountry": "ET"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 9.00026,
      "longitude": 38.78805
    },
    "hasMap": "https://www.google.com/maps?cid=YOUR_CID_HERE", 
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:30",
        "closes": "18:00" // Updated to 6 PM
      }
    ],
    "sameAs": [
      "https://t.me/dukainteriorsplc", // Updated
      "https://www.instagram.com/dukainteriors"
    ],
    "knowsAbout": [
      "Office Interior Design",
      "Commercial Fit-out",
      "Custom Furniture Production", // Updated
      "IT & Security Infrastructure", // Updated
      "Project Management"
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