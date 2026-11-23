'use client'

import { usePathname } from 'next/navigation'
import { formatWhatsAppUrl } from '@/lib/utils'
import { WA_LAB, WA_FORMACION, WA_MSG_LAB, WA_MSG_FORMACION } from '@/lib/whatsapp'

export default function WhatsAppFloat() {
  const pathname = usePathname()
  const isTraining = /^\/(entrena|academia)/.test(pathname || '')

  const href = isTraining
    ? formatWhatsAppUrl(WA_FORMACION, WA_MSG_FORMACION)
    : formatWhatsAppUrl(WA_LAB, WA_MSG_LAB)
  const label = isTraining ? '¿Te interesa formarte? Escríbenos' : '¿Hablamos? Escríbenos'

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`WhatsApp — ${label}`}
      className="nv-wa group fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[70] flex items-center gap-3"
    >
      <span className="hidden sm:block pointer-events-none whitespace-nowrap font-body text-xs tracking-wide text-gold-bright bg-void/90 backdrop-blur-md border border-gold/40 px-4 py-2 opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
        {label} 🦷
      </span>
      <span className="nv-wa-btn relative flex items-center justify-center w-14 h-14 rounded-full text-void ring-1 ring-void/60 transition-transform duration-300 group-hover:scale-110">
        <span className="nv-wa-pulse absolute inset-0 rounded-full bg-gold" aria-hidden="true" />
        <svg className="relative w-7 h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </span>
      <style>{`
        .nv-wa{opacity:0;transform:translateY(16px);animation:nvWaIn .6s cubic-bezier(.16,1,.3,1) 2.4s forwards}
        .nv-wa-btn{background:linear-gradient(145deg,#F0CC6A 0%,#C9A227 55%,#9C7A16 100%);box-shadow:inset 0 1px 0 rgba(255,240,200,.55),0 0 0 3px #000,0 0 0 4px rgba(201,162,39,.55),0 8px 30px rgba(0,0,0,.5),0 0 22px rgba(201,162,39,.35);animation:nvWaGlow 3s ease-in-out 3s infinite}
        .nv-wa-pulse{animation:nvWaPulse 2.4s ease-out 3s infinite;opacity:0}
        @keyframes nvWaGlow{0%,100%{box-shadow:inset 0 1px 0 rgba(255,240,200,.55),0 0 0 3px #000,0 0 0 4px rgba(201,162,39,.55),0 8px 30px rgba(0,0,0,.5),0 0 18px rgba(201,162,39,.3)}50%{box-shadow:inset 0 1px 0 rgba(255,240,200,.55),0 0 0 3px #000,0 0 0 4px rgba(240,204,106,.8),0 8px 30px rgba(0,0,0,.5),0 0 34px rgba(240,204,106,.55)}}
        @keyframes nvWaIn{to{opacity:1;transform:none}}
        @keyframes nvWaPulse{0%{transform:scale(1);opacity:.35}100%{transform:scale(1.6);opacity:0}}
        @media (prefers-reduced-motion:reduce){.nv-wa{animation:none;opacity:1;transform:none}.nv-wa-pulse,.nv-wa-btn{animation:none}}
      `}</style>
    </a>
  )
}
