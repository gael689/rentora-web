import Link from 'next/link';
import { PLAZAS } from '@/lib/seo';
import { CIUDADES_PAG } from '@/lib/paginas';
import { SITIO } from '@/lib/sitio';
import Portada from '../_pagina/Portada';
import Cierre from '../_pagina/Cierre';
import { meta } from '../_pagina/meta';
import { grafo, migasLd } from '../_pagina/schema';
import s from '../seo.module.css';

/* El índice de las plazas. Antes no existía y las páginas de ciudad solo se alcanzaban desde el
 * sitemap: para Google, una página que nadie enlaza es una página que no importa. */

export const metadata = meta('/software-rent-a-car', CIUDADES_PAG.title, CIUDADES_PAG.description);

export default function IndiceCiudades() {
  const ld = grafo(
    {
      '@type': 'ItemList',
      '@id': `${SITIO}/software-rent-a-car#lista`,
      itemListElement: PLAZAS.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITIO}/software-rent-a-car/${p.slug}`,
        name: p.ciudad,
      })),
    },
    migasLd([
      { href: '/', texto: 'Inicio' },
      { href: '/software-rent-a-car', texto: CIUDADES_PAG.nombre },
    ]),
  );
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
      <Portada titulo={CIUDADES_PAG.titulo} bajada={CIUDADES_PAG.bajada} />
      <div className={`envoltorio ${s.pagina}`}>
        <ul className={s.mapa}>
          {PLAZAS.map((p) => (
            <li key={p.slug}>
              <Link href={`/software-rent-a-car/${p.slug}`} className={s.mapaLink}>
                <b>{p.ciudad}</b>
                <span>{p.provincia}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Cierre titulo={CIUDADES_PAG.cierreTitulo} bajada={CIUDADES_PAG.cierreBajada} />
    </>
  );
}
