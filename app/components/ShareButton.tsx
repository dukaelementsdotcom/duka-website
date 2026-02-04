'use client';

import { useState, useEffect, useRef } from 'react';

interface ShareButtonProps {
  title: string;
  url?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  theme?: 'light' | 'dark' | 'glass';
}

interface SharePlatform {
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
  hoverColor: string;
}

export default function ShareButton({ 
  title, 
  url, 
  position = 'top',
  theme = 'light' 
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setCurrentUrl(url || (typeof window !== 'undefined' ? window.location.href : ''));
  }, [url]);

  // Close menu when clicking outside
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
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      
      // Visual feedback
      buttonRef.current?.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(1.1)' },
        { transform: 'scale(1)' }
      ], {
        duration: 300,
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
      });

      setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
      }, 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Platform configurations with custom icons
  const platforms: SharePlatform[] = [
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`,
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      color: 'text-[#1DA1F2]',
      hoverColor: 'bg-[#1DA1F2]/10'
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      color: 'text-[#0A66C2]',
      hoverColor: 'bg-[#0A66C2]/10'
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      color: 'text-[#1877F2]',
      hoverColor: 'bg-[#1877F2]/10'
    },
    {
      name: 'Telegram',
      url: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`,
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
      color: 'text-[#26A5E4]',
      hoverColor: 'bg-[#26A5E4]/10'
    },
    {
      name: 'WhatsApp',
      url: `https://wa.me/?text=${encodeURIComponent(`${title} ${currentUrl}`)}`,
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.199.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.226 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.491h.004c-2.255-.001-4.498-.646-6.466-1.928-2.116-1.378-3.62-3.398-4.248-5.702C.675 11.192.553 8.82.947 6.503 1.38 3.959 2.948 1.78 5.336.646 7.724-.489 10.453-.53 12.862.117c2.409.646 4.456 2.03 5.884 4.002 1.429 1.971 2.169 4.396 2.104 6.842-.005.188-.016.376-.033.563l.004-.002-.002.004-.001.001c-.099 1.315-.566 2.553-1.332 3.562-.78 1.026-1.826 1.783-2.999 2.234-1.304.5-2.733.73-4.13.694z"/>
        </svg>
      ),
      color: 'text-[#25D366]',
      hoverColor: 'bg-[#25D366]/10'
    }
  ];

  // Position classes
  const positionClasses = {
    top: 'bottom-full mb-3 origin-bottom',
    bottom: 'top-full mt-3 origin-top',
    left: 'right-full mr-3 origin-right',
    right: 'left-full ml-3 origin-left'
  };

  const menuLayout = {
    top: 'flex-col',
    bottom: 'flex-col',
    left: 'flex-row',
    right: 'flex-row'
  };

  // Theme classes
  const themeClasses = {
    light: {
      button: 'bg-white text-gray-700 hover:bg-gray-50',
      menu: 'bg-white/95 backdrop-blur-md border-gray-100',
      shadow: 'shadow-lg'
    },
    dark: {
      button: 'bg-gray-900 text-gray-100 hover:bg-gray-800',
      menu: 'bg-gray-900/95 backdrop-blur-md border-gray-800',
      shadow: 'shadow-lg shadow-black/20'
    },
    glass: {
      button: 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20',
      menu: 'bg-white/10 backdrop-blur-md border border-white/20',
      shadow: 'shadow-lg shadow-black/10'
    }
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      {/* Share Menu */}
      <div
        className={`
          absolute ${positionClasses[position]}
          flex ${menuLayout[position]} items-center gap-2 p-2
          ${themeClasses[theme].menu} ${themeClasses[theme].shadow}
          rounded-2xl border
          transition-all duration-300 ease-out
          ${isOpen 
            ? 'opacity-100 scale-100 translate-y-0 visible' 
            : 'opacity-0 scale-95 translate-y-2 invisible pointer-events-none'
          }
        `}
      >
        {platforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              flex items-center justify-center w-11 h-11 rounded-xl
              transition-all duration-200 ease-out
              ${platform.hoverColor} ${platform.color}
              hover:scale-110 active:scale-95
              ${hoveredPlatform === platform.name ? 'scale-110' : ''}
            `}
            onMouseEnter={() => setHoveredPlatform(platform.name)}
            onMouseLeave={() => setHoveredPlatform(null)}
            onClick={() => {
              setIsOpen(false);
              // Analytics event could go here
            }}
            aria-label={`Share on ${platform.name}`}
          >
            {platform.icon}
          </a>
        ))}

        {/* Divider */}
        <div className={`
          ${position === 'top' || position === 'bottom' ? 'w-10 h-px' : 'h-10 w-px'}
          ${theme === 'light' ? 'bg-gray-200' : theme === 'dark' ? 'bg-gray-700' : 'bg-white/20'}
          mx-1
        `} />

        {/* Copy Button */}
        <button
          ref={buttonRef}
          onClick={copyLink}
          className={`
            group flex items-center justify-center w-11 h-11 rounded-xl
            transition-all duration-200 ease-out
            ${copied 
              ? 'bg-green-500 text-white' 
              : `${theme === 'light' ? 'hover:bg-gray-100' : theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-white/20'} ${theme === 'light' ? 'text-gray-600' : 'text-gray-200'}`
            }
            hover:scale-110 active:scale-95
          `}
          aria-label={copied ? "Link copied!" : "Copy link"}
        >
          {copied ? (
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              className="w-5 h-5"
            >
              <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              className="w-5 h-5"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
          )}
        </button>

        {/* Tooltip */}
        {hoveredPlatform && (
          <div className={`
            absolute px-3 py-1.5 rounded-lg text-sm font-medium
            ${theme === 'light' ? 'bg-gray-900 text-white' : theme === 'dark' ? 'bg-white text-gray-900' : 'bg-white/20 backdrop-blur-md text-white'}
            whitespace-nowrap pointer-events-none
            ${position === 'top' ? 'bottom-full mb-2' : ''}
            ${position === 'bottom' ? 'top-full mt-2' : ''}
            ${position === 'left' ? 'right-full mr-2' : ''}
            ${position === 'right' ? 'left-full ml-2' : ''}
          `}>
            {hoveredPlatform}
            {/* Arrow */}
            <div className={`
              absolute w-2 h-2 rotate-45
              ${theme === 'light' ? 'bg-gray-900' : theme === 'dark' ? 'bg-white' : 'bg-white/20'}
              ${position === 'top' ? 'bottom-[-4px]' : ''}
              ${position === 'bottom' ? 'top-[-4px]' : ''}
              ${position === 'left' ? 'right-[-4px]' : ''}
              ${position === 'right' ? 'left-[-4px]' : ''}
            `} />
          </div>
        )}
      </div>

      {/* Main Share Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-center w-12 h-12 rounded-full
          ${themeClasses[theme].button}
          backdrop-blur-md border transition-all duration-300 ease-out
          ${theme === 'light' ? 'border-gray-200' : theme === 'dark' ? 'border-gray-800' : 'border-white/20'}
          hover:scale-105 active:scale-95
          ${isOpen ? 'rotate-45' : ''}
          ${themeClasses[theme].shadow}
        `}
        aria-label={isOpen ? "Close share menu" : "Open share menu"}
        aria-expanded={isOpen}
      >
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          className="w-6 h-6 transition-transform duration-300"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
          ) : (
            <>
              <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 6l-4-4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 2v13" strokeLinecap="round" strokeLinejoin="round"/>
            </>
          )}
        </svg>
      </button>

      {/* Success Toast */}
      {copied && (
        <div className={`
          absolute left-1/2 -translate-x-1/2 top-full mt-3
          px-4 py-2 rounded-lg text-sm font-medium
          ${theme === 'light' ? 'bg-green-500 text-white' : theme === 'dark' ? 'bg-green-600 text-white' : 'bg-green-500/20 backdrop-blur-md text-green-300'}
          shadow-lg animate-fade-in-up
        `}>
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Link copied!
          </div>
        </div>
      )}
    </div>
  );
}