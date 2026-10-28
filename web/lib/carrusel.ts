/* Distancia circular de la tarjeta `i` a la activa `a` en un carrusel de `n`: 0 es la activa,
 * 1 la siguiente, -1 la anterior. Para n = 6 va de -3 a 2. */
export function distancia(i: number, a: number, n: number): number {
  const mitad = Math.floor(n / 2);
  return ((((i - a + mitad) % n) + n) % n) - mitad;
}
