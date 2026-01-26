'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 1. Scroll Detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. AUTO-CLOSE MOBILE MENU ON RESIZE (Fixes your desktop transition bug)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // 3. Body Scroll Lock
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  const navItems = [
    { name: 'HOME', href: '/' },
    { name: 'SERVICES', href: '/services' },
    { name: 'PROJECTS', href: '/projects' },
    { name: 'ABOUT', href: '/about' },
    { 
      name: 'RESOURCES', 
      href: '/resources',
      hasDropdown: true,
      subItems: [
        { name: 'Insights & Blog', href: '/resources' },
        { name: 'Material Guides', href: '/resources/materials' },
        { name: 'Renovation FAQ', href: '/resources/faq' }
      ]
    },
    { name: 'PRODUCTS', href: '/products', comingSoon: true },
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

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] font-sans">
      {/* SOLID TOP BAR */}
      <div className={`hidden lg:flex py-1.5 px-8 justify-between items-center bg-[#111] text-white/70 border-b border-white/5`}>
        <div className="flex gap-6 items-center">
          {phones.map((p) => (
            <a key={p.number} href={`tel:${p.number}`} className="text-[10px] font-semibold tracking-wider hover:text-[#c73e1d] transition-colors">
              <i className="fas fa-phone-alt mr-2 text-[#c73e1d]"></i>{p.label}
            </a>
          ))}
        </div>
        <div className="flex gap-4">
          {socialLinks.map((s) => (
            <a key={s.name} href={s.href} target="_blank" className="text-xs hover:text-[#c73e1d] transition-colors"><i className={s.icon}></i></a>
          ))}
        </div>
      </div>

      {/* MAIN NAV - 40% Transparency at top */}
      <div className={`transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-white py-2 border-gray-200 shadow-md' 
          : 'bg-white/40 backdrop-blur-md py-4 border-white/20'
      }`}>
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8 flex items-center justify-between">
          
          <Link href="/" className="relative z-[110]">
            <Image
              src="/images/icons-duka-interiors/logo-duka-interiors-big.svg"
              alt="Duka Interiors"
              width={140}
              height={45}
              priority
              className="h-8 w-auto"
            />
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <div 
                  key={item.name} 
                  className="relative group px-4 py-2"
                  onMouseEnter={() => item.hasDropdown && setIsDropdownOpen(true)}
                  onMouseLeave={() => item.hasDropdown && setIsDropdownOpen(false)}
                >
                  <Link 
                    href={item.href} 
                    className={`text-[11px] font-bold tracking-widest transition-colors flex items-center gap-1.5 ${
                      isActive ? 'text-[#c73e1d]' : 'text-gray-900 hover:text-[#c73e1d]'
                    }`}
                  >
                    {item.name}
                    {item.hasDropdown && <i className="fas fa-chevron-down text-[8px] opacity-40"></i>}
                    {item.comingSoon && <span className="text-[8px] bg-[#c73e1d] text-white px-1.5 py-0.5 rounded font-black">SOON</span>}
                  </Link>

                  {item.hasDropdown && (
                    <div className={`absolute top-full left-0 w-56 bg-white border border-gray-100 shadow-xl py-2 mt-0 transition-all duration-200 ${isDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                      {item.subItems?.map((sub) => (
                        <Link key={sub.name} href={sub.href} className="block px-6 py-3 text-[10px] font-bold tracking-widest text-gray-700 hover:bg-gray-50 hover:text-[#c73e1d]">
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link 
              href="/contact" 
              className="hidden md:block bg-[#c73e1d] text-white px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all"
            >
              Start Project
            </Link>

            {/* HAMBURGER */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-900"
              aria-label="Toggle Menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`h-0.5 w-full bg-current transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`h-0.5 w-full bg-current transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`h-0.5 w-full bg-current transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU - FIXED OVERLAP & TYPOGRAPHY */}
      <div className={`fixed inset-0 z-[120] lg:hidden transition-all duration-500 ${isMenuOpen ? 'visible' : 'invisible'}`}>
        {/* Transparent backdrop */}
        <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMenuOpen(false)}></div>
        
        {/* Sliding Panel */}
        <div className={`absolute top-0 right-0 w-[85%] max-w-sm h-full bg-white shadow-2xl transition-transform duration-500 flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          
          {/* Mobile Header Inside Panel */}
          <div className="p-5 border-b flex justify-between items-center bg-white">
            <Image src="/images/icons-duka-interiors/logo-duka-interiors-big.svg" alt="Duka" width={110} height={35} />
            <button onClick={() => setIsMenuOpen(false)} className="w-10 h-10 flex items-center justify-center text-2xl font-light hover:text-[#c73e1d]">&times;</button>
          </div>

          <nav className="flex-grow p-6 overflow-y-auto bg-white">
            {navItems.map((item, i) => (
              <div key={item.name} className="mb-4">
                <Link 
                  href={item.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-xl font-bold uppercase tracking-tight flex justify-between items-center ${pathname === item.href ? 'text-[#c73e1d]' : 'text-gray-900'}`}
                >
                  {item.name}
                  <span className="text-[9px] font-mono text-gray-300">/ 0{i+1}</span>
                </Link>
                {item.subItems && (
                  <div className="mt-2 ml-4 border-l-2 border-gray-50 pl-4 space-y-2 py-1">
                    {item.subItems.map(sub => (
                      <Link key={sub.name} href={sub.href} onClick={() => setIsMenuOpen(false)} className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-[#c73e1d]">
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* MOBILE FOOTER - Restored & Scaled Correctly */}
          <div className="p-8 bg-gray-50 border-t">
            <p className="text-[9px] font-black text-gray-400 tracking-[0.2em] uppercase mb-4">REACH US</p>
            <div className="space-y-2 mb-6">
              {phones.map(p => <a key={p.number} href={`tel:${p.number}`} className="block text-sm font-bold text-gray-800 hover:text-[#c73e1d] transition-colors">{p.label}</a>)}
            </div>
            <div className="flex gap-5 mb-8">
              {socialLinks.map(s => <a key={s.name} href={s.href} target="_blank" className="text-xl text-gray-400 hover:text-[#c73e1d] transition-colors"><i className={s.icon}></i></a>)}
            </div>
            <Link 
              href="/contact" 
              onClick={() => setIsMenuOpen(false)}
              className="block w-full bg-black text-white py-4 text-center text-[11px] font-black uppercase tracking-widest hover:bg-[#c73e1d] transition-colors"
            >
              Start Project
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}