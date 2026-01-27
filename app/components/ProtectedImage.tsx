'use client';
import Image from 'next/image';

export default function ProtectedImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative group w-full h-full overflow-hidden select-none bg-gray-100">
      {/* The Actual Image */}
      <Image src={src} alt={alt} fill className="object-cover pointer-events-none" />

      {/* The Invisible Shield (Blocks saving) */}
      <div className="absolute inset-0 z-10 bg-transparent" />

      {/* The Shutterstock-Style Watermark (Hidden until Hover) */}
      <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-20 pointer-events-none transition-opacity duration-500 flex flex-wrap justify-center items-center gap-8 p-4">
        {[...Array(12)].map((_, i) => (
          <span key={i} className="text-white font-bold text-xs rotate-[-45deg] uppercase whitespace-nowrap border border-white/20 p-1">
            Duka Interiors
          </span>
        ))}
      </div>
    </div>
  );
}