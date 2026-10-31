'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ProtectedImage from '../components/ProtectedImage';

export default function MoodboardPage() {
  const [favoriteProjects, setFavoriteProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/data/projects.json')
      .then((res) => res.json())
      .then((allData) => {
        try {
          const savedSlugs = JSON.parse(localStorage.getItem('duka_moodboard') || '[]');
          const filtered = allData.filter((p: any) => savedSlugs.includes(p.slug));
          setFavoriteProjects(filtered);
        } catch {}
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const removeProject = (slug: string) => {
    try {
      const savedSlugs = JSON.parse(localStorage.getItem('duka_moodboard') || '[]');
      const updatedSlugs = savedSlugs.filter((s: string) => s !== slug);
      localStorage.setItem('duka_moodboard', JSON.stringify(updatedSlugs));
    } catch {}
    setFavoriteProjects((prev) => prev.filter((p) => p.slug !== slug));
  };

  const clearAll = () => {
    if (favoriteProjects.length === 0) return;
    if (confirm(`Remove all ${favoriteProjects.length} projects from your moodboard?`)) {
      try { localStorage.removeItem('duka_moodboard'); } catch {}
      setFavoriteProjects([]);
    }
  };

  const sendViaWhatsApp = () => {
    if (favoriteProjects.length === 0) return;
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://dukainteriors.com';
    const projectLinks = favoriteProjects
      .map((p) => `• ${p.title}: ${origin}/projects/${p.slug}/`)
      .join('\n');

    const message = encodeURIComponent(
      `Hi Duka Interiors,\n\nI'm interested in a project inspired by these ${favoriteProjects.length} designs:\n\n${projectLinks}\n\nPlease contact me to discuss.`
    );
    window.open(`https://wa.me/251940607055?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NavBar />

      <main className="flex-grow pt-28 md:pt-36 px-4 md:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-gray-900">
                My Moodboard
              </h1>
              {favoriteProjects.length > 0 && (
                <p className="text-gray-500 mt-1">
                  {favoriteProjects.length} saved {favoriteProjects.length === 1 ? 'project' : 'projects'}
                </p>
              )}
            </div>

            {favoriteProjects.length > 0 && (
              <button
                onClick={clearAll}
                className="text-gray-500 hover:text-red-600 text-sm font-medium transition-colors"
              >
                Clear all
              </button>
            )}
          </div>

          {favoriteProjects.length === 0 ? (
            /* Empty State */
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">No saved projects yet</h2>
              <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                Tap the heart icon on any project to save it here. Then send your favourites to our team.
              </p>
              <Link
                href="/projects/"
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-gray-800 transition-colors"
              >
                Browse projects
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </Link>
            </div>
          ) : (
            <>
              {/* Project Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {favoriteProjects.map((project: any) => (
                  <div key={project.slug} className="group relative">
                    <Link
                      href={`/projects/${project.slug}/`}
                      className="block aspect-square relative overflow-hidden bg-gray-100 rounded-lg"
                    >
                      <ProtectedImage
                        src={project.image}
                        alt={project.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-3 left-3 right-3">
                          <p className="text-white text-sm font-bold truncate">{project.title}</p>
                          <p className="text-white/70 text-xs">{project.type}</p>
                        </div>
                      </div>
                    </Link>

                    {/* Remove button */}
                    <button
                      onClick={() => removeProject(project.slug)}
                      className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-red-600 hover:bg-white transition-all shadow-sm"
                      aria-label={`Remove ${project.title}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                ))}

                {/* Add more card */}
                <Link
                  href="/projects/"
                  className="aspect-square border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  <span className="text-xs font-medium">Add more</span>
                </Link>
              </div>

              {/* Send CTA */}
              <div className="mt-10 bg-gray-50 rounded-xl p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Ready to discuss your project?</h3>
                    <p className="text-gray-600 text-sm">
                      Send these {favoriteProjects.length} inspirations to our design team via WhatsApp.
                    </p>
                  </div>
                  <button
                    onClick={sendViaWhatsApp}
                    className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl font-bold text-sm transition-colors shrink-0"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.199.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.226 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.491h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Send via WhatsApp
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
