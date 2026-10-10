/* El contenido de las páginas de captación.
 *
 * Tres piezas, y cada una ataca un momento distinto de la búsqueda:
 *
 * - **El glosario** contesta la pregunta de definición ("qué es la franquicia") que hace el que
 *   recién arranca. Es además el mejor material para los motores generativos: definiciones
 *   cortas, autónomas y citables, sin depender del párrafo anterior.
 * - **Cómo elegir** ataca la búsqueda de evaluación, que es la más cercana a la compra. Son
 *   doce preguntas para hacerle a cualquier proveedor, **sin nombrar a ninguno**: nombrarlos es
 *   regalarles una mención y abrir una discusión que no conviene.
 * - **Las plazas** son nueve y no veinte a propósito. Nueve páginas con contenido real de cada
 *   mercado rankean; veinte plantillas rellenadas son doorway pages y Google las castiga.
 *
 * Cada respuesta del glosario arranca contestando en una oración, sin rodeo. Un motor que cita
 * corta por el primer párrafo, y si el primer párrafo es un preámbulo, cita el preámbulo. */

import type { PreguntaFaq } from './tipos';

export type Termino = {
  slug: string;
  palabra: string;
  /** La definición, autónoma. Entre 40 y 60 palabras. */
  definicion: string;
  /** Cómo lo resuelve Rentora. Opcional: no todo término tiene que vender. */
  enRentora?: string;
  /** La operación donde se ve funcionando. */
  operacion?: string;
  /** Para la página propia del término: 80–140 palabras más allá de la definición, con un
   *  ejemplo concreto del mostrador. */
  ampliacion: string;
  /** Dos o tres preguntas propias del término. */
  preguntas: PreguntaFaq[];
  /** Slugs de otros términos que se confunden o se usan juntos. */
  relacionados: string[];
  /** ≤ 60 caracteres. */
  title: string;
  /** Entre 140 y 160 caracteres. */
  description: string;
};

