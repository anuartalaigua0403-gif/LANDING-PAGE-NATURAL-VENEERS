'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useT } from '@/hooks/useLanguage'
import { ui } from '@/lib/translations'
import { LEGAL_LINKS } from '@/lib/legal'
import { OPEN_PREFS_EVENT, readConsent, saveConsent } from '@/lib/consent'

export default function CookieBanner() {
  const T = useT()
  const [open, setOpen] = useState(false)
  const [details, setDetails] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    // Aparece después de la pantalla de entrada si aún no hay una decisión guardada.
    const id = window.setTimeout(() => {
      if (!readConsent()) setOpen(true)
    }, 2800)
    const reopen = () => {
      const c = readConsent()
      setAnalytics(c?.analytics ?? false)
      setMarketing(c?.marketing ?? false)
      setDetails(true)
      setOpen(true)
    }
    window.addEventListener(OPEN_PREFS_EVENT, reopen)
    return () => {
      window.clearTimeout(id)
      window.removeEventListener(OPEN_PREFS_EVENT, reopen)
    }
  }, [])

  if (!open) return null

  const decide = (a: boolean, m: boolean) => {
    saveConsent(a, m)
    setOpen(false)
    setDetails(false)
  }

  const c = ui.cookies
  const Toggle = ({ checked, onChange, label, desc, disabled }: { checked: boolean; onChange?: (v: boolean) => void; label: string; desc: string; disabled?: boolean }) => (
    <label className={`flex items-start justify-between gap-4 py-3 border-t border-gold/10 ${disabled ? 'opacity-80' : 'cursor-pointer'}`}>
      <span>
        <span className="block font-body text-sm text-cream">{label}</span>
        <span className="block font-body text-xs text-mist/80 leading-relaxed mt-1">{desc}</span>
      </span>
      <input
        type="checkbox"
        className="mt-1 h-4 w-4 shrink-0 accent-[#C9A227]"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
      />
    </label>
  )

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="nv-cookie-title"
      className="fixed inset-x-3 bottom-3 sm:inset-x-auto sm:left-6 sm:bottom-6 z-[70] sm:max-w-md bg-obsidian/95 backdrop-blur border border-gold/25 shadow-2xl p-5 sm:p-6"
    >
      <p id="nv-cookie-title" className="font-display text-xl text-cream mb-2">{T(c.title)}</p>
      <p className="font-body text-xs sm:text-sm text-mist/90 leading-relaxed">
        {T(c.text)}{' '}
        <Link href={LEGAL_LINKS.cookies} className="text-gold underline underline-offset-2 hover:text-gold-bright">{T(c.policy)}</Link>
        {' · '}
        <Link href={LEGAL_LINKS.privacy} className="text-gold underline underline-offset-2 hover:text-gold-bright">{T(c.privacy)}</Link>
      </p>

      {details && (
        <div className="mt-4">
          <Toggle checked disabled label={T(c.necessary)} desc={T(c.necessaryDesc)} />
          <Toggle checked={analytics} onChange={setAnalytics} label={T(c.analytics)} desc={T(c.analyticsDesc)} />
          <Toggle checked={marketing} onChange={setMarketing} label={T(c.marketing)} desc={T(c.marketingDesc)} />
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {details ? (
          <button type="button" onClick={() => decide(analytics, marketing)} className="flex-1 min-w-[8rem] bg-gold text-void font-body text-xs tracking-widest uppercase px-4 py-3 hover:bg-gold-bright transition-colors">
            {T(c.save)}
          </button>
        ) : (
          <>
            <button type="button" onClick={() => decide(true, true)} className="flex-1 min-w-[8rem] bg-gold text-void font-body text-xs tracking-widest uppercase px-4 py-3 hover:bg-gold-bright transition-colors">
              {T(c.acceptAll)}
            </button>
            <button type="button" onClick={() => decide(false, false)} className="flex-1 min-w-[8rem] border border-gold/50 text-cream font-body text-xs tracking-widest uppercase px-4 py-3 hover:border-gold transition-colors">
              {T(c.rejectAll)}
            </button>
            <button type="button" onClick={() => setDetails(true)} className="w-full text-mist hover:text-gold font-body text-xs tracking-widest uppercase py-2 transition-colors">
              {T(c.configure)}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
