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

  // Logic remains strictly untouched
  const onMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsOpen(true);
  };

  const onMouseLeave = () => {
    timerRef.current = setTimeout(() => setIsOpen(false), 250);
  };

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
      // UPDATED: Official Monochrome WhatsApp SVG Path
      path: "M12.031 2c-5.511 0-9.989 4.478-9.989 9.989 0 1.762.459 3.479 1.332 4.995L2 22l5.144-1.349c1.472.802 3.126 1.226 4.814 1.226 5.511 0 10.031-4.478 10.031-9.989S17.542 2 12.031 2zm6.533 14.155c-.269.756-1.55 1.385-2.14 1.482-.533.088-1.226.155-3.32-.716-2.67-1.109-4.402-3.831-4.536-4.009-.134-.178-1.09-1.447-1.09-2.76 0-1.314.685-1.961.928-2.228.242-.267.533-.333.711-.333.178 0 .356.011.511.022.167.011.389-.067.611.467.222.533.756 1.844.822 1.978.067.133.111.289.022.467-.089.178-.133.289-.267.444-.133.156-.289.344-.411.467-.133.133-.278.278-.122.544.156.267.689 1.133 1.478 1.833.133.111.289.111.389.111.1 0 .211-.011.311-.022.111-.011.267-.044.433-.111.167-.067.244-.156.333-.289.089-.133.178-.289.267-.444.089-.156.167-.311.267-.467.1-.156.178-.267.311-.267.133 0 .289.044.578.178.289.133 1.844.867 2.167 1.022.322.156.533.233.611.367.078.133.078.778-.191 1.534z"
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