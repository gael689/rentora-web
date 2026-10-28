/* Copy y datos de la navegación (encabezado, pie, barra móvil) y de la home que no viven en
 * `contenido.ts`. Archivo del agente HOME: si DATOS lo absorbe en `contenido.ts`, se borra acá. */

export const NAV = {
  principal: 'Principal',
  pie: 'Pie',
  producto: 'Producto',
  modulosMenu: 'Módulos',
  solucionesMenu: 'Soluciones',
  comoSeHace: 'Cómo se hace',
  preguntas: 'Preguntas',
  planes: 'Planes',
  modulos: 'Módulos',
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
  guias: 'Soluciones',
  ayuda: 'Ayuda',
  tiposRentadora: 'Tipos de rentadora',
  whatsappCorto: 'WhatsApp',
  inicio: 'Inicio',
  formularioLargo: 'Completar el formulario',
} as const;

/** Los mega-menús de escritorio (hover): "Módulos" muestra todos los módulos por área (sale de
 *  `HOME.todo.grupos`) y "Soluciones" las subpáginas de /soluciones. Cada uno cierra con una franja
 *  de accesos (estilo "¿No sabés por dónde empezar?"). */
export const SOLUCIONES_NAV = [
  { href: '/soluciones/como-armar-tarifas-de-temporada', icono: 'calendario', titulo: 'Tarifas de temporada', detalle: '¿Tus tarifas no cierran?' },
  { href: '/soluciones/franquicia-y-garantia', icono: 'escudo', titulo: 'Franquicia y garantía', detalle: 'Cómo explicarlo en el mostrador' },
  { href: '/soluciones/cobrar-la-sena-online', icono: 'billetera', titulo: 'Cobrar la seña online', detalle: '¿Cobrás la seña por WhatsApp?' },
  { href: '/soluciones/pasar-del-excel-a-un-sistema', icono: 'planilla', titulo: 'Del Excel a un sistema', detalle: '¿Todavía en Excel?' },
  { href: '/soluciones/vencimientos-de-la-flota', icono: 'campana', titulo: 'Vencimientos de la flota', detalle: '¿Se te vencen la VTV y el seguro?' },
] as const;

export const MEGA_PIE = {
  modulos: {
    titulo: '¿No sabés por dónde empezar?',
    detalle: 'Mirá el sistema completo.',
    links: [{ href: '/modulos', texto: 'Ver todos los módulos' }],
    /** Las dos entradas que tienen que verse: tarjetas de color, no links sueltos. */
    destacados: [
      { href: '/web-a-medida', icono: 'globo', titulo: 'Tu web de reservas', detalle: 'Reserva y cobra sola, con tu marca', previa: { src: '/web-a-medida/reserva-movil.webp', pos: '40% 40%', titulo: 'Una web de reservas a medida de tu rentadora', bajada: 'Con tu logo, tus colores y tu dominio, conectada a tu panel.' } },
      { href: '/para', icono: 'auto', titulo: 'Tipos de rentadora', detalle: 'Turismo, empresas, aeropuerto, choferes', previa: { src: '/heros/para.webp', pos: '60% 45%', titulo: '¿Cómo alquilás vos?', bajada: 'Cada operación pierde plata en un lugar distinto. Elegí la tuya.' } },
    ],
  },
  soluciones: {
    titulo: '¿Te pasa algo de esto?',
    detalle: 'Cada problema del mostrador tiene una forma de resolverse sin hacerlo a mano.',
    links: [
      { href: '/soluciones', texto: 'Ver todas las soluciones' },
      { href: '/como-elegir', texto: '¿Necesitás un sistema?' },
    ],
  },
} as const;

/** Los links del menú de mobile, en orden. */
export const MENU_MOVIL = [
  { href: '/modulos', texto: 'Módulos' },
  { href: '/operaciones', texto: 'Cómo se hace' },
  { href: '/web-a-medida', texto: 'Tu web de reservas' },
  { href: '/para', texto: 'Tipos de rentadora' },
  { href: '/planes', texto: 'Planes' },
  { href: '/soluciones', texto: 'Soluciones' },
  { href: '/como-elegir', texto: '¿Necesitás un sistema?' },
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
  vitrinaEtiqueta: 'Pantallas del sistema',
  ruta: { contacto: '/contacto' },
} as const;
