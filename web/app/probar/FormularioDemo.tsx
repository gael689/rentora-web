'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { API_URL, PROBAR, TIPOS_VEHICULO, TURNSTILE_SITE_KEY } from '@/lib/demo';
import { linkWhatsapp } from '@/lib/sitio';
import { medir } from '@/lib/medicion';
import c from '../contacto/contacto.module.css';
import s from './probar.module.css';

/* El pedido de la demo: `POST {API}/api/v1/public/demos` (rentora-system, `docs/DEMOS.md`).
 *
 * La API no crea nada acá: guarda el pedido y manda el mail de confirmación. Por eso el éxito es
 * "revisá tu mail". Contesta 202 también al bot que llenó el campo trampa (`sitio_web`), así que el
 * bot no aprende nada.
 *
 * Turnstile se carga solo en esta página (`next/script`, render explícito). Sin
 * `NEXT_PUBLIC_TURNSTILE_SITE_KEY` no hay widget y el token va vacío: sirve en desarrollo, contra
 * la API local con la verificación falsa. En producción la API sin `TURNSTILE_SECRET` contesta 503
 * y acá se muestra la salida por WhatsApp. */

const MAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SCRIPT_TURNSTILE = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

type Turnstile = {
  render: (el: HTMLElement, opciones: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id?: string) => void;
};

declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

type Estado = 'quieto' | 'enviando' | 'enviado' | 'en_cola';
type Campo = 'nombre' | 'email' | 'rentadora' | 'ciudad' | 'whatsapp';

