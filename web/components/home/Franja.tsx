import Link from 'next/link';
import { HOME } from '@/lib/contenido';
import Icono from '@/components/sistema/Icono';
import Reveal from '@/components/animacion/Reveal';
import s from './home.module.css';

/* Franja de CTA a mitad de la home: parte la página en dos con un fondo distinto y ofrece el paso
 * siguiente (ver el sistema por dentro). El texto vive en `HOME.franja`. */
export default function Franja() {
  const f = HOME.franja;
  return (
    <section className={`banda-oscura ${s.franja}`} aria-label={f.titulo}>
      <Reveal className={`envoltorio ${s.franjaCuerpo}`}>
        <div>
          <p className={s.franjaTitulo}>{f.titulo}</p>
          <p className={s.franjaTexto}>{f.texto}</p>
        </div>
        <Link href={f.cta.href} className="btn-blanco" data-cta="franja-home">
          {f.cta.texto}
          <Icono nombre="flecha" tam={18} />
        </Link>
      </Reveal>
    </section>
  );
}
