// lib/siteConfig.ts
// Single source of truth for contact details, social links and navigation,
// shared by the navbar, footer and structured data.

export const CONTACT = {
  companyName: 'Duka Interiors PLC',
  phones: [
    { number: '+251929144290', label: '+251 929 144 290' },
    { number: '+251940607055', label: '+251 940 607 055' },
  ],
  whatsapp: '251929144290',
  email: 'contact@dukainteriors.com',
  address: {
    line1: 'Djibouti Street, Welela Building',
    line2: '5th Floor, Suite 507',
    city: 'Bole, Addis Ababa, Ethiopia',
  },
  mapsUrl: 'https://maps.app.goo.gl/FNBrMacYUefLEH7k8',
  hours: 'Mon–Sat, 8:30 AM – 6:00 PM',
};

export const whatsappLink = (text = 'Hello Duka Interiors, I would like to discuss a project.') =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;

export type SocialName = 'WhatsApp' | 'Telegram' | 'Facebook' | 'Instagram' | 'LinkedIn' | 'TikTok';

export const SOCIAL_LINKS: { name: SocialName; href: string }[] = [
  { name: 'WhatsApp', href: `https://wa.me/${CONTACT.whatsapp}` },
  { name: 'Telegram', href: 'https://t.me/dukainteriorsplc' },
  { name: 'Facebook', href: 'https://www.facebook.com/dukainteriors' },
  { name: 'Instagram', href: 'https://www.instagram.com/dukainteriors' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/duka-interiors' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@duka.interiors.plc' },
];

// Main navigation. Only pages with real content are listed: the Products
// section and the Material Guides / FAQ pages come back when they launch.
export const NAV_LINKS: { label: string; href: string; badge?: string }[] = [
  { label: 'Services', href: '/services/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'About', href: '/about/' },
  { label: 'Insights', href: '/resources/' },
  { label: 'Estimator', href: '/estimate/', badge: 'New' },
];
