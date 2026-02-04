// app/components/Gallery.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Gallery() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/projects.json')
      .then(res => res.json())
      .then(data => {
        // Take first 6 projects
        setProjects(data.slice(0, 6));
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load projects:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-[90vw] mx-auto text-center">
          <div className="animate-pulse bg-gray-300 h-80 w-full rounded-none mb-4"></div>
          <div className="animate-pulse bg-gray-300 h-8 w-3/4 mx-auto mb-2"></div>
          <div className="animate-pulse bg-gray-300 h-4 w-1/2 mx-auto mb-6"></div>
          <div className="animate-pulse bg-gray-300 h-10 w-40 mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-[90vw] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-5 py-2 bg-black text-white text-xs font-bold uppercase tracking-wide rounded-none border-b-2 border-red-600">
            Our Work
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Featured Projects
          </h2>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="group relative aspect-[4/3] overflow-hidden"
            >
              <Image
                src={project.image}
                alt={`${project.title} interior design by Duka Interiors in Addis Ababa`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
                priority={false}
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-90 text-white flex flex-col items-center justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10">
                <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                <p className="text-gray-200 text-sm mb-4">{project.location || project.type}</p>
                <Link
                  href={`/projects/${project.slug}`}
                  className="px-6 py-2 bg-red-600 text-white font-bold text-xs uppercase tracking-wide rounded-none hover:bg-red-700 transition-colors duration-300 min-w-[120px] pointer-events-auto"
                >
                  See Project
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="px-8 py-3 border-2 border-gray-300 text-gray-900 font-bold text-sm uppercase tracking-wide rounded-none hover:bg-gray-100 transition-colors duration-300 min-w-[180px]"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}