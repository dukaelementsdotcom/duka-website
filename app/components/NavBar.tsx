'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Your Navigation items - Fully Restored
  const navItems = [
    { name: 'HOME', href: '/' },
    { name: 'SERVICES', href: '/services' },
    { name: 'PROJECTS', href: '/projects' },
    { name: 'ABOUT', href: '/about' },
    { name: 'RESOURCES', href: '/resources' },
    { name: 'CONTACT', href: '/contact' },
  ];

  // Your Contact info - Fully Restored
  const phones = [
    { number: '+251940607055', label: '+251 940 607 055' },
    { number: '+251929144290', label: '+251 929 144 290' },
  ];

  // Your Social links - Fully Restored
  const socialLinks = [
    { name: 'WhatsApp', href: 'https://wa.me/251940607055', icon: 'fab fa-whatsapp' },
    { name: 'Telegram', href: 'https://t.me/dukainteriorsplc', icon: 'fab fa-telegram' },
    { name: 'Facebook', href: 'https://www.facebook.com/dukainteriors', icon: 'fab fa-facebook-f' },
    { name: 'Instagram', href: 'https://www.instagram.com/dukainteriors', icon: 'fab fa-instagram' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/duka-interiors', icon: 'fab fa-linkedin-in' },
    { name: 'TikTok', href: 'https://www.tiktok.com/@duka.interiors.plc', icon: 'fab fa-tiktok' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed w-full z-[100]">
      {/* 1. TOP UTILITY BAR: High Visibility Phone & Socials */}
      <div className={`hidden lg:flex py-2.5 px-12 justify-between items-center transition-all duration-300 ${
        isScrolled ? 'bg-black/90' : 'bg-[#0a0a0a]'
      } border-b border-white/10`}>
        
        {/* Left Side: Phones with visual anchors */}
        <div className="flex gap-10 items-center">
          {phones.map((p) => (
            <a 
              key={p.number} 
              href={`tel:${p.number}`} 
              className="flex items-center text-[12px] font-black tracking-widest text-white hover:text-red-600 transition-colors group"
            >
              <i className="fas fa-phone-alt mr-2.5 text-red-600 text-sm"></i>
              {p.label}
            </a>
          ))}
        </div>

        {/* Right Side: Social Icons - Bold and Bright */}
        <div className="flex items-center gap-6">
          <span className="text-[10px] font-black text-white/40 tracking-[0.2em] mr-2">FOLLOW US:</span>
          {socialLinks.map((s) => (
            <a 
              key={s.name} 
              href={s.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg text-white hover:text-red-600 transition-all transform hover:scale-125"
              title={s.name}
            >
              <i className={s.icon}></i>
            </a>
          ))}
        </div>
      </div>

      {/* 2. MAIN NAVIGATION: Logo and Menu */}
      <nav className={`w-full transition-all duration-500 px-6 lg:px-12 ${
        isScrolled 
          ? 'bg-white py-3 shadow-2xl' 
          : 'bg-black/40 backdrop-blur-md py-6'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* THE LOGO: Increased size and visibility logic */}
          <Link href="/" className="relative flex items-center group">
            <Image
              src="/images/icons-duka-interiors/logo-duka-interiors-big.svg"
              alt="Duka Interiors Logo"
              width={200} // Increased for presence
              height={60}
              priority
              className={`h-12 md:h-14 w-auto transition-all duration-500 ${
                !isScrolled ? 'brightness-0 invert' : ''
              }`}
            />
          </Link>

          {/* DESKTOP LINKS: Bold tracking for luxury feel */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-[13px] font-black tracking-[0.2em] transition-all relative group ${
                  isScrolled ? 'text-gray-900 hover:text-red-600' : 'text-white hover:text-red-600'
                }`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* MOBILE TOGGLE */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 ${isScrolled ? 'text-gray-900' : 'text-white'}`}
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU: Full Visibility Overrides */}
      <div className={`fixed inset-0 bg-black z-[120] transition-transform duration-500 lg:hidden ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-between items-center mb-12">
            <Image src="/images/icons-duka-interiors/logo-duka-interiors-big.svg" alt="Logo" width={160} height={50} className="brightness-0 invert" />
            <button onClick={() => setIsMenuOpen(false)} className="text-white text-4xl">&times;</button>
          </div>
          <div className="flex flex-col gap-6">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                onClick={() => setIsMenuOpen(false)}
                className="text-white text-4xl font-bold tracking-tighter hover:text-red-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="mt-auto border-t border-white/10 pt-8">
            <div className="flex flex-col gap-4">
              {phones.map(p => (
                <a key={p.number} href={`tel:${p.number}`} className="text-red-600 text-xl font-black tracking-widest">{p.label}</a>
              ))}
            </div>
            <div className="flex gap-6 mt-8">
              {socialLinks.map(s => (
                <a key={s.name} href={s.href} className="text-white text-2xl"><i className={s.icon}></i></a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}