export const GLOSARIO: Termino[] = [
  {
    slug: 'franquicia',
    palabra: 'Franquicia',
    definicion:
      'La franquicia es el monto máximo que el cliente paga de su bolsillo si daña el auto alquilado. Por encima de ese monto responde el seguro. En un alquiler de autos se define por categoría —una pick-up tiene franquicia más alta que un compacto— y las coberturas adicionales la bajan a cambio de un cargo por día.',
    enRentora:
      'Cada categoría trae su franquicia base y cada cobertura dice a cuánto la baja. Al generar el contrato se puede generar también el documento de la franquicia, que firma el deudor que elijas.',
    operacion: 'tomar-una-reserva',
    title: 'Qué es la franquicia en un alquiler de autos',
    description:
      'La franquicia es lo máximo que paga el cliente si daña el auto. Cómo se define por categoría, cómo la bajan las coberturas y qué la separa de la garantía.',
    ampliacion:
      'En el mostrador, la franquicia es la pregunta que más se repite y la que más se discute. Un ejemplo: un cliente alquila un compacto con una franquicia de 1.400.000 pesos y choca contra un poste. La reparación sale 2.000.000. El cliente paga hasta el monto de la franquicia y el resto lo cubre el seguro. Si hubiera tomado una cobertura que baja la franquicia a la mitad, pagaba 700.000. Por eso conviene que el cliente vea la cifra antes de firmar, por escrito, y que firme un documento aparte que la reconozca. La discusión que no se tiene en el mostrador es la que después llega por carta documento.',
    preguntas: [
      {
        p: '¿La franquicia y la garantía son lo mismo?',
        r: 'No. La franquicia es el tope de lo que paga el cliente si hay un daño, y la garantía es el monto que se le retiene en la tarjeta mientras dura el alquiler. Se usan juntas: la garantía asegura que la rentadora pueda cobrar la franquicia si hace falta.',
      },
      {
        p: '¿Quién firma el documento de la franquicia cuando alquila una empresa?',
        r: 'El deudor que elija la rentadora: la empresa, su representante o un conductor. Lo que importa es que firme quien va a responder si hay un daño.',
      },
      {
        p: '¿Una pick-up tiene la misma franquicia que un compacto?',
        r: 'No. La franquicia se define por categoría, y una pick-up suele tener una más alta porque repararla o reponerla sale más caro.',
      },
    ],
    relacionados: ['garantia', 'check-out', 'conductor-adicional'],
  },
  {
    slug: 'garantia',
    palabra: 'Garantía',
    definicion:
      'La garantía es el monto que la rentadora retiene —normalmente sobre una tarjeta de crédito— para cubrir daños, multas o cargos que aparezcan al devolver el auto. No es un cobro: es una retención que se libera cuando el alquiler cierra sin novedades.',
    enRentora:
      'La garantía queda registrada en el alquiler: el medio y el monto. Es otra cosa que la franquicia, que es un documento firmado.',
    operacion: 'recibir-el-auto',
    title: 'Qué es la garantía en un alquiler de autos',
    description:
      'La garantía es el monto que la rentadora retiene en la tarjeta del cliente para cubrir daños, multas o cargos al devolver el auto. Qué cubre y cuándo se libera.',
    ampliacion:
      'La garantía resuelve un problema práctico: cobrar algo después de que el cliente se fue. Un ejemplo: un cliente devuelve el auto un domingo con un cuarto de tanque, y lo había retirado lleno. Con la garantía retenida, la rentadora cobra el combustible que falta sin perseguirlo por teléfono. Si el auto vuelve bien, la retención se libera y el cliente no pagó nada de más. Lo que trae problemas es no anotar qué tarjeta quedó en garantía. Si a la semana aparece un daño que se vio tarde, hay que saber a qué tarjeta ir. Por eso conviene que la garantía quede registrada en el alquiler, con su medio y su monto, y no en un papel suelto.',
    preguntas: [
      {
        p: '¿La garantía se cobra?',
        r: 'No, se retiene. Es una reserva sobre el límite de la tarjeta que se libera cuando el alquiler cierra sin novedades, y solo pasa a ser un cobro si aparece un cargo.',
      },
      {
        p: '¿Se puede dejar la garantía en efectivo?',
        r: 'Depende de la rentadora. Lo habitual es la tarjeta de crédito, porque permite retener sin mover plata. Si se acepta efectivo, conviene dejar constancia de cuánto se recibió y devolverlo contra recibo.',
      },
      {
        p: '¿Qué pasa si la multa llega cuando la garantía ya se liberó?',
        r: 'Hay que cobrarla aparte, al cliente o al conductor responsable. Por eso importa poder encontrar qué alquiler estaba vigente el día del hecho y quién manejaba.',
      },
    ],
    relacionados: ['franquicia', 'check-out', 'late-check-in'],
  },
  {
    slug: 'cupo',
    palabra: 'Cupo',
    definicion:
      'El cupo es cuántas unidades de una categoría quedan realmente disponibles para un rango de fechas. No es la cantidad de autos que tiene la flota: es esa cantidad menos lo que ya está reservado, alquilado o bloqueado por taller en esos mismos días.',
    enRentora:
      'Se calcula por fecha sobre la flota real, y el alta de reserva lo muestra antes de dejarte confirmar. Es lo que evita vender dos veces el mismo auto.',
    operacion: 'tomar-una-reserva',
    title: 'Qué es el cupo en un rent a car',
    description:
      'El cupo es cuántos autos de una categoría quedan libres en un rango de fechas. Cómo se calcula sobre la flota y por qué evita vender dos veces el mismo auto.',
    ampliacion:
      'La diferencia entre flota y cupo se ve el jueves antes de un fin de semana largo. Una rentadora tiene seis SUV. Cuatro están reservadas del viernes al lunes, una está alquilada hasta el sábado y la otra está en el taller por un service. El jueves a la tarde hay cuatro SUV en el estacionamiento, pero el cupo para el viernes es cero. El que se guía por los autos que tiene delante vende uno que no existe. El problema crece cuando venden dos canales a la vez, el mostrador y la web, cada uno con su planilla. El cupo tiene que ser uno solo y calcularse por fecha.',
    preguntas: [
      {
        p: '¿El cupo es lo mismo que la disponibilidad de un auto?',
        r: 'Casi. El cupo se cuenta por categoría y por rango de fechas, y la disponibilidad suele hablar de una unidad concreta. Puede haber cupo de compactos aunque el compacto que el cliente quiere esté ocupado.',
      },
      {
        p: '¿Qué pasa con el cupo mientras un cliente paga en la web?',
        r: 'En Rentora queda retenido 20 minutos. Mientras dura esa retención, nadie más puede tomar esa unidad desde la web.',
      },
      {
        p: '¿Un auto en el taller descuenta cupo?',
        r: 'Sí, si está bloqueado para esas fechas. Un auto que no puede salir no se cuenta como disponible, aunque siga en la flota.',
      },
    ],
    relacionados: ['late-check-in', 'temporada', 'check-out'],
  },
  {
    slug: 'late-check-in',
    palabra: 'Late check-in',
    definicion:
      'El late check-in es la devolución tardía: el cliente entrega el auto después de la hora pactada. La práctica habitual es dar un período de gracia y, pasado ese margen, cobrar por hora o por día según cuánto se pasó.',
    enRentora:
      'Al recibir el auto hay 40 minutos de gracia y, pasado eso, cargo por hora. Al cotizar, una devolución una hora o más después del retiro suma un día solo.',
    operacion: 'recibir-el-auto',
    title: 'Qué es el late check-in en un alquiler de autos',
    description:
      'El late check-in es devolver el auto alquilado después de la hora pactada. Cómo funciona el período de gracia y cuándo se cobra por hora o por día de más.',
    ampliacion:
      'El late check-in parece un detalle hasta que el auto que vuelve tarde es el que tiene que salir después. Un ejemplo: un cliente pactó devolver a las 10 y llega a las 12:30. Mientras tanto, el cliente que retiraba ese mismo auto a las 11 está esperando en el mostrador. Con 40 minutos de gracia, el primero no paga nada si llega 10:35, y pasado ese margen corre el cargo por hora. El cargo cubre las horas de alquiler y también el costo de tener a otro cliente parado. Lo que conviene es que la regla esté escrita en el contrato y se aplique igual para todos, sin que el empleado decida en el momento cuánto perdonar.',
    preguntas: [
      {
        p: '¿Cuánto suele durar el período de gracia?',
        r: 'Depende de la rentadora, y lo habitual es entre media hora y una hora. En Rentora son 40 minutos, y pasado ese margen corre un cargo por hora.',
      },
      {
        p: '¿Cuándo una devolución tardía se cobra como un día más?',
        r: 'Cuando el atraso es largo, muchas rentadoras pasan del cargo por hora a cobrar el día. Al cotizar en Rentora, una devolución una hora o más después de la hora de retiro ya suma un día.',
      },
      {
        p: '¿El late check-in es lo mismo que una extensión?',
        r: 'No. La extensión se pacta antes y se carga como un alquiler nuevo, con su precio. El late check-in es un atraso que nadie avisó, y se cobra con la regla de demora.',
      },
    ],
    relacionados: ['check-out', 'garantia', 'cupo'],
  },
  {
    slug: 'clausulado-versionado',
    palabra: 'Clausulado versionado',
    definicion:
      'Un clausulado versionado es el texto del contrato guardado por versiones, con fecha. Cada contrato emitido queda atado a la versión vigente ese día, así que años después se puede reimprimir el texto exacto que esa persona firmó y no el que rige hoy.',
    enRentora:
      'Cada contrato guarda un snapshot congelado. Es la diferencia entre tener un contrato y tener una prueba: si el sistema reimprimiera el clausulado actual, el papel diría cosas que el cliente nunca firmó.',
    operacion: 'firmar-el-contrato',
    title: 'Qué es un clausulado versionado en un contrato',
    description:
      'Un clausulado versionado guarda cada versión del contrato con su fecha, para reimprimir años después el texto exacto que firmó el cliente aunque hoy rija otro.',
    ampliacion:
      'El problema aparece tarde, casi siempre con un abogado de por medio. Un ejemplo: en 2024 la cláusula de combustible decía que el faltante se cobraba a precio de surtidor. En 2025 la rentadora la cambió y ahora suma un cargo por servicio. En 2026 un cliente de 2024 reclama, y su abogado pide el contrato. Si el sistema reimprime el contrato con el texto vigente hoy, el papel dice algo que ese cliente nunca firmó, y la rentadora pierde la discusión con su propio documento. Con el clausulado versionado, la reimpresión sale con la cláusula de 2024. Lo mismo vale para la franquicia, el seguro o la jurisdicción.',
    preguntas: [
      {
        p: '¿Puedo cambiar una cláusula para un solo cliente?',
        r: 'Sí. En Rentora, antes de generar el contrato se editan las cláusulas que hagan falta. Quedan marcadas como modificadas, se puede volver al original, y el cambio vale solo para ese contrato.',
      },
      {
        p: '¿Qué pasa con los contratos viejos cuando cambio el clausulado?',
        r: 'Siguen diciendo lo que decían. Cada contrato queda atado a la versión vigente el día de la firma, así que cambiar el clausulado solo afecta a los contratos nuevos.',
      },
      {
        p: '¿Sirve si el cliente firmó en papel?',
        r: 'Sí. Se marca que firmó en papel y se sube el firmado, que queda adjunto al mismo contrato.',
      },
    ],
    relacionados: ['franquicia', 'conductor-adicional'],
  },
  {
    slug: 'cuenta-corriente',
    palabra: 'Cuenta corriente',
    definicion:
      'La cuenta corriente es el saldo que una empresa cliente mantiene con la rentadora cuando no paga al contado. Se factura el alquiler y se cobra a 15, 30, 60 o 90 días. El dato que importa no es sólo cuánto deben, sino desde cuándo.',
    enRentora:
      'Es una pestaña de Caja. Y la pestaña A cobrar lista cada alquiler con saldo y los días desde la devolución.',
    title: 'Qué es la cuenta corriente en un rent a car',
    description:
      'La cuenta corriente es el saldo de una empresa que alquila y paga a plazo. Cómo se factura a 15, 30, 60 o 90 días y por qué importa desde cuándo te deben.',
    ampliacion:
      'Una cuenta corriente sana y una peligrosa pueden tener el mismo saldo. Un ejemplo: dos empresas deben lo mismo. La primera alquila todos los meses y lo que debe son los alquileres de las últimas dos semanas. La segunda dejó de pagar hace tres meses y sigue alquilando. Mirando solo el total, son iguales. Mirando la antigüedad, a la segunda hay que llamarla hoy y quizás dejar de entregarle autos. Por eso la deuda se separa en tramos de antigüedad. También conviene que cada factura y cada remito queden atados al alquiler que los originó, porque la empresa siempre pregunta a qué corresponde cada importe.',
    preguntas: [
      {
        p: '¿Qué diferencia hay entre cuenta corriente y A cobrar?',
        r: 'La cuenta corriente es el saldo de un cliente que paga a plazo. A cobrar es la lista de alquileres con saldo pendiente, de cualquier cliente, con los días que pasaron desde la devolución.',
      },
      {
        p: '¿Le puedo seguir alquilando a una empresa que me debe?',
        r: 'Es una decisión comercial de cada rentadora. Lo importante es tomarla mirando desde cuándo debe y no solo cuánto, con el saldo a la vista antes de entregar el auto.',
      },
      {
        p: '¿La cuenta corriente reemplaza a la factura?',
        r: 'No. La factura se sigue emitiendo donde se emite hoy, y la cuenta corriente registra lo facturado y lo cobrado. En Rentora las facturas, notas de crédito y remitos se cargan con su PDF y quedan atados al alquiler.',
      },
    ],
    relacionados: ['a-cobrar', 'echeq', 'reparto-entre-socios'],
  },
  {
    slug: 'echeq',
    palabra: 'Echeq',
    definicion:
      'Un echeq es un cheque electrónico: se emite y se endosa de forma digital, con la misma lógica de pago diferido que el cheque en papel. Mientras está en cartera no es dinero cobrado —puede rechazarse— y por eso no debería contarse como ingreso hasta que se acredite.',
    enRentora:
      'Los echeqs tienen su pestaña en Caja, con estados (en cartera, depositado, endosado, rechazado, cobrado). Uno en cartera no es plata cobrada.',
    title: 'Qué es un echeq y cómo se registra en un rent a car',
    description:
      'Un echeq es un cheque electrónico de pago diferido. Por qué uno en cartera todavía no es plata cobrada y cómo seguir sus estados hasta que se acredita.',
    ampliacion:
      'En el alquiler a empresas el echeq es un medio de pago habitual, y el riesgo está en cómo se lo cuenta. Un ejemplo: una empresa paga un mes de alquiler con un echeq a 60 días. Ese día la caja parece cerrada, pero la plata no está. Si en el medio el echeq se endosa a un proveedor y después lo rechazan, el proveedor le reclama a la rentadora y el cliente sigue sin pagar. Por eso cada echeq se sigue por estados: en cartera, depositado, endosado, rechazado o cobrado. Y conviene mirar cada semana cuáles vencen en los próximos días, para depositarlos a tiempo y saber qué cobro viene.',
    preguntas: [
      {
        p: '¿Un echeq en cartera cuenta como ingreso?',
        r: 'No. Mientras está en cartera puede rechazarse, así que se lo cuenta aparte del cobro hasta que se acredita. En Rentora los echeqs tienen su pestaña en Caja, separados de lo cobrado.',
      },
      {
        p: '¿Qué pasa si se rechaza un echeq que endosé?',
        r: 'El que lo recibió te lo reclama a vos, y la deuda del cliente que lo emitió sigue abierta. Por eso el rechazo tiene que quedar registrado en el echeq y no solo en la memoria de quien lo atendió.',
      },
      {
        p: '¿Cómo sé qué echeqs vencen esta semana?',
        r: 'En Rentora se ordenan en secciones: vencidos, próximos 7 días y en cartera. Así se ve de un vistazo qué hay que depositar.',
      },
    ],
    relacionados: ['cuenta-corriente', 'a-cobrar', 'reparto-entre-socios'],
  },
  {
    slug: 'temporada',
    palabra: 'Temporada',
    definicion:
      'La temporada es el período del año que modifica la tarifa: alta, media o baja. En el alquiler de autos en Argentina suele combinarse con feriados y fines de semana largos, que se cobran por encima de la temporada que estén atravesando.',
    enRentora:
      'Es la primera de las tres capas del motor de precios. Se carga una vez y el precio sale solo todos los días del año. El precio es único: el mismo en la web y en el mostrador.',
    operacion: 'cargar-una-promo',
    title: 'Qué es la temporada en el precio de un alquiler de autos',
    description:
      'La temporada es el período del año que cambia la tarifa de alquiler: alta, media o baja. Cómo se combina con feriados, fines de semana largos y duración.',
    ampliacion:
      'La temporada sola no alcanza para poner precio, y se nota en los fines de semana largos. Un ejemplo: una rentadora de sierras tiene abril cargado como temporada media. Ese año Semana Santa cae en abril, y esos días la demanda se parece a la de enero. Si la tarifa solo mira la temporada, esos cuatro días se venden a precio de abril. Con los feriados en una capa aparte, el recargo se suma encima de la temporada media sin tocarla. La tercera pieza es la duración: el que alquila siete días en enero no paga lo mismo por día que el que alquila dos. Cargadas las tres cosas una vez, el precio de cada día sale solo.',
    preguntas: [
      {
        p: '¿Cuántas temporadas conviene tener?',
        r: 'Las que tenga tu plaza. Una ciudad con un solo verano fuerte puede andar con alta y baja, y una plaza con nieve y verano necesita dos altas separadas. Lo que importa es que cada una tenga sus fechas cargadas y no dependa de que alguien cambie la tarifa a mano.',
      },
      {
        p: '¿El feriado se cobra encima de la temporada?',
        r: 'Sí, en la mayoría de las rentadoras. En Rentora los feriados y fines de semana largos son la segunda capa del motor de precios y se aplican sobre la temporada que estén atravesando.',
      },
      {
        p: '¿El precio por temporada es el mismo en la web y en el mostrador?',
        r: 'En Rentora sí. Hay un solo precio, y sale del mismo motor para los dos canales.',
      },
    ],
    relacionados: ['cupo', 'late-check-in'],
  },
  {
    slug: 'conductor-adicional',
    palabra: 'Conductor adicional',
    definicion:
      'Un conductor adicional es otra persona autorizada a manejar el auto alquilado, además de quien firma el contrato. Queda declarada en el contrato, y si hay una multa o un daño sirve para saber quién manejaba.',
    enRentora:
      'Cada contrato admite hasta tres conductores, que se eligen de la ficha del cliente o se dan de alta en el momento.',
    operacion: 'firmar-el-contrato',
    title: 'Qué es un conductor adicional en un alquiler de autos',
    description:
      'Un conductor adicional es otra persona autorizada a manejar el auto alquilado. Qué se le pide, cómo queda en el contrato y por qué importa si llega una multa.',
    ampliacion:
      'El conductor adicional importa más el día que aparece un problema que el día que se alquila. Un ejemplo: una pareja alquila un auto para las vacaciones y firma él. Ella maneja la mitad del viaje y una cámara de ruta le registra un exceso de velocidad. Tres meses después llega el acta. Si ella estaba declarada en el contrato, con su licencia registrada, la rentadora sabe a quién va la multa y el seguro la reconoce como conductora autorizada. Si no estaba, la discusión es con el que firmó, y si además hubo un choque la cobertura puede quedar en duda. Por eso conviene pedir la licencia de cada conductor antes de entregar las llaves.',
    preguntas: [
      {
        p: '¿Cuántos conductores adicionales puede tener un contrato?',
        r: 'Depende de la rentadora. En Rentora cada contrato admite hasta tres conductores, que se eligen de la ficha del cliente o se dan de alta en el momento.',
      },
      {
        p: '¿Qué pasa si maneja alguien que no está declarado?',
        r: 'Maneja fuera de lo que autoriza el contrato. Si hay un daño la cobertura puede quedar en discusión, y si llega una multa la rentadora no tiene a ese conductor registrado.',
      },
      {
        p: '¿Un conductor puede figurar en dos contratos a la vez?',
        r: 'Puede pasar. En Rentora, si un conductor ya tiene otro auto en esas fechas, el sistema avisa y te deja seguir.',
      },
    ],
    relacionados: ['franquicia', 'clausulado-versionado', 'garantia'],
  },
  {
    slug: 'a-cobrar',
    palabra: 'A cobrar',
    definicion:
      'Lo que ya se alquiló y todavía no se cobró entero. Importa menos cuánto es en total que desde hace cuántos días espera: un saldo de ayer y uno de hace un mes no se tratan igual.',
    enRentora:
      'Es una pestaña de Caja: cada alquiler con saldo, con los días desde la devolución, en rojo pasada la semana.',
    title: 'Qué es A cobrar en la caja de un rent a car',
    description:
      'A cobrar es lo que ya se alquiló y todavía no se cobró entero. Por qué importa más desde cuándo espera cada saldo que el total, y cómo se ordena por días.',
    ampliacion:
      'A cobrar es la lista que se mira para saber a quién llamar hoy. Un ejemplo: el lunes la rentadora tiene tres alquileres con saldo. Uno devolvió ayer y quedó en pagar el resto por transferencia. Otro es de una empresa con cuenta corriente a 30 días. El tercero es de un particular que devolvió hace diez días y no contesta los mensajes. El total junta los tres y no dice nada de esto. Los días desde la devolución sí. Al de ayer se lo espera, la empresa sigue su plazo y al de hace diez días hay que reclamarle ya. Por eso la lista se ordena por antigüedad y marca lo que pasó la semana.',
    preguntas: [
      {
        p: '¿A cobrar incluye las cuentas corrientes?',
        r: 'Incluye todo alquiler con saldo, sea de un particular o de una empresa. La cuenta corriente suma el detalle de cada cliente que paga a plazo, con su deuda por antigüedad.',
      },
      {
        p: '¿Desde cuándo se cuentan los días de un saldo?',
        r: 'Desde la devolución del auto. En Rentora la pestaña A cobrar muestra los días desde la devolución y pinta en rojo los saldos que pasaron la semana.',
      },
    ],
    relacionados: ['cuenta-corriente', 'echeq', 'reparto-entre-socios'],
  },
  {
    slug: 'reparto-entre-socios',
    palabra: 'Reparto entre socios',
    definicion:
      'Cuando la rentadora tiene más de un dueño, el reparto es dividir lo cobrado del mes según el porcentaje de cada socio y compensar lo que alguno cobró de más. Los gastos se ven aparte.',
    enRentora:
      'Es un adicional: se definen los socios y sus porcentajes, y el mes muestra quién le pasa cuánto a quién. El reparto se registra y se puede anular.',
    title: 'Cómo se hace el reparto entre socios de una rentadora',
    description:
      'El reparto entre socios divide lo cobrado del mes según el porcentaje de cada dueño y compensa lo cobrado de más. Cómo se calcula y dónde van los gastos.',
    ampliacion:
      'En una rentadora con dos o tres dueños, la plata no entra a una sola mano. Un ejemplo: dos socios al 50 por ciento. En el mes, uno cobró el efectivo del mostrador y el otro recibió las transferencias de las empresas. Al cierre, el primero tiene más de lo que le toca y el segundo tiene menos. El reparto calcula cuánto le corresponde a cada uno sobre lo cobrado y dice quién le pasa cuánto a quién para quedar parejos. Si alguien se equivocó al registrarlo, se anula y se vuelve a hacer. Lo que conviene es cargar los porcentajes una vez, que sumen 100, y que la cuenta del mes no dependa de la planilla de cada socio.',
    preguntas: [
      {
        p: '¿Los gastos se descuentan antes de repartir?',
        r: 'En Rentora los gastos se ven aparte del reparto. El reparto trabaja sobre lo cobrado del mes, y cada rentadora decide cómo tratan los socios los gastos.',
      },
      {
        p: '¿Qué pasa si los porcentajes no son iguales?',
        r: 'Se cargan como sean, mientras sumen 100. Un socio al 60 y otro al 40 reciben el reparto en esa proporción.',
      },
    ],
    relacionados: ['a-cobrar', 'cuenta-corriente', 'echeq'],
  },
  {
    slug: 'check-out',
    palabra: 'Check-out',
    definicion:
      'En el alquiler de autos, el check-out es la entrega: el momento en que el vehículo sale con el cliente. Se registran kilómetros, combustible, estado y fotos, que son la referencia contra la que se compara cuando el auto vuelve.',
    enRentora:
      'Antes de la entrega corre un semáforo: licencia, garantía y documentación. Es la misma lista que ya se vio al cargar la reserva.',
    operacion: 'entregar-el-auto',
    title: 'Qué es el check-out en un alquiler de autos',
    description:
      'El check-out es la entrega del auto alquilado. Qué se registra al salir, como kilómetros, combustible, estado y fotos, y por qué es la base de un reclamo.',
    ampliacion:
      'Casi todo lo que se discute al devolver se gana o se pierde en el check-out. Un ejemplo: el cliente devuelve el auto con un rayón en la puerta y dice que ya estaba. Si al entregar se registraron los daños previos con fotos, se compara y la discusión se termina en un minuto. Si no, queda la palabra del cliente contra la del empleado. Con el combustible pasa lo mismo. Si salió con tres cuartos y vuelve con un cuarto, el faltante se cobra sin dudas porque está anotado. El check-out se hace parado y con el cliente apurado, así que tiene que ser rápido: pocos toques, botones grandes y las fotos sacadas con el celular ahí mismo.',
    preguntas: [
      {
        p: '¿El check-out es la entrega o la devolución?',
        r: 'En el alquiler de autos, la entrega: es cuando el auto sale con el cliente, y la devolución se llama check-in. En hotelería es al revés, y por eso se confunde.',
      },
      {
        p: '¿Qué se revisa antes de entregar el auto?',
        r: 'La licencia del conductor, la garantía y la documentación. En Rentora corre un semáforo con esos tres puntos antes de la entrega, el mismo que ya se vio al cargar la reserva.',
      },
      {
        p: '¿Hace falta sacar fotos en la entrega?',
        r: 'Conviene siempre. Las fotos de los daños que el auto ya tenía son lo que termina la discusión del “ya estaba así” cuando vuelve.',
      },
    ],
    relacionados: ['late-check-in', 'garantia', 'franquicia'],
  },
];

