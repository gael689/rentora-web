/* Configuración — `/configuracion`.
 *
 * Réplica de `pages/configuracion/ConfiguracionPage.tsx`.
 *
 * Los datos de la empresa, las sucursales, los plazos del excedente y el clausulado vigente. Es
 * la pantalla que se toca una vez al principio y después casi nunca — y por eso conviene que
 * esté ordenada: cuando alguien vuelve acá es porque algo cambió y tiene apuro.
 *
 * Los dos valores del medio son los que gobiernan la devolución tardía. Están acá y no
 * escondidos en el código, que es lo que permite que cada rentadora fije su propia regla en vez
 * de heredar la de otro. */

import { CONFIGURACION, RENTADORA } from '@/lib/sistema/valle';
import { Badge } from '../primitivas';
import Icono from '../Icono';
import s from '../sistema.module.css';

function Bloque({ titulo, filas }: { titulo: string; filas: string[][] }) {
  return (
    <div className={s.tarjeta}>
      <header className={s.tarjetaCabeza}>
        <span>{titulo}</span>
      </header>
      <table className={s.tabla}>
        <tbody>
          {filas.map(([que, valor]) => (
            <tr key={que}>
              <td className={s.secundario}>{que}</td>
              <td className={s.fuerte} style={{ textAlign: 'right' }}>
                {valor}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Configuracion() {
  return (
    <>
      <div className={s.barraTitulo}>
        <h4 className={s.titulo}>Configuración</h4>
        <div className={s.acciones}>
          <Badge tono="success">Todo cargado</Badge>
          <span className={`${s.boton} ${s.botonPrimario}`}>
            <Icono nombre="tilde" tam={13} /> Guardar cambios
          </span>
        </div>
      </div>

      <div className={s.tres}>
        <Bloque titulo="La empresa" filas={CONFIGURACION.empresa} />
        <Bloque titulo="La operación" filas={CONFIGURACION.operacion} />
        <Bloque titulo="Avisos" filas={CONFIGURACION.avisos} />
      </div>

      <div className={s.tarjeta}>
        <header className={s.tarjetaCabeza}>
          <span>Sucursales</span>
          <span className={s.secundario}>
            Cada una con su dirección y su horario. El lugar de retiro y el de devolución pueden
            ser distintos.
          </span>
        </header>
        <table className={s.tabla}>
          <thead>
            <tr>
              <th>Sucursal</th>
              <th>Dirección</th>
              <th>Horario</th>
              <th>Entrega fuera de sucursal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={s.fuerte}>{RENTADORA.sucursales[0]}</td>
              <td>Av. San Martín 1240, {RENTADORA.ciudad}</td>
              <td className={s.secundario}>Lun a sáb, 08:00 a 20:00</td>
              <td className={s.secundario}>A coordinar</td>
            </tr>
            <tr>
              <td className={s.fuerte}>{RENTADORA.sucursales[1]}</td>
              <td>Terminal de arribos, {RENTADORA.ciudad}</td>
              <td className={s.secundario}>Todos los días, según vuelos</td>
              <td className={s.secundario}>Adicional con precio</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
