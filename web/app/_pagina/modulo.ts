import { MODULOS, NOVEDADES, type Modulo } from '@/lib/contenido';
import { pantalla } from '@/lib/sistema/pantallas';
import { VISTA_MODULO, type Tono } from '@/lib/paginas';

/* Lo que las páginas de módulo necesitan de un módulo: tono, ícono, dolor (ya viene entre
 * comillas), lo que gana y las novedades que le tocan. */
export type VistaModulo = {
  m: Modulo;
  tono: Tono;
  icono: string;
  dolor: string;
  gana: string;
  nuevo: { titulo: string; linea: string }[];
};

export function vistaModulo(m: Modulo): VistaModulo {
  const base = VISTA_MODULO[m.slug];
  const nuevo = NOVEDADES.filter((n) =>
    n.tipo === 'modulo' ? n.slug === m.slug : pantalla(n.slug)?.modulo === m.slug,
  ).map((n) => ({ titulo: n.titulo, linea: n.linea }));
  return {
    m,
    tono: m.tono,
    icono: base?.icono ?? 'panel',
    dolor: m.dolor,
    gana: m.gana,
    nuevo,
  };
}

export function modulosVista(): VistaModulo[] {
  return MODULOS.map(vistaModulo);
}

export function mayuscula(t: string): string {
  return `${t.charAt(0).toUpperCase()}${t.slice(1)}`;
}
