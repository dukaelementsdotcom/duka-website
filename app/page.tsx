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
      <NavBar />
      <ResetScroll />

      <div className="relative h-screen overflow-hidden">
        <Image
          src="/images/duka-interiors-portfolio/modern-conference-room-and-lobby-design/modern-board-room-habesha-breweries.webp"
          alt="Top-rated interior design company in Addis Ababa - Duka Interiors"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <p className="text-red-600 font-black tracking-[0.3em] uppercase text-[10px] mb-4">
            Since 2015 // Addis Ababa
          </p>
          {/* Adjusted Bold Sizing: Large but not overwhelming */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] max-w-5xl mb-10 uppercase tracking-tighter">
            We Design. <br />
            We Build. <br />
            <span className="text-red-600">Exceptional</span> Spaces.
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={scrollToConsultation}
              className="bg-red-600 hover:bg-white hover:text-black text-white font-black py-4 px-10 text-[11px] uppercase tracking-widest transition-all duration-500 shadow-xl"
            >
              Free Consultation
            </button>
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
                  Expert <span className="text-red-600">Interior Design</span> & <br />Fit-out in Addis Ababa.
                </h2>
                
                <div className="space-y-6 text-gray-600 text-lg leading-relaxed max-w-2xl font-medium">
                  <p>
                    Duka Interiors is the leading <span className="text-black font-bold">Design and Build firm in Ethiopia</span>, specializing in high-performance corporate offices and luxury residential spaces.
                  </p>
                  <p>
                    From <span className="text-black font-bold uppercase text-sm">Turnkey Office Fit-outs</span> to custom furniture manufacturing, we provide a seamless, architect-led process that guarantees fixed costs and zero stress. We transform commercial visions into reality using local expertise and international standards.
                  </p>
                </div>

                <div className="pt-4">
                  <Link href="/about" className="group flex items-center gap-4 font-black uppercase tracking-widest text-[10px] text-black">
                    Why Choose Duka? <span className="group-hover:translate-x-2 transition-transform text-red-600 text-xl">→</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                {/* Clickable Image Restored */}
                <Link href="/projects/modern-conference-room-and-lobby-design" className="block">
                  <div className="relative aspect-square overflow-hidden group border border-gray-200">
                    <Image
                      src="/images/duka-interiors-portfolio/modern-conference-room-and-lobby-design/modern-conference-room-addis-ababa.webp"
                      alt="Modern office interior design project Addis Ababa"
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
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
                   <AnimatedStat target={150} /><span className="text-red-600">+</span>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Projects Complete</div>
              </div>
              <div className="space-y-1">
                <div className="text-5xl font-black tracking-tighter flex items-center">
                   <AnimatedStat target={50} /><span className="text-red-600">+</span>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Corporate Clients</div>
              </div>
              <div className="space-y-1">
                <div className="text-5xl font-black tracking-tighter flex items-center">
                   <AnimatedStat target={9} /><span className="text-red-600">+</span>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Years Mastery</div>
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
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Architectural Precision.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
              {services.map((service, index) => (
                <div key={index} className="bg-white p-12 space-y-6 group hover:bg-black transition-colors duration-500">
                  <div className="w-12 h-[2px] bg-red-600 group-hover:w-full transition-all duration-500"></div>
                  <h4 className="text-2xl font-black uppercase tracking-tighter group-hover:text-white transition-colors">
                    {service.title}
                  </h4>
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