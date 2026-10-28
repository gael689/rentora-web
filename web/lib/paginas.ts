/* La copy de las páginas internas (módulos, operaciones, contacto, 404).
 *
 * Misma regla que `contenido.ts`: ningún texto largo en JSX. Los titulares marcan la frase clave
 * con *asteriscos* y el componente la pinta en el acento del tono. Sin precios, sin 3D, sin
 * nombrar al cliente real: la rentadora de los ejemplos es ficticia. */

export type Tono = 'turq' | 'azul' | 'menta' | 'petro';

/** Rotación de tonos para listas sin significado propio (pasos, operaciones). */
export const TONOS: Tono[] = ['turq', 'azul', 'menta', 'petro'];

/* ── /modulos ─────────────────────────────────────────────────────────────── */

export const MODULOS_PAG = {
  titulo: '¿Qué te gustaría *dejar de hacer a mano*?',
  bajada: 'Cada módulo arranca por un dolor del mostrador. Elegí el tuyo.',
  verComo: 'Ver cómo',
  incluye: 'Qué incluye',
  nuevo: 'Lo nuevo',
  pantalla: 'La pantalla',
  pantallas: 'Las pantallas',
  comoSeHace: 'Cómo se hace',
  siguiente: 'Siguiente módulo',
  todos: 'Todos los módulos',
  cierreTitulo: '¿Te pasa algo de esto?',
  cierreBajada: 'Contame cómo trabajás y lo vemos sobre tu flota.',
};

/** Ícono y tono por módulo, para cuando `contenido.ts` no los trae. */
export const VISTA_MODULO: Record<string, { tono: Tono; icono: string }> = {
  ocupacion: { tono: 'turq', icono: 'panel' },
  flota: { tono: 'turq', icono: 'auto' },
  'categorias-y-coberturas': { tono: 'turq', icono: 'escudo' },
  clientes: { tono: 'turq', icono: 'personas' },
  reservas: { tono: 'turq', icono: 'lista' },
  contratos: { tono: 'petro', icono: 'documento' },
  precios: { tono: 'azul', icono: 'rango' },
  cotizador: { tono: 'azul', icono: 'calculadora' },
  caja: { tono: 'menta', icono: 'billetera' },
  prospectos: { tono: 'azul', icono: 'megafono' },
  'multas-y-danos': { tono: 'petro', icono: 'alerta' },
  'tu-web': { tono: 'azul', icono: 'globo' },
  'avisos-reportes': { tono: 'petro', icono: 'campana' },
  'avisos-y-reportes': { tono: 'petro', icono: 'campana' },
  captacion: { tono: 'azul', icono: 'megafono' },
};

/* ── /operaciones ─────────────────────────────────────────────────────────── */

export const OPERACIONES_PAG = {
  titulo: 'Las operaciones del mostrador, *paso a paso*',
  bajada: 'Seis momentos del día, con los pasos que sigue el sistema.',
  pasos: 'pasos',
  verComo: 'Ver cómo',
  pantallaTitulo: 'La pantalla, en el momento exacto',
  dondeTitulo: 'Dónde se hace',
  porQue: 'Por qué está resuelto así',
  pasoAPaso: 'Paso a paso',
  otras: 'Otras operaciones',
  cierreTitulo: '¿Querés verlo con tus autos?',
  cierreBajada: 'Te lo muestro en una reunión, compartiendo pantalla.',
};

/* ── /contacto ────────────────────────────────────────────────────────────── */

export const CONTACTO = {
  tag: 'Contacto',
  titulo: 'Contame cómo trabajás y *te respondo yo*',
  bajada: 'Cuatro datos de tu rentadora. Te contesto con lo que te sirve y cómo arrancar.',
  datos: 'Tu rentadora',
  resolver: 'Qué querés resolver',
  resolverPlaceholder: 'Ej.: vendo dos veces el mismo auto, no sé cuánto me deben las empresas…',
  plegado: 'Sumar mail y más datos (opcional)',
  nombre: 'Tu nombre',
  mail: 'Mail',
  enviar: 'Mandar',
  enviando: 'Mandando…',
  listoTitulo: 'Listo, me llegó.',
  listoTexto: 'Te contesto yo, por el medio que dejaste. Si es urgente, escribime por WhatsApp.',
  faltan: 'Completá los cuatro datos para poder mandarlo.',
  mailMal: 'Ese mail no parece válido. Revisalo o dejalo vacío.',
  errorGenerico: 'No pude mandarlo. Escribime por WhatsApp y lo vemos.',
  errorRed: 'Se cortó la conexión. Probá de nuevo o escribime por WhatsApp.',
  whatsapp: 'Prefiero escribir por WhatsApp',
  whatsappAbrir: 'Abrir WhatsApp',
  columna: 'Para qué pedimos cada cosa',
  pie: 'Sin precios en la web: el número depende de tu flota y lo hablamos antes de empezar.',
  ayudaResolver: 'Lo que más te duele hoy. Con eso arranco la respuesta.',
};

