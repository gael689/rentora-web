/* ── Planes ───────────────────────────────────────────────────────────────────
 *
 * BORRADOR. El copy lo decide Gael, y los nombres de los planes también: estos son una
 * propuesta para discutir.
 *
 * Sin un solo número de precio y sin prometer cómo llega: el precio depende de la operación y se
 * habla antes de empezar. Se vende el sistema; la web de reservas conectada es una opción. Si en esta página aparece
 * una cifra con signo pesos o dólar, es un bug.
 *
 * Todo lo que se afirma del sistema sale de `contenido.ts`, verificado contra el código. No se
 * ofrece lo que todavía no está construido: factura electrónica, prueba gratis ni instancia
 * dedicada. Las sucursales ya están en el producto: se suman como adicional. */
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
  comoSeCotiza:
    'Se paga en dos partes: un pago único por la web a medida, la implementación, la capacitación y la puesta en marcha del dominio y el hosting, y después un mantenimiento mensual. Cuánto es cada parte depende de cuántos autos tenés, cuántas sucursales y si querés la web de reservas. No hay un precio de lista: lo hablamos antes de empezar, con una demo del sistema si querés verlo, y queda por escrito antes de arrancar.',
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
  ],
};
