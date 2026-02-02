'use client';
import { useState, useEffect, useRef } from 'react';
import { 
  FaShareAlt, 
  FaLinkedin, 
  FaTelegramPlane, 
  FaWhatsapp, 
  FaLink 
} from 'react-icons/fa';

export default function ShareButton({ title, url }: { title: string; url?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCurrentUrl(url || (typeof window !== 'undefined' ? window.location.href : ''));
  }, [url]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Desktop hover handlers
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const shareLinks = [
    { 
      name: 'LinkedIn', 
      icon: <FaLinkedin className="w-5 h-5 text-blue-700" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}` 
    },
    { 
      name: 'Telegram', 
      icon: <FaTelegramPlane className="w-5 h-5 text-blue-500" />,
      url: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}` 
    },
    { 
      name: 'WhatsApp', 
      icon: <FaWhatsapp className="w-5 h-5 text-green-500" />,
      url: `https://wa.me/?text=${encodeURIComponent(title + ' ' + currentUrl)}` 
    },
    { 
      name: 'Copy Link', 
      icon: <FaLink className="w-5 h-5 text-gray-600" />,
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
      className="relative z-[100]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Share Options Menu */}
      <div className={`
        absolute bottom-full left-0 mb-1 flex flex-col gap-2 transition-all duration-200 ease-out
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
              }
              // Close menu after action on mobile
              if (typeof window !== 'undefined' && window.innerWidth < 768) {
                setIsOpen(false);
              }
            }}
            onMouseEnter={() => {
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
              }
            }}
            className="w-10 h-10 bg-white flex items-center justify-center border border-gray-100 hover:scale-110 transition-all shadow-2xl rounded-full"
            aria-label={`Share on ${link.name}`}
          >
            {link.icon}
          </button>
        ))}
      </div>

      {/* Share Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-10 h-10 flex items-center justify-center transition-all duration-300 border shadow-lg rounded-full
          ${isOpen ? 'bg-red-600 border-red-600 text-white' : 'bg-white/95 backdrop-blur-md border-gray-200 text-gray-950 hover:bg-gray-100'}
        `}
        aria-label="Share this project"
        aria-expanded={isOpen}
      >
        <FaShareAlt className="w-4 h-4" />
      </button>
    </div>
  );
}