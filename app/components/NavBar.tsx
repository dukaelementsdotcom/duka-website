'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronDown, 
  faPhone, 
  faTimes, 
  faPhoneVolume,
  faCalculator,
  faBars,
  faFolderOpen,
  faLightbulb,
  faTools,
  faStore,
  faEnvelope,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { 
  faWhatsapp, 
  faTelegram, 
  faFacebookF, 
  faInstagram, 
  faLinkedinIn, 
  faTiktok 
} from '@fortawesome/free-brands-svg-icons';

export default function NavBar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Header class based on scroll
  const topRowClasses = isScrolled
    ? 'bg-white border-b border-gray-200 shadow-sm'
    : 'bg-gradient-to-r from-black/95 to-gray-900/95 backdrop-blur-md';

  const bottomRowClasses = isScrolled
    ? 'bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-sm'
    : 'bg-gradient-to-r from-gray-900/90 to-black/90 backdrop-blur-md border-t border-white/10';

  // ========== NAVIGATION STRUCTURE ==========
  const navStructure = {
    services: {
      icon: faTools,
      title: 'SERVICES',
      mainLink: '/services',
      items: [
        { name: 'All Services', href: '/services', isMain: true },
        // PLEASE UPDATE THESE URLs WITH YOUR ACTUAL SERVICE PAGES:
        { name: 'Office Design', href: '/services/interior-design' },
        { name: 'Partitioning', href: '/services/office-partitioning' },
        { name: 'Technology Integration', href: '/services/technology-integration' },
        { name: 'Branding & Signage', href: '/services/branding-and-signage' },
        { name: 'Full Renovation', href: '/services/office-renovation' },
        { name: 'Design+Build', href: '/services/design-build' },
      ]
    },
    
    portfolio: {
      icon: faFolderOpen,
      title: 'PORTFOLIO',
      mainLink: '/projects',
      items: [
        { name: 'All Projects', href: '/projects', isMain: true },
        { name: 'Office Designs', href: '/projects?category=office' },
        { name: 'Partitioning', href: '/projects?category=partitioning' },
        { name: 'Renovations', href: '/projects?category=renovation' },
      ]
    },
    
    company: {
      icon: null,
      title: 'COMPANY',
      mainLink: '/about',
      items: [
        { name: 'About Us', href: '/about' },
        { name: 'Our Process', href: '/about#process' },
        { name: 'Our Team', href: '/about#team' },
      ]
    },
    
    resources: {
      icon: faLightbulb,
      title: 'RESOURCES',
      mainLink: '/resources',
      items: [
        { name: 'Insights & Blog', href: '/resources' },
        { name: 'Material Guides', href: '/resources/materials' },
        { name: 'Renovation FAQ', href: '/resources/faq' },
        { name: 'Cost Calculator', href: '/estimate-cost', isHighlighted: true },
      ]
    },
    
    products: {
      icon: faStore,
      title: 'PRODUCTS',
      mainLink: '/products',
      comingSoon: true,
      items: [
        { name: 'Product Catalog', href: '/products' },
        { name: 'Custom Furniture', href: '/products/furniture' },
        { name: 'Office Partitions', href: '/products/partitions' },
      ]
    }
  };

  // Contact info - BOTH NUMBERS RESTORED
  const phones = [
    { number: '+251940607055', label: '+251 940 607 055', isPrimary: true },
    { number: '+251929144290', label: '+251 929 144 290', isPrimary: false },
  ];
  const email = 'contact@dukainteriors.com';

  // Social links
  const socialLinks = [
    { name: 'WhatsApp', href: 'https://wa.me/251940607055', icon: faWhatsapp, color: 'hover:bg-green-500' },
    { name: 'Telegram', href: 'https://t.me/dukainteriorsplc', icon: faTelegram, color: 'hover:bg-blue-400' },
    { name: 'Facebook', href: 'https://www.facebook.com/dukainteriors', icon: faFacebookF, color: 'hover:bg-blue-600' },
    { name: 'Instagram', href: 'https://www.instagram.com/dukainteriors', icon: faInstagram, color: 'hover:bg-pink-600' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/duka-interiors', icon: faLinkedinIn, color: 'hover:bg-blue-700' },
    { name: 'TikTok', href: 'https://www.tiktok.com/@duka.interiors.plc', icon: faTiktok, color: 'hover:bg-black' },
  ];

  // Toggle mobile section
  const toggleMobileSection = (section: string) => {
    setOpenMobileSection(openMobileSection === section ? null : section);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
      {/* ========== TOP ROW: Logo, Contact, Social, Calculator ========== */}
      <div className={`w-full transition-all duration-300 ${topRowClasses}`}>
        <div className="w-full max-w-screen-2xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between py-2">
            {/* Logo */}
            <Link href="/" aria-label="Duka Interiors Home" className="transition-transform hover:scale-105">
              <Image
                src="/images/icons-duka-interiors/logo-duka-interiors-big.svg"
                alt="Duka Interiors Logo"
                width={isScrolled ? 130 : 140}
                height={isScrolled ? 40 : 45}
                priority
                className={`transition-all duration-300 ${isScrolled ? 'h-8' : 'h-9'}`}
              />
            </Link>

            {/* Desktop: Contact & Social Row */}
            <div className="hidden lg:flex items-center gap-x-6">
              {/* Phone Numbers */}
              <div className="flex items-center gap-x-4">
                {phones.map((phone, idx) => (
                  <div key={idx} className="flex items-center gap-x-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center ${isScrolled ? 'bg-red-100 text-red-600' : 'bg-red-600/20 text-white'}`}>
                      <FontAwesomeIcon icon={faPhone} className="text-xs" />
                    </div>
                    <div>
                      <a
                        href={`tel:${phone.number.replace(/\s+/g, '')}`}
                        className={`text-sm font-bold transition-colors ${isScrolled ? 'text-gray-800 hover:text-red-600' : 'text-white hover:text-red-300'}`}
                      >
                        {phone.label}
                      </a>
                      {phone.isPrimary && (
                        <div className={`text-xs ${isScrolled ? 'text-gray-500' : 'text-gray-300'}`}>Primary</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className={`w-px h-6 ${isScrolled ? 'bg-gray-300' : 'bg-white/30'}`}></div>

              {/* Social Icons */}
              <div className="flex items-center gap-x-1">
                {socialLinks.slice(0, 4).map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${social.name} page`}
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${isScrolled ? 'bg-gray-100 text-gray-700 hover:bg-red-600 hover:text-white' : 'bg-white/10 text-white hover:bg-red-600'} ${social.color}`}
                  >
                    <FontAwesomeIcon icon={social.icon} />
                  </a>
                ))}
              </div>

              {/* Divider */}
              <div className={`w-px h-6 ${isScrolled ? 'bg-gray-300' : 'bg-white/30'}`}></div>

              {/* Calculator Button */}
              <Link
                href="/estimate-cost"
                className={`group flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${isScrolled 
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:shadow-lg hover:scale-105' 
                  : 'bg-white/10 text-white hover:bg-red-600 backdrop-blur-sm'
                }`}
              >
                <FontAwesomeIcon icon={faCalculator} className="text-xs" />
                <span>Cost Calculator</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${isScrolled ? 'bg-white/20' : 'bg-red-500'}`}>NEW</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 transition-colors ${isScrolled ? 'text-gray-800 hover:text-red-600' : 'text-white hover:text-red-300'}`}
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* ========== BOTTOM ROW: Main Navigation ========== */}
      <div className={`hidden lg:block transition-all duration-300 ${bottomRowClasses}`}>
        <div className="w-full max-w-screen-2xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-x-1 py-2.5">
              {/* Home */}
              <Link
                href="/"
                className={`px-4 py-2 text-xs uppercase tracking-wider font-bold transition-colors rounded-lg ${
                  pathname === '/' 
                    ? (isScrolled ? 'text-red-600 bg-red-50' : 'text-red-400 bg-white/10') 
                    : (isScrolled ? 'text-gray-700 hover:text-red-600 hover:bg-gray-50' : 'text-gray-300 hover:text-white hover:bg-white/10')
                }`}
              >
                HOME
              </Link>

              {/* Grouped Navigation Items */}
              {Object.entries(navStructure).map(([key, section]) => (
                <div
                  key={key}
                  className="relative group"
                  onMouseEnter={() => setOpenDropdown(key)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={section.mainLink}
                    className={`flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-bold transition-colors rounded-lg ${
                      pathname.startsWith(section.mainLink)
                        ? (isScrolled ? 'text-red-600 bg-red-50' : 'text-red-400 bg-white/10')
                        : (isScrolled ? 'text-gray-700 hover:text-red-600 hover:bg-gray-50' : 'text-gray-300 hover:text-white hover:bg-white/10')
                    }`}
                  >
                    {section.icon && <FontAwesomeIcon icon={section.icon} className="text-[10px]" />}
                    <span>{section.title}</span>
                    {section.comingSoon && (
                      <span className={`text-[8px] px-1.5 py-0.5 rounded-full ${isScrolled ? 'bg-gray-100 text-gray-600' : 'bg-white/20 text-white'}`}>SOON</span>
                    )}
                    <FontAwesomeIcon 
                      icon={faChevronDown} 
                      className={`text-[9px] transition-transform ${openDropdown === key ? 'rotate-180' : ''}`} 
                    />
                  </Link>

                  {/* Dropdown */}
                  <div
                    className={`absolute top-full left-0 w-64 bg-white border border-gray-100 shadow-2xl py-3 rounded-xl transition-all duration-200 z-50 ${
                      openDropdown === key
                        ? 'opacity-100 translate-y-0 visible'
                        : 'opacity-0 translate-y-2 invisible pointer-events-none'
                    }`}
                  >
                    <div className="px-4 pb-2 mb-2 border-b border-gray-100">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{section.title}</span>
                    </div>
                    {section.items.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        className={`flex items-center justify-between group/item px-5 py-2.5 text-sm transition-all ${
                          item.isMain
                            ? 'text-red-600 font-bold bg-red-50'
                            : item.isHighlighted
                            ? 'text-green-600 font-bold bg-green-50'
                            : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
                        }`}
                      >
                        <span>{item.name}</span>
                        {(item.isMain || item.isHighlighted) && (
                          <FontAwesomeIcon 
                            icon={faArrowRight} 
                            className="text-xs opacity-0 group-hover/item:opacity-100 transition-opacity" 
                          />
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {/* Contact Link */}
              <Link
                href="/contact"
                className={`px-4 py-2 text-xs uppercase tracking-wider font-bold transition-colors rounded-lg ${
                  pathname === '/contact'
                    ? (isScrolled ? 'text-white bg-red-600' : 'text-white bg-red-600')
                    : (isScrolled ? 'text-gray-700 hover:text-white hover:bg-red-600' : 'text-gray-300 hover:text-white hover:bg-red-600/80')
                }`}
              >
                CONTACT
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ========== MOBILE MENU OVERLAY ========== */}
      {isMenuOpen && (
        <div className="fixed inset-0 lg:hidden bg-gradient-to-b from-gray-900 to-black z-40 h-screen overflow-y-auto">
          {/* Mobile Header with Close Button */}
          <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-black/90 border-b border-white/10 backdrop-blur-md">
            <Link 
              href="/" 
              onClick={() => setIsMenuOpen(false)}
              className="transition-transform hover:scale-105"
            >
              <Image
                src="/images/icons-duka-interiors/logo-duka-interiors-big.svg"
                alt="Duka Interiors Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
            
            <div className="flex items-center gap-4">
              <Link
                href="/estimate-cost"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 bg-red-600 text-white px-3 py-2 rounded-lg text-xs font-bold uppercase"
              >
                <FontAwesomeIcon icon={faCalculator} className="text-xs" />
                <span>Calculator</span>
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-3 text-white hover:text-red-400 transition-colors"
                aria-label="Close menu"
              >
                <FontAwesomeIcon icon={faTimes} className="text-2xl" />
              </button>
            </div>
          </div>

          <div className="flex flex-col h-full px-6 pb-12 pt-4">
            {/* Quick Contact Actions */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {phones.map((phone, idx) => (
                <a
                  key={idx}
                  href={`tel:${phone.number.replace(/\s+/g, '')}`}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold ${idx === 0 ? 'bg-red-600 text-white' : 'bg-gray-800 text-white'}`}
                >
                  <FontAwesomeIcon icon={faPhone} />
                  <span className="text-sm">{phone.label.replace('+251 ', '')}</span>
                </a>
              ))}
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-1 flex-grow">
              {/* Home */}
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className={`block py-3 px-4 text-base font-bold rounded-lg ${
                  pathname === '/' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                HOME
              </Link>

              {/* Grouped Sections */}
              {Object.entries(navStructure).map(([key, section]) => (
                <div key={key} className="bg-white/10 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleMobileSection(key)}
                    className={`w-full flex items-center justify-between py-3 px-4 text-base font-bold ${
                      openMobileSection === key ? 'text-red-400' : 'text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {section.icon && <FontAwesomeIcon icon={section.icon} className="text-sm" />}
                      <span>{section.title}</span>
                      {section.comingSoon && (
                        <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">SOON</span>
                      )}
                    </div>
                    <FontAwesomeIcon 
                      icon={faChevronDown} 
                      className={`transition-transform text-sm ${openMobileSection === key ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  
                  <div className={`${openMobileSection === key ? 'block' : 'hidden'} bg-black/30`}>
                    {section.items.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center justify-between py-2.5 px-8 text-sm transition-colors ${
                          item.isMain || item.isHighlighted
                            ? 'text-red-400 font-bold bg-black/30'
                            : 'text-gray-300 hover:text-white hover:bg-black/20'
                        }`}
                      >
                        <span>{item.name}</span>
                        {(item.isMain || item.isHighlighted) && (
                          <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {/* Contact */}
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block py-3 px-4 bg-red-600 text-white text-base font-bold rounded-lg hover:bg-red-700"
              >
                CONTACT US
              </Link>
            </nav>

            {/* Social & Contact Footer */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <div className="mb-4">
                <h4 className="text-white text-sm font-bold mb-3">Follow Us</h4>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit our ${social.name} page`}
                      className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FontAwesomeIcon icon={social.icon} />
                    </a>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 text-white/80 hover:text-red-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faEnvelope} className="w-4" />
                  <span className="text-sm">{email}</span>
                </a>
                <div className="text-xs text-gray-400 pt-2">
                  Bole, Djibouti Street, Welela Building, 5th Floor, Addis Ababa
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}