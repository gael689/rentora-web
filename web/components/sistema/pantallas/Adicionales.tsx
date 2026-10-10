/* Adicionales — `/adicionales`.
 *
 * Réplica de `pages/adicionales/AdicionalesPage.tsx`.
 *
 * Dos familias con gramática distinta, y esa distinción es toda la pantalla:
 *
 * - **Cobertura: se elige una.** Es lo que impide que el mostrador le venda dos coberturas al
 *   mismo cliente, que además es plata que después hay que devolver.
 * - **Extra: se eligen varios**, cada uno con su tope por reserva. Tres conductores adicionales
 *   sí; cuatro sillas de bebé, no.
 *
 * Y el código es inmutable —"no se puede cambiar después"— porque es lo que ata el adicional a
 * los contratos ya emitidos. Si el código pudiera cambiar, un contrato de hace un año dejaría de
 * decir qué se le cobró. */

import { pesos } from '@/lib/sistema/dominio';
import { ADICIONALES } from '@/lib/sistema/valle';
import { Badge } from '../primitivas';
import Icono from '../Icono';
import s from '../sistema.module.css';

const COBERTURAS = ADICIONALES.filter((a) => a.familia === 'cobertura');
const EXTRAS = ADICIONALES.filter((a) => a.familia === 'extra');

function Tabla({ filas, familia }: { filas: typeof ADICIONALES; familia: string }) {
  return (
    <table className={s.tabla}>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Código</th>
          <th className={s.numero}>Precio</th>
          <th>Se cobra</th>
          <th className={s.numero}>Máx. por reserva</th>
        </tr>
      </thead>
      <tbody>
        {filas.map((a) => (
          <tr key={a.codigo}>
            <td className={s.fuerte}>{a.nombre}</td>
            <td className={s.secundario}>{a.codigo}</td>
            <td className={s.numero}>{a.precio === 0 ? 'Incluido' : pesos(a.precio)}</td>
            <td className={s.secundario}>{a.cobro}</td>
            <td className={s.numero}>{familia === 'cobertura' ? '1' : a.tope}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Adicionales() {
  return (
    <>
      <div className={s.barraTitulo}>
        <h4 className={s.titulo}>Adicionales</h4>
        <div className={s.acciones}>
          <span className={s.ayuda}>El código no se puede cambiar después</span>
          <span className={`${s.boton} ${s.botonPrimario}`}>
            <Icono nombre="mas" tam={13} /> Nuevo adicional
          </span>
        </div>
      </div>

      <div className={s.filas}>
        <div className={`${s.tarjeta} ${s.scroll}`}>
          <header className={s.tarjetaCabeza}>
            <span>
              Cobertura <Badge tono="info">se elige una</Badge>
            </span>
            <span className={s.secundario}>Cada una dice a cuánto baja la franquicia</span>
          </header>
          <Tabla filas={COBERTURAS} familia="cobertura" />
        </div>

        <div className={`${s.tarjeta} ${s.scroll}`}>
          <header className={s.tarjetaCabeza}>
            <span>
              Extras <Badge tono="success">se eligen varios</Badge>
            </span>
            <span className={s.secundario}>Con tope por reserva</span>
          </header>
          <Tabla filas={EXTRAS} familia="extra" />
        </div>
      </div>
    </>
  );
}
