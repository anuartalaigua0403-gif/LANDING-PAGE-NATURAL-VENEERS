# LANDING PAGE — NATURAL VENEERS

Landing page profesional para **Natural Veneers**, laboratorio dental premium en Colombia. Construida con Next.js 15 App Router, TypeScript, Tailwind CSS v4 y Framer Motion.

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 15 (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS v4 |
| Animaciones | Framer Motion |
| Idiomas | ES / EN (React Context) |
| Backend | Next.js API Routes + Nodemailer |
| Deploy | Vercel (recomendado) |

---

## Estructura

```
src/
├── app/
│   ├── layout.tsx          # Root layout (fuentes, metadata, providers)
│   ├── page.tsx            # Página principal
│   ├── globals.css         # Design tokens + estilos base
│   └── api/contact/
│       └── route.ts        # API de contacto (POST)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Marquee.tsx
│   │   ├── Products.tsx
│   │   ├── Process.tsx
│   │   ├── Results.tsx
│   │   ├── Stats.tsx
│   │   ├── About.tsx
│   │   ├── FAQ.tsx
│   │   └── CTA.tsx
│   └── ui/
│       ├── Cursor.tsx
│       ├── Particles.tsx
│       ├── Preloader.tsx
│       ├── ScrollReveal.tsx
│       └── LanguageToggle.tsx
├── context/
│   └── LanguageContext.tsx
├── hooks/
│   ├── useLanguage.ts
│   └── useScrollReveal.ts
├── lib/
│   ├── translations.ts     # Todas las cadenas ES/EN
│   └── utils.ts
└── types/
    └── index.ts
```

---

## Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.local.example .env.local
# Editar .env.local con tus credenciales SMTP

# 3. Agregar imágenes
# Copiar las imágenes de producto a /public/img/

# 4. Correr en desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

---

## Deploy en Vercel

```bash
npm install -g vercel
vercel
```

Agregar las variables de entorno en el dashboard de Vercel antes del deploy de producción.

---

## Paleta de colores

| Token | Hex | Uso |
|-------|-----|-----|
| `--gold` | `#C9A227` | Primario / acento |
| `--gold-bright` | `#F0CC6A` | Hover / highlights |
| `--void` | `#000000` | Fondo principal |
| `--jet` | `#0d0d0d` | Cards / secciones |
| `--cream` | `#F5F0E8` | Texto principal |

---

## Contacto

WhatsApp: [+57 304 383 8031](https://wa.me/573043838031)
