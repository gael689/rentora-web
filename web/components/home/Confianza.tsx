import { HOME } from '@/lib/contenido';
import Icono from '@/components/sistema/Icono';
import s from './home.module.css';

/* La fila de confianza bajo el hero (v6b): los mismos cuatro puntos de antes, corriendo en una cinta
 * continua. La lista se repite para llenar el ancho y va dos veces para que el bucle no corte; las
 * copias son `aria-hidden`. Se mueve siempre, sin depender de la configuración del sistema. */
export default function Confianza() {
  const c = HOME.confianza;
  const vuelta = [...c.items, ...c.items, ...c.items];
  const fila = (copia: boolean) => (
    <ul className={s.cintaFila} aria-hidden={copia || undefined}>
      {vuelta.map((x, i) => (
        <li key={`${x.texto}-${i}`} className={s.cintaPunto} aria-hidden={(!copia && i >= c.items.length) || undefined}>
          <span className={s.cifraIcono} aria-hidden="true">
            <Icono nombre={x.icono} tam={16} />
          </span>
          {x.cifra && <b className={s.cifra}>{x.cifra}</b>}
          <span>{x.texto}</span>
        </li>
      ))}
    </ul>
  );
  return (
    <section className={`banda-oscura ${s.confianza}`} aria-label={c.etiqueta}>
      <div className="cinta">
        <div className="cinta-pista">
          {fila(false)}
          {fila(true)}
        </div>
      </div>
    </section>
  );
}
