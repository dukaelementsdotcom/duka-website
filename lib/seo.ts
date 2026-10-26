// lib/seo.ts
// One place to build page metadata so every page gets its own title,
// description, canonical URL and social-share (Open Graph / Twitter) tags.
import type { Metadata } from 'next';

export const SITE_URL = 'https://www.dukainteriors.com';
export const SITE_NAME = 'Duka Interiors';
export const DEFAULT_OG_IMAGE = '/og-image.jpg';

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
