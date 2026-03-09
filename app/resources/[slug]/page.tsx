// app/resources/[slug]/page.tsx
import { BLOG_POSTS } from '../post.data';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import React, { use } from 'react';

// Pre-rendering all blog paths
export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

// ✅ ADD METADATA FOR SEO (FIXES CANONICAL + PREVENTS REDIRECTS)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const post = BLOG_POSTS.find((p) => p.slug === decodedSlug);

  if (!post) {
    return {
      title: 'Article Not Found | Duka Interiors',
      description: 'The requested article could not be found.',
    };
  }

  return {
    title: `${post.title} | Duka Interiors`,
    description: post.excerpt,
    alternates: {
      canonical: `https://www.dukainteriors.com/resources/${post.slug}/`, // ✅ TRAILING SLASH (matches next.config.js)
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  
  // Fix: Decode the slug to handle URL encoding (e.g., "office%20design" -> "office design")
  const decodedSlug = decodeURIComponent(slug);
  const post = BLOG_POSTS.find((p) => p.slug === decodedSlug);

  if (!post) {
    return (
      <div className="min-h-screen pt-40 bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-4">404</h1>
          <p className="text-gray-600 mb-8 uppercase tracking-widest text-xs">
            Article not found.
          </p>
          <Link
            href="/resources/"
            className="bg-black text-white px-8 py-3 font-black uppercase text-xs tracking-widest hover:bg-red-600 transition-colors"
          >
            ← Back to Insights
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white selection:bg-red-600 selection:text-white">
      <NavBar />
      <main className="pt-32 pb-20 px-6">
        <article className="max-w-4xl mx-auto">
          <Link
            href="/resources/"
            className="text-[10px] font-black tracking-widest text-gray-400 hover:text-red-600 mb-12 block"
          >
            ← BACK TO ALL INSIGHTS
          </Link>
          <header className="mb-12">
            <span className="text-red-600 font-bold text-xs tracking-widest uppercase mb-4 block">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
              {post.title}
            </h1>
            <div className="relative aspect-video rounded-lg overflow-hidden mb-12 bg-gray-100 border border-gray-100">
              <img
                src={post.image}
                alt={post.title}
                width={1200}
                height={630}
                className="object-cover w-full h-full"
              />
            </div>
          </header>

          <div
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed
            prose-h3:text-2xl prose-h3:font-black prose-h3:uppercase prose-h3:tracking-tighter prose-h3:mt-12 prose-h3:text-black
            prose-img:rounded-lg prose-img:my-10 prose-strong:text-black prose-p:mb-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* ✅ CONDITIONALLY RENDER DEFAULT CTA - HIDE FOR LIVE ETHIO ARTICLE */}
          {!post.hideDefaultCTA && (
            <div className="mt-20 p-8 border-2 border-black rounded-lg flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <h4 className="font-black uppercase text-xl">Need Professional Finishing?</h4>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">
                  Request a technical site visit for your office project.
                </p>
              </div>
              <a
                href="https://t.me/dukainteriorsplc"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 text-white px-8 py-4 font-black uppercase tracking-widest text-[10px] hover:bg-black transition-all"
              >
                Send Telegram Message
              </a>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}