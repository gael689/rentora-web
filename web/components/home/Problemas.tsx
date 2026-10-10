import Link from 'next/link';
import { HOME } from '@/lib/contenido';
import Icono from '@/components/sistema/Icono';
import Titular from './Titular';
import { Rotulo } from './Piezas';
import s from './home.module.css';

/* Cuatro problemas de mostrador antes de las funciones: reservas superpuestas, precios, contratos
 * y vencimientos, cobros. El visitante se tiene que reconocer en los primeros diez segundos; ese
 * reconocimiento es la conversión. Las frases entre comillas salen de `PROBLEMAS`. */
export default function Problemas() {
  const h = HOME.problemas;
  return (
    <section className="seccion" aria-labelledby="t-problemas">
      <div className="envoltorio">
        <header className={s.cabezaCentro}>
          <Rotulo texto={h.rotulo} icono="alerta" tono="petro" />
          <h2 id="t-problemas" className="titular-seccion">
            <Titular t={h.titular} />
          </h2>
          <p className="bajada">{h.bajada}</p>
        </header>

        <ul className={s.problemas}>
          {h.items.map((p) => (
            <li key={p.titulo} className={s.problema} data-tono={p.tono}>
              <span className="orbe" aria-hidden="true">
                <Icono nombre={p.icono} tam={20} />
              </span>
              <h3 className={s.problemaTitulo}>{p.titulo}</h3>
              <div className={s.problemaDolores}>
                {p.dolores.map((d) => (
                  <p key={d}>{d}</p>
                ))}
              </div>
              <p className={s.problemaGana}>{p.gana}</p>
              <Link href={p.link.href} className={`cta-sec ${s.problemaLink}`}>
                {p.link.texto}
                <Icono nombre="flecha" tam={16} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
