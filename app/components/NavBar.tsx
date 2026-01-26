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

  // Content Arrays (RETAINED FULLY)
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white py-2' : 'bg-transparent py-5'
    }`}>
      {/* Top Utility Bar (Always Visible on Desktop) */}
      <div className={`hidden lg:flex border-b transition-colors duration-300 px-10 py-2 justify-between items-center ${
        isScrolled ? 'border-gray-100 text-gray-500' : 'border-white/10 text-white/70'
      }`}>
        <div className="flex gap-6 text-[10px] font-bold tracking-widest">
          {phones.map((p) => (
            <a key={p.number} href={`tel:${p.number}`} className="hover:text-red-600 transition-colors">
              <i className="fas fa-phone mr-2 text-red-600"></i> {p.label}
            </a>
          ))}
          <a href="mailto:contact@dukainteriors.com" className="hover:text-red-600 transition-colors uppercase">
            <i className="fas fa-envelope mr-2 text-red-600"></i> contact@dukainteriors.com
          </a>
        </div>
        <div className="flex gap-4">
          {socialLinks.map((s) => (
            <a key={s.name} href={s.href} target="_blank" className="text-xs hover:text-red-600 transition-colors">
              <i className={s.icon}></i>
            </a>
          ))}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className={`px-6 lg:px-10 flex items-center justify-between transition-all ${isScrolled ? 'mt-0' : 'mt-2'}`}>
        <Link href="/" className="relative z-[60]">
          <Image
            src="/images/icons-duka-interiors/logo-duka-interiors-big.svg"
            alt="Duka Interiors"
            width={180}
            height={60}
            priority
            className={`h-10 w-auto transition-all duration-500 ${!isScrolled ? 'brightness-0 invert' : ''}`}
          />
        </Link>

        {/* Navigation Items */}
        <nav className="hidden lg:flex items-center">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const textClass = isScrolled ? 'text-black' : 'text-white';
            
            return (
              <div 
                key={item.name} 
                className="relative h-16 flex items-center px-5 group"
                onMouseEnter={() => item.hasDropdown && setIsDropdownOpen(true)}
                onMouseLeave={() => item.hasDropdown && setIsDropdownOpen(false)}
              >
                <Link 
                  href={item.href} 
                  className={`text-[12px] font-black tracking-[0.15em] transition-all flex items-center gap-2 ${isActive ? 'text-red-600' : textClass} group-hover:text-red-600`}
                >
                  {item.name}
                  {item.hasDropdown && <i className={`fas fa-chevron-down text-[8px] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}></i>}
                  {item.comingSoon && <span className="text-[7px] bg-red-600 text-white px-1 py-0.5 rounded ml-1">SOON</span>}
                </Link>

                {/* TWO-INSPIRED DROPDOWN */}
                {item.hasDropdown && (
                  <div className={`absolute top-full left-0 w-64 bg-black text-white p-6 shadow-2xl transition-all duration-300 origin-top border-t-4 border-red-600 ${isDropdownOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
                    {item.subItems?.map((sub) => (
                      <Link key={sub.name} href={sub.href} className="block py-3 text-[10px] font-bold tracking-widest hover:text-red-600 border-b border-white/10 last:border-0 transition-colors">
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
                
                {/* Underline Indicator */}
                <span className={`absolute bottom-0 left-0 h-1 bg-red-600 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </div>
            );
          })}
        </nav>

        {/* Final CTA / Contact */}
        <div className="flex items-center gap-4">
          <Link 
            href="/contact" 
            className={`hidden md:flex items-center gap-3 px-8 py-4 text-[11px] font-black uppercase tracking-widest transition-all ${
              isScrolled 
              ? 'bg-black text-white hover:bg-red-600' 
              : 'bg-white text-black hover:bg-red-600 hover:text-white'
            }`}
          >
            Start Your Project <i className="fas fa-arrow-right"></i>
          </Link>

          {/* Hamburger Menu */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-4 border-2 transition-colors ${isScrolled ? 'border-black text-black' : 'border-white text-white'}`}
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-6 bg-current transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-current transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-current transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Fullscreen Mobile Menu (Inspired by Two) */}
      <div className={`fixed inset-0 bg-black z-[100] transition-transform duration-700 p-10 flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center mb-10">
           <Image src="/images/icons-duka-interiors/logo-duka-interiors-big.svg" alt="Logo" width={140} height={40} className="brightness-0 invert" />
           <button onClick={() => setIsMenuOpen(false)} className="text-white text-4xl">&times;</button>
        </div>
        
        <nav className="flex flex-col space-y-4">
          {navItems.map((item, i) => (
            <Link 
              key={item.name} 
              href={item.href} 
              onClick={() => setIsMenuOpen(false)}
              className="text-white text-4xl md:text-6xl font-black uppercase tracking-tighter hover:text-red-600 flex items-center gap-4"
            >
              <span className="text-red-600 text-sm">0{i+1}</span> {item.name}
            </Link>
          ))}
        </nav>

        <div className="mt-auto grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-white/10 pt-10">
          <div className="space-y-4">
            <p className="text-red-600 text-[10px] font-bold tracking-[.3em] uppercase">Connect With Us</p>
            {phones.map(p => <a key={p.number} href={`tel:${p.number}`} className="block text-xl text-white font-bold">{p.label}</a>)}
            <div className="flex gap-6 pt-4">
               {socialLinks.map(s => <a key={s.name} href={s.href} className="text-white hover:text-red-600 text-2xl"><i className={s.icon}></i></a>)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}