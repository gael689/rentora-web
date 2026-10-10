/* La Rentadora del Valle.
 *
 * Los datos con los que se pinta la réplica del sistema. Todo inventado: ninguna patente,
 * ningún DNI, ningún teléfono y ningún nombre sale de una base real. Es la regla más dura del
 * repo y no se negocia.
 *
 * ── El reloj de la demo ──────────────────────────────────────────────────────────────────
 *
 * **Viernes 12 de junio de 2026, 09:14.** El 12/06/2026 es un viernes de verdad, así que la
 * tira de días (V 12 · S 13 · D 14 …) cae donde tiene que caer y los fines de semana del
 * calendario son fines de semana. Junio tiene 30 días, así que la VTV que vence el 03/07 está
 * exactamente a 21 días: el aviso del panel dice la verdad si alguien se pone a contar.
 *
 * Si alguna vez se mueve el reloj, se mueven las tres cosas juntas —el día, la tira y los
 * vencimientos— o la pantalla empieza a mentir en los detalles, que es donde se nota.
 */

export const RENTADORA = {
  nombre: 'Rentadora del Valle',
  ciudad: 'San Ramón del Valle',
  sucursales: ['Casa central', 'Aeropuerto'],
  operador: 'mostrador@delvalle.com.ar',
};

export const RELOJ = {
  etiqueta: 'Vie 12 · 09:14',
  mes: 'JUNIO',
  anio: 2026,
  hoy: 'viernes 12 de junio',
};

/** Catorce días de calendario, arrancando el viernes 12. */
export const DIAS = [
  'V 12', 'S 13', 'D 14', 'L 15', 'M 16', 'M 17', 'J 18',
  'V 19', 'S 20', 'D 21', 'L 22', 'M 23', 'M 24', 'J 25',
];

/** Índices de sábado y domingo, para teñir la columna del finde. */
export const FINDE = [1, 2, 8, 9];

// ─── Categorías ──────────────────────────────────────────────────────────────

export type Categoria = {
  key: string;
  nombre: string;
  franquicia: number;
  /** A cuánto la baja la cobertura ampliada. */
  franquiciaReducida: number;
  base: number;
  unidades: number;
};

export const CATEGORIAS: Categoria[] = [
  { key: 'compacto', nombre: 'Compacto B', franquicia: 1_400_000, franquiciaReducida: 480_000, base: 52_000, unidades: 5 },
  { key: 'sedan', nombre: 'Sedán C', franquicia: 1_700_000, franquiciaReducida: 560_000, base: 64_000, unidades: 1 },
  { key: 'sedan-sup', nombre: 'Sedán Superior', franquicia: 1_900_000, franquiciaReducida: 640_000, base: 78_000, unidades: 1 },
  { key: 'suv', nombre: 'SUV C', franquicia: 2_100_000, franquiciaReducida: 700_000, base: 86_000, unidades: 2 },
  { key: 'pickup', nombre: 'Pick-up D', franquicia: 2_900_000, franquiciaReducida: 980_000, base: 112_000, unidades: 2 },
  { key: 'furgon', nombre: 'Furgón', franquicia: 2_400_000, franquiciaReducida: 820_000, base: 94_000, unidades: 1 },
];

// ─── La flota ────────────────────────────────────────────────────────────────

import type { EstadoVehiculo } from './dominio';

export type Unidad = {
  id: number;
  modelo: string;
  patente: string;
  categoria: string;
  estado: EstadoVehiculo;
  km: number;
  /** El próximo service: por kilómetro o por fecha, lo que llegue primero. */
  servicioKm: number;
  servicioFecha: string;
  /** Documentos con vigencia. El que vence primero es el que muestra la fila. */
  documento: string;
  documentoVence: string;
  /** Días que faltan para ese vencimiento. Negativo si ya venció. */
  documentoDias: number;
  /** Los dos papeles que la tabla de Vehículos muestra siempre, con fecha: VTV y póliza. */
  vtv: string;
  vtvDias: number;
  poliza: string;
  polizaDias: number;
  polizaCia: string;
  /** Motivo del bloqueo, si está fuera de circulación. */
  bloqueo?: string;
  /** Solo en `FLOTA_LARGO_PLAZO`: con un chofer de plataforma ("En Uber") o con una empresa. */
  plataforma?: 'Uber';
};

/** Compañía de seguros ficticia, la misma para toda la flota de la demo. */
const CIA = 'Seguros del Valle';

/* Las seis primeras son las que aparecen en el calendario del hero de la home: el mismo auto
 * tiene que llamarse igual en las dos pantallas. */
