/* ── Las plazas ───────────────────────────────────────────────────────────────
 *
 * Nueve y no veinte. Cada una con contenido propio de ese mercado —cuándo es la temporada, qué
 * flota predomina, si hay aeropuerto, cómo es el día a día del mostrador, qué preguntas solo se
 * hacen ahí— porque nueve páginas con sustancia rankean y veinte plantillas rellenadas son
 * doorway pages. Una plaza entra a la lista cuando tiene algo que decir que no sea cierto en
 * las otras ocho; si lo único que cambia es el nombre de la ciudad, no entra.
 *
 * Bariloche es donde está el proveedor local más fuerte. Esa página se pelea de verdad. */
import type { PreguntaFaq } from './tipos';

export type Plaza = {
  slug: string;
  ciudad: string;
  provincia: string;
  aeropuerto: string;
  /** Qué tiene de particular el mercado. Dos o tres oraciones, concretas. */
  mercado: string;
  /** Cuándo se llena. Es el dato que hace útil el motor de precios ahí. */
  temporada: string;
  /** Qué flota predomina y por qué. */
  flota: string;
  /** El módulo que más pesa en esa plaza, para el enlazado interno. */
  modulo: string;
  /** Entre 140 y 160 caracteres. */
  description: string;
  /** Dos o tres oraciones autónomas sobre el mercado de esa plaza, citables. */
  citable: string;
  /** Cómo se opera una rentadora ahí: un párrafo de 80–120 palabras con lo que cambia en el
   *  día a día (entregas, rutas, documentos, clientes). */
  operacion: string;
  /** Tres preguntas que solo tienen sentido en esa plaza. */
  preguntas: PreguntaFaq[];
  /** Slug de `/para/*` que más se parece a ese mercado. */
  para?: string;
};

