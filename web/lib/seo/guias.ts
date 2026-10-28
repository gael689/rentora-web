/* ── Soluciones: problemas de todos los días (guías) ──────────────────────────
 *
 * BORRADOR. El copy lo decide Gael: REVISAR GAEL en todos los textos de este archivo (encuadre
 * por problema, tarjetas del índice, recorte a ~350 palabras por guía).
 *
 * Mismas cinco URLs (`/guias/<slug>`, por SEO), reencuadradas como problemas del mostrador. Cada
 * una: una oración de problema (`bajada`) → la lista para revisar como pieza protagonista →
 * 2 secciones como máximo → un cuadro "En RentaGo" de dos oraciones → 1–2 preguntas. Primero
 * enseñan; el sistema aparece solo en `enRentaGo`, rotulado aparte.
 *
 * Todo lo que se afirma del producto sale de `contenido.ts` y del glosario. Lo demás es consejo de
 * oficio. Los feriados se explican por su regla y no por fecha, porque el calendario cambia todos
 * los años y un dato de calendario mal puesto lo detecta cualquier argentino. `citable` no se
 * muestra en la página: lo usan llms.txt y llms-full.txt. */

import type { Guia } from './tipos';

export const GUIAS: Guia[] = [
  /* ── 1 ── */
  {
    slug: 'como-armar-tarifas-de-temporada',
    nombre: 'Tarifas de temporada',
    tarjeta: '¿Tus tarifas de temporada no cierran?',
    modulo: 'precios',
    title: 'Cómo armar tarifas de temporada para un rent a car',
    description:
      'Temporada alta, media y baja, feriados y fines de semana largos, descuentos por duración y promos. Cómo armar el tarifario de una rentadora en Argentina.',
    h1: '¿Tus *tarifas de temporada* no cierran?',
    bajada: 'Un tarifario que se carga una vez al año y no depende de que alguien se acuerde.',
    citable:
      'Un tarifario de rent a car en Argentina se arma en tres capas: la temporada (alta, media o baja), los feriados y fines de semana largos, y los descuentos por duración. Cada capa se define por fecha y se carga una vez al año. Las promociones van por encima del precio y, al terminar, el precio anterior tiene que volver solo.',
    secciones: [
      {
        titulo: 'Temporadas y feriados, por fecha',
        parrafos: [
          'Alta, media y baja cambian según la plaza: mirá en qué semanas del año anterior te quedaste sin autos. Los feriados inamovibles se celebran el día que caen; los trasladables se corren a un lunes, y cada año se suman días puente.',
          'Cargalos cuando se publique el calendario y revisalos con cada día puente: un fin de semana largo se cobra por encima de la temporada en la que cae.',
        ],
      },
      {
        titulo: 'Promos que no pisan el precio',
        parrafos: [
          'El error más caro es escribir el precio de la promo encima del de lista: cuando termina, si nadie se acuerda, se sigue vendiendo con descuento. Una promo tiene que ser una capa más, con fecha de inicio y de fin, y el precio tiene que ser uno solo para la web y el mostrador.',
        ],
      },
    ],
    pasos: [
      'Marcá en el calendario del año pasado las semanas en que te quedaste sin autos.',
      'Definí la tarifa base de cada categoría para un día común de temporada baja.',
      'Cargá cada temporada con fecha de inicio, fecha de fin y su porcentaje sobre la base.',
      'Cargá los feriados cuando se publique el calendario, y sumá los días puente.',
      'Definí tres tramos de duración como mucho, con su descuento.',
      'Cada promo, con fecha de fin escrita antes de publicarla.',
    ],
    enRentaGo:
      'El motor de precios tiene tres capas de calendario: temporadas, feriados y descuentos por duración. Se cargan una vez, hay un solo precio para web y mostrador, y si das de baja una promo el precio anterior vuelve solo.',
    terminos: ['temporada'],
    preguntas: [
      {
        p: '¿Cuántas temporadas conviene tener?',
        r: 'Tres alcanzan para casi cualquier plaza: alta, media y baja. Los feriados y fines de semana largos van como una capa aparte.',
      },
      {
        p: '¿Conviene que la web sea más barata que el mostrador?',
        r: 'No, conviene un solo precio. Si la web es más barata, el mostrador pide igualarla; si es más cara, pierde la reserva.',
      },
    ],
  },

  /* ── 2 ── */
  {
    slug: 'franquicia-y-garantia',
    nombre: 'Franquicia y garantía',
    tarjeta: '¿Franquicia o garantía? Cómo explicarlo',
    modulo: 'categorias-y-coberturas',
    title: 'Franquicia y garantía en el alquiler de autos',
    description:
      'Qué es la franquicia, qué es la garantía de la tarjeta y en qué se diferencian. Cómo explicárselo al cliente en el mostrador y quién firma el documento.',
    h1: '¿*Franquicia o garantía*? Cómo explicarlo en el mostrador',
    bajada: 'Las dos palabras que más se confunden, y cómo explicarlas en un minuto.',
    citable:
      'La franquicia es el monto máximo que el cliente paga de su bolsillo si daña el auto alquilado; por encima de ese monto responde el seguro. La garantía es una retención sobre la tarjeta de crédito que cubre daños, multas o cargos y se libera cuando el alquiler cierra sin novedades. Una fija cuánto puede costarle un daño al cliente; la otra asegura que la rentadora lo pueda cobrar.',
    secciones: [
      {
        titulo: 'Qué es cada una',
        parrafos: [
          'La franquicia es el tope de lo que el cliente pone si hay un daño, y se define por categoría: una pick-up tiene una más alta que un compacto. La garantía es plata que se retiene, casi siempre sobre una tarjeta, y se libera al cerrar el alquiler si no hay novedades.',
        ],
      },
      {
        titulo: 'Cómo explicarlo',
        parrafos: [
          'Decilo en dos frases y con los números de esa categoría: lo máximo que ponés vos es la franquicia, y aparte retenemos un monto que se libera al devolver sin novedades. Evitá mezclar los dos montos en una cifra o explicarlos recién al firmar.',
        ],
      },
    ],
    pasos: [
      'Definí la franquicia base de cada categoría.',
      'Para cada cobertura, escribí el monto exacto al que baja la franquicia.',
      'Fijá el monto de la garantía y en qué medio se toma.',
      'Prepará la explicación de dos frases, con los números de cada categoría.',
      'Revisá con tu abogado el texto del documento de franquicia.',
      'Decidí quién firma como deudor cuando alquila una empresa.',
      'Registrá la garantía en el alquiler antes de entregar el auto.',
    ],
    enRentaGo:
      'Cada categoría tiene su franquicia base y cada cobertura dice a cuánto la baja. Con una casilla se genera el documento de la franquicia, que firma el deudor que elijas.',
    terminos: ['franquicia', 'garantia', 'check-out'],
    preguntas: [
      {
        p: '¿La franquicia y la garantía son lo mismo?',
        r: 'No. La franquicia es el máximo que el cliente paga si hay un daño. La garantía es una retención en la tarjeta que se libera al cerrar sin novedades.',
      },
      {
        p: '¿Quién firma el documento de franquicia si alquila una empresa?',
        r: 'El deudor que decida la rentadora: la empresa, su representante o el conductor. Tiene que quedar escrito y firmarse con el contrato.',
      },
    ],
  },

  /* ── 3 ── */
  {
    slug: 'cobrar-la-sena-online',
    nombre: 'Cobrar la seña online',
    tarjeta: '¿Cobrás la seña por WhatsApp?',
    modulo: 'tu-web',
    title: 'Cómo cobrar la seña de una reserva online',
    description:
      'Cómo cobrar la seña de un alquiler de autos por internet: Mercado Pago o transferencia, el cupo retenido mientras paga y la política de cancelación.',
    h1: '¿Cobrás la *seña por WhatsApp*? Pasala a tu web',
    bajada: 'La reserva que entra a las once de la noche, cobrada y en el calendario a la mañana.',
    citable:
      'Para cobrar la seña de un alquiler de autos por internet, la rentadora necesita un medio de pago, una política de seña y cancelación escrita antes de cobrar, y un cupo que se retenga mientras el cliente paga. Si la web y el mostrador no venden sobre el mismo cupo, tarde o temprano se cobra dos veces el mismo auto.',
    secciones: [
      {
        titulo: 'Por qué cobrar antes, y cómo',
        parrafos: [
          'Una reserva sin seña es una promesa: el cliente que cotizó en tres lugares reserva en los tres y se presenta en uno. Mercado Pago se acredita en el momento; la transferencia sirve, pero hay que verificar el comprobante y ponerle plazo.',
        ],
      },
      {
        titulo: 'El auto mientras el cliente paga',
        parrafos: [
          'Entre que elige y termina de pagar pasan minutos. El cupo tiene que retenerse un rato corto y liberarse solo si el pago no se completa, y la web y el mostrador deben mirar el mismo cupo. Los términos de seña y cancelación van escritos antes del pago; revisalos con tu abogado.',
        ],
      },
    ],
    pasos: [
      'Elegí los medios de pago: Mercado Pago, transferencia o los dos.',
      'Definí el porcentaje de seña y si cambia en temporada alta.',
      'Escribí la política de cancelación con plazos concretos.',
      'Publicá los términos en el sitio y mostralos antes del pago.',
      'Fijá un plazo para acreditar las transferencias.',
      'Verificá que la web y el mostrador vendan sobre el mismo cupo.',
      'Probá una reserva de punta a punta antes de anunciar la web.',
    ],
    enRentaGo:
      'Tu web cobra por Mercado Pago o transferencia y retiene el cupo mientras el cliente paga. La reserva confirmada entra sola al calendario de ocupación.',
    terminos: ['cupo'],
    preguntas: [
      {
        p: '¿Qué pasa si el cliente no termina de pagar?',
        r: 'Si el cupo se retiene por un tiempo corto, se libera solo cuando el pago no se completa, y el auto no queda bloqueado.',
      },
      {
        p: '¿Cómo se evita vender el mismo auto en la web y en el mostrador?',
        r: 'Haciendo que los dos canales vendan sobre el mismo cupo, calculado por fecha sobre la flota real.',
      },
    ],
  },

  /* ── 4 ── */
  {
    slug: 'pasar-del-excel-a-un-sistema',
    nombre: 'Del Excel a un sistema',
    tarjeta: '¿Todavía en Excel?',
    modulo: 'ocupacion',
    title: 'Cómo pasar la rentadora del Excel a un sistema',
    description:
      'Qué juntar para dejar la planilla y el cuaderno: flota, documentos con vigencia, tarifas, clausulado y clientes empresa. Errores comunes y la marcha blanca.',
    h1: '¿Todavía en *Excel*? Cómo pasar a un sistema sin frenar',
    bajada: 'Qué juntar, qué dejar afuera y cómo arrancar sin cerrar un solo día.',
    citable:
      'Para pasar una rentadora de la planilla y el cuaderno a un sistema hay que juntar cinco cosas: la flota con sus patentes, los documentos de cada auto con su vigencia, las tarifas, el clausulado del contrato y los clientes empresa con sus condiciones. Las reservas futuras se cargan antes de la fecha de corte. Conviene arrancar en temporada baja, con una marcha blanca acompañada.',
    secciones: [
      {
        titulo: 'Los errores que más se repiten',
        parrafos: [
          'Querer cargar todo el historial: alcanza con lo que está abierto y lo que viene. Olvidarse de las reservas futuras, que el sistema después ofrece como libres. Arrancar en temporada alta, o dejar la planilla y el sistema en paralelo hasta que cada uno diga una cosa distinta.',
        ],
      },
      {
        titulo: 'La marcha blanca',
        parrafos: [
          'Elegí una fecha de corte: desde ese día toda reserva nueva entra al sistema y el cuaderno queda guardado. Las primeras semanas operás acompañado y revisás las primeras reservas de cada categoría contra lo que habrías cobrado con la planilla.',
        ],
      },
    ],
    pasos: [
      'Armá la lista de la flota con patente, modelo, categoría y kilómetros.',
      'Juntá los vencimientos de VTV y póliza de cada auto.',
      'Escribí las tarifas que aplicás hoy, con temporadas y feriados.',
      'Conseguí la última versión del contrato que hacés firmar.',
      'Listá los clientes empresa con su representante y sus condiciones de pago.',
      'Pasá todas las reservas futuras antes de la fecha de corte.',
      'Elegí una fecha de corte en temporada baja.',
    ],
    enRentaGo:
      'Partimos de tu planilla: cargamos tu flota, tus tarifas y tu contrato tal como los usás hoy, y operás acompañado desde el primer día. Cuánto tarda depende de cuánto haya que cargar.',
    terminos: ['cupo', 'temporada', 'clausulado-versionado', 'cuenta-corriente'],
    preguntas: [
      {
        p: '¿Hay que cargar todos los alquileres viejos?',
        r: 'No. Alcanza con la flota, los documentos, las tarifas, el contrato, los clientes empresa y las reservas que ya están tomadas.',
      },
      {
        p: '¿Cuándo conviene hacer el cambio?',
        r: 'En temporada baja, cuando el mostrador tiene tiempo para aprender. Arrancar en la semana más cargada es la forma más rápida de volver al cuaderno.',
      },
    ],
  },

  /* ── 5 ── */
  {
    slug: 'vencimientos-de-la-flota',
    nombre: 'Vencimientos de la flota',
    tarjeta: '¿Se te vencen la VTV y el seguro?',
    modulo: 'avisos-reportes',
    title: 'Vencimientos de la flota: VTV, póliza y service',
    description:
      'Cómo llevar los vencimientos de una flota de alquiler: VTV, póliza, service por kilómetro y por fecha, y licencias de conductores. Qué controlar y cuándo.',
    h1: '¿Se te *vencen la VTV y el seguro*?',
    bajada: 'VTV, póliza, service y licencias: enterarte antes, y no cuando te para la policía.',
    citable:
      'En una flota de alquiler vencen la VTV y la póliza de cada auto, el service por kilómetro o por fecha, y la licencia de cada conductor. Cada vencimiento se registra con su fecha y un aviso con anticipación. La licencia del conductor se controla en cada entrega, porque puede vencerse entre un alquiler y el siguiente.',
    secciones: [
      {
        titulo: 'Qué vence y por qué falla la planilla',
        parrafos: [
          'Por auto vencen la VTV, la póliza y el service, que tiene dos vencimientos a la vez, por kilómetros y por fecha: manda el primero que llegue. Una columna de vencimientos solo sirve si alguien la mira; el aviso tiene que llegar solo, con anticipación y uno por asunto.',
        ],
      },
      {
        titulo: 'La licencia, en cada entrega',
        parrafos: [
          'Un cliente frecuente puede tener la licencia vigente en marzo y vencida en agosto. Controlala en cada entrega, junto con la garantía y la documentación, para que no dependa de la memoria de quien atiende.',
        ],
      },
    ],
    pasos: [
      'Cargá la VTV y la póliza de cada auto con su fecha de vencimiento.',
      'Anotá el próximo service por kilómetro y por fecha.',
      'Definí con cuánta anticipación querés el aviso de cada trámite.',
      'Revisá primero los autos que tienen una reserva cerca.',
      'Controlá la licencia de cada conductor en cada entrega.',
      'Cuando renovás un documento, cargá la nueva fecha el mismo día.',
    ],
    enRentaGo:
      'Cada auto tiene su ficha con VTV y póliza con fecha, y el sistema te avisa en la campana del panel, un aviso por asunto. Antes de cada entrega, un semáforo revisa licencia, garantía y documentación.',
    terminos: ['check-out', 'conductor-adicional'],
    preguntas: [
      {
        p: '¿El service se controla por kilómetro o por fecha?',
        r: 'Por los dos, y manda el que llegue primero. Un auto muy alquilado llega por kilómetros; uno parado, por fecha.',
      },
      {
        p: '¿Por qué controlar la licencia en cada entrega?',
        r: 'Porque puede vencerse entre un alquiler y el siguiente, y si hay un siniestro el problema llega a la rentadora.',
      },
    ],
  },
];

export function guia(slug: string): Guia | undefined {
  return GUIAS.find((g) => g.slug === slug);
}
