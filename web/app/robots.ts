import type { MetadataRoute } from 'next';
import { INDEXAR, SITIO } from '@/lib/sitio';

/* Mientras el sitio vive en un dominio provisorio (rentago.vercel.app), no se indexa: si Google
 * lo indexara, las canónicas apuntarían a un dominio que todavía no existe y la señal quedaría
 * cruzada cuando llegue el definitivo. Se prende con NEXT_PUBLIC_INDEXAR=1 el día del dominio. */
export default function robots(): MetadataRoute.Robots {
  if (!INDEXAR) return { rules: { userAgent: '*', disallow: '/' } };
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
    sitemap: `${SITIO}/sitemap.xml`,
    host: SITIO,
  };
}
