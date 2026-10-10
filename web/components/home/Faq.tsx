import Link from 'next/link';
import { HOME, FAQS } from '@/lib/contenido';
import Icono from '@/components/sistema/Icono';
import Titular from './Titular';
import { Rotulo } from './Piezas';
import s from './home.module.css';

/* Preguntas frecuentes en acordeón de dos columnas, con `<details>` nativo: abre sin JavaScript.
 * Sin `FAQPage` acá: el marcado completo vive en /preguntas, uno solo por página. */
export default function Faq() {
  const h = HOME.faq;
  const lista = FAQS.slice(0, h.cantidad);
  const mitad = Math.ceil(lista.length / 2);
  const columnas = [lista.slice(0, mitad), lista.slice(mitad)];
  return (
    <section className="seccion" id="preguntas" aria-labelledby="t-faq">
      <div className="envoltorio">
        <header className={s.cabezaCentro}>
          <Rotulo texto={h.rotulo} icono="pregunta" tono="azul" />
          <h2 id="t-faq" className="titular-seccion">
            <Titular t={h.titular} />
          </h2>
        </header>
        <div className={s.faqColumnas}>
          {columnas.map((col, i) => (
            <div key={i} className={s.faqColumna}>
              {col.map((f) => (
                <details key={f.q} className={s.pregunta}>
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
        <div className={s.accionesCentro}>
          <Link href="/preguntas" className="cta-sec">
            {h.todas}
            <Icono nombre="flecha" tam={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
