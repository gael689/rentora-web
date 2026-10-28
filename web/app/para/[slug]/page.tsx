import { notFound } from 'next/navigation';
import { PARA, PLAZAS, GUIAS, para } from '@/lib/seo';
import { MODULOS } from '@/lib/contenido';
import { OPERACIONES } from '@/lib/sistema/operaciones';
import { PARA_PAG } from '@/lib/paginas';
import { VISUAL_PARA } from '@/lib/para-visual';
import { SITIO } from '@/lib/sitio';
import Portada from '../../_pagina/Portada';
import Migas from '../../_pagina/Migas';
import Cierre from '../../_pagina/Cierre';
import Citable from '../../_pagina/Citable';
import Compacta, { type CeldaCompacta } from '../../_pagina/Compacta';
import FaqLista from '../../_pagina/FaqLista';
import { meta } from '../../_pagina/meta';
import { grafo, migasLd } from '../../_pagina/schema';
import { vistaModulo } from '../../_pagina/modulo';
import s from '../../seo.module.css';

/* Una página por tipo de operación, con el patrón de los rubros de ACA: el que busca "software
 * para rent a car de aeropuerto" no es el mismo que busca "sistema para alquiler de camionetas",
 * y cada uno tiene que encontrar su problema escrito en la primera pantalla. */

export const dynamicParams = false;

export function generateStaticParams() {
  return PARA.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = para(slug);
  return p ? meta(`/para/${p.slug}`, p.title, p.description) : {};
}

/* Un bloque de enlaces como celdas rectangulares de /modulos: la última fila se reparte el ancho. */
function enlaces(titulo: string, celdas: CeldaCompacta[]) {
  if (celdas.length === 0) return null;
  return (
    <section className={s.bloque}>
      <h2 className={s.rotulo}>{titulo}</h2>
      <Compacta etiqueta={titulo} cta={PARA_PAG.ver} columnas={3} completa plano celdas={celdas} />
    </section>
  );
}

export default async function PaginaPara({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = para(slug);
  if (!p) notFound();

  const ruta = `/para/${p.slug}`;
  const migas = [
    { href: '/', texto: 'Inicio' },
    { href: '/para', texto: PARA_PAG.nombre },
  ];
  const modulos = p.modulos
    .map((m) => MODULOS.find((x) => x.slug === m))
    .filter((m) => m !== undefined)
    .map(vistaModulo);
  const operacion = OPERACIONES.find((o) => o.slug === p.operacion);
  const guia = GUIAS.find((g) => g.slug === p.guia);
  const ciudades = PLAZAS.filter((c) => c.para === p.slug);
  const visual = VISUAL_PARA[p.slug];
  const otras = PARA.filter((x) => x.slug !== p.slug);

  const ld = grafo(
    {
      '@type': 'Service',
      '@id': `${SITIO}${ruta}#servicio`,
      name: p.title,
      description: p.description,
      serviceType: 'Software de gestión para alquiler de autos',
      provider: { '@id': `${SITIO}/#organizacion` },
      areaServed: { '@type': 'Country', name: 'Argentina' },
      inLanguage: 'es-AR',
    },
    migasLd([...migas, { href: ruta, texto: p.nombre }]),
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />

      <Portada
        titulo={p.h1}
        bajada={p.bajada}
        migas={<Migas items={migas} actual={p.nombre} />}
        imagen={visual && { src: visual.src, alt: visual.alt, pos: visual.pos }}
      />

      <article className={`envoltorio ${s.pagina}`}>
        <section className={s.bloque} data-tono="azul">
          <h2 className={s.rotulo}>{PARA_PAG.soluciones}</h2>
          <Compacta
            etiqueta={PARA_PAG.soluciones}
            columnas={3}
            completa
            plano
            celdas={p.soluciones.map((x) => ({ icono: 'tilde', tono: 'turq', titulo: x.titulo, texto: x.texto }))}
          />
        </section>

        <Citable texto={p.citable} aire />

        {modulos.length > 0 && (
          <section className={s.bloque}>
            <h2 className={s.rotulo}>{PARA_PAG.modulos}</h2>
            <Compacta
              etiqueta={PARA_PAG.modulos}
              cta={PARA_PAG.ver}
              columnas={3}
              completa
              plano
              celdas={modulos.map((v) => ({
                href: `/modulos/${v.m.slug}`,
                icono: v.icono,
                tono: v.tono,
                titulo: v.m.nombre,
                texto: v.gana,
              }))}
            />
          </section>
        )}

        <FaqLista titulo={PARA_PAG.preguntas} preguntas={p.preguntas} id={`${SITIO}${ruta}`} plano />

        {enlaces(PARA_PAG.guia, [
          ...(operacion
            ? [{ href: `/operaciones/${operacion.slug}`, titulo: operacion.nombre, texto: PARA_PAG.verComo }]
            : []),
          ...(guia ? [{ href: `/guias/${guia.slug}`, titulo: guia.nombre, texto: PARA_PAG.guia }] : []),
        ])}
        {enlaces(
          PARA_PAG.ciudades,
          ciudades.map((c) => ({ href: `/software-rent-a-car/${c.slug}`, titulo: c.ciudad })),
        )}
        {enlaces(
          PARA_PAG.otras,
          otras.map((x) => ({ href: `/para/${x.slug}`, titulo: x.nombre, texto: VISUAL_PARA[x.slug]?.frase })),
        )}
      </article>

      <Cierre
        titulo={PARA_PAG.cierreTitulo}
        bajada={PARA_PAG.cierreBajada}
        secundario={{ href: '/sistema', texto: PARA_PAG.verSistema }}
      />
    </>
  );
}