export const FLOTA: Unidad[] = [
  { id: 1, modelo: 'Corolla XEI', patente: 'AB 123 CD', categoria: 'sedan', estado: 'reservado', km: 46_812, servicioKm: 50_000, servicioFecha: '12/08', documento: 'Póliza', documentoVence: '14/02', documentoDias: 247, vtv: '05/03', vtvDias: 266, poliza: '14/02', polizaDias: 247, polizaCia: CIA },
  { id: 2, modelo: 'Onix LT', patente: 'AC 456 EF', categoria: 'compacto', estado: 'disponible', km: 48_100, servicioKm: 50_000, servicioFecha: '02/09', documento: 'VTV', documentoVence: '03/07', documentoDias: 21, vtv: '03/07', vtvDias: 21, poliza: '14/02', polizaDias: 247, polizaCia: CIA },
  { id: 3, modelo: 'Cronos GSE', patente: 'AD 789 GH', categoria: 'compacto', estado: 'alquilado', km: 31_450, servicioKm: 40_000, servicioFecha: '20/07', documento: 'Póliza', documentoVence: '14/02', documentoDias: 247, vtv: '22/03', vtvDias: 283, poliza: '14/02', polizaDias: 247, polizaCia: CIA },
  { id: 4, modelo: 'Duster 4x2', patente: 'AE 012 IJ', categoria: 'suv', estado: 'disponible', km: 62_300, servicioKm: 70_000, servicioFecha: '12/10', documento: 'Cédula verde', documentoVence: '—', documentoDias: 999, vtv: '25/09', vtvDias: 105, poliza: '14/02', polizaDias: 247, polizaCia: CIA },
  { id: 5, modelo: 'Hilux SRV', patente: 'AF 345 KL', categoria: 'pickup', estado: 'alquilado', km: 88_940, servicioKm: 90_000, servicioFecha: '30/06', documento: 'VTV', documentoVence: '19/09', documentoDias: 99, vtv: '19/09', vtvDias: 99, poliza: '14/02', polizaDias: 247, polizaCia: CIA },
  { id: 6, modelo: 'Kwid Zen', patente: 'AG 678 MN', categoria: 'compacto', estado: 'fuera_de_servicio', km: 27_120, servicioKm: 30_000, servicioFecha: '05/11', documento: 'Póliza', documentoVence: '14/02', documentoDias: 247, vtv: '18/04', vtvDias: 310, poliza: '14/02', polizaDias: 247, polizaCia: CIA, bloqueo: 'mantenimiento' },
  { id: 7, modelo: 'Corolla Cross', patente: 'AH 901 OP', categoria: 'suv', estado: 'disponible', km: 19_870, servicioKm: 20_000, servicioFecha: '18/12', documento: 'Póliza', documentoVence: '14/02', documentoDias: 247, vtv: '09/05', vtvDias: 331, poliza: '14/02', polizaDias: 247, polizaCia: CIA },
  { id: 8, modelo: 'Amarok V6', patente: 'AJ 234 QR', categoria: 'pickup', estado: 'alquilado', km: 104_500, servicioKm: 110_000, servicioFecha: '25/08', documento: 'VTV', documentoVence: '28/11', documentoDias: 169, vtv: '28/11', vtvDias: 169, poliza: '14/02', polizaDias: 247, polizaCia: CIA },
  { id: 9, modelo: 'Kangoo Furgón', patente: 'AK 567 ST', categoria: 'furgon', estado: 'disponible', km: 71_200, servicioKm: 80_000, servicioFecha: '14/09', documento: 'Póliza', documentoVence: '14/02', documentoDias: 247, vtv: '05/03', vtvDias: 266, poliza: '14/02', polizaDias: 247, polizaCia: CIA },
  { id: 10, modelo: 'Peugeot 208', patente: 'AL 890 UV', categoria: 'compacto', estado: 'disponible', km: 15_640, servicioKm: 20_000, servicioFecha: '03/01', documento: 'Póliza', documentoVence: '14/02', documentoDias: 247, vtv: '22/03', vtvDias: 283, poliza: '14/02', polizaDias: 247, polizaCia: CIA },
  { id: 11, modelo: 'Toyota Etios', patente: 'AM 123 WX', categoria: 'compacto', estado: 'en_transicion', km: 53_780, servicioKm: 60_000, servicioFecha: '07/10', documento: 'VTV', documentoVence: '22/08', documentoDias: 71, vtv: '22/08', vtvDias: 71, poliza: '14/02', polizaDias: 247, polizaCia: CIA },
  { id: 12, modelo: 'Nissan Frontier', patente: 'AN 456 YZ', categoria: 'pickup', estado: 'disponible', km: 42_090, servicioKm: 50_000, servicioFecha: '11/11', documento: 'Póliza', documentoVence: '14/02', documentoDias: 247, vtv: '18/04', vtvDias: 310, poliza: '14/02', polizaDias: 247, polizaCia: CIA },
];

/* Autos afectados a un contrato de largo plazo / semanal (choferes de aplicaciones o empresas). Van
 * aparte de `FLOTA` a propósito: los índices de `EVENTOS` apuntan a `FLOTA` y no pueden correrse.
 * En la tabla de Vehículos se rotulan "En alquiler de largo plazo" y no afirman nada sobre cupo. */
export const FLOTA_LARGO_PLAZO: Unidad[] = [
  { id: 13, modelo: 'Chevrolet Prisma', patente: 'AP 112 BC', categoria: 'compacto', estado: 'alquilado', km: 58_300, servicioKm: 60_000, servicioFecha: '15/07', documento: 'Póliza', documentoVence: '14/02', documentoDias: 247, vtv: '30/10', vtvDias: 140, poliza: '14/02', polizaDias: 247, polizaCia: CIA, plataforma: 'Uber' },
  { id: 14, modelo: 'Fiat Cronos', patente: 'AQ 334 DE', categoria: 'compacto', estado: 'alquilado', km: 41_900, servicioKm: 50_000, servicioFecha: '20/09', documento: 'Póliza', documentoVence: '14/02', documentoDias: 247, vtv: '12/12', vtvDias: 183, poliza: '14/02', polizaDias: 247, polizaCia: CIA },
];

/** Vehículos dados de baja: no se borran, quedan inactivos con el motivo y la fecha. */
export const FLOTA_BAJAS = [
  { modelo: 'Renault Sandero', patente: 'AA 901 TT', motivo: 'Vendido', fecha: '03/05/2026' },
  { modelo: 'Ford Ka', patente: 'AB 557 UV', motivo: 'Fin de leasing', fecha: '18/03/2026' },
];

/** El modelo de la unidad insignia, la que usa el bloque "¿dónde está este auto?". */
export const UNIDAD_INSIGNIA = FLOTA[0];

// ─── Clientes ────────────────────────────────────────────────────────────────

export type Cliente = {
  id: number;
  nombre: string;
  tipo: 'particular' | 'empresa';
  documento: string;
  conductores: number;
  condicionPago: string;
  saldo: number;
  /** Solo empresas: quien firma por ella. La ficha de empresa lleva primero al representante. */
  representante?: { nombre: string; cargo: string };
};

