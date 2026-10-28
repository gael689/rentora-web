import Link from 'next/link';
import { CASO, textoCaso } from '@/lib/contenido';
import Icono from '@/components/sistema/Icono';
import Reveal, { rv } from '@/components/animacion/Reveal';
import Acento from './Titulo';
import s from './bloques.module.css';

/* El caso, anonimizado: dónde corre hoy el sistema. Solo lo verificable (frases sin cifras);
 * sin testimonio y sin el nombre de la rentadora hasta que autorice
 * (`CASO.conNombre`). Va en /sistema y en /planes. Es una card verde menta de esquinas redondeadas
 * (la excepción a las esquinas rectas del sitio) con las frases en mini-cards blancas. */
export default function Caso({ link }: { link?: { href: string; texto: string } }) {
  return (
    <Reveal as="section" dir="escala" className={s.caso} data-tono="menta" aria-labelledby="t-caso">
      <div className={s.casoTexto}>
        <h2 id="t-caso" className="titular-bloque">
          <Acento texto={CASO.titulo} />
        </h2>
        <p className={s.casoBajada}>{textoCaso()}</p>
        {link && (
          <Link href={link.href} className="cta-sec">
            {link.texto}
            <Icono nombre="flecha" tam={16} />
          </Link>
        )}
      </div>
      <div className={s.casoCifras}>
        <ul>
          {CASO.frases.map((f, i) => (
            <li key={f} {...rv(i + 1)}>
              <span className={s.casoMarca} aria-hidden="true">
                <Icono nombre="tilde" tam={16} dibuja />
              </span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
