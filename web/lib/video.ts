/* El video de la home. Apagado hasta que exista el archivo.
 *
 * Con `src` en null no se dibuja nada ni se declara el VideoObject: un dato estructurado de un video
 * que no existe es peor que ninguno. Para encenderlo: subir el mp4 (R2 o /public), el poster y los
 * subtítulos .vtt, y completar estos campos. Guion en `marketing/video/guion.md`. */

export const VIDEO = {
  src: null as string | null,
  poster: null as string | null,
  subtitulos: null as string | null,
  titulo: 'RentaGo en 75 segundos',
  descripcion: 'Una reserva, su contrato y su cobro, de punta a punta, en el sistema de RentaGo.',
  /** ISO 8601. */
  duracion: 'PT75S',
  /** ISO 8601, la fecha en que se publica. */
  subido: '2026-10-06',
  etiqueta: 'Mirá cómo se carga una reserva en 75 segundos',
} as const;
