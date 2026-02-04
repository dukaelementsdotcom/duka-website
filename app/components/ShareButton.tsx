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
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Detect touch device
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    setCurrentUrl(url || (typeof window !== 'undefined' ? window.location.href : ''));
  }, [url]);

  // Unified hover logic with debouncing
  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (!isTouchDevice) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      if (!isTouchDevice) {
        setIsOpen(false);
      }
    }, 300);
  };

  // Handle click outside for mobile/desktop
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      
      // Visual feedback
      if (containerRef.current) {
        const copyBtn = containerRef.current.querySelector('[data-copy-button]');
        if (copyBtn) {
          copyBtn.animate([
            { transform: 'scale(1)' },
            { transform: 'scale(0.9)' },
            { transform: 'scale(1)' }
          ], {
            duration: 300,
            easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
          });
        }
      }

      setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
      }, 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Platform configurations with official brand colors and icons
  const platforms = [
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      bgColor: 'hover:bg-[#1877F2]/10',
      textColor: 'text-[#1877F2]'
    },
    {
      name: 'WhatsApp',
      url: `https://wa.me/?text=${encodeURIComponent(`${title} ${currentUrl}`)}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.199.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.226 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.491h.004c-2.255-.001-4.498-.646-6.466-1.928-2.116-1.378-3.62-3.398-4.248-5.702C.675 11.192.553 8.82.947 6.503 1.38 3.959 2.948 1.78 5.336.646 7.724-.489 10.453-.53 12.862.117c2.409.646 4.456 2.03 5.884 4.002 1.429 1.971 2.169 4.396 2.104 6.842-.005.188-.016.376-.033.563l.004-.002-.002.004-.001.001c-.099 1.315-.566 2.553-1.332 3.562-.78 1.026-1.826 1.783-2.999 2.234-1.304.5-2.733.73-4.13.694z" />
        </svg>
      ),
      bgColor: 'hover:bg-[#25D366]/10',
      textColor: 'text-[#25D366]'
    },
    {
      name: 'Telegram',
      url: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.364-.619.364-.124 0-.31-.061-.31-.061l.813-3.97 5.5-4.96c.24-.213-.054-.334-.373-.121l-6.871 4.326-2.962-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
        </svg>
      ),
      bgColor: 'hover:bg-[#26A5E4]/10',
      textColor: 'text-[#26A5E4]'
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      bgColor: 'hover:bg-[#0A66C2]/10',
      textColor: 'text-[#0A66C2]'
    }
  ];

  return (
    <div 
      ref={containerRef} 
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Share Menu */}
      <div
        className={`
          absolute bottom-full left-1/2 -translate-x-1/2 mb-3
          flex flex-col items-center gap-2 p-3
          bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100
          transition-all duration-300 ease-out origin-bottom
          ${isOpen 
            ? 'opacity-100 scale-100 translate-y-0 visible' 
            : 'opacity-0 scale-95 translate-y-4 invisible pointer-events-none'
          }
        `}
      >
        {/* Platform Buttons */}
        <div className="flex items-center gap-2">
          {platforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                flex items-center justify-center w-11 h-11 rounded-xl
                transition-all duration-200 ease-out
                ${platform.bgColor} ${platform.textColor}
                hover:scale-110 active:scale-95
                hover:shadow-md
              `}
              onClick={() => setIsOpen(false)}
              aria-label={`Share on ${platform.name}`}
            >
              {platform.icon}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* Copy Link Button */}
        <button
          data-copy-button
          onClick={copyLink}
          className={`
            flex items-center justify-center w-full px-4 py-2.5 rounded-xl
            transition-all duration-200 ease-out
            ${copied 
              ? 'bg-green-500 text-white shadow-lg scale-[1.02]' 
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md'
            }
            active:scale-95
          `}
          aria-label={copied ? "Link copied!" : "Copy link"}
        >
          <div className="flex items-center gap-3">
            {copied ? (
              <>
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5"
                  className="w-5 h-5 flex-shrink-0"
                >
                  <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-medium">Copied!</span>
              </>
            ) : (
              <>
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className="w-5 h-5 flex-shrink-0 text-gray-500"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                <span className="font-medium">Copy Link</span>
              </>
            )}
          </div>
        </button>
      </div>

      {/* Main Share Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-center w-12 h-12 rounded-full
          bg-white text-gray-700
          backdrop-blur-md border border-gray-200
          shadow-lg hover:shadow-xl
          transition-all duration-300 ease-out
          hover:scale-105 active:scale-95
          ${isOpen ? 'bg-black text-white border-black' : ''}
        `}
        aria-label={isOpen ? "Close share menu" : "Open share menu"}
        aria-expanded={isOpen}
      >
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
          ) : (
            <>
              <circle cx="18" cy="5" r="1"/>
              <circle cx="6" cy="12" r="1"/>
              <circle cx="18" cy="19" r="1"/>
              <path d="M8.59 13.51l6.83 4" strokeLinecap="round"/>
              <path d="M15.41 6.51l-6.82 4" strokeLinecap="round"/>
            </>
          )}
        </svg>
      </button>

      {/* Success Toast */}
      {copied && (
        <div className="
          absolute left-1/2 -translate-x-1/2 top-full mt-3
          px-4 py-2 rounded-lg bg-green-500 text-white text-sm font-medium
          shadow-lg animate-fade-in-up pointer-events-none
        ">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Link copied to clipboard!
          </div>
        </div>
      )}
    </div>
  );
}