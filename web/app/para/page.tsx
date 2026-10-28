import { PARA } from '@/lib/seo';
import { PARA_PAG } from '@/lib/paginas';
import { SITIO } from '@/lib/sitio';
import CarruselPara from '@/components/para/CarruselPara';
import Portada from '../_pagina/Portada';
import Cierre from '../_pagina/Cierre';
import { meta } from '../_pagina/meta';
import { grafo, migasLd } from '../_pagina/schema';

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
      { href: '/para', texto: PARA_PAG.nombre },
    ]),
  );
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
      <Portada titulo={PARA_PAG.indiceTitulo} bajada={PARA_PAG.indiceBajada} tono="azul" imagen={{ src: '/heros/para.webp', alt: 'Autos estacionados frente a la oficina de una rentadora', pos: '60% 45%', tinte: true }} />
      <CarruselPara prioridad etiqueta={PARA_PAG.nombre} />
      <Cierre titulo={PARA_PAG.indiceCierreTitulo} bajada={PARA_PAG.indiceCierreBajada} />
    </>
  );
}
