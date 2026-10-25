/* La copy de las páginas internas (sistema, módulos, operaciones, contacto, 404).
 *
 * Misma regla que `contenido.ts`: ningún texto largo en JSX. Los titulares marcan la frase clave
 * con *asteriscos* y el componente la pinta en el acento del tono. Sin precios, sin 3D, sin
 * nombrar al cliente real: la rentadora de los ejemplos es ficticia. */

export type Tono = 'turq' | 'azul' | 'menta' | 'petro';

/** Rotación de tonos para listas sin significado propio (pasos, operaciones). */
export const TONOS: Tono[] = ['turq', 'azul', 'menta', 'petro'];

/* ── /sistema ─────────────────────────────────────────────────────────────── */

/** Las cinco secciones del menú real, con las pantallas (por slug) que cuelgan de cada una. */
export const SECCIONES_SISTEMA: {
  titulo: string;
  tono: Tono;
  icono: string;
  frase: string;
  pantallas: string[];
}[] = [
  {
    titulo: 'Operación',
    tono: 'turq',
    icono: 'panel',
    frase: 'Lo que pasa hoy en el mostrador.',
    pantallas: ['ocupacion', 'reservas', 'contratos', 'clientes'],
  },
  {
    titulo: 'Flota',
    tono: 'petro',
    icono: 'auto',
    frase: 'Tus autos, en regla y con su historial.',
    pantallas: ['flota', 'categorias', 'multas'],
  },
  {
    titulo: 'Caja',
    tono: 'menta',
    icono: 'billetera',
    frase: 'Cuánto entró, cuánto falta cobrar y quién te debe.',
    pantallas: ['caja', 'reportes'],
  },
  {
    titulo: 'Ventas',
    tono: 'azul',
    icono: 'calculadora',
    frase: 'Precios, web y gente por convencer.',
    pantallas: [
      'cotizador',
      'prospectos',
      'precios',
      'simulador',
      'adicionales',
      'fechas-especiales',
      'canal-web',
      'reservas-web',
    ],
  },
  {
    titulo: 'Sistema',
    tono: 'turq',
    icono: 'engranaje',
    frase: 'Avisos, ajustes y la huella de cada cambio.',
    pantallas: ['notificaciones', 'configuracion', 'auditoria'],
  },
];

export const SISTEMA = {
  titulo: 'Las pantallas del sistema, *por dentro*',
  bajada:
    'Es el panel de una rentadora de ejemplo, pantalla por pantalla. Cada una dice su dirección dentro del sistema.',
  verModulo: 'Ver el módulo',
  pendientesTitulo: 'También en el panel',
  pendientesNota: 'Existen y se ven completas en la reunión, compartiendo pantalla.',
  indice: 'Pantallas del sistema',
  cierreTitulo: 'Llevalo a *tu rentadora*',
  cierreBajada: 'Contame cómo trabajás y vemos cómo queda con tu flota.',
};

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
  tag: 'Antes de firmar',
  titulo: '¿Cómo elegir un software *para rent a car*?',
  bajada: 'Doce preguntas para hacerle a cualquier proveedor, incluido este.',
  rentago: 'En RentaGo',
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
  bajada: 'Contestadas antes de la llamada. Incluida la que no me conviene.',
  operacionesTitulo: '¿Y si la duda es cómo se hace algo?',
  cierreTitulo: '¿Falta *la tuya*?',
  cierreBajada: 'Escribime y la contesto.',
};

export const PLAZA_PAG = {
  cuando: 'Cuándo se llena',
  flota: 'Qué flota pesa',
  demanda: 'Dónde llega la demanda',
  aeropuertoNota: 'La entrega en el aeropuerto se carga como adicional con su precio.',
  entregaTitulo: 'Qué se entrega',
  entregaTexto:
    'El sistema con el que se maneja la rentadora y, en el plan Gestión + Web, la web propia donde el cliente reserva y paga.',
  masUsadoTitulo: 'Lo que más se usa acá',
  otras: 'Otras plazas',
};

/* ── Familias SEO nuevas (08/10/2026): para, guías, contrato, planes, términos, ciudades ──
 *
 * BORRADOR: los rótulos y los cierres los decide Gael. */

