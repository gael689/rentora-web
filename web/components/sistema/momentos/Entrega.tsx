/* La entrega — `CheckoutModal.tsx`, "Entregar el vehículo".
 *
 * Lo que cambió, y lo que se ve: **la limpieza se elige con tres botones grandes** (Limpio en
 * verde, Sucio en ámbar, Lavado profundo en rojo) y el elegido crece y se pinta de su color; el
 * combustible también se toca, no se escribe. Se sacaron del modal "¿firmó el contrato?",
 * "cobrar ahora" y "se está entregando ahora": la entrega registra el estado del auto y nada más.
 * Si se cobra algo, es un cargo opcional y exige un motivo. */

import { COMBUSTIBLE, LIMPIEZA, C } from '@/lib/sistema/dominio';
import s from '../sistema.module.css';

export default function Entrega() {
  return (
    <div className={s.telon}>
      <div className={s.hoja}>
        <header className={s.hojaCabeza}>
          <span className={s.apilado}>
            <span className={s.hojaTitulo}>Entregar el vehículo</span>
            <span className={s.secundario}>Hilux SRV · AF 345 KL · Obras del Sur</span>
          </span>
          <span className={s.secundario}>Reserva #1050</span>
        </header>

        <div className={s.hojaCuerpo}>
          <div className={s.filaCampos}>
            <label className={s.campo}>
              <span className={s.etiqueta}>Fecha *</span>
              <span className={s.control}>12/06/2026</span>
            </label>
            <label className={s.campo}>
              <span className={s.etiqueta}>Hora *</span>
              <span className={s.control}>08:50</span>
            </label>
          </div>

          <label className={s.campo}>
            <span className={s.etiqueta}>Kilometraje</span>
            <span className={s.control}>88.940</span>
          </label>

          <div className={s.campo}>
            <span className={s.etiqueta}>Nivel de combustible *</span>
            <span className={s.combustible}>
              {COMBUSTIBLE.map((c) => {
                const elegido = c === '¾';
                return (
                  <span
                    key={c}
                    className={s.combustibleBoton}
                    style={elegido ? { background: C.primary, borderColor: C.primary, color: '#fff' } : undefined}
                  >
                    {c}
                  </span>
                );
              })}
            </span>
          </div>

          <div className={s.campo}>
            <span className={s.etiqueta}>Estado de limpieza</span>
            <span className={s.limpieza}>
              {LIMPIEZA.map((l) => {
                const elegido = l.key === 'limpio';
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
          </div>

          <label className={s.campo}>
            <span className={s.etiqueta}>Estado del vehículo</span>
            <span className={`${s.control} ${s.controlVacio}`}>Sin daños nuevos</span>
          </label>

          <label className={s.campo}>
            <span className={s.etiqueta}>Observaciones</span>
            <span className={`${s.control} ${s.controlVacio}`} style={{ minHeight: 48, alignItems: 'flex-start' }}>
              Cualquier detalle de la entrega
            </span>
          </label>

          <div className={s.filaCampos}>
            <label className={s.campo}>
              <span className={s.etiqueta}>Cargo (opcional)</span>
              <span className={`${s.control} ${s.controlVacio}`}>$ 0</span>
            </label>
            <label className={s.campo}>
              <span className={s.etiqueta}>Motivo (obligatorio si hay cargo)</span>
              <span className={`${s.control} ${s.controlVacio}`}>Qué se cobra y por qué</span>
            </label>
          </div>
        </div>

        <footer className={s.hojaPie}>
          <span className={s.secundario}>Queda registrado cómo sale el auto: combustible, limpieza y estado.</span>
          <span className={s.acciones}>
            <span className={s.boton}>Cancelar</span>
            <span className={`${s.boton} ${s.botonPrimario}`}>Entregar el vehículo</span>
          </span>
        </footer>
      </div>
    </div>
  );
}
