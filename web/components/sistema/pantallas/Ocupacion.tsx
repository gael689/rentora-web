/* Ocupación — `/ocupacion`.
 *
 * La pantalla insignia. Réplica de `pages/ocupacion/OcupacionPage.tsx`.
 *
 * Lo que tiene que quedar claro de un vistazo, porque es literalmente el argumento del titular
 * de la home: **una fila por unidad**. La unidad ocupada ya está tomada para ese rango, así que
 * no hay forma de vender dos veces el mismo auto para el mismo fin de semana.
 *
 * Tres cosas que parecen detalles y no lo son:
 *
 * 1. **Las dos reservas contorneadas no ocupan.** Una `pendiente` todavía no toma el auto, y en
 *    `pendiente_pago` el cupo lo sostiene el hold, no la reserva. Si se pintaran sólidas, la
 *    grilla mentiría: una celda parecería tomada estando libre. Invisibles tampoco pueden ser,
 *    o el mostrador vende encima de una venta en curso.
 * 2. **Los bloqueos van rayados**, no en otro color: el auto no está alquilado, está fuera de
 *    circulación, y eso es una categoría distinta.
 * 3. **La fila "Por asignar" es una sola fila para N reservas.** Una reserva web pagada entra
 *    confirmada pero sin auto: el cupo dice que entra, el calendario dice en cuál. */

import {
  EVENTO as EVENTO_BASE,
  LEYENDA_OCUPACION,
  ESTADO_RESERVA_LABEL,
  NUEVA_OPERACION,
  type ColorEvento,
  type EstadoReserva,
} from '@/lib/sistema/dominio';
import { DIAS, FINDE, FLOTA, EVENTOS, POR_ASIGNAR, RELOJ, PANEL_DEL_DIA } from '@/lib/sistema/valle';
import Icono from '../Icono';
import s from '../sistema.module.css';

const MOLDE = { '--dias': DIAS.length } as React.CSSProperties;

/* Los colores de las barras subieron un tono el 27/09 (rellenos 200 y 600, bordes 600 y 800).
 * Se pisan acá, arriba de los del dominio, para que la réplica no dependa de cuál versión de
 * `dominio.ts` esté: los bloqueos rayados quedan como estaban. */
const EVENTO: Record<string, ColorEvento> = {
  ...EVENTO_BASE,
  pendiente: { fondo: '#FDE68A', borde: '#D97706', texto: '#451A03', punteado: true },
  pendiente_pago: { fondo: '#DDD6FE', borde: '#7C3AED', texto: '#2E1065', punteado: true },
  confirmada: { fondo: '#2563EB', borde: '#1E40AF', texto: '#FFFFFF' },
  activa: { fondo: '#059669', borde: '#065F46', texto: '#FFFFFF' },
  vencida: { fondo: '#DC2626', borde: '#991B1B', texto: '#FFFFFF', late: true },
  finalizada: { fondo: '#64748B', borde: '#334155', texto: '#FFFFFF' },
};

function Bloque({ estado, texto, ini, dur }: { estado: string; texto: string; ini: number; dur: number }) {
  const c = EVENTO[estado] ?? EVENTO.finalizada;
  return (
    <span
      className={`${s.evento} ${c.punteado ? s.eventoPunteado : ''} ${c.rayado ? s.rayado : ''} ${
        c.tachado ? s.eventoTachado : ''
      } ${c.late ? s.late : ''}`}
      style={{
        gridColumn: `${ini + 2} / span ${dur}`,
        gridRow: 1,
        background: c.fondo,
        borderColor: c.borde,
        color: c.texto,
      }}
    >
      {texto}
    </span>
  );
}

