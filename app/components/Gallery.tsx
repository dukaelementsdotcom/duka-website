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
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 lg:px-12 bg-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-16">
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 mb-4">Our Work</h3>
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Featured Projects</h2>
      </div>

      {/* 3x2 Grid - ✅ FIXED: Added min-h to prevent CLS */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 min-h-[800px]">
          {projects.map((project, index) => (
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
                quality={75}
                loading={index < 3 ? "eager" : "lazy"}
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-90 text-white flex flex-col items-center justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10">
                <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                <p className="text-gray-200 text-sm mb-4">{project.location || project.type}</p>
                <Link
                  href={`/projects/${project.slug}`}
                  aria-label={`View ${project.title} project details`}
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
            aria-label="View all interior design projects in our portfolio"
            className="px-8 py-3 border-2 border-gray-300 text-gray-900 font-bold text-sm uppercase tracking-wide rounded-none hover:bg-gray-100 transition-colors duration-300 min-w-[180px]"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}