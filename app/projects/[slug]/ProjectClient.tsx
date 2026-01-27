'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NavBar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';
import ShareButton from '@/app/components/ShareButton';

export default function ProjectClient({ project, allProjects, slug }: any) {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('duka_moodboard');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const toggleFavorite = () => {
    let updated = favorites.includes(slug) ? favorites.filter(id => id !== slug) : [...favorites, slug];
    setFavorites(updated);
    localStorage.setItem('duka_moodboard', JSON.stringify(updated));
  };

  const navGallery = (direction: 'next' | 'prev') => {
    const total = project.images?.length || 1;
    const nextIndex = direction === 'next' ? (mainImageIndex + 1) % total : (mainImageIndex - 1 + total) % total;
    setMainImageIndex(nextIndex);
  };

  const images = project.images || [project.image];
  const getSeoAlt = (index: number) => `${project.title} - Interior Detail ${index} in ${project.location}, Ethiopia.`;

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-red-600">
      <NavBar />
      
      <section className="relative w-full mt-24 md:mt-32 px-4 md:px-10">
        {/* TOP ACTION BAR: Prevents Overlap */}
        <div className="flex flex-row justify-between items-center mb-6 gap-4">
          <Link href="/projects">
            <div className="bg-black text-white px-4 py-2 md:px-8 md:py-3 border border-black text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:border-red-600 transition-all shadow-sm">
              ← ALL PROJECTS
            </div>
          </Link>

          <button 
            onClick={toggleFavorite}
            className={`flex items-center gap-3 px-5 py-2 md:px-8 md:py-3 rounded-full border transition-all duration-300 font-black text-[9px] md:text-[10px] uppercase tracking-widest ${favorites.includes(slug) ? 'bg-red-600 border-red-600 text-white' : 'bg-gray-100 border-gray-200 text-gray-950 hover:bg-black hover:text-white'}`}
          >
            <svg className={`w-3 h-3 md:w-4 md:h-4 ${favorites.includes(slug) ? 'fill-white' : 'fill-none'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {favorites.includes(slug) ? 'In Moodboard' : 'Add to Moodboard'}
          </button>
        </div>

        {/* IMAGE VIEWER */}
        <div className="relative w-full aspect-[4/3] md:aspect-video lg:h-[75vh] overflow-hidden bg-gray-50 group">
          <Image src={images[mainImageIndex]} alt={getSeoAlt(mainImageIndex)} fill className="object-cover" priority />
          
          <div className="absolute inset-y-0 left-0 flex items-center z-20">
            <button onClick={() => navGallery('prev')} className="w-10 h-10 md:w-14 md:h-20 bg-white/90 text-black hover:bg-red-600 hover:text-white transition-all text-xl flex items-center justify-center">‹</button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center z-20">
            <button onClick={() => navGallery('next')} className="w-10 h-10 md:w-14 md:h-20 bg-white/90 text-black hover:bg-red-600 hover:text-white transition-all text-xl flex items-center justify-center">›</button>
          </div>

          {/* SHARE BUTTON: FIXED BOTTOM RIGHT */}
          <div className="absolute bottom-6 right-6 z-40">
            <ShareButton title={project.title} />
          </div>
        </div>

        {/* THUMBNAILS */}
        <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide pb-2 border-b border-gray-100">
           {images.map((img: string, i: number) => (
             <button key={i} onClick={() => setMainImageIndex(i)} className={`relative flex-shrink-0 w-20 h-14 md:w-28 md:h-18 transition-all ${i === mainImageIndex ? 'opacity-100 ring-2 ring-red-600' : 'opacity-30'}`}>
               <Image src={img} alt="Detail" fill className="object-cover" />
             </button>
           ))}
        </div>
      </section>

      {/* REST OF CONTENT (Details, Similar Projects, etc.) */}
      <section className="py-16 px-6 md:px-10 max-w-[1600px] mx-auto w-full flex-grow">
        <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-gray-950">{project.title}</h1>
        <p className="text-lg text-gray-600 mt-8 max-w-4xl leading-relaxed">{project.description}</p>
      </section>

      <Footer />
    </div>
  );
}