// Server component: no client JavaScript needed for the footer.
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faEnvelope, faClock } from '@fortawesome/free-solid-svg-icons';
import {
  faWhatsapp,
  faTelegram,
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTiktok,
} from '@fortawesome/free-brands-svg-icons';
import { services } from '@/lib/servicesData';
import { CONTACT, NAV_LINKS, SOCIAL_LINKS, whatsappLink, type SocialName } from '@/lib/siteConfig';

const SOCIAL_ICONS: Record<SocialName, typeof faWhatsapp> = {
  WhatsApp: faWhatsapp,
  Telegram: faTelegram,
  Facebook: faFacebookF,
  Instagram: faInstagram,
  LinkedIn: faLinkedinIn,
  TikTok: faTiktok,
};

const headingClass = 'text-xs font-black text-[#0a0a0a] mb-5 tracking-[0.2em] uppercase';
const linkClass = 'text-[#4a4a4a] text-sm hover:text-[#c73e1d] transition-colors';
const iconClass = 'w-4 shrink-0 mt-0.5 text-[#c73e1d]';

export default function Footer() {
  return (
    <footer className="bg-[#f8f5f2] pt-16 pb-8" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Duka Interiors – contact and site links
      </h2>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link href="/" aria-label="Duka Interiors – home" className="inline-block mb-5">
              <img
                src="/images/icons-duka-interiors/logo-duka-interiors-big.svg"
                alt="Duka Interiors"
                width={107}
                height={60}
                loading="lazy"
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-[#4a4a4a] text-sm leading-relaxed mb-6 max-w-sm">
              Duka Interiors is a design-and-build interior firm in Addis Ababa, founded in 2015 by architects. We
              design, partition, furnish and fit out offices, showrooms and homes, from first sketch to handover.
            </p>
            <ul className="flex flex-wrap gap-3" aria-label="Social media">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Duka Interiors on ${social.name} (opens in a new tab)`}
                    title={social.name}
                    className="w-10 h-10 shrink-0 rounded-full border border-[#d6d2cd] text-[#4a4a4a] flex items-center justify-center hover:border-[#c73e1d] hover:text-[#c73e1d] transition-colors"
                  >
                    <FontAwesomeIcon icon={SOCIAL_ICONS[social.name]} className="text-sm" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer" className="lg:col-span-2">
            <h3 className={headingClass}>Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className={linkClass}>
                  Home
                </Link>
              </li>
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label === 'Estimator' ? 'Cost estimator' : item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact/" className={linkClass}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className={headingClass}>Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}/`} className={linkClass}>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="sm:col-span-2 lg:col-span-3">
            <h3 className={headingClass}>Visit or call</h3>
            <address className="not-italic space-y-4 text-sm text-[#4a4a4a]">
              <a href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-[#c73e1d]">
                <FontAwesomeIcon icon={faLocationDot} className={iconClass} />
                <span>
                  {CONTACT.address.line1},
                  <br />
                  {CONTACT.address.line2},
                  <br />
                  {CONTACT.address.city}
                </span>
              </a>
              <div className="flex items-start gap-3">
                <FontAwesomeIcon icon={faPhone} className={iconClass} />
                <div className="space-y-1">
                  {CONTACT.phones.map((phone) => (
                    <a key={phone.number} href={`tel:${phone.number}`} className="block hover:text-[#c73e1d]">
                      {phone.label}
                    </a>
                  ))}
                </div>
              </div>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-[#c73e1d]">
                <FontAwesomeIcon icon={faWhatsapp} className={iconClass} />
                <span>Chat on WhatsApp</span>
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-start gap-3 hover:text-[#c73e1d] break-all">
                <FontAwesomeIcon icon={faEnvelope} className={iconClass} />
                <span>{CONTACT.email}</span>
              </a>
              <p className="flex items-start gap-3">
                <FontAwesomeIcon icon={faClock} className={iconClass} />
                <span>{CONTACT.hours}</span>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#e6e2dd] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#4a4a4a]">
          <p>
            © {new Date().getFullYear()} {CONTACT.companyName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy-policy/" className={linkClass}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-of-service/" className={linkClass}>
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/image-license/" className={linkClass}>
                Image Use
              </Link>
            </li>
            <li>
              <Link href="/directory/" className={linkClass}>
                Sitemap
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
