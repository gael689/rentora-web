'use client';

/* La escena de operaciones: un carrusel casi vertical (un arco abierto a la izquierda) con la
 * pantalla de la operación activa a la derecha, dentro de un contenedor alto con un hijo pegajoso
 * (sticky). El movimiento es continuo:
 *   1. el scroll dentro del contenedor fija una meta fraccionaria `p` (0 → n−1; el scroll termina
 *      en la última operación),
 *   2. un lerp en requestAnimationFrame lleva el valor dibujado `actual` hacia la meta, y cada
 *      tarjeta se posiciona según su posición relativa (i − p, circular): sólo transform/opacity,
 *   3. la activa (la que muestra el panel y el link) es round(p) con histéresis.
 * Un clic en una tarjeta no activa la vuelve activa (sin navegar) y lleva el scroll a su posición
 * con scroll suave (también con Tab + Enter/Espacio). Sin flechas ni puntos. El hover NO cambia la activa. El clic
 * en la activa navega: todas las tarjetas son links reales, así que sin JS (o en móvil) cada una
 * navega como un link común. Con prefers-reduced-motion no hay interpolación.
 * El contenido llega renderizado desde el servidor; acá sólo se tocan atributos y estilos. */

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import s from './operaciones.module.css';

const ESCRITORIO = '(min-width: 900px)';
/** Cuánto (en operaciones) hay que pasarse del punto medio para cambiar de activa. */
const HISTERESIS = 0.12;
/** Constante de tiempo (ms) del lerp: más chica = más pegado al scroll. */
const TAU = 90;
/** Escala, opacidad por distancia a la activa (0, 1, 2, 3+). Interpolado entre enteros. */
const ESCALA = [1.06, 0.86, 0.74, 0.66];
const OPACIDAD = [1, 0.55, 0.3, 0];

function interp(tabla: number[], a: number) {
  const i = Math.min(tabla.length - 1, Math.floor(a));
  const j = Math.min(tabla.length - 1, i + 1);
  return tabla[i] + (tabla[j] - tabla[i]) * (a - i);
}
const mod = (x: number, n: number) => ((x % n) + n) % n;
/** Diferencia circular en (−n/2, n/2]. */
const envolver = (d: number, n: number) => mod(d + n / 2, n) - n / 2;

