/* Reportes — `/reportes`.
 *
 * Réplica de `pages/reportes/ReportesPage.tsx` y de `TableroDeReportes.tsx`. Son **cuatro
 * pestañas**: Resumen, Ingresos, Flota y Demanda no atendida (el CSV existe sólo en Ingresos y
 * Flota). Se replica el Resumen, que es la que se abre primero: lo ingresado contra el mes
 * anterior, lo que falta cobrar por antigüedad, la ocupación por auto y, para la rentadora que
 * tiene el adicional, el reparto entre socios (rotulado como adicional).
 *
 * El gráfico de áreas está dibujado en SVG a mano, sin librería: son seis números. Se muestra
 * mayo, el último mes cerrado, contra abril. */

import { pesos } from '@/lib/sistema/dominio';
import { OCUPACION_POR_UNIDAD, INGRESOS_POR_MES, FLOTA } from '@/lib/sistema/valle';
import { RESUMEN_REPORTES as R, ANTIGUEDAD, REPARTO_MAYO } from '@/lib/sistema/valle-extra';
import { Badge, Cifra, Tarjeta } from '../primitivas';
import Icono from '../Icono';
import s from '../sistema.module.css';

const PATENTE_DE = Object.fromEntries(FLOTA.map((u) => [u.modelo, u.patente]));

// Enero a mayo: los meses cerrados del año.
const MESES = INGRESOS_POR_MES.slice(0, 5);

