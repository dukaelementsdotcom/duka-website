'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faTimes, faBars, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import {
  faWhatsapp,
  faTelegram,
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTiktok,
} from '@fortawesome/free-brands-svg-icons';
import { CONTACT, NAV_LINKS, SOCIAL_LINKS, whatsappLink, type SocialName } from '@/lib/siteConfig';

const SOCIAL_ICONS: Record<SocialName, typeof faWhatsapp> = {
  WhatsApp: faWhatsapp,
  Telegram: faTelegram,
  Facebook: faFacebookF,
  Instagram: faInstagram,
  LinkedIn: faLinkedinIn,
  TikTok: faTiktok,
};

const LOGO = '/images/icons-duka-interiors/logo-duka-interiors-big.svg';

export default function NavBar() {
  const pathname = usePathname() || '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href) || `${pathname}/` === href;

  // Switch to the light header after scrolling (passive listener, state only changes when needed)
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the page changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Mobile menu: lock page scroll, focus the close button, close on Escape, return focus on close
  useEffect(() => {
    if (!isMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      menuButtonRef.current?.focus();
    };
  }, [isMenuOpen]);

  const topRow = isScrolled
    ? 'bg-white border-b border-gray-200'
    : 'bg-gradient-to-r from-black/95 to-gray-900/95 backdrop-blur-md';
  const bottomRow = isScrolled
    ? 'bg-white/95 backdrop-blur-md border-t border-gray-100 h-12'
    : 'bg-gradient-to-r from-gray-900/90 to-black/90 backdrop-blur-md border-t border-white/10 h-14';
  const linkBase = 'px-4 py-2 text-xs uppercase tracking-wider font-bold transition-colors rounded-lg';
  const linkIdle = isScrolled
    ? 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
    : 'text-gray-300 hover:text-white hover:bg-white/10';
  const linkActive = isScrolled ? 'text-red-600 bg-red-50' : 'text-red-400 bg-white/10';
  const iconButton = isScrolled
    ? 'bg-gray-100 text-gray-700 hover:bg-red-600 hover:text-white'
    : 'bg-white/10 text-white hover:bg-red-600';

  return (
    <>
      {/* Reserves the space under the fixed header. Fixed heights in CSS, so nothing jumps while loading or scrolling. */}
      <div className="h-[72px] lg:h-[128px] w-full" aria-hidden="true" />

      <header className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
        {/* ========== TOP ROW: logo, phones, social ========== */}
        <div className={`w-full py-3 transition-colors duration-300 ${topRow}`}>
          <div className="max-w-screen-2xl mx-auto px-4 lg:px-6">
            <div className="flex items-center justify-between h-12">
              <Link href="/" aria-label="Duka Interiors – home" className="shrink-0">
                <Image
                  src={LOGO}
                  alt="Duka Interiors"
                  unoptimized
                  priority
                  width={120}
                  height={67}
                  className={`w-auto transition-all duration-300 ${isScrolled ? 'h-[56px]' : 'h-[67px]'}`}
                />
              </Link>

              {/* Desktop: phones + social */}
              <div className="hidden lg:flex items-center gap-x-6">
                <div className="flex items-center gap-x-4">
                  {CONTACT.phones.map((phone) => (
                    <a
                      key={phone.number}
                      href={`tel:${phone.number}`}
                      className={`flex items-center gap-x-2 group transition-colors ${
                        isScrolled ? 'text-gray-800 hover:text-red-600' : 'text-white hover:text-red-300'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                          isScrolled
                            ? 'bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white'
                            : 'bg-white/20 text-white group-hover:bg-red-600'
                        }`}
                      >
                        <FontAwesomeIcon icon={faPhone} className="text-xs" />
                      </span>
                      <span className="text-sm font-bold">{phone.label}</span>
                    </a>
                  ))}
                </div>

                <div className={`w-px h-6 ${isScrolled ? 'bg-gray-300' : 'bg-white/30'}`} aria-hidden="true" />

                <ul className="flex items-center gap-x-2">
                  {SOCIAL_LINKS.map((social) => (
                    <li key={social.name}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Duka Interiors on ${social.name} (opens in a new tab)`}
                        title={social.name}
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs transition-colors ${iconButton}`}
                      >
                        <FontAwesomeIcon icon={SOCIAL_ICONS[social.name]} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mobile: quick WhatsApp + call, then the menu button */}
              <div className="flex items-center gap-2 lg:hidden">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with Duka Interiors on WhatsApp"
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${iconButton}`}
                >
                  <FontAwesomeIcon icon={faWhatsapp} className="text-lg" />
                </a>
                <a
                  href={`tel:${CONTACT.phones[0].number}`}
                  aria-label={`Call Duka Interiors on ${CONTACT.phones[0].label}`}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  <FontAwesomeIcon icon={faPhone} className="text-sm" />
                </a>
                <button
                  ref={menuButtonRef}
                  type="button"
                  onClick={() => setIsMenuOpen(true)}
                  aria-label="Open menu"
                  aria-expanded={isMenuOpen}
                  aria-controls="mobile-menu"
                  className={`w-10 h-10 flex items-center justify-center transition-colors ${
                    isScrolled ? 'text-gray-800 hover:text-red-600' : 'text-white hover:text-red-300'
                  }`}
                >
                  <FontAwesomeIcon icon={faBars} className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========== BOTTOM ROW: main navigation (desktop) ========== */}
        <nav aria-label="Main" className={`hidden lg:block transition-all duration-300 ${bottomRow}`}>
          <div className="h-full max-w-screen-2xl mx-auto px-4 lg:px-6 flex items-center justify-center">
            <ul className="flex items-center gap-x-1">
              <li>
                <Link
                  href="/"
                  aria-current={isActive('/') ? 'page' : undefined}
                  className={`block ${linkBase} ${isActive('/') ? linkActive : linkIdle}`}
                >
                  Home
                </Link>
              </li>
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={`flex items-center gap-2 ${linkBase} ${isActive(item.href) ? linkActive : linkIdle}`}
                  >
                    {item.label}
                    {item.badge && (
                      <span aria-hidden="true" className="text-[8px] px-1.5 py-0.5 rounded-full font-bold bg-red-600 text-white">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
              <li className="ml-3">
                <Link
                  href="/contact/"
                  aria-current={isActive('/contact/') ? 'page' : undefined}
                  className="block px-5 py-2 text-xs uppercase tracking-wider font-black rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Get a quote
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* ========== MOBILE MENU ========== */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 lg:hidden bg-gradient-to-b from-gray-900 to-black z-40 h-[100dvh] overflow-y-auto overscroll-contain"
          >
            <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-black/90 border-b border-white/10 backdrop-blur-md">
              <Link href="/" aria-label="Duka Interiors – home" onClick={() => setIsMenuOpen(false)}>
                <Image src={LOGO} alt="Duka Interiors" unoptimized width={98} height={55} className="h-[55px] w-auto" />
              </Link>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
                className="w-11 h-11 flex items-center justify-center text-white hover:text-red-400 transition-colors"
              >
                <FontAwesomeIcon icon={faTimes} className="text-2xl" />
              </button>
            </div>

            <div className="px-5 pt-5 pb-16">
              <div className="grid grid-cols-2 gap-3 mb-6">
                <a
                  href={`tel:${CONTACT.phones[0].number}`}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  <FontAwesomeIcon icon={faPhone} className="text-sm" />
                  <span className="text-sm">Call us</span>
                </a>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold bg-[#25D366] text-black hover:bg-[#1ebe5a] transition-colors"
                >
                  <FontAwesomeIcon icon={faWhatsapp} className="text-base" />
                  <span className="text-sm">WhatsApp</span>
                </a>
              </div>

              <nav aria-label="Mobile">
                <ul className="space-y-1">
                  {[{ label: 'Home', href: '/' }, ...NAV_LINKS].map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        aria-current={isActive(item.href) ? 'page' : undefined}
                        className={`flex items-center gap-3 py-3 px-4 text-base font-bold uppercase rounded-lg transition-colors ${
                          isActive(item.href) ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {item.label}
                        {'badge' in item && item.badge && (
                          <span aria-hidden="true" className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full font-bold">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                  <li className="pt-2">
                    <Link
                      href="/contact/"
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-3 px-4 bg-red-600 text-white text-base font-black uppercase rounded-lg hover:bg-red-700 transition-colors text-center"
                    >
                      Get a quote
                    </Link>
                  </li>
                </ul>
              </nav>

              <div className="mt-8 pt-6 border-t border-white/20 space-y-5">
                <ul className="flex flex-wrap gap-2" aria-label="Social media">
                  {SOCIAL_LINKS.map((social) => (
                    <li key={social.name}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Duka Interiors on ${social.name} (opens in a new tab)`}
                        className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                      >
                        <FontAwesomeIcon icon={SOCIAL_ICONS[social.name]} className="text-base" />
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3 text-sm">
                  <a href={`tel:${CONTACT.phones[1].number}`} className="flex items-center gap-3 text-white/80 hover:text-red-400">
                    <FontAwesomeIcon icon={faPhone} className="w-4" />
                    {CONTACT.phones[1].label}
                  </a>
                  <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 text-white/80 hover:text-red-400">
                    <FontAwesomeIcon icon={faEnvelope} className="w-4" />
                    {CONTACT.email}
                  </a>
                  <a
                    href={CONTACT.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-white/60 hover:text-red-400"
                  >
                    <FontAwesomeIcon icon={faLocationDot} className="w-4 mt-0.5" />
                    <span>
                      {CONTACT.address.line1}, {CONTACT.address.line2}, {CONTACT.address.city}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
