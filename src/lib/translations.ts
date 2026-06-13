import type { Lang, Product, ProcessStep, FAQItem } from '@/types'

export const ui = {
  nav: {
    products: { es: 'Productos', en: 'Products' },
    process: { es: 'Proceso', en: 'Process' },
    results: { es: 'Resultados', en: 'Results' },
    about: { es: 'Nosotros', en: 'About' },
    contact: { es: 'Contacto', en: 'Contact' },
  },
  hero: {
    badge: { es: 'Laboratorio Dental Premium', en: 'Premium Dental Laboratory' },
    title1: { es: 'Arte en Cada', en: 'Art in Every' },
    title2: { es: 'Carilla', en: 'Veneer' },
    subtitle: {
      es: 'Fabricamos carillas dentales de porcelana ultra-fina para clínicos que no aceptan compromisos en estética.',
      en: 'We craft ultra-thin porcelain veneers for clinicians who accept no compromises in aesthetics.',
    },
    cta1: { es: 'Ver Productos', en: 'View Products' },
    cta2: { es: 'WhatsApp', en: 'WhatsApp' },
    scroll: { es: 'Desplazar', en: 'Scroll' },
  },
  marquee: {
    items: {
      es: [
        'Carillas Estratificadas',
        'Carillas Monolíticas',
        'Feldespato Puro',
        'Carillas Híbridas',
        'Precisión Microscópica',
        'Estética Máxima',
        'Laboratorio Premium',
        'Colombia',
      ],
      en: [
        'Layered Veneers',
        'Monolithic Veneers',
        'Pure Feldspar',
        'Hybrid Veneers',
        'Microscopic Precision',
        'Maximum Aesthetics',
        'Premium Laboratory',
        'Colombia',
      ],
    },
  },
  products: {
    sectionLabel: { es: 'Nuestros Productos', en: 'Our Products' },
    title: { es: 'Maestría en Porcelana', en: 'Mastery in Porcelain' },
    subtitle: {
      es: 'Cuatro líneas de carillas diseñadas para cada caso clínico.',
      en: 'Four veneer lines designed for every clinical case.',
    },
  },
  process: {
    sectionLabel: { es: 'Nuestro Proceso', en: 'Our Process' },
    title: { es: 'Del Diseño a la', en: 'From Design to' },
    title2: { es: 'Perfección', en: 'Perfection' },
    subtitle: {
      es: 'Tres etapas que garantizan resultados excepcionales en cada caso.',
      en: 'Three stages that guarantee exceptional results in every case.',
    },
  },
  results: {
    sectionLabel: { es: 'Resultados Reales', en: 'Real Results' },
    title: { es: 'Sonrisas que', en: 'Smiles That' },
    title2: { es: 'Hablan por Sí Solas', en: 'Speak for Themselves' },
  },
  stats: {
    items: {
      es: [
        { value: '6+', label: 'Años de Experiencia' },
        { value: '4.500+', label: 'Carillas Fabricadas' },
        { value: '96%', label: 'Satisfacción Clínica' },
        { value: '5+', label: 'Países Exportados' },
      ],
      en: [
        { value: '6+', label: 'Years of Experience' },
        { value: '4,500+', label: 'Veneers Crafted' },
        { value: '96%', label: 'Clinical Satisfaction' },
        { value: '5+', label: 'Export Countries' },
      ],
    },
  },
  about: {
    sectionLabel: { es: 'Quiénes Somos', en: 'About Us' },
    title: { es: 'Pasión por la', en: 'Passion for' },
    title2: { es: 'Excelencia Dental', en: 'Dental Excellence' },
    description: {
      es: 'Natural Veneers nació de la convicción de que cada paciente merece una sonrisa perfecta. Nuestro equipo de ceramistas certificados combina técnica artesanal con tecnología de precisión para fabricar carillas que superan las expectativas más exigentes.',
      en: 'Natural Veneers was born from the conviction that every patient deserves a perfect smile. Our team of certified ceramists combines artisan technique with precision technology to craft veneers that exceed the most demanding expectations.',
    },
    description2: {
      es: 'Trabajamos exclusivamente con clínicos que comparten nuestra filosofía: cero compromisos en calidad, máxima atención al detalle, y resultados que transforman vidas.',
      en: 'We work exclusively with clinicians who share our philosophy: zero compromises in quality, maximum attention to detail, and results that transform lives.',
    },
    teamLabel: { es: 'Nuestro Equipo', en: 'Our Team' },
  },
  faq: {
    sectionLabel: { es: 'Preguntas Frecuentes', en: 'FAQ' },
    title: { es: 'Todo lo que Necesitas', en: 'Everything You Need' },
    title2: { es: 'Saber', en: 'to Know' },
  },
  cta: {
    badge: { es: 'Empieza Ahora', en: 'Start Now' },
    title: { es: 'Eleva tu Clínica al', en: 'Elevate Your Practice to the' },
    title2: { es: 'Siguiente Nivel', en: 'Next Level' },
    subtitle: {
      es: 'Contacta a nuestro equipo y descubre cómo podemos transformar los casos de tus pacientes con carillas de clase mundial.',
      en: 'Contact our team and discover how we can transform your patients\' cases with world-class veneers.',
    },
    whatsapp: { es: 'Escribir por WhatsApp', en: 'Message on WhatsApp' },
    form: {
      name: { es: 'Nombre completo', en: 'Full name' },
      email: { es: 'Correo electrónico', en: 'Email address' },
      phone: { es: 'Teléfono (opcional)', en: 'Phone (optional)' },
      message: { es: 'Cuéntanos sobre tu caso', en: 'Tell us about your case' },
      submit: { es: 'Enviar Mensaje', en: 'Send Message' },
      sending: { es: 'Enviando...', en: 'Sending...' },
      success: {
        es: 'Mensaje enviado. Te contactamos pronto.',
        en: 'Message sent. We\'ll contact you soon.',
      },
      error: {
        es: 'Error al enviar. Intenta de nuevo.',
        en: 'Failed to send. Please try again.',
      },
    },
  },
  footer: {
    tagline: {
      es: 'Arte en porcelana. Excelencia en cada detalle.',
      en: 'Art in porcelain. Excellence in every detail.',
    },
    rights: { es: 'Todos los derechos reservados.', en: 'All rights reserved.' },
    location: { es: 'Colombia', en: 'Colombia' },
  },
} as const

