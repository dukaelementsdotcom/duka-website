'use client';
import { useState, useEffect, useRef } from 'react';

// ✅ UPDATED MONOCHROME ICONS
const Icons = {
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  ),
  telegram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-.962 4.084-1.362 5.441-.168.57-.493 1.104-.812 1.288-.694.4-1.242-.143-1.848-.541-.476-.312-2.13-1.413-2.13-1.413-.418-.283-.146-.438.09-.686.236-.248 2.03-2.01 2.03-2.01.298-.298.05-.447-.298-.248L8.64 12.338c-.447.15-.844.223-1.241.223-.447 0-.744-.074-1.19-.223-.596-.198-1.042-.323-1.042-.323-.446-.15-.744-.447-.298-.694.223-.124 1.39-.62 3.52-1.513 2.13-.893 3.545-1.488 4.24-1.785.694-.298 1.439-.422 1.835-.422.099 0 .546.025.793.149.198.1.298.248.347.416.05.124.074.248.05.416z"/>
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  copy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
  ),
  share: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCurrentUrl(url || (typeof window !== 'undefined' ? window.location.href : ''));
  }, [url]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 200);
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
      className="relative flex flex-col items-center z-[100]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`
        absolute bottom-full mb-2 flex flex-col gap-3 transition-all duration-200 ease-out
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
                setIsOpen(false);
              }
            }}
            className="w-11 h-11 bg-white flex items-center justify-center border border-gray-200 text-gray-700 hover:text-black hover:border-black hover:scale-110 transition-all shadow-xl rounded-full"
            aria-label={`Share on ${link.name}`}
          >
            {link.icon}
          </button>
        ))}
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-12 h-12 flex items-center justify-center transition-all duration-300 border shadow-lg rounded-full
          ${isOpen ? 'bg-black border-black text-white' : 'bg-white border-gray-200 text-gray-950 hover:bg-gray-50'}
        `}
        aria-label="Share"
      >
        {/* Toggle icon between Share and Close */}
        {isOpen ? (
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
             <path d="M18 6L6 18M6 6l12 12" />
           </svg>
        ) : Icons.share}
      </button>
    </div>
  );
}