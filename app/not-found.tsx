import Link from 'next/link';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

export const metadata = {
  title: { absolute: 'Page Not Found | Duka Interiors' },
  description: 'This page does not exist. Browse Duka Interiors projects and services, or contact our Addis Ababa studio.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NavBar />
      <main className="flex-grow flex items-center justify-center px-6 py-32">
        <div className="text-center max-w-xl">
          <p className="text-red-600 font-black tracking-[0.3em] uppercase text-[10px] mb-4">Error 404</p>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-gray-900 mb-6">
            This page has moved
          </h1>
          <p className="text-gray-600 mb-10">
            The page you&apos;re looking for doesn&apos;t exist anymore. Our work, services and contact details are a click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/projects/" className="bg-black text-white px-8 py-4 text-[11px] font-black uppercase tracking-widest hover:bg-red-600 transition-colors">
              See our projects
            </Link>
            <Link href="/services/" className="border border-gray-300 px-8 py-4 text-[11px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
              Our services
            </Link>
            <Link href="/contact/" className="border border-gray-300 px-8 py-4 text-[11px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
              Contact us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
