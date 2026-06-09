import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import type { ContactFormData, ContactApiResponse } from '@/types'

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
  const { name, email, phone, message } = body
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ success: false, message: 'Required fields missing.' }, { status: 422 })
  }
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT) || 587,
    secure: false, auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  })
  try {
    await transporter.sendMail({
      from: `"Natural Veneers" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER, replyTo: email,
      subject: `Nuevo contacto de ${name} — Natural Veneers`,
      html: `<h1>${name}</h1><p>${email}</p><p>${phone}</p><p>${message}</p>`
    })
    return NextResponse.json({ success: true, message: 'Sent.' })
  } catch(err) {
    console.error('Email error:', err)
    return NextResponse.json({ success: false, message: 'Email failed.' }, { status: 500 })
  }
}
