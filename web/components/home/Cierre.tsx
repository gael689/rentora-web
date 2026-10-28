import Link from 'next/link';
import { HOME, T } from '@/lib/contenido';
import { linkWhatsapp } from '@/lib/sitio';
import { DEMO_ACTIVA, DEMO_CTA, RUTA_PROBAR } from '@/lib/demo';
import Icono from '@/components/sistema/Icono';
import { rv } from '@/components/animacion/Reveal';
import Titular from './Titular';
import Ruta from '@/components/marca/Ruta';
import CierreForm from './CierreForm';

/* El cierre de la home: banda con el degradé de marca, WhatsApp como salida directa y, al lado, un
 * formulario corto (flota, sucursales, web de reservas). El formulario completo sigue en /contacto.
 * `cierre-comun` lo saca del conteo de palabras de verificar-seo, que corta en el primer
 * `</section>`: adentro no va otra sección. */
export default function Cierre() {
  const h = HOME.cierre;
  return (
    <section className="cierre-comun banda-cierre" id="contacto" aria-labelledby="t-cierre">
      <div className="envoltorio">
        <div className="banda-cierre-cuerpo grano" {...rv(0, "escala")}>
          <Ruta />
          <div className="banda-cierre-texto">
            <h2 id="t-cierre" className="titular-seccion">
              <Titular t={h.titular} />
            </h2>
            <p>{h.bajada}</p>
            <div className="banda-cierre-acciones">
              <a
                href={linkWhatsapp(T.whatsappMensaje)}
                className="btn-vidrio"
                target="_blank"
                rel="noopener"
                data-cta="cierre"
              >
                <Icono nombre="whatsapp" tam={18} />
                {h.ctaSecundario}
              </a>
              <Link href="/contacto" className="cta-sec">
                {h.form.mas}
                <Icono nombre="flecha" tam={16} />
              </Link>
              {DEMO_ACTIVA && (
                <Link href={RUTA_PROBAR} className="banda-cierre-demo" data-cta="cierre-demo">
                  {DEMO_CTA.home}
                </Link>
              )}
            </div>
          </div>
          <CierreForm />
        </div>
      </div>
    </section>
  );
}
