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
      <title>Interior Design Company in Addis Ababa Ethiopia</title>

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

      <div className="relative h-screen min-h-screen overflow-hidden">
        {/* ✅ FIXED: Added aspect ratio to prevent layout shifts */}
        <div style={{ aspectRatio: '16/9' }}>
          <Image
            src="/images/duka-interiors-portfolio/modern-conference-room-and-lobby-design/modern-board-room-habesha-breweries.webp"
            alt="The best interior design company in Addis Ababa - Duka Interiors"
            fill
            className="object-cover"
            priority
            fetchPriority="high" // ✅ FIXED: Added high fetch priority
            quality={60}
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <p className="text-red-600 font-black tracking-[0.3em] uppercase text-[10px] mb-4">
            Since 2015 // Addis Ababa
          </p>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[0.9] max-w-4xl mb-8 uppercase tracking-tighter">
            We Design & Build <br />
            The Best <span className="text-red-600">Interiors</span> <br />
            In Addis Ababa.
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="bg-red-600 hover:bg-white hover:text-black text-white font-black py-4 px-8 text-[11px] uppercase tracking-widest transition-all duration-500 shadow-xl"
            >
              Free Consultation
            </Link>
            <Link
              href="/projects"
              className="bg-transparent border border-white hover:bg-white hover:text-black text-white font-black py-4 px-8 text-[11px] uppercase tracking-widest transition-all duration-500"
            >
              Our Portfolio
            </Link>
          </div>
        </div>
      </div>
      
      <main className="bg-white">
        <section className="py-20 px-6 lg:px-12 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-[1.1] uppercase tracking-tighter">
                  Interior Design & <br /><span className="text-red-600">Office Partitioning</span> in Ethiopia.
                </h2>
                
                <div className="space-y-4 text-gray-600 text-base leading-relaxed max-w-2xl font-medium">
                  <p>
                    Duka Interiors is a professional design and build firm with over 10 years of experience in the Ethiopian market.
                  </p>
                  <p>
                    From specialized office partitioning in Addis Ababa to full office renovation and interior decoration, we handle the entire process from start to finish.
                  </p>
                </div>

                <div className="pt-4">
                  <Link href="/about" className="group flex items-center gap-4 font-black uppercase tracking-widest text-[10px] text-black">
                    More About Our Process <span className="group-hover:translate-x-2 transition-transform text-red-600 text-xl">→</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <Link href="/projects/modern-conference-room-and-lobby-design" className="block">
                  {/* ✅ FIXED: Added aspect ratio to prevent layout shifts */}
                  <div className="relative" style={{ aspectRatio: '16/9' }}>
                    <Image
                      src="/images/duka-interiors-portfolio/modern-conference-room-and-lobby-design/modern-conference-room-addis-ababa.webp"
                      alt="Office partitioning project"
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      quality={75}
                      sizes="(max-width: 768px) 100vw, 50vw"
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

        {/* Stats Section - COMPACT */}
        <section className="w-full bg-black text-white py-12 border-y border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="space-y-1">
                <div className="text-4xl font-black tracking-tighter flex items-center">
                    <AnimatedStat target={150} /><span className="text-red-500">+</span>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-300">Projects</div>
              </div>
              <div className="space-y-1">
                <div className="text-4xl font-black tracking-tighter flex items-center">
                    <AnimatedStat target={50} /><span className="text-red-500">+</span>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-300">Clients</div>
              </div>
              <div className="space-y-1">
                <div className="text-4xl font-black tracking-tighter flex items-center">
                    <AnimatedStat target={10} /><span className="text-red-500">+</span>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-300">Years</div>
              </div>
              <div className="flex items-center justify-end">
                  <Link href="/contact" className="border border-white/20 px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    Start Project
                  </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 lg:px-12 bg-[#fafafa]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 mb-4">Core Services</h3>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Office Renovation & Design.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
              {services.map((service, index) => (
                <div key={index} className="bg-white p-8 space-y-4 group hover:bg-black transition-colors duration-500">
                  <div className="w-12 h-[2px] bg-red-600 group-hover:w-full transition-all duration-500"></div>
                  <h3 className="text-xl font-black uppercase tracking-tighter group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 group-hover:text-gray-400 transition-colors text-sm leading-relaxed">
                    {service.shortDesc}
                  </p>
                  <Link 
                    href={`/services/${service.slug}`}
                    className="inline-block pt-3 text-[10px] font-black uppercase tracking-widest group-hover:text-red-600 transition-colors"
                  >
                    View Specialty +
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== COMPACT: Project Planning & Estimation CTA ===== */}
        <section className="py-16 px-6 lg:px-12 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-xs font-black uppercase tracking-widest">NEW TOOL</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-gray-900 mb-4">
                Plan & Estimate Your Project
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Get instant, professional estimates. Used by 150+ Ethiopian businesses.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Compact Card 1 */}
              <Link href="/estimate#area" className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-red-600 hover:shadow-xl transition-all block">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-black mb-1">Space Planner</h3>
                    <p className="text-gray-600 text-sm mb-3">Calculate exact m² requirements</p>
                    <span className="text-red-600 font-black text-xs uppercase tracking-widest">Plan →</span>
                  </div>
                </div>
              </Link>
              
              {/* Compact Card 2 */}
              <Link href="/estimate#cost" className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-red-600 hover:shadow-xl transition-all block">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-black mb-1">Cost Estimator</h3>
                    <p className="text-gray-600 text-sm mb-3">Get detailed pricing breakdown</p>
                    <span className="text-red-600 font-black text-xs uppercase tracking-widest">Estimate →</span>
                  </div>
                </div>
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