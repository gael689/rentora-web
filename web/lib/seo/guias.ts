/* ── Las guías ─────────────────────────────────────────────────────────────────
 *
 * BORRADOR. El copy lo decide Gael: esto es una propuesta para que la edite, no texto final.
 *
 * Cinco guías prácticas que sirven aunque el que lee no compre nada. Primero enseñan; el sistema
 * aparece solo en `enRentaGo`, rotulado aparte, para que no se lea como publicidad encubierta.
 *
 * Todo lo que se afirma del producto sale de `contenido.ts` (CIFRAS, MODULOS, FAQS, IMPLEMENTACION)
 * y del glosario. Lo demás es consejo de oficio: qué conviene definir, revisar o evitar. Los
 * feriados se explican por su regla y no por fecha, porque el calendario cambia todos los años y
 * un dato de calendario mal puesto lo detecta cualquier argentino. */

import type { Guia } from './tipos';

export const GUIAS: Guia[] = [
  /* ── 1 ── */
  {
    slug: 'como-armar-tarifas-de-temporada',
    nombre: 'Tarifas de temporada',
    modulo: 'precios',
    title: 'Cómo armar tarifas de temporada para un rent a car',
    description:
      'Temporada alta, media y baja, feriados y fines de semana largos, descuentos por duración y promos. Cómo armar el tarifario de una rentadora en Argentina.',
    h1: 'Cómo armar las *tarifas de temporada* de tu rentadora',
    bajada: 'Un tarifario que se carga una vez al año y no depende de que alguien se acuerde.',
    citable:
      'Un tarifario de rent a car en Argentina se arma en tres capas: la temporada (alta, media o baja), los feriados y fines de semana largos, y los descuentos por duración. Cada capa se define por fecha y se carga una vez al año. Las promociones van por encima del precio y, al terminar, el precio anterior tiene que volver solo.',
    secciones: [
      {
        titulo: 'Las temporadas se definen por fecha',
        parrafos: [
          'Alta, media y baja cambian según la plaza. En la costa la alta es enero y febrero; en la cordillera hay dos picos, invierno y verano; en una ciudad con clientes empresa la demanda es más pareja.',
          'Para marcarlas, mirá en qué semanas del año anterior te quedaste sin autos. Cada temporada queda con fecha de inicio y de fin, y un porcentaje sobre la tarifa base.',
        ],
      },
      {
        titulo: 'Feriados y fines de semana largos',
        parrafos: [
          'En Argentina hay feriados inamovibles, que se celebran el día que caen, y trasladables, que según el día de la semana se corren a un lunes. Además el gobierno fija cada año días no laborables con fines turísticos, que unen un feriado con el fin de semana. Carnaval y Semana Santa cambian de fecha todos los años.',
          'Por eso los feriados se cargan cuando se publica el calendario del año, y se revisan cada vez que se anuncia un día puente. Un fin de semana largo se cobra por encima de la temporada en la que cae.',
        ],
      },
      {
        titulo: 'Descuentos por duración',
        parrafos: [
          'Un alquiler de siete días te ahorra seis entregas, seis lavados y seis revisiones respecto de siete alquileres de un día. El descuento por duración le devuelve al cliente parte de ese ahorro.',
          'Conviene pocos tramos y fáciles de explicar: de uno a dos días, de tres a seis, siete o más.',
        ],
      },
      {
        titulo: 'Promociones que no pisan el precio',
        parrafos: [
          'El error más caro de una planilla es escribir el precio de la promo encima del de lista. Cuando termina hay que volver a cargar el viejo, y si nadie se acuerda se sigue vendiendo con descuento.',
          'Una promoción tiene que ir como una capa más, con su fecha de inicio y de fin. Mientras dura, manda; cuando vence o la das de baja, el precio de abajo sigue ahí. Y el precio tiene que ser uno solo para la web y el mostrador, o el cliente que compara llama para pedir el más bajo.',
        ],
      },
    ],
    pasos: [
      'Marcá en el calendario del año pasado las semanas en que te quedaste sin autos.',
      'Definí la tarifa base de cada categoría para un día común de temporada baja.',
      'Cargá cada temporada con fecha de inicio, fecha de fin y su porcentaje sobre la base.',
      'Cargá los feriados del año cuando se publique el calendario oficial, y sumá los días puente cuando se anuncien.',
      'Definí tres tramos de duración como mucho, con su descuento.',
      'Cada promo, con fecha de fin escrita antes de publicarla.',
          ],
    enRentaGo:
      'El motor de precios tiene tres capas de calendario: temporadas, feriados y descuentos por duración. Se cargan una vez y el precio sale solo, todos los días del año. Hay un solo precio para la web y el mostrador, y si das de baja una promo el precio anterior vuelve solo, porque la promo nunca reemplazó al de abajo.',
    terminos: ['temporada'],
    preguntas: [
      {
        p: '¿Cuántas temporadas conviene tener?',
        r: 'Tres alcanzan para casi cualquier plaza: alta, media y baja. Lo que suma precisión son los feriados y fines de semana largos, que van como una capa aparte por encima de la temporada.',
      },
      {
        p: '¿Qué diferencia hay entre un feriado inamovible y uno trasladable?',
        r: 'El inamovible se celebra el día que cae. El trasladable se corre a un lunes según el día de la semana en que cae, y por eso suele armar un fin de semana largo. Los días no laborables con fines turísticos se fijan aparte, cada año.',
      },
      {
        p: '¿Conviene que la web sea más barata que el mostrador?',
        r: 'Conviene un solo precio. Si la web es más barata, el cliente del mostrador pide igualarla; si es más cara, la web pierde la reserva contra el teléfono.',
      },
    ],
  },

  /* ── 2 ── */
  {
    slug: 'franquicia-y-garantia',
    nombre: 'Franquicia y garantía',
    modulo: 'categorias-y-coberturas',
    title: 'Franquicia y garantía en el alquiler de autos',
    description:
      'Qué es la franquicia, qué es la garantía de la tarjeta y en qué se diferencian. Cómo explicárselo al cliente en el mostrador y quién firma el documento.',
    h1: 'La diferencia entre *franquicia y garantía* en un alquiler de autos',
    bajada: 'Las dos palabras que más se confunden en el mostrador, y cómo explicarlas en un minuto.',
    citable:
      'La franquicia es el monto máximo que el cliente paga de su bolsillo si daña el auto alquilado; por encima de ese monto responde el seguro. La garantía es una retención sobre la tarjeta de crédito que cubre daños, multas o cargos y se libera cuando el alquiler cierra sin novedades. Una fija cuánto puede costarle un daño al cliente; la otra asegura que la rentadora lo pueda cobrar.',
    secciones: [
      {
        titulo: 'Qué es la franquicia',
        parrafos: [
          'La franquicia es el tope de lo que el cliente pone si hay un daño. Si el arreglo sale menos que la franquicia, lo paga entero; si sale más, paga hasta la franquicia y el resto lo cubre el seguro.',
          'Se define por categoría: una pick-up tiene franquicia más alta que un compacto porque el arreglo cuesta más. Las coberturas adicionales la bajan a cambio de un cargo por día, y cada una tiene que decir a cuánto la deja.',
        ],
      },
      {
        titulo: 'Qué es la garantía',
        parrafos: [
          'La garantía es plata que la rentadora retiene, casi siempre sobre una tarjeta de crédito, mientras el auto está afuera. Cubre lo que aparece al devolverlo: un daño, una multa, combustible faltante, un día de más.',
          'Una retención no es un cobro. Si el auto vuelve bien, se libera al cerrar el alquiler. Dejarlo claro de entrada evita el reclamo del cliente que ve el monto en el resumen y cree que le cobraron dos veces.',
        ],
      },
      {
        titulo: 'Cómo explicarlo en el mostrador',
        parrafos: [
          'Funciona decirlo en dos frases y con números de esa categoría. Por ejemplo: "Si le pasa algo al auto, lo máximo que ponés vos es la franquicia; con esta cobertura baja a tanto. Aparte te retenemos un monto en la tarjeta, que se libera cuando devolvés el auto sin novedades."',
          'Lo que conviene evitar es mezclar los dos montos en una sola cifra o explicarlos recién al firmar, con la fila esperando.',
        ],
      },
      {
        titulo: 'El documento de franquicia',
        parrafos: [
          'Muchas rentadoras respaldan la franquicia con un documento aparte, firmado junto con el contrato y anexado a él, que se puede presentar al cobro si el cliente no paga lo que debe. Algunas lo instrumentan como un pagaré. La forma y el texto los define tu abogado.',
          'Lo importante es quién lo firma. Si alquila una empresa, el deudor puede ser la empresa, su representante o el conductor, y esa elección tiene que quedar escrita en el documento.',
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
      'Registrá la garantía en el alquiler, con su medio y su monto, antes de entregar el auto.',
    ],
    enRentaGo:
      'Cada categoría tiene su franquicia base y cada cobertura dice a cuánto la baja; los extras llevan su tope de cantidad. Al armar el contrato, con una casilla se genera también el documento de la franquicia, que firma el deudor que elijas: la empresa, su representante o un conductor. La garantía queda registrada en el alquiler, con su medio y su monto, y antes de la entrega un semáforo revisa licencia, garantía y documentación.',
    terminos: ['franquicia', 'garantia', 'check-out'],
    preguntas: [
      {
        p: '¿La franquicia y la garantía son lo mismo?',
        r: 'No. La franquicia es el máximo que el cliente paga si hay un daño. La garantía es una retención en la tarjeta que se libera al cerrar el alquiler si no hay novedades.',
      },
      {
        p: '¿Por qué la franquicia cambia según el auto?',
        r: 'Porque se define por categoría y el costo de reparar una pick-up o una SUV es más alto que el de un compacto. Por eso cada categoría tiene su propia franquicia base.',
      },
      {
        p: '¿Quién firma el documento de franquicia si alquila una empresa?',
        r: 'El deudor que decida la rentadora: la empresa, su representante o el conductor. Lo importante es que quede escrito en el documento y que se firme junto con el contrato.',
      },
    ],
  },

  /* ── 3 ── */
  {
    slug: 'cobrar-la-sena-online',
    nombre: 'Cobrar la seña online',
    modulo: 'tu-web',
    title: 'Cómo cobrar la seña de una reserva online',
    description:
      'Cómo cobrar la seña de un alquiler de autos por internet: Mercado Pago o transferencia, el cupo retenido mientras paga y la política de cancelación.',
    h1: 'Cómo *cobrar la seña online* de un alquiler de autos',
    bajada: 'La reserva que entra a las once de la noche, cobrada y en el calendario a la mañana.',
    citable:
      'Para cobrar la seña de un alquiler de autos por internet, la rentadora necesita un medio de pago, una política de seña y cancelación escrita antes de cobrar, y un cupo que se retenga mientras el cliente paga. Si la web y el mostrador no venden sobre el mismo cupo, tarde o temprano se cobra dos veces el mismo auto.',
    secciones: [
      {
        titulo: 'Por qué cobrar antes',
        parrafos: [
          'Una reserva sin seña es una promesa. El cliente que cotizó en tres lugares reserva en los tres y se presenta en uno, y los otros dos se quedan con un auto parado en un fin de semana largo.',
          'La seña ordena eso. Además resuelve al que escribe fuera de horario: si la web cobra, la reserva queda firme aunque nadie esté atendiendo.',
        ],
      },
      {
        titulo: 'Mercado Pago o transferencia',
        parrafos: [
          'Mercado Pago es lo que la mayoría de los clientes ya tiene, y el pago se acredita en el momento. La transferencia sigue siendo muy usada, sobre todo por empresas, pero hay que verificar el comprobante contra la cuenta antes de dar la reserva por pagada.',
          'Ofrecer los dos medios cubre a casi todos. Lo que no conviene es aceptar la transferencia "a confirmar" sin un plazo: el auto queda tomado y la plata no llega.',
        ],
      },
      {
        titulo: 'Qué definir antes de cobrar',
        parrafos: [
          'El porcentaje de seña, si se cobra el total por adelantado en temporada alta, y qué pasa si el cliente cancela: con cuánta anticipación se devuelve la seña, cuándo se pierde y si se puede cambiar la fecha. Todo eso va escrito en los términos del sitio y se muestra antes de pagar, no después.',
          'Las condiciones de una venta online también tienen reglas de defensa del consumidor. Revisá los términos con tu abogado o tu contador antes de publicarlos.',
        ],
      },
      {
        titulo: 'El auto mientras el cliente paga',
        parrafos: [
          'Entre que el cliente elige el auto y termina de pagar pasan unos minutos. Si en ese rato el mostrador vende la misma unidad, alguien pagó por un auto que no existe. Si el auto queda tomado hasta que alguien lo libere a mano, una reserva abandonada lo bloquea todo el día.',
          'La solución es retener el cupo por un tiempo corto y liberarlo solo si el pago no se completa. Y que la web y el mostrador miren el mismo cupo, así lo que vende uno el otro ya lo ve ocupado.',
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
      'La web de cada rentadora tiene motor de reservas y un checkout de 4 pasos. Mientras el cliente paga por Mercado Pago o transferencia, el cupo le queda retenido 20 minutos y nadie más puede vender esa unidad en esa fecha. La web trabaja sobre el mismo cupo que el mostrador, nunca vende un auto ocupado, y la reserva confirmada entra al calendario de ocupación.',
    terminos: ['cupo'],
    preguntas: [
      {
        p: '¿Cuánto conviene cobrar de seña?',
        r: 'Depende de la plaza y de la temporada, y lo define cada rentadora. Lo importante es que el porcentaje y la política de cancelación estén escritos en el sitio antes de que el cliente pague.',
      },
      {
        p: '¿Qué pasa si el cliente no termina de pagar?',
        r: 'Si el cupo se retiene por un tiempo corto, se libera solo cuando el pago no se completa. Así una reserva abandonada no deja el auto bloqueado.',
      },
      {
        p: '¿Cómo se evita vender el mismo auto en la web y en el mostrador?',
        r: 'Haciendo que los dos canales vendan sobre el mismo cupo, calculado por fecha sobre la flota real. Lo que se vende en uno aparece ocupado en el otro en el momento.',
      },
    ],
  },

  /* ── 4 ── */
  {
    slug: 'pasar-del-excel-a-un-sistema',
    nombre: 'Del Excel a un sistema',
    modulo: 'ocupacion',
    title: 'Cómo pasar la rentadora del Excel a un sistema',
    description:
      'Qué juntar para dejar la planilla y el cuaderno: flota, documentos con vigencia, tarifas, clausulado y clientes empresa. Errores comunes y la marcha blanca.',
    h1: 'Cómo *pasar del Excel a un sistema* sin frenar el mostrador',
    bajada: 'Qué juntar, qué dejar afuera y cómo arrancar sin cerrar un solo día.',
    citable:
      'Para pasar una rentadora de la planilla y el cuaderno a un sistema hay que juntar cinco cosas: la flota con sus patentes, los documentos de cada auto con su vigencia, las tarifas, el clausulado del contrato y los clientes empresa con sus condiciones. Las reservas futuras se cargan antes de la fecha de corte. Conviene arrancar en temporada baja, con una marcha blanca acompañada.',
    secciones: [
      {
        titulo: 'Qué juntar antes de empezar',
        parrafos: [
          'La flota, auto por auto: patente, modelo, categoría y kilómetros. Los papeles de cada unidad con su fecha de vencimiento: VTV, póliza y lo que controles hoy. Las tarifas como las usás de verdad, con las temporadas y los feriados que aplicás aunque estén en la cabeza de alguien.',
          'El contrato que firmás hoy, en su última versión. Y los clientes empresa, con quién los representa, cómo te pagan y a cuántos días. Los particulares se pueden ir dando de alta a medida que vuelven.',
        ],
      },
      {
        titulo: 'Los errores que más se repiten',
        parrafos: [
          'Querer cargar todo el historial. Diez años de alquileres viejos no ayudan a vender el próximo fin de semana; alcanza con lo que está abierto y lo que viene.',
          'Olvidarse de las reservas futuras. Si el cuaderno tiene un auto tomado para dentro de dos meses y el sistema no lo sabe, el sistema lo va a ofrecer.',
          'Arrancar en temporada alta, con el mostrador lleno y sin tiempo para aprender. Y quedarse meses con la planilla y el sistema en paralelo: al poco tiempo cada uno dice una cosa distinta y nadie sabe cuál es la buena.',
        ],
      },
      {
        titulo: 'La marcha blanca',
        parrafos: [
          'Se elige una fecha de corte. Desde ese día toda reserva nueva entra al sistema y el cuaderno queda guardado, sin anotaciones nuevas. Las primeras semanas el mostrador opera acompañado y las dudas se resuelven sobre operaciones reales.',
          'Lo que sale mal en la marcha blanca casi siempre es un dato mal cargado, una tarifa o un vencimiento. Por eso conviene revisar las primeras reservas de cada categoría contra lo que habrías cobrado con la planilla.',
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
      'Revisá las primeras reservas de cada categoría contra la planilla.',
    ],
    enRentaGo:
      'La implementación tiene cuatro etapas. En el relevamiento ponés tu flota, tus categorías, tus sucursales y tu clausulado tal como los usás hoy. La carga de autos, documentos con vigencia, temporadas, feriados y el contrato la hago yo. Después se arma tu web con el motor de reservas, y en la marcha blanca el mostrador opera en el sistema acompañado, con los avisos ya corriendo. Cuánto tarda depende de cuánto haya que cargar.',
    terminos: ['cupo', 'temporada', 'clausulado-versionado', 'cuenta-corriente'],
    preguntas: [
      {
        p: '¿Hay que cargar todos los alquileres viejos?',
        r: 'No hace falta. Para operar alcanza con la flota, los documentos, las tarifas, el contrato, los clientes empresa y las reservas que ya están tomadas para adelante.',
      },
      {
        p: '¿Cuándo conviene hacer el cambio?',
        r: 'En temporada baja, cuando el mostrador tiene tiempo para aprender. Arrancar en la semana más cargada del año es la forma más rápida de volver al cuaderno.',
      },
      {
        p: '¿Cuánto tiempo se usan el Excel y el sistema juntos?',
        r: 'Lo menos posible. Desde la fecha de corte las reservas nuevas entran solo al sistema; si se mantienen los dos registros, enseguida dicen cosas distintas.',
      },
    ],
  },

  /* ── 5 ── */
  {
    slug: 'vencimientos-de-la-flota',
    nombre: 'Vencimientos de la flota',
    modulo: 'avisos-reportes',
    title: 'Vencimientos de la flota: VTV, póliza y service',
    description:
      'Cómo llevar los vencimientos de una flota de alquiler: VTV, póliza, service por kilómetro y por fecha, y licencias de conductores. Qué controlar y cuándo.',
    h1: 'Cómo controlar los *vencimientos de la flota* de una rentadora',
    bajada: 'VTV, póliza, service y licencias: enterarte antes, y no cuando te para la policía.',
    citable:
      'En una flota de alquiler vencen la VTV y la póliza de cada auto, el service por kilómetro o por fecha, y la licencia de cada conductor. Cada vencimiento se registra con su fecha y un aviso con anticipación. La licencia del conductor se controla en cada entrega, porque puede vencerse entre un alquiler y el siguiente.',
    secciones: [
      {
        titulo: 'Qué vence en una flota',
        parrafos: [
          'Por auto: la VTV, la póliza del seguro y el service. El service tiene dos vencimientos a la vez, uno por kilómetros y otro por tiempo, y manda el que llegue primero. Un auto que se alquila mucho llega por kilómetros; uno que está parado, por fecha.',
          'Por persona: la licencia de conducir de cada conductor autorizado. No es un dato de la flota, pero si hay un siniestro y la licencia estaba vencida, el problema es de la rentadora.',
        ],
      },
      {
        titulo: 'Por qué la planilla falla',
        parrafos: [
          'Una columna de vencimientos funciona mientras alguien la mira. El problema es que hay que acordarse de abrirla, y nadie se acuerda en la semana que más se trabaja, que es justo cuando los autos más andan.',
          'Lo que sirve es que el aviso llegue solo, con anticipación, a un lugar donde ya estés mirando. Y uno por asunto: si cada mañana aparecen cuarenta avisos iguales, se dejan de leer.',
        ],
      },
      {
        titulo: 'Cómo ordenar el seguimiento',
        parrafos: [
          'Cada documento se carga con su fecha de vencimiento, y cada service con el kilómetro y la fecha del próximo. La anticipación depende del trámite: una VTV necesita turno; renovar una póliza, unos días de gestión.',
          'Primero se atiende el auto que tiene una reserva cerca. Un vencimiento en un auto que va a estar parado un mes da tiempo; el mismo vencimiento en un auto que sale el viernes es urgente.',
        ],
      },
      {
        titulo: 'La licencia, en cada entrega',
        parrafos: [
          'La licencia se mira al dar de alta al cliente y otra vez al entregar el auto. Un cliente frecuente puede tener la licencia vigente en marzo y vencida en agosto. El control tiene que estar en la lista de la entrega, junto con la garantía y la documentación, para que no dependa de la memoria de quien atiende.',
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
      'Cada auto tiene su ficha con la VTV y la póliza con fecha, y los kilómetros que faltan para el service. Los documentos se cargan con vigencia y 31 reglas de aviso corren cada 30 minutos, con un aviso por asunto en la campana del panel. Antes de cada entrega, un semáforo revisa licencia, garantía y documentación.',
    terminos: ['check-out', 'conductor-adicional'],
    preguntas: [
      {
        p: '¿Con cuánta anticipación conviene el aviso de la VTV?',
        r: 'Con el tiempo suficiente para sacar turno y no sacar el auto de servicio en una semana cargada. Cada rentadora lo ajusta según cuánto tardan los turnos en su ciudad.',
      },
      {
        p: '¿El service se controla por kilómetro o por fecha?',
        r: 'Por los dos, y manda el que llegue primero. Un auto muy alquilado llega por kilómetros; uno que pasa semanas parado llega por fecha.',
      },
      {
        p: '¿Por qué controlar la licencia en cada entrega?',
        r: 'Porque puede vencerse entre un alquiler y el siguiente. Si hay un siniestro y el conductor manejaba con la licencia vencida, el problema llega a la rentadora.',
      },
    ],
  },
];

export function guia(slug: string): Guia | undefined {
  return GUIAS.find((g) => g.slug === slug);
}
