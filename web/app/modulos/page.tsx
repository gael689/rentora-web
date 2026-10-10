import type { Metadata } from 'next';
import Link from 'next/link';
import { MODULOS_PAG } from '@/lib/paginas';
import { MODULOS } from '@/lib/contenido';
import Icono from '@/components/sistema/Icono';
import Portada from '../_pagina/Portada';
import Cierre from '../_pagina/Cierre';
import { modulosVista } from '../_pagina/modulo';
import s from './modulos.module.css';
import { alternos } from '../_pagina/meta';

/* Índice navegacional. Su término es "sistema de gestión para alquiler de autos": no repite el
 * cabeza de la home ni los long-tail de las páginas hijas. */
export const metadata: Metadata = {
  title: 'Sistema de gestión para alquiler de autos',
  description:
    'Los módulos de Rentora: ocupación, flota, clientes, reservas, contratos, precios, cotizador, caja, prospectos, multas y daños, tu web y avisos.',
  alternates: alternos('/modulos'),
};

export default function Indice() {
  return (
    <>
      <Portada
        tag={`${MODULOS.length} módulos`}
        titulo={MODULOS_PAG.titulo}
        bajada={MODULOS_PAG.bajada}
      />

      <div className={`envoltorio ${s.pagina}`}>
        <div className={s.grilla}>
          {modulosVista().map(({ m, tono, icono, dolor, gana }) => (
            <Link key={m.slug} href={`/modulos/${m.slug}`} className="beneficio" data-tono={tono}>
              <div className={s.fila}>
                <span className="orbe">
                  <Icono nombre={icono} tam={24} />
                </span>
                <span className="etiqueta">{m.nombre}</span>
              </div>
              <p className="dolor">{dolor}</p>
              <p className="gana">{gana}</p>
              <span className="ver">
                {MODULOS_PAG.verComo} <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <Cierre titulo={MODULOS_PAG.cierreTitulo} bajada={MODULOS_PAG.cierreBajada} />
    </>
  );
}
