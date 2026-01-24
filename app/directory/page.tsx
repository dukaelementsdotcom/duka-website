// app/sitemap/page.tsx
'use client';

import Link from 'next/link';
import NavBar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';

export default function Sitemap() {
  const sections = [
    {
      title: "Main Navigation",
      links: [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "Projects Portfolio", href: "/projects" },
        { name: "Contact", href: "/contact" },
      ]
    },
    {
      title: "Resources & Insights",
      links: [
        { name: "Insights & Blog", href: "/resources" },
        { name: "Material Guides", href: "/resources/materials" },
        { name: "Renovation FAQ", href: "/resources/faq" },
      ]
    },
    {
      title: "Project Categories",
      links: [
        { name: "Office Design", href: "/projects?filter=Office" },
        { name: "Apartment Interiors", href: "/projects?filter=Apartment" },
        { name: "Residential Projects", href: "/projects?filter=Residential" },
        { name: "Hospitality & Cafe", href: "/projects?filter=Hospitality" },
        { name: "Healthcare Facilities", href: "/projects?filter=Healthcare" },
        { name: "Retail & Showrooms", href: "/projects?filter=Retail" },
        { name: "Gymnasium & Wellness", href: "/projects?filter=Gymnasium" },
      ]
    },
    {
      title: "Legal & Support",
      links: [
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms of Service", href: "/terms-of-service" },
        { name: "Moodboard Guide", href: "/moodboard" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-red-600 selection:text-white">
      <NavBar />
      
      <main className="pt-32 pb-20 px-6 md:px-12 max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="border-b-4 border-black pb-8 mb-16">
          <span className="text-red-600 font-black tracking-[0.3em] uppercase text-[10px] mb-2 block">
            Directory
          </span>
          <h1 className="text-6xl md:text-8xl font-black text-gray-900 uppercase tracking-tighter">
            Sitemap
          </h1>
        </div>

        {/* Sitemap Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {sections.map((section) => (
            <div key={section.title} className="flex flex-col">
              <h2 className="text-[12px] font-black uppercase tracking-widest text-gray-400 mb-6 border-l-2 border-red-600 pl-3">
                {section.title}
              </h2>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-lg font-bold text-gray-900 hover:text-red-600 transition-colors duration-200 block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Brand Note */}
        <div className="mt-24 pt-8 border-t border-gray-100 flex justify-between items-end">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 max-w-xs">
            Duka Interiors PLC — Addis Ababa's premier design + build partner.
          </p>
          <Link href="/contact" className="text-sm font-black uppercase hover:underline">
            Get in touch →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}