import type { Metadata } from 'next';
import { CHECKLIST } from '@/lib/seo';
import { COMO_ELEGIR_PAG, TONOS } from '@/lib/paginas';
import { SITIO } from '@/lib/sitio';
import Portada from '../_pagina/Portada';
import Cierre from '../_pagina/Cierre';
import s from '../seo.module.css';
import { alternos } from '../_pagina/meta';

/* Cómo elegir un software para rent a car.
 *
 * Ataca la búsqueda de evaluación, la más cercana a la compra. **No se nombra a ningún
 * competidor**: la comparación la hace el que lee, con el proveedor que tenga enfrente. */
export const metadata: Metadata = {
  title: 'Cómo elegir un software para rent a car',
  description:
    'Doce preguntas para hacerle a cualquier proveedor de software de alquiler de autos antes de firmar: cupo real, precios por temporada, contratos, avisos y quién carga tus datos.',
  alternates: alternos('/como-elegir'),
};

export default function ComoElegir() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITIO}/como-elegir#faq`,
    mainEntity: CHECKLIST.map((p) => ({
      '@type': 'Question',
      name: p.q,
      acceptedAnswer: { '@type': 'Answer', text: `${p.porque} En RentaGo: ${p.rentago}` },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Portada
        tag={COMO_ELEGIR_PAG.tag}
        titulo={COMO_ELEGIR_PAG.titulo}
        bajada={COMO_ELEGIR_PAG.bajada}
      />

      <div className={`envoltorio ${s.pagina}`}>
        <ol className={s.lista}>
          {CHECKLIST.map((p, i) => (
            <li key={p.q} id={`p${i + 1}`} className={s.item} data-tono={TONOS[i % TONOS.length]}>
              <span className="orbe" aria-hidden="true">
                {i + 1}
              </span>
              <div className={s.itemCuerpo}>
                <h2 className={s.itemQ}>{p.q}</h2>
                <p className={s.itemPorque}>{p.porque}</p>
                <div className={s.itemRentaGo}>
                  <span className={s.itemRentaGoRotulo}>{COMO_ELEGIR_PAG.rentago}</span>
                  <p className={s.itemRentaGoTexto}>{p.rentago}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <Cierre
        titulo={COMO_ELEGIR_PAG.cierreTitulo}
        bajada={COMO_ELEGIR_PAG.cierreBajada}
        cta={COMO_ELEGIR_PAG.cierreCta}
        secundario={{ href: '/contacto', texto: 'o contame cómo trabajás' }}
      />
    </>
  );
}
