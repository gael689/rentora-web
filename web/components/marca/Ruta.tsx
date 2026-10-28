import s from './ruta.module.css';

/* El motivo de la marca (v6): una ruta enorme que cruza la banda y se sale por los bordes, con la
 * línea del medio que avanza y un destello de luz que la recorre. Es el equivalente de la "S"
 * gigante de Solven, pero de RentaGo: autos en la ruta. Decorativo (`aria-hidden`), va detrás de
 * todo dentro de una banda con `isolation: isolate`. Con `prefers-reduced-motion` queda quieta.
 *
 *   <Ruta />                 sobre una malla oscura o turquesa
 *   <Ruta tono="claro" />    sobre la malla hielo */
export default function Ruta({ tono = 'oscuro', className }: { tono?: 'oscuro' | 'claro'; className?: string }) {
  const d = 'M -80 640 C 220 600, 300 380, 560 360 S 880 250, 980 150 S 1180 -10, 1320 -40';
  return (
    <svg
      className={`${s.ruta} ${tono === 'claro' ? s.claro : ''} ${className ?? ''}`}
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="ruta-destello" x1="0" x2="1">
          <stop offset="0" stopColor="#7fd4d8" stopOpacity="0" />
          <stop offset="0.6" stopColor="#bff6f0" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
      </defs>
      <path d={d} className={s.calzada} />
      <path d={d} className={s.centro} />
      <path d={d} className={s.destello} stroke="url(#ruta-destello)" pathLength={1000} />
    </svg>
  );
}
