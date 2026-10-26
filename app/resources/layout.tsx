import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Office Design Guides & Insights',
  description: 'Practical guides on office layout, furniture dimensions, colour and fit-out in Ethiopia, written by the Duka Interiors design team in Addis Ababa.',
  path: '/resources/',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
