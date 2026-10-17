'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';
import { TURNSTILE_SITE_KEY } from '@/lib/demo';

/* El widget de Turnstile de los formularios de contacto (el de `/probar` tiene el suyo).
 *
 * Es el mismo widget y la misma site key que la demo: el token viaja con el formulario a
 * `/api/contacto`, y de ahí, del lado del servidor, a la API de la plataforma, que es la que lo
 * verifica antes de crear el prospecto. **El mail de aviso no lo necesita**: si el widget no carga
 * o el visitante envía antes de que resuelva, el formulario sale igual (sin prospecto, con una
 * línea en el log del servidor).
 *
 * Sin `NEXT_PUBLIC_TURNSTILE_SITE_KEY` no se renderiza nada. Quien lo usa lo monta recién cuando el
 * visitante empieza a completar el formulario, para no cargar el script de Cloudflare en cada
 * visita a la home. */

const SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

type Api = {
  render: (el: HTMLElement, opciones: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id?: string) => void;
};

const api = () => (window as unknown as { turnstile?: Api }).turnstile;

export default function Verificacion({
  alResolver,
  reinicio,
  className,
}: {
  /** Recibe el token, o '' cuando vence o falla. */
  alResolver: (token: string) => void;
  /** Cambiarlo pide un token nuevo (cada token sirve una sola vez). */
  reinicio: number;
  className?: string;
}) {
  const caja = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const aviso = useRef(alResolver);

  useEffect(() => {
    aviso.current = alResolver;
  }, [alResolver]);

  function montar() {
    const ts = api();
    if (!TURNSTILE_SITE_KEY || !ts || !caja.current || widget.current) return;
    widget.current = ts.render(caja.current, {
      sitekey: TURNSTILE_SITE_KEY,
      language: 'es',
      size: 'flexible',
      callback: (t: string) => aviso.current(t),
      'expired-callback': () => aviso.current(''),
      'error-callback': () => aviso.current(''),
    });
  }

  useEffect(() => {
    if (reinicio > 0 && widget.current) api()?.reset(widget.current);
  }, [reinicio]);

  // Al desmontar, el widget se va con el formulario (si no, queda un iframe huérfano).
  useEffect(
    () => () => {
      if (widget.current) api()?.remove(widget.current);
      widget.current = null;
    },
    [],
  );

  if (!TURNSTILE_SITE_KEY) return null;
  return (
    <>
      <Script src={SCRIPT} strategy="afterInteractive" onReady={montar} />
      <div ref={caja} className={className} />
    </>
  );
}
