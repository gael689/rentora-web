import Link from 'next/link';
import { T } from '@/lib/contenido';
import { linkWhatsapp } from '@/lib/sitio';
import Icono from '@/components/sistema/Icono';
import Ruta from '@/components/marca/Ruta';
import { rv } from '@/components/animacion/Reveal';
import Acento from './Titulo';
import s from './pagina.module.css';

/* El cierre de toda página interna: el mismo bloque que el `Gancho` (malla noche con la ruta,
 * WhatsApp como salida directa y el formulario al lado). Reemplaza al cierre viejo de banda con
 * degradé. `cierre-comun` es lo que verificar-seo descuenta del conteo de palabras propias, y corta
 * en el primer `</section>`: adentro no va otra sección. */
export default function Cierre({
  titulo,
  bajada,
  cta = 'Contame cómo trabajás',
}: {
  titulo: string;
  bajada?: string;
  /** El texto del botón que lleva al formulario. */
  cta?: string;
  /** Se aceptan por compatibilidad con las páginas que todavía los pasan; no hacen nada. */
  secundario?: { href: string; texto: string };
  demo?: string;
}) {
  return (
    <section className="cierre-comun">
      <div className="envoltorio">
        <div className={`banda-oscura ${s.gancho}`} {...rv(0, 'escala')}>
          <Ruta className={s.ganchoRuta} />
          <div className={s.ganchoTexto}>
            <h2 className="titular-seccion">
              <Acento texto={titulo} />
            </h2>
            {bajada && <p className="bajada">{bajada}</p>}
          </div>
          <div className={s.ganchoAcciones}>
            <a href={linkWhatsapp(T.whatsappMensaje)} className="cta" target="_blank" rel="noopener" data-cta="cierre">
              <Icono nombre="whatsapp" tam={18} />
              {T.whatsapp}
            </a>
            <Link href="/contacto" className="btn-vidrio" data-cta="cierre-contacto">
              {cta}
              <Icono nombre="flecha" tam={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
