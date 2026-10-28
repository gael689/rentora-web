import Link from 'next/link';
import Icono from '@/components/sistema/Icono';
import { linkWhatsapp } from '@/lib/sitio';
import { rv } from '@/components/animacion/Reveal';
import s from './pagina.module.css';

/* El gancho de una solución. Dos mitades para que contraste con el blanco de la página y se lea
 * todo: a la izquierda, sobre blanco, el titular "¿Te suena?" y las tres situaciones en pastillas
 * claras con texto oscuro; a la derecha un panel turquesa vivo con "Esto tiene arreglo" y las dos
 * salidas (WhatsApp y formulario). */
export default function Problema({
  rotulo,
  sintomas,
  costo,
  cta,
  mensaje,
  secundario,
  arreglo,
}: {
  rotulo: string;
  sintomas: string[];
  costo: string;
  cta: string;
  mensaje: string;
  secundario: { texto: string; href: string };
  arreglo: { titulo: string; texto: string };
}) {
  return (
    <section className={s.problema} aria-label={rotulo} {...rv(0, 'escala')}>
      <div className={s.problemaCuerpo}>
        <h2 className={s.problemaRotulo}>{rotulo}</h2>
        <ul className={s.problemaLista}>
          {sintomas.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <p className={s.problemaCosto}>{costo}</p>
      </div>
      <div className={`malla-turquesa ${s.problemaPanel}`}>
        <p className={s.problemaPanelTitulo}>{arreglo.titulo}</p>
        <p className={s.problemaPanelTexto}>{arreglo.texto}</p>
        <div className={s.problemaAcciones}>
          <a href={linkWhatsapp(mensaje)} className="btn-blanco" target="_blank" rel="noopener" data-cta="solucion-whatsapp">
            <Icono nombre="whatsapp" tam={18} />
            {cta}
          </a>
          <Link href={secundario.href} className="btn-vidrio" data-cta="solucion-contacto">
            {secundario.texto}
            <Icono nombre="flecha" tam={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
