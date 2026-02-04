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
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCurrentUrl(url || (typeof window !== 'undefined' ? window.location.href : ''));
  }, [url]);

  // Handle Desktop Hover with a small buffer
  const onMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsOpen(true);
  };

  const onMouseLeave = () => {
    timerRef.current = setTimeout(() => setIsOpen(false), 250);
  };

  // Handle Mobile/Click Away
  useEffect(() => {
    const close = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('touchstart', close);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('touchstart', close);
    };
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };

  const icons = [
    {
      name: 'WhatsApp',
      url: `https://wa.me/?text=${encodeURIComponent(`${title} ${currentUrl}`)}`,
      path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.199.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.226 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.491h.004c-2.255-.001-4.498-.646-6.466-1.928-2.116-1.378-3.62-3.398-4.248-5.702C.675 11.192.553 8.82.947 6.503 1.38 3.959 2.948 1.78 5.336.646 7.724-.489 10.453-.53 12.862.117c2.409.646 4.456 2.03 5.884 4.002 1.429 1.971 2.169 4.396 2.104 6.842-.005.188-.016.376-.033.563l.004-.002-.002.004-.001.001c-.099 1.315-.566 2.553-1.332 3.562-.78 1.026-1.826 1.783-2.999 2.234-1.304.5-2.733.73-4.13.694z"
    },
    {
      name: 'Telegram',
      url: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`,
      path: "M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.891 8.146l-2.003 9.464c-.149.659-.541.823-1.091.515l-3.051-2.249-1.472 1.416c-.163.163-.3.299-.614.299l.219-3.11 5.659-5.115c.247-.219-.054-.341-.381-.123l-6.995 4.404-3.014-.944c-.655-.204-.667-.655.136-.967l11.777-4.54c.545-.198 1.021.127.829.945z"
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
    }
  ];

  return (
    <div 
      ref={containerRef} 
      className="relative z-50 inline-block"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Slim Vertical Menu */}
      <div
        className={`
          absolute bottom-full left-0 right-0 mb-3
          flex flex-col items-center gap-2 p-1.5
          bg-white/95 backdrop-blur-md rounded-full shadow-lg border border-gray-100
          transition-all duration-300 origin-bottom
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-2 pointer-events-none'}
        `}
      >
        {icons.map((icon) => (
          <a
            key={icon.name}
            href={icon.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full text-gray-500 hover:bg-gray-100 hover:text-black transition-all active:scale-90"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-5.5 md:h-5.5">
              <path d={icon.path} />
            </svg>
          </a>
        ))}

        <div className="w-4 h-[1px] bg-gray-200 my-0.5" />

        <button
          onClick={copyLink}
          className={`
            flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full transition-all active:scale-90
            ${copied ? 'bg-green-500 text-white' : 'text-gray-500 hover:bg-black hover:text-white'}
          `}
        >
          {copied ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-5 md:h-5">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
          )}
        </button>
      </div>

      {/* Elegant Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full
          transition-all duration-300 shadow-sm
          ${isOpen ? 'bg-black text-white' : 'bg-white/90 text-gray-600 hover:bg-white hover:shadow-md'}
        `}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
        )}
      </button>
    </div>
  );
}