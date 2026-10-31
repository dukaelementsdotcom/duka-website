import Link from 'next/link';
import Image from 'next/image';
import AnimatedStat from './components/AnimatedStat';
import Gallery from './components/Gallery';
// Testimonials hidden until we have real quotes with names and companies
// import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ClientLogosFinal from './components/ClientLogosFinal';
import FinalCTA from './components/FinalCTA';
import HomeFAQ from './components/HomeFAQ';
import ResetScroll from './components/ResetScroll';
import NavBar from './components/NavBar';
import { services } from '@/lib/servicesData';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Interior Designers in Addis Ababa | Duka Interiors',
  absoluteTitle: true,
  description:
    'Architect-led interior designers in Addis Ababa since 2015. Office design, partitioning, renovation and custom furniture, designed and built by one team.',
  path: '/',
});

const YEARS_IN_BUSINESS = new Date().getFullYear() - 2015;

export default function Home() {
  return (
    <>
      <NavBar />
      <ResetScroll />

      <div className="relative h-screen min-h-screen overflow-hidden">
        {/* ✅ FIXED: Added aspect ratio to prevent layout shifts */}
        <div style={{ aspectRatio: '16/9' }}>
          <Image
            src="/images/duka-interiors-portfolio/modern-conference-room-and-lobby-design/modern-board-room-habesha-breweries.webp"
            alt="Office interior designed and built by Duka Interiors in Addis Ababa"
            fill
            className="object-cover"
            priority
            fetchPriority="high" // ✅ FIXED: Added high fetch priority
            quality={60}
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <p className="text-red-600 font-black tracking-[0.3em] uppercase text-[10px] mb-4">
            Since 2015 // Addis Ababa
          </p>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[0.9] max-w-4xl mb-8 uppercase tracking-tighter">
            We Design & Build <br />
            Office <span className="text-red-600">Interiors</span> <br />
            In Addis Ababa.
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact/"
              className="bg-red-600 hover:bg-white hover:text-black text-white font-black py-4 px-8 text-[11px] uppercase tracking-widest transition-all duration-500 shadow-xl"
            >
              Free Consultation
            </Link>
            <Link
              href="/projects"
              className="bg-transparent border border-white hover:bg-white hover:text-black text-white font-black py-4 px-8 text-[11px] uppercase tracking-widest transition-all duration-500"
            >
              Our Portfolio
            </Link>
          </div>
        </div>
      </div>
      
      <main className="bg-white">
        <section className="py-20 px-6 lg:px-12 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-[1.1] uppercase tracking-tighter">
                  Interior Design & <br /><span className="text-red-600">Office Partitioning</span> in Ethiopia.
                </h2>
                
                <div className="space-y-4 text-gray-600 text-base leading-relaxed max-w-2xl font-medium">
                  <p>
                    Duka Interiors is a professional design and build firm working in the Ethiopian market since 2015.
                  </p>
                  <p>
                    From specialized office partitioning in Addis Ababa to full office renovation and interior decoration, we handle the entire process from start to finish.
                  </p>
                </div>

                <div className="pt-4">
                  <Link href="/about" className="group flex items-center gap-4 font-black uppercase tracking-widest text-[10px] text-black">
                    More About Our Process <span className="group-hover:translate-x-2 transition-transform text-red-600 text-xl">→</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <Link href="/projects/modern-conference-room-and-lobby-design" className="block">
                  {/* ✅ FIXED: Added aspect ratio to prevent layout shifts */}
                  <div className="relative" style={{ aspectRatio: '16/9' }}>
                    <Image
                      src="/images/duka-interiors-portfolio/modern-conference-room-and-lobby-design/modern-conference-room-addis-ababa.webp"
                      alt="Office partitioning project"
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      quality={75}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-red-600 text-white px-6 py-2 font-black uppercase text-[10px] tracking-widest">View Project</span>
                    </div>
                  </div>
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* Stats Section - COMPACT */}
        <section className="w-full bg-black text-white py-12 border-y border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="space-y-1">
                <div className="text-4xl font-black tracking-tighter flex items-center">
                    <AnimatedStat target={150} /><span className="text-red-500">+</span>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-300">Projects</div>
              </div>
              <div className="space-y-1">
                <div className="text-4xl font-black tracking-tighter flex items-center">
                    <AnimatedStat target={50} /><span className="text-red-500">+</span>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-300">Clients</div>
              </div>
              <div className="space-y-1">
                <div className="text-4xl font-black tracking-tighter flex items-center">
                    <AnimatedStat target={YEARS_IN_BUSINESS} /><span className="text-red-500">+</span>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-300">Years</div>
              </div>
              <div className="flex items-center justify-end">
                  <Link href="/contact/" className="border border-white/20 px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    Start Project
                  </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 lg:px-12 bg-[#fafafa]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 mb-4">Core Services</h3>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Office Renovation & Design.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
              {services.map((service, index) => (
                <div key={index} className="bg-white p-8 space-y-4 group hover:bg-black transition-colors duration-500">
                  <div className="w-12 h-[2px] bg-red-600 group-hover:w-full transition-all duration-500"></div>
                  <h3 className="text-xl font-black uppercase tracking-tighter group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 group-hover:text-gray-400 transition-colors text-sm leading-relaxed">
                    {service.shortDesc}
                  </p>
                  <Link 
                    href={`/services/${service.slug}`}
                    className="inline-block pt-3 text-[10px] font-black uppercase tracking-widest group-hover:text-red-600 transition-colors"
                  >
                    View Specialty +
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Project Estimator CTA ===== */}
        <section className="py-16 px-6 lg:px-12 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-4xl mx-auto">
            <Link href="/estimate/" className="group block bg-white border-2 border-gray-200 rounded-2xl p-8 md:p-10 hover:border-red-600 hover:shadow-xl transition-all">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-3">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Free Tool
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-gray-900 mb-2">
                    Office Fit-Out Estimator
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Find out how much space you need and what it will cost. Takes 2 minutes.
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Space requirements
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Budget estimate in ETB
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Ethiopian market rates
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0 hidden md:block">
                  <span className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-black text-sm uppercase tracking-widest group-hover:bg-red-700 transition-colors">
                    Try It Free
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="mt-6 md:hidden">
                <span className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-black text-sm uppercase tracking-widest w-full justify-center">
                  Try It Free
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </section>

        <HomeFAQ />
        <Gallery />
        <ClientLogosFinal />
        {/* Testimonials hidden until we have real quotes with names and companies */}
        <div id="final-cta">
          <FinalCTA />
        </div>
        <Footer />
      </main>
    </>
  );
}