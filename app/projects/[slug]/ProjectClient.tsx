'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import NavBar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';
import ShareButton from '@/app/components/ShareButton';
import ProtectedImage from '@/app/components/ProtectedImage';

// Turn an image file name into readable alt text
function altFromPath(src: string, fallback: string) {
  const name = decodeURIComponent(src.split('/').pop() || '')
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!name || /^(img|dsc|image|photo)?\s?\d+$/i.test(name)) return fallback;
  return name.charAt(0).toUpperCase() + name.slice(1);
}

// Which service pages match each project category
const SERVICES_BY_TYPE: Record<string, { href: string; label: string }[]> = {
  Office: [
    { href: '/services/interior-design/', label: 'Office interior design' },
    { href: '/services/design-build/', label: 'Design and build' },
    { href: '/services/furniture-production/', label: 'Office partitioning and furniture' },
  ],
  Apartment: [
    { href: '/services/interior-design/', label: 'Interior design' },
    { href: '/services/design-build/', label: 'Design and build' },
  ],
  Residential: [
    { href: '/services/interior-design/', label: 'Interior design' },
    { href: '/services/design-build/', label: 'Design and build' },
  ],
  default: [
    { href: '/services/interior-design/', label: 'Interior design' },
    { href: '/services/design-build/', label: 'Design and build' },
    { href: '/services/branding-signage/', label: 'Branding and signage' },
  ],
};

// Generate a factual summary
function projectSummary(p: any): string {
  const area = p.area && p.area !== 'N/A' ? `${p.area} ` : '';
  const type = String(p.type || 'interior').toLowerCase();
  const client = !p.client || /private/i.test(p.client) ? 'a private client' : p.client;
  const where = p.location ? ` in ${String(p.location).replace(/,(?=\S)/g, ', ')}` : '';
  const when = p.year ? ` in ${p.year}` : '';
  return `Duka Interiors delivered this ${area}${type} interior for ${client}${where}${when}.`;
}

interface ProjectClientProps {
  project: any;
  slug: string;
  allProjects?: any[];
  prevProject?: { slug: string; title: string } | null;
  nextProject?: { slug: string; title: string } | null;
}

