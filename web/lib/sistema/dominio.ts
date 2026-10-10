/* El vocabulario del sistema, traído tal cual.
 *
 * Todo lo de este archivo está copiado de
 * `rentora-system/panel/src/lib/constants.ts` y de `tailwind.config.ts`. Las etiquetas son
 * las que el operador lee en la pantalla y los colores son los que el sistema pinta.
 *
 * **Si algo de acá no existe en el sistema, es un bug.** Misma regla que la de la copy: la
 * réplica no imagina lo que un sistema así mostraría, muestra lo que este sistema muestra.
 *
 * ── Lo único que cambia respecto del original ────────────────────────────────────────────
 *
 * El azul `#407EC9` de la marca del cliente pasa a ser el turquesa de Rentora. Nada más.
 *
 * **La escala de urgencia no se toca.** Gris, azul, verde, ámbar y rojo no son decoración:
 * son los significados que la gente ya trae aprendidos (gris = no arrancó, azul = dato,
 * verde = cerrado, ámbar = hay un reloj corriendo, rojo = frena la operación). Están elegidos
 * además para pasar contraste 4,5 con texto blanco encima, y el sistema documenta cuáles no
 * pasaban antes. Teñirlos de turquesa rompería el producto justo en la foto donde se lo
 * muestra.
 */

/** Los colores del producto. El `primary` es el único que se rebrandea. */
export const C = {
  primary: '#12959B',
  primaryBg: '#E2F1F1',
  inactivo: '#475569',
  inactivoBg: '#F1F5F9',
  info: '#1B5FA8',
  infoBg: '#E8F1FB',
  success: '#047857',
  successBg: '#D1FAE5',
  warning: '#B45309',
  warningBg: '#FEF3C7',
  danger: '#B91C1C',
  dangerBg: '#FEE2E2',
} as const;

export type Tono = 'primary' | 'inactivo' | 'info' | 'success' | 'warning' | 'danger';

// ─── Vehículos ───────────────────────────────────────────────────────────────

export type EstadoVehiculo =
  | 'disponible'
  | 'alquilado'
  | 'reservado'
  | 'en_transicion'
  | 'fuera_de_servicio';

export const ESTADO_VEHICULO_LABEL: Record<EstadoVehiculo, string> = {
  disponible: 'Disponible',
  alquilado: 'Alquilado',
  reservado: 'Reservado',
  en_transicion: 'En transición',
  fuera_de_servicio: 'Fuera de servicio',
};

export const ESTADO_VEHICULO_TONO: Record<EstadoVehiculo, Tono> = {
  disponible: 'success',
  alquilado: 'primary',
  reservado: 'info',
  en_transicion: 'info',
  fuera_de_servicio: 'danger',
};

// ─── Reservas ────────────────────────────────────────────────────────────────

export type EstadoReserva =
  | 'pendiente'
  | 'confirmada'
  | 'activa'
  | 'vencida'
  | 'finalizada'
  | 'cancelada'
  | 'pendiente_pago'
  | 'sin_disponibilidad'
  | 'revision_sin_cupo';

export const ESTADO_RESERVA_LABEL: Record<EstadoReserva, string> = {
  pendiente: 'Pendiente',
  confirmada: 'Confirmada',
  activa: 'Activa',
  vencida: 'Vencida',
  finalizada: 'Finalizada',
  cancelada: 'Cancelada',
  pendiente_pago: 'Esperando pago',
  sin_disponibilidad: 'Sin disponibilidad',
  revision_sin_cupo: 'Pagó sin cupo',
};

export const ESTADO_RESERVA_TONO: Record<EstadoReserva, Tono> = {
  pendiente: 'info',
  confirmada: 'info',
  activa: 'success',
  vencida: 'danger',
  finalizada: 'success',
  cancelada: 'danger',
  pendiente_pago: 'inactivo',
  sin_disponibilidad: 'info',
  revision_sin_cupo: 'danger',
};

/* Los dos que van sólidos y no tenues: son estados que requieren que alguien haga algo, no
 * información pasiva. `pendiente_pago` sí es pasivo — espera al cliente, no a la rentadora. */
export const ESTADO_RESERVA_SOLIDO: EstadoReserva[] = ['sin_disponibilidad', 'revision_sin_cupo'];

// ─── El calendario de ocupación ──────────────────────────────────────────────

/* Los colores de los bloques del calendario. Están aparte de los badges a propósito: en la
 * grilla el color tiene que leerse de lejos, así que van sólidos.
 *
 * Las dos contorneadas son contorneadas porque **no ocupan el calendario**: una reserva
 * `pendiente` todavía no toma el auto, y en `pendiente_pago` el cupo lo sostiene el hold y no
 * la reserva. Pintarlas sólidas haría que la grilla mienta — una celda parecería tomada
 * estando libre. Invisibles tampoco pueden ser, o el mostrador vende encima de una venta en
 * curso. */
