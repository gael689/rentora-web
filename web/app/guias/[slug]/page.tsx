import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GUIAS, GLOSARIO, guia } from '@/lib/seo';
import { MODULOS } from '@/lib/contenido';
import { GUIAS_PAG } from '@/lib/paginas';
import { SITIO, AUTOR } from '@/lib/sitio';
import Portada from '../../_pagina/Portada';
import Migas from '../../_pagina/Migas';
import Cierre from '../../_pagina/Cierre';
import Citable from '../../_pagina/Citable';
import Prosa from '../../_pagina/Prosa';
import FaqLista from '../../_pagina/FaqLista';
import Enlaces from '../../_pagina/Enlaces';
import { meta } from '../../_pagina/meta';
import { grafo, migasLd } from '../../_pagina/schema';
import s from '../../seo.module.css';

/* Las guías contestan la búsqueda de "cómo se hace" del que todavía no está buscando un sistema.
 * Sirven aunque no compres nada, y por eso el producto va al final, rotulado aparte. */

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIAS.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guia(slug);
  return g ? meta(`/guias/${g.slug}`, g.title, g.description) : {};
}

export default async function PaginaGuia({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guia(slug);
  if (!g) notFound();

  const ruta = `/guias/${g.slug}`;
  const migas = [
    { href: '/', texto: 'Inicio' },
    { href: '/guias', texto: GUIAS_PAG.tag },
  ];
  const modulo = MODULOS.find((m) => m.slug === g.modulo);
  const terminos = g.terminos.map((t) => GLOSARIO.find((x) => x.slug === t)).filter((t) => t !== undefined);
  const otras = GUIAS.filter((x) => x.slug !== g.slug);

  const ld = grafo(
    {
      '@type': 'Article',
      '@id': `${SITIO}${ruta}#guia`,
      headline: g.title,
      description: g.description,
      inLanguage: 'es-AR',
      author: { '@type': 'Person', name: AUTOR },
      publisher: { '@id': `${SITIO}/#organizacion` },
      mainEntityOfPage: `${SITIO}${ruta}`,
    },
    migasLd([...migas, { href: ruta, texto: g.nombre }]),
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />

      <Portada
        tag={`${GUIAS_PAG.tag} · ${g.nombre}`}
        titulo={g.h1}
        bajada={g.bajada}
        tono="menta"
        migas={<Migas items={migas} actual={g.nombre} />}
      />

      <article className={`envoltorio ${s.pagina}`}>
        <Citable texto={g.citable} tono="menta" />

        <Prosa secciones={g.secciones} />

        <section className={s.bloque} data-tono="menta">
          <h2 className={s.rotulo}>{GUIAS_PAG.pasos}</h2>
          <ul className={s.pasos}>
            {g.pasos.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>

        <section className={s.bloque} data-tono="turq">
          <p className={s.enRentora}>
            <b>{GUIAS_PAG.enRentora}:</b> {g.enRentora}
          </p>
          {modulo && (
            <p>
              <Link href={`/modulos/${modulo.slug}`} className={s.ver}>
                {GUIAS_PAG.modulo}: {modulo.nombre} <span aria-hidden="true">→</span>
              </Link>
            </p>
          )}
        </section>

        <FaqLista titulo={GUIAS_PAG.preguntas} preguntas={g.preguntas} id={`${SITIO}${ruta}`} />

        <Enlaces
          titulo={GUIAS_PAG.terminos}
          tono="petro"
          items={terminos.map((t) => ({ href: `/glosario/${t.slug}`, texto: t.palabra }))}
        />
        <Enlaces titulo={GUIAS_PAG.otras} items={otras.map((x) => ({ href: `/guias/${x.slug}`, texto: x.nombre }))} />
      </article>

      <Cierre titulo={GUIAS_PAG.cierreTitulo} bajada={GUIAS_PAG.cierreBajada} />
    </>
  );
}
