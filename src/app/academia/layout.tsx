import type { Metadata } from 'next'

// Prototipo: no se indexa en buscadores hasta el lanzamiento.
export const metadata: Metadata = {
  title: 'Academia Natural Veneers — Formación online en cerámica dental',
  description: 'Formación online en cerámica dental de alta estética con el método del laboratorio Natural Veneers.',
  robots: { index: false, follow: false },
}

export default function AcademiaLayout({ children }: { children: React.ReactNode }) {
  return children
}
