import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Office Furniture & Partitions – Coming Soon',
  description: 'Duka Interiors office furniture and partition products for Addis Ababa workplaces are coming soon.',
  path: '/products/',
  noindex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
