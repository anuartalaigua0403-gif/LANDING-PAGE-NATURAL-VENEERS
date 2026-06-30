'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import LanguageToggle from '@/components/ui/LanguageToggle'
import { useT } from '@/hooks/useLanguage'
import { ui } from '@/lib/translations'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const T = useT()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#products', label: T(ui.nav.products) },
    { href: '#process', label: T(ui.nav.process) },
    { href: '#results', label: T(ui.nav.results) },
    { href: '#about', label: T(ui.nav.about) },
    { href: '#contact', label: T(ui.nav.contact) },
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
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-display text-xl text-cream tracking-[0.15em]">NATURAL</span>
          <span className="font-display text-xl text-gold tracking-[0.15em]">VENEERS</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link href={link.href} key={link.href} className="font-body text-xs tracking-widest text-mist hover:text-gold transition-colors duration-300 uppercase">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <LanguageToggle />
          <button className="md:hidden flex flex-col gap-1.5 w-6" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" aria-expanded={menuOpen}>
            <span className={`block h-px bg-cream transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-px bg-cream transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-px bg-cream transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-obsidian/95 backdrop-blur-xl border-b border-gold/10 py-6 px-6 flex flex-col gap-5"
        >
          {navLinks.map((link) => (
            <Link href={link.href} key={link.href} onClick={() => setMenuOpen(false)} className="font-body text-sm tracking-widest text-mist hover:text-gold transition-colors duration-300 uppercase">
              {link.label}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.nav>
  )
}
