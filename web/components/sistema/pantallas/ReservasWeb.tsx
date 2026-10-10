/* Bandeja de la web — `/reservas-web`.
 *
 * Réplica de `pages/reservas/ReservasWebPage.tsx`.
 *
 * Es el mismo listado de reservas con el filtro de canal en "Web". La entrada aparte del menú se
 * sacó justamente porque tenerla hacía que una reserva web confirmada desapareciera de la vista
 * al salir de esta bandeja — pero la ruta sigue existiendo porque hay links a ella.
 *
 * Lo que esta pantalla muestra y el listado general no: **la reserva web pagada entra confirmada
 * pero sin auto asignado.** El cupo dice que entra; el calendario dice en cuál. Esas dos filas
 * son las que aparecen en "Por asignar" del calendario de ocupación. */

import { ESTADO_RESERVA_LABEL, ESTADO_RESERVA_TONO, pesos, type EstadoReserva } from '@/lib/sistema/dominio';
import { RESERVAS } from '@/lib/sistema/valle';
import { Badge, Cifra } from '../primitivas';
import Icono from '../Icono';
import s from '../sistema.module.css';

const WEB = RESERVAS.filter((r) => r.canal === 'web');

export default function ReservasWeb() {
  const sinAsignar = WEB.filter((r) => r.unidad === 'Sin asignar').length;
  const esperando = WEB.filter((r) => r.estado === 'pendiente_pago').length;
  const total = WEB.reduce((a, r) => a + r.precio, 0);

  return (
    <>
      <div className={s.barraTitulo}>
        <h4 className={s.titulo}>Reservas web</h4>
        <div className={s.acciones}>
          <span className={s.selector}>
            Canal: web <Icono nombre="abajo" tam={12} />
          </span>
          <span className={s.boton}>Ir a la bandeja general</span>
        </div>
      </div>

      <div className={s.cifras}>
        <Cifra rotulo="Entraron por la web" valor={String(WEB.length)} pie="Este período" />
        <Cifra rotulo="Sin unidad asignada" valor={String(sinAsignar)} tono="warning" />
        <Cifra rotulo="Esperando el pago" valor={String(esperando)} tono="inactivo" />
        <Cifra rotulo="Facturado por la web" valor={pesos(total)} tono="success" />
      </div>

      <div className={`${s.tarjeta} ${s.scroll}`}>
        <header className={s.tarjetaCabeza}>
          <span>Lo que entró por el sitio</span>
          <span className={s.secundario}>
            Una reserva web pagada entra confirmada pero sin auto: el cupo dice que entra, el
            calendario dice en cuál.
          </span>
        </header>
        <table className={s.tabla}>
          <thead>
            <tr>
              <th>Reserva</th>
              <th>Cliente</th>
              <th>Categoría o unidad</th>
              <th>Fechas</th>
              <th className={s.numero}>Precio</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {WEB.map((r) => {
              const estado = r.estado as EstadoReserva;
              return (
                <tr key={r.id}>
                  <td className={s.fuerte}>{r.id}</td>
                  <td>{r.cliente}</td>
                  <td>
                    <span className={s.apilado}>
                      <span>{r.unidad}</span>
                      <span className={s.secundario}>{r.patente}</span>
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
                    <span className={s.semaforoItem}>
                      <Badge tono={ESTADO_RESERVA_TONO[estado]}>{ESTADO_RESERVA_LABEL[estado]}</Badge>
                      {r.unidad === 'Sin asignar' && <Badge tono="warning">Falta unidad</Badge>}
                    </span>
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
