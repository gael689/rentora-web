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

  const clave = process.env.RESEND_API_KEY;
  const destino = process.env.CONTACTO_DESTINO;
  const remitente = process.env.CONTACTO_REMITENTE ?? 'Rentora <hola@rentora.com.ar>';

  if (!clave || !destino) {
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
        ? `Rentora (home) · ${datos.autos} autos`
        : `Rentora · ${datos.empresa} (${datos.ciudad}, ${datos.autos} autos)`,
      html: `<p>Consulta desde rentora.com.ar</p><table cellpadding="6">${filas}</table>`,
    }),
  });

  if (!respuesta.ok) {
    /* No se dice "sin conexión" a secas: la mitad de las veces el pedido llegó y lo que se
       perdió fue la respuesta. Y el que entró tiene que poder salir por otro lado. */
    return NextResponse.json(
      { error: 'No pude mandar el mail. Escribime por WhatsApp y lo vemos.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
