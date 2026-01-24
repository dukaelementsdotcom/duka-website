'use client';

import Link from 'next/link';

export default function Footer() {
  const socialLinks = [
    { name: 'WhatsApp', href: 'https://wa.me/251940607055', icon: 'fab fa-whatsapp' },
    { name: 'Telegram', href: 'https://t.me/dukainteriorsplc', icon: 'fab fa-telegram' },
    { name: 'Facebook', href: 'https://www.facebook.com/dukainteriors', icon: 'fab fa-facebook-f' },
    { name: 'Instagram', href: 'https://www.instagram.com/dukainteriors', icon: 'fab fa-instagram' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/duka-interiors', icon: 'fab fa-linkedin-in' },
    { name: 'TikTok', href: 'https://www.tiktok.com/@duka.interiors.plc', icon: 'fab fa-tiktok' },
  ];

  return (
    <footer className="bg-[#f8f5f2] pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <img
                src="/images/icons-duka-interiors/logo-duka-interiors-big.svg"
                alt="Duka Interiors Logo"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-[#4a4a4a] text-sm leading-relaxed mb-6">
              Elite interior design and construction company in Addis Ababa, Ethiopia. We provide single-point Design + Build solutions with transparent fixed costs.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[#d6d2cd] text-[#4a4a4a] flex items-center justify-center hover:border-[#c73e1d] hover:text-[#c73e1d] transition-all"
                >
                  <i className={`${social.icon} text-sm`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-[#0a0a0a] mb-6 tracking-wide">NAVIGATION</h3>
            <ul className="space-y-3">
              {['HOME', 'SERVICES', 'PROJECTS', 'ABOUT', 'CONTACT'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`} className="text-[#4a4a4a] text-sm hover:text-[#c73e1d] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-[#0a0a0a] mb-6 tracking-wide">SERVICES</h3>
            <ul className="space-y-3">
              {[
                'Interior Design',
                'Design + Build',
                'Branding and Signage',
                'Electrical and Technology',
                'Furniture and Fixtures',
              ].map((service) => (
                <li key={service}>
                  <Link href={`/services/${service.toLowerCase().replace(/\s+/g, '-')}`} className="text-[#4a4a4a] text-sm hover:text-[#c73e1d] transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-[#0a0a0a] mb-6 tracking-wide">CONTACT US</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-[#c73e1d]"><i className="fas fa-map-marker-alt"></i></div>
                <p className="text-[#4a4a4a] text-sm">
                  Djibouti street, Welela building, 5th floor, suite 507,<br />Addis Ababa, Ethiopia
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 text-[#c73e1d]"><i className="fas fa-phone-alt"></i></div>
                <div className="text-[#4a4a4a] text-sm space-y-1">
                  <a href="tel:+251940607055" className="block hover:text-[#c73e1d]">+251 940 607 055</a>
                  <a href="tel:+251929144290" className="block hover:text-[#c73e1d]">+251 929 144 290</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 text-[#c73e1d]"><i className="fas fa-envelope"></i></div>
                <a href="mailto:welcome@dukainteriors.com" className="text-[#4a4a4a] text-sm hover:text-[#c73e1d]">welcome@dukainteriors.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#e6e2dd] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#4a4a4a] text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Duka Interiors PLC. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link 
                href="/privacy-policy" 
                className="text-[#4a4a4a] text-sm hover:text-[#c73e1d] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms-of-service" 
                className="text-[#4a4a4a] text-sm hover:text-[#c73e1d] transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                href="/directory" 
                className="text-[#4a4a4a] text-sm hover:text-[#c73e1d] transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}