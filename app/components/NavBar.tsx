'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: 'HOME', href: '/' },
    { name: 'SERVICES', href: '/services' },
    { name: 'PROJECTS', href: '/projects' },
    { name: 'ABOUT', href: '/about' },
    { name: 'RESOURCES', href: '/resources' },
    { name: 'CONTACT', href: '/contact' },
  ];

  const phones = [
    { number: '+251940607055', label: '+251 940 607 055' },
    { number: '+251929144290', label: '+251 929 144 290' },
  ];

  const socialLinks = [
    { name: 'WhatsApp', href: 'https://wa.me/251940607055', icon: 'fab fa-whatsapp' },
    { name: 'Telegram', href: 'https://t.me/dukainteriorsplc', icon: 'fab fa-telegram' },
    { name: 'Facebook', href: 'https://www.facebook.com/dukainteriors', icon: 'fab fa-facebook-f' },
    { name: 'Instagram', href: 'https://www.instagram.com/dukainteriors', icon: 'fab fa-instagram' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/duka-interiors', icon: 'fab fa-linkedin-in' },
    { name: 'TikTok', href: 'https://www.tiktok.com/@duka.interiors.plc', icon: 'fab fa-tiktok' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed w-full z-[100] font-sans">
      {/* 1. TOP UTILITY: Minimalist & Clean */}
      <div className={`hidden lg:flex py-3 px-12 justify-between items-center transition-all duration-700 ${
        isScrolled ? 'bg-black translate-y-[-100%]' : 'bg-transparent border-b border-white/10'
      }`}>
        <div className="flex gap-12">
          {phones.map((p) => (
            <a key={p.number} href={`tel:${p.number}`} className="text-[10px] uppercase tracking-[0.3em] text-white/70 hover:text-white transition-colors font-light">
              <span className="text-red-600 mr-2">/</span> {p.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-6">
          {socialLinks.map((s) => (
            <a key={s.name} href={s.href} target="_blank" className="text-xs text-white/50 hover:text-red-600 transition-all">
              <i className={s.icon}></i>
            </a>
          ))}
        </div>
      </div>

      {/* 2. MAIN NAV: Architectural Spacing */}
      <nav className={`w-full transition-all duration-700 ease-in-out px-8 lg:px-16 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-10'
      }`}>
        <div className="max-w-[1800px] mx-auto flex justify-between items-center">
          
          {/* LOGO: Scaled for elegance */}
          <Link href="/" className="relative transition-transform duration-500 hover:scale-105">
            <Image
              src="/images/icons-duka-interiors/logo-duka-interiors-big.svg"
              alt="Duka Interiors"
              width={220}
              height={60}
              priority
              className={`h-8 md:h-10 w-auto transition-all duration-700 ${
                !isScrolled ? 'brightness-0 invert' : 'brightness-100'
              }`}
            />
          </Link>

          {/* NAV LINKS: Designer Typography (Thin + Wide) */}
          <div className="hidden lg:flex items-center gap-12">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-[11px] font-medium tracking-[0.4em] uppercase transition-all duration-500 relative group ${
                  isScrolled ? 'text-gray-900' : 'text-white/90'
                }`}
              >
                {item.name}
                <span className="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-red-600 transition-all duration-500 group-hover:w-full group-hover:left-0"></span>
              </Link>
            ))}
          </div>

          {/* MOBILE TOGGLE: Minimalist lines */}
          <button onClick={() => setIsMenuOpen(true)} className={`lg:hidden flex flex-col gap-1.5 ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
            <span className="w-8 h-[1px] bg-current"></span>
            <span className="w-5 h-[1px] bg-current self-end"></span>
          </button>
        </div>
      </nav>

      {/* 3. MOBILE OVERLAY: High-End Fashion Style */}
      <div className={`fixed inset-0 bg-[#0a0a0a] z-[200] flex flex-col transition-all duration-700 ease-in-out ${
        isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className="p-8 flex justify-between items-center">
          <Image src="/images/icons-duka-interiors/logo-duka-interiors-big.svg" alt="Logo" width={180} height={40} className="brightness-0 invert" />
          <button onClick={() => setIsMenuOpen(false)} className="text-white font-thin text-5xl">&times;</button>
        </div>
        
        <div className="flex flex-col justify-center items-center flex-grow gap-6">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              onClick={() => setIsMenuOpen(false)}
              className="text-white text-3xl font-light tracking-[0.2em] uppercase hover:text-red-600 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="p-12 border-t border-white/5 grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-red-600 text-[10px] tracking-[0.3em] mb-2 uppercase">Connect</p>
            <div className="flex gap-4">
              {socialLinks.slice(0, 4).map(s => (
                <a key={s.name} href={s.href} className="text-white/60 text-xl"><i className={s.icon}></i></a>
              ))}
            </div>
          </div>
          <div className="flex flex-col text-right">
             <p className="text-red-600 text-[10px] tracking-[0.3em] mb-2 uppercase">Inquiries</p>
             {phones.map(p => (
               <a key={p.number} href={`tel:${p.number}`} className="text-white/60 text-xs tracking-widest">{p.label}</a>
             ))}
          </div>
        </div>
      </div>
    </header>
  );
}