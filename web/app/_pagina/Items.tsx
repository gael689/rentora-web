import type { ItemConIcono } from '@/lib/seo';
import Icono from '@/components/sistema/Icono';
import s from './bloques.module.css';

/* Una lista de ítems con orbe de ícono, título y una línea. Para /que-incluye y /web-a-medida. */
export default function Items({ items, tono = 'turq', columnas = 2 }: { items: ItemConIcono[]; tono?: string; columnas?: 1 | 2 }) {
  return (
    <ul className={s.items} data-columnas={columnas}>
      {items.map((x) => (
        <li key={x.titulo} className={s.item} data-tono={tono}>
          <span className="orbe" aria-hidden="true">
            <Icono nombre={x.icono} tam={20} />
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
