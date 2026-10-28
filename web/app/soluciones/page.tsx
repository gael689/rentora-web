import { GUIAS } from '@/lib/seo';
import { GUIAS_PAG, TONOS } from '@/lib/paginas';
import { SITIO } from '@/lib/sitio';
import Portada from '../_pagina/Portada';
import Cierre from '../_pagina/Cierre';
import Compacta from '../_pagina/Compacta';
import { meta } from '../_pagina/meta';
import { grafo, migasLd } from '../_pagina/schema';
import s from '../seo.module.css';

/* Un ícono por problema (las guías no lo traen en sus datos). */
const ICONOS: Record<string, string> = {
  'como-armar-tarifas-de-temporada': 'calendario',
  'franquicia-y-garantia': 'escudo',
  'cobrar-la-sena-online': 'billetera',
  'pasar-del-excel-a-un-sistema': 'planilla',
  'vencimientos-de-la-flota': 'campana',
};

export const metadata = meta('/soluciones', GUIAS_PAG.indiceTitle, GUIAS_PAG.indiceDescription);

export default function IndiceGuias() {
  const ld = grafo(
    {
      '@type': 'ItemList',
      '@id': `${SITIO}/soluciones#lista`,
      itemListElement: GUIAS.map((g, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITIO}/soluciones/${g.slug}`,
        name: g.nombre,
      })),
    },
    migasLd([
      { href: '/', texto: 'Inicio' },
      { href: '/soluciones', texto: GUIAS_PAG.tag },
    ]),
  );
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
      <Portada titulo={GUIAS_PAG.indiceTitulo} bajada={GUIAS_PAG.indiceBajada} tono="menta" imagen={{ src: '/heros/guias.webp', alt: 'Mostrador de una rentadora con contratos, llaves y un mapa', pos: '45% 60%', lado: 'derecha', tinte: true }} />
      <div className={`envoltorio ${s.pagina}`}>
        <Compacta
          etiqueta={GUIAS_PAG.tag}
          cta={GUIAS_PAG.leer}
          fila
          celdas={GUIAS.map((g, i) => ({
            href: `/soluciones/${g.slug}`,
            icono: ICONOS[g.slug] ?? 'lista',
            tono: TONOS[i % TONOS.length],
            titulo: g.tarjeta,
            texto: g.bajada ?? '',
          }))}
        />
      </div>
      <Cierre titulo={GUIAS_PAG.cierreTitulo} bajada={GUIAS_PAG.cierreBajada} />
    </>
  );
}