export type ColorEvento = {
  fondo: string;
  borde: string;
  texto: string;
  /** Borde punteado: está en el aire, no ocupa. */
  punteado?: boolean;
  /** Rayado diagonal: el auto no está alquilado, está fuera de circulación. */
  rayado?: boolean;
  /** La única animación del calendario: una devolución que ya venció. */
  late?: boolean;
  tachado?: boolean;
};

export const EVENTO: Record<string, ColorEvento> = {
  pendiente: { fondo: '#FEF3C7', borde: '#F59E0B', texto: '#78350F', punteado: true },
  confirmada: { fondo: '#3B82F6', borde: '#2563EB', texto: '#FFFFFF' },
  activa: { fondo: '#10B981', borde: '#059669', texto: '#FFFFFF' },
  vencida: { fondo: '#DC2626', borde: '#B91C1C', texto: '#FFFFFF', late: true },
  finalizada: { fondo: '#64748B', borde: '#475569', texto: '#FFFFFF' },
  cancelada: { fondo: '#EF4444', borde: '#DC2626', texto: '#FFFFFF', tachado: true },
  pendiente_pago: { fondo: '#EDE9FE', borde: '#A78BFA', texto: '#4C1D95', punteado: true },
  // Bloqueos: el estado que llega es el motivo.
  mantenimiento: { fondo: '#D97706', borde: '#B45309', texto: '#FFFFFF', rayado: true },
  siniestro: { fondo: '#B91C1C', borde: '#991B1B', texto: '#FFFFFF', rayado: true },
  uso_interno: { fondo: C.primary, borde: C.primary, texto: '#FFFFFF', rayado: true },
  venta: { fondo: '#047857', borde: '#065F46', texto: '#FFFFFF', rayado: true },
  otro: { fondo: '#475569', borde: '#334155', texto: '#FFFFFF', rayado: true },
};

/* Los cinco motivos de bloqueo no van uno por uno en la leyenda: se resumen en un único
 * "Bloqueado" con el mismo rayado, para no convertirla en una lista de diez. */
export const LEYENDA_OCUPACION = [
  'pendiente',
  'pendiente_pago',
  'confirmada',
  'activa',
  'vencida',
  'finalizada',
] as const;

// ─── Echeqs ──────────────────────────────────────────────────────────────────

export const ESTADO_ECHEQ_LABEL = {
  en_cartera: 'En cartera',
  depositado: 'Depositado',
  endosado: 'Endosado',
  rechazado: 'Rechazado',
  cobrado: 'Cobrado',
  vencido: 'Vencido',
} as const;

export const ESTADO_ECHEQ_TONO: Record<keyof typeof ESTADO_ECHEQ_LABEL, Tono> = {
  en_cartera: 'info',
  depositado: 'info',
  endosado: 'info',
  rechazado: 'danger',
  cobrado: 'success',
  vencido: 'inactivo',
};

/* Los echeqs ya no son una lista: son secciones de trabajo, cada una con su total. Van en el
 * orden en que hay que mirarlas: primero lo que ya venció sin cobrarse. */
export const ECHEQ_SECCIONES = [
  { key: 'vencidos', label: 'Vencidos sin cobrar', tono: 'danger' as Tono },
  { key: 'proximos', label: 'Próximos 7 días', tono: 'warning' as Tono },
  { key: 'cartera', label: 'En cartera', tono: 'info' as Tono },
  { key: 'depositados', label: 'Depositados / endosados', tono: 'info' as Tono },
  { key: 'cerrados', label: 'Cerrados', tono: 'inactivo' as Tono },
] as const;

/** Los combustibles de la entrega, con su color: se elige tocando, no escribiendo. */
export const COMBUSTIBLE = ['Vacío', '¼', '½', '¾', 'Lleno'] as const;

/** Los tres estados de limpieza al entregar: botones grandes, el elegido se pinta de su color. */
export const LIMPIEZA = [
  { key: 'limpio', label: 'Limpio', tono: 'success' as Tono },
  { key: 'sucio', label: 'Sucio', tono: 'warning' as Tono },
  { key: 'profundo', label: 'Lavado profundo', tono: 'danger' as Tono },
] as const;

/** Los motivos de baja de un vehículo. No se borra: queda inactivo con el motivo. */
export const MOTIVO_BAJA = ['Vendido', 'Siniestro / destrucción total', 'Robo', 'Fin de leasing', 'Otro'] as const;

