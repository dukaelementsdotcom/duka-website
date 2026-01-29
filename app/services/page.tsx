// app/services/page.tsx

import Link from 'next/link';
import { services } from '@/lib/servicesData';
import NavBar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';
import type { Metadata } from 'next';

// ✅ FIXED: Added CORRECT canonical URL (critical for GMB migration)
export const metadata: Metadata = {
  title: "Explore Our Interior Design Services in Addis Ababa",
  description: "Expert office partitioning, office renovation, and interior decoration services in Addis Ababa, Ethiopia. Professional design and construction for commercial spaces.",
  keywords: [
    "interior design Addis Ababa",
    "office partitioning Ethiopia",
    "office renovation Addis Ababa",
    "interior decoration Ethiopia",
    "design and build Addis Ababa",
    "commercial interior design",
    "Duka Interiors services"
  ],
  // ✅ CRITICAL FIX: Canonical URL MUST match page URL exactly
  alternates: {
    canonical: "https://www.dukainteriors.com/services"
  },
};

export default function ServicesPage() {
  // ✅ FIXED: Removed trailing spaces in Schema.org URLs
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Interior Design and Build",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Duka Interiors",
      "url": "https://www.dukainteriors.com"
    },
    "areaServed": {
      "@type": "City",
      "name": "Addis Ababa"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Interior Design Services",
      "itemListElement": services.map((service, index) => ({
        "@type": "Offer",
        "position": index + 1,
        "itemOffered": {
          "@type": "Service",
          "name": service.title,
          "description": service.shortDesc
        }
      }))
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <NavBar />

      {/* Hero Section */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-5 py-2 bg-red-600 text-white rounded-none text-xs font-bold uppercase tracking-wider mb-6">
            Our Expertise
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Professional Interior Design & Build <br className="hidden md:block" /> Services in Addis Ababa.
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert office partitioning, office renovation, and interior decoration services in Addis Ababa, Ethiopia. Delivering high-quality commercial spaces for over 10 years.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                aria-label={`Learn about ${service.title} services in Addis Ababa`}
                className="block group"
              >
                <div className="relative bg-white border border-gray-200 rounded-none h-full transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden">
                  <div className="p-6 pt-8 flex flex-col h-full">
                    <div className="flex items-center justify-center mb-4 w-12 h-12 bg-red-50 rounded-full text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors" aria-hidden="true">
                      <span className="font-bold text-lg">★</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 text-center group-hover:text-red-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm text-center mb-4 flex-grow">
                      {service.shortDesc}
                    </p>
                    <div className="text-center">
                      <span className="inline-block text-red-600 font-bold text-xs uppercase tracking-wide group-hover:underline">
                        {service.linkText}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}