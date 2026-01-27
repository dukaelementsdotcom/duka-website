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
  const [favorites, setFavorites] = useState<string[]>([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/projects.json')
      .then(res => res.json())
      .then(data => {
        const corrected = data.map((p: any) => {
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

  const toggleFavorite = (e: React.MouseEvent, slug: string) => {
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
    { id: 'Gymnasium', label: 'Gymnasium' },
  ];

  const counts = useMemo(() => ({
    all: projects.length,
    Office: projects.filter((p: any) => p.type === 'Office').length,
    Apartment: projects.filter((p: any) => p.type === 'Apartment').length,
    Residential: projects.filter((p: any) => p.type === 'Residential').length,
    Hospitality: projects.filter((p: any) => p.type === 'Hospitality').length,
    Healthcare: projects.filter((p: any) => p.type === 'Healthcare').length,
    Retail: projects.filter((p: any) => p.type === 'Retail').length,
    Gymnasium: projects.filter((p: any) => p.type === 'Gymnasium').length,
  }), [projects]);

  const filteredProjects = useMemo(() => 
    projects.filter((p: any) => {
      const matchesFilter = filter === 'all' || p.type === filter;
      const matchesSearch = !search || 
        p.title.toLowerCase().includes(search.toLowerCase()) || 
        p.location.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    }), [projects, filter, search]);

  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": filteredProjects.slice(0, 10).map((p: any, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": `https://dukainteriors.com/projects/${p.slug}`,
      "name": p.title
    }))
  };

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center font-black tracking-widest text-[10px] uppercase">
      Loading Projects Portfolio...
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-red-600 selection:text-white overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }} />
      <NavBar />
      
      <main className="flex-grow pt-[80px]">
        <section className="pb-8 px-4 md:px-6 mt-12">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 uppercase tracking-tighter">
              Our Projects Portfolio
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto text-base uppercase tracking-widest font-bold">
              We create workplaces that elevate your brand and inspire your people.
            </p>
          </div>

          <div className="sticky top-[80px] z-40 bg-white border-b border-gray-100 py-4 px-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center overflow-x-auto pb-2 md:pb-0 space-x-2 scrollbar-hide">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setFilter(cat.id)}
                    className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wide rounded-full whitespace-nowrap transition-colors
                      ${filter === cat.id ? 'bg-black text-white' : 'text-gray-500 hover:text-gray-900 bg-gray-50'}`}
                  >
                    {cat.label} <span className="ml-1 opacity-75">({counts[cat.id as keyof typeof counts] || 0})</span>
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-72">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-4 pr-4 py-2 text-[11px] border border-gray-200 rounded-full focus:ring-1 focus:ring-red-600 outline-none"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="px-1 md:px-2 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {filteredProjects.map((project: any, idx: number) => (
              <div key={project.slug} className="group relative aspect-[4/3] bg-gray-100 overflow-hidden">
                <Link href={`/projects/${project.slug}`} className="block w-full h-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    priority={idx < 6}
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                    <span className="text-red-500 text-[9px] font-black uppercase tracking-[0.2em] mb-2">{project.type}</span>
                    <h3 className="text-white text-xl md:text-2xl font-black uppercase tracking-tighter leading-none mb-1">{project.title}</h3>
                    <p className="text-white/70 text-[10px] uppercase tracking-widest">{project.location}</p>
                  </div>
                </Link>

                <button
                  onClick={(e) => toggleFavorite(e, project.slug)}
                  className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center bg-black/20 backdrop-blur-md rounded-full text-white z-20 hover:bg-red-600 transition-colors"
                >
                  <svg className={`w-4 h-4 ${favorites.includes(project.slug) ? 'fill-current' : 'fill-none'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>

                <div className="absolute bottom-4 right-4 z-30 pointer-events-auto">
                  <ShareButton title={project.title} />
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {favorites.length > 0 && (
          <div className="fixed bottom-10 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
            <Link href="/moodboard" className="pointer-events-auto bg-black text-white px-8 py-5 rounded-full flex items-center gap-6 shadow-2xl hover:scale-105 transition-all">
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Open My Moodboard</span>
              <span className="bg-red-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black">{favorites.length}</span>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}