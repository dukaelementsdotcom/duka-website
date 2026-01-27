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

  const nextImage = () => {
    setMainImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setMainImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main className="pt-28 md:pt-40 px-4 md:px-10 max-w-[1600px] mx-auto">
        
        {/* TOP HEADER NAVIGATION - FLEX PREVENTS OVERLAP */}
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
            <span className="hidden sm:inline">{favorites.includes(slug) ? 'Saved to Board' : 'Save for Inspiration'}</span>
            <span className="sm:hidden">{favorites.includes(slug) ? 'Saved' : 'Save'}</span>
          </button>
        </div>

        {/* MAIN IMAGE CONTAINER */}
        <div className="relative w-full aspect-[4/3] md:aspect-video lg:max-h-[70vh] bg-gray-50 shadow-2xl overflow-hidden group">
          <Image 
            src={images[mainImageIndex]} 
            alt={project.title} 
            fill 
            className="object-cover transition-transform duration-700" 
            priority 
          />
          
          {/* Gallery Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-0 inset-y-0 w-12 md:w-20 bg-black/10 hover:bg-white/90 text-white hover:text-black transition-all z-20 flex items-center justify-center text-2xl"
              >
                ‹
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-0 inset-y-0 w-12 md:w-20 bg-black/10 hover:bg-white/90 text-white hover:text-black transition-all z-20 flex items-center justify-center text-2xl"
              >
                ›
              </button>
            </>
          )}

          {/* Share Button - Positioned with enough gutter for upward menu */}
          <div className="absolute bottom-8 right-8 z-50">
            <ShareButton title={project.title} />
          </div>
        </div>

        {/* THUMBNAIL TRACK */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto pb-4 scrollbar-hide">
            {images.map((img: string, idx: number) => (
              <button 
                key={idx} 
                onClick={() => setMainImageIndex(idx)}
                className={`relative w-20 h-14 md:w-32 md:h-20 flex-shrink-0 border-2 transition-all ${
                  idx === mainImageIndex ? 'border-red-600 opacity-100' : 'border-transparent opacity-40'
                }`}
              >
                <Image src={img} alt="thumbnail" fill className="object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* DESCRIPTION SECTION */}
        <div className="py-16 md:py-24 border-t border-gray-100 mt-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[2px] w-12 bg-red-600"></div>
            <span className="text-red-600 font-black text-[10px] tracking-[0.4em] uppercase">{project.type}</span>
          </div>
          <h1 className="text-5xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] text-gray-950 mb-10">
            {project.title}
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-4xl">
                {project.description}
              </p>
            </div>
            <div className="bg-gray-50 p-8 space-y-6">
               <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Location</p>
                 <p className="font-bold uppercase text-gray-950">{project.location || 'Addis Ababa, Ethiopia'}</p>
               </div>
               <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Category</p>
                 <p className="font-bold uppercase text-gray-950">{project.type}</p>
               </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}