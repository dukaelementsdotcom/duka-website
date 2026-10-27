import * as React from 'react';
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import ProjectClient from './ProjectClient';
import { Metadata } from 'next';
import { pageMeta, projectSchema, breadcrumbSchema, SITE_URL, imageRights } from '@/lib/seo';

function getProjectsData() {
  const filePath = path.join(process.cwd(), 'public/data/projects.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContent.replace(/^\uFEFF/, ''));
}

// DYNAMIC SEO GENERATOR
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const projects = getProjectsData();
  const project = projects.find((p: any) => p.slug === slug);

  if (!project) return { title: 'Project Not Found' };

  const area = project.area && project.area !== 'N/A' ? ` ${project.area}` : '';
  const description =
    `${project.description || ''} ${project.type} interior project for ${project.client || 'our client'} in ${project.location}${project.year ? `, ${project.year}` : ''}.${area ? ` Area:${area}.` : ''} Designed and built by Duka Interiors.`.trim();

  return pageMeta({
    title: project.title,
    description,
    path: `/projects/${project.slug}/`,
    image: project.image,
    imageAlt: `${project.title} – ${project.type} interior by Duka Interiors`,
    type: 'article',
  });
}

export async function generateStaticParams() {
  const projects = getProjectsData();
  return projects.map((project: any) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const allProjects = getProjectsData();
  const project = allProjects.find((p: any) => p.slug === slug);

  if (!project) notFound();

  // Generate structured data for this project
  const projectStructuredData = projectSchema({
    title: project.title,
    slug: project.slug,
    type: project.type,
    location: project.location,
    description: project.description,
    image: project.image,
    year: project.year,
    client: project.client,
  });

  // Breadcrumb structured data
  const breadcrumbData = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Projects', url: '/projects/' },
    { name: project.title, url: `/projects/${project.slug}/` },
  ]);

  // ImageGallery schema for all project images
  const galleryImages = project.images || [project.image];
  const imageGallerySchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: `${project.title} - Interior Design Photos`,
    description: `Interior design photos of ${project.title} by Duka Interiors`,
    image: galleryImages.map((img: string) => ({
      '@type': 'ImageObject',
      // encodeURI: a few image files have spaces in their names, which aren't valid in a URL.
      contentUrl: encodeURI(img.startsWith('http') ? img : `${SITE_URL}${img}`),
      description: `${project.title} interior design by Duka Interiors`,
      ...imageRights(),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGallerySchema) }} />
      <ProjectClient project={project} allProjects={allProjects} slug={slug} />
    </>
  );
}