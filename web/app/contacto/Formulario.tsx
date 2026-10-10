'use client';

import { useState } from 'react';
import { CAMPOS, T } from '@/lib/contenido';
import { CONTACTO } from '@/lib/paginas';
import { linkWhatsapp } from '@/lib/sitio';
import { medir } from '@/lib/medicion';
import s from './contacto.module.css';

/* Los cuatro datos de CAMPOS se piden a la vista, más "qué querés resolver". El mail y el
 * nombre van plegados: se califica igual y no se pierde al que abandona en el campo 6.
 *
 * El envío va contra `/api/contacto`. Con el entorno sin Resend el endpoint contesta 503 y acá
 * se muestra la salida por WhatsApp. El contrato del endpoint no cambió: los cuatro campos de
 * CAMPOS siguen siendo obligatorios; `resolver`, `nombre` y `mail` son opcionales. */

const MAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Formulario() {
  const [datos, setDatos] = useState<Record<string, string>>({});
  const [trampa, setTrampa] = useState('');
  const [estado, setEstado] = useState<'quieto' | 'enviando' | 'listo'>('quieto');
  const [error, setError] = useState('');
  const [faltan, setFaltan] = useState<string[]>([]);

  const poner = (id: string, valor: string) => setDatos((p) => ({ ...p, [id]: valor }));

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const sinDato = CAMPOS.filter((c) => (datos[c.id] ?? '').trim() === '').map((c) => c.id);
    setFaltan(sinDato);
    if (sinDato.length > 0) {
      setError(CONTACTO.faltan);
      medir('formulario_error', { motivo: 'faltan_datos' });
      document.getElementById(sinDato[0])?.focus();
      return;
    }
    const mail = (datos.mail ?? '').trim();
    if (mail && !MAIL.test(mail)) {
      setError(CONTACTO.mailMal);
      medir('formulario_error', { motivo: 'mail_invalido' });
      return;
    }

    setEstado('enviando');
    try {
      const r = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...datos, sitioWeb: trampa }),
      });
      const cuerpo = await r.json().catch(() => ({}));
      if (!r.ok) {
        setError(cuerpo.error ?? CONTACTO.errorGenerico);
        setEstado('quieto');
        medir('formulario_error', { motivo: `http_${r.status}` });
        return;
      }
      setEstado('listo');
      medir('formulario_enviado', { autos: datos.autos ?? null });
    } catch {
      medir('formulario_error', { motivo: 'red' });
      setError(CONTACTO.errorRed);
      setEstado('quieto');
    }
  }

  if (estado === 'listo') {
    return (
      <div className={s.form}>
        <p className={s.aviso} role="status">
          <b>{CONTACTO.listoTitulo}</b> {CONTACTO.listoTexto}
        </p>
        <a href={linkWhatsapp(T.whatsappMensaje)} className="btn-linea" target="_blank" rel="noopener">
          {CONTACTO.whatsapp}
        </a>
      </div>
    );
  }

  const campo = (id: string) => CAMPOS.find((c) => c.id === id);

  const entrada = (id: string) => {
    const c = campo(id);
    if (!c) return null;
    const mal = faltan.includes(id);
    return (
      <div key={id} className={s.campo}>
        <label htmlFor={id}>{c.etiqueta}</label>
        <input
          id={id}
          name={id}
          type={c.tipo}
          inputMode={c.tipo === 'number' ? 'numeric' : undefined}
          autoComplete={c.autoComplete}
          placeholder={c.placeholder}
          aria-invalid={mal || undefined}
          value={datos[id] ?? ''}
          onChange={(e) => poner(id, e.target.value)}
        />
      </div>
    );
  };

  return (
    <form className={s.form} onSubmit={enviar} noValidate>
      <div className={s.grupo}>
        {entrada('empresa')}
        {entrada('contacto')}
      </div>

      <div className={s.campo}>
        <label htmlFor="resolver">{CONTACTO.resolver}</label>
        <textarea
          id="resolver"
          name="resolver"
          rows={3}
          maxLength={600}
          placeholder={CONTACTO.resolverPlaceholder}
          value={datos.resolver ?? ''}
          onChange={(e) => poner('resolver', e.target.value)}
        />
      </div>

      <div className={s.grupo}>
        {entrada('ciudad')}
        {entrada('autos')}
      </div>

      <details className={s.mas}>
        <summary>{CONTACTO.plegado}</summary>
        <div className={s.grupo}>
          <div className={s.campo}>
            <label htmlFor="nombre">{CONTACTO.nombre}</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              autoComplete="name"
              value={datos.nombre ?? ''}
              onChange={(e) => poner('nombre', e.target.value)}
            />
          </div>
          <div className={s.campo}>
            <label htmlFor="mail">{CONTACTO.mail}</label>
            <input
              id="mail"
              name="mail"
              type="email"
              autoComplete="email"
              value={datos.mail ?? ''}
              onChange={(e) => poner('mail', e.target.value)}
            />
          </div>
        </div>
      </details>

      {/* El campo trampa. Una persona no lo ve; un bot que rellena todo, sí. */}
      <div className={s.trampa} aria-hidden="true">
        <label htmlFor="sitioWeb">No completar</label>
        <input
          id="sitioWeb"
          name="sitioWeb"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={trampa}
          onChange={(e) => setTrampa(e.target.value)}
        />
      </div>

      <div className={s.envio}>
        <button type="submit" className="cta" disabled={estado === 'enviando'}>
          {estado === 'enviando' ? CONTACTO.enviando : CONTACTO.enviar}
          <span className="flecha" aria-hidden="true">
            →
          </span>
        </button>

        {error && (
          <p className={`${s.aviso} ${s.avisoError}`} role="alert">
            {error}{' '}
            <a href={linkWhatsapp(T.whatsappMensaje)} target="_blank" rel="noopener">
              {CONTACTO.whatsappAbrir}
            </a>
          </p>
        )}
      </div>
    </form>
  );
}
