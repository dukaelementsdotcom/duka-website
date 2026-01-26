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

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
  const email = 'contact@dukainteriors.com';
  const socialLinks = [
    { name: 'WhatsApp', href: 'https://wa.me/251940607055', icon: 'fab fa-whatsapp' },
    { name: 'Telegram', href: 'https://t.me/dukainteriorsplc', icon: 'fab fa-telegram' },
    { name: 'Facebook', href: 'https://www.facebook.com/dukainteriors', icon: 'fab fa-facebook-f' },
    { name: 'Instagram', href: 'https://www.instagram.com/dukainteriors', icon: 'fab fa-instagram' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/duka-interiors', icon: 'fab fa-linkedin-in' },
    { name: 'TikTok', href: 'https://www.tiktok.com/@duka.interiors.plc', icon: 'fab fa-tiktok' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md py-3 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)]' 
        : 'bg-black/40 backdrop-blur-sm py-5 border-b border-white/10'
    }`}>
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 flex items-center justify-between">
        
        {/* LOGO AREA */}
        <Link href="/" className="relative z-[60] transition-transform duration-300 hover:scale-[1.02] active:scale-95">
          <Image
            src="/images/icons-duka-interiors/logo-duka-interiors-big.svg"
            alt="Duka Interiors"
            width={160}
            height={50}
            priority
            className={`h-9 w-auto transition-all duration-500 ${!isScrolled ? 'brightness-0 invert' : ''}`}
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-x-10">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const linkColor = isScrolled ? 'text-zinc-900' : 'text-white';
            
            return (
              <div key={item.name} className="relative group pt-1">
                {item.hasDropdown ? (
                  <div 
                    className="flex items-center gap-1 cursor-pointer"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <Link href={item.href} className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${isActive ? 'text-red-600' : `${linkColor} group-hover:text-red-600`}`}>
                      {item.name}
                    </Link>
                    <i className={`fas fa-chevron-down text-[8px] transition-transform duration-300 ${linkColor} ${isDropdownOpen ? 'rotate-180 text-red-600' : ''}`}></i>
                    
                    {/* DROPDOWN MENU */}
                    <div className={`absolute top-full -left-4 w-60 bg-white border border-zinc-100 shadow-2xl py-4 mt-2 transition-all duration-300 origin-top ${isDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                      {item.subItems?.map((sub) => (
                        <Link key={sub.name} href={sub.href} className="block px-8 py-3 text-[10px] font-black uppercase tracking-widest text-zinc-800 hover:text-red-600 hover:bg-zinc-50 transition-all border-l-2 border-transparent hover:border-red-600">
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link href={item.href} className={`relative text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${isActive ? 'text-red-600' : `${linkColor} hover:text-red-600`}`}>
                    {item.name}
                    {item.comingSoon && <span className="absolute -top-3 -right-4 bg-red-600 text-[7px] px-1 py-0.5 rounded-sm text-white">SOON</span>}
                    <span className={`absolute -bottom-1 left-0 h-[2px] bg-red-600 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* CTA AREA */}
        <div className="flex items-center gap-x-6">
          <div className="hidden xl:flex items-center gap-x-4 border-l border-zinc-300/30 pl-6 ml-2">
            {socialLinks.slice(0, 3).map((social) => (
              <a key={social.name} href={social.href} target="_blank" className={`text-sm transition-colors ${isScrolled ? 'text-zinc-400 hover:text-red-600' : 'text-zinc-300 hover:text-white'}`}>
                <i className={social.icon}></i>
              </a>
            ))}
          </div>
          
          <Link href="/contact" className={`hidden md:block px-8 py-3 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 border-2 ${
            isScrolled 
              ? 'border-zinc-900 bg-zinc-900 text-white hover:bg-red-600 hover:border-red-600 shadow-lg' 
              : 'border-white text-white hover:bg-white hover:text-zinc-900'
          }`}>
            Consultation
          </Link>

          {/* MOBILE TOGGLE */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden group flex flex-col items-end gap-1.5 p-2 relative z-[60]"
          >
            <span className={`h-[2px] bg-current transition-all duration-300 ${isMenuOpen ? 'w-8 rotate-45 translate-y-2 text-white' : 'w-8 text-current'}`}></span>
            <span className={`h-[2px] bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'w-5 text-current'}`}></span>
            <span className={`h-[2px] bg-current transition-all duration-300 ${isMenuOpen ? 'w-8 -rotate-45 -translate-y-2 text-white' : 'w-8 text-current'}`}></span>
          </button>
        </div>

        {/* MOBILE OVERLAY */}
        <div className={`fixed inset-0 z-[55] bg-zinc-950 transition-all duration-700 ease-in-out ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
          <div className="flex flex-col h-full p-12 justify-center">
             <nav className="flex flex-col space-y-6">
                {navItems.map((item, i) => (
                  <Link 
                    key={item.name} 
                    href={item.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter hover:text-red-600 transition-colors flex items-baseline gap-4 group"
                    style={{ transitionDelay: `${i * 50}ms` }}
                  >
                    <span className="text-sm font-light text-zinc-600 group-hover:text-red-600">0{i+1}</span>
                    {item.name}
                  </Link>
                ))}
             </nav>
             <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-zinc-800 pt-12">
                <div>
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-4">Direct Line</p>
                  {phones.map(p => <a key={p.number} href={`tel:${p.number}`} className="block text-xl text-white font-medium hover:text-red-600 mb-2">{p.label}</a>)}
                </div>
                <div>
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-4">Follow Us</p>
                  <div className="flex gap-6">
                    {socialLinks.map(s => <a key={s.name} href={s.href} className="text-2xl text-white hover:text-red-600"><i className={s.icon}></i></a>)}
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </header>
  );
}