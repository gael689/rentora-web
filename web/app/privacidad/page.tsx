import type { Metadata } from 'next';
import Portada from '../_pagina/Portada';
import { PRIVACIDAD as P, COOKIES } from '@/lib/privacidad';
import s from '../_pagina/pagina.module.css';
import { alternos } from '../_pagina/meta';

/* Sin `robots` propio: hereda el del layout, que respeta INDEXAR. Antes forzaba `index: true` y
 * era la única página indexable del dominio provisorio. */
export const metadata: Metadata = {
  title: 'Política de privacidad y cookies',
  description: 'Qué datos pedimos en el formulario de Rentora, qué cookies usa el sitio y para qué, cuánto duran y cómo cambiar tu elección o pedir que borremos tus datos.',
  alternates: alternos('/privacidad'),
};

export default function Privacidad() {
  const K = COOKIES.politica;
  return (
    <>
      <Portada tag={P.tag} titulo={P.titulo} bajada={P.bajada} />
      <div className="envoltorio" style={{ paddingBlock: 'clamp(32px, 6vw, 72px)', maxWidth: 760 }}>
        <p className="nota">{P.actualizada}</p>
        {P.bloques.map((b) => (
          <section key={b.titulo} className={s.bloqueLegal}>
            <h2 className="titular-fila">{b.titulo}</h2>
            <p>{b.texto}</p>
          </section>
        ))}

        <section id="cookies" className={s.bloqueLegal}>
          <h2 className="titular-fila">{K.titulo}</h2>
          <p>{K.intro}</p>
          <table className={s.tablaCookies}>
            <thead>
              <tr>
                {K.columnas.map((c) => (
                  <th key={c} scope="col">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {K.filas.map((f) => (
                <tr key={f[0]}>
                  {f.map((celda, i) => (
                    <td key={i} data-rotulo={i > 0 ? K.columnas[i] : undefined}>
                      {celda}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p>{K.sinCookies}</p>
          <p>{K.terceros}</p>
          <p>{K.revocar}</p>
        </section>
      </div>
    </>
  );
}
