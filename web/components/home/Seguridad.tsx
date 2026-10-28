import { HOME } from '@/lib/contenido';
import Icono from '@/components/sistema/Icono';
import Reveal, { rv } from '@/components/animacion/Reveal';
import Linea from '@/components/animacion/Linea';
import Titular from './Titular';
import s from './home.module.css';

/* Seguridad y datos. Cada punto está verificado contra rentago-system (aislamiento por empresa con
 * RLS, roles admin / operador / caja / lectura, auditoría de solo agregar, snapshot del contrato,
 * exportación a CSV y Excel). Backups no se afirman. Si algo de esta lista deja de ser cierto en el
 * producto, es un bug. */
export default function Seguridad() {
  const h = HOME.seguridad;
  return (
    <section className={`seccion banda-suave ${s.seguridad}`} aria-labelledby="t-seguridad">
      <div className={`envoltorio ${s.seguridadGrilla}`}>
        <Reveal as="header" className={s.cabezaLateral} dir="izquierda">
          <h2 id="t-seguridad" className="titular-seccion">
            <Titular t={h.titular} />
          </h2>
          <p className="bajada">{h.bajada}</p>
        </Reveal>
        <ul className={s.garantias}>
          {h.items.map((x, i) => (
            <li key={x.titulo} className={s.garantia} data-tono={x.tono} {...rv(i)}>
              <Linea className={s.garantiaLinea} i={i} />
              <span className="orbe" aria-hidden="true">
                <Icono nombre={x.icono} tam={20} dibuja />
              </span>
              <div>
                <h3 className={s.garantiaTitulo}>{x.titulo}</h3>
                <p className={s.garantiaTexto}>{x.texto}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
