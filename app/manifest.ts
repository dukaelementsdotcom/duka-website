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
      {
        src: '/images/icons-duka-interiors/logo-duka-interiors-big.svg', // ✅ Use your SVG logo
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/images/icons-duka-interiors/logo-duka-interiors-big.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
        purpose: 'any maskable'
      },
      {
        src: '/images/icons-duka-interiors/logo-duka-interiors-big.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'any maskable'
      }
    ],
  }
}