import Link from 'next/link';
import { T } from '@/lib/contenido';
import { linkWhatsapp } from '@/lib/sitio';
import { DEMO_ACTIVA, DEMO_CTA, RUTA_PROBAR } from '@/lib/demo';
import Icono from '@/components/sistema/Icono';
import Acento from './Titulo';

/* El cierre de toda página interna (v4b): la misma banda con degradé de marca que la home, el
 * formulario como acción principal y WhatsApp al lado. Con la demo prendida suma un link a
 * /probar; apagada, no existe. `cierre-comun` es lo que verificar-seo descuenta del conteo de
 * palabras propias, y corta en el primer `</section>`: adentro no va otra sección. */
export default function Cierre({
  titulo,
  bajada,
  cta = 'Contame cómo trabajás',
  secundario,
  demo = DEMO_CTA.cierre,
}: {
  titulo: string;
  bajada?: string;
  cta?: string;
  secundario?: { href: string; texto: string };
  /** El texto del link a la demo, si la página quiere uno propio. */
  demo?: string;
}) {
  return (
    <section className="cierre-comun banda-cierre">
      <div className="envoltorio">
        <div className="banda-cierre-cuerpo">
          <div className="banda-cierre-texto">
            <h2 className="titular-bloque">
              <Acento texto={titulo} />
            </h2>
            {bajada && <p>{bajada}</p>}
          </div>
          <div className="banda-cierre-acciones">
            <Link href="/contacto" className="btn-blanco">
              {cta}
              <Icono nombre="flecha" tam={18} />
            </Link>
            <a href={linkWhatsapp(T.whatsappMensaje)} className="btn-vidrio" target="_blank" rel="noopener" data-cta="cierre">
              <Icono nombre="whatsapp" tam={18} />
              {T.whatsapp}
            </a>
            {DEMO_ACTIVA && (
              <Link href={RUTA_PROBAR} className="banda-cierre-demo" data-cta="cierre-demo">
                {demo}
              </Link>
            )}
            {secundario && (
              <Link href={secundario.href} className="cta-sec">
                {secundario.texto}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
