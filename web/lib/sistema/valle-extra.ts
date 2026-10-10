/* Los datos de lo que entró al sistema después de septiembre: la caja (con la planilla del
 * adicional de socios), los prospectos, el resumen de reportes y los papeles de la flota.
 *
 * Todo ficticio, igual que `valle.ts`, y con el mismo reloj: **viernes 12/06/2026, 09:14**. Los
 * alquileres de la planilla salen de `RESERVAS` donde se puede (misma patente, mismo cliente,
 * mismas fechas, mismo precio) y suman cuatro alquileres de la primera semana del mes que ya
 * cerraron, para que la planilla tenga cobrados y no sólo pendientes.
 *
 * Los nombres de los socios y de las empresas prospecto están inventados: ninguno sale de una
 * base real. Es la regla más dura del repo. */

import { RESERVAS } from './valle';

// ─── Fechas ──────────────────────────────────────────────────────────────────

/** Días desde el 12/06/2026 hasta una fecha dd/mm/aaaa. Negativo si ya pasó. */
export function diasDesdeHoy(fecha: string): number {
  const [d, m, a] = fecha.split('/').map(Number);
  const hoy = Date.UTC(2026, 5, 12);
  return Math.round((Date.UTC(a, m - 1, d) - hoy) / 86_400_000);
}

// ─── Socios ──────────────────────────────────────────────────────────────────

export type Socio = { id: string; nombre: string; porcentaje: number };

export const SOCIOS: Socio[] = [
  { id: 'lucia', nombre: 'Lucía Benítez', porcentaje: 50 },
  { id: 'tomas', nombre: 'Tomás Aguirre', porcentaje: 50 },
];

// ─── Alquileres del mes (planilla de la Caja) ────────────────────────────────

export type Alquiler = {
  id: string;
  patente: string;
  retiro: string;
  devolucion: string;
  cliente: string;
  dias: number;
  porDia: number;
  conFactura: number;
  sinFactura: number;
  medio: string;
  cobrado: boolean;
  fechaCobro?: string;
  /** Quién cobró. Vacío con `cobrado` = cobro sin socio asignado (⚠). */
  cobro: string[];
  repartido: boolean;
  /** Para "A cobrar": estado del alquiler. */
  estado: string;
};

type Cobro = {
  medio: string;
  cobrado: boolean;
  fechaCobro?: string;
  cobro: string[];
  repartido: boolean;
  /** Parte del total que va sin factura. */
  sinFactura?: number;
};

/* Cuatro alquileres de la primera semana de junio, ya devueltos. No están en `RESERVAS` (que
 * arranca el 08/06) y son los que dan cobros, repartidos y un pendiente viejo. */
const PRIMERA_SEMANA: Alquiler[] = [
  { id: '#1036', patente: 'AK 567 ST', retiro: '01/06 09:00', devolucion: '04/06 18:00', cliente: 'Bodega Alto Perdido', dias: 4, porDia: 86_480, conFactura: 345_920, sinFactura: 0, medio: 'cuenta_corriente', cobrado: false, cobro: [], repartido: false, estado: 'finalizada' },
  { id: '#1037', patente: 'AB 123 CD', retiro: '03/06 10:00', devolucion: '05/06 10:00', cliente: 'C. Vieyra', dias: 3, porDia: 58_880, conFactura: 100_000, sinFactura: 76_640, medio: 'efectivo', cobrado: true, fechaCobro: '05/06', cobro: ['Lucía Benítez'], repartido: true, estado: 'finalizada' },
  { id: '#1038', patente: 'AC 456 EF', retiro: '02/06 08:30', devolucion: '06/06 08:30', cliente: 'Elektra SA', dias: 4, porDia: 47_840, conFactura: 191_360, sinFactura: 0, medio: 'transferencia', cobrado: true, fechaCobro: '08/06', cobro: ['Tomás Aguirre'], repartido: true, estado: 'finalizada' },
];

/* Lo que pasó con la plata de las reservas de `RESERVAS` que ya tienen auto. Las que no figuran
 * acá todavía no se cobraron. */
const COBROS: Record<string, Cobro> = {
  '#1041': { medio: 'transferencia', cobrado: true, fechaCobro: '12/06', cobro: ['Lucía Benítez'], repartido: false },
  '#1048': { medio: 'mercado_pago', cobrado: true, fechaCobro: '12/06', cobro: [], repartido: false },
  '#1050': { medio: 'cuenta_corriente', cobrado: false, cobro: [], repartido: false },
  '#1051': { medio: 'cuenta_corriente', cobrado: false, cobro: [], repartido: false },
  '#1047': { medio: 'cuenta_corriente', cobrado: false, cobro: [], repartido: false },
  '#1053': { medio: 'cuenta_corriente', cobrado: false, cobro: [], repartido: false },
};

