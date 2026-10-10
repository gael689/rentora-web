import type { Seccion } from '@/lib/seo';
import s from '../seo.module.css';

/* Secciones de texto corrido: subtítulo y párrafos, al ancho de lectura. */
export default function Prosa({ secciones }: { secciones: Seccion[] }) {
  return (
    <>
      {secciones.map((x) => (
        <section key={x.titulo} className={s.bloque}>
          <h2 className={`titular-fila ${s.subtitulo}`}>{x.titulo}</h2>
          <div className={s.prosa}>
            {x.parrafos.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
