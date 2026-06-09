import { useLanguageContext } from '@/context/LanguageContext'
import { t } from '@/lib/translations'
import type { Lang } from '@/types'

export function useLanguage() {
  return useLanguageContext()
}

export function useT() {
  const { lang } = useLanguageContext()
  return function translate<T>(obj: { es: T; en: T }): T {
    return t(obj, lang)
  }
}

export type { Lang }
