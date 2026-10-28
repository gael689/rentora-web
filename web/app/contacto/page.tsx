import type { Metadata } from 'next';
import { CONTACTO } from '@/lib/paginas';
import Link from 'next/link';
import { PRIVACIDAD } from '@/lib/privacidad';
import { T } from '@/lib/contenido';
import { linkWhatsapp } from '@/lib/sitio';
import Portada from '../_pagina/Portada';
import Formulario from './Formulario';
import s from './contacto.module.css';
import { alternos } from '../_pagina/meta';

/* /contacto no tiene término propio: es conversión, no captación. Va noindex para que no
 * compita con la home ni con los módulos por ninguna consulta. */
export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contame cuántos autos tenés, cuántas sucursales y si querés la web de reservas. Te respondo yo, con lo que te sirve y cómo arrancar.',
  robots: { index: false, follow: true },
  alternates: alternos('/contacto'),
};

export default function Contacto() {
  return (
    <>
      <Portada titulo={CONTACTO.titulo} bajada={CONTACTO.bajada} />

      <div className={`envoltorio ${s.pagina}`}>
        <div className={s.cuerpo}>
          <Formulario />

          <aside className={s.lateral}>
            <p className={s.pie}>{CONTACTO.pie}</p>
            <p className={s.pie}>
              {PRIVACIDAD.avisoFormulario} <Link href="/privacidad">{PRIVACIDAD.enlace}</Link>
            </p>
            <a
              href={linkWhatsapp(T.whatsappMensaje)}
              className="btn-linea"
              target="_blank"
              rel="noopener"
              data-cta="contacto"
            >
              {CONTACTO.whatsapp}
            </a>
          </aside>
        </div>
      </div>
    </>
  );
}
