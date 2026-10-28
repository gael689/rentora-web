import Link from 'next/link';
import { HOME } from '@/lib/contenido';
import Icono from '@/components/sistema/Icono';
import Reveal, { rv } from '@/components/animacion/Reveal';
import { Flotante, Telefono } from './Piezas';
import Titular from './Titular';
import s from './home.module.css';

/* Funciones en mosaico (v6). Antes eran cuatro bloques alternados con la captura recortada al
 * 150 %, donde el texto de la pantalla quedaba en 9 px; ahora cada función es una tarjeta con su
 * tinte, el ícono grande de fondo y el chip de estado apoyado, y la de la web lleva el celular.
 * Las capturas viven en /sistema. Las viñetas (`puntos`) siguen en los datos pero no se muestran. */
export default function Funciones() {
  const cabeza = HOME.funcionesCabeza;
  return (
    <section className="seccion banda-suave" aria-labelledby="t-funciones">
      <div className="envoltorio">
        <Reveal as="header" className={s.cabezaCentro}>
          <h2 id="t-funciones" className="titular-seccion">
            <Titular t={cabeza.titular} />
          </h2>
        </Reveal>
        <div className={s.mosaico}>
          {HOME.funciones.map((f, i) => {
            const conTelefono = f.telefonos.length > 0;
            return (
              <article
                key={f.rotulo}
                className={`${s.funcionTarjeta} ${conTelefono ? s.funcionConTelefono : ''}`}
                data-tono={f.tono}
                aria-labelledby={`t-funcion-${i}`}
                {...rv(i % 2)}
              >
                <span className={s.funcionFondo} aria-hidden="true">
                  <Icono nombre={f.icono} tam={180} />
                </span>
                <span className={s.funcionRotulo}>{f.rotulo}</span>
                <h3 id={`t-funcion-${i}`} className={s.funcionTitulo}>
                  {f.titulo}
                </h3>
                <p className={s.funcionFrase}>{f.frase}</p>
                <Link href={f.link.href} className={`cta-sec ${s.funcionLink}`}>
                  {f.link.texto}
                  <Icono nombre="flecha" tam={16} />
                </Link>
                {f.chips.map((c) => (
                  <Flotante key={c.texto} icono={c.icono} texto={c.texto} tono={f.tono} className={s.funcionChip} />
                ))}
                {conTelefono && (
                  <Telefono src={f.telefonos[0].src} alt={f.telefonos[0].alt} className={s.funcionTelefono} />
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
