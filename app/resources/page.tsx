'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { BLOG_POSTS } from './post.data';

export default function ResourcesPage() {
  // ✅ CLIENT-SIDE TITLE UPDATE (Optimized + no trailing space)
  useEffect(() => {
    document.title = "Office Design Resources & Guides Ethiopia | Duka Interiors";
    return () => { document.title = "Duka Interiors"; };
  }, []);

  // ✅ CRITICAL FIX: Inject canonical URL for Client Component (GMB migration essential)
  useEffect(() => {
    const existing = document.querySelector('link[rel="canonical"]');
    if (existing) existing.remove();
    
    const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = 'https://www.dukainteriors.com/resources';
    document.head.appendChild(canonicalLink);
    
    return () => { canonicalLink.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main className="pt-32 pb-20">
        <section className="container mx-auto px-6 max-w-7xl mb-16">
          <div className="border-l-4 border-red-600 pl-6">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-gray-900 leading-none">
              INSIGHTS & <br />RESOURCES
            </h1>
            <p className="mt-4 text-gray-500 uppercase tracking-widest text-xs font-bold">
              Expertise for the modern Ethiopian workspace
            </p>
          </div>
        </section>

        <section className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {BLOG_POSTS.map((post) => (
              <Link key={post.slug} href={`/resources/${post.slug}`} className="group flex flex-col h-full">
                <div className="relative aspect-[16/10] mb-6 overflow-hidden rounded-sm bg-gray-100">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                  />
                </div>
                <div className="flex-grow">
                  <span className="text-red-600 font-bold text-[10px] tracking-[0.2em] uppercase mb-3 block">
                    {post.category} — {post.date}
                  </span>
                  <h3 className="text-2xl font-bold uppercase tracking-tighter leading-tight mb-4 group-hover:text-red-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
                <div className="mt-auto inline-block text-[10px] font-black tracking-widest border-b-2 border-black pb-1 w-fit group-hover:border-red-600">
                  READ ARTICLE →
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}