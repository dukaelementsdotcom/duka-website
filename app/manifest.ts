// app/manifest.ts
import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Duka Interiors | Office Design & Build Addis Ababa',
    short_name: 'Duka Interiors',
    description: 'Expert interior design and turnkey construction services in Addis Ababa, Ethiopia.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#dc2626',
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],

  }
}