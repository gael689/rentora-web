/* El marco de la aplicación: barra lateral, encabezado y el área de contenido.
 *
 * Réplica de `AppLayout.tsx` + `Header.tsx`. El encabezado lleva el título de la pantalla, el
 * buscador global con su atajo, y quien inició sesión — que en el sistema es el mismo nombre
 * que el backend registra en "cobrado por" y "autorizado por", así que no es decorativo.
 *
 * `completa` reproduce el `fullBleed` del sistema: las pantallas con layout propio —la
 * ocupación y el cotizador— no llevan el padding del contenedor. */

import { RENTADORA, RELOJ } from '@/lib/sistema/valle';
import BarraLateral from './BarraLateral';
import Icono from './Icono';
import s from './sistema.module.css';

export default function Marco({
  ruta,
  titulo,
  completa = false,
  children,
  encima,
}: {
  ruta: string;
  titulo: string;
  completa?: boolean;
  children: React.ReactNode;
  /** Un modal por encima de toda la aplicación: las operaciones viven ahí. */
  encima?: React.ReactNode;
}) {
  return (
    <div className={s.marco}>
      <BarraLateral activa={ruta} />

      <div className={s.principal}>
        <header className={s.encabezado}>
          <h3 className={s.encabezadoTitulo}>{titulo}</h3>

          <div className={s.buscador}>
            <Icono nombre="buscar" tam={13} />
            <span>Buscar…</span>
            <kbd className={s.tecla}>Ctrl K</kbd>
          </div>

          <div className={s.usuario}>
            <span>{RENTADORA.operador}</span>
            <span className={s.avatar}>RV</span>
          </div>
        </header>

        <div className={`${s.cuerpo} ${completa ? s.cuerpoCompleto : ''}`}>{children}</div>
      </div>

      {encima}
    </div>
  );
}

/** El reloj de la demo, para las pantallas que lo muestran. */
export { RELOJ };
