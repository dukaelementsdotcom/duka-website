import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Contact Us – Office Design in Addis Ababa',
  description: 'Talk to Duka Interiors about your office fit-out, partitioning or renovation. Call +251 940 607 055, message us on WhatsApp or Telegram, or visit our Bole studio.',
  path: '/contact/',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
