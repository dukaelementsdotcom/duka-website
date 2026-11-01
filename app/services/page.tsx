// app/services/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { services } from '@/lib/servicesData';
import NavBar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';
import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: "Interior Design & Fit-Out Services in Addis Ababa",
  description: "Interior design, design-and-build, office partitioning, custom furniture, signage, technology and renovation management for workplaces in Addis Ababa.",
  path: "/services/",
});

// Map services to their hero images and pricing
const SERVICE_DATA: Record<string, { image: string; priceHint?: string; badge?: string }> = {
  'interior-design': {
    image: '/images/duka-interiors-portfolio/modern-conference-room-and-lobby-design/modern-conference-room-addis-ababa.webp',
    priceHint: 'From 800 ETB/m²',
  },
  'design-build': {
    image: '/images/duka-interiors-portfolio/dereja-office-interior-partition-work/full-office-interior-fit-out-kazanchis.webp',
    priceHint: 'One quote, one team',
    badge: 'Most Popular',
  },
  'furniture-production': {
    image: '/images/duka-interiors-portfolio/modern-open-interior-design-bole/compact-office-interior-bole.webp',
    priceHint: 'Partitions from 3,000 ETB/m²',
  },
  'branding-signage': {
    image: '/images/duka-interiors-portfolio/schneider-electric-showroom-interior/corporate-showroom-addis-ababa.webp',
    priceHint: 'Logo signs from 4,800 ETB/m²',
  },
  'technology': {
    image: '/images/duka-interiors-portfolio/tech-startup-open-plan-office-addis/start-up-office-interior-design-bole.webp',
    priceHint: 'Data points from 650 ETB each',
  },
  'project-management': {
    image: '/images/duka-interiors-portfolio/vision-fund-microfinance-office-design/CEO-office-design-addis-ababa.webp',
    priceHint: 'Full renovation management',
  },
};

// Process steps
const PROCESS_STEPS = [
  { num: '01', title: 'Consult', desc: 'We visit your space, understand your needs and give you a realistic budget range.' },
  { num: '02', title: 'Design', desc: 'Layouts, 3D visuals and material selection until the design is exactly right.' },
  { num: '03', title: 'Quote', desc: 'One itemised price covering everything. No hidden costs, no surprises.' },
  { num: '04', title: 'Build', desc: 'Our team builds your space while you focus on your business.' },
  { num: '05', title: 'Handover', desc: 'Walk into a finished space, ready for your team to move in.' },
];

