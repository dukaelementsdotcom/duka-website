// lib/servicesData.ts

export type Service = {
  title: string;
  slug: string; // must be lowercase, hyphenated, no spaces or special chars
  shortDesc: string;
  longDesc: string;
  processSteps?: { title: string; description: string }[];
  whyChooseUs?: string[];
};

export const services: Service[] = [
  {
    title: 'Residential Interiors',
    slug: 'residential-interiors',
    shortDesc: 'Tailored living spaces that reflect your personality and lifestyle.',
    longDesc:
      'From concept to completion, we craft homes that balance aesthetics, comfort, and functionality. Our residential projects include apartments, villas, and penthouses across Addis Ababa.',
    processSteps: [
      {
        title: 'Discovery & Briefing',
        description: 'We begin with an in-depth consultation to understand your vision, needs, and budget.'
      },
      {
        title: 'Concept Design',
        description: 'Mood boards, spatial plans, and material palettes bring your dream space to life.'
      },
      {
        title: 'Execution & Build',
        description: 'Our in-house team manages every detail—carpentry, lighting, finishes—with precision.'
      }
    ],
    whyChooseUs: [
      'End-to-end project management',
      'Transparent fixed pricing',
      'Local craftsmanship, global standards'
    ]
  },
  {
    title: 'Commercial Interiors',
    slug: 'commercial-interiors',
    shortDesc: 'Functional, inspiring spaces for offices, retail, and hospitality.',
    longDesc:
      'We design commercial environments that enhance productivity, customer experience, and brand identity—on time and within budget.',
    processSteps: [
      {
        title: 'Space Audit',
        description: 'We analyze workflow, foot traffic, and brand alignment.'
      },
      {
        title: 'Design Development',
        description: '3D visuals and technical drawings ensure clarity before build.'
      },
      {
        title: 'Turnkey Delivery',
        description: 'Minimal disruption, maximum impact—ready for business from day one.'
      }
    ],
    whyChooseUs: [
      'Business-first design approach',
      'Fast-track delivery options',
      'Post-handover support'
    ]
  },
  {
    title: 'Hospitality Design',
    slug: 'hospitality-design',
    shortDesc: 'Elevated guest experiences through thoughtful interior architecture.',
    longDesc:
      'Hotels, lounges, and restaurants designed to captivate guests and drive revenue—blending Ethiopian character with contemporary luxury.',
    processSteps: [
      {
        title: 'Brand Immersion',
        description: 'We study your audience, service model, and cultural context.'
      },
      {
        title: 'Atmosphere Crafting',
        description: 'Lighting, acoustics, and materiality shape unforgettable moments.'
      },
      {
        title: 'Operational Integration',
        description: 'Back-of-house efficiency meets front-of-house elegance.'
      }
    ],
    whyChooseUs: [
      'Guest-centric layouts',
      'Durable, high-end finishes',
      'Seamless F&B integration'
    ]
  },
  {
    title: 'Renovation & Remodeling',
    slug: 'renovation-remodeling',
    shortDesc: 'Breathe new life into existing spaces with smart, stylish upgrades.',
    longDesc:
      'Whether it’s a dated apartment or an aging office, we transform underperforming interiors into modern, efficient environments—without the hassle of relocation.',
    whyChooseUs: [
      'Minimal downtime',
      'Structural integrity preserved',
      'Future-proof designs'
    ]
  },
  {
    title: 'Custom Furniture & Joinery',
    slug: 'custom-furniture',
    shortDesc: 'Handcrafted pieces built for your space, style, and story.',
    longDesc:
      'From statement reception desks to bespoke wardrobes, our workshop creates functional art that fits perfectly—down to the millimeter.',
    whyChooseUs: [
      'Ethiopian hardwoods & sustainable materials',
      'Precision engineering',
      'Lifetime craftsmanship guarantee'
    ]
  },
  {
    title: 'Project Consultation',
    slug: 'project-consultation',
    shortDesc: 'Expert guidance before you commit to a full build.',
    longDesc:
      'Get a clear roadmap, realistic budget, and design direction in just two weeks—ideal for clients evaluating next steps.',
    whyChooseUs: [
      'No-obligation initial meeting',
      'Detailed feasibility report',
      'Direct access to lead designers'
    ]
  }
];