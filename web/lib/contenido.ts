/* Toda la copy de RentaGo vive acá.
 *
 * La regla del repo es que el copy lo decide Gael. Si está en un solo archivo tipado, lo
 * edita sin tocar una línea de JSX y sin riesgo de romper el marcado. Los componentes no
 * llevan texto literal: si aparece uno, es un bug.
 *
 * Las cifras están contadas sobre el código del sistema (recontado el 17/10/2026 sobre
 * `rentago-system`, método junto a `CIFRAS`), no estimadas. Si alguien las cuestiona en una reunión, se abre el sistema y se cuentan.
 *
 * Qué NO se dice, porque ya no es verdad: mail de las 8 (el equipo no recibe mails, todo queda
 * en la campana), 42 reglas o 29 (son 31), cifras de pantallas, 8 reportes con CSV (son 4
 * pestañas y solo dos exportan), precios distintos para web y mostrador (hoy hay un solo
 * precio), extensión como "no es un alquiler nuevo" (hoy sí lo es), la campaña de Prospectos
 * como si enviara (el envío está apagado), medios de cobro que el producto base no trae, la tarjeta guardada en la ficha del cliente, la
 * cuenta propia privada, y el reparto entre socios o Prospectos como si vinieran de serie (son
 * adicional y módulo opcional).
 *
 * Uber SÍ se nombra (pedido de Gael, 08/10): el producto tiene "Contrato Uber" (el contrato
 * semanal con plataforma: Uber, DiDi o Cabify) y el auto figura "En Uber" en la flota. Para
 * empresas el concepto sigue siendo "largo plazo / semanal". */

import { PANTALLAS } from './sistema/pantallas';
import { FLOTA, EVENTOS, POR_ASIGNAR, DIAS as DIAS_VALLE, FINDE as FINDE_VALLE } from './sistema/valle';
import { DEMO_ACTIVA, FAQ_DEMO } from './demo';

/* ── Las cifras ───────────────────────────────────────────────────────────────── */

/** Contadas sobre `rentago-system` el 17/10/2026 (`main` en 591dbcf), no estimadas. Cómo se
 *  cuenta cada una, para recontarlas igual la próxima vez:
 *
 *  - `pantallas`: rutas de `panel/src/App.tsx` que renderizan `<AppLayout>`, sin las de detalle
 *    (`/flota/:id`, `/clientes/:id`) ni las que redirigen (`Navigate`, `RedirigirConQuery`).
 *    Son 24. La réplica de la web muestra 20 (`PANTALLAS.length`): por eso lo que habla de la
 *    réplica ("Ver las 20 pantallas") usa `PANTALLAS.length` y lo que habla del panel usa esto.
 *  - `modulosSistema`: `CATALOGO` de `backend/app/core/modulos.py` (17: incluye Auditoría y
 *    Configuración, que no se apagan, y Caja con socios, adicional). La web los agrupa en los 13
 *    de `MODULOS`, que es cómo se vende; ese número sale de `MODULOS.length`.
 *  - `tablas`: `len(Base.metadata.tables)` con todos los `app.models.*` importados (78).
 *  - `endpoints`: operaciones del `app.openapi()` de FastAPI en desarrollo (388; incluye la
 *    consola de la plataforma y los públicos). Coincide con contar los `@router.get/post/…`.
 *  - `migraciones`: archivos `.py` de `backend/alembic/versions` (10: la base se consolidó en
 *    `0001_base` al separar el producto del sistema de origen).
 *  - `tests`: `pytest --collect-only -q` en `backend/tests` (1.776) y `backend/tests_pg` (230),
 *    más los `it(`/`test(` de los `*.test.*` de `panel` (310) y `consola` (23) = 2.339. Todos
 *    corren en el CI.
 *  - `reglas`: la lista `REGLAS` de `backend/app/domain/notificaciones_reglas.py` (31, prendidas
 *    por defecto, cada 30 minutos). `reglasConfigurables`: `REGLAS_NUEVAS` de
 *    `avisos_reglas_nuevas.py` (4, apagadas hasta que la rentadora las prende).
 *  - `paginasWeb`: archivos `page.tsx` de `web-reservas/app` (9, con la firma remota del
 *    contrato y las páginas por categoría).
 *
 *  Si cambia un número, cambian también los textos que lo repiten literal (buscar "31 reglas"
 *  en `web/lib`, `marketing/video/src` y `marketing/campanas`) y la sección de cifras del
 *  `CLAUDE.md`. El brochure y la propuesta lo leen de acá. */
export const CIFRAS = {
  pantallas: 24,
  modulosSistema: 17,
  paginasWeb: 9,
  tablas: 78,
  endpoints: 388,
  migraciones: 10,
  tests: 'más de 2.300',
  reglas: 31,
  reglasConfigurables: 4,
  reportes: 4,
  capas: 3,
  pasosAlta: 6,
  minutosCupo: 20,
  minutosGracia: 40,
  conductores: 3,
} as const;

/* ── Módulos ──────────────────────────────────────────────────────────────────── */

/** Un solo significado por tono, en toda la web: turq = operación, azul = vender, menta = plata,
 *  petro = control. */
export type TonoMarca = 'turq' | 'azul' | 'menta' | 'petro';

/* El tipo perdió `cols` y `rows`, que eran una tabla de tres filas inventada por módulo. Con la
 * pantalla real replicada al lado, una tabla aproximada no suma: contradice. Lo que muestra cada
 * pantalla se ve en la pantalla. */
export type Modulo = {
  n: string;
  slug: string;
  nombre: string;
  /** Término de búsqueda propio. Ningún módulo repite el cabeza de la home. */
  termino: string;
  /** Una o dos oraciones. */
  texto: string;
  /** La situación completa, para la página del módulo. */
  problema: string;
  /** Cortos: cuatro como mucho. */
  chips: string[];
  tono: TonoMarca;
  /** La frase del cliente, entre comillas, una línea. */
  dolor: string;
  /** Lo que gana, una línea. Va en negrita en la tarjeta. */
  gana: string;
};

