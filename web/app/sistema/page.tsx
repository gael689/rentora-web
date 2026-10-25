import type { Metadata } from 'next';
import Link from 'next/link';
import { PANTALLAS, pantalla } from '@/lib/sistema/pantallas';
import { SECCIONES_SISTEMA, SISTEMA } from '@/lib/paginas';
import { SITIO } from '@/lib/sitio';
import Icono from '@/components/sistema/Icono';
import Pantalla, { hayReplica } from '@/components/sistema/Pantalla';
import Portada from '../_pagina/Portada';
import Cierre from '../_pagina/Cierre';
import Caso from '../_pagina/Caso';
import { CASO_UI } from '@/lib/paginas';
import s from './sistema.module.css';
import { alternos } from '../_pagina/meta';

/* Las pantallas del sistema, agrupadas como el menú real: cinco secciones.
 *
 * Es la página que ningún competidor tiene: venden beneficios y ninguno muestra una pantalla de
 * su producto. Acá están todas, con su ruta y una línea de lo que resuelven. */
export const metadata: Metadata = {
  title: 'Las pantallas del software de alquiler de autos',
  description:
    'Las pantallas del panel de RentaGo, una por una: ocupación, reservas, contratos, caja, precios, prospectos y más. El sistema como es, sobre una rentadora de ejemplo.',
  alternates: alternos('/sistema'),
};

export default function Sistema() {
  const secciones = SECCIONES_SISTEMA.map((sec) => ({
    ...sec,
    lista: sec.pantallas.map((slug) => pantalla(slug)).filter((p) => p !== undefined),
  }));
  const ubicadas = new Set(secciones.flatMap((sec) => sec.lista.map((p) => p.slug)));
  const sueltas = PANTALLAS.filter((p) => !ubicadas.has(p.slug));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITIO}/sistema#pantallas`,
    name: `Las ${PANTALLAS.length} pantallas del panel de RentaGo`,
    numberOfItems: PANTALLAS.length,
    itemListElement: PANTALLAS.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.titulo,
      description: p.resuelve,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Portada tag={`${PANTALLAS.length} pantallas`} titulo={SISTEMA.titulo} bajada={SISTEMA.bajada}>
        <nav className={s.indice} aria-label={SISTEMA.indice}>
          {secciones.map((sec) => (
            <a key={sec.titulo} href={`#${sec.titulo.toLowerCase()}`} className="etiqueta" data-tono={sec.tono}>
              {sec.titulo}
            </a>
          ))}
        </nav>
      </Portada>

      <div className={`envoltorio ${s.pagina}`}>
        {secciones.map((sec) => (
          <section key={sec.titulo} id={sec.titulo.toLowerCase()} className={s.seccion} data-tono={sec.tono}>
            <div className={s.cabezaSeccion}>
              <span className="orbe">
                <Icono nombre={sec.icono} tam={24} />
              </span>
              <div>
                <h2 className="titular-bloque">{sec.titulo}</h2>
                <p className={s.frase}>{sec.frase}</p>
              </div>
            </div>

            {sec.lista.map((p) => (
              <article key={p.slug} id={p.slug} className={s.pantalla}>
                <div className={s.cabezaPantalla}>
                  <h3 className="titular-fila">{p.titulo}</h3>
                  <Link href={`/modulos/${p.modulo}`} className="cta-sec">
                    {SISTEMA.verModulo} <span aria-hidden="true">→</span>
                  </Link>
                </div>
                {hayReplica(p.slug) ? (
                  <Pantalla slug={p.slug} />
                ) : (
                  <p className={s.pendiente}>
                    {p.resuelve} <span className={s.ruta}>{p.ruta}</span>
                  </p>
                )}
              </article>
            ))}
          </section>
        ))}

        {sueltas.length > 0 && (
          <section className={s.seccion} data-tono="petro">
            <h2 className="titular-bloque">{SISTEMA.pendientesTitulo}</h2>
            <p className={s.frase}>{SISTEMA.pendientesNota}</p>
            <ul className={s.sueltas}>
              {sueltas.map((p) => (
                <li key={p.slug}>
                  <b>{p.titulo}</b> <span className={s.ruta}>{p.ruta}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <Caso link={{ href: '/que-incluye', texto: CASO_UI.verIncluye }} />
      </div>

      <Cierre
        titulo={SISTEMA.cierreTitulo}
        bajada={SISTEMA.cierreBajada}
        secundario={{ href: '/modulos', texto: 'Ver los módulos' }}
      />
    </>
  );
}
