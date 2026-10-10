import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DEMO_ACTIVA, PROBAR, RUTA_PROBAR } from '@/lib/demo';
import { PRIVACIDAD } from '@/lib/privacidad';
import Portada from '../_pagina/Portada';
import { alternos } from '../_pagina/meta';
import FormularioDemo from './FormularioDemo';
import c from '../contacto/contacto.module.css';
import s from './probar.module.css';

/* "Probalo 14 días". Conversión, no captación: noindex y fuera del sitemap, como /contacto.
 * Con `NEXT_PUBLIC_DEMO_ACTIVA` apagada la ruta no existe (404). */

export const metadata: Metadata = {
  title: PROBAR.title,
  description: PROBAR.description,
  robots: { index: false, follow: false },
  alternates: alternos(RUTA_PROBAR),
};

export default function Probar() {
  if (!DEMO_ACTIVA) notFound();

  return (
    <>
      <Portada tag={PROBAR.tag} titulo={PROBAR.titulo} bajada={PROBAR.bajada} />

      <div className={`envoltorio ${c.pagina}`}>
        <div className={c.cuerpo}>
          <FormularioDemo />

          <aside className={c.lateral}>
            <p className={s.lateralTitulo}>{PROBAR.queTrae}</p>
            <ul className={s.lista}>
              {PROBAR.trae.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className={c.pie}>{PROBAR.pie}</p>
            <p className={c.pie}>
              {PROBAR.privacidad} <Link href="/privacidad">{PRIVACIDAD.enlace}</Link>
            </p>
          </aside>
        </div>
      </div>
    </>
  );
}
