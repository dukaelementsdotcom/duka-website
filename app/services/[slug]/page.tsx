// app/services/[slug]/page.tsx

import { services } from '@/lib/servicesData';
import NavBar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import React, { use } from 'react';
import type { Metadata } from 'next';

// 1. Tell Next.js which paths to pre-render at build time
export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

// 2. DYNAMIC METADATA: Each service gets unique, natural title and description
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const service = services.find((s) => s.slug === resolvedParams.slug);
  
  if (!service) return { title: "Service Not Found" };

  // Create unique meta description from service data
  const metaDescription = `${service.shortDesc} ${service.title} services by Duka Interiors in Addis Ababa, Ethiopia. Professional solutions for your commercial space.`;

  return {
    title: `${service.title} Services in Addis Ababa | Duka Interiors`,
    description: metaDescription,
    keywords: [
      `${service.title.toLowerCase()} Addis Ababa`,
      `${service.title.toLowerCase()} Ethiopia`,
      `interior design Addis Ababa`,
      `office renovation Ethiopia`,
      `Duka Interiors ${service.slug}`
    ],
    alternates: {
      canonical: `https://www.dukainteriors.com/services/${resolvedParams.slug}`,
    },
  };
}

// IMPORTANT: Force a 404 for any slug NOT in the list
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ServiceDetail({ params }: PageProps) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-4">404</h1>
          <p className="text-gray-600 mb-8 uppercase tracking-widest text-xs">
            Service not found.
          </p>
          <Link
            href="/services"
            aria-label="Back to all services"
            className="bg-black text-white px-8 py-3 font-black uppercase text-xs tracking-widest hover:bg-red-600 transition-colors"
          >
            ← Back to Services
          </Link>
        </div>
      </div>
    );
  }

  // DYNAMIC SERVICE SCHEMA for AI Search Models (FIXED TRAILING SPACES)
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${service.title} Services in Addis Ababa`,
    "description": service.longDesc,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Duka Interiors P.L.C",
      "url": "https://www.dukainteriors.com"
    },
    "areaServed": {
      "@type": "City",
      "name": "Addis Ababa"
    },
    "serviceType": service.title,
    "offers": {
      "@type": "Offer",
      "businessFunction": "ProvideService",
      "areaServed": "ET"
    }
  };

  // Format breadcrumb text naturally
  const breadcrumbText = service.title
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  return (
    <div className="min-h-screen bg-white selection:bg-red-600 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <NavBar />

      <main className="pt-24 md:pt-32">
        {/* --- SERVICE HERO HEADER --- */}
        <section className="py-12 px-4 md:px-12 bg-gray-50 border-b border-gray-100">
          <div className="max-w-5xl mx-auto">
            <div className="inline-block px-5 py-2 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              Services / {breadcrumbText}
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-gray-900 leading-[0.85] tracking-tighter uppercase mb-8">
              {service.title}
            </h1>
            <div className="h-1 w-20 bg-black mb-8"></div>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl font-medium leading-tight italic">
              {service.shortDesc}
            </p>
          </div>
        </section>

        {/* --- MAIN CONTENT SECTION --- */}
        <section className="py-20 px-4 md:px-12 max-w-5xl mx-auto">
          <div className="text-gray-800 leading-relaxed">
            <p className="text-lg md:text-xl mb-16 font-light text-gray-700 border-l-4 border-red-600 pl-8 py-2">
              {service.longDesc}
            </p>

            {/* DYNAMIC PROCESS STEPS */}
            {service.processSteps && (
              <div className="mb-24">
                <div className="flex items-center gap-4 mb-12">
                  <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter shrink-0">
                    <span className="text-red-600 italic">01.</span> Our Process
                  </h2>
                  <div className="h-px bg-gray-200 w-full"></div>
                </div>

                <div className="flex flex-col gap-6">
                  {service.processSteps.map((step, i) => (
                    <ProcessStep key={i} index={i + 1} step={step} />
                  ))}
                </div>
              </div>
            )}

            {/* WHY CHOOSE US: BRUTALIST GRID */}
            {service.whyChooseUs && (
              <div className="mb-24">
                <div className="flex items-center gap-4 mb-12">
                  <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter shrink-0">
                    <span className="text-red-600 italic">02.</span> Why Choose Us
                  </h2>
                  <div className="h-px bg-gray-200 w-full"></div>
                </div>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.whyChooseUs.map((reason, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-4 text-gray-900 font-black uppercase text-[10px] tracking-widest bg-gray-50 p-6 border border-gray-100 hover:border-red-600 transition-colors group"
                    >
                      <span className="w-2 h-2 bg-red-600 mt-0.5 group-hover:scale-150 transition-transform" aria-hidden="true"></span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* FINAL CTA SECTION */}
          <div className="mt-12 py-16 border-t-2 border-black flex flex-col md:flex-row gap-6 justify-between items-center bg-white">
            <div className="text-center md:text-left">
              <h4 className="text-xl font-black uppercase tracking-tighter mb-1">
                Ready to start?
              </h4>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">
                Free consultation for your next project
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Link
                href="/contact"
                aria-label="Schedule a free consultation for your project"
                className="inline-block bg-red-600 hover:bg-black text-white font-black py-5 px-10 rounded-none text-[10px] uppercase tracking-[0.3em] transition-all text-center shadow-xl hover:-translate-y-1"
              >
                Get a Free Consultation
              </Link>
              <Link
                href="/projects"
                aria-label="View our portfolio of completed projects"
                className="inline-block border-2 border-black text-black font-black py-5 px-10 rounded-none text-[10px] uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all text-center"
              >
                View Our Projects
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ProcessStep({
  index,
  step,
}: {
  index: number;
  step: { title: string; description: string };
}) {
  return (
    <div className="group flex items-start gap-8 p-8 bg-white border border-gray-100 hover:shadow-2xl hover:border-red-600/20 transition-all duration-500">
      <div className="flex-shrink-0 w-16 h-16 bg-black text-white flex items-center justify-center text-xl font-black group-hover:bg-red-600 transition-colors duration-500" aria-hidden="true">
        {index < 10 ? `0${index}` : index}
      </div>

      <div className="flex-grow">
        <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter mb-3 group-hover:text-red-600 transition-colors">
          {step.title}
        </h3>
        <p className="text-gray-600 leading-relaxed text-sm md:text-base max-w-2xl">
          {step.description}
        </p>
      </div>
    </div>
  );
}