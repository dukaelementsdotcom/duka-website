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
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
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
      {/* TOP UTILITY BAR - Solid & High Contrast */}
      <div className="hidden lg:flex bg-[#1a1a1a] text-white/80 py-2 px-8 justify-between items-center border-b border-white/5">
        <div className="flex gap-8 items-center">
          {phones.map((p) => (
            <a key={p.number} href={`tel:${p.number}`} className="text-[10px] font-bold tracking-[0.1em] hover:text-[#c73e1d] transition-colors flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#c73e1d] rounded-full"></span> {p.label}
            </a>
          ))}
          <a href="mailto:contact@dukainteriors.com" className="text-[10px] font-bold tracking-[0.1em] hover:text-[#c73e1d] transition-colors">
            CONTACT@DUKAINTERIORS.COM
          </a>
        </div>
        <div className="flex gap-4">
          {socialLinks.map((s) => (
            <a key={s.name} href={s.href} target="_blank" className="text-xs hover:text-[#c73e1d] transition-colors">
              <i className={s.icon}></i>
            </a>
          ))}
        </div>
      </div>

      {/* MAIN NAVIGATION - Solid White with Industrial Feel */}
      <div className={`bg-white transition-all duration-300 border-b-2 ${isScrolled ? 'py-3 border-[#c73e1d]' : 'py-5 border-black'}`}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="relative z-[110]">
            <Image
              src="/images/icons-duka-interiors/logo-duka-interiors-big.svg"
              alt="Duka Interiors"
              width={160}
              height={50}
              priority
              className="h-9 w-auto"
            />
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center h-full">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <div 
                  key={item.name} 
                  className="relative px-5 group"
                  onMouseEnter={() => item.hasDropdown && setIsDropdownOpen(true)}
                  onMouseLeave={() => item.hasDropdown && setIsDropdownOpen(false)}
                >
                  <Link 
                    href={item.href} 
                    className={`text-[12px] font-black tracking-[0.2em] transition-colors flex items-center gap-1 ${isActive ? 'text-[#c73e1d]' : 'text-black hover:text-[#c73e1d]'}`}
                  >
                    {item.name}
                    {item.hasDropdown && <i className="fas fa-plus text-[8px] opacity-50"></i>}
                    {item.comingSoon && <span className="text-[7px] bg-black text-white px-1 ml-1 font-bold">SOON</span>}
                  </Link>

                  {/* Dropdown Menu - Industrial Block Style */}
                  {item.hasDropdown && (
                    <div className={`absolute top-full left-0 w-64 bg-white border-2 border-black mt-[22px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ${isDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                      {item.subItems?.map((sub) => (
                        <Link key={sub.name} href={sub.href} className="block p-4 text-[10px] font-black tracking-widest text-black hover:bg-[#c73e1d] hover:text-white border-b last:border-0 border-black transition-colors">
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* CTA Section */}
          <div className="flex items-center gap-4">
            <Link 
              href="/contact" 
              className="hidden md:block bg-black text-white px-8 py-3 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#c73e1d] transition-all shadow-[4px_4px_0px_0px_rgba(199,62,29,1)]"
            >
              Start Your Build
            </Link>

            {/* Mobile Toggle Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5 border-2 border-black hover:bg-black hover:text-white transition-all"
            >
              <span className={`h-[3px] bg-current transition-all ${isMenuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`}></span>
              <span className={`h-[3px] bg-current transition-all ${isMenuOpen ? 'opacity-0' : 'w-6'}`}></span>
              <span className={`h-[3px] bg-current transition-all ${isMenuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-6'}`}></span>
            </button>
          </div>
        </div>
      </div>

      {/* IMPROVED MOBILE VERSION - Structured Sidebar */}
      <div className={`fixed inset-0 z-[105] transition-all duration-500 ${isMenuOpen ? 'visible' : 'invisible'}`}>
        {/* Backdrop */}
        <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMenuOpen(false)}></div>
        
        {/* Menu Panel */}
        <div className={`absolute top-0 right-0 w-full max-w-md h-full bg-white border-l-4 border-[#c73e1d] shadow-2xl transition-transform duration-500 flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-8 flex justify-between items-center border-b border-gray-100">
            <p className="text-[10px] font-black tracking-[0.4em] text-gray-400">MENU</p>
            <button onClick={() => setIsMenuOpen(false)} className="text-2xl font-light hover:text-[#c73e1d]">&times; CLOSE</button>
          </div>

          <nav className="flex flex-col p-8 overflow-y-auto flex-grow">
            {navItems.map((item, i) => (
              <div key={item.name} className="py-3 border-b border-gray-50 last:border-0">
                <Link 
                  href={item.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-black text-black uppercase tracking-tighter hover:text-[#c73e1d] transition-colors flex items-center justify-between group"
                >
                  {item.name}
                  <span className="text-[10px] font-bold text-gray-300 group-hover:text-[#c73e1d]">0{i+1}</span>
                </Link>
                {item.subItems && (
                  <div className="mt-4 pl-4 space-y-2">
                    {item.subItems.map(sub => (
                      <Link key={sub.name} href={sub.href} onClick={() => setIsMenuOpen(false)} className="block text-xs font-bold text-gray-500 uppercase tracking-widest hover:text-black">
                        → {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Footer Area - Restored Content */}
          <div className="bg-black p-8 text-white space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[9px] font-bold text-[#c73e1d] tracking-[0.2em] mb-2 uppercase">Office</p>
                {phones.map(p => <a key={p.number} href={`tel:${p.number}`} className="block text-xs font-bold hover:text-[#c73e1d] mb-1">{p.label}</a>)}
              </div>
              <div className="flex flex-wrap gap-3 items-end justify-end">
                {socialLinks.map(s => <a key={s.name} href={s.href} target="_blank" className="text-xl hover:text-[#c73e1d]"><i className={s.icon}></i></a>)}
              </div>
            </div>
            <Link 
              href="/contact" 
              onClick={() => setIsMenuOpen(false)}
              className="block w-full bg-[#c73e1d] py-4 text-center text-xs font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all"
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}