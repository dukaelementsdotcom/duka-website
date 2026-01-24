'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
// In the [slug] folder, you go up one level to find the file
import { BLOG_POSTS } from '../post.data';

export default function ArticlePage() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) return <div className="pt-40 text-center uppercase font-black">Article Not Found</div>;

  return (
    <div className="min-h-screen bg-white selection:bg-red-600 selection:text-white">
      <NavBar />
      <main className="pt-32 pb-20 px-6">
        <article className="max-w-4xl mx-auto">
          <Link href="/resources" className="text-[10px] font-black tracking-widest text-gray-400 hover:text-red-600 mb-12 block">← BACK TO ALL INSIGHTS</Link>
          <header className="mb-12">
            <span className="text-red-600 font-bold text-xs tracking-widest uppercase mb-4 block">{post.category}</span>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-8">{post.title}</h1>
            <div className="relative aspect-video rounded-lg overflow-hidden mb-12 bg-gray-100 border border-gray-100">
                <Image src={post.image} alt={post.title} fill className="object-cover" priority />
            </div>
          </header>

          <div 
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed
            prose-h3:text-2xl prose-h3:font-black prose-h3:uppercase prose-h3:tracking-tighter prose-h3:mt-12 prose-h3:text-black
            prose-img:rounded-lg prose-img:my-10 prose-strong:text-black prose-p:mb-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-20 p-8 border-2 border-black rounded-lg flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
                <h4 className="font-black uppercase text-xl">Need Professional Finishing?</h4>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Request a technical site visit for your office project.</p>
            </div>
            <a href="https://t.me/dukainteriorsplc" className="bg-red-600 text-white px-8 py-4 font-black uppercase tracking-widest text-[10px] hover:bg-black transition-all">Send Telegram Message</a>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}