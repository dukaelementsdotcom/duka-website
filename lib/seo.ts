// lib/seo.ts
// One place to build page metadata so every page gets its own title,
// description, canonical URL and social-share (Open Graph / Twitter) tags.
// Also provides structured data generators for rich results in search.
import type { Metadata } from 'next';

export const SITE_URL = 'https://www.dukainteriors.com';
export const SITE_NAME = 'Duka Interiors';
export const SITE_NAME_FULL = 'Duka Interiors PLC';
export const DEFAULT_OG_IMAGE = '/og-image.jpg';
export const LOGO_URL = `${SITE_URL}/images/icons-duka-interiors/logo-duka-interiors-big.svg`;

// Company information for structured data
export const COMPANY_INFO = {
  name: 'Duka Interiors PLC',
  legalName: 'Duka Interiors Private Limited Company',
  foundingDate: '2015',
  founders: [
    { name: 'Dagmawi Tilahun', title: 'CEO', linkedin: 'https://www.linkedin.com/in/dagmawi-tilahun' },
    { name: 'Henok Teshome', title: 'COO', linkedin: 'https://www.linkedin.com/in/henok-teshome-a3852b56' },
  ],
  email: 'contact@dukainteriors.com',
  phone: '+251929144290',
  address: {
    streetAddress: 'Djibouti Street, Welela Building, 5th Floor, Suite 507',
    addressLocality: 'Bole',
    addressRegion: 'Addis Ababa',
    postalCode: '1000',
    addressCountry: 'ET',
  },
  geo: { latitude: 9.00026, longitude: 38.78805 },
  sameAs: [
    'https://t.me/dukainteriorsplc',
    'https://www.instagram.com/dukainteriors',
    'https://www.linkedin.com/company/duka-interiors',
    'https://www.facebook.com/dukainteriors',
    'https://www.tiktok.com/@duka.interiors.plc',
    'https://wa.me/251940607055',
  ],
};

/** Absolute URL with the trailing slash the site serves (next.config trailingSlash: true). */
export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//.test(path)) return path;
  let p = path.startsWith('/') ? path : `/${path}`;
  if (!p.endsWith('/') && !/\.[a-z0-9]+$/i.test(p)) p += '/';
  return `${SITE_URL}${p}`;
}

/** Trim to a maximum length on a word boundary, adding an ellipsis when cut. */
export function clip(text: string, max = 158): string {
  const clean = text.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,.;:\-–—\s]+$/, '')}…`;
}

interface PageMetaInput {
  /** Page title without the brand suffix (the layout template adds " | Duka Interiors"). */
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  /** Use the title exactly as given, without the brand suffix. */
  absoluteTitle?: boolean;
  noindex?: boolean;
}

export function pageMeta({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  type = 'website',
  absoluteTitle = false,
  noindex = false,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const desc = clip(description);
  // Keep the full title within ~60 characters: drop the brand suffix when it would overflow.
  const useAbsolute = absoluteTitle || title.length + SITE_NAME.length + 3 > 62;
  const fullTitle = useAbsolute ? title : `${title} | ${SITE_NAME}`;
  const images = [{ url: image, alt: imageAlt || title }];

  return {
    // Always absolute: nested layouts with their own titles otherwise drop the template suffix.
    title: { absolute: fullTitle },
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: SITE_NAME,
      locale: 'en_ET',
      type,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: desc,
      images: [image],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

// =============================================================================
// STRUCTURED DATA GENERATORS
// =============================================================================

/**
 * Copyright and licence details for every ImageObject. Google Search Console asks for these
 * (Image Metadata: license, acquireLicensePage, creditText, copyrightNotice).
 */
export function imageRights() {
  return {
    creator: { '@type': 'Organization', name: COMPANY_INFO.name, url: SITE_URL },
    creditText: 'Duka Interiors',
    copyrightNotice: `© ${COMPANY_INFO.name}`,
    license: `${SITE_URL}/image-license/`,
    acquireLicensePage: `${SITE_URL}/contact/`,
  };
}

/** Organization schema - add to root layout for sitewide presence */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: COMPANY_INFO.name,
    legalName: COMPANY_INFO.legalName,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
      contentUrl: LOGO_URL,
      width: 500,
      height: 280,
      ...imageRights(),
    },
    image: `${SITE_URL}/og-image.jpg`,
    email: COMPANY_INFO.email,
    telephone: COMPANY_INFO.phone,
    foundingDate: COMPANY_INFO.foundingDate,
    founder: COMPANY_INFO.founders.map((f) => ({
      '@type': 'Person',
      name: f.name,
      jobTitle: f.title,
      sameAs: f.linkedin,
    })),
    address: {
      '@type': 'PostalAddress',
      ...COMPANY_INFO.address,
    },
    sameAs: COMPANY_INFO.sameAs,
    areaServed: [
      { '@type': 'City', name: 'Addis Ababa' },
      { '@type': 'Country', name: 'Ethiopia' },
    ],
  };
}

/** WebSite schema with SearchAction for sitelinks searchbox */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: 'Interior design and office fit-out company in Addis Ababa, Ethiopia',
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en',
  };
}

/** BreadcrumbList schema generator */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/** FAQPage schema for FAQ sections */
export function faqSchema(questions: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}

/** Service schema for service pages */
export function serviceSchema(service: {
  name: string;
  description: string;
  slug: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/services/${service.slug}/#service`,
    name: `${service.name} in Addis Ababa`,
    description: service.description,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: {
      '@type': 'City',
      name: 'Addis Ababa',
    },
    serviceType: service.name,
    ...(service.image ? { image: absoluteUrl(service.image) } : {}),
  };
}

/** Project/CreativeWork schema for portfolio items */
export function projectSchema(project: {
  title: string;
  slug: string;
  type: string;
  location: string;
  description?: string;
  image?: string;
  year?: number;
  client?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${SITE_URL}/projects/${project.slug}/#project`,
    name: project.title,
    description: project.description || `${project.type} interior project in ${project.location}`,
    creator: { '@id': `${SITE_URL}/#organization` },
    locationCreated: {
      '@type': 'Place',
      name: project.location,
    },
    ...(project.image ? { image: absoluteUrl(project.image) } : {}),
    ...(project.year ? { dateCreated: String(project.year) } : {}),
    genre: project.type,
  };
}

/** Article schema for blog posts */
export function articleSchema(article: {
  title: string;
  slug: string;
  description: string;
  date: string;
  image?: string;
  author?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SITE_URL}/resources/${article.slug}/#article`,
    headline: article.title,
    description: article.description,
    url: `${SITE_URL}/resources/${article.slug}/`,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
    },
    publisher: { '@id': `${SITE_URL}/#organization` },
    ...(article.image ? { image: absoluteUrl(article.image) } : {}),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/resources/${article.slug}/`,
    },
  };
}
