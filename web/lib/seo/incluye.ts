/* ── Qué incluye y Web a medida (v4c, 16/10/2026) ────────────────────────────
 *
 * BORRADOR. El copy lo decide Gael: cada texto está registrado en
 * marketing/copy-y-seo/COPY-V4.md (sección v4c) con alternativas.
 *
 * Sin un solo número de precio (decisión cerrada). Se dice el MODELO: un pago único y un
 * mantenimiento mensual. Lo que se afirma de la web de reservas sale de
 * rentago-system/web-reservas: marca, tipografía, logo, secciones propias y "Hecho con RentaGo"
 * son configuración por rentadora; sitemap, robots y llms.txt existen en el motor.
 *
 * Tiene que decir lo mismo que /planes: el plan Gestión no lleva web, así que la web a medida y
 * su dominio van "si elegiste la web". La exportación de datos se describe igual que en la FAQ
 * de /planes (lo que el sistema exporta hoy, y el resto por escrito).
 *
 * "Conectada a tu panel" (16/10, rama crm-rentadora de rentago-system): la reserva pagada entra
 * confirmada al panel y se le asigna el auto (recién ahí se dibuja en el calendario); Mercado
 * Pago cobra con el access token de cada rentadora y el cobro queda en Caja con medio Mercado
 * Pago; el pedido de llamado, la reserva iniciada sin pagar y el pago rechazado caen en
 * Seguimiento, y la campana avisa si nadie los atiende (2 horas por defecto, configurable).
 * La derivación a WhatsApp sin datos NO entra: no se dice que se registra a todos. */
import type { PaginaAMedida } from './tipos';