export const MODULOS: Modulo[] = [
  {
    n: '01',
    slug: 'ocupacion',
    nombre: 'Ocupación',
    termino: 'calendario de ocupación de flota',
    texto:
      'Una fila por auto y una columna por día. Arrastrás la reserva al auto y queda asignada. El botón Hoy te lleva al día, y la vista anual muestra el año entero.',
    problema:
      'Vender dos veces el mismo auto para el mismo fin de semana. El cupo se calcula por fecha sobre la flota real, y el calendario muestra una fila por unidad: la que está ocupada ya está tomada para ese rango.',
    chips: ['Botón Hoy', 'Vista anual', 'Zoom', 'Cupo real'],
    tono: 'turq',
    dolor: '“Vendí el mismo auto dos veces para el finde.”',
    gana: 'Ves toda la flota en un calendario, una fila por auto.',
  },
  {
    n: '02',
    slug: 'flota',
    nombre: 'Flota',
    termino: 'software gestión de flota alquiler',
    texto:
      'Cada auto con su patente, su estado, la VTV y la póliza con fecha y los kilómetros que faltan para el service. Baja con motivo y daños con fotos desde el celular.',
    problema:
      'No saber en qué estado está cada unidad ni cuánto costó mantenerla. Cada auto tiene su propia ficha con los papeles, el service por kilómetro y por fecha, los gastos cargados y el historial de daños con fotos.',
    chips: ['VTV y póliza', 'Service por km', 'Baja con motivo', 'Daños con fotos'],
    tono: 'turq',
    dolor: '“No sé cuándo vence la VTV de cada auto.”',
    gana: 'Cada auto con sus papeles, su service y sus daños con fotos.',
  },
  {
    n: '03',
    slug: 'categorias-y-coberturas',
    nombre: 'Categorías y coberturas',
    termino: 'control de franquicia y cobertura rent a car',
    texto: 'Franquicia base por categoría, coberturas que la bajan y extras con tope de cantidad.',
    problema:
      'Discutir la franquicia en el mostrador con el cliente delante. Cada categoría tiene su franquicia base, y cada cobertura dice exactamente a cuánto la baja.',
    chips: ['Franquicia por categoría', 'Coberturas', 'Extras con tope'],
    tono: 'azul',
    dolor: '“Con el cliente delante, no me acuerdo cuánto es la franquicia.”',
    gana: 'Cada categoría con su franquicia, y cada cobertura con lo que la baja.',
  },
  {
    n: '04',
    slug: 'clientes',
    nombre: 'Clientes',
    termino: 'registro de conductores adicionales alquiler de autos',
    texto:
      'Particular o empresa, y la empresa con su representante. Hasta tres conductores por contrato y su documentación. La garantía queda registrada en el alquiler.',
    problema:
      'No saber quién manejaba cuando llega una multa, ni tener a mano la documentación del conductor adicional. Cada cliente tiene su ficha, con el representante si es empresa y los conductores autorizados.',
    chips: ['Empresa con representante', 'Hasta 3 conductores', 'Documentación'],
    tono: 'turq',
    dolor: '“Llegó una multa y no sé quién manejaba.”',
    gana: 'Cada cliente con su ficha y hasta 3 conductores por contrato.',
  },
  {
    n: '05',
    slug: 'reservas',
    nombre: 'Reservas',
    termino: 'sistema de reservas para alquiler de autos',
    texto:
      'Nueva operación con tres puertas: Contrato Uber o de largo plazo, alquiler rápido o reserva completa en 6 pasos. Si el auto se pisa, avisa y te deja decidir.',
    problema:
      'Tomar una reserva sin saber si el auto está libre y ponerle un precio a ojo. El alta calcula el cupo real de esas fechas, trae el precio del motor ya calculado y avisa si el auto queda pisado.',
    chips: ['Nueva operación', 'Avisa si se pisa', 'Precio sugerido'],
    tono: 'turq',
    dolor: '“Tomo la reserva y no sé si el auto está libre.”',
    gana: 'Cupo real por fecha, precio sugerido y aviso si el auto se pisa.',
  },
  {
    n: '06',
    slug: 'contratos',
    nombre: 'Contratos',
    termino: 'contrato de alquiler de autos digital',
    texto:
      'Cláusulas editables, franquicia junto al contrato, Contrato Uber para choferes y de largo plazo para empresas, y firma en pantalla. Se puede regenerar, y se reimprime idéntico años después.',
    problema:
      'Que el contrato firmado en papel no aparezca cuando lo pide un abogado dos años después. El clausulado está versionado en base y cada contrato guarda un snapshot congelado del texto vigente el día de la firma.',
    chips: ['Firma en pantalla', 'Franquicia', 'Cláusulas editables', 'Contrato Uber'],
    tono: 'petro',
    dolor: '“El contrato firmado no aparece cuando lo pide el abogado.”',
    gana: 'Firma en pantalla, y el contrato se reimprime idéntico años después.',
  },
  {
    n: '07',
    slug: 'precios',
    nombre: 'Precios',
    termino: 'precio por temporada alquiler de autos',
    texto:
      'Motor de calendario de 3 capas: temporadas, feriados y descuentos por duración. Un solo precio para web y mostrador. Das de baja una promo y el precio anterior vuelve solo.',
    problema:
      'Que el fin de semana largo se venda al precio de un martes porque nadie cargó la tarifa. Las tres capas se cargan una vez y el precio sale solo, todos los días del año.',
    chips: ['3 capas', 'Un solo precio', 'Promo reversible'],
    tono: 'azul',
    dolor: '“El fin de semana largo se vendió a precio de martes.”',
    gana: 'Cargás temporadas y feriados una vez y el precio sale solo.',
  },
  {
    n: '08',
    slug: 'cotizador',
    nombre: 'Cotizador',
    termino: 'cotizador de alquiler de autos para web',
    texto: 'Presupuestos con el precio del motor, PDF para mandar y seguimiento en la ficha del cliente.',
    problema:
      'Que el cliente llame, pregunte el precio, corte y llame al de la otra cuadra. El presupuesto sale con el precio del motor, en PDF, y queda con seguimiento en la ficha.',
    chips: ['Precio del motor', 'PDF para mandar', 'Seguimiento'],
    tono: 'azul',
    dolor: '“Me llaman, preguntan el precio y se van con otro.”',
    gana: 'Presupuesto en PDF con el precio del sistema, antes de que corten.',
  },
  {
    n: '09',
    slug: 'caja',
    nombre: 'Caja',
    termino: 'cuenta corriente de clientes rent a car',
    texto:
      'Lo que falta cobrar, la caja del día por sucursal con apertura y cierre, los cheques y echeqs, las cuentas corrientes y los gastos por categoría. El reparto entre socios se suma como adicional.',
    problema:
      'No saber cuánto se cobró ni cuánto falta cobrar. A cobrar muestra una fila por alquiler con saldo y cuenta los días desde la devolución, y las cuentas corrientes reparten la deuda en cuatro tramos de antigüedad.',
    chips: ['A cobrar', 'Caja por sucursal', 'Cuentas corrientes', 'Echeqs'],
    tono: 'menta',
    dolor: '“No sé cuánto cobramos ni cuánto me falta cobrar.”',
    gana: 'Lo que falta cobrar, de quién y hace cuántos días.',
  },
  {
    n: '10',
    slug: 'multas-y-danos',
    nombre: 'Multas y daños',
    termino: 'control de multas de tránsito autos alquilados',
    texto: 'Cargás la multa y el sistema te dice qué alquiler estaba vigente y quién manejaba. Los daños, con fotos.',
    problema:
      'Que llegue un acta de hace tres meses y no saber a quién cargársela. Con la fecha del hecho el sistema encuentra el alquiler vigente y el conductor responsable.',
    chips: ['Multa → alquiler vigente', 'Conductor responsable', 'Daños con fotos'],
    tono: 'petro',
    dolor: '“Llegó un acta de hace tres meses.”',
    gana: 'Con la fecha del hecho aparece el alquiler y el conductor.',
  },
  {
    n: '11',
    slug: 'tu-web',
    nombre: 'Tu web',
    termino: 'cobrar reservas online con Mercado Pago alquiler de autos',
    texto:
      'Sitio propio con motor de reservas y checkout de 4 pasos, cupo retenido 20 minutos, cobro por Mercado Pago o transferencia. Lo que no se cierra solo cae en el Seguimiento del panel.',
    problema:
      'Perder la reserva del que entra a las once de la noche. Tu propia web toma la reserva sobre el mismo cupo que ve el mostrador y cobra sola, con tu cuenta de Mercado Pago. Y si alguien pide que lo llames o no termina de pagar, queda en el Seguimiento con su contacto.',
    chips: ['Checkout de 4 pasos', 'Cupo retenido 20 min', 'Mercado Pago', 'Seguimiento'],
    tono: 'azul',
    dolor: '“Me escribe a las once de la noche y nadie atiende.”',
    gana: 'Tu web toma la reserva y cobra sola, sobre el mismo cupo del mostrador.',
  },
  {
    n: '12',
    slug: 'avisos-reportes',
    nombre: 'Avisos y reportes',
    termino: 'avisos de vencimiento VTV y póliza flota',
    texto:
      '31 reglas que corren cada 30 minutos y avisan en la campana. Reportes de resumen, ingresos, flota y demanda no atendida. Auditoría de quién hizo qué.',
    problema:
      'Que se venza la VTV o la póliza y te enteres cuando te para la policía. Los documentos se cargan con vigencia y 31 reglas los miran cada media hora, con un aviso por asunto en la campana del panel.',
    chips: ['31 reglas cada 30 min', 'Aviso en la campana', '4 reportes', 'Auditoría'],
    tono: 'petro',
    dolor: '“Me enteré del vencimiento cuando ya había vencido.”',
    gana: '31 reglas miran todo cada 30 minutos y avisan en la campana.',
  },
  {
    n: '13',
    slug: 'captacion',
    nombre: 'Prospectos y campañas',
    termino: 'prospectos para empresas de alquiler de autos',
    texto:
      'Módulo opcional. Una lista de empresas que podrían alquilarte, ya cruzada con tus clientes. Elegís un grupo, armás la campaña y queda lista.',
    problema:
      'Querer salir a buscar empresas y no tener por dónde empezar, o escribirle sin querer a quien ya es cliente. El sistema marca los que ya lo son por mail, teléfono, dominio o nombre, y arma la campaña sin ellos.',
    chips: ['Cruce con tus clientes', 'Campaña armada', 'No contactar'],
    tono: 'azul',
    dolor: '“Quiero buscar empresas, pero no tengo una lista.”',
    gana: 'Una lista ya cruzada con tus clientes y la campaña lista.',
  },
];

