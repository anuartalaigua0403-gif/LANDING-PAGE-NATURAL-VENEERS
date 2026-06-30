'use client'

import Link from 'next/link'
import { useT } from '@/hooks/useLanguage'
import { ui } from '@/lib/translations'

export default function Footer() {
  const T = useT()
  const year = new Date().getFullYear()

  const navLinks = [
    { href: '#products', label: T(ui.nav.products) },
    { href: '#process', label: T(ui.nav.process) },
    { href: '#results', label: T(ui.nav.results) },
    { href: '#about', label: T(ui.nav.about) },
    { href: '#contact', label: T(ui.nav.contact) },
  ]

  return (
    <footer className="bg-obsidian border-t border-gold/10 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          <div className="max-w-xs">
            <div className="flex flex-col leading-none mb-4">
              <span className="font-display text-2xl text-cream tracking-[0.15em]">NATURAL</span>
              <span className="font-display text-2xl text-gold tracking-[0.15em]">VENEERS</span>
            </div>
            <p className="font-body text-sm text-mist/70 leading-relaxed">{T(ui.footer.tagline)}</p>
          </div>
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link href={link.href} key={link.href} className="font-body text-xs tracking-widest text-mist/60 hover:text-gold transition-colors duration-300 uppercase">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <a href="https://wa.me/573043838031" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-mist/70 hover:text-gold transition-colors duration-300">
              +57 304 383 8031
            </a>
            <span className="font-body text-sm text-mist/40">{T(ui.footer.location)}</span>
          </div>
        </div>
        <div className="border-t border-gold/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-mist/30">© {year} Natural Veneers. {T(ui.footer.rights)}</p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>
      </div>
    </footer>
  )
}
