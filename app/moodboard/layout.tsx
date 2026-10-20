import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Your Moodboard',
  description: 'Projects you saved for inspiration from the Duka Interiors portfolio.',
  path: '/moodboard/',
  noindex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
