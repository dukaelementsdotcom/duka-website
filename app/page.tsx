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

      <div className="relative h-screen overflow-hidden pt-20">
        <Image
          src="/images/duka-interiors-portfolio/modern-conference-room-and-lobby-design/modern-board-room-habesha-breweries.webp"
          alt="Luxury executive office reception design by Duka Interiors"
          fill
          style={{ objectFit: 'cover' }}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          {/* Back to your original font sizes: text-4xl md:text-5xl lg:text-6xl */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight max-w-4xl mb-8 text-shadow-lg uppercase">
            WE DESIGN <br />
            WE BUILD <br />
            <span className="text-red-600 font-semibold">EXCEPTIONAL INTERIORS</span> <br />
            IN ADDIS ABABA
          </h1>
          <button
            onClick={scrollToConsultation}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Get a Free Consultation
          </button>
        </div>
      </div>
      <main className="pt-0 bg-white">
        <section className="py-20 px-6 lg:px-8 bg-gray-50">
          <div className="mx-auto w-full max-w-[80vw] lg:max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  SETTING THE STANDARD FOR OFFICE EXCELLENCE IN ADDIS ABABA SINCE 2015
                </h2>
                <div className="text-gray-600 text-base md:text-lg leading-relaxed space-y-4">
                  <p>
                    Established in 2015, <span className="font-bold text-black">Duka Interiors</span> was founded on a singular premise: that world-class interior design should be inseparable from world-class construction. We are an architect-led firm that has spent the last decade redefining the corporate and residential landscape of Ethiopia.
                  </p>
                  <p>
                    Our approach moves beyond traditional decorating. We provide <span className="font-bold text-black uppercase text-sm tracking-wide">Turnkey Office Fit-Outs</span> and high-end residential solutions that prioritize both aesthetic brilliance and structural integrity. By merging architectural visualization with on-site construction management, we eliminate the friction between "the dream" and "the delivery."
                  </p>
                  <p>
                    Whether we are designing a modern corporate headquarters in Bole or a luxury private residence, Duka Interiors guarantees transparent, fixed-cost pricing and a single point of responsibility. We don't just create spaces; we build the environments where Ethiopia’s future leaders work and live.
                  </p>
                </div>
              </div>

              {/* IMAGE LINK RESTORED HERE */}
              <Link href="/projects/modern-conference-room-and-lobby-design" className="block">
                <div className="relative min-h-[400px] overflow-hidden rounded-none border border-gray-200 group">
                  <Image
                    src="/images/duka-interiors-portfolio/modern-conference-room-and-lobby-design/modern-conference-room-addis-ababa.webp"
                    alt="Modern conference room and lobby design by Duka Interiors"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-90 text-white flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                    <span className="px-6 py-2 bg-red-600 text-white font-bold text-xs uppercase tracking-wide min-w-[120px] text-center">
                      See Project
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Black Bar Stats */}
        <section className="w-full bg-black text-white py-8">
          <div className="max-w-[80vw] lg:max-w-6xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
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

              <div className="flex flex-col sm:flex-row gap-4 whitespace-nowrap">
                <Link href="/about" className="px-8 py-3 bg-red-600 text-white font-bold text-sm uppercase tracking-wide hover:bg-red-700 transition-colors duration-300 min-w-[180px] text-center">
                  Learn More About Us
                </Link>
                <Link href="/contact" className="px-8 py-3 border-2 border-gray-400 text-white font-bold text-sm uppercase tracking-wide hover:border-white transition-colors duration-300 min-w-[180px] text-center">
                  Start Your Project
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="py-24 px-6 lg:px-8 bg-gray-50">
          <div className="mx-auto w-full max-w-[80vw] lg:max-w-6xl text-center">
            <div className="inline-block px-5 py-2 bg-red-600 text-white text-xs font-bold uppercase tracking-wider mb-6">
              Our Services
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight max-w-4xl mx-auto mb-4">
              INTERIOR DESIGN & BUILD IN ADDIS ABABA — FROM VISION TO REALITY.
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto mb-12">
              Single-point responsibility. Transparent pricing. Exceptional spaces.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr text-left">
              {services.map((service, index) => (
                <div key={index} className="group relative bg-white border border-gray-200 transition-all duration-500 hover:shadow-2xl overflow-hidden">
                  <div className="p-6 pt-8 flex flex-col h-full items-center text-center">
                    <div className="text-2xl font-bold text-red-600 mb-4 group-hover:scale-110 transition-transform">★</div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4 leading-tight group-hover:text-red-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                      {service.shortDesc}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/90 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                    <Link href={`/services/${service.slug}`} className="px-6 py-2 bg-red-600 text-white font-bold text-xs uppercase tracking-wide hover:bg-red-700 transition-all pointer-events-auto min-w-[120px] text-center shadow-lg mx-auto">
                      Learn More
                    </Link>
                  </div>
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