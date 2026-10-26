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

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), priority: 1 },
    { url: absoluteUrl('/services/'), priority: 0.9 },
    { url: absoluteUrl('/projects/'), priority: 0.9 },
    { url: absoluteUrl('/about/'), priority: 0.8 },
    { url: absoluteUrl('/contact/'), priority: 0.8 },
    { url: absoluteUrl('/estimate/'), priority: 0.7 },
    { url: absoluteUrl('/resources/'), priority: 0.7 },
    { url: absoluteUrl('/directory/'), priority: 0.3 },
    { url: absoluteUrl('/privacy-policy/'), priority: 0.2 },
    { url: absoluteUrl('/terms-of-service/'), priority: 0.2 },
  ];

  const serviceRoutes = services.map((s) => ({
    url: absoluteUrl(`/services/${s.slug}/`),
    priority: 0.9,
  }));

  const projectRoutes = projects.map((p: { slug: string; image?: string }) => ({
    url: absoluteUrl(`/projects/${p.slug}/`),
    priority: 0.7,
    ...(p.image ? { images: [absoluteUrl(encodeURI(p.image))] } : {}),
  }));

  const postRoutes = BLOG_POSTS.map((post) => {
    const date = new Date(post.date);
    return {
      url: absoluteUrl(`/resources/${post.slug}/`),
      priority: 0.6,
      ...(isNaN(date.getTime()) ? {} : { lastModified: date }),
    };
  });

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...postRoutes];
}
