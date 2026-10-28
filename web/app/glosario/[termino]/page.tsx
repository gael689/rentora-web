import { notFound } from 'next/navigation';
import { GLOSARIO } from '@/lib/seo';
import { OPERACIONES } from '@/lib/sistema/operaciones';
import { GLOSARIO_PAG, TERMINO_PAG } from '@/lib/paginas';
import { SITIO } from '@/lib/sitio';
import Portada from '../../_pagina/Portada';
import Migas from '../../_pagina/Migas';
import Cierre from '../../_pagina/Cierre';
import Citable from '../../_pagina/Citable';
import FaqLista from '../../_pagina/FaqLista';
import Enlaces from '../../_pagina/Enlaces';
import EnRentaGo from '../../_pagina/EnRentaGo';
import { meta } from '../../_pagina/meta';
import { grafo, migasLd } from '../../_pagina/schema';
import s from '../../seo.module.css';

/* Un término por página. La definición va primero y entera, porque es lo que corta un motor
 * generativo; la ampliación y las preguntas son lo que hace que la página no sea una línea sola. */

export const dynamicParams = false;

const termino = (slug: string) => GLOSARIO.find((t) => t.slug === slug);

export function generateStaticParams() {
  return GLOSARIO.map((t) => ({ termino: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ termino: string }> }) {
  const { termino: slug } = await params;
  const t = termino(slug);
  return t ? meta(`/glosario/${t.slug}`, t.title, t.description) : {};
}

export default async function PaginaTermino({ params }: { params: Promise<{ termino: string }> }) {
  const { termino: slug } = await params;
  const t = termino(slug);
  if (!t) notFound();

  const ruta = `/glosario/${t.slug}`;
  const migas = [
    { href: '/', texto: 'Inicio' },
    { href: '/glosario', texto: TERMINO_PAG.glosario },
  ];
  const operacion = OPERACIONES.find((o) => o.slug === t.operacion);
  const relacionados = t.relacionados.map(termino).filter((x) => x !== undefined);

  const ld = grafo(
    {
      '@type': 'DefinedTerm',
      '@id': `${SITIO}${ruta}#termino`,
      name: t.palabra,
      description: t.definicion,
      inDefinedTermSet: `${SITIO}/glosario#terminos`,
      inLanguage: 'es-AR',
    },
    migasLd([...migas, { href: ruta, texto: t.palabra }]),
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />

      <Portada
        titulo={`*${t.palabra}*`}
        tono="petro"
        migas={<Migas items={migas} actual={t.palabra} />}
      />

      <article className={`envoltorio ${s.pagina}`}>
        <Citable texto={t.definicion} tono="petro" />

        <section className={s.bloque}>
          <div className={s.prosa}>
            <p>{t.ampliacion}</p>
          </div>
        </section>

        {t.enRentaGo && (
          <EnRentaGo
            rotulo={TERMINO_PAG.enRentaGo}
            texto={t.enRentaGo}
            verModulo={TERMINO_PAG.verComo}
            href={operacion ? `/operaciones/${operacion.slug}` : undefined}
            moduloNombre={operacion?.nombre}
            icono="lista"
          />
        )}

        <FaqLista titulo={TERMINO_PAG.preguntas} preguntas={t.preguntas} id={`${SITIO}${ruta}`} />

        <Enlaces
          titulo={TERMINO_PAG.relacionados}
          tono="petro"
          items={[
            ...relacionados.map((x) => ({ href: `/glosario/${x.slug}`, texto: x.palabra })),
            { href: '/glosario', texto: TERMINO_PAG.todos },
          ]}
        />
      </article>

      <Cierre titulo={TERMINO_PAG.cierreTitulo} bajada={TERMINO_PAG.cierreBajada} />
    </>
  );
}