export default function ServicesPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Interior Design and Build",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Duka Interiors",
      "url": "https://www.dukainteriors.com"
    },
    "areaServed": { "@type": "City", "name": "Addis Ababa" },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Interior Design Services",
      "itemListElement": services.map((service, index) => ({
        "@type": "Offer",
        "position": index + 1,
        "itemOffered": { "@type": "Service", "name": service.title, "description": service.shortDesc }
      }))
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <NavBar />

      {/* Hero Section with Image */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <Image
          src="/images/duka-interiors-portfolio/corporate-office-interior-finishing-bole/modern-office-open-pool-bole.webp"
          alt="Office interior design by Duka Interiors in Addis Ababa"
          fill
          className="object-cover"
          priority
          quality={75}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-16 w-full">
            <p className="text-red-500 font-black tracking-[0.3em] uppercase text-[10px] mb-4">
              What We Do
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-4">
              Design & Build<br />Services
            </h1>
            <p className="text-white/80 text-lg max-w-xl">
              From first sketch to finished space. One team, one quote, one point of contact.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-black text-white py-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-center text-sm">
            <span className="text-gray-400">Trusted by</span>
            <span className="mx-2 font-bold">Habesha Breweries</span>
            <span className="text-gray-600">•</span>
            <span className="mx-2 font-bold">Schneider Electric</span>
            <span className="text-gray-600">•</span>
            <span className="mx-2 font-bold">Qatar Airways</span>
            <span className="text-gray-600">•</span>
            <span className="mx-2 font-bold">VisionFund</span>
            <span className="text-gray-400 ml-2">and 50+ more</span>
          </p>
        </div>
      </section>

      {/* Services Grid - Visual Cards */}
      <section className="py-20 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-gray-900">
              Our Services
            </h2>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Everything you need to design, build and furnish your workspace in Addis Ababa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const data = SERVICE_DATA[service.slug] || {};
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}/`}
                  className="group relative bg-white overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  {/* Badge */}
                  {data.badge && (
                    <div className="absolute top-4 left-4 z-20 bg-red-600 text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                      {data.badge}
                    </div>
                  )}

                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {data.image ? (
                      <Image
                        src={data.image}
                        alt={`${service.title} by Duka Interiors`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        quality={75}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gray-200" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-black uppercase tracking-tight text-gray-900 group-hover:text-red-600 transition-colors mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                      {service.shortDesc}
                    </p>
                    <div className="flex items-center justify-between">
                      {data.priceHint && (
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                          {data.priceHint}
                        </span>
                      )}
                      <span className="text-red-600 text-sm font-black group-hover:translate-x-1 transition-transform">
                        Learn more →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 px-6 lg:px-12 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <p className="text-red-500 font-black tracking-[0.3em] uppercase text-[10px] mb-4">
              How It Works
            </p>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
              From Concept to Keys
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.num} className="relative">
                {/* Connector line */}
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-1/2 w-full h-[2px] bg-white/20" />
                )}
                <div className="relative z-10 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-red-600 rounded-full flex items-center justify-center text-white font-black text-lg">
                    {step.num}
                  </div>
                  <h3 className="font-black uppercase tracking-tight text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison: Design-Only vs Design+Build */}
      <section className="py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-gray-900">
              Design Only vs Design + Build
            </h2>
            <p className="text-gray-600 mt-2">Which approach fits your project?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Design Only */}
            <div className="border border-gray-200 p-8">
              <h3 className="text-xl font-black uppercase tracking-tight mb-4">Design Only</h3>
              <p className="text-gray-600 text-sm mb-6">
                We design your space, you hire the contractors to build it.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>Floor plans & 3D visuals</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>Material specifications</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>You manage construction</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-0.5">○</span>
                  <span className="text-gray-400">Good if you have a trusted contractor</span>
                </li>
              </ul>
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-2">Starting from</p>
                <p className="text-2xl font-black">800 ETB<span className="text-base font-normal text-gray-500">/m²</span></p>
              </div>
              <Link
                href="/services/interior-design/"
                className="mt-6 block text-center py-3 border-2 border-gray-900 text-gray-900 font-black text-sm uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-colors"
              >
                Learn More
              </Link>
            </div>

            {/* Design + Build */}
            <div className="border-2 border-red-600 p-8 relative">
              <div className="absolute -top-3 left-6 bg-red-600 text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                Recommended
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-4">Design + Build</h3>
              <p className="text-gray-600 text-sm mb-6">
                One team designs and builds. One quote, one point of contact.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>Everything in Design Only</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>We build it for you</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>Fixed itemised quote</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>Site management included</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>Handover ready to use</span>
                </li>
              </ul>
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-2">All-in-one quote</p>
                <p className="text-2xl font-black">Get estimate →</p>
              </div>
              <Link
                href="/services/design-build/"
                className="mt-6 block text-center py-3 bg-red-600 text-white font-black text-sm uppercase tracking-widest hover:bg-red-700 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-12 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4">
            Not sure which service you need?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Tell us about your space and goals. We'll recommend the right approach and give you a realistic budget range — no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact/"
              className="bg-red-600 hover:bg-red-700 text-white font-black py-4 px-8 text-sm uppercase tracking-widest transition-colors"
            >
              Free Consultation
            </Link>
            <Link
              href="/estimate/"
              className="border border-white/30 hover:bg-white hover:text-black text-white font-black py-4 px-8 text-sm uppercase tracking-widest transition-colors"
            >
              Try the Estimator
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
