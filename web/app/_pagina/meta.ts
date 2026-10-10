import type { Metadata } from 'next';
import { SITIO } from '@/lib/sitio';

/* Metadata compartida.
 *
 * **El sufijo del title es corto.** Antes el layout agregaba " · RENTORA · Software para rent a
 * car" (37 caracteres) y las páginas internas quedaban entre 72 y 97: Google corta en ~60 y la
 * palabra clave quedaba bien, pero la marca y el final se perdían. Ahora es " · Rentora" (10), y
 * si aun así el total pasa de `TITLE_MAX`, la página va sin sufijo (`absolute`): la keyword es lo
 * que tiene que entrar entero. `verificar-seo.mjs` mide el total publicado. */
export const SUFIJO_TITLE = ' · Rentora';
export const TITLE_MAX = 65;

/** El title de una página: con sufijo si entra, sin sufijo si no. */
export function titulo(t: string): NonNullable<Metadata['title']> {
  return t.length + SUFIJO_TITLE.length <= TITLE_MAX ? t : { absolute: t };
}

/** Canónica a sí misma más `hreflang` es-AR y x-default, las dos a la misma URL. El sitio tiene un
 *  solo idioma: el hreflang no elige entre versiones, declara para quién es (Argentina) y le
 *  saca a Google la duda frente a sitios de España o México con el mismo término. */
export function alternos(ruta: string): NonNullable<Metadata['alternates']> {
  return { canonical: ruta, languages: { 'es-AR': ruta, 'x-default': ruta } };
}

/** Metadata de una página de captación: title, description, canónica y Open Graph alineados. */
export function meta(ruta: string, title: string, description: string): Metadata {
  return {
    title: titulo(title),
    description,
    alternates: alternos(ruta),
    openGraph: { title: `${title}${SUFIJO_TITLE}`, description, url: `${SITIO}${ruta}`, locale: 'es_AR' },
  };
}
