/* Cómo se parte cada paso de "Para revisar" en una guía: un título corto en negrita (el verbo y su
 * objeto) y el resto de la oración. Es sólo presentación: el texto de `Guia.pasos` no cambia (sigue
 * siendo una oración completa para llms.txt) y título + resto, juntos, la reconstruyen.
 *
 * Regla general (`partirPaso`): si hay una coma después de 2 a 5 palabras, ahí se corta; si no, en
 * la primera preposición o conjunción a partir de la tercera palabra. Los que esa regla parte mal
 * van en `A_MANO`.
 *
 * REVISAR GAEL: los cortes son propuesta, no cambian el sentido de ninguna oración. */

const A_MANO: Record<string, [string, string]> = {
  'Marcá en el calendario del año pasado las semanas en que te quedaste sin autos.': ['Marcá en el calendario del año pasado', 'las semanas en que te quedaste sin autos.'],
  'Definí la tarifa base de cada categoría para un día común de temporada baja.': ['Definí la tarifa base de cada categoría', 'para un día común de temporada baja.'],
  'Definí tres tramos de duración como mucho, con su descuento.': ['Definí tres tramos de duración', 'como mucho, con su descuento.'],
  'Definí la franquicia base de cada categoría.': ['Definí la franquicia base', 'de cada categoría.'],
  'Fijá el monto de la garantía y en qué medio se toma.': ['Fijá el monto de la garantía', 'y en qué medio se toma.'],
  'Prepará la explicación de dos frases, con los números de cada categoría.': ['Prepará la explicación de dos frases', 'con los números de cada categoría.'],
  'Revisá con tu abogado el texto del documento de franquicia.': ['Revisá con tu abogado', 'el texto del documento de franquicia.'],
  'Elegí los medios de pago: Mercado Pago, transferencia o los dos.': ['Elegí los medios de pago', 'Mercado Pago, transferencia o los dos.'],
  'Definí el porcentaje de seña y si cambia en temporada alta.': ['Definí el porcentaje de seña', 'y si cambia en temporada alta.'],
  'Escribí la política de cancelación con plazos concretos.': ['Escribí la política de cancelación', 'con plazos concretos.'],
  'Verificá que la web y el mostrador vendan sobre el mismo cupo.': ['Verificá que la web y el mostrador', 'vendan sobre el mismo cupo.'],
  'Probá una reserva de punta a punta antes de anunciar la web.': ['Probá una reserva de punta a punta', 'antes de anunciar la web.'],
  'Armá la lista de la flota con patente, modelo, categoría y kilómetros.': ['Armá la lista de la flota', 'con patente, modelo, categoría y kilómetros.'],
  'Conseguí la última versión del contrato que hacés firmar.': ['Conseguí la última versión del contrato', 'que hacés firmar.'],
  'Elegí una fecha de corte en temporada baja.': ['Elegí una fecha de corte', 'en temporada baja.'],
  'Cargá la VTV y la póliza de cada auto con su fecha de vencimiento.': ['Cargá la VTV y la póliza de cada auto', 'con su fecha de vencimiento.'],
  'Anotá el próximo service por kilómetro y por fecha.': ['Anotá el próximo service', 'por kilómetro y por fecha.'],
  'Definí con cuánta anticipación querés el aviso de cada trámite.': ['Definí con cuánta anticipación', 'querés el aviso de cada trámite.'],
  'Controlá la licencia de cada conductor en cada entrega.': ['Controlá la licencia de cada conductor', 'en cada entrega.'],
};

const CORTE = new Set(['de', 'del', 'con', 'cuando', 'para', 'antes', 'y', 'que', 'por', 'desde', 'si', 'hasta', 'al', 'sobre', 'en']);

export function partirPaso(paso: string): { titulo: string; resto: string } {
  const corte = (titulo: string) => ({ titulo, resto: paso.slice(titulo.length) });
  const a = A_MANO[paso];
  if (a) return corte(a[0]);

  const coma = paso.indexOf(',');
  if (coma > 0) {
    const n = paso.slice(0, coma).split(' ').length;
    if (n >= 2 && n <= 5) return corte(paso.slice(0, coma));
  }
  const w = paso.split(' ');
  for (let i = 2; i < Math.min(w.length - 1, 6); i++) {
    if (CORTE.has(w[i].toLowerCase())) return corte(w.slice(0, i).join(' '));
  }
  return { titulo: paso, resto: '' };
}
