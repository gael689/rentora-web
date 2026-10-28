import type { ItemConIcono } from '@/lib/seo';
import Icono from '@/components/sistema/Icono';
import { rv } from '@/components/animacion/Reveal';
import s from './bloques.module.css';

/* Una lista de ítems con orbe de ícono, título y una línea. Para /planes, /para y /web-a-medida.
 * Cada ítem entra escalonado y su ícono se dibuja. */
export default function Items({
  items,
  tono = 'turq',
  columnas = 2,
  desliza = false,
  className,
}: {
  items: ItemConIcono[];
  tono?: string;
  columnas?: 1 | 2;
  /** Cada fila entra deslizándose de izquierda a derecha cuando el scroll la trae a pantalla. */
  desliza?: boolean;
  className?: string;
}) {
  return (
    <ul
      className={`${s.items}${columnas === 2 ? ' intercalado' : ''}${desliza ? ` ${s.desliza}` : ''}${className ? ` ${className}` : ''}`}
      data-columnas={columnas}
    >
      {items.map((x, i) => (
        <li
          key={x.titulo}
          className={s.item}
          data-tono={tono}
          {...(desliza ? rv(0, 'izquierda') : rv(i))}
        >
          <span className="orbe" aria-hidden="true">
            <Icono nombre={x.icono} tam={20} dibuja />
          </span>
          <div>
            <h3 className={s.itemTitulo}>{x.titulo}</h3>
            <p className={s.itemTexto}>{x.texto}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
