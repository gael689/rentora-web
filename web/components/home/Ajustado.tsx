'use client';

/* Un Visor que se achica solo para entrar en su columna.
 *
 * La réplica mide 1280 px fijos y se escala con `transform`. Quien sabe cuánto ancho hay es el
 * contenedor, así que se mide acá: ancho disponible / 1280, con un tope en 1. El valor inicial
 * es el de escritorio para que el primer cuadro no salte de forma exagerada. */

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Visor, { ANCHO_MARCO } from '@/components/sistema/Visor';

export default function Ajustado({
  ruta,
  pie,
  inicial = 0.45,
  minimo = 0,
  children,
}: {
  ruta?: string;
  pie?: string;
  inicial?: number;
  /** Escala mínima: por debajo de esto el visor scrollea de costado en vez de achicarse más. */
  minimo?: number;
  children: ReactNode;
}) {
  const caja = useRef<HTMLDivElement>(null);
  const [escala, setEscala] = useState(inicial);

  useEffect(() => {
    const nodo = caja.current;
    if (!nodo) return;
    const medir = () => {
      // Se descuentan los 2 px de borde del visor.
      const ancho = nodo.clientWidth - 2;
      if (ancho > 0) setEscala(Math.max(minimo, Math.min(1, ancho / ANCHO_MARCO)));
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(nodo);
    return () => ro.disconnect();
  }, [minimo]);

  return (
    <div ref={caja} style={{ width: '100%' }}>
      <Visor ruta={ruta} pie={pie} escala={escala}>
        {children}
      </Visor>
    </div>
  );
}