/* ── 404 ──────────────────────────────────────────────────────────────────── */

export const NO_ENCONTRADA = {
  tag: 'Error 404',
  titulo: 'Esta página *no existe*',
  bajada: 'Puede que el link esté viejo. Mirá los módulos o las pantallas.',
  inicio: 'Volver al inicio',
  modulos: 'Ver los módulos',
};

/* ── SEO: cómo elegir, glosario, preguntas, plazas ────────────────────────── */

export const COMO_ELEGIR_PAG = {
  // REVISAR GAEL: el H1 vuelve al de siempre; la bajada es el H1 de la versión corta (autodiagnóstico
  // en vez de 12 preguntas) y la cantidad de señales pasó de cinco a diez.
  titulo: '¿Cómo elegir un software *para rent a car*?',
  bajada: '¿Tu rentadora ya necesita un sistema? Las señales de que ya es hora.',
  senalesTitulo: 'Si te pasa esto…',
  // REVISAR GAEL: rótulo del callout de respuesta.
  rentago: 'Cómo lo resuelve RentaGo',
  resumenTitulo: 'Si te pasan 3 o más, hablemos',
  resumenContacto: 'Contame cómo trabajás',
  resumenPlanes: 'Ver los planes',
  cierreTitulo: 'Las respuestas se *pueden verificar*',
  cierreBajada: 'Las pantallas del sistema están a la vista, una por una.',
  cierreCta: 'Ver el sistema por dentro',
};

export const GLOSARIO_PAG = {
  tag: 'Glosario',
  titulo: 'Las palabras del *mostrador*',
  bajada: 'Cada término, explicado en una oración. Sirve igual si no comprás nada.',
  enRentaGo: 'En RentaGo',
  verComo: 'Ver cómo se hace',
  indice: 'Términos',
  cierreTitulo: '¿Tenés *otra duda*?',
  cierreBajada: 'Escribime y la sumo acá.',
};

export const PREGUNTAS_PAG = {
  tag: 'Preguntas',
  titulo: 'Lo que se pregunta *en la primera llamada*',
  // REVISAR GAEL: subtítulo propuesto (sin "la que no me conviene").
  bajada: 'Las dudas que más escuchamos antes de empezar.',
  listaTitulo: 'Preguntas frecuentes',
  operacionesTitulo: '¿Y si la duda es cómo se hace algo? Mirá cómo se hace cada cosa.',
  cierreTitulo: '¿Falta *la tuya*?',
  cierreBajada: 'Escribime y la contesto.',
};

export const PLAZA_PAG = {
  cuando: 'Cuándo se llena',
  flota: 'Qué flota pesa',
  demanda: 'Dónde llega la demanda',
  masUsadoTitulo: 'Lo que más se usa acá',
  otras: 'Otras plazas',
};

/* ── Familias SEO nuevas (08/10/2026): para, guías, contrato, planes, términos, ciudades ──
 *
 * BORRADOR: los rótulos y los cierres los decide Gael. */

