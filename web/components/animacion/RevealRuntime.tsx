'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/* El motor de las apariciones al hacer scroll. Se monta una sola vez en el layout y no dibuja nada.
 *
 * Contrato (todo el contenido está en el HTML servido; esto sólo lo "presenta"):
 *  - Mientras no corra este efecto, nada está oculto: sin JS, con `scripting: none`, con
 *    `prefers-reduced-motion` o sin IntersectionObserver el sitio se ve completo y quieto.
 *  - Al montar marca como "ya visto" todo lo que está en el primer viewport o más arriba (sin
 *    animar, para que no parpadee) y recién después agrega `rv-on` a <html>, que es lo que oculta
 *    lo que todavía está abajo.
 *  - Después observa `[data-reveal]` (texto, cards, imágenes), `[data-dibuja]` (íconos de trazo) y
 *    `[data-linea]` (líneas que se trazan) y los marca con `data-rv="in"` una sola vez, al ~15 %.
 *  - Si algo queda sin marcar estando a la vista (observer fallido), un chequeo de respaldo lo
 *    revela; y a los 6 s de montar se revela todo lo que siga oculto: nunca hay contenido
 *    invisible de forma permanente. */

const SEL = '[data-reveal], [data-dibuja], [data-linea]';
const SIN_MARCAR = '[data-reveal]:not([data-rv]), [data-dibuja]:not([data-rv]), [data-linea]:not([data-rv])';

export default function RevealRuntime() {
  const ruta = usePathname();

  useEffect(() => {
    const raiz = document.documentElement;
    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (quieto || typeof IntersectionObserver === 'undefined') {
      raiz.classList.remove('rv-on');
      return;
    }

    const alto = () => window.innerHeight || document.documentElement.clientHeight;
    const marcar = (el: Element) => {
      if (el.getAttribute('data-rv') === 'in') return;
      el.setAttribute('data-rv', 'in');
      io.unobserve(el);
    };

    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          const a = alto();
          const visible = e.isIntersecting && (e.intersectionRatio >= 0.15 || e.intersectionRect.height >= a * 0.3);
          // Un elemento que quedó arriba del viewport (salto por ancla) también se da por visto.
          if (visible || (!e.isIntersecting && e.boundingClientRect.bottom < 0)) marcar(e.target);
        }
      },
      { threshold: [0, 0.15, 0.3], rootMargin: '0px 0px -6% 0px' },
    );

    const vigilar = (desde: ParentNode) => {
      desde.querySelectorAll(SEL).forEach((el) => {
        if (el.getAttribute('data-rv')) return;
        const r = el.getBoundingClientRect();
        if (r.top < alto()) marcar(el); // ya está en el primer viewport (o arriba): visible de entrada
        else io.observe(el);
      });
    };

    vigilar(document);
    raiz.classList.add('rv-on');

    // Contenido que aparece después (navegación entre páginas, componentes que montan tarde).
    const mo = new MutationObserver(() => vigilar(document));
    const main = document.getElementById('contenido');
    if (main) mo.observe(main, { childList: true, subtree: true });

    // Respaldo: si el observer no llegó a avisar de algo que ya se ve, se revela igual.
    const respaldo = window.setInterval(() => {
      document.querySelectorAll(SIN_MARCAR).forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < alto() * 0.85 && r.bottom > 0) marcar(el);
      });
    }, 1500);
    const final = window.setTimeout(() => {
      document.querySelectorAll(SEL).forEach((el) => {
        if (el.getAttribute('data-rv') !== 'in') {
          const r = el.getBoundingClientRect();
          if (r.top < alto()) marcar(el);
        }
      });
    }, 6000);

    // Terminada la entrada, la transición se apaga para no retrasar los hover del propio elemento.
    const alTerminar = (e: TransitionEvent) => {
      const t = e.target as HTMLElement;
      // Sólo si ya apareció: al agregar `rv-on` el ocultamiento también dispara una transición.
      if (t.getAttribute?.('data-rv') === 'in' && t.hasAttribute('data-reveal') && e.propertyName === 'opacity') {
        t.setAttribute('data-rv', 'done');
      }
    };
    document.addEventListener('transitionend', alTerminar);

    return () => {
      io.disconnect();
      mo.disconnect();
      window.clearInterval(respaldo);
      window.clearTimeout(final);
      document.removeEventListener('transitionend', alTerminar);
    };
  }, [ruta]);

  return null;
}
