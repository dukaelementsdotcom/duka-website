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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      {/* TOP UTILITY BAR - Solid for readability */}
      <div className={`hidden lg:flex py-2 px-8 justify-between items-center border-b transition-colors duration-300 ${
        isScrolled ? 'bg-black border-white/10' : 'bg-[#1a1a1a]/90 border-white/5'
      }`}>
        <div className="flex gap-8 items-center text-white/70">
          {phones.map((p) => (
            <a key={p.number} href={`tel:${p.number}`} className="text-[10px] font-bold tracking-widest hover:text-[#c73e1d] transition-colors flex items-center gap-2">
              <i className="fas fa-phone-alt text-[9px] text-[#c73e1d]"></i> {p.label}
            </a>
          ))}
          <a href="mailto:contact@dukainteriors.com" className="text-[10px] font-bold tracking-widest hover:text-[#c73e1d] transition-colors uppercase">
            contact@dukainteriors.com
          </a>
        </div>
        <div className="flex gap-5">
          {socialLinks.map((s) => (
            <a key={s.name} href={s.href} target="_blank" className="text-white/60 hover:text-[#c73e1d] transition-colors text-xs">
              <i className={s.icon}></i>
            </a>
          ))}
        </div>
      </div>

      {/* MAIN NAV - 40% Transparent when at top */}
      <div className={`transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-white py-3 border-gray-200 shadow-sm' 
          : 'bg-white/40 backdrop-blur-md py-6 border-white/20'
      }`}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-10 flex items-center justify-between">
          
          <Link href="/" className="relative z-[110]">
            <Image
              src="/images/icons-duka-interiors/logo-duka-interiors-big.svg"
              alt="Duka Interiors"
              width={160}
              height={50}
              priority
              className={`h-10 w-auto transition-all ${!isScrolled ? 'brightness-0' : ''}`}
            />
          </Link>

          <nav className="hidden lg:flex items-center">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const linkColor = isScrolled ? 'text-black' : 'text-black font-medium';
              
              return (
                <div 
                  key={item.name} 
                  className="relative px-5 group"
                  onMouseEnter={() => item.hasDropdown && setIsDropdownOpen(true)}
                  onMouseLeave={() => item.hasDropdown && setIsDropdownOpen(false)}
                >
                  <Link 
                    href={item.href} 
                    className={`text-[12px] font-bold tracking-[0.15em] transition-colors flex items-center gap-1.5 ${
                      isActive ? 'text-[#c73e1d]' : `${linkColor} hover:text-[#c73e1d]`
                    }`}
                  >
                    {item.name}
                    {item.hasDropdown && <i className={`fas fa-chevron-down text-[8px] opacity-40 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}></i>}
                    {item.comingSoon && <span className="text-[7px] bg-red-600 text-white px-1.5 py-0.5 rounded-sm font-black ml-1">SOON</span>}
                  </Link>

                  {/* FLAT DROPDOWN */}
                  {item.hasDropdown && (
                    <div className={`absolute top-full left-0 w-60 bg-white border border-gray-100 shadow-xl mt-[24px] transition-all duration-200 ${isDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                      {item.subItems?.map((sub) => (
                        <Link key={sub.name} href={sub.href} className="block px-6 py-4 text-[10px] font-bold tracking-widest text-gray-700 hover:bg-gray-50 hover:text-[#c73e1d] border-b border-gray-50 last:border-0 transition-all">
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
              className="hidden md:block bg-[#c73e1d] text-white px-7 py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-colors"
            >
              Start Project
            </Link>

            {/* FLAT MOBILE TOGGLE */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            >
              <span className={`h-0.5 w-6 bg-black transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`h-0.5 w-6 bg-black transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`h-0.5 w-6 bg-black transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU - CLEAN & CONTENT-FIRST */}
      <div className={`fixed inset-0 z-[105] transition-all duration-500 ${isMenuOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMenuOpen(false)}></div>
        
        <div className={`absolute top-0 right-0 w-[85%] max-w-sm h-full bg-white shadow-2xl transition-transform duration-500 flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 border-b flex justify-between items-center">
            <Image src="/images/icons-duka-interiors/logo-duka-interiors-big.svg" alt="Duka" width={120} height={40} />
            <button onClick={() => setIsMenuOpen(false)} className="text-3xl font-light">&times;</button>
          </div>

          <nav className="flex-grow p-6 overflow-y-auto">
            {navItems.map((item, i) => (
              <div key={item.name} className="mb-6">
                <Link 
                  href={item.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-bold text-gray-900 uppercase tracking-tighter hover:text-[#c73e1d] flex justify-between items-center"
                >
                  {item.name}
                  <span className="text-[10px] text-gray-300">0{i+1}</span>
                </Link>
                {item.subItems && (
                  <div className="mt-2 ml-2 border-l-2 border-gray-100 pl-4 space-y-3 pt-2">
                    {item.subItems.map(sub => (
                      <Link key={sub.name} href={sub.href} onClick={() => setIsMenuOpen(false)} className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest hover:text-[#c73e1d]">
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* RETAINED MOBILE CONTENT */}
          <div className="bg-gray-50 p-8 border-t">
            <div className="mb-6">
              <p className="text-[9px] font-black text-gray-400 tracking-widest uppercase mb-3">Reach Us</p>
              {phones.map(p => <a key={p.number} href={`tel:${p.number}`} className="block text-sm font-bold text-gray-800 mb-2">{p.label}</a>)}
            </div>
            <div className="flex gap-4 mb-6">
              {socialLinks.map(s => <a key={s.name} href={s.href} target="_blank" className="text-xl text-gray-400 hover:text-[#c73e1d]"><i className={s.icon}></i></a>)}
            </div>
            <Link 
              href="/contact" 
              onClick={() => setIsMenuOpen(false)}
              className="block w-full bg-black text-white py-4 text-center text-[10px] font-bold uppercase tracking-widest hover:bg-[#c73e1d] transition-all"
            >
              Start Project
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}