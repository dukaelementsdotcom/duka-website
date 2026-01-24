// app/components/ProjectCard.tsx

import Link from 'next/link';

export default function ProjectCard({ slug, title, location, services, image, description }) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="group block bg-white border border-gray-200 rounded-none overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={`Interior design project for ${title} by Duka Interiors`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Text */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-2">{location}</p>
        
        {/* Services Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {services.map((service, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-none"
            >
              {service}
            </span>
          ))}
        </div>

        <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
      </div>
    </Link>
  );
}