export default function Escena({
  paneles,
  children,
}: {
  paneles: ReactNode;
  children: ReactNode;
}) {
  const cantidad = Children.count(children);
  const raiz = useRef<HTMLDivElement>(null);
  const [activa, setActiva] = useState(0);
  const activaRef = useRef(0);
  // Mientras el scroll suave llega a la operación elegida a mano, el scroll no decide la meta.
  const bloqueo = useRef(false);
  const finBloqueo = useRef<number | undefined>(undefined);
  // `meta` la fija el scroll o un clic; `actual` la persigue.
  const meta = useRef(0);
  const actual = useRef(0);
  const cuadro = useRef(0);
  const ultimo = useRef(0);

  const fijarActiva = useCallback((n: number) => {
    activaRef.current = n;
    setActiva(n);
  }, []);

  // Estado discreto en el DOM que React no reconcilia (los hijos vienen del servidor).
  useEffect(() => {
    raiz.current?.querySelectorAll<HTMLElement>('[data-n]').forEach((el) => {
      const i = Number(el.dataset.n);
      const link = el.firstElementChild;
      if (i === activa) {
        el.setAttribute('data-on', '');
        link?.setAttribute('aria-current', 'true');
      } else {
        el.removeAttribute('data-on');
        link?.removeAttribute('aria-current');
      }
    });
  }, [activa]);

  // Posiciona las tarjetas según `actual`. Arco abierto: radio grande, paso angular chico.
  const dibujar = useCallback(() => {
    const items = raiz.current?.querySelectorAll<HTMLElement>(`.${s.item}`);
    if (!items?.length) return;
    // Móvil / sin sticky: lista normal, sin estilos en línea.
    if (!window.matchMedia(ESCRITORIO).matches) {
      items.forEach((el) => {
        el.style.transform = '';
        el.style.opacity = '';
        el.style.zIndex = '';
        el.style.pointerEvents = '';
        el.style.removeProperty('--elev');
      });
      return;
    }
    const alto = items[0].offsetHeight || 150;
    const paso = (26 * Math.PI) / 180;
    const A = (alto * 0.9) / Math.sin(paso);
    const p = actual.current;
    items.forEach((el) => {
      const d = envolver(Number(el.dataset.n) - p, cantidad);
      const a = Math.abs(d);
      const y = A * Math.sin(d * paso);
      const x = -A * 0.5 * (1 - Math.cos(d * paso));
      const o = interp(OPACIDAD, a);
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${interp(ESCALA, a).toFixed(3)})`;
      el.style.opacity = o.toFixed(3);
      el.style.zIndex = String(Math.round(20 - a * 4));
      el.style.pointerEvents = o < 0.05 ? 'none' : '';
      el.style.setProperty('--elev', Math.max(0, 1 - a * 1.5).toFixed(3));
    });
  }, [cantidad]);

  // La activa: round(p) circular, con histéresis respecto de la actual.
  const decidir = useCallback(() => {
    const p = mod(actual.current, cantidad);
    const a = activaRef.current;
    if (Math.abs(envolver(p - a, cantidad)) > 0.5 + HISTERESIS) fijarActiva(mod(Math.round(p), cantidad));
  }, [cantidad, fijarActiva]);

  const paso = useCallback(
    (t: number) => {
      const dt = Math.min(64, t - ultimo.current || 16);
      ultimo.current = t;
      const dif = meta.current - actual.current;
      if (Math.abs(dif) < 0.002) {
        actual.current = meta.current;
        cuadro.current = 0;
      } else {
        actual.current += dif * (1 - Math.exp(-dt / TAU));
        cuadro.current = requestAnimationFrame(paso);
      }
      dibujar();
      decidir();
    },
    [dibujar, decidir],
  );

  // Mueve la meta (siempre interpolado: no depende de la configuración del sistema operativo).
  const irMeta = useCallback(
    (m: number) => {
      meta.current = m;
      if (!cuadro.current) {
        ultimo.current = performance.now();
        cuadro.current = requestAnimationFrame(paso);
      }
    },
    [dibujar, decidir, paso],
  );

  // Geometría de la escena: dónde queda pegada y cuánto scroll recorre.
  const medir = useCallback(() => {
    const nodo = raiz.current;
    const fijo = nodo?.firstElementChild as HTMLElement | null | undefined;
    if (!nodo || !fijo) return null;
    const r = nodo.getBoundingClientRect();
    const arriba = parseFloat(getComputedStyle(fijo).top) || 0;
    const recorrido = r.height - fijo.offsetHeight;
    if (recorrido <= 0) return null;
    return { arriba, recorrido, top: r.top };
  }, []);

  // Progreso del scroll: de 0 (la escena se pega) a n−1 (se suelta). Continuo, sin tramos.
  useEffect(() => {
    if (!raiz.current) return;
    const mq = window.matchMedia(ESCRITORIO);
    let pendiente = 0;

    const calcular = () => {
      pendiente = 0;
      if (!mq.matches) {
        dibujar();
        return;
      }
      if (bloqueo.current) return;
      const g = medir();
      if (!g) return;
      const p = Math.min(1, Math.max(0, (g.arriba - g.top) / g.recorrido));
      // Si venía de una vuelta circular (meta fuera de rango), se reencuadra sin salto visible.
      const m = p * (cantidad - 1);
      const k = Math.round((actual.current - m) / cantidad) * cantidad;
      actual.current -= k;
      irMeta(m);
    };
    const alScrollear = () => {
      if (bloqueo.current) {
        // El bloqueo termina cuando el scroll suave se detiene.
        window.clearTimeout(finBloqueo.current);
        finBloqueo.current = window.setTimeout(() => {
          bloqueo.current = false;
          calcular();
        }, 140);
        return;
      }
      if (!pendiente) pendiente = requestAnimationFrame(calcular);
    };
    // Si la persona toma el control (rueda, dedo, teclado), el scroll vuelve a decidir.
    const soltar = () => {
      if (!bloqueo.current) return;
      bloqueo.current = false;
      window.clearTimeout(finBloqueo.current);
    };

    calcular();
    dibujar();
    window.addEventListener('scroll', alScrollear, { passive: true });
    window.addEventListener('resize', alScrollear);
    window.addEventListener('wheel', soltar, { passive: true });
    window.addEventListener('touchstart', soltar, { passive: true });
    window.addEventListener('keydown', soltar);
    return () => {
      window.removeEventListener('scroll', alScrollear);
      window.removeEventListener('resize', alScrollear);
      window.removeEventListener('wheel', soltar);
      window.removeEventListener('touchstart', soltar);
      window.removeEventListener('keydown', soltar);
      window.clearTimeout(finBloqueo.current);
      if (pendiente) cancelAnimationFrame(pendiente);
      if (cuadro.current) cancelAnimationFrame(cuadro.current);
      cuadro.current = 0;
    };
  }, [cantidad, medir, irMeta, dibujar]);

  // Activa la operación i: el carrusel se desliza (por el camino circular más corto) y el scroll
  // de la página se lleva a su posición para que queden sincronizados.
  const irA = useCallback(
    (i: number) => {
      const n = mod(i, cantidad);
      fijarActiva(n);
      if (!window.matchMedia(ESCRITORIO).matches) return;
      const g = medir();
      if (!g) return;
      // Camino circular: se reencuadra `actual` para que la meta quede a distancia mínima.
      const dif = envolver(n - actual.current, cantidad);
      actual.current = n - dif;
      irMeta(n);
      const destino = Math.round(window.scrollY + g.top - g.arriba + (n / (cantidad - 1)) * g.recorrido);
      if (Math.abs(destino - window.scrollY) < 2) return;
      bloqueo.current = true;
      window.clearTimeout(finBloqueo.current);
      finBloqueo.current = window.setTimeout(() => {
        bloqueo.current = false;
      }, 700);
      window.scrollTo({ top: destino, behavior: 'smooth' });
    },
    [cantidad, medir, irMeta, fijarActiva],
  );

  // Una tarjeta que no es la activa: el clic (o Espacio) la activa sin navegar. La activa es un
  // link normal y navega. Con modificadores (abrir en otra pestaña) o en móvil, el link anda igual.
  const itemDe = (ev: React.SyntheticEvent) => (ev.target as HTMLElement).closest<HTMLElement>('[data-n]');
  const alClic = (ev: React.MouseEvent) => {
    if (!window.matchMedia(ESCRITORIO).matches) return;
    if (ev.button !== 0 || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
    const item = itemDe(ev);
    if (!item || item.closest(`.${s.vista}`)) return;
    const n = Number(item.dataset.n);
    if (n === activaRef.current) return;
    // En captura: así el onClick del <Link> (que navegaría) nunca llega a correr.
    ev.preventDefault();
    ev.stopPropagation();
    irA(n);
  };
  const alTeclear = (ev: React.KeyboardEvent) => {
    if (ev.key !== ' ' || !window.matchMedia(ESCRITORIO).matches) return;
    const item = itemDe(ev);
    if (!item || item.closest(`.${s.vista}`) || Number(item.dataset.n) === activaRef.current) return;
    ev.preventDefault();
    irA(Number(item.dataset.n));
  };

  return (
    <div ref={raiz} className={s.escena} style={{ '--n': cantidad } as React.CSSProperties}>
      <div className={s.fijo} onClickCapture={alClic} onKeyDown={alTeclear}>
        <div className={s.arco}>{children}</div>
        <div className={s.vista}>{paneles}</div>
      </div>
    </div>
  );
}
