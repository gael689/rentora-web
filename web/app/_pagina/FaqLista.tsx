import type { PreguntaFaq } from '@/lib/seo';
import { rv } from '@/components/animacion/Reveal';
import s from '../seo.module.css';

export type CategoriaFaq = { titulo: string; preguntas: PreguntaFaq[] };

/* Las preguntas de una página, en acordeón, con su `FAQPage`. El schema sale de acá y de ningún otro
 * lado: así no puede pasar que la página muestre unas preguntas y el JSON-LD declare otras. Las
 * respuestas están en el HTML aunque el `<details>` esté cerrado: Google las lee y verificar-seo las
 * cuenta.
 *
 * Tres formas: lista en dos columnas (por defecto), lista en una columna (`unaColumna`) o varias
 * categorías con subtítulo (`categorias`, siempre una pregunta por fila). Todas salen cerradas. */
export default function FaqLista({
  titulo,
  preguntas = [],
  categorias,
  id,
  unaColumna = false,
  plano = false,
}: {
  titulo?: string;
  preguntas?: PreguntaFaq[];
  /** Si viene, la lista se parte en categorías con subtítulo y `preguntas` se ignora. */
  categorias?: CategoriaFaq[];
  /** URL absoluta de la página, para el `@id`. */
  id: string;
  /** Una pregunta por fila, ancho cómodo. */
  unaColumna?: boolean;
  /** Estética "foto y aire": sin cajas, sólo un hilo entre preguntas. */
  plano?: boolean;
}) {
  const todas = categorias ? categorias.flatMap((c) => c.preguntas) : preguntas;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${id}#faq`,
    inLanguage: 'es-AR',
    mainEntity: todas.map((f) => ({
      '@type': 'Question',
      name: f.p,
      acceptedAnswer: { '@type': 'Answer', text: f.r },
    })),
  };
  const detalle = (f: PreguntaFaq, i = 0) => (
    <details key={f.p} className={plano ? `${s.pregunta} ${s.preguntaPlana}` : s.pregunta} {...rv(i)}>
      <summary>
        <h3>{f.p}</h3>
        <span className={s.mas} aria-hidden="true" />
      </summary>
      <p>{f.r}</p>
    </details>
  );
  const script = <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;

  if (categorias) {
    return (
      <>
        {script}
        {categorias
          .filter((c) => c.preguntas.length)
          .map((c) => (
            <section key={c.titulo} className={s.bloque}>
              <h2 className={s.rotulo}>{c.titulo}</h2>
              <div className={s.faqUna}>{c.preguntas.map(detalle)}</div>
            </section>
          ))}
      </>
    );
  }

  const mitad = Math.ceil(todas.length / 2);
  const columnas = unaColumna ? [todas] : [todas.slice(0, mitad), todas.slice(mitad)].filter((c) => c.length);
  return (
    <section className={s.bloque}>
      {script}
      {titulo && <h2 className={s.rotulo}>{titulo}</h2>}
      <div className={unaColumna ? s.faqUna : s.faq}>
        {columnas.map((col, i) => (
          <div key={i} className={s.faqColumna}>
            {col.map(detalle)}
          </div>
        ))}
      </div>
    </section>
  );
}
