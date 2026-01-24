// app/components/ProjectDetail.tsx
import Image from 'next/image';
import Link from 'next/link';
export default function ProjectDetail({ project }) {
return (
<div className="min-h-screen flex flex-col">
{/* Navbar */}
<nav className="bg-white border-b border-gray-200 py-4 px-6">
<div className="max-w-[90vw] mx-auto flex items-center justify-between">
<Link href="/projects" className="text-red-600 hover:underline text-sm">&larr; Back to Projects</Link>
<h1 className="text-xl font-bold text-gray-900">{project.title}</h1>
</div>
</nav>
{/* Main Content */}
<main className="flex-grow py-24 px-6 bg-white">
<div className="max-w-[90vw] mx-auto">
<h1 className="text-4xl font-bold text-gray-900 my-6">{project.title}</h1>
<p className="text-gray-600 mb-4">{project.location} â  ¢ {project.year}</p>
<p className="text-lg text-gray-700 mb-8">{project.description}</p>
{/* Images Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
{project.images && project.images.length > 0 ? (
project.images.map((img, i) => (
<div key={i} className="relative h-64 overflow-hidden rounded-none">
<Image
src={img}
alt={`${project.title} ${i+1}`}
width={1200}
height={800}
className="object-cover w-full h-full"
/>
</div>
))
) : (
<div className="relative h-64 overflow-hidden rounded-none">
<Image
src={project.image}
alt={project.title}
width={1200}
height={800}
className="object-cover w-full h-full"
/>
</div>
)}
</div>
</div>
</main>
</div>
);
}