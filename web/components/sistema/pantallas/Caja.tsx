/* Caja — `/caja?tab=…`.
 *
 * Réplica de la Caja del producto base: **A cobrar** y el **diario** (Hoy · Cobros · Echeqs ·
 * Cuentas corrientes). La pestaña que se abre es A cobrar.
 *
 * El **reparto entre socios es un adicional**, apagado de serie: la planilla de socios (Alquileres
 * · Mes) solo aparece con `tab` y con el rótulo "Adicional" en la barra. La cuenta propia privada
 * no está en el producto base y no se replica.
 *
 * El comprobante es un dato del cobro (emitido sí/no): la planilla dice "Con comprobante" / "Sin
 * comprobante" y la columna se llama "A repartir". La cuenta que hay detrás no se muestra. */

import { MEDIO_PAGO_LABEL, pesos } from '@/lib/sistema/dominio';
import {
  SOCIOS,
  ALQUILERES_MES,
  TOTALES_MES,
  totalAlquiler,
  aRepartir,
  A_COBRAR,
  INGRESADO_POR_MEDIO,
  COBRADO_POR_SOCIO,
  COMPENSACION,
  GASTOS_DEL_MES,
} from '@/lib/sistema/valle-extra';
import { Badge, Cifra, Tarjeta } from '../primitivas';
import Icono from '../Icono';
import s from '../sistema.module.css';

export type TabCaja = 'a-cobrar' | 'alquileres' | 'mes';

const PLANILLA: { key: string; label: string; icono: string }[] = [
  { key: 'a-cobrar', label: 'A cobrar', icono: 'tildes' },
];
/** El adicional de reparto entre socios. Solo se ve cuando la réplica muestra una de sus pestañas. */
const SOCIOS_TABS: { key: string; label: string; icono: string }[] = [
  { key: 'alquileres', label: 'Alquileres', icono: 'planilla' },
  { key: 'mes', label: 'Mes', icono: 'calendario' },
];
const DIARIO: { key: string; label: string; icono: string }[] = [
  { key: 'caja', label: 'Hoy', icono: 'billetera' },
  { key: 'cobros', label: 'Cobros', icono: 'recibo' },
  { key: 'echeqs', label: 'Echeqs', icono: 'tarjeta' },
  { key: 'cc', label: 'Cuentas corrientes', icono: 'libro' },
];

/** Nombres cortos para la planilla: de 15 columnas, ninguna puede ocupar de más. */
const MEDIO_CORTO: Record<string, string> = {
  cuenta_corriente: 'Cta. cte.',
  mercado_pago: 'Mercado Pago',
};
const primerNombre = (n: string) => n.split(' ')[0];

function BarraDeTabs({ activa }: { activa: string }) {
  const pestana = (t: { key: string; label: string; icono: string }) => (
    <span key={t.key} className={`${s.cajaTab} ${t.key === activa ? s.cajaTabActiva : ''}`}>
      <Icono nombre={t.icono} tam={13} />
      {t.label}
    </span>
  );
  return (
    <div className={s.cajaTabs}>
      {PLANILLA.map(pestana)}
      <span className={s.cajaTabSep} />
      {DIARIO.map(pestana)}
      {SOCIOS_TABS.some((t) => t.key === activa) && (
        <>
          <span className={s.cajaTabSep} />
          <span className={s.cajaTab}>
            <Badge tono="inactivo">Adicional · socios</Badge>
          </span>
          {SOCIOS_TABS.map(pestana)}
        </>
      )}
    </div>
  );
}

function Mes() {
  return (
    <span className={s.selector}>
      <Icono nombre="izquierda" tam={13} />
      <b style={{ textTransform: 'capitalize' }}>junio 2026</b>
      <Icono nombre="derecha" tam={13} />
    </span>
  );
}

// ─── Alquileres ──────────────────────────────────────────────────────────────

