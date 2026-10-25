/* La web pública de la rentadora — el checkout de 4 pasos.
 *
 * Réplica de `rentago-system/web-reservas/`, que es la otra mitad de lo que se entrega y la que ningún
 * competidor incluye: venden el software y te dejan el sitio por tu cuenta.
 *
 * No lleva el marco de la aplicación: esto no es el panel, es el sitio que ve el cliente de la
 * rentadora. Por eso tiene su propio encabezado, con el nombre de la rentadora y no el de
 * RentaGo — cada instancia va con la marca de su dueño.
 *
 * Los cuatro pasos y los rótulos son los del sitio real: `Paso2Adicionales`, `Paso3Datos`,
 * `Paso4Pago` y `ResumenReserva`. */

import { pesos } from '@/lib/sistema/dominio';
import { RENTADORA } from '@/lib/sistema/valle';
import Icono from '../Icono';
import s from '../sistema.module.css';
import w from './web.module.css';

const PASOS = ['Fechas y categoría', 'Adicionales', 'Tus datos', 'Confirmá tu reserva'];
const ACTIVO = 4;

export default function WebPublica() {
  return (
    <div className={w.sitio}>
      <header className={w.cabecera}>
        <span className={w.logo}>{RENTADORA.nombre}</span>
        <nav className={w.menu}>
          <span>Flota</span>
          <span>Preguntas frecuentes</span>
          <span>Contacto</span>
          <span className={w.telefono}>Reservar</span>
        </nav>
      </header>

      <div className={w.cuerpo}>
        <div className={w.pasosWeb}>
          {PASOS.map((p, i) => (
            <span key={p} className={`${w.pasoWeb} ${i + 1 === ACTIVO ? w.pasoWebActivo : ''}`}>
              <span className={w.pasoWebN}>{i + 1}</span>
              {p}
            </span>
          ))}
        </div>

        <div className={w.columnas}>
          <section className={w.principal}>
            <h4 className={w.titulo}>Confirmá tu reserva</h4>

            {/* El cupo retenido. Es lo que evita que dos personas paguen la misma unidad. */}
            <div className={w.retencion}>
              <Icono nombre="reloj" tam={14} />
              <span>
                <b>Te guardamos el auto por 19:42</b> mientras completás el pago. Nadie más puede
                reservar esa unidad en esas fechas.
              </span>
            </div>

            <div className={w.medios}>
              <span className={`${w.medio} ${w.medioElegido}`}>
                <span className={w.radio} />
                <span className={s.apilado}>
                  <b>Mercado Pago</b>
                  <span className={w.chico}>Tarjeta, débito o dinero en cuenta</span>
                </span>
              </span>
              <span className={w.medio}>
                <span className={w.radio} />
                <span className={s.apilado}>
                  <b>Transferencia bancaria</b>
                  <span className={w.chico}>Te mandamos el CBU por mail</span>
                </span>
              </span>
            </div>

            <div className={w.totales}>
              <p className={w.totalFila}>
                <span>Total de la reserva</span>
                <b>{pesos(257_304)}</b>
              </p>
              <p className={w.totalFila}>
                <span>Adelantás ahora</span>
                <b>{pesos(77_191)}</b>
              </p>
              <p className={`${w.totalFila} ${w.totalChico}`}>
                <span>Saldo al retirar el vehículo</span>
                <span>{pesos(180_113)}</span>
              </p>
            </div>

            <span className={w.cta}>Pagar y confirmar la reserva</span>
          </section>

          <aside className={w.resumen}>
            <p className={w.resumenTitulo}>Tu reserva</p>
            <div className={w.auto}>
              <span className={w.autoFoto} aria-hidden="true" />
              <span className={s.apilado}>
                <b>Sedán C</b>
                <span className={w.chico}>Corolla XEI o similar</span>
              </span>
            </div>
            <dl className={w.datos}>
              <div>
                <dt>Retira</dt>
                <dd>Vie 19/06 · 10:00 · Casa central</dd>
              </div>
              <div>
                <dt>Devuelve</dt>
                <dd>Lun 22/06 · 10:00 · Casa central</dd>
              </div>
              <div>
                <dt>Duración</dt>
                <dd>4 días</dd>
              </div>
              <div>
                <dt>Cobertura ampliada</dt>
                <dd>Franquicia {pesos(560_000)}</dd>
              </div>
              <div>
                <dt>Conductor adicional</dt>
                <dd>1</dd>
              </div>
            </dl>
            <p className={w.chico}>
              El cupo sale de la misma flota que ve el mostrador. Si el auto no está, no aparece.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