export function OcupacionBase({ conMenu = false }: { conMenu?: boolean }) {
  const pendientes = EVENTOS.filter((e) => e.estado === 'pendiente' || e.estado === 'pendiente_pago').length;
  return (
    <>
      {/* Una sola barra, de izquierda a derecha: fecha, Hoy (resaltado), vista, leyenda y, a la
          derecha, los filtros de la vista de timeline y "Nueva operación". Ya no hay título. */}
      <div className={s.filtros}>
        <span className={s.selector}>
          <Icono nombre="izquierda" tam={13} />
          <b>
            {RELOJ.mes} {RELOJ.anio}
          </b>
          <Icono nombre="derecha" tam={13} />
        </span>
        <span className={`${s.boton} ${s.botonHoy}`}>Hoy</span>
        <span className={s.selector}>
          <Icono nombre="calendario" tam={13} /> Ir a fecha
        </span>
        <span className={s.grupoBotones}>
          <span className={s.boton} title="Anual">
            <Icono nombre="rango" tam={13} />
          </span>
          <span className={`${s.boton} ${s.grupoBotonActivo}`} title="Timeline">
            <Icono nombre="filas" tam={13} />
          </span>
          <span className={s.boton} title="Agenda">
            <Icono nombre="calendario" tam={13} />
          </span>
        </span>

        {/* Una sola leyenda para las tres vistas. Los cinco motivos de bloqueo se resumen en un
            único "Bloqueado" con el mismo rayado. */}
        <span className={s.leyenda} style={{ marginLeft: 6, gap: 10 }}>
          {LEYENDA_OCUPACION.map((estado) => {
            const c = EVENTO[estado];
            return (
              <span key={estado} className={s.leyendaItem}>
                <span
                  className={`${s.muestra} ${c.punteado ? s.eventoPunteado : ''}`}
                  style={{ background: c.fondo, borderColor: c.borde, width: 14, height: 14 }}
                />
                {ESTADO_RESERVA_LABEL[estado as EstadoReserva]}
              </span>
            );
          })}
          <span className={s.leyendaItem}>
            <span
              className={`${s.muestra} ${s.rayado}`}
              style={{ background: '#475569', borderColor: '#334155', color: '#fff', width: 14, height: 14 }}
            >
              <Icono nombre="prohibido" tam={9} />
            </span>
            Bloqueado
          </span>
        </span>

        <span className={s.derecha}>
          <span className={s.selector}>
            Todas las categorías <Icono nombre="abajo" tam={12} />
          </span>
          <span className={s.boton}>Por categoría</span>
          <span className={s.grupoBotones}>
            <span className={`${s.boton} ${s.grupoBotonActivo}`}>Todas</span>
            <span className={s.boton}>Web</span>
            <span className={s.boton}>Mostrador</span>
          </span>
          <span className={s.grupoBotones}>
            <span className={s.boton}>Compacto</span>
            <span className={`${s.boton} ${s.grupoBotonActivo}`}>Normal</span>
            <span className={s.boton}>Amplio</span>
          </span>
          <span className={`${s.boton} ${s.botonPrimario}`}>
            <Icono nombre="mas" tam={13} /> Nueva operación
          </span>
        </span>
      </div>

      {conMenu && (
        <div className={s.menuOp}>
          {NUEVA_OPERACION.map((o) => (
            <div key={o.titulo} className={s.menuOpItem}>
              <span className={s.menuOpIcono}>
                <Icono nombre={o.icono === 'calendario' ? 'calendarioMas' : o.icono} tam={16} />
              </span>
              <span className={s.apilado}>
                <b>{o.titulo}</b>
                <span className={s.secundario}>{o.bajada}</span>
              </span>
            </div>
          ))}
        </div>
      )}

      <div className={s.calendario}>
        <div className={s.calendarioScroll}>
          {/* Encabezado */}
          <div className={`${s.filaCal} ${s.filaCabeza}`} style={MOLDE}>
            <span className={s.celdaUnidad} style={{ gridColumn: 1, gridRow: 1 }}>
              <b className={s.secundario}>UNIDAD</b>
            </span>
            {DIAS.map((d, i) => (
              <span
                key={d}
                className={`${s.cabezaDia} ${FINDE.includes(i) ? s.cabezaFinde : ''} ${i === 0 ? s.cabezaHoy : ''}`}
                style={{ gridColumn: i + 2, gridRow: 1 }}
              >
                {d}
              </span>
            ))}
          </div>

          {/* Por asignar */}
          <div className={`${s.filaCal} ${s.filaPorAsignar}`} style={MOLDE}>
            <span className={s.celdaUnidad} style={{ gridColumn: 1, gridRow: 1 }}>
              <span className={s.porAsignarRotulo}>
                <span>Por asignar</span>
                <span className={s.secundario}>{POR_ASIGNAR.length} sin unidad</span>
              </span>
            </span>
            {DIAS.map((d, i) => (
              <span
                key={d}
                className={`${s.celdaDia} ${FINDE.includes(i) ? s.celdaFinde : ''} ${i === 0 ? s.celdaHoy : ''}`}
                style={{ gridColumn: i + 2, gridRow: 1 }}
              />
            ))}
            {POR_ASIGNAR.map((e) => (
              <Bloque key={e.cliente} estado={e.estado} texto={e.cliente} ini={e.ini} dur={e.dur} />
            ))}
          </div>

          {/* Una fila por unidad */}
          {FLOTA.map((u, fila) => (
            <div key={u.patente} className={s.filaCal} style={MOLDE}>
              <span className={s.celdaUnidad} style={{ gridColumn: 1, gridRow: 1 }}>
                <b>{u.modelo}</b>
                <span className={s.secundario}>{u.patente}</span>
              </span>
              {DIAS.map((d, i) => (
                <span
                  key={d}
                  className={`${s.celdaDia} ${FINDE.includes(i) ? s.celdaFinde : ''} ${i === 0 ? s.celdaHoy : ''}`}
                  style={{ gridColumn: i + 2, gridRow: 1 }}
                />
              ))}
              {EVENTOS.filter((e) => e.unidad === fila).map((e) => (
                <Bloque
                  key={`${e.cliente}-${e.ini}`}
                  estado={e.estado}
                  texto={e.cliente}
                  ini={e.ini}
                  dur={e.dur}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* El panel Hoy, colapsado debajo del calendario. */}
      <div className={s.panelHoy}>
        <span>
          Salidas · Hoy <b>{PANEL_DEL_DIA.salen.length}</b>
        </span>
        <span>
          Devoluciones · Hoy <b>{PANEL_DEL_DIA.vuelven.length}</b>
        </span>
        <span>
          Pendientes <b>{pendientes}</b>
        </span>
        <span className={s.derecha}>
          <Icono nombre="arriba" tam={14} />
        </span>
      </div>
    </>
  );
}

export default function Ocupacion() {
  return <OcupacionBase />;
}