export const CLIENTES: Cliente[] = [
  { id: 1, nombre: 'Elektra SA', tipo: 'empresa', documento: 'CUIT 30-71284-6', conductores: 3, condicionPago: 'cta_cte_30', saldo: 380_000, representante: { nombre: 'Marcela Funes', cargo: 'Gerente de compras' } },
  { id: 2, nombre: 'Obras del Sur', tipo: 'empresa', documento: 'CUIT 30-70912-4', conductores: 4, condicionPago: 'cta_cte_60', saldo: 1_240_000, representante: { nombre: 'Raúl Ibarra', cargo: 'Socio gerente' } },
  { id: 3, nombre: 'Turismo Andes', tipo: 'empresa', documento: 'CUIT 30-71005-9', conductores: 2, condicionPago: 'cta_cte_30', saldo: 96_000, representante: { nombre: 'Paula Montes', cargo: 'Administración' } },
  { id: 4, nombre: 'Vialidad del Valle SRL', tipo: 'empresa', documento: 'CUIT 30-70488-1', conductores: 5, condicionPago: 'cta_cte_90', saldo: 640_000, representante: { nombre: 'Hernán Bustos', cargo: 'Jefe de flota' } },
  { id: 5, nombre: 'Bodega Alto Perdido', tipo: 'empresa', documento: 'CUIT 30-71466-2', conductores: 2, condicionPago: 'cta_cte_15', saldo: 0, representante: { nombre: 'Silvia Cáceres', cargo: 'Compras' } },
  { id: 6, nombre: 'M. Duarte', tipo: 'particular', documento: 'DNI 31.204.887', conductores: 1, condicionPago: 'contado', saldo: 0 },
  { id: 7, nombre: 'C. Vieyra', tipo: 'particular', documento: 'DNI 28.910.334', conductores: 2, condicionPago: 'contado', saldo: 0 },
  { id: 8, nombre: 'J. Pérez', tipo: 'particular', documento: 'DNI 35.677.210', conductores: 1, condicionPago: 'contado', saldo: 0 },
  { id: 9, nombre: 'R. Sosa', tipo: 'particular', documento: 'DNI 24.118.905', conductores: 1, condicionPago: 'contado', saldo: 0 },
  { id: 10, nombre: 'L. Arce', tipo: 'particular', documento: 'DNI 38.402.116', conductores: 1, condicionPago: 'contado', saldo: 0 },
  { id: 11, nombre: 'F. Ledesma', tipo: 'particular', documento: 'DNI 33.750.482', conductores: 1, condicionPago: 'contado', saldo: 0 },
  { id: 12, nombre: 'D. Ruiz', tipo: 'particular', documento: 'DNI 29.884.017', conductores: 1, condicionPago: 'contado', saldo: 0 },
  { id: 13, nombre: 'P. Anselmi', tipo: 'particular', documento: 'DNI 40.122.638', conductores: 1, condicionPago: 'contado', saldo: 0 },
  { id: 14, nombre: 'G. Maidana', tipo: 'particular', documento: 'DNI 26.503.719', conductores: 1, condicionPago: 'contado', saldo: 0 },
];

// ─── Lo que pinta el calendario de ocupación ─────────────────────────────────

export type Evento = {
  /** Índice de la unidad en `FLOTA`. */
  unidad: number;
  /** Columna de arranque dentro de `DIAS`. */
  ini: number;
  /** Cuántos días ocupa. */
  dur: number;
  cliente: string;
  /** Estado de reserva, o motivo si es un bloqueo. */
  estado: string;
  canal?: 'web' | 'mostrador';
};

/* Mezcla deliberada: hay confirmadas, una activa, una vencida (el que no devolvió), una
 * pendiente contorneada, una esperando el pago de la web, y un bloqueo por taller. Con todas
 * del mismo color la pantalla no muestra lo que el sistema sabe hacer. */
export const EVENTOS: Evento[] = [
  // Hoy es el V 12, la primera columna. Por eso `activa` sólo puede arrancar en 0 —ya empezó— y
  // todo lo que empieza más adelante es `confirmada`. Un estado que no cierra con la fecha es de
  // las pocas cosas que alguien mirando la pantalla dos minutos descubre solo.
  { unidad: 0, ini: 1, dur: 3, cliente: 'M. Duarte', estado: 'confirmada', canal: 'mostrador' },
  { unidad: 1, ini: 4, dur: 4, cliente: 'Elektra SA', estado: 'confirmada', canal: 'mostrador' },
  { unidad: 2, ini: 0, dur: 2, cliente: 'J. Pérez', estado: 'activa', canal: 'web' },
  { unidad: 2, ini: 7, dur: 5, cliente: 'C. Vieyra', estado: 'confirmada', canal: 'mostrador' },
  { unidad: 3, ini: 6, dur: 3, cliente: 'R. Sosa', estado: 'confirmada', canal: 'web' },
  { unidad: 4, ini: 0, dur: 6, cliente: 'Obras del Sur', estado: 'activa', canal: 'mostrador' },
  { unidad: 5, ini: 3, dur: 5, cliente: 'Taller · chapa y pintura', estado: 'mantenimiento' },
  { unidad: 6, ini: 9, dur: 4, cliente: 'Turismo Andes', estado: 'confirmada', canal: 'mostrador' },
  // El que no devolvió. Arrancó antes de la ventana, así que el bloque entra recortado por el
  // borde izquierdo, igual que en el calendario de verdad.
  { unidad: 7, ini: 0, dur: 1, cliente: 'Vialidad del Valle SRL', estado: 'vencida', canal: 'mostrador' },
  { unidad: 8, ini: 5, dur: 3, cliente: 'Bodega Alto Perdido', estado: 'pendiente', canal: 'mostrador' },
  { unidad: 9, ini: 2, dur: 2, cliente: 'P. Anselmi', estado: 'pendiente_pago', canal: 'web' },
  { unidad: 9, ini: 8, dur: 4, cliente: 'L. Arce', estado: 'confirmada', canal: 'web' },
  { unidad: 10, ini: 0, dur: 1, cliente: 'Turismo Andes', estado: 'finalizada', canal: 'mostrador' },
  { unidad: 11, ini: 11, dur: 3, cliente: 'G. Maidana', estado: 'confirmada', canal: 'mostrador' },
];

/* La fila "Por asignar". Es una sola fila para N reservas: el cupo dice que entran, el
 * calendario dice en cuál. Una reserva web pagada entra confirmada pero sin auto. */
export const POR_ASIGNAR: Evento[] = [
  { unidad: -1, ini: 7, dur: 4, cliente: '#1042 · F. Ledesma', estado: 'confirmada', canal: 'web' },
  { unidad: -1, ini: 2, dur: 2, cliente: '#1043 · D. Ruiz', estado: 'confirmada', canal: 'web' },
];

// ─── El panel del día ────────────────────────────────────────────────────────

