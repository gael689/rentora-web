/* ── Cómo elegir ──────────────────────────────────────────────────────────────
 *
 * Doce preguntas. La mitad las contesta bien cualquier proveedor serio; la otra mitad es donde
 * se separan, y son justamente las que a Rentora le conviene que se hagan. Eso no se disimula:
 * la página lo dice.
 *
 * Sin nombrar competidores. La comparación la hace el que lee, con el proveedor que tenga
 * enfrente. */
export type Pregunta = {
  q: string;
  porque: string;
  /** Qué contesta Rentora. Va aparte y rotulado, para que no se lea como si la pregunta
   *  estuviera escrita a medida — aunque en parte lo esté. */
  rentora: string;
};

export const CHECKLIST: Pregunta[] = [
  {
    q: '¿El cupo se calcula sobre la flota real o sobre un número que cargo yo?',
    porque:
      'Es la diferencia entre que el sistema te frene una sobreventa y que te deje hacerla. Si el cupo es un número escrito a mano, se desactualiza el primer día.',
    rentora: 'Sobre la flota real y por fecha. El calendario muestra una fila por unidad.',
  },
  {
    q: '¿El precio de un feriado sale solo o hay que acordarse de cargarlo?',
    porque:
      'Un tarifario plano obliga a que alguien se acuerde, todos los años, de subir el fin de semana largo. El día que nadie se acuerda, se vende a precio de martes.',
    rentora: 'Tres capas de calendario: temporada, feriado y duración. Se cargan una vez.',
  },
  {
    q: 'Si doy de baja una promoción, ¿vuelve solo el precio anterior?',
    porque:
      'Si la promo pisó el precio, terminarla significa volver a cargar el viejo, y el día que alguien se olvida se vende a precio de promoción fuera de fecha.',
    rentora: 'Las capas se superponen: la promo nunca reemplazó al precio de abajo.',
  },
  {
    q: '¿La web y el mostrador venden sobre el mismo cupo y el mismo precio?',
    porque:
      'Si cada canal tiene su propio stock o su propia tarifa, tarde o temprano se vende dos veces el mismo auto, o el mismo auto a dos precios.',
    rentora:
      'Un solo precio y un solo cupo. Cada reserva conserva su origen, web o mostrador, para poder filtrarlas.',
  },
  {
    q: 'Un contrato firmado hace dos años, ¿se reimprime con el texto de entonces?',
    porque:
      'Si el sistema reimprime el clausulado vigente, el papel dice cosas que el cliente nunca firmó. Delante de un abogado eso es peor que no tener nada.',
    rentora: 'Cada contrato guarda un snapshot congelado del texto del día de la firma.',
  },
  {
    q: '¿Qué pasa si mi cliente firma en papel?',
    porque:
      'Media Argentina firma en papel. Un sistema que sólo contempla la firma digital te obliga a mantener dos archivos en paralelo, que en la práctica significa dejar de usar el sistema.',
    rentora: 'En pantalla, por link remoto revocable, o adjuntando el escaneo del papel.',
  },
  {
    q: '¿Me avisa antes de que venza la VTV o la póliza, o tengo que mirarlo yo?',
    porque:
      'Un listado de vencimientos que hay que ir a mirar es un listado que nadie mira. El aviso tiene que llegar solo, a un lugar donde ya estés.',
    rentora: '31 reglas que corren cada 30 minutos y dejan el aviso en la campana del sistema.',
  },
  {
    q: 'Cuando llega un acta de hace tres meses, ¿el sistema sabe quién manejaba?',
    porque:
      'Sin eso, la multa se paga sola o se pierde una tarde cruzando fechas contra contratos en papel.',
    rentora: 'Con la fecha del hecho encuentra el alquiler vigente y el conductor responsable.',
  },
  {
    q: '¿Sé cuánto me deben mis clientes y desde cuándo?',
    porque:
      '"Me debe un millón" y "me debe un millón desde hace tres meses" no son la misma frase, y sólo una de las dos sirve para decidir si le seguís alquilando.',
    rentora: 'La pestaña A cobrar lista cada alquiler con saldo y los días desde la devolución.',
  },
  {
    q: '¿La web con motor de reservas está incluida o se cotiza aparte?',
    porque:
      'Es la pregunta que más plata mueve y casi nadie la hace a tiempo. Un motor de reservas hecho después, por otro proveedor, cuesta más que el sistema.',
    rentora: 'Incluida en el plan Gestión + Web: el panel más el sitio propio con checkout y cobro online. Si ya tenés web, el plan Gestión va sin ella.',
  },
  {
    q: '¿Emite factura electrónica?',
    porque:
      'Si la emitís desde otro lado, no es un problema: es un paso más. Pero conviene saberlo antes y no en la segunda semana de uso.',
    rentora:
      'No. Registra comprobantes con su PDF y los ata al alquiler; la factura electrónica se emite donde la emitís hoy. Los recibos de cobro sí salen numerados del sistema.',
  },
  {
    q: '¿Quién carga mi flota, mis tarifas y mi clausulado?',
    porque:
      'Un sistema excelente con la base vacía no sirve para nada, y la carga inicial es donde mueren la mitad de las implementaciones.',
    rentora: 'La carga es parte de la implementación. Vos ponés la información.',
  },
];

