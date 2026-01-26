'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation'; // Added for auto-exit logic

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Auto-close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

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
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed w-full z-[100] font-sans transition-all duration-500">
      
      {/* 1. TOP UTILITY: Now stays visible (Sticky) */}
      <div className={`hidden lg:flex px-12 items-center justify-between transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-black/95 py-1.5 border-white/5' 
          : 'bg-black/60 backdrop-blur-md py-3 border-white/10'
      }`}>
        <div className="flex gap-10">
          {phones.map((p) => (
            <a key={p.number} href={`tel:${p.number}`} className="text-[10px] uppercase tracking-[0.25em] text-white/80 hover:text-red-600 transition-colors font-medium">
              <span className="text-red-600 mr-2 font-bold">•</span> {p.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-5">
          {socialLinks.map((s) => (
            <a key={s.name} href={s.href} target="_blank" className="text-xs text-white/40 hover:text-white transition-all transform hover:scale-110">
              <i className={s.icon}></i>
            </a>
          ))}
        </div>
      </div>

      {/* 2. MAIN NAV: Never fully transparent */}
      <nav className={`w-full transition-all duration-500 px-8 lg:px-16 ${
        isScrolled 
          ? 'bg-white py-3 shadow-lg' 
          : 'bg-black/40 backdrop-blur-lg py-6'
      }`}>
        <div className="max-w-[1800px] mx-auto flex justify-between items-center">
          
          <Link href="/" className="relative transition-transform duration-500">
            <Image
              src="/images/icons-duka-interiors/logo-duka-interiors-big.svg"
              alt="Duka Interiors"
              width={200}
              height={50}
              priority
              className={`h-9 md:h-11 w-auto transition-all duration-700 ${
                !isScrolled ? 'brightness-0 invert' : 'brightness-100'
              }`}
            />
          </Link>

          {/* NAV LINKS: Designer Typography */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-[11px] font-bold tracking-[0.3em] uppercase transition-all duration-300 relative group ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-2 left-0 w-0 h-[2px] bg-red-600 transition-all duration-300 group-hover:w-full`}></span>
              </Link>
            ))}
          </div>

          {/* MOBILE TOGGLE */}
          <button 
            onClick={() => setIsMenuOpen(true)} 
            className={`lg:hidden flex flex-col gap-1.5 p-2 ${isScrolled ? 'text-gray-900' : 'text-white'}`}
          >
            <span className="w-7 h-[2px] bg-current"></span>
            <span className="w-7 h-[2px] bg-current"></span>
          </button>
        </div>
      </nav>

      {/* 3. MOBILE OVERLAY: Auto-exits on click */}
      <div className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-[200] flex flex-col transition-all duration-500 ${
        isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className="p-8 flex justify-between items-center border-b border-white/5">
          <Image src="/images/icons-duka-interiors/logo-duka-interiors-big.svg" alt="Logo" width={160} height={40} className="brightness-0 invert" />
          <button onClick={() => setIsMenuOpen(false)} className="text-white font-thin text-5xl p-4">&times;</button>
        </div>
        
        <div className="flex flex-col justify-center items-center flex-grow gap-8">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              // onClick is handled by useEffect on pathname, but we keep this for redundancy
              onClick={() => setIsMenuOpen(false)}
              className="text-white text-2xl font-light tracking-[0.3em] uppercase hover:text-red-600 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="p-10 border-t border-white/10 flex flex-col items-center gap-6 bg-black">
          <div className="flex gap-8">
            {socialLinks.map(s => (
              <a key={s.name} href={s.href} className="text-white/40 text-2xl hover:text-red-600"><i className={s.icon}></i></a>
            ))}
          </div>
          <div className="flex flex-col items-center">
             {phones.map(p => (
               <a key={p.number} href={`tel:${p.number}`} className="text-red-600 text-sm tracking-[0.2em] font-bold mt-2 uppercase">{p.label}</a>
             ))}
          </div>
        </div>
      </div>
    </header>
  );
}