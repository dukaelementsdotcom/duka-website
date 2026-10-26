import { pageMeta } from '@/lib/seo';
import ComingSoon from '@/app/components/ComingSoon';

export const metadata = pageMeta({
  title: 'Office Renovation FAQ',
  description: 'Answers to common questions about office renovation and fit-out in Addis Ababa.',
  path: '/resources/faq/',
  noindex: true,
});

export default function FAQPage() {
  return <ComingSoon title="Renovation FAQ" />;
}