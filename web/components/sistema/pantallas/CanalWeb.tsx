/* Canal web — `/canal-web`.
 *
 * Réplica de la pantalla que en el sistema es `ConfiguracionPage` con el corte `soloCanalWeb`.
 *
 * Separarla no es cosmético: la ventana de venta, el cupo que se libera a la web y los datos
 * bancarios se tocan pensando en el canal online, y estaban perdidos entre el CUIT de la empresa
 * y los plazos del excedente.
 *
 * Las tres perillas de arriba son las que deciden cuánto vende el sitio solo. La ventana de
 * anticipación es la más importante y la menos obvia: si se pone en cero, entra una reserva para
 * dentro de dos horas y no hay nadie que prepare el auto. */

import { CANAL_WEB } from '@/lib/sistema/valle';
import { MOTIVO_SOLICITUD_LABEL, MOTIVO_SOLICITUD_COLOR } from '@/lib/sistema/dominio';
import { BadgeColor, Cifra } from '../primitivas';
import Icono from '../Icono';
import s from '../sistema.module.css';

export default function CanalWeb() {
  return (
    <>
      <div className={s.barraTitulo}>
        <h4 className={s.titulo}>Cómo vende el sitio</h4>
        <div className={s.acciones}>
          <span className={s.boton}>Ver la web pública</span>
          <span className={`${s.boton} ${s.botonPrimario}`}>Guardar cambios</span>
        </div>
      </div>

      <div className={s.cifras}>
        <Cifra rotulo="Ventana de venta" valor="48 h" pie="Anticipación mínima" />
        <Cifra rotulo="Cupo liberado a la web" valor="60 %" pie="De la flota disponible" />
        <Cifra rotulo="Retención mientras paga" valor="20 min" tono="primary" />
        <Cifra rotulo="Medios de cobro" valor="2" pie="Mercado Pago y transferencia" />
      </div>

      <div className={s.dos}>
        <div className={s.tarjeta}>
          <header className={s.tarjetaCabeza}>
            <span>Parámetros del canal</span>
          </header>
          <div className={s.tarjetaCuerpo} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <label className={s.campo}>
              <span className={s.etiqueta}>Anticipación mínima</span>
              <span className={s.control}>{CANAL_WEB.ventanaVenta}</span>
              <span className={s.ayuda}>
                Por debajo de esto, el sitio ofrece pedir una llamada en vez de reservar.
              </span>
            </label>
            <label className={s.campo}>
              <span className={s.etiqueta}>Cupo liberado a la web</span>
              <span className={s.control}>{CANAL_WEB.cupoWeb}</span>
              <span className={s.ayuda}>
                El resto queda para el mostrador. Los dos canales miran la misma flota.
              </span>
            </label>
            <div className={s.filaCampos}>
              <label className={s.campo}>
                <span className={s.etiqueta}>Retención de cupo</span>
                <span className={s.control}>{CANAL_WEB.retencion}</span>
              </label>
              <label className={s.campo}>
                <span className={s.etiqueta}>Medios de cobro</span>
                <span className={s.control}>{CANAL_WEB.medios.join(' · ')}</span>
              </label>
            </div>
          </div>
        </div>

        <div className={`${s.tarjeta} ${s.scroll}`}>
          <header className={s.tarjetaCabeza}>
            <span>Pidieron que los llames</span>
            <span className={s.secundario}>Con el motivo por el que no pudieron reservar solos</span>
          </header>
          <table className={s.tabla}>
            <thead>
              <tr>
                <th>Cuándo</th>
                <th>Quién</th>
                <th>Por qué</th>
              </tr>
            </thead>
            <tbody>
              {CANAL_WEB.solicitudes.map((c) => (
                <tr key={c.fecha}>
                  <td className={s.secundario}>{c.fecha}</td>
                  <td>
                    <span className={s.apilado}>
                      <b className={s.fuerte}>{c.nombre}</b>
                      <span className={s.secundario}>{c.detalle}</span>
                    </span>
                  </td>
                  <td>
                    <BadgeColor color={MOTIVO_SOLICITUD_COLOR[c.motivo]}>
                      {MOTIVO_SOLICITUD_LABEL[c.motivo]}
                    </BadgeColor>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={s.tarjetaCuerpo}>
            <p className={s.ayuda}>
              Es lo primero que el mostrador necesita saber antes de marcar el número: no se
              atiende igual “quiere para pasado mañana” que “quiere que se lo llevemos al campo”.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
