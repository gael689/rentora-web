import type { PreguntaFaq } from '@/lib/seo';
import s from '../seo.module.css';

/* Las preguntas de una página, en acordeón de dos columnas, con su `FAQPage`. El schema sale de acá
 * y de ningún otro lado: así no puede pasar que la página muestre unas preguntas y el JSON-LD
 * declare otras. Las respuestas están en el HTML aunque el `<details>` esté cerrado: Google las lee
 * y verificar-seo las cuenta. */
export default function FaqLista({
  titulo,
  preguntas,
  id,
}: {
  titulo: string;
  preguntas: PreguntaFaq[];
  /** URL absoluta de la página, para el `@id`. */
  id: string;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${id}#faq`,
    inLanguage: 'es-AR',
    mainEntity: preguntas.map((f) => ({
      '@type': 'Question',
      name: f.p,
      acceptedAnswer: { '@type': 'Answer', text: f.r },
    })),
  };
  const mitad = Math.ceil(preguntas.length / 2);
  const columnas = [preguntas.slice(0, mitad), preguntas.slice(mitad)].filter((c) => c.length);
  return (
    <section className={s.bloque}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h2 className={s.rotulo}>{titulo}</h2>
      <div className={s.faq}>
        {columnas.map((col, i) => (
          <div key={i} className={s.faqColumna}>
            {col.map((f) => (
              <details key={f.p} className={s.pregunta}>
                <summary>
                  <h3>{f.p}</h3>
                  <span className={s.mas} aria-hidden="true" />
                </summary>
                <p>{f.r}</p>
              </details>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
