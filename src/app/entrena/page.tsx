'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { formatWhatsAppUrl } from '@/lib/utils'

const ease = [0.16, 1, 0.3, 1] as const

const HERO_VIDEO = '/img/training/video-portada.mp4'
const VIDEOS = [
  { src: '/img/training/video-ceramica.mp4', label: 'Cerámica 4K — Laboratorio en Vivo' },
  { src: '/img/training/video-zirconia.mp4', label: 'Prótesis Híbrida en Zirconia' },
]
const PHOTOS = [
  { src: '/img/training/photo-01.jpg', alt: 'Carillas cerámicas Amber LT A1' },
  { src: '/img/training/photo-02.jpg', alt: 'Amber Press LT W2 — Proyecto enviado a Miami' },
  { src: '/img/training/photo-03.jpg', alt: 'Carillas estilo APA — Natural Veneers' },
]

const STATS = [
  { value: '8+', label: 'Años de Experiencia' },
  { value: '3', label: 'Países de Formación' },
  { value: '100%', label: 'Cupos Prev. Agotados' },
  { value: '12+', label: 'Países Exportación' },
]

const PROGRAMS = [
  {
    id: 'ceramica',
    num: '01',
    title: 'Cerámica Estratificada',
    sub: 'Feldespato · Técnica Manual',
    desc: 'Domina la construcción capa a capa de morfología dental con porcelanas feldespáticas de casas certificadas — VITA, GC e Ivoclar. La técnica más exigente y más demandada por clínicos de alto nivel.',
    hours: '40 h',
    level: 'Avanzado',
    topics: [
      'Anatomía dental aplicada al ceramista',
      'Selección y mezcla de masas y matizadores',
      'Estratificación multi-capa con control óptico',
      'Control de cocción y ajuste de horno',
      'Caracterización e individualización de carillas',
    ],
  },
  {
    id: 'disilicato',
    num: '02',
    title: 'Disilicato de Litio',
    sub: 'IPS e.max · Prensado & CAD/CAM',
    desc: 'Desde el encerado diagnóstico hasta la cristalización final. Aprende el flujo completo del disilicato con resultados predecibles, resistentes y de alta estética en casos simples y complejos.',
    hours: '32 h',
    level: 'Intermedio – Avanzado',
    topics: [
      'Propiedades y clasificación del disilicato de litio',
      'Encerado diagnóstico y técnica de prensado',
      'Flujo digital CAD/CAM: diseño y fresado',
      'Glaseado, maquillaje y cristalización final',
      'Manejo de casos con guía anterior comprometida',
    ],
  },
  {
    id: 'zirconio',
    num: '03',
    title: 'Zirconio Translúcido',
    sub: 'Alta Translucidez · Última Generación',
    desc: 'Técnicas de diseño y caracterización de zirconio multi-capa ultra-translúcido. Resultados estéticos comparables al feldespato con la resistencia del óxido de zirconio.',
    hours: '24 h',
    level: 'Intermedio',
    topics: [
      'Clasificación del zirconio monocapa y multi-capa',
      'Flujo digital completo: STL · diseño · fresado',
      'Sinterización controlada y dimensiones finales',
      'Caracterización superficial y glaseado avanzado',
      'Integración en flujos mixtos y rehabilitación total',
    ],
  },
]

const INTERNATIONAL = [
  {
    country: 'México',
    flag: '🇲🇽',
    desc: 'Formación avanzada en cerámica estratificada con maestros ceramistas de referencia latinoamericana.',
  },
  {
    country: 'Alemania',
    flag: '🇩🇪',
    desc: 'Actualización técnica con casas fabricantes VITA e Ivoclar en el epicentro de la innovación dental mundial.',
  },
  {
    country: 'Brasil',
    flag: '🇧🇷',
    desc: 'Certificación en técnicas avanzadas de caracterización y maquillado cerámico con instructores internacionales.',
  },
]

const METHODOLOGY = [
  {
    icon: '◈',
    title: 'Grupos Reducidos',
    desc: 'Máximo 8 participantes por edición. Acompañamiento personalizado de Yesid desde el primer al último ejercicio.',
  },
  {
    icon: '◈',
    title: 'Materiales Incluidos',
    desc: 'Porcelanas, instrumental de laboratorio y soportes de horneado incluidos en la inscripción. Llegas y trabajas.',
  },
  {
    icon: '◈',
    title: 'Certificación Oficial',
    desc: 'Certificado emitido por Natural Veneers SAS y firmado por Yesid Guerrero como Director Técnico del programa.',
  },
  {
    icon: '◈',
    title: 'Seguimiento 90 Días',
    desc: 'Acceso a grupo privado de WhatsApp para resolver dudas y consultar casos clínicos con Yesid después del curso.',
  },
]

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

