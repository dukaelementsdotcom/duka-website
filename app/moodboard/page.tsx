'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ShareButton from '../components/ShareButton';
import ProtectedImage from '../components/ProtectedImage';

export default function MoodboardPage() {
  const [favoriteProjects, setFavoriteProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = () => {
    fetch('/data/projects.json')
      .then((res) => res.json())
      .then((allData) => {
        const savedSlugs = JSON.parse(localStorage.getItem('duka_moodboard') || '[]');
        const filtered = allData.filter((p: any) => savedSlugs.includes(p.slug));
        setFavoriteProjects(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const toggleFavorite = (slug: string) => {
    const savedSlugs = JSON.parse(localStorage.getItem('duka_moodboard') || '[]');
    const updatedSlugs = savedSlugs.filter((s: string) => s !== slug);
    localStorage.setItem('duka_moodboard', JSON.stringify(updatedSlugs));
    setFavoriteProjects((prev) => prev.filter((p) => p.slug !== slug));

    // Optional visual feedback
    const button = document.activeElement as HTMLElement;
    if (button) {
      button.classList.add('animate-pulse');
      setTimeout(() => button.classList.remove('animate-pulse'), 300);
    }
  };

  const clearAllFavorites = () => {
    if (confirm('Are you sure you want to clear your entire moodboard?')) {
      localStorage.removeItem('duka_moodboard');
      setFavoriteProjects([]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center font-black text-[10px] uppercase">
        Loading Moodboard...
      </div>
    );
  }

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://dukainteriors.com';

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-red-600">
      <NavBar />
      <main className="flex-grow pt-32 md:pt-48 px-4 md:px-20 pb-20">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none text-gray-950">
                My Moodboard
              </h1>
              {favoriteProjects.length > 0 && (
                <p className="mt-4 text-gray-600 font-medium">
                  {favoriteProjects.length}{' '}
                  {favoriteProjects.length === 1 ? 'project' : 'projects'} saved
                </p>
              )}
            </div>

            {favoriteProjects.length > 0 && (
              <button
                onClick={clearAllFavorites}
                className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-red-50 hover:text-red-600 transition-all"
                aria-label="Clear all favorites"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Clear All
              </button>
            )}
          </div>

          {favoriteProjects.length === 0 ? (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-12 text-center">
              <div className="w-16 h-16 mb-8 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-full h-full text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
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
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Explore Projects
              </Link>
              <p className="mt-12 text-[10px] font-black uppercase tracking-widest text-gray-400">
                Tip: Click the ❤️ heart icon on any project to save it here
              </p>
            </div>
          ) : (
            <>
              {/* Mobile Clear All */}
              <div className="md:hidden mb-6">
                <button
                  onClick={clearAllFavorites}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-red-50 hover:text-red-600 transition-all"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Clear All ({favoriteProjects.length})
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteProjects.map((project: any) => (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className="relative group bg-gray-50 overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 block"
                  >
                    {/* Image */}
                    <div className="aspect-square relative overflow-hidden">
                      <ProtectedImage
                        src={project.image}
                        alt={project.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Top Controls: Remove + Share */}
                      <div className="absolute inset-0 p-4 flex justify-between items-start z-20 pointer-events-none">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleFavorite(project.slug);
                          }}
                          className="w-10 h-10 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-red-600 hover:scale-110 transition-all duration-200 pointer-events-auto"
                          aria-label="Remove from moodboard"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                        </button>

                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
                          <ShareButton
                            title={project.title}
                            url={`${origin}/projects/${project.slug}`}
                          />
                        </div>
                      </div>

                      {/* Hover Info Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6 pointer-events-none">
                        <h3 className="text-white text-xl font-black uppercase tracking-tighter mb-2">
                          {project.title}
                        </h3>
                        {project.category && (
                          <p className="text-gray-300 text-sm font-medium mb-3">
                            {project.category}
                          </p>
                        )}
                        <div className="flex items-center justify-between pointer-events-auto">
                          <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest">
                            View Details
                          </span>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleFavorite(project.slug);
                            }}
                            className="flex items-center gap-2 text-red-400 text-[10px] font-black uppercase tracking-widest border-b border-red-400 pb-1 hover:text-red-300 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Info */}
                    <div className="p-4 md:hidden">
                      <h3 className="text-gray-900 font-black uppercase tracking-tighter text-lg">
                        {project.title}
                      </h3>
                      {project.category && (
                        <p className="text-gray-600 text-sm mt-1">{project.category}</p>
                      )}
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-gray-900 text-[10px] font-black uppercase tracking-widest">
                          View Details
                        </span>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleFavorite(project.slug);
                          }}
                          className="text-red-500 text-[10px] font-black uppercase tracking-widest"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />

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