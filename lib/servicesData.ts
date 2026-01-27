// lib/servicesData.ts

export type Service = {
  title: string;
  slug: string;
  shortDesc: string;
  longDesc: string;
  features?: string[];
  image?: string;
  processSteps?: {
    title: string;
    description: string;
  }[];
  whyChooseUs?: string[];
};

export const services: Service[] = [
  {
    title: 'Interior Design',
    slug: 'interior-design',
    shortDesc: 'The best interior design in Addis Ababa, creating functional and beautiful office spaces.',
    longDesc: `At Duka Interiors, we specialize in professional office interior design and strategic space planning in Addis Ababa. We craft innovative and highly functional workspaces that propel your business forward. In today's dynamic Ethiopian market, a well-designed office is a strategic asset that significantly enhances employee productivity. Our expert team provides the best interior design in Addis Ababa, combining global trends with local expertise to create commercial environments tailored to your brand identity. From initial concept to final layout, we ensure every square meter of your office space is optimized for success.`,
    features: [
      'Space planning & zoning',
      'Material & finish curation',
      'Brand-aligned design language',
      '3D visualization & mood boards'
    ],
    image: '/images/services/interior-design-hero.webp',
    processSteps: [
      {
        title: 'Consultation',
        description: 'We begin with an in-depth consultation to understand your brand, goals, and spatial requirements in the context of Addis Ababa.'
      },
      {
        title: 'Concept Development',
        description: 'Our designers create mood boards and initial concepts that translate your vision into a visual design language.'
      },
      {
        title: 'Spatial Planning',
        description: 'We optimize your floor plan for maximum efficiency, ensuring workflow and movement are prioritized.'
      },
      {
        title: 'Final Design & 3D',
        description: 'You receive high-resolution 3D renders and a detailed material palette for final approval.'
      }
    ],
    whyChooseUs: [
      '9+ years of local design expertise',
      'Data-driven space planning',
      'Seamless transition from design to construction'
    ]
  },
  {
    title: 'Design+Build',
    slug: 'design-build',
    shortDesc: 'The best Design and Build firm in Addis Ababa—merging design and construction for absolute accountability.',
    longDesc: `Duka Interiors offers a comprehensive 'Design+Build' model, providing clients in Addis Ababa with a single point of responsibility for their entire project. This integrated approach eliminates traditional gaps between separate designers and contractors. By handling both the creative vision and the technical construction, we ensure the final result perfectly matches the initial design. For businesses in Ethiopia, this means faster project delivery and the peace of mind that comes from total accountability. We are known for delivering the best interior design and construction services in Addis Ababa with full transparency.`,
    features: [
      'Single point of responsibility',
      'Fixed-price transparency',
      'Accelerated project timelines',
      'Unified design & engineering teams'
    ],
    image: '/images/services/design-build-hero.webp',
    processSteps: [
      {
        title: 'Unified Briefing',
        description: 'We align your design goals with construction feasibility from day one.'
      },
      {
        title: 'Integrated Pre-Construction',
        description: 'Our builders work alongside designers to finalize costs before a single stone is moved.'
      },
      {
        title: 'On-Site Execution',
        description: 'Our dedicated site managers oversee the build, ensuring every design detail is realized perfectly.'
      },
      {
        title: 'Seamless Handover',
        description: 'We deliver a fully finished, ready-to-use space with all systems tested and verified.'
      }
    ],
    whyChooseUs: [
      'Zero coordination gaps between design and build',
      'Fixed-cost guarantees—no hidden surprises',
      'Faster occupancy compared to traditional methods'
    ]
  },
  {
    title: 'Office Partitioning & Furniture',
    slug: 'furniture-production',
    shortDesc: 'Professional office partitioning in Addis Ababa and custom furniture production.',
    longDesc: `Finding high-quality office partitioning in Addis Ababa is essential for a productive workspace. Duka Interiors provides bespoke office partitioning and custom furniture production services specifically designed for your workflow. We design and manufacture bespoke desks, storage units, and collaboration pods. Our specialized office partitioning in Addis Ababa includes acoustic solutions and modern glass framing to maximize efficiency. By integrating furniture directly into our spatial designs and managing the production locally in Ethiopia, we ensure a perfect fit that off-the-shelf furniture simply cannot provide.`,
    features: [
      'Bespoke workstation design',
      'Ergonomic seating solutions',
      'Integrated cable management',
      'Local quality-controlled manufacturing'
    ],
    image: '/images/services/furniture-hero.webp',
    processSteps: [
      {
        title: 'Usage Analysis',
        description: 'Determining the specific functional needs of each department and team member.'
      },
      {
        title: 'Bespoke Design',
        description: 'Creating detailed designs for custom pieces that match the overall interior aesthetic.'
      },
      {
        title: 'Manufacturing & QC',
        description: 'Overseeing the production of furniture with strict quality control in local workshops.'
      }
    ],
    whyChooseUs: [
      'Custom designs you won’t find anywhere else',
      'Focus on long-term ergonomic health',
      'Perfect integration with electrical and data systems'
    ]
  },
  {
    title: 'Branding and Signage',
    slug: 'branding-signage',
    shortDesc: 'Interior decoration in Addis Ababa through color, graphics, and custom corporate signage.',
    longDesc: `At Duka Interiors, we believe your office should be your best brand ambassador. Our Branding and Signage service in Addis Ababa focuses on weaving your company’s DNA into every corner of the workspace. We use environmental graphics, custom signage, and professional interior decoration to tell your brand story. This creates a powerful impression on visitors and fosters a sense of pride for employees. From the reception area to the breakroom, we ensure your physical environment communicates your values and culture with the best interior decoration standards in Ethiopia.`,
    features: [
      'Environmental graphics & murals',
      'Custom corporate signage',
      'Color psychology & brand palettes',
      'Experiential customer journeys'
    ],
    image: '/images/services/branding-hero.webp',
    processSteps: [
      {
        title: 'Brand Discovery',
        description: 'We dive deep into your brand guidelines, mission, and company culture.'
      },
      {
        title: 'Experience Mapping',
        description: 'Defining how employees and visitors should feel as they move through the space.'
      },
      {
        title: 'Visual Integration',
        description: 'Applying brand elements strategically through materials, lighting, and graphics.'
      }
    ],
    whyChooseUs: [
      'Expertise in translating 2D brands into 3D spaces',
      'Strategic focus on corporate culture',
      'High-impact visual solutions'
    ]
  },
  {
    title: 'Technology Integration',
    slug: 'technology',
    shortDesc: 'Smart office integration in Addis Ababa featuring intelligent lighting, networking, and security.',
    longDesc: `Duka Interiors delivers future-ready workplace technology for businesses in Addis Ababa. We specialize in the seamless integration of essential systems: intelligent human-centric lighting, high-speed networking infrastructure, and professional audio-visual (AV) systems. In the evolving Ethiopian corporate landscape, technology should be invisible and intuitive. From designing robust server rooms in Addis Ababa to installing automated security access controls, we ensure your office is equipped for the demands of tomorrow. Our approach prioritizes scalability, making us a leader in smart office technology and interior renovation in Ethiopia.`,
    features: [
      'Intelligent LED lighting & automation',
      'Robust networking & IT infrastructure',
      'Professional AV & video conferencing',
      'CCTV & biometric security systems'
    ],
    image: '/images/services/technology-hero.webp',
    processSteps: [
      {
        title: 'Tech Audit & Infrastructure Review',
        description: 'We assess your networking needs, security requirements, and AV goals to design a cohesive technology backbone for your Addis Ababa office.'
      },
      {
        title: 'System Engineering',
        description: 'Our team maps out cable runs, server locations, and sensor placements to ensure maximum coverage and zero interference.'
      },
      {
        title: 'Integrated Installation',
        description: 'We install all hardware—from smart switches and Wi-Fi access points to security cameras and AV displays—ensuring clean, hidden wiring.'
      },
      {
        title: 'Testing & User Onboarding',
        description: 'Rigorous stress-testing of networks and security systems, followed by training your team on how to manage their new smart office.'
      }
    ],
    whyChooseUs: [
      'End-to-end integration of IT, Security, and AV',
      'Scalable solutions for growing Addis Ababa businesses',
      'Focus on reliability and low-maintenance hardware'
    ]
  },
  {
    title: 'Office Renovation & PM',
    slug: 'project-management',
    shortDesc: 'Professional office renovation in Addis Ababa and dedicated project management.',
    longDesc: `Successful project delivery in Addis Ababa's construction environment requires expert oversight. Our Office Renovation and Project Management service provides you with a dedicated advocate who manages the complex logistics of your fit-out. From coordinating subcontractors for office renovation in Ethiopia to conducting rigorous quality inspections, we handle the stress so you can focus on your business. We maintain a laser focus on the three pillars of success: Quality, Time, and Budget, ensuring we remain the best interior design company in Addis Ababa for turnkey renovations.`,
    features: [
      'Weekly progress reporting',
      'Real-time budget tracking',
      'Quality assurance checkpoints',
      'Post-handover support'
    ],
    image: '/images/services/project-management-hero.webp',
    processSteps: [
      {
        title: 'Briefing & Planning',
        description: 'We start with a detailed briefing to understand your goals, timeline, and budget, then create a comprehensive project plan.'
      },
      {
        title: 'Coordination',
        description: 'We coordinate all contractors, suppliers, and stakeholders to ensure everyone is aligned and working towards the same goals.'
      },
      {
        title: 'Execution',
        description: 'We manage the day-to-day execution of the project, ensuring it stays on track, on budget, and to the highest quality standards.'
      },
      {
        title: 'Monitoring',
        description: 'We continuously monitor progress, address any issues proactively, and provide regular updates to keep you informed.'
      },
      {
        title: 'Handover',
        description: 'We conduct a final walkthrough with you, ensure all deliverables are met, and provide post-handover support to ensure your satisfaction.'
      }
    ],
    whyChooseUs: [
      'Certified project managers with local expertise',
      'Transparent reporting and real-time updates',
      'Zero stress — we handle the details so you can focus on your business'
    ]
  }
];