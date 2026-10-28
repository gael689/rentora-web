/* Línea que se traza (de izquierda a derecha) al entrar al viewport: subrayados de títulos, hilos
 * divisorios, barritas de acento. Decorativa: `aria-hidden`. Se anima con `scaleX`, nunca el
 * layout. Sin JS, o con movimiento reducido, se ve entera. */
export default function Linea({ className, i = 0 }: { className?: string; i?: number }) {
  return (
    <span
      aria-hidden="true"
      className={`linea${className ? ` ${className}` : ''}`}
      data-linea=""
      style={{ ['--rv-i' as string]: Math.min(i, 6) }}
    />
  );
}
