/* El catálogo de las pantallas del panel.
 *
 * Son exactamente las rutas que resuelve `rentago-system/panel/src/App.tsx` (recontado el
 * 06/10/2026), sin contar las de detalle (`/flota/:id`, `/clientes/:id`), los redirects
 * (`/finanzas`, `/cuentas-corrientes`, `/echeqs`) ni los alias de precios. `/flota/categorias` y
 * `/canal-web` cuentan como pantallas propias.
 *
 * Cambios del 06/10: `finanzas` pasó a `caja` (misma pantalla, renombrada; Cuentas corrientes y
 * Echeqs son pestañas suyas, no pantallas) y entró `prospectos`.
 *
 * **Veinte es un número que se afirma en público, así que se cuenta acá.** La cifra de la home
 * sale de `PANTALLAS.length` en vez de estar escrita a mano en dos lugares.
 *
 * `modulo` es el slug del módulo comercial al que pertenece, en `lib/contenido.ts`. Varias
 * pantallas comparten módulo: los 13 módulos son cómo se vende, las 20 pantallas son cómo se
 * usa. */

export type Pantalla = {
  slug: string;
  /** La ruta real dentro del sistema. */
  ruta: string;
  /** El título que muestra el encabezado de la aplicación. */
  titulo: string;
  /** Una línea: qué resuelve. Va al pie del marco en `/sistema`. */
  resuelve: string;
  /** Slug del módulo comercial en `MODULOS`. */
  modulo: string;
  /** Si ya tiene componente de réplica construido. */
  lista: boolean;
  /** La pantalla ocupa todo el alto, sin padding: tiene layout propio. */
  completa?: boolean;
};

