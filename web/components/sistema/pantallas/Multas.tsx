/* Multas y daños — `/multas`.
 *
 * Réplica de `pages/multas/MultasPage.tsx`.
 *
 * Lo que hace esta pantalla, y es lo único que importa contar: **cargás el acta con la fecha del
 * hecho y el sistema encuentra qué alquiler estaba vigente y quién manejaba.** Sin eso, un acta
 * que llega tres meses tarde se paga sola o se pierde una tarde cruzando fechas contra contratos
 * en papel.
 *
 * Los badges de estado van sólidos, a diferencia del resto del sistema: el estado de una multa
 * es una decisión que hay que notar de un vistazo —quién debe, a quién se le perdonó— y no un
 * dato pasivo. */

import { ESTADO_MULTA_LABEL, ESTADO_MULTA_COLOR, SEVERIDAD_DANIO_LABEL, SEVERIDAD_DANIO_COLOR, TIPO_DANIO_LABEL, pesos } from '@/lib/sistema/dominio';
import { MULTAS, DANIOS } from '@/lib/sistema/valle';
import { BadgeColor, Cifra } from '../primitivas';
import Icono from '../Icono';
import s from '../sistema.module.css';

export default function Multas() {
  const sinImputar = MULTAS.filter((m) => m.estado === 'pendiente').length;
  const total = MULTAS.reduce((a, m) => a + m.monto, 0);

  return (
    <>
      <div className={s.barraTitulo}>
        <h4 className={s.titulo}>Multas</h4>
        <div className={s.acciones}>
          <span className={s.selector}>
            Estado: todos <Icono nombre="abajo" tam={12} />
          </span>
          <span className={`${s.boton} ${s.botonPrimario}`}>
            <Icono nombre="mas" tam={13} /> Cargar acta
          </span>
        </div>
      </div>

      <div className={s.cifras}>
        <Cifra rotulo="Actas del período" valor={String(MULTAS.length)} />
        <Cifra rotulo="Sin imputar" valor={String(sinImputar)} tono="warning" />
        <Cifra rotulo="Monto total" valor={pesos(total)} />
        <Cifra rotulo="Daños abiertos" valor={String(DANIOS.length)} tono="danger" />
      </div>

      <div className={s.filas}>
        <div className={`${s.tarjeta} ${s.scroll}`}>
          <header className={s.tarjetaCabeza}>
            <span>Actas</span>
            <span className={s.secundario}>
              Con la fecha del hecho el sistema encuentra el alquiler vigente y el conductor.
            </span>
          </header>
          <table className={s.tabla}>
            <thead>
              <tr>
                <th>Acta</th>
                <th>Fecha del hecho</th>
                <th>Unidad</th>
                <th>Responsable</th>
                <th className={s.numero}>Monto</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {MULTAS.map((m) => (
                <tr key={m.acta}>
                  <td className={s.fuerte}>{m.acta}</td>
                  <td>
                    <span className={s.apilado}>
                      <span>{m.hecho}</span>
                      <span className={s.secundario}>{m.lugar}</span>
                    </span>
                  </td>
                  <td>{m.unidad}</td>
                  <td>
                    <span className={s.apilado}>
                      <span>{m.responsable}</span>
                      <span className={s.secundario}>Contrato {m.contrato}</span>
                    </span>
                  </td>
                  <td className={s.numero}>{pesos(m.monto)}</td>
                  <td>
                    <BadgeColor color={ESTADO_MULTA_COLOR[m.estado]}>
                      {ESTADO_MULTA_LABEL[m.estado]}
                    </BadgeColor>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={`${s.tarjeta} ${s.scroll}`}>
          <header className={s.tarjetaCabeza}>
            <span>Daños</span>
            <span className={s.secundario}>Cada uno con zona, severidad, responsable y fotos.</span>
          </header>
          <table className={s.tabla}>
            <thead>
              <tr>
                <th>Daño</th>
                <th>Unidad</th>
                <th>Zona</th>
                <th>Detectado</th>
                <th>Responsable</th>
                <th className={s.numero}>Valorizado</th>
                <th>Severidad</th>
              </tr>
            </thead>
            <tbody>
              {DANIOS.map((d) => (
                <tr key={d.id}>
                  <td>
                    <span className={s.apilado}>
                      <b className={s.fuerte}>{d.id}</b>
                      <span className={s.secundario}>{d.fotos} fotos</span>
                    </span>
                  </td>
                  <td>{d.unidad}</td>
                  <td>
                    <span className={s.apilado}>
                      <span>{d.zona}</span>
                      <span className={s.secundario}>{TIPO_DANIO_LABEL[d.tipo]}</span>
                    </span>
                  </td>
                  <td className={s.secundario}>{d.detectado}</td>
                  <td>{d.responsable}</td>
                  <td className={s.numero}>{d.valor ? pesos(d.valor) : '—'}</td>
                  <td>
                    <BadgeColor color={SEVERIDAD_DANIO_COLOR[d.severidad]}>
                      {SEVERIDAD_DANIO_LABEL[d.severidad]}
                    </BadgeColor>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
