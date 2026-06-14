'use client'

import { useT } from '@/hooks/useLanguage'
import { ui } from '@/lib/translations'

type StatItem = { value: string; label: string }

export default function Stats() {
    const T = useT()
    const items = T(ui.stats.items as { es: readonly StatItem[]; en: readonly StatItem[] })

  return (
        <section className="py-24 px-6 bg-jet border-y border-gold/10">
              <div className="max-w-7xl mx-auto">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {items.map((item, i) => (
                      <div key={i} className="text-center">
                                    <div className="font-display text-5xl md:text-6xl text-gold mb-3">
                                      {item.value}
                                    </div>
                                    <div className="w-8 h-px bg-gold/30 mx-auto mb-3" />
                                    <p className="font-body text-xs tracking-widest text-mist/50 uppercase">{item.label}</p>
                      </div>
                    ))}
                      </div>
              </div>
        </section>
      )
}
