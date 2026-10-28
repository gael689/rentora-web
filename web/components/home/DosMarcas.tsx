import { MARCAS_DEMO, DOS_MARCAS } from '@/lib/contenido';
import Icono from '@/components/sistema/Icono';
import s from './DosMarcas.module.css';

/* La misma web de reservas con dos marcas inventadas (los dos fixtures de
 * rentago-system/web-reservas). Es una réplica en CSS, estática y sin JS: la estructura es una
 * sola y cada marca cambia solo variables (paleta, fondo, radio, tratamiento de la letra), que es
 * exactamente lo que en el producto es configuración del tenant. El dibujo es decorativo
 * (`aria-hidden`); lo que se lee es el pie de cada una y el figcaption. Los textos salen de
 * `MARCAS_DEMO`. */
export default function DosMarcas({ className }: { className?: string }) {
  return (
    <figure className={`${s.dosMarcas} ${className ?? ''}`} aria-label={DOS_MARCAS.etiqueta}>
      <div className={s.par}>
        {MARCAS_DEMO.map((m) => (
          <div key={m.clave} className={s.marca} data-marca={m.clave}>
            <div className={s.telefono} aria-hidden="true">
              <div className={s.pantalla}>
                <span className={s.isla} />
              <div className={s.sitio}>
                <div className={s.cabeza}>
                  {m.clave === 'valle' && (
                    <svg className={s.logo} viewBox="0 0 40 24" aria-hidden="true">
                      <path d="M0 24 12 4l12 20z" fill="#5FC4C9" />
                      <path d="M12 24 26 0l14 24z" fill="#12959B" />
                    </svg>
                  )}
                  <span className={s.nombre}>
                    <b>{m.nombre}</b> {m.nombre2}
                  </span>
                  <span className={s.hamburguesa}>
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
                <div className={s.hero}>
                  <p className={s.eyebrow}>{m.eyebrow}</p>
                  <p className={s.titulo}>{m.titulo}</p>
                  <p className={s.bajada}>{m.bajada}</p>
                  <div className={s.buscador}>
                    <span className={s.campo}>
                      <small>{m.retiro}</small>
                      {m.fechaRetiro}
                    </span>
                    <span className={s.campo}>
                      <small>{m.devolucion}</small>
                      {m.fechaDevolucion}
                    </span>
                    <span className={s.boton}>{m.boton}</span>
                  </div>
                </div>
                <div className={s.flota}>
                  <p className={s.flotaTitulo}>{m.flotaTitulo}</p>
                  <ul>
                    {m.flota.map((f) => (
                      <li key={f}>
                        <span className={s.flotaIcono}>
                          <Icono nombre="auto" tam={12} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                {m.firma && <p className={s.firma}>{m.firma}</p>}
                <span className={s.url}>
                  <Icono nombre="candado" tam={9} />
                  {m.dominio}
                </span>
              </div>
              </div>
            </div>
            <p className={s.pie}>
              <b>
                {m.nombre} {m.nombre2}
              </b>
              {m.pie}
            </p>
          </div>
        ))}
      </div>
      <figcaption className={s.nota}>{DOS_MARCAS.nota}</figcaption>
    </figure>
  );
}
