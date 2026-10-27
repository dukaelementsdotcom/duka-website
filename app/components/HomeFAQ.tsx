import Link from 'next/link';
import { CONTACT } from '@/lib/siteConfig';

// Homepage text block: who we are, links to real projects, and answers to the questions
// Google shows under "interior designer in Addis Ababa" ("People also ask").
// Server-rendered and uses <details>, so all text is in the HTML Google reads.
// Prices come from Duka's own rates (portal catalog and the estimator's 2026 material rates).
// Update them here when rates change.

const DESIGN_FEE_OFFICE = 800; // ETB per m², design only (varies by project type and detail level)
const DESIGN_FEE_HOME = 1000; // ETB per m², design only (varies by project type and detail level)
const RATE_GYPSUM_PARTITION = 3000; // ETB per m²
const RATE_GLASS_FROM = 14500; // ETB per m², aluminium single glass
const RATE_GLASS_TO = 16500; // ETB per m², double glass (sound proof)
const RATE_CEILING = 2800; // ETB per m², gypsum false ceiling

const n = (v: number) => v.toLocaleString('en-US');

type QA = { q: string; a: React.ReactNode; text: string };

export const FAQS: QA[] = [
  {
    q: 'How much does interior design cost in Ethiopia?',
    text: `At Duka Interiors, design-only fees start at about ${n(DESIGN_FEE_OFFICE)} ETB per m² for offices and ${n(DESIGN_FEE_HOME)} ETB per m² for homes. That covers the concept, layouts, material selection and 3D visuals. Building the design is priced separately by material: in 2026, gypsum partitions cost about ${n(RATE_GYPSUM_PARTITION)} ETB per m², aluminium glass partitions ${n(RATE_GLASS_FROM)} to ${n(RATE_GLASS_TO)} ETB per m², and gypsum false ceilings about ${n(RATE_CEILING)} ETB per m². The final price depends on the area, the specification and the site.`,
    a: (
      <>
        <p>
          At Duka Interiors, design-only fees start at about <strong>{n(DESIGN_FEE_OFFICE)} ETB per m²</strong> for
          offices and <strong>{n(DESIGN_FEE_HOME)} ETB per m²</strong> for homes. That covers the concept, layouts,
          material selection and 3D visuals.
        </p>
        <p className="mt-3">
          Building the design is priced separately by material. Typical 2026 rates in Addis Ababa: gypsum partitions
          about {n(RATE_GYPSUM_PARTITION)} ETB/m², aluminium glass partitions {n(RATE_GLASS_FROM)} to{' '}
          {n(RATE_GLASS_TO)} ETB/m², and gypsum false ceilings about {n(RATE_CEILING)} ETB/m². The final price depends
          on the area, the specification and the site. For a figure for your own space, try the{' '}
          <Link href="/estimate/" className="text-red-600 underline">
            cost estimator
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    q: 'How much should I pay for an interior designer?',
    text: 'Interior designers in Addis Ababa usually charge per square metre for design, or quote one price for design and build. Design-only suits you if you already have a contractor. Design and build means one team designs and delivers the work, with one contract and one point of contact. Ask any designer what the fee includes: number of layout revisions, 3D visuals, material specifications and site supervision.',
    a: (
      <>
        <p>
          Interior designers in Addis Ababa usually charge <strong>per square metre for design</strong>, or quote{' '}
          <strong>one price for design and build</strong>. Design-only suits you if you already have a contractor.{' '}
          <Link href="/services/design-build/" className="text-red-600 underline">
            Design and build
          </Link>{' '}
          means one team designs and delivers the work, with one contract and one point of contact.
        </p>
        <p className="mt-3">
          Whoever you choose, ask what the fee includes: the number of layout revisions, 3D visuals, material
          specifications and site supervision.
        </p>
      </>
    ),
  },
  {
    q: 'What does an office fit-out include?',
    text: 'An office fit-out usually includes space planning, partitions (glass, gypsum or acoustic), false ceilings, lighting and electrical points, data cabling, flooring, painting, branding and signage, and furniture. Duka Interiors designs and builds all of these, so you deal with one team from layout to handover.',
    a: (
      <p>
        Usually space planning,{' '}
        <Link href="/services/furniture-production/" className="text-red-600 underline">
          partitions and furniture
        </Link>
        , false ceilings, lighting and electrical points, data cabling, flooring, painting, and{' '}
        <Link href="/services/branding-signage/" className="text-red-600 underline">
          branding and signage
        </Link>
        . We design and build all of these, so you deal with one team from layout to handover.
      </p>
    ),
  },
  {
    q: 'Do you work on homes and apartments too?',
    text: 'Yes. Most of our work is offices, but we also design and finish apartments and homes, including model homes for real estate developers in Addis Ababa.',
    a: (
      <p>
        Yes. Most of our work is offices, but we also design and finish apartments and homes, including{' '}
        <Link href="/projects/ccd-real-estate-model-home-finishing/" className="text-red-600 underline">
          model homes for real estate developers
        </Link>
        .
      </p>
    ),
  },
  {
    q: 'Where is your office and when can I visit?',
    text: `Our studio is in Bole, Addis Ababa: Djibouti Street, Welela Building, 5th floor, Suite 507. We are open ${CONTACT.hours}. Call ahead and we will show you samples and past projects.`,
    a: (
      <p>
        Our studio is in Bole: Djibouti Street, Welela Building, 5th floor, Suite 507. We are open {CONTACT.hours}.{' '}
        <Link href="/contact/" className="text-red-600 underline">
          Contact us
        </Link>{' '}
        before you come and we&rsquo;ll have samples and past projects ready.
      </p>
    ),
  },
];

const PROJECT_LINKS = [
  { href: '/projects/modern-conference-room-and-lobby-design/', label: 'Habesha Breweries conference room and lobby' },
  { href: '/projects/dereja-office-interior-partition-work/', label: 'Ethiojobs office design and build' },
  { href: '/projects/luxury-executive-office-design-ethiopia/', label: 'Habesha Cement CEO office' },
  { href: '/projects/modern-hospital-design-addis/', label: 'Washington Medical Center interiors' },
];

export default function HomeFAQ() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.text },
    })),
  };

  return (
    <section className="py-20 px-6 lg:px-12 bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 mb-4">About Duka</p>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-gray-900 leading-[1.1]">
            Interior designers in Addis Ababa since 2015.
          </h2>
          <p className="mt-6 text-gray-700 leading-relaxed">
            Duka Interiors was founded by two architects, Dagmawi Tilahun and Henok Teshome. We design offices, then
            build them: partitions, ceilings, lighting, furniture and branding, delivered by one team. Our clients range
            from Qatar Airways and Habesha Breweries to NGOs, clinics and real estate developers.
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed">Recent work in Addis Ababa:</p>
          <ul className="mt-3 space-y-2">
            {PROJECT_LINKS.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="text-gray-900 font-semibold hover:text-red-600 transition-colors">
                  → {p.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/projects/"
            className="inline-block mt-6 text-[10px] font-black uppercase tracking-widest text-black border-b-2 border-red-600 pb-1"
          >
            See all projects
          </Link>
        </div>

        <div className="lg:col-span-7">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-gray-900 mb-6">
            Questions clients ask us
          </h2>
          <div className="divide-y divide-gray-200 border-y border-gray-200">
            {FAQS.map((f, i) => (
              <details key={f.q} className="group py-5" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-bold text-gray-900">
                  <h3 className="text-base md:text-lg">{f.q}</h3>
                  <span className="mt-1 text-red-600 transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                </summary>
                <div className="mt-3 text-gray-700 leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
          <Link
            href="/resources/faq/"
            className="inline-block mt-6 text-[10px] font-black uppercase tracking-widest text-black border-b-2 border-red-600 pb-1"
          >
            See all questions
          </Link>
        </div>
      </div>
    </section>
  );
}
