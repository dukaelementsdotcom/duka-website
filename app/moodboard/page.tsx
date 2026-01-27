'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ShareButton from '../components/ShareButton';

export default function MoodboardPage() {
  const [favoriteProjects, setFavoriteProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/projects.json')
      .then(res => res.json())
      .then(allData => {
        const savedSlugs = JSON.parse(localStorage.getItem('duka_moodboard') || '[]');
        const filtered = allData.filter(p => savedSlugs.includes(p.slug));
        setFavoriteProjects(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // ✅ FIXED: Functional state update + localStorage sync
  const toggleFavorite = (slug: string) => {
    setFavoriteProjects(prev => {
      const updated = prev.filter(p => p.slug !== slug);
      const updatedSlugs = updated.map(p => p.slug);
      localStorage.setItem('duka_moodboard', JSON.stringify(updatedSlugs));
      return updated;
    });
  };

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center font-black text-[10px] uppercase">
      Loading Moodboard...
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-red-600">
      <NavBar />
      <main className="flex-grow pt-32 md:pt-48 px-4 md:px-20 pb-20">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none text-gray-950">
              My Moodboard
            </h1>
          </div>

          {favoriteProjects.length === 0 ? (
            // ✅ ENHANCED EMPTY STATE
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-12 text-center">
              <div className="w-16 h-16 mb-8 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-full h-full text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-gray-800 mb-4">
                Your board is empty
              </h2>
              <p className="text-gray-500 max-w-md mb-8 text-base">
                Start curating your inspiration by saving projects you love. Your moodboard travels with you across devices.
              </p>
              <Link 
                href="/projects" 
                className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-gray-900 transition-colors shadow-lg"
              >
                <i className="fas fa-arrow-left text-xs"></i>
                Explore Projects
              </Link>
              <p className="mt-12 text-[10px] font-black uppercase tracking-widest text-gray-400">
                Tip: Click the ❤️ heart icon on any project to save it here
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteProjects.map((project) => (
                <div key={project.slug} className="relative group aspect-square bg-gray-50 overflow-hidden">
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  
                  {/* ✅ HEART TOGGLE BUTTON - CONSISTENT WITH PROJECTS PAGE */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavorite(project.slug);
                    }}
                    className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center bg-black/20 backdrop-blur-md rounded-full text-white z-20 hover:bg-red-600 transition-colors"
                    aria-label="Remove from moodboard"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>

                  <div className="absolute bottom-4 right-4 z-30">
                    <ShareButton title={project.title} />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="text-white text-lg font-black uppercase tracking-tighter mb-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFavorite(project.slug);
                        }}
                        className="flex items-center gap-2 text-red-500 text-[10px] font-black uppercase tracking-widest border-b border-red-500 pb-1 hover:text-red-600 transition-colors"
                      >
                        <i className="fas fa-heart text-[11px]"></i>
                        Remove from board
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      
      {/* ✅ FLOATING EMPTY STATE HINT (when board empty but user scrolled) */}
      {favoriteProjects.length === 0 && (
        <div className="fixed bottom-6 left-0 right-0 z-[999] flex justify-center px-4 pointer-events-none">
          <div className="pointer-events-auto bg-black/90 text-white px-6 py-3 rounded-full text-[9px] font-black uppercase tracking-widest backdrop-blur-sm">
            ❤️ Tap the heart on any project to start your moodboard
          </div>
        </div>
      )}
    </div>
  );
}