import Link from 'next/link';
import { HOME } from '@/lib/contenido';
import { pantalla } from '@/lib/sistema/pantallas';
import Pantalla from '@/components/sistema/Pantalla';
import Icono from '@/components/sistema/Icono';
import Ajustado from './Ajustado';
import { Rotulo, Flotante, Telefono } from './Piezas';
import s from './home.module.css';

/* Secciones alternadas imagen / texto. Cada una: rótulo, H2 corto, una oración, hasta cuatro
 * viñetas con tilde y un link. La imagen es la pantalla real, recortada sobre un panel teñido del
 * tono de la sección, con un chip apoyado en el borde; la de la web va en dos celulares. */
export default function Funciones() {
  return (
    <div className={s.funciones}>
      <div className="envoltorio">
        {HOME.funciones.map((f, i) => {
          const meta = f.pantalla ? pantalla(f.pantalla) : undefined;
          const id = `t-funcion-${i}`;
          return (
            <article key={f.rotulo} className={`${s.funcion} ${i % 2 ? s.funcionInvertida : ''}`} aria-labelledby={id} data-tono={f.tono}>
              <div className={s.funcionTexto}>
                <Rotulo texto={f.rotulo} icono={f.icono} tono={f.tono} />
                <h2 id={id} className="titular-seccion">
                  {f.titulo}
                </h2>
                <p className="bajada">{f.frase}</p>
                <ul className={s.tildes}>
                  {f.puntos.map((p) => (
                    <li key={p}>
                      <span className={s.tilde} aria-hidden="true">
                        <Icono nombre="tilde" tam={14} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <Link href={f.link.href} className="cta-sec">
                  {f.link.texto}
                  <Icono nombre="flecha" tam={16} />
                </Link>
              </div>

              <div className={s.funcionVisual}>
                {meta ? (
                  <div className={s.recorte}>
                    <div className={s.recorteInterior}>
                      <Ajustado ruta={meta.ruta} inicial={0.6}>
                        <Pantalla slug={meta.slug} conVisor={false} />
                      </Ajustado>
                    </div>
                  </div>
                ) : (
                  <div className={s.telefonos}>
                    {f.telefonos.map((t, j) => (
                      <Telefono key={t.src} src={t.src} alt={t.alt} className={j ? s.telefonoAtras : s.telefonoFrente} />
                    ))}
                  </div>
                )}
                {f.chips.map((c) => (
                  <Flotante key={c.texto} icono={c.icono} texto={c.texto} tono={f.tono} className={s.funcionChip} />
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
