/* Cotizador — `/cotizador`.
 *
 * Réplica de `pages/cotizador/CotizadorPage.tsx`. Es una de las dos pantallas del sistema con
 * layout propio (`fullBleed`): a la izquierda se cargan los datos, a la derecha se ve el PDF
 * que va a salir, y lo que se ve es lo que se manda.
 *
 * Contesta el problema de que el cliente llame, pregunte el precio, corte y llame al de la otra
 * cuadra: el presupuesto sale con el precio del motor, en PDF, y queda con seguimiento en la
 * ficha del cliente en vez de morir en un WhatsApp. */

import { pesos } from '@/lib/sistema/dominio';
import { COTIZACION, PRESUPUESTOS, RENTADORA } from '@/lib/sistema/valle';
import Icono from '../Icono';
import s from '../sistema.module.css';

const TOTAL_MES = COTIZACION.vehiculos.reduce((a, v) => a + v.precioMes, 0);

export default function Cotizador() {
  return (
    <div className={s.dos} style={{ gap: 12 }}>
      {/* Izquierda: los datos */}
      <div className={s.scroll} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className={s.barraTitulo}>
          <div>
            <h4 className={s.titulo}>Nueva cotización</h4>
            <p className={s.ayuda}>Completá los datos y descargá el PDF</p>
          </div>
          <span className={`${s.boton} ${s.botonPrimario}`}>
            <Icono nombre="bajar" tam={13} /> Descargar PDF
          </span>
        </div>

        <div className={s.tarjeta}>
          <header className={s.tarjetaCabeza}>
            <span>Datos de la cotización</span>
          </header>
          <div className={s.tarjetaCuerpo} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div className={s.filaCampos}>
              <label className={s.campo}>
                <span className={s.etiqueta}>Empresa cliente</span>
                <span className={s.control}>{COTIZACION.empresa}</span>
              </label>
              <label className={s.campo}>
                <span className={s.etiqueta}>Contacto</span>
                <span className={s.control}>{COTIZACION.contacto}</span>
              </label>
            </div>
            <div className={s.filaCampos}>
              <label className={s.campo}>
                <span className={s.etiqueta}>Modalidad</span>
                <span className={s.control}>
                  {COTIZACION.modalidad} <Icono nombre="abajo" tam={12} />
                </span>
              </label>
              <label className={s.campo}>
                <span className={s.etiqueta}>Desde / Hasta</span>
                <span className={s.control}>
                  {COTIZACION.desde} → {COTIZACION.hasta}
                </span>
              </label>
            </div>
            <label className={s.campo}>
              <span className={s.etiqueta}>Nota</span>
              <span className={s.control} style={{ whiteSpace: 'normal', lineHeight: 1.4 }}>
                {COTIZACION.nota}
              </span>
            </label>
          </div>
        </div>

        <div className={s.tarjeta}>
          <header className={s.tarjetaCabeza}>
            <span>Vehículos a cotizar</span>
            <span className={s.secundario}>Precio traído del motor</span>
          </header>
          <table className={s.tabla}>
            <thead>
              <tr>
                <th>Categoría</th>
                <th className={s.numero}>Cantidad</th>
                <th className={s.numero}>Precio por mes</th>
              </tr>
            </thead>
            <tbody>
              {COTIZACION.vehiculos.map((v) => (
                <tr key={v.categoria}>
                  <td className={s.fuerte}>{v.categoria}</td>
                  <td className={s.numero}>{v.cantidad}</td>
                  <td className={s.numero}>{pesos(v.precioMes)}</td>
                </tr>
              ))}
              <tr>
                <td className={s.fuerte}>Total</td>
                <td />
                <td className={s.numero} style={{ fontWeight: 700 }}>
                  {pesos(TOTAL_MES)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={s.tarjeta}>
          <header className={s.tarjetaCabeza}>
            <span>Presupuestos emitidos</span>
          </header>
          <table className={s.tabla}>
            <tbody>
              {PRESUPUESTOS.map((p) => (
                <tr key={p.numero}>
                  <td className={s.fuerte}>{p.numero}</td>
                  <td>{p.cliente}</td>
                  <td className={s.numero}>{pesos(p.total)}</td>
                  <td className={s.secundario}>{p.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Derecha: el PDF que va a salir */}
      <div className={s.scroll}>
        <div className={s.tarjeta} style={{ overflow: 'hidden' }}>
          <div style={{ background: '#0F2E31', color: '#fff', padding: '18px 20px' }}>
            <p style={{ fontSize: 11, letterSpacing: '0.14em', opacity: 0.7 }}>PRESUPUESTO</p>
            <p style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.01em' }}>
              {RENTADORA.nombre}
            </p>
            <p style={{ fontSize: 11, opacity: 0.7 }}>
              {COTIZACION.numero} · {RENTADORA.ciudad}
            </p>
          </div>
          <div className={s.tarjetaCuerpo} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p className={s.secundario}>Para {COTIZACION.empresa}</p>
            <p>
              <b>{COTIZACION.modalidad}</b> · {COTIZACION.desde} a {COTIZACION.hasta}
            </p>
            <table className={s.tabla}>
              <tbody>
                {COTIZACION.vehiculos.map((v) => (
                  <tr key={v.categoria}>
                    <td>
                      {v.cantidad} × {v.categoria}
                    </td>
                    <td className={s.numero}>{pesos(v.precioMes)}</td>
                  </tr>
                ))}
                <tr>
                  <td className={s.fuerte}>Total mensual</td>
                  <td className={s.numero} style={{ fontWeight: 700 }}>
                    {pesos(TOTAL_MES)}
                  </td>
                </tr>
              </tbody>
            </table>
            <p className={s.ayuda}>{COTIZACION.nota}</p>
            <p className={s.ayuda}>
              Mantenimiento a cargo de la rentadora · Presupuesto válido por 15 días
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
