/* Copy y datos de la navegación (encabezado, pie, barra móvil) y de la home que no viven en
 * `contenido.ts`. Archivo del agente HOME: si DATOS lo absorbe en `contenido.ts`, se borra acá. */

export const NAV = {
  principal: 'Principal',
  pie: 'Pie',
  producto: 'Producto',
  comoSeHace: 'Cómo se hace',
  preguntas: 'Preguntas',
  planes: 'Planes',
  pantallas: 'Las {n} pantallas',
  modulos: 'Los {n} módulos',
  modulosDetalle: 'Ver los módulos en detalle',
  antes: 'Antes de decidir',
  comoElegir: 'Cómo elegir un sistema',
  glosario: 'Glosario',
  escribime: 'Escribime',
  formulario: 'Formulario',
  cta: 'Ver el sistema',
  whatsapp: 'Hablar por WhatsApp',
  abrir: 'Abrir menú',
  cerrar: 'Cerrar menú',
  guias: 'Guías',
  whatsappCorto: 'WhatsApp',
  inicio: 'Inicio',
  formularioLargo: 'Completar el formulario',
} as const;

/** El mega-menú "Producto" (v4b, patrón del encabezado de ACA): ítems con baldosa de ícono,
 *  título y una línea; a la derecha, una captura del sistema con una frase corta. */
/** Una captura del panel derecho del mega-menú. `movil` es una captura vertical de celular. */
export type VisualMega = { src: string; texto: string; pie: string; movil?: boolean };

const PIE_EJEMPLO = 'Pantalla real, con datos de ejemplo';
const V_OCUPACION: VisualMega = { src: '/v4/ocupacion.webp', texto: 'Toda la flota, en un calendario', pie: PIE_EJEMPLO };
const V_WEB: VisualMega = { src: '/v4/valle-movil.webp', texto: 'Tu web, con tu marca', pie: 'La web de reservas de una rentadora de ejemplo', movil: true };
const V_RESERVAR: VisualMega = { src: '/v4/valle-reservar-movil.webp', texto: 'El cliente elige y ve el precio final', pie: 'La web de reservas de una rentadora de ejemplo', movil: true };

/** Cada ítem lleva la captura que se ve a la derecha mientras está en foco o con el mouse encima. */
export const MEGA = {
  items: [
    { href: '/sistema', icono: 'panel', titulo: 'Las {p} pantallas', detalle: 'El panel por dentro, una por una', tono: 'turq', visual: V_OCUPACION },
    { href: '/modulos', icono: 'lista', titulo: 'Los {m} módulos', detalle: 'Qué resuelve cada parte del sistema', tono: 'azul', visual: V_OCUPACION },
    { href: '/operaciones', icono: 'tildes', titulo: 'Cómo se hace', detalle: 'Reservar, entregar, devolver, cobrar', tono: 'menta', visual: V_RESERVAR },
    { href: '/modulos/tu-web', icono: 'globo', titulo: 'Tu web de reservas', detalle: 'Reserva y cobra sola, con tu marca', tono: 'azul', visual: V_WEB },
    { href: '/para', icono: 'auto', titulo: 'Por tipo de rentadora', detalle: 'Turismo, empresas, aeropuerto, choferes', tono: 'petro', visual: V_OCUPACION },
  ],
  visual: V_OCUPACION,
} as const;

/** Los links del menú de mobile, en orden. */
export const MENU_MOVIL = [
  { href: '/sistema', texto: 'Las pantallas' },
  { href: '/modulos', texto: 'Los módulos' },
  { href: '/operaciones', texto: 'Cómo se hace' },
  { href: '/modulos/tu-web', texto: 'Tu web' },
  { href: '/planes', texto: 'Planes' },
  { href: '/que-incluye', texto: 'Qué incluye' },
  { href: '/guias', texto: 'Guías' },
  { href: '/preguntas', texto: 'Preguntas' },
] as const;

/** Ícono (de `components/sistema/Icono.tsx`) de cada módulo, por slug. Los orbes del menú. */
export const ICONO_MODULO: Record<string, string> = {
  ocupacion: 'calendario',
  flota: 'auto',
  'categorias-y-coberturas': 'escudo',
  clientes: 'personas',
  reservas: 'rango',
  contratos: 'documento',
  precios: 'etiquetas',
  cotizador: 'calculadora',
  caja: 'billetera',
  'multas-y-danos': 'alerta',
  'tu-web': 'globo',
  'avisos-reportes': 'campana',
  captacion: 'megafono',
};

/** Ícono de cada puerta de la home, en el orden de `HOME.puertas.items`. */
export const ICONO_PUERTAS = ['panel', 'globo', 'personas'] as const;

/** Textos sueltos de la home que no están en `HOME`. */
export const HOME_EXTRA = {
  rotuloPuerta: 'Puerta',
  faqTitulo: { antes: 'Preguntas ', clave: 'frecuentes' },
  faqTodas: 'Ver todas las preguntas',
  faqCantidad: 5,
  vitrinaEtiqueta: 'Pantallas del sistema',
  ruta: { contacto: '/contacto' },
} as const;
