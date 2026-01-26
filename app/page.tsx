'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Dynamic imports for performance optimization
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
  const [isScrolled, setIsScrolled] = useState(false);
  
  const scrollToConsultation = () => {
    const section = document.getElementById('final-cta');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <NavBar />
      <ResetScroll />

      {/* Hero Section: Engineered for Maximum Visual Impact */}
      <div className="relative h-screen overflow-hidden">
        <Image
          src="/images/duka-interiors-portfolio/modern-conference-room-and-lobby-design/modern-board-room-habesha-breweries.webp"
          alt="Premium commercial interior design and office fit-out in Addis Ababa by Duka Interiors"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <p className="text-red-600 font-black tracking-[0.5em] uppercase text-[10px] mb-6 animate-pulse">
            Leading Interior Design & Build Firm
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black leading-[0.85] max-w-6xl mb-12 uppercase tracking-tighter">
            We Design. <br />
            We Build. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">Corporate Elite.</span>
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <button
              onClick={scrollToConsultation}
              className="bg-red-600 hover:bg-white hover:text-black text-white font-black py-6 px-12 text-[10px] uppercase tracking-[0.3em] transition-all duration-500 shadow-2xl"
            >
              Start Your Consultation
            </button>
            <Link
              href="/projects"
              className="bg-transparent border border-white/40 backdrop-blur-md hover:bg-white hover:text-black text-white font-black py-6 px-12 text-[10px] uppercase tracking-[0.3em] transition-all duration-500"
            >
              Explore Portfolio
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
           <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </div>
      <main className="bg-white">
        {/* Intro Section: Strategic SEO-Rich Storytelling */}
        <section className="py-32 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
              <div className="lg:col-span-7 space-y-10">
                <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.05] uppercase tracking-tighter">
                  The Gold Standard of <br />
                  <span className="text-red-600 font-black">Design + Build</span> in Ethiopia.
                </h2>
                
                <div className="space-y-6 text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl font-medium">
                  <p>
                    Established in 2015, <span className="text-black font-bold">Duka Interiors</span> was founded on a singular premise: that world-class interior design should be inseparable from world-class construction. We are an architect-led firm that has spent the last decade redefining the corporate and residential landscape of Addis Ababa.
                  </p>
                  <p>
                    Our approach moves beyond traditional decorating. We provide <span className="text-black font-bold text-base uppercase tracking-wider">Turnkey Office Fit-Outs</span> and high-end residential solutions that prioritize both aesthetic brilliance and structural integrity. By merging architectural visualization with on-site construction management, we eliminate the friction between "the dream" and "the delivery."
                  </p>
                  <p>
                    Whether we are designing a modern corporate headquarters in Bole or a luxury private residence, Duka Interiors guarantees transparent, fixed-cost pricing and a single point of responsibility. We don't just create spaces; we build the environments where Ethiopia’s future leaders work and live.
                  </p>
                </div>

                <div className="pt-6">
                  <Link href="/about" className="group flex items-center gap-6 font-black uppercase tracking-[0.2em] text-[10px] text-black">
                    Discover Our Philosophy <span className="group-hover:translate-x-3 transition-transform text-red-600 text-2xl">→</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative aspect-[4/5] overflow-hidden group border-[12px] border-gray-50 shadow-sm">
                  <Image
                    src="/images/duka-interiors-portfolio/modern-conference-room-and-lobby-design/modern-conference-room-addis-ababa.webp"
                    alt="Award-winning office interior design project in Addis Ababa"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute top-0 right-0 bg-red-600 text-white p-4 font-black uppercase text-[10px] tracking-widest">
                    Featured Project
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* High-Impact Performance Metrics */}
        <section className="w-full bg-black text-white py-24 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 text-center lg:text-left">
              <div className="space-y-3">
                <div className="text-5xl md:text-7xl font-black tracking-tighter text-white flex items-center justify-center lg:justify-start">
                   <AnimatedStat target={150} /><span className="text-red-600">+</span>
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600">Premium Projects</div>
              </div>
              <div className="space-y-3">
                <div className="text-5xl md:text-7xl font-black tracking-tighter text-white flex items-center justify-center lg:justify-start">
                   <AnimatedStat target={50} /><span className="text-red-600">+</span>
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600">Corporate Partners</div>
              </div>
              <div className="space-y-3">
                <div className="text-5xl md:text-7xl font-black tracking-tighter text-white flex items-center justify-center lg:justify-start">
                   <AnimatedStat target={9} /><span className="text-red-600">+</span>
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600">Years of Mastery</div>
              </div>
              <div className="flex items-center justify-center lg:justify-end">
                 <Link href="/contact" className="border-2 border-white/10 px-10 py-5 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all duration-500">
                    Partner With Us
                 </Link>
              </div>
            </div>
          </div>
        </section>
        {/* Expertise Grid: Minimalist & Architecturally Driven */}
        <section className="py-32 px-6 lg:px-12 bg-[#fafafa]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
              <div className="max-w-2xl">
                <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-red-600 mb-6">Our Capabilities</h3>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                  Tailored Spaces, <br />
                  <span className="text-gray-300 italic">Absolute Precision.</span>
                </h2>
              </div>
              <p className="text-gray-400 text-sm max-w-xs font-medium uppercase tracking-widest leading-loose">
                From structural renovation to bespoke furniture fabrication.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 border border-gray-200 shadow-2xl">
              {services.map((service, index) => (
                <div key={index} className="bg-white p-16 space-y-8 group hover:bg-black transition-all duration-700 relative overflow-hidden">
                  <div className="w-10 h-[3px] bg-red-600 group-hover:w-full transition-all duration-700"></div>
                  <h4 className="text-2xl font-black uppercase tracking-tighter group-hover:text-white transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-gray-500 group-hover:text-gray-400 transition-colors text-sm leading-relaxed font-medium">
                    {service.shortDesc}
                  </p>
                  <Link 
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-4 pt-6 text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-red-600 transition-colors"
                  >
                    View Specialty <span>→</span>
                  </Link>
                  {/* Subtle Background Numbering */}
                  <span className="absolute -bottom-4 -right-2 text-8xl font-black text-gray-50 opacity-0 group-hover:opacity-5 transition-opacity">
                    0{index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Retained Dynamic Components */}
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