import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head>
        {/* ========== PRECONNECT - Only essential origins ========== */}
        {/* Google Fonts - Essential for above-the-fold content */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link 
          rel="preconnect" 
          href="https://fonts.gstatic.com" 
          crossOrigin="anonymous" 
        />
        
        {/* ========== PRELOAD CRITICAL FONTS ========== */}
        {/* Load Inter font with swap strategy for better performance */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
          media="print" 
          onLoad="this.media='all'" 
        />
        
        {/* ========== REMOVE UNUSED PRECONNECT ========== */}
        {/* Removed: <link rel="preconnect" href="https://www.dukainteriors.com" /> */}
        {/* This was causing unused preconnect warnings */}
        
        {/* ========== FAVICONS ========== */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* ========== META TAGS FOR BETTER CACHING ========== */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* ========== OPEN GRAPH ========== */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_ET" />
        <meta property="og:site_name" content="Duka Interiors" />
        
        {/* ========== TWITTER CARD ========== */}
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      
      <body className="antialiased bg-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}