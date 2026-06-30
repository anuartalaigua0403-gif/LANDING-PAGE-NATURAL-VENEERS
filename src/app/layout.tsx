import type { Metadata, Viewport } from 'next'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'
import { PreloaderProvider } from '@/context/PreloaderContext'
import Preloader from '@/components/ui/Preloader'
import Cursor from '@/components/ui/Cursor'
import Particles from '@/components/ui/Particles'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Natural Veneers — Laboratorio Dental Premium | Colombia',
  description:
    'Fabricamos carillas dentales de porcelana de máxima calidad para clínicos que no aceptan compromisos.',
  openGraph: {
    title: 'Natural Veneers',
    description: 'Arte en porcelana.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <PreloaderProvider>
          <LanguageProvider>
            <Preloader />
            <Cursor />
            <Particles />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </LanguageProvider>
        </PreloaderProvider>
      </body>
    </html>
  )
}
