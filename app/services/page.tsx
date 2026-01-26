// app/services/page.tsx



import Link from 'next/link';
import { services } from '@/lib/servicesData';
import NavBar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />

      {/* Hero Section */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-5 py-2 bg-red-600 text-white rounded-none text-xs font-bold uppercase tracking-wider mb-6">
            Our Services
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Interior Design & Build in Addis Ababa — From Vision to Reality.
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Single-point responsibility. Transparent pricing. Exceptional spaces.
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
                className="block group"
              >
                <div className="relative bg-white border border-gray-200 rounded-none h-full transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden">
                  <div className="p-6 pt-8 flex flex-col h-full">
                    {/* Icon Placeholder (you can add real icons later) */}
                    <div className="flex items-center justify-center mb-4 w-12 h-12 bg-red-50 rounded-full text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
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
                        Learn more →
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