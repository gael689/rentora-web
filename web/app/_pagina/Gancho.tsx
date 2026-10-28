import Link from 'next/link';
import { GANCHO } from '@/lib/contenido';
import { linkWhatsapp } from '@/lib/sitio';
import Icono from '@/components/sistema/Icono';
import Ruta from '@/components/marca/Ruta';
import { rv } from '@/components/animacion/Reveal';
import s from './pagina.module.css';

/* El gancho de las páginas internas (v6b): en vez de mostrar todas las pantallas, se muestran pocas
 * y se invita a verlas andando. Malla noche con la ruta y la grilla, WhatsApp como salida directa.
 * `cuantas` dice cuántas pantallas quedaron sin mostrar, si se quiere nombrar el número. */
export default function Gancho({ cuantas }: { cuantas?: number }) {
  return (
    <aside className={`banda-oscura ${s.gancho}`} aria-label={GANCHO.titulo} {...rv(0, 'escala')}>
      <Ruta className={s.ganchoRuta} />
      <div className={s.ganchoTexto}>
        <span className={s.ganchoRotulo}>
          {GANCHO.rotulo}
          {cuantas ? ` · ${cuantas} pantallas más` : ''}
        </span>
        <h2 className="titular-seccion">{GANCHO.titulo}</h2>
        <p className="bajada">{GANCHO.texto}</p>
      </div>
      <div className={s.ganchoAcciones}>
        <a href={linkWhatsapp(GANCHO.mensaje)} className="cta" target="_blank" rel="noopener" data-cta="gancho">
          <Icono nombre="whatsapp" tam={18} />
          {GANCHO.cta}
        </a>
        <Link href={GANCHO.secundario.href} className="btn-vidrio" data-cta="gancho-contacto">
          {GANCHO.secundario.texto}
          <Icono nombre="flecha" tam={18} />
        </Link>
      </div>
    </aside>
  );
}
