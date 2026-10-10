/* Precios — `/precios`.
 *
 * Réplica de `pages/precios/PreciosPage.tsx`. Las tres capas del motor sobre un calendario.
 *
 * **Hay un solo precio.** Antes había una pantalla por canal y después una columna por canal;
 * desde el 04/10 el motor ignora el canal y la pantalla no tiene selector: una regla vale para
 * todos. El Simulador ya no está en el menú: se abre con un botón de esta pantalla.
 *
 * La franja de arrastre de arriba es cómo se carga una regla: se marcan los días sobre la fila
 * de una categoría y se les pone precio. */

import { pesos } from '@/lib/sistema/dominio';
import { CAPAS_PRECIO, REGLAS_CALENDARIO, CATEGORIAS, DIAS, FINDE } from '@/lib/sistema/valle';
import { Tarjeta } from '../primitivas';
import Icono from '../Icono';
import s from '../sistema.module.css';

const MOLDE = { '--dias': DIAS.length } as React.CSSProperties;

export default function Precios() {
  return (
    <>
      <div className={s.barraTitulo}>
        <h4 className={s.titulo}>Precios</h4>
        <div className={s.acciones}>
          <span className={s.selector}>
            Viendo precios de: <b>Junio 2026</b> <Icono nombre="abajo" tam={12} />
          </span>
          <span className={s.boton}>Probador de precio</span>
          <span className={s.boton}>
            <Icono nombre="calculadora" tam={13} /> Simulador
          </span>
          <span className={`${s.boton} ${s.botonPrimario}`}>
            <Icono nombre="mas" tam={13} /> Nueva regla
          </span>
        </div>
      </div>

      {/* La franja de carga. Arrastrás sobre la fila de una categoría y esos días quedan
          seleccionados para ponerles precio. */}
      <div className={s.semaforo}>
        <p className={s.semaforoItem}>
          <Icono nombre="calendario" tam={13} />
          <b>Arrastrá sobre la fila de una categoría</b>
          <span className={s.ayuda}>— y después: “Ponerle precio a estos días”</span>
        </p>
        <div className={s.filaCal} style={MOLDE}>
          <span className={s.celdaUnidad} style={{ gridColumn: 1, gridRow: 1, border: 0 }}>
            <b className={s.secundario}>PICK-UP D</b>
          </span>
          {DIAS.map((d, i) => (
            <span
              key={d}
              className={`${s.cabezaDia} ${FINDE.includes(i) ? s.cabezaFinde : ''}`}
              style={{
                gridColumn: i + 2,
                gridRow: 1,
                // Del 13 al 15: el fin de semana largo, ya seleccionado.
                ...(i >= 1 && i <= 3
                  ? { background: 'rgba(18, 149, 155, 0.14)', color: '#0B5D62' }
                  : null),
              }}
            >
              {d}
            </span>
          ))}
        </div>
      </div>

      <div className={s.tres}>
        {CAPAS_PRECIO.map((capa) => (
          <Tarjeta key={capa.key} titulo={capa.titulo}>
            {capa.reglas.map((r) => (
              <p key={r.label} className={s.semaforoItem} style={{ justifyContent: 'space-between' }}>
                <span className={s.apilado}>
                  <b>{r.label}</b>
                  <span className={s.secundario}>{r.detalle}</span>
                </span>
                <b className={s.numero}>
                  {r.factor === 1 ? '—' : `× ${r.factor.toLocaleString('es-AR')}`}
                </b>
              </p>
            ))}
          </Tarjeta>
        ))}
      </div>

      <div className={`${s.tarjeta} ${s.scroll}`}>
        <header className={s.tarjetaCabeza}>
          <span>Reglas de precio</span>
          <span className={s.secundario}>
            Un solo precio para todas las reservas, vengan de la web o del mostrador.
          </span>
        </header>
        <table className={s.tabla}>
          <thead>
            <tr>
              <th>Desde</th>
              <th>Hasta</th>
              <th>Regla</th>
              <th>Categoría</th>
              <th className={s.numero}>Ajuste</th>
            </tr>
          </thead>
          <tbody>
            {REGLAS_CALENDARIO.map((r) => (
              <tr key={r.regla}>
                <td>{r.desde}</td>
                <td>{r.hasta}</td>
                <td className={s.fuerte}>{r.regla}</td>
                <td>{r.categoria}</td>
                <td className={s.numero}>{r.valor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={s.leyenda}>
        <span className={s.leyendaItem}>Tarifa base por categoría:</span>
        {CATEGORIAS.map((c) => (
          <span key={c.key} className={s.leyendaItem}>
            {c.nombre} <b>{pesos(c.base)}</b>
          </span>
        ))}
      </div>
    </>
  );
}
