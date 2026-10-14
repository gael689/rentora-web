/* "Probalo 14 días": la demo por autoservicio (F5 de rentora-system, `docs/DEMOS.md`).
 *
 * **Apagada por defecto.** Sin `NEXT_PUBLIC_DEMO_ACTIVA=1` no se pinta nada: ni el CTA, ni la
 * respuesta nueva de la FAQ, ni la línea de llms.txt, y las tres rutas (`/probar`,
 * `/demo/confirmar`, `/demo/lista`) dan 404. La regla de marketing/copy-y-seo/AUDITORIA-CONVERSION.md §10: nada de
 * esto se publica antes de que la función ande en producción y se haya probado de punta a punta.
 *
 * El circuito, del lado del sitio:
 * 1. `/probar`: el formulario con Turnstile hace `POST {API}/api/v1/public/demos` (JSON). La API
 *    no crea nada todavía: manda un mail con el link de confirmación (vale 24 h).
 * 2. `/demo/confirmar?token=…`: un botón que hace `POST {API}/api/v1/public/demos/confirmar`
 *    (form, sin JS). **Nunca confirma al cargar**: los filtros de correo abren los links.
 * 3. La API redirige a `/demo/lista?estado=creada|en_cola|vencido|invalido`.
 *
 * BORRADOR: todo el copy de este archivo lo decide Gael. Los CTA, la FAQ y la línea de llms.txt
 * son las opciones (a) de marketing/copy-y-seo/AUDITORIA-CONVERSION.md §10.1. */

/** El interruptor. Se lee en build: cambiarlo pide un build nuevo. */
export const DEMO_ACTIVA = process.env.NEXT_PUBLIC_DEMO_ACTIVA === '1';

/** La API de rentora-system, sin la barra final. */
export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? '').replace(/\/+$/, '');

/** La site key del widget de Turnstile para rentora.com.ar. La secret va en la API. */
export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';

export const RUTA_PROBAR = '/probar';

/** Los seis tipos que siembra todo tenant (`TIPOS_VEHICULO` en `semilla_tenant.py`). El código
 *  es lo que se manda; el nombre es lo que se ve. */
export const TIPOS_VEHICULO = [
  { codigo: 'auto', nombre: 'Autos' },
  { codigo: 'camioneta', nombre: 'Camionetas' },
  { codigo: 'combi', nombre: 'Combis' },
  { codigo: 'utilitario', nombre: 'Utilitarios' },
  { codigo: 'moto', nombre: 'Motos' },
  { codigo: 'motorhome', nombre: 'Motorhomes' },
] as const;

/* ── Los CTA que se prenden con el interruptor ─────────────────────────────── */

export const DEMO_CTA = {
  /** Encabezado (secundario, al lado de "Ver el sistema andando"). */
  encabezado: 'Probalo 14 días',
  /** Link secundario de los cierres de página. */
  cierre: 'Probalo 14 días',
  /** /planes: opción (a) de la auditoría. */
  planes: 'Probalo 14 días: después elegís el plan',
  /** Cierre de la home. */
  home: 'Probalo 14 días',
};

/** La respuesta nueva de "¿Puedo verlo funcionando antes de decidir?" (§10.1). */
export const FAQ_DEMO =
  'Sí. Pedís la demo y en un minuto tenés el sistema andando con el nombre de tu rentadora y una flota de ejemplo: autos, reservas del mes, una cuenta corriente con deuda y avisos. Es tuya durante 14 días. Si preferís que lo recorramos juntos, también te lo muestro compartiendo pantalla.';

/** La línea de llms.txt (§10.1). */
export const LLMS_DEMO = 'Se puede probar 14 días con una demo propia, con datos de ejemplo.';

/* ── /probar ───────────────────────────────────────────────────────────────── */

