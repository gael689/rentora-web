import { PLANES_PAG } from '@/lib/seo';
import { PLANES_PAG_UI } from '@/lib/paginas';
import Link from 'next/link';
import { SITIO, linkWhatsapp } from '@/lib/sitio';
import { DEMO_CTA } from '@/lib/demo';
import Icono from '@/components/sistema/Icono';
import Portada from '../_pagina/Portada';
import Migas from '../_pagina/Migas';
import Cierre from '../_pagina/Cierre';
import Citable from '../_pagina/Citable';
import FaqLista from '../_pagina/FaqLista';
import { meta } from '../_pagina/meta';
import { grafo, migasLd } from '../_pagina/schema';
import s from '../seo.module.css';

/* Los planes, sin un solo número. El precio se habla antes de empezar, y el
 * JSON-LD tampoco lleva `offers` ni `priceRange`: un precio en el schema es un precio publicado. */

const P = PLANES_PAG;
const RUTA = '/planes';

export const metadata = meta(RUTA, P.title, P.description);

export default function Planes() {
  const migas = [{ href: '/', texto: 'Inicio' }];
  const ld = grafo(migasLd([...migas, { href: RUTA, texto: P.nombre }]));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />

      <Portada
        tag={PLANES_PAG_UI.tag}
        titulo={P.h1}
        bajada={P.bajada}
        tono="azul"
        migas={<Migas items={migas} actual={P.nombre} />}
      />

      <article className={`envoltorio ${s.pagina}`}>
        <div className={s.planes}>
          {P.planes.map((p) => (
            <section key={p.slug} className={s.plan} data-tono="azul" data-recomendado={p.recomendado ? 'true' : 'false'}>
              {p.recomendado && <span className={s.planMarca}>{PLANES_PAG_UI.recomendado}</span>}
              <h2>{p.nombre}</h2>
              <p className={s.itemPorque}>{p.para}</p>
              <ul>
                {p.incluye.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <div className={s.planAcciones}>
                <a
                  href={linkWhatsapp(PLANES_PAG_UI.planMensaje(p.nombre))}
                  className="cta"
                  target="_blank"
                  rel="noopener"
                  data-cta={`plan-${p.slug}`}
                >
                  <Icono nombre="whatsapp" tam={18} />
                  {PLANES_PAG_UI.planWhatsapp}
                </a>
                <Link href="/contacto" className="cta-sec" data-cta={`plan-${p.slug}-demo`}>
                  {PLANES_PAG_UI.planDemo}
                  <Icono nombre="flecha" tam={16} />
                </Link>
              </div>
            </section>
          ))}
        </div>

        <Citable texto={P.citable} tono="azul" />

        <section className={s.bloque} data-tono="menta">
          <h2 className={s.rotulo}>{PLANES_PAG_UI.adicionales}</h2>
          <div className={s.grilla}>
            {P.adicionales.map((a) => (
              <div key={a.nombre} className={s.tarjeta} data-tono="menta">
                <h3 className={s.palabra}>{a.nombre}</h3>
                <p className={s.definicion}>{a.texto}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={s.bloque}>
          <h2 className={s.rotulo}>{PLANES_PAG_UI.comoSeCotiza}</h2>
          <div className={s.prosa}>
            <p>{P.comoSeCotiza}</p>
          </div>
          <Link href="/que-incluye" className="cta-sec" data-cta="planes-que-incluye">
            {PLANES_PAG_UI.verIncluye}
            <Icono nombre="flecha" tam={16} />
          </Link>
        </section>

        <FaqLista titulo={PLANES_PAG_UI.preguntas} preguntas={P.preguntas} id={`${SITIO}${RUTA}`} />
      </article>

      <Cierre
        titulo={PLANES_PAG_UI.cierreTitulo}
        bajada={PLANES_PAG_UI.cierreBajada}
        cta={PLANES_PAG_UI.planDemo}
        demo={DEMO_CTA.planes}
      />
    </>
  );
}
