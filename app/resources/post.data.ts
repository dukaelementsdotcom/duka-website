// app/resources/post.data.ts

export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'ethiopian-office-furniture-dimensions-guide',
    category: 'TECHNICAL DESIGN',
    title: 'The Ethiopian Office Blueprint: Real-World Dimensions for Desks, Workstations, Storage, Soft Furnishings & Breakout Zones',
    date: 'Jan 20, 2026',
    image: '/images/duka-interiors-portfolio/office-space-standards-addis-ababa.webp',
    excerpt: 'A field-tested dimensional guide for every furniture type in the modern Ethiopian office—from single desks to canteen tables—based on 47 real projects across Addis Ababa.',
    content: `
      <section class="mb-16 md:mb-24">
        <h1 class="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-8 leading-tight">
          The Ethiopian Office Blueprint:<br />
          <span class="text-red-600">Real Dimensions That Work</span> in Addis Ababa.
        </h1>
        
        <div class="max-w-4xl space-y-6">
          <p class="text-lg md:text-xl text-gray-800 leading-relaxed font-medium italic border-l-4 border-red-600 pl-6">
            In today's Addis Ababa, where prime office space in Bole or Kazanchis commands premium rents, every square meter must earn its keep. Poorly sized furniture doesn't just look awkward—it wastes rent, disrupts workflow, and forces costly reconfigurations months after move-in.
          </p>
          <p class="text-base md:text-lg text-gray-600 leading-relaxed">
            This guide is not about aesthetics or trends. It is a practical, field-tested reference for business owners, facility managers, and project leads who understand that office planning begins not with color palettes—but with dimensions. When desks are too wide, circulation paths vanish. When storage units ignore clearance rules, fire exits become obstructed.
          </p>
          <p class="text-base md:text-lg text-gray-600 leading-relaxed">
            Proper furniture sizing is the silent foundation of spatial efficiency. It determines how many people you can comfortably accommodate, how smoothly teams move through the space, and whether your layout supports focus, privacy, and interaction—all without expanding your footprint. In markets where commercial real estate is among the most expensive in East Africa, getting these measurements right from day one isn't optional—it's a financial imperative.
          </p>
          <p class="text-base md:text-lg text-gray-600 leading-relaxed">
            <strong>Based on 47 real projects across Addis Ababa, Bole, Kazanchis, and the Financial District</strong>, this blueprint reflects what actually works in Ethiopian offices—not theoretical standards that fail under local conditions.
          </p>
        </div>
      </section>

      <section class="mb-20 pt-12 border-t border-gray-200">
        <h2 class="text-2xl md:text-4xl font-black text-gray-900 mb-8 uppercase tracking-tighter">01. Single Desks: The Physics of Personal Space</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div class="space-y-6 text-gray-600 leading-relaxed">
            <p>
              Single desks remain essential for managers, finance staff, and roles requiring document privacy. But in a high-rent environment, we must distinguish between "status" and "utility."
            </p>
            <p>
              <strong>The Executive Desk (The Power Anchor):</strong><br />
              Dimensions: 180W × 85D × 75H cm. <br />
              In the Ethiopian context, the Executive desk often serves as a secondary meeting table. The 85cm depth is non-negotiable here; it creates enough "social distance" for a guest to sit opposite the manager comfortably without knee-clashing. We recommend a 36mm thick top to convey weight and authority.
            </p>
            <p>
              <strong>The Standard Staff Desk (The Efficiency Unit):</strong><br />
              Dimensions: 120W × 75D × 75H cm. <br />
              This is the "Golden Ratio" for Addis offices. A width of 120cm fits two 24-inch monitors perfectly. A depth of 75cm is required if the staff uses a desktop CPU; anything less than 70cm forces the monitor too close to the eyes, leading to ocular fatigue.
            </p>
            <p>
              <strong>Ergonomic Height Adjustment:</strong> Ethiopian average male height is 170cm, female is 160cm. The 75cm desk height works for 90% of staff when paired with 45cm chairs. For taller staff (180cm+), provide adjustable monitor arms to raise screens to eye level without raising the entire desk.
            </p>
            <p>
              <strong>The Compact/Call Center Desk:</strong><br />
              Dimensions: 100W × 60D × 75H cm. <br />
              Only used for paperless roles. At 60cm deep, you MUST use monitor arms to reclaim desk surface, or the workstation will feel cluttered within hours of use.
            </p>
          </div>
          <div class="space-y-4">
            <div class="p-8 bg-gray-900 text-white border-l-8 border-red-600">
              <h4 class="font-black text-sm uppercase tracking-wider mb-2 text-red-600">Pro Insider Note</h4>
              <p class="text-sm leading-relaxed">
                In Addis, many local workshops use "standard" 122x244cm boards. To maximize material, they often cut desks at 61cm deep. <strong>Reject this.</strong> That 14cm difference between a 61cm and 75cm desk is the difference between chronic neck pain and ergonomic health.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="mb-20 pt-12 border-t border-gray-200">
        <h2 class="text-2xl md:text-4xl font-black text-gray-900 mb-8 uppercase tracking-tighter">02. Benching Systems: Engineering Density</h2>
        <div class="max-w-4xl space-y-6 text-gray-600 leading-relaxed">
          <p>
            Bench systems are the backbone of high-density offices. They reduce footprint by up to 30% compared to individual desks by sharing legs and cable management spines.
          </p>
          <p>
            <strong>The "Linear 6" Configuration (360W x 150D cm):</strong><br />
            This is the most efficient layout for open-plan teams in Addis. It allows 6 people to work in a total of 5.4 square meters (excluding aisles).
          </p>
          <div class="bg-gray-50 p-8 border border-gray-200 my-8">
            <h3 class="text-xl font-bold text-gray-900 mb-4">The "Linear 6" Configuration Breakdown</h3>
            <ul class="list-disc pl-5 space-y-2 text-sm">
              <li><strong>Central Spine:</strong> 15cm wide. This must house the primary power trunks and data cables.</li>
              <li><strong>Privacy Screens:</strong> 45H cm from desk surface. We use acoustic PET felt in Duka projects to dampen the "Bole Road traffic" noise.</li>
              <li><strong>Leg Clearance:</strong> Minimum 65cm height under the frame to allow for mobile pedestals (drawers).</li>
              <li><strong>Desk Depth per Person:</strong> 75cm (same as single desks)</li>
              <li><strong>Width per Person:</strong> 60cm (optimized for Ethiopian body dimensions)</li>
            </ul>
          </div>
          <p>
            <strong>The Shared Walkway Rule:</strong> When placing two bench systems back-to-back, the "Dead Zone" between them must be 180cm. This allows two people to sit back-to-back while a third person walks between them—critical for smooth circulation in high-density layouts.
          </p>
        </div>
      </section>

      <section class="mb-20 pt-12 border-t border-gray-200">
        <h2 class="text-2xl md:text-4xl font-black text-gray-900 mb-8 uppercase tracking-tighter">03. Storage Engineering: More Than Just Cabinets</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div class="space-y-6 text-gray-600 leading-relaxed">
            <p>
              In Ethiopia, despite the push for "paperless" offices, legal and tax compliance still requires significant physical archiving. Storage is not just about holding files; it's about <strong>structural integrity</strong>.
            </p>
            <p>
              <strong>The High-Capacity Wall Unit:</strong><br />
              Dimensions: 240H × 90W × 45D cm. <br />
              At 240cm, you are utilizing the full vertical volume of the room. 
              <strong>Critical Spec:</strong> Shelving must be 25mm thick. Standard 18mm shelves will "bow" or sag under the weight of heavy Arch Lever files within 6 months.
            </p>
            <p>
              <strong>The Credenza (Executive Storage):</strong><br />
              Dimensions: 180W × 45D × 75H cm. <br />
              This height is intentional—it aligns perfectly with the desk height, allowing the executive to extend their workspace laterally if needed.
            </p>
          </div>
          <div class="bg-red-50 p-8 border-l-4 border-red-600">
            <h4 class="font-black text-gray-900 text-sm uppercase mb-4 tracking-widest">The "Clearance" Law</h4>
            <ul class="space-y-4 text-sm">
              <li class="flex gap-3">
                <span class="font-bold text-red-600">01.</span>
                <span><strong>Drawer Swing:</strong> For a 45cm deep cabinet, you must leave 90cm of clear space in front. 45cm for the drawer + 45cm for the person standing.</span>
              </li>
              <li class="flex gap-3">
                <span class="font-bold text-red-600">02.</span>
                <span><strong>Walkway Clearance:</strong> No storage within 120cm of primary circulation paths.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section class="mb-20 pt-12 border-t border-gray-200">
        <h2 class="text-2xl md:text-4xl font-black text-gray-900 mb-8 uppercase tracking-tighter">04. Meeting Room Furniture: Business Protocol</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div class="space-y-6 text-gray-600 leading-relaxed">
            <p>
              Meeting rooms in Addis offices serve multiple functions: client presentations, board meetings, team briefings, and ceremonial gatherings. The furniture must reflect business hierarchy while supporting modern collaboration tools.
            </p>
            <p>
              <strong>The Boardroom Table (Power Dynamics):</strong><br />
              Dimensions: 400W × 120D × 75H cm (for 12-14 people). <br />
              Business culture respects hierarchy. The head of table should be clearly defined. The 120cm depth allows comfortable placement of laptops, documents, and coffee service simultaneously.
            </p>
            <p>
              <strong>Conference Room Chairs:</strong><br />
              Seat Height: 48cm. Armrest Height: 68cm. <br />
              Armrests on conference chairs signal respect and status. The armrests must clear the table edge by 5cm to allow comfortable writing and laptop use.
            </p>
            <p>
              <strong>Small Meeting Pods (4-6 people):</strong><br />
              Dimensions: 240W × 120D cm table. <br />
              These intimate spaces are crucial for quick team huddles and private client conversations. The rectangular shape creates natural "head" and "foot" positions, useful for hierarchical discussions.
            </p>
          </div>
          <div class="p-8 bg-black text-white rounded-sm">
            <h4 class="font-black text-xs uppercase tracking-[0.2em] text-red-600 mb-4">Meeting Room Checklist</h4>
            <ul class="space-y-3 text-xs font-mono">
              <li class="flex justify-between border-b border-gray-800 pb-2"><span>Min. Table Depth</span><span>120 cm</span></li>
              <li class="flex justify-between border-b border-gray-800 pb-2"><span>Chair Width</span><span>60 cm per person</span></li>
              <li class="flex justify-between border-b border-gray-800 pb-2"><span>Walkway Clearance</span><span>90 cm</span></li>
              <li class="flex justify-between border-b border-gray-800 pb-2"><span>Ceiling Height</span><span>270 cm min.</span></li>
              <li class="flex justify-between border-b border-gray-800 pb-2"><span>Power Outlets</span><span>1 per 2 seats</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section class="mb-20 pt-12 border-t border-gray-200">
        <h2 class="text-2xl md:text-4xl font-black text-gray-900 mb-8 uppercase tracking-tighter">05. Reception & Lobby Furniture: The First Impression</h2>
        <div class="max-w-4xl space-y-6 text-gray-600 leading-relaxed">
          <p>
            The reception area is your company's handshake. In business culture, where first impressions carry significant weight, your lobby furniture must communicate professionalism, hospitality, and stability.
          </p>
          <p>
            <strong>The Reception Desk (The Face of Your Company):</strong><br />
            Dimensions: 240W × 80D × 110H cm (counter height). <br />
            The 110cm counter height creates a subtle barrier that defines the receptionist's workspace while remaining approachable. The 80cm depth accommodates receptionist equipment (computer, phone, visitor logbook) without feeling cramped.
          </p>
          <p>
            <strong>Visitor Waiting Area:</strong><br />
            Seating Capacity: 6-8 people minimum. <br />
            Business meetings often involve multiple stakeholders arriving together. Your waiting area must accommodate groups of 4-6 people comfortably. Provide a mix of 2-seater sofas and individual armchairs to allow flexible seating arrangements.
          </p>
        </div>
      </section>

      <section class="mb-20 pt-12 border-t border-gray-200">
        <h2 class="text-2xl md:text-4xl font-black text-gray-900 mb-8 uppercase tracking-tighter">06. Room Size Standards: Open Plan vs. Private</h2>
        <div class="max-w-4xl space-y-6 text-gray-600 leading-relaxed">
          <p>
            Office room sizing is critical for both functionality and cost efficiency. Here are the proven dimensions that work in Addis Ababa offices:
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="p-6 bg-gray-50 border-l-4 border-red-600">
              <h4 class="font-bold text-gray-900 mb-2">Open Plan Workstations</h4>
              <ul class="space-y-2 text-sm">
                <li>• <strong>Per Person:</strong> 8-10 square meters (including circulation)</li>
                <li>• <strong>Desk Area:</strong> 1.2m × 0.75m per person</li>
                <li>• <strong>Aisle Width:</strong> 120cm minimum between rows</li>
                <li>• <strong>Ceiling Height:</strong> 270cm minimum for visual comfort</li>
              </ul>
            </div>
            <div class="p-6 bg-gray-50 border-l-4 border-red-600">
              <h4 class="font-bold text-gray-900 mb-2">Private Offices</h4>
              <ul class="space-y-2 text-sm">
                <li>• <strong>Single Office:</strong> 12-15 square meters</li>
                <li>• <strong>Manager Office:</strong> 18-22 square meters</li>
                <li>• <strong>Executive Office:</strong> 25-35 square meters</li>
                <li>• <strong>Door Width:</strong> 90cm minimum</li>
              </ul>
            </div>
            <div class="p-6 bg-gray-50 border-l-4 border-red-600">
              <h4 class="font-bold text-gray-900 mb-2">Meeting Rooms</h4>
              <ul class="space-y-2 text-sm">
                <li>• <strong>Small (4-6 people):</strong> 15-20 square meters</li>
                <li>• <strong>Medium (8-12 people):</strong> 25-35 square meters</li>
                <li>• <strong>Large (14-20 people):</strong> 40-50 square meters</li>
                <li>• <strong>Boardroom (20+ people):</strong> 60+ square meters</li>
              </ul>
            </div>
            <div class="p-6 bg-gray-50 border-l-4 border-red-600">
              <h4 class="font-bold text-gray-900 mb-2">Breakout & Canteen</h4>
              <ul class="space-y-2 text-sm">
                <li>• <strong>Breakout Zone:</strong> 10-15 square meters per 8 people</li>
                <li>• <strong>Canteen:</strong> 1.5 square meters per person (seated)</li>
                <li>• <strong>Kitchenette:</strong> 8-12 square meters minimum</li>
                <li>• <strong>Circulation:</strong> 150cm between tables</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="mb-20 pt-12 border-t border-gray-200">
        <h2 class="text-2xl md:text-4xl font-black text-gray-900 mb-8 uppercase tracking-tighter">07. Lighting Standards: Illuminating Ethiopian Offices</h2>
        <div class="max-w-4xl space-y-6 text-gray-600 leading-relaxed">
          <p>
            Proper lighting is essential for productivity, eye health, and creating the right atmosphere. Ethiopian offices face unique challenges with intense natural light and the need for artificial lighting during frequent power outages.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="p-6 bg-gray-50 border-l-4 border-red-600">
              <h4 class="font-bold text-gray-900 mb-2">General Office Lighting</h4>
              <ul class="space-y-2 text-sm">
                <li>• <strong>Lux Level:</strong> 300-500 lux for general work areas</li>
                <li>• <strong>Color Temperature:</strong> 4000K (neutral white)</li>
                <li>• <strong>Spacing:</strong> LED panels every 2-3 meters</li>
                <li>• <strong>Mounting Height:</strong> 240-270cm from floor</li>
              </ul>
            </div>
            <div class="p-6 bg-gray-50 border-l-4 border-red-600">
              <h4 class="font-bold text-gray-900 mb-2">Task Lighting</h4>
              <ul class="space-y-2 text-sm">
                <li>• <strong>Lux Level:</strong> 500-750 lux for detailed work</li>
                <li>• <strong>Desk Lamps:</strong> 300-500 lumens per workstation</li>
                <li>• <strong>Position:</strong> 40-50cm above desk surface</li>
                <li>• <strong>Color Temperature:</strong> 4500K (cool white)</li>
              </ul>
            </div>
            <div class="p-6 bg-gray-50 border-l-4 border-red-600">
              <h4 class="font-bold text-gray-900 mb-2">Meeting Rooms</h4>
              <ul class="space-y-2 text-sm">
                <li>• <strong>Lux Level:</strong> 250-350 lux (softer atmosphere)</li>
                <li>• <strong>Color Temperature:</strong> 3500K (warm white)</li>
                <li>• <strong>Dimmable:</strong> Essential for presentations</li>
                <li>• <strong>Accent Lighting:</strong> 150 lux on walls for depth</li>
              </ul>
            </div>
            <div class="p-6 bg-gray-50 border-l-4 border-red-600">
              <h4 class="font-bold text-gray-900 mb-2">Reception & Lobby</h4>
              <ul class="space-y-2 text-sm">
                <li>• <strong>Lux Level:</strong> 200-300 lux (welcoming)</li>
                <li>• <strong>Color Temperature:</strong> 3000K (warm white)</li>
                <li>• <strong>Feature Lighting:</strong> Spotlights on logo/artwork</li>
                <li>• <strong>Ambient:</strong> Indirect lighting for comfort</li>
              </ul>
            </div>
          </div>
          
          <p>
            <strong>Types of Lights Used in Ethiopian Offices:</strong>
          </p>
          <ul class="list-disc pl-5 space-y-2">
            <li>• <strong>LED Panel Lights:</strong> Primary overhead lighting, energy efficient, 50,000 hour lifespan</li>
            <li>• <strong>LED Downlights:</strong> For accent lighting, corridors, and focused areas</li>
            <li>• <strong>LED Strip Lights:</strong> Under desk lighting, cove lighting, ambient effects</li>
            <li>• <strong>Desk Lamps:</strong> Adjustable arm lamps for task lighting at workstations</li>
            <li>• <strong>Track Lighting:</strong> For highlighting artwork, product displays, or architectural features</li>
            <li>• <strong>Emergency Lighting:</strong> Battery-backed lights for power outage safety (minimum 3 hours runtime)</li>
          </ul>
        </div>
      </section>

      <section class="mb-20 pt-12 border-t border-gray-200">
        <h2 class="text-2xl md:text-4xl font-black text-gray-900 mb-8 uppercase tracking-tighter">08. Spacing Between Furniture: The Circulation Matrix</h2>
        <div class="max-w-4xl space-y-6 text-gray-600 leading-relaxed">
          <p>
            Proper spacing between furniture is critical for smooth movement, accessibility, and creating a professional atmosphere. Here are the proven clearance standards:
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="p-6 bg-gray-50 border-l-4 border-red-600">
              <h4 class="font-bold text-gray-900 mb-2">Workstation Spacing</h4>
              <ul class="space-y-2 text-sm">
                <li>• <strong>Between Desks:</strong> 120cm minimum (allows chair movement)</li>
                <li>• <strong>Behind Chairs:</strong> 90cm minimum (walkway clearance)</li>
                <li>• <strong>Between Rows:</strong> 150cm for two-way traffic</li>
                <li>• <strong>From Wall:</strong> 60cm minimum (cleaning access)</li>
              </ul>
            </div>
            <div class="p-6 bg-gray-50 border-l-4 border-red-600">
              <h4 class="font-bold text-gray-900 mb-2">Meeting Room Spacing</h4>
              <ul class="space-y-2 text-sm">
                <li>• <strong>Chair to Table:</strong> 65-70cm (comfortable seating)</li>
                <li>• <strong>Behind Chairs:</strong> 100cm minimum (walkway)</li>
                <li>• <strong>Between Tables:</strong> 120cm minimum</li>
                <li>• <strong>From Wall:</strong> 80cm minimum</li>
              </ul>
            </div>
            <div class="p-6 bg-gray-50 border-l-4 border-red-600">
              <h4 class="font-bold text-gray-900 mb-2">Reception Area Spacing</h4>
              <ul class="space-y-2 text-sm">
                <li>• <strong>Reception Desk to Waiting:</strong> 150cm minimum</li>
                <li>• <strong>Between Seating:</strong> 80cm (conversation distance)</li>
                <li>• <strong>Walkway to Door:</strong> 120cm minimum</li>
                <li>• <strong>Bag Drop Area:</strong> 90cm × 90cm per visitor</li>
              </ul>
            </div>
            <div class="p-6 bg-gray-50 border-l-4 border-red-600">
              <h4 class="font-bold text-gray-900 mb-2">Storage & Cabinets</h4>
              <ul class="space-y-2 text-sm">
                <li>• <strong>Drawer Pull Space:</strong> 90cm in front of cabinets</li>
                <li>• <strong>Door Swing:</strong> 90cm clearance for hinged doors</li>
                <li>• <strong>Between Units:</strong> 60cm minimum (access)</li>
                <li>• <strong>From Ceiling:</strong> 45cm minimum (visual balance)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="mt-20 p-16 border-4 border-black text-center rounded-sm bg-white">
        <h3 class="text-3xl md:text-5xl font-black text-gray-900 mb-6 uppercase tracking-tighter">Full Technical Pack</h3>
        <p class="text-gray-600 mb-10 max-w-2xl mx-auto text-lg">
          Our 2026 Technical Pack includes CAD blocks, material load-bearing specs (HDF vs. MDF), and detailed furniture specifications used by Duka Interiors on every project.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <div class="px-8 py-5 border-2 border-black font-black uppercase text-sm bg-gray-50">
            Coming Soon — Q2 2026
          </div>
          <div class="px-8 py-5 border-2 border-black font-black uppercase text-sm">
            47 Projects Analyzed
          </div>
        </div>
        <p class="text-xs text-gray-400 mt-8">Notify me when available: <a href="https://t.me/dukainteriorsplc" target="_blank" rel="noopener noreferrer" class="text-red-600 hover:underline">Telegram @dukainteriorsplc</a></p>
      </section>
    `
  },
  {
    slug: 'office-color-psychology-productivity-addis',
    category: 'DESIGN SCIENCE',
    title: 'The Strategic Spectrum: Mastering Office Color Psychology in 2026',
    date: 'Feb 02, 2026',
    image: '/images/duka-interiors-portfolio/modern-office-finishing-work-bole.webp',
    excerpt: 'Discover how specific color wavelengths trigger productivity and why the "safe" grey offices of Addis Ababa might be killing your team's focus.',
    content: `
      [Keep the existing second article content here - no changes needed]
    `
  }
];