export const PANEL_DEL_DIA = {
  salen: [
    { hora: '10:00', unidad: 'Corolla XEI', cliente: 'M. Duarte', estado: 'Sale mañana · listo' },
    { hora: '09:00', unidad: 'Compacto B', cliente: 'D. Ruiz · #1043', estado: 'Falta asignar unidad' },
  ],
  vuelven: [
    { hora: '07:30', unidad: 'Amarok V6', cliente: 'Vialidad del Valle SRL', estado: 'No volvió · vencida' },
    { hora: '08:30', unidad: 'Toyota Etios', cliente: 'Turismo Andes', estado: 'Devuelto · pendiente de lavado' },
    { hora: '18:00', unidad: 'Cronos GSE', cliente: 'J. Pérez', estado: 'Vuelve mañana' },
  ],
  atencion: [
    { texto: 'Amarok V6 · tenía que volver hoy a las 07:30 y no volvió', tono: 'danger' as const },
    { texto: 'Onix LT · la VTV vence en 21 días', tono: 'warning' as const },
    { texto: '2 reservas web confirmadas sin unidad asignada', tono: 'info' as const },
  ],
};

// ─── Reservas y alquileres ───────────────────────────────────────────────────

export type Reserva = {
  id: string;
  unidad: string;
  patente: string;
  cliente: string;
  categoria: string;
  desde: string;
  hasta: string;
  dias: number;
  /** Factor de temporada del rango. Junio parte al medio: baja hasta el 14, media desde el 15. */
  temporada: number;
  /** 1,25 si el rango toca el fin de semana largo del 13 al 15. */
  feriado: number;
  precio: number;
  estado: string;
  /** El origen de la reserva, no un precio distinto: es el filtro Todas / Web / Mostrador. */
  canal: 'web' | 'mostrador';
};

/* ── El motor de precios, de verdad ───────────────────────────────────────────
 *
 * **Los precios de la demo se calculan, no se escriben.** El alta de reserva muestra la
 * derivación completa —tarifa base por temporada por feriado por duración— y abajo un precio por
 * día que tiene que ser el producto de esas tres cosas. Cualquiera que se tome dos minutos de
 * hacer la cuenta lo encuentra, y la pieza entera se apoya en que los números se pueden verificar.
 *
 * **Hay un solo precio** (desde el 04/10/2026): el motor ignora el canal. La reserva conserva su
 * origen (web o mostrador) como filtro, pero no cambia lo que cuesta. Las tres capas son las de
 * `CAPAS_PRECIO`, que es lo que el sitio publica. */

/** Capa 3: el descuento por duracion. */
export function factorDuracion(dias: number): number {
  if (dias >= 7) return 0.85;
  if (dias >= 3) return 0.92;
  return 1;
}

/** El precio de un día, con las tres capas. Se redondea al peso.
 *  `canal` se acepta y se ignora: la firma no cambia para no romper a quien ya lo pasaba. */
export function precioPorDia(
  categoria: string,
  { dias, temporada = 1, feriado = 1 }:
    { dias: number; canal?: 'web' | 'mostrador'; temporada?: number; feriado?: number },
): number {
  const cat = CATEGORIAS.find((c) => c.key === categoria);
  if (!cat) throw new Error(`Categoría desconocida: ${categoria}`);
  return Math.round(cat.base * temporada * feriado * factorDuracion(dias));
}

export const RESERVAS: Reserva[] = [
  // El campo `precio` es el total y sale de multiplicar `precioPorDia` por los dias. Los
  // valores estan calculados con las mismas capas que la pieza publica, no elegidos a ojo.
  { id: '#1051', unidad: 'Amarok V6', patente: 'AJ 234 QR', cliente: 'Vialidad del Valle SRL', categoria: 'pickup', desde: '08/06', hasta: '12/06', dias: 5, temporada: 1, feriado: 1, precio: 515_200, estado: 'vencida', canal: 'mostrador' },
  { id: '#1050', unidad: 'Hilux SRV', patente: 'AF 345 KL', cliente: 'Obras del Sur', categoria: 'pickup', desde: '12/06', hasta: '17/06', dias: 6, temporada: 1, feriado: 1, precio: 618_240, estado: 'activa', canal: 'mostrador' },
  { id: '#1048', unidad: 'Cronos GSE', patente: 'AD 789 GH', cliente: 'J. Pérez', categoria: 'compacto', desde: '12/06', hasta: '13/06', dias: 2, temporada: 1, feriado: 1, precio: 104_000, estado: 'activa', canal: 'web' },
  { id: '#1054', unidad: 'Peugeot 208', patente: 'AL 890 UV', cliente: 'L. Arce', categoria: 'compacto', desde: '20/06', hasta: '23/06', dias: 4, temporada: 1.15, feriado: 1, precio: 220_064, estado: 'confirmada', canal: 'web' },
  { id: '#1053', unidad: 'Corolla Cross', patente: 'AH 901 OP', cliente: 'Turismo Andes', categoria: 'suv', desde: '21/06', hasta: '24/06', dias: 4, temporada: 1.15, feriado: 1, precio: 363_952, estado: 'confirmada', canal: 'mostrador' },
  { id: '#1052', unidad: 'Cronos GSE', patente: 'AD 789 GH', cliente: 'C. Vieyra', categoria: 'compacto', desde: '19/06', hasta: '23/06', dias: 5, temporada: 1.15, feriado: 1, precio: 275_080, estado: 'confirmada', canal: 'mostrador' },
  { id: '#1049', unidad: 'Corolla XEI', patente: 'AB 123 CD', cliente: 'M. Duarte', categoria: 'sedan', desde: '13/06', hasta: '15/06', dias: 3, temporada: 1, feriado: 1.25, precio: 220_800, estado: 'confirmada', canal: 'mostrador' },
  { id: '#1047', unidad: 'Onix LT', patente: 'AC 456 EF', cliente: 'Elektra SA', categoria: 'compacto', desde: '16/06', hasta: '19/06', dias: 4, temporada: 1.15, feriado: 1, precio: 220_064, estado: 'confirmada', canal: 'mostrador' },
  { id: '#1046', unidad: 'Duster 4x2', patente: 'AE 012 IJ', cliente: 'R. Sosa', categoria: 'suv', desde: '18/06', hasta: '20/06', dias: 3, temporada: 1.15, feriado: 1, precio: 272_964, estado: 'confirmada', canal: 'web' },
  { id: '#1045', unidad: 'Kangoo Furgón', patente: 'AK 567 ST', cliente: 'Bodega Alto Perdido', categoria: 'furgon', desde: '17/06', hasta: '19/06', dias: 3, temporada: 1.15, feriado: 1, precio: 298_356, estado: 'pendiente', canal: 'mostrador' },
  { id: '#1044', unidad: 'Peugeot 208', patente: 'AL 890 UV', cliente: 'P. Anselmi', categoria: 'compacto', desde: '14/06', hasta: '15/06', dias: 2, temporada: 1, feriado: 1.25, precio: 130_000, estado: 'pendiente_pago', canal: 'web' },
  { id: '#1043', unidad: 'Sin asignar', patente: 'Compacto B', cliente: 'D. Ruiz', categoria: 'compacto', desde: '14/06', hasta: '15/06', dias: 2, temporada: 1, feriado: 1.25, precio: 130_000, estado: 'confirmada', canal: 'web' },
  { id: '#1042', unidad: 'Sin asignar', patente: 'Sedán C', cliente: 'F. Ledesma', categoria: 'sedan', desde: '19/06', hasta: '22/06', dias: 4, temporada: 1.15, feriado: 1, precio: 270_848, estado: 'confirmada', canal: 'web' },
  { id: '#1041', unidad: 'Toyota Etios', patente: 'AM 123 WX', cliente: 'Turismo Andes', categoria: 'compacto', desde: '09/06', hasta: '12/06', dias: 4, temporada: 1, feriado: 1, precio: 191_360, estado: 'finalizada', canal: 'mostrador' },
  { id: '#1040', unidad: 'Nissan Frontier', patente: 'AN 456 YZ', cliente: 'G. Maidana', categoria: 'pickup', desde: '23/06', hasta: '25/06', dias: 3, temporada: 1.15, feriado: 1, precio: 355_488, estado: 'confirmada', canal: 'mostrador' },
];

