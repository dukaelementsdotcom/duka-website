import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { services } from '@/lib/servicesData';
import { BLOG_POSTS } from '@/app/resources/post.data';
import { absoluteUrl } from '@/lib/seo';

// Only real, indexable pages are listed. URLs use www + trailing slash,
// exactly as the site serves them. "Coming soon" pages are left out.
export default function sitemap(): MetadataRoute.Sitemap {
  const filePath = path.join(process.cwd(), 'public/data/projects.json');
  const projects = JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^﻿/, ''));

  // Get file modification times for lastModified dates
  const getFileMtime = (relativePath: string): Date | undefined => {
    try {
      const fullPath = path.join(process.cwd(), relativePath);
      const stats = fs.statSync(fullPath);
      return stats.mtime;
    } catch {
      return undefined;
    }
  };

  // Current date for pages without specific modification dates
  const now = new Date();
  const recentUpdate = new Date('2026-10-26'); // Last major update date

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), priority: 1, lastModified: recentUpdate, changeFrequency: 'weekly' },
    { url: absoluteUrl('/services/'), priority: 0.9, lastModified: recentUpdate, changeFrequency: 'monthly' },
    { url: absoluteUrl('/projects/'), priority: 0.9, lastModified: recentUpdate, changeFrequency: 'weekly' },
    { url: absoluteUrl('/about/'), priority: 0.8, lastModified: recentUpdate, changeFrequency: 'monthly' },
    { url: absoluteUrl('/contact/'), priority: 0.8, lastModified: recentUpdate, changeFrequency: 'yearly' },
    { url: absoluteUrl('/estimate/'), priority: 0.7, lastModified: recentUpdate, changeFrequency: 'monthly' },
    { url: absoluteUrl('/resources/'), priority: 0.7, lastModified: recentUpdate, changeFrequency: 'weekly' },
    { url: absoluteUrl('/resources/faq/'), priority: 0.6, lastModified: new Date('2026-10-27'), changeFrequency: 'monthly' },
    { url: absoluteUrl('/resources/materials/'), priority: 0.6, lastModified: new Date('2026-10-27'), changeFrequency: 'monthly' },
    { url: absoluteUrl('/directory/'), priority: 0.3, lastModified: recentUpdate, changeFrequency: 'monthly' },
    { url: absoluteUrl('/privacy-policy/'), priority: 0.2, lastModified: new Date('2026-01-01'), changeFrequency: 'yearly' },
    { url: absoluteUrl('/terms-of-service/'), priority: 0.2, lastModified: new Date('2026-01-01'), changeFrequency: 'yearly' },
    { url: absoluteUrl('/image-license/'), priority: 0.2, lastModified: new Date('2026-10-27'), changeFrequency: 'yearly' },
  ];

  const serviceRoutes = services.map((s) => ({
    url: absoluteUrl(`/services/${s.slug}/`),
    priority: 0.9,
    lastModified: recentUpdate,
    changeFrequency: 'monthly' as const,
  }));

  const projectRoutes = projects.map((p: { slug: string; image?: string; year?: number }) => ({
    url: absoluteUrl(`/projects/${p.slug}/`),
    priority: 0.7,
    lastModified: p.year ? new Date(`${p.year}-12-31`) : recentUpdate,
    changeFrequency: 'yearly' as const,
    ...(p.image ? { images: [absoluteUrl(encodeURI(p.image))] } : {}),
  }));

  const postRoutes = BLOG_POSTS.map((post) => {
    const date = new Date(post.date);
    return {
      url: absoluteUrl(`/resources/${post.slug}/`),
      priority: 0.6,
      changeFrequency: 'yearly' as const,
      ...(isNaN(date.getTime()) ? {} : { lastModified: date }),
    };
  });

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...postRoutes];
}
