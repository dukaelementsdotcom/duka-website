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
            In today’s Addis Ababa, where prime office space in Bole or Kazanchis commands premium rents, every square meter must earn its keep. Poorly sized furniture doesn’t just look awkward—it wastes rent, disrupts workflow, and forces costly reconfigurations months after move-in.
          </p>
          <p class="text-base md:text-lg text-gray-600 leading-relaxed">
            This guide is not about aesthetics or trends. It is a practical, field-tested reference for business owners, facility managers, and project leads who understand that office planning begins not with color palettes—but with dimensions. When desks are too wide, circulation paths vanish. When storage units ignore clearance rules, fire exits become obstructed.
          </p>
          <p class="text-base md:text-lg text-gray-600 leading-relaxed">
            Proper furniture sizing is the silent foundation of spatial efficiency. It determines how many people you can comfortably accommodate, how smoothly teams move through the space, and whether your layout supports focus, privacy, and interaction—all without expanding your footprint. In markets where commercial real estate is among the most expensive in East Africa, getting these measurements right from day one isn’t optional—it’s a financial imperative.
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
          <div class="bg-gray-50 p-8 border border-gray-200 my-8">
            <h3 class="text-xl font-bold text-gray-900 mb-4">The "Linear 6" Configuration (360W x 150D cm)</h3>
            <p class="mb-4">This is the most efficient layout for open-plan teams in Addis. It allows 6 people to work in a total of 5.4 square meters (excluding aisles).</p>
            <ul class="list-disc pl-5 space-y-2 text-sm">
              <li><strong>Central Spine:</strong> 15cm wide. This must house the primary power trunks and data cables.</li>
              <li><strong>Privacy Screens:</strong> 45H cm from desk surface. We use acoustic PET felt in Duka projects to dampen the "Bole Road traffic" noise.</li>
              <li><strong>Leg Clearance:</strong> Minimum 65cm height under the frame to allow for mobile pedestals (drawers).</li>
            </ul>
          </div>
          <p>
            <strong>The Shared Walkway Rule:</strong> When placing two bench systems back-to-back, the "Dead Zone" between them must be 180cm. This allows two people to sit back-to-back while a third person walks between them—critical for fire safety compliance in high-rise buildings like those in Kazanchis.
          </p>
        </div>
      </section>
      <section class="mb-20 pt-12 border-t border-gray-200">
        <h2 class="text-2xl md:text-4xl font-black text-gray-900 mb-8 uppercase tracking-tighter">03. Storage Engineering: More Than Just Cabinets</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div class="space-y-6 text-gray-600 leading-relaxed">
            <p>
              In Ethiopia, despite the push for "paperless" offices, legal and tax compliance still requires significant physical archiving. Storage is not just about holding files; it’s about **structural integrity**.
            </p>
            <p>
              <strong>The High-Capacity Wall Unit:</strong><br />
              Dimensions: 240H × 90W × 45D cm. <br />
              At 240cm, you are utilizing the full vertical volume of the room. 
              <strong>Critical Spec:</strong> In Addis Ababa’s fluctuating humidity, shelving must be 25mm thick. Standard 18mm shelves will "bow" or sag under the weight of heavy Arch Lever files within 6 months.
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
                <span><strong>Seismic Anchoring:</strong> In high-rise buildings (10+ floors), all units over 160cm must be wall-anchored to prevent tipping.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section class="mb-20 pt-12 border-t border-gray-200">
        <h2 class="text-2xl md:text-4xl font-black text-gray-900 mb-8 uppercase tracking-tighter">04. The IT & Server Vault</h2>
        <div class="max-w-4xl space-y-6 text-gray-600 leading-relaxed">
          <p>Often overlooked by interior designers, the server room is the brain of the company. If the dimensions are wrong, the hardware fails.</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50 p-8 rounded-sm">
            <div>
              <h4 class="font-bold text-gray-900 mb-2">Physical Dimensions</h4>
              <p class="text-sm">Minimum footprint: 200 x 200 cm. This allows a standard 19-inch rack to sit in the center with 60cm "walk-around" clearance for technicians to access the rear wiring.</p>
            </div>
            <div>
              <h4 class="font-bold text-gray-900 mb-2">Climate & Power</h4>
              <p class="text-sm">Door height must be 210cm to allow rack entry. No windows allowed. Must have a dedicated 1.5hp AC unit—standard office ventilation will not suffice for Ethiopian power heat-dissipation.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="mb-20 pt-12 border-t border-gray-200">
        <h2 class="text-2xl md:text-4xl font-black text-gray-900 mb-8 uppercase tracking-tighter">05. Soft Seating & The Physics of Comfort</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div class="space-y-6 text-gray-600 leading-relaxed">
            <p>
              Visitor seating in an Addis lobby creates the first impression. But comfort is a mathematical formula of seat-to-back ratios.
            </p>
            <p>
              <strong>The Reception Sofa:</strong><br />
              Seat Height: 42cm. Seat Depth: 55cm. <br />
              If the seat is deeper than 60cm, visitors will "sink" in, making it difficult to stand up professionally when called for a meeting. We use high-density 32kg/m³ foam to ensure the sofa retains its shape after years of use.
            </p>
            <p>
              <strong>The Collaborative Lounge Chair:</strong><br />
              Dimensions: 80W x 80D cm. <br />
              These require a "Circulation Ring" of 120cm around them. Placing lounge chairs too close to a doorway creates a psychological barrier that prevents people from actually using them.
            </p>
          </div>
          <div class="space-y-4">
             
             <p class="text-xs italic text-gray-400 mt-2 text-center italic">Figure 3: Reception Clearance & Ergonomic Seat Ratios</p>
          </div>
        </div>
      </section>
      <section class="mb-20 pt-12 border-t border-gray-200">
        <h2 class="text-2xl md:text-4xl font-black text-gray-900 mb-8 uppercase tracking-tighter">06. Breakout & Canteen Areas: The Social Engine</h2>
        <div class="max-w-4xl space-y-8 text-gray-600 leading-relaxed">
          <p>
            In the modern Addis office, the canteen is no longer just for lunch—it’s a "Third Space" for informal meetings. However, the acoustics of hard surfaces (tiles and laminate tables) can make these areas unusable if the dimensions don't account for <strong>voice-buffer zones</strong>.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-4">
              <h4 class="font-bold text-gray-900 uppercase text-sm">The High-Top Community Table</h4>
              <p class="text-sm italic font-medium text-red-600">Standard: 240W x 70D x 105H cm</p>
              <p class="text-sm leading-relaxed">
                By making the table 105cm high, you encourage "perching." This allows employees to stand and talk to those seated on 75cm bar stools at eye level. This parity of eye height is the secret to successful collaboration zones. 
              </p>
            </div>
            <div class="space-y-4">
              <h4 class="font-bold text-gray-900 uppercase text-sm">The Canteen Grid</h4>
              <p class="text-sm italic font-medium text-red-600">Clearance: 120cm between parallel tables</p>
              <p class="text-sm leading-relaxed">
                You must allow 60cm for a chair to be pulled out, plus an additional 60cm for a person carrying a tray to walk behind that chair. In tight Addis floorplans, designers often cheat this to 90cm, leading to constant chair-bumps and spills.
              </p>
            </div>
          </div>
          
        </div>
      </section>

      <section class="mb-20 pt-12 border-t border-gray-200">
        <h2 class="text-2xl md:text-4xl font-black text-gray-900 mb-8 uppercase tracking-tighter">07. Acoustic Geometry: Glass vs. Sound</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div class="space-y-6 text-gray-600 leading-relaxed">
            <p>
              Addis Ababa’s construction trend of floor-to-ceiling glass creates a "reverb chamber" effect. High-end furniture must counteract this. 
            </p>
            <p>
              <strong>The Partition Constant:</strong><br />
              When installing glass partitions, the door opening must be exactly 90cm wide to meet international accessibility standards. However, the glass panels should never exceed 120cm in width per segment. Large glass sheets vibrate more, transmitting sound across the office like a drum.
            </p>
            <p>
              <strong>The 1.5 Meter Rule:</strong><br />
              In open-plan layouts, no workstation should be closer than 1.5 meters to a primary glass facade without an acoustic baffle or a high-back "privacy" sofa to absorb the sound reflecting off the windows.
            </p>
          </div>
          <div class="p-8 bg-black text-white rounded-sm">
            <h4 class="font-black text-xs uppercase tracking-[0.2em] text-red-600 mb-4">Technical Checklist</h4>
            <ul class="space-y-3 text-xs font-mono">
              <li class="flex justify-between border-b border-gray-800 pb-2"><span>Min. Ceiling Height</span><span>270 cm</span></li>
              <li class="flex justify-between border-b border-gray-800 pb-2"><span>Aisle Width (Primary)</span><span>150 cm</span></li>
              <li class="flex justify-between border-b border-gray-800 pb-2"><span>Aisle Width (Secondary)</span><span>100 cm</span></li>
              <li class="flex justify-between border-b border-gray-800 pb-2"><span>ADA Door Clearance</span><span>90 cm</span></li>
              <li class="flex justify-between border-b border-gray-800 pb-2"><span>Power Socket Height</span><span>30 cm (from floor)</span></li>
              <li class="flex justify-between border-b border-gray-800 pb-2"><span>Data Port Spacing</span><span>1 per 120cm desk</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section class="mt-20 p-16 border-4 border-black text-center rounded-sm bg-white">
  <h3 class="text-3xl md:text-5xl font-black text-gray-900 mb-6 uppercase tracking-tighter">Full Technical Pack</h3>
  <p class="text-gray-600 mb-10 max-w-2xl mx-auto text-lg">
    Our 2026 Technical Pack includes a checklist used by Duka Interiors on every project.
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
    excerpt: 'Discover how specific color wavelengths trigger productivity and why the "safe" grey offices of Addis Ababa might be killing your team’s focus.',
    content: `
      <section class="mb-16 md:mb-24">
        <h1 class="text-3xl md:text-6xl font-black tracking-tighter text-gray-900 mb-10 uppercase leading-none">
          The Psychology of <br /><span class="text-red-600">The Palette.</span>
        </h1>
        
        <div class="max-w-4xl space-y-8 text-lg text-gray-600 leading-relaxed">
          <p>
            In the hyper-competitive corporate hubs of Addis Ababa—from the high-rises of Kazanchis to the commercial centers of Bole—the office is no longer just a "place to sit." It is a <strong>psychological engine</strong>. As we move into 2026, forward-thinking Ethiopian firms are moving beyond "standard white" to embrace <strong>Neuro-Design</strong>: the science of how color wavelengths impact human cognition.
          </p>
          <p class="text-gray-900 font-bold italic border-l-4 border-red-600 pl-6 text-xl">
            "Design is not just what it looks like. Design is how it makes the brain behave. In Ethiopia, we must account for high-altitude sunlight and its interaction with the indoor spectrum."
          </p>
          <p>
            Color choice is not a subjective "art"; it is a neuro-physiological intervention. When light enters the eye, it hits the retina and sends signals to the hypothalamus—the part of the brain responsible for heart rate, blood pressure, and circadian rhythms. 
          </p>
        </div>
      </section>

      <section class="mb-20 pt-16 border-t border-gray-200">
        <h2 class="text-3xl font-black uppercase tracking-tighter mb-10 text-gray-900">01. The Physics of Wavelengths</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div class="space-y-6 text-gray-600 leading-relaxed">
            <p>
              Every color has a specific frequency. Short-wavelength colors (Blues/Greens) are mentally calming, while long-wavelength colors (Reds/Yellows) are physically stimulating.
            </p>
            <p>
              <strong>The High-Altitude Factor (The Addis Constant):</strong><br />
              Addis Ababa sits at 2,355 meters. The UV index is higher, and the natural light has a "sharper," bluer tint than in lowland cities like Dubai or Nairobi. This means that "Cool Grey" paint—which looks modern in a catalog—often feels "dead" or "depressing" under the intense Ethiopian sun. At Duka Interiors, we compensate by introducing warm-undertones into every neutral we specify.
            </p>
          </div>
          <div class="bg-gray-50 p-6 border border-gray-200">
             
             <p class="text-[10px] uppercase tracking-widest text-gray-400 mt-4 text-center">Fig 1.1: Chromatic Wavelength Impact on Cortisol Levels</p>
          </div>
        </div>
      </section>

      <section class="mb-20 pt-16 border-t border-gray-200">
        <h2 class="text-3xl font-black uppercase tracking-tighter mb-10 text-gray-900">02. Deep Dive: The Four "Primary" Office Moods</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          <div class="p-8 border-2 border-blue-600 bg-blue-50/30">
            <h3 class="text-2xl font-black text-blue-900 uppercase mb-4">BLUE: The Cognitive Anchor</h3>
            <p class="text-sm leading-relaxed text-blue-800 mb-4">
              <strong>Best For:</strong> Deep focus, data entry, and legal research. <br />
              Blue stimulates the mind rather than the body. It lowers heart rate and respiratory rhythm. If your team is struggling with high error rates in spreadsheets or reports, the culprit is often a lack of blue-spectrum saturation in their visual field.
            </p>
            <div class="text-xs font-bold text-blue-700">DUKA SPEC: "Deep Federal Blue" for accent walls in Finance Departments.</div>
          </div>

          <div class="p-8 border-2 border-yellow-500 bg-yellow-50/30">
            <h3 class="text-2xl font-black text-yellow-900 uppercase mb-4">YELLOW: The Creative Catalyst</h3>
            <p class="text-sm leading-relaxed text-yellow-800 mb-4">
              <strong>Best For:</strong> Marketing, Graphic Design, and Innovation Hubs. <br />
              Yellow is the "Emotional" color. It affects the ego and spirits. In a city like Addis where tech start-ups are booming, yellow-pulsed breakout zones are essential to prevent "writer's block" and keep spirits high during late-night sprints.
            </p>
            <div class="text-xs font-bold text-yellow-700">DUKA SPEC: "Saffron Gold" for informal collaboration pods.</div>
          </div>

          <div class="p-8 border-2 border-green-600 bg-green-50/30">
            <h3 class="text-2xl font-black text-green-900 uppercase mb-4">GREEN: The Balance Point</h3>
            <p class="text-sm leading-relaxed text-green-800 mb-4">
              <strong>Best For:</strong> HR, long-hour workstations, and wellness rooms. <br />
              Green sits in the center of the spectrum. It requires zero ocular adjustment. It is the color of <strong>Biophilia</strong>. For offices with limited natural light in dense Addis neighborhoods, "Sage Green" mimics the restfulness of nature, reducing eye strain significantly.
            </p>
            <div class="text-xs font-bold text-green-700">DUKA SPEC: "Highland Sage" for open-plan backdrops.</div>
          </div>

          <div class="p-8 border-2 border-red-600 bg-red-50/30">
            <h3 class="text-2xl font-black text-red-900 uppercase mb-4">RED: The Physical Engine</h3>
            <p class="text-sm leading-relaxed text-red-800 mb-4">
              <strong>Best For:</strong> Sales floors, gyms, and high-energy negotiation. <br />
              Red increases heart rate and blood pressure. It is a "time-distorter"—it makes people think time is passing faster than it is. While too much red causes aggression, a red-infused sales floor in Bole can drive "urgency" in closing deals.
            </p>
            <div class="text-xs font-bold text-red-700">DUKA SPEC: "Terracotta Red" for closing rooms.</div>
          </div>

        </div>
      </section>
      <section class="mb-20 pt-16 border-t border-gray-200">
        <h2 class="text-3xl font-black uppercase tracking-tighter mb-8">03. The 60-30-10 Rule: Engineering Balance</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 text-gray-600 leading-relaxed">
          <div class="space-y-6">
            <p>
              The most common mistake in Addis offices is over-saturation—painting every wall a bright brand color. This leads to "Chromatic Fatigue." To build a sustainable productivity environment, Duka Interiors utilizes the <strong>60-30-10 Mathematical Framework</strong>.
            </p>
            <p>
              <strong>60% Dominant (The Foundation):</strong> Usually a "Warm White" or "Light Greige." This covers the walls and ceilings. It maximizes the bounce of natural light from your windows, reducing the need for artificial overhead lighting during the day.
            </p>
            <p>
              <strong>30% Secondary (The Mood Regulator):</strong> This is applied to larger furniture pieces, floor finishes, or a primary accent wall. This color dictates the "vibe" of the department—Blue for Legal, Green for Operations.
            </p>
            <p>
              <strong>10% Accent (The Brand Pulse):</strong> This is where your brand identity lives. Cushions, small decor, or window mullions. By keeping high-intensity colors to 10%, you create "visual landmarks" that guide the eye without overwhelming the brain.
            </p>
          </div>
          
        </div>
      </section>

      <section class="mb-20 pt-16 border-t border-gray-200">
        <h2 class="text-3xl font-black uppercase tracking-tighter mb-8">04. Beyond Paint: The Psychology of Materials</h2>
        <div class="max-w-4xl space-y-8 text-gray-600 leading-relaxed">
          <p>
            Color psychology isn't limited to paint; it extends to the <strong>tactile reality</strong> of the materials we use in Ethiopian manufacturing.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-black text-white p-10 rounded-sm">
            <div class="space-y-4">
              <h4 class="text-red-600 font-black uppercase tracking-widest text-xs">Organic Wood (The Cortisol Killer)</h4>
              <p class="text-sm">Visible wood grain in furniture—whether Oak, Walnut, or High-End Laminate—is proven to lower cortisol (stress) levels. In high-pressure environments like the Addis Financial District, introducing wood-texture desks provides a "natural grounding" effect that synthetic whites cannot match.</p>
            </div>
            <div class="space-y-4">
              <h4 class="text-red-600 font-black uppercase tracking-widest text-xs">Metallic Accents (The Precision Anchor)</h4>
              <p class="text-sm">Brushed aluminum or matte black steel frames convey stability, logic, and precision. We specify these for engineering firms and tech startups to psychologically reinforce the "structural integrity" of the work being done.</p>
            </div>
          </div>
          <p>
            <strong>The "Addis Glare" Mitigation:</strong> Because of the intense sun, we recommend "Matte" or "Satin" finishes for all office surfaces. High-gloss finishes create reflected glare (specular reflection), which causes the pupils to constantly constrict and dilate, leading to "3 PM Headaches" for staff seated near windows.
          </p>
        </div>
      </section>

      <section class="mb-20 pt-16 border-t border-gray-200">
        <h2 class="text-3xl font-black uppercase tracking-tighter mb-8">05. The Productivity Audit: A 2026 Checklist</h2>
        <div class="max-w-4xl border-l-8 border-black pl-10 space-y-6">
          <p class="text-xl font-bold text-gray-900">Is your current office hurting your bottom line? Ask these three questions:</p>
          <ul class="space-y-6">
            <li class="flex gap-4">
              <span class="bg-red-600 text-white w-8 h-8 flex items-center justify-center flex-shrink-0 font-black">1</span>
              <div>
                <p class="font-bold text-gray-900">Are your hallways "Corporate Grey"?</p>
                <p class="text-sm text-gray-500 italic">If yes, you are inducing "Transition Boredom." Add a 10% accent of your brand color to re-energize staff as they move between meetings.</p>
              </div>
            </li>
            <li class="flex gap-4">
              <span class="bg-red-600 text-white w-8 h-8 flex items-center justify-center flex-shrink-0 font-black">2</span>
              <div>
                <p class="font-bold text-gray-900">Do you have a "Quiet Room" for deep work?</p>
                <p class="text-sm text-gray-500 italic">This room should be 80% Blue or Sage Green. Zero red, zero yellow. It is a sensory-deprivation tank for high-value thinking.</p>
              </div>
            </li>
            <li class="flex gap-4">
              <span class="bg-red-600 text-white w-8 h-8 flex items-center justify-center flex-shrink-0 font-black">3</span>
              <div>
                <p class="font-bold text-gray-900">What is the color of your Canteen?</p>
                <p class="text-sm text-gray-500 italic">If it's too white, it feels like a hospital. Warm Terracotta or Moss Green fosters social bonding and faster digestion.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section class="mt-20 p-12 md:p-16 border-4 border-black text-center rounded-sm bg-gray-50">
        <h3 class="text-3xl md:text-5xl font-black text-gray-900 mb-6 uppercase tracking-tighter leading-none">
          Build a Space That <br /><span class="text-red-600">Wins.</span>
        </h3>
        <p class="text-gray-600 mb-10 max-w-2xl mx-auto text-lg font-medium">
          Duka Interiors doesn't just sell furniture; we engineer the atmospheric conditions for your company's growth. From the Financial District to Bole, we are redefining the Ethiopian workspace.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-6">
          href="https://t.me/dukainteriorsplc" class="bg-black text-white px-12 py-5 font-black uppercase tracking-widest text-sm hover:bg-red-600 transition-all">
            Consult Our Design Scientists →
          </a>
          <div class="px-10 py-5 bg-white border-2 border-black font-black uppercase text-sm flex items-center justify-center">
            Est. 2026 | Addis Ababa
          </div>
        </div>
      </section>
    `
  }
];