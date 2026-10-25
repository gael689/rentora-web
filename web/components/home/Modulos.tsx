import Link from 'next/link';
import { HOME } from '@/lib/contenido';
import Icono from '@/components/sistema/Icono';
import Titular from './Titular';
import { Rotulo } from './Piezas';
import s from './home.module.css';

/* "Todo lo que podés hacer con RentaGo": cuatro grupos de módulos en tarjetas teñidas, dos por
 * fila en escritorio. Cada tarjeta lleva su lista de funciones con ícono, y cada función lleva a
 * su módulo. */
export default function Modulos() {
  const h = HOME.todo;
  return (
    <section className="seccion" aria-labelledby="t-modulos">
      <div className="envoltorio">
        <header className={s.cabezaCentro}>
          <Rotulo texto={h.rotulo} icono="panel" tono="turq" />
          <h2 id="t-modulos" className="titular-seccion">
            <Titular t={h.titular} />
          </h2>
          <p className="bajada">{h.bajada}</p>
        </header>

        <ul className={s.grupos}>
          {h.grupos.map((g) => (
            <li key={g.titulo} className={s.grupo} data-tono={g.tono}>
              <div className={s.grupoCabeza}>
                <span className="orbe" aria-hidden="true">
                  <Icono nombre={g.icono} tam={20} />
                </span>
                <h3 className={s.grupoTitulo}>{g.titulo}</h3>
              </div>
              <ul className={s.grupoLista}>
                {g.items.map((i) => (
                  <li key={i.texto}>
                    <Link href={i.href} className={s.grupoItem}>
                      <span className={s.grupoItemIcono} aria-hidden="true">
                        <Icono nombre={i.icono} tam={16} />
                      </span>
                      {i.texto}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className={s.accionesCentro}>
          <Link href="/modulos" className="btn-linea">
            {h.verTodo}
          </Link>
          <Link href="/sistema" className="cta-sec">
            {h.verPantallas}
            <Icono nombre="flecha" tam={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
