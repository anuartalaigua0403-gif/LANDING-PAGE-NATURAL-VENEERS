import { ArrowUpRight } from 'lucide-react'
import { formatWhatsAppUrl } from '@/lib/utils'
import { WA_LAB, WA_MSG_LAB } from '@/lib/whatsapp'

const eyebrow = 'font-body text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.38em] text-[#C9A45C]'
const h2 = 'font-display font-light text-4xl sm:text-6xl leading-[1] text-[#F8F8F6]'
const wrap = 'mx-auto max-w-7xl px-6 sm:px-10'

// Textos tomados del sitio actual (sección "Quiénes somos").
export function ExpertiseSection() {
  return (
    <section id="expertise" className="border-t border-white/5 bg-[#050505] py-24 sm:py-32">
      <div className={`${wrap} grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20`}>
        <div>
          <p className={eyebrow}>Our Expertise</p>
          <h2 className={`${h2} mt-5`}>Pasión por la<br /><span className="italic text-[#E8D3A0]">excelencia dental</span></h2>
        </div>
        <div className="space-y-6 font-body text-[15px] leading-relaxed text-[#A1A1AA]">
          <p>
            Natural Veneers nació de la convicción de que cada paciente merece una sonrisa perfecta. Nuestro equipo de ceramistas
            certificados combina técnica artesanal con tecnología de precisión para fabricar carillas que superan las expectativas
            más exigentes.
          </p>
          <p>
            Trabajamos exclusivamente con clínicos que comparten nuestra filosofía: cero compromisos en calidad, máxima atención al
            detalle, y resultados que transforman vidas.
          </p>
        </div>
      </div>
    </section>
  )
}

const MATERIALS = [
  { name: 'Disilicato estratificado', text: 'Estructura de disilicato de litio con cerámica estratificada a mano.' },
  { name: 'Disilicato monolítico', text: 'Una sola pieza de disilicato de litio, caracterizada en superficie.' },
  { name: 'Feldespato', text: 'Porcelana feldespática ultra-fina, la más cercana al diente natural.' },
  { name: 'Cerómero', text: 'Material compuesto de resina con relleno cerámico.' },
  { name: 'Coronas y prótesis', text: '[POR CONFIRMAR: alcance y materiales disponibles]' },
]

export function MaterialsSection() {
  return (
    <section id="materiales" className="bg-[#081020]/40 py-24 sm:py-32">
      <div className={wrap}>
        <p className={eyebrow}>Materials &amp; Technology</p>
        <h2 className={`${h2} mt-5 max-w-2xl`}>Materiales y soluciones</h2>
        <div className="mt-14 grid gap-px overflow-hidden border border-white/5 bg-white/5 sm:grid-cols-2 lg:grid-cols-5">
          {MATERIALS.map((m, i) => (
            <article key={m.name} className="group bg-[#050505] p-7 transition-colors hover:bg-[#0b0b0b]">
              <span className="font-display text-sm text-[#C9A45C]/70">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-8 font-display text-2xl text-[#F8F8F6]">{m.name}</h3>
              <p className="mt-3 font-body text-[13px] leading-relaxed text-[#A1A1AA]">{m.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const STEPS = ['Recepción del caso', 'Evaluación', 'Diseño digital', 'Elaboración', 'Cerámica', 'Control de calidad', 'Entrega']

export function ProcessSection() {
  return (
    <section id="proceso" className="bg-[#050505] py-24 sm:py-32">
      <div className={wrap}>
        <p className={eyebrow}>Our Process</p>
        <h2 className={`${h2} mt-5`}>Flujo de trabajo</h2>
        <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-7">
          {STEPS.map((s, i) => (
            <li key={s} className="border-t border-[#C9A45C]/30 pt-5">
              <span className="font-display text-3xl text-[#C9A45C]">{String(i + 1).padStart(2, '0')}</span>
              <p className="mt-3 font-body text-sm text-[#F8F8F6]">{s}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

const BENEFITS = ['Calidad', 'Comunicación', 'Seguimiento', 'Precisión', 'Acompañamiento técnico']

export function DentistsSection() {
  return (
    <section id="odontologos" className="border-t border-white/5 bg-[#050505] py-24 sm:py-32">
      <div className={`${wrap} grid gap-12 md:grid-cols-2`}>
        <div>
          <p className={eyebrow}>For Dentists</p>
          <h2 className={`${h2} mt-5`}>Para odontólogos</h2>
          <p className="mt-6 max-w-md font-body text-[15px] leading-relaxed text-[#A1A1AA]">
            [POR CONFIRMAR: texto para odontólogos — cómo enviar casos, tiempos y condiciones.]
          </p>
        </div>
        <ul className="divide-y divide-white/5 border-y border-white/5">
          {BENEFITS.map((b) => (
            <li key={b} className="flex items-center justify-between py-5 font-display text-2xl text-[#F8F8F6]">
              {b}
              <span className="h-px w-10 bg-[#C9A45C]/60" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function ContactCTA() {
  return (
    <section id="contacto" className="relative overflow-hidden bg-[#050505] py-28 sm:py-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,164,92,0.12),transparent_60%)]" />
      <div className={`${wrap} relative text-center`}>
        <p className={eyebrow}>Natural Veneers</p>
        <h2 className="mt-6 font-display text-5xl font-light text-[#F8F8F6] sm:text-8xl">Request your case.</h2>
        <a
          href={formatWhatsAppUrl(WA_LAB, WA_MSG_LAB)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-flex items-center gap-3 bg-[#C9A45C] px-8 py-4 font-body text-[11px] font-medium uppercase tracking-[0.28em] text-[#050505] transition-colors hover:bg-[#E8D3A0]"
        >
          Escríbenos por WhatsApp <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
        </a>
      </div>
    </section>
  )
}
