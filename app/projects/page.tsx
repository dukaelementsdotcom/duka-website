import fs from 'fs';
import path from 'path';
import ProjectsClient from './ProjectsClient';
import { pageMeta, SITE_URL } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Interior Design Projects in Addis Ababa',
  description:
    'Office, retail, hospitality and residential interiors designed and built by Duka Interiors in Addis Ababa, with clients such as Schneider Electric and Awash Wine.',
  path: '/projects/',
});

// Projects whose type is stored as "Residential" but shown under Apartment.
const APARTMENT_OVERRIDES = [
  'luxury-three-bedroom-apartment-bole',
  'minimalist-apartment-finishing-ethiopia',
  'modern-studio-apartment-design-addis',
];

function getProjects() {
  const filePath = path.join(process.cwd(), 'public/data/projects.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^﻿/, ''));
  return data.map((p: any) => (APARTMENT_OVERRIDES.includes(p.slug) ? { ...p, type: 'Apartment' } : p));
}

export default function ProjectsPage() {
  const projects = getProjects();

  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Duka Interiors project portfolio',
    numberOfItems: projects.length,
    itemListElement: projects.map((p: any, i: number) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/projects/${p.slug}/`,
      name: p.title,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }} />
      <ProjectsClient initialProjects={projects} />
    </>
  );
}
