'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PARA } from '@/lib/seo';
import { VISUAL_PARA } from '@/lib/para-visual';
import s from './carrusel-para.module.css';

/* Carrusel horizontal de los tipos de rentadora. Es una fila con scroll horizontal y snap (se ve y
 * se mueve igual sin JavaScript). Con JS y sin `prefers-reduced-motion` se vuelve una cinta en
 * movimiento constante: la lista se triplica (las copias van ocultas a lectores y a Tab), avanza
 * a velocidad lenta y pareja con requestAnimationFrame y, al llegar al final de una vuelta, salta
 * una vuelta entera hacia atrás, que se ve idéntico (sin tirón). Se mantiene el movimiento manual:
 * arrastre con el mouse, scroll/gesto táctil nativo y flechas. Hover o foco lo pausan; tras un
 * gesto manual se reanuda a los ~1,5 s. Con reduced-motion no avanza solo y las flechas corren una
 * tarjeta. Las tarjetas siguen siendo links a /para/[slug]; un arrastre no dispara el click. */

const PAUSA_TRAS_GESTO = 1500;
/** Velocidad del avance continuo, en px por segundo. */
const VELOCIDAD = 35;

export default function CarruselPara({ prioridad = false, etiqueta }: { prioridad?: boolean; etiqueta: string }) {
  const ventana = useRef<HTMLDivElement>(null);
  const encima = useRef(false);
  const hastaCuando = useRef(0);
  const propio = useRef(0);
  const [bucle, setBucle] = useState(false);
  const arrastre = useRef<{ x: number; scroll: number; movido: boolean } | null>(null);
  const [extremo, setExtremo] = useState<'inicio' | 'medio' | 'fin'>('inicio');

  const paso = () => {
    const v = ventana.current;
    const item = v?.querySelector<HTMLElement>('li');
    if (!v || !item) return 0;
    const lista = item.parentElement as HTMLElement;
    return item.offsetWidth + (parseFloat(getComputedStyle(lista).columnGap) || 0);
  };

  const gesto = () => {
    hastaCuando.current = performance.now() + PAUSA_TRAS_GESTO;
  };

  const mover = (dir: 1 | -1) => {
    gesto();
    ventana.current?.scrollBy({ left: dir * paso(), behavior: 'smooth' });
  };

  const medir = useCallback(() => {
    const v = ventana.current;
    if (!v) return;
    const max = v.scrollWidth - v.clientWidth;
    if (bucle) return;
    setExtremo(v.scrollLeft <= 4 ? 'inicio' : v.scrollLeft >= max - 4 ? 'fin' : 'medio');
  }, [bucle]);

  // Con movimiento permitido, la cinta pasa a ser un bucle (se triplica la lista, después de montar).
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setBucle(true);
  }, []);

  // Vuelta completa en px: de una tarjeta de la primera copia a la misma de la segunda.
  const vuelta = () => {
    const items = ventana.current?.querySelectorAll<HTMLElement>('li');
    const n = PARA.length;
    if (!items || items.length < n * 2) return 0;
    return items[n].offsetLeft - items[0].offsetLeft;
  };
  // Mantiene el scroll en la copia del medio: lo que se ve es idéntico, así que el salto no se nota.
  const envolver = (x: number, v: number) => {
    if (x >= v * 2) return x - v;
    if (x < v * 0.5) return x + v;
    return x;
  };

  // Avance continuo.
  useEffect(() => {
    const v = ventana.current;
    if (!bucle || !v) return;
    let pos = 0;
    let ultimo = 0;
    let cuadro = 0;
    const arrancar = () => {
      const vu = vuelta();
      if (!vu) return false;
      v.scrollLeft = vu;
      pos = vu;
      propio.current = v.scrollLeft;
      return true;
    };
    arrancar();
    const tick = (t: number) => {
      cuadro = requestAnimationFrame(tick);
      const dt = Math.min(0.25, (t - ultimo) / 1000);
      ultimo = t;
      const vu = vuelta();
      if (!vu) return;
      const ahora = performance.now();
      const sl = v.scrollLeft;
      // Si el scroll se movió solo (gesto, rueda, flechas), es un gesto manual: pausa y retoma desde ahí.
      if (Math.abs(sl - propio.current) > 2) {
        hastaCuando.current = ahora + PAUSA_TRAS_GESTO;
        pos = sl;
      }
      if (encima.current || arrastre.current || ahora < hastaCuando.current) {
        const w = envolver(sl, vu);
        if (w !== sl) v.scrollLeft = w;
        pos = v.scrollLeft;
        propio.current = pos;
        return;
      }
      pos = envolver(pos + VELOCIDAD * dt, vu);
      v.scrollLeft = pos;
      propio.current = v.scrollLeft;
    };
    cuadro = requestAnimationFrame((t) => {
      ultimo = t;
      tick(t);
    });
    const alAjustar = () => arrancar();
    window.addEventListener('resize', alAjustar);
    return () => {
      cancelAnimationFrame(cuadro);
      window.removeEventListener('resize', alAjustar);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bucle]);

  useEffect(() => {
    medir();
    window.addEventListener('resize', medir);
    return () => window.removeEventListener('resize', medir);
  }, [medir]);

  return (
    <div
      className={s.marco}
      role="region"
      aria-roledescription="carrusel"
      aria-label={etiqueta}
      onMouseEnter={() => (encima.current = true)}
      onMouseLeave={() => (encima.current = false)}
      onFocus={() => (encima.current = true)}
      onBlur={() => (encima.current = false)}
    >
      <div
        ref={ventana}
        className={`${s.ventana} ${bucle ? s.bucle : ''}`}
        onScroll={medir}
        onTouchStart={gesto}
        onWheel={gesto}
        onPointerDown={(ev) => {
          if (ev.pointerType !== 'mouse' || ev.button !== 0 || !ventana.current) return;
          gesto();
          arrastre.current = { x: ev.clientX, scroll: ventana.current.scrollLeft, movido: false };
        }}
        onPointerMove={(ev) => {
          const a = arrastre.current;
          const v = ventana.current;
          if (!a || !v) return;
          const dx = ev.clientX - a.x;
          if (!a.movido && Math.abs(dx) > 6) {
            a.movido = true;
            v.setAttribute('data-arrastrando', '');
          }
          if (a.movido) v.scrollLeft = a.scroll - dx;
        }}
        onPointerUp={() => {
          const v = ventana.current;
          if (!arrastre.current || !v) return;
          const movido = arrastre.current.movido;
          v.removeAttribute('data-arrastrando');
          arrastre.current = null;
          gesto();
          if (movido) {
            // El click que sigue al soltar se descarta una sola vez.
            const callar = (e: Event) => {
              e.preventDefault();
              e.stopPropagation();
            };
            v.addEventListener('click', callar, { capture: true, once: true });
            window.setTimeout(() => v.removeEventListener('click', callar, { capture: true }), 60);
          }
        }}
        onPointerLeave={() => {
          arrastre.current = null;
          ventana.current?.removeAttribute('data-arrastrando');
        }}
        onDragStart={(ev) => ev.preventDefault()}
      >
        <ul className={s.pista}>
          {(bucle ? [0, 1, 2] : [1]).flatMap((copia) => PARA.map((p, i) => ({ p, i, copia }))).map(({ p, i, copia }) => {
            const v = VISUAL_PARA[p.slug];
            const arriba = prioridad && i < 4 && copia === 1;
            // Las copias del bucle son sólo visuales: fuera del árbol de accesibilidad y de Tab.
            const oculta = bucle && copia !== 1;
            return (
              <li key={`${copia}-${p.slug}`} className={s.item} aria-hidden={oculta || undefined}>
                <Link
                  href={`/para/${p.slug}`}
                  className={`tarjeta-foto ${s.tarjeta}`}
                  draggable={false}
                  tabIndex={oculta ? -1 : undefined}
                >
                  {v && (
                    <Image
                      src={v.src}
                      alt={v.alt}
                      fill
                      draggable={false}
                      sizes="(min-width: 1000px) 360px, (min-width: 600px) 40vw, 62vw"
                      className={s.foto}
                      style={{ objectPosition: v.pos }}
                      loading={arriba ? 'eager' : 'lazy'}
                      fetchPriority={arriba ? 'high' : undefined}
                    />
                  )}
                  <span className="tarjeta-foto__texto">
                    <span className="tarjeta-foto__titulo">{p.nombre}</span>
                    {v && <span className="tarjeta-foto__frase">{v.frase}</span>}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <button
        type="button"
        className={`${s.flecha} ${s.izq}`}
        onClick={() => mover(-1)}
        aria-label="Anterior"
        disabled={!bucle && extremo === 'inicio'}
      >
        <span aria-hidden="true">←</span>
      </button>
      <button
        type="button"
        className={`${s.flecha} ${s.der}`}
        onClick={() => mover(1)}
        aria-label="Siguiente"
        disabled={!bucle && extremo === 'fin'}
      >
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
