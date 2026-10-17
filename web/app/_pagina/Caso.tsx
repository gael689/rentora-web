import Link from 'next/link';
import { CASO, textoCaso } from '@/lib/contenido';
import { Rotulo } from '@/components/home/Piezas';
import Icono from '@/components/sistema/Icono';
import Acento from './Titulo';
import s from './bloques.module.css';

/* El caso, anonimizado: dónde corre hoy el sistema. Solo lo verificable (las cifras de `CIFRAS`,
 * contadas sobre el código); sin testimonio y sin el nombre de la rentadora hasta que autorice
 * (`CASO.conNombre`). Va en /sistema y en /que-incluye. */
export default function Caso({ link }: { link?: { href: string; texto: string } }) {
  return (
    <section className={s.caso} data-tono="menta" aria-labelledby="t-caso">
      <div className={s.casoTexto}>
        <Rotulo texto={CASO.rotulo} icono="tildes" tono="menta" />
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
          {CASO.cifras.map((c) => (
            <li key={c.texto}>
              <b>{c.cifra}</b>
              <span>{c.texto}</span>
            </li>
          ))}
        </ul>
        <p className={s.casoNota}>{CASO.nota}</p>
      </div>
    </section>
  );
}
