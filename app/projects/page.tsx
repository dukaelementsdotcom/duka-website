// app/projects/page.tsx
'use client';
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ShareButton from '../components/ShareButton';

export default function ProjectsPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [projects, setProjects] = useState([]);
  const [favorites, setFavorites] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/projects.json')
      .then(res => res.json())
      .then(data => {
        // 🔧 Fix misclassified projects
        const corrected = data.map(p => {
          if ([
            'luxury-three-bedroom-apartment-bole',
            'minimalist-apartment-finishing-ethiopia',
            'modern-studio-apartment-design-addis'
          ].includes(p.slug)) {
            return { ...p, type: 'Apartment' };
          }
          return p;
        });
        setProjects(corrected);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    
    const saved = localStorage.getItem('duka_moodboard');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const toggleFavorite = (e, slug) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    let updated = favorites.includes(slug) 
      ? favorites.filter(id => id !== slug) 
      : [...favorites, slug];
    setFavorites(updated);
    localStorage.setItem('duka_moodboard', JSON.stringify(updated));
  };

  const categories = [
  { id: 'all', label: 'All Works' },
  { id: 'Office', label: 'Office' },
  { id: 'Apartment', label: 'Apartment' },
  { id: 'Residential', label: 'Residential' },
  { id: 'Hospitality', label: 'Hospitality' },
  { id: 'Healthcare', label: 'Healthcare' },
  { id: 'Retail', label: 'Retail' },
  { id: 'Gymnasium', label: 'Gymnasium' }, // ✅ comma added
];
  const counts = useMemo(() => ({
  all: projects.length,
  Office: projects.filter(p => p.type === 'Office').length,
  Apartment: projects.filter(p => p.type === 'Apartment').length,
  Residential: projects.filter(p => p.type === 'Residential').length,
  Hospitality: projects.filter(p => p.type === 'Hospitality').length,
  Healthcare: projects.filter(p => p.type === 'Healthcare').length,
  Retail: projects.filter(p => p.type === 'Retail').length,
  Gymnasium: projects.filter(p => p.type === 'Gymnasium').length, // ✅ add this line
}), [projects]);

  const filteredProjects = useMemo(() => 
    projects.filter(p => {
      const matchesFilter = filter === 'all' || 
  (filter === 'Office' && p.type === 'Office') ||
  (filter === 'Apartment' && p.type === 'Apartment') ||
  (filter === 'Residential' && p.type === 'Residential') ||
  (filter === 'Hospitality' && p.type === 'Hospitality') ||
  (filter === 'Healthcare' && p.type === 'Healthcare') ||
  (filter === 'Retail' && p.type === 'Retail') ||
  (filter === 'Gymnasium' && p.type === 'Gymnasium'); // ✅ now properly chained with ||
      
      const matchesSearch = !search || 
        p.title.toLowerCase().includes(search.toLowerCase()) || 
        p.location.toLowerCase().includes(search.toLowerCase()) ||
        p.client?.toLowerCase().includes(search.toLowerCase());
      
      return matchesFilter && matchesSearch;
    }), [projects, filter, search]);

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center font-black tracking-widest text-[10px] uppercase">
      Loading Projects...
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-red-600 selection:text-white overflow-x-hidden">
      
      {/* Schema.org */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([/* your schema */]) }} />

      <NavBar />
      
      <main className="flex-grow pt-[80px]"> {/* ✅ Pushes content below sticky navbar */}
        
        {/* Hero */}
        <section className="pb-8 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Our Projects Portfolio
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We create workplaces that elevate your brand and inspire your people.
            </p>
          </div>

          {/* Sticky Filter + Search Bar */}
<div className="sticky top-[80px] z-40 bg-white border-b border-gray-100 py-4 px-4">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
    
    {/* Filters — Scrollable on Mobile, Wrap on Desktop if needed */}
    <div className="flex items-center overflow-x-auto pb-2 md:pb-0 space-x-2 scrollbar-hide md:overflow-visible">
      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => setFilter(cat.id)}
          className={`px-4 py-2 text-[10px] md:text-[11px] font-bold uppercase tracking-wide rounded-full whitespace-nowrap transition-colors flex-shrink-0
            ${filter === cat.id ? 'bg-black text-white' : 'text-gray-500 hover:text-gray-900 bg-gray-50'}`}
        >
          {cat.label} <span className="ml-1 opacity-75">({counts[cat.id as keyof typeof counts]})</span>
        </button>
      ))}
    </div>

    {/* Search — Full Width on Mobile, Fixed Width on Desktop */}
    <div className="relative w-full md:w-72 flex-shrink-0">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <i className="fas fa-search text-gray-400 text-xs"></i>
      </div>
      <input
        type="text"
        placeholder="Search projects…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 text-[12px] border border-gray-200 rounded-full focus:ring-1 focus:ring-red-600 focus:border-transparent outline-none bg-white"
      />
    </div>
  </div>
</div>
        </section>

        {/* Full-Bleed Masonry Gallery — Contour Style */}
        <section className="-mx-px pb-20">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-px space-y-px">
            {filteredProjects.map((project) => (
              <Link 
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group block break-inside-avoid relative"
              >
                <div className="relative aspect-[4/3] bg-white">
                  <Image
                    src={project.image}
                    alt={`${project.title} interior design in ${project.location}`}
                    fill
                    className="object-cover transition-all duration-300 group-hover:saturate-0" // ✅ Grayscale on hover
                    sizes="(max-width: 768px) calc(100vw - 2px), (max-width: 1200px) calc(50vw - 2px), 33vw"
                  />
                  
                  {/* Contour-Style Overlay */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  {/* Project Info — White Text on Hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="text-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 block mb-1">
                        {project.type}
                      </span>
                      <h3 className="text-xl font-black leading-tight">{project.title}</h3>
                      <p className="text-sm opacity-80 mt-1">{project.location}</p>
                    </div>
                  </div>

                  {/* Heart Button — Always Visible on Hover */}
                  <button
                    onClick={(e) => toggleFavorite(e, project.slug)}
                    className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto"
                    title="Add to Moodboard"
                  >
                    <svg className={`w-4 h-4 ${favorites.includes(project.slug) ? 'text-red-500 fill-current' : 'text-white'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>

                  {/* Share Button */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto">
                    <ShareButton title={project.title} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Floating Moodboard Bar */}
        {favorites.length > 0 && (
          <div className="fixed bottom-10 left-0 right-0 z-50 flex justify-center pointer-events-none">
            <Link 
              href="/moodboard" 
              className="pointer-events-auto bg-black text-white px-8 py-5 rounded-full flex items-center gap-6 shadow-2xl border border-white/10 hover:scale-105 transition-all group"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Open My Moodboard</span>
              <span className="bg-red-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black">
                {favorites.length}
              </span>
            </Link>
          </div>
        )}

        {/* Telegram CTA */}
        <section className="bg-[#0b0e13] py-24 text-center px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Get a free consultation</h2>
            <a 
              href="https://t.me/dukainteriorsplc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-red-600 text-white px-8 py-4 font-black uppercase tracking-wider text-sm hover:bg-white hover:text-black transition-colors rounded-none"
            >
              Message @dukainteriorsplc →
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}