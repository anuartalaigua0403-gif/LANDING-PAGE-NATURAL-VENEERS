import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(' ')
}

export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function formatWhatsAppUrl(phone: string, message?: string): string {
  const base = `https://wa.me/${phone}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}
