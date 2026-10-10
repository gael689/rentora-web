import type { Metadata } from 'next';
import Link from 'next/link';
import { OPERACIONES } from '@/lib/sistema/operaciones';
import { OPERACIONES_PAG, TONOS } from '@/lib/paginas';
import Portada from '../_pagina/Portada';
import Cierre from '../_pagina/Cierre';
import s from './operaciones.module.css';
import { alternos } from '../_pagina/meta';

/* Cómo se hace cada cosa. Ningún competidor muestra cómo se opera su sistema: venden
 * beneficios. Estas son las preguntas que el dueño se hace mientras tiene el problema delante,
 * que es justo cuando compra. */
export const metadata: Metadata = {
  title: 'Cómo se opera una rentadora con Rentora',
  description:
    'Las operaciones del mostrador, paso a paso: tomar una reserva, entregar el auto, recibirlo con devolución tardía, firmar el contrato, extender un alquiler y cargar una promo.',
  alternates: alternos('/operaciones'),
};

export default function Operaciones() {
  return (
    <>
      <Portada
        tag={`${OPERACIONES.length} operaciones`}
        titulo={OPERACIONES_PAG.titulo}
        bajada={OPERACIONES_PAG.bajada}
      />

      <div className={`envoltorio ${s.pagina}`}>
        <div className={s.grilla}>
          {OPERACIONES.map((o, i) => (
            <Link
              key={o.slug}
              href={`/operaciones/${o.slug}`}
              className="beneficio"
              data-tono={TONOS[i % TONOS.length]}
            >
              <div className={s.fila}>
                <span className={`orbe ${s.numero}`} aria-hidden="true">
                  {o.pasos.length}
                </span>
                <span className="etiqueta">{o.nombre}</span>
              </div>
              <p className="gana">{o.pregunta}</p>
              <span className="ver">
                {o.pasos.length} {OPERACIONES_PAG.pasos} · {OPERACIONES_PAG.verComo}{' '}
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <Cierre titulo={OPERACIONES_PAG.cierreTitulo} bajada={OPERACIONES_PAG.cierreBajada} />
    </>
  );
}
