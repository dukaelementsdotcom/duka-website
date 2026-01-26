'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const phones = [
    { number: '+251940607055', label: '+251 940 607 055' },
    { number: '+251929144290', label: '+251 929 144 290' },
  ];

  const socialLinks = [
    { name: 'WhatsApp', href: 'https://wa.me/251940607055', icon: 'fab fa-whatsapp' },
    { name: 'Telegram', href: 'https://t.me/dukainteriorsplc', icon: 'fab fa-telegram' },
    { name: 'Instagram', href: 'https://www.instagram.com/dukainteriors', icon: 'fab fa-instagram' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/duka-interiors', icon: 'fab fa-linkedin-in' },
  ];

  const navItems = [
    { name: 'HOME', href: '/' },
    { name: 'SERVICES', href: '/services' },
    { name: 'PROJECTS', href: '/projects' },
    { name: 'ABOUT', href: '/about' },
    { name: 'CONTACT', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed w-full z-[100] transition-all duration-300">
      {/* 1. HIGH-VISIBILITY TOP UTILITY BAR */}
      <div className={`hidden lg:flex justify-between items-center px-12 py-2 transition-all duration-300 ${
        isScrolled ? 'bg-black h-0 opacity-0 overflow-hidden' : 'bg-[#0a0a0a] border-b border-white/10 opacity-100'
      }`}>
        <div className="flex gap-8">
          {phones.map((p) => (
            <a key={p.number} href={`tel:${p.number}`} className="flex items-center text-[11px] font-bold tracking-widest text-white hover:text-red-600 transition-colors group">
              <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center mr-2 group-hover:bg-red-600 transition-all">
                <i className="fas fa-phone-alt text-[9px]"></i>
              </span>
              {p.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-5">
          <span className="text-[9px] font-black text-white/40 tracking-[0.2em]">FOLLOW US</span>
          {socialLinks.map((s) => (
            <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-red-600 hover:scale-125 transition-all text-sm">
              <i className={s.icon}></i>
            </a>
          ))}
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <nav className={`transition-all duration-500 px-6 lg:px-12 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md py-3 shadow-xl border-b border-gray-100' 
          : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* LOGO - Balanced & Interactive */}
          <Link href="/" className="relative flex items-center group">
            <div className="relative">
              <Image
                src="/images/icons-duka-interiors/logo-duka-interiors-big.svg"
                alt="Duka Interiors Logo"
                width={180}
                height={50}
                priority
                className={`h-10 md:h-12 w-auto transition-all duration-500 ${
                  !isScrolled ? 'brightness-0 invert' : ''
                }`}
              />
              {/* Subtle visual anchor underline */}
              <span className={`absolute -bottom-1 left-0 h-[2px] bg-red-600 transition-all duration-500 ${isScrolled ? 'w-0 group-hover:w-full' : 'w-0'}`}></span>
            </div>
          </Link>

          {/* DESKTOP MENU ITEMS */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-[12px] font-black tracking-[0.15em] transition-all hover:text-red-600 relative group ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <Link
              href="/contact"
              className={`px-6 py-2.5 text-[11px] font-black tracking-widest transition-all ${
                isScrolled 
                ? 'bg-red-600 text-white hover:bg-black' 
                : 'bg-white text-black hover:bg-red-600 hover:text-white'
              }`}
            >
              FREE QUOTE
            </Link>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`h-0.5 w-full bg-current transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`h-0.5 w-full bg-current transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`h-0.5 w-full bg-current transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY - High Visibility */}
      <div className={`fixed inset-0 bg-black z-[120] transition-all duration-500 lg:hidden ${
        isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}>
        <div className="flex flex-col h-full p-10">
          <div className="flex justify-between items-center mb-16">
            <Image src="/images/icons-duka-interiors/logo-duka-interiors-big.svg" alt="Logo" width={140} height={40} className="brightness-0 invert" />
            <button onClick={() => setIsMenuOpen(false)} className="text-white text-3xl">&times;</button>
          </div>
          <div className="flex flex-col gap-8">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                onClick={() => setIsMenuOpen(false)}
                className="text-white text-3xl font-light hover:text-red-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="mt-auto pt-10 border-t border-white/10">
            <p className="text-red-600 font-bold mb-4 tracking-widest text-xs">CONTACT US</p>
            {phones.map(p => (
              <a key={p.number} href={`tel:${p.number}`} className="block text-white text-lg mb-2">{p.label}</a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}