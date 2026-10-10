/* Fechas especiales — `/fechas-especiales`.
 *
 * Réplica de `pages/fechas-especiales/FechasEspecialesPage.tsx`. Feriados, fines de semana
 * largos y temporadas, cada uno con su color en el calendario de precios.
 *
 * La fila que hay que mirar es la última: **una fecha cargada sin tarifa.** El sistema la marca
 * y dispara un aviso, porque una fecha especial sin precio es exactamente el fin de semana largo
 * que se vende a precio de martes.
 *
 * Y el detalle que cualquier argentino chequea sin pensarlo: el 20/06 está como feriado pero no
 * arma fin de semana largo — en 2026 cae sábado y es inamovible. El que lo arma es el 17/06, que
 * es trasladable y al caer miércoles se corre al lunes 15. */

import { COLOR_FECHA_ESPECIAL, TIPO_FECHA_ESPECIAL_LABEL } from '@/lib/sistema/dominio';
import { FECHAS_ESPECIALES } from '@/lib/sistema/valle';
import { Badge, BadgeColor, Cifra } from '../primitivas';
import Icono from '../Icono';
import s from '../sistema.module.css';

export default function FechasEspeciales() {
  const sinTarifa = FECHAS_ESPECIALES.filter((f) => f.tarifa.startsWith('Sin')).length;

  return (
    <>
      <div className={s.barraTitulo}>
        <h4 className={s.titulo}>Fechas especiales</h4>
        <div className={s.acciones}>
          <span className={s.selector}>
            2026 <Icono nombre="abajo" tam={12} />
          </span>
          <span className={`${s.boton} ${s.botonPrimario}`}>
            <Icono nombre="mas" tam={13} /> Nueva fecha
          </span>
        </div>
      </div>

      <div className={s.cifras}>
        <Cifra rotulo="Cargadas este año" valor={String(FECHAS_ESPECIALES.length)} />
        <Cifra rotulo="Con tarifa" valor={String(FECHAS_ESPECIALES.length - sinTarifa)} tono="success" />
        <Cifra rotulo="Sin tarifa cargada" valor={String(sinTarifa)} tono="warning" />
        <Cifra rotulo="Temporadas" valor="2" pie="Media y alta" />
      </div>

      <div className={`${s.tarjeta} ${s.scroll}`}>
        <header className={s.tarjetaCabeza}>
          <span>El calendario del año</span>
          <span className={s.secundario}>
            Una fecha especial sin tarifa dispara aviso: es el feriado que se vende a precio de
            martes.
          </span>
        </header>
        <table className={s.tabla}>
          <thead>
            <tr>
              <th>Desde</th>
              <th>Hasta</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Color en el calendario</th>
              <th>Tarifa</th>
            </tr>
          </thead>
          <tbody>
            {FECHAS_ESPECIALES.map((f) => (
              <tr key={f.nombre}>
                <td>{f.desde}</td>
                <td>{f.hasta}</td>
                <td className={s.fuerte}>{f.nombre}</td>
                <td className={s.secundario}>{TIPO_FECHA_ESPECIAL_LABEL[f.tipo]}</td>
                <td>
                  <span className={s.semaforoItem}>
                    <span
                      className={s.semaforoPunto}
                      style={{ background: COLOR_FECHA_ESPECIAL[f.color].chip }}
                    />
                    <span className={s.secundario}>{f.color}</span>
                  </span>
                </td>
                <td>
                  {f.tarifa.startsWith('Sin') ? (
                    <BadgeColor color="#B45309">{f.tarifa}</BadgeColor>
                  ) : (
                    <Badge tono="success">{f.tarifa}</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