// ─── Contratos ───────────────────────────────────────────────────────────────

export const CONTRATOS = [
  { numero: 'C-2026-0912', reserva: '#1049', cliente: 'M. Duarte', unidad: 'Corolla XEI', periodo: '13/06 → 15/06', clausulado: 'Versión 7', clausulas: 'Estándar', tipo: 'Alquiler', franquicia: 'Firmada', firma: 'Firmado en pantalla', estado: 'firmado' },
  { numero: 'C-2026-0913', reserva: '#1050', cliente: 'Obras del Sur', unidad: 'Hilux SRV', periodo: '12/06 → 17/06', clausulado: 'Versión 7', clausulas: '2 modificadas', tipo: 'Alquiler', franquicia: 'Sin firmar', firma: 'Link enviado · sin firmar', estado: 'pendiente' },
  { numero: 'C-2026-0914', reserva: '#1048', cliente: 'J. Pérez', unidad: 'Cronos GSE', periodo: '12/06 → 13/06', clausulado: 'Versión 7', clausulas: 'Estándar', tipo: 'Alquiler', franquicia: 'Firmada', firma: 'Firmado a distancia', estado: 'firmado' },
  { numero: 'C-2026-0915', reserva: '#1051', cliente: 'Vialidad del Valle SRL', unidad: 'Amarok V6', periodo: '08/06 → 12/06', clausulado: 'Versión 7', clausulas: 'Estándar', tipo: 'Alquiler', franquicia: 'Firmada', firma: 'Papel firmado, subido', estado: 'firmado' },
  { numero: 'C-2026-0916', reserva: '#1055', cliente: 'S. Medina', unidad: 'Chevrolet Prisma', periodo: '08/06 → 06/07', clausulado: 'Versión 7', clausulas: 'Estándar', tipo: 'Uber', franquicia: '—', firma: 'Firmado en pantalla', estado: 'firmado' },
  { numero: 'C-2024-0187', reserva: '#0187', cliente: 'Turismo Andes', unidad: 'Kwid Zen', periodo: '02/02 → 09/02 de 2024', clausulado: 'Versión 4 · congelada', clausulas: 'Estándar', tipo: 'Alquiler', franquicia: '—', firma: 'Firmado en pantalla', estado: 'archivado' },
  { numero: 'C-2026-0911', reserva: '#1039', cliente: 'C. Vieyra', unidad: 'Duster 4x2', periodo: '02/06 → 05/06', clausulado: 'Versión 7', clausulas: 'Estándar', tipo: 'Alquiler', franquicia: '—', firma: 'Anulado · error en el conductor', estado: 'anulado' },
];

/** El contrato de largo plazo / semanal: el valor se carga por semana y de ahí sale todo. */
export const CONTRATO_SEMANAL = {
  cliente: 'S. Medina',
  unidad: 'Chevrolet Prisma · AP 112 BC',
  desde: '08/06',
  hasta: '06/07',
  dias: 28,
  valorSemana: 190_000,
  kmSemana: 1_500,
  kmExtra: 150,
  pagos: ['08/06', '15/06', '22/06', '29/06'],
  total: 760_000,
  condicion: 'Semanal adelantada, por transferencia',
};

// ─── Caja ────────────────────────────────────────────────────────────────

export const CAJA_DEL_DIA = {
  total: 1_486_500,
  movimientos: [
    { hora: '08:42', concepto: 'Seña reserva #1047', cliente: 'Elektra SA', medio: 'transferencia', naturaleza: 'anticipo', monto: 95_680 },
    { hora: '09:10', concepto: 'Saldo alquiler #1049', cliente: 'M. Duarte', medio: 'efectivo', naturaleza: 'pago', monto: 192_000 },
    { hora: '09:55', concepto: 'Reserva web #1048', cliente: 'J. Pérez', medio: 'mercado_pago', naturaleza: 'pago', monto: 104_000 },
    { hora: '10:20', concepto: 'Cobro cuenta corriente', cliente: 'Turismo Andes', medio: 'echeq', naturaleza: 'echeq_en_cartera', monto: 96_000 },
    { hora: '11:05', concepto: 'Alquiler #1050 · 6 días', cliente: 'Obras del Sur', medio: 'cuenta_corriente', naturaleza: 'alquiler', monto: 672_000 },
    { hora: '11:40', concepto: 'Excedente por devolución tardía', cliente: 'Vialidad del Valle SRL', medio: 'tarjeta', naturaleza: 'excedente', monto: 48_300 },
    { hora: '12:15', concepto: 'Multa A-88214 imputada', cliente: 'C. Vieyra', medio: 'transferencia', naturaleza: 'multa', monto: 62_400 },
    { hora: '12:50', concepto: 'Devolución de garantía', cliente: 'J. Pérez', medio: 'transferencia', naturaleza: 'reembolso', monto: -84_000 },
  ],
};

/* Los cuatro tramos de antigüedad. Es la pantalla que contesta "¿cuánto me debe la empresa que
 * me alquila por mes, y desde cuándo?" — que un Excel no contesta. */