function Alquileres() {
  return (
    <>
      <div className={s.filtros}>
        <Mes />
        <span className={s.campoBusca}>
          <Icono nombre="buscar" tam={13} /> Buscar cliente o patente
        </span>
        <span className={s.selector}>
          ¿Cobrado? Todos <Icono nombre="abajo" tam={12} />
        </span>
        <span className={s.derecha}>
          <span className={s.boton}>
            <Icono nombre="bajar" tam={13} /> Exportar a Excel
          </span>
        </span>
      </div>

      <div className={s.cifras}>
        <Cifra rotulo="Con comprobante" valor={pesos(TOTALES_MES.conFactura)} />
        <Cifra rotulo="Sin comprobante" valor={pesos(TOTALES_MES.sinFactura)} />
        <Cifra rotulo="Total" valor={pesos(TOTALES_MES.total)} />
        <Cifra rotulo="A repartir" valor={pesos(TOTALES_MES.repartible)} destacada />
      </div>

      <div className={`${s.tarjeta} ${s.scroll}`}>
        <table className={`${s.tabla} ${s.tablaApretada}`}>
          <thead>
            <tr>
              <th>Patente</th>
              <th>Retiro</th>
              <th>Devolución</th>
              <th>Cliente</th>
              <th className={s.numero}>Días</th>
              <th className={s.numero}>$/día</th>
              <th className={s.numero}>Con comprobante</th>
              <th className={s.numero}>Sin comprobante</th>
              <th className={s.numero}>Total</th>
              <th>Medio</th>
              <th>¿Cobrado?</th>
              <th>Fecha cobro</th>
              <th>Cobró</th>
              <th>¿Repartido?</th>
              <th className={s.numero}>A repartir</th>
            </tr>
          </thead>
          <tbody>
            {ALQUILERES_MES.map((a) => (
              <tr key={a.id}>
                <td className={s.fuerte}>{a.patente}</td>
                <td className={s.secundario}>{a.retiro}</td>
                <td className={s.secundario}>{a.devolucion}</td>
                <td style={{ maxWidth: 96, overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.cliente}</td>
                <td className={s.numero}>{a.dias}</td>
                <td className={s.numero}>{pesos(a.porDia)}</td>
                <td className={s.numero}>
                  <span className={s.subrayadoPunteado}>{pesos(a.conFactura)}</span>
                </td>
                <td className={s.numero}>{a.sinFactura ? pesos(a.sinFactura) : '—'}</td>
                <td className={`${s.numero} ${s.fuerte}`}>{pesos(totalAlquiler(a))}</td>
                <td className={s.secundario}>{MEDIO_CORTO[a.medio] ?? MEDIO_PAGO_LABEL[a.medio]}</td>
                <td>
                  <span className={a.cobrado ? s.chipSi : s.chipNo}>{a.cobrado ? 'Sí' : 'No'}</span>
                </td>
                <td className={s.secundario}>{a.fechaCobro ?? '—'}</td>
                <td>
                  {a.cobro.length ? (
                    a.cobro.map(primerNombre).join(', ')
                  ) : a.cobrado ? (
                    <span style={{ color: '#B45309', fontWeight: 700 }} title="Cobro sin socio asignado">
                      ⚠
                    </span>
                  ) : (
                    '—'
                  )}
                </td>
                <td>
                  <span className={a.repartido ? s.chipSi : s.chipNo}>{a.repartido ? 'Sí' : 'No'}</span>
                </td>
                <td className={`${s.numero} ${s.azulOscuro}`}>
                  {a.cobrado ? pesos(aRepartir(a)) : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// ─── A cobrar ────────────────────────────────────────────────────────────────

function ACobrar() {
  const total = A_COBRAR.reduce((x, a) => x + a.falta, 0);
  return (
    <>
      <div className={s.cifras}>
        <Cifra rotulo="Total pendiente" valor={pesos(total)} destacada />
        <Cifra rotulo="Alquileres sin cobrar" valor={String(A_COBRAR.length)} />
        <Cifra rotulo="Pendiente · Cuenta corriente" valor={pesos(total)} />
        <Cifra rotulo="Con más de 7 días" valor={String(A_COBRAR.filter((a) => (a.dias ?? 0) > 7).length)} tono="danger" />
      </div>

      <div className={`${s.tarjeta} ${s.scroll}`}>
        <table className={s.tabla}>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Patente</th>
              <th>Retiro</th>
              <th>Devolución</th>
              <th className={s.numero}>Total</th>
              <th className={s.numero}>Falta cobrar</th>
              <th>Medio previsto</th>
              <th className={s.numero}>Días desde la devolución</th>
            </tr>
          </thead>
          <tbody>
            {A_COBRAR.map((a) => (
              <tr key={`${a.cliente}-${a.patente}-${a.retiro}`}>
                <td className={s.fuerte}>{a.cliente}</td>
                <td>{a.patente}</td>
                <td className={s.secundario}>{a.retiro}</td>
                <td className={s.secundario}>{a.devolucion}</td>
                <td className={s.numero}>{pesos(a.total)}</td>
                <td className={`${s.numero} ${s.fuerte}`}>{pesos(a.falta)}</td>
                <td className={s.secundario}>{MEDIO_PAGO_LABEL[a.medio]}</td>
                <td
                  className={s.numero}
                  style={a.dias !== null && a.dias > 7 ? { color: '#B91C1C', fontWeight: 700 } : undefined}
                >
                  {a.dias === null ? '—' : a.dias}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// ─── Mes ─────────────────────────────────────────────────────────────────────

function MesVista() {
  const columnas = [...SOCIOS.map((x) => x.nombre), 'Sin asignar'];
  const totalIngresado = INGRESADO_POR_MEDIO.reduce((x, f) => x + f.total, 0);
  return (
    <>
      <div className={s.filtros}>
        <Mes />
        <span className={s.derecha}>
          <span className={s.boton}>
            <Icono nombre="usuario" tam={13} /> Socios y porcentajes
          </span>
        </span>
      </div>

      <div className={s.cifras}>
        <Cifra rotulo="Ingresado en el mes" valor={pesos(TOTALES_MES.ingresado)} destacada />
        <Cifra rotulo="A repartir cobrado" valor={pesos(TOTALES_MES.repartible)} />
        {SOCIOS.map((x) => (
          <Cifra
            key={x.id}
            rotulo={`Parte de ${x.nombre} (${x.porcentaje}%)`}
            valor={pesos(Math.round((TOTALES_MES.repartible * x.porcentaje) / 100))}
          />
        ))}
      </div>

      {TOTALES_MES.sinSocio > 0 && (
        <div className={s.avisoAmbar}>
          <Icono nombre="alerta" tam={14} />
          <span>
            Hay <b>{pesos(TOTALES_MES.sinSocio)}</b> cobrados sin socio. Asignalos para poder repartir el mes.
          </span>
          <span className={s.derecha}>
            <span>Asignar todos a</span>
            <span className={s.selector}>
              Elegí un socio… <Icono nombre="abajo" tam={12} />
            </span>
          </span>
        </div>
      )}

      <div className={s.dosAncha}>
        <Tarjeta titulo="Ingresado por medio de pago" sinPadding>
          <table className={s.tabla}>
            <thead>
              <tr>
                <th>Medio</th>
                {columnas.map((c) => (
                  <th key={c} className={s.numero}>
                    {c}
                  </th>
                ))}
                <th className={s.numero}>Total</th>
              </tr>
            </thead>
            <tbody>
              {INGRESADO_POR_MEDIO.map((f) => (
                <tr key={f.medio}>
                  <td>{MEDIO_PAGO_LABEL[f.medio]}</td>
                  {f.porSocio.map((v, i) => (
                    <td key={i} className={s.numero}>
                      {v ? pesos(v) : '—'}
                    </td>
                  ))}
                  <td className={s.numero}>{f.sinAsignar ? pesos(f.sinAsignar) : '—'}</td>
                  <td className={`${s.numero} ${s.fuerte}`}>{pesos(f.total)}</td>
                </tr>
              ))}
              <tr>
                <td className={s.fuerte}>Total ingresado</td>
                {COBRADO_POR_SOCIO.map((c) => (
                  <td key={c.socio.id} className={`${s.numero} ${s.fuerte}`}>
                    {pesos(c.cobrado)}
                  </td>
                ))}
                <td className={`${s.numero} ${s.fuerte}`}>{pesos(TOTALES_MES.sinSocio)}</td>
                <td className={`${s.numero} ${s.fuerte}`}>{pesos(totalIngresado)}</td>
              </tr>
            </tbody>
          </table>
        </Tarjeta>

        <Tarjeta titulo="Compensación entre socios">
          <div className={s.avisoLista}>
            <p className={s.ayuda}>
              Se compensa sobre el total cobrado. Los gastos se ven aparte.
            </p>
            <p style={{ fontSize: 13 }}>
              <b>{COMPENSACION.de}</b> le pasa <b>{pesos(COMPENSACION.monto)}</b> a <b>{COMPENSACION.a}</b>
            </p>
            <p className={s.secundario}>
              Gastos del mes: {pesos(GASTOS_DEL_MES.monto)} ({GASTOS_DEL_MES.cantidad})
            </p>
            <span className={`${s.boton} ${s.botonPrimario}`} style={{ alignSelf: 'flex-start' }}>
              Registrar reparto de junio 2026
            </span>
          </div>
        </Tarjeta>
      </div>
    </>
  );
}

export default function Caja({ tab = 'a-cobrar' }: { tab?: TabCaja }) {
  return (
    <>
      <BarraDeTabs activa={tab} />
      {tab === 'alquileres' ? <Alquileres /> : tab === 'mes' ? <MesVista /> : <ACobrar />}
    </>
  );
}
