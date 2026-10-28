import type { Metadata } from 'next';
import Link from 'next/link';
import { SENALES } from '@/lib/seo';
import { COMO_ELEGIR_PAG, TONOS } from '@/lib/paginas';
import { SITIO } from '@/lib/sitio';
import Icono from '@/components/sistema/Icono';
import Reveal from '@/components/animacion/Reveal';
import Linea from '@/components/animacion/Linea';
import Portada from '../_pagina/Portada';
import Cierre from '../_pagina/Cierre';
import Respuesta from '../_pagina/Respuesta';
import s from '../seo.module.css';
import { alternos } from '../_pagina/meta';

/* Cómo elegir un software para rent a car, en formato autodiagnóstico: diez señales que llevan a la
 * compra, cada una con la respuesta de RentaGo en un callout. Ataca la búsqueda de evaluación. El
 * `FAQPage` sale de las mismas señales que se ven (título = pregunta, respuesta = situación + lo que
 * resuelve RentaGo), así el marcado no puede decir otra cosa. **No se nombra a ningún competidor.** */
export const metadata: Metadata = {
  title: 'Cómo elegir un software para rent a car',
  description:
    'Las señales de que tu rentadora ya necesita un software de alquiler de autos: reservas pisadas, deudas sin control, vencimientos, señas a mano, contratos, Excel y más.',
  alternates: alternos('/como-elegir'),
};

export default function ComoElegir() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITIO}/como-elegir#faq`,
    inLanguage: 'es-AR',
    mainEntity: SENALES.map((p) => ({
      '@type': 'Question',
      name: p.titulo,
      acceptedAnswer: { '@type': 'Answer', text: `${p.situacion} ${COMO_ELEGIR_PAG.rentago}: ${p.rentago}` },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Portada titulo={COMO_ELEGIR_PAG.titulo} bajada={COMO_ELEGIR_PAG.bajada} />

      <div className={`envoltorio ${s.pagina}`}>
        <section className={s.bloque}>
          <Reveal as="h2" className={s.rotulo}>
            {COMO_ELEGIR_PAG.senalesTitulo}
          </Reveal>
          <ul className={s.senales}>
            {SENALES.map((p, i) => (
              <li key={p.titulo} id={`senal-${i + 1}`} className={s.senal} data-tono={TONOS[i % TONOS.length]}>
                <Linea className={s.senalLinea} />
                <Reveal className={s.senalCabeza}>
                  <span className="orbe" aria-hidden="true">
                    <Icono nombre={p.icono} tam={22} dibuja />
                  </span>
                  <div className={s.itemCuerpo}>
                    <h3 className={s.itemQ}>{p.titulo}</h3>
                    <p className={s.itemPorque}>{p.situacion}</p>
                  </div>
                </Reveal>
                <Reveal i={2} className={s.senalRespuesta}>
                  <Respuesta rotulo={COMO_ELEGIR_PAG.rentago} texto={p.rentago} />
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        <Reveal as="section" className={s.resumen}>
          <h2 className={s.resumenTitulo}>{COMO_ELEGIR_PAG.resumenTitulo}</h2>
          <div className={s.resumenAcciones}>
            <Link href="/contacto" className="cta">
              {COMO_ELEGIR_PAG.resumenContacto}
              <Icono nombre="flecha" tam={18} />
            </Link>
            <Link href="/planes" className="cta-sec">
              {COMO_ELEGIR_PAG.resumenPlanes}
              <Icono nombre="flecha" tam={16} />
            </Link>
          </div>
        </Reveal>
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
