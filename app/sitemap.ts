import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { services } from '@/lib/servicesData'; // Import your services

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://dukainteriors.com';

  // 1. Project Routes from JSON
  const filePath = path.join(process.cwd(), 'public/data/projects.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const projectsData = JSON.parse(fileContent.replace(/^\uFEFF/, ''));

  const projectRoutes = projectsData.map((project: any) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 2. Service Routes from servicesData.ts
  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 3. Static Main Routes
  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/projects',
    '/resources',
    '/contact',
    '/directory',
    '/privacy-policy', // Added from your folder structure
    '/terms-of-service', // Added from your folder structure
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? ('daily' as const) : ('monthly' as const),
    priority: route === '' ? 1.0 : 0.9,
  }));

  return [...staticRoutes, ...projectRoutes, ...serviceRoutes];
}