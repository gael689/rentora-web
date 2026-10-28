import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DEMO_ACTIVA, LISTA, PROBAR, RUTA_PROBAR, type EstadoLista } from '@/lib/demo';
import { linkWhatsapp } from '@/lib/sitio';
import Portada from '../../_pagina/Portada';
import c from '../../contacto/contacto.module.css';
import s from '../../probar/probar.module.css';

/* Adonde redirige la API después del botón de confirmar:
 * `/demo/lista?estado=creada|en_cola|vencido|invalido` (`demos_publico.py`). Un estado que no
 * se conoce se muestra como link inválido. */

export const metadata: Metadata = {
  title: LISTA.title,
  description: LISTA.description,
  robots: { index: false, follow: false },
};

const esEstado = (e: unknown): e is EstadoLista => typeof e === 'string' && e in LISTA.estados;

export default async function Lista({
  searchParams,
}: {
  searchParams: Promise<{ [k: string]: string | string[] | undefined }>;
}) {
  if (!DEMO_ACTIVA) notFound();
  const { estado } = await searchParams;
  const e: EstadoLista = esEstado(estado) ? estado : 'invalido';
  const v = LISTA.estados[e];
  const pedirDeNuevo = e === 'vencido' || e === 'invalido';

  return (
    <>
      <Portada titulo={v.titulo} bajada={v.bajada} tono={e === 'creada' ? 'menta' : 'turq'} />

      <div className={`envoltorio ${c.pagina} ${s.estado}`}>
        <div className={s.acciones}>
          {pedirDeNuevo ? (
            <Link href={RUTA_PROBAR} className="cta">
              {LISTA.pedirOtra}
              <span className="flecha" aria-hidden="true">
                →
              </span>
            </Link>
          ) : (
            e === 'en_cola' && (
            <Link href="/modulos" className="cta">
              {LISTA.verSistema}
              <span className="flecha" aria-hidden="true">
                →
              </span>
            </Link>
            )
          )}
          <a href={linkWhatsapp(PROBAR.whatsappMensaje)} className="btn-linea" target="_blank" rel="noopener">
            {LISTA.whatsapp}
          </a>
        </div>
      </div>
    </>
  );
}
