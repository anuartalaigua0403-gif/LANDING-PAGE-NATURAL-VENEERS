'use client'

import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { formatWhatsAppUrl } from '@/lib/utils'
import { WA_LAB, WA_MSG_LAB } from '@/lib/whatsapp'

const LINKS = [
  { href: '#experiencia', label: 'Experiencia' },
  { href: '#materiales', label: 'Materiales' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#odontologos', label: 'Odontólogos' },
]

export default function AnatomyNavbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/" className="font-display text-sm tracking-[0.35em] text-[#F8F8F6]">
          NATURAL <span className="text-[#C9A45C]">VENEERS</span>
        </Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Secciones">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="font-body text-[10px] font-medium uppercase tracking-[0.3em] text-[#A1A1AA] transition-colors hover:text-[#E8D3A0]">
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href={formatWhatsAppUrl(WA_LAB, WA_MSG_LAB)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-[#C9A45C]/60 px-4 py-2 font-body text-[10px] font-medium uppercase tracking-[0.25em] text-[#E8D3A0] transition-colors hover:bg-[#C9A45C] hover:text-[#050505]"
        >
          <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.5} /> <span className="hidden sm:inline">Request your case</span><span className="sm:hidden">WhatsApp</span>
        </a>
      </div>
    </header>
  )
}
