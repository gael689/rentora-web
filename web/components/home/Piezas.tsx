import Image from 'next/image';
import Icono from '@/components/sistema/Icono';
import s from './home.module.css';

/* Piezas chicas de la v4b de la home. */

/** Chip blanco flotante sobre una captura: ícono en baldosa teñida + rótulo. Estático. */
export function Flotante({
  icono,
  texto,
  tono = 'turq',
  className,
}: {
  icono: string;
  texto: string;
  tono?: string;
  className?: string;
}) {
  return (
    <span className={`${s.flotante} ${className ?? ''}`} data-tono={tono} aria-hidden="true">
      <span className={s.flotanteIcono}>
        <Icono nombre={icono} tam={15} />
      </span>
      {texto}
    </span>
  );
}

/** Un celular con una captura de la web de reservas adentro. */
export function Telefono({
  src,
  alt,
  className,
  prioridad = false,
}: {
  src: string;
  alt: string;
  className?: string;
  prioridad?: boolean;
}) {
  return (
    <span className={`${s.telefono} ${className ?? ''}`}>
      <Image src={src} alt={alt} width={390} height={844} sizes="(min-width: 900px) 240px, 160px" loading={prioridad ? 'eager' : 'lazy'} />
    </span>
  );
}
