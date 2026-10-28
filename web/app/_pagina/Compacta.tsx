import Link from 'next/link';
import Icono from '@/components/sistema/Icono';
import { rv } from '@/components/animacion/Reveal';
import s from './compacta.module.css';

export type CeldaCompacta = {
  /** Sin `href` la celda es sólo texto (no es un link). */
  href?: string;
  icono?: string;
  tono?: string;
  titulo: string;
  texto?: string;
};

/* Grilla densa de celdas (ícono, título, frase corta) separadas por líneas finas, sin botones: la
 * celda entera es el link y el "Ver cómo →" aparece solo al pasar el mouse o al enfocar con el
 * teclado (en pantallas sin hover queda visible pero discreto). Para /modulos y /guias.
 *
 * Opciones de la estética "foto y aire" (hoy sólo /para):
 *  - `columnas`: 2, 3 o 4 (por defecto 4) en escritorio.
 *  - `completa`: la última fila se reparte todo el ancho, así no queda una celda suelta.
 *  - `plano`: sin baldosa de ícono; el ícono va suelto, en el color del tinte. */
export default function Compacta({
  celdas,
  cta,
  etiqueta,
  columnas = 4,
  completa = false,
  plano = false,
  fila = false,
}: {
  celdas: CeldaCompacta[];
  cta?: string;
  etiqueta: string;
  columnas?: 2 | 3 | 4;
  completa?: boolean;
  plano?: boolean;
  /** Todas las celdas en una sola fila en escritorio, algo más grandes (para pocas celdas). */
  fila?: boolean;
}) {
  return (
    <ul
      className={s.compacta}
      aria-label={etiqueta}
      data-columnas={columnas}
      data-completa={completa || undefined}
      data-plano={plano || undefined}
      data-fila={fila || undefined}
      style={fila ? ({ ['--n' as string]: celdas.length } as React.CSSProperties) : undefined}
    >
      {celdas.map((c, i) => {
        const cuerpo = (
          <>
            {c.icono && (
              <span className="orbe" aria-hidden="true">
                <Icono nombre={c.icono} tam={20} dibuja />
              </span>
            )}
            <span className={s.titulo}>{c.titulo}</span>
            {c.texto && <span className={s.texto}>{c.texto}</span>}
            {c.href && cta && (
              <span className={s.cta} aria-hidden="true">
                {cta} →
              </span>
            )}
          </>
        );
        return (
          <li key={c.href ?? c.titulo} className={s.item} {...rv(i % 4)}>
            {c.href ? (
              <Link href={c.href} className={s.celda} data-tono={c.tono}>
                {cuerpo}
              </Link>
            ) : (
              <div className={s.celda} data-tono={c.tono}>
                {cuerpo}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
