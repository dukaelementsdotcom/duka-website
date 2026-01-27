'use client';
import { useState, useEffect, useRef } from 'react';

export default function ShareButton({ title }: { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUrl(typeof window !== 'undefined' ? window.location.href : '');
  }, []);

  // ✅ CLICK-OUTSIDE DETECTION FOR MOBILE
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const shareLinks = [
    { 
      name: 'WhatsApp', 
      icon: 'fab fa-whatsapp', 
      url: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}` 
    },
    { 
      name: 'Telegram', 
      icon: 'fab fa-telegram-plane', 
      url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` 
    },
    { 
      name: 'LinkedIn', 
      icon: 'fab fa-linkedin-in', 
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` 
    },
    { 
      name: 'Copy', 
      icon: 'fas fa-link', 
      action: () => { 
        navigator.clipboard.writeText(url); 
        alert('Link copied to clipboard!');
        setIsOpen(false); // ✅ Auto-close after copy
      } 
    }
  ];

  // ✅ TOGGLE FOR MOBILE TOUCH + HOVER FOR DESKTOP
  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div 
      ref={menuRef}
      className="relative flex flex-col items-center z-[100]"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Menu - Opens UPWARD */}
      <div className={`
        absolute bottom-full mb-2 flex flex-col gap-2 transition-all duration-200 ease-out
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
                // ✅ Auto-close after opening external link
                setTimeout(() => setIsOpen(false), 300);
              }
            }}
            className="w-10 h-10 bg-white flex items-center justify-center text-gray-900 border border-gray-100 hover:text-red-600 hover:scale-110 transition-all shadow-2xl rounded-full"
            aria-label={`Share on ${link.name}`}
          >
            <i className={link.icon}></i>
          </button>
        ))}
      </div>

      {/* Trigger Button - Tap to toggle on mobile */}
      <button
        onClick={handleToggle}
        className={`
          w-10 h-10 flex items-center justify-center transition-all duration-300 border shadow-lg rounded-full
          ${isOpen ? 'bg-red-600 border-red-600 text-white' : 'bg-white/95 backdrop-blur-md border-gray-200 text-gray-950 hover:bg-gray-100'}
        `}
        aria-label="Share this project"
        aria-expanded={isOpen}
      >
        <i className="fas fa-share-alt text-xs"></i>
      </button>
    </div>
  );
}