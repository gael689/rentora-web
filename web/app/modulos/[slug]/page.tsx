import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MODULOS } from '@/lib/contenido';
import { MODULOS_PAG } from '@/lib/paginas';
import { pantallasDelModulo } from '@/lib/sistema/pantallas';
import { OPERACIONES } from '@/lib/sistema/operaciones';
import Pantalla, { hayReplica } from '@/components/sistema/Pantalla';
import Icono from '@/components/sistema/Icono';
import { SITIO } from '@/lib/sitio';
import Portada from '../../_pagina/Portada';
import Migas from '../../_pagina/Migas';
import Cierre from '../../_pagina/Cierre';
import { vistaModulo, mayuscula } from '../../_pagina/modulo';
import s from './modulo.module.css';
import { alternos, titulo as tituloMeta, SUFIJO_TITLE } from '../../_pagina/meta';

/* Plantilla de las páginas de módulo.
 *
 * Regla anti-canibalización: la home trabaja el término cabeza ("software para rent a car");
 * cada módulo trabaja un long-tail funcional distinto y NUNCA repite el cabeza en su H1. */

export function generateStaticParams() {
  return MODULOS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = MODULOS.find((x) => x.slug === slug);
  if (!m) return {};

  const titulo = mayuscula(m.termino);
  const descripcion = vistaModulo(m).gana.slice(0, 155);
  return {
    title: tituloMeta(titulo),
    description: descripcion,
    alternates: alternos(`/modulos/${m.slug}`),
    openGraph: {
      title: `${titulo}${SUFIJO_TITLE}`,
      description: descripcion,
      url: `${SITIO}/modulos/${m.slug}`,
    },
  };
}

export default async function PaginaModulo({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = MODULOS.find((x) => x.slug === slug);
  if (!m) notFound();

  const v = vistaModulo(m);
  const i = MODULOS.findIndex((x) => x.slug === m.slug);
  const siguiente = vistaModulo(MODULOS[(i + 1) % MODULOS.length]);
  const pantallas = pantallasDelModulo(m.slug);
  const operaciones = OPERACIONES.filter((o) => pantallas.some((p) => p.slug === o.pantalla));

  const migas = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITIO },
      { '@type': 'ListItem', position: 2, name: 'Módulos', item: `${SITIO}/modulos` },
      { '@type': 'ListItem', position: 3, name: m.nombre, item: `${SITIO}/modulos/${m.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(migas) }} />

      <Portada
        tono={v.tono}
        titulo={mayuscula(m.termino)}
        bajada={v.gana}
        migas={
          <Migas
            items={[
              { href: '/', texto: 'Inicio' },
              { href: '/modulos', texto: 'Módulos' },
            ]}
            actual={m.nombre}
          />
        }
      >
        <p className={s.dolor}>{v.dolor}</p>
      </Portada>

      <article className={`envoltorio ${s.pagina}`} data-tono={v.tono}>
        {pantallas.length > 0 && (
          <section className={s.bloque}>
            <h2 className={s.rotulo}>
              {pantallas.length === 1 ? MODULOS_PAG.pantalla : MODULOS_PAG.pantallas}
            </h2>
            {pantallas.map((p) =>
              hayReplica(p.slug) ? (
                <div key={p.slug} className={s.replica}>
                  <Pantalla slug={p.slug} />
                </div>
              ) : (
                <p key={p.slug} className={s.pendiente}>
                  <b>{p.titulo}</b> <span className={s.ruta}>{p.ruta}</span>
                </p>
              ),
            )}
          </section>
        )}

        <section className={s.bloque}>
          <h2 className={s.rotulo}>{MODULOS_PAG.incluye}</h2>
          <ul className={s.chips}>
            {m.chips.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>

        {v.nuevo.length > 0 && (
          <section className={s.bloque}>
            <h2 className={s.rotulo}>{MODULOS_PAG.nuevo}</h2>
            <ul className={s.nuevo}>
              {v.nuevo.map((n) => (
                <li key={n.titulo}>
                  <span className={s.novedad}>Novedad</span>
                  <span>
                    <b>{n.titulo}.</b> {n.linea}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {operaciones.length > 0 && (
          <section className={s.bloque}>
            <h2 className={s.rotulo}>{MODULOS_PAG.comoSeHace}</h2>
            <div className={s.links}>
              {operaciones.map((o) => (
                <Link key={o.slug} href={`/operaciones/${o.slug}`} className={s.link}>
                  <span>{o.nombre}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className={s.bloque}>
          <h2 className={s.rotulo}>{MODULOS_PAG.siguiente}</h2>
          <Link
            href={`/modulos/${siguiente.m.slug}`}
            className={`beneficio ${s.siguiente}`}
            data-tono={siguiente.tono}
          >
            <span className="orbe">
              <Icono nombre={siguiente.icono} tam={24} />
            </span>
            <span className={s.siguienteTexto}>
              <span className="etiqueta">{siguiente.m.nombre}</span>
              <span className="gana">{siguiente.gana}</span>
            </span>
            <span className="ver">
              {MODULOS_PAG.verComo} <span aria-hidden="true">→</span>
            </span>
          </Link>
          <p className={s.todos}>
            <Link href="/modulos" className="cta-sec">
              {MODULOS_PAG.todos} <span aria-hidden="true">→</span>
            </Link>
          </p>
        </section>
      </article>

      <Cierre titulo={MODULOS_PAG.cierreTitulo} bajada={MODULOS_PAG.cierreBajada} />
    </>
  );
}
