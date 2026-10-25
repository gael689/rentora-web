import type { Metadata } from 'next';
import Link from 'next/link';
import { GLOSARIO } from '@/lib/seo';
import { GLOSARIO_PAG, TERMINO_PAG, TONOS } from '@/lib/paginas';
import { SITIO } from '@/lib/sitio';
import Portada from '../_pagina/Portada';
import Cierre from '../_pagina/Cierre';
import s from '../seo.module.css';
import { alternos } from '../_pagina/meta';

/* El glosario del rubro. Contesta la búsqueda de definición. Cada definición contesta en la
 * primera oración, sin preámbulo, y ninguna depende de haber leído la anterior. */
export const metadata: Metadata = {
  title: 'Glosario del alquiler de autos',
  description:
    'Qué es la franquicia, la garantía, el cupo, el late check-in, el conductor adicional, la cuenta corriente y el echeq en un alquiler de autos. Definiciones cortas, en castellano.',
  alternates: alternos('/glosario'),
};

export default function Glosario() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': `${SITIO}/glosario#terminos`,
    name: 'Glosario del alquiler de autos',
    inLanguage: 'es-AR',
    hasDefinedTerm: GLOSARIO.map((t) => ({
      '@type': 'DefinedTerm',
      '@id': `${SITIO}/glosario/${t.slug}#termino`,
      url: `${SITIO}/glosario/${t.slug}`,
      name: t.palabra,
      description: t.definicion,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Portada tag={GLOSARIO_PAG.tag} titulo={GLOSARIO_PAG.titulo} bajada={GLOSARIO_PAG.bajada}>
        <nav className={s.indice} aria-label={GLOSARIO_PAG.indice}>
          {GLOSARIO.map((t, i) => (
            <a key={t.slug} href={`#${t.slug}`} className="etiqueta" data-tono={TONOS[i % TONOS.length]}>
              {t.palabra}
            </a>
          ))}
        </nav>
      </Portada>

      <div className={`envoltorio ${s.pagina}`}>
        <div className={s.grilla}>
          {GLOSARIO.map((t, i) => (
            <section
              key={t.slug}
              id={t.slug}
              className={s.tarjeta}
              data-tono={TONOS[i % TONOS.length]}
            >
              <h2 className={s.palabra}>{t.palabra}</h2>
              <p className={s.definicion}>{t.definicion}</p>
              {t.enRentaGo && (
                <p className={s.enRentaGo}>
                  <b>{GLOSARIO_PAG.enRentaGo}:</b> {t.enRentaGo}
                </p>
              )}
              <Link href={`/glosario/${t.slug}`} className={s.ver}>
                {TERMINO_PAG.leer} <span aria-hidden="true">→</span>
              </Link>
            </section>
          ))}
        </div>
      </div>

      <Cierre titulo={GLOSARIO_PAG.cierreTitulo} bajada={GLOSARIO_PAG.cierreBajada} />
    </>
  );
}