function hora(fecha: string, h: string) {
  return `${fecha} ${h}`;
}

const DELA_AGENDA: Alquiler[] = RESERVAS.filter(
  (r) => r.unidad !== 'Sin asignar' && r.estado !== 'pendiente' && r.estado !== 'pendiente_pago',
).map((r) => {
  const c = COBROS[r.id] ?? { medio: 'efectivo', cobrado: false, cobro: [], repartido: false };
  const sin = c.sinFactura ?? 0;
  return {
    id: r.id,
    patente: r.patente,
    retiro: hora(r.desde, '10:00'),
    devolucion: hora(r.hasta, '10:00'),
    cliente: r.cliente,
    dias: r.dias,
    porDia: Math.round(r.precio / r.dias),
    conFactura: r.precio - sin,
    sinFactura: sin,
    medio: c.medio,
    cobrado: c.cobrado,
    fechaCobro: c.fechaCobro,
    cobro: c.cobro,
    repartido: c.repartido,
    estado: r.estado,
  };
});

/** Los alquileres de junio, del más viejo al más nuevo por retiro. */
export const ALQUILERES_MES: Alquiler[] = [...PRIMERA_SEMANA, ...DELA_AGENDA].sort((a, b) =>
  a.retiro.slice(0, 5).split('/').reverse().join('').localeCompare(b.retiro.slice(0, 5).split('/').reverse().join('')),
);

export const totalAlquiler = (a: Alquiler) => a.conFactura + a.sinFactura;

/** Lo que queda para repartir de un alquiler cobrado: sin el IVA de lo facturado. */
export const aRepartir = (a: Alquiler) =>
  a.cobrado ? Math.round(a.conFactura / 1.21 + a.sinFactura) : 0;

export const TOTALES_MES = (() => {
  const conFactura = ALQUILERES_MES.reduce((x, a) => x + a.conFactura, 0);
  const sinFactura = ALQUILERES_MES.reduce((x, a) => x + a.sinFactura, 0);
  const cobrados = ALQUILERES_MES.filter((a) => a.cobrado);
  const ingresado = cobrados.reduce((x, a) => x + totalAlquiler(a), 0);
  const repartible = ALQUILERES_MES.reduce((x, a) => x + aRepartir(a), 0);
  const sinSocio = cobrados.filter((a) => a.cobro.length === 0).reduce((x, a) => x + totalAlquiler(a), 0);
  return { conFactura, sinFactura, total: conFactura + sinFactura, ingresado, repartible, sinSocio };
})();

/** Lo cobrado por cada socio (sin asignar aparte), para la compensación del mes. */
export const COBRADO_POR_SOCIO = SOCIOS.map((s) => ({
  socio: s,
  cobrado: ALQUILERES_MES.filter((a) => a.cobro.includes(s.nombre)).reduce((x, a) => x + totalAlquiler(a), 0),
}));

/** Cuánto le pasa uno al otro para quedar parejos, sobre lo cobrado con socio asignado. */
export const COMPENSACION = (() => {
  const total = COBRADO_POR_SOCIO.reduce((x, c) => x + c.cobrado, 0);
  const [a, b] = COBRADO_POR_SOCIO;
  const debeA = Math.round((total * a.socio.porcentaje) / 100);
  const dif = a.cobrado - debeA; // positivo: a cobró de más y le pasa a b
  return dif >= 0
    ? { de: a.socio.nombre, a: b.socio.nombre, monto: dif }
    : { de: b.socio.nombre, a: a.socio.nombre, monto: -dif };
})();

/** Ingresado en el mes por medio de pago y por socio. */
export const INGRESADO_POR_MEDIO = (() => {
  const filas: { medio: string; porSocio: number[]; sinAsignar: number; total: number }[] = [];
  for (const a of ALQUILERES_MES.filter((x) => x.cobrado)) {
    let fila = filas.find((f) => f.medio === a.medio);
    if (!fila) {
      fila = { medio: a.medio, porSocio: SOCIOS.map(() => 0), sinAsignar: 0, total: 0 };
      filas.push(fila);
    }
    const i = SOCIOS.findIndex((s) => a.cobro.includes(s.nombre));
    if (i >= 0) fila.porSocio[i] += totalAlquiler(a);
    else fila.sinAsignar += totalAlquiler(a);
    fila.total += totalAlquiler(a);
  }
  return filas;
})();

