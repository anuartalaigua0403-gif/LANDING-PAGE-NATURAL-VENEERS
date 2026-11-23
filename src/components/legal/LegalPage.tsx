import type { ReactNode } from 'react'
import { COMPANY, LEGAL_EFFECTIVE_DATE, LEGAL_VERSION } from '@/lib/legal'

export interface LegalSection {
  id: string
  title: string
  body: ReactNode
}

export default function LegalPage({ label, title, intro, sections }: { label: string; title: string; intro?: ReactNode; sections: LegalSection[] }) {
  return (
    <article className="bg-void pt-36 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="w-8 h-px bg-gold" />
          <span className="font-body text-xs tracking-[0.25em] text-gold uppercase">{label}</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl text-cream leading-tight mb-4">{title}</h1>
        <p className="font-body text-xs text-mist/70 mb-2">
          {COMPANY.legalName} · NIT {COMPANY.nit} · {COMPANY.city}, {COMPANY.country}
        </p>
        <p className="font-body text-xs text-mist/70 mb-2">
          Versión {LEGAL_VERSION} · Vigente desde el {LEGAL_EFFECTIVE_DATE}
        </p>
        <p lang="en" className="font-body text-xs text-mist/50 italic mb-10">
          This document is published in Spanish, which is the governing version.
        </p>

        {intro && <div className="legal-prose mb-10">{intro}</div>}

        <nav aria-label="Contenido" className="mb-12 border border-gold/15 p-5">
          <p className="font-body text-xs tracking-widest text-gold uppercase mb-3">Contenido</p>
          <ol className="list-decimal pl-5 space-y-1">
            {sections.map((s) => (
              <li key={s.id} className="font-body text-sm text-mist/90">
                <a href={`#${s.id}`} className="hover:text-gold transition-colors">{s.title}</a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="legal-prose">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-32 mb-10">
              <h2>{i + 1}. {s.title}</h2>
              {s.body}
            </section>
          ))}
        </div>
      </div>
    </article>
  )
}
