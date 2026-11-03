# The Anatomy Experience — modelos 3D, instalación y despliegue

Prototipo en la rama `prototipo-anatomy`, ruta `/anatomia` (noindex). No forma parte de `desarrollo` ni de producción.

## Estado actual
- La escena usa un **modelo provisional generado por código** (`src/components/experience/placeholderGeometry.ts`):
  aproximación simplificada de un incisivo central superior, con capas separadas. **No es un modelo anatómico exacto.**
- Nervios y vasos son **ilustrativos**.
- La escena 03 (CAD) es una **representación visual**, no la salida de un software clínico.

## Modelos que hay que conseguir o producir (Blender → GLB)

### 1. `public/models/tooth/tooth-anatomy.glb`
Diente anatómico (recomendado: incisivo central superior), escala en metros o unidades libres; eje Y = eje largo del diente,
cara vestibular mirando a +Z, borde incisal arriba. Mallas separadas con estos nombres EXACTOS:

| Nombre de la malla | Estructura |
|---|---|
| `Enamel` | Esmalte (solo corona) |
| `Dentin` | Dentina (corona + raíz) |
| `Pulp` | Cámara pulpar / pulpa coronal |
| `RootCanals` | Conductos radiculares |
| `Cementum` | Cemento radicular |
| `Nerve` | Nervio (ilustrativo) |
| `Artery` | Arteria (ilustrativa) |
| `Vein` | Vena (ilustrativa) |

- Polígonos orientativos: 30–60 k triángulos en total. Exportar con compresión Draco o Meshopt.
- Sin texturas pesadas (máx. 2048 px, preferiblemente KTX2/WebP).

### 2. `public/models/veneer/veneer-layers.glb`
Carilla adaptada a la cara vestibular del mismo diente, con 5 mallas: `Structure`, `Body`, `Layering`, `Characterization`, `Glaze`.

## Cómo activarlos
1. Copiar los archivos a las rutas de arriba.
2. En `src/lib/sceneConfig.ts` → `MODELS.tooth.available = true` (y `MODELS.veneer.available` cuando exista su lector).
3. Si los nombres de malla son distintos, ajustar `MODELS.tooth.nodes`.
4. Ajustar los puntos de anclaje de las etiquetas (`ANATOMY_LABELS[].anchor`) a las coordenadas del nuevo modelo.

> Nota: el lector del GLB del diente está implementado (`ToothModel.tsx`) pero aún **no se ha probado**, porque el archivo no existe.
> El lector de la carilla en GLB queda pendiente para la fase 3.

## Instalación local
```bash
npm install
npm run dev     # http://localhost:3000/anatomia
npm run build
```

## Despliegue en Vercel
Cada push a la rama `prototipo-anatomy` genera una vista previa privada en Vercel. No se publica en producción
hasta hacer un PR hacia `feature/redesign-v2` y aprobarlo.

## Arquitectura
- `src/app/anatomia/` — ruta y metadata (noindex)
- `src/components/experience/` — escena 3D
  - `ToothExperience.tsx` — sección fija (pin), textos de capítulos, progreso, navegación
  - `ScrollController.ts` — ÚNICA timeline maestra GSAP + ScrollTrigger (scrub, pin, reversible)
  - `experienceState.ts` — valores que GSAP escribe y la escena lee por cuadro (sin estado de React)
  - `ToothCanvas.tsx` — Canvas R3F, DPR limitado, pausa fuera de pantalla
  - `ToothModel.tsx` — elige GLB o provisional; posición, rotación y parallax del puntero
  - `AnatomyLayers.tsx` — capas, materiales, vista explosionada, etiquetas y hover
  - `DigitalOverlay.tsx` — escena 03 (malla, puntos, planos, ejes, rejilla, barrido)
  - `VeneerModel.tsx` — carilla en 5 capas e integración
  - `SceneLighting.tsx`, `GoldParticles.tsx`, `ExperienceFallback.tsx`
- `src/components/anatomia/` — navbar propia y secciones comerciales
- `src/hooks/useDeviceTier.ts`, `useReducedMotion.ts` — calidad adaptativa y accesibilidad

Tramos de scroll: 01 0–15 % · 02 15–35 % · 03 35–55 % · 04 55–80 % · 05 80–100 %.