function GraficoAreas() {
  const W = 640;
  const H = 190;
  const mi = 46; // margen izquierdo, para el eje
  const mb = 22; // margen inferior, para los meses
  const mt = 8;
  const tope = 16_000_000;
  const x = (i: number) => mi + (i * (W - mi - 12)) / (MESES.length - 1);
  const y = (v: number) => mt + (1 - v / tope) * (H - mt - mb);
  const linea = (k: 'ingresos' | 'egresos') =>
    MESES.map((m, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(m[k]).toFixed(1)}`).join(' ');
  const area = `${linea('ingresos')} L${x(MESES.length - 1).toFixed(1)} ${H - mb} L${mi} ${H - mb} Z`;

  return (
    <svg className={s.svgGrafico} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Ingresos y egresos de 2026, de enero a mayo">
      <defs>
        <linearGradient id="reporteAreaIngresos" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#12959B" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#12959B" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {[0, 4, 8, 12, 16].map((m) => (
        <g key={m}>
          <line x1={mi} x2={W - 12} y1={y(m * 1_000_000)} y2={y(m * 1_000_000)} stroke="#DBE6E6" strokeWidth="1" />
          <text className={s.ejeTexto} x={mi - 8} y={y(m * 1_000_000) + 3} textAnchor="end">
            {m === 0 ? '0' : `${m} M`}
          </text>
        </g>
      ))}
      <path d={area} fill="url(#reporteAreaIngresos)" />
      <path d={linea('ingresos')} fill="none" stroke="#12959B" strokeWidth="2.2" strokeLinejoin="round" />
      <path d={linea('egresos')} fill="none" stroke="#7FD4D8" strokeWidth="2" strokeLinejoin="round" />
      {MESES.map((m, i) => (
        <text key={m.mes} className={s.ejeTexto} x={x(i)} y={H - 6} textAnchor="middle">
          {m.mes}
        </text>
      ))}
    </svg>
  );
}

export default function Reportes() {
  const ocupacion = [...OCUPACION_POR_UNIDAD].slice(0, 8);
  const totalAntiguedad = ANTIGUEDAD.reduce((a, t) => a + t.monto, 0);
  const maxTramo = Math.max(...ANTIGUEDAD.map((t) => t.monto));

  return (
    <>
      <div className={s.barraTitulo}>
        <h4 className={s.titulo}>Reportes</h4>
      </div>

      <div className={s.pestanas}>
        <span className={`${s.pestana} ${s.pestanaActiva}`}>Resumen</span>
        <span className={s.pestana}>Ingresos</span>
        <span className={s.pestana}>Flota</span>
        <span className={s.pestana}>Demanda no atendida</span>
      </div>

      <div className={s.acciones} style={{ justifyContent: 'flex-start', gap: 12 }}>
        <span className={s.selector}>
          <Icono nombre="izquierda" tam={13} />
          <b style={{ textTransform: 'capitalize' }}>{R.mes}</b>
          <Icono nombre="derecha" tam={13} />
        </span>
        <span className={s.secundario}>Contra {R.anterior}</span>
      </div>

      <div className={s.cifras}>
        <Cifra
          rotulo="Ingresado"
          valor={pesos(R.ingresado.valor)}
          destacada
          tendencia={{ texto: `${R.ingresado.variacion}% vs mes anterior`, sube: true, bueno: true }}
        />
        <Cifra rotulo="Gastos" valor={pesos(REPARTO_MAYO.gastos)} pie="Por categoría" />
        <Cifra
          rotulo="Falta cobrar"
          valor={pesos(R.faltaCobrar.valor)}
          pie={`${R.faltaCobrar.alquileres} alquileres`}
          tendencia={{ texto: `${Math.abs(R.faltaCobrar.variacion)}% vs mes anterior`, sube: false, bueno: true }}
        />
        <Cifra rotulo="Ocupación de la flota" valor={`${R.ocupacion.valor}%`} pie={`${R.ocupacion.autos} autos con alquileres`} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: 12, flexShrink: 0 }}>
        <Tarjeta
          titulo="Ingresos y egresos de 2026"
          extra={
            <span className={s.leyendaItem} style={{ fontWeight: 500 }}>
              <span className={s.muestra} style={{ background: '#12959B', borderColor: '#12959B', width: 10, height: 10 }} />
              Ingresos
              <span className={s.muestra} style={{ background: '#7FD4D8', borderColor: '#7FD4D8', width: 10, height: 10 }} />
              Egresos
            </span>
          }
        >
          <GraficoAreas />
        </Tarjeta>

        <Tarjeta titulo="Lo que falta cobrar, por antigüedad">
          <div className={s.avisoLista} style={{ gap: 9 }}>
            {ANTIGUEDAD.map((t) => (
              <div key={t.tramo} className={s.barraH} style={{ gridTemplateColumns: '70px minmax(0, 1fr) 76px' }}>
                <span>{t.tramo}</span>
                <span className={s.barraHCaja}>
                  <span
                    className={s.barraHRelleno}
                    style={{
                      display: 'block',
                      width: `${(t.monto / maxTramo) * 100}%`,
                      background: t.tono === 'danger' ? '#B91C1C' : t.tono === 'warning' ? '#B45309' : '#12959B',
                    }}
                  />
                </span>
                <span className={s.numero}>{pesos(t.monto)}</span>
              </div>
            ))}
            <p className={s.secundario}>Total: {pesos(totalAntiguedad)}</p>
          </div>
        </Tarjeta>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: 12, minHeight: 0, flex: 1 }}>
        <Tarjeta titulo="Ocupación por auto">
          <div className={s.avisoLista} style={{ gap: 5 }}>
            {ocupacion.map((u, i) => (
              <div key={u.unidad} className={s.barraH}>
                <span className={s.fuerte}>{PATENTE_DE[u.unidad] ?? u.unidad}</span>
                <span className={s.barraHCaja}>
                  <span
                    className={s.barraHRelleno}
                    style={{ display: 'block', width: `${u.ocupacion}%`, background: i === 0 ? '#0B5D62' : '#12959B' }}
                  />
                </span>
                <span className={s.numero}>{u.ocupacion}%</span>
              </div>
            ))}
          </div>
        </Tarjeta>

        <Tarjeta titulo="Reparto entre socios" extra={<Badge tono="inactivo">Adicional</Badge>}>
          <div className={s.avisoLista}>
            {REPARTO_MAYO.porSocio.map((p) => (
              <p key={p.id} className={s.semaforoItem} style={{ justifyContent: 'space-between' }}>
                <span>
                  {p.nombre} ({p.porcentaje}%)
                </span>
                <b className={s.numero}>{pesos(p.parte)}</b>
              </p>
            ))}
            <p className={s.secundario}>
              Gastos del mes: {pesos(REPARTO_MAYO.gastos)} · se ven aparte, no entran en el reparto.
            </p>
            <p style={{ fontSize: 12 }}>
              <b>{REPARTO_MAYO.transferencia.de}</b> le pasa <b>{pesos(REPARTO_MAYO.transferencia.monto)}</b> a{' '}
              <b>{REPARTO_MAYO.transferencia.a}</b>
            </p>
          </div>
        </Tarjeta>
      </div>
    </>
  );
}
