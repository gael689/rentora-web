import Link from 'next/link';
import { HOME } from '@/lib/contenido';
import Icono from '@/components/sistema/Icono';
import Reveal, { rv } from '@/components/animacion/Reveal';
import Linea from '@/components/animacion/Linea';
import Titular from './Titular';
import s from './home.module.css';

/* "Todo el sistema, en cuatro áreas": cada área es un panel delimitado (tinte del tono, borde fino,
 * sombra suave, esquina de 8 px: la excepción de la home a las esquinas rectas) y cada módulo es un
 * link visible como tal (fondo, flecha y cursor al pasar). El encabezado del área lleva a /modulos.
 * Al entrar al viewport el panel aparece escalonado, su filete superior se traza y los íconos se
 * dibujan uno tras otro. */
export default function Modulos() {
  const h = HOME.todo;
  return (
    <section className="seccion banda-suave" aria-labelledby="t-modulos">
      <div className="envoltorio">
        <Reveal as="header" className={s.cabezaCentro}>
          <h2 id="t-modulos" className="titular-seccion">
            <Titular t={h.titular} />
          </h2>
          <p className="bajada">{h.bajada}</p>
        </Reveal>

        <ul className={s.grupos}>
          {h.grupos.map((g, gi) => (
            <li key={g.titulo} className={s.grupo} data-tono={g.tono} {...rv(gi % 2)}>
              <Linea className={s.grupoFilete} i={(gi % 2) + 1} />
              <div className={s.grupoCabeza}>
                <span className="orbe" aria-hidden="true">
                  <Icono nombre={g.icono} tam={20} dibuja />
                </span>
                <h3 className={s.grupoTitulo}>
                  <Link href="/modulos" className={s.grupoTituloLink}>
                    {g.titulo}
                    <Icono nombre="flecha" tam={16} className={s.grupoFlecha} />
                  </Link>
                </h3>
              </div>
              <ul className={s.grupoLista}>
                {g.items.map((i, ii) => (
                  <li key={i.texto} style={{ ['--rv-i' as string]: ii + 1 }}>
                    <Link href={i.href} className={s.grupoItem}>
                      <span className={s.grupoItemIcono} aria-hidden="true">
                        <Icono nombre={i.icono} tam={16} dibuja />
                      </span>
                      <span className={s.grupoItemTexto}>{i.texto}</span>
                      <Icono nombre="flecha" tam={15} className={s.grupoItemFlecha} />
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <Reveal className={s.accionesCentro}>
          <Link href="/modulos" className="btn-linea">
            {h.verTodo}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