export function t<T>(obj: { es: T; en: T }, lang: Lang): T {
  return obj[lang]
}

export const PRODUCTS: Product[] = [
  {
    id: 'estratificadas',
    image: '/img/estratificadas.jpg',
    titleEs: 'Carillas Estratificadas',
    titleEn: 'Layered Veneers',
    descEs: 'Máxima translucidez y naturalidad. Capas de porcelana aplicadas manualmente para mimetizar el esmalte dental.',
    descEn: 'Maximum translucency and naturalness. Manually applied porcelain layers that mimic tooth enamel.',
    tag: 'Premium',
  },
  {
    id: 'monoliticas',
    image: '/img/monoliticas-new.jpg',
    titleEs: 'Carillas Monolíticas',
    titleEn: 'Monolithic Veneers',
    descEs: 'Alta resistencia en una sola estructura. Ideal para casos funcionales sin sacrificar estética.',
    descEn: 'High strength in a single structure. Ideal for functional cases without sacrificing aesthetics.',
    tag: 'Resistentes',
  },
  {
    id: 'feldespato',
    image: '/img/feldespato.jpg',
    titleEs: 'Feldespato Puro',
    titleEn: 'Pure Feldspar',
    descEs: 'La porcelana más cercana al diente natural. Ultra-finas, hasta 0.3mm de grosor.',
    descEn: 'The porcelain closest to the natural tooth. Ultra-thin, down to 0.3mm thickness.',
    tag: 'Ultra-Fino',
  },
  {
    id: 'hibridas',
    image: '/img/hibridas.jpg',
    titleEs: 'Carillas Híbridas',
    titleEn: 'Hybrid Veneers',
    descEs: 'La fusión entre resistencia y estética. Solución versátil para el clínico moderno.',
    descEn: 'The fusion of strength and aesthetics. Versatile solution for the modern clinician.',
    tag: 'Versátil',
  },
]

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    titleEs: 'Diseño Digital',
    titleEn: 'Digital Design',
    descEs: 'Analizamos el caso clínico con software de diseño de sonrisa. Cada caso es único.',
    descEn: 'We analyze the clinical case with smile design software. Every case is unique.',
    image: '/img/proceso-1.jpg',
  },
  {
    number: '02',
    titleEs: 'Estratificación',
    titleEn: 'Stratification',
    descEs: 'Nuestros ceramistas aplican cada capa de porcelana bajo magnificación microscópica.',
    descEn: 'Our ceramists apply each porcelain layer under microscopic magnification.',
    image: '/img/proceso-2.jpg',
  },
  {
    number: '03',
    titleEs: 'Control Final',
    titleEn: 'Final QC',
    descEs: 'Revisión exhaustiva de morfología, color y translucidez antes de despacho.',
    descEn: 'Exhaustive review of morphology, color, and translucency before dispatch.',
    image: '/img/proceso-3.jpg',
  },
]

