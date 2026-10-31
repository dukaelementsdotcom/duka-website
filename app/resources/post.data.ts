// app/resources/post.data.ts
// Blog posts for /resources/. The article text lives in app/resources/posts/*.ts as plain HTML,
// styled by .article-body in app/globals.css.
import furnitureDimensions from './posts/furniture-dimensions';
import colourPsychology from './posts/colour-psychology';
import realEstatePartnership from './posts/real-estate-partnership';
import glassVsGypsum from './posts/glass-vs-gypsum';
import openPlanVsPrivate from './posts/open-plan-vs-private';
import officeFlooring from './posts/office-flooring';
import chooseInteriorDesigner from './posts/choose-interior-designer';
import officeFitOutCosts from './posts/office-fit-out-costs';
import officeRentGuide from './posts/office-rent-guide';

export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
  hideDefaultCTA?: boolean; // hides the Duka call-to-action box (used for the partner article)
  seoTitle?: string; // shorter, keyword-clear title for Google (≤60 chars incl. " | Duka Interiors")
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'ethiopian-office-furniture-dimensions-guide',
    seoTitle: 'Office Furniture Dimensions for Ethiopia',
    category: 'TECHNICAL DESIGN',
    title: 'Office Furniture Dimensions: Desk, Storage and Meeting Room Sizes That Work in Addis Ababa',
    date: 'Jan 20, 2026',
    image: '/images/duka-interiors-portfolio/office-space-standards-addis-ababa.webp',
    excerpt:
      'Desk, workstation, storage, meeting room and reception sizes that work in real Addis Ababa offices, with the walkway clearances we check on every layout.',
    content: furnitureDimensions,
  },
  {
    slug: 'office-color-psychology-productivity-addis',
    seoTitle: 'Office Colour Psychology for Addis Ababa',
    category: 'DESIGN SCIENCE',
    title: 'Office Colours That Work in Addis Ababa: A Practical Guide',
    date: 'Feb 02, 2026',
    image: '/images/duka-interiors-portfolio/modern-office-finishing-work-bole.webp',
    excerpt:
      "How to choose office colours that work in Addis Ababa's strong light and dust: warm whites, brand accents, the 60-30-10 rule and colour by area.",
    content: colourPsychology,
  },
  {
    slug: 'transforming-addis-ababa-properties-real-estate-interior-design-partnership',
    seoTitle: 'Real Estate Interior Design in Addis Ababa',
    category: 'INDUSTRY INSIGHTS',
    title: 'Transforming Addis Ababa Properties: A New Partnership Between Real Estate Experts and Interior Designers',
    date: 'Mar 09, 2026',
    image: '/images/duka-interiors-portfolio/live-ethio-duka-interiors_result.webp',
    excerpt:
      'Why buyers and investors in Addis Ababa do better when choosing a property and planning its interior happen together, and how Live Ethio and Duka Interiors work as partners.',
    hideDefaultCTA: true,
    content: realEstatePartnership,
  },
  {
    slug: 'glass-vs-gypsum-office-partitions-ethiopia',
    seoTitle: 'Glass vs Gypsum Partitions in Ethiopia',
    category: 'TECHNICAL GUIDE',
    title: 'Glass vs Gypsum Partitions: Choosing the Right Office Dividers for Your Addis Ababa Workspace',
    date: 'Oct 26, 2026',
    image: '/images/duka-interiors-portfolio/dereja-office-interior-partition-work/modern-open-plan-office-layout-addis.webp',
    excerpt:
      'Glass or gypsum? Costs at 2026 Addis Ababa rates, sound privacy, daylight, and the 70/30 mix we recommend for most Ethiopian offices.',
    content: glassVsGypsum,
  },
  {
    slug: 'open-plan-vs-private-offices-addis-ababa',
    seoTitle: 'Open Plan vs Private Offices in Addis',
    category: 'WORKPLACE STRATEGY',
    title: 'Open Plan or Private Offices? What Actually Works for Ethiopian Companies',
    date: 'Oct 26, 2026',
    image: '/images/duka-interiors-portfolio/corporate-office-interior-finishing-bole/open-plan-concept-bole.webp',
    excerpt:
      'Open plan suits some teams and fails others. How to decide, what is different about offices in Addis, and the mix most Ethiopian companies end up with.',
    content: openPlanVsPrivate,
  },
  {
    slug: 'office-flooring-ethiopia-guide',
    seoTitle: 'Office Flooring Costs in Ethiopia',
    category: 'MATERIALS GUIDE',
    title: 'Office Flooring in Ethiopia: Costs, Durability, and What to Avoid',
    date: 'Oct 26, 2026',
    image: '/images/duka-interiors-portfolio/corporate-office-interior-finishing-bole/modern-office-open-pool-bole.webp',
    excerpt:
      'Porcelain, carpet tiles, roll carpet or locally made SPC? Real 2026 prices in Addis Ababa, where each floor belongs, cleaning, and what you can take with you when you move.',
    content: officeFlooring,
  },
  {
    slug: 'how-to-choose-best-interior-designer-addis-ababa',
    seoTitle: 'How to Choose the Best Interior Designer in Addis Ababa',
    category: "BUYER'S GUIDE",
    title: 'How to Choose the Best Interior Designer in Addis Ababa',
    date: 'Oct 27, 2026',
    image: '/images/duka-interiors-portfolio/board-room-interior-design-addis-ababa.webp',
    excerpt:
      'Every company says it is the best. Ten checks that show you which interior designer in Addis Ababa really fits your project: finished work, reviews, itemised quotes, payment stages and more.',
    content: chooseInteriorDesigner,
  },
  {
    slug: 'office-fit-out-cost-addis-ababa-ethiopia',
    seoTitle: 'Office Fit-Out Costs in Addis Ababa 2026',
    category: 'COST GUIDE',
    title: 'How Much Does an Office Fit-Out Cost in Addis Ababa? 2026 Prices',
    date: 'Oct 31, 2026',
    image: '/images/duka-interiors-portfolio/modern-open-interior-design-bole/modern-open-pool-workspace-addis-ababa.webp',
    excerpt:
      'Real 2026 fit-out costs in Addis Ababa: per-m² rates for partitions, ceilings, flooring, electrical and furniture, with a worked example for a 300 m² office.',
    content: officeFitOutCosts,
  },
  {
    slug: 'office-rent-addis-ababa-what-to-check',
    seoTitle: 'Renting an Office in Addis Ababa: What to Check',
    category: "BUYER'S GUIDE",
    title: 'Renting an Office in Addis Ababa: What to Check Before You Sign',
    date: 'Oct 31, 2026',
    image: '/images/duka-interiors-portfolio/corporate-office-interior-finishing-bole/reception-interior-design-bole.webp',
    excerpt:
      'Power, parking, noise, AC, security, lease terms and real rent prices: a checklist for companies looking for office space in Addis Ababa.',
    content: officeRentGuide,
  },
];
