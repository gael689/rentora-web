/* El alta de reserva, paso 4 de 6 — `ReservaModal.tsx`.
 *
 * De los seis pasos se replica el cuarto, que es donde están las dos cosas que hay que mostrar:
 * el cupo real de esas fechas, calculado sobre la flota, y el precio que trae el motor ya
 * armado. Los otros cinco se cuentan en el texto de la página.
 *
 * Los títulos de los pasos son los de `PASOS_WIZARD`, tal cual. Son preguntas y no nombres de
 * campo, que es lo que hace que alguien que nunca usó el sistema pueda cargar una reserva. */

import { PASOS_RESERVA, pesos } from '@/lib/sistema/dominio';
import Icono from '../Icono';
import s from '../sistema.module.css';

const ACTIVO = 4;

export default function Alta() {
  return (
    <div className={s.telon}>
      <div className={`${s.hoja} ${s.hojaAncha}`}>
        <header className={s.hojaCabeza}>
          <span className={s.apilado}>
            <span className={s.hojaTitulo}>Nueva reserva</span>
            <span className={s.secundario}>
              Paso {ACTIVO} de 6 · {PASOS_RESERVA[ACTIVO - 1].ayuda}
            </span>
          </span>
          <span className={s.secundario}>F. Ledesma · 19/06 → 22/06</span>
        </header>

        <div className={s.hojaCuerpo}>
          <div className={s.pasos}>
            {PASOS_RESERVA.map((p) => (
              <span
                key={p.n}
                className={`${s.paso} ${p.n === ACTIVO ? s.pasoActivo : ''} ${
                  p.n < ACTIVO ? s.pasoHecho : ''
                }`}
              >
                <span className={`${s.pasoN} ${p.n === ACTIVO ? s.pasoNActivo : ''}`}>
                  {p.n < ACTIVO ? <Icono nombre="tilde" tam={9} /> : p.n}
                </span>
                {p.titulo}
              </span>
            ))}
          </div>

          {/* El cupo. Sin esto el paso 3 vendía a ciegas. */}
          <div
            className={s.destacado}
            style={{ background: '#E2F1F1', borderColor: '#12959B', color: '#0B5D62' }}
          >
            <span className={s.apilado}>
              <b>Sedán C · del 19/06 al 22/06</b>
              <span style={{ fontSize: 11 }}>
                Cupo calculado sobre la flota real para esas fechas, no sobre el total de autos.
              </span>
            </span>
            <span className={s.apilado} style={{ alignItems: 'flex-end' }}>
              <span className={s.destacadoCifra}>1</span>
              <span style={{ fontSize: 11 }}>unidad disponible</span>
            </span>
          </div>

          <div className={s.filaCampos}>
            <label className={s.campo}>
              <span className={s.etiqueta}>Precio x día *</span>
              <span className={s.control}>
                {pesos(67_712)}
                <span className={s.secundario}>sugerido por el motor</span>
              </span>
            </label>
            <label className={s.campo}>
              <span className={s.etiqueta}>Precio total *</span>
              <span className={s.control}>{pesos(270_848)}</span>
            </label>
          </div>

          <div className={s.sumario}>
            <p className={s.etiqueta}>De dónde sale ese precio</p>
            <p className={s.sumarioFila}>
              <span>Tarifa base · Sedán C</span>
              <span className={s.numero}>{pesos(64_000)}</span>
            </p>
            <p className={s.sumarioFila}>
              <span>Capa 1 · Temporada media (15/06 al 14/12)</span>
              <span className={s.numero}>× 1,15</span>
            </p>
            <p className={s.sumarioFila}>
              <span>Capa 2 · Sin fecha especial</span>
              <span className={s.numero}>—</span>
            </p>
            <p className={s.sumarioFila}>
              <span>Capa 3 · 3 a 6 días</span>
              <span className={s.numero}>× 0,92</span>
            </p>
            <p className={`${s.sumarioFila} ${s.sumarioTotal}`}>
              <span>Precio por día · precio único</span>
              <span className={s.numero}>{pesos(67_712)}</span>
            </p>
          </div>

          <div>
            <p className={s.etiqueta} style={{ marginBottom: 6 }}>
              Adicionales
            </p>
            <div className={s.filaCampos}>
              <span className={`${s.opcion} ${s.opcionElegida}`}>
                <span className={`${s.casilla} ${s.casillaMarcada} ${s.redondel}`}>
                  <Icono nombre="tilde" tam={9} />
                </span>
                <span className={s.apilado}>
                  <b>Cobertura ampliada</b>
                  <span className={s.secundario}>
                    Se elige una · {pesos(14_500)} por día · baja la franquicia a {pesos(560_000)}
                  </span>
                </span>
              </span>
              <span className={`${s.opcion} ${s.opcionElegida}`}>
                <span className={`${s.casilla} ${s.casillaMarcada}`}>
                  <Icono nombre="tilde" tam={9} />
                </span>
                <span className={s.apilado}>
                  <b>Conductor adicional</b>
                  <span className={s.secundario}>
                    Se eligen varios · {pesos(5_600)} por día · hasta 3
                  </span>
                </span>
              </span>
            </div>
          </div>
        </div>

        <footer className={s.hojaPie}>
          <span className={s.secundario}>
            El paso 6 muestra todo junto, con el semáforo de lo que falta, antes de guardar.
          </span>
          <span className={s.acciones}>
            <span className={s.boton}>Volver</span>
            <span className={`${s.boton} ${s.botonPrimario}`}>Siguiente</span>
          </span>
        </footer>
      </div>
    </div>
  );
}
