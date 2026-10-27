import Link from 'next/link';
import { pageMeta, breadcrumbSchema } from '@/lib/seo';
import NavBar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';
import { FAQS } from '@/app/components/HomeFAQ';
import { SERVICE_EXTRAS } from '@/lib/serviceExtras';
import { services } from '@/lib/servicesData';

// All client questions in one place: the homepage questions plus each service's questions.
// The answers live in HomeFAQ.tsx and lib/serviceExtras.ts, so they stay in sync.
// (FAQ structured data is on the homepage and service pages, so it isn't repeated here.)

export const metadata = pageMeta({
  title: 'Interior Design and Fit-Out FAQ, Addis Ababa',
  description:
    'Costs, partitions, furniture, branding and renovation: answers to the questions companies in Addis Ababa ask Duka Interiors most.',
  path: '/resources/faq/',
});

export default function FAQPage() {
  const groups = [
    { title: 'Costs and working with us', href: null as string | null, items: FAQS.map((f) => ({ q: f.q, a: f.text })) },
    ...services
      .filter((s) => SERVICE_EXTRAS[s.slug]?.faqs.length)
      .map((s) => ({ title: s.title, href: `/services/${s.slug}/`, items: SERVICE_EXTRAS[s.slug].faqs })),
  ];

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Resources', url: '/resources/' },
    { name: 'FAQ', url: '/resources/faq/' },
  ]);

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <NavBar />
      <main className="pt-32 pb-20 px-4 md:px-8 lg:px-12 max-w-4xl mx-auto">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 mb-4">Resources</p>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-gray-900 leading-[0.95]">
          Questions clients ask us
        </h1>
        <p className="mt-6 text-gray-700 leading-relaxed max-w-2xl">
          Straight answers about interior design, office partitions, furniture and renovation in Addis Ababa. Prices
          are Duka Interiors&rsquo; 2026 rates. Your final price depends on the area, the specification and the site.
        </p>

        {groups.map((g) => (
          <section key={g.title} className="mt-14">
            <div className="flex items-baseline justify-between gap-4 mb-4">
              <h2 className="text-2xl font-black uppercase tracking-tighter text-gray-900">{g.title}</h2>
              {g.href && (
                <Link href={g.href} className="text-xs font-bold uppercase tracking-widest text-red-600 shrink-0">
                  Service details →
                </Link>
              )}
            </div>
            <div className="divide-y divide-gray-200 border-y border-gray-200">
              {g.items.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                    <h3 className="text-base md:text-lg font-bold text-gray-900">{f.q}</h3>
                    <span className="mt-1 text-red-600 text-xl leading-none transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-gray-700 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}

        <section className="mt-16 bg-gray-950 text-white p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Have a different question?</h2>
          <p className="mt-3 text-gray-300">Tell us about your space and we&rsquo;ll get back to you.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link href="/contact/" className="bg-red-600 hover:bg-white hover:text-black text-white font-black py-4 px-8 text-[11px] uppercase tracking-widest text-center transition-colors">
              Contact us
            </Link>
            <Link href="/estimate/" className="border border-white/30 hover:bg-white hover:text-black font-black py-4 px-8 text-[11px] uppercase tracking-widest text-center transition-colors">
              Estimate your cost
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
