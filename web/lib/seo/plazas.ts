/* ── Las plazas ───────────────────────────────────────────────────────────────
 *
 * Nueve y no veinte. Cada una recortada a ~200 palabras con lo que cambia de verdad —aeropuerto,
 * cuándo se llena, qué flota pesa, un dato operativo local y una pregunta propia— porque nueve páginas con sustancia rankean y veinte plantillas rellenadas son
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
  /** Un dato operativo que solo es cierto ahí, una oración (≤ 25 palabras). */
  dato: string;
  /** Una pregunta que solo tiene sentido en esa plaza. */
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
    temporada:
      'Invierno de junio a septiembre, con el pico en las vacaciones de julio, y verano en enero y febrero. Entre medio, dos temporadas bajas largas donde el precio tiene que bajar solo.',
    flota:
      'SUV y 4x4 con cadenas en invierno; compactos y sedanes el resto del año. La misma unidad cambia de precio según la estación, que es exactamente lo que resuelven las capas de temporada.',
    modulo: 'precios',
    description:
      'Software para rent a car en Bariloche: precio por temporada de invierno y de verano, reservas web cobradas antes del viaje y la flota de 4x4 a la vista.',
    citable:
      'Bariloche tiene dos temporadas altas por año: el invierno, con el pico en las vacaciones de julio, y el verano de enero y febrero. Casi toda la demanda de alquiler de autos llega en avión y reserva antes de viajar. Por eso una rentadora de Bariloche necesita un tarifario que cambie solo con la estación y una web que cobre la reserva.',
    // REVISAR GAEL: un dato operativo local (reemplaza el párrafo largo de operación).
    dato:
      'En invierno las 4x4 salen con cadenas, que se cobran como extra con tope de cantidad.',
    preguntas: [
      {
        p: '¿Cómo cobro las cadenas en invierno?',
        r: 'Como un extra, con su precio y un tope de cantidad, que se suma a la reserva solo cuando el cliente lo pide. Así la tarifa del auto no cambia y las cadenas quedan cargadas en ese alquiler.',
      },
    ],
    para: 'alquiler-turistico',
  },
  {
    slug: 'neuquen',
    ciudad: 'Neuquén',
    provincia: 'Neuquén',
    aeropuerto: 'Aeropuerto Presidente Perón',
    temporada:
      'Demanda pareja todo el año, con picos cuando hay paradas de planta. Lo que manda no es la temporada sino el contrato mensual.',
    flota:
      'Pick-ups doble cabina, muchas de ellas en alquiler mensual con kilometraje libre dentro de la provincia. El cotizador y la caja, con sus cuentas corrientes, son lo que más se mira.',
    modulo: 'caja',
    description:
      'Software para rent a car en Neuquén: pick-ups por mes para empresas, cuenta corriente a 30 o 60 días y la deuda ordenada por antigüedad en un solo sistema.',
    citable:
      'Neuquén es una plaza de alquiler corporativo. El cliente típico es una empresa que trabaja en los yacimientos, alquila pick-ups por mes y paga a 30 o 60 días. Ahí la cuenta corriente es el modo normal de cobrar, y el control de la deuda pesa más que el tarifario.',
    // REVISAR GAEL: un dato operativo local (reemplaza el párrafo largo de operación).
    dato:
      'La camioneta la maneja la cuadrilla: hasta tres conductores declarados por contrato, por si llega una multa.',
    preguntas: [
      {
        p: '¿Puedo alquilarle a una empresa por mes y cobrarle a 60 días?',
        r: 'Sí. La empresa trabaja en cuenta corriente, a contado, 15, 30, 60 o 90 días, y cada alquiler suma a su saldo. La deuda se reparte en cuatro tramos de antigüedad, así ves qué parte está atrasada.',
      },
    ],
    para: 'alquiler-de-camionetas-y-utilitarios',
  },
  {
    slug: 'mendoza',
    ciudad: 'Mendoza',
    provincia: 'Mendoza',
    aeropuerto: 'Aeropuerto El Plumerillo',
    temporada:
      'Enero y febrero, la vendimia en marzo, y la temporada de nieve entre junio y agosto. Tres picos, cada uno con su precio.',
    flota:
      'Compactos y sedanes para el circuito de bodegas, SUV para alta montaña. Las coberturas pesan: el que cruza a Chile pregunta primero por la franquicia.',
    modulo: 'categorias-y-coberturas',
    description:
      'Software para rent a car en Mendoza: precios para verano, vendimia y nieve, reservas web cobradas por adelantado y coberturas con su franquicia a la vista.',
    citable:
      'Mendoza tiene tres picos de demanda de alquiler de autos por año: el verano, la vendimia de marzo y la temporada de nieve. Una parte grande de los clientes llega del exterior y reserva online con semanas de anticipación. Muchos cruzan a Chile por el paso Cristo Redentor, y antes de alquilar preguntan por la franquicia.',
    // REVISAR GAEL: un dato operativo local (reemplaza el párrafo largo de operación).
    dato:
      'Quien cruza a Chile necesita autorización del titular y seguro del otro lado, antes del retiro.',
    preguntas: [
      {
        p: '¿Cómo le explico la franquicia a un cliente que va a cruzar a Chile?',
        r: 'Con la cobertura elegida a la vista. Cada categoría tiene su franquicia base, cada cobertura dice a cuánto la baja, y el documento de la franquicia se genera junto al contrato para que lo firme el deudor.',
      },
    ],
    para: 'alquiler-turistico',
  },
  {
    slug: 'salta',
    ciudad: 'Salta',
    provincia: 'Salta',
    aeropuerto: 'Aeropuerto Martín Miguel de Güemes',
    temporada:
      'Julio y enero son los picos, más Semana Santa y los fines de semana largos, que en el norte se sienten fuerte.',
    flota:
      'Camionetas y 4x4 para ruta de ripio y altura. El control de daños al devolver importa más que en ciudad: el auto vuelve de caminos que lo castigan.',
    modulo: 'multas-y-danos',
    description:
      'Software para rent a car en Salta: alquileres de varios días para hacer circuito, extensiones con su propio precio y daños con fotos al volver del ripio.',
    citable:
      'En Salta casi todo alquiler de auto es para hacer circuito: Cafayate, Cachi, la Quebrada de Humahuaca y la Puna. Son alquileres de varios días, por rutas con tramos de ripio y altura, y la fecha de devolución cambia más seguido que en otras plazas. Los picos son julio, enero, Semana Santa y los fines de semana largos.',
    // REVISAR GAEL: un dato operativo local (reemplaza el párrafo largo de operación).
    dato:
      'Con ripio rumbo a Cachi o Cafayate, la recepción se hace con fotos, comparando contra la salida.',
    preguntas: [
      {
        p: 'Si el cliente llama desde Cafayate para quedarse un día más, ¿cómo lo cargo?',
        r: 'Como una extensión, que es un alquiler nuevo con su propio precio por día y su propio cobro. El precio se puede editar si lo pactaste distinto por teléfono, y el contrato se regenera con las fechas nuevas.',
      },
    ],
    para: 'alquiler-turistico',
  },
  {
    slug: 'cordoba',
    ciudad: 'Córdoba',
    provincia: 'Córdoba',
    aeropuerto: 'Aeropuerto Ambrosio Taravella',
    temporada:
      'Enero y febrero por las sierras, y fines de semana largos durante todo el año, que en Córdoba mueven tanto como una quincena de verano.',
    flota:
      'Compactos y sedanes en volumen, con rotación rápida. Con rotación rápida, el calendario de ocupación y el panel del día pasan a ser la pantalla que se mira todo el tiempo.',
    modulo: 'ocupacion',
    description:
      'Software para rent a car en Córdoba: precio fino por temporada y por fin de semana largo, y un calendario de ocupación por auto para la rotación rápida.',
    citable:
      'Córdoba tiene demanda de alquiler de autos todo el año y mucha competencia entre rentadoras. El verano en las sierras y los fines de semana largos mueven la mayor parte del volumen turístico. Con márgenes ajustados, la diferencia la hace cobrar bien cada fecha especial y no dejar autos parados entre un alquiler y otro.',
    // REVISAR GAEL: un dato operativo local (reemplaza el párrafo largo de operación).
    dato:
      'Tras un fin de semana largo vuelven casi todos juntos: el calendario del día se mira todo el tiempo.',
    preguntas: [
      {
        p: '¿Cómo cobro más el fin de semana largo sin cambiar la tarifa a mano?',
        r: 'Con la capa de feriados. Los fines de semana largos se cargan una vez en el año y el motor les suma su recargo encima de la temporada, con el mismo precio en la web y en el mostrador.',
      },
    ],
    para: 'rent-a-car-de-aeropuerto',
  },
  {
    slug: 'ushuaia',
    ciudad: 'Ushuaia',
    provincia: 'Tierra del Fuego',
    aeropuerto: 'Aeropuerto Malvinas Argentinas',
    temporada:
      'Cruceros de octubre a marzo y temporada de nieve en invierno. Prácticamente no hay temporada baja, hay dos altas distintas.',
    flota:
      'Compactos y SUV, casi todos ocupados. Con la flota al límite, el cupo real por fecha deja de ser una comodidad y pasa a ser lo que evita el problema.',
    modulo: 'ocupacion',
    description:
      'Software para rent a car en Ushuaia: cupo real por fecha para flotas chicas, temporada de cruceros y de nieve, y una web que nunca vende un auto ocupado.',
    citable:
      'Ushuaia tiene una flota de alquiler chica y una demanda muy concentrada. La temporada de cruceros va de octubre a marzo y en invierno llega la nieve, así que casi no hay temporada baja. Con tan pocas unidades, una reserva vendida dos veces deja a un cliente sin auto y sin otra rentadora con lugar.',
    // REVISAR GAEL: un dato operativo local (reemplaza el párrafo largo de operación).
    dato:
      'Un auto en el taller falta semanas y en temporada son alquileres perdidos: cada bloqueo cuenta.',
    preguntas: [
      {
        p: '¿Cómo evito vender un auto que está en el taller?',
        r: 'El cupo descuenta lo que está bloqueado por taller en esas fechas. Cuando cargás una reserva, el sistema muestra cuántas unidades quedan de verdad, y la web nunca vende un auto ocupado.',
      },
    ],
    para: 'rent-a-car-de-aeropuerto',
  },
  {
    slug: 'rosario',
    ciudad: 'Rosario',
    provincia: 'Santa Fe',
    aeropuerto: 'Aeropuerto Internacional Rosario Islas Malvinas',
    temporada:
      'Demanda pareja todo el año, con más movimiento en la cosecha gruesa, entre el otoño y el comienzo del invierno. En enero lo corporativo afloja.',
    flota:
      'Sedanes y compactos para gerentes y visitas, y pick-ups para el que tiene que entrar al campo o a una planta. La misma empresa alquila las dos cosas, a veces en la misma semana.',
    modulo: 'caja',
    description:
      'Software para rent a car en Rosario: alquileres a empresas del agro y de los puertos, cuenta corriente a plazo y los conductores declarados en cada contrato.',
    citable:
      'Rosario es una plaza de alquiler de autos corporativo, con demanda pareja todo el año. La mueven el agro, la industria y los puertos del Gran Rosario, con clientes que alquilan varios días y pagan a plazo. La temporada pesa poco y la cuenta corriente pesa mucho.',
    // REVISAR GAEL: un dato operativo local (reemplaza el párrafo largo de operación).
    dato:
      'Firma el representante de la empresa y maneja otra persona: la ficha de la empresa lleva a los dos.',
    preguntas: [
      {
        p: '¿Cómo sé qué empresa me debe desde hace más tiempo?',
        r: 'En la cuenta corriente, dentro de Caja: la deuda de cada cliente se reparte en cuatro tramos de antigüedad. Además, A cobrar lista cada alquiler con saldo y los días que pasaron desde la devolución.',
      },
    ],
    para: 'alquiler-a-empresas',
  },
  {
    slug: 'el-calafate',
    ciudad: 'El Calafate',
    provincia: 'Santa Cruz',
    aeropuerto: 'Aeropuerto Internacional Comandante Armando Tola',
    temporada:
      'De octubre a abril, con el pico entre diciembre y febrero y en Semana Santa. En invierno el movimiento cae mucho.',
    flota:
      'Compactos y SUV, con más pedido de SUV para el que va a hacer Ruta 40 o caminos de ripio. Con pocos meses para facturar, cada auto parado en enero es plata que no vuelve.',
    modulo: 'tu-web',
    description:
      'Software para rent a car en El Calafate: temporada de octubre a abril, reservas web cobradas antes de que el cliente aterrice y daños con fotos al volver.',
    citable:
      'El Calafate tiene una temporada de alquiler de autos concentrada entre octubre y abril, con el Glaciar Perito Moreno como destino principal y El Chaltén y la Ruta 40 como recorridos largos. Casi todos los clientes llegan en avión y reservan antes de viajar. Una rentadora de ahí factura el año en pocos meses, así que no puede perder reservas ni tener autos parados en enero.',
    // REVISAR GAEL: un dato operativo local (reemplaza el párrafo largo de operación).
    dato:
      'El viento dobla las puertas: se advierte al entregar y se revisa al devolver.',
    preguntas: [
      {
        p: '¿Puedo cobrar la reserva antes de que el cliente viaje?',
        r: 'Sí, desde tu web. El checkout tiene 4 pasos, el cupo queda retenido 20 minutos mientras el cliente paga por Mercado Pago o transferencia, y la reserva confirmada entra al calendario de ocupación.',
      },
    ],
    para: 'alquiler-turistico',
  },
  {
    slug: 'tucuman',
    ciudad: 'San Miguel de Tucumán',
    provincia: 'Tucumán',
    aeropuerto: 'Aeropuerto Internacional Teniente Benjamín Matienzo',
    temporada:
      'Julio, con las vacaciones de invierno, es el pico turístico. Se suman Semana Santa, enero y los fines de semana largos. Lo corporativo es más parejo y se mueve con la zafra.',
    flota:
      'Compactos y sedanes para la ciudad y para la empresa, y SUV o camionetas para la cuesta de Tafí y el ripio de los valles. La categoría se elige pensando en la ruta que va a hacer el cliente.',
    modulo: 'clientes',
    description:
      'Software para rent a car en Tucumán: empresas entre semana y turismo a Tafí del Valle en julio, con precio por temporada y clientes particulares o empresas.',
    citable:
      'Tucumán combina alquiler de autos corporativo durante la semana con turismo hacia Tafí del Valle y los Valles Calchaquíes. El pico turístico es julio, con las vacaciones de invierno, y se suman Semana Santa y los fines de semana largos. Una rentadora de ahí atiende con la misma flota a la empresa que paga a plazo y al turista que paga por adelantado.',
    // REVISAR GAEL: un dato operativo local (reemplaza el párrafo largo de operación).
    dato:
      'El mostrador tiene que saber rápido si atiende a una empresa con cuenta corriente o a un particular.',
    preguntas: [
      {
        p: '¿Puedo atender en el mismo sistema a una empresa y a un turista?',
        r: 'Sí. Cada cliente se carga como particular o como empresa, y la empresa lleva a su representante. El turista paga en el momento o por la web, y la empresa puede trabajar en cuenta corriente.',
      },
    ],
    para: 'alquiler-turistico',
  },
];

export function plaza(slug: string): Plaza | undefined {
  return PLAZAS.find((p) => p.slug === slug);
}
