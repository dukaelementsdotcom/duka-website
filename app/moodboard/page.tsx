'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ShareButton from '../components/ShareButton';
import ProtectedImage from '../components/ProtectedImage';

export default function MoodboardPage() {
  const [favoriteProjects, setFavoriteProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [removedProject, setRemovedProject] = useState<string>('');
  const router = useRouter();

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

  // ✅ Undo removal functionality
  const undoRemove = (slug: string) => {
    const savedSlugs = JSON.parse(localStorage.getItem('duka_moodboard') || '[]');
    if (!savedSlugs.includes(slug)) {
      const updatedSlugs = [...savedSlugs, slug];
      localStorage.setItem('duka_moodboard', JSON.stringify(updatedSlugs));
      loadFavorites(); // Reload to reflect the undo
    }
    setShowSuccess(false);
  };

  const toggleFavorite = (slug: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    const projectTitle = favoriteProjects.find(p => p.slug === slug)?.title;
    setRemovedProject(projectTitle || '');
    
    const savedSlugs = JSON.parse(localStorage.getItem('duka_moodboard') || '[]');
    const updatedSlugs = savedSlugs.filter((s: string) => s !== slug);
    localStorage.setItem('duka_moodboard', JSON.stringify(updatedSlugs));
    setFavoriteProjects((prev) => prev.filter((p) => p.slug !== slug));

    // Show success message with undo option
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);

    // Visual feedback
    if (e?.currentTarget) {
      const button = e.currentTarget as HTMLElement;
      button.classList.add('animate-pulse');
      setTimeout(() => button.classList.remove('animate-pulse'), 300);
    }
  };

  const clearAllFavorites = () => {
    if (favoriteProjects.length === 0) return;
    
    if (confirm(`Are you sure you want to remove all ${favoriteProjects.length} projects from your moodboard?`)) {
      const originalCount = favoriteProjects.length;
      localStorage.removeItem('duka_moodboard');
      setFavoriteProjects([]);
      
      // Show toast for clearing all
      if (document) {
        const toast = document.createElement('div');
        toast.className = 'fixed top-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-xl z-[9999] flex items-center gap-3 animate-fade-in';
        toast.innerHTML = `
          <span>🗑️ Cleared ${originalCount} projects</span>
          <button onclick="this.parentElement.remove()" class="text-white/70 hover:text-white text-lg">&times;</button>
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
      }
    }
  };

  // ✅ Send moodboard via WhatsApp with official icon
  const sendMoodboardViaWhatsApp = () => {
    if (favoriteProjects.length === 0) return;

    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://dukainteriors.com';
    const projectLinks = favoriteProjects
      .map((p) => `• ${p.title}: ${origin}/projects/${p.slug}`)
      .join('\n');

    const message = encodeURIComponent(
      `🎨 *DUKA INTERIORS MOODBOARD*\n\nI've curated ${favoriteProjects.length} project${favoriteProjects.length === 1 ? '' : 's'} I love and would like to discuss a design inspired by these:\n\n${projectLinks}\n\n📋 *My Details:*\n• Name: ________\n• Project Type: ________\n• Budget Range: ________\n• Timeline: ________\n\nPlease contact me to start a conversation!`
    );

    const whatsappUrl = `https://wa.me/251940607055?text=${message}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
    // Track WhatsApp CTA click
    if (window.gtag) {
      window.gtag('event', 'whatsapp_cta_click', {
        event_category: 'Moodboard',
        event_label: `${favoriteProjects.length}_projects`,
        value: favoriteProjects.length
      });
    }
  };

  // ✅ Download moodboard as image (creative feature)
  const downloadMoodboardImage = async () => {
    // This would require html2canvas library
    // For now, we'll show a message about the feature
    alert('Coming soon! This feature will allow you to download your moodboard as a beautiful collage image.');
  };

  // ✅ Share moodboard link (creative feature)
  const shareMoodboardLink = () => {
    const moodboardData = {
      projects: favoriteProjects.map(p => p.slug),
      timestamp: new Date().toISOString()
    };
    
    // Create a shareable link (in production, this would be a server endpoint)
    const encoded = btoa(JSON.stringify(moodboardData));
    const shareUrl = `${window.location.origin}/share/moodboard?data=${encoded}`;
    
    if (navigator.share && navigator.canShare) {
      navigator.share({
        title: 'My Duka Interiors Moodboard',
        text: `Check out my interior design inspiration board with ${favoriteProjects.length} projects from Duka Interiors`,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Moodboard link copied to clipboard! Share it with friends or your designer.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center font-black text-[10px] uppercase">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          <div>Loading Moodboard...</div>
        </div>
      </div>
    );
  }

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://dukainteriors.com';

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-red-600">
      <NavBar />
      
      {/* ✅ Success Toast */}
      {showSuccess && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-xl z-[9999] flex items-center gap-4 animate-fade-in">
          <span>✓ Removed "{removedProject}"</span>
          <button 
            onClick={() => undoRemove(favoriteProjects.find(p => p.title === removedProject)?.slug || '')}
            className="text-red-400 hover:text-red-300 text-sm font-medium underline"
          >
            Undo
          </button>
          <button 
            onClick={() => setShowSuccess(false)}
            className="text-white/70 hover:text-white text-lg"
          >
            &times;
          </button>
        </div>
      )}

      <main className="flex-grow pt-32 md:pt-48 px-4 md:px-20 pb-20">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none text-gray-950">
                    My Moodboard
                  </h1>
                  {favoriteProjects.length > 0 && (
                    <p className="mt-4 text-gray-600 font-medium">
                      {favoriteProjects.length} curated {favoriteProjects.length === 1 ? 'inspiration' : 'inspirations'}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Quick Stats */}
              {favoriteProjects.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-6">
                  <div className="px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-xs font-bold uppercase tracking-widest">
                    {favoriteProjects.length} {favoriteProjects.length === 1 ? 'Project' : 'Projects'}
                  </div>
                  {Array.from(new Set(favoriteProjects.map(p => p.category))).slice(0, 3).map(category => (
                    <div key={category} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-bold uppercase tracking-widest">
                      {category}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {favoriteProjects.length > 0 && (
                <>
                  <button
                    onClick={clearAllFavorites}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-red-50 hover:text-red-600 transition-all"
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
                  
                  <button
                    onClick={shareMoodboardLink}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-gray-800 transition-all"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share Board
                  </button>
                </>
              )}
            </div>
          </div>

          {favoriteProjects.length === 0 ? (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
              <div className="relative w-32 h-32 mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-pink-100 rounded-full animate-pulse"></div>
                <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-16 h-16 text-red-400"
                    fill="currentColor"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-gray-800 mb-4">
                Your Inspiration Board Awaits
              </h2>
              <p className="text-gray-500 max-w-md mb-8 text-base">
                Collect your favorite interior design projects. Create visual stories. Share with our designers.
              </p>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-3 bg-black text-white px-10 py-5 rounded-full font-black text-[12px] uppercase tracking-widest hover:bg-gray-900 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02]"
              >
                <svg className="w-5 h-5 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Start Exploring Projects
              </Link>
              <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg">
                <div className="text-center">
                  <div className="w-8 h-8 mx-auto mb-2 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-black text-sm">1</span>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Browse</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 mx-auto mb-2 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-black text-sm">2</span>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Save</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 mx-auto mb-2 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-black text-sm">3</span>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Share</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Project Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {favoriteProjects.map((project: any, index: number) => (
                  <div
                    key={project.slug}
                    className="relative group bg-white overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div 
                      className="aspect-square relative overflow-hidden cursor-pointer"
                      onClick={() => router.push(`/projects/${project.slug}`)}
                    >
                      <ProtectedImage
                        src={project.image}
                        alt={project.title}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Floating Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <div className="px-3 py-1.5 bg-black/80 backdrop-blur-sm text-white text-[9px] font-black uppercase tracking-widest rounded-full">
                          #{index + 1}
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={(e) => toggleFavorite(project.slug, e)}
                        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full text-gray-900 hover:bg-red-600 hover:text-white transition-all duration-300 z-20 shadow-lg hover:scale-110"
                        aria-label="Remove from moodboard"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                        <h3 className="text-white text-2xl font-black uppercase tracking-tighter mb-2">
                          {project.title}
                        </h3>
                        {project.category && (
                          <p className="text-gray-300 text-sm font-medium mb-4">
                            {project.category}
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest">
                            Click to view details →
                          </span>
                          <div className="flex items-center gap-3">
                            <ShareButton
                              title={project.title}
                              url={`${origin}/projects/${project.slug}`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-gray-900 font-black uppercase tracking-tighter text-lg mb-1">
                            {project.title}
                          </h3>
                          {project.category && (
                            <p className="text-gray-600 text-sm">{project.category}</p>
                          )}
                        </div>
                        <button
                          onClick={(e) => toggleFavorite(project.slug, e)}
                          className="text-red-500 hover:text-red-600 text-[10px] font-black uppercase tracking-widest"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => router.push(`/projects/${project.slug}`)}
                          className="text-gray-900 text-[10px] font-black uppercase tracking-widest border-b border-gray-900 pb-1 hover:border-red-600 hover:text-red-600 transition-colors"
                        >
                          View Project Details
                        </button>
                        <span className="text-gray-400 text-[9px] font-bold uppercase tracking-widest">
                          Saved
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ✅ CTA SECTION WITH OFFICIAL WHATSAPP ICON */}
              <div className="mt-20 p-10 md:p-14 bg-gradient-to-br from-red-600 to-red-700 rounded-3xl text-center text-white shadow-2xl relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                  }}></div>
                </div>
                
                <div className="relative z-10">
                  {/* Official WhatsApp Icon */}
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl mb-8 border-2 border-white/20">
                    <svg className="w-14 h-14" viewBox="0 0 24 24" fill="white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.199.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.226 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.491h.004c-2.255-.001-4.498-.646-6.466-1.928-2.116-1.378-3.62-3.398-4.248-5.702C.675 11.192.553 8.82.947 6.503 1.38 3.959 2.948 1.78 5.336.646 7.724-.489 10.453-.53 12.862.117c2.409.646 4.456 2.03 5.884 4.002 1.429 1.971 2.169 4.396 2.104 6.842-.005.188-.016.376-.033.563l.004-.002-.002.004-.001.001c-.099 1.315-.566 2.553-1.332 3.562-.78 1.026-1.826 1.783-2.999 2.234-1.304.5-2.733.73-4.13.694z"/>
                    </svg>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-6">
                    Ready to Bring Your Vision to Life?
                  </h3>
                  
                  <p className="text-white/90 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
                    Send your curated collection of {favoriteProjects.length} project{favoriteProjects.length === 1 ? '' : 's'} directly to our design team. 
                    We'll review your inspiration and craft a personalized proposal just for you.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                      onClick={sendMoodboardViaWhatsApp}
                      className="group inline-flex items-center justify-center gap-4 bg-white text-red-600 px-12 py-6 rounded-full font-black text-[13px] uppercase tracking-widest transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-[1.02] active:scale-95"
                    >
                      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.199.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.226 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.491h.004c-2.255-.001-4.498-.646-6.466-1.928-2.116-1.378-3.62-3.398-4.248-5.702C.675 11.192.553 8.82.947 6.503 1.38 3.959 2.948 1.78 5.336.646 7.724-.489 10.453-.53 12.862.117c2.409.646 4.456 2.03 5.884 4.002 1.429 1.971 2.169 4.396 2.104 6.842-.005.188-.016.376-.033.563l.004-.002-.002.004-.001.001c-.099 1.315-.566 2.553-1.332 3.562-.78 1.026-1.826 1.783-2.999 2.234-1.304.5-2.733.73-4.13.694z"/>
                      </svg>
                      <span className="group-hover:translate-x-1 transition-transform">
                        Send to Design Team via WhatsApp
                      </span>
                      <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={downloadMoodboardImage}
                      className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white/30 text-white px-10 py-5 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-white/10 hover:border-white/50 transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download Moodboard
                    </button>
                  </div>
                  
                  <div className="mt-10 pt-8 border-t border-white/20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 mb-4 bg-white/10 rounded-full flex items-center justify-center">
                          <span className="text-white text-xl font-black">✓</span>
                        </div>
                        <p className="text-sm font-bold">24-Hour Response</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 mb-4 bg-white/10 rounded-full flex items-center justify-center">
                          <span className="text-white text-xl font-black">✓</span>
                        </div>
                        <p className="text-sm font-bold">Free Consultation</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 mb-4 bg-white/10 rounded-full flex items-center justify-center">
                          <span className="text-white text-xl font-black">✓</span>
                        </div>
                        <p className="text-sm font-bold">Personalized Quote</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Additional Tip */}
              <div className="mt-12 p-6 bg-gray-50 rounded-2xl text-center max-w-2xl mx-auto">
                <p className="text-gray-600 text-sm">
                  <span className="font-black text-red-600">PRO TIP:</span> Add more projects from different categories to give our designers a complete picture of your style preferences.
                </p>
                <Link 
                  href="/projects" 
                  className="inline-flex items-center gap-2 mt-4 text-gray-900 text-[10px] font-black uppercase tracking-widest border-b border-gray-900 pb-1 hover:text-red-600 hover:border-red-600 transition-colors"
                >
                  Continue Exploring Projects
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />

      {favoriteProjects.length === 0 && (
        <div className="fixed bottom-6 left-0 right-0 z-[999] flex justify-center px-4 pointer-events-none">
          <div className="pointer-events-auto bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-widest backdrop-blur-sm shadow-2xl animate-pulse">
            ❤️ Click the heart icon on any project to save it here
          </div>
        </div>
      )}
    </div>
  );
}