export const CUENTAS_CORRIENTES = [
  { cliente: 'Obras del Sur', condicion: 'cta_cte_60', t1: 0, t2: 1_240_000, t3: 0, t4: 0, total: 1_240_000 },
  { cliente: 'Vialidad del Valle SRL', condicion: 'cta_cte_90', t1: 180_000, t2: 0, t3: 460_000, t4: 0, total: 640_000 },
  { cliente: 'Elektra SA', condicion: 'cta_cte_30', t1: 380_000, t2: 0, t3: 0, t4: 0, total: 380_000 },
  { cliente: 'Turismo Andes', condicion: 'cta_cte_30', t1: 0, t2: 0, t3: 0, t4: 96_000, total: 96_000 },
  { cliente: 'Bodega Alto Perdido', condicion: 'cta_cte_15', t1: 0, t2: 0, t3: 0, t4: 0, total: 0 },
];

export const ECHEQS = [
  { numero: '0034-812447', cliente: 'Turismo Andes', banco: 'Banco del Valle', vence: '28/06', monto: 96_000, estado: 'en_cartera' as const },
  { numero: '0034-812501', cliente: 'Obras del Sur', banco: 'Banco Provincia', vence: '15/07', monto: 620_000, estado: 'en_cartera' as const },
  { numero: '0021-440188', cliente: 'Elektra SA', banco: 'Banco Nación', vence: '02/06', monto: 240_000, estado: 'cobrado' as const },
  { numero: '0021-440102', cliente: 'Vialidad del Valle SRL', banco: 'Banco Nación', vence: '20/05', monto: 180_000, estado: 'rechazado' as const },
  { numero: '0034-811990', cliente: 'Bodega Alto Perdido', banco: 'Banco del Valle', vence: '11/06', monto: 310_000, estado: 'depositado' as const },
  // Uno vencido sin cobrar y otro que vence esta semana: son las dos primeras secciones de la pantalla.
  { numero: '0034-811870', cliente: 'Vialidad del Valle SRL', banco: 'Banco Nación', vence: '08/06', monto: 150_000, estado: 'en_cartera' as const },
  { numero: '0034-812090', cliente: 'Elektra SA', banco: 'Banco Provincia', vence: '17/06', monto: 205_000, estado: 'en_cartera' as const },
];

// ─── Multas y daños ──────────────────────────────────────────────────────────

export const MULTAS = [
  { acta: 'A-88214', hecho: '18/05 · 14:22', lugar: 'Ruta 22 km 41', unidad: 'Cronos GSE', contrato: 'C-2026-0871', responsable: 'C. Vieyra', monto: 62_400, estado: 'imputada' as const },
  { acta: 'A-88907', hecho: '02/06 · 09:10', lugar: 'Av. San Martín 1400', unidad: 'Onix LT', contrato: 'C-2026-0902', responsable: 'Elektra SA · conductor 2', monto: 41_800, estado: 'pendiente' as const },
  { acta: 'A-89112', hecho: '28/04 · 19:47', lugar: 'Acceso norte', unidad: 'Hilux SRV', contrato: 'C-2026-0844', responsable: 'Obras del Sur', monto: 88_500, estado: 'cobrada' as const },
  { acta: 'A-89330', hecho: '05/06 · 11:02', lugar: 'Ruta 7 km 12', unidad: 'Amarok V6', contrato: 'C-2026-0908', responsable: 'Bodega Alto Perdido', monto: 55_200, estado: 'apelando' as const },
];

export const DANIOS = [
  { id: 'D-214', unidad: 'Corolla Cross', zona: 'Paragolpes trasero', tipo: 'abolladura', severidad: 'moderado' as const, detectado: 'Devolución 11/06', responsable: 'Cliente', fotos: 3, valor: 240_000 },
  { id: 'D-213', unidad: 'Toyota Etios', zona: 'Puerta delantera izq.', tipo: 'rayon', severidad: 'leve' as const, detectado: 'Devolución 16/06', responsable: 'Desgaste de uso', fotos: 2, valor: 0 },
  { id: 'D-211', unidad: 'Kwid Zen', zona: 'Parabrisas', tipo: 'cristal', severidad: 'grave' as const, detectado: 'Devolución 02/06', responsable: 'Terceros', fotos: 4, valor: 480_000 },
];

// ─── Adicionales ─────────────────────────────────────────────────────────────

/* Dos familias con gramática distinta, y eso es lo que evita que el mostrador venda dos
 * coberturas al mismo cliente: de cobertura se elige una, de extras se eligen varios. */
export const ADICIONALES = [
  { codigo: 'COB-BASE', nombre: 'Seguro obligatorio', familia: 'cobertura' as const, precio: 0, cobro: 'Incluido', tope: 1 },
  { codigo: 'COB-RED', nombre: 'Cobertura ampliada', familia: 'cobertura' as const, precio: 14_500, cobro: 'Por día', tope: 1 },
  { codigo: 'COB-TOT', nombre: 'Cobertura total', familia: 'cobertura' as const, precio: 23_800, cobro: 'Por día', tope: 1 },
  { codigo: 'EX-SILLA', nombre: 'Silla para bebé', familia: 'extra' as const, precio: 4_200, cobro: 'Por día', tope: 2 },
  { codigo: 'EX-PORTA', nombre: 'Portaequipaje de techo', familia: 'extra' as const, precio: 6_800, cobro: 'Por día', tope: 1 },
  { codigo: 'EX-CADEN', nombre: 'Cadenas para nieve', familia: 'extra' as const, precio: 9_500, cobro: 'Una sola vez', tope: 1 },
  { codigo: 'EX-COND', nombre: 'Conductor adicional', familia: 'extra' as const, precio: 5_600, cobro: 'Por día', tope: 3 },
  { codigo: 'EX-GPS', nombre: 'GPS', familia: 'extra' as const, precio: 3_400, cobro: 'Por día', tope: 1 },
  { codigo: 'EX-ENTR', nombre: 'Entrega en el aeropuerto', familia: 'extra' as const, precio: 18_000, cobro: 'Una sola vez', tope: 1 },
];

// ─── Precios ─────────────────────────────────────────────────────────────────

/* Las tres capas del motor. El precio sale de multiplicarlas sobre la tarifa
 * base de la categoría: se cargan una vez y valen todos los días del año. */