export const WEB_A_MEDIDA_PAG: PaginaAMedida = {
  slug: 'web-a-medida',
  nombre: 'Web a medida',
  title: 'Web de reservas a medida para tu rentadora',
  description:
    'La web de reservas de RentaGo lleva el logo, la paleta, la tipografía y el dominio de tu rentadora. Partimos de un diseño probado y lo adaptamos a tu marca.',
  h1: 'Una web de reservas *a medida de tu rentadora*',
  bajada: 'Tu logo, tus colores, tu tipografía y tu dominio, sobre un diseño ya probado.',
  citable:
    'La web de reservas que entrega RentaGo sale con la marca de cada rentadora: su logo, su paleta, su tipografía, sus fotos y su dominio. El punto de partida es un diseño ya resuelto, rápido, con SEO y accesible, que se adapta a la marca. RentaGo no aparece, salvo un "Hecho con RentaGo" opcional al pie.',
  cambiaTitulo: 'Lo que se adapta a tu rentadora',
  cambia: [
    { icono: 'chispa', titulo: 'Tu logo', texto: 'En el encabezado, en el pie, en la pestaña del navegador y cuando alguien comparte el link.' },
    { icono: 'etiquetas', titulo: 'Tu paleta', texto: 'Tu color principal y tu acento en botones, links y detalles, cuidando que se lean bien.' },
    { icono: 'documento', titulo: 'Tu tipografía', texto: 'La familia de letra que va con tu marca, elegida entre fuentes pensadas para pantalla.' },
    { icono: 'globo', titulo: 'Tu dominio', texto: 'La web vive en tu dominio, registrado a tu nombre. El cliente nunca ve otra dirección.' },
    { icono: 'auto', titulo: 'Tu flota y tu ciudad', texto: 'Tus tipos de vehículo, tus categorías con sus fotos, tus sucursales y tus puntos de retiro.' },
    { icono: 'lista', titulo: 'Secciones propias', texto: 'Si tu operación lo pide, se suman secciones tuyas sin tocar el motor de reservas.' },
  ],
  vieneTitulo: 'Lo que ya viene resuelto',
  viene: [
    { icono: 'calendario', titulo: 'El motor de reservas', texto: 'Checkout de 4 pasos, cupo retenido 20 minutos y cobro por Mercado Pago o transferencia.' },
    { icono: 'rayo', titulo: 'Rápida en el celular', texto: 'Páginas livianas, pensadas primero para el teléfono.' },
    { icono: 'buscar', titulo: 'Con SEO de base', texto: 'Títulos, descripciones, datos estructurados, sitemap y un archivo para buscadores con IA.' },
    { icono: 'personas', titulo: 'Accesible', texto: 'Contraste suficiente, foco visible y todo usable con teclado.' },
  ],
  conectaTitulo: 'Conectada a tu panel',
  conecta: [
    {
      icono: 'calendario',
      titulo: 'Las reservas, a tu panel',
      texto: 'Cada reserva pagada entra confirmada, sobre el mismo cupo que ve el mostrador. Le asignás el auto y queda en el calendario.',
    },
    {
      icono: 'billetera',
      titulo: 'Los cobros, a tu cuenta y a tu Caja',
      texto: 'Mercado Pago cobra con tu propia cuenta: la plata se acredita ahí y el cobro queda en la Caja del panel.',
    },
    {
      icono: 'personas',
      titulo: 'Nadie se pierde',
      texto: 'Quien pide que lo llames, quien no termina de pagar y a quien le rechazan el pago caen en el Seguimiento, con su contacto y lo que pidió.',
    },
    {
      icono: 'campana',
      titulo: 'Un aviso si nadie atiende',
      texto: 'Si pasan dos horas y nadie lo llamó, la campana del panel avisa. El plazo lo elegís vos.',
    },
  ],
  secciones: [
    {
      titulo: 'Por qué no arrancamos de cero',
      parrafos: [
        'Una web de reservas tiene muchas partes que no se ven y que cuestan meses: el cupo real de la flota, el precio final con el seguro, el pago, el aviso al mostrador, la página que aparece en Google. Esas partes ya están resueltas y andando. Lo que cambia de una rentadora a otra es cómo se ve y qué ofrece.',
        'Por eso el diseño que ves en la web de ejemplo es un punto de partida y no una plantilla cerrada. Se adapta a tu marca, a tu flota y a tu ciudad, y lo que no se toca es lo que hace que el cliente llegue al final de la reserva sin trabarse.',
      ],
    },
    {
      titulo: 'Qué hace falta de tu lado',
      parrafos: [
        'Tu logo, tus colores si ya los tenés definidos, fotos de tus vehículos y los textos que quieras decir de tu rentadora. Si algo falta, lo resolvemos juntos, por ejemplo armando la paleta a partir del logo. El dominio lo registramos a tu nombre o conectamos el que ya usás.',
      ],
    },
  ],
  preguntas: [
    {
      p: '¿Las reservas de la web llegan a mi sistema?',
      r: 'Sí. La web y el panel comparten los datos: la reserva pagada entra confirmada al panel, el cobro por Mercado Pago queda en tu Caja y quien consulta o no termina de pagar aparece en el Seguimiento para que lo llames.',
    },
    {
      p: '¿Se nota que la web es de RentaGo?',
      r: 'No. La web lleva tu marca y tu dominio. RentaGo solo aparece si querés, con un "Hecho con RentaGo" chico al pie.',
    },
    {
      p: '¿Puedo usar el dominio que ya tengo?',
      r: 'Sí. Se conecta tu dominio actual, o se registra uno nuevo a nombre de tu rentadora.',
    },
    {
      p: '¿Puedo cambiar los colores o el logo más adelante?',
      r: 'Sí. La marca es configuración de tu web, no un diseño grabado a fuego: si cambiás de logo o de colores, se actualiza.',
    },
    {
      p: '¿Y si quiero un diseño completamente distinto?',
      r: 'Para eso está el adicional Web con diseño propio: un sitio pensado desde cero para tu marca, con el mismo motor de reservas por detrás.',
    },
  ],
};