export const GASTOS_DEL_MES = { monto: 412_000, cantidad: 6 };

// ─── A cobrar ────────────────────────────────────────────────────────────────

export type ACobrar = {
  cliente: string;
  patente: string;
  retiro: string;
  devolucion: string;
  total: number;
  falta: number;
  medio: string;
  /** Días desde la devolución; null si el auto todavía no volvió. */
  dias: number | null;
};

export const A_COBRAR: ACobrar[] = ALQUILERES_MES.filter((a) => !a.cobrado).map((a) => {
  const dev = diasDesdeHoy(`${a.devolucion.slice(0, 5)}/2026`);
  return {
    cliente: a.cliente,
    patente: a.patente,
    retiro: a.retiro,
    devolucion: a.devolucion,
    total: totalAlquiler(a),
    falta: totalAlquiler(a),
    medio: a.medio,
    dias: dev <= 0 ? -dev : null,
  };
}).sort((x, y) => (y.dias ?? -1) - (x.dias ?? -1));

// ─── Prospectos ──────────────────────────────────────────────────────────────

export type Prospecto = {
  id: number;
  nombre: string;
  ciudad: string;
  direccion: string;
  segmento: string;
  mail?: string;
  telefono?: string;
  estado: 'Nuevo' | 'Contactado' | 'Respondió' | 'Cliente' | 'Descartado' | 'No contactar';
  /** Cómo cruzó con la base de clientes. */
  cruce?: { tipo: 'mail' | 'teléfono' | 'dominio' } | { tipo: 'nombre'; con: string };
  contactadoAntes?: boolean;
  noContactar?: boolean;
};

export const PROSPECTOS: Prospecto[] = [
  { id: 1, nombre: 'Constructora Meseta SA', ciudad: 'Neuquén', direccion: 'Av. Argentina 1180', segmento: 'Constructoras', mail: 'compras@constructorameseta.example', telefono: '299 555-0142', estado: 'Nuevo' },
  { id: 2, nombre: 'Servicios Cañadón SRL', ciudad: 'Comodoro Rivadavia', direccion: 'Ruta 3 km 1850', segmento: 'Petróleo y servicios', mail: 'flota@canadonservicios.example', estado: 'Contactado', contactadoAntes: true },
  { id: 3, nombre: 'Elektra Servicios Patagonia', ciudad: 'Neuquén', direccion: 'Belgrano 640', segmento: 'Energía', mail: 'admin@elektra.example', telefono: '299 555-0177', estado: 'Cliente', cruce: { tipo: 'dominio' } },
  { id: 4, nombre: 'Obras Sur Patagonia SRL', ciudad: 'Río Gallegos', direccion: 'Roca 25', segmento: 'Constructoras', telefono: '2966 55-0119', estado: 'Nuevo', cruce: { tipo: 'nombre', con: 'Obras del Sur' } },
  { id: 5, nombre: 'Península Aventura Turismo', ciudad: 'Puerto Madryn', direccion: 'Av. Roca 790', segmento: 'Turismo', mail: 'reservas@peninsulaaventura.example', telefono: '280 455-0188', estado: 'Respondió', contactadoAntes: true },
  { id: 6, nombre: 'Agroalimentos del Limay', ciudad: 'Cipolletti', direccion: 'Ruta 22 km 1190', segmento: 'Agro', mail: 'logistica@agrolimay.example', estado: 'Nuevo' },
  { id: 7, nombre: 'Transporte Los Arrayanes', ciudad: 'San Carlos de Bariloche', direccion: 'Onelli 410', segmento: 'Transporte', telefono: '294 455-0133', estado: 'No contactar', noContactar: true },
  { id: 8, nombre: 'Ingeniería Costa Austral', ciudad: 'Trelew', direccion: 'Belgrano 355', segmento: 'Constructoras', mail: 'info@costaustral.example', telefono: '280 442-0161', estado: 'Nuevo' },
];

export const PROSPECTOS_TARJETAS = {
  base: 412,
  escribibles: 318,
  clientes: 21,
  noContactar: 9,
};

export const SEGMENTOS = [
  'Constructoras (96)',
  'Petróleo y servicios (74)',
  'Turismo (58)',
  'Agro (51)',
  'Transporte (47)',
];

// ─── Reportes · Resumen ──────────────────────────────────────────────────────

