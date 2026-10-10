import Link from 'next/link';
import { GUIAS } from '@/lib/seo';
import { GUIAS_PAG, TONOS } from '@/lib/paginas';
import { SITIO } from '@/lib/sitio';
import Portada from '../_pagina/Portada';
import Cierre from '../_pagina/Cierre';
import { meta } from '../_pagina/meta';
import { grafo, migasLd } from '../_pagina/schema';
import s from '../seo.module.css';

export const metadata = meta('/guias', GUIAS_PAG.indiceTitle, GUIAS_PAG.indiceDescription);

export default function IndiceGuias() {
  const ld = grafo(
    {
      '@type': 'ItemList',
      '@id': `${SITIO}/guias#lista`,
      itemListElement: GUIAS.map((g, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITIO}/guias/${g.slug}`,
        name: g.nombre,
      })),
    },
    migasLd([
      { href: '/', texto: 'Inicio' },
      { href: '/guias', texto: GUIAS_PAG.tag },
    ]),
  );
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
      <Portada tag={GUIAS_PAG.tag} titulo={GUIAS_PAG.indiceTitulo} bajada={GUIAS_PAG.indiceBajada} tono="menta" />
      <div className={`envoltorio ${s.pagina}`}>
        <div className={s.indiceFamilia}>
          {GUIAS.map((g, i) => (
            <Link key={g.slug} href={`/guias/${g.slug}`} className="beneficio" data-tono={TONOS[i % TONOS.length]}>
              <span className="etiqueta">{g.nombre}</span>
              <p className="gana">{g.bajada}</p>
              <span className="ver">
                {GUIAS_PAG.leer} <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
      <Cierre titulo={GUIAS_PAG.cierreTitulo} bajada={GUIAS_PAG.cierreBajada} />
    </>
  );
}
