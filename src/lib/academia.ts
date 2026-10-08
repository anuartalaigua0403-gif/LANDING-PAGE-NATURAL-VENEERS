// Academia Natural Veneers — datos del prototipo (un solo lugar para editarlos)
// Todo lo marcado [POR CONFIRMAR] es provisional hasta tener el material real.

// Enlace de pago de Hotmart [POR CONFIRMAR]. Mientras sea '', los botones bajan a la oferta.
export const HOTMART_URL = ''

export const CTA_LABEL = 'Quiero formarme con Natural Veneers'

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
