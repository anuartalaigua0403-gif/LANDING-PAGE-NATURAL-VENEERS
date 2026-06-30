export type Lang = 'es' | 'en'

export interface Product {
  id: string
  image: string
  titleEs: string
  titleEn: string
  descEs: string
  descEn: string
  tag: string
}

export interface ProcessStep {
  number: string
  titleEs: string
  titleEn: string
  descEs: string
  descEn: string
  image: string
}

export interface FAQItem {
  questionEs: string
  questionEn: string
  answerEs: string
  answerEn: string
}

export interface Testimonial {
  name: string
  roleEs: string
  roleEn: string
  city: string
  quoteEs: string
  quoteEn: string
  rating: number
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  message: string
  lang: Lang
}

export interface ContactApiResponse {
  success: boolean
  message: string
}
