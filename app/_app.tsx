'use client';

import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  // Prevent layout shift on hydration
  useEffect(() => {
    // Make body visible after hydration to prevent FOUC
    document.body.style.visibility = 'visible';
    
    // Clean up
    return () => {
      document.body.style.visibility = '';
    };
  }, []);

  return <Component {...pageProps} />;
}