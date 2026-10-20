import { pageMeta } from '@/lib/seo';
import ComingSoon from '@/app/components/ComingSoon';

export const metadata = pageMeta({
  title: 'Interior Material Guides',
  description: 'Guides to partition, ceiling, flooring and furniture materials used in Ethiopian offices.',
  path: '/resources/materials/',
  noindex: true,
});

export default function MaterialsPage() {
  return <ComingSoon title="Material Guides" />;
}