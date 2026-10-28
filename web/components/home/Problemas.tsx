import Link from 'next/link';
import { HOME } from '@/lib/contenido';
import Icono from '@/components/sistema/Icono';
import Reveal, { rv } from '@/components/animacion/Reveal';
import Titular from './Titular';
import s from './home.module.css';

/* Cuatro problemas de mostrador antes de las funciones, en un mosaico 7/5 – 5/7 (v6): la primera
 * tarjeta en malla noche, la última en turquesa y las del medio teñidas. Cada una: ícono, el
 * problema, cómo lo resuelve y el link al módulo. Las frases entre comillas (`dolores`) siguen en
 * los datos pero no se muestran: pedido de menos texto en la home. */
const SUPERFICIE = ['banda-oscura', '', '', 'malla-turquesa'];
const ESQUINA = ['esquina-ai', 'esquina-ad', 'esquina-bi', 'esquina-bd'];

export default function Problemas() {
  const h = HOME.problemas;
  return (
    <section className="seccion" aria-labelledby="t-problemas">
      <div className="envoltorio">
        <Reveal as="header" className={s.cabezaCentro}>
          <h2 id="t-problemas" className="titular-seccion">
            <Titular t={h.titular} />
          </h2>
          <p className="bajada">{h.bajada}</p>
        </Reveal>

        <ul className={s.mosaico}>
          {h.items.map((p, i) => (
            <li
              key={p.titulo}
              className={`${s.baldosa} ${SUPERFICIE[i]} ${ESQUINA[i]} ${SUPERFICIE[i] ? s.baldosaOscura : ''}`}
              data-tono={p.tono}
              {...rv(i % 2)}
            >
              <span className={s.baldosaIcono} aria-hidden="true">
                <Icono nombre={p.icono} tam={22} dibuja />
              </span>
              <h3 className={s.baldosaTitulo}>{p.titulo}</h3>
              <p className={s.baldosaTexto}>{p.gana}</p>
              <Link href={p.link.href} className={`cta-sec ${s.baldosaLink}`}>
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
