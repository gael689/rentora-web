'use client';

import { useState } from 'react';
import { HOME, T } from '@/lib/contenido';
import { linkWhatsapp } from '@/lib/sitio';
import { medir } from '@/lib/medicion';
import Verificacion from '@/components/Verificacion';
import s from './home.module.css';

/* El formulario corto del cierre de la home: flota, sucursales, si necesita web de reservas y por
 * dónde contestar. Va al mismo `/api/contacto` con `origen: 'home'`, que pide solo flota y contacto
 * como obligatorios. Con el envío sin conectar (503) o con cualquier error, ofrece WhatsApp.
 * Turnstile se monta al primer foco y su token va con el envío (ver `Verificacion`). */
export default function CierreForm() {
  const f = HOME.cierre.form;
  const [datos, setDatos] = useState<Record<string, string>>({});
  const [trampa, setTrampa] = useState('');
  const [estado, setEstado] = useState<'quieto' | 'enviando' | 'listo'>('quieto');
  const [error, setError] = useState('');
  const [tocado, setTocado] = useState(false);
  const [token, setToken] = useState('');
  const [reinicio, setReinicio] = useState(0);
  const poner = (id: string, v: string) => setDatos((p) => ({ ...p, [id]: v }));

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!(datos.autos ?? '').trim() || !(datos.contacto ?? '').trim()) {
      setError(f.faltan);
      medir('formulario_error', { motivo: 'faltan_datos_home' });
      document.getElementById(!(datos.autos ?? '').trim() ? 'cf-autos' : 'cf-contacto')?.focus();
      return;
    }
    setEstado('enviando');
    try {
      const r = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...datos,
          origen: 'home',
          sitioWeb: trampa,
          turnstileToken: token,
          campana: new URLSearchParams(location.search).get('utm_campaign'),
        }),
      });
      setToken('');
      setReinicio((n) => n + 1);
      const cuerpo = await r.json().catch(() => ({}));
      if (!r.ok) {
        setError(cuerpo.error ?? 'No pude mandarlo. Escribime por WhatsApp y lo vemos.');
        setEstado('quieto');
        medir('formulario_error', { motivo: `http_${r.status}` });
        return;
      }
      setEstado('listo');
      medir('formulario_enviado', { autos: datos.autos ?? null, origen: 'home' });
    } catch {
      setError('Se cortó la conexión. Probá de nuevo o escribime por WhatsApp.');
      setEstado('quieto');
      medir('formulario_error', { motivo: 'red' });
    }
  }

  if (estado === 'listo') {
    return (
      <div className={s.cierreForm}>
        <p className={s.cierreAviso} role="status">
          {f.listo}
        </p>
      </div>
    );
  }

  return (
    <form className={s.cierreForm} onSubmit={enviar} onFocus={() => setTocado(true)} noValidate aria-label={f.etiqueta}>
      <div className={s.cierreFila}>
        <div className={s.cierreCampo}>
          <label htmlFor="cf-autos">{f.autos}</label>
          <input
            id="cf-autos"
            name="autos"
            type="number"
            inputMode="numeric"
            min={1}
            autoComplete="off"
            placeholder={f.autosPlaceholder}
            value={datos.autos ?? ''}
            onChange={(e) => poner('autos', e.target.value)}
          />
        </div>
        <div className={s.cierreCampo}>
          <label htmlFor="cf-sucursales">{f.sucursales}</label>
          <input
            id="cf-sucursales"
            name="sucursales"
            type="number"
            inputMode="numeric"
            min={1}
            autoComplete="off"
            placeholder={f.sucursalesPlaceholder}
            value={datos.sucursales ?? ''}
            onChange={(e) => poner('sucursales', e.target.value)}
          />
        </div>
      </div>

      <fieldset className={s.cierreCampo}>
        <legend>{f.web}</legend>
        <div className={s.cierreOpciones}>
          {f.webOpciones.map((o) => (
            <label key={o} className={s.cierreOpcion}>
              <input
                type="radio"
                name="web"
                value={o}
                checked={datos.web === o}
                onChange={() => poner('web', o)}
              />
              <span>{o}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={s.cierreCampo}>
        <label htmlFor="cf-contacto">{f.contacto}</label>
        <input
          id="cf-contacto"
          name="contacto"
          type="text"
          autoComplete="tel"
          placeholder={f.contactoPlaceholder}
          value={datos.contacto ?? ''}
          onChange={(e) => poner('contacto', e.target.value)}
        />
      </div>

      {/* El campo trampa contra bots: una persona no lo ve. */}
      <div className={s.cierreTrampa} aria-hidden="true">
        <label htmlFor="cf-sitio">No completar</label>
        <input id="cf-sitio" type="text" tabIndex={-1} autoComplete="off" value={trampa} onChange={(e) => setTrampa(e.target.value)} />
      </div>

      {tocado && <Verificacion alResolver={setToken} reinicio={reinicio} className={s.cierreVerificacion} />}

      <div className={s.cierreEnvio}>
        <button type="submit" className="cta" disabled={estado === 'enviando'}>
          {estado === 'enviando' ? f.enviando : f.enviar}
        </button>
        {error && (
          <p className={s.cierreAviso} role="alert">
            {error}{' '}
            <a href={linkWhatsapp(T.whatsappMensaje)} target="_blank" rel="noopener">
              Abrir WhatsApp
            </a>
          </p>
        )}
        <p className={s.cierreNota}>{f.nota}</p>
      </div>
    </form>
  );
}