/* ── Lo que pasa hoy ─────────────────────────────────────────────────────────────
 *
 * Seis situaciones, en formato tarjeta: el dolor entre comillas, lo que ganás, y a qué módulo
 * lleva. El diseño tiene que hacer que el visitante se reconozca en esta lista en los primeros
 * diez segundos. Ese reconocimiento es la conversión, no el botón. */
export type Problema = {
  n: string;
  dolor: string;
  gana: string;
  tono: TonoMarca;
  /** Slug del módulo al que lleva "Ver cómo". */
  modulo: string;
  icono: string;
};

export const PROBLEMAS: Problema[] = [
  {
    n: '01',
    dolor: '“Vendí el mismo auto dos veces para el finde.”',
    gana: 'El cupo se calcula sobre la flota real: el auto ocupado ya está tomado.',
    tono: 'turq',
    modulo: 'ocupacion',
    icono: 'calendario',
  },
  {
    n: '02',
    dolor: '“El fin de semana largo se vendió a precio de martes.”',
    gana: 'Temporadas, feriados y duración se cargan una vez. El precio sale solo.',
    tono: 'azul',
    modulo: 'precios',
    icono: 'rango',
  },
  {
    n: '03',
    dolor: '“Me llaman, preguntan el precio y se van con otro.”',
    gana: 'Presupuesto en PDF al toque, y en tu web el cliente reserva y paga solo.',
    tono: 'azul',
    modulo: 'cotizador',
    icono: 'calculadora',
  },
  {
    n: '04',
    dolor: '“El contrato firmado no aparece cuando lo pide el abogado.”',
    gana: 'Se firma en pantalla y se reimprime idéntico, años después.',
    tono: 'petro',
    modulo: 'contratos',
    icono: 'firma',
  },
  {
    n: '05',
    dolor: '“Me enteré de la VTV cuando ya estaba vencida.”',
    gana: 'El sistema mira los vencimientos todo el tiempo y te avisa en la campana.',
    tono: 'petro',
    modulo: 'avisos-reportes',
    icono: 'campana',
  },
  {
    n: '06',
    dolor: '“No sé cuánto me falta cobrar, ni de quién.”',
    gana: 'La Caja te muestra qué alquileres tienen saldo y hace cuántos días.',
    tono: 'menta',
    modulo: 'caja',
    icono: 'billetera',
  },
];

/* ── Lo nuevo ─────────────────────────────────────────────────────────────────────
 *
 * Lo que se sumó al sistema desde septiembre de 2026, **verificado contra el código** (el
 * inventario del 06/10/2026 dice en qué archivo vive cada cosa). Una línea cada una.
 *
 * `icono` es un nombre de `components/sistema/Icono.tsx`. `slug` apunta a una pantalla
 * (`lib/sistema/pantallas.ts`) o a un módulo (`MODULOS`), según `tipo`. */
export type Novedad = {
  titulo: string;
  linea: string;
  icono: string;
  tono: TonoMarca;
  tipo: 'pantalla' | 'modulo';
  slug: string;
};

export const NOVEDADES: Novedad[] = [
  {
    titulo: 'Prospectos y campañas',
    linea: 'Módulo opcional: empresas que podrían alquilarte, cruzadas con tus clientes. Armás la campaña y queda lista.',
    icono: 'megafono',
    tono: 'azul',
    tipo: 'pantalla',
    slug: 'prospectos',
  },
  {
    titulo: 'Reparto entre socios, como adicional',
    linea: 'Si la rentadora tiene socios: cada uno con su porcentaje, y quién le pasa cuánto a quién.',
    icono: 'billetera',
    tono: 'menta',
    tipo: 'pantalla',
    slug: 'caja',
  },
  {
    titulo: 'Contrato Uber y de largo plazo',
    linea: 'Para choferes de Uber, DiDi o Cabify y para empresas: valor por semana, pagos semanales, km permitidos y km extra.',
    icono: 'rayo',
    tono: 'petro',
    tipo: 'pantalla',
    slug: 'contratos',
  },
  {
    titulo: 'Franquicia junto al contrato',
    linea: 'Se genera con una casilla y firma como deudor quien elijas.',
    icono: 'documento',
    tono: 'petro',
    tipo: 'pantalla',
    slug: 'contratos',
  },
  {
    titulo: 'Cláusulas editables',
    linea: 'Cambiás las de ese contrato, volvés al original cuando quieras, y el contrato se puede regenerar.',
    icono: 'lista',
    tono: 'petro',
    tipo: 'pantalla',
    slug: 'contratos',
  },
  {
    titulo: 'Firma en pantalla',
    linea: 'El cliente firma con el dedo, o subís el papel firmado.',
    icono: 'firma',
    tono: 'petro',
    tipo: 'pantalla',
    slug: 'contratos',
  },
  {
    titulo: 'Un solo precio',
    linea: 'Web y mostrador comparten precio, y el día extra se cobra solo según el horario.',
    icono: 'rango',
    tono: 'azul',
    tipo: 'pantalla',
    slug: 'precios',
  },
  {
    titulo: 'Nueva operación',
    linea: 'Un botón, tres puertas: contrato de largo plazo, alquiler rápido o reserva completa.',
    icono: 'mas',
    tono: 'turq',
    tipo: 'pantalla',
    slug: 'reservas',
  },
  {
    titulo: 'Avisa si el auto se pisa',
    linea: 'Podés cargar la reserva igual. La web, en cambio, nunca vende un auto ocupado.',
    icono: 'alerta',
    tono: 'turq',
    tipo: 'pantalla',
    slug: 'reservas',
  },
  {
    titulo: 'Hoy, zoom y vista anual',
    linea: 'El botón Hoy te lleva al día, el zoom ajusta la grilla y el año entero se ve de un vistazo.',
    icono: 'panel',
    tono: 'turq',
    tipo: 'pantalla',
    slug: 'ocupacion',
  },
  {
    titulo: 'Daños con fotos desde el celular',
    linea: 'Registrás el daño con fotos y no se cierra la devolución.',
    icono: 'camara',
    tono: 'turq',
    tipo: 'modulo',
    slug: 'flota',
  },
  {
    titulo: 'Seguimiento de lo que entra por la web',
    linea: 'Quien pide que lo llames, no termina de pagar o tiene el pago rechazado queda con su estado, su responsable y su próximo paso.',
    icono: 'personas',
    tono: 'azul',
    tipo: 'modulo',
    slug: 'tu-web',
  },
  {
    titulo: 'Echeqs por secciones',
    linea: 'Vencidos, próximos 7 días y en cartera, cada sección con su total.',
    icono: 'tarjeta',
    tono: 'menta',
    tipo: 'pantalla',
    slug: 'caja',
  },
];

/* Tres estados. Bajó de cuatro: "En el taller" era el más flojo y el que peor se resolvía
 * visualmente. Con tres, cada botón pesa más. */
export type Estado = {
  label: string;
  banda: string;
  frase: string;
  datos: [string, string, boolean?][];
};

export const ESTADOS: Estado[] = [
  {
    label: 'En la calle',
    banda: 'Alquilado hasta el lunes 22',
    frase:
      'Lo tiene F. Ledesma desde el viernes 19. Vuelve el lunes 22 a las 10, y ya está reservado para el jueves siguiente.',
    datos: [
      ['Estado', 'En la calle', true],
      ['Cliente', 'F. Ledesma · contrato C-2026-0912'],
      ['Devolución', 'Lun 22 · 10:00'],
      ['Kilómetros de salida', '46.812 km'],
      ['Combustible de salida', '¾ de tanque'],
    ],
  },
  {
    label: 'Libre este finde',
    banda: 'Disponible · sáb 20 y dom 21',
    frase:
      'Queda libre el sábado y el domingo. Si es fin de semana largo, el precio ya sube solo: no depende de que alguien se acuerde de cargarlo.',
    datos: [
      ['Estado', 'Disponible', true],
      ['Cupo del finde', '2 unidades de la categoría'],
      ['Precio del sábado', '$ 74.750 por día'],
      ['Precio de un martes', '$ 52.000 por día'],
      ['Dónde se vende', 'Web y mostrador, mismo cupo y mismo precio'],
    ],
  },
  {
    label: 'Papeles por vencer',
    banda: 'VTV vence en 21 días',
    frase:
      'La VTV vence el 3 de julio. El aviso queda en la campana del panel con tiempo, no cuando te para la policía.',
    datos: [
      ['VTV', 'Vence 03/07 · faltan 21 días', true],
      ['Póliza', 'Al día hasta 14/02'],
      ['Cédula verde', 'Al día'],
      ['Aviso', 'En la campana del panel'],
      ['Daños abiertos', '1 · paragolpes, con fotos'],
    ],
  },
];