/** Las tres puertas del menú "Nueva operación". */
export const NUEVA_OPERACION = [
  { icono: 'rayo', titulo: 'Contrato Uber / largo plazo', bajada: 'Semanal, para Uber o empresas: valor por semana, kilómetros permitidos y fechas de pago.' },
  { icono: 'firma', titulo: 'Alquiler', bajada: 'Contrato rápido: una sola pantalla, y sale para firmar o mandar.' },
  { icono: 'calendario', titulo: 'Nueva reserva', bajada: 'El paso a paso completo: cliente, fechas, auto, precio y pago.' },
] as const;

// ─── Movimientos de cuenta corriente ─────────────────────────────────────────

/* Lo que hace que la ficha del cliente pueda mostrar un echeq en cartera distinto de un pago,
 * y una seña distinta de los dos. Las etiquetas están escritas para el mostrador, no para un
 * contador: "Seña" y no "anticipo de naturaleza crédito". */
export const NATURALEZA_LABEL = {
  alquiler: 'Alquiler',
  extension: 'Extensión',
  excedente: 'Excedente',
  cargo_cierre: 'Cargos de cierre',
  multa: 'Multa',
  danio: 'Daño',
  anticipo: 'Seña',
  pago: 'Cobro',
  echeq_en_cartera: 'Echeq en cartera',
  sena_retenida: 'Seña retenida',
  reembolso: 'Reembolso',
  bonificacion: 'Bonificación',
  anulacion: 'Anulación',
  manual: 'Manual',
} as const;

export const NATURALEZA_TONO: Record<keyof typeof NATURALEZA_LABEL, Tono> = {
  alquiler: 'inactivo',
  extension: 'inactivo',
  excedente: 'info',
  cargo_cierre: 'info',
  multa: 'danger',
  danio: 'danger',
  // La seña se ve distinta del cobro a propósito: no es plata que baje una deuda, es plata
  // que todavía se debe entregar en forma de auto.
  anticipo: 'info',
  pago: 'success',
  // Un cheque en cartera no es plata: puede rebotar.
  echeq_en_cartera: 'info',
  sena_retenida: 'info',
  reembolso: 'info',
  bonificacion: 'success',
  anulacion: 'inactivo',
  manual: 'inactivo',
};

// ─── Multas ──────────────────────────────────────────────────────────────────

export const ESTADO_MULTA_LABEL = {
  pendiente: 'Pendiente',
  imputada: 'Imputada',
  cobrada: 'Cobrada',
  bonificada: 'Bonificada',
  apelando: 'Apelando',
} as const;

/* Sólidos, a diferencia del resto de los badges del sistema: el estado de una multa es una
 * decisión que hay que notar de un vistazo (quién debe, a quién se le perdonó), no un dato
 * pasivo. */
export const ESTADO_MULTA_COLOR: Record<keyof typeof ESTADO_MULTA_LABEL, string> = {
  pendiente: C.warning,
  imputada: C.primary,
  cobrada: C.success,
  bonificada: '#64748B',
  apelando: '#7C3AED',
};

// ─── Medios de pago ──────────────────────────────────────────────────────────

/* Los medios los configura cada rentadora: estos son los de la Rentadora del Valle. */

export const MEDIO_PAGO_LABEL: Record<string, string> = {
  efectivo: 'Efectivo',
  transferencia: 'Transferencia',
  tarjeta: 'Tarjeta',
  cheque: 'Cheque',
  echeq: 'Echeq',
  cuenta_corriente: 'Cuenta corriente',
  mercado_pago: 'Mercado Pago',
  otro: 'Otro',
};

/* El color acá clasifica, no advierte: un cheque no es más urgente que una transferencia. Van
 * todos en la familia informativa salvo `cuenta_corriente`, que es gris porque no es plata que
 * entró. */
export const MEDIO_PAGO_TONO: Record<string, Tono> = {
  efectivo: 'success',
  transferencia: 'info',
  tarjeta: 'info',
  mercado_pago: 'info',
  cheque: 'info',
  echeq: 'info',
  // "Otro" cubre canjes, compensaciones y cobros raros: cuenta como plata que entró.
  otro: 'info',
  cuenta_corriente: 'inactivo',
};

// ─── Condición de pago e IVA ─────────────────────────────────────────────────

export const CONDICION_PAGO_LABEL: Record<string, string> = {
  contado: 'Contado',
  cta_cte_15: 'Cta. Cte. 15 días',
  cta_cte_30: 'Cta. Cte. 30 días',
  cta_cte_60: 'Cta. Cte. 60 días',
  cta_cte_90: 'Cta. Cte. 90 días',
};

