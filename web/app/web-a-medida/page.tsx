import { WEB_A_MEDIDA_PAG } from '@/lib/seo';
import { WEB_A_MEDIDA_UI } from '@/lib/paginas';
import { SITIO } from '@/lib/sitio';
import Portada from '../_pagina/Portada';
import Migas from '../_pagina/Migas';
import Cierre from '../_pagina/Cierre';
import Citable from '../_pagina/Citable';
import Prosa from '../_pagina/Prosa';
import FaqLista from '../_pagina/FaqLista';
import Enlaces from '../_pagina/Enlaces';
import Items from '../_pagina/Items';
import DosMarcas from '@/components/home/DosMarcas';
import { meta } from '../_pagina/meta';
import { grafo, migasLd } from '../_pagina/schema';
import s from '../seo.module.css';

/* La web de reservas a medida: la misma web con dos marcas inventadas, qué se adapta y qué ya
 * viene resuelto. Lo que se afirma sale de rentora-system/web-reservas (configuración por
 * tenant: marca, tipografía, logo, secciones propias, "Hecho con Rentora"). "Conectada a tu panel"
 * sale de rentora-system: la reserva pagada entra confirmada, el cobro de Mercado Pago va con el
 * token de la rentadora y queda en Caja, y lo que no se paga cae en Seguimiento (0010). */

const P = WEB_A_MEDIDA_PAG;
const RUTA = `/${P.slug}`;

export const metadata = meta(RUTA, P.title, P.description);

export default function WebAMedida() {
  const migas = [{ href: '/', texto: 'Inicio' }];
  const ld = grafo(migasLd([...migas, { href: RUTA, texto: P.nombre }]));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />

      <Portada
        tag={WEB_A_MEDIDA_UI.tag}
        titulo={P.h1}
        bajada={P.bajada}
        tono="azul"
        icono="chispa"
        migas={<Migas items={migas} actual={P.nombre} />}
      />

      <article className={`envoltorio ${s.pagina}`}>
        <DosMarcas />

        <Citable texto={P.citable} tono="azul" />

        <section className={s.bloque}>
          <h2 className={s.rotulo}>{P.cambiaTitulo}</h2>
          <Items items={P.cambia} tono="azul" />
        </section>

        <section className={s.bloque}>
          <h2 className={s.rotulo}>{P.vieneTitulo}</h2>
          <Items items={P.viene} tono="turq" />
        </section>

        <section className={s.bloque}>
          <h2 className={s.rotulo}>{P.conectaTitulo}</h2>
          <Items items={P.conecta} tono="menta" />
        </section>

        <Prosa secciones={P.secciones} />

        <FaqLista titulo={WEB_A_MEDIDA_UI.preguntas} preguntas={P.preguntas} id={`${SITIO}${RUTA}`} />

        <Enlaces titulo={WEB_A_MEDIDA_UI.enlaces} items={WEB_A_MEDIDA_UI.enlacesItems} tono="azul" />
      </article>

      <Cierre
        titulo={WEB_A_MEDIDA_UI.cierreTitulo}
        bajada={WEB_A_MEDIDA_UI.cierreBajada}
        secundario={{ href: '/que-incluye', texto: WEB_A_MEDIDA_UI.verIncluye }}
      />
    </>
  );
}
