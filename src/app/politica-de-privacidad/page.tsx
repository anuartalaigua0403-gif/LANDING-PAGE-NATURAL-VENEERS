import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPage, { type LegalSection } from '@/components/legal/LegalPage'
import { COMPANY, LEGAL_EFFECTIVE_DATE, LEGAL_LINKS } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Política de Tratamiento de Datos Personales — Natural Veneers',
  description:
    'Cómo NATURAL VENEERS S.A.S. recolecta, usa, protege y suprime datos personales conforme a la Ley 1581 de 2012 y el Decreto 1074 de 2015.',
  alternates: { canonical: LEGAL_LINKS.privacy },
}

const mail = <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>

const sections: LegalSection[] = [
  {
    id: 'responsable',
    title: 'Responsable del tratamiento',
    body: (
      <>
        <p>
          <strong>{COMPANY.legalName}</strong>, sociedad comercial colombiana identificada con NIT {COMPANY.nit}, con domicilio en{' '}
          {COMPANY.city}, {COMPANY.department}, {COMPANY.country} (en adelante, “Natural Veneers” o “la Empresa”), es responsable del
          tratamiento de los datos personales que recolecta a través de este sitio web, de sus canales de atención y de su actividad
          como laboratorio dental.
        </p>
        <ul>
          <li><strong>Correo electrónico:</strong> {mail}</li>
          <li><strong>Teléfono / WhatsApp:</strong> {COMPANY.phone}</li>
          <li><strong>Sitio web:</strong> {COMPANY.website}</li>
          <li>
            <strong>Dirección física:</strong> por seguridad no se publica en este sitio; se informa al titular que la solicite a través
            de los canales anteriores.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'marco',
    title: 'Marco normativo y alcance',
    body: (
      <>
        <p>
          Esta política se expide en cumplimiento del artículo 15 de la Constitución Política, la Ley Estatutaria 1581 de 2012 y el
          Capítulo 25 del Título 2 de la Parte 2 del Libro 2 del Decreto 1074 de 2015 (que compiló el Decreto 1377 de 2013), y las
          normas que los modifiquen o complementen.
        </p>
        <p>
          Aplica a todas las bases de datos y archivos que contengan datos personales tratados por la Empresa, en medios físicos o
          digitales, y es de obligatorio cumplimiento para sus colaboradores, contratistas y para los encargados que traten datos por
          cuenta de la Empresa.
        </p>
      </>
    ),
  },
  {
    id: 'definiciones',
    title: 'Definiciones',
    body: (
      <ul>
        <li><strong>Titular:</strong> persona natural cuyos datos personales son objeto de tratamiento.</li>
        <li><strong>Dato personal:</strong> cualquier información vinculada o que pueda asociarse a una persona natural determinada o determinable.</li>
        <li><strong>Dato sensible:</strong> el que afecta la intimidad del titular o cuyo uso indebido puede generar discriminación, como los datos relativos a la salud y los datos biométricos.</li>
        <li><strong>Tratamiento:</strong> cualquier operación sobre datos personales, como recolección, almacenamiento, uso, circulación o supresión.</li>
        <li><strong>Responsable:</strong> quien decide sobre la base de datos y/o el tratamiento.</li>
        <li><strong>Encargado:</strong> quien realiza el tratamiento por cuenta del responsable.</li>
        <li><strong>Autorización:</strong> consentimiento previo, expreso e informado del titular.</li>
        <li><strong>Transferencia:</strong> envío de datos a un receptor que a su vez es responsable del tratamiento, dentro o fuera de Colombia.</li>
        <li><strong>Transmisión:</strong> comunicación de datos a un encargado, dentro o fuera de Colombia, para que los trate por cuenta del responsable.</li>
      </ul>
    ),
  },
  {
    id: 'principios',
    title: 'Principios',
    body: (
      <p>
        La Empresa trata los datos personales con sujeción a los principios de legalidad, finalidad, libertad, veracidad o calidad,
        transparencia, acceso y circulación restringida, seguridad y confidencialidad previstos en el artículo 4 de la Ley 1581 de 2012.
      </p>
    ),
  },
  {
    id: 'datos',
    title: 'Datos que tratamos',
    body: (
      <>
        <p>Según la relación que tenga con nosotros, podemos tratar:</p>
        <ul>
          <li>
            <strong>Odontólogos, clínicas y sus colaboradores (clientes y prospectos):</strong> nombre, documento o NIT, profesión,
            clínica, ciudad y país, teléfono, WhatsApp, correo electrónico, datos de facturación, historial de pedidos y comunicaciones.
          </li>
          <li>
            <strong>Interesados y participantes en formación:</strong> nombre, contacto, país, ciudad, perfil profesional, experiencia,
            intereses y datos necesarios para inscripción, pago y certificación.
          </li>
          <li><strong>Proveedores y aliados:</strong> datos de identificación, contacto, comerciales, tributarios y bancarios.</li>
          <li>
            <strong>Visitantes del sitio:</strong> datos técnicos de navegación (dirección IP, navegador, dispositivo, páginas
            consultadas) registrados por la infraestructura de alojamiento por razones de seguridad y funcionamiento. Ver la{' '}
            <Link href={LEGAL_LINKS.cookies}>Política de Cookies</Link>.
          </li>
          <li>
            <strong>Información de pacientes remitida por el odontólogo:</strong> fotografías intraorales y faciales, modelos,
            escaneos digitales, registros de color y prescripciones necesarias para fabricar el trabajo de laboratorio (ver sección 7).
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'finalidades',
    title: 'Finalidades del tratamiento',
    body: (
      <>
        <p>Los datos se tratan exclusivamente para:</p>
        <ol>
          <li>Atender solicitudes de información, cotizaciones y consultas recibidas por el sitio, WhatsApp, correo o redes sociales.</li>
          <li>Recibir, planificar, fabricar, enviar y hacer seguimiento a los trabajos de laboratorio solicitados.</li>
          <li>Celebrar y ejecutar relaciones comerciales: facturación electrónica, cartera, garantías y servicio posventa.</li>
          <li>Gestionar inscripciones, pagos, acceso a contenidos y certificados de los programas de formación.</li>
          <li>
            Enviar información comercial, novedades, eventos y contenidos relacionados con nuestros productos y servicios, cuando el
            titular lo haya autorizado. El titular puede revocar esta autorización en cualquier momento.
          </li>
          <li>Realizar encuestas de satisfacción y mejorar nuestros productos, servicios y el sitio web.</li>
          <li>Garantizar la seguridad del sitio, prevenir fraudes y usos indebidos.</li>
          <li>Cumplir obligaciones legales, contables, tributarias y requerimientos de autoridades competentes.</li>
          <li>Ejercer y defender los derechos de la Empresa en procesos administrativos o judiciales.</li>
        </ol>
      </>
    ),
  },
  {
    id: 'sensibles',
    title: 'Datos sensibles e información de pacientes',
    body: (
      <>
        <p>
          La información de salud y las imágenes de pacientes son datos sensibles. Cuando un odontólogo o clínica nos remite información
          de sus pacientes para fabricar un trabajo, <strong>el odontólogo o la clínica actúa como responsable</strong> de esos datos y
          garantiza que cuenta con la autorización previa, expresa e informada del paciente (o de su representante legal) para
          compartirla con el laboratorio con esa finalidad. Natural Veneers la trata como <strong>encargado</strong>, solo para elaborar
          el trabajo solicitado, con acceso restringido y medidas de seguridad reforzadas.
        </p>
        <p>
          Natural Veneers <strong>no publica</strong> fotografías ni casos clínicos en su sitio web, redes sociales o material
          publicitario sin contar con la autorización escrita del paciente para ese uso específico, obtenida directamente o a través del
          odontólogo tratante. Siempre que sea posible, las imágenes se publican sin elementos que permitan identificar al paciente.
        </p>
        <p>
          El titular no está obligado a autorizar el tratamiento de datos sensibles. Cuando sea necesario, se le informará cuáles datos
          son sensibles y la finalidad de su tratamiento.
        </p>
      </>
    ),
  },
  {
    id: 'menores',
    title: 'Datos de niños, niñas y adolescentes',
    body: (
      <p>
        El sitio y nuestros servicios están dirigidos a profesionales y no a menores de edad. Si excepcionalmente se tratan datos de
        menores (por ejemplo, cuando un paciente menor de edad requiere un trabajo de laboratorio), se hará respetando su interés
        superior y sus derechos fundamentales, con autorización de su representante legal y conforme al artículo 7 de la Ley 1581 de 2012.
      </p>
    ),
  },
  {
    id: 'autorizacion',
    title: 'Autorización del titular',
    body: (
      <>
        <p>
          La Empresa solicita la autorización del titular a más tardar al momento de recolectar sus datos, por escrito, de forma oral o
          mediante conductas inequívocas que permitan concluir razonablemente que la otorgó, y conserva prueba de ella. Por ejemplo, se
          entiende que autoriza el tratamiento quien, después de conocer el aviso de privacidad, nos escribe por WhatsApp o diligencia
          un formulario marcando la casilla de aceptación.
        </p>
        <p>
          No se requiere autorización en los casos del artículo 10 de la Ley 1581 de 2012, como información requerida por autoridad
          competente, datos de naturaleza pública o casos de urgencia médica o sanitaria.
        </p>
      </>
    ),
  },
  {
    id: 'derechos',
    title: 'Derechos de los titulares',
    body: (
      <>
        <p>De acuerdo con el artículo 8 de la Ley 1581 de 2012, el titular tiene derecho a:</p>
        <ol>
          <li>Conocer, actualizar y rectificar sus datos personales.</li>
          <li>Solicitar prueba de la autorización otorgada, salvo cuando no sea necesaria.</li>
          <li>Ser informado, previa solicitud, sobre el uso que se ha dado a sus datos.</li>
          <li>Presentar quejas ante la Superintendencia de Industria y Comercio (SIC), una vez agotado el trámite de consulta o reclamo ante la Empresa.</li>
          <li>Revocar la autorización y/o solicitar la supresión del dato cuando no se respeten los principios, derechos y garantías legales, siempre que no exista un deber legal o contractual de conservarlo.</li>
          <li>Acceder en forma gratuita a sus datos personales objeto de tratamiento.</li>
        </ol>
        <p>
          Estos derechos pueden ejercerlos el titular, sus causahabientes, su representante o apoderado, o quien se haya estipulado a
          favor de otro.
        </p>
      </>
    ),
  },
  {
    id: 'procedimiento',
    title: 'Área responsable y procedimiento para consultas y reclamos',
    body: (
      <>
        <p>
          El área de <strong>{COMPANY.responsibleArea}</strong> atiende las peticiones, consultas y reclamos sobre datos personales a
          través del correo {mail} o del teléfono/WhatsApp {COMPANY.phone}.
        </p>
        <h3>Consultas</h3>
        <p>
          Se atenderán en un término máximo de diez (10) días hábiles contados a partir de la fecha de recibo. Si no fuere posible
          atenderlas en ese término, se informará al interesado el motivo de la demora y la fecha de respuesta, que no superará cinco
          (5) días hábiles adicionales.
        </p>
        <h3>Reclamos</h3>
        <p>
          Quien considere que su información debe ser corregida, actualizada o suprimida, o advierta un presunto incumplimiento de la
          ley, podrá presentar un reclamo que contenga: identificación del titular, descripción de los hechos, dirección o correo de
          respuesta y los documentos que quiera hacer valer.
        </p>
        <ul>
          <li>Si el reclamo está incompleto, se requerirá al interesado dentro de los cinco (5) días hábiles siguientes para que lo complete. Si pasan dos (2) meses sin que lo haga, se entenderá que desistió.</li>
          <li>Una vez recibido el reclamo completo, se incluirá en la base de datos la leyenda “reclamo en trámite” en un término no mayor a dos (2) días hábiles.</li>
          <li>El término máximo para atenderlo será de quince (15) días hábiles contados a partir del día siguiente a su recibo. Si no fuere posible, se informarán los motivos y la nueva fecha, que no superará ocho (8) días hábiles adicionales.</li>
        </ul>
        <p>Para proteger la información, la Empresa verificará la identidad de quien presenta la solicitud.</p>
      </>
    ),
  },
  {
    id: 'internacional',
    title: 'Transmisión y transferencia de datos',
    body: (
      <>
        <p>
          Para operar, la Empresa utiliza proveedores tecnológicos que pueden almacenar o procesar datos fuera de Colombia, entre ellos
          servicios de alojamiento web, correo y almacenamiento en la nube, mensajería (WhatsApp) y redes sociales (Instagram), y
          plataformas de pago y distribución de productos digitales. Estos proveedores actúan como encargados o como responsables
          independientes según sus propias políticas.
        </p>
        <p>
          Al aceptar esta política, el titular autoriza la transmisión y transferencia de sus datos a estos proveedores, dentro o fuera
          del país, únicamente para las finalidades aquí descritas. La Empresa procura que dichos proveedores ofrezcan niveles adecuados
          de protección, en los términos del artículo 26 de la Ley 1581 de 2012 y sus normas reglamentarias.
        </p>
        <p>La Empresa no vende ni alquila datos personales a terceros.</p>
      </>
    ),
  },
  {
    id: 'seguridad',
    title: 'Seguridad de la información',
    body: (
      <p>
        La Empresa adopta medidas técnicas, humanas y administrativas razonables para proteger los datos contra adulteración, pérdida,
        consulta, uso o acceso no autorizado o fraudulento, como conexiones cifradas (HTTPS), control de accesos, cuentas protegidas y
        acceso restringido a la información de pacientes. Ningún sistema es completamente infalible; si ocurre un incidente de seguridad
        que afecte datos personales, se actuará conforme a la ley y se informará a la autoridad cuando corresponda.
      </p>
    ),
  },
  {
    id: 'conservacion',
    title: 'Conservación de los datos',
    body: (
      <p>
        Los datos se conservan durante el tiempo razonable y necesario para cumplir las finalidades del tratamiento y, después, por el
        tiempo que exijan las normas contables, tributarias y comerciales o la defensa de los derechos de la Empresa. Cumplido ese
        tiempo, se suprimen o anonimizan de forma segura.
      </p>
    ),
  },
  {
    id: 'vigencia',
    title: 'Vigencia y modificaciones',
    body: (
      <p>
        Esta política rige a partir del {LEGAL_EFFECTIVE_DATE}. Las bases de datos estarán vigentes mientras subsistan las finalidades
        descritas. Cualquier cambio sustancial se comunicará oportunamente por este sitio web y, cuando corresponda, por los canales de
        contacto registrados, antes de su implementación.
      </p>
    ),
  },
]

export default function PrivacyPage() {
  return (
    <LegalPage
      label="Protección de datos"
      title="Política de Tratamiento de Datos Personales"
      intro={
        <>
          <h3>Aviso de privacidad</h3>
          <p>
            {COMPANY.legalName} (NIT {COMPANY.nit}), con domicilio en {COMPANY.city}, {COMPANY.country}, es responsable del tratamiento
            de sus datos personales. Los usamos para atender sus solicitudes, cotizar y fabricar trabajos de laboratorio, gestionar la
            relación comercial y la formación y, si usted lo autoriza, enviarle información comercial. Usted puede conocer, actualizar,
            rectificar y suprimir sus datos y revocar la autorización escribiendo a {mail}. El suministro de datos sensibles es
            facultativo. A continuación encontrará la política completa.
          </p>
        </>
      }
      sections={sections}
    />
  )
}
