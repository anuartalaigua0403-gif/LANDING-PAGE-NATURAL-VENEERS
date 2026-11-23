import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPage, { type LegalSection } from '@/components/legal/LegalPage'
import { COMPANY, LEGAL_LINKS } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Términos y Condiciones de Uso — Natural Veneers',
  description: 'Condiciones de uso del sitio web de NATURAL VENEERS S.A.S., propiedad intelectual y limitaciones de responsabilidad.',
  alternates: { canonical: LEGAL_LINKS.terms },
}

const mail = <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>

const sections: LegalSection[] = [
  {
    id: 'identificacion',
    title: 'Identificación y aceptación',
    body: (
      <>
        <p>
          Este sitio web ({COMPANY.website}) es operado por <strong>{COMPANY.legalName}</strong>, NIT {COMPANY.nit}, con domicilio en{' '}
          {COMPANY.city}, {COMPANY.country}, contacto {mail}.
        </p>
        <p>
          Al navegar o usar este sitio, usted acepta estos Términos y Condiciones, la{' '}
          <Link href={LEGAL_LINKS.privacy}>Política de Tratamiento de Datos Personales</Link> y la{' '}
          <Link href={LEGAL_LINKS.cookies}>Política de Cookies</Link>. Si no está de acuerdo, le pedimos no usar el sitio.
        </p>
      </>
    ),
  },
  {
    id: 'objeto',
    title: 'Objeto del sitio y público al que se dirige',
    body: (
      <p>
        El sitio presenta los productos y servicios de laboratorio dental y los programas de formación de Natural Veneers. Está dirigido
        principalmente a odontólogos, clínicas, técnicos dentales y profesionales del sector, y a personas mayores de edad.
      </p>
    ),
  },
  {
    id: 'no-asesoria',
    title: 'La información no constituye diagnóstico ni indicación clínica',
    body: (
      <>
        <p>
          Los contenidos del sitio (textos, imágenes, videos, casos y respuestas a preguntas frecuentes) son informativos y comerciales.
          <strong> No constituyen diagnóstico, recomendación clínica ni sustituyen la valoración de un odontólogo.</strong> La indicación,
          planeación, preparación, cementación y seguimiento de cualquier tratamiento son responsabilidad exclusiva del profesional
          tratante.
        </p>
        <p>
          Las imágenes de casos son ilustrativas: los resultados dependen de cada paciente, del diagnóstico, de la información y
          registros enviados al laboratorio y de la ejecución clínica, por lo que pueden variar.
        </p>
      </>
    ),
  },
  {
    id: 'cotizaciones',
    title: 'Cotizaciones, pedidos y tiempos',
    body: (
      <>
        <p>
          La información de productos, materiales y tiempos publicada en el sitio es referencial. Una conversación por WhatsApp, correo o
          redes sociales no constituye por sí sola un contrato: el pedido se perfecciona cuando Natural Veneers confirma por escrito la
          aceptación del trabajo, el precio y las condiciones aplicables.
        </p>
        <p>
          Los tiempos de entrega son estimados y dependen de que el caso llegue completo (prescripción, registros, color, modelos o
          archivos digitales), de los ajustes solicitados y de los tiempos de transporte. Las condiciones comerciales particulares
          acordadas con cada cliente prevalecen sobre la información general de este sitio.
        </p>
        <p>
          El cliente profesional es responsable de la veracidad y suficiencia de la información y de los registros que envía, y de contar
          con la autorización de su paciente para compartirlos con el laboratorio.
        </p>
      </>
    ),
  },
  {
    id: 'formacion',
    title: 'Programas de formación y productos digitales',
    body: (
      <p>
        Los cursos, talleres y productos digitales se rigen por las condiciones específicas que se informen al momento de la inscripción o
        compra (contenido, fechas, cupos, precio, medios de pago, certificación y políticas de cambio o devolución). Cuando el comprador
        tenga la calidad de consumidor, se respetarán los derechos previstos en la Ley 1480 de 2011 (Estatuto del Consumidor), incluido el
        derecho de retracto en los casos y términos en que proceda. Las compras realizadas a través de plataformas de terceros también se
        sujetan a los términos de esas plataformas.
      </p>
    ),
  },
  {
    id: 'propiedad',
    title: 'Propiedad intelectual',
    body: (
      <>
        <p>
          La marca y el nombre “Natural Veneers”, los logotipos, el diseño del sitio, los textos, fotografías, videos, ilustraciones y demás
          contenidos son de titularidad de {COMPANY.legalName} o se usan con autorización de sus titulares, y están protegidos por las
          normas de derecho de autor y propiedad industrial (entre ellas, la Ley 23 de 1982, la Decisión Andina 351 de 1993 y la Decisión
          Andina 486 de 2000).
        </p>
        <p>
          Se prohíbe reproducir, copiar, distribuir, modificar, comunicar públicamente o usar con fines comerciales cualquier contenido del
          sitio, incluidas las imágenes de casos y del equipo, sin autorización previa y escrita de la Empresa. Compartir enlaces al sitio
          está permitido.
        </p>
      </>
    ),
  },
  {
    id: 'uso',
    title: 'Uso adecuado del sitio',
    body: (
      <>
        <p>Al usar el sitio, usted se compromete a no:</p>
        <ul>
          <li>Usarlo con fines ilícitos, fraudulentos o contrarios a estos términos.</li>
          <li>Intentar acceder sin autorización a sus sistemas, introducir código malicioso o afectar su funcionamiento.</li>
          <li>Extraer contenidos de forma masiva o automatizada.</li>
          <li>Suplantar a otra persona o suministrar información falsa.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'terceros',
    title: 'Enlaces a sitios de terceros',
    body: (
      <p>
        El sitio contiene enlaces a servicios de terceros como WhatsApp, Instagram o plataformas de pago. Natural Veneers no controla ni se
        hace responsable por sus contenidos, disponibilidad o políticas; su uso se rige por los términos de cada tercero.
      </p>
    ),
  },
  {
    id: 'responsabilidad',
    title: 'Disponibilidad y limitación de responsabilidad',
    body: (
      <p>
        Procuramos que el sitio esté disponible y que su información sea exacta y actualizada, pero no garantizamos que esté libre de
        interrupciones o errores, y podemos modificar, suspender o retirar contenidos sin previo aviso. En la medida permitida por la ley,
        Natural Veneers no responde por daños derivados del uso del sitio o de la imposibilidad de usarlo, ni por decisiones clínicas o
        comerciales tomadas con base exclusiva en su contenido. Nada de lo anterior limita los derechos irrenunciables que la ley
        reconoce a los consumidores.
      </p>
    ),
  },
  {
    id: 'comunicaciones',
    title: 'Comunicaciones electrónicas',
    body: (
      <p>
        Usted acepta que las comunicaciones por correo electrónico, WhatsApp u otros medios electrónicos tienen plena validez como mensajes
        de datos, de conformidad con la Ley 527 de 1999. Le contactaremos en horarios razonables y podrá pedir en cualquier momento que no
        le enviemos más mensajes comerciales.
      </p>
    ),
  },
  {
    id: 'ley',
    title: 'Ley aplicable y solución de controversias',
    body: (
      <p>
        Estos términos se rigen por las leyes de la República de Colombia. Las partes procurarán resolver cualquier diferencia de manera
        directa y amistosa. De no lograrse, serán competentes los jueces de {COMPANY.city}, {COMPANY.country}, sin perjuicio de los fueros
        y mecanismos que la ley reconozca a los consumidores.
      </p>
    ),
  },
  {
    id: 'cambios',
    title: 'Modificaciones y contacto',
    body: (
      <p>
        Podemos actualizar estos términos en cualquier momento; la versión vigente será siempre la publicada en esta página, con su fecha.
        Para cualquier consulta escríbanos a {mail}.
      </p>
    ),
  },
]

export default function TermsPage() {
  return <LegalPage label="Aviso legal" title="Términos y Condiciones de Uso" sections={sections} />
}
