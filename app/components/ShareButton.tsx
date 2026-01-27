'use client';
import { useState, useEffect } from 'react';

export default function ShareButton({ title }) {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const text = `Discover this project by Duka Interiors: ${title}`;
  
  const shareLinks = [
    { name: 'WhatsApp', icon: 'fab fa-whatsapp', url: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}` },
    { name: 'Telegram', icon: 'fab fa-telegram-plane', url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}` },
    { name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { name: 'Copy', icon: 'fas fa-link', action: () => { navigator.clipboard.writeText(url); alert('Link copied!'); } }
  ];

  return (
    <div 
      className="relative flex flex-col items-end z-50"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)} // Added for mobile tap support
    >
      {/* Selection Menu */}
      <div className={`
        absolute bottom-full mb-2 flex flex-col gap-1 transition-all duration-300 ease-out
        ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95 pointer-events-none'}
      `}>
        {shareLinks.map((link) => (
          <button
            key={link.name}
            onClick={(e) => {
                e.stopPropagation();
                link.action ? link.action() : window.open(link.url, '_blank');
            }}
            className="w-10 h-10 bg-white flex items-center justify-center text-gray-500 hover:text-red-600 border border-gray-100 hover:border-red-600 transition-all shadow-xl rounded-full"
          >
            <i className={`${link.icon} text-sm`}></i>
          </button>
        ))}
      </div>

      {/* Persistent Trigger */}
      <div className={`
        w-10 h-10 flex items-center justify-center transition-all duration-300 border shadow-lg rounded-full
        ${isOpen ? 'bg-red-600 border-red-600 text-white' : 'bg-white/90 backdrop-blur-md border-gray-100 text-gray-950'}
      `}>
        <i className="fas fa-share-alt text-xs"></i>
      </div>
    </div>
  );
}