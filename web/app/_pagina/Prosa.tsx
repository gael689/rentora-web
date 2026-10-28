import type { Seccion } from '@/lib/seo';
import Reveal from '@/components/animacion/Reveal';
import Linea from '@/components/animacion/Linea';
import s from '../seo.module.css';

/* Secciones de texto corrido. Nada de texto suelto sobre blanco: van en una banda a sangre con
 * degradé suave teal / gris azulado, en columnas separadas por un hilo con degradé, cada una con una
 * barrita de acento sobre el título (referencia: la banda "Misión / Visión" de la imagen 16). Texto
 * oscuro sobre fondo claro: contraste AA con holgura. Cada columna aparece escalonada: barra, título,
 * texto. */
export default function Prosa({ secciones }: { secciones: Seccion[] }) {
  return (
    <section className={`sangre ${s.prosaBanda}`}>
      <div className={s.prosaGrilla}>
        {secciones.map((x, i) => (
          <article key={x.titulo} className={s.prosaCol}>
            <Linea className={s.prosaBarra} i={i} />
            <Reveal as="h2" i={i} className={`titular-fila ${s.subtitulo}`}>
              {x.titulo}
            </Reveal>
            <Reveal i={i + 1} className={s.prosa}>
              {x.parrafos.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </Reveal>
          </article>
        ))}
      </div>
    </section>
  );
}
