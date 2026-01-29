'use client';

import { useState, useEffect } from 'react';
import NavBar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';
import { Linkedin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  const [featuredProjects, setFeaturedProjects] = useState([]);

  // ✅ CLIENT-SIDE TITLE UPDATE
  useEffect(() => {
    document.title = "About Duka Interiors: Office Design Experts Addis Ababa Since 2015 | Duka Interiors";
    return () => { document.title = "Duka Interiors"; };
  }, []);

  // ✅ CRITICAL FIX: Inject canonical URL for Client Component (GMB migration essential)
  useEffect(() => {
    const existing = document.querySelector('link[rel="canonical"]');
    if (existing) existing.remove();
    
    const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = 'https://www.dukainteriors.com/about';
    document.head.appendChild(canonicalLink);
    
    return () => { canonicalLink.remove(); };
  }, []);

  useEffect(() => {
    fetch('/data/projects.json')
      .then(res => res.json())
      .then(data => {
        setFeaturedProjects(data.slice(0, 3));
      })
      .catch(err => console.error("Failed to load featured projects", err));
  }, []);

  const team = [
    { 
      name: 'Dagmawi Tilahun', 
      title: 'CEO — CO-FOUNDER / ARCHITECT', 
      img: '/images/team-duka-interiors/dagmawi-tilahun-duka-interiors.webp',
      linkedin: 'https://www.linkedin.com/in/dagmawi-tilahun' // ✅ Fixed trailing spaces
    },
    { 
      name: 'Henok Teshome', 
      title: 'COO — CO-FOUNDER / ARCHITECT', 
      img: '/images/team-duka-interiors/henok-teshome-duka-interiors.webp',
      linkedin: 'https://www.linkedin.com/in/henok-teshome-a3852b56' // ✅ Fixed trailing spaces
    },
    { name: 'Beyene Tilahun', title: 'IMPORT & SOURCING MANAGER', img: '/images/team-duka-interiors/asefa-gebre-duka-interiors.webp', linkedin: '#' },
    { name: 'Yeabsera Kebede', title: 'PRODUCT DESIGNER', img: '/images/team-duka-interiors/melat-kibru-duka-interiors.webp', linkedin: '#' },
    { name: 'Masho Mengistu', title: 'FINANCE MANAGER', img: '/images/team-duka-interiors/martha-hailu-duka-interiors.webp', linkedin: '#' },
    { name: 'Mesay Eshete', title: 'CONSTRUCTION HEAD', img: '/images/team-duka-interiors/elias-denberu-duka-interiors.webp', linkedin: '#' },
    { name: 'Layne Terefe', title: 'PROCUREMENT MANAGER', img: '/images/team-duka-interiors/tenbit-tesfaye-duka-interiors.webp', linkedin: '#' },
    { name: 'Tomas Ashenafi', title: 'SITE MANAGER', img: '/images/team-duka-interiors/tomas-ashenafi-duka-interiors.webp', linkedin: '#' },
  ];

  // ✅ FIXED: Removed ALL trailing spaces in Schema.org URLs
  const aboutSchema = {
    "@context": "https://schema.org", // ✅ Clean URL
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "InteriorDesign",
      "name": "Duka Interiors P.L.C",
      "foundingDate": "2015",
      "founder": [
        { 
          "@type": "Person", 
          "name": "Dagmawi Tilahun", 
          "jobTitle": "Architect",
          "sameAs": "https://www.linkedin.com/in/dagmawi-tilahun" // ✅ Clean URL
        },
        { 
          "@type": "Person", 
          "name": "Henok Teshome", 
          "jobTitle": "Architect",
          "sameAs": "https://www.linkedin.com/in/henok-teshome-a3852b56" // ✅ Clean URL
        }
      ],
      "description": "The leading force in commercial interior design and office partitioning in Addis Ababa, Ethiopia since 2015."
    }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-red-600 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <NavBar />

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-16 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="border-l-4 border-red-600 pl-6 mb-8">
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter leading-tight">
              About Duka Interiors: <br />
              <span className="text-gray-500">A Decade of Visionary Office Design & Build in Addis Ababa</span>
            </h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            <div className="lg:col-span-7">
              <div className="overflow-hidden shadow-2xl bg-gray-100 aspect-[16/10] relative">
                <Image 
                  src="/images/duka-interiors-portfolio/dereja-office-interior-partition-work/small-office-space-optimization-ideas.webp" 
                  alt="Duka Interiors Workspace" 
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
              </div>
            </div>
            <div className="lg:col-span-5 space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed font-medium italic">
                Established in 2015 by two visionary professional architects, Dagmawi Tilahun and Henok Teshome, Duka Interiors has evolved over a decade into a leading force in commercial interior design across Addis Ababa and throughout Ethiopia.
              </p>
              <p className="text-gray-600 leading-relaxed">
                With 10 years of experience successfully delivering several impactful projects, our mission is clear: to craft exceptional office interiors and execute turnkey solutions that are delivered on time, within budget, and to the highest standards of quality.
              </p>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">Turnkey Solutions / Spatial Strategy / Custom Build</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CORE VALUES & COLLABORATIVE APPROACH --- */}
      <section className="py-20 bg-gray-50 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-16">
            <div className="lg:col-span-4 bg-red-600 p-12 text-white shadow-xl">
              <h2 className="text-4xl font-black uppercase tracking-tighter leading-none mb-6">
                Our Core Values & Collaborative Approach
              </h2>
              <div className="h-1 w-12 bg-black"></div>
            </div>
            <div className="lg:col-span-8 text-gray-700 space-y-6 leading-relaxed text-lg">
              <p>
                At the heart of Duka Interiors lies a steadfast commitment to our clients. Our core values of client focus, honesty, integrity, respect, and loyalty underpin everything we do.
              </p>
              <p>
                We believe in a truly collaborative process, ensuring each workspace solution is meticulously tailored to reflect your brand identity, operational efficiency, and long-term strategic goals.
              </p>
              <p>
                Our dedicated team, driven by a passion for delivering excellence, operates with the highest levels of professionalism, from initial concept to seamless completion.
              </p>
              <p>
                We pride ourselves on fostering accountability and encouraging fresh thinking to consistently set new benchmarks in Ethiopian office design.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: '01.', title: 'Professionalism', desc: 'Highest levels of professionalism from initial concept to seamless completion across all fit-out stages.' },
              { num: '02.', title: 'Innovation', desc: 'Constantly embracing innovative approaches to create inspiring and energizing environments for modern businesses.' },
              { num: '03.', title: 'Accountability', desc: 'Fostering accountability and fresh thinking to consistently set new benchmarks in the Ethiopian industry.' }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-white border-t-4 border-black shadow-sm group hover:border-red-600 transition-colors">
                <span className="text-red-600 font-black text-2xl group-hover:text-black transition-colors">{item.num}</span>
                <h4 className="font-bold uppercase mt-4 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- UNRIVALED EXPERTISE & LOCAL INSIGHT --- */}
      <section className="py-24 px-4 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 space-y-6">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-gray-900 border-b-4 border-red-600 inline-block pb-2">
              Unrivaled Expertise & Local Insight
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                As pioneers in the Addis Ababa office design landscape, we constantly embrace innovative approaches to create inspiring and energizing environments. 
              </p>
              <p>
                Our extensive local expertise in office space planning, combined with comprehensive service offerings—from bespoke office furniture and custom built-ins to full office construction and fit-outs—means we bring unparalleled insight to every project.
              </p>
              <p className="font-medium text-gray-900 italic bg-gray-50 p-4 border-l-4 border-black">
                We understand the nuances of the local market, ensuring designs are not only aesthetically pleasing but also highly functional, compliant, and perfectly suited to the unique demands of businesses in Ethiopia.
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="aspect-video overflow-hidden shadow-xl border-8 border-gray-50 group relative">
              <Image 
                src="/images/duka-interiors-portfolio/modern-office-finishing-work-bole.webp" 
                alt="Expertise in Addis Ababa Office Design" 
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- DYNAMIC FEATURED PROJECTS --- */}
      <section className="py-24 px-4 md:px-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="flex items-center gap-4 w-full md:w-auto">
               <h2 className="text-4xl font-black tracking-tighter uppercase leading-none">
                 <span className="text-red-600 italic uppercase">Featured</span> Projects
               </h2>
               <div className="h-px bg-gray-300 flex-grow md:w-48"></div>
            </div>
            <Link href="/projects" className="group flex items-center gap-2 font-black uppercase tracking-widest text-[11px] text-gray-900 hover:text-red-600 transition-colors">
              See More Projects <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project: any) => (
              <Link 
                key={project.slug} 
                href={`/projects/${project.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/3] overflow-hidden mb-6 bg-gray-100">
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 group-hover:saturate-0"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/60 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-white font-black uppercase tracking-widest text-[10px] border border-white px-4 py-2 backdrop-blur-sm">View Case Study</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors uppercase tracking-tight">
                  {project.title}
                </h3>
                <p className="text-[10px] text-red-600 font-black uppercase tracking-widest mt-1">
                  {project.type} — {project.location}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- OUR TEAM: FULL GRID --- */}
      <section className="py-24 px-4 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 relative">
            <h2 className="text-3xl font-black uppercase tracking-[0.2em] text-gray-900">Our Team</h2>
            <div className="w-16 h-1 bg-red-600 mx-auto mt-4"></div>
            <div className="absolute top-1/2 left-0 w-full h-px bg-gray-100 -z-10 hidden md:block"></div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-gray-50 border border-gray-100 p-2 group-hover:border-red-600 transition-colors duration-300">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <h3 className="text-sm md:text-base font-bold text-gray-900 uppercase tracking-tighter mb-1">
                  {member.name}
                </h3>
                <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.15em]">
                  {member.title}
                </p>
                <div className="mt-3 flex justify-center gap-4 opacity-40 group-hover:opacity-100 transition-opacity">
                   <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700"><Linkedin size={16} /></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- THE DARK CTA STRIP --- */}
      <section className="bg-[#1A1A1A] py-16 px-4 md:px-12 mb-[-1px]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left text-white">
            <p className="text-gray-500 text-[10px] uppercase tracking-[0.4em] mb-3 font-black italic">Next Step</p>
            <h2 className="text-2xl md:text-4xl font-bold leading-tight uppercase tracking-tighter">
              Discuss your <span className="italic text-red-600 underline underline-offset-8">Office Project</span> <br />
              with our experts.
            </h2>
            <p className="text-gray-400 font-bold mt-4 uppercase text-[10px] tracking-widest">Reach out for a no-obligation discussion</p>
          </div>
          <a
            href="https://t.me/dukainteriorsplc" // ✅ Fixed trailing spaces
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center bg-red-600 text-white font-black py-5 px-12 uppercase tracking-[0.2em] text-[11px] overflow-hidden transition-all hover:bg-white hover:text-red-600 active:scale-95"
          >
            <span className="relative z-10">Get a Free Consultation</span>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}