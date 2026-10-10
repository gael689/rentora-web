import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PARA, PLAZAS, GUIAS, para } from '@/lib/seo';
import { MODULOS } from '@/lib/contenido';
import { OPERACIONES } from '@/lib/sistema/operaciones';
import { PARA_PAG } from '@/lib/paginas';
import { SITIO } from '@/lib/sitio';
import Portada from '../../_pagina/Portada';
import Migas from '../../_pagina/Migas';
import Cierre from '../../_pagina/Cierre';
import Citable from '../../_pagina/Citable';
import Prosa from '../../_pagina/Prosa';
import FaqLista from '../../_pagina/FaqLista';
import Enlaces from '../../_pagina/Enlaces';
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

export default async function PaginaPara({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = para(slug);
  if (!p) notFound();

  const ruta = `/para/${p.slug}`;
  const migas = [
    { href: '/', texto: 'Inicio' },
    { href: '/para', texto: PARA_PAG.tag },
  ];
  const modulos = p.modulos
    .map((m) => MODULOS.find((x) => x.slug === m))
    .filter((m) => m !== undefined)
    .map(vistaModulo);
  const operacion = OPERACIONES.find((o) => o.slug === p.operacion);
  const guia = GUIAS.find((g) => g.slug === p.guia);
  const ciudades = PLAZAS.filter((c) => c.para === p.slug);
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
        tag={`${PARA_PAG.tag} · ${p.nombre}`}
        titulo={p.h1}
        bajada={p.bajada}
        migas={<Migas items={migas} actual={p.nombre} />}
      />

      <article className={`envoltorio ${s.pagina}`}>
        <Citable texto={p.citable} />

        <section className={s.bloque} data-tono="azul">
          <h2 className={s.rotulo}>{PARA_PAG.necesidades}</h2>
          <ol className={s.necesidades}>
            {p.necesidades.map((n) => (
              <li key={n.titulo} className={s.necesidad}>
                <h3>{n.titulo}</h3>
                <p>{n.texto}</p>
              </li>
            ))}
          </ol>
        </section>

        <Prosa secciones={p.secciones} />

        {modulos.length > 0 && (
          <section className={s.bloque}>
            <h2 className={s.rotulo}>{PARA_PAG.modulos}</h2>
            <div className={s.indiceFamilia}>
              {modulos.map((v) => (
                <Link key={v.m.slug} href={`/modulos/${v.m.slug}`} className="beneficio" data-tono={v.tono}>
                  <span className="etiqueta">{v.m.nombre}</span>
                  <p className="dolor">{v.dolor}</p>
                  <p className="gana">{v.gana}</p>
                  <span className="ver">
                    {PARA_PAG.ver} <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <FaqLista titulo={PARA_PAG.preguntas} preguntas={p.preguntas} id={`${SITIO}${ruta}`} />

        <Enlaces
          titulo={PARA_PAG.guia}
          tono="menta"
          items={[
            ...(operacion
              ? [{ href: `/operaciones/${operacion.slug}`, texto: `${PARA_PAG.verComo}: ${operacion.nombre}` }]
              : []),
            ...(guia ? [{ href: `/guias/${guia.slug}`, texto: guia.nombre }] : []),
          ]}
        />
        <Enlaces
          titulo={PARA_PAG.ciudades}
          tono="petro"
          items={ciudades.map((c) => ({ href: `/software-rent-a-car/${c.slug}`, texto: c.ciudad }))}
        />
        <Enlaces titulo={PARA_PAG.otras} items={otras.map((x) => ({ href: `/para/${x.slug}`, texto: x.nombre }))} />
      </article>

      <Cierre titulo={PARA_PAG.cierreTitulo} bajada={PARA_PAG.cierreBajada} />
    </>
  );
}
