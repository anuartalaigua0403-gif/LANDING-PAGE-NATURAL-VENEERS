// Gestión del consentimiento de cookies/almacenamiento.
// Hoy el sitio NO usa cookies analíticas ni publicitarias. Este módulo deja listo el control:
// cualquier herramienta futura (GA4, Meta Pixel, etc.) debe cargarse SOLO si hasConsent('analytics'|'marketing').
export type ConsentCategory = 'analytics' | 'marketing'
export interface ConsentState {
  v: number
  necessary: true
  analytics: boolean
  marketing: boolean
  date: string
}

const KEY = 'nv-consent'
export const CONSENT_VERSION = 1
export const CONSENT_EVENT = 'nv-consent-change'
export const OPEN_PREFS_EVENT = 'nv-open-cookie-prefs'

export function readConsent(): ConsentState | null {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return null
    const c = JSON.parse(raw) as ConsentState
    return c && c.v === CONSENT_VERSION ? c : null
  } catch {
    return null
  }
}

export function saveConsent(analytics: boolean, marketing: boolean): ConsentState {
  const c: ConsentState = { v: CONSENT_VERSION, necessary: true, analytics, marketing, date: new Date().toISOString() }
  try {
    window.localStorage.setItem(KEY, JSON.stringify(c))
  } catch {
    /* almacenamiento bloqueado: se respeta la decisión solo en esta visita */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: c }))
  return c
}

export function hasConsent(cat: ConsentCategory): boolean {
  if (typeof window === 'undefined') return false
  return readConsent()?.[cat] === true
}

export function openCookiePreferences() {
  window.dispatchEvent(new Event(OPEN_PREFS_EVENT))
}