export const ETAPAS = [
  {
    n: '01',
    titulo: 'Reserva en la web',
    detalle: 'El cliente elige categoría y fechas en tu propia web, con el cupo real de la flota.',
    nota: 'Módulo 11 · Tu web. Checkout de 4 pasos sobre el mismo cupo que ve el mostrador.',
  },
  {
    n: '02',
    titulo: 'Cupo retenido 20 minutos',
    detalle: 'El auto le queda retenido 20 minutos mientras paga por Mercado Pago o transferencia.',
    nota: 'Nadie más puede vender esa unidad en esa fecha mientras el pago está en curso.',
  },
  {
    n: '03',
    titulo: 'Contrato y firma',
    detalle: 'El contrato sale con el clausulado de ese día y se firma en pantalla, por un link remoto o en papel.',
    nota: 'Módulo 06 · Contratos. El clausulado queda congelado en un snapshot para reimprimirlo igual años después.',
  },
  {
    n: '04',
    titulo: 'Entrega',
    detalle: 'La entrega registra kilómetros, combustible y limpieza, con tres botones de color.',
    nota: 'Módulo 02 · Flota. Los daños que ya tenía el auto se ven en la misma pantalla.',
  },
  {
    n: '05',
    titulo: 'Devolución',
    detalle: 'La devolución cierra el alquiler y carga los daños nuevos con fotos desde el celular.',
    nota: 'Los daños quedan atados al alquiler y al conductor.',
  },
  {
    n: '06',
    titulo: 'Cierre en caja',
    detalle: 'El saldo cierra en la caja: cobros con su medio de pago, o a cuenta corriente.',
    nota: 'Módulo 09 · Caja. Recibo numerado, planilla del mes y cuenta corriente actualizada.',
  },
];

/* Las cuatro etapas.
 *
 * **El plazo por etapa salió.** Decía 1 + 2 + 2 + 1 = seis semanas, escrito como si fuera fijo,
 * y no lo es: depende de cuántos autos, cuánto tarifario y cuánto clausulado haya que cargar.
 * Un plazo corto y honesto vende más que uno largo y preciso.
 *
 * En su lugar va `tuyo`, que contesta la pregunta que el que compra realmente se hace: cuánto
 * trabajo es esto para mí. */
export const IMPLEMENTACION = [
  {
    n: '01',
    titulo: 'Relevamiento',
    detalle: 'Tu flota, tus categorías, tus sucursales y tu clausulado actual, tal como los usás hoy.',
    tuyo: 'Ponés la información',
  },
  {
    n: '02',
    titulo: 'Carga de flota, tarifas y clausulado',
    detalle: 'Autos, documentos con vigencia, temporadas, feriados y el contrato versionado en base.',
    tuyo: 'La carga la hago yo',
  },
  {
    n: '03',
    titulo: 'Tu web y el motor de reservas',
    detalle: 'El sitio a medida, el checkout de 4 pasos y el cobro por Mercado Pago o transferencia.',
    tuyo: 'Elegís fotos y textos',
  },
  {
    n: '04',
    titulo: 'Marcha blanca y capacitación',
    detalle: 'El mostrador operando en el sistema con acompañamiento, y los avisos ya corriendo.',
    tuyo: 'Operás acompañado',
  },
];

/* ── Hecho acá ────────────────────────────────────────────────────────────────
 *
 * El foso más profundo del producto.
 *
 * Los competidores internacionales cobran en dólares y están en inglés; ninguno sabe qué hacer
 * con un cheque a noventa días, con un acta que llegó tres meses tarde o con la VTV. Todo lo de
 * esta lista está verificado contra el código: son tablas y estados que existen, no una promesa
 * de localización.
 *
 * No se nombra a ningún competidor a propósito: nombrarlos es regalarles una mención y abrir una
 * discusión que no conviene. */
export const ARGENTINA = [
  {
    que: 'Echeq en cartera',
    como: 'No es plata todavía: puede rebotar. El sistema lo cuenta aparte del cobro, y los ordena en secciones: vencidos, próximos 7 días, en cartera.',
  },
  {
    que: 'Cuenta corriente a 60 días',
    como: 'Contado, 15, 30, 60 o 90 días. Y la deuda repartida por antigüedad, para saber desde cuándo te deben.',
  },
  {
    que: 'La VTV que se vence',
    como: 'Cada documento se carga con su vigencia. El aviso queda en la campana del panel, con tiempo.',
  },
  {
    que: 'El acta que llegó tarde',
    como: 'Cargás la multa con la fecha del hecho y el sistema encuentra qué alquiler estaba vigente y quién manejaba.',
  },
  {
    que: 'Responsable inscripto o monotributo',
    como: 'La condición frente al IVA es un dato del cliente y del contrato, no una nota al pie escrita a mano.',
  },
  {
    que: 'Mercado Pago y los medios que uses',
    como: 'Cada cobro queda con su medio, y los medios los configura cada rentadora: efectivo, transferencia, tarjeta, Mercado Pago, cheque, echeq o cuenta corriente. La reserva de tu web se cobra ahí mismo.',
  },
];

/* Construidas solo con funcionalidad verificada contra el código. A una empresa real solo
 * se le afirma lo que puede comprobar. */
export const FAQS = [
  /* REVISAR GAEL: toda la lista está reescrita (Fase 7): primero Sí/No/Depende en una frase, después
   * la explicación en ≤ 2 oraciones (≤ 45 palabras). Orden: las más comunes arriba. */
  {
    q: '¿Cuánto sale y qué incluye?',
    a: 'Depende de tu operación. Cuenta cuántos autos y sucursales tenés y si querés la web de reservas. No hay precio de lista: lo hablamos antes de empezar y queda por escrito.',
  },
  {
    q: '¿Cuánto tarda en estar andando?',
    a: 'Depende de cuánto haya que cargar. Se arranca con tu flota, tus tarifas y tus contratos, y operás acompañado desde el primer día.',
  },
  {
    q: '¿Puede pasar que venda dos veces el mismo auto?',
    a: 'El sistema te avisa si hay cruce de fechas. En el mostrador te deja cargar la reserva igual si sabés algo que el sistema no; en tu web, nunca vende un auto ocupado.',
  },
  {
    q: '¿Puedo cargar mis datos actuales?',
    a: 'Sí. Partimos de tu planilla o tu cuaderno: cargamos tu flota, tus tarifas y tu contrato tal como los tenés hoy.',
  },
  {
    q: '¿Funciona la web con Mercado Pago?',
    a: 'Sí. El cliente paga por Mercado Pago o transferencia, y mientras paga el cupo le queda retenido 20 minutos. La reserva confirmada entra al calendario.',
  },
  {
    q: '¿Sirve si tengo varias sucursales?',
    a: 'Sí. Cada sucursal tiene sus puntos de retiro y devolución y su caja, y el cliente puede retirar en una y devolver en otra.',
  },
  {
    q: '¿Sirve si alquilo camionetas y no solo autos?',
    a: 'Sí. Hay autos, camionetas, combis, utilitarios, motos y motorhomes, y la franquicia y la tarifa se definen por categoría.',
  },
  {
    q: '¿Emite facturas?',
    a: 'No. Registrás tus facturas y notas en el sistema, con su PDF, y quedan atadas al alquiler y a la cuenta corriente. Los recibos de cobro sí salen numerados.',
  },
  {
    q: '¿Puedo reimprimir un contrato firmado hace años?',
    a: 'Sí. Cada contrato guarda congelado el texto del día de la firma, así que sale idéntico aunque hayas cambiado las cláusulas.',
  },
  {
    q: '¿Se puede firmar en pantalla?',
    a: 'Sí. El cliente firma con el dedo o el mouse, o por un link en su teléfono. Si prefiere papel, subís el firmado y queda adjunto.',
  },
  {
    q: '¿Me avisa antes de que se venza la VTV o la póliza?',
    a: 'Sí. Cargás cada documento con su vigencia y el sistema te avisa en la campana del panel, un aviso por asunto.',
  },
  {
    q: '¿Puedo cambiar una cláusula para un cliente?',
    a: 'Sí. Editás la cláusula antes de generar el contrato, queda marcada como modificada y vale solo para ese contrato.',
  },
  {
    q: '¿Y la franquicia?',
    a: 'Cada categoría tiene su franquicia base y cada cobertura la baja. Con una casilla se genera el documento de la franquicia, que no es lo mismo que la garantía.',
  },
  {
    q: '¿Cuántos conductores puedo cargar en un contrato?',
    a: 'Hasta tres. Si un conductor ya tiene otro auto en esas fechas, el sistema avisa pero te deja seguir.',
  },
  {
    q: '¿Sirve para alquilar a choferes de aplicaciones?',
    a: 'Sí. Hay un Contrato Uber para Uber, DiDi o Cabify: cargás el valor de la semana y salen el total, las fechas de pago y los kilómetros permitidos.',
  },
  {
    q: '¿Sirve para repartir la plata entre socios?',
    a: 'Sí, como adicional. Definís los socios y sus porcentajes, ves quién le pasa cuánto a quién y registrás el reparto.',
  },
  {
    q: '¿Qué reportes tiene?',
    a: 'Resumen del mes, ingresos, flota y demanda no atendida. Ingresos y Flota se exportan a CSV, y los alquileres del mes a Excel.',
  },
  {
    q: '¿Me ayuda a conseguir clientes?',
    a: 'Depende. Hay un módulo opcional de Prospectos que arma la lista y la campaña, pero el envío automático todavía no está activado.',
  },
  {
    q: '¿La web de la rentadora está incluida?',
    a: 'Es opcional. La sumás si la querés y vende con el mismo cupo y precio que tu mostrador; si ya tenés web, usás solo el sistema.',
  },
  {
    q: '¿Puedo verlo funcionando antes de decidir?',
    // Con la demo de 14 días prendida (`NEXT_PUBLIC_DEMO_ACTIVA=1`), la respuesta pasa a la de `demo.ts`.
    a: DEMO_ACTIVA
      ? FAQ_DEMO
      : 'Sí. En una reunión te comparto pantalla y recorremos el sistema sobre datos ficticios. Las pantallas también están acá, una por una.',
  },
];

