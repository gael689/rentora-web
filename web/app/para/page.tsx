import Link from 'next/link';
import { PARA } from '@/lib/seo';
import { PARA_PAG, TONOS } from '@/lib/paginas';
import { SITIO } from '@/lib/sitio';
import Portada from '../_pagina/Portada';
import Cierre from '../_pagina/Cierre';
import { meta } from '../_pagina/meta';
import { grafo, migasLd } from '../_pagina/schema';
import s from '../seo.module.css';

export const metadata = meta('/para', PARA_PAG.indiceTitle, PARA_PAG.indiceDescription);

export default function IndicePara() {
  const ld = grafo(
    {
      '@type': 'ItemList',
      '@id': `${SITIO}/para#lista`,
      itemListElement: PARA.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITIO}/para/${p.slug}`,
        name: p.nombre,
      })),
    },
    migasLd([
      { href: '/', texto: 'Inicio' },
      { href: '/para', texto: PARA_PAG.tag },
    ]),
  );
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
      <Portada tag={PARA_PAG.tag} titulo={PARA_PAG.indiceTitulo} bajada={PARA_PAG.indiceBajada} tono="azul" />
      <div className={`envoltorio ${s.pagina}`}>
        <div className={s.indiceFamilia}>
          {PARA.map((p, i) => (
            <Link key={p.slug} href={`/para/${p.slug}`} className="beneficio" data-tono={TONOS[i % TONOS.length]}>
              <span className="etiqueta">{p.nombre}</span>
              <p className="gana">{p.bajada}</p>
              <span className="ver">
                {PARA_PAG.ver} <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
      <Cierre titulo={PARA_PAG.indiceCierreTitulo} bajada={PARA_PAG.indiceCierreBajada} />
    </>
  );
}
