/* ── Tipos de rentadora (/para) ───────────────────────────────────────────────
 *
 * BORRADOR. El copy lo decide Gael: REVISAR GAEL en todos los textos de este archivo (H1 por
 * situación, problema, tres soluciones). Cada página parte de la situación que el visitante
 * reconoce, dice el problema en una oración (`bajada`) y pasa a cómo lo resuelve RentaGo en tres
 * bloques (titular de beneficio + una oración), con módulos y hasta 2 preguntas. ~250 palabras.
 *
 * La regla de siempre: todo lo que se afirma del sistema sale de `contenido.ts` o de
 * `sistema/operaciones.ts`, verificados contra el código. En la de choferes se nombra Uber (pedido
 * de Gael, 08/10): es como lo busca el chofer y como lo llama el producto ("Contrato Uber",
 * "En Uber"). DiDi y Cabify van como las otras apps. */
import type { PaginaPara } from './tipos';

export const PARA: PaginaPara[] = [
  {
    slug: 'rent-a-car-de-aeropuerto',
    nombre: 'Rent a car de aeropuerto',
    title: 'Software para rent a car de aeropuerto',
    description:
      'Reservas que entran desde la web antes del vuelo, la entrega en el aeropuerto cobrada como adicional y 40 minutos de gracia en la devolución. Para rentadoras.',
    h1: 'El cliente aterriza y el auto no está listo',
    bajada: 'Vendés antes de que el cliente aterrice, y cualquier demora en la entrega o la devolución se nota en la terminal.',
    citable:
      'Una rentadora de aeropuerto vende casi todo antes del vuelo. RentaGo cobra la reserva en tu web, retiene el auto 20 minutos mientras se paga y deja 40 minutos de gracia en la devolución.',
    soluciones: [
      { titulo: 'Reservas antes de viajar', texto: 'Tu web muestra el cupo real y nunca vende un auto ocupado.' },
      { titulo: 'Entrega en la terminal, con precio', texto: 'Se carga como adicional y se cobra siempre.' },
      { titulo: 'Devoluciones sin discusión', texto: 'Hay 40 minutos de gracia y después el sistema propone el cargo por hora.' },
    ],
    modulos: ['tu-web', 'ocupacion', 'reservas'],
    operacion: 'recibir-el-auto',
    guia: 'cobrar-la-sena-online',
    preguntas: [
      { p: '¿Cuánto le cobro si devuelve una hora y media tarde?', r: 'Los primeros 40 minutos no tienen cargo. Después el sistema cuenta las horas excedidas y propone el cargo.' },
      { p: '¿Puedo cobrar la entrega en el aeropuerto aparte?', r: 'Sí. Se carga como adicional con su precio y se suma a la reserva.' },
    ],
  },
  {
    slug: 'alquiler-turistico',
    nombre: 'Alquiler turístico',
    title: 'Sistema para alquiler de autos en zona turística',
    description:
      'Precios por temporada, feriados y duración que salen solos, extensiones con su propio precio y una web que cobra la seña por Mercado Pago o transferencia.',
    h1: 'En temporada alta pisás reservas',
    bajada: 'Tres meses pagan el año y, si el precio no acompaña, vendés enero a precio de mayo.',
    citable:
      'En una zona turística el error más caro es vender temporada alta a precio de temporada baja. RentaGo calcula el precio con temporada, feriados y duración, y vale igual para la web y el mostrador.',
    soluciones: [
      { titulo: 'Precio que sale solo', texto: 'Cargás temporadas y feriados una vez y el fin de semana largo sube por su cuenta.' },
      { titulo: 'Descuento por duración', texto: 'Los alquileres de una semana o más se calculan sin calculadora.' },
      { titulo: 'Extensiones con su precio', texto: 'Pedir tres días más es un tramo nuevo, con su precio por día.' },
    ],
    modulos: ['precios', 'tu-web', 'categorias-y-coberturas'],
    operacion: 'extender-un-alquiler',
    guia: 'como-armar-tarifas-de-temporada',
    preguntas: [
      { p: '¿El precio de la web es el mismo que el del mostrador?', r: 'Sí, hay un solo precio. Si una temporada sube, sube en los dos lados a la vez.' },
      { p: '¿Me sirve saber cuántos autos me faltaron en enero?', r: 'Sí. El reporte de demanda no atendida muestra lo que te pidieron y no pudiste atender.' },
    ],
  },
  {
    slug: 'alquiler-de-camionetas-y-utilitarios',
    nombre: 'Camionetas y utilitarios',
    title: 'Sistema para alquiler de camionetas y utilitarios',
    description:
      'Pick-ups y furgones como categorías propias, con su franquicia y su tarifa base, daños con fotos desde el celular y service por kilómetro. Para rentadoras.',
    h1: 'El utilitario vuelve rayado y nadie sabe de quién fue',
    bajada: 'Una pick-up trabaja más que un auto, vuelve con más golpes y cada uno es una discusión si no quedó registrado.',
    citable:
      'En RentaGo cada unidad tiene su tipo y su categoría, con franquicia y tarifa propias. Los daños se cargan con fotos desde el celular y quedan atados al alquiler y al conductor.',
    soluciones: [
      { titulo: 'Cada categoría, con su precio', texto: 'Pick-up y furgón tienen tarifa base y franquicia propias.' },
      { titulo: 'El daño, con foto', texto: 'Al entregar ves los daños previos y si vuelve uno nuevo se fotografía ahí mismo.' },
      { titulo: 'El service, por kilómetro', texto: 'La ficha muestra cuántos kilómetros faltan, además de VTV y póliza.' },
    ],
    modulos: ['categorias-y-coberturas', 'flota', 'multas-y-danos'],
    operacion: 'entregar-el-auto',
    guia: 'franquicia-y-garantia',
    preguntas: [
      { p: '¿Puedo cargar furgones y combis además de pick-ups?', r: 'Sí. Furgón es una categoría, y cada unidad puede ser auto, camioneta, combi, utilitario, moto o motorhome.' },
      { p: '¿La franquicia de una pick-up puede ser distinta a la de un auto?', r: 'Sí. La franquicia base se define por categoría y el documento de franquicia sale con ese monto.' },
    ],
  },
  {
    slug: 'alquiler-a-empresas',
    nombre: 'Alquiler a empresas',
    title: 'Sistema para alquilar autos a empresas',
    description:
      'Cuenta corriente a 15, 30, 60 o 90 días con la deuda por antigüedad, empresa con su representante, hasta 3 conductores y la multa atada a quien manejaba.',
    h1: 'Alquilás a empresas y cobrás tarde',
    bajada: 'La empresa alquila seguido, paga a plazo y cambia de conductor, y a fin de mes nadie sabe qué ya se cobró.',
    citable:
      'Para alquilar a empresas, RentaGo maneja cuenta corriente a 15, 30, 60 o 90 días y reparte la deuda por antigüedad. Cada contrato admite hasta tres conductores y la multa se ata a quien manejaba.',
    soluciones: [
      { titulo: 'Saber desde cuándo te deben', texto: 'La deuda de cada cliente se reparte en cuatro tramos de antigüedad.' },
      { titulo: 'Quién firma y quién maneja', texto: 'La empresa tiene su representante y cada contrato admite hasta tres conductores.' },
      { titulo: 'La multa que llega meses después', texto: 'Con la fecha del hecho, el sistema encuentra el alquiler y el conductor.' },
    ],
    modulos: ['caja', 'clientes', 'multas-y-danos'],
    operacion: 'firmar-el-contrato',
    preguntas: [
      { p: '¿Qué plazos de pago puedo darle a una empresa?', r: 'Contado o cuenta corriente a 15, 30, 60 o 90 días. La condición se elige al cargar la reserva.' },
      { p: '¿Quién firma la franquicia cuando el cliente es una empresa?', r: 'El deudor que elijas: la empresa, su representante o uno de los conductores.' },
    ],
  },
  {
    slug: 'alquiler-a-choferes-de-aplicaciones',
    nombre: 'Choferes de aplicaciones',
    title: 'Alquiler de autos para Uber y choferes de apps',
    description:
      'Contrato Uber para alquilar autos a choferes de Uber, DiDi o Cabify: valor por semana, una fecha de pago por semana, km permitidos y precio del km extra.',
    h1: 'Alquilás por semana y perdés la cuenta de quién debe',
    bajada: 'El chofer paga cada semana y hace muchos kilómetros: cargado como reserva común, la tarifa no cierra y los pagos no tienen fecha.',
    citable:
      'RentaGo tiene un Contrato Uber para alquilar a choferes de Uber, DiDi o Cabify. Cargás el valor de la semana y salen el total, una fecha de pago por semana y los kilómetros permitidos.',
    soluciones: [
      { titulo: 'Un precio por semana', texto: 'Cargás el valor semanal y el contrato calcula el total.' },
      { titulo: 'Una fecha de pago por semana', texto: 'Si el chofer cobra otro día, la fecha se edita.' },
      { titulo: 'Kilómetros pactados de entrada', texto: 'Los permitidos y el precio del extra quedan escritos en el contrato.' },
    ],
    modulos: ['contratos', 'caja', 'flota'],
    operacion: 'tomar-una-reserva',
    guia: 'vencimientos-de-la-flota',
    preguntas: [
      { p: '¿Dónde queda escrito cuántos kilómetros puede hacer?', r: 'En el contrato: los kilómetros por semana y el precio del kilómetro extra.' },
      { p: '¿Puedo mezclar choferes de Uber y alquileres comunes?', r: 'Sí. Salen del mismo botón de Nueva operación y el auto figura En Uber en la flota.' },
    ],
  },
  {
    slug: 'flotas-con-varias-sucursales',
    nombre: 'Varias sucursales',
    title: 'Sistema para rentadoras con varias sucursales',
    description:
      'Retiro en una sucursal y devolución en otra, cada auto con su sucursal base, una caja por sucursal con apertura y cierre, y reportes por sucursal o juntos.',
    h1: 'Tenés varias sucursales y una sola planilla',
    bajada: 'El auto que figura libre en la casa central puede estar en la terminal, y así se vende dos veces.',
    citable:
      'RentaGo maneja varias sucursales en un solo sistema. Cada una tiene sus puntos de retiro y devolución y su caja, y los reportes se ven por sucursal o juntos.',
    soluciones: [
      { titulo: 'Retirar en una, devolver en otra', texto: 'La reserva lleva la sucursal de retiro y la de devolución.' },
      { titulo: 'Saber dónde está cada auto', texto: 'Cada unidad tiene su sucursal base y su ubicación actual.' },
      { titulo: 'Una caja por sucursal', texto: 'Cada una abre y cierra la suya, con arqueo.' },
    ],
    modulos: ['ocupacion', 'caja', 'avisos-reportes'],
    operacion: 'tomar-una-reserva',
    preguntas: [
      { p: '¿Un cliente puede devolver el auto en otra sucursal?', r: 'Sí. La reserva lleva la sucursal de retiro y la de devolución, cada una con sus puntos.' },
      { p: '¿Puedo ver los números de todas las sucursales juntas?', r: 'Sí. Los reportes se ven por sucursal o consolidados.' },
    ],
  },
];

export function para(slug: string): PaginaPara | undefined {
  return PARA.find((p) => p.slug === slug);
}
