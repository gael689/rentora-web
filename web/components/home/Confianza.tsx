import { HOME } from '@/lib/contenido';
import Icono from '@/components/sistema/Icono';
import s from './home.module.css';

/* La fila de confianza: cifras verificadas sobre el código, como chips compactos. Sin contadores:
 * el número ya está escrito. */
export default function Confianza() {
  const c = HOME.confianza;
  return (
    <section className={s.confianza} aria-label={c.etiqueta}>
      <ul className={`envoltorio ${s.confianzaLista}`}>
        {c.items.map((x) => (
          <li key={x.texto} className={s.cifraChip} data-tono={x.tono}>
            <span className={s.cifraIcono} aria-hidden="true">
              <Icono nombre={x.icono} tam={16} />
            </span>
            {x.cifra && <b className={s.cifra}>{x.cifra}</b>}
            <span>{x.texto}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
