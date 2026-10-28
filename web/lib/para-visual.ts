/* Lo visual de cada tipo de rentadora (/para): la foto y la frase corta que va sobre ella.
 * Las fotos viven en `public/para/<slug>.webp`; los créditos, en `public/para/CREDITOS.md`.
 * REVISAR GAEL: las frases cortas son propuestas. */

export type VisualPara = {
  src: string;
  alt: string;
  /** Dónde se ancla la foto al recortarla (object-position). */
  pos: string;
  /** Una frase, para la tarjeta. */
  frase: string;
  /** v6b: la tarjeta ya no lleva foto de stock (se leían genéricas): una escena de marca con este
   *  ícono grande sobre la malla del tono. La foto queda en los datos por si vuelve. */
  icono: string;
  tono: 'turq' | 'azul' | 'menta' | 'petro';
};

export const VISUAL_PARA: Record<string, VisualPara> = {
  'rent-a-car-de-aeropuerto': {
    src: '/para/rent-a-car-de-aeropuerto.webp',
    alt: 'Avión en silueta contra el atardecer, en la pista de un aeropuerto',
    pos: '50% 40%',
    frase: 'Vendés antes de que aterrice y entregás en la terminal.', // REVISAR GAEL
    icono: 'avion',
    tono: 'azul',
  },
  'alquiler-turistico': {
    src: '/para/alquiler-turistico.webp',
    alt: 'Lago y montañas nevadas de la Patagonia bajo un cielo azul',
    pos: '50% 50%',
    frase: 'El precio de temporada alta sale solo.', // REVISAR GAEL
    icono: 'montana',
    tono: 'menta',
  },
  'alquiler-de-camionetas-y-utilitarios': {
    src: '/para/alquiler-de-camionetas-y-utilitarios.webp',
    alt: 'Vista aérea de una camioneta recorriendo una ruta recta entre bosques',
    pos: '50% 28%',
    frase: 'Cada golpe queda registrado, con foto.', // REVISAR GAEL
    icono: 'camion',
    tono: 'petro',
  },
  'alquiler-a-empresas': {
    src: '/para/alquiler-a-empresas.webp',
    alt: 'Edificio de oficinas de vidrio visto desde abajo contra el cielo',
    pos: '50% 40%',
    frase: 'Cuenta corriente y multas atadas a quien manejaba.', // REVISAR GAEL
    icono: 'edificio',
    tono: 'azul',
  },
  'alquiler-a-choferes-de-aplicaciones': {
    src: '/para/alquiler-a-choferes-de-aplicaciones.webp',
    alt: 'Estelas de luz de los autos en una avenida de la ciudad de noche',
    pos: '50% 60%',
    frase: 'Un precio por semana y una fecha de pago.', // REVISAR GAEL
    icono: 'movil',
    tono: 'turq',
  },
  'flotas-con-varias-sucursales': {
    src: '/para/flotas-con-varias-sucursales.webp',
    alt: 'Vista aérea de una red de autopistas que cruza una ciudad',
    pos: '50% 50%',
    frase: 'Retiro en una sucursal, devolución en otra.', // REVISAR GAEL
    icono: 'pin',
    tono: 'turq',
  },
};
