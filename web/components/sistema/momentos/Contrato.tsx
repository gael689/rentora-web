/* El contrato, la franquicia y los caminos de firma — `ContratoPanel.tsx`.
 *
 * Lo que se ve acá es lo que el panel de contrato hace después de crear la reserva:
 *
 * - **Se genera junto con la franquicia**, el documento que firma el cliente por la franquicia
 *   de la categoría, con el deudor elegible (empresa, representante o un conductor). No es la
 *   garantía: es otra cosa.
 * - **Las cláusulas se revisan y se editan antes de generar**; lo cambiado vale sólo para este
 *   contrato y queda marcado.
 * - **Tres caminos de firma**: un link remoto, en pantalla con el dedo o el mouse, o en papel y
 *   se sube el firmado. El tercero es el que más se subestima: media Argentina firma en papel.
 * - **"Regenerar contrato"** pide un motivo; el anterior queda anulado. */

import { pesos } from '@/lib/sistema/dominio';
import { CATEGORIAS, CLIENTES } from '@/lib/sistema/valle';
import { CLAUSULAS_EDITABLES } from '@/lib/sistema/valle-extra';
import Icono from '../Icono';
import s from '../sistema.module.css';

const FRANQUICIA = CATEGORIAS.find((c) => c.key === 'pickup')!.franquicia;
const REPRESENTANTE = CLIENTES.find((c) => c.nombre === 'Obras del Sur')?.representante;

export default function Contrato() {
  return (
    <div className={s.telon}>
      <div className={`${s.hoja} ${s.hojaAncha}`}>
        <header className={s.hojaCabeza}>
          <span className={s.apilado}>
            <span className={s.hojaTitulo}>Contrato C-2026-0913</span>
            <span className={s.secundario}>Obras del Sur · Hilux SRV · 12/06 → 17/06</span>
          </span>
          <span className={s.badge} style={{ background: '#E8F1FB', color: '#1B5FA8', borderColor: '#1B5FA840' }}>
            Clausulado versión 7
          </span>
        </header>

        <div className={s.hojaCuerpo}>
          <span className={`${s.opcion} ${s.opcionElegida}`}>
            <span className={`${s.casilla} ${s.casillaMarcada}`}>
              <Icono nombre="tilde" tam={9} />
            </span>
            <span className={s.apilado}>
              <b>Generar también la franquicia</b>
              <span className={s.secundario}>
                Monto de la franquicia {pesos(FRANQUICIA)} · precargado desde la categoría · Firma como
                deudor: {REPRESENTANTE ? `${REPRESENTANTE.nombre}, representante de Obras del Sur` : 'Obras del Sur'}
              </span>
            </span>
          </span>

          <div className={s.semaforo}>
            <p className={s.semaforoItem} style={{ justifyContent: 'space-between' }}>
              <b>Cláusulas del contrato</b>
              <span className={s.enlace}>Revisar o editar</span>
            </p>
            <p className={s.secundario}>2 cláusulas modificadas para este contrato. Se imprimen como siempre.</p>
            {CLAUSULAS_EDITABLES.filter((c) => c.modificada).map((c) => (
              <p key={c.n} className={s.semaforoItem} style={{ justifyContent: 'space-between' }}>
                <span>{c.n}</span>
                <span className={s.etAmbar}>Modificada</span>
              </p>
            ))}
          </div>

          <p className={s.etiqueta}>Cómo se firma</p>

          <span className={`${s.opcion} ${s.opcionElegida}`}>
            <span className={`${s.casilla} ${s.casillaMarcada} ${s.redondel}`}>
              <Icono nombre="tilde" tam={9} />
            </span>
            <span className={s.apilado}>
              <b>En pantalla</b>
              <span className={s.secundario}>Acá mismo, en el mostrador, con el dedo o el mouse.</span>
              <span className={s.lienzo} style={{ marginTop: 6 }}>
                Firmá acá
              </span>
            </span>
          </span>

          <div className={s.filaCampos}>
            <span className={s.opcion}>
              <span className={`${s.casilla} ${s.redondel}`} />
              <span className={s.apilado}>
                <b>Por un link remoto</b>
                <span className={s.secundario}>Firma desde su teléfono. El link se puede dar de baja.</span>
              </span>
            </span>
            <span className={s.opcion}>
              <span className={`${s.casilla} ${s.redondel}`} />
              <span className={s.apilado}>
                <b>En papel</b>
                <span className={s.secundario}>Firmó en papel · Subir el firmado en papel.</span>
              </span>
            </span>
          </div>

          <div className={s.sumario}>
            <p className={s.sumarioFila}>
              <span>Emitido</span>
              <span>12/06/2026 · 08:47 · atendido por el mostrador</span>
            </p>
            <p className={s.sumarioFila}>
              <span>Estado</span>
              <span>Franquicia sin firmar · contrato esperando firma</span>
            </p>
          </div>
        </div>

        <footer className={s.hojaPie}>
          <span className={s.secundario}>Regenerar pide un motivo y anula el anterior. Un contrato no se borra.</span>
          <span className={s.acciones}>
            <span className={s.boton}>Regenerar contrato</span>
            <span className={s.boton}>Generar link de firma</span>
            <span className={`${s.boton} ${s.botonPrimario}`}>Generar contrato y franquicia</span>
          </span>
        </footer>
      </div>
    </div>
  );
}
