/* El momento de la devolución — `CheckinModal.tsx`.
 *
 * La escena más vendedora del sistema entero, porque es la discusión que todo mostrador tuvo
 * cien veces: devolvió tarde, ¿le cobrás?
 *
 * Los cuarenta minutos no son un número inventado para la pieza: son `GRACE_PERIOD_MINUTES` en
 * `frontend/src/lib/constants.ts`. Y el default de que la nafta faltante vaya como gasto del
 * vehículo —con "cobrarle al cliente" marcado como caso excepcional— está escrito así, con esas
 * palabras, en el modal de verdad. */

import { pesos, LIMPIEZA, C } from '@/lib/sistema/dominio';
import Icono from '../Icono';
import s from '../sistema.module.css';

export default function Devolucion() {
  return (
    <div className={s.telon}>
      <div className={`${s.hoja} ${s.hojaAncha}`}>
        <header className={s.hojaCabeza}>
          <span className={s.hojaTitulo}>Registrar la devolución</span>
          <span className={s.secundario}>Amarok V6 · AJ 234 QR · Vialidad del Valle SRL</span>
        </header>

        <div className={s.hojaCuerpo}>
          <div className={s.filaCampos}>
            <label className={s.campo}>
              <span className={s.etiqueta}>Fecha *</span>
              <span className={s.control}>12/06/2026</span>
            </label>
            <label className={s.campo}>
              <span className={s.etiqueta}>Hora *</span>
              <span className={s.control}>09:10</span>
            </label>
          </div>

          {/* El corazón de la pantalla. */}
          <div
            className={s.destacado}
            style={{ background: '#FEF3C7', borderColor: '#B45309', color: '#78350F' }}
          >
            <span className={s.apilado}>
              <b>Cargo por late check-in</b>
              <span style={{ fontSize: 11 }}>
                Tenía que volver a las 07:30 y volvió 09:10. De 1 h 40 min de atraso, 40 son de gracia.
              </span>
            </span>
            <span className={s.apilado} style={{ alignItems: 'flex-end' }}>
              <span className={s.destacadoCifra}>{pesos(28_000)}</span>
              <span style={{ fontSize: 11 }}>1 hora excedida × {pesos(28_000)}</span>
            </span>
          </div>

          <div className={s.filaCampos}>
            <div className={s.campo}>
              <span className={s.etiqueta}>Combustible</span>
              <span className={s.control}>
                Volvió con 1/2 · salió con 3/4 <Icono nombre="abajo" tam={12} />
              </span>
              <span className={`${s.opcion} ${s.opcionElegida}`}>
                <span className={`${s.casilla} ${s.casillaMarcada} ${s.redondel}`}>
                  <Icono nombre="tilde" tam={9} />
                </span>
                Gasto del vehículo · {pesos(18_400)}
              </span>
              <span className={s.opcion}>
                <span className={`${s.casilla} ${s.redondel}`} />
                Caso excepcional: cobrarle al cliente en vez de gasto del vehículo
              </span>
            </div>

            <div className={s.campo}>
              <span className={s.etiqueta}>Estado de limpieza</span>
              <span className={s.limpieza}>
                {LIMPIEZA.map((l) => {
                  const elegido = l.key === 'sucio';
                  return (
                    <span
                      key={l.key}
                      className={`${s.limpiezaBoton} ${elegido ? s.limpiezaElegido : ''}`}
                      style={elegido ? { background: C[l.tono], borderColor: C[l.tono] } : undefined}
                    >
                      {l.label}
                    </span>
                  );
                })}
              </span>
              <span className={s.etiqueta} style={{ marginTop: 6 }}>
                Daños
              </span>
              <span className={s.control}>
                1 cargado · paragolpes trasero, con 3 fotos
              </span>
            </div>
          </div>

          {/* Los cargos salen de la garantia retenida, no del saldo del alquiler. La nafta no
              figura: se cargo como gasto del vehiculo, asi que el cliente no la paga. */}
          <div className={s.semaforo}>
            <p className={s.semaforoItem} style={{ justifyContent: 'space-between' }}>
              <b>Resolver garantía</b>
              <span className={s.secundario}>Garantía del alquiler · retención {pesos(480_000)}</span>
            </p>
            <p className={s.semaforoItem} style={{ justifyContent: 'space-between' }}>
              <span>Se descuentan: late check-in y daño</span>
              <span className={s.numero}>− {pesos(268_000)}</span>
            </p>
            <p className={s.semaforoItem} style={{ justifyContent: 'space-between' }}>
              <span>Monto a devolver</span>
              <b className={s.numero}>{pesos(212_000)}</b>
            </p>
          </div>

          <div className={s.sumario}>
            <p className={s.etiqueta}>Resumen financiero</p>
            <p className={s.sumarioFila}>
              <span>Precio del alquiler · 5 días</span>
              <span className={s.numero}>{pesos(560_000)}</span>
            </p>
            <p className={s.sumarioFila}>
              <span>Anticipo pagado</span>
              <span className={s.numero}>− {pesos(168_000)}</span>
            </p>
            <p className={s.sumarioFila}>
              <span>Combustible faltante</span>
              <span className={s.secundario}>Gasto del vehículo · no se le cobra</span>
            </p>
            <p className={`${s.sumarioFila} ${s.sumarioTotal}`}>
              <span>Saldo a cobrar</span>
              <span className={s.numero}>{pesos(392_000)}</span>
            </p>
          </div>
        </div>

        <footer className={s.hojaPie}>
          <span className={s.secundario}>
            El recibo sale numerado y el movimiento entra en la caja del día.
          </span>
          <span className={s.acciones}>
            <span className={s.boton}>Cancelar</span>
            <span className={`${s.boton} ${s.botonPrimario}`}>Registrar la devolución</span>
          </span>
        </footer>
      </div>
    </div>
  );
}
