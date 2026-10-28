/* ── ¿Tu rentadora ya necesita un sistema? ────────────────────────────────────
 *
 * Autodiagnóstico para /como-elegir: diez señales ("si te pasa esto…"), cada una con una oración
 * o dos de la situación y cómo lo resuelve RentaGo, y un cierre que lleva a la compra. Se eligieron
 * las que responden búsquedas reales de quien evalúa un software de alquiler de autos: doble venta,
 * cobro de seña online, vencimientos, contratos y firma, cuenta corriente, pasar del Excel,
 * temporadas, web propia, varias sucursales y qué incluye y cómo se paga.
 *
 * REVISAR GAEL: todo el copy de esta página es propuesta (la ampliación de cinco a diez señales es
 * nueva). Sin nombrar competidores. Sin precios y sin facturación electrónica. Todo lo que se
 * afirma sale de `contenido.ts` y de los datos de /planes.
 *
 * Cada `titulo` está formulado como pregunta: es el texto visible y también el `name` de la
 * `Question` del `FAQPage` de la página, así el marcado dice lo mismo que se ve. */
export type Senal = {
  /** La señal, formulada como pregunta. */
  titulo: string;
  /** La situación, una o dos oraciones. */
  situacion: string;
  /** Cómo lo resuelve RentaGo, una o dos oraciones. */
  rentago: string;
  icono: string;
};

export const SENALES: Senal[] = [
  {
    titulo: '¿Vendiste dos veces el mismo auto?',
    situacion:
      'Cargaste dos reservas para la misma unidad y te enterás cuando el cliente ya está en el mostrador. La web y el mostrador llevan cuentas distintas.',
    rentago:
      'El cupo se calcula sobre la flota real y por fecha, con un solo precio y un solo cupo para la web y el mostrador. Tu web nunca vende un auto ocupado.',
    icono: 'calendario',
  },
  {
    titulo: '¿Sabés quién te debe y desde cuándo?',
    situacion:
      'Para saber cuánto te falta cobrar hay que revisar cuadernos, planillas y mensajes. “Me debe plata” y “me debe desde hace tres meses” no son lo mismo.',
    rentago:
      'La Caja lista cada alquiler con saldo y los días que pasaron desde la devolución, con cuenta corriente por cliente.',
    icono: 'billetera',
  },
  {
    titulo: '¿Se te vencen la VTV o el seguro sin darte cuenta?',
    situacion: 'Te enterás de que el papel venció cuando el auto ya salió, o cuando llega la multa.',
    rentago:
      'Cargás cada vencimiento una vez y el sistema te avisa solo, con 31 reglas de aviso que corren cada 30 minutos y dejan el aviso en la campana del panel.',
    icono: 'campana',
  },
  {
    titulo: '¿Cobrás la seña a mano?',
    situacion:
      'Cada reserva es una cadena de mensajes y comprobantes, y mientras tanto el auto queda sin confirmar o se lo lleva otro.',
    rentago:
      'En tu web el cliente paga la seña online, solo, y el auto queda retenido mientras paga. La reserva te llega confirmada.',
    icono: 'globo',
  },
  {
    titulo: '¿Sabés qué firmó tu cliente?',
    situacion:
      'Contratos en papel, en el celular o en un documento que se fue reescribiendo: cuando hay un reclamo, nadie sabe cuál era el texto del día de la firma.',
    rentago:
      'El contrato se firma en pantalla, por un link remoto o adjuntando el escaneo del papel, y guarda una copia congelada del texto del día de la firma.',
    icono: 'firma',
  },
  {
    titulo: '¿Tu Excel depende de una sola persona?',
    situacion:
      'Si esa persona no viene, nadie sabe cómo están las reservas, los precios ni los contratos. Y a medida que crece la flota, la planilla se rompe.',
    rentago:
      'Partimos de tu planilla o tu cuaderno: cargamos tu flota, tus tarifas y tu contrato tal como los tenés hoy. Todo queda en un sistema, con un rol para cada integrante del equipo.',
    icono: 'planilla',
  },
  {
    titulo: '¿Los feriados y las temporadas dependen de que alguien se acuerde?',
    situacion:
      'Un tarifario plano obliga a subir el fin de semana largo a mano todos los años. El día que nadie se acuerda, se alquila a precio de martes.',
    rentago:
      'El precio se arma en capas de calendario: temporada, feriados y descuentos por duración. Se cargan una vez y el sistema calcula cada día.',
    icono: 'etiquetas',
  },
  {
    titulo: '¿Tus clientes pueden reservar a cualquier hora?',
    situacion:
      'Si reservar depende de que alguien conteste el WhatsApp, las consultas de la noche y del fin de semana se van con otro.',
    rentago:
      'Tu propia web de reservas, con tu marca, muestra la disponibilidad real, calcula el precio final y toma el pago. La hacemos a medida, conectada a tu panel.',
    icono: 'globo',
  },
  {
    titulo: '¿Tenés más de una sucursal?',
    situacion:
      'Cuando el cliente retira en un lado y devuelve en otro, la flota, la caja y los avisos se desordenan entre sucursales.',
    rentago:
      'Cada sucursal tiene sus puntos de retiro y devolución y su caja, y el cliente puede retirar en una y devolver en otra.',
    icono: 'edificio',
  },
  {
    titulo: '¿Sabés qué incluye el sistema y cómo se paga?',
    situacion:
      'Muchos sistemas muestran un precio de entrada y después suman la implementación, la capacitación y el soporte por separado.',
    rentago:
      'Un pago único cubre la implementación, la web a medida y la capacitación; después, un mantenimiento mensual cubre el hosting, las actualizaciones y el soporte. El detalle está en Planes, y lo hablamos antes de empezar.',
    icono: 'documento',
  },
];
