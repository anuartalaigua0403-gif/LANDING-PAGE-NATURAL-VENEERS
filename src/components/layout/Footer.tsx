'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useT } from '@/hooks/useLanguage'
import { ui } from '@/lib/translations'
import { formatWhatsAppUrl } from '@/lib/utils'
import { WA_LAB, WA_FORMACION, WA_MSG_LAB, WA_MSG_FORMACION } from '@/lib/whatsapp'

export default function Footer() {
  const T = useT()
  const year = new Date().getFullYear()
  const isTraining = /^\/(entrena|academia)/.test(usePathname() || '')
  const waUrl = isTraining
    ? formatWhatsAppUrl(WA_FORMACION, WA_MSG_FORMACION)
    : formatWhatsAppUrl(WA_LAB, WA_MSG_LAB)
  const waLabel = isTraining ? '+57 302 424 0780' : '+57 304 383 8031'

  const navLinks = [
    { href: '/#products', label: T(ui.nav.products) },
    { href: '/#process', label: T(ui.nav.process) },
    { href: '/#results', label: T(ui.nav.results) },
    { href: '/#about', label: T(ui.nav.about) },
    { href: '/#contact', label: T(ui.nav.contact) },
    { href: '/entrena', label: T(ui.nav.training) },
  ]

  return (
    <footer className="bg-obsidian border-t border-gold/10 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {!isTraining && (
          <div className="mb-14 pb-14 border-b border-gold/10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <div className="inline-flex items-center gap-3 mb-3">
                <div className="w-8 h-px bg-gold" />
                <span className="font-body text-xs tracking-[0.25em] text-gold uppercase">{T(ui.footer.igLabel)}</span>
              </div>
              <h3 className="font-display text-3xl md:text-4xl text-cream mb-2">{T(ui.footer.igTitle)}</h3>
              <p className="font-body text-sm text-mist/70 max-w-md">{T(ui.footer.igText)}</p>
            </div>
            <a
              href="https://www.instagram.com/naturalveneers.sas/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 border border-gold/40 px-8 py-4 hover:border-gold hover:bg-gold/5 transition-all duration-300 shrink-0"
            >
              <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span className="font-body text-sm text-cream tracking-widest uppercase group-hover:text-gold transition-colors duration-300">@naturalveneers.sas</span>
              <svg className="w-4 h-4 text-gold/60 group-hover:text-gold group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        )}
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
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="font-body text-sm text-mist/70 hover:text-gold transition-colors duration-300">
              {waLabel}
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
