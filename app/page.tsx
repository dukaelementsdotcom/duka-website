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

import { services } from '@/lib/servicesData';

export default function Home() {
  const scrollToConsultation = () => {
    const section = document.getElementById('final-cta');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* BETA TECHNIQUE: Client-side Title Update 
          This overrides the "Elite" title to your SEO-friendly preference.
      */}
      <title>Interior Design Company in Addis Ababa Ethiopia</title>

      {/* ADVANCED AI MODE SCHEMA - FIXED: Removed extra spaces in URLs */}
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

      {/* FIXED: Added min-h-screen to prevent CLS */}
      <div className="relative h-screen min-h-screen overflow-hidden">
        {/* OPTIMIZED: Added proper sizes attribute for responsive images */}
        <Image
          src="/images/duka-interiors-portfolio/modern-conference-room-and-lobby-design/modern-board-room-habesha-breweries.webp"
          alt="The best interior design company in Addis Ababa - Duka Interiors"
          fill
          className="object-cover"
          priority
          fetchPriority="high"
          quality={75}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <p className="text-red-600 font-black tracking-[0.3em] uppercase text-[10px] mb-4">
            Since 2015 // Addis Ababa
          </p>
          
          {/* YOUR EXACT PHRASING */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] max-w-5xl mb-10 uppercase tracking-tighter">
            We Design & Build <br />
            The Best <span className="text-red-600">Interiors</span> <br />
            In Addis Ababa.
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              aria-label="Request a free consultation with Duka Interiors"
              className="bg-red-600 hover:bg-white hover:text-black text-white font-black py-4 px-10 text-[11px] uppercase tracking-widest transition-all duration-500 shadow-xl"
            >
              Free Consultation
            </Link>
            <Link
              href="/projects"
              aria-label="View our portfolio of interior design projects"
              className="bg-transparent border border-white hover:bg-white hover:text-black text-white font-black py-4 px-10 text-[11px] uppercase tracking-widest transition-all duration-500"
            >
              Our Portfolio
            </Link>
          </div>
        </div>
      </div>
      
      <main className="bg-white">
        {/* FIXED: Added min-h-[80px] to prevent CLS on navbar area */}
        <section className="py-24 px-6 lg:px-12 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              <div className="lg:col-span-7 space-y-8">
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1] uppercase tracking-tighter">
                  Interior Design & <br /><span className="text-red-600">Office Partitioning</span> in Ethiopia.
                </h2>
                
                {/* ORGANIC INTRO TEXT */}
                <div className="space-y-6 text-gray-600 text-lg leading-relaxed max-w-2xl font-medium">
                  <p>
                    Duka Interiors is a professional design and build firm with over 10 years of experience in the Ethiopian market. We specialize in creating high-quality workspaces and homes that reflect our clients&apos; vision.
                  </p>
                  <p>
                    From specialized office partitioning in Addis Ababa to full office renovation and interior decoration, we handle the entire process from start to finish. Our team ensures that every project meets international standards while using local expertise to deliver the best results for our clients.
                  </p>
                </div>

                <div className="pt-4">
                  <Link href="/about" aria-label="Learn more about our design and build process" className="group flex items-center gap-4 font-black uppercase tracking-widest text-[10px] text-black">
                    More About Our Process <span className="group-hover:translate-x-2 transition-transform text-red-600 text-xl">→</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <Link href="/projects/modern-conference-room-and-lobby-design" aria-label="View modern conference room project" className="block">
                  <div className="relative aspect-square overflow-hidden group border border-gray-200">
                    {/* OPTIMIZED: Added loading="lazy" and proper sizes */}
                    <Image
                      src="/images/duka-interiors-portfolio/modern-conference-room-and-lobby-design/modern-conference-room-addis-ababa.webp"
                      alt="Office partitioning and renovation project in Addis Ababa"
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      loading="lazy"
                      quality={75}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-red-600 text-white px-6 py-2 font-black uppercase text-[10px] tracking-widest">View Project</span>
                    </div>
                  </div>
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full bg-black text-white py-16 border-y border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="space-y-1">
                <div className="text-5xl font-black tracking-tighter flex items-center">
                    <AnimatedStat target={150} /><span className="text-red-500 drop-shadow-[0_1px_2px_rgba(255,255,255,0.3)]">+</span>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-300 drop-shadow-[0_1px_2px_rgba(255,255,255,0.3)]">Projects Complete</div>
              </div>
              <div className="space-y-1">
                <div className="text-5xl font-black tracking-tighter flex items-center">
                    <AnimatedStat target={50} /><span className="text-red-500 drop-shadow-[0_1px_2px_rgba(255,255,255,0.3)]">+</span>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-300 drop-shadow-[0_1px_2px_rgba(255,255,255,0.3)]">Corporate Clients</div>
              </div>
              <div className="space-y-1">
                <div className="text-5xl font-black tracking-tighter flex items-center">
                    <AnimatedStat target={10} /><span className="text-red-500 drop-shadow-[0_1px_2px_rgba(255,255,255,0.3)]">+</span>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-300 drop-shadow-[0_1px_2px_rgba(255,255,255,0.3)]">Years Mastery</div>
              </div>
              <div className="flex items-center justify-end">
                  <Link href="/contact" aria-label="Start your interior design project" className="border border-white/20 px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    Start Project
                  </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 px-6 lg:px-12 bg-[#fafafa]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 mb-4">Core Services</h3>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Office Renovation & Design.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
              {services.map((service, index) => (
                <div key={index} className="bg-white p-12 space-y-6 group hover:bg-black transition-colors duration-500">
                  <div className="w-12 h-[2px] bg-red-600 group-hover:w-full transition-all duration-500"></div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 group-hover:text-gray-400 transition-colors text-sm leading-relaxed">
                    {service.shortDesc}
                  </p>
                  <Link 
                    href={`/services/${service.slug}`}
                    aria-label={`View ${service.title} specialty`}
                    className="inline-block pt-4 text-[10px] font-black uppercase tracking-widest group-hover:text-red-600 transition-colors"
                  >
                    View Specialty +
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ProjectScope Pro CTA - FIXED LINKS */}
        <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 bg-red-50 text-red-700 px-6 py-3 rounded-full mb-6">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-bold uppercase tracking-widest">New Tool</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-gray-900 mb-6">
                Plan & Estimate Your Project
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Use our interactive tools to plan your office space and get instant cost estimates
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Link
                href="/estimate"
                className="group bg-white border-2 border-gray-200 rounded-xl p-8 text-center hover:border-red-600 hover:shadow-2xl transition-all block"
              >
                <div className="text-5xl mb-4">📐</div>
                <h3 className="text-xl font-black mb-2">Space Planner</h3>
                <p className="text-gray-600 mb-4">
                  Calculate office area requirements based on headcount and layout preferences
                </p>
                <span className="text-red-600 font-black text-sm uppercase tracking-widest group-hover:underline">
                  Plan Your Space →
                </span>
              </Link>
              
              <Link
                href="/estimate"
                className="group bg-white border-2 border-gray-200 rounded-xl p-8 text-center hover:border-red-600 hover:shadow-2xl transition-all block"
              >
                <div className="text-5xl mb-4">💰</div>
                <h3 className="text-xl font-black mb-2">Cost Estimator</h3>
                <p className="text-gray-600 mb-4">
                  Get detailed cost breakdowns for design services and full build projects
                </p>
                <span className="text-red-600 font-black text-sm uppercase tracking-widest group-hover:underline">
                  Get Estimate →
                </span>
              </Link>
            </div>
            
            <div className="text-center mt-12">
              <Link
                href="/estimate"
                className="inline-flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-lg font-black uppercase tracking-widest text-sm hover:bg-red-700 transition-colors"
              >
                Open Full Tool
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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