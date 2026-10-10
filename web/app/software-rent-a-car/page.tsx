import Link from 'next/link';
import { PLAZAS } from '@/lib/seo';
import { CIUDADES_PAG, TONOS } from '@/lib/paginas';
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
      { href: '/software-rent-a-car', texto: CIUDADES_PAG.tag },
    ]),
  );
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
      <Portada tag={CIUDADES_PAG.tag} titulo={CIUDADES_PAG.titulo} bajada={CIUDADES_PAG.bajada} />
      <div className={`envoltorio ${s.pagina}`}>
        <div className={s.indiceFamilia}>
          {PLAZAS.map((p, i) => (
            <Link
              key={p.slug}
              href={`/software-rent-a-car/${p.slug}`}
              className="beneficio"
              data-tono={TONOS[i % TONOS.length]}
            >
              <span className="etiqueta">
                {p.ciudad} · {p.provincia}
              </span>
              <p className="gana">{p.temporada}</p>
              <span className="ver">
                {CIUDADES_PAG.ver} <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
      <Cierre titulo={CIUDADES_PAG.cierreTitulo} bajada={CIUDADES_PAG.cierreBajada} />
    </>
  );
}