export const PLAZAS: Plaza[] = [
  {
    slug: 'bariloche',
    ciudad: 'Bariloche',
    provincia: 'Río Negro',
    aeropuerto: 'Aeropuerto Teniente Luis Candelaria',
    mercado:
      'Bariloche tiene dos temporadas altas al año y eso cambia todo: un tarifario plano deja plata sobre la mesa dos veces por año, no una. La demanda llega en avión y reserva antes de viajar, así que el canal web pesa más que en casi cualquier otra plaza del país.',
    temporada:
      'Invierno de junio a septiembre, con el pico en las vacaciones de julio, y verano en enero y febrero. Entre medio, dos temporadas bajas largas donde el precio tiene que bajar solo.',
    flota:
      'SUV y 4x4 con cadenas en invierno; compactos y sedanes el resto del año. La misma unidad cambia de precio según la estación, que es exactamente lo que resuelven las capas de temporada.',
    modulo: 'precios',
    description:
      'Software para rent a car en Bariloche: precio por temporada de invierno y de verano, reservas web cobradas antes del viaje y la flota de 4x4 a la vista.',
    citable:
      'Bariloche tiene dos temporadas altas por año: el invierno, con el pico en las vacaciones de julio, y el verano de enero y febrero. Casi toda la demanda de alquiler de autos llega en avión y reserva antes de viajar. Por eso una rentadora de Bariloche necesita un tarifario que cambie solo con la estación y una web que cobre la reserva.',
    operacion:
      'En invierno el día arranca mirando cómo está la ruta al Catedral. Las 4x4 salen con cadenas y el cliente pregunta si van incluidas o se cobran aparte. Muchas entregas son en el aeropuerto, con vuelos que a veces se atrasan por el clima, y la hora de retiro se corre. En julio la flota está vendida semanas antes y el trabajo pasa a ser no vender de más. En verano cambia el cliente. Son familias que hacen el Circuito Chico o bajan por la Ruta 40 hacia El Bolsón en compactos y sedanes. Vuelven con tierra en los zócalos y más kilómetros de los que dijeron en el mostrador.',
    preguntas: [
      {
        p: '¿Cómo cobro las cadenas en invierno?',
        r: 'Como un extra, con su precio y un tope de cantidad, que se suma a la reserva solo cuando el cliente lo pide. Así la tarifa del auto no cambia y las cadenas quedan cargadas en ese alquiler.',
      },
      {
        p: '¿Puedo tener un precio para las vacaciones de julio y otro para el resto del invierno?',
        r: 'Sí. Las temporadas se cargan con sus fechas, así que las vacaciones de invierno pueden tener su precio y agosto otro. Los fines de semana largos van en una capa aparte, encima de la temporada.',
      },
      {
        p: '¿Qué pasa con el precio en abril o en noviembre, cuando casi no hay turismo?',
        r: 'Baja solo, si la temporada baja está cargada con sus fechas. El motor la aplica esos días sin que nadie toque la tarifa, y los descuentos por duración siguen premiando al que alquila una semana.',
      },
    ],
    para: 'alquiler-turistico',
  },
  {
    slug: 'neuquen',
    ciudad: 'Neuquén',
    provincia: 'Neuquén',
    aeropuerto: 'Aeropuerto Presidente Perón',
    mercado:
      'Neuquén es plaza corporativa antes que turística. El cliente típico es una empresa que alquila por mes, paga a 30 o 60 días y necesita factura y remito. La cuenta corriente no es un caso raro acá: es el modo normal de operar.',
    temporada:
      'Demanda pareja todo el año, con picos cuando hay paradas de planta. Lo que manda no es la temporada sino el contrato mensual.',
    flota:
      'Pick-ups doble cabina, muchas de ellas en alquiler mensual con kilometraje libre dentro de la provincia. El cotizador y la caja, con sus cuentas corrientes, son lo que más se mira.',
    modulo: 'caja',
    description:
      'Software para rent a car en Neuquén: pick-ups por mes para empresas, cuenta corriente a 30 o 60 días y la deuda ordenada por antigüedad en un solo sistema.',
    citable:
      'Neuquén es una plaza de alquiler corporativo. El cliente típico es una empresa que trabaja en los yacimientos, alquila pick-ups por mes y paga a 30 o 60 días contra factura. Ahí la cuenta corriente es el modo normal de cobrar, y el control de la deuda pesa más que el tarifario.',
    operacion:
      'El que firma casi nunca es el que maneja. La empresa manda a su representante a firmar y la camioneta sale con dos o tres personas de la cuadrilla, que tienen que quedar declaradas por si llega una multa de la Ruta 7. Muchas unidades vuelven después de semanas en Añelo y alrededores, con muchos kilómetros encima, polvo en la cabina y algún golpe en la caja. El service por kilómetro llega antes que en cualquier otra plaza. El cierre de mes también es distinto. Lo que se mira no es cuánto entró hoy. Se mira qué empresa debe, desde cuándo, y qué remito falta para que la puedan facturar.',
    preguntas: [
      {
        p: '¿Puedo alquilarle a una empresa por mes y cobrarle a 60 días?',
        r: 'Sí. La empresa trabaja en cuenta corriente, a contado, 15, 30, 60 o 90 días, y cada alquiler suma a su saldo. La deuda se reparte en cuatro tramos de antigüedad, así ves qué parte está atrasada.',
      },
      {
        p: 'Si la camioneta la manejan varios de la cuadrilla, ¿cómo sé a quién le toca la multa?',
        r: 'Cada contrato admite hasta tres conductores declarados. Cuando cargás la multa con la fecha del hecho, el sistema encuentra el alquiler vigente y el conductor responsable.',
      },
      {
        p: '¿Me avisa cuándo le toca el service a una pick-up que hace muchos kilómetros?',
        r: 'Sí. Cada unidad tiene su próximo service por kilómetro o por fecha, lo que llegue primero, y el aviso queda en la campana del panel. Las 31 reglas de aviso corren cada 30 minutos.',
      },
    ],
    para: 'alquiler-de-camionetas-y-utilitarios',
  },
  {
    slug: 'mendoza',
    ciudad: 'Mendoza',
    provincia: 'Mendoza',
    aeropuerto: 'Aeropuerto El Plumerillo',
    mercado:
      'Mendoza mezcla turismo de bodegas, montaña y paso a Chile. Buena parte de la demanda llega del exterior y reserva online con semanas de anticipación, así que la web con cobro por adelantado deja de ser un lujo.',
    temporada:
      'Enero y febrero, la vendimia en marzo, y la temporada de nieve entre junio y agosto. Tres picos, cada uno con su precio.',
    flota:
      'Compactos y sedanes para el circuito de bodegas, SUV para alta montaña. Las coberturas pesan: el que cruza a Chile pregunta primero por la franquicia.',
    modulo: 'categorias-y-coberturas',
    description:
      'Software para rent a car en Mendoza: precios para verano, vendimia y nieve, reservas web cobradas por adelantado y coberturas con su franquicia a la vista.',
    citable:
      'Mendoza tiene tres picos de demanda de alquiler de autos por año: el verano, la vendimia de marzo y la temporada de nieve. Una parte grande de los clientes llega del exterior y reserva online con semanas de anticipación. Muchos cruzan a Chile por el paso Cristo Redentor, y antes de alquilar preguntan por la franquicia.',
    operacion:
      'El mismo día salen dos alquileres que no se parecen en nada. Uno es un compacto para recorrer bodegas en Luján de Cuyo o el Valle de Uco, que vuelve a la noche. El otro es una SUV que sube a alta montaña y quizás cruza a Chile. El que cruza necesita una autorización del titular y un seguro que lo cubra del otro lado, y eso se prepara antes del día del retiro. Cuando el paso se cierra por nieve, el cliente queda varado en Uspallata o del lado chileno, y la fecha de devolución deja de ser la pactada. Con el turista extranjero la reserva suele llegar pagada, y el mostrador solo entrega.',
    preguntas: [
      {
        p: '¿Cómo le explico la franquicia a un cliente que va a cruzar a Chile?',
        r: 'Con la cobertura elegida a la vista. Cada categoría tiene su franquicia base, cada cobertura dice a cuánto la baja, y el documento de la franquicia se genera junto al contrato para que lo firme el deudor.',
      },
      {
        p: '¿Puedo cobrar más caros los días de la vendimia?',
        r: 'Sí. La vendimia se carga como una temporada con sus fechas y el precio sale solo esos días. Si coincide con un fin de semana largo, la capa de feriados se suma encima.',
      },
      {
        p: '¿Puedo cotizar distinto el auto para bodegas y la SUV para alta montaña?',
        r: 'Sí. Cada categoría tiene su tarifa base y su franquicia, así que un compacto para el circuito de bodegas y una SUV para Uspallata se cotizan distinto desde el primer día.',
      },
    ],
    para: 'alquiler-turistico',
  },
  {
    slug: 'salta',
    ciudad: 'Salta',
    provincia: 'Salta',
    aeropuerto: 'Aeropuerto Martín Miguel de Güemes',
    mercado:
      'En Salta el alquiler es casi siempre para hacer circuito: Cafayate, la Quebrada, la Puna. Son alquileres de varios días, con devolución en otra fecha de la pactada más seguido que en otras plazas, y por eso la extensión de alquiler se usa mucho.',
    temporada:
      'Julio y enero son los picos, más Semana Santa y los fines de semana largos, que en el norte se sienten fuerte.',
    flota:
      'Camionetas y 4x4 para ruta de ripio y altura. El control de daños al devolver importa más que en ciudad: el auto vuelve de caminos que lo castigan.',
    modulo: 'multas-y-danos',
    description:
      'Software para rent a car en Salta: alquileres de varios días para hacer circuito, extensiones con su propio precio y daños con fotos al volver del ripio.',
    citable:
      'En Salta casi todo alquiler de auto es para hacer circuito: Cafayate, Cachi, la Quebrada de Humahuaca y la Puna. Son alquileres de varios días, por rutas con tramos de ripio y altura, y la fecha de devolución cambia más seguido que en otras plazas. Los picos son julio, enero, Semana Santa y los fines de semana largos.',
    operacion:
      'En el mostrador se habla más de la ruta que del auto. El que va a Cachi por la Cuesta del Obispo o sigue por la Ruta 40 hasta Cafayate hace ripio, y hay que darle la categoría que corresponde. El que sube a la Puna necesita una camioneta. Los alquileres son de cuatro, cinco o siete días, y una parte de los clientes llama desde la ruta para quedarse uno más. Al volver, el auto trae piedras en el parabrisas, polvo adentro y a veces una llanta golpeada. La recepción se hace despacio, con fotos, comparando contra lo que se registró al salir.',
    preguntas: [
      {
        p: 'Si el cliente llama desde Cafayate para quedarse un día más, ¿cómo lo cargo?',
        r: 'Como una extensión, que es un alquiler nuevo con su propio precio por día y su propio cobro. El precio se puede editar si lo pactaste distinto por teléfono, y el contrato se regenera con las fechas nuevas.',
      },
      {
        p: '¿Cómo pruebo que el parabrisas se rompió en el viaje y no antes?',
        r: 'Con lo registrado en la entrega. Al entregar se ven los daños que el auto ya tenía y cualquiera nuevo se carga con fotos desde el celular. Al devolver, el daño se carga con zona, tipo, severidad y fotos, atado a ese alquiler y a ese conductor.',
      },
      {
        p: '¿Puedo cobrar distinto el fin de semana largo de Güemes?',
        r: 'Sí. Los feriados se cargan en la segunda capa del motor de precios, encima de la temporada, así que el fin de semana largo de junio sale con su recargo sin tocar la tarifa.',
      },
    ],
    para: 'alquiler-turistico',
  },
  {
    slug: 'cordoba',
    ciudad: 'Córdoba',
    provincia: 'Córdoba',
    aeropuerto: 'Aeropuerto Ambrosio Taravella',
    mercado:
      'Córdoba tiene volumen todo el año y mucha competencia, así que el margen se defiende con precio fino y no con tarifa alta. Es la plaza donde más rinde tener el precio fino por temporada y por fecha especial.',
    temporada:
      'Enero y febrero por las sierras, y fines de semana largos durante todo el año, que en Córdoba mueven tanto como una quincena de verano.',
    flota:
      'Compactos y sedanes en volumen, con rotación rápida. Con rotación rápida, el calendario de ocupación y el panel del día pasan a ser la pantalla que se mira todo el tiempo.',
    modulo: 'ocupacion',
    description:
      'Software para rent a car en Córdoba: precio fino por temporada y por fin de semana largo, y un calendario de ocupación por auto para la rotación rápida.',
    citable:
      'Córdoba tiene demanda de alquiler de autos todo el año y mucha competencia entre rentadoras. El verano en las sierras y los fines de semana largos mueven la mayor parte del volumen turístico. Con márgenes ajustados, la diferencia la hace cobrar bien cada fecha especial y no dejar autos parados entre un alquiler y otro.',
    operacion:
      'En Córdoba un auto puede volver a la mañana y salir de nuevo a la tarde. El viernes de un fin de semana largo se entregan autos para Carlos Paz, Calamuchita y Traslasierra, y el martes vuelven casi todos juntos. Ese martes la pregunta es cuáles están limpios y listos para el alquiler que sale después del mediodía. Entre semana cambia el cliente. Viene gente por trabajo, por un trámite o por un congreso, y alquila dos o tres días. Con tanta rotación, el calendario del día se mira todo el tiempo. Una reserva anotada solo en un cuaderno es el camino más corto a vender un auto dos veces.',
    preguntas: [
      {
        p: '¿Cómo cobro más el fin de semana largo sin cambiar la tarifa a mano?',
        r: 'Con la capa de feriados. Los fines de semana largos se cargan una vez en el año y el motor les suma su recargo encima de la temporada, con el mismo precio en la web y en el mostrador.',
      },
      {
        p: 'Si un auto vuelve a la mañana, ¿cómo veo si lo puedo volver a alquilar a la tarde?',
        r: 'En el calendario de ocupación, que tiene una fila por auto y una columna por día. El botón Hoy te lleva directo al día, y el cupo de cada categoría se calcula por fecha sobre la flota real.',
      },
      {
        p: '¿Sirve para la temporada de sierras, con alquileres de una semana?',
        r: 'Sí. La tercera capa del motor aplica descuentos por duración, así que el alquiler de siete días o más sale con su descuento sobre el precio de enero sin calcularlo a mano.',
      },
    ],
    para: 'rent-a-car-de-aeropuerto',
  },
  {
    slug: 'ushuaia',
    ciudad: 'Ushuaia',
    provincia: 'Tierra del Fuego',
    aeropuerto: 'Aeropuerto Malvinas Argentinas',
    mercado:
      'Ushuaia tiene flota chica y demanda concentrada: cuando llega un crucero, se alquila todo. Con poca flota y mucha demanda, sobrevender no es una molestia, es una cancelación y una reseña mala.',
    temporada:
      'Cruceros de octubre a marzo y temporada de nieve en invierno. Prácticamente no hay temporada baja, hay dos altas distintas.',
    flota:
      'Compactos y SUV, casi todos ocupados. Con la flota al límite, el cupo real por fecha deja de ser una comodidad y pasa a ser lo que evita el problema.',
    modulo: 'ocupacion',
    description:
      'Software para rent a car en Ushuaia: cupo real por fecha para flotas chicas, temporada de cruceros y de nieve, y una web que nunca vende un auto ocupado.',
    citable:
      'Ushuaia tiene una flota de alquiler chica y una demanda muy concentrada. La temporada de cruceros va de octubre a marzo y en invierno llega la nieve, así que casi no hay temporada baja. Con tan pocas unidades, una reserva vendida dos veces deja a un cliente sin auto y sin otra rentadora con lugar.',
    operacion:
      'Casi todo cliente llega en avión, con la reserva hecha desde su casa, y quiere el auto en el aeropuerto. Los recorridos son cortos pero exigentes: el Parque Nacional, la Ruta 3 hacia Tolhuin y el Paso Garibaldi, con hielo y nieve buena parte del año. En invierno, el que va al Cerro Castor pregunta por cubiertas y cadenas. Reponer una unidad es lento porque los repuestos y los autos llegan desde lejos. Un auto en el taller puede faltar varias semanas, y en temporada eso son muchos alquileres perdidos. Por eso la flota se mira por fecha y cada bloqueo por taller cuenta.',
    preguntas: [
      {
        p: '¿Cómo evito vender un auto que está en el taller?',
        r: 'El cupo descuenta lo que está bloqueado por taller en esas fechas. Cuando cargás una reserva, el sistema muestra cuántas unidades quedan de verdad, y la web nunca vende un auto ocupado.',
      },
      {
        p: '¿Cómo sé cuándo vence la VTV de un auto que no puedo reemplazar rápido?',
        r: 'Cada documento del auto se carga con su vigencia, y 31 reglas de aviso corren cada 30 minutos. El aviso queda en la campana del panel con tiempo para hacer el trámite sin sacar el auto de temporada.',
      },
      {
        p: '¿Puedo cobrar distinto la temporada de cruceros y la de nieve?',
        r: 'Sí. Se cargan como dos temporadas, cada una con sus fechas y su precio, y el motor aplica la que corresponde a cada día sin que nadie cambie la tarifa.',
      },
    ],
    para: 'rent-a-car-de-aeropuerto',
  },
  {
    slug: 'rosario',
    ciudad: 'Rosario',
    provincia: 'Santa Fe',
    aeropuerto: 'Aeropuerto Internacional Rosario Islas Malvinas',
    mercado:
      'Rosario es plaza de empresas. El agro, la industria y los puertos del Gran Rosario mueven alquileres de varios días a lo largo de todo el año. El cliente pide factura, muchas veces paga a plazo, y vuelve cada mes con otro técnico o con otro gerente que viene de afuera.',
    temporada:
      'Demanda pareja todo el año, con más movimiento en la cosecha gruesa, entre el otoño y el comienzo del invierno. En enero lo corporativo afloja.',
    flota:
      'Sedanes y compactos para gerentes y visitas, y pick-ups para el que tiene que entrar al campo o a una planta. La misma empresa alquila las dos cosas, a veces en la misma semana.',
    modulo: 'caja',
    description:
      'Software para rent a car en Rosario: alquileres a empresas del agro y de los puertos, cuenta corriente a plazo y los conductores declarados en cada contrato.',
    citable:
      'Rosario es una plaza de alquiler de autos corporativo, con demanda pareja todo el año. La mueven el agro, la industria y los puertos del Gran Rosario, con clientes que alquilan varios días y pagan a plazo contra factura. La temporada pesa poco y la cuenta corriente pesa mucho.',
    operacion:
      'El llamado típico viene de una administración y no de un particular. Piden un auto para alguien que llega el lunes al aeropuerto, se queda la semana y recorre plantas en San Lorenzo o campos del sur de la provincia. Muchas veces firma el representante de la empresa y maneja otra persona. A fin de mes la factura se presenta contra la orden de compra y el pago llega a 30 o 60 días. Si la planilla no dice qué alquiler es de qué empresa, el reclamo de la deuda se hace a ciegas. En cosecha aparecen además las pick-ups que vuelven del campo con barro hasta las puertas.',
    preguntas: [
      {
        p: '¿Puedo tener a la empresa como cliente y a cada técnico como conductor?',
        r: 'Sí. La ficha de la empresa lleva a su representante, y cada contrato admite hasta tres conductores, que se eligen de la ficha o se dan de alta en el momento. El contrato imprime quién firma.',
      },
      {
        p: '¿Cómo sé qué empresa me debe desde hace más tiempo?',
        r: 'En la cuenta corriente, dentro de Caja: la deuda de cada cliente se reparte en cuatro tramos de antigüedad. Además, A cobrar lista cada alquiler con saldo y los días que pasaron desde la devolución.',
      },
      {
        p: 'Las empresas me piden factura y remito. ¿Quedan registrados en el sistema?',
        r: 'Sí. Las facturas, notas de crédito, notas de débito y remitos se registran con su PDF adjunto, atados al alquiler y a la cuenta corriente. La factura electrónica la seguís emitiendo donde la emitís hoy.',
      },
    ],
    para: 'alquiler-a-empresas',
  },
  {
    slug: 'el-calafate',
    ciudad: 'El Calafate',
    provincia: 'Santa Cruz',
    aeropuerto: 'Aeropuerto Internacional Comandante Armando Tola',
    mercado:
      'El Calafate vive del Glaciar Perito Moreno y de lo que se recorre desde ahí: El Chaltén, las estancias y la Ruta 40. La demanda se concentra en pocos meses y llega casi entera en avión, con la reserva hecha desde lejos. Fuera de temporada, buena parte de la flota queda parada.',
    temporada:
      'De octubre a abril, con el pico entre diciembre y febrero y en Semana Santa. En invierno el movimiento cae mucho.',
    flota:
      'Compactos y SUV, con más pedido de SUV para el que va a hacer Ruta 40 o caminos de ripio. Con pocos meses para facturar, cada auto parado en enero es plata que no vuelve.',
    modulo: 'tu-web',
    description:
      'Software para rent a car en El Calafate: temporada de octubre a abril, reservas web cobradas antes de que el cliente aterrice y daños con fotos al volver.',
    citable:
      'El Calafate tiene una temporada de alquiler de autos concentrada entre octubre y abril, con el Glaciar Perito Moreno como destino principal y El Chaltén y la Ruta 40 como recorridos largos. Casi todos los clientes llegan en avión y reservan antes de viajar. Una rentadora de ahí factura el año en pocos meses, así que no puede perder reservas ni tener autos parados en enero.',
    operacion:
      'El día se ordena con los horarios de los vuelos. Los autos se entregan en el aeropuerto, lejos del pueblo, y muchos clientes los tienen dos o tres días: uno para el glaciar y otro para ir y volver de El Chaltén. El viento también es parte del trabajo. Una puerta que se abre de golpe con una ráfaga se dobla en las bisagras, y conviene advertirlo al entregar y revisarlo al devolver. Los que salen a la Ruta 40 o a las estancias vuelven con piedras en el parabrisas y polvo de ripio en todo el auto. En enero no sobra ni un auto. En junio sobran casi todos.',
    preguntas: [
      {
        p: '¿Puedo cobrar la reserva antes de que el cliente viaje?',
        r: 'Sí, desde tu web. El checkout tiene 4 pasos, el cupo queda retenido 20 minutos mientras el cliente paga por Mercado Pago o transferencia, y la reserva confirmada entra al calendario de ocupación.',
      },
      {
        p: '¿Cómo registro una puerta doblada por el viento?',
        r: 'Como cualquier daño: al devolver se carga con zona, tipo, severidad y fotos desde el celular. Queda atado a ese alquiler y a ese conductor, y se compara con lo que se vio en la entrega.',
      },
      {
        p: 'El aeropuerto queda lejos del pueblo. ¿Puedo cobrar la entrega ahí aparte?',
        r: 'Sí. La entrega en el aeropuerto se puede cargar como un extra, con su precio y cobro una sola vez, o el aeropuerto puede ser una sucursal más. Si algo se cobra en el momento de la entrega, se carga con motivo obligatorio.',
      },
    ],
    para: 'alquiler-turistico',
  },
  {
    slug: 'tucuman',
    ciudad: 'San Miguel de Tucumán',
    provincia: 'Tucumán',
    aeropuerto: 'Aeropuerto Internacional Teniente Benjamín Matienzo',
    mercado:
      'Tucumán mezcla dos clientes que alquilan distinto. Las empresas de la provincia alquilan entre semana, y el turismo sube a Tafí del Valle y cruza a los Valles Calchaquíes los fines de semana y en vacaciones. El mismo auto puede pasar de un cliente al otro en la misma semana.',
    temporada:
      'Julio, con las vacaciones de invierno, es el pico turístico. Se suman Semana Santa, enero y los fines de semana largos. Lo corporativo es más parejo y se mueve con la zafra.',
    flota:
      'Compactos y sedanes para la ciudad y para la empresa, y SUV o camionetas para la cuesta de Tafí y el ripio de los valles. La categoría se elige pensando en la ruta que va a hacer el cliente.',
    modulo: 'clientes',
    description:
      'Software para rent a car en Tucumán: empresas entre semana y turismo a Tafí del Valle en julio, con precio por temporada y clientes particulares o empresas.',
    citable:
      'Tucumán combina alquiler de autos corporativo durante la semana con turismo hacia Tafí del Valle y los Valles Calchaquíes. El pico turístico es julio, con las vacaciones de invierno, y se suman Semana Santa y los fines de semana largos. Una rentadora de ahí atiende con la misma flota a la empresa que paga a plazo y al turista que paga por adelantado.',
    operacion:
      'El lunes salen sedanes para gente que viene a trabajar con ingenios, citrícolas o comercios, y el viernes salen las SUV para la Ruta 307. La subida a Tafí es una cuesta de muchas curvas. El que sigue por el Abra del Infiernillo hasta Amaicha o Cafayate hace muchos kilómetros de montaña, y el que se mete en los caminos de los valles encuentra tramos de ripio. En julio cambia todo. Familias de Tucumán y de otras provincias del norte llenan la flota, y los fines de semana se cobran como temporada alta. El mostrador tiene que saber rápido si atiende a una empresa con cuenta corriente o a un particular que paga en el momento.',
    preguntas: [
      {
        p: '¿Puedo atender en el mismo sistema a una empresa y a un turista?',
        r: 'Sí. Cada cliente se carga como particular o como empresa, y la empresa lleva a su representante. El turista paga en el momento o por la web, y la empresa puede trabajar en cuenta corriente.',
      },
      {
        p: '¿Cómo cobro más caras las vacaciones de julio?',
        r: 'Con una temporada cargada con las fechas de las vacaciones de invierno. El motor aplica ese precio solo esos días, el mismo en la web y en el mostrador, y después vuelve al que corresponde.',
      },
      {
        p: '¿Qué auto le doy al que va a los Valles Calchaquíes?',
        r: 'Depende del recorrido, y con el auto cambia la franquicia. Cada categoría tiene su tarifa base y su franquicia, así que una SUV para los valles se cotiza distinto de un compacto para la ciudad, y la cobertura elegida dice a cuánto baja la franquicia.',
      },
    ],
    para: 'alquiler-turistico',
  },
];

export function plaza(slug: string): Plaza | undefined {
  return PLAZAS.find((p) => p.slug === slug);
}
