'use client';
import { useState, useEffect } from 'react';

export default function ShareButton({ title }: { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(typeof window !== 'undefined' ? window.location.href : '');
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
      className="relative flex flex-col items-end z-[100]"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* The Menu: Added 'pb-4' to create a hit-box bridge so it doesn't close when moving mouse */}
      <div className={`
        absolute bottom-full pb-2 flex flex-col gap-2 transition-all duration-300 ease-out
        ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}
      `}>
        {shareLinks.map((link) => (
          <button
            key={link.name}
            onClick={(e) => {
                e.stopPropagation();
                link.action ? link.action() : window.open(link.url, '_blank');
            }}
            className="w-10 h-10 bg-white flex items-center justify-center text-gray-900 border border-gray-100 hover:border-red-600 hover:text-red-600 transition-all shadow-2xl rounded-full"
          >
            <i className={link.icon}></i>
          </button>
        ))}
      </div>

      {/* Trigger */}
      <div className={`
        w-10 h-10 flex items-center justify-center transition-all duration-300 border shadow-lg rounded-full cursor-pointer
        ${isOpen ? 'bg-red-600 border-red-600 text-white' : 'bg-white/95 backdrop-blur-md border-gray-200 text-gray-950'}
      `}>
        <i className="fas fa-share-alt"></i>
      </div>
    </div>
  );
}