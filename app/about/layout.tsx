import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'About Duka Interiors | Architects in Addis Ababa Since 2015',
  description: 'Founded in 2015 by architects Dagmawi Tilahun and Henok Teshome, Duka Interiors designs and builds offices, showrooms and homes across Addis Ababa.',
  path: '/about/',
  image: '/images/duka-interiors-portfolio/dereja-office-interior-partition-work/small-office-space-optimization-ideas.webp',
  absoluteTitle: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
