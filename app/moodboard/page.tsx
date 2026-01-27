'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

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

  const telegramMessage = encodeURIComponent(
    `Hi Duka Interiors! I have created a moodboard on your website. I am interested in these styles: ${favoriteProjects.map(p => p.title).join(', ')}`
  );

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center font-black text-[10px] uppercase">Loading Moodboard...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-red-600">
      <NavBar />
      <main className="flex-grow pt-32 md:pt-48 px-4 md:px-20 pb-20">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-12 md:mb-16">
            <span className="text-red-600 font-black text-[10px] tracking-[0.5em] uppercase mb-4 block">Personal Curation</span>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none text-gray-950">My Moodboard</h1>
          </div>

          {favoriteProjects.length === 0 ? (
            <div className="py-20 text-center border-2 border-dashed border-gray-100">
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-8">Your moodboard is empty</p>
              <Link href="/projects" className="bg-black text-white px-10 py-4 font-black text-[10px] tracking-widest uppercase hover:bg-red-600 transition-all">Go explore projects</Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {favoriteProjects.map((project) => (
                  <div key={project.slug} className="relative group aspect-square bg-gray-50 overflow-hidden">
                    <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all">
                      <h3 className="text-white text-lg md:text-xl font-black uppercase tracking-tighter mb-4">{project.title}</h3>
                      <button 
                        onClick={() => removeItem(project.slug)}
                        className="text-red-500 text-[9px] font-black uppercase tracking-widest self-start border-b border-red-500 pb-1"
                      >
                        Remove from board
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 md:mt-20 p-8 md:p-16 bg-gray-950 text-center rounded-none shadow-2xl">
                <h2 className="text-white text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4 italic">Build your vision</h2>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-10 max-w-md mx-auto">Send this curated list to our design team in Addis Ababa for a free consultation.</p>
                <a 
                  href={`https://t.me/dukainteriorsplc?text=${telegramMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-red-600 text-white px-8 md:px-12 py-5 md:py-6 font-black tracking-[0.3em] uppercase text-[10px] hover:bg-white hover:text-black transition-all"
                >
                  Send to Telegram →
                </a>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}