import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PLAZAS, PARA, plaza } from '@/lib/seo';
import { MODULOS } from '@/lib/contenido';
import { PLAZA_PAG, CIUDADES_PAG } from '@/lib/paginas';
import { SITIO } from '@/lib/sitio';
import Portada from '../../_pagina/Portada';
import Migas from '../../_pagina/Migas';
import Cierre from '../../_pagina/Cierre';
import FaqLista from '../../_pagina/FaqLista';
import Enlaces from '../../_pagina/Enlaces';
import Prosa from '../../_pagina/Prosa';
import { meta } from '../../_pagina/meta';
import { grafo, migasLd } from '../../_pagina/schema';
import { vistaModulo } from '../../_pagina/modulo';
import s from '../../seo.module.css';

/* Las páginas de plaza.
 *
 * **Pocas y con sustancia, a propósito.** Cada página con contenido real de su mercado rankea;
 * veinte plantillas con la ciudad reemplazada son doorway pages y Google las castiga. Cada una
 * dice algo que sólo es cierto de esa plaza. */

export const dynamicParams = false;

export function generateStaticParams() {
  return PLAZAS.map((p) => ({ ciudad: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ ciudad: string }> }) {
  const { ciudad } = await params;
  const p = plaza(ciudad);
  return p ? meta(`/software-rent-a-car/${p.slug}`, `Software para rent a car en ${p.ciudad}`, p.description) : {};
}

export default async function PaginaPlaza({ params }: { params: Promise<{ ciudad: string }> }) {
  const { ciudad } = await params;
  const p = plaza(ciudad);
  if (!p) notFound();

  const ruta = `/software-rent-a-car/${p.slug}`;
  const migas = [
    { href: '/', texto: 'Inicio' },
    { href: '/software-rent-a-car', texto: CIUDADES_PAG.nombre },
  ];
  const modulo = MODULOS.find((m) => m.slug === p.modulo);
  const vista = modulo ? vistaModulo(modulo) : undefined;
  const tipo = PARA.find((x) => x.slug === p.para);
  const otras = PLAZAS.filter((x) => x.slug !== p.slug);

  const ld = grafo(
    {
      '@type': 'Service',
      '@id': `${SITIO}${ruta}#servicio`,
      name: `Software para rent a car en ${p.ciudad}`,
      description: p.description,
      serviceType: 'Software de gestión para alquiler de autos',
      provider: { '@id': `${SITIO}/#organizacion` },
      areaServed: {
        '@type': 'City',
        name: p.ciudad,
        containedInPlace: { '@type': 'AdministrativeArea', name: p.provincia },
      },
      inLanguage: 'es-AR',
    },
    migasLd([...migas, { href: ruta, texto: p.ciudad }]),
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />

      <Portada
        titulo={`Software para rent a car en *${p.ciudad}*`}
        bajada={p.citable}
        migas={<Migas items={migas} actual={p.ciudad} />}
      />

      <article className={`envoltorio ${s.pagina}`}>
        <div className={s.datos}>
          <div className={s.dato} data-tono="turq">
            <p className={s.datoRotulo}>{PLAZA_PAG.cuando}</p>
            <p className={s.datoTexto}>{p.temporada}</p>
          </div>
          <div className={s.dato} data-tono="azul">
            <p className={s.datoRotulo}>{PLAZA_PAG.flota}</p>
            <p className={s.datoTexto}>{p.flota}</p>
          </div>
          <div className={s.dato} data-tono="menta">
            <p className={s.datoRotulo}>{PLAZA_PAG.demanda}</p>
            <p className={s.datoTexto}>{p.aeropuerto}</p>
          </div>
        </div>

        <Prosa secciones={[{ titulo: CIUDADES_PAG.operacion, parrafos: [p.dato] }]} />

        {modulo && vista && (
          <section className={s.bloque}>
            <h2 className={s.rotulo}>{PLAZA_PAG.masUsadoTitulo}</h2>
            <Link href={`/modulos/${modulo.slug}`} className="beneficio" data-tono={vista.tono}>
              <span className="etiqueta">{modulo.nombre}</span>
              <p className="gana">{vista.gana}</p>
              <span className="ver">
                Ver cómo <span aria-hidden="true">→</span>
              </span>
            </Link>
          </section>
        )}

        <FaqLista titulo={CIUDADES_PAG.preguntas} preguntas={p.preguntas} id={`${SITIO}${ruta}`} />

        <Enlaces
          titulo={CIUDADES_PAG.tipo}
          tono="azul"
          items={tipo ? [{ href: `/para/${tipo.slug}`, texto: tipo.nombre }] : []}
        />
        <Enlaces
          titulo={PLAZA_PAG.otras}
          items={otras.map((x) => ({ href: `/software-rent-a-car/${x.slug}`, texto: x.ciudad }))}
        />
      </article>

      <Cierre
        titulo={`¿Tenés una rentadora en *${p.ciudad}*?`}
        bajada="Contame cómo trabajás y lo vemos sobre tu flota."
      />
    </>
  );
}
