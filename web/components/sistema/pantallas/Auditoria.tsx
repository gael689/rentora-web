/* Auditoría — `/auditoria`.
 *
 * Réplica de `pages/auditoria/AuditoriaPage.tsx`. Quién hizo qué y cuándo.
 *
 * Parece la pantalla menos vendedora del sistema y es de las que más tranquilidad da cuando hay
 * más de una persona en el mostrador: **un precio que cambió solo no existe, lo cambió alguien.**
 * Lo mismo con una multa que se bonificó, una seña que se devolvió o un contrato que se anuló.
 *
 * Por eso el sistema nunca borra: anular deja el registro y el motivo. */

import { AUDITORIA } from '@/lib/sistema/valle';
import { Cifra } from '../primitivas';
import Icono from '../Icono';
import s from '../sistema.module.css';

export default function Auditoria() {
  return (
    <>
      <div className={s.barraTitulo}>
        <h4 className={s.titulo}>Auditoría</h4>
        <div className={s.acciones}>
          <span className={s.selector}>
            Hoy <Icono nombre="abajo" tam={12} />
          </span>
          <span className={s.selector}>
            Usuario: todos <Icono nombre="abajo" tam={12} />
          </span>
          <span className={s.boton}>
            <Icono nombre="bajar" tam={13} /> CSV
          </span>
        </div>
      </div>

      <div className={s.cifras}>
        <Cifra rotulo="Movimientos de hoy" valor={String(AUDITORIA.length)} />
        <Cifra rotulo="Usuarios activos" valor="2" pie="mostrador · admin" />
        <Cifra rotulo="Cambios de precio" valor="1" tono="warning" />
        <Cifra rotulo="Registros borrados" valor="0" pie="El sistema no borra: anula" tono="success" />
      </div>

      <div className={`${s.tarjeta} ${s.scroll}`}>
        <header className={s.tarjetaCabeza}>
          <span>Quién hizo qué</span>
          <span className={s.secundario}>Un precio que cambió solo no existe: lo cambió alguien.</span>
        </header>
        <table className={s.tabla}>
          <thead>
            <tr>
              <th>Hora</th>
              <th>Usuario</th>
              <th>Acción</th>
              <th>Sobre qué</th>
              <th>Detalle</th>
            </tr>
          </thead>
          <tbody>
            {AUDITORIA.map((a) => (
              <tr key={a.hora}>
                <td className={s.secundario}>{a.hora}</td>
                <td className={s.fuerte}>{a.usuario}</td>
                <td>{a.accion}</td>
                <td className={s.secundario}>{a.entidad}</td>
                <td className={s.secundario}>{a.detalle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
