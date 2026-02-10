'use client';

import { useEffect } from 'react';

export default function FontOptimizer() {
  useEffect(() => {
    // Optimize font loading - this runs on the client only
    const optimizeFonts = () => {
      // Add font-display: swap via JavaScript
      const style = document.createElement('style');
      style.textContent = `
        @font-face {
          font-family: 'Geist';
          font-display: swap;
        }
        @font-face {
          font-family: 'Geist Mono';
          font-display: swap;
        }
      `;
      document.head.appendChild(style);
      
      // Preload critical fonts after page load
      const fonts = [
        'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800;900&display=swap',
        'https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&display=swap'
      ];
      
      fonts.forEach(fontUrl => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = fontUrl;
        document.head.appendChild(link);
      });
    };
    
    optimizeFonts();
  }, []);
  
  return null; // This component doesn't render anything
}