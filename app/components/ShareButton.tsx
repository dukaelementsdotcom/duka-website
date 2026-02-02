'use client';
import { useState, useEffect, useRef } from 'react';

// ✅ CLEAN, RECOGNIZABLE SVG ICONS
const Icons = {
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="#25D366" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.199.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.226 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.491h.004c-2.255-.001-4.498-.646-6.466-1.928-2.116-1.378-3.62-3.398-4.248-5.702C.675 11.192.553 8.82.947 6.503 1.38 3.959 2.948 1.78 5.336.646 7.724-.489 10.453-.53 12.862.117c2.409.646 4.456 2.03 5.884 4.002 1.429 1.971 2.169 4.396 2.104 6.842-.005.188-.016.376-.033.563l.004-.002-.002.004-.001.001c-.099 1.315-.566 2.553-1.332 3.562-.78 1.026-1.826 1.783-2.999 2.234-1.304.5-2.733.73-4.13.694z" />
    </svg>
  ),
  telegram: (
    <svg viewBox="0 0 24 24" fill="#0088CC" className="w-5 h-5">
      <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.725 9.864 9.864 0 0 1-3.127 1.195 4.916 4.916 0 0 0-3.594-1.555c-3.18 0-5.515 2.966-4.797 6.045A13.978 13.978 0 0 1 1.671 3.154a4.93 4.93 0 0 0 1.524 6.574 4.902 4.902 0 0 1-2.23-.616c.31.99.792 1.887 1.524 2.619a4.93 4.93 0 0 1-2.224.086 4.929 4.929 0 0 0 4.6 3.42A9.906 9.906 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.212c9.142 0 14.307-7.72 13.995-14.646A10.025 10.025 0 0 0 24 4.557z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="#0A66C2" className="w-5 h-5">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
  copy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-600">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
  ),
  share: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="18" cy="5" r="3"></circle>
      <circle cx="6" cy="12" r="3"></circle>
      <circle cx="18" cy="19" r="3"></circle>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
    </svg>
  )
};

export default function ShareButton({ title, url }: { title: string; url?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCurrentUrl(url || (typeof window !== 'undefined' ? window.location.href : ''));
  }, [url]);

  // ✅ FIXED HOVER: Seamless transition with delay buffer
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150); // 150ms buffer to move cursor to options
  };

  const shareLinks = [
    { 
      name: 'LinkedIn', 
      icon: Icons.linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}` 
    },
    { 
      name: 'Telegram', 
      icon: Icons.telegram,
      url: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}` 
    },
    { 
      name: 'WhatsApp', 
      icon: Icons.whatsapp,
      url: `https://wa.me/?text=${encodeURIComponent(title + ' ' + currentUrl)}` 
    },
    { 
      name: 'Copy', 
      icon: Icons.copy,
      action: () => { 
        navigator.clipboard.writeText(currentUrl); 
        alert('Link copied to clipboard!');
        setIsOpen(false);
      } 
    }
  ];

  return (
    <div 
      ref={containerRef}
      className="relative flex flex-col items-center z-[100]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Menu - Opens UPWARD with minimal gap (mb-1 not mb-2) */}
      <div className={`
        absolute bottom-full mb-1 flex flex-col gap-2 transition-all duration-200 ease-out
        ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95 pointer-events-none'}
      `}>
        {shareLinks.map((link) => (
          <button
            key={link.name}
            onClick={(e) => {
              e.stopPropagation();
              if (link.action) {
                link.action();
              } else {
                window.open(link.url, '_blank', 'noopener,noreferrer');
                setTimeout(() => setIsOpen(false), 300);
              }
            }}
            onMouseEnter={() => {
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
              }
            }}
            className={`w-10 h-10 bg-white flex items-center justify-center border border-gray-100 hover:scale-110 transition-all shadow-2xl rounded-full`}
            aria-label={`Share on ${link.name}`}
          >
            {link.icon}
          </button>
        ))}
      </div>

      {/* Trigger Button - Original share icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-10 h-10 flex items-center justify-center transition-all duration-300 border shadow-lg rounded-full
          ${isOpen ? 'bg-red-600 border-red-600 text-white' : 'bg-white/95 backdrop-blur-md border-gray-200 text-gray-950 hover:bg-gray-100'}
        `}
        aria-label="Share this project"
        aria-expanded={isOpen}
      >
        {Icons.share}
      </button>
    </div>
  );
}