/* ── El calendario de ocupación ───────────────────────────────────────── */

/* **Esto ya no se escribe acá.** Sale de `lib/sistema/valle.ts`, que es la base de la
 * Rentadora del Valle y la que pinta la réplica del sistema entera.
 *
 * Antes había dos copias de los mismos autos y las mismas reservas —una para el calendario de
 * la home y otra para las pantallas— y ya habían empezado a decir cosas distintas: la misma
 * reserva aparecía en dos autos según dónde se la mirara. Con una sola fuente eso no puede
 * volver a pasar. */

export const DIAS = DIAS_VALLE;
export const FINDE = FINDE_VALLE;

/** Las seis primeras unidades de la flota: las que entran en el calendario de la home. */
export const AUTOS = FLOTA.slice(0, 6).map((u) => ({ modelo: u.modelo, patente: u.patente }));

/** Reservas ya asignadas. El orden es el orden en que se pintan solas al entrar.
 *  Los bloqueos quedan afuera: acá se muestra la reserva, no el taller. */
export const RESERVAS_BASE = EVENTOS.filter(
  (e) => e.unidad < 6 && e.canal !== undefined,
).map((e) => ({ auto: e.unidad, ini: e.ini, dur: e.dur, cliente: e.cliente }));

/** Las dos reservas web confirmadas que entraron sin unidad asignada. */
export const PENDIENTES = POR_ASIGNAR.map((e) => {
  const id = e.cliente.split(' · ')[0];
  const desde = DIAS[e.ini];
  const hasta = DIAS[e.ini + e.dur - 1];
  return {
    id,
    ini: e.ini,
    dur: e.dur,
    cliente: e.cliente.split(' · ')[1] ?? e.cliente,
    titulo: `Reserva ${id}`,
    rango: `${desde} → ${hasta} · ${e.dur} días`,
  };
});

/* ── El motor de precios ────────────────────────────────────────────────────── */

export const CATEGORIAS = [
  { key: 'compacto', nombre: 'Compacto B', base: 52000, franquicia: '$ 1.400.000' },
  { key: 'sedan', nombre: 'Sedán C', base: 64000, franquicia: '$ 1.700.000' },
  { key: 'suv', nombre: 'SUV C', base: 86000, franquicia: '$ 2.100.000' },
  { key: 'pickup', nombre: 'Pick-up D', base: 112000, franquicia: '$ 2.900.000' },
];

/* Tres capas. **El control "Canal de venta" salió**: desde el 04/10/2026 hay un solo precio y
 * el motor ignora el canal. */
export const CAPAS = [
  {
    key: 'temporada' as const,
    titulo: 'Capa 1 · Temporada',
    opciones: [
      { label: 'Baja', v: 1 },
      { label: 'Media', v: 1.15 },
      { label: 'Alta', v: 1.4 },
    ],
  },
  {
    key: 'feriado' as const,
    titulo: 'Capa 2 · Feriado',
    opciones: [
      { label: 'Día común', v: 1 },
      { label: 'Fin de semana largo', v: 1.25 },
    ],
  },
  {
    key: 'duracion' as const,
    titulo: 'Capa 3 · Duración',
    opciones: [
      { label: '1 a 2 días', v: 1, d: 2 },
      { label: '3 a 6 días', v: 0.92, d: 4 },
      { label: '7 o más', v: 0.85, d: 7 },
    ],
  },
];

/* ── Formulario de contacto ─────────────────────────────────────────────────── */

/* Cuatro campos, no diez. El contador "N de 10 datos completos" convertía el formulario en
 * un examen que el visitante podía reprobar. Los otros seis datos se piden en la respuesta
 * o en la llamada: se califica igual y no se pierde al que abandona en el campo 6. */
export const CAMPOS = [
  {
    id: 'empresa',
    etiqueta: 'Empresa',
    tipo: 'text',
    autoComplete: 'organization',
    placeholder: 'Rentadora del Valle',
    ayuda: 'Para mirar tu web actual antes de escribirte, si tenés.',
  },
  {
    id: 'ciudad',
    etiqueta: 'Ciudad',
    tipo: 'text',
    autoComplete: 'address-level2',
    placeholder: 'Neuquén',
    ayuda: 'Si trabajás en zona turística, las temporadas del motor de precios son la mitad del valor del sistema.',
  },
  {
    id: 'autos',
    etiqueta: 'Cantidad de autos',
    tipo: 'number',
    autoComplete: 'off',
    placeholder: '24',
    ayuda: 'Define el tamaño de la operación y cuánto lleva cargar la flota.',
  },
  {
    id: 'contacto',
    etiqueta: 'WhatsApp o mail',
    tipo: 'text',
    autoComplete: 'tel',
    placeholder: '299 415 8820 o hola@rentadora.com.ar',
    ayuda: 'Por dónde te contesto. Casi siempre es WhatsApp.',
  },
];

/* ── La home, en cinco secciones ──────────────────────────────────────────────────
 *
 * Muy corta a propósito: la tarjeta dice el dolor, lo que ganás y adónde ir. Los titulares son
 * `{ antes, clave, despues }`: la frase clave es la que va en acento, y el resto se lee como una
 * sola oración. Sin precios, sin números que solo entiende quien ya usó el sistema, sin
 * testimonios ni clientes inventados.
 *
 * Los textos de contacto reusan `T.whatsapp` y `T.whatsappMensaje`. */
export type Titular = { antes: string; clave: string; despues: string };

