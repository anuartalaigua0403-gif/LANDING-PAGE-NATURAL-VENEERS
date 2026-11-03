import type { Metadata } from 'next'

// Prototipo privado: no indexar hasta su aprobación.
export const metadata: Metadata = {
  title: 'Experiencia anatómica — Natural Veneers',
  description: 'Más allá de la sonrisa. Precisión. Ciencia. Arte.',
  robots: { index: false, follow: false },
}

export default function AnatomiaLayout({ children }: { children: React.ReactNode }) {
  return children
}
