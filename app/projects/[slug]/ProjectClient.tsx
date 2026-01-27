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

  const nextImage = () => setMainImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setMainImageIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main className="pt-28 md:pt-40 px-4 md:px-10 max-w-[1600px] mx-auto">
        
        {/* TOP HEADER NAVIGATION */}
        <div className="flex flex-row justify-between items-center gap-4 mb-8">
          <Link href="/projects" className="bg-white border border-gray-200 px-4 py-3 md:px-8 text-[9px] md:text-[10px] font-black tracking-widest uppercase hover:bg-black hover:text-white transition-all shadow-sm shrink-0">
            ← ALL PROJECTS
          </Link>
          
          <button 
            onClick={toggleFavorite}
            className={`flex items-center gap-2 md:gap-3 px-5 py-3 md:px-8 rounded-full border font-black text-[9px] md:text-[10px] tracking-widest uppercase transition-all shrink-0 ${
              favorites.includes(slug) ? 'bg-red-600 border-red-600 text-white' : 'bg-gray-50 border-gray-100 text-gray-950 hover:bg-black hover:text-white'
            }`}
          >
            <i className={`fas fa-heart ${favorites.includes(slug) ? 'text-white' : 'text-red-600'}`}></i>
            {favorites.includes(slug) ? 'Saved to Board' : 'Save for Inspiration'}
          </button>
        </div>

        {/* MAIN IMAGE CONTAINER WITH ARROWS */}
        <div className="relative w-full aspect-[4/3] md:aspect-video lg:max-h-[75vh] bg-gray-50 shadow-2xl overflow-hidden group">
          <Image 
            src={images[mainImageIndex]} 
            alt={project.title} 
            fill 
            className="object-cover transition-transform duration-700" 
            priority 
          />
          
          {/* Gallery Arrows */}
          {images.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-0 inset-y-0 w-12 md:w-20 bg-black/5 hover:bg-white/90 text-transparent hover:text-black transition-all z-20 flex items-center justify-center text-3xl font-light">‹</button>
              <button onClick={nextImage} className="absolute right-0 inset-y-0 w-12 md:w-20 bg-black/5 hover:bg-white/90 text-transparent hover:text-black transition-all z-20 flex items-center justify-center text-3xl font-light">›</button>
            </>
          )}

          {/* SHARE BUTTON: BOTTOM RIGHT */}
          <div className="absolute bottom-6 right-6 z-40">
            <ShareButton title={project.title} />
          </div>
        </div>

        {/* THUMBNAIL TRACK - RESTORED */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto pb-4 scrollbar-hide">
            {images.map((img: string, idx: number) => (
              <button 
                key={idx} 
                onClick={() => setMainImageIndex(idx)}
                className={`relative w-20 h-14 md:w-28 md:h-20 flex-shrink-0 border-2 transition-all ${
                  idx === mainImageIndex ? 'border-red-600 opacity-100' : 'border-transparent opacity-40 hover:opacity-100'
                }`}
              >
                <Image src={img} alt="thumbnail" fill className="object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* PROJECT DETAILS BAR - RESTORED */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-b border-gray-100 mt-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Location</p>
            <p className="text-sm font-bold uppercase text-gray-950">{project.location}</p>
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
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-gray-950 mb-10 italic">
            {project.title}
          </h1>
          <div className="max-w-4xl">
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