export const HOME = {
  /* v4b (09/10/2026): dieta de texto. H1 ≤ 8 palabras, bajada ≤ 20, cada sección con rótulo +
   * H2 ≤ 8 palabras + una oración ≤ 25 + hasta 4 viñetas de ≤ 6 palabras. Lo largo vive en las
   * páginas internas. Antes → después y alternativas en marketing/copy-y-seo/COPY-V4.md. */
  hero: {
    titular: { antes: 'Software para rent a car, ', clave: 'hecho en Argentina', despues: '' } as Titular,
    bajada: 'Reservas, tarifas, contratos y cobros conectados en un solo sistema, con tu propia web de reservas online.',
    ctaPrincipal: 'Ver el sistema',
    ctaSecundario: 'Pedir una demo por WhatsApp',
    mensajeDemo: 'Hola Gael, tengo una rentadora y quiero ver una demo de RentaGo.',
    /** Chips flotantes sobre la captura del hero. Estados que existen en el sistema. */
    chips: [
      { icono: 'calendario', texto: 'Cupo real', tono: 'turq' as TonoMarca },
      { icono: 'firma', texto: 'Contrato firmado', tono: 'menta' as TonoMarca },
      { icono: 'billetera', texto: 'Seña cobrada', tono: 'azul' as TonoMarca },
      { icono: 'alerta', texto: 'Aviso de VTV', tono: 'petro' as TonoMarca },
    ],
    /** Para la imagen de Open Graph. */
    puntos: ['Hecho en Argentina', 'Con tu web, si la querés', 'En producción desde 2026'],
    telefonoAlt: 'La web de reservas de una rentadora de ejemplo, en el celular',
    capturaAlt: 'Ocupación en el sistema real: la flota de una rentadora de ejemplo, auto por auto y día por día',
  },
  /** El alt de las capturas reales de las funciones: se le suma el nombre de la función. */
  capturaRealAlt: 'Pantalla real del sistema, con datos de ejemplo:',
  /** La franja de CTA a mitad de la home. REVISAR GAEL: texto propuesto. */
  franja: {
    titulo: 'Mirá cómo se ve por dentro',
    texto: 'Las pantallas del panel de una rentadora de ejemplo, una por una.',
    cta: { texto: 'Ver el sistema', href: '/sistema' },
  },
  /** La fila de confianza bajo el hero. Cifras de `CIFRAS`, como chips cortos. */
  confianza: {
    etiqueta: 'RentaGo en números',
    items: [
      { cifra: '', texto: 'Panel con toda tu operación', icono: 'panel', tono: 'turq' as TonoMarca }, // REVISAR GAEL: sin cifras
      { cifra: '', texto: 'Avisos automáticos', icono: 'campana', tono: 'petro' as TonoMarca },
      { cifra: '', texto: 'En producción desde 2026', icono: 'tildes', tono: 'menta' as TonoMarca },
      { cifra: '', texto: 'Hecho en Argentina', icono: 'globo', tono: 'azul' as TonoMarca },
    ],
  },
  /** Cuatro problemas de mostrador, antes de las funciones. Salen de `PROBLEMAS` (los seis de la v3):
   *  el 04 y el 05 (contrato y vencimientos) se juntan en un solo bloque. Cada bloque lleva al
   *  módulo que lo resuelve. */
  problemas: {
    titular: { antes: 'Los problemas de todos los días, ', clave: 'resueltos', despues: '' } as Titular,
    bajada: 'Situaciones que cualquier rentadora reconoce. Cada una lleva al módulo que la resuelve.',
    items: [
      {
        titulo: 'Reservas superpuestas',
        dolores: [PROBLEMAS[0].dolor],
        gana: PROBLEMAS[0].gana,
        icono: 'calendario',
        tono: 'turq' as TonoMarca,
        link: { texto: 'Ver Ocupación', href: '/modulos/ocupacion' },
      },
      {
        titulo: 'Precios que no corresponden',
        dolores: [PROBLEMAS[1].dolor],
        gana: PROBLEMAS[1].gana,
        icono: 'etiquetas',
        tono: 'azul' as TonoMarca,
        link: { texto: 'Ver Precios', href: '/modulos/precios' },
      },
      {
        titulo: 'Contratos y vencimientos',
        dolores: [PROBLEMAS[3].dolor, PROBLEMAS[4].dolor],
        // REVISAR GAEL: sin la cifra de reglas ("31 reglas ... cada 30 minutos").
        gana: 'El contrato se firma en pantalla y se reimprime idéntico. El sistema mira la VTV y las pólizas todo el tiempo y te avisa.',
        icono: 'firma',
        tono: 'petro' as TonoMarca,
        link: { texto: 'Ver Contratos', href: '/modulos/contratos' },
      },
      {
        titulo: 'Cobros pendientes',
        dolores: [PROBLEMAS[5].dolor],
        gana: PROBLEMAS[5].gana,
        icono: 'billetera',
        tono: 'menta' as TonoMarca,
        link: { texto: 'Ver Caja', href: '/modulos/caja' },
      },
    ],
  },
  /** Los módulos, agrupados en cuatro áreas, cada uno en un solo grupo. */
  todo: {
    titular: { antes: 'Todo el sistema, ', clave: 'en cuatro áreas', despues: '' } as Titular,
    // REVISAR GAEL: bajada sin la cifra de módulos.
    bajada: 'Los módulos comparten los mismos datos, de la reserva a la caja.',
    grupos: [
      {
        titulo: 'Operación',
        icono: 'auto',
        tono: 'turq' as TonoMarca,
        items: [
          { texto: 'Calendario de ocupación', icono: 'calendario', href: '/modulos/ocupacion' },
          { texto: 'Flota y papeles', icono: 'auto', href: '/modulos/flota' },
          { texto: 'Reservas', icono: 'rango', href: '/modulos/reservas' },
          { texto: 'Multas y daños', icono: 'alerta', href: '/modulos/multas-y-danos' },
        ],
      },
      {
        titulo: 'Ventas online',
        icono: 'globo',
        tono: 'azul' as TonoMarca,
        items: [
          { texto: 'Precios por temporada', icono: 'etiquetas', href: '/modulos/precios' },
          { texto: 'Cotizador en PDF', icono: 'calculadora', href: '/modulos/cotizador' },
          { texto: 'Tu web de reservas', icono: 'globo', href: '/modulos/tu-web' },
          { texto: 'Prospectos y campañas', icono: 'megafono', href: '/modulos/captacion' },
        ],
      },
      {
        titulo: 'Administración',
        icono: 'billetera',
        tono: 'menta' as TonoMarca,
        items: [
          { texto: 'Caja y cuentas corrientes', icono: 'billetera', href: '/modulos/caja' },
          { texto: 'Contratos con firma', icono: 'firma', href: '/modulos/contratos' },
          { texto: 'Clientes y conductores', icono: 'personas', href: '/modulos/clientes' },
        ],
      },
      {
        titulo: 'Control',
        icono: 'escudo',
        tono: 'petro' as TonoMarca,
        items: [
          { texto: 'Franquicias y coberturas', icono: 'escudo', href: '/modulos/categorias-y-coberturas' },
          { texto: 'Avisos de vencimiento y reportes', icono: 'campana', href: '/modulos/avisos-reportes' },
        ],
      },
    ],
    verTodo: 'Ver los módulos',
    verPantallas: 'Ver las pantallas',
  },
  /** Las secciones alternadas imagen / texto. `pantalla` es el slug de `PANTALLAS`; `telefonos`
   *  muestra la web de reservas en dos celulares. */
  funciones: [
    {
      rotulo: 'Contratos',
      icono: 'firma',
      tono: 'petro' as TonoMarca,
      titulo: 'Contratos firmados en la pantalla',
      frase: 'Cláusulas editables, la franquicia al lado y la firma del cliente en la tablet o el celular.',
      puntos: ['Firma en pantalla', 'Hasta 3 conductores', 'Contrato Uber y largo plazo', 'Se reimprime idéntico'],
      link: { texto: 'Ver Contratos', href: '/modulos/contratos' },
      pantalla: 'contratos',
      telefonos: [] as { src: string; alt: string }[],
      chips: [{ icono: 'firma', texto: 'Contrato firmado' }],
    },
    {
      rotulo: 'Precios',
      icono: 'etiquetas',
      tono: 'azul' as TonoMarca,
      titulo: 'El precio sale solo, todo el año',
      frase: 'Cargás temporadas, feriados y descuentos por duración una vez, y el sistema calcula cada día.',
      puntos: ['Temporadas y feriados', 'Descuento por duración', 'Un solo precio', 'Promos que se deshacen'],
      link: { texto: 'Ver Precios', href: '/modulos/precios' },
      pantalla: 'precios',
      telefonos: [] as { src: string; alt: string }[],
      chips: [{ icono: 'calendario', texto: 'Feriado cargado' }],
    },
    {
      rotulo: 'Caja',
      icono: 'billetera',
      tono: 'menta' as TonoMarca,
      titulo: 'Sabés qué falta cobrar y de quién',
      frase: 'Caja por sucursal, cuentas corrientes y echeqs, con los días que pasaron desde cada devolución.',
      puntos: ['Caja por sucursal', 'Cuentas corrientes', 'Cheques y echeqs', 'Gastos por categoría'],
      link: { texto: 'Ver Caja', href: '/modulos/caja' },
      pantalla: 'caja',
      telefonos: [] as { src: string; alt: string }[],
      chips: [{ icono: 'billetera', texto: 'Seña cobrada' }],
    },
    {
      rotulo: 'Tu web',
      icono: 'globo',
      tono: 'turq' as TonoMarca,
      titulo: 'Tu propia web, que reserva y cobra',
      frase: 'El cliente elige fechas, ve el precio final y paga, sobre el mismo cupo que ve tu mostrador.',
      // v4c: "Cupo retenido 20 minutos" ya está en el chip de la captura; su lugar lo toma el
      // seguimiento (rentago-system 0010). Alternativas en COPY-V4.md.
      puntos: ['Con tu marca y tus colores', 'Mercado Pago o transferencia', 'Entra directo al calendario', 'Quien no paga, al seguimiento'],
      link: { texto: 'Ver Tu web', href: '/modulos/tu-web' },
      pantalla: '',
      telefonos: [
        { src: '/v4/valle-movil.webp', alt: 'Portada de la web de reservas de una rentadora de ejemplo' },
        { src: '/v4/valle-reservar-movil.webp', alt: 'El paso de elegir el vehículo, con el precio final' },
      ],
      chips: [{ icono: 'reloj', texto: 'Cupo retenido 20 min' }],
    },
  ],
  /** "A medida de tu rentadora" (v4c, 16/10): la misma web de reservas con dos marcas inventadas
   *  (`MARCAS_DEMO`). Rótulo + H2 ≤ 8 + una oración ≤ 25 + cuatro viñetas ≤ 6. El detalle vive
   *  en /web-a-medida. Lo que se afirma sale de rentago-system/web-reservas: marca, tipografía,
   *  logo y "Hecho con RentaGo" son configuración por tenant. */
  aMedida: {
    icono: 'chispa',
    tono: 'azul' as TonoMarca,
    titulo: 'La misma web, con tu marca',
    frase: 'Tu web de reservas lleva tu logo, tus colores, tu tipografía y tu dominio. Partimos de un diseño probado y lo adaptamos.',
    puntos: ['Tu logo y tus colores', 'Tu tipografía', 'Tu dominio, a tu nombre', 'RentaGo no aparece'],
    link: { texto: 'Ver cómo se adapta', href: '/web-a-medida' },
  },
  /** Tira "Tu tipo de rentadora": links a /para (los textos salen de `PARA` en la página). */
  tipos: {
    titular: { antes: '', clave: '¿Cómo alquilás vos?', despues: '' } as Titular,
    todos: 'Ver todos los tipos de rentadora',
  },
  /** La sección de confianza: cómo se arranca y quién responde. Sin testimonios ni logos: no hay
   *  clientes citables. Cada punto sale de datos ya verificados (`IMPLEMENTACION`, la FAQ del
   *  Excel y el CLAUDE.md del sistema). Backups no se afirman. */
  seguridad: {
    titular: { antes: 'Arrancás acompañado, ', clave: 'con tus datos en orden', despues: '' } as Titular,
    bajada: 'Lo que conviene preguntar antes de cargar tu operación en un sistema.',
    items: [
      {
        icono: 'tildes',
        tono: 'turq' as TonoMarca,
        titulo: 'Implementación acompañada',
        texto: 'Relevamos tu flota, tus tarifas y tu clausulado, los cargamos y operás con acompañamiento al arrancar.',
      },
      {
        icono: 'bajar',
        tono: 'azul' as TonoMarca,
        titulo: 'Migración desde Excel',
        texto: 'Partimos de tu planilla o tu cuaderno: se carga tal como lo tenés hoy, sin empezar de cero.',
      },
      {
        icono: 'personas',
        tono: 'menta' as TonoMarca,
        titulo: 'Soporte directo',
        texto: 'Hablás con la persona que desarrolla y mantiene el sistema, por WhatsApp.',
      },
      {
        icono: 'escudo',
        tono: 'petro' as TonoMarca,
        titulo: 'Seguridad de tus datos',
        texto: 'Cada rentadora, separada de las demás. Cada usuario con su rol, y cada cambio queda registrado.',
      },
    ],
  },
  faq: {
    titular: { antes: 'Preguntas ', clave: 'frecuentes', despues: '' } as Titular,
    todas: 'Ver todas las preguntas',
    cantidad: 6,
  },
  cierre: {
    titular: { antes: 'Veamos si RentaGo encaja ', clave: 'con tu rentadora', despues: '' } as Titular,
    bajada: 'Contame cuántos autos tenés y cómo trabajás hoy. Te respondo yo.',
    ctaPrincipal: 'Completar el formulario',
    ctaSecundario: 'Escribime por WhatsApp',
    /** El formulario corto: tamaño de flota, sucursales, si necesita web de reservas. */
    form: {
      autos: '¿Cuántos autos tenés?',
      autosPlaceholder: '24',
      sucursales: '¿Cuántas sucursales?',
      sucursalesPlaceholder: '1',
      web: '¿Necesitás web de reservas?',
      webOpciones: ['Sí', 'No', 'No sé todavía'],
      contacto: 'Tu WhatsApp o mail',
      contactoPlaceholder: '299 415 8820',
      enviar: 'Mandar',
      enviando: 'Mandando…',
      faltan: 'Completá la cantidad de autos y cómo contactarte.',
      listo: 'Listo, me llegó. Te contesto yo, por el medio que dejaste.',
      etiqueta: 'Formulario corto de contacto',
      nota: 'Sin precios en la web: el número depende de tu flota y lo hablamos antes de empezar.',
      mas: 'Prefiero el formulario completo',
    },
  },
  /** La imagen de Open Graph (app/opengraph-image.tsx). */
  og: {
    linea: 'Flota, reservas, contratos y caja, en un solo sistema. Hecho en Argentina.',
  },
} as const;

