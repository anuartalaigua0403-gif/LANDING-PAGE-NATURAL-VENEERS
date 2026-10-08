'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  HOTMART_URL,
  CTA_LABEL,
  FREE_VIDEO_EMBED,
  MODULES,
  OUTCOMES,
  INCLUDES,
  FAQS,
} from '@/lib/academia'

const ease = [0.16, 1, 0.3, 1] as const
const ctaHref = HOTMART_URL || '#oferta'
const ctaExternal = Boolean(HOTMART_URL)

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ delay, duration: 0.9, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3 mb-6">
      <div className="w-8 h-px bg-gold" />
      <span className="font-body text-xs tracking-[0.3em] text-gold uppercase">{children}</span>
      <div className="w-8 h-px bg-gold" />
    </div>
  )
}

function CtaButton({ size = 'lg', className = '' }: { size?: 'lg' | 'md'; className?: string }) {
  const pad = size === 'lg' ? 'px-10 py-5 text-sm' : 'px-6 py-4 text-xs'
  return (
    <a
      href={ctaHref}
      {...(ctaExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`nv-cta group relative inline-flex items-center justify-center gap-3 ${pad} font-body font-semibold tracking-[0.18em] uppercase text-void overflow-hidden ${className}`}
    >
      <span className="relative z-10">{CTA_LABEL}</span>
      <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
      </svg>
    </a>
  )
}

function LockIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="1.5" strokeWidth={1.4} />
      <path d="M8 11V8a4 4 0 118 0v3" strokeWidth={1.4} strokeLinecap="round" />
    </svg>
  )
}

