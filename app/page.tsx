'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Dynamic imports for performance
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
  
  // Reference for Smooth Scroll
  const consultationRef = useRef<HTMLDivElement>(null);

  const scrollToConsultation = () => {
    // This finds the FinalCTA or Contact section and scrolls smoothly
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

      {/* Hero Section: Replaced Mailto with Smooth Scroll */}
      <div className="relative h-screen overflow-hidden">
        <Image
          src="/images/duka-interiors-portfolio/modern-conference-room-and-lobby-design/modern-board-room-habesha-breweries.webp"
          alt="Luxury executive office reception design by Duka Interiors"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <p className="text-red-600 font-black tracking-[0.4em] uppercase text-xs mb-4 animate-fade-in">
            Established 2015
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] max-w-5xl mb-10 uppercase tracking-tighter">
            We Design. <br />
            We Build. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Exceptional.</span>
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <button
              onClick={scrollToConsultation}
              className="bg-red-600 hover:bg-white hover:text-black text-white font-black py-5 px-10 text-[10px] uppercase tracking-[0.2em] transition-all duration-500 shadow-2xl"
            >
              Get a Free Consultation
            </button>
            <Link
              href="/projects"
              className="bg-transparent border border-white/30 backdrop-blur-sm hover:bg-white hover:text-black text-white font-black py-5 px-10 text-[10px] uppercase tracking-[0.2em] transition-all duration-500"
            >
              View Portfolio
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50">
           <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </div>
      <main className="bg-white">
        {/* Intro Section */}
        <section className="py-32 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-7 space-y-8">
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1] uppercase tracking-tighter">
                  Setting the Standard for <br />
                  <span className="text-red-600">Office Excellence</span> in Addis.
                </h2>
                <div className="h-1 w-20 bg-red-600"></div>
                <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl font-medium">
                  Since 2015, Duka Interiors has delivered single-point Design + Build solutions. 
                  We eliminate the stress of coordinating multiple contractors by providing 
                  a unified, transparent journey from concept to occupation.
                </p>
                <div className="pt-4">
                  <Link href="/about" className="group flex items-center gap-4 font-black uppercase tracking-widest text-xs">
                    Our Story <span className="group-hover:translate-x-2 transition-transform text-red-600 text-xl">→</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative aspect-square lg:aspect-[4/5] overflow-hidden group border border-gray-100">
                  <Image
                    src="/images/duka-interiors-portfolio/modern-conference-room-and-lobby-design/modern-conference-room-addis-ababa.webp"
                    alt="Modern conference room design"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section: Redesigned for High Contrast */}
        <section className="w-full bg-black text-white py-20 border-y border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              <div className="space-y-2">
                <div className="text-4xl md:text-6xl font-black tracking-tighter flex items-center">
                   <AnimatedStat target={150} /><span className="text-red-600">+</span>
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Projects Built</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-6xl font-black tracking-tighter flex items-center">
                   <AnimatedStat target={50} /><span className="text-red-600">+</span>
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Happy Clients</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-6xl font-black tracking-tighter flex items-center">
                   <AnimatedStat target={9} /><span className="text-red-600">+</span>
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Years Experience</div>
              </div>
              <div className="flex items-center justify-end">
                 <Link href="/contact" className="hidden lg:block border border-white/20 px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    Start Your Project
                 </Link>
              </div>
            </div>
          </div>
        </section>
        {/* Services Section */}
        <section className="py-32 px-6 lg:px-12 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 mb-4">Our Expertise</h3>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Vision to Reality.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-gray-200 border border-gray-200">
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
                    Explore Service +
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Components */}
        <Gallery />
        <ClientLogosFinal />
        <Testimonials />
        
        {/* ID added for the smooth scroll anchor */}
        <div id="final-cta">
          <FinalCTA />
        </div>
        
        <Footer />
      </main>
    </>
  );
}