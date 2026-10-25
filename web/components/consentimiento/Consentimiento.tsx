'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { COOKIES } from '@/lib/privacidad';
import {
  EVENTO_ABRIR,
  GA_ID,
  HAY_TERCEROS,
  PIXEL_ID,
  aplicarEleccion,
  guardarEleccion,
  leerEleccion,
  type Eleccion,
} from '@/lib/medicion';
import s from './consentimiento.module.css';

/* El aviso de cookies. Propio, sin librería.
 *
 * - **Sin JavaScript no aparece**, y tampoco hace falta: sin JS no se carga ninguna herramienta.
 *   El HTML del servidor no lo trae, así que tampoco puede tapar contenido en un crawler.
 * - **Fijo abajo, encima del contenido**: aparecer no empuja nada, no hay salto de layout.
 * - Aceptar y Rechazar pesan lo mismo a la vista. Configurar abre las casillas en el mismo lugar.
 * - Se vuelve a abrir desde "Cookies", en el pie (evento `rentago:cookies`).
 * - Si no hay GA ni Pixel configurados, no hay nada que preguntar y no se muestra. */
export default function Consentimiento() {
  const [abierto, setAbierto] = useState(false);
  const [config, setConfig] = useState(false);
  const [eleccion, setEleccion] = useState<Eleccion>({ analitica: false, marketing: false });
  const [reabierto, setReabierto] = useState(false);
  const caja = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!HAY_TERCEROS) return;
    const previa = leerEleccion();
    if (previa) {
      setEleccion(previa);
      aplicarEleccion(previa);
    } else {
      setAbierto(true);
    }

    const abrir = () => {
      const actual = leerEleccion();
      if (actual) setEleccion(actual);
      setConfig(true);
      setReabierto(true);
      setAbierto(true);
    };
    window.addEventListener(EVENTO_ABRIR, abrir);
    return () => window.removeEventListener(EVENTO_ABRIR, abrir);
  }, []);

  // Al reabrirlo a pedido, el foco va al aviso: el que tocó "Cookies" tiene que poder seguir con
  // el teclado. La primera vez no se roba el foco: el visitante recién llega y está leyendo.
  useEffect(() => {
    if (abierto && reabierto) caja.current?.focus();
  }, [abierto, reabierto]);

  if (!HAY_TERCEROS || !abierto) return null;

  const decidir = (e: Eleccion) => {
    guardarEleccion(e);
    aplicarEleccion(e);
    setEleccion(e);
    setAbierto(false);
    setConfig(false);
    setReabierto(false);
  };

  const A = COOKIES.aviso;
  const C = COOKIES.categorias;

  return (
    <div
      ref={caja}
      className={s.aviso}
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookies-titulo"
      aria-describedby="cookies-texto"
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === 'Escape' && reabierto) setAbierto(false);
      }}
    >
      <p id="cookies-titulo" className={s.titulo}>
        {A.titulo}
      </p>
      <p id="cookies-texto" className={s.texto}>
        {A.texto}{' '}
        <Link href="/privacidad#cookies" className={s.enlace}>
          {A.politica}
        </Link>
      </p>

      {config && (
        <fieldset className={s.casillas}>
          <legend className={s.oculto}>{A.configurar}</legend>
          <label className={s.casilla}>
            <input type="checkbox" checked disabled />
            <span>
              <b>{C.necesarias.nombre}</b> {C.necesarias.texto}
            </span>
          </label>
          {GA_ID && (
            <label className={s.casilla}>
              <input
                type="checkbox"
                checked={eleccion.analitica}
                onChange={(e) => setEleccion((x) => ({ ...x, analitica: e.target.checked }))}
              />
              <span>
                <b>{C.analitica.nombre}</b> {C.analitica.texto}
              </span>
            </label>
          )}
          {PIXEL_ID && (
            <label className={s.casilla}>
              <input
                type="checkbox"
                checked={eleccion.marketing}
                onChange={(e) => setEleccion((x) => ({ ...x, marketing: e.target.checked }))}
              />
              <span>
                <b>{C.marketing.nombre}</b> {C.marketing.texto}
              </span>
            </label>
          )}
        </fieldset>
      )}

      <div className={s.botones}>
        <button type="button" className={s.boton} onClick={() => decidir({ analitica: true, marketing: true })}>
          {A.aceptar}
        </button>
        <button type="button" className={s.boton} onClick={() => decidir({ analitica: false, marketing: false })}>
          {A.rechazar}
        </button>
        {config ? (
          <button type="button" className={s.texto2} onClick={() => decidir(eleccion)}>
            {A.guardar}
          </button>
        ) : (
          <button type="button" className={s.texto2} onClick={() => setConfig(true)}>
            {A.configurar}
          </button>
        )}
      </div>
    </div>
  );
}
