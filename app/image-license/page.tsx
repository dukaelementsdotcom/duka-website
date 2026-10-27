import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import NavBar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';

// Linked from the "license" field of every image in the site's structured data.
export const metadata = pageMeta({
  title: 'Image Use and Copyright',
  description: 'Who owns the project photos and renders on dukainteriors.com, and how to ask permission to use them.',
  path: '/image-license/',
});

export default function ImageLicense() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main className="py-20 px-4 md:px-8 lg:px-12 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Image Use and Copyright</h1>
        <p className="text-gray-700 mb-6">
          The project photos, 3D renders and drawings on this website show work by Duka Interiors PLC in Addis Ababa.
          Unless stated otherwise, they are © Duka Interiors PLC. All rights reserved.
        </p>
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">What you can do</h2>
        <p className="text-gray-700 mb-6">
          You can share links to our pages, and social media previews of them, freely.
        </p>
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">What needs permission</h2>
        <p className="text-gray-700 mb-6">
          Copying, editing, printing or republishing our images, for example in articles, presentations, listings or
          advertising, needs our written permission. When we give permission, please credit &ldquo;Duka Interiors&rdquo;.
        </p>
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">How to ask</h2>
        <p className="text-gray-700">
          Tell us which images you would like to use and where. Write to{' '}
          <a href="mailto:welcome@dukainteriors.com" className="text-red-600 hover:text-red-700">
            welcome@dukainteriors.com
          </a>{' '}
          or use our{' '}
          <Link href="/contact/" className="text-red-600 hover:text-red-700">
            contact page
          </Link>
          .
        </p>
      </main>
      <Footer />
    </div>
  );
}
