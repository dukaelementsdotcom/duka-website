// components/ComingSoon.tsx

'use client';

import Link from 'next/link';
import NavBar from './NavBar';
import Footer from './Footer';

export default function ComingSoon({ title, caption }: { title: string; caption?: string }) {
  return (
    <div className="min-h-screen bg-white selection:bg-red-600">
      <NavBar />
      <main className="pt-32 pb-20 px-4 flex flex-col items-center justify-center text-center min-h-[70vh]">
        <span className="text-red-600 font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">
          {title} / Under Development
        </span>
        <h1 className="text-5xl md:text-8xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-8">
          {title}<br />
          <span className="text-transparent" style={{ WebkitTextStroke: '1px #111' }}>Coming Soon</span>
        </h1>
        <div className="h-1 w-20 bg-black mb-8 mx-auto"></div>
        <p className="max-w-md text-gray-500 uppercase text-[10px] font-bold tracking-widest leading-relaxed mb-12">
          {caption || "We are currently curating exclusive architectural insights and professional resources for this section."}
        </p>
        <Link 
          href="/" 
          className="bg-black text-white px-10 py-4 font-black uppercase text-[10px] tracking-[0.2em] hover:bg-red-600 transition-colors"
        >
          Return Home
        </Link>
      </main>
      <Footer />
    </div>
  );
}