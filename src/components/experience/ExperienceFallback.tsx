import { CHAPTERS } from '@/lib/sceneConfig'
import { CHAPTER_COPY } from './chapterCopy'

/**
 * Versión sin 3D: se muestra si el navegador no tiene WebGL o si el usuario
 * pidió reducir animaciones. Mantiene la narrativa completa en HTML.
 */
export default function ExperienceFallback({ reason }: { reason: 'no-webgl' | 'reduced-motion' }) {
  return (
    <section className="relative bg-[#050505] px-6 pt-32 pb-20" aria-label="The Anatomy Experience">
      <div className="mx-auto max-w-3xl space-y-24">
        {CHAPTERS.map((c, i) => {
          const copy = CHAPTER_COPY[i]
          return (
            <article key={c.id}>
              <p className="font-body text-[11px] font-medium uppercase tracking-[0.35em] text-[#C9A45C]">
                {c.index} — {c.label}
              </p>
              <h2 className="mt-4 font-display text-4xl text-[#F8F8F6] sm:text-6xl">{copy.title}</h2>
              <p className="mt-4 font-body text-[#A1A1AA]">{copy.subtitle}</p>
            </article>
          )
        })}
        <p className="font-body text-xs text-[#A1A1AA]/60">
          {reason === 'no-webgl'
            ? 'Tu navegador no permite gráficos 3D (WebGL); estás viendo la versión simplificada.'
            : 'Tienes activada la opción de reducir movimiento; estás viendo la versión sin animación 3D.'}
        </p>
      </div>
    </section>
  )
}