/* ── Dos marcas de ejemplo ────────────────────────────────────────────────────
 *
 * La misma web de reservas con dos rentadoras INVENTADAS: son los dos fixtures de
 * rentago-system/web-reservas (`lib/tenant-fixtures.ts`), con sus colores, su ciudad, su flota y
 * su dominio. Ninguna es un cliente. La réplica es CSS (components/home/DosMarcas.tsx): cambia
 * solo lo que en el producto es configuración del tenant. Una con logo y "Hecho con RentaGo",
 * la otra sin ninguno de los dos, igual que en los fixtures. */
export type MarcaDemo = {
  clave: 'valle' | 'combis';
  nombre: string;
  nombre2: string;
  dominio: string;
  eyebrow: string;
  titulo: string;
  bajada: string;
  retiro: string;
  fechaRetiro: string;
  devolucion: string;
  fechaDevolucion: string;
  boton: string;
  flotaTitulo: string;
  flota: string[];
  /** Vacío: la marca no muestra "Hecho con RentaGo". */
  firma: string;
  /** Lo que se lee debajo de la réplica: qué cambió en esta marca. */
  pie: string;
};

export const MARCAS_DEMO: MarcaDemo[] = [
  {
    clave: 'valle',
    nombre: 'Rentadora',
    nombre2: 'del Valle',
    dominio: 'rentadoradelvalle.com.ar',
    eyebrow: 'Reservá online',
    titulo: 'Alquiler de autos en Mendoza',
    bajada: 'Retirás en el centro o en el aeropuerto.',
    retiro: 'Retiro',
    fechaRetiro: 'Vie 12/06',
    devolucion: 'Devolución',
    fechaDevolucion: 'Lun 15/06',
    boton: 'Ver autos',
    flotaTitulo: 'Elegí tu vehículo',
    flota: ['Compacto', 'Sedán', 'Pick-up 4x4'],
    firma: 'Hecho con RentaGo',
    pie: 'Turquesa, logo propio y "Hecho con RentaGo" al pie',
  },
  {
    clave: 'combis',
    nombre: 'Combis',
    nombre2: 'del Sur',
    dominio: 'combisdelsur.com.ar',
    eyebrow: 'Reservá online',
    titulo: 'Alquiler de combis en Neuquén',
    bajada: 'Combis y utilitarios para tu grupo o tu obra.',
    retiro: 'Retiro',
    fechaRetiro: 'Lun 15/06',
    devolucion: 'Devolución',
    fechaDevolucion: 'Vie 19/06',
    boton: 'Ver combis',
    flotaTitulo: 'Elegí tu vehículo',
    flota: ['Combi 15 asientos', 'Combi 19 asientos', 'Utilitario'],
    firma: '',
    pie: 'Verde y ámbar, otra tipografía y sin mención de RentaGo',
  },
];

