// Extra content for each service page: common questions (with Duka's own 2026 rates from the
// estimator) and example projects. Keep prices in sync with app/estimate/page.tsx.

export type ServiceExtra = {
  faqs: { q: string; a: string }[];
  projects: string[]; // project slugs from public/data/projects.json
};

export const SERVICE_EXTRAS: Record<string, ServiceExtra> = {
  'interior-design': {
    faqs: [
      {
        q: 'How much does office interior design cost in Addis Ababa?',
        a: 'Our design-only fee starts at about 200 ETB per m² for offices and 260 ETB per m² for homes. It covers space planning, layout revisions, material selection and 3D visuals. Construction is quoted separately, or together if you choose design and build.',
      },
      {
        q: 'What do I receive at the end of the design stage?',
        a: 'Floor plans with furniture layout, 3D renders of the key spaces, and a material and finish schedule. Together they are enough for us, or any contractor, to price and build the project.',
      },
      {
        q: 'Can you design around our brand?',
        a: 'Yes. We use your logo, colours and values in the materials, lighting and graphics, so visitors recognise your company as soon as they walk in.',
      },
    ],
    projects: [
      'modern-conference-room-and-lobby-design',
      'luxury-executive-office-design-ethiopia',
      'modern-office-interior-design-addis',
    ],
  },
  'design-build': {
    faqs: [
      {
        q: 'What is design and build?',
        a: 'One company designs your space and then builds it. You sign one contract, receive one itemised price and deal with one team, instead of coordinating a designer and separate contractors.',
      },
      {
        q: 'Is design and build more expensive than hiring separately?',
        a: 'Usually not. Because the people who design also price and build the work, costs are checked against the design early, and there are fewer surprises once construction starts.',
      },
      {
        q: 'Can you work in an office that stays open?',
        a: 'Yes. We plan the work in phases and can schedule noisy work outside office hours, so your team can keep working during the renovation.',
      },
    ],
    projects: [
      'dereja-office-interior-partition-work',
      'corporate-office-interior-finishing-bole',
      'modern-hospital-design-addis',
    ],
  },
  'furniture-production': {
    faqs: [
      {
        q: 'How much do office partitions cost in Ethiopia?',
        a: 'Our 2026 rates in Addis Ababa: gypsum board partitions about 3,000 ETB per m², aluminium single-glass partitions about 14,500 ETB per m², frameless tempered glass about 15,500 ETB per m², and double-glazed sound-proof glass about 16,500 ETB per m². Glass doors are about 8,500 ETB each.',
      },
      {
        q: 'Glass or gypsum: which partition should I choose?',
        a: 'Glass keeps the office bright and open and suits meeting rooms and manager offices. Gypsum is cheaper and gives more privacy and wall space for storage and screens. Most offices use both. Our guide "Glass vs Gypsum Partitions" compares them in detail.',
      },
      {
        q: 'How much does office furniture cost?',
        a: 'Typical 2026 prices: a 2-seater workstation about 24,000 ETB, a 4-seater about 42,000 ETB, mesh office chairs 6,500 to 9,500 ETB, and an executive desk about 42,000 ETB. Custom sizes and finishes are quoted per project.',
      },
    ],
    projects: [
      'modern-open-interior-design-bole',
      'modern-sales-office-partition-kazanchis',
      'coffee-export-company-interior-addis',
    ],
  },
  'branding-signage': {
    faqs: [
      {
        q: 'How much does office branding cost?',
        a: 'Our 2026 rates: acrylic logo signs about 4,800 ETB per m², and frosted (sandblasted) film for glass partitions about 1,200 ETB per m². Film with your logo or pattern also gives meeting rooms privacy.',
      },
      {
        q: 'Can you put our logo on glass partitions?',
        a: 'Yes. We apply frosted or printed film with your logo, patterns or a privacy band. It is cheap to replace if your branding changes.',
      },
    ],
    projects: [
      'schneider-electric-showroom-interior',
      'corporate-office-lobby-interior-bole',
      'show-room-interior-design-addis',
    ],
  },
  technology: {
    faqs: [
      {
        q: 'Do you install data cabling and lighting?',
        a: 'Yes. We plan data points, power sockets and lighting together with the layout, so cables run inside partitions and ceilings rather than across the floor. Typical 2026 rates: data points about 650 ETB each, 60×60 LED panels about 1,800 ETB each.',
      },
      {
        q: 'Can you set up meeting rooms for video calls?',
        a: 'Yes. We plan screen positions, cable routes, lighting and acoustic finishes so that video meetings look and sound clear.',
      },
    ],
    projects: [
      'tech-startup-open-plan-office-addis',
      'modern-workshop-interior-addis',
      'corporate-office-interior-finishing-addis',
    ],
  },
  'project-management': {
    faqs: [
      {
        q: 'What does an office renovation include?',
        a: 'Usually new partitions, false ceilings, lighting, flooring, painting and furniture. Typical 2026 rates: gypsum false ceilings about 2,800 ETB per m², SPC flooring about 2,500 ETB per m², carpet tiles about 4,500 ETB per m², and painting about 200 ETB per m².',
      },
      {
        q: 'Who manages the site during the renovation?',
        a: 'A Duka site manager runs the work day to day, coordinates suppliers and reports progress to you, so you have one person to call.',
      },
    ],
    projects: [
      'vision-fund-microfinance-office-design',
      'corporate-office-interior-finishing-addis',
      'real-estate-sales-office-interior-addis',
    ],
  },
};