export const CAPAS_PRECIO = [
  {
    key: 'temporada',
    titulo: 'Capa 1 · Temporada',
    reglas: [
      { label: 'Baja', detalle: '01/03 a 14/06', factor: 1 },
      { label: 'Media', detalle: '15/06 a 14/12', factor: 1.15 },
      { label: 'Alta', detalle: '15/12 a 28/02', factor: 1.4 },
    ],
  },
  {
    key: 'feriado',
    titulo: 'Capa 2 · Feriado',
    reglas: [
      { label: 'Día común', detalle: 'Sin fecha especial', factor: 1 },
      { label: 'Fin de semana largo', detalle: '15/06 · Güemes, trasladado del miércoles', factor: 1.25 },
    ],
  },
  {
    key: 'duracion',
    titulo: 'Capa 3 · Duración',
    reglas: [
      { label: '1 a 2 días', detalle: 'Sin descuento', factor: 1 },
      { label: '3 a 6 días', detalle: '−8%', factor: 0.92 },
      { label: '7 o más', detalle: '−15%', factor: 0.85 },
    ],
  },
];

/** Las reglas cargadas en el calendario. Un solo valor por regla: web y mostrador comparten precio. */
export const REGLAS_CALENDARIO = [
  { desde: '15/06', hasta: '14/12', regla: 'Temporada media', categoria: 'Todas', valor: '× 1,15' },
  { desde: '13/06', hasta: '15/06', regla: 'Fin de semana largo', categoria: 'Todas', valor: '+ 25%' },
  { desde: '15/12', hasta: '28/02', regla: 'Temporada alta', categoria: 'Todas', valor: '× 1,40' },
  { desde: '01/06', hasta: '30/06', regla: 'Promo junio · pick-up', categoria: 'Pick-up D', valor: '− 12%' },
  { desde: '01/03', hasta: '14/06', regla: 'Temporada baja', categoria: 'Todas', valor: '× 1,00' },
];

// ─── Avisos ──────────────────────────────────────────────────────────────────

/* Las 29 reglas corren cada 30 minutos y todo queda en la campana del panel: el equipo no recibe
 * mails ni resumen de las 8 (se sacaron el 27/09). Los mails a los clientes siguen. Estas son las
 * que dispararon hoy. `canal` queda por compatibilidad con la réplica de Notificaciones. */
export const AVISOS = [
  { hora: '08:00', regla: 'Documento por vencer', detalle: 'Onix LT · la VTV vence el 03/07, faltan 21 días', urgencia: 'warning' as const, canal: 'Campana' },
  { hora: '08:00', regla: 'Devolución vencida', detalle: 'Amarok V6 · tenía que volver hoy a las 07:30 y no volvió', urgencia: 'danger' as const, canal: 'Campana' },
  { hora: '08:00', regla: 'Deuda vencida', detalle: 'Turismo Andes · $ 96.000 con más de 90 días sin cancelar', urgencia: 'danger' as const, canal: 'Campana' },
  { hora: '08:30', regla: 'Reserva sin unidad asignada', detalle: '2 reservas web confirmadas esperando auto', urgencia: 'info' as const, canal: 'Campana' },
  { hora: '09:00', regla: 'Service por kilómetro', detalle: 'Hilux SRV · faltan 1.060 km para el service de 90.000', urgencia: 'warning' as const, canal: 'Campana' },
  { hora: '09:00', regla: 'Echeq por cobrar', detalle: 'Bodega Alto Perdido · 0034-811990 por $ 310.000, venció el 11/06', urgencia: 'warning' as const, canal: 'Campana' },
  { hora: '09:30', regla: 'Fecha especial sin tarifa', detalle: 'El 15/06 es feriado y Furgón no tiene precio cargado', urgencia: 'warning' as const, canal: 'Campana' },
  { hora: '10:00', regla: 'Contrato sin firmar', detalle: 'Obras del Sur · contrato C-2026-0913 con el link enviado y sin firmar', urgencia: 'warning' as const, canal: 'Campana' },
];

// ─── Reportes ────────────────────────────────────────────────────────────────

export const OCUPACION_POR_UNIDAD = [
  { unidad: 'Hilux SRV', alquileres: 9, dias: 24, ocupacion: 80, ingresos: 2_688_000, gastos: 412_000 },
  { unidad: 'Corolla XEI', alquileres: 11, dias: 22, ocupacion: 73, ingresos: 1_408_000, gastos: 186_000 },
  { unidad: 'Duster 4x2', alquileres: 8, dias: 21, ocupacion: 70, ingresos: 1_806_000, gastos: 240_000 },
  { unidad: 'Onix LT', alquileres: 12, dias: 20, ocupacion: 67, ingresos: 1_040_000, gastos: 132_000 },
  { unidad: 'Amarok V6', alquileres: 6, dias: 18, ocupacion: 60, ingresos: 2_016_000, gastos: 388_000 },
  { unidad: 'Cronos GSE', alquileres: 10, dias: 17, ocupacion: 57, ingresos: 884_000, gastos: 96_000 },
  { unidad: 'Kangoo Furgón', alquileres: 4, dias: 12, ocupacion: 40, ingresos: 1_128_000, gastos: 154_000 },
  { unidad: 'Kwid Zen', alquileres: 3, dias: 7, ocupacion: 23, ingresos: 364_000, gastos: 298_000 },
];

export const INGRESOS_POR_MES = [
  { mes: 'Ene', ingresos: 14_200_000, egresos: 4_100_000 },
  { mes: 'Feb', ingresos: 13_600_000, egresos: 3_800_000 },
  { mes: 'Mar', ingresos: 9_400_000, egresos: 3_200_000 },
  { mes: 'Abr', ingresos: 7_800_000, egresos: 2_900_000 },
  { mes: 'May', ingresos: 8_100_000, egresos: 3_050_000 },
  { mes: 'Jun', ingresos: 10_900_000, egresos: 3_400_000 },
];

// ─── Cotizador ───────────────────────────────────────────────────────────────

export const COTIZACION = {
  numero: 'P-0433',
  empresa: 'Bodega Alto Perdido',
  contacto: 'Compras',
  modalidad: 'Alquiler mensual',
  desde: '01/07',
  hasta: '31/12',
  vehiculos: [
    { categoria: 'Pick-up D', cantidad: 2, precioMes: 2_240_000 },
    { categoria: 'Compacto B', cantidad: 3, precioMes: 1_560_000 },
  ],
  nota: 'Mantenimiento y seguro a cargo de la rentadora. Kilometraje libre dentro de la provincia.',
};