export const CONDICION_IVA_LABEL: Record<string, string> = {
  responsable_inscripto: 'Responsable Inscripto',
  monotributo: 'Monotributo',
  consumidor_final: 'Consumidor Final',
  exento: 'Exento',
};

// ─── Daños ───────────────────────────────────────────────────────────────────

export const TIPO_DANIO_LABEL: Record<string, string> = {
  rayon: 'Rayón',
  abolladura: 'Abolladura',
  rotura: 'Rotura',
  faltante: 'Faltante',
  cristal: 'Cristal',
  tapizado: 'Tapizado',
  mecanico: 'Mecánico',
};

export const SEVERIDAD_DANIO_LABEL = {
  leve: 'Leve',
  moderado: 'Moderado',
  grave: 'Grave',
} as const;

/* Sólidos: la severidad es justamente lo que hay que ver de un vistazo. */
export const SEVERIDAD_DANIO_COLOR: Record<keyof typeof SEVERIDAD_DANIO_LABEL, string> = {
  leve: '#64748B',
  moderado: C.warning,
  grave: C.danger,
};

// ─── Documentos y gastos ─────────────────────────────────────────────────────

export const TIPO_DOCUMENTO_LABEL: Record<string, string> = {
  poliza: 'Póliza',
  vtv: 'VTV',
  clausulas: 'Cláusulas',
};

export const TIPO_GASTO_LABEL: Record<string, string> = {
  service: 'Service',
  combustible: 'Combustible',
  cubiertas: 'Cubiertas',
  reparacion: 'Reparación',
  seguro: 'Seguro',
  patente: 'Patente',
  vtv: 'VTV',
  lavado: 'Lavado',
};

// ─── Fechas especiales ───────────────────────────────────────────────────────

export const TIPO_FECHA_ESPECIAL_LABEL: Record<string, string> = {
  feriado: 'Feriado',
  fin_semana_largo: 'Fin de semana largo',
  comercial: 'Fecha comercial',
  temporada: 'Temporada',
};

export const COLOR_FECHA_ESPECIAL: Record<string, { chip: string; celda: string }> = {
  rojo: { chip: '#DC2626', celda: '#FEF2F2' },
  ambar: { chip: '#F59E0B', celda: '#FFFBEB' },
  verde: { chip: '#059669', celda: '#ECFDF5' },
  azul: { chip: '#0284C7', celda: '#F0F9FF' },
  violeta: { chip: '#7C3AED', celda: '#F5F3FF' },
};

// ─── Solicitudes de contacto del canal web ───────────────────────────────────

/* Por qué esa persona terminó pidiendo una llamada en vez de reservar sola. Es lo primero que
 * el mostrador necesita saber antes de marcar el número. */
export const MOTIVO_SOLICITUD_LABEL: Record<string, string> = {
  fuera_de_ventana: 'Fecha muy cerca',
  sin_cupo: 'Categoría sin cupo',
  otro_lugar: 'Lugar a coordinar',
};

export const MOTIVO_SOLICITUD_COLOR: Record<string, string> = {
  fuera_de_ventana: C.warning,
  sin_cupo: C.primary,
  otro_lugar: C.success,
};

// ─── Constantes de negocio ───────────────────────────────────────────────────

/** El período de gracia de una devolución tardía. Pasado esto, se cobra por hora. */
export const MINUTOS_DE_GRACIA = 40;

/** Los seis pasos del alta de reserva. Preguntas, no jerga. */
export const PASOS_RESERVA = [
  { n: 1, titulo: '¿Quién?', ayuda: 'El cliente, y quién va a manejar: hasta tres conductores.' },
  { n: 2, titulo: '¿Cuándo y dónde?', ayuda: 'Fechas, horarios y lugares de retiro y devolución.' },
  { n: 3, titulo: '¿Qué?', ayuda: 'El auto, o la categoría si todavía no se sabe cuál.' },
  { n: 4, titulo: '¿Cuánto?', ayuda: 'El precio, único, y los adicionales.' },
  { n: 5, titulo: '¿Cómo se paga?', ayuda: 'Condición de pago, garantía y factura.' },
  { n: 6, titulo: 'Resumen', ayuda: 'Revisá antes de guardar.' },
] as const;

// ─── Formato ─────────────────────────────────────────────────────────────────

/** Pesos sin decimales, con el punto de miles argentino. */
export function pesos(n: number): string {
  return `$ ${n.toLocaleString('es-AR', { maximumFractionDigits: 0 })}`;
}

/** Kilómetros con el mismo separador. */
export function km(n: number): string {
  return `${n.toLocaleString('es-AR')} km`;
}
