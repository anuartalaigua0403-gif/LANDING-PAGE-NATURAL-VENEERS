// Datos legales de la empresa (fuente: RUT actualizado). Un solo lugar para editarlos.
// Por decisión de la empresa no se publica la dirección física exacta: se indica ciudad y país
// y la dirección se entrega a solicitud del titular por los canales oficiales.
export const COMPANY = {
  legalName: 'NATURAL VENEERS S.A.S.',
  brand: 'Natural Veneers',
  nit: '901.764.497-3',
  city: 'Barranquilla',
  department: 'Atlántico',
  country: 'Colombia',
  email: 'gerencia@naturalveneers.co',
  phone: '+57 304 383 8031', // [POR CONFIRMAR] línea oficial para habeas data
  website: 'https://www.naturalveneerssas.com',
  responsibleArea: 'Gerencia',
} as const

// Fecha de entrada en vigencia de los documentos legales. Actualizar al publicar cambios.
export const LEGAL_EFFECTIVE_DATE = '22 de noviembre de 2026'
export const LEGAL_VERSION = '1.0'

export const LEGAL_LINKS = {
  privacy: '/politica-de-privacidad',
  cookies: '/politica-de-cookies',
  terms: '/terminos-y-condiciones',
} as const
