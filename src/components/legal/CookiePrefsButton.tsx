'use client'

import { openCookiePreferences } from '@/lib/consent'

export default function CookiePrefsButton() {
  return (
    <button
      type="button"
      onClick={openCookiePreferences}
      className="inline-flex items-center border border-gold/50 px-5 py-3 font-body text-xs tracking-widest uppercase text-cream hover:border-gold hover:text-gold transition-colors"
    >
      Configurar mis preferencias de cookies
    </button>
  )
}
