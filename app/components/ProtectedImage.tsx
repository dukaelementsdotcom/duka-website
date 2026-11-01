'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface ProtectedImageProps {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Use object-contain instead of object-cover (for lightbox) */
  contain?: boolean;
  /** onClick handler for opening lightbox */
  onClick?: () => void;
}

/**
 * Protected image component that discourages casual downloading:
 * - Transparent overlay blocks right-click on the actual image
 * - Pointer-events:none on the img prevents drag-to-save
 * - No watermark (cleaner look, same protection level)
 *
 * Note: Determined users can still screenshot or use dev tools.
 * This is about discouraging casual copying, not absolute prevention.
 */
export default function ProtectedImage({
  src,
  alt,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  priority = false,
  className = '',
  contain = false,
  onClick,
}: ProtectedImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Disable right-click context menu on the container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    el.addEventListener('contextmenu', handleContextMenu);
    el.addEventListener('dragstart', handleDragStart);

    return () => {
      el.removeEventListener('contextmenu', handleContextMenu);
      el.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none bg-gray-100 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`${contain ? 'object-contain' : 'object-cover'} pointer-events-none ${className}`}
        draggable={false}
      />

      {/* Transparent overlay that intercepts mouse events */}
      <div
        className="absolute inset-0 z-10"
        aria-hidden="true"
        style={{ background: 'transparent' }}
      />
    </div>
  );
}