export default function AcademiaPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [showBar, setShowBar] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowBar(window.scrollY > 900)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="relative bg-void text-cream overflow-hidden">
      {/* ---------- HERO + VIDEO GRATIS ---------- */}
      <section className="relative pt-36 md:pt-44 pb-24 px-6">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-[0.12]" style={{ background: 'radial-gradient(circle, #C9A227 0%, transparent 65%)' }} />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <Reveal>
            <span className="inline-block mb-8 px-3 py-1 border border-gold/40 font-body text-[10px] tracking-[0.3em] uppercase text-gold-bright/80">
              Prototipo · No publicado
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <Label>Academia Natural Veneers</Label>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display font-light text-5xl md:text-7xl lg:text-8xl leading-[1.02] tracking-tight">
              El arte de la carilla perfecta,
              <span className="block text-gold italic">ahora en tus manos.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-body text-base md:text-lg text-mist/80 max-w-2xl mx-auto mt-8 leading-relaxed">
              Formación online en cerámica dental de alta estética, con el método que aplicamos cada día en el laboratorio Natural Veneers.
            </p>
          </Reveal>

          {/* Video gratuito */}
          <Reveal delay={0.3} className="mt-14 md:mt-16">
            <div className="nv-frame relative mx-auto max-w-5xl aspect-video overflow-hidden">
              {FREE_VIDEO_EMBED ? (
                <iframe
                  src={FREE_VIDEO_EMBED}
                  title="Clase gratuita — Academia Natural Veneers"
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <Image
                    src="/img/training/evento-formacion.jpg"
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    className="object-cover scale-105 blur-[2px] brightness-[0.45]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/20 to-void/40" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6">
                    <div className="nv-play relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full">
                      <svg className="w-8 h-8 md:w-10 md:h-10 ml-1 text-void" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M8 5.14v13.72a1 1 0 001.52.85l10.6-6.86a1 1 0 000-1.7L9.52 4.29A1 1 0 008 5.14z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-display text-2xl md:text-4xl text-cream">Clase gratuita</p>
                      <p className="font-body text-[11px] md:text-xs tracking-[0.25em] uppercase text-gold mt-2">3 a 5 minutos · Video horizontal</p>
                    </div>
                  </div>
                  <span className="absolute top-4 left-4 px-2 py-1 bg-void/70 border border-gold/30 font-body text-[10px] tracking-[0.2em] uppercase text-mist/80">
                    Video en edición
                  </span>
                </>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.35} className="mt-12 flex flex-col items-center gap-4">
            <CtaButton />
            <p className="font-body text-xs text-mist/60 tracking-wide">Pago seguro y acceso inmediato a través de Hotmart</p>
          </Reveal>
        </div>
      </section>

      {/* ---------- LO QUE VAS A LOGRAR ---------- */}
      <section className="relative py-28 px-6 bg-jet border-y border-gold/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Reveal><Label>Lo que vas a lograr</Label></Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl md:text-6xl">
                Técnica, criterio <span className="text-gold">y resultado</span>
              </h2>
            </Reveal>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gold/10">
            {OUTCOMES.map((o, i) => (
              <Reveal key={o.title} delay={i * 0.08} className="bg-jet p-8 h-full">
                <span className="font-display text-4xl text-gold/50">0{i + 1}</span>
                <h3 className="font-display text-2xl mt-4 mb-3">{o.title}</h3>
                <p className="font-body text-sm text-mist/70 leading-relaxed">{o.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- MÓDULOS BLOQUEADOS ---------- */}
      <section id="modulos" className="relative py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Reveal><Label>Contenido del programa</Label></Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl md:text-6xl">
                Seis módulos. <span className="text-gold">Un solo estándar.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="font-body text-sm text-mist/60 mt-4">Títulos provisionales [POR CONFIRMAR]</p>
            </Reveal>
          </div>

          <div className="relative">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {MODULES.map((m, i) => (
                <Reveal key={m.num} delay={(i % 3) * 0.08}>
                  <article className="nv-module group relative overflow-hidden">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={m.image}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover scale-110 blur-[6px] brightness-50 saturate-50"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-gold/25 via-void/40 to-void/80" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex items-center justify-center w-14 h-14 rounded-full border border-gold/50 bg-void/50 backdrop-blur-md">
                          <LockIcon className="w-6 h-6 text-gold-bright" />
                        </div>
                      </div>
                      <span className="absolute top-3 right-3 px-2 py-1 bg-void/70 font-body text-[10px] tracking-[0.2em] uppercase text-mist/80">{m.duration}</span>
                    </div>
                    <div className="p-6">
                      <span className="font-body text-[11px] tracking-[0.25em] uppercase text-gold">Módulo {m.num}</span>
                      <h3 className="font-display text-2xl mt-2 mb-2 leading-snug">{m.title}</h3>
                      <p className="font-body text-sm text-mist/60 leading-relaxed">{m.desc}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            {/* Panel central translúcido */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
              <div className="nv-glass pointer-events-auto w-full max-w-xl text-center px-8 py-10 md:px-12 md:py-12">
                <LockIcon className="w-8 h-8 mx-auto text-gold-bright mb-5" />
                <p className="font-body text-[11px] tracking-[0.3em] uppercase text-gold mb-3">Contenido exclusivo para miembros</p>
                <h3 className="font-display text-3xl md:text-4xl mb-4">¿Quieres ver el programa completo?</h3>
                <p className="font-body text-sm text-mist/75 mb-8 leading-relaxed">
                  Únete a la formación y desbloquea todos los módulos, los ebooks y la comunidad.
                </p>
                <CtaButton size="md" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- QUÉ INCLUYE ---------- */}
      <section className="relative py-28 px-6 bg-jet border-y border-gold/10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal><Label>Qué incluye</Label></Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl md:text-6xl leading-tight">
                Todo lo que necesitas <span className="text-gold block">en un solo lugar</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-body text-mist/70 mt-6 leading-relaxed max-w-md">
                Videos, guías y acompañamiento, organizados para que avances paso a paso.
              </p>
            </Reveal>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {INCLUDES.map((it, i) => (
              <Reveal key={it.title} delay={i * 0.08}>
                <div className="h-full p-6 border border-gold/15 bg-void/40 hover:border-gold/40 transition-colors duration-500">
                  <div className="w-8 h-px bg-gold mb-5" />
                  <h3 className="font-display text-xl mb-2">{it.title}</h3>
                  <p className="font-body text-sm text-mist/65 leading-relaxed">{it.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- INSTRUCTOR ---------- */}
      <section className="relative py-28 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-20 items-center">
          <Reveal>
            <div className="relative aspect-[2/3] max-w-sm mx-auto w-full">
              <div className="absolute -inset-3 border border-gold/20" aria-hidden="true" />
              <Image src="/img/training/yesid-guerrero-retrato.jpg" alt="Yesid Guerrero" fill sizes="(max-width: 768px) 80vw, 380px" className="object-cover" />
            </div>
          </Reveal>
          <div>
            <Reveal><Label>Tu instructor</Label></Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-5xl md:text-6xl">Yesid Guerrero</h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="font-body text-xs tracking-[0.25em] uppercase text-gold mt-3">Ceramista dental · Natural Veneers</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-body text-mist/75 mt-8 leading-relaxed max-w-xl">
                [POR CONFIRMAR — breve biografía: trayectoria, formación y especialidad. Solo datos verificados.]
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- TESTIMONIOS (espacios) ---------- */}
      <section className="relative py-24 px-6 bg-jet border-y border-gold/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <Reveal><Label>Alumnos</Label></Reveal>
            <Reveal delay={0.1}><h2 className="font-display text-4xl md:text-5xl">Lo que dicen <span className="text-gold">quienes ya se formaron</span></h2></Reveal>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <Reveal key={n} delay={n * 0.08}>
                <div className="h-full p-8 border border-dashed border-gold/25 flex flex-col justify-between min-h-[200px]">
                  <span className="font-display text-5xl text-gold/30 leading-none">“</span>
                  <p className="font-body text-sm text-mist/50 italic">Espacio para testimonio real [POR CONFIRMAR]</p>
                  <p className="font-body text-xs tracking-[0.2em] uppercase text-gold/60 mt-6">Nombre · Ciudad</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="relative py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <Reveal><Label>Preguntas frecuentes</Label></Reveal>
            <Reveal delay={0.1}><h2 className="font-display text-4xl md:text-5xl">Antes de empezar</h2></Reveal>
          </div>
          <div className="border-t border-gold/15">
            {FAQS.map((f, i) => {
              const open = openFaq === i
              return (
                <div key={f.q} className="border-b border-gold/15">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-xl md:text-2xl">{f.q}</span>
                    <span className={`text-gold text-2xl leading-none transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {open && <p className="font-body text-sm text-mist/70 leading-relaxed pb-6 -mt-2">{f.a}</p>}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------- CIERRE / OFERTA ---------- */}
      <section id="oferta" className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-[0.10]" style={{ background: 'radial-gradient(circle, #C9A227 0%, transparent 70%)' }} />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <Reveal><Label>Tu siguiente nivel</Label></Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl md:text-7xl leading-tight">
              Forma parte de <span className="text-gold italic block">la Academia</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-body text-mist/75 mt-8 mb-12 leading-relaxed">
              Precio y condiciones [POR CONFIRMAR]. El pago, el acceso y la garantía se gestionan en Hotmart.
            </p>
          </Reveal>
          <Reveal delay={0.3}><CtaButton /></Reveal>
        </div>
      </section>

      {/* Barra fija en celular */}
      <div className={`md:hidden fixed bottom-0 inset-x-0 z-[60] bg-void/90 backdrop-blur-md border-t border-gold/20 py-3 pl-4 pr-24 transition-transform duration-500 ${showBar ? 'translate-y-0' : 'translate-y-full'}`}>
        <CtaButton size="md" className="w-full" />
      </div>
      <div className="md:hidden h-20" aria-hidden="true" />

      <style>{`
        .nv-cta{background:linear-gradient(135deg,#F0CC6A 0%,#C9A227 50%,#9C7A16 100%);box-shadow:0 10px 40px -10px rgba(201,162,39,.55),inset 0 1px 0 rgba(255,240,200,.5)}
        .nv-cta::after{content:"";position:absolute;top:0;left:-60%;width:40%;height:100%;transform:skewX(-20deg);background:linear-gradient(90deg,transparent,rgba(255,255,255,.45),transparent);animation:nvShine 3.5s ease-in-out 1.5s infinite}
        @keyframes nvShine{0%{left:-60%}35%,100%{left:130%}}
        .nv-frame{border:1px solid rgba(201,162,39,.35);box-shadow:0 40px 120px -40px rgba(201,162,39,.35),inset 0 0 0 1px rgba(240,204,106,.08)}
        .nv-play{background:linear-gradient(145deg,#F0CC6A,#C9A227 60%,#9C7A16);box-shadow:0 0 0 8px rgba(201,162,39,.15),0 0 60px rgba(240,204,106,.45);animation:nvPlay 2.8s ease-in-out infinite}
        @keyframes nvPlay{0%,100%{box-shadow:0 0 0 8px rgba(201,162,39,.15),0 0 40px rgba(240,204,106,.35)}50%{box-shadow:0 0 0 16px rgba(201,162,39,.08),0 0 80px rgba(240,204,106,.55)}}
        .nv-module{background:linear-gradient(160deg,rgba(201,162,39,.10),rgba(201,162,39,.02) 50%,rgba(240,204,106,.05)),rgba(10,9,6,.6);border:1px solid rgba(201,162,39,.2)}
        .nv-glass{background:linear-gradient(160deg,rgba(201,162,39,.16),rgba(10,9,6,.75) 45%,rgba(10,9,6,.85));border:1px solid rgba(240,204,106,.45);box-shadow:0 30px 100px -20px rgba(0,0,0,.9),0 0 80px -20px rgba(201,162,39,.35),inset 0 1px 0 rgba(240,204,106,.3);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
        @media (prefers-reduced-motion:reduce){.nv-cta::after,.nv-play{animation:none}}
      `}</style>
    </div>
  )
}
