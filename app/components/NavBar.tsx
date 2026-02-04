'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top Bar with Contact Info */}
      <div className="bg-black text-white py-2 px-4 text-[10px] md:text-[11px] font-bold uppercase tracking-wider">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+251940607055" className="hover:text-red-500 transition-colors">
              Sales: +251 940 607 055
            </a>
            <a href="tel:+251929144290" className="hover:text-red-500 transition-colors">
              Support: +251 929 144 290
            </a>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="https://facebook.com/dukainteriors" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-red-500 transition-colors"
              aria-label="Facebook"
            >
              Facebook
            </a>
            <a 
              href="https://instagram.com/dukainteriors" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-red-500 transition-colors"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a 
              href="https://tiktok.com/@dukainteriors" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-red-500 transition-colors"
              aria-label="TikTok"
            >
              TikTok
            </a>
            <a 
              href="https://linkedin.com/company/dukainteriors" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-red-500 transition-colors"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a 
              href="https://youtube.com/@dukainteriors" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-red-500 transition-colors"
              aria-label="YouTube"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="text-2xl font-black uppercase tracking-tighter">
              Duka
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                href="/" 
                className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${pathname === '/' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'}`}
                aria-current={pathname === '/' ? 'page' : undefined}
              >
                Home
              </Link>

              {/* Services Dropdown */}
              <div className="relative group">
                <button className="text-[10px] font-bold uppercase tracking-widest text-gray-700 hover:text-red-600 transition-colors flex items-center gap-1">
                  Services
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link 
                      href="/services/design-build" 
                      className="block px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
                    >
                      Design & Build
                    </Link>
                    <Link 
                      href="/services/renovation" 
                      className="block px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
                    >
                      Renovation
                    </Link>
                    <Link 
                      href="/services/consultancy" 
                      className="block px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
                    >
                      Consultancy
                    </Link>
                    <Link 
                      href="/services/materials" 
                      className="block px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
                    >
                      Materials
                    </Link>
                  </div>
                </div>
              </div>

              {/* Portfolio */}
              <Link 
                href="/projects" 
                className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${pathname === '/projects' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'}`}
                aria-current={pathname === '/projects' ? 'page' : undefined}
              >
                Portfolio
              </Link>

              <Link 
                href="/company" 
                className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${pathname === '/company' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'}`}
                aria-current={pathname === '/company' ? 'page' : undefined}
              >
                Company
              </Link>

              <Link 
                href="/resources" 
                className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${pathname === '/resources' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'}`}
                aria-current={pathname === '/resources' ? 'page' : undefined}
              >
                Resources
              </Link>

              <Link 
                href="/products" 
                className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${pathname === '/products' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'}`}
                aria-current={pathname === '/products' ? 'page' : undefined}
              >
                Products
              </Link>

              <Link 
                href="/soon" 
                className="text-[10px] font-bold uppercase tracking-widest text-gray-400 cursor-not-allowed"
                aria-disabled="true"
              >
                Coming Soon
              </Link>

              <Link 
                href="/contact" 
                className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${pathname === '/contact' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'}`}
                aria-current={pathname === '/contact' ? 'page' : undefined}
              >
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-3 space-y-1">
              <Link 
                href="/" 
                className="block py-3 text-[10px] font-bold uppercase tracking-widest text-gray-700 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              <div className="py-3 border-b border-gray-100">
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-700 mb-2">Services</div>
                <div className="pl-4 space-y-2">
                  <Link 
                    href="/services/design-build" 
                    className="block py-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-red-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Design & Build
                  </Link>
                  <Link 
                    href="/services/renovation" 
                    className="block py-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-red-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Renovation
                  </Link>
                  <Link 
                    href="/services/consultancy" 
                    className="block py-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-red-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Consultancy
                  </Link>
                  <Link 
                    href="/services/materials" 
                    className="block py-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-red-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Materials
                  </Link>
                </div>
              </div>

              <Link 
                href="/projects" 
                className="block py-3 text-[10px] font-bold uppercase tracking-widest text-gray-700 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Portfolio
              </Link>

              <Link 
                href="/company" 
                className="block py-3 text-[10px] font-bold uppercase tracking-widest text-gray-700 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Company
              </Link>

              <Link 
                href="/resources" 
                className="block py-3 text-[10px] font-bold uppercase tracking-widest text-gray-700 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Resources
              </Link>

              <Link 
                href="/products" 
                className="block py-3 text-[10px] font-bold uppercase tracking-widest text-gray-700 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>

              <div className="py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100">
                Coming Soon
              </div>

              <Link 
                href="/contact" 
                className="block py-3 text-[10px] font-bold uppercase tracking-widest text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>

            {/* Mobile Social Links */}
            <div className="px-4 py-3 border-t border-gray-100">
              <div className="flex justify-center gap-4">
                <a
                  href="https://facebook.com/dukainteriors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-red-600"
                  aria-label="Facebook"
                >
                  Facebook
                </a>
                <a
                  href="https://instagram.com/dukainteriors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-red-600"
                  aria-label="Instagram"
                >
                  Instagram
                </a>
                <a
                  href="https://tiktok.com/@dukainteriors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-red-600"
                  aria-label="TikTok"
                >
                  TikTok
                </a>
                <a
                  href="https://linkedin.com/company/dukainteriors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-red-600"
                  aria-label="LinkedIn"
                >
                  LinkedIn
                </a>
                <a
                  href="https://youtube.com/@dukainteriors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-red-600"
                  aria-label="YouTube"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}