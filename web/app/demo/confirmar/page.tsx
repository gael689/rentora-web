import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { API_URL, CONFIRMAR, DEMO_ACTIVA, RUTA_PROBAR } from '@/lib/demo';
import Portada from '../../_pagina/Portada';
import BotonConfirmar from './BotonConfirmar';
import c from '../../contacto/contacto.module.css';
import s from '../../probar/probar.module.css';

/* El link del mail de confirmación. **No confirma al cargar**: los filtros de los correos
 * corporativos abren los links para revisarlos, y un GET que crea una demo crearía demos que nadie
 * pidió. Muestra un botón; el botón es un <form> que hace POST a la API, que crea la demo (o la
 * deja en cola) y redirige a /demo/lista?estado=… Anda sin JavaScript. */

export const metadata: Metadata = {
  title: CONFIRMAR.title,
  description: CONFIRMAR.description,
  robots: { index: false, follow: false },
  // Que el token del link no viaje a otro sitio en el Referer.
  referrer: 'no-referrer',
};

export default async function Confirmar({
  searchParams,
}: {
  searchParams: Promise<{ [k: string]: string | string[] | undefined }>;
}) {
  if (!DEMO_ACTIVA) notFound();
  const { token } = await searchParams;
  const t = typeof token === 'string' ? token.trim().slice(0, 200) : '';

  return (
    <>
      <Portada titulo={CONFIRMAR.titulo} bajada={t ? CONFIRMAR.bajada : CONFIRMAR.sinToken} />

      <div className={`envoltorio ${c.pagina} ${s.estado}`}>
        {t ? (
          <BotonConfirmar accion={`${API_URL}/api/v1/public/demos/confirmar`} token={t} texto={CONFIRMAR.boton} />
        ) : (
          <Link href={RUTA_PROBAR} className="btn-linea">
            {CONFIRMAR.pedirOtra}
          </Link>
        )}
      </div>
    </>
  );
}
