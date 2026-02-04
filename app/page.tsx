'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const AnimatedStat = dynamic(() => import('./components/AnimatedStat'), { ssr: true });
const Gallery = dynamic(() => import('./components/Gallery'));
const Testimonials = dynamic(() => import('./components/Testimonials'));
const Footer = dynamic(() => import('./components/Footer'));
const ClientLogosFinal = dynamic(() => import('./components/ClientLogosFinal'));
const FinalCTA = dynamic(() => import('./components/FinalCTA'));
const ResetScroll = dynamic(() => import('./components/ResetScroll'));
const NavBar = dynamic(() => import('./components/NavBar'));

// Optimized: Lazy load the calculator with priority set to low
const QuickEstimate = dynamic(() => import('./components/Calculator/QuickEstimate'), { 
  ssr: false,
  loading: () => (
    <div className="animate-pulse bg-gray-100 rounded-2xl h-[500px] w-full max-w-4xl mx-auto"></div>
  )
});

import { services } from '@/lib/servicesData';

export default function Home() {
  const scrollToConsultation = () => {
    const section = document.getElementById('final-cta');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  // Preload critical images
  useEffect(() => {
    // Preload hero image
    const heroImg = new Image();
    heroImg.src = '/images/duka-interiors-portfolio/modern-conference-room-and-lobby-design/modern-board-room-habesha-breweries.webp';
    
    // Preload conference room image
    const confImg = new Image();
    confImg.src = '/images/duka-interiors-portfolio/modern-conference-room-and-lobby-design/modern-conference-room-addis-ababa.webp';
  }, []);

  return (
    <>
      {/* BETA TECHNIQUE: Client-side Title Update 
          This overrides the "Elite" title to your SEO-friendly preference.
      */}
      <title>Interior Design Company in Addis Ababa Ethiopia</title>

      {/* ADVANCED AI MODE SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Duka Interiors",
            "alternateName": "The Best Interior Design Company in Addis Ababa",
            "url": "https://dukainteriors.com",
            "logo": "https://dukainteriors.com/images/icons-duka-interiors/logo-duka-interiors-big.svg",
            "description": "Duka Interiors is the best interior design company in Addis Ababa, specializing in office partitioning, renovation, and interior decoration in Ethiopia.",
            "telephone": "+251940607055",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Bole, Djibouti Street, Welela Building, 5th Floor",
              "addressLocality": "Addis Ababa",
              "addressCountry": "ET"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+251940607055",
              "contactType": "customer service"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "9.0012",
              "longitude": "38.7834"
            }
          })
        }}
      />

      <NavBar />
      <ResetScroll />

      {/* HERO SECTION - Optimized for LCP */}
      <div className="relative h-screen overflow-hidden">
        <Image
          src="/images/duka-interiors-portfolio/modern-conference-room-and-lobby-design/modern-board-room-habesha-breweries.webp"
          alt="The best interior design company in Addis Ababa - Duka Interiors"
          fill
          className="object-cover"
          priority
          fetchPriority="high"
          quality={65} // Reduced from 75
          sizes="(max-width: 768px) 100vw, 100vw"
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAADwAQCdASoKAAoAAUAmJaQAA3AA/vpMgAA="
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <p className="text-red-600 font-black tracking-[0.3em] uppercase text-[10px] mb-4">
            Since 2015 // Addis Ababa
          </p>
          
          {/* YOUR EXACT PHRASING - Added explicit dimensions */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] max-w-5xl mb-8 md:mb-10 uppercase tracking-tighter">
            <span className="block mb-2">We Design & Build</span>
            <span className="block mb-2">The Best <span className="text-red-600">Interiors</span></span>
            <span className="block">In Addis Ababa.</span>
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="/contact"
              aria-label="Request a free consultation with Duka Interiors"
              className="bg-red-600 hover:bg-white hover:text-black text-white font-black py-3 sm:py-4 px-8 sm:px-10 text-[11px] uppercase tracking-widest transition-all duration-500 shadow-xl min-w-[200px] text-center"
            >
              Free Consultation
            </Link>
            <Link
              href="/projects"
              aria-label="View our portfolio of interior design projects"
              className="bg-transparent border border-white hover:bg-white hover:text-black text-white font-black py-3 sm:py-4 px-8 sm:px-10 text-[11px] uppercase tracking-widest transition-all duration-500 min-w-[200px] text-center"
            >
              Our Portfolio
            </Link>
          </div>
        </div>
      </div>

      <main className="bg-white">
        {/* INTRO SECTION - Fixed CLS with explicit dimensions */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              <div className="lg:col-span-7 space-y-6 md:space-y-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-[1.1] uppercase tracking-tighter">
                  <span className="block">Interior Design &</span>
                  <span className="text-red-600">Office Partitioning</span> in Ethiopia.
                </h2>
                
                {/* ORGANIC INTRO TEXT */}
                <div className="space-y-4 md:space-y-6 text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                  <p>
                    Duka Interiors is a professional design and build firm with over 10 years of experience in the Ethiopian market. We specialize in creating high-quality workspaces and homes that reflect our clients&apos; vision.
                  </p>
                  <p>
                    From specialized office partitioning in Addis Ababa to full **office renovation and interior decoration, we handle the entire process from start to finish. Our team ensures that every project meets international standards while using local expertise to deliver the best results for our clients.
                  </p>
                </div>

                <div className="pt-2 md:pt-4">
                  <Link href="/about" aria-label="Learn more about our design and build process" className="group flex items-center gap-3 md:gap-4 font-black uppercase tracking-widest text-[10px] md:text-[11px] text-black">
                    More About Our Process <span className="group-hover:translate-x-2 transition-transform text-red-600 text-lg md:text-xl">→</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <Link href="/projects/modern-conference-room-and-lobby-design" aria-label="View modern conference room project" className="block">
                  <div className="relative aspect-square overflow-hidden group border border-gray-200">
                    <Image
                      src="/images/duka-interiors-portfolio/modern-conference-room-and-lobby-design/modern-conference-room-addis-ababa.webp"
                      alt="Office partitioning and renovation project in Addis Ababa"
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={75}
                      placeholder="blur"
                      blurDataURL="data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAADwAQCdASoKAAoAAUAmJaQAA3AA/vpMgAA="
                    />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-red-600 text-white px-4 md:px-6 py-2 font-black uppercase text-[10px] tracking-widest">View Project</span>
                    </div>
                  </div>
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* Stats Section - Optimized for mobile */}
        <section className="w-full bg-black text-white py-12 md:py-16 border-y border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
              <div className="space-y-1">
                <div className="text-3xl md:text-5xl font-black tracking-tighter flex items-center">
                    <AnimatedStat target={150} /><span className="text-red-500 drop-shadow-[0_1px_2px_rgba(255,255,255,0.3)]">+</span>
                </div>
                <div className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-300 drop-shadow-[0_1px_2px_rgba(255,255,255,0.3)]">Projects Complete</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl md:text-5xl font-black tracking-tighter flex items-center">
                    <AnimatedStat target={50} /><span className="text-red-500 drop-shadow-[0_1px_2px_rgba(255,255,255,0.3)]">+</span>
                </div>
                <div className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-300 drop-shadow-[0_1px_2px_rgba(255,255,255,0.3)]">Corporate Clients</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl md:text-5xl font-black tracking-tighter flex items-center">
                    <AnimatedStat target={10} /><span className="text-red-500 drop-shadow-[0_1px_2px_rgba(255,255,255,0.3)]">+</span>
                </div>
                <div className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-300 drop-shadow-[0_1px_2px_rgba(255,255,255,0.3)]">Years Mastery</div>
              </div>
              <div className="flex items-center justify-start lg:justify-end col-span-2 lg:col-span-1">
                  <Link href="/contact" aria-label="Start your interior design project" className="border border-white/20 px-6 md:px-8 py-3 md:py-4 text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all w-full lg:w-auto text-center">
                    Start Project
                  </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section - Optimized for mobile */}
        <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-[#fafafa]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 md:mb-20">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 mb-3 md:mb-4">Core Services</h3>
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-black uppercase tracking-tighter">Office Renovation & Design.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
              {services.map((service, index) => (
                <div key={index} className="bg-white p-6 md:p-8 lg:p-12 space-y-4 md:space-y-6 group hover:bg-black transition-colors duration-500">
                  <div className="w-12 h-[2px] bg-red-600 group-hover:w-full transition-all duration-500"></div>
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 group-hover:text-gray-400 transition-colors text-sm leading-relaxed">
                    {service.shortDesc}
                  </p>
                  <Link 
                    href={`/services/${service.slug}`}
                    aria-label={`View ${service.title} specialty`}
                    className="inline-block pt-2 md:pt-4 text-[10px] font-black uppercase tracking-widest group-hover:text-red-600 transition-colors"
                  >
                    View Specialty +
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === REDESIGNED: QUICK ESTIMATE CALCULATOR SECTION === */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 md:gap-3 bg-red-50 text-red-700 px-4 md:px-6 py-2 md:py-3 rounded-full mb-4 md:mb-6">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="text-xs md:text-sm font-bold uppercase tracking-widest">Cost Calculator</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-gray-900 mb-4 md:mb-6">
                Get an Instant Project Estimate
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
                Answer 3 simple questions to get a ballpark figure for your office design or renovation project in Addis Ababa.
              </p>
            </div>
            
            {/* NEW: Calculator Preview - Shows on initial load for better UX */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 md:p-6 max-w-4xl mx-auto mb-8">
              <div className="text-center mb-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Quick Estimate</h3>
                <p className="text-gray-600 text-sm md:text-base">Get started in seconds</p>
              </div>
              <QuickEstimate />
            </div>
            
            <div className="text-center mt-8">
              <Link
                href="/estimate-cost"
                aria-label="Use our full detailed cost calculator"
                className="inline-flex items-center gap-2 md:gap-3 text-gray-700 text-[10px] md:text-[11px] font-black uppercase tracking-widest border-b border-gray-300 pb-1 hover:text-red-600 hover:border-red-600 transition-colors"
              >
                Need a detailed breakdown? Use our full calculator
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        <Gallery />
        <ClientLogosFinal />
        <Testimonials />
        
        <div id="final-cta">
          <FinalCTA />
        </div>
        
        <Footer />
      </main>
    </>
  );
}