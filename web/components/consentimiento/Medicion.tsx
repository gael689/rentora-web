'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { medir, pageviewPixel } from '@/lib/medicion';

/* Los eventos del sitio, escuchados en un solo lugar.
 *
 * Un clic se escucha con delegación sobre el documento en vez de un `onClick` por botón: los
 * links a WhatsApp están en componentes de servidor (pie, hero, cierres, páginas de captación) y
 * así ninguno tiene que volverse cliente. Para saber **cuál** CTA fue, el link puede llevar
 * `data-cta="hero"`; si no lo lleva, se usa el `id` de la sección o "pie".
 *
 * - `click_whatsapp`: todo link a wa.me (y además cuenta como `click_saliente`).
 * - `click_ver_sistema`: los links con `data-evento="ver_sistema"` y, aunque no lo lleven, todo link
 *   interno a `/modulos` (el índice, no cada módulo) (los cierres, los mega-menús y las páginas de captación
 *   enlazan ahí sin marcar). El hero sigue marcado para tener su `data-cta`.
 * - `click_saliente`: cualquier link a otro dominio.
 * - `scroll_75`: una vez por visita a /planes y a cada /para/*.
 * - El envío del formulario se mide en `Formulario.tsx` y en `CierreForm.tsx` (`formulario_enviado`,
 *   con `origen`), que es donde se sabe si salió bien; el pedido de demo, en `FormularioDemo.tsx`.
 *
 * Nada de esto agrega cookies: Vercel Web Analytics no usa, y GA4 y Meta solo reciben el evento si
 * el visitante ya los aceptó (`medir` lo chequea). Lo declarado en `/privacidad` sigue siendo todo. */

/** El primer pageview del Pixel lo manda su `init`; este flag evita contarlo dos veces. */
let primera = true;

const RUTAS_SCROLL = (ruta: string) => ruta === '/planes' || ruta.startsWith('/para/');

function ubicacion(el: Element): string {
  const marcado = el.closest('[data-cta]')?.getAttribute('data-cta');
  if (marcado) return marcado;
  if (el.closest('footer')) return 'pie';
  const seccion = el.closest('section[id], [id^="t-"]');
  return seccion?.id || 'cuerpo';
}

export default function Medicion() {
  const ruta = usePathname();

  useEffect(() => {
    const alClic = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a');
      if (!a || !a.href) return;
      const datos = {
        ruta: location.pathname,
        ubicacion: ubicacion(a),
        cta: (a.textContent ?? '').replace(/\s+/g, ' ').replace('→', '').trim().slice(0, 60),
      };

      let destino: URL;
      try {
        destino = new URL(a.href, location.href);
      } catch {
        return;
      }
      const interno = destino.host === location.host;
      const aSistema = interno && (destino.pathname === '/modulos');
      if (a.getAttribute('data-evento') === 'ver_sistema' || aSistema) medir('click_ver_sistema', datos);

      if (interno || !destino.protocol.startsWith('http')) return;
      if (destino.host === 'wa.me' || destino.host.endsWith('whatsapp.com')) medir('click_whatsapp', datos);
      medir('click_saliente', { ...datos, destino: destino.host });
    };
    document.addEventListener('click', alClic, { capture: true });
    return () => document.removeEventListener('click', alClic, { capture: true });
  }, []);

  // El primer render ya lo contó el `init` del Pixel; los cambios de ruta, no.
  useEffect(() => {
    if (primera) {
      primera = false;
      return;
    }
    pageviewPixel();
  }, [ruta]);

  useEffect(() => {
    if (!RUTAS_SCROLL(ruta)) return;
    let listo = false;
    const alScroll = () => {
      if (listo) return;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      if (window.scrollY / total >= 0.75) {
        listo = true;
        medir('scroll_75', { ruta });
        window.removeEventListener('scroll', alScroll);
      }
    };
    window.addEventListener('scroll', alScroll, { passive: true });
    return () => window.removeEventListener('scroll', alScroll);
  }, [ruta]);

  return null;
}
