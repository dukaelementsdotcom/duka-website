'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// Use the @ alias to point directly to your components folder
import NavBar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';
import ShareButton from '@/app/components/ShareButton';

export default function ProjectClient({ project, allProjects, slug }: any) {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // Load favorites from memory
    const saved = localStorage.getItem('duka_moodboard');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const toggleFavorite = () => {
    let updated;
    if (favorites.includes(slug)) {
      updated = favorites.filter(id => id !== slug);
    } else {
      updated = [...favorites, slug];
    }
    setFavorites(updated);
    localStorage.setItem('duka_moodboard', JSON.stringify(updated));
  };

  const navGallery = (direction: 'next' | 'prev') => {
    const total = project.images?.length || 1;
    const nextIndex = direction === 'next' 
      ? (mainImageIndex + 1) % total 
      : (mainImageIndex - 1 + total) % total;
    setMainImageIndex(nextIndex);
  };

  const images = project.images || [project.image];
  const getSeoAlt = (index: number) => `${project.title} - Interior Detail ${index} in ${project.location}, Ethiopia. Designed by Duka Interiors.`;

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-red-600 selection:text-white">
      
      {/* AI SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ArchitecturalDesign",
            "name": project.title,
            "location": project.location,
            "creator": { "@type": "Organization", "name": "Duka Interiors" },
            "image": `https://dukainteriors.com${project.image}`
          })
        }}
      />

      <NavBar />
      
      {/* 1. HERO VIEWPORT */}
      <section className="relative w-full mt-20 md:mt-24 px-4 md:px-10">
        <div className="relative w-full aspect-[4/3] md:aspect-video lg:h-[80vh] overflow-hidden bg-gray-50 group">
          <Image 
            src={images[mainImageIndex]} 
            alt={getSeoAlt(mainImageIndex)} 
            fill 
            className="object-cover"
            priority 
          />
          
          <div className="absolute inset-y-0 left-0 flex items-center z-20">
            <button onClick={() => navGallery('prev')} className="w-10 h-10 md:w-14 md:h-20 bg-white/90 text-black hover:bg-black hover:text-white transition-all text-xl flex items-center justify-center shadow-md ml-2 md:ml-0">‹</button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center z-20">
            <button onClick={() => navGallery('next')} className="w-10 h-10 md:w-14 md:h-20 bg-white/90 text-black hover:bg-black hover:text-white transition-all text-xl flex items-center justify-center shadow-md mr-2 md:mr-0">›</button>
          </div>

          <div className="absolute top-4 left-4 md:top-8 md:left-8 z-30 flex gap-2">
            <Link href="/projects">
              <div className="bg-white px-4 py-2 md:px-8 md:py-3 border border-gray-100 text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-lg">
                ← ALL PROJECTS
              </div>
            </Link>
          </div>

          <div className="absolute top-4 right-4 md:top-8 md:right-8 z-30">
            <button 
              onClick={toggleFavorite}
              className={`flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-300 backdrop-blur-md ${favorites.includes(slug) ? 'bg-red-600 border-red-600 text-white' : 'bg-black/20 border-white/20 text-white hover:bg-white hover:text-black'}`}
            >
              <svg className={`w-4 h-4 ${favorites.includes(slug) ? 'fill-white' : 'fill-none'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span className="text-[10px] font-black uppercase tracking-widest">
                {favorites.includes(slug) ? 'In Moodboard' : 'Add to Moodboard'}
              </span>
            </button>
          </div>

          <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-30">
            <ShareButton title={project.title} />
          </div>
        </div>

        <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide pb-2 border-b border-gray-100">
           {images.map((img: string, i: number) => (
             <button key={i} onClick={() => setMainImageIndex(i)} className={`relative flex-shrink-0 w-20 h-14 md:w-28 md:h-18 transition-all ${i === mainImageIndex ? 'opacity-100 ring-2 ring-red-600' : 'opacity-30'}`}>
               <Image src={img} alt="Detail" fill className="object-cover" />
             </button>
           ))}
        </div>
      </section>

      {/* 2. PROJECT DETAILS */}
      <section className="py-16 md:py-28 px-6 md:px-10 max-w-[1600px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
          <div className="lg:col-span-8 space-y-10">
            <div className="pb-8 border-b border-gray-100">
               <span className="text-red-600 font-black text-[10px] tracking-[0.5em] uppercase mb-4 block">Project Profile</span>
               <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-gray-950">{project.title}</h1>
               <p className="text-lg md:text-xl font-medium text-gray-300 mt-4 uppercase tracking-[0.2em]">{project.location}</p>
            </div>
            <div className="max-w-4xl">
               <p className="text-lg md:text-2xl text-gray-600 font-light leading-relaxed">{project.description}</p>
               <div className="mt-10">
                  <a href="https://t.me/dukainteriorsplc" target="_blank" className="inline-block bg-black text-white px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all">
                    START A PROJECT WITH US
                  </a>
               </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-gray-50 p-8 md:p-12 space-y-10">
             <h4 className="text-gray-950 font-black text-[10px] tracking-[0.4em] uppercase pb-4 border-b border-gray-200">Technical Details</h4>
             <div className="grid grid-cols-1 gap-8">
                {[{ label: 'Services', value: project.type }, { label: 'Timeline', value: project.year }, { label: 'Location', value: project.location }, { label: 'Status', value: 'Completed' }].map((item) => (
                  <div key={item.label}>
                     <span className="text-[9px] font-black uppercase tracking-[0.3em] text-red-600 block mb-2">{item.label}</span>
                     <span className="text-sm font-bold text-gray-950 uppercase tracking-widest block">{item.value}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* FLOATING MOODBOARD NOTIFICATION */}
      {favorites.length > 0 && (
          <div className="fixed bottom-10 left-0 right-0 z-50 flex justify-center pointer-events-none">
            <Link href="/moodboard" className="pointer-events-auto bg-black text-white px-8 py-5 rounded-full flex items-center gap-6 shadow-2xl border border-white/10 hover:scale-105 transition-all group">
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Open My Moodboard</span>
              <span className="bg-red-600 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold">
                {favorites.length}
              </span>
            </Link>
          </div>
      )}

      {/* SIMILAR PROJECTS */}
      <section className="bg-white border-t border-gray-100">
        <div className="px-6 md:px-10 py-10 flex justify-between items-end">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Similar Projects</h2>
            <Link href="/projects" className="text-[10px] font-black uppercase tracking-widest border-b-2 border-red-600 pb-1">VIEW ALL</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-gray-100">
          {allProjects.filter((p: any) => p.slug !== slug).slice(0, 3).map((p: any) => (
            <Link key={p.slug} href={`/projects/${p.slug}`} className="group relative aspect-video md:aspect-square overflow-hidden border-r border-gray-100 last:border-0">
              <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-white/95 opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-center items-center text-center p-6">
                 <span className="text-red-600 text-[9px] font-black tracking-[0.5em] mb-3 uppercase">{p.location}</span>
                 <h3 className="text-black text-xl md:text-2xl font-black uppercase tracking-tighter leading-none">{p.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}