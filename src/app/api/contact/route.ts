import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import type { ContactFormData, ContactApiResponse } from '@/types'
import { LEGAL_VERSION } from '@/lib/legal'

// Escapa caracteres HTML para evitar inyección de código en el correo
function esc(v: unknown): string {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Simple in-memory rate limiter (per IP)
const rateMap = new Map<string, { count: number; ts: number }>()
const RATE_LIMIT = 3
const RATE_WINDOW = 60_000 // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateMap.get(ip)
  if (!record || now - record.ts > RATE_WINDOW) {
    rateMap.set(ip, { count: 1, ts: now })
    return true
  }
  if (record.count >= RATE_LIMIT) return false
  record.count++
  return true
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ success: false, message: 'Too many requests.' }, { status: 429 })
  }
  let body: ContactFormData
  try { body = await request.json() }
  catch { return NextResponse.json({ success: false, message: 'Invalid body.' }, { status: 400 }) }
  const { name, email, phone, message, consent } = body
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ success: false, message: 'Required fields missing.' }, { status: 422 })
  }
  // Sin autorización expresa no se tratan los datos (Ley 1581 de 2012)
  if (consent !== true) {
    return NextResponse.json({ success: false, message: 'Consent required.' }, { status: 422 })
  }
  if (!EMAIL_RE.test(email) || name.length > 120 || email.length > 160 || (phone ?? '').length > 40 || message.length > 5000) {
    return NextResponse.json({ success: false, message: 'Invalid fields.' }, { status: 422 })
  }
  const consentAt = new Date().toISOString()
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT) || 587,
    secure: false, auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  })
  try {
    await transporter.sendMail({
      from: `"Natural Veneers" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER, replyTo: email,
      subject: `Nuevo contacto de ${name.replace(/[\r\n]/g, ' ').slice(0, 120)} — Natural Veneers`,
      html: `<h1>${esc(name)}</h1><p>${esc(email)}</p><p>${esc(phone)}</p><p style="white-space:pre-wrap">${esc(message)}</p>`
        + `<hr><p style="font-size:12px;color:#666">Autorización de tratamiento de datos: SÍ · ${consentAt} · Política v${LEGAL_VERSION} · IP ${esc(ip)}</p>`
    })
    return NextResponse.json({ success: true, message: 'Sent.' })
  } catch(err) {
    console.error('Email error:', err)
    return NextResponse.json({ success: false, message: 'Email failed.' }, { status: 500 })
  }
}
