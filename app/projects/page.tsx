// REMOVE 'use client' - This becomes a Server Component
import Image from 'next/image';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ShareButton from '../components/ShareButton';

// ✅ SERVER-SIDE DATA FETCHING (ZERO LOADING DELAY)
async function getProjectsData() {
  const filePath = path.join(process.cwd(), 'public/data/projects.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContent.replace(/^\uFEFF/, ''));
  
  // Fix apartment types
  return data.map((p: any) => {
    if ([
      'luxury-three-bedroom-apartment-bole',
      'minimalist-apartment-finishing-ethiopia',
      'modern-studio-apartment-design-addis'
    ].includes(p.slug)) {
      return { ...p, type: 'Apartment' };
    }
    return p;
  });
}

// ✅ METADATA FOR SEO (Next.js 13+)
export const metadata = {
  title: 'Our Projects Portfolio | Duka Interiors',
  description: 'Explore Duka Interiors\' award-winning design and build projects across Ethiopia. From luxury apartments to commercial spaces, discover our portfolio of exceptional interior design work.',
  keywords: 'interior design Ethiopia, Addis Ababa interior designers, apartment design, office interior design, hospitality design',
  openGraph: {
    title: 'Our Projects Portfolio | Duka Interiors',
    description: 'Explore Duka Interiors\' award-winning design and build projects across Ethiopia.',
    url: 'https://dukainteriors.com/projects',
    siteName: 'Duka Interiors',
    images: [
      {
        url: '/og-image-projects.jpg', // Create this!
        width: 1200,
        height: 630,
        alt: 'Duka Interiors Projects Portfolio',
      },
    ],
    locale: 'en_ET',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Projects Portfolio | Duka Interiors',
    description: 'Explore Duka Interiors\' award-winning design and build projects.',
    images: ['/og-image-projects.jpg'],
  },
  alternates: {
    canonical: 'https://dukainteriors.com/projects',
  },
};

// ✅ STATIC GENERATION (Pre-build at build time)
export const revalidate = 3600; // Re-generate every hour

export default async function ProjectsPage() {
  const projects = await getProjectsData();

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'Office', label: 'Office' },
    { id: 'Apartment', label: 'Apartment' },
    { id: 'Residential', label: 'Residential' },
    { id: 'Hospitality', label: 'Hospitality' },
    { id: 'Healthcare', label: 'Healthcare' },
    { id: 'Retail', label: 'Retail' },
    { id: 'Gymnasium', label: 'Gymnasium' },
  ];

  const counts = {
    all: projects.length,
    Office: projects.filter((p: any) => p.type === 'Office').length,
    Apartment: projects.filter((p: any) => p.type === 'Apartment').length,
    Residential: projects.filter((p: any) => p.type === 'Residential').length,
    Hospitality: projects.filter((p: any) => p.type === 'Hospitality').length,
    Healthcare: projects.filter((p: any) => p.type === 'Healthcare').length,
    Retail: projects.filter((p: any) => p.type === 'Retail').length,
    Gymnasium: projects.filter((p: any) => p.type === 'Gymnasium').length,
  };

  // ✅ SCHEMA.ORG STRUCTURED DATA (FIXED)
  const listSchema = {
    "@context": "https://schema.org", // ✅ FIXED: Removed extra spaces
    "@type": "ItemList",
    "name": "Duka Interiors Projects Portfolio",
    "description": "Interior design and build projects by Duka Interiors in Addis Ababa, Ethiopia",
    "itemListElement": projects.slice(0, 10).map((p: any, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": `https://dukainteriors.com/projects/${p.slug}`, // ✅ FIXED: Removed extra spaces
      "name": p.title,
      "image": p.image,
    })),
    "numberOfItems": projects.length,
  };

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-red-600 selection:text-white overflow-x-hidden">
      {/* ✅ SCHEMA.ORG JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }} />
      
      {/* ✅ BREADCRUMB SCHEMA (NEW) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://dukainteriors.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Projects",
            "item": "https://dukainteriors.com/projects"
          }
        ]
      }) }} />
      
      <NavBar />
      
      <main className="flex-grow pt-[80px]">
        <section className="pb-8 px-4 md:px-6 mt-12">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 uppercase tracking-tighter">
              Our Projects Portfolio
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto text-base uppercase tracking-widest font-bold">
              We create workplaces that elevate your brand and inspire your people.
            </p>
          </div>

          <div className="sticky top-[80px] z-40 bg-white border-b border-gray-100 py-4 px-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center overflow-x-auto pb-2 md:pb-0 space-x-2 scrollbar-hide">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {}} // Client component will handle this
                    className="px-4 py-2 text-[10px] font-bold uppercase tracking-wide rounded-full whitespace-nowrap transition-colors text-gray-500 bg-gray-50"
                  >
                    {cat.label} <span className="ml-1 opacity-75">({counts[cat.id as keyof typeof counts] || 0})</span>
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-72">
                <input
                  type="text"
                  placeholder="Search projects..."
                  readOnly // Client component will handle this
                  className="w-full pl-4 pr-4 py-2 text-[11px] border border-gray-200 rounded-full focus:ring-1 focus:ring-red-600 outline-none"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="px-1 md:px-2 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {projects.map((project: any, idx: number) => (
              <div key={project.slug} className="group relative aspect-[4/3] bg-gray-100 overflow-hidden">
                <Link href={`/projects/${project.slug}`} className="block w-full h-full">
                  <Image
                    src={project.image}
                    alt={`${project.title} - ${project.type} interior design project in ${project.location} | Duka Interiors`}
                    fill
                    priority={idx < 6}
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                    <span className="text-red-500 text-[9px] font-black uppercase tracking-[0.2em] mb-2">{project.type}</span>
                    <h3 className="text-white text-xl md:text-2xl font-black uppercase tracking-tighter leading-none mb-1">{project.title}</h3>
                    <p className="text-white/70 text-[10px] uppercase tracking-widest">{project.location}</p>
                  </div>
                </Link>

                {/* ✅ CLIENT COMPONENT FOR INTERACTIVE ELEMENTS */}
                <ClientInteractiveElements 
                  projectSlug={project.slug} 
                  projectTitle={project.title} 
                />
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

// ✅ CLIENT COMPONENT FOR INTERACTIVE FEATURES (keeps page fast)
'use client';
function ClientInteractiveElements({ projectSlug, projectTitle }: { projectSlug: string; projectTitle: string }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('duka_moodboard');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => {
      const updated = prev.includes(projectSlug) 
        ? prev.filter(id => id !== projectSlug) 
        : [...prev, projectSlug];
      localStorage.setItem('duka_moodboard', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <>
      <button
        onClick={toggleFavorite}
        className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center bg-black/20 backdrop-blur-md rounded-full text-white z-20 hover:bg-red-600 transition-colors"
      >
        <svg className={`w-4 h-4 ${favorites.includes(projectSlug) ? 'fill-current' : 'fill-none'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      <div className="absolute bottom-4 right-4 z-30 pointer-events-auto">
        <ShareButton title={projectTitle} />
      </div>
    </>
  );
}