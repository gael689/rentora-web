/* ── Para quién ───────────────────────────────────────────────────────────────
 *
 * BORRADOR. El copy lo decide Gael: esto es una propuesta para editar, no texto cerrado.
 *
 * Seis tipos de rentadora, una página cada uno. Cada página cuenta cómo es ese negocio por
 * dentro y dónde pierde plata o tiempo, con cosas que solo son ciertas ahí. Si una página se
 * puede leer cambiando "aeropuerto" por "empresas" y sigue teniendo sentido, está mal.
 *
 * La regla de siempre: todo lo que se afirma del sistema sale de `contenido.ts` o de
 * `sistema/operaciones.ts`, verificados contra el código. Lo que el sistema no hace, la página no
 * lo dice. En la de choferes se nombra Uber (pedido de Gael, 08/10): es como lo busca el chofer y
 * como lo llama el producto ("Contrato Uber", "En Uber"). DiDi y Cabify van como las otras apps. */
import type { PaginaPara } from './tipos';

export const PARA: PaginaPara[] = [
  /* ── Aeropuerto ───────────────────────────────────────────────────────────── */
  {
    slug: 'rent-a-car-de-aeropuerto',
    nombre: 'Rent a car de aeropuerto',
    title: 'Software para rent a car de aeropuerto',
    description:
      'Reservas que entran desde la web antes del vuelo, la entrega en el aeropuerto cobrada como adicional y 40 minutos de gracia en la devolución. Para rentadoras.',
    h1: 'Sistema para *rent a car de aeropuerto*',
    bajada:
      'El cliente reserva antes de subirse al avión y llega cuando llega el vuelo.',
    citable:
      'Una rentadora que entrega en el aeropuerto vende casi todo antes de que el cliente aterrice, así que su web tiene que reservar y cobrar sola. Rentora retiene el auto 20 minutos mientras el cliente paga por Mercado Pago o transferencia, y la reserva entra al mismo calendario que ve el mostrador. En la devolución hay 40 minutos de gracia y, pasado eso, cargo por hora.',
    necesidades: [
      {
        titulo: 'Reservas desde la web, antes de viajar',
        texto:
          'El que viene en avión reserva desde su casa, muchas veces de noche. Tu web le muestra el cupo real de esas fechas, le retiene el auto 20 minutos mientras paga y nunca le vende una unidad ocupada.',
      },
      {
        titulo: 'La entrega en el aeropuerto, con precio',
        texto:
          'Llevar el auto a la terminal cuesta un viaje y una persona. Se carga como adicional con su precio, así que se cobra siempre y no depende de que alguien se acuerde de sumarlo.',
      },
      {
        titulo: 'El vuelo de vuelta, que no espera',
        texto:
          'El cliente devuelve apurado y a veces tarde. Hay 40 minutos de gracia y después el sistema cuenta las horas excedidas y propone el cargo, sin discusión en el estacionamiento.',
      },
      {
        titulo: 'Poco margen entre una devolución y la próxima entrega',
        texto:
          'Si un auto vuelve a las 10 y sale a las 13, el sistema avisa cuánto margen queda para prepararlo, y te deja decidir.',
      },
    ],
    secciones: [
      {
        titulo: 'Cómo se trabaja cuando la demanda llega en avión',
        parrafos: [
          'En una rentadora de aeropuerto el mostrador no es donde se vende. La venta pasa antes, y el mostrador es donde se entrega. Por eso lo que más plata pierde es la reserva que no se pudo tomar: el que escribió a las once de la noche, no le contestó nadie y reservó con otro antes de dormirse.',
          'Tu propia web toma esa reserva con un checkout de 4 pasos y la cobra por Mercado Pago o transferencia. La reserva confirmada entra al calendario de ocupación, y si entró sin unidad asignada queda a la vista para que le pongas el auto a la mañana.',
        ],
      },
      {
        titulo: 'Retiros y devoluciones con hora de vuelo',
        parrafos: [
          'Los lugares de retiro y devolución se escriben en la reserva, con atajos a los de siempre, así que "Aeropuerto" se elige en un toque y no se tipea cada vez.',
          'La devolución es donde más se discute. El sistema registra la hora real en que volvió el auto, aplica los 40 minutos de gracia y propone el cargo por hora. Si devuelve una hora o más después del horario de retiro, el día extra se cobra solo, sin tildar nada.',
        ],
      },
    ],
    modulos: ['tu-web', 'ocupacion', 'reservas', 'precios'],
    operacion: 'recibir-el-auto',
    guia: 'cobrar-la-sena-online',
    preguntas: [
      {
        p: 'Si un vuelo se demora, ¿cómo sé si llego a preparar el auto para la próxima salida?',
        r: 'Al cargar la reserva, si la devolución anterior deja poco margen, el sistema avisa cuánto queda para prepararlo. Es un aviso y no un bloqueo, así que con vuelos que se atrasan conviene dejar aire entre una devolución y la salida siguiente.',
      },
      {
        p: '¿Puedo cobrar la entrega en el aeropuerto aparte?',
        r: 'Sí. Se carga como adicional con su precio y se suma a la reserva junto con los demás adicionales.',
      },
      {
        p: '¿Cuánto tiempo tiene el cliente para pagar la reserva online?',
        r: 'El auto le queda retenido 20 minutos mientras paga. En ese rato nadie más puede vender esa unidad en esas fechas.',
      },
      {
        p: '¿Cuánto le cobro si devuelve el auto una hora y media tarde?',
        r: 'Los primeros 40 minutos no tienen cargo. Pasado eso, el sistema cuenta las horas excedidas y te propone el cargo, y como pasó más de una hora del horario de retiro, suma el día extra.',
      },
    ],
  },

  /* ── Turismo ──────────────────────────────────────────────────────────────── */
  {
    slug: 'alquiler-turistico',
    nombre: 'Alquiler turístico',
    title: 'Sistema para alquiler de autos en zona turística',
    description:
      'Precios por temporada, feriados y duración que salen solos, extensiones con su propio precio y una web que cobra la seña por Mercado Pago o transferencia.',
    h1: 'Sistema para *alquiler de autos en zona turística*',
    bajada:
      'Tres meses que pagan el año y nueve donde hay que vender igual. El precio acompaña sin cargarlo a mano.',
    citable:
      'En una rentadora de zona turística, el error más caro es vender una fecha de temporada alta al precio de temporada baja. Rentora calcula el precio con tres capas de calendario: temporada, feriados y descuento por duración, que se cargan una vez y valen para la web y el mostrador por igual. Una extensión de alquiler se cobra como un tramo nuevo, con su propio precio.',
    necesidades: [
      {
        titulo: 'Que enero no salga a precio de mayo',
        texto:
          'Cargás la temporada alta, la media y la baja una sola vez, con sus fechas. El precio de cada día sale solo, y el fin de semana largo sube por su cuenta.',
      },
      {
        titulo: 'Alquileres de una semana o más',
        texto:
          'El turista alquila por varios días. El descuento por duración es la tercera capa del motor: de 3 a 6 días y de 7 en adelante se calcula sin que lo hagas con la calculadora.',
      },
      {
        titulo: 'El que pide el auto tres días más',
        texto:
          'La extensión es un alquiler nuevo con su precio por día y su total, que son tuyos. El contrato se regenera con las fechas nuevas y el anterior queda anulado, no borrado.',
      },
      {
        titulo: 'La franquicia, clara antes de salir a la ruta',
        texto:
          'Cada categoría tiene su franquicia base y cada cobertura dice a cuánto la baja. El cliente elige con el número delante y no se discute a la vuelta.',
      },
    ],
    secciones: [
      {
        titulo: 'La temporada se juega en pocas semanas',
        parrafos: [
          'En una plaza turística la flota entera se alquila en enero, en julio y en los fines de semana largos, y el resto del año hay que salir a buscar al cliente. Con un tarifario plano se pierde plata en los dos extremos: en temporada alta se vende barato porque nadie actualizó la lista, y en baja se vende caro y el auto queda parado.',
          'El motor de precios tiene tres capas que se superponen. Si cargás una promo para mayo y después la das de baja, el precio que estaba debajo vuelve solo, porque la promo nunca lo pisó.',
        ],
      },
      {
        titulo: 'La seña se cobra en la web, no por WhatsApp',
        parrafos: [
          'El turista reserva semanas antes de viajar y quiere dejarlo cerrado. Tu web le muestra el precio del día que eligió, le retiene el auto 20 minutos y cobra por Mercado Pago o transferencia. El mismo precio que vería en el mostrador.',
          'El reporte de demanda no atendida sirve para la temporada siguiente: muestra lo que te pidieron y no pudiste atender, que es una buena pista para decidir la flota del año que viene.',
        ],
      },
    ],
    modulos: ['precios', 'tu-web', 'categorias-y-coberturas'],
    operacion: 'extender-un-alquiler',
    guia: 'como-armar-tarifas-de-temporada',
    preguntas: [
      {
        p: '¿Puedo tener precios distintos en verano y en invierno?',
        r: 'Sí. Cada temporada se carga con sus fechas y su peso sobre la tarifa base, y el precio de cada día sale de ahí. Una plaza con dos temporadas altas al año las carga a las dos.',
      },
      {
        p: '¿El precio de la web es el mismo que el del mostrador?',
        r: 'Sí, hay un solo precio. Si una temporada sube, sube en los dos lados a la vez.',
      },
      {
        p: '¿Cómo cobro una extensión pactada por teléfono?',
        r: 'El sistema sugiere la tarifa de la categoría, pero el precio por día y el total los escribís vos. Se cobra al momento o va a cuenta corriente, y el contrato se regenera con las fechas nuevas.',
      },
      {
        p: '¿Me sirve saber cuántos autos me faltaron en enero?',
        r: 'Para eso está el reporte de demanda no atendida, uno de los cuatro reportes del sistema. Muestra lo que te pidieron y no pudiste atender.',
      },
    ],
  },

  /* ── Camionetas y utilitarios ─────────────────────────────────────────────── */
  {
    slug: 'alquiler-de-camionetas-y-utilitarios',
    nombre: 'Camionetas y utilitarios',
    title: 'Sistema para alquiler de camionetas y utilitarios',
    description:
      'Pick-ups y furgones como categorías propias, con su franquicia y su tarifa base, daños con fotos desde el celular y service por kilómetro. Para rentadoras.',
    h1: 'Sistema para *alquiler de camionetas y utilitarios*',
    bajada:
      'Una pick-up que vuelve de un camino de ripio no se revisa igual que un compacto que hizo ciudad.',
    citable:
      'En Rentora cada unidad tiene su tipo —auto, camioneta, combi, utilitario, moto o motorhome—, y las categorías incluyen compacto, sedán, sedán superior, SUV, pick-up y furgón. La franquicia y la tarifa base se definen por categoría, así que una pick-up no se cotiza como un compacto. Los daños se cargan con fotos desde el celular y quedan atados al alquiler y al conductor.',
    necesidades: [
      {
        titulo: 'Cada tipo de unidad con su precio',
        texto:
          'Pick-up y furgón son categorías propias, con su tarifa base. El motor de precios trabaja sobre esa base, así que la temporada y el feriado suben la camioneta en su proporción.',
      },
      {
        titulo: 'Una franquicia que acompañe lo que vale la unidad',
        texto:
          'Reparar una pick-up cuesta más que reparar un compacto. Cada categoría tiene su franquicia base, y cada cobertura dice a cuánto la baja.',
      },
      {
        titulo: 'El golpe en la caja de carga',
        texto:
          'Al entregar se ven los daños que ya tenía la unidad. Si vuelve con uno nuevo, se carga con zona, tipo, severidad y fotos, y queda atado a ese alquiler y a ese conductor.',
      },
      {
        titulo: 'El service, por kilómetro',
        texto:
          'Una camioneta que hace ruta suma kilómetros rápido. La ficha de cada unidad muestra cuántos le faltan para el service, además de la VTV y la póliza con su fecha.',
      },
    ],
    secciones: [
      {
        titulo: 'Unidades que trabajan más que un auto',
        parrafos: [
          'El que alquila una camioneta o un furgón casi nunca lo hace para pasear. Carga materiales, hace ripio, va a un yacimiento o se muda. La unidad vuelve con más kilómetros, más polvo y más golpes chicos, y cada uno de esos golpes es una discusión si no quedó registrado al salir.',
          'Por eso la entrega registra kilómetros, combustible y limpieza con tres botones de color, y muestra los daños que ya tenía la unidad. Que el daño se fotografíe con la camioneta todavía en el lugar es lo que termina el "ya estaba así".',
        ],
      },
      {
        titulo: 'Lo que cuesta mantenerla',
        parrafos: [
          'Una pick-up parada en el taller es la unidad más cara de la flota sin facturar. La ficha de cada unidad guarda los gastos cargados, el service por kilómetro y por fecha, y el historial de daños, así que se ve cuánto costó mantenerla en el año.',
          'Cuando una unidad no da más, se da de baja con su motivo. Y los vencimientos de la VTV y la póliza los miran 31 reglas cada 30 minutos, con el aviso en la campana del panel.',
        ],
      },
    ],
    modulos: ['categorias-y-coberturas', 'flota', 'multas-y-danos'],
    operacion: 'entregar-el-auto',
    guia: 'franquicia-y-garantia',
    preguntas: [
      {
        p: '¿Puedo cargar furgones y combis además de pick-ups?',
        r: 'Sí. Furgón es una de las categorías del sistema, junto con pick-up, SUV, sedán superior, sedán y compacto. Y cada unidad tiene su tipo: auto, camioneta, combi, utilitario, moto o motorhome.',
      },
      {
        p: '¿La franquicia de una pick-up puede ser distinta a la de un auto?',
        r: 'Sí. La franquicia base se define por categoría, y al armar el contrato se genera el documento de la franquicia con el monto de esa categoría ya cargado.',
      },
      {
        p: '¿Cómo pruebo que el daño no estaba cuando salió?',
        r: 'En la entrega se ven los daños que ya tenía la unidad, y si aparece uno nuevo se fotografía ahí mismo desde el celular. La constancia queda en el historial de la unidad.',
      },
      {
        p: 'Si vuelve sin nafta, ¿se lo cobro al cliente?',
        r: 'Por defecto va como gasto del vehículo. Cobrárselo al cliente se puede, pero es una casilla que hay que tildar a mano en la devolución.',
      },
    ],
  },

  /* ── Empresas ─────────────────────────────────────────────────────────────── */
  {
    slug: 'alquiler-a-empresas',
    nombre: 'Alquiler a empresas',
    title: 'Sistema para alquilar autos a empresas',
    description:
      'Cuenta corriente a 15, 30, 60 o 90 días con la deuda por antigüedad, empresa con su representante, hasta 3 conductores y la multa atada a quien manejaba.',
    h1: 'Sistema para *alquilar autos a empresas*',
    bajada:
      'La empresa alquila seguido, paga a plazo y cambia de conductor. El sistema le sigue el ritmo.',
    citable:
      'Para alquilar a empresas, Rentora maneja cuenta corriente a 15, 30, 60 o 90 días y reparte la deuda en cuatro tramos de antigüedad, para saber desde cuándo te deben. La ficha de una empresa lleva a su representante, y cada contrato admite hasta tres conductores. Cuando llega una multa, con la fecha del hecho el sistema encuentra el alquiler vigente y quién manejaba.',
    necesidades: [
      {
        titulo: 'Saber desde cuándo te deben',
        texto:
          'La cuenta corriente reparte la deuda de cada cliente en cuatro tramos de antigüedad. A cobrar cuenta los días desde la devolución, así que el saldo viejo no se mezcla con el de la semana pasada.',
      },
      {
        titulo: 'Quién firma y quién maneja',
        texto:
          'La empresa tiene su ficha con el representante, y cada contrato admite hasta tres conductores. El contrato imprime quién firma.',
      },
      {
        titulo: 'La multa que llega meses después',
        texto:
          'Cargás el acta con la fecha del hecho y el sistema te dice qué alquiler estaba vigente y qué conductor era el responsable. Se la cargás a quien corresponde.',
      },
      {
        titulo: 'Los comprobantes, en el alquiler',
        texto:
          'Facturas, notas de crédito, notas de débito y remitos se registran con su PDF y quedan atados al alquiler y a la cuenta corriente. El recibo de cobro lo emite el sistema, numerado.',
      },
    ],
    secciones: [
      {
        titulo: 'El cliente que más alquila es el que más tarda en pagar',
        parrafos: [
          'Una empresa constructora o de servicios alquila todos los meses, a veces varias unidades a la vez, y paga a 30 o 60 días. Es el mejor cliente que puede tener una rentadora y también el que más plata le deja en la calle. Sin una cuenta corriente ordenada, a fin de mes nadie sabe bien qué alquileres ya se cobraron y cuáles siguen esperando.',
          'A cobrar, en la Caja, muestra una fila por alquiler con lo que falta cobrar. Lo que va a cuenta corriente se muestra aparte y no infla los ingresos del mes. Y si la empresa paga con echeq, el sistema lo cuenta aparte del cobro, porque puede rebotar, y los ordena en vencidos, próximos 7 días y en cartera.',
        ],
      },
      {
        titulo: 'Facturación: lo que hace y lo que no',
        parrafos: [
          'El sistema no emite factura electrónica. La seguís emitiendo donde la emitís hoy, y en el sistema la registrás con su PDF, atada al alquiler. La condición frente al IVA, responsable inscripto o monotributo, es un dato del cliente y del contrato.',
          'Si a la empresa le cambian las condiciones para un contrato puntual, las cláusulas se editan antes de emitir y valen solo para ese contrato. El contrato firmado guarda el texto de ese día y se reimprime idéntico cuando lo pide el área legal del cliente.',
        ],
      },
    ],
    modulos: ['caja', 'clientes', 'multas-y-danos', 'contratos'],
    operacion: 'firmar-el-contrato',
    preguntas: [
      {
        p: '¿Qué plazos de pago puedo darle a una empresa?',
        r: 'Contado o cuenta corriente a 15, 30, 60 o 90 días, con una aclaración escrita si hace falta. La condición se elige al cargar la reserva.',
      },
      {
        p: '¿El sistema emite la factura electrónica?',
        r: 'No. La factura la emitís donde la emitís hoy y en el sistema se registra con su PDF, atada al alquiler y a la cuenta corriente de la empresa.',
      },
      {
        p: '¿Quién firma la franquicia cuando el cliente es una empresa?',
        r: 'El deudor que elijas: la empresa, su representante o uno de los conductores. El documento se genera con una casilla al armar el contrato.',
      },
      {
        p: '¿Me sirve para buscar empresas nuevas?',
        r: 'Hay un módulo opcional de Prospectos con empresas que podrían alquilarte, ya cruzadas con tus clientes para no escribirle a quien ya lo es. Armás la campaña y queda lista; el envío automático todavía no está activado.',
      },
    ],
  },

  /* ── Choferes de aplicaciones ─────────────────────────────────────────────── */
  {
    slug: 'alquiler-a-choferes-de-aplicaciones',
    nombre: 'Choferes de aplicaciones',
    title: 'Alquiler de autos para Uber y choferes de apps',
    description:
      'Contrato Uber para alquilar autos a choferes de Uber, DiDi o Cabify: valor por semana, una fecha de pago por semana, km permitidos y precio del km extra.',
    h1: 'Sistema para *alquilar autos para Uber* y otras apps',
    bajada:
      'Un auto que sale a trabajar todos los días se alquila y se cobra por semana.',
    citable:
      'Rentora tiene un Contrato Uber: el contrato semanal pensado para alquilar autos a choferes de Uber, DiDi o Cabify. Se carga el valor de la semana y salen el total, una fecha de pago por cada semana, que se puede editar, los kilómetros permitidos por semana y el precio del kilómetro extra. Se arranca desde el mismo botón de Nueva operación que una reserva común.',
    necesidades: [
      {
        titulo: 'Un precio por semana',
        texto:
          'Cargás el valor de la semana y el contrato calcula el total del período. Nada de convertir una tarifa diaria a mano.',
      },
      {
        titulo: 'Una fecha de pago para cada semana',
        texto:
          'El contrato arma una fecha de pago por semana. Si el chofer cobra un día distinto, la fecha se edita.',
      },
      {
        titulo: 'Los kilómetros, acordados de entrada',
        texto:
          'Los kilómetros permitidos por semana y el precio del kilómetro extra quedan escritos en el contrato. El chofer sabe desde el primer día qué se le cobra si se pasa.',
      },
      {
        titulo: 'El service, que llega antes',
        texto:
          'Un auto que trabaja todo el día llega al service en semanas. La ficha muestra cuántos kilómetros le faltan, y la VTV y la póliza tienen su aviso en la campana.',
      },
    ],
    secciones: [
      {
        titulo: 'Un alquiler que no se parece a los demás',
        parrafos: [
          'El chofer de aplicaciones no alquila para un viaje: alquila para trabajar. Se lleva el auto por meses, paga cada semana con lo que facturó y le hace en un mes los kilómetros que un turista hace en un año. Si ese alquiler se carga como una reserva común, la tarifa diaria no cierra, los pagos no tienen fecha y nadie sabe cuántos kilómetros se pactaron.',
          'El contrato semanal se abre desde Nueva operación, que tiene tres puertas: este contrato, el alquiler rápido o la reserva completa en 6 pasos. Cargás el valor de la semana y el contrato arma el resto.',
        ],
      },
      {
        titulo: 'Cobrar cada semana sin perder la cuenta',
        parrafos: [
          'Lo que se pierde en este negocio es la semana que se pagó a medias y la que no se pagó. Con una fecha de pago por semana en el contrato, cada cobro tiene contra qué compararse, y los pagos se registran en la Caja con su medio: efectivo, transferencia, Mercado Pago o el que use el chofer.',
          'Si cambia algo del acuerdo, el contrato se regenera pidiendo un motivo, se pueden cambiar los conductores y el anterior queda anulado. La auditoría guarda quién lo hizo y por qué.',
        ],
      },
    ],
    modulos: ['contratos', 'reservas', 'caja', 'flota'],
    operacion: 'tomar-una-reserva',
    guia: 'vencimientos-de-la-flota',
    preguntas: [
      {
        p: '¿Puedo cambiar el día de pago de una semana?',
        r: 'Sí. El contrato arma una fecha de pago por semana, y cada una se puede editar si el chofer cobra otro día.',
      },
      {
        p: '¿Dónde queda escrito cuántos kilómetros puede hacer?',
        r: 'En el contrato: los kilómetros permitidos por semana y el precio del kilómetro extra se cargan al armarlo.',
      },
      {
        p: '¿El contrato semanal se firma igual que los otros?',
        r: 'Sí. Se firma en pantalla con el dedo, por un link al teléfono o en papel, y queda guardado con el texto de ese día.',
      },
      {
        p: '¿Puedo tener choferes de Uber y alquileres comunes en la misma flota?',
        r: 'Sí. Los dos salen del mismo botón de Nueva operación, y el auto que tiene un chofer figura “En Uber” en la flota, a la vista de todo el mostrador.',
      },
    ],
  },

  /* ── Varias sucursales ────────────────────────────────────────────────────── */
  {
    slug: 'flotas-con-varias-sucursales',
    nombre: 'Varias sucursales',
    title: 'Sistema para rentadoras con varias sucursales',
    description:
      'Retiro en una sucursal y devolución en otra, cada auto con su sucursal base, una caja por sucursal con apertura y cierre, y reportes por sucursal o juntos.',
    h1: 'Sistema para rentadoras *con varias sucursales*',
    bajada: 'Cada sucursal ve su mostrador; vos ves todas juntas.',
    citable:
      'Rentora maneja varias sucursales en un mismo sistema. Cada sucursal tiene sus puntos de retiro y devolución y su caja, con apertura y cierre, y cada auto tiene su sucursal base y la ubicación donde está ahora. Un cliente puede retirar en una sucursal y devolver en otra, y los reportes se ven por sucursal o consolidados.',
    necesidades: [
      {
        titulo: 'Retirar en una, devolver en otra',
        texto:
          'El cliente que llega en avión y se vuelve por ruta no devuelve donde retiró. La reserva lleva la sucursal de retiro y la de devolución, cada una con sus puntos, y nadie tiene que acordarse de anotarlo aparte.',
      },
      {
        titulo: 'Saber dónde está cada auto',
        texto:
          'Cada unidad tiene su sucursal base y su ubicación actual. Antes de prometer un auto en el aeropuerto sabés si está ahí o en la otra punta de la ciudad.',
      },
      {
        titulo: 'Una caja por sucursal',
        texto:
          'Cada sucursal abre y cierra su caja, con arqueo, y si hay diferencia queda registrada. El efectivo de un mostrador no se mezcla con el del otro.',
      },
      {
        titulo: 'Los números, por sucursal o todos juntos',
        texto:
          'Los reportes se filtran por sucursal o se consolidan. Ves cuánto entró en cada una y cuánto entre todas, sin sumar planillas a mano a fin de mes.',
      },
    ],
    secciones: [
      {
        titulo: 'Dos mostradores, una sola flota',
        parrafos: [
          'Cuando una rentadora abre una segunda sucursal, casi siempre en el aeropuerto o en otra ciudad, el problema deja de ser cuántos autos hay y pasa a ser dónde están. El auto que figura libre en la planilla de la casa central puede estar estacionado en la terminal, y el que se prometió para las nueve de la mañana está a cuarenta kilómetros. Con una planilla por sucursal, tarde o temprano se vende el mismo auto dos veces.',
          'En Rentora todas las sucursales trabajan sobre el mismo sistema. Cada auto tiene su sucursal base y dónde está ahora, y el calendario de ocupación se filtra por sucursal: cada mostrador mira lo suyo y, cuando hace falta, ve el resto.',
        ],
      },
      {
        titulo: 'La plata de cada sucursal, en su caja',
        parrafos: [
          'Con dos mostradores cobrando, el cierre del día se complica. Hay efectivo en los dos, transferencias que entran a la misma cuenta y un posnet en cada lado. Si todo va a una sola caja, a fin de mes nadie sabe qué sucursal rindió y cuál no, y una diferencia de arqueo no tiene a quién preguntarle.',
          'Por eso cada sucursal abre y cierra su propia caja. Los cobros quedan registrados en la sucursal donde se hicieron, con su medio de pago, y la diferencia del arqueo, si la hay, queda anotada con el cierre. Los reportes se miran por sucursal o consolidados, así que la comparación entre una y otra sale sola.',
        ],
      },
    ],
    modulos: ['ocupacion', 'reservas', 'caja', 'avisos-reportes'],
    operacion: 'tomar-una-reserva',
    preguntas: [
      {
        p: '¿Un cliente puede devolver el auto en otra sucursal?',
        r: 'Sí. La reserva lleva la sucursal de retiro y la de devolución, cada una con sus puntos, así que el viaje de ida y vuelta queda escrito desde que se carga.',
      },
      {
        p: '¿Cada sucursal tiene su propia caja?',
        r: 'Sí. Cada sucursal abre y cierra su caja, con arqueo, y los cobros quedan en la sucursal donde se hicieron.',
      },
      {
        p: '¿Puedo ver los números de todas las sucursales juntas?',
        r: 'Sí. Los reportes se ven por sucursal o consolidados, así que podés mirar una sola o todas a la vez.',
      },
      {
        p: '¿El mostrador de una sucursal ve los autos de la otra?',
        r: 'Cada auto tiene su sucursal base y su ubicación actual, y el calendario de ocupación se filtra por sucursal. Cada mostrador mira lo suyo y, si hace falta, ve el resto.',
      },
    ],
  },
];

export function para(slug: string): PaginaPara | undefined {
  return PARA.find((p) => p.slug === slug);
}
