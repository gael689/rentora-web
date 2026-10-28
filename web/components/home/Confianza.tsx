import { HOME } from '@/lib/contenido';
import Icono from '@/components/sistema/Icono';
import { rv } from '@/components/animacion/Reveal';
import s from './home.module.css';

/* La fila de confianza: cifras verificadas sobre el código, como chips compactos. Sin contadores:
 * el número ya está escrito. Va dentro del mismo contenedor (`envoltorio`) que el resto de la home. */
export default function Confianza() {
  const c = HOME.confianza;
  return (
    <section className={`banda-oscura ${s.confianza}`} aria-label={c.etiqueta}>
      <ul className={`envoltorio ${s.confianzaLista}`}>
        {c.items.map((x, i) => (
          <li key={x.texto} className={s.cifraChip} data-tono={x.tono} {...rv(i)}>
            <span className={s.cifraIcono} aria-hidden="true">
              <Icono nombre={x.icono} tam={16} dibuja />
            </span>
            {x.cifra && <b className={s.cifra}>{x.cifra}</b>}
            <span>{x.texto}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
