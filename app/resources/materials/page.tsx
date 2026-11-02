import Link from 'next/link';
import { pageMeta, breadcrumbSchema } from '@/lib/seo';
import NavBar from '@/app/components/NavBar';
import { short, RATES_UPDATED } from '@/lib/rates';
import Footer from '@/app/components/Footer';

// Material price guide. All figures come from lib/rates.ts (the one place to change prices).

export const metadata = pageMeta({
  title: 'Office Material Prices, Addis Ababa 2026',
  description:
    'Partition, ceiling, flooring, lighting and furniture prices in ETB from Duka Interiors, with guides to choosing materials for Ethiopian offices.',
  path: '/resources/materials/',
});

const GROUPS: { group: string; rows: [string, string][] }[] = [
  {
    group: 'Partitions and doors',
    rows: [
      ['Gypsum board partition, 90 mm double-sided', short('gypsumPartition')],
      ['Sound-insulated gypsum partition', short('gypsumSoundproof')],
      ['Glass partition, 10 mm tempered or aluminium-framed', short('glassPartition')],
      ['Double-glazed sound-proof glass partition', `from ${short('glassDoubleGlazed')}`],
      ['Glass door, 10 mm tempered with hardware', short('glassDoor')],
      ['Wooden flush door, 900 × 2100', short('woodenDoor')],
    ],
  },
  {
    group: 'Ceilings, floors and walls',
    rows: [
      ['Gypsum board false ceiling', short('gypsumCeiling')],
      ['Acoustic ceiling, concealed grid', short('acousticCeiling')],
      ['SPC flooring (locally made)', short('spcFlooring')],
      ['Carpet tiles (economy to acoustic)', short('carpetTiles')],
      ['Porcelain tiles (plus adhesive)', short('porcelainTiles')],
      ['Painting, primer and two coats', short('paint')],
    ],
  },
  {
    group: 'Lighting, power and data',
    rows: [
      ['LED panel 60 × 60, 48 W', short('ledPanel')],
      ['Power point (double socket)', short('powerPoint')],
      ['Data point (CAT6)', short('dataPoint')],
    ],
  },
  {
    group: 'Furniture',
    rows: [
      ['2-seater workstation', short('workstation2')],
      ['4-seater workstation', short('workstation4')],
      ['Mesh staff chair', short('staffChair')],
      ['High-back manager chair', short('managerChair')],
      ['Executive L-desk 160 × 80', short('executiveDesk')],
    ],
  },
  {
    group: 'Branding',
    rows: [
      ['Logo sign, acrylic face (per m² of sign)', short('logoSign')],
      ['Frosted film on glass', short('frostedFilm')],
      ['Printed wallpaper', short('printedWallpaper')],
    ],
  },
];

const GUIDES = [
  { href: '/resources/glass-vs-gypsum-office-partitions-ethiopia/', title: 'Glass vs gypsum partitions', text: 'Cost, acoustics and where each one works best.' },
  { href: '/resources/office-flooring-ethiopia-guide/', title: 'Office flooring in Ethiopia', text: 'Porcelain, carpet tiles, roll carpet or SPC: cost, cleaning and reuse.' },
  { href: '/resources/ethiopian-office-furniture-dimensions-guide/', title: 'Office furniture dimensions', text: 'Desk, workstation, storage and breakout sizes that work.' },
  { href: '/resources/office-color-psychology-productivity-addis/', title: 'Office colour psychology', text: 'Choosing colours that help your team focus.' },
];

export default function MaterialsPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Resources', url: '/resources/' },
    { name: 'Material prices', url: '/resources/materials/' },
  ]);

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <NavBar />
      <main className="pt-32 pb-20 px-4 md:px-8 lg:px-12 max-w-5xl mx-auto">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 mb-4">Resources</p>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-gray-900 leading-[0.95]">
          Office material prices in Addis Ababa
        </h1>
        <p className="mt-6 text-gray-700 leading-relaxed max-w-3xl">
          These are Duka Interiors&rsquo; supply-and-install rates ({RATES_UPDATED}), before 15% VAT, taken from our
          own recent bills of quantities. Our{' '}
          <Link href="/estimate/" className="text-red-600 underline">
            cost estimator
          </Link>{' '}
          uses the same rates. They help you set a budget. Your final price depends on quantities, specification and site conditions,
          and we confirm it in an itemised quote.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {GROUPS.map((g) => (
            <section key={g.group} className="border-t-2 border-gray-950 pt-5">
              <h2 className="text-lg font-black uppercase tracking-tighter text-gray-900 mb-3">{g.group}</h2>
              <table className="w-full text-sm">
                <tbody>
                  {g.rows.map(([item, price]) => (
                    <tr key={item} className="border-b border-gray-100">
                      <td className="py-2.5 pr-4 text-gray-700">{item}</td>
                      <td className="py-2.5 text-right font-bold text-gray-950 whitespace-nowrap">{price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          ))}
        </div>

        <section className="mt-16">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-gray-900 mb-6">
            Guides to choosing materials
          </h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {GUIDES.map((g) => (
              <li key={g.href}>
                <Link href={g.href} className="block h-full border border-gray-200 p-5 hover:border-red-600 transition-colors">
                  <span className="block font-bold text-gray-950">{g.title} →</span>
                  <span className="block mt-1 text-sm text-gray-600">{g.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-12 text-gray-700">
          Not sure what your space needs?{' '}
          <Link href="/contact/" className="text-red-600 underline">
            Ask us for a free consultation
          </Link>{' '}
          or read the{' '}
          <Link href="/resources/faq/" className="text-red-600 underline">
            FAQ
          </Link>
          .
        </p>
      </main>
      <Footer />
    </div>
  );
}
