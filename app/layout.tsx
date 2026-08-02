import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Pixelify_Sans } from 'next/font/google'
import { BackgroundEffects } from '@/components/background-effects'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { BackToTop } from '@/components/back-to-top'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const pixelify = Pixelify_Sans({
  subsets: ['latin'],
  variable: '--font-pixelify',
})

export const metadata: Metadata = {
  title: {
    default:
      'Shodzery — Desarrollador y Configurador Profesional de Servidores Minecraft',
    template: '%s · Shodzery',
  },
  description:
    'Desarrollo de plugins y mods, configuración de Paper, Purpur, Folia y Fabric, redes Velocity, optimización extrema de TPS, RAM y CPU, y soluciones personalizadas para servidores de Minecraft.',
  keywords: [
    'Minecraft',
    'plugins',
    'mods',
    'Paper',
    'Purpur',
    'Folia',
    'Fabric',
    'NeoForge',
    'Velocity',
    'optimización',
    'LuckPerms',
    'MythicMobs',
    'ItemsAdder',
    'Shodzery',
  ],
  generator: 'v0.app',
  openGraph: {
    title: 'Main • Shodzery',
    description:
      'Plugins, mods, redes, optimización extrema y configuraciones premium para servidores de Minecraft.',
    type: 'website',
  },
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png' }],
    apple: '/icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0d0a14',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`bg-background ${spaceGrotesk.variable} ${pixelify.variable}`}
    >
      <body className="antialiased font-sans">
        <BackgroundEffects />
        <Navbar />
        {children}
        <Footer />
        <BackToTop />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
