import Image from 'next/image';
import Link from 'next/link';
import { HOME } from '@/lib/contenido';
import Icono from '@/components/sistema/Icono';
import s from './home.module.css';

/* La franja al pie del hero (v6): a la izquierda quién lo usa (logo en blanco), a la derecha una
 * cinta con los módulos que se desplaza sola. La lista va dos veces para que la cinta no corte;
 * la segunda copia es `aria-hidden` y sin foco. Reemplaza a la fila de confianza. */
export default function Clientes() {
  const c = HOME.clientes;
  const modulos: { texto: string; icono: string; href: string }[] = HOME.todo.grupos.flatMap((g) => [...g.items]);
  const fila = (copia: boolean) => (
    <ul className={s.cintaFila} aria-hidden={copia || undefined}>
      {modulos.map((m) => (
        <li key={m.href}>
          <Link href={m.href} className={s.cintaItem} tabIndex={copia ? -1 : undefined}>
            <Icono nombre={m.icono} tam={16} />
            {m.texto}
          </Link>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`envoltorio ${s.clientes}`}>
      <div className={s.clientesQuien}>
        <span className={s.clientesEtiqueta}>{c.etiqueta}</span>
        {c.items.map((x) => (
          <span key={x.nombre} className={s.clienteLogo}>
            <Image src={x.logo} alt={x.nombre} width={x.ancho} height={x.alto} sizes="120px" />
            <span className={s.clienteCiudad}>{x.ciudad}</span>
          </span>
        ))}
      </div>
      <nav className={`cinta ${s.clientesCinta}`} aria-label="Módulos de RentaGo">
        <div className="cinta-pista">
          {fila(false)}
          {fila(true)}
        </div>
      </nav>
    </div>
  );
}
