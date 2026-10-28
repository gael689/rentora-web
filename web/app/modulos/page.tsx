import type { Metadata } from 'next';
import { MODULOS_PAG } from '@/lib/paginas';
import Portada from '../_pagina/Portada';
import Cierre from '../_pagina/Cierre';
import Compacta from '../_pagina/Compacta';
import s from './modulos.module.css';
import { modulosVista } from '../_pagina/modulo';
import { alternos } from '../_pagina/meta';

/* Índice navegacional. Su término es "sistema de gestión para alquiler de autos": no repite el
 * cabeza de la home ni los long-tail de las páginas hijas. */
export const metadata: Metadata = {
  title: 'Sistema de gestión para alquiler de autos',
  description:
    'Los módulos de RentaGo: ocupación, flota, clientes, reservas, contratos, precios, cotizador, caja, prospectos, multas y daños, tu web y avisos.',
  alternates: alternos('/modulos'),
};

export default function Indice() {
  return (
    <>
      <Portada
        titulo={MODULOS_PAG.titulo}
        bajada={MODULOS_PAG.bajada}
        imagen={{
          src: '/modulos/sistema-notebook.webp',
          alt: 'Una persona usa el calendario de ocupación de RentaGo en una notebook',
          pos: '50% 45%',
          lado: 'derecha',
        }}
      />

      <div className={`envoltorio ${s.pagina}`}>
        <Compacta
          etiqueta="Módulos"
          cta={MODULOS_PAG.verComo}
          celdas={modulosVista().map(({ m, tono, icono, gana }) => ({
            href: `/modulos/${m.slug}`,
            icono,
            tono,
            titulo: m.nombre,
            texto: gana,
          }))}
        />
      </div>

      <Cierre titulo={MODULOS_PAG.cierreTitulo} bajada={MODULOS_PAG.cierreBajada} />
    </>
  );
}
