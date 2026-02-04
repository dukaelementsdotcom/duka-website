'use client';

import { useState, useEffect, useRef } from 'react';

interface ShareButtonProps {
  title: string;
  url?: string;
}

export default function ShareButton({ title, url }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCurrentUrl(url || (typeof window !== 'undefined' ? window.location.href : ''));
  }, [url]);

  // Handle Desktop Hover
  const handleMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    // Small delay so the user can move mouse to the menu without it vanishing
    closeTimeout.current = setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  // Handle Click Outside (for Mobile)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
      }, 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareLinks = [
    {
      name: 'WhatsApp',
      color: 'hover:bg-[#25D366] hover:text-white',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.199.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.226 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.491h.004c-2.255-.001-4.498-.646-6.466-1.928-2.116-1.378-3.62-3.398-4.248-5.702C.675 11.192.553 8.82.947 6.503 1.38 3.959 2.948 1.78 5.336.646 7.724-.489 10.453-.53 12.862.117c2.409.646 4.456 2.03 5.884 4.002 1.429 1.971 2.169 4.396 2.104 6.842-.005.188-.016.376-.033.563l.004-.002-.002.004-.001.001c-.099 1.315-.566 2.553-1.332 3.562-.78 1.026-1.826 1.783-2.999 2.234-1.304.5-2.733.73-4.13.694z"/>
        </svg>
      ),
      url: `https://wa.me/?text=${encodeURIComponent(`${title} ${currentUrl}`)}`
    },
    {
      name: 'Telegram',
      color: 'hover:bg-[#0088cc] hover:text-white',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.891 8.146l-2.003 9.464c-.149.659-.541.823-1.091.515l-3.051-2.249-1.472 1.416c-.163.163-.3.299-.614.299l.219-3.11 5.659-5.115c.247-.219-.054-.341-.381-.123l-6.995 4.404-3.014-.944c-.655-.204-.667-.655.136-.967l11.777-4.54c.545-.198 1.021.127.829.945z"/>
        </svg>
      ),
      url: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`
    },
    {
      name: 'LinkedIn',
      color: 'hover:bg-[#0A66C2] hover:text-white',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`
    },
  ];

  return (
    <div 
      ref={containerRef} 
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Popover Menu */}
      <div
        className={`
          absolute bottom-full left-1/2 -translate-x-1/2 mb-3
          flex items-center gap-1 p-1.5
          bg-white/80 backdrop-blur-xl rounded-full shadow-2xl border border-white/20
          transition-all duration-300 origin-bottom
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-2 pointer-events-none'}
        `}
      >
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              flex items-center justify-center w-10 h-10 rounded-full
              text-slate-600 transition-all duration-200
              ${link.color}
            `}
          >
            {link.icon}
          </a>
        ))}

        <div className="w-[1px] h-4 bg-slate-300 mx-1" />

        <button
          onClick={copyToClipboard}
          className={`
            flex items-center justify-center w-10 h-10 rounded-full
            transition-all duration-200
            ${copied ? 'bg-green-500 text-white' : 'text-slate-600 hover:bg-slate-900 hover:text-white'}
          `}
        >
          {copied ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
               <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
               <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          )}
        </button>
      </div>

      {/* Main Trigger Button - Creative Standard Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-center w-12 h-12 rounded-full
          transition-all duration-300 shadow-sm
          ${isOpen 
            ? 'bg-slate-900 text-white scale-110' 
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }
        `}
        aria-label="Share"
      >
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          {/* Creative Curved Arrow Icon */}
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
      </button>
    </div>
  );
}