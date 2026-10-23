'use client'

import { useState } from 'react'
import { formatWhatsAppUrl } from '@/lib/utils'
import { WA_FORMACION } from '@/lib/whatsapp'
import { LEADS_ENDPOINT, LAUNCH_LABEL, PROFILES, LEVELS, INTERESTS, COUNTRY_CODES } from '@/lib/academia'

type Data = {
  nombre: string
  correo: string
  indicativo: string
  telefono: string
  pais: string
  ciudad: string
  perfil: string
  experiencia: string
  intereses: string[]
  autoriza: boolean
  website: string // honeypot
}

const EMPTY: Data = {
  nombre: '', correo: '', indicativo: '57', telefono: '', pais: 'Colombia', ciudad: '',
  perfil: '', experiencia: '', intereses: [], autoriza: false, website: '',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(d: Data) {
  const e: Partial<Record<keyof Data, string>> = {}
  if (d.nombre.trim().length < 3) e.nombre = 'Escribe tu nombre completo.'
  if (!EMAIL_RE.test(d.correo.trim())) e.correo = 'Revisa tu correo electrónico.'
  const digits = d.telefono.replace(/\D/g, '')
  if (digits.length < 7 || digits.length > 12) e.telefono = 'Escribe un número válido.'
  if (!d.perfil) e.perfil = 'Elige tu perfil.'
  if (!d.autoriza) e.autoriza = 'Necesitamos tu autorización para contactarte.'
  return e
}

function waMessage(d: Data) {
  const lines = [
    'Hola 👋🦷 Quiero recibir información anticipada de la Academia Natural Veneers ✨',
    '',
    `• Nombre: ${d.nombre.trim()}`,
    `• Correo: ${d.correo.trim()}`,
    `• WhatsApp: +${d.indicativo} ${d.telefono.trim()}`,
    `• Ubicación: ${[d.ciudad.trim(), d.pais.trim()].filter(Boolean).join(', ')}`,
    `• Perfil: ${d.perfil}`,
  ]
  if (d.experiencia) lines.push(`• Experiencia: ${d.experiencia}`)
  if (d.intereses.length) lines.push(`• Me interesa: ${d.intereses.join(', ')}`)
  return lines.join('\n')
}

const STYLES = `
        .nv-form-card{background:linear-gradient(160deg,rgba(201,162,39,.12),rgba(10,9,6,.72) 40%,rgba(10,9,6,.85));border:1px solid rgba(240,204,106,.3);
          box-shadow:0 40px 120px -40px rgba(0,0,0,.9),0 0 80px -30px rgba(201,162,39,.3),inset 0 1px 0 rgba(240,204,106,.22);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
        .nv-in{border-radius:0;-webkit-appearance:none;appearance:none}
        select.nv-in{background-image:linear-gradient(45deg,transparent 50%,#C9A227 50%),linear-gradient(135deg,#C9A227 50%,transparent 50%);background-position:calc(100% - 10px) 55%,calc(100% - 5px) 55%;background-size:5px 5px;background-repeat:no-repeat;padding-right:18px}
        .nv-in:-webkit-autofill{-webkit-text-fill-color:#F5F0E8;-webkit-box-shadow:0 0 0 40px #0d0b07 inset;caret-color:#F5F0E8}
        .nv-chip{font-family:Inter,system-ui,sans-serif;font-size:12px;letter-spacing:.04em;padding:9px 16px;border:1px solid rgba(201,162,39,.28);color:rgba(245,240,232,.78);background:rgba(0,0,0,.25);transition:all .25s}
        .nv-chip:hover{border-color:rgba(240,204,106,.6);color:#F5F0E8}
        .nv-chip.on{background:linear-gradient(135deg,#F0CC6A,#C9A227);border-color:#C9A227;color:#000;font-weight:500}
        .nv-check-in{appearance:none;-webkit-appearance:none;width:18px;height:18px;flex:none;border:1px solid rgba(201,162,39,.55);background:transparent;display:grid;place-items:center;cursor:pointer}
        .nv-check-in:checked{background:#C9A227}
        .nv-check-in:checked::after{content:"";width:5px;height:9px;border:solid #000;border-width:0 2px 2px 0;transform:rotate(45deg) translate(-1px,-1px)}
        .nv-check{background:linear-gradient(145deg,#F0CC6A,#C9A227 60%,#9C7A16);box-shadow:0 0 0 8px rgba(201,162,39,.12),0 0 50px rgba(240,204,106,.4)}
      `

export default function WaitlistForm() {
  const [d, setD] = useState<Data>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof Data, string>>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [sent, setSent] = useState<Data | null>(null)

  const set = <K extends keyof Data>(k: K, v: Data[K]) => {
    setD((p) => ({ ...p, [k]: v }))
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }))
  }
  const toggleInterest = (i: string) =>
    set('intereses', d.intereses.includes(i) ? d.intereses.filter((x) => x !== i) : [...d.intereses, i])

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    const e = validate(d)
    setErrors(e)
    const bad = (Object.keys(e) as (keyof Data)[])
    if (bad.length) {
      const order: [keyof Data, string][] = [['nombre', 'nv-nombre'], ['correo', 'nv-correo'], ['telefono', 'nv-tel'], ['perfil', 'nv-perfil'], ['autoriza', 'nv-autoriza']]
      const first = order.find(([k]) => bad.includes(k))
      const el = first ? document.getElementById(first[1]) : null
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        if (el instanceof HTMLInputElement) setTimeout(() => el.focus({ preventScroll: true }), 400)
      }
      return
    }
    if (d.website) { setStatus('done'); setSent(d); return } // bot
    setStatus('sending')
    try {
      if (LEADS_ENDPOINT) {
        await fetch(LEADS_ENDPOINT, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            nombre: d.nombre.trim(), correo: d.correo.trim(), whatsapp: `+${d.indicativo} ${d.telefono.trim()}`,
            pais: d.pais.trim(), ciudad: d.ciudad.trim(), perfil: d.perfil, experiencia: d.experiencia,
            intereses: d.intereses, autoriza: d.autoriza, origen: 'Academia — acceso anticipado',
          }),
        })
      }
      setSent(d)
      setStatus('done')
      setTimeout(() => document.getElementById('acceso')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
    } catch {
      setStatus('error')
    }
  }

  const field = 'nv-in w-full bg-transparent border-0 border-b py-3 font-body text-sm text-cream placeholder:text-mist/35 focus:outline-none transition-colors duration-300'
  const lbl = 'block font-body text-[10px] tracking-[0.25em] uppercase text-mist/70 mb-1'
  const err = (k: keyof Data) =>
    errors[k] ? <p className="mt-2 font-body text-[11px] text-[#e8a0a0]" role="alert">{errors[k]}</p> : null
  const bc = (k: keyof Data) => (errors[k] ? 'border-[#c97a7a]' : 'border-gold/25 focus:border-gold')

  if (status === 'done' && sent) {
    const wa = formatWhatsAppUrl(WA_FORMACION, waMessage(sent))
    return (
      <>
      <style>{STYLES}</style>
      <div className="nv-form-card text-center px-8 py-14 md:px-12">
        <div className="nv-check mx-auto mb-8 flex items-center justify-center w-16 h-16 rounded-full">
          <svg className="w-7 h-7 text-void" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="font-body text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Registro recibido</p>
        <h3 className="font-display text-3xl md:text-4xl mb-4">¡Gracias, {sent.nombre.trim().split(' ')[0]}!</h3>
        <p className="font-body text-sm text-mist/75 leading-relaxed max-w-sm mx-auto mb-8">
          {LEADS_ENDPOINT
            ? `Ya estás en la lista. Te avisaremos antes del lanzamiento de ${LAUNCH_LABEL}.`
            : 'Para completar tu registro, envíanos tus datos por WhatsApp con un solo toque.'}
        </p>
        <a href={wa} target="_blank" rel="noopener noreferrer" className="nv-cta relative inline-flex items-center justify-center gap-3 px-8 py-4 font-body text-xs font-semibold tracking-[0.18em] uppercase text-void overflow-hidden">
          <span className="relative z-10">{LEADS_ENDPOINT ? 'Escríbenos por WhatsApp' : 'Enviar por WhatsApp'}</span>
        </a>
        <button type="button" onClick={() => { setD(EMPTY); setSent(null); setStatus('idle') }} className="block mx-auto mt-6 font-body text-[11px] tracking-[0.2em] uppercase text-mist/60 hover:text-gold transition-colors">
          Registrar a otra persona
        </button>
      </div>
      </>
    )
  }

  return (
    <>
    <style>{STYLES}</style>
    <form onSubmit={onSubmit} noValidate className="nv-form-card px-6 py-9 sm:px-10 sm:py-11">
      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-7">
        <div className="sm:col-span-2">
          <label htmlFor="nv-nombre" className={lbl}>Nombre completo *</label>
          <input id="nv-nombre" autoComplete="name" value={d.nombre} onChange={(e) => set('nombre', e.target.value)} placeholder="Ej. Laura Gómez" className={`${field} ${bc('nombre')}`} aria-invalid={!!errors.nombre} />
          {err('nombre')}
        </div>

        <div>
          <label htmlFor="nv-correo" className={lbl}>Correo electrónico *</label>
          <input id="nv-correo" type="email" inputMode="email" autoComplete="email" value={d.correo} onChange={(e) => set('correo', e.target.value)} placeholder="tucorreo@ejemplo.com" className={`${field} ${bc('correo')}`} aria-invalid={!!errors.correo} />
          {err('correo')}
        </div>

        <div>
          <label htmlFor="nv-tel" className={lbl}>WhatsApp *</label>
          <div className="flex gap-3">
            <select aria-label="Indicativo del país" value={d.indicativo} onChange={(e) => set('indicativo', e.target.value)} className={`${field.replace('w-full ', '')} ${bc('telefono')} w-[96px] shrink-0 cursor-pointer`}>
              {COUNTRY_CODES.map((c) => <option key={c.code} value={c.code} className="bg-jet">{c.label}</option>)}
            </select>
            <input id="nv-tel" type="tel" inputMode="tel" autoComplete="tel-national" value={d.telefono} onChange={(e) => set('telefono', e.target.value)} placeholder="300 000 0000" className={`${field} ${bc('telefono')} min-w-0 flex-1`} aria-invalid={!!errors.telefono} />
          </div>
          {err('telefono')}
        </div>

        <div>
          <label htmlFor="nv-pais" className={lbl}>País</label>
          <input id="nv-pais" autoComplete="country-name" value={d.pais} onChange={(e) => set('pais', e.target.value)} className={`${field} ${bc('pais')}`} />
        </div>
        <div>
          <label htmlFor="nv-ciudad" className={lbl}>Ciudad</label>
          <input id="nv-ciudad" autoComplete="address-level2" value={d.ciudad} onChange={(e) => set('ciudad', e.target.value)} placeholder="Ej. Barranquilla" className={`${field} ${bc('ciudad')}`} />
        </div>

        <div className="sm:col-span-2">
          <span className={lbl}>¿Cuál es tu perfil? *</span>
          <div id="nv-perfil" className="flex flex-wrap gap-2.5 mt-3 scroll-mt-32" role="radiogroup" aria-label="Perfil">
            {PROFILES.map((p) => (
              <button key={p} type="button" role="radio" aria-checked={d.perfil === p} onClick={() => set('perfil', p)} className={`nv-chip ${d.perfil === p ? 'on' : ''}`}>{p}</button>
            ))}
          </div>
          {err('perfil')}
        </div>

        <div className="sm:col-span-2">
          <span className={lbl}>Tu experiencia en cerámica</span>
          <div className="flex flex-wrap gap-2.5 mt-3" role="radiogroup" aria-label="Experiencia">
            {LEVELS.map((l) => (
              <button key={l} type="button" role="radio" aria-checked={d.experiencia === l} onClick={() => set('experiencia', d.experiencia === l ? '' : l)} className={`nv-chip ${d.experiencia === l ? 'on' : ''}`}>{l}</button>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2">
          <span className={lbl}>¿Qué te interesa? <span className="normal-case tracking-normal text-mist/50">(puedes elegir varios)</span></span>
          <div className="flex flex-wrap gap-2.5 mt-3">
            {INTERESTS.map((i) => (
              <button key={i} type="button" aria-pressed={d.intereses.includes(i)} onClick={() => toggleInterest(i)} className={`nv-chip ${d.intereses.includes(i) ? 'on' : ''}`}>{i}</button>
            ))}
          </div>
        </div>

        {/* honeypot anti-spam */}
        <input type="text" tabIndex={-1} autoComplete="off" value={d.website} onChange={(e) => set('website', e.target.value)} className="hidden" aria-hidden="true" />

        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input id="nv-autoriza" type="checkbox" checked={d.autoriza} onChange={(e) => set('autoriza', e.target.checked)} className="nv-check-in mt-0.5" />
            <span className="font-body text-xs text-mist/70 leading-relaxed">
              Autorizo a Natural Veneers S.A.S. a tratar mis datos personales para enviarme información sobre la Academia, conforme a la Ley 1581 de 2012. Puedo solicitar su eliminación en cualquier momento.
            </span>
          </label>
          {err('autoriza')}
        </div>
      </div>

      {Object.values(errors).some(Boolean) && (
        <p className="mt-8 -mb-4 text-center font-body text-xs text-[#e8a0a0]" role="alert">
          Revisa los campos marcados en rojo para completar tu registro.
        </p>
      )}
      <button type="submit" disabled={status === 'sending'} className="nv-cta relative mt-10 w-full inline-flex items-center justify-center gap-3 px-8 py-5 font-body text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-void overflow-hidden disabled:opacity-70">
        <span className="relative z-10">{status === 'sending' ? 'Enviando…' : 'Quiero acceso anticipado'}</span>
      </button>
      {status === 'error' && (
        <p className="mt-4 text-center font-body text-xs text-[#e8a0a0]" role="alert">No pudimos enviar tu registro. Inténtalo de nuevo o escríbenos por WhatsApp.</p>
      )}
      <p className="mt-5 text-center font-body text-[11px] text-mist/50">Sin spam. Solo información de la Academia y su lanzamiento.</p>

    </form>
    </>
  )
}
