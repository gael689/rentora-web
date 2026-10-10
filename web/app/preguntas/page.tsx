import type { Metadata } from 'next';
import Link from 'next/link';
import { FAQS } from '@/lib/contenido';
import { OPERACIONES } from '@/lib/sistema/operaciones';
import { PREGUNTAS_PAG, TONOS } from '@/lib/paginas';
import { SITIO } from '@/lib/sitio';
import Portada from '../_pagina/Portada';
import Cierre from '../_pagina/Cierre';
import s from '../seo.module.css';
import { alternos } from '../_pagina/meta';

/* La FAQ como página propia, desplegada y sin acordeón: el que entra a una FAQ quiere leer, no
 * interactuar. El `FAQPage` es el mismo contenido que muestra la home. */
export const metadata: Metadata = {
  title: 'Preguntas sobre el software de alquiler de autos',
  description:
    'Cómo se cobra, si sirve para camionetas, si emite factura electrónica, cómo se cobra una reserva de la web y qué pasa con los contratos firmados en papel.',
  alternates: alternos('/preguntas'),
};

export default function Preguntas() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITIO}/preguntas#faq`,
    inLanguage: 'es-AR',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Portada tag={PREGUNTAS_PAG.tag} titulo={PREGUNTAS_PAG.titulo} bajada={PREGUNTAS_PAG.bajada} />

      <div className={`envoltorio ${s.pagina}`}>
        <div className={s.grilla}>
          {FAQS.map((f, i) => (
            <section key={f.q} className={s.tarjeta} data-tono={TONOS[i % TONOS.length]}>
              <h2 className={s.palabra}>{f.q}</h2>
              <p className={s.definicion}>{f.a}</p>
            </section>
          ))}
        </div>

        <section className={s.bloque} data-tono="turq">
          <h2 className={s.rotulo}>{PREGUNTAS_PAG.operacionesTitulo}</h2>
          <nav className={s.otras} aria-label={PREGUNTAS_PAG.operacionesTitulo}>
            {OPERACIONES.map((o) => (
              <Link key={o.slug} href={`/operaciones/${o.slug}`} className={s.otra}>
                {o.nombre}
              </Link>
            ))}
          </nav>
        </section>
      </div>

      <Cierre titulo={PREGUNTAS_PAG.cierreTitulo} bajada={PREGUNTAS_PAG.cierreBajada} />
    </>
  );
}
