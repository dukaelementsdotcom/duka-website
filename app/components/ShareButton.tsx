'use client';
import { useState, useEffect, useRef } from 'react';

const Icons = {
  // Official Monochrome Telegram Plane
  telegram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M11.944 0C5.347 0 0 5.347 0 11.944c0 6.595 5.347 11.944 11.944 11.944 6.596 0 11.944-5.349 11.944-11.944C23.888 5.347 18.54 0 11.944 0zm5.812 8.12l-1.97 9.28c-.148.65-.532.81-1.077.506l-3.002-2.21-1.448 1.393c-.16.16-.295.295-.605.295l.215-3.053 5.56-5.023c.24-.213-.054-.333-.373-.12l-6.87 4.326-2.96-.924c-.643-.204-.657-.643.135-.953l11.57-4.458c.536-.195 1.005.127.825.938z"/>
    </svg>
  ),
  // Official Monochrome WhatsApp
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12.031 0C5.39 0 0 5.39 0 12.03c0 2.124.553 4.197 1.603 6.01L.203 24l6.126-1.61c1.777 1.037 3.817 1.583 5.902 1.583 6.44 0 12.03-5.39 12.03-12.03S18.47 0 12.03 0zm5.735 17.034c-.237.67-.1.352-1.576 1.15-.245.13-.513.193-.784.185-.457-.015-1.12-.24-2.384-.744-2.438-1.056-3.997-3.524-4.117-3.685-.12-.16-.974-1.292-.974-2.463 0-1.17.61-1.744.826-1.986.163-.194.332-.242.483-.242.152 0 .304.003.435.012.146.01.343-.057.537.408.2.48.683 1.66.743 1.78.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.253.31-.36.417-.12.12-.246.253-.106.493.14.24.62 1.023 1.332 1.656.917.817 1.69 1.07 1.93 1.19.24.12.38.1.52-.06.14-.16.6-1.04.76-1.4.16-.36.32-.3.54-.22.22.08 1.41.66 1.65.78.24.12.4.18.46.28.06.1.06.58-.18 1.25z"/>
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

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleAction = (cb?: () => void) => {
    if (cb) cb();
    setIsOpen(false);
  };

  const shareLinks = [
    { name: 'LinkedIn', icon: Icons.linkedin, url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}` },
    { name: 'Telegram', icon: Icons.telegram, url: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}` },
    { name: 'WhatsApp', icon: Icons.whatsapp, url: `https://wa.me/?text=${encodeURIComponent(title + ' ' + currentUrl)}` },
    { 
      name: 'Copy', 
      icon: Icons.copy, 
      action: () => {
        navigator.clipboard.writeText(currentUrl);
        alert('Copied link!');
      } 
    }
  ];

  return (
    <div 
      className="relative flex flex-col items-center z-[100]"
      onMouseEnter={() => { if (window.innerWidth > 768) setIsOpen(true); }}
      onMouseLeave={() => { if (window.innerWidth > 768) setIsOpen(false); }}
    >
      {/* Social Links Menu */}
      <div className={`
        absolute bottom-full mb-3 flex flex-col gap-3 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
        ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-75 pointer-events-none'}
      `}>
        {shareLinks.map((link, i) => (
          <button
            key={link.name}
            onClick={() => handleAction(() => {
              if (link.url) window.open(link.url, '_blank');
              else if (link.action) link.action();
            })}
            style={{ transitionDelay: isOpen ? `${i * 40}ms` : '0ms' }}
            className="w-12 h-12 bg-white flex items-center justify-center border border-gray-100 text-gray-800 hover:text-black hover:border-black hover:scale-110 transition-all shadow-xl rounded-full active:scale-95"
          >
            {link.icon}
          </button>
        ))}
      </div>

      {/* Main Trigger Button */}
      <button
        onClick={toggleMenu}
        className={`
          w-12 h-12 flex items-center justify-center transition-all duration-300 border shadow-md rounded-full
          ${isOpen ? 'bg-black border-black text-white' : 'bg-white border-gray-200 text-gray-900 hover:shadow-lg'}
        `}
      >
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-45 scale-110' : 'rotate-0'}`}>
          {Icons.share}
        </div>
      </button>
    </div>
  );
}