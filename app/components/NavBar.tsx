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
  faEnvelope
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
      setIsScrolled(window.scrollY > 100);
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
  const headerClasses = isScrolled
    ? 'bg-white text-gray-800 border-b border-gray-200 shadow-md'
    : 'bg-black/95 backdrop-blur-md text-white border-b border-gray-800';

  // ========== NAVIGATION STRUCTURE ==========
  const navStructure = {
    services: {
      icon: faTools,
      title: 'SERVICES',
      mainLink: '/services',
      items: [
        { name: 'All Services', href: '/services', isMain: true },
        { name: 'Office Design', href: '/services/office-design' },
        { name: 'Partitioning', href: '/services/office-partitioning' },
        { name: 'Technology Integration', href: '/services/tech-integration' },
        { name: 'Branding & Signage', href: '/services/branding-signage' },
        { name: 'Full Renovation', href: '/services/full-renovation' },
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
        { name: 'Design Tips', href: '/resources/tips' },
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

  // Contact info
  const primaryPhone = '+251940607055';
  const primaryPhoneLabel = '+251 940 607 055';
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClasses}`}>
      {/* ========== TOP ROW: Logo, Contact, Social, Calculator ========== */}
      <div className="w-full max-w-screen-2xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <Link href="/" aria-label="Duka Interiors Home" className="transition-transform hover:scale-105">
            <Image
              src="/images/icons-duka-interiors/logo-duka-interiors-big.svg"
              alt="Duka Interiors Logo"
              width={140}
              height={45}
              priority
              className="h-9 w-auto"
            />
          </Link>

          {/* Desktop: Contact & Social Row */}
          <div className="hidden lg:flex items-center gap-x-4">
            {/* Phone Number */}
            <div className="flex items-center gap-x-2">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faPhone} className="text-xs text-white" />
              </div>
              <div>
                <a
                  href={`tel:${primaryPhone.replace(/\s+/g, '')}`}
                  className="text-sm font-bold hover:text-red-600 transition-colors"
                >
                  {primaryPhoneLabel}
                </a>
                <div className="text-xs text-gray-500">Call us anytime</div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-300"></div>

            {/* Social Icons */}
            <div className="flex items-center gap-x-1">
              {socialLinks.slice(0, 4).map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${social.name} page`}
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs bg-gray-100 text-gray-700 ${social.color} transition-colors`}
                >
                  <FontAwesomeIcon icon={social.icon} />
                </a>
              ))}
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-300"></div>

            {/* Calculator Button */}
            <Link
              href="/estimate-cost"
              className="group flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:shadow-lg hover:scale-105 transition-all"
            >
              <FontAwesomeIcon icon={faCalculator} className="text-xs" />
              <span>Cost Calculator</span>
              <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded-full">NEW</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 ${isScrolled ? 'text-gray-800' : 'text-white'}`}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="text-xl" />
          </button>
        </div>
      </div>

      {/* ========== BOTTOM ROW: Main Navigation ========== */}
      <nav className="hidden lg:block border-t border-gray-200/20 bg-white/5">
        <div className="w-full max-w-screen-2xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-x-1 py-2">
              {/* Home */}
              <Link
                href="/"
                className={`px-4 py-2 text-xs uppercase tracking-wider font-bold transition-colors ${
                  pathname === '/' 
                    ? 'text-red-600' 
                    : isScrolled ? 'text-gray-700 hover:text-red-600' : 'text-gray-300 hover:text-white'
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
                    className={`flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-bold transition-colors ${
                      pathname.startsWith(section.mainLink)
                        ? 'text-red-600'
                        : isScrolled ? 'text-gray-700 hover:text-red-600' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {section.icon && <FontAwesomeIcon icon={section.icon} className="text-[10px]" />}
                    <span>{section.title}</span>
                    {section.comingSoon && (
                      <span className="text-[8px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">SOON</span>
                    )}
                    <FontAwesomeIcon 
                      icon={faChevronDown} 
                      className={`text-[9px] transition-transform ${openDropdown === key ? 'rotate-180' : ''}`} 
                    />
                  </Link>

                  {/* Dropdown */}
                  <div
                    className={`absolute top-full left-0 w-56 bg-white border border-gray-100 shadow-xl py-3 rounded-lg transition-all duration-200 z-50 ${
                      openDropdown === key
                        ? 'opacity-100 translate-y-0 visible'
                        : 'opacity-0 translate-y-2 invisible pointer-events-none'
                    }`}
                  >
                    {section.items.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        className={`block px-5 py-2.5 text-[11px] font-medium transition-colors ${
                          item.isMain
                            ? 'text-red-600 font-bold bg-red-50'
                            : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
                        }`}
                      >
                        {item.name}
                        {item.isMain && ' →'}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {/* Contact Link */}
              <Link
                href="/contact"
                className={`px-4 py-2 text-xs uppercase tracking-wider font-bold transition-colors ${
                  pathname === '/contact'
                    ? 'text-green-600'
                    : isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-gray-300 hover:text-green-400'
                }`}
              >
                CONTACT
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ========== MOBILE MENU OVERLAY ========== */}
      {isMenuOpen && (
        <div className="fixed inset-0 lg:hidden bg-black/95 backdrop-blur-sm z-40 h-screen overflow-y-auto">
          {/* Mobile Header with Close Button */}
          <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-black/80 border-b border-white/10">
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
            
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-3 text-white hover:text-red-400 transition-colors"
              aria-label="Close menu"
            >
              <FontAwesomeIcon icon={faTimes} className="text-2xl" />
            </button>
          </div>

          <div className="flex flex-col h-full px-6 pb-12 pt-4">
            {/* Quick Contact Actions */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <a
                href={`tel:${primaryPhone.replace(/\s+/g, '')}`}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-xl font-bold"
              >
                <FontAwesomeIcon icon={faPhone} />
                Call Now
              </a>
              <a
                href={`mailto:${email}`}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-gray-800 text-white py-3 rounded-xl font-bold"
              >
                <FontAwesomeIcon icon={faEnvelope} />
                Email
              </a>
            </div>

            {/* Mobile Calculator CTA */}
            <div className="mb-6 p-4 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <FontAwesomeIcon icon={faCalculator} className="text-xl text-white" />
                <h3 className="text-white font-bold text-lg">Cost Calculator</h3>
                <span className="text-xs bg-white/30 text-white px-2 py-1 rounded-full">NEW</span>
              </div>
              <p className="text-white/80 text-sm mb-4">
                Get instant estimates for your project
              </p>
              <Link
                href="/estimate-cost"
                onClick={() => setIsMenuOpen(false)}
                className="inline-block w-full bg-white text-red-600 py-3 rounded-xl font-bold text-sm uppercase tracking-widest"
              >
                Try Calculator
              </Link>
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
                        className={`block py-2.5 px-8 text-sm transition-colors ${
                          item.isMain
                            ? 'text-red-400 font-bold bg-black/30'
                            : 'text-gray-300 hover:text-white hover:bg-black/20'
                        }`}
                      >
                        {item.isMain && '★ '}
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {/* Contact */}
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block py-3 px-4 bg-gray-800 text-white text-base font-bold rounded-lg hover:bg-gray-700"
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
              
              <div className="space-y-2">
                <a
                  href={`tel:${primaryPhone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3 text-white hover:text-red-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faPhone} className="w-4" />
                  <span className="text-lg font-bold">{primaryPhoneLabel}</span>
                </a>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 text-white/80 hover:text-red-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faEnvelope} className="w-4" />
                  <span>{email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}