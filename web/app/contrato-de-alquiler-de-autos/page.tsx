import Link from 'next/link';
import { CONTRATO_PAG, GUIAS, GLOSARIO } from '@/lib/seo';
import { OPERACIONES } from '@/lib/sistema/operaciones';
import { CONTRATO_PAG_UI } from '@/lib/paginas';
import { SITIO } from '@/lib/sitio';
import Portada from '../_pagina/Portada';
import Migas from '../_pagina/Migas';
import Cierre from '../_pagina/Cierre';
import Citable from '../_pagina/Citable';
import Prosa from '../_pagina/Prosa';
import FaqLista from '../_pagina/FaqLista';
import Enlaces from '../_pagina/Enlaces';
import { meta } from '../_pagina/meta';
import { grafo, migasLd } from '../_pagina/schema';
import s from '../seo.module.css';

/* La búsqueda es "contrato de alquiler de autos modelo". Se contesta con qué tiene que tener un
 * contrato, y el modelo de ejemplo se pide por contacto: el sistema arranca de ese modelo y se
 * adapta a cada rentadora. Todavía no hay un PDF descargable porque el modelo neutro sale de la
 * generalización del clausulado (Fase 3 del plan). */

const P = CONTRATO_PAG;
const RUTA = `/${P.slug}`;

export const metadata = meta(RUTA, P.title, P.description);

export default function PaginaContrato() {
  const migas = [{ href: '/', texto: 'Inicio' }];
  const ld = grafo(
    {
      '@type': 'Article',
      '@id': `${SITIO}${RUTA}#articulo`,
      headline: P.title,
      description: P.description,
      inLanguage: 'es-AR',
      publisher: { '@id': `${SITIO}/#organizacion` },
      mainEntityOfPage: `${SITIO}${RUTA}`,
    },
    migasLd([...migas, { href: RUTA, texto: P.nombre }]),
  );
  const relacionados = [
    ...GLOSARIO.filter((t) => ['clausulado-versionado', 'franquicia', 'conductor-adicional'].includes(t.slug)).map(
      (t) => ({ href: `/glosario/${t.slug}`, texto: t.palabra }),
    ),
    ...GUIAS.filter((g) => g.slug === 'franquicia-y-garantia').map((g) => ({ href: `/guias/${g.slug}`, texto: g.nombre })),
    ...OPERACIONES.filter((o) => o.slug === 'firmar-el-contrato').map((o) => ({
      href: `/operaciones/${o.slug}`,
      texto: o.nombre,
    })),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />

      <Portada
        tag={CONTRATO_PAG_UI.tag}
        titulo={P.h1}
        bajada={P.bajada}
        tono="petro"
        migas={<Migas items={migas} actual={P.nombre} />}
      />

      <article className={`envoltorio ${s.pagina}`}>
        <Citable texto={P.citable} tono="petro" />

        <section className={s.bloque} data-tono="petro">
          <h2 className={s.rotulo}>{CONTRATO_PAG_UI.partes}</h2>
          <ol className={s.necesidades}>
            {P.partes.map((n) => (
              <li key={n.titulo} className={s.necesidad}>
                <h3>{n.titulo}</h3>
                <p>{n.texto}</p>
              </li>
            ))}
          </ol>
          <p className={s.itemPorque}>{CONTRATO_PAG_UI.aviso}</p>
        </section>

        <Prosa secciones={P.secciones} />

        <section className={s.bloque} data-tono="turq">
          <h2 className={`titular-fila ${s.subtitulo}`}>{P.modelo.titulo}</h2>
          <div className={s.prosa}>
            <p>{P.modelo.texto}</p>
          </div>
          <p>
            <Link href="/contacto" className="btn-linea">
              {P.modelo.cta} <span aria-hidden="true">→</span>
            </Link>
          </p>
          <p className={s.enRentora}>
            <b>{CONTRATO_PAG_UI.enRentora}:</b> {P.enRentora}
          </p>
        </section>

        <FaqLista titulo={CONTRATO_PAG_UI.preguntas} preguntas={P.preguntas} id={`${SITIO}${RUTA}`} />

        <Enlaces titulo={CONTRATO_PAG_UI.relacionados} tono="petro" items={relacionados} />
      </article>

      <Cierre titulo={CONTRATO_PAG_UI.cierreTitulo} bajada={CONTRATO_PAG_UI.cierreBajada} />
    </>
  );
}
