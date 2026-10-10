/* Medición y consentimiento: el estado, la cookie y los eventos. Sin copy (eso va en
 * `privacidad.ts`) y sin JSX (eso va en `components/consentimiento/`).
 *
 * Tres capas, cada una con su permiso:
 *
 * 1. **Vercel Web Analytics**: sin cookies y sin identificar a nadie. Siempre prendida. Recibe
 *    también los eventos propios (`track`).
 * 2. **GA4**, con Consent Mode v2. Todo arranca en `denied` y `gtag.js` **ni se descarga** hasta
 *    que el visitante acepta la analítica. Sin `NEXT_PUBLIC_GA_ID`, no existe.
 * 3. **Meta Pixel**, solo con marketing aceptado. Sin `NEXT_PUBLIC_META_PIXEL_ID`, no existe.
 *
 * Ley 25.326: el consentimiento es previo, informado y revocable. Por eso nada de terceros se
 * carga antes del clic, y "Cookies" en el pie vuelve a abrir el aviso. */

import { track } from '@vercel/analytics';

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';
export const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '';

/** Si no hay ninguna herramienta que pida permiso, el aviso no tiene nada que preguntar. */
export const HAY_TERCEROS = Boolean(GA_ID || PIXEL_ID);

export const COOKIE_CONSENTIMIENTO = 'rentora_consentimiento';
/** 6 meses, en segundos. La elección y las cookies de GA4 duran lo mismo. */
export const SEIS_MESES = 60 * 60 * 24 * 182;

/** Evento del DOM que abre el aviso desde cualquier lado (el link "Cookies" del pie). */
export const EVENTO_ABRIR = 'rentora:cookies';

export type Eleccion = { analitica: boolean; marketing: boolean };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };
    _fbq?: unknown;
  }
}

/* ── La cookie ─────────────────────────────────────────────────────────────── */

/** `v1.a1.m0`: versión, analítica, marketing. Corta y sin datos personales. */
export function leerEleccion(): Eleccion | null {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_CONSENTIMIENTO}=v1\\.a([01])\\.m([01])`));
  return m ? { analitica: m[1] === '1', marketing: m[2] === '1' } : null;
}

export function guardarEleccion(e: Eleccion) {
  const seguro = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${COOKIE_CONSENTIMIENTO}=v1.a${e.analitica ? 1 : 0}.m${e.marketing ? 1 : 0}; Max-Age=${SEIS_MESES}; Path=/; SameSite=Lax${seguro}`;
}

/** Borra una cookie de tercero en el host y en el dominio padre (`.rentora.com.ar`), que es
 *  donde la dejan GA y Meta. */
function borrarCookies(prueba: (nombre: string) => boolean) {
  const nombres = document.cookie
    .split('; ')
    .map((c) => c.split('=')[0])
    .filter(prueba);
  const partes = location.hostname.split('.');
  const dominios = [''];
  for (let i = 0; i < partes.length - 1; i++) dominios.push(`; Domain=.${partes.slice(i).join('.')}`);
  for (const n of nombres)
    for (const d of dominios) document.cookie = `${n}=; Max-Age=0; Path=/${d}`;
}

/* ── Las herramientas ──────────────────────────────────────────────────────── */

let estado: Eleccion = { analitica: false, marketing: false };
let gaCargado = false;
let pixelCargado = false;

function cargarScript(src: string) {
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

/** Consent Mode v2 por defecto: todo denegado. Se declara antes de cualquier `config`. */
function gtagBase() {
  if (window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  // gtag necesita el objeto `arguments`, no un array: así lo lee gtag.js.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted',
    wait_for_update: 500,
  });
  window.gtag('set', 'ads_data_redaction', true);
}

function cargarPixel() {
  if (pixelCargado || !PIXEL_ID) return;
  pixelCargado = true;
  // El stub oficial de Meta, sin el IIFE minificado: encola hasta que llega fbevents.js.
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) (fbq.callMethod as (...a: unknown[]) => void)(...args);
    else fbq.queue.push(args);
  } as ((...args: unknown[]) => void) & { callMethod?: unknown; queue: unknown[]; loaded: boolean; version: string; push: unknown };
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.push = fbq;
  window.fbq = fbq;
  window._fbq = fbq;
  cargarScript('https://connect.facebook.net/en_US/fbevents.js');
  fbq('consent', 'grant');
  fbq('init', PIXEL_ID);
  fbq('track', 'PageView');
}

/** Aplica una elección: carga lo que se aceptó y apaga lo que se retiró. Idempotente. */
export function aplicarEleccion(e: Eleccion) {
  const antes = estado;
  estado = e;

  if (GA_ID) {
    gtagBase();
    window.gtag!('consent', 'update', {
      analytics_storage: e.analitica ? 'granted' : 'denied',
      ad_storage: e.marketing ? 'granted' : 'denied',
      ad_user_data: e.marketing ? 'granted' : 'denied',
      ad_personalization: e.marketing ? 'granted' : 'denied',
    });
    if (e.analitica && !gaCargado) {
      gaCargado = true;
      cargarScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`);
      window.gtag!('js', new Date());
      window.gtag!('config', GA_ID, { cookie_expires: SEIS_MESES });
    }
    if (antes.analitica && !e.analitica) borrarCookies((n) => n === '_ga' || n.startsWith('_ga_') || n === '_gid');
  }

  if (PIXEL_ID) {
    if (e.marketing) {
      if (pixelCargado) window.fbq?.('consent', 'grant');
      else cargarPixel();
    } else if (pixelCargado) {
      window.fbq?.('consent', 'revoke');
    }
    if (antes.marketing && !e.marketing) borrarCookies((n) => n === '_fbp' || n === '_fbc');
  }
}

/** El Pixel no ve los cambios de ruta del App Router: hay que avisarle. GA4 sí los ve solo
 *  (medición mejorada, "cambios de página según el historial"). */
export function pageviewPixel() {
  if (pixelCargado && estado.marketing) window.fbq?.('track', 'PageView');
}

/* ── Los eventos ───────────────────────────────────────────────────────────── */

export type Evento =
  | 'click_whatsapp'
  | 'click_ver_sistema'
  | 'click_saliente'
  | 'formulario_enviado'
  | 'formulario_error'
  | 'demo_solicitada'
  | 'scroll_75';

/** Los que cuentan como conversión para Meta, con su evento estándar. */
const ESTANDAR_META: Partial<Record<Evento, string>> = {
  click_whatsapp: 'Contact',
  formulario_enviado: 'Lead',
  demo_solicitada: 'Lead',
};

type Valor = string | number | boolean | null;

/** Manda un evento a las tres capas, cada una según su permiso. Nunca tira: una métrica que
 *  falla no puede romper un clic. */
export function medir(evento: Evento, datos: Record<string, Valor> = {}) {
  try {
    track(evento, datos);
  } catch {}
  try {
    if (gaCargado && estado.analitica) window.gtag?.('event', evento, datos);
  } catch {}
  try {
    const meta = ESTANDAR_META[evento];
    if (meta && pixelCargado && estado.marketing) window.fbq?.('track', meta, datos);
  } catch {}
}
