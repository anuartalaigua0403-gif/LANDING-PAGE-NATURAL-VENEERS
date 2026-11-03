import * as THREE from 'three'

/** Texturas generadas en el navegador (sin archivos externos). */
const cache: Record<string, THREE.CanvasTexture> = {}

function canvasTexture(key: string, w: number, h: number, draw: (ctx: CanvasRenderingContext2D) => void, color = false) {
  if (cache[key]) return cache[key]
  if (typeof document === 'undefined') return null
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  draw(c.getContext('2d')!)
  const t = new THREE.CanvasTexture(c)
  t.wrapS = THREE.RepeatWrapping
  t.colorSpace = color ? THREE.SRGBColorSpace : THREE.NoColorSpace
  t.anisotropy = 4
  cache[key] = t
  return t
}

/** Túbulos dentinarios: estrías finas en sentido corono-apical (relieve). */
export function getTubulesBump() {
  return canvasTexture('tubules', 1024, 512, (ctx) => {
    ctx.fillStyle = '#808080'
    ctx.fillRect(0, 0, 1024, 512)
    for (let x = 0; x < 1024; x += 1.6 + Math.random() * 1.6) {
      ctx.strokeStyle = `rgba(${Math.random() > 0.5 ? '255,255,255' : '0,0,0'},${0.12 + Math.random() * 0.22})`
      ctx.lineWidth = 0.6 + Math.random() * 0.8
      ctx.beginPath()
      ctx.moveTo(x, 0)
      for (let y = 0; y <= 512; y += 32) ctx.lineTo(x + Math.sin(y * 0.02 + x) * 1.5, y)
      ctx.stroke()
    }
  })
}

/** Variación de color de la dentina (vetas cálidas muy sutiles). */
export function getTubulesColor() {
  return canvasTexture(
    'tubules-color',
    1024,
    512,
    (ctx) => {
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, 1024, 512)
      for (let x = 0; x < 1024; x += 2 + Math.random() * 3) {
        ctx.strokeStyle = `rgba(150,105,55,${0.05 + Math.random() * 0.1})`
        ctx.lineWidth = 0.8
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x + (Math.random() - 0.5) * 6, 512)
        ctx.stroke()
      }
    },
    true,
  )
}

/** Disco suave radial (para contraluz y bokeh). */
export function getSoftDisc() {
  return canvasTexture(
    'disc',
    256,
    256,
    (ctx) => {
      const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
      g.addColorStop(0, 'rgba(255,255,255,1)')
      g.addColorStop(0.35, 'rgba(255,255,255,0.55)')
      g.addColorStop(0.7, 'rgba(255,255,255,0.12)')
      g.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, 256, 256)
    },
    true,
  )
}

/** Círculo de bokeh con borde ligeramente más brillante. */
export function getBokehDisc() {
  return canvasTexture(
    'bokeh',
    256,
    256,
    (ctx) => {
      const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 126)
      g.addColorStop(0, 'rgba(255,255,255,0.55)')
      g.addColorStop(0.82, 'rgba(255,255,255,0.7)')
      g.addColorStop(0.93, 'rgba(255,255,255,0.9)')
      g.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(128, 128, 126, 0, Math.PI * 2)
      ctx.fill()
    },
    true,
  )
}
