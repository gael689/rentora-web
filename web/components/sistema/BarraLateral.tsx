/* La barra lateral del sistema.
 *
 * Cinco secciones con título en mayúsculas chicas y 23 ítems, todos siempre a la vista: no hay
 * grupos plegables ni un color de acento por sección. Hay un solo acento —el ítem activo, con
 * fondo del color de marca y texto blanco— sobre una barra de superficie clara tintada. Es lo
 * que hace el `Sidebar.tsx` real desde fines de septiembre.
 *
 * El activo es el ítem más específico: en `/caja` es el de la pestaña abierta. `activa` puede
 * traer `?tab=`; si no lo trae, `/caja` cae en "A cobrar", que es lo que abre la Caja base. */

import { SECCIONES, type ItemNav } from '@/lib/sistema/navegacion';
import Icono from './Icono';
import s from './sistema.module.css';

function elegirActivo(activa: string): string | undefined {
  const [path, query] = activa.split('?');
  const tab = query?.startsWith('tab=') ? query.slice(4) : undefined;
  const todos: ItemNav[] = SECCIONES.flatMap((sec) => sec.items);

  // Pantallas con pestañas (Caja): coincide el path y la pestaña; sin pestaña, la primera.
  const conTabs = todos.filter((i) => i.path === path && i.tab);
  if (conTabs.length) return (conTabs.find((i) => i.tab === tab) ?? conTabs[0]).ruta;

  // El resto: el path más largo que sea igual o prefijo de la ruta activa.
  const candidatos = todos
    .filter((i) => !i.tab && (path === i.path || path.startsWith(`${i.path}/`)))
    .sort((a, b) => b.path.length - a.path.length);
  return candidatos[0]?.ruta;
}

export default function BarraLateral({ activa }: { activa: string }) {
  const rutaActiva = elegirActivo(activa);

  return (
    <aside className={s.lateral}>
      <div className={s.marca}>
        <span className={s.marcaPunto} />
        <span className={s.marcaNombre}>RENTORA</span>
      </div>

      <nav className={s.nav} aria-label="Módulos del sistema">
        {SECCIONES.map((sec) => (
          <div key={sec.titulo} className={s.seccion}>
            <p className={s.seccionTitulo}>{sec.titulo}</p>
            {sec.items.map((item) => {
              const activo = item.ruta === rutaActiva;
              return (
                <span
                  key={item.ruta}
                  className={`${s.item} ${activo ? s.itemActivo : ''}`}
                  aria-current={activo ? 'page' : undefined}
                >
                  <Icono nombre={item.icono} tam={14} />
                  <span>{item.label}</span>
                </span>
              );
            })}
          </div>
        ))}
      </nav>

      <div className={s.alertas}>
        <span>Alertas</span>
        <span className={s.alertasPunto}>6</span>
      </div>
    </aside>
  );
}