export const PANTALLAS: Pantalla[] = [
  {
    slug: 'ocupacion',
    ruta: '/ocupacion',
    titulo: 'Ocupación',
    resuelve:
      'Una fila por auto, una columna por día. El botón Hoy te lleva al día, y la vista anual muestra el año entero.',
    modulo: 'ocupacion',
    lista: true,
    completa: true,
  },
  {
    slug: 'reservas',
    ruta: '/reservas',
    titulo: 'Reservas y Alquileres',
    resuelve:
      'Todas las reservas, con origen web o mostrador. Si el auto se pisa, avisa y te deja seguir. La devolución vencida late en rojo.',
    modulo: 'reservas',
    lista: true,
  },
  {
    slug: 'contratos',
    ruta: '/contratos',
    titulo: 'Contratos',
    resuelve:
      'Cláusulas editables, contrato de largo plazo / semanal, franquicia, firma en pantalla y un snapshot que reimprime idéntico años después.',
    modulo: 'contratos',
    lista: true,
  },
  {
    slug: 'flota',
    ruta: '/flota',
    titulo: 'Flota',
    resuelve:
      'Patente grande, estado, VTV y póliza con fecha, y cuántos km faltan para el service. Baja con motivo.',
    modulo: 'flota',
    lista: true,
  },
  {
    slug: 'categorias',
    ruta: '/flota/categorias',
    titulo: 'Categorías y precios',
    resuelve:
      'La franquicia base de cada categoría, las coberturas que la bajan y la tarifa desde la que arranca el motor de precios.',
    modulo: 'categorias-y-coberturas',
    lista: true,
  },
  {
    slug: 'multas',
    ruta: '/multas',
    titulo: 'Multas',
    resuelve:
      'Con la fecha del hecho, el sistema encuentra el alquiler que estaba vigente y el conductor responsable.',
    modulo: 'multas-y-danos',
    lista: true,
  },
  {
    slug: 'clientes',
    ruta: '/clientes',
    titulo: 'Clientes',
    resuelve:
      'Particular o empresa con su representante, hasta tres conductores por contrato y su documentación.',
    modulo: 'clientes',
    lista: true,
  },
  {
    slug: 'caja',
    ruta: '/caja',
    titulo: 'Caja',
    resuelve:
      'Lo que falta cobrar, la caja del día, los cobros, los echeqs y las cuentas corrientes. El reparto entre socios, como adicional.',
    modulo: 'caja',
    lista: true,
  },
  {
    slug: 'reportes',
    ruta: '/reportes',
    titulo: 'Reportes',
    resuelve:
      'Un resumen del mes contra el anterior, más ingresos, flota y demanda no atendida. Ingresos y Flota se exportan a CSV.',
    modulo: 'avisos-reportes',
    lista: true,
  },
  {
    slug: 'notificaciones',
    ruta: '/notificaciones',
    titulo: 'Notificaciones',
    resuelve:
      '31 reglas de aviso revisan todo cada 30 minutos. Todo queda en la campana: un aviso por asunto.',
    modulo: 'avisos-reportes',
    lista: true,
  },
  {
    slug: 'cotizador',
    ruta: '/cotizador',
    titulo: 'Cotizador',
    resuelve:
      'El presupuesto sale con el precio del motor, en PDF para mandar, y queda con seguimiento en la ficha del cliente.',
    modulo: 'cotizador',
    lista: true,
    completa: true,
  },
  {
    slug: 'prospectos',
    ruta: '/prospectos',
    titulo: 'Prospectos',
    resuelve:
      'Módulo opcional. Empresas que podrían alquilarte, ya cruzadas con tus clientes. Elegís un grupo, armás la campaña y queda lista.',
    modulo: 'captacion',
    lista: true,
  },
  {
    slug: 'precios',
    ruta: '/precios',
    titulo: 'Precios',
    resuelve:
      'Las tres capas del motor sobre un calendario. Un solo precio para la web y el mostrador, y la promo que se da de baja sin tocar el resto.',
    modulo: 'precios',
    lista: true,
  },
  {
    slug: 'simulador',
    ruta: '/precios/simulador',
    titulo: 'Simulador de precios',
    resuelve:
      'Contesta “¿mi promo le está ganando a la tarifa del auto?” sin tener que crear una reserva de prueba.',
    modulo: 'precios',
    lista: true,
  },
  {
    slug: 'adicionales',
    ruta: '/adicionales',
    titulo: 'Adicionales',
    resuelve:
      'Coberturas —se elige una— y extras —se eligen varios—, cada uno por día o una sola vez, y con tope por reserva.',
    modulo: 'categorias-y-coberturas',
    lista: true,
  },
  {
    slug: 'fechas-especiales',
    ruta: '/fechas-especiales',
    titulo: 'Fechas especiales',
    resuelve:
      'Feriados, fines de semana largos y temporadas, cargados una vez y con color propio en el calendario de precios.',
    modulo: 'precios',
    lista: true,
  },
  {
    slug: 'canal-web',
    ruta: '/canal-web',
    titulo: 'Canal web',
    resuelve:
      'Cómo vende el sitio: la ventana de anticipación, el cupo que se libera a la web y los medios de cobro.',
    modulo: 'tu-web',
    lista: true,
  },
  {
    slug: 'reservas-web',
    ruta: '/reservas-web',
    titulo: 'Reservas web',
    resuelve:
      'La bandeja de lo que entró por el sitio, y las solicitudes de contacto con el motivo por el que esa persona no pudo reservar sola.',
    modulo: 'tu-web',
    lista: true,
  },
  {
    slug: 'auditoria',
    ruta: '/auditoria',
    titulo: 'Auditoría',
    resuelve: 'Quién hizo qué y cuándo. Un precio que cambió solo no existe: lo cambió alguien.',
    modulo: 'avisos-reportes',
    lista: true,
  },
  {
    slug: 'configuracion',
    ruta: '/configuracion',
    titulo: 'Configuración',
    resuelve:
      'Los datos de la empresa, las sucursales, los plazos del excedente y el clausulado vigente.',
    modulo: 'avisos-reportes',
    lista: true,
  },
];

/** Las que ya tienen réplica construida. */
export const PANTALLAS_LISTAS = PANTALLAS.filter((p) => p.lista);

export function pantalla(slug: string): Pantalla | undefined {
  return PANTALLAS.find((p) => p.slug === slug);
}

/** Las pantallas de un módulo comercial, en el orden del catálogo. */
export function pantallasDelModulo(modulo: string): Pantalla[] {
  return PANTALLAS.filter((p) => p.modulo === modulo);
}
