/* ── Planes (+ Qué incluye, ancla #que-incluye) ───────────────────────────────
 *
 * BORRADOR. El copy lo decide Gael, y los nombres de los planes también: estos son una
 * propuesta para discutir. Esta página absorbió lo que era /que-incluye (redirect en
 * next.config.ts): su contenido original vive en la sección con ancla #que-incluye.
 *
 * Sin un solo número de precio y sin prometer cómo llega: el precio depende de la operación y se
 * habla antes de empezar. Se vende el sistema; la web de reservas conectada es una opción. Si en esta página aparece
 * una cifra con signo pesos o dólar, es un bug.
 *
 * Todo lo que se afirma del sistema sale de `contenido.ts`, verificado contra el código. No se
 * ofrece lo que todavía no está construido: factura electrónica, prueba gratis ni instancia
 * dedicada. Las sucursales ya están en el producto: se suman como adicional.
 *
 * Las preguntas son las 4 de /planes más las de /que-incluye, sin duplicar: "¿Qué se paga una sola
 * vez?" ya la cubre "¿Qué incluye la implementación?" y "¿Puedo llevarme mis datos?" ya la cubre
 * "¿Qué pasa con mis datos si dejo de usarlo?". */
import type { PaginaPlanes } from './tipos';

export const PLANES_PAG: PaginaPlanes = {
  slug: 'planes',
  nombre: 'Planes',
  title: 'Planes del software para rent a car',
  description:
    'Tres maneras de contratar RentaGo: el sistema solo, el sistema con tu web de reservas conectada o una versión a medida. El precio depende de tu operación.',
  h1: 'Planes del *software para rent a car*',
  bajada:
    'Elegís qué necesitás. El precio depende de tu operación y lo hablamos antes de empezar.',
  citable:
    'RentaGo es un sistema de gestión para rentadoras, con una web de reservas conectada si la querés. El precio depende de la operación de cada rentadora: cuántos autos tiene, cuántas sucursales y si quiere la web. Se habla antes de empezar.',
  planes: [
    {
      slug: 'gestion',
      nombre: 'Gestión',
      para: 'Para la rentadora que ya tiene su web y quiere ordenar el mostrador.',
      incluye: [
        'El panel completo: ocupación, flota, reservas, contratos y caja',
        'Motor de precios de 3 capas',
        'Contratos con firma en pantalla',
        'Avisos de vencimientos en la campana',
        'Carga inicial de flota, tarifas y clausulado',
        'Marcha blanca y capacitación',
      ],
    },
    {
      slug: 'gestion-web',
      nombre: 'Gestión + Web',
      para: 'Para vender también cuando el mostrador está cerrado.',
      incluye: [
        'Todo lo de Gestión',
        'Tu propia web, con tu logo, tus colores y tu dominio',
        'Checkout de 4 pasos y cupo retenido 20 minutos',
        'Cobro por Mercado Pago o transferencia',
        'El mismo cupo y el mismo precio que el mostrador',
      ],
      recomendado: true,
    },
    {
      slug: 'a-medida',
      nombre: 'A medida',
      para: 'Para la operación que necesita algo que el sistema todavía no trae.',
      incluye: [
        'Todo lo de Gestión + Web',
        'Web con diseño propio',
        'Contrato adaptado a tu operación',
        'Integraciones y desarrollos puntuales',
      ],
    },
  ],
  adicionales: [
    {
      nombre: 'Contrato a medida',
      texto:
        'Arrancamos de un contrato modelo y lo adaptamos a tus cláusulas.',
    },
    {
      nombre: 'Web con diseño propio',
      texto: 'Un sitio pensado desde cero para tu marca, con el mismo motor de reservas por detrás.',
    },
    {
      nombre: 'Sucursal extra',
      texto: 'Otra sucursal con sus puntos de retiro y devolución, su caja y sus reportes.',
    },
    {
      nombre: 'Reparto entre socios',
      texto:
        'Cada socio con su porcentaje y quién le pasa cuánto a quién, en la Caja.',
    },
    {
      nombre: 'Prospectos y campañas',
      texto:
        'Módulo opcional: empresas que podrían alquilarte, cruzadas con tus clientes, y la campaña armada.',
    },
    {
      nombre: 'Capacitación y carga extra',
      texto:
        'Más horas con el equipo, o cargar datos más allá de la flota, las tarifas y el clausulado.',
    },
  ],
  incluyeTitulo: 'Qué incluye contratar RentaGo',
  incluyeCitable:
    'Contratar RentaGo tiene dos partes. Un pago único cubre el desarrollo de la web de reservas a medida, la implementación del sistema, la capacitación del equipo y la puesta en marcha del dominio y el hosting. Después, un mantenimiento mensual cubre el hosting, las actualizaciones, el soporte y el uso del sistema.',
  pagoUnico: {
    nombre: 'Pago único',
    para: 'Lo que se hace una vez, para que arranques con todo cargado y andando.',
    items: [
      {
        icono: 'globo',
        titulo: 'Tu web de reservas a medida',
        texto: 'Con tu logo, tu paleta, tu tipografía y tus fotos, conectada a tu panel. Si elegiste el plan sin web, esta parte no va.',
      },
      {
        icono: 'auto',
        titulo: 'Implementación del sistema',
        texto: 'Cargamos tu flota con sus papeles, las categorías, los precios por temporada y tu contrato, tal como trabajás hoy.',
      },
      {
        icono: 'personas',
        titulo: 'Capacitación del equipo',
        texto: 'Mostrador, caja y administración, cada uno con su rol. Al arrancar, operás acompañado.',
      },
      {
        icono: 'candado',
        titulo: 'Dominio y hosting en marcha',
        texto: 'Registramos tu dominio a tu nombre, o conectamos el que ya tenés, y dejamos la web y el sistema publicados.',
      },
    ],
  },
  mensual: {
    nombre: 'Mantenimiento mensual',
    para: 'Lo que hace falta todos los meses para que el sistema y la web sigan andando.',
    items: [
      {
        icono: 'panel',
        titulo: 'Hosting',
        texto: 'La web y el sistema publicados y andando, sin que tengas que contratar servidores.',
      },
      {
        icono: 'girar',
        titulo: 'Actualizaciones',
        texto: 'Las mejoras del sistema te llegan a medida que salen, sin instalar nada.',
      },
      {
        icono: 'whatsapp',
        titulo: 'Soporte directo',
        texto: 'Hablás por WhatsApp con quien desarrolla y mantiene el sistema.',
      },
      {
        icono: 'usuario',
        titulo: 'Uso del sistema',
        texto: 'El panel para tu equipo, cada uno con su rol, y tu web mandándole las reservas, los cobros y las consultas.',
      },
    ],
  },
  tuyoTitulo: 'Lo que es tuyo',
  tuyo: [
    {
      icono: 'globo',
      titulo: 'El dominio, a tu nombre',
      texto: 'Se registra a nombre de tu rentadora. Si un día dejás RentaGo, el dominio se queda con vos.',
    },
    {
      icono: 'bajar',
      titulo: 'Tus datos, exportables',
      texto: 'Los reportes de Ingresos y Flota salen a CSV y la planilla de alquileres del mes, a Excel. Cómo se entrega el resto queda por escrito antes de empezar.',
    },
    {
      icono: 'chispa',
      titulo: 'Tu marca y tu contenido',
      texto: 'El logo, las fotos y los textos de tu web son de tu rentadora, no de RentaGo.',
    },
  ],
  secciones: [
    {
      titulo: 'Por qué en dos partes',
      parrafos: [
        'Poner en marcha un sistema de gestión es trabajo de una sola vez: relevar cómo trabajás, cargar la flota y las tarifas, adaptar el contrato, armar la web con tu marca y enseñarle al equipo a usarlo. Eso es el pago único, y cuando termina tenés el mostrador operando en el sistema y la web vendiendo.',
        'Mantenerlo andando es trabajo de todos los meses: los servidores, las mejoras que se suman y alguien que conteste cuando algo no sale. Eso es el mantenimiento mensual. Separarlo así hace que pagues cada cosa una vez y sepas qué estás pagando.',
      ],
    },
    {
      titulo: 'Cómo se calcula',
      parrafos: [
        'No hay un precio de lista. Cada parte depende de tu operación: cuántos autos tenés, cuántas sucursales y si querés la web de reservas. Lo hablamos antes de empezar, con una demo del sistema si querés verlo, y queda por escrito antes de arrancar.',
      ],
    },
  ],
  preguntas: [
    {
      p: '¿Por qué no está el precio en la web?',
      r: 'Porque no hay un precio que sirva para todos. Una rentadora de diez autos sin web y una de cuarenta con dos sucursales no pagan lo mismo.',
    },
    {
      p: '¿Qué incluye la implementación?',
      r: 'Es la parte del pago único: relevamiento, carga de flota, tarifas y clausulado, tu web con tu marca si la elegiste, el dominio y el hosting en marcha, y capacitación con marcha blanca. Vos ponés la información y elegís fotos y textos; la carga la hago yo. Después sigue el mantenimiento mensual: hosting, actualizaciones, soporte y uso del sistema.',
    },
    {
      p: '¿Puedo empezar sin la web y sumarla después?',
      r: 'Sí. Se puede arrancar con Gestión y sumar la web más adelante. La web se arma sobre la flota y las tarifas que ya cargaste, y vende con el mismo cupo y el mismo precio que el mostrador.',
    },
    {
      p: '¿Qué pasa con mis datos si dejo de usarlo?',
      r: 'Los datos son de tu rentadora. Desde el sistema ya podés exportar los reportes de Ingresos y Flota a CSV y la planilla de alquileres del mes a Excel. Cómo se entrega el resto lo dejamos por escrito antes de empezar.',
    },
    {
      p: '¿Qué cubre el mantenimiento mensual?',
      r: 'El hosting de la web y del sistema, las actualizaciones, el soporte por WhatsApp y el uso del sistema para tu equipo.',
    },
    {
      p: '¿El dominio queda a mi nombre?',
      r: 'Sí. Se registra a nombre de tu rentadora, o se conecta el que ya tenés. Si un día dejás de usar RentaGo, el dominio sigue siendo tuyo.',
    },
    {
      p: 'Si ya tengo web, ¿igual pago una web nueva?',
      r: 'No. El plan Gestión es el sistema solo, para la rentadora que ya tiene su web. La web de reservas se puede sumar después, sobre la flota y las tarifas que ya cargaste.',
    },
    {
      p: '¿Lo que entra por la web llega al sistema?',
      r: 'Sí, la web y el panel son el mismo sistema. Las reservas pagadas entran confirmadas al panel, los cobros por Mercado Pago se acreditan en tu cuenta y quedan en la Caja, y quien pide que lo llames o no termina de pagar cae en el Seguimiento.',
    },
  ],
};
