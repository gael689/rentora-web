'use client';

/* Pone una pantalla del sistema (1280 × 864, fija) de fondo de una caja, "a sangre": la escala
 * hasta cubrirla entera, centrada en horizontal y anclada arriba, como `object-fit: cover`. Mide la caja
 * con un ResizeObserver. Antes de medir se ve con una escala razonable para móvil, así sin
 * JavaScript igual se ve la pantalla. */

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ANCHO_MARCO, ALTO_MARCO } from './Visor';
import s from './cubre.module.css';

export default function Cubre({ children }: { children: ReactNode }) {
  const caja = useRef<HTMLDivElement>(null);
  const [medida, setMedida] = useState<{ escala: number; dx: number } | null>(null);

  useEffect(() => {
    const nodo = caja.current;
    if (!nodo) return;
    const medir = () => {
      const { clientWidth: w, clientHeight: h } = nodo;
      if (w > 0 && h > 0) {
        const escala = Math.max(w / ANCHO_MARCO, h / ALTO_MARCO);
        // Centrado en horizontal (los modales están al medio), anclado arriba.
        setMedida({ escala, dx: (w - ANCHO_MARCO * escala) / 2 });
      }
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(nodo);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={caja}
      className={s.caja}
      aria-hidden="true"
      data-listo={medida ? '' : undefined}
      style={medida ? ({ '--escala': medida.escala, '--dx': `${medida.dx}px` } as React.CSSProperties) : undefined}
    >
      <div className={s.marco}>{children}</div>
    </div>
  );
}
