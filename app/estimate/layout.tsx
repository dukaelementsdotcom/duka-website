import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Office Space & Fit-Out Cost Estimator',
  description: 'Free tool to estimate the office area you need and the fit-out cost in Addis Ababa, based on headcount, work style and finish level.',
  path: '/estimate/',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
