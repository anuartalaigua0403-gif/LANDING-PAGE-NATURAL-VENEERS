import type { Metadata } from 'next'

// Prototipo privado: no indexar hasta su aprobación.
export const metadata: Metadata = {
  title: 'The Anatomy Experience — Natural Veneers',
  description: 'Beyond the smile. Precision. Science. Art.',
  robots: { index: false, follow: false },
}

export default function AnatomiaLayout({ children }: { children: React.ReactNode }) {
  return children
}
