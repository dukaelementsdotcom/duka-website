'use client';
import Image from 'next/image';

// Repeating "DUKA INTERIORS" watermark drawn as a background image, so it adds
// no text to the page (the old version repeated the brand name 12 times per image).
const WATERMARK = `url("data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="220" height="140"><text x="20" y="90" transform="rotate(-30 110 70)" fill="white" font-family="Arial,sans-serif" font-size="14" font-weight="700" letter-spacing="2">DUKA INTERIORS</text></svg>'
)}")`;

export default function ProtectedImage({
  src,
  alt,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  priority = false,
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}) {
  return (
    <div className="relative group w-full h-full overflow-hidden select-none bg-gray-100">
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover pointer-events-none" />

      {/* Transparent layer that blocks right-click saving */}
      <div className="absolute inset-0 z-10 bg-transparent" aria-hidden="true" />

      {/* Watermark, visible on hover */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-20 opacity-0 group-hover:opacity-20 pointer-events-none transition-opacity duration-500"
        style={{ backgroundImage: WATERMARK }}
      />
    </div>
  );
}
