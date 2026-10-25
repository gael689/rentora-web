import { NextResponse } from 'next/server';
import { CAMPOS } from '@/lib/contenido';

/* El envío del formulario.
 *
 * Cuatro campos, un campo trampa y un límite por IP. Nada más: un endpoint de contacto que hace
 * más que eso es un endpoint que falla de maneras que nadie mira.
 *
 * **Se prueba de verdad contra Resend antes de darlo por cerrado.** La regla del ecosistema es
 * no asumir que el mail anda porque la variable está cargada — ya mordió una vez. Con
 * `RESEND_API_KEY` sin definir, el endpoint contesta 503 y el formulario muestra el WhatsApp:
 * es preferible a tragarse el mensaje y decir que salió.
 *
 * **Además, el prospecto en el CRM de la plataforma** (consola de `rentago-system`, `docs/BACKOFFICE.md`).
 * Sólo si `RENTAGO_API_URL` está definida: el servidor (nunca el navegador) hace
 * `POST {RENTAGO_API_URL}/api/v1/public/prospectos`. Si la API no está, contesta 503 (sin
 * `TURNSTILE_SECRET` en producción), 429, 400 o se cae, **el formulario sigue como siempre** y queda
 * una línea en el log. Con el CRM conectado y Resend apagado, el envío cuenta como recibido: el
 * prospecto ya está en la consola, que es donde se lo mira.
 */

export const runtime = 'nodejs';

/** Cuántos envíos se aceptan por IP y en cuánto tiempo. */
const LIMITE = 3;
const VENTANA_MS = 10 * 60 * 1000;

/* En memoria, a propósito. El sitio es estático salvo este endpoint y el volumen esperado son
 * unidades por día: una tabla en memoria alcanza. Si el proceso se recicla se pierde el
 * contador, que es exactamente el peor caso aceptable — alguien manda dos veces. */
const vistos = new Map<string, number[]>();

function pasaElLimite(ip: string): boolean {
  const ahora = Date.now();
  const previos = (vistos.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);
  if (previos.length >= LIMITE) {
    vistos.set(ip, previos);
    return false;
  }
  previos.push(ahora);
  vistos.set(ip, previos);
  return true;
}

const MAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ResultadoCrm = 'apagado' | 'creado' | 'salteado' | 'fallo';

/** La API de la plataforma, sin barra final y sin `/api/v1` (si alguien lo pegó con el sufijo). */
function apiPlataforma(): string {
  return (process.env.RENTAGO_API_URL ?? '').trim().replace(/\/+$/, '').replace(/\/api\/v1$/, '');
}

