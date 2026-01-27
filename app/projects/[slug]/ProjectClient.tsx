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
    const updated = favorites.includes(slug) 
      ? favorites.filter(id => id !== slug) 
      : [...favorites, slug];
    setFavorites(updated);
    localStorage.setItem('duka_moodboard', JSON.stringify(updated));
  };

  const images = project.images || [project.image];

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main className="pt-28 md:pt-40 px-4 md:px-10 max-w-[1600px] mx-auto">
        
        {/* TOP HEADER NAVIGATION - NO OVERLAP */}
        <div className="flex flex-row justify-between items-center gap-4 mb-8">
          <Link href="/projects" className="bg-white border border-gray-200 px-4 py-3 md:px-8 text-[9px] md:text-[10px] font-black tracking-widest uppercase hover:bg-black hover:text-white transition-all shadow-sm shrink-0">
            ← ALL PROJECTS
          </Link>
          
          <button 
            onClick={toggleFavorite}
            className={`flex items-center gap-2 md:gap-3 px-5 py-3 md:px-8 rounded-full border font-black text-[9px] md:text-[10px] tracking-widest uppercase transition-all shrink-0 ${
              favorites.includes(slug) 
                ? 'bg-red-600 border-red-600 text-white' 
                : 'bg-gray-50 border-gray-100 text-gray-950 hover:bg-black hover:text-white'
            }`}
          >
            <i className={`fas fa-heart ${favorites.includes(slug) ? 'text-white' : 'text-red-600'}`}></i>
            {favorites.includes(slug) ? 'Saved' : 'Save for Inspiration'}
          </button>
        </div>

        {/* MAIN IMAGE CONTAINER */}
        <div className="relative w-full aspect-[4/3] md:aspect-video lg:max-h-[75vh] bg-gray-50 shadow-2xl overflow-hidden group">
          <Image 
            src={images[mainImageIndex]} 
            alt={project.title} 
            fill 
            className="object-cover transition-transform duration-700" 
            priority 
          />
          
          {/* SHARE BUTTON: BOTTOM RIGHT */}
          <div className="absolute bottom-6 right-6 z-40">
            <ShareButton title={project.title} />
          </div>
        </div>

        {/* PROJECT DETAILS BAR - RESTORED */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-b border-gray-100">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Location</p>
            <p className="text-sm font-bold uppercase text-gray-950">{project.location || 'Addis Ababa'}</p>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Client</p>
            <p className="text-sm font-bold uppercase text-gray-950">{project.client || 'Private Client'}</p>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Category</p>
            <p className="text-sm font-bold uppercase text-gray-950">{project.type}</p>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Year</p>
            <p className="text-sm font-bold uppercase text-gray-950">{project.year || '2024'}</p>
          </div>
        </div>

        {/* DESCRIPTION SECTION */}
        <div className="py-12 md:py-20">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-gray-950 mb-10">
            {project.title}
          </h1>
          <div className="max-w-4xl">
            <p className="text-gray-500 text-lg md:text-xl leading-relaxed italic border-l-4 border-red-600 pl-6 mb-8">
              Transforming spaces into functional works of art.
            </p>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}