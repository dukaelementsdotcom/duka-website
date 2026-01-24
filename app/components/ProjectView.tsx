// app/components/ProjectView.tsx
'use client';
import { useState } from 'react';
import Image from 'next/image';
import ShareButton from './ShareButton';

export default function ProjectView({ project }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow py-24 px-6 bg-white">
        <div className="max-w-[90vw] mx-auto">
          <a href="/projects" className="text-red-600 hover:underline text-sm mb-4 block">
            &larr; Back to Projects
          </a>
          <h1 className="text-4xl font-bold text-gray-900 my-6">{project.title}</h1>
          <p className="text-gray-600 mb-4">{project.location} • {project.year}</p>
          <p className="text-lg text-gray-700 mb-8">{project.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="relative h-64 overflow-hidden rounded-none">
              <Image
                src={project.image}
                alt={project.title}
                width={1200}
                height={800}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <ShareButton title={project.title} />
        </div>
      </main>
    </div>
  );
}