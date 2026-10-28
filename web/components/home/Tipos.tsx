import Link from 'next/link';
import { HOME } from '@/lib/contenido';
import Icono from '@/components/sistema/Icono';
import CarruselPara from '@/components/para/CarruselPara';
import Reveal from '@/components/animacion/Reveal';
import Titular from './Titular';
import s from './home.module.css';

/* Tira "¿Cómo alquilás vos?": el mismo carrusel de tarjetas de foto que /para (un solo componente,
 * `CarruselPara`). Copy en `HOME.tipos`; los nombres y las frases salen de `PARA` y `VISUAL_PARA`. */
export default function Tipos() {
  const t = HOME.tipos;
  return (
    <section className="seccion" aria-labelledby="t-tipos">
      <div className="envoltorio">
        <Reveal className={s.tipos}>
          <h2 id="t-tipos" className="titular-seccion">
            <Titular t={t.titular} />
          </h2>
        </Reveal>
      </div>
      <Reveal dir="fade" i={1}>
        <CarruselPara etiqueta={`${t.titular.antes}${t.titular.clave}${t.titular.despues}`} />
      </Reveal>
      <div className="envoltorio">
        <Reveal className={s.tipos}>
          <Link href="/para" className="cta-sec">
            {t.todos}
            <Icono nombre="flecha" tam={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
