'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedStat from './components/AnimatedStat';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import ClientLogosGallery from './components/ClientLogosGallery';
import FinalCTA from './components/FinalCTA';
import ResetScroll from './components/ResetScroll';
import Footer from './components/Footer';
import ClientLogosFinal from './components/ClientLogosFinal';
import NavBar from './components/NavBar';
// 1. Ensure this import is at the very top of your app/page.tsx
import { services } from '@/lib/servicesData';

import StructuredData from '../components/StructuredData';


// Schema.org structured data for SEO
const InteriorDesignCompanySchema = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'InteriorDesignCompany',
        name: 'Duka Interiors',
        description:
          'Elite interior design and construction company in Addis Ababa, Ethiopia. We provide single-point Design + Build solutions with transparent fixed costs.',
        url: 'https://www.dukainteriors.com',
        telephone: ['+251940607055', '+251929144290'],
        email: 'welcome@dukainteriors.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Djibouti street, Welela building, 5th floor, suite 507',
          addressLocality: 'Addis Ababa',
          addressRegion: 'Addis Ababa',
          addressCountry: 'ET',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 9.032,
          longitude: 38.7469,
        },
        sameAs: [
          'https://www.facebook.com/dukainteriors',
          'https://www.instagram.com/dukainteriors',
          'https://www.linkedin.com/company/duka-interiors',
          'https://www.tiktok.com/@duka.interiors.plc',
        ],
        areaServed: {
          '@type': 'City',
          name: 'Addis Ababa',
        },
        foundingYear: '2015',
      }),
    }}
  />
);

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // Force scroll to top on load
useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  

  // ✅ Single active service shown on hover
  const activeService = {
    title: 'Design + Build',
    desc: 'We offer a single-point responsibility model that eliminates coordination gaps between design and construction. With transparent fixed pricing, dedicated project management, and a commitment to timeline integrity, we deliver spaces that are not just beautiful but built to perform. From concept sketches to final handover, every detail is managed under one roof — ensuring consistency, accountability, and peace of mind.',
  };

  // ✅ Only one hoveredService state — used for future interactivity
  
  const [hoveredService, setHoveredService] = useState(false);

  // Detect scroll to change header style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Header class based on scroll
  const headerClasses = isScrolled
    ? 'bg-white text-gray-800 border-b border-gray-200 shadow-md'
    : 'bg-black/80 backdrop-blur-md text-white border-b border-gray-800';

  // Navigation items
  const navItems = [
    { name: 'HOME', href: '/' },
    { name: 'SERVICES', href: '/services' },
    { name: 'PROJECTS', href: '/projects' },
    { name: 'ABOUT', href: '/about' },
    { name: 'RESOURCES', href: '/resources' },
    { name: 'CONTACT', href: '/contact' },
  ];

  // Contact info
  const phones = [
    { number: '+251940607055', label: '+251 940 607 055' },
    { number: '+251929144290', label: '+251 929 144 290' },
  ];
  const email = 'welcome@dukainteriors.com';

  // Social links
  const socialLinks = [
    { name: 'WhatsApp', href: 'https://wa.me/251940607055', icon: 'fab fa-whatsapp' },
    { name: 'Telegram', href: 'https://t.me/dukainteriorsplc', icon: 'fab fa-telegram' },
    { name: 'Facebook', href: 'https://www.facebook.com/dukainteriors', icon: 'fab fa-facebook-f' },
    { name: 'Instagram', href: 'https://www.instagram.com/dukainteriors', icon: 'fab fa-instagram' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/duka-interiors', icon: 'fab fa-linkedin-in' },
    { name: 'TikTok', href: 'https://www.tiktok.com/@duka.interiors.plc', icon: 'fab fa-tiktok' },
  ];

  return (
    <>
      <InteriorDesignCompanySchema />

      {/* SCROLL-CHANGE NAVBAR */}
    <NavBar />

     {/* Hero Section */}
<div className="relative h-screen overflow-hidden pt-20">
  <Image
    src="/images/duka-interiors-portfolio/luxury-executive-office-design-ethiopia/reception-interior-design-habesha-cement.webp"
    alt="Luxury executive office reception design by Duka Interiors"
    fill
    style={{ objectFit: 'cover' }}
    priority
  />
  {/* 🔧 Ultra-light overlay — barely visible */}
  <div className="absolute inset-0 bg-black/10"></div>
  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
    {/* ✅ Added text-shadow for crisp contrast */}
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight max-w-4xl mb-8 text-shadow-lg">
      WE DESIGN <br />
      WE BUILD <br />
      <span className="text-red-600 font-semibold">EXCEPTIONAL INTERIORS</span> <br />
      IN ADDIS ABABA
    </h1>
    <a
      href="mailto:welcome@dukainteriors.com"
      className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
    >
      Get a Free Consultation
    </a>
  </div>
</div>

      <main className="pt-0">
    
    <ResetScroll />
   
   {/* === INTRO SECTION: "THE PROOF" – TEXT + IMAGE === */}
<section className="py-20 px-6 lg:px-8 bg-gray-50">
  <div className="mx-auto w-full max-w-[80vw] lg:max-w-6xl">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* Text Content - Left */}
      <div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
          DESIGNING THE BEST OFFICES IN ADDIS ABABA SINCE 2015
        </h2>

        <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
          Duka Interiors is a leading name among office interior design and construction companies in Addis Ababa, Ethiopia. Since 2015, we’ve specialized in creating exceptional and highly functional office environments that inspire productivity and reflect your brand.
        </p>

        <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
          We offer turnkey office fit-out solutions, providing a single point of contact from initial concept to a seamless occupation. Experience transparent pricing and a dedicated team committed to delivering your vision with meticulous attention to detail.
        </p>

        <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
          Transform your office. Enhance your business. Contact Duka Interiors today for a consultation.
        </p>
      </div>

      {/* Image - Right — Now links to a real project */}
      <Link href="/projects/modern-conference-room-and-lobby-design" className="block">
        <div className="relative min-h-[400px] overflow-hidden rounded-none border border-gray-200 group">
          <Image
            src="/images/duka-interiors-Projects/habesha-breweries-duka-interiors/habesha-breweries-duka-interiors-3.webp"
            alt="Modern conference room and lobby design by Duka Interiors"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={false}
          />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-90 text-white flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
            <span className="px-6 py-2 bg-red-600 text-white font-bold text-xs uppercase tracking-wide rounded-none hover:bg-red-700 transition-colors duration-300 pointer-events-auto min-w-[120px] text-center">
              See Project
            </span>
          </div>
        </div>
      </Link>
    </div>
  </div>
</section>

{/* === THE STATEMENT: BLACK BAR WITH ANIMATED STATS + BUTTONS === */}
<section className="w-full bg-black text-white py-8">
  <div className="max-w-[80vw] lg:max-w-6xl mx-auto px-6 lg:px-8">
    <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
      {/* Animated Stats - Left */}
      <div className="flex flex-col sm:flex-row lg:flex-row gap-8 lg:gap-12 text-center lg:text-left">
        <div>
          <AnimatedStat target={150} />
          <div className="text-gray-300 text-xs uppercase tracking-wide mt-1">Projects Completed</div>
        </div>
        <div>
          <AnimatedStat target={50} />
          <div className="text-gray-300 text-xs uppercase tracking-wide mt-1">Happy Clients</div>
        </div>
        <div>
          <AnimatedStat target={9} />
          <div className="text-gray-300 text-xs uppercase tracking-wide mt-1">Years Experience</div>
        </div>
      </div>

      {/* Buttons - Right */}
      <div className="flex flex-col sm:flex-row gap-4 whitespace-nowrap">
        <Link
          href="/about"
          className="px-8 py-3 bg-red-600 text-white font-bold text-sm uppercase tracking-wide rounded-none hover:bg-red-700 transition-colors duration-300 min-w-[180px] text-center"
        >
          Learn More About Us
        </Link>
        <Link
          href="/contact"
          className="px-8 py-3 border-2 border-gray-400 text-white font-bold text-sm uppercase tracking-wide rounded-none hover:border-white transition-colors duration-300 min-w-[180px] text-center"
        >
          Start Your Project
        </Link>
      </div>
    </div>
  </div>
</section>
       
       
       
     {/* === SERVICES: THE CLARITY GRID === */}
<section className="py-24 px-6 lg:px-8 bg-gray-50">
  <div className="mx-auto w-full max-w-[80vw] lg:max-w-6xl">
    
    {/* Header Section */}
    <div className="text-center mb-12 lg:mb-16 px-4">
      <div className="inline-block px-5 py-2 bg-red-600 text-white rounded-none text-xs font-bold uppercase tracking-wider mb-6">
        Our Services
      </div>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight max-w-4xl mx-auto mb-4">
        Interior Design & Build in Addis Ababa — From Vision to Reality.
      </h2>
      <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto">
        Single-point responsibility. Transparent pricing. Exceptional spaces.
      </p>
    </div>

    {/* Dynamic Grid: Now matches the Services Page exactly */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
      {services.map((service, index) => (
        <div
          key={index}
          className="group relative bg-white border border-gray-200 rounded-none transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
        >
          {/* Card Content */}
          <div className="p-6 pt-8 flex flex-col h-full">
            {/* Icon - You can keep your SVGs or use a placeholder */}
            <div className="flex items-center justify-center mb-4 text-red-600 group-hover:scale-110 transition-transform duration-300">
               <span className="text-2xl font-bold">★</span>
            </div>
            {/* Title from servicesData.ts */}
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 leading-tight text-center group-hover:text-red-600 transition-colors duration-300">
              {service.title}
            </h3>
            {/* Short Description from servicesData.ts */}
            <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 text-center">
              {service.shortDesc}
            </p>
          </div>

          {/* Hover Layer with the correct Slug */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/90 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
            <Link 
              href={`/services/${service.slug}`}
              className="px-6 py-2 bg-red-600 text-white font-bold text-xs uppercase tracking-wide rounded-none hover:bg-red-700 transition-colors duration-300 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 pointer-events-auto min-w-[120px] text-center shadow-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

        {/* === FULL-SPAN CTA: MINIMAL HEIGHT, MATCHING STYLE === */}
        <section className="w-full bg-black text-white py-8">
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl text-center">
            <h2 className="text-2xl font-light mb-1">Let’s Build Together</h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-6">
              <Link
                href="/services"
                className="px-6 py-2.5 border border-white text-white font-bold text-xs uppercase tracking-wide rounded-none hover:bg-white hover:text-black transition-all duration-300 group min-w-[140px] flex items-center justify-center"
              >
                View All Services
                <svg
                  className="w-3 h-3 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link
                href="/contact"
                className="px-6 py-2.5 bg-red-600 text-white font-bold text-xs uppercase tracking-wide rounded-none hover:bg-red-700 transition-all duration-300 min-w-[170px]"
              >
                Get a Free Consultation
              </Link>
            </div>
          </div>
        </section>
<Gallery />
<ClientLogosFinal />
<Testimonials />

<FinalCTA />

        <Footer />
      </main>
    </>
  );
}