export const PARA_PAG = {
  nombre: 'Tipos de rentadora',
  // REVISAR GAEL: índice propuesto "¿Cómo alquilás vos?", tarjetas por situación.
  indiceTitulo: '¿Cómo *alquilás vos*?',
  indiceBajada: 'Cada operación pierde plata en un lugar distinto. Elegí la tuya.',
  soluciones: 'Cómo lo resuelve RentaGo',
  verSistema: 'Ver el sistema',
  indiceTitle: 'Software para cada tipo de rentadora',
  indiceDescription:
    'Rent a car de aeropuerto, alquiler turístico, camionetas y utilitarios, empresas, choferes de aplicaciones y varias sucursales: qué necesita cada operación.',
  modulos: 'Los módulos que más se usan',
  verComo: 'Ver cómo se hace',
  guia: 'La guía que va con esto',
  preguntas: 'Preguntas de este tipo de rentadora',
  otras: 'Otras operaciones',
  ciudades: 'Dónde se ve este mercado',
  ver: 'Ver',
  cierreTitulo: '¿Trabajás *así*?',
  cierreBajada: 'Contame cómo es tu operación y lo vemos sobre tu flota.',
  indiceCierreTitulo: '¿No está *la tuya*?',
  indiceCierreBajada: 'Contame cómo trabajás y lo vemos.',
};

export const GUIAS_PAG = {
  // REVISAR GAEL: reencuadre como "problemas de todos los días"; nombre "Soluciones" a confirmar.
  tag: 'Soluciones',
  indiceTitulo: 'Problemas de todos los días *en el mostrador*',
  indiceBajada: 'Si alguno te suena, hay una forma de dejar de resolverlo a mano.',
  indiceTitle: 'Soluciones para rentadoras de autos',
  indiceDescription:
    'Cómo armar tarifas de temporada, explicar la franquicia, cobrar la seña online, pasar del Excel a un sistema y no perder un vencimiento de la flota.',
  pasos: 'Si lo resolvés a mano',
  suena: '¿Te suena?',
  enRentaGo: 'Con RentaGo',
  hazlo: 'Cómo se arregla',
  arreglo: {
    titulo: 'Esto tiene arreglo',
    texto: 'Contame cómo lo hacés hoy y te muestro cómo queda en tu rentadora.',
  },
  gancho: {
    rotulo: 'Tu caso',
    titulo: '¿Querés esto resuelto en tu rentadora?',
    texto: 'Contame cómo lo hacés hoy y te muestro cómo queda en el sistema, con tu flota.',
    cta: 'Escribime por WhatsApp',
    secundario: { texto: 'Dejame tus datos', href: '/contacto' },
  },
  mensaje: (nombre: string) => `Hola Gael, me pasa lo de "${nombre}" en mi rentadora y quiero ver cómo lo resuelve RentaGo.`,
  modulo: 'El módulo',
  // REVISAR GAEL: texto del botón hacia el módulo (antes: link "El módulo: X →").
  verModulo: 'Ver el módulo',
  terminos: 'Términos de este problema',
  preguntas: 'Preguntas',
  otras: 'Otras soluciones',
  leer: 'Ver la solución',
  siguiente: 'La siguiente',
  cierreTitulo: '¿Lo querés *resuelto* en tu rentadora?',
  cierreBajada: 'Contame cómo lo hacés hoy y te muestro cómo queda en el sistema.',
};

export const CONTRATO_PAG_UI = {
  tag: 'Contrato',
  partes: 'Lo que tiene que tener',
  enRentaGo: 'En RentaGo',
  preguntas: 'Preguntas sobre el contrato',
  aviso: 'Esto es información general, no asesoramiento legal. El clausulado final revisalo con tu abogado.',
  relacionados: 'Para seguir leyendo',
  cierreTitulo: '¿Querés *el modelo*?',
  cierreBajada: 'Te lo mando y lo adaptamos a tu operación.',
};

export const PLANES_PAG_UI = {
  tag: 'Planes',
  anchaIncluye: 'que-incluye',
  recomendado: 'El recomendado',
  adicionales: 'Se suma a cualquier plan',
  // REVISAR GAEL: etiquetas nuevas sobre los titulares de "Qué incluye" y "Lo que es tuyo".
  etiquetaPagoUnico: 'Una sola vez',
  etiquetaMensual: 'Todos los meses',
  etiquetaTuyo: 'Siempre tuyo',
  comoSeCotiza: 'Cómo se cotiza',
  preguntas: 'Preguntas sobre los planes',
  enlaces: 'Seguí por acá',
  enlacesItems: [
    { href: '/web-a-medida', texto: 'Tu web a medida' },
    { href: '/preguntas', texto: 'Todas las preguntas' },
  ],
  cierreTitulo: '¿Cuál es *el tuyo*?',
  cierreBajada: 'Contame cuántos autos tenés y si querés la web, y lo armamos sobre tu operación.',
  verIncluye: 'Ver qué incluye cada parte',
  cta: 'Hablar por WhatsApp',
  /** CTAs de cada plan. El mensaje de WhatsApp lleva el nombre del plan para saber de dónde viene. */
  planWhatsapp: 'Consultar este plan',
  planDemo: 'Pedir una demo',
  planMensaje: (plan: string) => `Hola Gael, tengo una rentadora y quiero consultar el plan ${plan} de RentaGo.`,
  demoMensaje: 'Hola Gael, tengo una rentadora y quiero ver una demo de RentaGo.',
};

