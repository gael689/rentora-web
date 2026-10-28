import { PLANES_PAG } from '@/lib/seo';
import { PLANES_PAG_UI, CASO_UI, TONOS } from '@/lib/paginas';
import Link from 'next/link';
import { SITIO, linkWhatsapp } from '@/lib/sitio';
import { DEMO_CTA } from '@/lib/demo';
import Icono from '@/components/sistema/Icono';
import Reveal, { rv } from '@/components/animacion/Reveal';
import Linea from '@/components/animacion/Linea';
import Portada from '../_pagina/Portada';
import Migas from '../_pagina/Migas';
import Cierre from '../_pagina/Cierre';
import Citable from '../_pagina/Citable';
import Prosa from '../_pagina/Prosa';
import Items from '../_pagina/Items';
import Caso from '../_pagina/Caso';
import Enlaces from '../_pagina/Enlaces';
import FaqLista from '../_pagina/FaqLista';
import { meta } from '../_pagina/meta';
import { grafo, migasLd } from '../_pagina/schema';
import s from '../seo.module.css';
import b from '../_pagina/bloques.module.css';

/* Planes + qué incluye (ancla #que-incluye), sin un solo número. El precio se habla antes de empezar, y el
 * JSON-LD tampoco lleva `offers` ni `priceRange`: un precio en el schema es un precio publicado. */

const P = PLANES_PAG;
const RUTA = '/planes';

export const metadata = meta(RUTA, P.title, P.description);

/** Una de las partes grandes (pago único, mantenimiento, lo que es tuyo): titular grande con ícono
 *  de trazo, etiqueta del color de la parte y los ítems entrando uno por uno. */
function Parte({
  nombre,
  para,
  etiqueta,
  icono,
  tono,
  i,
  ancha = false,
  children,
}: {
  nombre: string;
  para?: string;
  etiqueta: string;
  icono: string;
  tono: string;
  i: number;
  ancha?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Reveal className={`${b.parte}${ancha ? ` ${b.parteAncha}` : ''}`} data-tono={tono} i={i}>
      <Linea className="linea-tono" i={i} />
      <div className={b.parteCabeza}>
        <div className={b.parteTitular}>
          <span className={b.parteIcono} aria-hidden="true">
            <Icono nombre={icono} tam={30} dibuja />
          </span>
          <div className={b.parteTitulos}>
            <span className={b.parteEtiqueta}>{etiqueta}</span>
            <h3>{nombre}</h3>
          </div>
        </div>
        {para && <p className={b.parteCuando}>{para}</p>}
      </div>
      {children}
    </Reveal>
  );
}

export default function Planes() {
  const migas = [{ href: '/', texto: 'Inicio' }];
  const ld = grafo(migasLd([...migas, { href: RUTA, texto: P.nombre }]));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />

      <Portada
        titulo={P.h1}
        bajada={P.bajada}
        tono="azul"
        imagen={{ src: '/heros/planes.webp', alt: 'Propuestas impresas, una calculadora y las llaves de un auto sobre un escritorio', pos: '55% 50%', lado: 'derecha', tinte: true }}
        migas={<Migas items={migas} actual={P.nombre} />}
      />

      <article className={`envoltorio ${s.pagina}`}>
        <div className={s.planes}>
          {P.planes.map((p, pi) => (
            <section
              key={p.slug}
              className={s.plan}
              data-tono="azul"
              data-recomendado={p.recomendado ? 'true' : 'false'}
              {...rv(pi)}
            >
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

        <Reveal>
          <Citable texto={P.citable} tono="azul" />
        </Reveal>

        <section className={`${s.bloque} ${s.bandaSuave}`}>
          <Reveal as="h2" className={s.rotulo}>
            {PLANES_PAG_UI.adicionales}
          </Reveal>
          {/* Grilla pareja: 3 × 2 en escritorio, 2 × 3 en tablet, 1 columna en móvil. */}
          <ul className={s.adicionales}>
            {P.adicionales.map((a, i) => (
              <li key={a.nombre} className={s.adicional} data-tono={TONOS[i % TONOS.length]} {...rv(i % 3)}>
                <Linea className="linea-tono" i={i % 3} />
                <h3 className={s.palabra}>{a.nombre}</h3>
                <p className={s.definicion}>{a.texto}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Lo que era /que-incluye (hoy redirige acá). Contenido original, con su texto explicativo. */}
        <div id={PLANES_PAG_UI.anchaIncluye} className={b.ancla}>
          <section className={s.bloque}>
            <Reveal as="h2" className={s.rotulo}>
              {P.incluyeTitulo}
            </Reveal>
            <div className={b.partes}>
              <Parte
                nombre={P.pagoUnico.nombre}
                para={P.pagoUnico.para}
                etiqueta={PLANES_PAG_UI.etiquetaPagoUnico}
                icono="recibo"
                tono="turq"
                i={0}
              >
                <Items items={P.pagoUnico.items} tono="turq" columnas={1} />
              </Parte>
              <Parte
                nombre={P.mensual.nombre}
                para={P.mensual.para}
                etiqueta={PLANES_PAG_UI.etiquetaMensual}
                icono="girar"
                tono="menta"
                i={1}
              >
                <Items items={P.mensual.items} tono="menta" columnas={1} />
              </Parte>
            </div>
          </section>

          <Reveal>
            <Citable texto={P.incluyeCitable} tono="menta" />
          </Reveal>

          <section className={s.bloque}>
            <Parte
              nombre={P.tuyoTitulo}
              etiqueta={PLANES_PAG_UI.etiquetaTuyo}
              icono="llave"
              tono="azul"
              i={0}
              ancha
            >
              <Items items={P.tuyo} tono="azul" columnas={1} className={b.itemsAncho} />
            </Parte>
          </section>

          <Prosa secciones={P.secciones} />
        </div>

        <Caso link={{ href: '/sistema', texto: CASO_UI.verSistema }} />

        <FaqLista titulo={PLANES_PAG_UI.preguntas} preguntas={P.preguntas} id={`${SITIO}${RUTA}`} />

        <Enlaces titulo={PLANES_PAG_UI.enlaces} items={PLANES_PAG_UI.enlacesItems} tono="azul" />
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
