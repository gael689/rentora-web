/* El visor: lo que envuelve una pantalla del sistema dentro de la página.
 *
 * La réplica es una aplicación de escritorio de 1280 × 864 y ese tamaño es fijo a propósito: si
 * se estirara con el contenedor, la misma pantalla saldría de un tamaño en la home y de otro en
 * `/sistema`, y adiós al "mismo zoom en todas" que pide el formato de las capturas.
 *
 * Para que entre donde tenga que entrar, se escala. `escala` la decide quien la usa, porque es
 * quien sabe cuánto ancho tiene: 0,45 en una columna de dos, 0,92 a ancho completo. El scroll
 * horizontal queda de red por si igual no entra — nunca el del documento, que es la regla.
 *
 * El pie dice la ruta real dentro del sistema. No es decorativo: es lo que hace que el visitante
 * entienda que está mirando una pantalla que existe, con su dirección, y no una ilustración. */

import s from './sistema.module.css';

/** Las medidas del marco. Tienen que coincidir con `.marco` en `sistema.module.css`. */
export const ANCHO_MARCO = 1280;
export const ALTO_MARCO = 864;

export default function Visor({
  ruta,
  pie,
  escala = 1,
  children,
}: {
  ruta?: string;
  pie?: string;
  /** Cuánto se achica el marco para entrar en su columna. 1 = tamaño real. */
  escala?: number;
  children: React.ReactNode;
}) {
  const medidas = {
    '--escala': escala,
    '--ancho-marco': `${ANCHO_MARCO}px`,
    '--alto-marco': `${ALTO_MARCO}px`,
  } as React.CSSProperties;

  return (
    <figure className={s.figura}>
      {/* v4: la ventana del navegador, sobria. La ruta real va en la barra de direcciones. */}
      <div className={s.ventana}>
        <div className={s.cromo} aria-hidden="true">
          <span className={s.cromoPuntos}>
            <i />
            <i />
            <i />
          </span>
          {ruta && <span className={s.cromoDireccion}>{ruta}</span>}
        </div>
        <div className={s.visor}>
          <div className={s.encuadre} style={medidas}>
            {children}
          </div>
        </div>
      </div>
      {pie && (
        <figcaption className={s.pieVisor}>
          <span className="nota">{pie}</span>
          {ruta && <span className={s.pieRuta}>{ruta}</span>}
        </figcaption>
      )}
    </figure>
  );
}
