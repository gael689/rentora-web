/* Reservas y Alquileres — `/reservas`.
 *
 * Réplica de `pages/reservas/ReservasList.tsx`. Las columnas son las columnas: Vehículo,
 * Cliente, Fechas, Precio, Estado y Acciones, con los dos filtros de arriba —Canal y Estado—
 * que es como el mostrador encuentra algo.
 *
 * La fila vencida late en rojo. No es un adorno: significa que la fecha de devolución pasó y el
 * auto no volvió, y es lo único de la pantalla que pide que alguien haga algo ahora. */

import { ESTADO_RESERVA_LABEL, ESTADO_RESERVA_TONO, pesos, type EstadoReserva } from '@/lib/sistema/dominio';
import { RESERVAS } from '@/lib/sistema/valle';
import { Badge } from '../primitivas';
import Icono from '../Icono';
import s from '../sistema.module.css';

export default function Reservas() {
  return (
    <>
      <div className={s.barraTitulo}>
        <h4 className={s.titulo}>Reservas y Alquileres</h4>
        <div className={s.acciones}>
          <span className={s.selector}>
            Canal: todos <Icono nombre="abajo" tam={12} />
          </span>
          <span className={s.selector}>
            Estado: todos <Icono nombre="abajo" tam={12} />
          </span>
          <span className={s.boton}>
            <Icono nombre="bajar" tam={13} /> CSV
          </span>
          <span className={`${s.boton} ${s.botonPrimario}`}>
            <Icono nombre="mas" tam={13} /> Nueva reserva
          </span>
        </div>
      </div>

      <div className={`${s.tarjeta} ${s.scroll}`}>
        <table className={s.tabla}>
          <thead>
            <tr>
              <th>Vehículo</th>
              <th>Cliente</th>
              <th>Fechas</th>
              <th className={s.numero}>Precio</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {RESERVAS.map((r) => {
              const estado = r.estado as EstadoReserva;
              return (
                <tr key={r.id}>
                  <td>
                    <span className={s.apilado}>
                      <b className={s.fuerte}>{r.unidad}</b>
                      <span className={s.secundario}>{r.patente}</span>
                    </span>
                  </td>
                  <td>
                    <span className={s.apilado}>
                      <span>{r.cliente}</span>
                      <span className={s.secundario}>
                        {r.id} · {r.canal === 'web' ? 'Web' : 'Mostrador'}
                      </span>
                    </span>
                  </td>
                  <td>
                    <span className={s.apilado}>
                      <span>
                        {r.desde} → {r.hasta}
                      </span>
                      <span className={s.secundario}>{r.dias} días</span>
                    </span>
                  </td>
                  <td className={s.numero}>{pesos(r.precio)}</td>
                  <td>
                    <Badge tono={ESTADO_RESERVA_TONO[estado]} late={estado === 'vencida'}>
                      {ESTADO_RESERVA_LABEL[estado]}
                    </Badge>
                  </td>
                  <td>
                    <span className={s.secundario}>{ACCION[estado] ?? 'Ver'}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* La acción que ofrece cada fila depende del estado, y eso es la mitad de por qué la pantalla
 * sirve: el que atiende no tiene que acordarse de cuál es el paso siguiente. */
const ACCION: Partial<Record<EstadoReserva, string>> = {
  vencida: 'Registrar devolución',
  activa: 'Registrar devolución',
  confirmada: 'Entregar el vehículo',
  pendiente: 'Confirmar',
  pendiente_pago: 'Ver el pago',
  finalizada: 'Ver contrato',
};
