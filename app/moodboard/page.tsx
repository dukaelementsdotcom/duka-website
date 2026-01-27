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
      });
  }, []);

  const removeItem = (slug) => {
    const updated = favoriteProjects.filter(p => p.slug !== slug);
    setFavoriteProjects(updated);
    const updatedSlugs = updated.map(p => p.slug);
    localStorage.setItem('duka_moodboard', JSON.stringify(updatedSlugs));
  };

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center font-black text-[10px] uppercase">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-red-600">
      <NavBar />
      <main className="flex-grow pt-32 md:pt-48 px-4 md:px-20 pb-20">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none text-gray-950">My Moodboard</h1>
          </div>

          {favoriteProjects.length === 0 ? (
            <div className="py-24 text-center border-2 border-dashed border-gray-100 uppercase text-[10px] font-black tracking-widest">
              Empty Board - <Link href="/projects" className="text-red-600 underline">Explore Projects</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteProjects.map((project) => (
                <div key={project.slug} className="relative group aspect-square bg-gray-50 overflow-hidden">
                  <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  
                  <div className="absolute top-4 right-4 z-20">
                    <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg">
                      <i className="fas fa-heart text-xs"></i>
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-4 z-30">
                    <ShareButton title={project.title} />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300">
                    <h3 className="text-white text-lg font-black uppercase tracking-tighter mb-2">{project.title}</h3>
                    <button onClick={() => removeItem(project.slug)} className="text-red-500 text-[10px] font-black uppercase tracking-widest self-start border-b border-red-500 pb-1">Remove Item</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}