/** Crea el prospecto en la consola. Nunca tira: devuelve qué pasó y lo deja en el log. */
async function aCrm(
  datos: Record<string, string>,
  extras: [string, string][],
  cuerpo: Record<string, unknown>,
  ip: string,
  corto: boolean,
): Promise<ResultadoCrm> {
  const base = apiPlataforma();
  if (!base) return 'apagado';

  const real = (v: string | undefined) => (v && v !== '—' ? v : '');
  const extra = (e: string) => extras.find(([k]) => k === e)?.[1] ?? '';
  const contacto = real(datos.contacto);
  const mail = [extra('Mail'), contacto].find((m) => MAIL.test(m)) ?? '';

  /* La API pide un mail (es con lo que junta los envíos repetidos). Si el visitante dejó sólo un
     WhatsApp, el mail de aviso sale igual y el prospecto se carga a mano desde la consola. */
  if (!mail) {
    console.info('[contacto→crm] sin mail en el formulario: no se crea el prospecto (sale sólo el aviso).');
    return 'salteado';
  }

  const nombre = extra('Nombre') || real(datos.empresa) || 'Sin nombre';
  const empresa = real(datos.empresa) || extra('Nombre') || (corto ? 'Sin empresa (formulario de la home)' : 'Sin empresa');
  const autos = Number.parseInt(real(datos.autos), 10);
  const mensaje = [
    extra('Qué quiere resolver'),
    extra('Sucursales') && `Sucursales: ${extra('Sucursales')}`,
    extra('Web de reservas') && `Web de reservas: ${extra('Web de reservas')}`,
    `Formulario: ${corto ? 'home' : 'contacto'}`,
  ]
    .filter(Boolean)
    .join('\n')
    .slice(0, 4000);
  const campana = typeof cuerpo.campana === 'string' && cuerpo.campana.trim() ? cuerpo.campana.trim().slice(0, 160) : null;
  const token = typeof cuerpo.turnstileToken === 'string' ? cuerpo.turnstileToken.slice(0, 4096) : '';

  try {
    const r = await fetch(`${base}/api/v1/public/prospectos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // El límite de la API es por IP: se le pasa la del visitante.
        ...(ip !== 'desconocida' ? { 'X-Forwarded-For': ip } : {}),
      },
      body: JSON.stringify({
        empresa: empresa.slice(0, 160),
        nombre: nombre.slice(0, 160),
        email: mail.slice(0, 255),
        whatsapp: contacto && !MAIL.test(contacto) ? contacto.slice(0, 40) : null,
        ciudad: real(datos.ciudad) || null,
        flota_estimada: Number.isFinite(autos) && autos >= 0 && autos <= 100_000 ? autos : null,
        mensaje,
        campana,
        turnstile_token: token,
        sitio_web: '',
      }),
      signal: AbortSignal.timeout(6000),
    });
    if (r.ok) return 'creado';
    const detalle = (await r.text().catch(() => '')).slice(0, 200);
    console.warn(`[contacto→crm] la API contestó ${r.status}: ${detalle}`);
    return 'fallo';
  } catch (e) {
    console.warn(`[contacto→crm] no pude llegar a la API: ${e instanceof Error ? e.message : String(e)}`);
    return 'fallo';
  }
}

function escapar(texto: string): string {
  return texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(pedido: Request) {
  const ip =
    pedido.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    pedido.headers.get('x-real-ip') ??
    'desconocida';

  if (!pasaElLimite(ip)) {
    return NextResponse.json(
      { error: 'Demasiados envíos seguidos. Probá en un rato, o escribime por WhatsApp.' },
      { status: 429 },
    );
  }

  let cuerpo: Record<string, unknown>;
  try {
    cuerpo = await pedido.json();
  } catch {
    return NextResponse.json({ error: 'No pude leer el formulario.' }, { status: 400 });
  }

  /* El campo trampa. Va oculto en el formulario, así que una persona no lo completa nunca y
     un bot que rellena todo sí. Se contesta 200 igual: decirle al bot que lo detectaron sólo
     sirve para que la próxima lo evite. */
  if (typeof cuerpo.sitioWeb === 'string' && cuerpo.sitioWeb.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  /* El formulario corto de la home (`origen: 'home'`) pide solo flota y contacto como
     obligatorios; empresa y ciudad quedan en "—" y se suman sucursales y si quiere la web. */
  const corto = cuerpo.origen === 'home';
  const obligatorios = corto ? CAMPOS.filter((c) => c.id === 'autos' || c.id === 'contacto') : CAMPOS;
  const datos: Record<string, string> = {};
  for (const campo of CAMPOS) {
    const valor = cuerpo[campo.id];
    const hay = typeof valor === 'string' && valor.trim() !== '';
    if (!hay && obligatorios.includes(campo)) {
      return NextResponse.json({ error: `Falta ${campo.etiqueta.toLowerCase()}.` }, { status: 400 });
    }
    datos[campo.id] = hay ? (valor as string).trim().slice(0, 300) : '—';
  }

  /* Opcionales: no cambian el contrato (los campos de CAMPOS siguen siendo los obligatorios). */
  const extras: [string, string][] = [];
  for (const [id, etiqueta, largo] of [
    ['sucursales', 'Sucursales', 40],
    ['web', 'Web de reservas', 40],
    ['resolver', 'Qué quiere resolver', 600],
    ['nombre', 'Nombre', 120],
    ['mail', 'Mail', 120],
  ] as const) {
    const valor = cuerpo[id];
    if (typeof valor === 'string' && valor.trim() !== '') {
      extras.push([etiqueta, valor.trim().slice(0, largo)]);
    }
  }

  const crm = await aCrm(datos, extras, cuerpo, ip, corto);

  const clave = process.env.RESEND_API_KEY;
  const destino = process.env.CONTACTO_DESTINO;
  const remitente = process.env.CONTACTO_REMITENTE ?? 'RentaGo <hola@rentago.com.ar>';

  if (!clave || !destino) {
    if (crm === 'creado') return NextResponse.json({ ok: true });
    return NextResponse.json(
      {
        error:
          'El envío todavía no está conectado en este entorno. Escribime por WhatsApp con estos cuatro datos.',
      },
      { status: 503 },
    );
  }

  const filas = CAMPOS.map(
    (c) => `<tr><td><b>${escapar(c.etiqueta)}</b></td><td>${escapar(datos[c.id])}</td></tr>`,
  )
    .concat(extras.map(([e, v]) => `<tr><td><b>${escapar(e)}</b></td><td>${escapar(v)}</td></tr>`))
    .join('');

  const respuesta = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${clave}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: remitente,
      to: [destino],
      subject: corto
        ? `RentaGo (home) · ${datos.autos} autos`
        : `RentaGo · ${datos.empresa} (${datos.ciudad}, ${datos.autos} autos)`,
      html: `<p>Consulta desde rentago.com.ar</p><table cellpadding="6">${filas}</table>`,
    }),
  });

  if (!respuesta.ok) {
    if (crm === 'creado') {
      console.warn(`[contacto] Resend contestó ${respuesta.status}; el prospecto quedó en la consola.`);
      return NextResponse.json({ ok: true });
    }
    /* No se dice "sin conexión" a secas: la mitad de las veces el pedido llegó y lo que se
       perdió fue la respuesta. Y el que entró tiene que poder salir por otro lado. */
    return NextResponse.json(
      { error: 'No pude mandar el mail. Escribime por WhatsApp y lo vemos.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
