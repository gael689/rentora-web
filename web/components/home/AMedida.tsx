import Link from 'next/link';
import { HOME } from '@/lib/contenido';
import Icono from '@/components/sistema/Icono';
import { Rotulo } from './Piezas';
import DosMarcas from './DosMarcas';
import s from './home.module.css';

/* "A medida de tu rentadora" (v4c): la misma web de reservas con dos marcas inventadas. Mismo
 * patrón que las funciones (rótulo, H2 corto, una oración, cuatro viñetas, un link); el detalle
 * vive en /web-a-medida. */
export default function AMedida() {
  const h = HOME.aMedida;
  return (
    <section className={s.aMedida} aria-labelledby="t-a-medida">
      <div className="envoltorio">
        <div className={s.funcion} data-tono={h.tono}>
          <div className={s.funcionTexto}>
            <Rotulo texto={h.rotulo} icono={h.icono} tono={h.tono} />
            <h2 id="t-a-medida" className="titular-seccion">
              {h.titulo}
            </h2>
            <p className="bajada">{h.frase}</p>
            <ul className={s.tildes}>
              {h.puntos.map((p) => (
                <li key={p}>
                  <span className={s.tilde} aria-hidden="true">
                    <Icono nombre="tilde" tam={14} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <Link href={h.link.href} className="cta-sec">
              {h.link.texto}
              <Icono nombre="flecha" tam={16} />
            </Link>
          </div>
          <div className={s.funcionVisual}>
            <DosMarcas />
          </div>
        </div>
      </div>
    </section>
  );
}
