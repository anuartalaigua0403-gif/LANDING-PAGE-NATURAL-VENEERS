// Academia Natural Veneers — datos del prototipo (un solo lugar para editarlos)
// Todo lo marcado [POR CONFIRMAR] es provisional hasta tener el material real.

// Destino de los botones "Quiero formarme con Natural Veneers".
// Mientras la plataforma está en desarrollo van al formulario de acceso anticipado (#acceso).
// Al lanzar, poner aquí el enlace de pago del programa en Hotmart.
export const HOTMART_URL = ''

export const CTA_LABEL = 'Quiero formarme con Natural Veneers'

// Lanzamiento oficial [POR CONFIRMAR día exacto]. 1 de febrero de 2027, 00:00 hora Colombia (UTC-5).
export const LAUNCH_DATE = '2027-02-01T00:00:00-05:00'
export const LAUNCH_LABEL = 'Febrero 2027'

// URL del Web App de Google Apps Script que guarda los registros en Google Sheets.
// Mientras sea '', los registros se envían solo por WhatsApp.
export const LEADS_ENDPOINT = ''

export const PROFILES = ['Técnico dental / Ceramista', 'Odontólogo(a)', 'Estudiante', 'Laboratorio o clínica', 'Otro']
export const LEVELS = ['Estoy empezando', 'Intermedio', 'Avanzado']
export const INTERESTS = ['Cursos en video', 'Ebooks y guías', 'Formación presencial', 'Comunidad privada']
export const COUNTRY_CODES = [
  { code: '57', label: 'CO +57' },
  { code: '52', label: 'MX +52' },
  { code: '1', label: 'US +1' },
  { code: '593', label: 'EC +593' },
  { code: '51', label: 'PE +51' },
  { code: '56', label: 'CL +56' },
  { code: '54', label: 'AR +54' },
  { code: '58', label: 'VE +58' },
  { code: '507', label: 'PA +507' },
  { code: '506', label: 'CR +506' },
  { code: '34', label: 'ES +34' },
  { code: '55', label: 'BR +55' },
]

// Video gratuito (Vimeo o YouTube no listado). Mientras sea '', se muestra el recuadro de edición.
export const FREE_VIDEO_EMBED = ''

export type Module = {
  num: string
  title: string
  desc: string
  image: string
  duration: string
}

// Títulos provisionales [POR CONFIRMAR]
export const MODULES: Module[] = [
  {
    num: '01',
    title: 'Anatomía y morfología del sector anterior',
    desc: 'Proporciones, ángulos y lóbulos: la base de toda carilla natural.',
    image: '/img/training/photo-01.jpg',
    duration: '— min',
  },
  {
    num: '02',
    title: 'Color, translucidez y opalescencia',
    desc: 'Cómo leer el diente natural y llevarlo a la cerámica.',
    image: '/img/training/photo-02.jpg',
    duration: '— min',
  },
  {
    num: '03',
    title: 'Selección de masas y estratificación',
    desc: 'Construcción capa a capa con control óptico.',
    image: '/img/estratificacion.jpg',
    duration: '— min',
  },
  {
    num: '04',
    title: 'Carillas feldespáticas en mínimo espesor',
    desc: 'Troquel refractario, adaptación marginal y vitalidad.',
    image: '/img/feldespato-portada.jpg',
    duration: '— min',
  },
  {
    num: '05',
    title: 'Caracterización, textura y glaseado',
    desc: 'Los detalles que separan una carilla buena de una excepcional.',
    image: '/img/training/photo-03.jpg',
    duration: '— min',
  },
  {
    num: '06',
    title: 'Fotografía y comunicación con el clínico',
    desc: 'Registrar, mostrar y presentar casos de alto nivel.',
    image: '/img/training/resultado-frontal.jpg',
    duration: '— min',
  },
]

export type ShopProduct = {
  type: string
  title: string
  desc: string
  image: string
  price: string
  checkoutUrl: string
  salesUrl?: string
}

// Productos disponibles en Hotmart (se compran directo en el checkout de Hotmart)
export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    type: 'eBook',
    title: 'Guía de microestratificación cerámica',
    desc: 'Guía digital sobre la técnica de microestratificación en cerámica dental. [POR CONFIRMAR — descripción final]',
    image: '/img/estratificacion.jpg',
    price: '[POR CONFIRMAR]',
    checkoutUrl: 'https://pay.hotmart.com/C108135779I',
    salesUrl: 'https://go.hotmart.com/C108135779I',
  },
]

export const OUTCOMES = [
  { title: 'Ver el diente como un ceramista', desc: 'Entender forma, color y luz antes de tocar la porcelana.' },
  { title: 'Una técnica reproducible', desc: 'Un método paso a paso, no trucos sueltos.' },
  { title: 'Resultados de alta estética', desc: 'Carillas que se integran con el diente natural.' },
  { title: 'A tu ritmo', desc: 'Aprende desde cualquier lugar y repite cada clase las veces que necesites.' },
]

export const INCLUDES = [
  { title: 'Video lecciones', desc: 'Clases grabadas en el laboratorio, en alta calidad.' },
  { title: 'Ebooks descargables', desc: 'Guías de consulta para tener a mano en la mesa de trabajo.' },
  { title: 'Comunidad privada', desc: 'Un espacio para resolver dudas y compartir casos. [POR CONFIRMAR]' },
  { title: 'Acceso en cualquier dispositivo', desc: 'Computador, tablet o celular, desde la plataforma Hotmart.' },
]

export const FAQS = [
  { q: '¿Cómo accedo al contenido?', a: 'Después del pago en Hotmart recibes en tu correo el acceso a la plataforma con todas las clases y materiales.' },
  { q: '¿Por cuánto tiempo tengo acceso?', a: '[POR CONFIRMAR]' },
  { q: '¿Puedo pagar en cuotas?', a: '[POR CONFIRMAR — depende de la configuración del producto en Hotmart]' },
  { q: '¿Hay garantía?', a: '[POR CONFIRMAR — días de garantía configurados en Hotmart]' },
  { q: '¿Necesito experiencia previa?', a: '[POR CONFIRMAR — nivel recomendado]' },
]
