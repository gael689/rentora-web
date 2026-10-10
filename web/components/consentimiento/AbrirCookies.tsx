'use client';

import { COOKIES } from '@/lib/privacidad';
import { EVENTO_ABRIR, HAY_TERCEROS } from '@/lib/medicion';

/* "Cookies", en el pie. Es un link a la política de verdad: sin JavaScript, o sin herramientas
 * de terceros configuradas, lleva a /privacidad#cookies. Con JS, vuelve a abrir el aviso. */
export default function AbrirCookies({ className }: { className?: string }) {
  return (
    <a
      href="/privacidad#cookies"
      className={className}
      onClick={(e) => {
        if (!HAY_TERCEROS) return;
        e.preventDefault();
        window.dispatchEvent(new Event(EVENTO_ABRIR));
      }}
    >
      {COOKIES.enlacePie}
    </a>
  );
}
