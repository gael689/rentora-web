/* Las seis operaciones.
 *
 * No son pantallas del menú: son los momentos en que el sistema hace su trabajo. Y es donde
 * están la mitad de los diferenciales, porque son decisiones tomadas parado en un mostrador y
 * no funciones de un checklist.
 *
 * **Cada paso y cada número de este archivo está leído del código del sistema** (recontado el 06/10/2026), y la propiedad
 * `fuente` dice de dónde. Los cuarenta minutos de gracia son `GRACE_PERIOD_MINUTES`; los seis
 * pasos son `PASOS_WIZARD`; los tres caminos de firma son las tres mutaciones de
 * `useContratos.ts`. Si el sistema cambia una de esas reglas, esta página queda mintiendo — por
 * eso la fuente va escrita al lado.
 *
 * Un aviso sobre los nombres, que están al revés de lo que uno espera: en este sistema
 * **check-out es entregar** el auto y **check-in es recibirlo**. Por eso el cargo por devolución
 * tardía se llama "late check-in". La copy va en castellano —entregar y recibir— y el término
 * técnico aparece una sola vez, aclarado, para el que lo busca así. */

export type Paso = {
  n: number;
  titulo: string;
  detalle: string;
  /** El dato duro de ese paso: lo que el sistema calcula o impone. */
  dato?: string;
};

export type Operacion = {
  slug: string;
  nombre: string;
  /** El título de la página. Long-tail operativo; ninguno repite el término cabeza. */
  termino: string;
  /** La pregunta que se hace el dueño de la rentadora, con el problema encima. */
  pregunta: string;
  bajada: string;
  pasos: Paso[];
  /** Qué hace distinto a Rentora en esta operación. */
  diferencial: string;
  /** De dónde salió, en el repo del sistema. */
  fuente: string;
  /** La pantalla del panel donde vive, si tiene una. */
  pantalla?: string;
  /** Si hay réplica del momento clave. */
  momento?: string;
};

