import { QUE_INCLUYE_PAG } from '@/lib/seo';
import { QUE_INCLUYE_UI, CASO_UI } from '@/lib/paginas';
import { SITIO } from '@/lib/sitio';
import { DEMO_CTA } from '@/lib/demo';
import Portada from '../_pagina/Portada';
import Migas from '../_pagina/Migas';
import Cierre from '../_pagina/Cierre';
import Citable from '../_pagina/Citable';
import Prosa from '../_pagina/Prosa';
import FaqLista from '../_pagina/FaqLista';
import Enlaces from '../_pagina/Enlaces';
import Items from '../_pagina/Items';
import Caso from '../_pagina/Caso';
import { meta } from '../_pagina/meta';
import { grafo, migasLd } from '../_pagina/schema';
import s from '../seo.module.css';
import b from '../_pagina/bloques.module.css';

/* Qué incluye: el pago único, el mantenimiento mensual y lo que es del cliente. Sin un solo
 * número (decisión cerrada), y sin `offers` en el JSON-LD. Dice lo mismo que /planes. */

const P = QUE_INCLUYE_PAG;
const RUTA = `/${P.slug}`;

export const metadata = meta(RUTA, P.title, P.description);

export default function QueIncluye() {
  const migas = [{ href: '/', texto: 'Inicio' }];
  const ld = grafo(migasLd([...migas, { href: RUTA, texto: P.nombre }]));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />

      <Portada
        tag={QUE_INCLUYE_UI.tag}
        titulo={P.h1}
        bajada={P.bajada}
        tono="menta"
        icono="tildes"
        migas={<Migas items={migas} actual={P.nombre} />}
      />

      <article className={`envoltorio ${s.pagina}`}>
        <div className={b.partes}>
          {[P.pagoUnico, P.mensual].map((parte, i) => (
            <section key={parte.nombre} className={b.parte} data-destacada={i === 0 ? 'true' : 'false'}>
              <div className={b.parteCabeza}>
                <h2>{parte.nombre}</h2>
                <p className={b.parteCuando}>{parte.para}</p>
              </div>
              <Items items={parte.items} tono={i === 0 ? 'turq' : 'menta'} columnas={1} />
            </section>
          ))}
        </div>

        <Citable texto={P.citable} tono="menta" />

        <section className={s.bloque}>
          <h2 className={s.rotulo}>{P.tuyoTitulo}</h2>
          <Items items={P.tuyo} tono="azul" columnas={1} />
        </section>

        <Prosa secciones={P.secciones} />

        <Caso link={{ href: '/sistema', texto: CASO_UI.verSistema }} />

        <FaqLista titulo={QUE_INCLUYE_UI.preguntas} preguntas={P.preguntas} id={`${SITIO}${RUTA}`} />

        <Enlaces titulo={QUE_INCLUYE_UI.enlaces} items={QUE_INCLUYE_UI.enlacesItems} tono="menta" />
      </article>

      <Cierre
        titulo={QUE_INCLUYE_UI.cierreTitulo}
        bajada={QUE_INCLUYE_UI.cierreBajada}
        demo={DEMO_CTA.planes}
        secundario={{ href: '/planes', texto: QUE_INCLUYE_UI.verPlanes }}
      />
    </>
  );
}
