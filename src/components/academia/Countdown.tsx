'use client'

import { useEffect, useState } from 'react'
import { LAUNCH_DATE, LAUNCH_LABEL } from '@/lib/academia'

type Parts = { d: number; h: number; m: number; s: number }

function getParts(target: number): Parts {
  const diff = Math.max(0, target - Date.now())
  return {
    d: Math.floor(diff / 86_400_000),
    h: Math.floor((diff / 3_600_000) % 24),
    m: Math.floor((diff / 60_000) % 60),
    s: Math.floor((diff / 1000) % 60),
  }
}

const pad = (n: number) => String(n).padStart(2, '0')

export default function Countdown() {
  const target = new Date(LAUNCH_DATE).getTime()
  const [parts, setParts] = useState<Parts | null>(null)

  useEffect(() => {
    setParts(getParts(target))
    const id = setInterval(() => setParts(getParts(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const launched = parts !== null && parts.d + parts.h + parts.m + parts.s === 0
  const units: [string, string][] = [
    [parts ? String(parts.d) : '—', 'Días'],
    [parts ? pad(parts.h) : '—', 'Horas'],
    [parts ? pad(parts.m) : '—', 'Minutos'],
    [parts ? pad(parts.s) : '—', 'Segundos'],
  ]

  return (
    <div className="nv-count mx-auto max-w-2xl" role="timer" aria-label={`Lanzamiento oficial: ${LAUNCH_LABEL}`}>
      <p className="font-body text-[10px] md:text-[11px] tracking-[0.35em] uppercase text-gold/90 mb-5">
        {launched ? 'Ya estamos en vivo' : `Lanzamiento oficial · ${LAUNCH_LABEL}`}
      </p>
      <div className="flex items-stretch justify-center">
        {units.map(([v, l], i) => (
          <div key={l} className="flex items-stretch">
            {i > 0 && <span className="nv-count-sep" aria-hidden="true" />}
            <div className="px-4 sm:px-7 md:px-9 text-center">
              <span key={v} className={`block font-display font-light text-4xl sm:text-5xl md:text-6xl leading-none text-cream tabular-nums ${l === 'Segundos' ? 'nv-tick' : ''}`}>
                {v}
              </span>
              <span className="block mt-3 font-body text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-mist/60">{l}</span>
            </div>
          </div>
        ))}
      </div>
      <a href="#acceso" className="group inline-flex items-center gap-2 mt-7 font-body text-[11px] tracking-[0.25em] uppercase text-gold-bright/90 hover:text-gold-bright transition-colors">
        <span className="border-b border-gold/40 group-hover:border-gold-bright pb-1 transition-colors">Recibe información anticipada</span>
        <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>
      <style>{`
        .nv-count{padding:26px 8px 24px;border-top:1px solid rgba(201,162,39,.22);border-bottom:1px solid rgba(201,162,39,.22);
          background:linear-gradient(90deg,transparent,rgba(201,162,39,.06) 50%,transparent)}
        .nv-count-sep{width:1px;align-self:stretch;margin:4px 0 22px;background:linear-gradient(180deg,transparent,rgba(201,162,39,.45),transparent)}
        .nv-tick{animation:nvTick .6s ease}
        @keyframes nvTick{from{opacity:.35;transform:translateY(-3px)}to{opacity:1;transform:none}}
        @media (prefers-reduced-motion:reduce){.nv-tick{animation:none}}
      `}</style>
    </div>
  )
}
