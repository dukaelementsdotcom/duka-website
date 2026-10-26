'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NavBar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';
import ShareButton from '@/app/components/ShareButton';
// IMPORT THE PROTECTED COMPONENT
import ProtectedImage from '@/app/components/ProtectedImage';

// Turn an image file name into readable alt text, e.g.
// ".../modern-board-room-habesha-breweries.webp" -> "Modern board room habesha breweries"
function altFromPath(src: string, fallback: string) {
  const name = decodeURIComponent(src.split('/').pop() || '')
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!name || /^(img|dsc|image|photo)?\s?\d+$/i.test(name)) return fallback;
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export default function ProjectClient({ project, slug }: any) {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('duka_moodboard');
      if (saved) setFavorites(JSON.parse(saved));
    } catch {}
  }, []);

  // ✅ FIXED: Functional state update to prevent stale array issues
  const toggleFavorite = () => {
    setFavorites(prev => {
      const updated = prev.includes(slug) 
        ? prev.filter(id => id !== slug) 
        : [...prev, slug];
      try { localStorage.setItem('duka_moodboard', JSON.stringify(updated)); } catch {}
      return updated;
    });
  };

  const images = project.images || [project.image];
  const nextImage = () => setMainImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setMainImageIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen bg-white selection:bg-red-600">
      <NavBar />
      <main className="pt-28 md:pt-40 px-4 md:px-10 max-w-[1600px] mx-auto">
        
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

        {/* MAIN IMAGE CONTAINER - PROTECTED */}
        <div className="relative w-full aspect-[4/3] md:aspect-video lg:max-h-[75vh] bg-gray-50 shadow-2xl overflow-hidden group">
          <ProtectedImage
            src={images[mainImageIndex]}
            alt={`${altFromPath(images[mainImageIndex], project.title)} – ${project.title}`}
            sizes="(max-width: 1600px) 100vw, 1600px"
            priority={mainImageIndex === 0}
          />
          
          {images.length > 1 && (
            <>
              <button onClick={prevImage} aria-label="Previous photo" className="absolute left-0 inset-y-0 w-12 md:w-20 bg-black/5 hover:bg-white/90 text-transparent hover:text-black transition-all z-20 flex items-center justify-center text-3xl font-light">‹</button>
              <button onClick={nextImage} aria-label="Next photo" className="absolute right-0 inset-y-0 w-12 md:w-20 bg-black/5 hover:bg-white/90 text-transparent hover:text-black transition-all z-20 flex items-center justify-center text-3xl font-light">›</button>
            </>
          )}

          <div className="absolute bottom-6 right-6 z-40">
            <ShareButton title={project.title} url={`https://www.dukainteriors.com/projects/${slug}/`} />
          </div>
        </div>

        {/* THUMBNAIL TRACK - PROTECTED */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto pb-4 scrollbar-hide">
            {images.map((img: string, idx: number) => (
              <button 
                key={idx} 
                onClick={() => setMainImageIndex(idx)}
                aria-label={`Show photo ${idx + 1} of ${images.length}`}
                className={`relative w-20 h-14 md:w-28 md:h-20 flex-shrink-0 border-2 transition-all ${
                  idx === mainImageIndex ? 'border-red-600 opacity-100' : 'border-transparent opacity-40 hover:opacity-100'
                }`}
              >
                <ProtectedImage src={img} alt={altFromPath(img, `${project.title} photo ${idx + 1}`)} sizes="112px" />
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 py-10 border-b border-gray-100 mt-8">
          {[
            ['Client', project.client || 'Private client'],
            ['Location', project.location?.replace(/,(?=\S)/g, ', ')],
            ['Category', project.type],
            ['Area', project.area && project.area !== 'N/A' ? project.area : null],
            ['Scope', project.scope],
            ['Timeline', project.timeline],
            ['Style', project.style],
            ['Year', project.year],
          ]
            .filter(([, value]) => value)
            .map(([label, value]) => (
              <div key={label as string}>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">{label}</p>
                <p className="text-sm font-bold uppercase text-gray-950">{value}</p>
              </div>
            ))}
        </div>

        <div className="py-12 md:py-20">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-gray-950 mb-10 italic">
            {project.title}
          </h1>
          <div className="max-w-4xl">
            <p className="text-gray-600 text-base md:text-lg leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>
          {(project.challenge || project.result) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mt-14 max-w-5xl">
              {[
                ['The challenge', project.challenge],
                ['The result', project.result],
              ]
                .filter(([, text]) => text)
                .map(([heading, text]) => (
                  <div key={heading} className="border-t-2 border-gray-950 pt-6">
                    <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-red-600 mb-4">{heading}</h2>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed whitespace-pre-line">{text}</p>
                  </div>
                ))}
            </div>
          )}
        </div>

        <section className="mb-20 bg-gray-950 text-white px-6 py-12 md:px-16 md:py-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <p className="text-red-500 text-[10px] font-black uppercase tracking-[0.3em] mb-3">Next step</p>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-none">
              Planning a similar {String(project.type || 'interior').toLowerCase()} space?
            </h2>
            <p className="text-gray-400 mt-3 text-sm max-w-xl">
              Tell us your floor area and timeline, and we&apos;ll send a design and an itemised proposal.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/contact/"
              className="bg-red-600 hover:bg-white hover:text-black text-white font-black py-4 px-8 text-[11px] uppercase tracking-widest text-center transition-colors"
            >
              Get a quote
            </Link>
            <a
              href={`https://wa.me/251940607055?text=${encodeURIComponent(`Hello Duka Interiors, I saw the "${project.title}" project and I'd like a quote for a similar space.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/30 hover:bg-white hover:text-black font-black py-4 px-8 text-[11px] uppercase tracking-widest text-center transition-colors"
            >
              WhatsApp us
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* ✅ FIXED: MOVED OUTSIDE <main> AND AFTER FOOTER - TRUE FIXED POSITIONING */}
      {favorites.length > 0 && (
        <div className="fixed bottom-6 left-0 right-0 z-[1000] flex justify-center pointer-events-none px-4">
          <Link 
            href="/moodboard" 
            className="pointer-events-auto bg-black text-white px-8 py-4 rounded-full flex items-center gap-4 shadow-2xl hover:scale-105 transition-all"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Open My Moodboard</span>
            <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black">
              {favorites.length}
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}