/* La política de privacidad. Corta a propósito: dice lo que hace el sitio, y el sitio hace poco.
 *
 * Tiene que seguir siendo cierta. Si se suma analítica, cookies o un servicio nuevo que reciba los
 * datos del formulario, se cambia acá en el mismo commit — una política que describe otro sitio es
 * peor que no tenerla. Marco: Ley 25.326 de Protección de los Datos Personales. */

export const PRIVACIDAD = {
  tag: 'Privacidad',
  titulo: 'Tus datos, *en pocas líneas*',
  bajada: 'Qué pedimos, para qué lo usamos y cómo pedir que lo borremos.',
  actualizada: 'Actualizada el 8 de octubre de 2026',
  bloques: [
    {
      titulo: 'Quién responde',
      texto:
        'Gael González, desarrollador en Bahía Blanca, es quien recibe y guarda lo que mandás por el formulario o por WhatsApp.',
    },
    {
      titulo: 'Qué datos pedimos',
      texto:
        'Los del formulario: nombre de la rentadora, ciudad, cantidad de autos y un WhatsApp o mail para contestarte. Si querés, también tu nombre y qué querés resolver. Nada más.',
    },
    {
      titulo: 'Para qué los usamos',
      texto:
        'Para contestarte y armar la propuesta. No los vendemos ni los cedemos a nadie. El mensaje llega a mi casilla a través de Resend, el servicio que envía el mail.',
    },
    {
      titulo: 'Cookies y seguimiento',
      texto:
        'Medimos las visitas sin cookies y sin identificarte. Las cookies de Google Analytics y de Meta solo se activan si las aceptás en el aviso, y las podés apagar cuando quieras desde "Cookies", al pie de cada página. El detalle está más abajo, en la política de cookies.',
    },
    {
      titulo: 'Tus derechos',
      texto:
        'Podés pedir ver, corregir o borrar tus datos cuando quieras y sin costo, escribiendo por WhatsApp. Los borro en el momento.',
    },
    {
      titulo: 'Autoridad de control',
      texto:
        'La Agencia de Acceso a la Información Pública, órgano de control de la Ley 25.326, atiende las denuncias y reclamos de quienes vean afectados sus derechos por incumplimientos de las normas de protección de datos personales.',
    },
  ],
  enlace: 'Privacidad',
  avisoFormulario: 'Al enviar aceptás que usemos estos datos para contestarte.',
} as const;

/* ── Cookies ──────────────────────────────────────────────────────────────────
 *
 * BORRADOR. El copy lo decide Gael: esto es una propuesta para editar, no texto cerrado.
 *
 * El aviso y la política dicen lo mismo que hace el código de `components/consentimiento/`. Si se
 * suma o se saca una herramienta, se cambia acá en el mismo commit. Duraciones: la cookie de la
 * elección y las de GA4 duran 6 meses (GA4 va con `cookie_expires` a 6 meses, no a los 2 años
 * por defecto); la de Meta, 90 días, que es lo que fija Meta y no se puede cambiar. */

export const COOKIES = {
  /** El aviso. Sin gritar: una línea de título y dos de texto. */
  aviso: {
    titulo: 'Cookies, solo si querés',
    texto:
      'Contamos las visitas sin cookies. Si aceptás, también usamos Google Analytics para entender qué páginas sirven y Meta para medir los anuncios.',
    aceptar: 'Aceptar',
    rechazar: 'Rechazar',
    configurar: 'Configurar',
    guardar: 'Guardar mi elección',
    cerrar: 'Cerrar',
    politica: 'Política de cookies',
    rotulo: 'Aviso de cookies',
  },
  /** Las tres casillas de "Configurar". La primera no se puede apagar. */
  categorias: {
    necesarias: {
      nombre: 'Necesarias',
      texto: 'Guardan tu elección sobre las cookies. Siempre activas.',
    },
    analitica: {
      nombre: 'Analítica',
      texto: 'Google Analytics: qué páginas se visitan y desde dónde llegan. Sin tu nombre ni tus datos de contacto.',
    },
    marketing: {
      nombre: 'Marketing',
      texto: 'Meta Pixel: si alguien llegó por un anuncio de Facebook o Instagram, nos dice si después escribió.',
    },
  },
  /** El link del pie que vuelve a abrir el aviso. */
  enlacePie: 'Cookies',

  /** La sección de /privacidad. */
  politica: {
    titulo: 'Política de cookies',
    intro:
      'Una cookie es un archivo chico que el sitio guarda en tu navegador. Este sitio usa una propia, para recordar tu elección, y otras de terceros solo si las aceptás.',
    columnas: ['Cookie', 'De quién', 'Para qué', 'Dura'],
    filas: [
      ['rentora_consentimiento', 'Rentora', 'Recordar si aceptaste, rechazaste o configuraste las cookies.', '6 meses'],
      ['_ga y _ga_<ID>', 'Google Analytics', 'Contar visitas y páginas vistas sin identificarte. Solo con analítica aceptada.', '6 meses'],
      ['_fbp', 'Meta', 'Saber si una visita que llegó por un anuncio después escribió. Solo con marketing aceptado.', '90 días'],
    ],
    sinCookies:
      'Además medimos las visitas con Vercel Web Analytics, que no usa cookies ni guarda datos que te identifiquen: cuenta visitas en forma agregada.',
    terceros:
      'Google y Meta procesan esos datos en sus servidores, que pueden estar fuera de Argentina. Antes de que aceptes, sus scripts ni siquiera se cargan.',
    revocar:
      'Podés cambiar tu elección cuando quieras desde "Cookies", al pie de cada página. Si retirás el permiso, borramos esas cookies de tu navegador y dejamos de medir. También podés borrarlas desde la configuración de tu navegador.',
  },
} as const;
