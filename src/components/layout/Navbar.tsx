'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import LanguageToggle from '@/components/ui/LanguageToggle'
import { useT } from '@/hooks/useLanguage'
import { ui } from '@/lib/translations'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const T = useT()
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // On non-home pages, anchor links must go back home first
  const hrefFor = (anchor: string) => (isHome ? anchor : `/${anchor}`)

  const navLinks = [
    { href: hrefFor('#products'), label: T(ui.nav.products) },
    { href: hrefFor('#process'),  label: T(ui.nav.process)  },
    { href: hrefFor('#results'),  label: T(ui.nav.results)  },
    { href: hrefFor('#about'),    label: T(ui.nav.about)    },
    { href: hrefFor('#contact'),  label: T(ui.nav.contact)  },
  ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 2.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3 bg-void/80 backdrop-blur-xl border-b border-gold/10' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-display text-xl text-cream tracking-[0.15em]">NATURAL</span>
          <span className="font-display text-xl text-gold  tracking-[0.15em]">VENEERS</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className="font-body text-xs tracking-widest text-mist hover:text-gold transition-colors duration-300 uppercase"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side: toggle + CTA + hamburger */}
        <div className="flex items-center gap-4">
          <LanguageToggle />

          {/* ── "Entrena con Nosotros" CTA button ── */}
          <Link
            href="/entrena"
            className="hidden md:inline-flex items-center px-5 py-2 bg-gold/10 border border-gold/40 text-gold font-body text-xs tracking-widest uppercase hover:bg-gold hover:text-void transition-all duration-300"
          >
            Entrena con Nosotros
          </Link>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 w-6"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`block h-px bg-cream transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-px bg-cream transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-px bg-cream transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-obsidian/95 backdrop-blur-xl border-b border-gold/10 py-6 px-6 flex flex-col gap-5"
        >
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-body text-sm tracking-widest text-mist hover:text-gold transition-colors duration-300 uppercase"
            >
              {link.label}
            </Link>
          ))}
          {/* Mobile CTA */}
          <Link
            href="/entrena"
            onClick={() => setMenuOpen(false)}
            className="mt-2 inline-flex justify-center px-6 py-3 bg-gold text-void font-body text-xs tracking-widest uppercase font-semibold hover:bg-gold-bright transition-colors duration-300"
          >
            Entrena con Nosotros
          </Link>
        </motion.div>
      )}
    </motion.nav>
  )
}
