/* Los tipos de las páginas de captación, con el patrón de las webs de ACA y Palazzo.
 *
 * Cada página trae su propio `title` (≤ 60), `description` (140–160) y un `citable`: dos o tres
 * oraciones autónomas que un motor generativo pueda cortar y citar sin el párrafo anterior. Las
 * preguntas emiten `FAQPage` solas, desde `FaqLista`.
 *
 * **Cada página dice algo que solo es cierto ahí.** La plantilla JSX es compartida y el contenido
 * no: nada de reemplazar el nombre de la ciudad en un texto genérico. Una página sin contenido
 * propio es una página puerta, y Google las castiga.
 *
 * Todo lo que se afirma del sistema sale de `contenido.ts` (verificado contra el código). Si una
 * página necesita afirmar algo que el sistema todavía no hace, la página no se publica. */

/** Una pregunta de FAQ. `r` contesta en la primera oración, sin preámbulo. */
export type PreguntaFaq = { p: string; r: string };

/** Un bloque de prosa con su subtítulo. */
export type Seccion = { titulo: string; parrafos: string[] };

/** Lo común a toda página de captación. */
export type PaginaSeo = {
  slug: string;
  /** El nombre corto, para el pie, las migas y los enlaces cruzados. */
  nombre: string;
  /** ≤ 60 caracteres. Sin " · RENTAGO": lo agrega el layout. */
  title: string;
  /** Entre 140 y 160 caracteres. */
  description: string;
  /** Con la frase clave entre *asteriscos*. Contiene la búsqueda principal. */
  h1: string;
  /** Una línea. */
  bajada: string;
  /** Dos o tres oraciones autónomas, citables por un motor generativo. */
  citable: string;
  /** Entre 3 y 5. */
  preguntas: PreguntaFaq[];
};

/** `/para/[slug]`: un tipo de operación (aeropuerto, turismo, empresas, camionetas…). */
export type PaginaPara = PaginaSeo & {
  /** Cuatro necesidades de ese tipo de rentadora, cada una con lo que la resuelve. */
  necesidades: { titulo: string; texto: string }[];
  /** Prosa: cómo es ese negocio por dentro. Dos o tres secciones. */
  secciones: Seccion[];
  /** Slugs de `MODULOS` que más pesan acá, en orden. */
  modulos: string[];
  /** Slug de `OPERACIONES` para "Ver cómo se hace". */
  operacion?: string;
  /** Slug de una guía relacionada. */
  guia?: string;
};

/** `/guias/[slug]`: una guía práctica que sirve aunque no compres nada. */
export type Guia = PaginaSeo & {
  /** Tres a cinco secciones de prosa. */
  secciones: Seccion[];
  /** Lista de control al final: cosas concretas para hacer o revisar. */
  pasos: string[];
  /** Cómo lo resuelve el sistema. Un párrafo, rotulado aparte para que no se lea como publicidad
   *  encubierta. */
  enRentaGo: string;
  /** Slug del módulo relacionado. */
  modulo: string;
  /** Slugs del glosario que se mencionan. */
  terminos: string[];
};

/** `/contrato-de-alquiler-de-autos`. */
export type PaginaContrato = PaginaSeo & {
  /** Las partes que tiene que tener un contrato de alquiler de autos, en orden. Ocho a doce. */
  partes: { titulo: string; texto: string }[];
  /** Prosa: por qué importa cada cosa, errores comunes. Dos o tres secciones. */
  secciones: Seccion[];
  /** Cómo funciona el modelo de ejemplo: se arranca de ahí y se adapta a la operación. */
  modelo: { titulo: string; texto: string; cta: string };
  enRentaGo: string;
};

/** `/planes`: sin un solo número de precio. */
export type Plan = {
  slug: string;
  nombre: string;
  /** Para quién es, una línea. */
  para: string;
  /** Lo que incluye, en ítems cortos. */
  incluye: string[];
  /** El recomendado lleva la marca. Uno solo. */
  recomendado?: boolean;
};

export type PaginaPlanes = PaginaSeo & {
  planes: Plan[];
  /** Lo que se suma a cualquier plan. */
  adicionales: { nombre: string; texto: string }[];
  /** Cómo se calcula el precio (sin números): pago único + mantenimiento mensual, sobre qué datos. */
  comoSeCotiza: string;
};

/** Un ítem con ícono (de `components/sistema/Icono.tsx`), título y una línea. */
export type ItemConIcono = { icono: string; titulo: string; texto: string };

/** `/que-incluye`: qué se paga una vez, qué se paga por mes y qué es del cliente. Sin números. */
export type PaginaIncluye = PaginaSeo & {
  pagoUnico: { nombre: string; para: string; items: ItemConIcono[] };
  mensual: { nombre: string; para: string; items: ItemConIcono[] };
  tuyoTitulo: string;
  tuyo: ItemConIcono[];
  secciones: Seccion[];
};

/** `/web-a-medida`: la web de reservas con la marca de cada rentadora. */
export type PaginaAMedida = PaginaSeo & {
  cambiaTitulo: string;
  cambia: ItemConIcono[];
  vieneTitulo: string;
  viene: ItemConIcono[];
  /** v4c: lo que la web le pasa al panel (reservas, cobros, seguimiento). */
  conectaTitulo: string;
  conecta: ItemConIcono[];
  secciones: Seccion[];
};
