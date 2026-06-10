'use client'

import { useT } from '@/hooks/useLanguage'
import { ui } from '@/lib/translations'

export default function Marquee() {
  const T = useT()
  const items = T(ui.marquee.items as { es: readonly string[]; en: readonly string[] })
  // Duplicate for seamless loop
  const all = [...items, ...items]

  return (
    <section className="py-6 bg-gold/5 border-y border-gold/15 overflow-hidden">
      <div className="flex whitespace-nowrap" style={{ animation: 'marquee 30s linear infinite' }}>
        {all.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 px-6">
            <span className="font-display text-sm md:text-base tracking-[0.3em] text-gold uppercase">
              {item}
            </span>
            <span className="text-gold/30 text-xs">&#9670;</span>
          </span>
        ))}
      </div>
    </section>
  )
}
