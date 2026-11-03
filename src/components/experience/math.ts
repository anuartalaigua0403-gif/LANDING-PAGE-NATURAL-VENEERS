export const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x)
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
export const smooth = (x: number) => {
  const t = clamp01(x)
  return t * t * (3 - 2 * t)
}
/** Cercanía (1 → 0) entre el foco actual y el índice i. */
export const focusWeight = (focus: number, i: number) => clamp01(1 - Math.abs(focus - i))