export const TERMINO_PAG = {
  glosario: 'Glosario',
  enRentaGo: 'En RentaGo',
  verComo: 'Ver cómo se hace',
  preguntas: 'Preguntas',
  relacionados: 'Términos relacionados',
  todos: 'Todo el glosario',
  leer: 'Leer más',
  cierreTitulo: '¿Tenés *otra duda*?',
  cierreBajada: 'Escribime y la sumo al glosario.',
};

export const CIUDADES_PAG = {
  nombre: 'Dónde opera',
  titulo: 'Software para rent a car *en tu ciudad*',
  bajada: 'Cada plaza tiene su temporada, su flota y su cliente. Esto es lo que cambia en cada una.',
  title: 'Software para rent a car por ciudad',
  description:
    'Bariloche, Neuquén, Mendoza, Salta, Córdoba, Ushuaia, Rosario, El Calafate y Tucumán: cuándo se llena cada plaza, qué flota pesa y cómo se opera.',
  operacion: 'Un dato de la plaza',
  preguntas: 'Una pregunta de esta plaza',
  tipo: 'El tipo de operación que más se parece',
  ver: 'Ver la plaza',
  cierreTitulo: '¿Tu ciudad *no está*?',
  cierreBajada: 'El sistema funciona en cualquier plaza. Contame dónde operás.',
};

/** Los títulos de las columnas nuevas del pie. */
export const PIE = {
  producto: 'Producto',
  modulosTodos: 'Todos los módulos',
  planes: 'Planes',
  webAMedida: 'Tu web a medida',
  para: 'Tipos de rentadora',
  ciudades: 'Ciudades',
  ayuda: 'Ayuda',
  guias: 'Soluciones',
  contrato: 'Contrato de alquiler',
  descripcion:
    'El sistema de gestión para rent a car: flota, reservas, contratos y caja, con la web propia de cada rentadora.',
};

/** Convierte "algo *clave* más" en partes; las impares son el acento. */
export function partirAcento(texto: string): { t: string; acento: boolean }[] {
  return texto
    .split('*')
    .map((t, i) => ({ t, acento: i % 2 === 1 }))
    .filter((p) => p.t !== '');
}

/* ── /web-a-medida (v4c, 16/10) ────────────────────────────── */

export const WEB_A_MEDIDA_UI = {
  tag: 'Web a medida',
  preguntas: 'Preguntas sobre la web a medida',
  enlaces: 'Seguí por acá',
  enlacesItems: [
    { href: '/modulos/tu-web', texto: 'Cómo reserva y cobra' },
    { href: '/planes#que-incluye', texto: 'Qué incluye' },
    { href: '/planes', texto: 'Los planes' },
    { href: '/operaciones', texto: 'Cómo se hace cada cosa' },
  ],
  /** El CTA de contacto de esta página (el bloque `Gancho`), por encima de las preguntas. REVISAR GAEL. */
  gancho: {
    rotulo: 'Tu web, con tu marca',
    titulo: 'Veamos cómo quedaría tu web',
    texto: 'Mandame tu logo y contame cómo trabajás. Te muestro la web de reservas con tus colores y tu flota.',
    cta: 'Escribime por WhatsApp',
    mensaje: 'Hola Gael, vi la web a medida de RentaGo y quiero ver cómo quedaría la mía.',
    secundario: { texto: 'Dejame tus datos', href: '/contacto' },
  },
  cierreTitulo: 'Veamos tu web *con tu marca*',
  cierreBajada: 'Mandame tu logo y contame cómo trabajás, y lo vemos sobre tu marca.',
  verIncluye: 'Ver qué incluye',
};

/** El link que acompaña al caso en /planes. */
export const CASO_UI = {
  verIncluye: 'Ver qué incluye',
  verSistema: 'Ver los módulos',
};