export const PRESUPUESTOS = [
  { numero: 'P-0433', cliente: 'Bodega Alto Perdido', emitido: '10/06', total: 3_800_000, estado: 'Enviado por mail' },
  { numero: 'P-0432', cliente: 'Elektra SA', emitido: '08/06', total: 1_920_000, estado: 'Visto' },
  { numero: 'P-0431', cliente: 'D. Ruiz', emitido: '05/06', total: 312_000, estado: 'Convertido en reserva' },
  { numero: 'P-0430', cliente: 'Turismo Andes', emitido: '02/06', total: 2_460_000, estado: 'Vencido' },
];

// ─── Canal web ───────────────────────────────────────────────────────────────

export const CANAL_WEB = {
  ventanaVenta: '48 horas de anticipación mínima',
  cupoWeb: '60% de la flota disponible',
  retencion: '20 minutos',
  medios: ['Mercado Pago', 'Transferencia'],
  solicitudes: [
    { fecha: '12/06 08:14', nombre: 'S. Quiroga', motivo: 'fuera_de_ventana', detalle: 'Quiere para mañana a la mañana' },
    { fecha: '11/06 21:40', nombre: 'Camping El Sauce', motivo: 'sin_cupo', detalle: 'Furgón para el fin de semana largo' },
    { fecha: '11/06 18:02', nombre: 'H. Brizuela', motivo: 'otro_lugar', detalle: 'Entrega en el paraje, a 40 km' },
  ],
};

// ─── Auditoría ───────────────────────────────────────────────────────────────

export const AUDITORIA = [
  { hora: '12:15', usuario: 'mostrador', accion: 'Imputó la multa A-88214', entidad: 'Multa', detalle: 'Responsable: C. Vieyra' },
  { hora: '11:40', usuario: 'mostrador', accion: 'Cobró excedente por devolución tardía', entidad: 'Alquiler #1051', detalle: '$ 48.300 · tarjeta' },
  { hora: '10:55', usuario: 'admin', accion: 'Modificó la tarifa base', entidad: 'Categoría Pick-up D', detalle: '$ 108.000 → $ 112.000' },
  { hora: '10:20', usuario: 'mostrador', accion: 'Registró un echeq en cartera', entidad: 'Turismo Andes', detalle: '0034-812447 · vence 28/06' },
  { hora: '09:12', usuario: 'admin', accion: 'Publicó el clausulado versión 7', entidad: 'Contratos', detalle: 'Reemplaza a la versión 6' },
  { hora: '08:47', usuario: 'mostrador', accion: 'Asignó unidad a una reserva web', entidad: 'Reserva #1044', detalle: 'Kangoo Furgón · AK 567 ST' },
];

// ─── Fechas especiales ───────────────────────────────────────────────────────

/* Feriados, fines de semana largos y temporadas, cargados una vez y con color propio en el
 * calendario de precios. El 20/06 está cargado como feriado pero NO arma fin de semana largo:
 * en 2026 cae sábado y es inamovible. El que lo arma es el 17/06, que es trasladable y al caer
 * miércoles se corre al lunes 15. */
export const FECHAS_ESPECIALES = [
  { desde: '13/06', hasta: '15/06', nombre: 'Güemes · trasladado al lunes', tipo: 'fin_semana_largo', color: 'rojo', tarifa: 'Cargada · +25%' },
  { desde: '20/06', hasta: '20/06', nombre: 'Día de la Bandera', tipo: 'feriado', color: 'rojo', tarifa: 'Cargada · +25%' },
  { desde: '09/07', hasta: '09/07', nombre: 'Día de la Independencia', tipo: 'feriado', color: 'rojo', tarifa: 'Cargada · +25%' },
  { desde: '15/06', hasta: '14/12', nombre: 'Temporada media', tipo: 'temporada', color: 'azul', tarifa: 'Cargada · × 1,15' },
  { desde: '15/12', hasta: '28/02', nombre: 'Temporada alta', tipo: 'temporada', color: 'violeta', tarifa: 'Cargada · × 1,40' },
  { desde: '17/08', hasta: '17/08', nombre: 'San Martín · trasladable', tipo: 'feriado', color: 'ambar', tarifa: 'Sin tarifa cargada' },
];

// ─── Configuración ───────────────────────────────────────────────────────────

export const CONFIGURACION = {
  empresa: [
    ['Razón social', 'Rentadora del Valle SRL'],
    ['CUIT', '30-71482-9'],
    ['Condición frente al IVA', 'Responsable Inscripto'],
    ['Domicilio', 'Av. San Martín 1240, San Ramón del Valle'],
  ],
  operacion: [
    ['Sucursales', 'Casa central · Aeropuerto'],
    ['Período de gracia en la devolución', '40 minutos'],
    ['Cargo por hora excedida', '$ 28.000'],
    ['Clausulado vigente', 'Versión 7 · publicada el 12/06'],
  ],
  avisos: [
    ['Dónde llegan los avisos', 'La campana del panel'],
    ['Frecuencia de las reglas', 'Cada 30 minutos'],
    ['Reglas activas', '29 de 29'],
    ['Mails a clientes', 'Activados'],
  ],
};

// ─── Simulador de precios ────────────────────────────────────────────────────

/* Contesta "¿mi promo le está ganando a la tarifa del auto?" sin tener que crear una reserva de
 * prueba. Estaba escondido abajo de todo dentro de la pantalla de precios y casi nadie sabía
 * que existía; ahora tiene entrada propia en el menú. */
export const SIMULACION = {
  categoria: 'Pick-up D',
  desde: '13/06',
  hasta: '15/06',
  dias: 3,
  capas: [
    ['Tarifa base · Pick-up D', '$ 112.000'],
    ['Capa 1 · Temporada baja (01/03 al 14/06)', '—'],
    ['Capa 2 · Fin de semana largo', '× 1,25'],
    ['Capa 3 · 3 a 6 días', '× 0,92'],
  ],
  porDia: 128_800,
  total: 386_400,
  promo: {
    nombre: 'Promo junio · pick-up',
    efecto: '− 12% en todo junio',
    gana: 'Una sola regla para web y mostrador: lo que cargás vale para los dos.',
  },
};