export default function EntrenaPage() {
  const heroVideoRef = useRef<HTMLVideoElement>(null)
  const [activeProgram, setActiveProgram] = useState<string | null>(null)

  useEffect(() => {
    heroVideoRef.current?.play().catch(() => {})
  }, [])

  const whatsappUrl = formatWhatsAppUrl(
    '573024240780',
    'Hola, quiero reservar mi cupo en el entrenamiento de Natural Veneers SAS. Por favor envíenme información sobre la próxima fecha disponible.',
  )

  return (
    <>
      <section className="relative min-h-screen flex items-end pb-24 overflow-hidden">
        <video
          ref={heroVideoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-r from-void/95 via-void/65 to-void/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-void/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease }}
          >
            <div className="w-8 h-px bg-gold" />
            <span className="font-body text-xs tracking-[0.25em] text-gold uppercase">
              Natural Veneers SAS · Programa de Formación Técnica
            </span>
          </motion.div>
          <h1 className="font-display leading-none mb-6">
            <motion.span
              className="block text-cream text-5xl md:text-7xl lg:text-8xl"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.9, ease }}
            >
              Domina el Arte
            </motion.span>
            <motion.span
              className="block text-gold text-5xl md:text-7xl lg:text-8xl"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.9, ease }}
            >
              de la Cerámica
            </motion.span>
          </h1>
          <motion.p
            className="font-body text-base md:text-lg text-mist/80 max-w-xl leading-relaxed mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease }}
          >
            Entrenamiento técnico intensivo para ceramistas y odontólogos restauradores que exigen resultados
            de clase mundial. Cerámica estratificada, disilicato y zirconio con el estándar Natural Veneers.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.8, ease }}
          >
            <a href="#reserva" className="px-8 py-4 bg-gold text-void font-body text-xs tracking-widest uppercase font-semibold hover:bg-gold-bright transition-colors duration-300">
              Reservar Mi Cupo
            </a>
            <a href="#programas" className="px-8 py-4 border border-gold/40 text-gold font-body text-xs tracking-widest uppercase hover:border-gold hover:bg-gold/5 transition-all duration-300">
              Ver Programas
            </a>
          </motion.div>
        </div>
        <motion.div className="absolute bottom-8 right-8 flex flex-col items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 1.5 }}>
          <span className="font-body text-[9px] text-cream uppercase" style={{ writingMode: 'vertical-rl', letterSpacing: '0.2em' }}>Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent animate-pulse" />
        </motion.div>
      </section>

      <section className="border-y border-gold/10 bg-jet/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="text-center md:text-left">
                <div className="font-display text-3xl md:text-4xl text-gold mb-1">{s.value}</div>
                <div className="font-body text-xs tracking-widest text-mist/55 uppercase">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="programas" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal><div className="flex items-center gap-3 mb-4"><div className="w-8 h-px bg-gold" /><span className="font-body text-xs tracking-[0.25em] text-gold uppercase">Certificaciones Disponibles</span></div></Reveal>
          <Reveal delay={0.1}><h2 className="font-display text-4xl md:text-6xl text-cream mb-4 leading-tight">Tres Especialidades,<br /><span className="text-gold">Un Solo Estándar</span></h2></Reveal>
          <Reveal delay={0.2}><p className="font-body text-mist/65 max-w-xl mb-16 leading-relaxed">Cada programa está diseñado exclusivamente para técnicos dentales y odontólogos restauradores que buscan técnica reproducible y resultados de alta estética cerámica.</p></Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {PROGRAMS.map((prog, i) => (
              <Reveal key={prog.id} delay={i * 0.12}>
                <div className="group relative border border-gold/10 bg-jet/40 p-8 cursor-pointer hover:border-gold/40 transition-all duration-500 overflow-hidden h-full flex flex-col" onMouseEnter={() => setActiveProgram(prog.id)} onMouseLeave={() => setActiveProgram(null)}>
                  <motion.div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: activeProgram === prog.id ? 1 : 0 }} transition={{ duration: 0.3 }} />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <span className="font-display text-5xl text-gold/20 group-hover:text-gold/35 transition-colors duration-300">{prog.num}</span>
                      <span className="font-body text-[10px] tracking-widest text-gold/60 uppercase border border-gold/20 px-2 py-1">{prog.hours}</span>
                    </div>
                    <h3 className="font-display text-2xl text-cream mb-1">{prog.title}</h3>
                    <p className="font-body text-xs text-gold/65 tracking-widest uppercase mb-4">{prog.sub}</p>
                    <p className="font-body text-sm text-mist/60 leading-relaxed mb-6">{prog.desc}</p>
                    <div className="space-y-2 flex-1">
                      {prog.topics.map((topic) => (
                        <div key={topic} className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-gold mt-[7px] flex-shrink-0" />
                          <span className="font-body text-xs text-mist/50 leading-relaxed">{topic}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 pt-6 border-t border-gold/10 flex justify-between items-center">
                      <span className="font-body text-[10px] text-mist/35 uppercase tracking-widest">{prog.level}</span>
                      <a href="#reserva" className="font-body text-xs text-gold tracking-widest uppercase hover:text-gold-bright inline-flex items-center gap-1 transition-all duration-300 group-hover:gap-2">Inscribirme <span>→</span></a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-jet/20 border-y border-gold/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <Reveal className="relative">
              <div className="relative aspect-[4/5] bg-void border border-gold/20 overflow-hidden">
                <img
                  src="/img/training/yesid-guerrero.jpg"
                  alt="Yesid Guerrero — Director Técnico Natural Veneers"
                  className="w-full h-full object-cover object-top opacity-90 hover:opacity-100 transition-all duration-700"
                />
                <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-gold" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-gold" />
              </div>
              <motion.div
                className="absolute -bottom-6 -right-6 md:-right-8 bg-void border border-gold/30 p-5 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] as const }}
              >
                <div className="font-display text-3xl text-gold leading-none mb-1">8+</div>
                <div className="font-body text-[10px] tracking-widest text-mist/60 uppercase">Años de Maestría</div>
              </motion.div>
            </Reveal>

            <div>
              <Reveal><div className="flex items-center gap-3 mb-4"><div className="w-8 h-px bg-gold" /><span className="font-body text-xs tracking-[0.25em] text-gold uppercase">Instructor Principal</span></div></Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display text-4xl md:text-5xl text-cream mb-1">Yesid Guerrero</h2>
                <p className="font-body text-sm text-gold/65 tracking-[0.15em] uppercase mb-8">Ceramista Master · Fundador &amp; Director Técnico</p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="font-body text-mist/70 leading-relaxed mb-5">
                  Con más de <strong className="text-cream font-medium">8 años de experiencia</strong> en laboratorio dental de alta estética en Colombia, Yesid Guerrero ha construido su dominio técnico visitando los centros de formación cerámica más exigentes del mundo. Su filosofía es clara:{' '}
                  <em className="text-gold/80 not-italic">ningún ceramista ni odontólogo debería conformarse con resultados mediocres cuando la técnica correcta está disponible.</em>
                </p>
                <p className="font-body text-mist/70 leading-relaxed mb-5">
                  Fundó Natural Veneers SAS en Barranquilla con la convicción de que Colombia puede —y debe— producir cerámica dental reconocida a nivel mundial. Hoy exporta trabajo a más de{' '}
                  <strong className="text-cream font-medium">12 países</strong>, incluyendo clientes en Miami y Brasil, y replica ese mismo estándar en cada sesión de entrenamiento.
                </p>
                <p className="font-body text-mist/70 leading-relaxed mb-10">
                  Sus entrenamientos son conocidos por una premisa: los cupos se agotan antes de que se abra la convocatoria pública. Porque quienes ya han pasado por sus manos, regresan y traen colegas.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <h3 className="font-body text-xs tracking-[0.2em] text-gold/55 uppercase mb-5">Formación &amp; Reconocimiento Internacional</h3>
                <div className="space-y-5">
                  {INTERNATIONAL.map((item, i) => (
                    <motion.div
                      key={item.country}
                      className="flex items-start gap-4 border-l-2 border-gold/20 pl-5 hover:border-gold/50 transition-colors duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.12, duration: 0.6, ease }}
                    >
                      <span className="text-2xl mt-0.5">{item.flag}</span>
                      <div>
                        <div className="font-body text-sm text-cream font-medium mb-1">{item.country}</div>
                        <div className="font-body text-xs text-mist/40 leading-relaxed">{item.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal><div className="flex items-center gap-3 mb-4"><div className="w-8 h-px bg-gold" /><span className="font-body text-xs tracking-[0.25em] text-gold uppercase">Nuestro Trabajo en Vivo</span></div></Reveal>
          <Reveal delay={0.1}><h2 className="font-display text-4xl md:text-5xl text-cream mb-16 leading-tight">El Estándar que <span className="text-gold">Enseñamos</span></h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {PHOTOS.map((photo, i) => (
              <Reveal key={photo.src} delay={i * 0.1}>
                <div className="relative aspect-square overflow-hidden group">
                  <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover grayscale-[25%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="font-body text-xs text-gold tracking-widest uppercase leading-relaxed">{photo.alt}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {VIDEOS.map((video, i) => (
              <Reveal key={video.src} delay={i * 0.15}>
                <div className="relative aspect-video overflow-hidden group">
                  <video className="w-full h-full object-cover" src={video.src} autoPlay muted loop playsInline />
                  <div className="absolute inset-0 bg-void/25 group-hover:bg-void/5 transition-colors duration-500" />
                  <div className="absolute bottom-4 left-4">
                    <span className="font-body text-xs text-gold/80 tracking-widest uppercase bg-void/60 backdrop-blur-sm px-3 py-1.5">{video.label}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-jet/20 border-y border-gold/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <Reveal>
                <div className="flex items-center gap-3 mb-4"><div className="w-8 h-px bg-gold" /><span className="font-body text-xs tracking-[0.25em] text-gold uppercase">Metodología</span></div>
                <h2 className="font-display text-4xl md:text-5xl text-cream mb-6 leading-tight">Aprender Haciendo,<br /><span className="text-gold">No Observando</span></h2>
                <p className="font-body text-mist/65 leading-relaxed mb-5">Cada sesión es <strong className="text-cream font-medium">100% práctica</strong>. Trabajas directamente sobre el material desde el primer momento, corrigiendo errores en tiempo real bajo la guía directa de Yesid. Sin presentaciones teóricas interminables. Sin atajos.</p>
                <p className="font-body text-mist/65 leading-relaxed">Los grupos son reducidos —<strong className="text-cream font-medium">máximo 8 participantes</strong>— para garantizar que cada ceramista u odontólogo salga con técnica propia, con criterio para tomar decisiones clínicas, no solo con conocimiento conceptual.</p>
              </Reveal>
            </div>
            <div className="space-y-0">
              {METHODOLOGY.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.1}>
                  <div className="flex gap-4 items-start border-b border-gold/10 py-6 first:pt-0">
                    <span className="text-gold text-xl mt-0.5 flex-shrink-0">{item.icon}</span>
                    <div>
                      <h4 className="font-body text-sm text-cream font-medium mb-1.5">{item.title}</h4>
                      <p className="font-body text-xs text-mist/50 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ── */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-gold" />
              <span className="font-body text-xs tracking-[0.25em] text-gold uppercase">Lo Que Dicen Quienes Ya Vivieron la Experiencia</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl text-cream mb-16 leading-tight">
              Resultados que <span className="text-gold">Hablan Solos</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Video testimonio */}
            <Reveal delay={0.15}>
              <div className="relative overflow-hidden border border-gold/20 group">
                <video
                  className="w-full aspect-[9/16] md:aspect-video object-cover"
                  src="/img/training/testimonio.mp4"
                  controls
                  playsInline
                  preload="metadata"
                  poster="/img/training/photo-04.jpg"
                />
                <div className="absolute top-4 left-4">
                  <span className="font-body text-[10px] tracking-widest text-gold uppercase bg-void/70 backdrop-blur-sm px-3 py-1.5 border border-gold/20">Testimonio Real</span>
                </div>
              </div>
            </Reveal>

            {/* Citas */}
            <div className="space-y-10">
              <Reveal delay={0.2}>
                <div className="relative border-l-2 border-gold/40 pl-8 py-2">
                  <div className="absolute -left-3 top-0 text-gold text-5xl font-display leading-none opacity-40">"</div>
                  <p className="font-display text-xl md:text-2xl text-cream leading-relaxed mb-6 italic">
                    Vine sin saber qué esperar y salí con una técnica que transformó por completo mi trabajo en el laboratorio. Yesid no solo enseña cerámica — te cambia la forma de ver cada caso.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-px bg-gold/40" />
                    <div>
                      <div className="font-body text-sm text-gold tracking-widest uppercase">Ceramista Participante</div>
                      <div className="font-body text-xs text-mist/40 uppercase tracking-widest">Programa Cerámica Estratificada</div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="relative border-l-2 border-gold/20 pl-8 py-2">
                  <div className="absolute -left-3 top-0 text-gold text-5xl font-display leading-none opacity-25">"</div>
                  <p className="font-display text-lg text-cream/80 leading-relaxed mb-6 italic">
                    La formación con Yesid es de otro nivel. Cada detalle, cada corrección en tiempo real — uno siente que está aprendiendo de alguien que realmente domina lo que enseña. Los cupos son pocos y es lo más valioso del curso.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-px bg-gold/40" />
                    <div>
                      <div className="font-body text-sm text-gold tracking-widest uppercase">Odontóloga Restauradora</div>
                      <div className="font-body text-xs text-mist/40 uppercase tracking-widest">Programa Disilicato de Litio</div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="font-body text-xs text-mist/40 tracking-widest uppercase">Ediciones anteriores · 100% cupos agotados</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── REDES SOCIALES ── */}
      <section className="py-24 px-6 bg-jet/30 border-y border-gold/10">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-gold/40" />
              <span className="font-body text-xs tracking-[0.3em] text-gold uppercase">Síguenos</span>
              <div className="w-12 h-px bg-gold/40" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl md:text-4xl text-cream mb-4 leading-tight">
              Vive el Proceso<br /><span className="text-gold">Desde Adentro</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-body text-mist/55 leading-relaxed mb-10 max-w-xl mx-auto">
              Casos reales, técnicas en vivo y el día a día de uno de los laboratorios de carillas cerámicas más reconocidos de Colombia. Síguenos en Instagram y mantente al tanto de las próximas fechas de entrenamiento.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <a
              href="https://www.instagram.com/naturalveneers.sas/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 border border-gold/30 px-10 py-5 hover:border-gold hover:bg-gold/5 transition-all duration-400"
            >
              <svg className="w-5 h-5 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <div className="text-left">
                <div className="font-body text-sm text-cream tracking-widest uppercase group-hover:text-gold transition-colors duration-300">@naturalveneers.sas</div>
                <div className="font-body text-[10px] text-mist/40 tracking-widest uppercase">Instagram · Síguenos ahora</div>
              </div>
              <svg className="w-4 h-4 text-gold/50 group-hover:text-gold group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </Reveal>
        </div>
      </section>

      <section id="reserva" className="py-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #C9A227 0%, transparent 70%)' }} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Reveal><div className="inline-flex items-center gap-4 mb-8"><div className="w-12 h-px bg-gold/50" /><span className="font-body text-xs tracking-[0.3em] text-gold uppercase">Cupos Limitados · Barranquilla, Colombia</span><div className="w-12 h-px bg-gold/50" /></div></Reveal>
          <Reveal delay={0.1}><h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-cream mb-4 leading-none">Reserva Tu Cupo<br /><span className="text-gold">Hoy Mismo</span></h2></Reveal>
          <Reveal delay={0.2}>
            <p className="font-body text-mist/65 leading-relaxed mb-4 max-w-lg mx-auto">Los cupos se agotan rápido —la edición anterior cerró inscripciones en horas. Si estás listo para llevar tu técnica cerámica a un nivel que tus casos requieren, escríbenos ahora.</p>
            <p className="font-body text-sm text-gold/70 mb-12 max-w-lg mx-auto">Asegura tu lugar · Confirma tu programa · Reserva tu fecha</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="group relative px-10 py-5 bg-gold text-void font-body text-sm tracking-widest uppercase font-semibold hover:bg-gold-bright transition-colors duration-300 flex items-center justify-center gap-3 overflow-hidden">
                <motion.span className="absolute inset-0 bg-gold-bright" initial={{ x: '-100%' }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }} />
                <span className="relative z-10 flex items-center gap-3">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  Reservar por WhatsApp
                </span>
              </a>
              <a href="mailto:naturalveneers.lab@gmail.com?subject=Reserva%20Entrenamiento%20Natural%20Veneers" className="px-10 py-5 border border-gold/40 text-gold font-body text-sm tracking-widest uppercase hover:border-gold hover:bg-gold/5 transition-all duration-300 flex items-center justify-center">Enviar Email</a>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
              {[{ v: '8 px', l: 'Máx. participantes' }, { v: 'BCQ', l: 'Barranquilla' }, { v: '✓', l: 'Certificación incluida' }].map((item) => (
                <div key={item.l} className="text-center">
                  <div className="font-display text-xl text-gold mb-0.5">{item.v}</div>
                  <div className="font-body text-[9px] text-mist/35 uppercase tracking-widest leading-tight">{item.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
