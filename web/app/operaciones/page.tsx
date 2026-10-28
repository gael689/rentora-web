import type { Metadata } from 'next';
import Link from 'next/link';
import { OPERACIONES } from '@/lib/sistema/operaciones';
import { OPERACIONES_PAG } from '@/lib/paginas';
import { distancia } from '@/lib/carrusel';
import Cubre from '@/components/sistema/Cubre';
import Portada from '../_pagina/Portada';
import Cierre from '../_pagina/Cierre';
import Escena from './Escena';
import Vista from './Vista';
import s from './operaciones.module.css';
import { alternos } from '../_pagina/meta';

/* Cómo se hace cada cosa. Ningún competidor muestra cómo se opera su sistema: venden
 * beneficios. Estas son las preguntas que el dueño se hace mientras tiene el problema delante,
 * que es justo cuando compra. */
export const metadata: Metadata = {
  title: 'Cómo se opera una rentadora con RentaGo',
  description:
    'Las operaciones del mostrador, paso a paso: tomar una reserva, entregar el auto, recibirlo con devolución tardía, firmar el contrato, extender un alquiler y cargar una promo.',
  alternates: alternos('/operaciones'),
};

export default function Operaciones() {
  const n = OPERACIONES.length;
  return (
    <>
      <Portada
        titulo={OPERACIONES_PAG.titulo}
        bajada={OPERACIONES_PAG.bajada}
      />

      <div className="envoltorio">
        <Escena
          paneles={OPERACIONES.map((o, i) => (
            /* El panel de la derecha: la pantalla del sistema de la operación activa, con el nombre
               y la pregunta en blanco abajo, sobre el degradé oscuro. Es sólo un atajo para el
               mouse: el link accesible es el de la tarjeta, por eso no entra en el orden de Tab. */
            <div
              key={o.slug}
              className={s.panel}
              data-n={i}
              data-d={distancia(i, 0, n)}
              data-on={i === 0 ? '' : undefined}
              aria-hidden="true"
            >
              <Link href={`/operaciones/${o.slug}`} className={`tarjeta-foto ${s.panelLink}`} tabIndex={-1}>
                <Cubre>
                  <Vista o={o} />
                </Cubre>
                <span className="tarjeta-foto__texto">
                  <span className={`tarjeta-foto__titulo ${s.panelTitulo}`}>{o.nombre}</span>
                  <span className="tarjeta-foto__frase">{o.pregunta}</span>
                </span>
              </Link>
            </div>
          ))}
        >
          {OPERACIONES.map((o, i) => (
            <div
              key={o.slug}
              className={s.item}
              data-n={i}
              data-d={distancia(i, 0, n)}
              data-on={i === 0 ? '' : undefined}
              style={{ ['--i' as string]: i }}
            >
              {/* Tarjeta clara: el nombre de la operación como título y la pregunta debajo. */}
              <Link
                href={`/operaciones/${o.slug}`}
                className={s.card}
                aria-current={i === 0 ? 'true' : undefined}
              >
                {/* Móvil: la pantalla del sistema de cabecera (en escritorio no se muestra); el título
                    se superpone abajo sobre el degradé. */}
                <span className={s.cardMedia} aria-hidden="true">
                  <Cubre>
                    <Vista o={o} />
                  </Cubre>
                </span>
                <h2 className={s.cardTitulo}>{o.nombre}</h2>
                <p className={s.cardPregunta}>{o.pregunta}</p>
                <span className={s.cardVer}>
                  {OPERACIONES_PAG.verComo} <span aria-hidden="true">→</span>
                </span>
              </Link>
            </div>
          ))}
        </Escena>
      </div>

      <Cierre titulo={OPERACIONES_PAG.cierreTitulo} bajada={OPERACIONES_PAG.cierreBajada} />
    </>
  );
}
