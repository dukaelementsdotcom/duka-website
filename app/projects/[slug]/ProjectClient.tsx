'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NavBar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';
import ShareButton from '@/app/components/ShareButton';

export default function ProjectClient({ project, slug }: any) {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('duka_moodboard');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const toggleFavorite = () => {
    const updated = favorites.includes(slug) ? favorites.filter(id => id !== slug) : [...favorites, slug];
    setFavorites(updated);
    localStorage.setItem('duka_moodboard', JSON.stringify(updated));
  };

  const images = project.images || [project.image];

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main className="pt-28 md:pt-40 px-4 md:px-10 max-w-[1600px] mx-auto">
        
        {/* 1. NAVIGATION HEADER (PREVENTS OVERLAP) */}
        <div className="flex flex-row justify-between items-center gap-4 mb-8">
          <Link href="/projects" className="bg-white border border-gray-200 px-4 py-3 text-[10px] font-black tracking-widest uppercase hover:bg-black hover:text-white transition-all shadow-sm shrink-0">
            ← ALL PROJECTS
          </Link>
          
          <button 
            onClick={toggleFavorite}
            className={`flex items-center gap-3 px-6 py-3 rounded-full border font-black text-[10px] tracking-widest uppercase transition-all shrink-0 ${
              favorites.includes(slug) ? 'bg-red-600 border-red-600 text-white' : 'bg-gray-50 border-gray-100 text-gray-950 hover:bg-black hover:text-white'
            }`}
          >
            <i className={`fas fa-heart ${favorites.includes(slug) ? 'text-white' : 'text-red-600'}`}></i>
            {favorites.includes(slug) ? 'Saved' : 'Save for Inspiration'}
          </button>
        </div>

        {/* 2. MAIN IMAGE CONTAINER */}
        <div className="relative w-full aspect-[4/3] md:aspect-video lg:max-h-[70vh] bg-gray-50 shadow-2xl overflow-hidden group">
          <Image src={images[mainImageIndex]} alt={project.title} fill className="object-cover" priority />
          
          {/* SHARE BUTTON: BOTTOM RIGHT */}
          <div className="absolute bottom-6 right-6 z-40">
            <ShareButton title={project.title} />
          </div>
        </div>

        {/* 3. DESCRIPTION SECTION */}
        <div className="py-12 md:py-20">
          <span className="text-red-600 font-black text-[10px] tracking-[0.4em] uppercase mb-4 block">{project.type}</span>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-gray-950 mb-8">{project.title}</h1>
          <p className="text-gray-500 text-sm md:text-base max-w-3xl leading-relaxed">{project.description}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}