export const PROBAR = {
  title: 'Probá el sistema 14 días',
  description:
    'Pedí tu demo de Rentora: el sistema andando con el nombre de tu rentadora y una flota de ejemplo, durante 14 días.',
  tag: 'Demo de 14 días',
  titulo: 'Probalo 14 días con *el nombre de tu rentadora*',
  bajada: 'Dejás tus datos, confirmás el mail y entrás. Con una flota de ejemplo y sin tarjeta.',
  nombre: 'Tu nombre',
  email: 'Tu mail',
  emailAyuda: 'Ahí te llega el link para entrar.',
  rentadora: 'Nombre de tu rentadora',
  ciudad: 'Ciudad',
  tipos: 'Qué alquilás',
  tiposAyuda: 'Marcá todo lo que tengas en la flota.',
  whatsapp: 'WhatsApp (opcional)',
  whatsappAyuda: 'Por si querés que te escriba para recorrerlo juntos.',
  enviar: 'Quiero mi demo',
  enviando: 'Mandando…',
  faltan: 'Completá tu nombre, tu mail, la rentadora y la ciudad.',
  mailMal: 'Ese mail no parece válido. Revisalo.',
  sinTipos: 'Marcá al menos un tipo de vehículo.',
  sinVerificar: 'Esperá a que termine la verificación de abajo y probá de nuevo.',
  errorGenerico: 'No pudimos pedir la demo. Escribime por WhatsApp y te la armo yo.',
  errorRed: 'Se cortó la conexión. Probá de nuevo o escribime por WhatsApp.',
  whatsappAbrir: 'Abrir WhatsApp',
  enviadoTitulo: 'Revisá tu mail.',
  enviadoTexto:
    'Te mandamos un link para confirmar que el mail es tuyo. Vale 24 horas. Si no lo ves, mirá en spam o promociones.',
  colaTitulo: 'Tu pedido quedó en la fila.',
  colaTexto: 'Ahora hay muchas demos andando a la vez. Te escribo apenas se libere un lugar.',
  sinJs:
    'Para pedir la demo hace falta JavaScript, que este navegador tiene apagado. Escribime por WhatsApp y te la armo yo.',
  whatsappMensaje: 'Hola Gael, quiero probar Rentora 14 días.',
  queTrae: 'Qué trae la demo',
  trae: [
    'El sistema entero con el nombre y la ciudad de tu rentadora.',
    'Una flota de ejemplo con sus categorías, tarifas de temporada y adicionales.',
    'Reservas del mes, una cuenta corriente con deuda y los avisos que eso dispara.',
    'La web de reservas de tu rentadora, en una dirección de prueba.',
  ],
  pie: 'A los 14 días la demo se pausa. Si después seguís, se cotiza sobre tu flota.',
  privacidad: 'Los datos son para armar tu demo y escribirte sobre ella.',
};

/* ── /demo/confirmar ───────────────────────────────────────────────────────── */

export const CONFIRMAR = {
  title: 'Confirmar tu demo',
  description: 'Confirmá tu mail para abrir la demo de Rentora.',
  tag: 'Demo de 14 días',
  titulo: 'Un clic y *armamos tu demo*',
  bajada: 'Preparamos el sistema con datos de ejemplo y el nombre de tu rentadora. Tarda unos segundos.',
  boton: 'Abrir mi demo',
  sinToken: 'Este link vino incompleto. Abrilo de nuevo desde el mail, o pedí la demo otra vez.',
  pedirOtra: 'Pedir la demo de nuevo',
};

/* ── /demo/lista ───────────────────────────────────────────────────────────── */

export const LISTA = {
  title: 'Tu demo',
  description: 'El estado de tu demo de Rentora.',
  tag: 'Demo de 14 días',
  estados: {
    creada: {
      titulo: 'Tu demo *está lista*',
      bajada: 'Revisá tu mail: te llegó la invitación para entrar al sistema. Es tuya durante 14 días.',
    },
    en_cola: {
      titulo: 'Tu demo *quedó en la fila*',
      bajada: 'Ahora hay muchas demos andando a la vez. Apenas se libere un lugar la armo y te llega el mail para entrar.',
    },
    vencido: {
      titulo: 'Ese link *ya venció*',
      bajada: 'Los links de confirmación valen 24 horas. Pedí la demo de nuevo y te llega uno nuevo.',
    },
    invalido: {
      titulo: 'Ese link *no funciona*',
      bajada: 'Puede que ya lo hayas usado o que haya llegado cortado. Si ya confirmaste, revisá tu mail.',
    },
  },
  pedirOtra: 'Pedir la demo de nuevo',
  whatsapp: 'Escribime por WhatsApp',
  verSistema: 'Mientras tanto, mirá las pantallas',
};

export type EstadoLista = keyof typeof LISTA.estados;