export const DOS_MARCAS = {
  etiqueta: 'La misma web de reservas con dos marcas de ejemplo',
  nota: 'Dos rentadoras inventadas. Mismo motor, misma estructura; cambian la marca, la flota y el dominio.',
} as const;

/* ── El caso: dónde corre hoy ─────────────────────────────────────────────────
 *
 * El sistema nació en una rentadora real y corre ahí en producción. **No se la nombra** hasta que
 * autorice (regla del CLAUDE.md del repo privado), ni datos que la identifiquen: ni
 * ciudad, ni patentes, ni cifras de su negocio. Solo se cuenta lo verificable desde el código
 * (sin cifras). Sin testimonio: no hay uno firmado.
 *
 * La versión con nombre está lista y apagada: cuando haya autorización por escrito se completan
 * `nombre` y `ciudad` y se prende `conNombre`. Con la bandera apagada, los campos vacíos no se
 * leen. Nunca se escribe el nombre real en este repo antes de esa autorización. */
export const CASO = {
  conNombre: false,
  nombre: '',
  ciudad: '',
  titulo: 'Nació en una rentadora *real*',
  texto:
    'RentaGo no se diseñó en una pizarra: se construyó para una rentadora argentina, que lo usa en producción desde 2026 para su flota, sus reservas, sus contratos y su caja.',
  textoConNombre: (nombre: string, ciudad: string) =>
    `RentaGo no se diseñó en una pizarra: se construyó para ${nombre}, en ${ciudad}, que lo usa en producción desde 2026 para su flota, sus reservas, sus contratos y su caja.`,
  // REVISAR GAEL: tres frases sin cifras (antes eran cuatro números).
  frases: [
    'Se usa todos los días en el mostrador.',
    'Maneja flota, reservas, contratos y caja.',
    'Se mejora con lo que pide la operación real.',
  ],
} as const;

/** El texto del caso según la bandera. */
export function textoCaso(): string {
  return CASO.conNombre && CASO.nombre ? CASO.textoConNombre(CASO.nombre, CASO.ciudad) : CASO.texto;
}

/* ── Textos sueltos ─────────────────────────────────────────────────────────── */

export const T = {
  marca: 'RENTAGO',
  descriptor: 'Software para rent a car',

  heroEyebrow: 'En producción desde 2026 en una rentadora de la Patagonia',
  heroTitulo1: 'Nunca más dos clientes',
  heroTitulo2a: 'con ',
  heroTitulo2b: 'el mismo auto',
  heroBajada:
    'El sistema con el que se maneja una rentadora —la ocupación de la flota, los precios por temporada, los contratos firmados y la caja— más tu propia web, donde el cliente reserva y paga solo. Las dos cosas juntas: los competidores venden el software y el sitio lo resolvés vos.',
  ctaPrincipal: 'Ver el sistema por dentro',
  ctaSecundario: 'o escribime por WhatsApp',

  ganchoEyebrow: 'Empecemos por un auto de tu flota',
  ganchoTitulo: 'Preguntale a RentaGo ¿dónde está este auto?',
  ganchoBajada:
    'Hoy la respuesta está en un cuaderno, en un WhatsApp o en la cabeza de alguien que hoy no vino. Tocá un estado y mirá lo que contesta el sistema.',
  ganchoFicha: 'Lo que sabe del auto',
  ganchoUnidad: 'COROLLA XEI · AB 123 CD',
  ganchoCtaSec: 'o contame cómo trabajás hoy',

  problemaEyebrow: 'Lo que pasa hoy',
  problemaTitulo: 'Seis maneras de perder plata',

  entregaEyebrow: 'Qué se entrega',
  entregaParte1: 'Parte 1',
  entregaTitulo1: 'El sistema de gestión',
  entregaTexto1: `Las pantallas del panel: ocupación, reservas, contratos, clientes, flota, caja, precios, cotizador, prospectos, multas, avisos y reportes.`,
  entregaParte2: 'Parte 2',
  entregaTitulo2: 'Tu web a medida',
  entregaTexto2:
    'Sitio propio con motor de reservas y checkout de 4 pasos, cupo retenido 20 minutos, cobro por Mercado Pago o transferencia.',
  entregaCifra: '20 min',
  entregaCifraPie: 'de cupo retenido mientras el cliente paga',
  entregaDiferencial: 'Los competidores venden el software y te dejan el sitio por tu cuenta.',

  calendarioEyebrow: 'El calendario de la flota — en vivo, probalo',
  calendarioTitulo: 'Agarrá la reserva y soltala en un auto',
  calendarioBajada:
    'Esta no es una captura: es el calendario de ocupación. Una fila por auto, una columna por día. Probá soltar la reserva sobre un auto ya alquilado.',
  calendarioAyuda: 'Arrastrala con el mouse, o tocala y después tocá la fila del auto.',
  calendarioInicial: 'Hay 2 reservas sin unidad asignada. El cupo dice que entran; el calendario dice en cuál.',
  calendarioReset: 'Volver al estado inicial',
  calendarioUnidad: 'Unidad',

  modulosEyebrow: 'Módulos',
  modulosTitulo: 'Todo en una sola pantalla',
  modulosBajada: `Las pantallas del panel de administración y las de la web pública. La barra lateral es la misma que usás todos los días: tocá un módulo.`,
  modulosRespaldo: 'Pantallas en el panel · pantallas en la web pública · avisos que corren cada 30 minutos · reportes.',
  modulosPanel: 'Panel · Rentadora del Valle',
  modulosHora: 'Vie 12 · 09:14',
  modulosLink: 'Ver la página del módulo',

  preciosEyebrow: 'Motor de precios — en vivo',
  preciosTitulo: 'El feriado ya no se vende a precio de martes',
  preciosBajada:
    'Tres capas de calendario: temporadas, feriados y descuentos por duración. Un solo precio para la web y para el mostrador. Elegí la categoría y movés las capas.',
  preciosEjemplo: 'Ejemplo: lo que le cobrás a tu cliente',
  preciosPorDia: 'por día',
  preciosFranquicia: 'Franquicia base',
  preciosCategoria: 'Categoría de la unidad',
  preciosPie: 'Números de ejemplo; las tarifas las carga la rentadora.',

  recorridoEyebrow: 'El recorrido de un alquiler',
  recorridoTitulo: 'De la reserva a la caja',

  implementacionEyebrow: 'Cómo se implementa',
  implementacionTitulo: 'Cuatro etapas, sin bajar la persiana',
  implementacionPie: 'Cuánto tarda depende de tu operación: cuántos autos, cuánto tarifario y cuánto clausulado hay que cargar.',

  faqEyebrow: 'Preguntas',

  cierreTitulo: 'Contame cómo trabajás hoy',
  cierreBajada: 'Contame cuántos autos tenés y cómo trabajás hoy. Si preferís, escribime y lo hablamos.',
  cierreCta: 'Completar el formulario',

  contactoEyebrow: 'Formulario de cotización',
  contactoTitulo: 'Cuatro datos y te respondo yo',
  contactoBajada:
    'Con cuatro datos ya sé de qué tamaño es tu operación. El plazo y los detalles los hablamos después.',
  contactoColumna: 'Para qué sirve cada dato',
  contactoPie: 'Sin precios en la web: el número depende de tu flota y lo hablamos antes de empezar. Si preferís, escribime por WhatsApp.',
  contactoEnviar: 'Mandar los cuatro datos',

  argentinaEyebrow: 'Hecho acá',
  argentinaTitulo: 'Un sistema de afuera no sabe qué es un echeq',
  argentinaBajada:
    'Los que cobran en dólares y están en inglés resuelven muy bien el alquiler. Lo que no resuelven es todo lo que pasa alrededor en una rentadora argentina. Nada de esta lista es una promesa de traducción: son tablas y estados que existen en el sistema.',

  whatsapp: 'Escribime por WhatsApp',
  whatsappMensaje: 'Hola Gael, tengo una rentadora y quiero ver RentaGo.',
  barraMovilSub: 'Te contesto yo, no un formulario',

  firmaPie: 'Desarrollado por',
} as const;
