'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ShareButton from '../components/ShareButton';
import ProtectedImage from '../components/ProtectedImage';

export default function ProjectsClient({ initialProjects }: { initialProjects: any[] }) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const projects = initialProjects;
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('duka_moodboard');
      if (saved) setFavorites(JSON.parse(saved));
    } catch {}
  }, []);

  const toggleFavorite = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => {
      const updated = prev.includes(slug)
        ? prev.filter(id => id !== slug)
        : [...prev, slug];
      try { localStorage.setItem('duka_moodboard', JSON.stringify(updated)); } catch {}
      return updated;
    });
  };

  // Categories with icons
  const allCategories = [
    { id: 'all', label: 'All Projects', icon: '◈' },
    { id: 'Office', label: 'Office', icon: '◻' },
    { id: 'Apartment', label: 'Apartment', icon: '⌂' },
    { id: 'Residential', label: 'Residential', icon: '⌂' },
    { id: 'Hospitality', label: 'Hospitality', icon: '◇' },
    { id: 'Healthcare', label: 'Healthcare', icon: '+' },
    { id: 'Retail', label: 'Retail', icon: '◯' },
    { id: 'Gymnasium', label: 'Fitness', icon: '◆' },
  ];

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: projects.length };
    allCategories.forEach(cat => {
      if (cat.id !== 'all') {
        c[cat.id] = projects.filter((p: any) => p.type === cat.id).length;
      }
    });
    return c;
  }, [projects]);

  // Only show categories that have projects
  const categories = allCategories.filter(cat => counts[cat.id] > 0);

  // Search includes client name
  const filteredProjects = useMemo(() =>
    projects.filter((p: any) => {
      const matchesFilter = filter === 'all' || p.type === filter;
      const searchLower = search.toLowerCase();
      const matchesSearch = !search ||
        p.title.toLowerCase().includes(searchLower) ||
        p.location.toLowerCase().includes(searchLower) ||
        (p.client && p.client.toLowerCase().includes(searchLower));
      return matchesFilter && matchesSearch;
    }), [projects, filter, search]);

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-red-600 selection:text-white overflow-x-hidden">
      <NavBar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 md:pt-40 pb-8 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <div>
                <p className="text-red-600 text-[10px] font-black uppercase tracking-[0.3em] mb-3">Portfolio</p>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 uppercase tracking-tighter leading-[0.9]">
                  Our<br />Projects
                </h1>
              </div>
              <p className="text-gray-500 text-sm md:text-base max-w-md md:text-right">
                {projects.length} completed projects across offices, apartments, retail and hospitality spaces in Ethiopia.
              </p>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-gray-100">
              {[
                { label: 'Office Projects', value: counts['Office'] || 0 },
                { label: 'Residential', value: (counts['Apartment'] || 0) + (counts['Residential'] || 0) },
                { label: 'Retail & Hospitality', value: (counts['Retail'] || 0) + (counts['Hospitality'] || 0) },
                { label: 'Total Completed', value: projects.length },
              ].map((stat, i) => (
                <div key={i} className="text-center md:text-left">
                  <p className="text-3xl md:text-4xl font-black text-gray-900">{stat.value}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filter Bar - Sticky */}
        <section className="sticky top-[72px] md:top-[80px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setFilter(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 text-[11px] font-bold uppercase tracking-wide rounded-full whitespace-nowrap transition-all
                      ${filter === cat.id
                        ? 'bg-gray-900 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100'}`}
                  >
                    <span className="text-xs opacity-60">{cat.icon}</span>
                    {cat.label}
                    <span className={`ml-1 text-[10px] ${filter === cat.id ? 'text-gray-400' : 'text-gray-400'}`}>
                      {counts[cat.id]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full md:w-80">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" strokeWidth="2"/>
                  <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search by project, client or location..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search projects by title, client or location"
                  className="w-full pl-11 pr-4 py-3 text-sm border border-gray-200 rounded-full focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label="Clear search"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="px-4 md:px-8 py-8 md:py-12">
          <div className="max-w-7xl mx-auto">
            {filteredProjects.length === 0 ? (
              /* Empty State */
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No projects found</h3>
                <p className="text-gray-500 mb-6">
                  {search ? `No results for "${search}"` : 'No projects in this category yet'}
                </p>
                <button
                  onClick={() => { setFilter('all'); setSearch(''); }}
                  className="text-red-600 font-bold text-sm hover:underline"
                >
                  View all projects
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredProjects.map((project: any) => (
                  <article
                    key={project.slug}
                    className="group relative bg-gray-100 overflow-hidden"
                  >
                    {/* Image Container */}
                    <Link
                      href={`/projects/${project.slug}/`}
                      aria-label={`View ${project.title} - ${project.type} in ${project.location}`}
                      className="block aspect-[4/3] relative overflow-hidden"
                    >
                      <ProtectedImage
                        src={project.image}
                        alt={`${project.title} - ${project.type} interior design in ${project.location}`}
                        width={600}
                        height={450}
                        className="transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Content overlay */}
                      <div className="absolute inset-0 p-5 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-red-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{project.type}</p>
                        <h3 className="text-white text-lg md:text-xl font-black uppercase tracking-tight leading-tight mb-1">
                          {project.title}
                        </h3>
                        <p className="text-white/60 text-[11px] uppercase tracking-widest">
                          {project.location?.replace(/,(?=\S)/g, ', ')}
                          {project.area && project.area !== 'N/A' && ` · ${project.area}`}
                        </p>
                      </div>
                    </Link>

                    {/* Quick Info Bar - Always visible on mobile */}
                    <div className="md:hidden p-4 bg-white">
                      <Link href={`/projects/${project.slug}/`}>
                        <p className="text-red-600 text-[9px] font-black uppercase tracking-widest mb-1">{project.type}</p>
                        <h3 className="text-gray-900 font-bold text-sm leading-tight">{project.title}</h3>
                        <p className="text-gray-500 text-[11px] mt-1">{project.location?.replace(/,(?=\S)/g, ', ')}</p>
                      </Link>
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => toggleFavorite(e, project.slug)}
                      aria-label={favorites.includes(project.slug) ? `Remove ${project.title} from moodboard` : `Add ${project.title} to moodboard`}
                      className={`absolute top-4 left-4 w-10 h-10 flex items-center justify-center rounded-full z-20 transition-all
                        ${favorites.includes(project.slug)
                          ? 'bg-red-600 text-white'
                          : 'bg-black/30 backdrop-blur-sm text-white hover:bg-red-600'}`}
                    >
                      <svg className={`w-4 h-4 ${favorites.includes(project.slug) ? 'fill-current' : 'fill-none'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </button>

                    {/* Share Button */}
                    <div className="absolute bottom-4 right-4 z-30 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      <ShareButton
                        title={project.title}
                        url={`https://www.dukainteriors.com/projects/${project.slug}/`}
                      />
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 md:px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gray-950 text-white p-8 md:p-12 lg:p-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <p className="text-red-500 text-[10px] font-black uppercase tracking-[0.3em] mb-3">Start Your Project</p>
                <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-tight">
                  Have a space in mind?
                </h2>
                <p className="text-gray-400 mt-3 text-sm max-w-md">
                  Tell us your floor area and vision. We'll send a design concept and itemised proposal.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  href="/contact/"
                  className="bg-red-600 hover:bg-white hover:text-black text-white font-black py-4 px-8 text-[11px] uppercase tracking-widest text-center transition-colors"
                >
                  Get a Quote
                </Link>
                <Link
                  href="/estimate/"
                  className="border border-white/30 hover:bg-white hover:text-black font-black py-4 px-8 text-[11px] uppercase tracking-widest text-center transition-colors"
                >
                  Try Estimator
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Floating Moodboard Button */}
      {favorites.length > 0 && (
        <div className="fixed bottom-6 left-0 right-0 z-[1000] flex justify-center pointer-events-none px-4">
          <Link
            href="/moodboard/"
            aria-label={`Open your moodboard with ${favorites.length} saved projects`}
            className="pointer-events-auto bg-black text-white px-6 py-4 rounded-full flex items-center gap-3 shadow-2xl hover:scale-105 transition-all border border-white/10"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="text-[11px] font-black uppercase tracking-widest">My Moodboard</span>
            <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black">
              {favorites.length}
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}