/** El resumen se muestra sobre mayo, el último mes cerrado, contra abril. */
export const RESUMEN_REPORTES = {
  mes: 'mayo 2026',
  anterior: 'abril 2026',
  ingresado: { valor: 8_100_000, variacion: 3.8 },
  faltaCobrar: { valor: 2_356_000, alquileres: 7, variacion: -6.1 },
  ocupacion: { valor: 59, autos: 8 },
};

/** Lo que falta cobrar, por días desde la devolución. Suma lo mismo que las cuentas corrientes. */
export const ANTIGUEDAD = [
  { tramo: 'Hasta 7 días', monto: 380_000, tono: 'info' as const },
  { tramo: '8 a 15', monto: 520_000, tono: 'warning' as const },
  { tramo: '16 a 30', monto: 1_240_000, tono: 'danger' as const },
  { tramo: 'Más de 30', monto: 216_000, tono: 'danger' as const },
];

export const REPARTO_MAYO = {
  porSocio: SOCIOS.map((s) => ({ ...s, parte: Math.round((6_980_000 * s.porcentaje) / 100) })),
  gastos: 3_050_000,
  transferencia: { de: 'Lucía Benítez', a: 'Tomás Aguirre', monto: 214_000 },
};

// ─── Flota · papeles ─────────────────────────────────────────────────────────

/** La fecha dd/mm/aaaa de dentro de N días (contados desde el 12/06/2026). */
export function fechaEn(dias: number): string {
  const d = new Date(Date.UTC(2026, 5, 12) + dias * 86_400_000);
  const dd = String(d.getUTCDate()).padStart(2, '0');
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}/${d.getUTCFullYear()}`;
}

// ─── Contratos ───────────────────────────────────────────────────────────────

export const CLAUSULAS_EDITABLES = [
  { n: 'Cláusula 4 · Combustible', modificada: false },
  { n: 'Cláusula 7 · Franquicia por daños', modificada: true },
  { n: 'Cláusula 9 · Kilometraje', modificada: false },
  { n: 'Cláusula 12 · Conductores autorizados', modificada: true },
];

// ─── Notificaciones (solo en la plataforma) ──────────────────────────────────

export const MAILS_ENVIADOS = [
  { hora: '09:02', para: 'Obras del Sur', asunto: 'Tu contrato C-2026-0913 para firmar' },
  { hora: '08:47', para: 'M. Duarte', asunto: 'Confirmamos tu reserva #1049' },
  { hora: '08:15', para: 'J. Pérez', asunto: 'Recibimos tu pago · reserva #1048' },
];

/** Marca, año, color y tipo de cada unidad, para el renglón de la tabla de vehículos. */
export const DETALLE_FLOTA: Record<string, { marca: string; anio: number; color: string; tipo: 'Auto' | 'Camioneta' | 'Utilitario' }> = {
  'AB 123 CD': { marca: 'Toyota', anio: 2023, color: 'Gris', tipo: 'Auto' },
  'AC 456 EF': { marca: 'Chevrolet', anio: 2022, color: 'Blanco', tipo: 'Auto' },
  'AD 789 GH': { marca: 'Fiat', anio: 2024, color: 'Rojo', tipo: 'Auto' },
  'AE 012 IJ': { marca: 'Renault', anio: 2022, color: 'Naranja', tipo: 'Camioneta' },
  'AF 345 KL': { marca: 'Toyota', anio: 2021, color: 'Blanco', tipo: 'Camioneta' },
  'AG 678 MN': { marca: 'Renault', anio: 2023, color: 'Azul', tipo: 'Auto' },
  'AH 901 OP': { marca: 'Toyota', anio: 2024, color: 'Negro', tipo: 'Camioneta' },
  'AJ 234 QR': { marca: 'Volkswagen', anio: 2022, color: 'Gris', tipo: 'Camioneta' },
  'AK 567 ST': { marca: 'Renault', anio: 2021, color: 'Blanco', tipo: 'Utilitario' },
  'AL 890 UV': { marca: 'Peugeot', anio: 2024, color: 'Gris', tipo: 'Auto' },
  'AM 123 WX': { marca: 'Toyota', anio: 2020, color: 'Plata', tipo: 'Auto' },
  'AN 456 YZ': { marca: 'Nissan', anio: 2023, color: 'Blanco', tipo: 'Camioneta' },
  'AP 112 BC': { marca: 'Chevrolet', anio: 2021, color: 'Gris', tipo: 'Auto' },
  'AQ 334 DE': { marca: 'Fiat', anio: 2023, color: 'Blanco', tipo: 'Auto' },
};
