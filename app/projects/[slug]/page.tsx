import * as React from 'react';
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import ProjectClient from './ProjectClient';

/**
 * HELPER: Reads the JSON file and strips hidden BOM characters 
 * to prevent the "Unexpected token" error.
 */
function getProjectsData() {
  const filePath = path.join(process.cwd(), 'public/data/projects.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  // The .replace(/^\uFEFF/, '') is critical for fixing your JSON error
  return JSON.parse(fileContent.replace(/^\uFEFF/, ''));
}

/**
 * 1. PRE-RENDER: This tells Next.js exactly which projects exist 
 * so it can build them at once and prevent 404s.
 */
export async function generateStaticParams() {
  const projects = getProjectsData();
  return projects.map((project: any) => ({
    slug: project.slug,
  }));
}

/**
 * 2. MAIN PAGE COMPONENT: A Server Component that loads 
 * the data instantly for SEO and AI crawlers.
 */
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const allProjects = getProjectsData();
  const project = allProjects.find((p: any) => p.slug === slug);

  // If the URL slug doesn't match any project in your JSON, show the 404 page
  if (!project) {
    notFound();
  }

  // Pass the data to your Client Component (ProjectClient) for the design/UI
  return <ProjectClient project={project} allProjects={allProjects} slug={slug} />;
}