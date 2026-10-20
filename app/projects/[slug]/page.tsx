import * as React from 'react';
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import ProjectClient from './ProjectClient';
import { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

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

  // SCHEMA FOR SINGLE PROJECT
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "creator": { "@type": "Organization", "name": "Duka Interiors" },
    "locationCreated": { "@type": "Place", "name": project.location },
    "image": project.image,
    "description": `A ${project.type} project delivered in Addis Ababa.`
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }} />
      <ProjectClient project={project} allProjects={allProjects} slug={slug} />
    </>
  );
}