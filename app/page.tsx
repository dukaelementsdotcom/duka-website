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
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] max-w-5xl mb-10 uppercase tracking-tighter">
            We Design & Build <br />
            The Best <span className="text-red-600">Interiors</span> <br />
            In Addis Ababa.
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="bg-red-600 hover:bg-white hover:text-black text-white font-black py-4 px-10 text-[11px] uppercase tracking-widest transition-all duration-500 shadow-xl"
            >
              Free Consultation
            </Link>
            <Link
              href="/projects"
              className="bg-transparent border border-white hover:bg-white hover:text-black text-white font-black py-4 px-10 text-[11px] uppercase tracking-widest transition-all duration-500"
            >
              Our Portfolio
            </Link>
          </div>
        </div>
      </div>
      
      <main className="bg-white">
        <section className="py-24 px-6 lg:px-12 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              <div className="lg:col-span-7 space-y-8">
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1] uppercase tracking-tighter">
                  Interior Design & <br /><span className="text-red-600">Office Partitioning</span> in Ethiopia.
                </h2>
                
                <div className="space-y-6 text-gray-600 text-lg leading-relaxed max-w-2xl font-medium">
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
                  <div className="relative aspect-square overflow-hidden group border border-gray-200">
                    <Image
                      src="/images/duka-interiors-portfolio/modern-conference-room-and-lobby-design/modern-conference-room-addis-ababa.webp"
                      alt="Office partitioning project"
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
                    <AnimatedStat target={150} /><span className="text-red-500">+</span>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-300">Projects Complete</div>
              </div>
              <div className="space-y-1">
                <div className="text-5xl font-black tracking-tighter flex items-center">
                    <AnimatedStat target={50} /><span className="text-red-500">+</span>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-300">Corporate Clients</div>
              </div>
              <div className="space-y-1">
                <div className="text-5xl font-black tracking-tighter flex items-center">
                    <AnimatedStat target={10} /><span className="text-red-500">+</span>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-300">Years Mastery</div>
              </div>
              <div className="flex items-center justify-end">
                  <Link href="/contact" className="border border-white/20 px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
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
                    className="inline-block pt-4 text-[10px] font-black uppercase tracking-widest group-hover:text-red-600 transition-colors"
                  >
                    View Specialty +
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== REDESIGNED: Project Planning & Estimation CTA ===== */}
        <section className="py-32 px-6 lg:px-12 bg-gradient-to-b from-white to-gray-50 overflow-hidden relative">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-red-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-100 rounded-full translate-x-1/2 translate-y-1/2 opacity-20"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            {/* Header with strong value proposition */}
            <div className="text-center max-w-4xl mx-auto mb-20">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-full mb-8 shadow-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-sm font-black uppercase tracking-widest">NEW PROJECT ESTIMATOR</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-gray-900 mb-8 leading-[1.1]">
                Plan Your Perfect Office <br />
                <span className="text-red-600">In Just 3 Minutes</span>
              </h2>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Get an instant, professional estimate for your office renovation project. 
                Used by 150+ Ethiopian businesses to plan their workspace transformation.
              </p>
            </div>

            {/* Main CTA Cards - Benefit-driven */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Card 1: Space Planner */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent rounded-2xl blur-2xl group-hover:opacity-100 opacity-0 transition-opacity"></div>
                
                <Link href="/estimate#area" className="block">
                  <div className="relative bg-white border-2 border-gray-100 rounded-2xl p-10 h-full hover:border-red-600 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    {/* Decorative corner element */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-bl-full"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-gray-900 mb-1">Space Planner</h3>
                          <p className="text-gray-500 text-sm">Calculate your exact space needs</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4 mb-8">
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700 font-medium">Calculate exact m² requirements</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700 font-medium">Room-by-room breakdown</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700 font-medium">Ethiopian workspace standards</span>
                        </div>
                      </div>
                      
                      <div className="pt-6 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Start planning →</span>
                          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Card 2: Cost Estimator */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent rounded-2xl blur-2xl group-hover:opacity-100 opacity-0 transition-opacity"></div>
                
                <Link href="/estimate#cost" className="block">
                  <div className="relative bg-white border-2 border-gray-100 rounded-2xl p-10 h-full hover:border-red-600 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    {/* Decorative corner element */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-bl-full"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-gray-900 mb-1">Cost Estimator</h3>
                          <p className="text-gray-500 text-sm">Get detailed pricing breakdown</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4 mb-8">
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700 font-medium">Itemized cost breakdown</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700 font-medium">Q1 2026 market rates</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700 font-medium">12% contingency included</span>
                        </div>
                      </div>
                      
                      <div className="pt-6 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Get estimate →</span>
                          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Trust Signals & Guarantees */}
            <div className="max-w-4xl mx-auto mt-24 pt-16 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="space-y-3">
                  <div className="w-16 h-16 mx-auto bg-red-50 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="font-black text-gray-900">100% Free</h4>
                  <p className="text-gray-600 text-sm">No hidden fees. No obligation.</p>
                </div>
                
                <div className="space-y-3">
                  <div className="w-16 h-16 mx-auto bg-red-50 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="font-black text-gray-900">Instant Results</h4>
                  <p className="text-gray-600 text-sm">Get your estimate in under 3 minutes.</p>
                </div>
                
                <div className="space-y-3">
                  <div className="w-16 h-16 mx-auto bg-red-50 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h4 className="font-black text-gray-900">Market Accurate</h4>
                  <p className="text-gray-600 text-sm">Based on Q1 2026 Ethiopian market rates.</p>
                </div>
              </div>
            </div>

            {/* Final CTA with urgency */}
            <div className="max-w-4xl mx-auto mt-24">
              <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-12 text-center text-white">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black">Ready to Transform Your Office?</h3>
                </div>
                
                <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                  Start planning your dream office space today. Get instant insights and professional guidance.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/estimate"
                    className="bg-white text-red-600 hover:bg-gray-100 font-black py-4 px-10 text-sm uppercase tracking-widest rounded-xl transition-all shadow-lg hover:shadow-xl"
                  >
                    Start Estimating Now
                  </Link>
                  <Link
                    href="/contact"
                    className="bg-transparent border-2 border-white hover:bg-white hover:text-red-600 text-white font-black py-4 px-10 text-sm uppercase tracking-widest rounded-xl transition-all"
                  >
                    Speak to an Expert
                  </Link>
                </div>
                
                <p className="text-sm opacity-75 mt-6">
                  <span className="font-bold">✓</span> Used by 150+ Ethiopian businesses
                  <span className="mx-3">•</span>
                  <span className="font-bold">✓</span> 100% Free & No Obligation
                  <span className="mx-3">•</span>
                  <span className="font-bold">✓</span> Instant Results
                </p>
              </div>
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