export const OPERACIONES: Operacion[] = [
  {
    slug: 'recibir-el-auto',
    nombre: 'Recibir el auto',
    termino: 'cómo cobrar una devolución tardía de un auto alquilado',
    pregunta: 'Devolvió el auto una hora y veinte tarde. ¿Le cobrás?',
    bajada:
      'Es la discusión más común del mostrador y la que más plata deja en el camino, porque se resuelve a ojo y siempre a favor del que reclama más fuerte. Rentora ya la tiene decidida: cuarenta minutos de gracia, y de ahí en más cargo por hora. No lo discutís vos con el cliente delante: lo dice el sistema.',
    pasos: [
      {
        n: 1,
        titulo: 'Fecha y hora de la devolución',
        detalle: 'Se registra cuándo volvió de verdad, no cuándo tenía que volver.',
        dato: 'La diferencia contra la hora pactada es lo que dispara todo lo que sigue.',
      },
      {
        n: 2,
        titulo: 'Late check-in',
        detalle:
          'Dentro de los primeros 40 minutos no hay cargo. Pasado eso, el sistema cuenta las horas excedidas y propone el cargo.',
        dato: '40 minutos de gracia · después, cargo por hora y cargo sugerido',
      },
      {
        n: 3,
        titulo: 'Combustible y limpieza',
        detalle:
          'Si falta nafta o vuelve sucio, se carga como gasto del vehículo. Cobrárselo al cliente existe, pero es la excepción que hay que tildar a mano.',
        dato: '“Caso excepcional: cobrarle al cliente en vez de gasto del vehículo”',
      },
      {
        n: 4,
        titulo: 'Daños',
        detalle:
          'El daño se carga con zona, tipo, severidad y fotos sacadas desde el celular. Cargarlo no cierra la devolución, y queda atado a ese alquiler y a ese conductor.',
        dato: 'Leve · Moderado · Grave, y el responsable: cliente, desgaste de uso o terceros',
      },
      {
        n: 5,
        titulo: 'Resolver la garantía',
        detalle:
          'Con todos los cargos sobre la mesa, el sistema dice cuánto se devuelve de la garantía y cuánto queda retenido.',
        dato: 'Monto a devolver, calculado, no estimado',
      },
      {
        n: 6,
        titulo: 'Resumen financiero',
        detalle:
          'Precio del alquiler, cargo por late check-in, anticipo ya pagado y saldo. Se cobra por el medio que sea y sale el recibo numerado. Lo que va a cuenta corriente se muestra aparte y no infla los ingresos.',
        dato: 'Los medios que configure la rentadora: efectivo, transferencia, tarjeta, Mercado Pago, cheque, echeq, cuenta corriente…',
      },
    ],
    diferencial:
      'Que la nafta que falta vaya por defecto como gasto del auto, y cobrársela al cliente sea la excepción que hay que tildar, es alguien que entendió cómo se trabaja de verdad. Al revés, el mostrador termina discutiendo por dos mil pesos de nafta con un cliente que vuelve todos los meses.',
    fuente: 'pages/reservas/CheckinModal.tsx · GRACE_PERIOD_MINUTES',
    pantalla: 'reservas',
    momento: 'devolucion',
  },
  {
    slug: 'tomar-una-reserva',
    nombre: 'Tomar una reserva',
    termino: 'cómo cargar una reserva de alquiler de autos sin sobrevender',
    pregunta: '¿Cómo sabés que ese auto está libre en esas fechas?',
    bajada:
      'Un solo botón, Nueva operación, con tres puertas: contrato de largo plazo, alquiler rápido o reserva completa. La reserva completa son seis pasos y ninguno tiene nombre de sistema: son preguntas. ¿Quién? ¿Cuándo y dónde? ¿Qué? ¿Cuánto? ¿Cómo se paga? Y un resumen antes de guardar.',
    pasos: [
      {
        n: 1,
        titulo: '¿Quién?',
        detalle: 'El cliente, y quién va a manejar si no es el mismo.',
        dato: 'Particular o empresa con su representante, y hasta 3 conductores por contrato',
      },
      {
        n: 2,
        titulo: '¿Cuándo y dónde?',
        detalle: 'Fechas, horarios y lugares de retiro y devolución, escritos libremente, con atajos a los lugares de siempre.',
        dato: 'Si el auto ya está tomado en esas fechas, avisa: podés cargarla igual y el auto queda pisado',
      },
      {
        n: 3,
        titulo: '¿Qué?',
        detalle:
          'El auto, o la categoría si todavía no se sabe cuál. Acá el sistema consulta el cupo real de esas fechas sobre la flota real.',
        dato: 'Si una devolución deja poco margen, avisa cuánto queda para prepararlo. Avisa, no bloquea',
      },
      {
        n: 4,
        titulo: '¿Cuánto?',
        detalle:
          'El precio lo trae el motor ya calculado —temporada, feriado y duración— y es uno solo, venda quien venda. Se cobra un día más si devuelve una hora o más después del horario de retiro, sin tildar nada. Arriba se suman los adicionales.',
        dato: 'Si el precio baja del de lista, pide el motivo y queda auditado',
      },
      {
        n: 5,
        titulo: '¿Cómo se paga?',
        detalle: 'Condición de pago, garantía y tipo de factura.',
        dato: 'Contado o cuenta corriente a 15, 30, 60 o 90 días, con una aclaración escrita si hace falta',
      },
      {
        n: 6,
        titulo: 'Resumen',
        detalle:
          'Todo lo que se está por guardar en una sola pantalla, con el semáforo de lo que falta.',
        dato: 'Cuando falta algo, te lleva directo al campo',
      },
    ],
    diferencial:
      'El sistema avisa del solape y te deja decidir. La web, en cambio, nunca vende un auto pisado: el mostrador puede cargar la excepción, el cliente online no. Quien está parado ahí sabe cosas que el sistema no, y por eso el aviso no es un candado.',
    fuente: 'pages/reservas/ReservaModal.tsx · PASOS_WIZARD · components/reservas/MenuNuevaOperacion.tsx',
    pantalla: 'reservas',
    momento: 'alta',
  },
  {
    slug: 'firmar-el-contrato',
    nombre: 'Emitir y firmar el contrato',
    termino: 'cómo firmar un contrato de alquiler de autos a distancia',
    pregunta: 'El cliente retira a las siete de la mañana. ¿Cuándo firma?',
    bajada:
      'El contrato se firma en pantalla con el dedo o el mouse, por un link que se manda al teléfono, o en papel —y en ese caso se sube el firmado y queda adjunto al mismo contrato. Todos los caminos terminan en el mismo lugar, así que el que trabaja con papel no queda afuera del sistema.',
    pasos: [
      {
        n: 1,
        titulo: 'Preparar',
        detalle:
          'Antes de emitir, se revisan las cláusulas y se editan las que haga falta: queda marcada “Modificada” y se puede volver al original. Lo cambiado vale solo para ese contrato, y el reverso lo aclara.',
        dato: 'Es la última oportunidad de tocar el texto',
      },
      {
        n: 2,
        titulo: 'Franquicia, si corresponde',
        detalle:
          'Con una casilla se genera también el documento de la franquicia, con el monto precargado de la categoría. Firma como deudor el que elijas: la empresa, el representante o un conductor.',
        dato: 'Se imprime junto al contrato',
      },
      {
        n: 3,
        titulo: 'Emitir',
        detalle:
          'Sale con el clausulado vigente ese día, y el sistema guarda un snapshot congelado de ese texto.',
        dato: 'El clausulado está versionado en base: hoy va la versión 7',
      },
      {
        n: 4,
        titulo: 'Firmar, por uno de tres caminos',
        detalle:
          'En pantalla, con el dedo o el mouse, o marcando que firmó en papel. Por un link remoto que se manda y se puede revocar. O subiendo el papel firmado a mano.',
        dato: 'El link se da de baja cuando querés: no queda vivo para siempre',
      },
      {
        n: 5,
        titulo: 'Regenerar o anular, si hizo falta',
        detalle:
          'Si cambió algo, se regenera: pide un motivo, permite cambiar los conductores y el anterior queda anulado. Un contrato no se borra.',
        dato: 'La auditoría guarda quién lo anuló y por qué',
      },
      {
        n: 6,
        titulo: 'Reimprimir, años después',
        detalle:
          'Cuando lo pide un abogado dos años más tarde, la reimpresión sale idéntica: el snapshot tiene el texto que esa persona firmó, no el que rige hoy.',
        dato: 'Aunque el clausulado haya cambiado seis veces desde entonces',
      },
    ],
    diferencial:
      'El snapshot congelado es la diferencia entre tener un contrato y tener una prueba. Si el sistema reimprimiera el clausulado vigente, el papel diría cosas que el cliente nunca firmó — y eso, delante de un juez, es peor que no tener nada.',
    fuente: 'components/alquileres/ContratoPanel.tsx · ClausulasEditables.tsx · PagarePanel.tsx · hooks/useContratos.ts',
    pantalla: 'contratos',
    momento: 'contrato',
  },
  {
    slug: 'entregar-el-auto',
    nombre: 'Entregar el auto',
    termino: 'checklist de entrega de un auto de alquiler',
    pregunta: 'Vuelve con un rayón. ¿Cómo sabés que no estaba?',
    bajada:
      'Entregar es un paso rápido, pensado para hacerse parado y con el cliente esperando: tres botones grandes de color para la limpieza, el combustible a un toque y los daños que ya tenía el auto a la vista. No pregunta si firmó ni cobra ahí: eso ya tiene su lugar.',
    pasos: [
      {
        n: 1,
        titulo: 'Garantía a la vista',
        detalle: 'Si el alquiler tiene garantía registrada, se ve arriba: el medio y el monto.',
        dato: 'Una garantía en efectivo entra a la caja de hoy como retenida, no como cobro',
      },
      {
        n: 2,
        titulo: 'Fecha, hora y kilómetros',
        detalle: 'Con qué kilometraje sale, para poder compararlo cuando vuelva.',
        dato: 'Sin esto, la discusión de la devolución no tiene contra qué compararse',
      },
      {
        n: 3,
        titulo: 'Combustible y limpieza, por color',
        detalle:
          'Combustible: Vacío, ¼, ½, ¾ o Lleno. Limpieza: Limpio en verde, Sucio en ámbar, Lavado profundo en rojo. El elegido crece y se pinta de su color.',
        dato: 'Se toca, no se escribe',
      },
      {
        n: 4,
        titulo: 'Estado del vehículo y daños',
        detalle:
          'Se ven los daños que ya tenía. Si hay uno nuevo, se carga ahí mismo con fotos desde el celular, antes de que salga.',
        dato: 'La constancia queda en el historial del auto, no en el teléfono de alguien',
      },
      {
        n: 5,
        titulo: 'Cargo opcional',
        detalle:
          'Si en la entrega se cobra algo —un extra de último momento, una entrega fuera de la sucursal— se carga con motivo obligatorio.',
        dato: 'Sin motivo no hay cargo: un importe suelto no se puede explicar tres meses después',
      },
    ],
    diferencial:
      'Que el daño se fotografíe al entregar, con el auto todavía en el lugar, es lo que termina la discusión del “ya estaba así”. Y que los botones sean grandes y de color no es estética: es lo que hace que el mostrador lo complete en lugar de saltearlo.',
    fuente:
      'pages/reservas/CheckoutModal.tsx · components/reservas/BotonesDeEstado.tsx · components/flota/DaniosTab.tsx',
    pantalla: 'reservas',
  },
  {
    slug: 'extender-un-alquiler',
    nombre: 'Extender un alquiler',
    termino: 'cómo extender un alquiler de auto y cobrar la diferencia',
    pregunta: 'Llama y te pide el auto tres días más. ¿Cuánto le cobrás?',
    bajada:
      'La extensión es un alquiler nuevo, con su propio precio. La pantalla muestra solo la extensión: de cuándo a cuándo, cuántos días, a cuánto el día y el total. Y el contrato se regenera con las fechas nuevas.',
    pasos: [
      {
        n: 1,
        titulo: 'Nueva fecha de fin',
        detalle: 'Se muestra “Terminaba el” y “Ahora termina el”, para ver qué se está cambiando.',
        dato: 'Antes de tocar nada ya se ve el tramo nuevo',
      },
      {
        n: 2,
        titulo: 'Precio por día y total',
        detalle:
          'El sistema sugiere la tarifa de la categoría, pero el precio por día y el total son tuyos: se escriben y son obligatorios.',
        dato: 'Editable. Una extensión pactada por teléfono no siempre es la tarifa de lista',
      },
      {
        n: 3,
        titulo: 'Cómo quedó el alquiler original',
        detalle: 'Se ve si el original está pagado o si tiene saldo, con acceso directo a la cuenta corriente.',
        dato: 'Pagado · Ver cuenta corriente · Sin precio cargado',
      },
      {
        n: 4,
        titulo: 'Cobro',
        detalle: 'Se cobra al momento por el medio que sea, o va a cuenta corriente.',
        dato: 'Los medios que configure la rentadora: efectivo, transferencia, tarjeta, Mercado Pago, cheque, echeq…',
      },
      {
        n: 5,
        titulo: 'Contrato con las fechas nuevas',
        detalle: 'Un botón regenera el contrato con las fechas nuevas.',
        dato: 'El anterior queda anulado, no borrado',
      },
    ],
    diferencial:
      'Tratar la extensión como un alquiler nuevo hace que cada tramo tenga su precio y su cobro propios. Si la extensión pisa el total del original, a los dos meses nadie sabe cuánto se pactó cada vez.',
    fuente: 'pages/reservas/ExtenderModal.tsx',
    pantalla: 'reservas',
  },
  {
    slug: 'cargar-una-promo',
    nombre: 'Cargar una promo y darla de baja',
    termino: 'cómo cargar una promoción de temporada en un alquiler de autos',
    pregunta: '¿Qué pasa con el precio viejo cuando la promo se termina?',
    bajada:
      'Se marcan los días arrastrando sobre la fila de una categoría y se les pone precio. Hay un solo precio, para la web y para el mostrador. Cuando la promo se da de baja, el precio anterior vuelve solo: no hay que acordarse de restaurarlo, porque nunca se pisó.',
    pasos: [
      {
        n: 1,
        titulo: 'Marcar los días',
        detalle: 'Se arrastra sobre la fila de la categoría, en el calendario.',
        dato: 'Una categoría y un rango, no una regla escrita a mano',
      },
      {
        n: 2,
        titulo: 'Ponerles precio',
        detalle: 'Un valor fijo o un porcentaje sobre la tarifa base de esa categoría.',
        dato: 'La tarifa base vive en Categorías y precios base',
      },
      {
        n: 3,
        titulo: 'Probarla antes de publicarla',
        detalle:
          'El probador de precio muestra cuánto sale una reserva con la promo cargada, capa por capa, sin crear una reserva de prueba.',
        dato: 'Hay también un Simulador, que se abre con un botón de la pantalla Precios',
      },
      {
        n: 4,
        titulo: 'Verla junto a las demás',
        detalle: 'La tabla de reglas muestra todas juntas: temporadas, feriados, promos y descuentos por duración.',
        dato: 'Una promo que se pisa con otra regla se ve de un vistazo',
      },
      {
        n: 5,
        titulo: 'Darla de baja',
        detalle: 'Se elimina la regla y el precio que estaba debajo vuelve a aplicar.',
        dato: 'Las capas se superponen: la promo nunca reemplazó al precio anterior',
      },
    ],
    diferencial:
      'Que el precio anterior vuelva solo suena menor hasta la primera vez que no vuelve. Con un tarifario plano, terminar una promo significa acordarse de volver a cargar el precio viejo, y el día que alguien se olvida se vende noviembre a precio de promoción de junio.',
    fuente: 'pages/precios/PreciosPage.tsx',
    pantalla: 'precios',
  },
];

export function operacion(slug: string): Operacion | undefined {
  return OPERACIONES.find((o) => o.slug === slug);
}
