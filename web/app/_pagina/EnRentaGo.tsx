import Link from 'next/link';
import Icono from '@/components/sistema/Icono';
import Reveal from '@/components/animacion/Reveal';
import s from '../seo.module.css';

/* "En RentaGo" al final de una guía: card verde teal suave (borde fino, sombra suave). El rótulo es "En" +
 * el texto del wordmark del encabezado en blanquecino (sin logo ni ícono). Debajo la frase de valor y una píldora discreta que lleva al módulo. */
export default function EnRentaGo({
  rotulo,
  texto,
  verModulo,
  href,
  moduloNombre,
}: {
  rotulo: string;
  texto: string;
  /** El texto del botón sin el nombre del módulo, ej. "Ver el módulo". */
  verModulo: string;
  href?: string;
  moduloNombre?: string;
  /** Ya no se muestra (el rótulo es sólo texto); se acepta por compatibilidad con quienes lo pasan. */
  icono?: string;
}) {
  return (
    <Reveal as="section" dir="escala" className={s.enRg} aria-label={rotulo}>
      <div className={s.enRgTexto}>
        <span className={s.enRgRotulo}>
          {/* REVISAR GAEL: rótulo "En RentaGo" solo texto, en blanquecino (invertido respecto del header) */}
          <span className={s.enRgEn} aria-hidden="true">
            En
          </span>
          <span className={s.enRgNombre} aria-hidden="true">
            Renta<span className={s.enRgGo}>Go</span>
          </span>
          <span className={s.enRgLector}>{rotulo}</span>
        </span>
        <p className={s.enRgFrase}>{texto}</p>
      </div>
      {href && moduloNombre && (
        <Link href={href} className={s.enRgBoton}>
          {verModulo}: {moduloNombre}
          <Icono nombre="flecha" tam={18} />
        </Link>
      )}
    </Reveal>
  );
}
