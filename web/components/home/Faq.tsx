import Link from 'next/link';
import { HOME, FAQS } from '@/lib/contenido';
import Icono from '@/components/sistema/Icono';
import Reveal, { rv } from '@/components/animacion/Reveal';
import Titular from './Titular';
import s from './home.module.css';

/* Preguntas frecuentes en acordeón de dos columnas, con `<details>` nativo: abre sin JavaScript.
 * Sin `FAQPage` acá: el marcado completo vive en /preguntas, uno solo por página. */
export default function Faq() {
  const h = HOME.faq;
  const lista = FAQS.slice(0, h.cantidad);
  const mitad = Math.ceil(lista.length / 2);
  const columnas = [lista.slice(0, mitad), lista.slice(mitad)];
  return (
    <section className="seccion banda-suave" id="preguntas" aria-labelledby="t-faq">
      <div className="envoltorio">
        <Reveal as="header" className={s.cabezaCentro}>
          <h2 id="t-faq" className="titular-seccion">
            <Titular t={h.titular} />
          </h2>
        </Reveal>
        <div className={s.faqColumnas}>
          {columnas.map((col, i) => (
            <div key={i} className={s.faqColumna}>
              {col.map((f, k) => (
                <details key={f.q} className={s.pregunta} {...rv(k + i)}>
                  <summary>
                    <span>{f.q}</span>
                    <span className={s.mas} aria-hidden="true" />
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          ))}
        </div>
        <Reveal className={s.accionesCentro}>
          <Link href="/preguntas" className="cta-sec">
            {h.todas}
            <Icono nombre="flecha" tam={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