export default function ProjectClient({ project, slug, allProjects = [], prevProject, nextProject }: ProjectClientProps) {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('duka_moodboard');
      if (saved) setFavorites(JSON.parse(saved));
    } catch {}
  }, []);

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

  // Keyboard navigation for gallery
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-white selection:bg-red-600">
      <NavBar />

      <main className="pt-24 md:pt-32">
        {/* Top Navigation Bar */}
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 mb-6">
          <div className="flex flex-row justify-between items-center gap-4">
            <Link
              href="/projects/"
              className="group flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
              </svg>
              <span className="text-[11px] font-bold uppercase tracking-widest">All Projects</span>
            </Link>

            <button
              onClick={toggleFavorite}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-[11px] tracking-widest uppercase transition-all ${
                favorites.includes(slug)
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <svg className={`w-4 h-4 ${favorites.includes(slug) ? 'fill-current' : 'fill-none'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {favorites.includes(slug) ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>

        {/* Main Image Gallery */}
        <div className="relative w-full max-w-[1800px] mx-auto px-4 md:px-8">
          <div className="relative aspect-[16/10] md:aspect-[16/9] bg-gray-100 overflow-hidden rounded-lg shadow-2xl">
            <ProtectedImage
              src={images[mainImageIndex]}
              alt={`${altFromPath(images[mainImageIndex], project.title)} – ${project.title}`}
              sizes="(max-width: 1800px) 100vw, 1800px"
              priority={mainImageIndex === 0}
              className="object-cover"
            />

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  aria-label="Previous photo"
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 z-20"
                >
                  <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  aria-label="Next photo"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 z-20"
                >
                  <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              </>
            )}

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-[11px] font-bold tracking-wider z-20">
                {mainImageIndex + 1} / {images.length}
              </div>
            )}

            {/* Share Button */}
            <div className="absolute bottom-4 right-4 z-30">
              <ShareButton title={project.title} url={`https://www.dukainteriors.com/projects/${slug}/`} />
            </div>
          </div>

          {/* Thumbnail Track */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-4 scrollbar-hide">
              {images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setMainImageIndex(idx)}
                  aria-label={`Show photo ${idx + 1} of ${images.length}`}
                  className={`relative w-20 h-14 md:w-28 md:h-20 flex-shrink-0 rounded overflow-hidden transition-all ${
                    idx === mainImageIndex
                      ? 'ring-2 ring-red-600 ring-offset-2'
                      : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  <ProtectedImage src={img} alt={altFromPath(img, `${project.title} photo ${idx + 1}`)} sizes="112px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Project Info */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 py-8 border-b border-gray-100">
            {[
              ['Client', project.client || 'Private client'],
              ['Location', project.location?.replace(/,(?=\S)/g, ', ')],
              ['Category', project.type],
              ['Area', project.area && project.area !== 'N/A' ? project.area : null],
              ['Scope', project.scope],
              ['Year', project.year],
            ]
              .filter(([, value]) => value)
              .map(([label, value]) => (
                <div key={label as string}>
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 mb-1">{label}</p>
                  <p className="text-sm font-bold text-gray-900">{value}</p>
                </div>
              ))}
          </div>

          {/* Title and Description */}
          <div className="py-12 md:py-16">
            <p className="text-red-600 text-[10px] font-black uppercase tracking-[0.3em] mb-4">{project.type}</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-gray-900 mb-8">
              {project.title}
            </h1>
            <div className="max-w-3xl">
              {String(project.description || '').trim().toLowerCase() !== String(project.title).trim().toLowerCase() && (
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  {project.description}
                </p>
              )}
              <p className="text-gray-500 text-base leading-relaxed">{projectSummary(project)}</p>
            </div>

            {/* Features and Services */}
            {(() => {
              const features = Array.from(
                new Set(
                  images
                    .map((img: string) => altFromPath(img, ''))
                    .filter((t: string) => t && !/^best\b/i.test(t))
                )
              ).slice(0, 8) as string[];
              const servicesUsed = SERVICES_BY_TYPE[project.type] || SERVICES_BY_TYPE.default;
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12 max-w-4xl">
                  {features.length > 0 && (
                    <div className="border-t-2 border-gray-900 pt-6">
                      <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-red-600 mb-4">In this project</h2>
                      <ul className="space-y-2 text-gray-600 text-sm">
                        {features.map((f) => (
                          <li key={f} className="flex items-start gap-2">
                            <span className="text-red-600 mt-0.5">—</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="border-t-2 border-gray-900 pt-6">
                    <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-red-600 mb-4">Services used</h2>
                    <ul className="space-y-2">
                      {servicesUsed.map((s) => (
                        <li key={s.href}>
                          <Link href={s.href} className="text-sm font-medium text-gray-900 hover:text-red-600 transition-colors flex items-center gap-2">
                            <span className="text-red-600">→</span>
                            {s.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })()}

            {/* Challenge and Result */}
            {(project.challenge || project.result) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12 max-w-4xl">
                {[
                  ['The challenge', project.challenge],
                  ['The result', project.result],
                ]
                  .filter(([, text]) => text)
                  .map(([heading, text]) => (
                    <div key={heading} className="border-t-2 border-gray-900 pt-6">
                      <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-red-600 mb-4">{heading}</h2>
                      <p className="text-gray-600 text-base leading-relaxed whitespace-pre-line">{text}</p>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Prev/Next Navigation */}
          {(prevProject || nextProject) && (
            <div className="border-t border-gray-100 py-8">
              <div className="grid grid-cols-2 gap-4">
                {prevProject ? (
                  <Link
                    href={`/projects/${prevProject.slug}/`}
                    className="group flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-red-600 group-hover:-translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                    </svg>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Previous</p>
                      <p className="text-sm font-bold text-gray-900 truncate group-hover:text-red-600 transition-colors">{prevProject.title}</p>
                    </div>
                  </Link>
                ) : <div />}

                {nextProject ? (
                  <Link
                    href={`/projects/${nextProject.slug}/`}
                    className="group flex items-center justify-end gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors text-right"
                  >
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Next</p>
                      <p className="text-sm font-bold text-gray-900 truncate group-hover:text-red-600 transition-colors">{nextProject.title}</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </Link>
                ) : <div />}
              </div>
            </div>
          )}

          {/* Related Projects */}
          {(() => {
            const related = allProjects
              .filter((p: any) => p.slug !== project.slug && p.type === project.type)
              .slice(0, 3);
            if (related.length === 0) return null;
            return (
              <section className="py-12 border-t border-gray-100">
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-8">
                  More {String(project.type).toLowerCase()} projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {related.map((p: any) => (
                    <Link
                      key={p.slug}
                      href={`/projects/${p.slug}/`}
                      className="group block border border-gray-200 p-6 hover:border-red-600 hover:shadow-lg transition-all rounded-lg"
                    >
                      <span className="block font-bold text-gray-900 group-hover:text-red-600 transition-colors">{p.title}</span>
                      <span className="block mt-2 text-sm text-gray-500">
                        {[p.area, String(p.location || '').replace(/,(?=\S)/g, ', ')].filter(Boolean).join(' · ')}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })()}
        </div>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
          <div className="bg-gray-950 text-white p-8 md:p-12 lg:p-16 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <p className="text-red-500 text-[10px] font-black uppercase tracking-[0.3em] mb-3">Next step</p>
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-tight">
                Planning a similar {String(project.type || 'interior').toLowerCase()} space?
              </h2>
              <p className="text-gray-400 mt-3 text-sm max-w-xl">
                Tell us your floor area and timeline, and we'll send a design concept and itemised proposal.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/contact/"
                className="bg-red-600 hover:bg-white hover:text-black text-white font-black py-4 px-8 text-[11px] uppercase tracking-widest text-center transition-colors rounded"
              >
                Get a Quote
              </Link>
              <a
                href={`https://wa.me/251940607055?text=${encodeURIComponent(`Hello Duka Interiors, I saw the "${project.title}" project and I'd like a quote for a similar space.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/30 hover:bg-white hover:text-black font-black py-4 px-8 text-[11px] uppercase tracking-widest text-center transition-colors rounded"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Floating Moodboard Button */}
      {favorites.length > 0 && (
        <div className="fixed bottom-6 left-0 right-0 z-[1000] flex justify-center pointer-events-none px-4">
          <Link
            href="/moodboard/"
            className="pointer-events-auto bg-black text-white px-6 py-4 rounded-full flex items-center gap-3 shadow-2xl hover:scale-105 transition-all border border-white/10"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="text-[11px] font-black uppercase tracking-widest">My Moodboard</span>
            <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black">
              {favorites.length}
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}
