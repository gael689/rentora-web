import Image from 'next/image';
import { HOME } from '@/lib/contenido';
import Reveal from '@/components/animacion/Reveal';
import s from './home.module.css';

/* Quién lo usa (v6b): una banda blanca y corta antes de las preguntas, con el logo en sus colores.
 * Ubicar Rent se muestra como cliente (decisión de Gael, 28/10/2026). */
export default function Clientes() {
  const c = HOME.clientes;
  return (
    <section className={s.clientes} aria-label={c.etiqueta}>
      <Reveal className={`envoltorio ${s.clientesFila}`}>
        <span className={s.clientesEtiqueta}>{c.etiqueta}</span>
        {c.items.map((x) => (
          <span key={x.nombre} className={s.clienteLogo}>
            <Image src={x.logo} alt={x.nombre} width={x.ancho} height={x.alto} sizes="160px" />
            <span className={s.clienteCiudad}>{x.ciudad}</span>
          </span>
        ))}
      </Reveal>
    </section>
  );
}
