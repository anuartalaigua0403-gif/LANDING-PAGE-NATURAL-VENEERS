'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useT } from '@/hooks/useLanguage'
import { ui } from '@/lib/translations'
import { formatWhatsAppUrl } from '@/lib/utils'
import type { ContactFormData } from '@/types'

export default function CTA() {
  const T = useT()
  const ref = useRef<HTMLDivElement>(null)h
  const inView = useInView(ref, { once: true, margin: '-10%' })

  const formT = {
    name: T(ui.cta.form.name),
    email: T(ui.cta.form.email),
    phone: T(ui.cta.form.phone),
    message: T(ui.cta.form.message),
    submit: T(ui.cta.form.submit),
    sending: T(ui.cta.form.sending),
    success: T(ui.cta.form.success),
    error: T(ui.cta.form.error),
  }

  const [form, setForm] = useState<Omit<ContactFormData, 'lang'>>({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    window.open(formatWhatsAppUrl(process.env.NEXT_PUBLIC_WHATSAPP || '573024240780', 'Nombre: ' + form.name + ' | Email: ' + form.email + ' | Tel: ' + (form.phone || '') + ' | Mensaje: ' + form.message), '_blank'); setStatus('success')
    try {
      /* disabled
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang: 'es' }),
      })
      const data: ContactApiResponse = await res.json()
      */
    } catch {
      // silent
    }
  }

  const inputClass =
    'w-full bg-transparent border-b border-gold/20 py-3 px-0 font-body text-sm text-cream placeholder:text-mist/30 focus:outline-none focus:border-gold transition-colors duration-300'

  return (
    <section id="contact" className="py-32 px-6 bg-void">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left: Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="inline-flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-px bg-gold" />
              <span className="font-body text-xs tracking-[0.25em] text-gold uppercase">
                {T(ui.cta.badge)}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl md:text-6xl text-cream mb-6 leading-tight"
            >
              {T(ui.cta.title)}{' '}
              <span className="text-gold">{T(ui.cta.title2)}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="font-body text-base text-mist/60 leading-relaxed mb-10 max-w-md"
            >
              {T(ui.cta.subtitle)}
            </motion.p>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              href={formatWhatsAppUrl(
                process.env.NEXT_PUBLIC_WHATSAPP || '573024240780',
                'Hola, me interesa conocer mas sobre sus carillas dentales.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-void font-body text-xs tracking-widest uppercase font-semibold hover:bg-gold-bright transition-colors duration-300 animate-[pulseGold_2s_ease-in-out_infinite]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {T(ui.cta.whatsapp)}
            </motion.a>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {status === 'success' ? (
              <div className="text-center py-16">
                <div className="w-12 h-12 border border-gold flex items-center justify-center mx-auto mb-6">
                  <span className="text-gold text-xl">&#10003;</span>
                </div>
                <p className="font-body text-sm text-cream/70">{formT.success}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <input
                    type="text"
                    required
                    placeholder={formT.name}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder={formT.email}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder={formT.phone}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <textarea
                    required
                    rows={4}
                    placeholder={formT.message}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {status === 'error' && (
                  <p className="font-body text-xs text-red-400">{formT.error}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-4 bg-gold text-void font-body text-xs tracking-widest uppercase font-semibold hover:bg-gold-bright disabled:opacity-60 transition-colors duration-300"
                >
                  {status === 'sending' ? formT.sending : formT.submit}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