export const FAQ_ITEMS: FAQItem[] = [
  {
    questionEs: '¿Cuál es el tiempo de entrega?',
    questionEn: 'What is the turnaround time?',
    answerEs: 'El tiempo estándar es de 2 a 4 días hábiles desde la recepción del modelo.',
    answerEn: 'Standard turnaround is 2 to 4 business days from model receipt.',
  },
  {
    questionEs: '¿Trabajan con clínicos fuera de Colombia?',
    questionEn: 'Do you work with clinicians outside Colombia?',
    answerEs: 'Sí, trabajamos con clínicos en más de 5 países. Tenemos experiencia en envíos internacionales con embalaje especializado y seguro para trabajo dental.',
    answerEn: 'Yes, we work with clinicians in more than 5 countries. We have experience in international shipping with specialized packaging and dental work insurance.',
  },
  {
    questionEs: '¿Qué información necesitan para iniciar un caso?',
    questionEn: 'What information do you need to start a case?',
    answerEs: 'Necesitamos: fotos clínicas (frontal, lateral, oclusal), guía de color, modelo de estudio o STL digital, y el diseño de sonrisa si ya lo tienen. Les enviamos nuestro formulario de solicitud por WhatsApp.',
    answerEn: 'We need: clinical photos (frontal, lateral, occlusal), shade guide, study model or digital STL, and smile design if already done. We\'ll send our order form via WhatsApp.',
  },
  {
    questionEs: '¿Qué garantía ofrecen?',
    questionEn: 'What warranty do you offer?',
    answerEs: 'Garantizamos el ajuste y la estética de cada carilla. Si hay algún problema de adaptación en el Try-In, hacemos los ajustes necesarios sin costo adicional.',
    answerEn: 'We guarantee the fit and aesthetics of every veneer. If there\'s any adaptation issue at Try-In, we make the necessary adjustments at no extra cost.',
  },
  {
    questionEs: '¿Utilizan materiales certificados?',
    questionEn: 'Do you use certified materials?',
    answerEs: 'Trabajamos exclusivamente con porcelanas de casas internacionales certificadas (VITA, Ivoclar, GC) con trazabilidad completa por lote.',
    answerEn: 'We work exclusively with porcelains from certified international brands (VITA, Ivoclar, GC) with complete batch traceability.',
  },
]
