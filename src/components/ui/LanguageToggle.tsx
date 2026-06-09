'use client'

import { useLanguage } from '@/hooks/useLanguage'

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <button
      onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
      className="relative flex items-center gap-1 text-xs font-body font-medium tracking-widest text-mist hover:text-gold transition-colors duration-300 uppercase"
      aria-label="Toggle language"
    >
      <span className={lang === 'es' ? 'text-gold' : 'text-mist/50'}>ES</span>
      <span className="text-mist/30">|</span>
      <span className={lang === 'en' ? 'text-gold' : 'text-mist/50'}>EN</span>
    </button>
  )
}
