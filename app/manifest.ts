import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Duka Interiors | Office Design & Build Addis Ababa',
    short_name: 'Duka Interiors',
    description: 'Expert interior design and turnkey construction services in Addis Ababa, Ethiopia.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#dc2626', // This is your Duka Red hex code
    icons: [
      {
        src: '/icon.png', // This uses the icon you added to your app folder
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}