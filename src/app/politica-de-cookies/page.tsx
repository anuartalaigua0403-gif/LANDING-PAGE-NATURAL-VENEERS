import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPage, { type LegalSection } from '@/components/legal/LegalPage'
import CookiePrefsButton from '@/components/legal/CookiePrefsButton'
import { COMPANY, LEGAL_LINKS } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Política de Cookies — Natural Veneers',
  description: 'Qué cookies, almacenamiento local y caché usa el sitio de Natural Veneers y cómo gestionarlos.',
  alternates: { canonical: LEGAL_LINKS.cookies },
}

const sections: LegalSection[] = [
  {
    id: 'que-son',
    title: '¿Qué son las cookies, el almacenamiento local y la caché?',
    body: (
      <>
        <p>
          Las <strong>cookies</strong> son pequeños archivos que un sitio web guarda en su navegador. El <strong>almacenamiento
          local</strong> (localStorage) cumple una función parecida: guarda pequeños datos en su dispositivo. La <strong>caché</strong> es
          una copia temporal de archivos del sitio (imágenes, estilos, código) que su navegador y la red de distribución conservan para
          que las páginas carguen más rápido; no contiene datos que lo identifiquen y usted puede borrarla en cualquier momento.
        </p>
      </>
    ),
  },
  {
    id: 'que-usamos',
    title: '¿Qué usamos en este sitio?',
    body: (
      <>
        <p>
          Hoy este sitio <strong>no usa cookies analíticas ni publicitarias</strong> y no rastrea su navegación con fines comerciales.
          Solo utiliza lo estrictamente necesario:
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Finalidad</th>
                <th>Duración</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>nv-consent</td>
                <td>Almacenamiento local · Necesaria · Propia</td>
                <td>Recordar su decisión sobre cookies para no volver a preguntarle en cada visita.</td>
                <td>Hasta que usted la borre o cambie la política</td>
              </tr>
              <tr>
                <td>Caché del navegador y de la red de distribución</td>
                <td>Técnica · Necesaria</td>
                <td>Cargar el sitio más rápido y con menor consumo de datos.</td>
                <td>Temporal</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Además, como cualquier sitio web, el servidor de alojamiento registra datos técnicos (dirección IP, navegador, fecha y página
          solicitada) para seguridad y funcionamiento, y las fuentes tipográficas se cargan desde servidores de Google, que reciben la
          dirección IP del visitante para entregarlas.
        </p>
      </>
    ),
  },
  {
    id: 'futuras',
    title: 'Cookies analíticas y de marketing (solo con su permiso)',
    body: (
      <p>
        Si en el futuro incorporamos herramientas de medición de visitas (por ejemplo, Google Analytics) o de medición de campañas (por
        ejemplo, Meta Pixel), estas solo se activarán si usted las acepta en el panel de preferencias, y esta política se actualizará
        indicando cada herramienta, su proveedor, finalidad y duración.
      </p>
    ),
  },
  {
    id: 'terceros',
    title: 'Enlaces y servicios de terceros',
    body: (
      <p>
        Los botones de WhatsApp e Instagram y los enlaces a plataformas de pago lo llevan a servicios de terceros (Meta Platforms,
        Hotmart u otros), que tienen sus propias políticas de privacidad y cookies. Natural Veneers no controla las cookies que esos
        servicios instalen cuando usted los visita.
      </p>
    ),
  },
  {
    id: 'gestion',
    title: 'Cómo gestionar sus preferencias',
    body: (
      <>
        <p>Puede cambiar su decisión en cualquier momento:</p>
        <p>
          <CookiePrefsButton />
        </p>
        <p>
          También puede bloquear o borrar cookies, almacenamiento local y caché desde la configuración de su navegador (Chrome, Safari,
          Firefox, Edge u otros). Si bloquea el almacenamiento necesario, el sitio seguirá funcionando, pero le volveremos a preguntar
          por sus preferencias.
        </p>
      </>
    ),
  },
  {
    id: 'contacto',
    title: 'Más información',
    body: (
      <p>
        El tratamiento de datos personales se rige por nuestra <Link href={LEGAL_LINKS.privacy}>Política de Tratamiento de Datos
        Personales</Link>. Para cualquier inquietud escriba a <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
      </p>
    ),
  },
]

export default function CookiesPage() {
  return <LegalPage label="Cookies" title="Política de Cookies" sections={sections} />
}
