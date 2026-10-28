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
export type TextosGancho = {
  rotulo: string;
  titulo: string;
  texto: string;
  cta: string;
  mensaje: string;
  secundario: { texto: string; href: string };
  /** Si viene, el botón principal es un link interno (y WhatsApp pasa a ser el secundario). */
  principal?: { texto: string; href: string };
};

export default function Gancho({ cuantas, ...propios }: { cuantas?: number } & Partial<TextosGancho>) {
  const G = { ...GANCHO, ...propios };
  return (
    <aside className={`banda-oscura ${s.gancho}`} aria-label={G.titulo} {...rv(0, 'escala')}>
      <Ruta className={s.ganchoRuta} />
      <div className={s.ganchoTexto}>
        <span className={s.ganchoRotulo}>
          {G.rotulo}
          {cuantas ? ` · ${cuantas} pantallas más` : ''}
        </span>
        <h2 className="titular-seccion">{G.titulo}</h2>
        <p className="bajada">{G.texto}</p>
      </div>
      <div className={s.ganchoAcciones}>
        {G.principal ? (
          <>
            <Link href={G.principal.href} className="cta" data-cta="gancho-principal">
              {G.principal.texto}
              <Icono nombre="flecha" tam={18} />
            </Link>
            <a href={linkWhatsapp(G.mensaje)} className="btn-vidrio" target="_blank" rel="noopener" data-cta="gancho">
              <Icono nombre="whatsapp" tam={18} />
              {G.cta}
            </a>
          </>
        ) : (
          <>
            <a href={linkWhatsapp(G.mensaje)} className="cta" target="_blank" rel="noopener" data-cta="gancho">
              <Icono nombre="whatsapp" tam={18} />
              {G.cta}
            </a>
            <Link href={G.secundario.href} className="btn-vidrio" data-cta="gancho-contacto">
              {G.secundario.texto}
              <Icono nombre="flecha" tam={18} />
            </Link>
          </>
        )}
      </div>
    </aside>
  );
}
