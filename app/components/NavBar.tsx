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
  faPhoneVolume 
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    : 'bg-black/80 backdrop-blur-md text-white border-b border-gray-800';

  // Navigation items
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
    {
      name: 'PRODUCTS',
      href: '/products',
      comingSoon: true
    },
    { name: 'CONTACT', href: '/contact' },
  ];

  // Contact info
  const phones = [
    { number: '+251940607055', label: '+251 940 607 055' },
    { number: '+251929144290', label: '+251 929 144 290' },
  ];
  const email = 'contact@dukainteriors.com';

  // Social links
  const socialLinks = [
    { name: 'WhatsApp', href: 'https://wa.me/251940607055', icon: faWhatsapp },
    { name: 'Telegram', href: 'https://t.me/dukainteriorsplc', icon: faTelegram },
    { name: 'Facebook', href: 'https://www.facebook.com/dukainteriors', icon: faFacebookF },
    { name: 'Instagram', href: 'https://www.instagram.com/dukainteriors', icon: faInstagram },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/duka-interiors', icon: faLinkedinIn },
    { name: 'TikTok', href: 'https://www.tiktok.com/@duka.interiors.plc', icon: faTiktok },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 py-3 transition-all duration-300 ${headerClasses}`}>
      <div className="w-full max-w-screen-2xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-8">
            <Link href="/" aria-label="Duka Interiors Home" className="transition-transform hover:scale-105">
              <Image
                src="/images/icons-duka-interiors/logo-duka-interiors-big.svg"
                alt="Duka Interiors Logo"
                width={180}
                height={60}
                priority
                className="h-10 w-auto"
              />
            </Link>
            <nav className="hidden lg:flex items-center gap-x-6">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const baseClass = "text-sm uppercase tracking-wide py-2 transition-all";

                if (item.comingSoon) {
                  return (
                    <div key={item.name} className="relative group">
                      <Link href={item.href} className={`${isScrolled ? 'text-gray-800 hover:text-red-600' : 'text-white hover:text-red-500'} ${baseClass}`}>
                        {item.name}
                      </Link>
                      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                        Soon
                      </span>
                    </div>
                  );
                }

                if (item.hasDropdown) {
                  return (
                    <div 
                      key={item.name} 
                      className="relative group"
                      onMouseEnter={() => setIsDropdownOpen(true)}
                      onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                      <Link href={item.href} className={`${baseClass} flex items-center gap-1 ${isActive ? 'text-red-600 font-semibold' : isScrolled ? 'text-gray-800 hover:text-red-600' : 'text-white hover:text-red-500'}`}>
                        {item.name} <FontAwesomeIcon icon={faChevronDown} className={`text-[10px] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </Link>
                      
                      <div className={`absolute top-full left-0 w-56 bg-white border border-gray-100 shadow-xl py-2 transition-all duration-300 ${isDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                        {item.subItems?.map((sub) => (
                          <Link 
                            key={sub.name} 
                            href={sub.href}
                            className="block px-6 py-3 text-[11px] font-bold uppercase tracking-widest text-gray-800 hover:text-red-600 hover:bg-gray-50 transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${baseClass} ${isActive ? 'text-red-600 font-semibold' : isScrolled ? 'text-gray-800 hover:text-red-600' : 'text-white hover:text-red-500'}`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-x-4">
            <div className="hidden lg:flex items-center gap-x-3">
              <div className="hidden xl:flex gap-x-2">
                {phones.map((phone, idx) => (
                  <a
                    key={idx}
                    href={`tel:${phone.number.replace(/\s+/g, '')}`}
                    aria-label={`Call Duka Interiors at ${phone.label}`}
                    title={`Call ${phone.label}`}
                    className={`w-36 py-1.5 rounded-full text-xs flex items-center justify-center gap-2 ${
                      isScrolled
                        ? 'border border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    <FontAwesomeIcon icon={faPhone} className="text-xs" />
                    <span>{phone.label}</span>
                  </a>
                ))}
              </div>
              <div className="flex gap-x-1.5">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${social.name} page`}
                    title={social.name}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                      isScrolled
                        ? 'bg-gray-200 text-gray-700 hover:bg-red-600 hover:text-white'
                        : 'bg-gray-800 text-white hover:bg-red-600'
                    }`}
                  >
                    <FontAwesomeIcon icon={social.icon} />
                  </a>
                ))}
              </div>
              <Link href="/contact" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-sm uppercase">
                CONTACT US
              </Link>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 relative h-6 w-6 group ${isScrolled ? 'text-gray-800' : 'text-white'}`}
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <div className="flex flex-col justify-between h-full w-full">
                <span className={`block h-0.5 w-full bg-current origin-left ${isMenuOpen ? 'rotate-45 translate-y-2.5' : '-rotate-12'} transition-all`}></span>
                <span className={`block h-0.5 w-full bg-current ${isMenuOpen ? 'opacity-0' : 'opacity-100'} transition-all`}></span>
                <span className={`block h-0.5 w-full bg-current origin-left ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : 'rotate-12'} transition-all`}></span>
              </div>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="fixed inset-0 lg:hidden bg-black/90 backdrop-blur-sm z-40 h-screen overflow-y-auto text-white">
            <div className="flex flex-col h-full pt-16 pb-12 px-8">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-3 right-6 p-2 text-white hover:text-red-600"
                aria-label="Close navigation menu"
              >
                <FontAwesomeIcon icon={faTimes} className="text-2xl" />
              </button>
              <nav className="flex flex-col justify-center items-center flex-grow space-y-4 pt-4">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  const linkClass = `text-4xl md:text-5xl font-extrabold uppercase border-b-2 border-transparent hover:border-red-500 transition-colors ${
                    isActive ? 'text-red-500' : 'text-gray-200'
                  }`;

                  if (item.comingSoon) {
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`${linkClass} relative`}
                      >
                        {item.name}
                        <span className="text-xs ml-2">(Soon)</span>
                      </Link>
                    );
                  }

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={linkClass}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
              <div className="mt-auto space-y-2 text-gray-400 border-t border-gray-700 pt-4 text-center">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faPhoneVolume} className="mr-3" />
                  Request a Call Back
                </Link>
                <p className="text-base uppercase tracking-wider mb-2 text-gray-500 font-semibold border-t border-gray-800 pt-4">
                  Or Reach Us Directly
                </p>
                {phones.map((phone, idx) => (
                  <a
                    key={idx}
                    href={`tel:${phone.number.replace(/\s+/g, '')}`}
                    aria-label={`Call us at ${phone.label}`}
                    className="block text-lg hover:text-red-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {phone.label}
                  </a>
                ))}
                <a
                  href={`mailto:${email}`}
                  aria-label={`Email us at ${email}`}
                  className="block text-lg hover:text-red-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {email}
                </a>
                <div className="pt-4 flex justify-center space-x-5">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit our ${social.name} page`}
                      title={social.name}
                      className="text-2xl text-gray-400 hover:text-red-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FontAwesomeIcon icon={social.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}