export const PARA_PAG = {
  tag: 'Para tu operación',
  indiceTitulo: '¿Qué tipo de *rentadora* tenés?',
  indiceBajada: 'Cada operación pierde plata en un lugar distinto. Elegí la tuya.',
  indiceTitle: 'Software para cada tipo de rentadora',
  indiceDescription:
    'Rent a car de aeropuerto, alquiler turístico, camionetas y utilitarios, empresas, choferes de aplicaciones y varias sucursales: qué necesita cada operación.',
  necesidades: 'Lo que necesita esta operación',
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
  tag: 'Guías',
  indiceTitulo: 'Guías para *el mostrador*',
  indiceBajada: 'Sirven aunque no compres nada. Cada una termina en una lista para revisar.',
  indiceTitle: 'Guías para rentadoras de autos',
  indiceDescription:
    'Cómo armar tarifas de temporada, explicar la franquicia, cobrar la seña online, pasar del Excel a un sistema y no perder un vencimiento de la flota.',
  pasos: 'Para revisar',
  enRentaGo: 'En RentaGo',
  modulo: 'El módulo',
  terminos: 'Términos de esta guía',
  preguntas: 'Preguntas',
  otras: 'Otras guías',
  leer: 'Leer la guía',
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
  recomendado: 'El recomendado',
  adicionales: 'Se suma a cualquier plan',
  comoSeCotiza: 'Cómo se cotiza',
  preguntas: 'Preguntas sobre los planes',
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
  tag: 'Dónde opera',
  titulo: 'Software para rent a car *en tu ciudad*',
  bajada: 'Cada plaza tiene su temporada, su flota y su cliente. Esto es lo que cambia en cada una.',
  title: 'Software para rent a car por ciudad',
  description:
    'Bariloche, Neuquén, Mendoza, Salta, Córdoba, Ushuaia, Rosario, El Calafate y Tucumán: cuándo se llena cada plaza, qué flota pesa y cómo se opera.',
  operacion: 'Cómo se opera acá',
  preguntas: 'Preguntas de esta plaza',
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
  queIncluye: 'Qué incluye',
  webAMedida: 'Tu web a medida',
  para: 'Para tu operación',
  ciudades: 'Ciudades',
  recursos: 'Recursos',
  guias: 'Guías',
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

/* ── /que-incluye y /web-a-medida (v4c, 16/10) ────────────────────────────── */

export const QUE_INCLUYE_UI = {
  tag: 'Qué incluye',
  preguntas: 'Preguntas sobre qué incluye',
  enlaces: 'Seguí por acá',
  enlacesItems: [
    { href: '/planes', texto: 'Los planes' },
    { href: '/web-a-medida', texto: 'Tu web a medida' },
    { href: '/sistema', texto: 'Las pantallas del sistema' },
    { href: '/preguntas', texto: 'Todas las preguntas' },
  ],
  cierreTitulo: 'Armemos *lo tuyo*',
  cierreBajada: 'Contame cuántos autos tenés y si querés la web, y te digo qué lleva cada parte.',
  verPlanes: 'Ver los planes',
};

export const WEB_A_MEDIDA_UI = {
  tag: 'Web a medida',
  preguntas: 'Preguntas sobre la web a medida',
  enlaces: 'Seguí por acá',
  enlacesItems: [
    { href: '/modulos/tu-web', texto: 'Cómo reserva y cobra' },
    { href: '/que-incluye', texto: 'Qué incluye' },
    { href: '/planes', texto: 'Los planes' },
    { href: '/operaciones', texto: 'Cómo se hace cada cosa' },
  ],
  cierreTitulo: 'Veamos tu web *con tu marca*',
  cierreBajada: 'Mandame tu logo y contame cómo trabajás, y lo vemos sobre tu marca.',
  verIncluye: 'Ver qué incluye',
};

/** El link que acompaña al caso en /sistema y /que-incluye. */
export const CASO_UI = {
  verIncluye: 'Ver qué incluye',
  verSistema: 'Ver las pantallas',
};
