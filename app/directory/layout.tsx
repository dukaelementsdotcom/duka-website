import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Site Directory',
  description: 'Every page on the Duka Interiors website: services, projects, guides and company information.',
  path: '/directory/',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
