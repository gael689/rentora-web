import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { OPERACIONES, operacion } from '@/lib/sistema/operaciones';
import { pantalla } from '@/lib/sistema/pantallas';
import { OPERACIONES_PAG, TONOS } from '@/lib/paginas';
import { SITIO } from '@/lib/sitio';
import Momento, { hayMomento } from '@/components/sistema/Momento';
import Pantalla, { hayReplica } from '@/components/sistema/Pantalla';
import Portada from '../../_pagina/Portada';
import Cubre from '@/components/sistema/Cubre';
import Vista from '../Vista';
import Migas from '../../_pagina/Migas';
import Cierre from '../../_pagina/Cierre';
import Gancho from '../../_pagina/Gancho';
import { mayuscula } from '../../_pagina/modulo';
import s from '../operaciones.module.css';
import { alternos, titulo as tituloMeta, SUFIJO_TITLE } from '../../_pagina/meta';

/* Una operación, paso a paso.
 *
 * Cada página trabaja un long-tail operativo propio y lleva `HowTo`: es el formato que los
 * motores generativos reproducen casi literal cuando alguien pregunta "cómo se hace X". */

export function generateStaticParams() {
  return OPERACIONES.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const o = operacion(slug);
  if (!o) return {};

  const titulo = mayuscula(o.termino);
  return {
    title: tituloMeta(titulo),
    description: o.bajada.slice(0, 155),
    alternates: alternos(`/operaciones/${o.slug}`),
    openGraph: {
      title: `${titulo}${SUFIJO_TITLE}`,
      description: o.bajada.slice(0, 155),
      url: `${SITIO}/operaciones/${o.slug}`,
    },
  };
}

export default async function PaginaOperacion({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const o = operacion(slug);
  if (!o) notFound();

  const indice = OPERACIONES.findIndex((x) => x.slug === o.slug);
  const tono = TONOS[indice % TONOS.length];
  const laPantalla = o.pantalla ? pantalla(o.pantalla) : undefined;
  const otras = OPERACIONES.filter((x) => x.slug !== o.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'HowTo',
        '@id': `${SITIO}/operaciones/${o.slug}#howto`,
        name: mayuscula(o.termino),
        description: o.bajada,
        inLanguage: 'es-AR',
        totalTime: 'PT5M',
        step: o.pasos.map((p) => ({
          '@type': 'HowToStep',
          position: p.n,
          name: p.titulo,
          text: p.dato ? `${p.detalle} ${p.dato}` : p.detalle,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITIO },
          { '@type': 'ListItem', position: 2, name: 'Cómo se hace', item: `${SITIO}/operaciones` },
          {
            '@type': 'ListItem',
            position: 3,
            name: o.nombre,
            item: `${SITIO}/operaciones/${o.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Portada
        tono={tono}
        pantalla={
          <Cubre>
            <Vista o={o} />
          </Cubre>
        }
        titulo={o.pregunta}
        bajada={o.bajada}
        migas={
          <Migas
            items={[
              { href: '/', texto: 'Inicio' },
              { href: '/operaciones', texto: 'Cómo se hace' },
            ]}
            actual={o.nombre}
          />
        }
      />

      <article className={`envoltorio ${s.pagina}`} data-tono={tono}>
        {/* Primero se ve, después se lee. */}
        {hayMomento(o.momento) && o.momento && (
          <section className={s.bloque}>
            <h2 className={s.rotulo}>{OPERACIONES_PAG.pantallaTitulo}</h2>
            <Momento slug={o.momento} pie={o.nombre} />
          </section>
        )}

        <section className={s.bloque}>
          <h2 className={s.rotulo}>{OPERACIONES_PAG.pasoAPaso}</h2>
          <ul className={s.pasos}>
            {o.pasos.map((p) => (
              <li key={p.n} className={s.paso}>
                <span className={s.punto} aria-hidden="true" />
                <div className={s.pasoCuerpo}>
                  <h3 className={s.pasoTitulo}>{p.titulo}</h3>
                  <p className={s.pasoDetalle}>{p.detalle}</p>
                  {p.dato && <p className={s.pasoDato}>{p.dato}</p>}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className={s.bloque}>
          <div className={s.porque}>
            <h2 className={s.rotulo}>{OPERACIONES_PAG.porQue}</h2>
            <p className={s.porqueTexto}>{o.diferencial}</p>
          </div>
        </section>

        {laPantalla && hayReplica(laPantalla.slug) && !hayMomento(o.momento) && (
          <section className={s.bloque}>
            <h2 className={s.rotulo}>{OPERACIONES_PAG.dondeTitulo}</h2>
            <Pantalla slug={laPantalla.slug} />
          </section>
        )}

        <Gancho />

        <section className={s.bloque}>
          <h2 className={s.rotulo}>{OPERACIONES_PAG.otras}</h2>
          <nav className={s.otras} aria-label={OPERACIONES_PAG.otras}>
            {otras.map((x) => (
              <Link key={x.slug} href={`/operaciones/${x.slug}`} className={s.otra}>
                {x.nombre}
              </Link>
            ))}
          </nav>
        </section>
      </article>

      <Cierre titulo={OPERACIONES_PAG.cierreTitulo} bajada={OPERACIONES_PAG.cierreBajada} />
    </>
  );
}
