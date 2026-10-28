import type { MetadataRoute } from 'next';
import { MODULOS } from '@/lib/contenido';
import { OPERACIONES } from '@/lib/sistema/operaciones';
import { PLAZAS, PARA, GUIAS, GLOSARIO, CONTRATO_PAG } from '@/lib/seo';
import { SITIO } from '@/lib/sitio';

/* Generado desde las mismas listas que el sitio: una página nueva entra sola.
 * /contacto queda afuera a propósito — va noindex, es conversión y no tiene término.
 *
 * **`lastModified` es una fecha fija, no `new Date()`.** Con la fecha del build, cada deploy
 * declara que todas las páginas cambiaron hoy, y Google deja de creerle al lastmod (patrón de
 * Palazzo). Se actualiza a mano cuando el contenido cambia de verdad. */
const ULTIMA_EDICION = new Date('2026-10-26');

type Entrada = MetadataRoute.Sitemap[number];
const url = (ruta: string, priority: number, changeFrequency: Entrada['changeFrequency'] = 'monthly'): Entrada => ({
  url: `${SITIO}${ruta}`,
  lastModified: ULTIMA_EDICION,
  changeFrequency,
  priority,
});

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    url('', 1),
    url('/operaciones', 0.9),
    url('/modulos', 0.8),
    url('/planes', 0.8),
    url('/web-a-medida', 0.8),
    ...OPERACIONES.map((o) => url(`/operaciones/${o.slug}`, 0.8)),
    url('/para', 0.8),
    ...PARA.map((p) => url(`/para/${p.slug}`, 0.8)),
    url('/software-rent-a-car', 0.7),
    ...PLAZAS.map((p) => url(`/software-rent-a-car/${p.slug}`, 0.7)),
    url('/soluciones', 0.7),
    ...GUIAS.map((g) => url(`/soluciones/${g.slug}`, 0.7)),
    url(`/${CONTRATO_PAG.slug}`, 0.7),
    url('/como-elegir', 0.8),
    url('/preguntas', 0.7),
    url('/glosario', 0.6, 'yearly'),
    ...GLOSARIO.map((t) => url(`/glosario/${t.slug}`, 0.5, 'yearly')),
    ...MODULOS.map((m) => url(`/modulos/${m.slug}`, 0.7)),
    url('/privacidad', 0.3, 'yearly'),
  ];
}
