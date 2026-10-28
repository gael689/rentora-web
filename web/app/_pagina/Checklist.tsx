import Icono from '@/components/sistema/Icono';
import Reveal, { rv } from '@/components/animacion/Reveal';
import { partirPaso } from '@/lib/seo';
import s from '../seo.module.css';

/* La lista "Para revisar" de una guía, como panel de checklist: fondo con tinte, una card por paso
 * en grilla (una columna en móvil), cada una con un check que se dibuja al aparecer, el título corto
 * en negrita y el resto de la oración. Sin números ni hilos de planilla: invita a recorrerla. */
export default function Checklist({ titulo, pasos, tono = 'menta' }: { titulo: string; pasos: string[]; tono?: string }) {
  return (
    <section className={s.checkPanel} data-tono={tono} aria-labelledby="t-pasos">
      <Reveal as="h2" id="t-pasos" className={s.checkTitulo}>
        {titulo}
      </Reveal>
      <ul className={s.checkGrilla}>
        {pasos.map((p, i) => {
          const { titulo: t, resto } = partirPaso(p);
          return (
            <li key={p} className={s.checkPaso} {...rv(i)}>
              <span className={s.checkMarca} aria-hidden="true">
                <Icono nombre="tilde" tam={18} dibuja />
              </span>
              <p className={s.checkTexto}>
                <b>{t}</b>
                {resto}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
