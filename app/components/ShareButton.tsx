'use client';
import { useState, useEffect, useRef } from 'react';

// ✅ MONOCHROME ICONS (all black/white - no colors)
const Icons = {
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M20 2H4C2.9 2 2 2.9 2 4V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V4C22 2.9 21.1 2 20 2M14.7 15.5L13.5 16.5C13.1 16.9 12.4 16.9 12 16.5L9.5 14.1C9.1 13.7 9.1 13.1 9.5 12.7L10.5 11.5C10.9 11.1 11.5 11.1 11.9 11.5L14.3 13.9C14.7 14.3 14.7 14.9 14.3 15.3L14.7 15.5M15 8C15 9.1 14.1 10 13 10H11C9.9 10 9 9.1 9 8V6C9 4.9 9.9 4 11 4H13C14.1 4 15 4.9 15 6V8Z"/>
    </svg>
  ),
  telegram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M22 2L11 13 2 9 22 2z"/>
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  ),
  copy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
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

  // ✅ FIXED HOVER: Seamless transition with 200ms buffer
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
    }, 200); // Increased to 200ms for smoother transition
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
      {/* Menu - Opens UPWARD with minimal gap (mb-0.5) */}
      <div className={`
        absolute bottom-full mb-0.5 flex flex-col gap-2 transition-all duration-200 ease-out
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