export default function FormularioDemo() {
  const [datos, setDatos] = useState<Record<Campo, string>>({
    nombre: '',
    email: '',
    rentadora: '',
    ciudad: '',
    whatsapp: '',
  });
  const [tipos, setTipos] = useState<string[]>([]);
  const [trampa, setTrampa] = useState('');
  const [token, setToken] = useState('');
  const [estado, setEstado] = useState<Estado>('quieto');
  const [error, setError] = useState('');
  const [mal, setMal] = useState<string[]>([]);
  const caja = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);

  const poner = (id: Campo, valor: string) => setDatos((p) => ({ ...p, [id]: valor }));
  const alternar = (codigo: string) =>
    setTipos((p) => (p.includes(codigo) ? p.filter((t) => t !== codigo) : [...p, codigo]));

  function montarWidget() {
    if (!TURNSTILE_SITE_KEY || !window.turnstile || !caja.current || widget.current) return;
    widget.current = window.turnstile.render(caja.current, {
      sitekey: TURNSTILE_SITE_KEY,
      language: 'es',
      size: 'flexible',
      callback: (t: string) => setToken(t),
      'expired-callback': () => setToken(''),
      'error-callback': () => setToken(''),
    });
  }

  // Al salir de la página, el widget se va con ella (si no, queda un iframe huérfano).
  useEffect(
    () => () => {
      if (widget.current) window.turnstile?.remove(widget.current);
      widget.current = null;
    },
    [],
  );

  function reiniciarVerificacion() {
    // El token de Turnstile sirve una sola vez: después de un intento fallido hay que pedir otro.
    setToken('');
    if (widget.current) window.turnstile?.reset(widget.current);
  }

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const faltan = (['nombre', 'email', 'rentadora', 'ciudad'] as Campo[]).filter((k) => datos[k].trim().length < 2);
    const mailMal = datos.email.trim() !== '' && !MAIL.test(datos.email.trim());
    const sinTipos = tipos.length === 0;
    setMal([...faltan, ...(mailMal ? ['email'] : []), ...(sinTipos ? ['tipos'] : [])]);

    if (faltan.length > 0) {
      setError(PROBAR.faltan);
      medir('formulario_error', { formulario: 'demo', motivo: 'faltan_datos' });
      document.getElementById(`demo-${faltan[0]}`)?.focus();
      return;
    }
    if (mailMal) {
      setError(PROBAR.mailMal);
      medir('formulario_error', { formulario: 'demo', motivo: 'mail_invalido' });
      document.getElementById('demo-email')?.focus();
      return;
    }
    if (sinTipos) {
      setError(PROBAR.sinTipos);
      medir('formulario_error', { formulario: 'demo', motivo: 'sin_tipos' });
      return;
    }
    if (TURNSTILE_SITE_KEY && !token) {
      setError(PROBAR.sinVerificar);
      return;
    }
    if (!API_URL) {
      setError(PROBAR.errorGenerico);
      medir('formulario_error', { formulario: 'demo', motivo: 'sin_api' });
      return;
    }

    setEstado('enviando');
    try {
      const r = await fetch(`${API_URL}/api/v1/public/demos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: datos.nombre.trim(),
          email: datos.email.trim(),
          rentadora: datos.rentadora.trim(),
          ciudad: datos.ciudad.trim(),
          tipos_vehiculo: tipos,
          whatsapp: datos.whatsapp.trim() || null,
          turnstile_token: token,
          sitio_web: trampa,
        }),
      });
      const cuerpo = await r.json().catch(() => ({}));
      if (!r.ok) {
        // La API contesta `{detail: "…"}` con un texto para mostrar (Turnstile, límites). La
        // validación de FastAPI (422) trae un array: ese no se muestra.
        setError(typeof cuerpo?.detail === 'string' ? `${cuerpo.detail}` : PROBAR.errorGenerico);
        setEstado('quieto');
        reiniciarVerificacion();
        medir('formulario_error', { formulario: 'demo', motivo: `http_${r.status}` });
        return;
      }
      const enCola = ['en_cola', 'pendiente_aprobacion'].includes(cuerpo?.data?.estado);
      setEstado(enCola ? 'en_cola' : 'enviado');
      medir('demo_solicitada', { tipos: tipos.join(','), whatsapp: datos.whatsapp.trim() !== '' });
    } catch {
      setError(PROBAR.errorRed);
      setEstado('quieto');
      reiniciarVerificacion();
      medir('formulario_error', { formulario: 'demo', motivo: 'red' });
    }
  }

  if (estado === 'enviado' || estado === 'en_cola') {
    const cola = estado === 'en_cola';
    return (
      <div className={c.form}>
        <p className={c.aviso} role="status">
          <b>{cola ? PROBAR.colaTitulo : PROBAR.enviadoTitulo}</b> {cola ? PROBAR.colaTexto : PROBAR.enviadoTexto}
        </p>
        <a href={linkWhatsapp(PROBAR.whatsappMensaje)} className="btn-linea" target="_blank" rel="noopener">
          {PROBAR.whatsappAbrir}
        </a>
      </div>
    );
  }

  const entrada = (
    id: Campo,
    etiqueta: string,
    tipo: string,
    autoComplete: string,
    ayuda?: string,
  ) => (
    <div className={c.campo}>
      <label htmlFor={`demo-${id}`}>{etiqueta}</label>
      <input
        id={`demo-${id}`}
        name={id}
        type={tipo}
        autoComplete={autoComplete}
        inputMode={tipo === 'tel' ? 'tel' : undefined}
        maxLength={tipo === 'email' ? 255 : 160}
        aria-invalid={mal.includes(id) || undefined}
        aria-describedby={ayuda ? `demo-${id}-ayuda` : undefined}
        value={datos[id]}
        onChange={(e) => poner(id, e.target.value)}
      />
      {ayuda && (
        <p id={`demo-${id}-ayuda`} className={s.ayuda}>
          {ayuda}
        </p>
      )}
    </div>
  );

  return (
    <>
      <noscript>
        <p className={`${c.aviso} ${c.avisoError}`}>
          {PROBAR.sinJs}{' '}
          <a href={linkWhatsapp(PROBAR.whatsappMensaje)} target="_blank" rel="noopener">
            {PROBAR.whatsappAbrir}
          </a>
        </p>
      </noscript>

      {TURNSTILE_SITE_KEY && (
        <Script src={SCRIPT_TURNSTILE} strategy="afterInteractive" onReady={montarWidget} />
      )}

      <form className={`${c.form} ${s.conJs}`} onSubmit={enviar} noValidate>
        <div className={c.grupo}>
          {entrada('nombre', PROBAR.nombre, 'text', 'name')}
          {entrada('email', PROBAR.email, 'email', 'email', PROBAR.emailAyuda)}
        </div>
        <div className={c.grupo}>
          {entrada('rentadora', PROBAR.rentadora, 'text', 'organization')}
          {entrada('ciudad', PROBAR.ciudad, 'text', 'address-level2')}
        </div>

        <fieldset className={`${s.tipos} ${mal.includes('tipos') ? s.tiposMal : ''}`} aria-describedby="demo-tipos-ayuda">
          <legend>{PROBAR.tipos}</legend>
          <p id="demo-tipos-ayuda" className={s.ayuda}>
            {PROBAR.tiposAyuda}
          </p>
          <div className={s.opciones}>
            {TIPOS_VEHICULO.map((t) => (
              <label key={t.codigo} className={s.opcion}>
                <input
                  type="checkbox"
                  name="tipos_vehiculo"
                  value={t.codigo}
                  checked={tipos.includes(t.codigo)}
                  onChange={() => alternar(t.codigo)}
                />
                {t.nombre}
              </label>
            ))}
          </div>
        </fieldset>

        {entrada('whatsapp', PROBAR.whatsapp, 'tel', 'tel', PROBAR.whatsappAyuda)}

        {/* El campo trampa. Una persona no lo ve; un bot que rellena todo, sí. */}
        <div className={c.trampa} aria-hidden="true">
          <label htmlFor="demo-sitio-web">No completar</label>
          <input
            id="demo-sitio-web"
            name="sitio_web"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={trampa}
            onChange={(e) => setTrampa(e.target.value)}
          />
        </div>

        {TURNSTILE_SITE_KEY && <div ref={caja} className={s.verificacion} />}

        <div className={c.envio}>
          <button type="submit" className="cta" disabled={estado === 'enviando'}>
            {estado === 'enviando' ? PROBAR.enviando : PROBAR.enviar}
            <span className="flecha" aria-hidden="true">
              →
            </span>
          </button>

          {error && (
            <p className={`${c.aviso} ${c.avisoError}`} role="alert">
              {error}{' '}
              <a href={linkWhatsapp(PROBAR.whatsappMensaje)} target="_blank" rel="noopener">
                {PROBAR.whatsappAbrir}
              </a>
            </p>
          )}
        </div>
      </form>
    </>
  );
}
