'use client';
import { useState, useEffect, useRef } from 'react';

const Icons = {
  telegram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-.962 4.084-1.362 5.441-.168.57-.493 1.104-.812 1.288-.694.4-1.242-.143-1.848-.541-.476-.312-2.13-1.413-2.13-1.413-.418-.283-.146-.438.09-.686.236-.248 2.03-2.01 2.03-2.01.298-.298.05-.447-.298-.248L8.64 12.338c-.447.15-.844.223-1.241.223-.447 0-.744-.074-1.19-.223-.596-.198-1.042-.323-1.042-.323-.446-.15-.744-.447-.298-.694.223-.124 1.39-.62 3.52-1.513 2.13-.893 3.545-1.488 4.24-1.785.694-.298 1.439-.422 1.835-.422.099 0 .546.025.793.149.198.1.298.248.347.416.05.124.074.248.05.416z"/>
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12.031 0C5.39 0 0 5.39 0 12.03c0 2.124.553 4.197 1.603 6.01L.203 24l6.126-1.61c1.777 1.037 3.817 1.583 5.902 1.583 6.44 0 12.03-5.39 12.03-12.03S18.47 0 12.03 0zm5.735 17.034c-.237.67-.1.352-1.576 1.15-.245.13-.513.193-.784.185-.457-.015-1.12-.24-2.384-.744-2.438-1.056-3.997-3.524-4.117-3.685-.12-.16-.974-1.292-.974-2.463 0-1.17.61-1.744.826-1.986.163-.194.332-.242.483-.242.152 0 .304.003.435.012.146.01.343-.057.537.408.2.48.683 1.66.743 1.78.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.253.31-.36.417-.12.12-.246.253-.106.493.14.24.62 1.023 1.332 1.656.917.817 1.69 1.07 1.93 1.19.24.12.38.1.52-.06.14-.16.6-1.04.76-1.4.16-.36.32-.3.54-.22.22.08 1.41.66 1.65.78.24.12.4.18.46.28.06.1.06.58-.18 1.25z"/>
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.58c-1.14 0-2.06-.93-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.13-.92 2.06-2.06 2.06zm15.11 12.87h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67h-3.56V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28z"/>
    </svg>
  ),
  copy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
  ),
  share: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6">
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(url || window.location.href);

    // ✅ CLOSE ON OUTSIDE CLICK (Essential for Mobile)
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [url]);

  const shareLinks = [
    { name: 'LinkedIn', icon: Icons.linkedin, url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}` },
    { name: 'Telegram', icon: Icons.telegram, url: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}` },
    { name: 'WhatsApp', icon: Icons.whatsapp, url: `https://wa.me/?text=${encodeURIComponent(title + ' ' + currentUrl)}` },
    { 
      name: 'Copy', 
      icon: Icons.copy, 
      action: () => {
        navigator.clipboard.writeText(currentUrl);
        alert('Link copied!');
      } 
    }
  ];

  return (
    <div ref={containerRef} className="relative inline-flex flex-col items-center">
      
      {/* Social Links - Responsive sizing */}
      <div className={`
        absolute bottom-full mb-4 flex flex-col gap-4 transition-all duration-300 ease-out
        ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-75 pointer-events-none'}
      `}>
        {shareLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => {
              if (link.url) window.open(link.url, '_blank');
              if (link.action) link.action();
              setIsOpen(false); // ✅ Auto-close after action
            }}
            className="w-12 h-12 md:w-14 md:h-14 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-700 shadow-xl hover:text-black hover:border-black active:scale-90 transition-all"
            aria-label={link.name}
          >
            {link.icon}
          </button>
        ))}
      </div>

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full transition-all duration-300 shadow-lg border
          ${isOpen ? 'bg-black border-black text-white rotate-90' : 'bg-white border-gray-200 text-black hover:bg-gray-50'}
        `}
      >
        {Icons.share}
      </button>
    </div>
  );
}