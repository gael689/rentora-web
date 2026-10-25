/* La barra lateral del sistema, tal cual.
 *
 * Copiado de `NAV_SECTIONS` en `rentago-system/panel/src/lib/constants.ts` (recontado el
 * 06/10/2026): **cinco secciones con título y 23 ítems, todos siempre a la vista**. No hay
 * grupos plegables ni un color de acento por sección: hay un solo acento, el azul de la marca
 * del cliente, que acá es el turquesa de RentaGo.
 *
 * ── NOTA DE CAMBIO DE FORMA (para quien mantiene BarraLateral.tsx) ───────────────────────
 *
 * La forma nueva y buena es `SECCIONES: SeccionNav[]`:
 *
 *   SeccionNav = { titulo: string; items: ItemNav[] }
 *   ItemNav    = { ruta: string; path: string; tab?: string; label: string; icono: string }
 *
 * - `ruta` es la ruta real, con `?tab=` cuando el ítem es una pestaña de Caja.
 * - `path` es la ruta sin query: contra esa se compara la pantalla activa.
 * - Hay dos ítems que se llaman "Hoy": el de Operación (calendario) y el de Caja (caja del
 *   día). Se distinguen por `ruta`, no por `label`.
 *
 * Para no romper `BarraLateral.tsx` mientras migra se exportan también `GRUPOS` y `COLOR_GRUPO`
 * con la forma vieja: `GRUPOS` es `SECCIONES` con `label` en lugar de `titulo`, sin `principal`,
 * y con `ruta` igual a `path` (sin query). `COLOR_GRUPO` queda vacío a propósito: ya no hay
 * colores por sección. */

export type ItemNav = {
  ruta: string;
  path: string;
  tab?: string;
  label: string;
  icono: string;
};

export type SeccionNav = {
  titulo: string;
  items: ItemNav[];
};

function item(ruta: string, label: string, icono: string): ItemNav {
  const [path, query] = ruta.split('?');
  const tab = query?.startsWith('tab=') ? query.slice(4) : undefined;
  return { ruta, path, tab, label, icono };
}

export const SECCIONES: SeccionNav[] = [
  {
    titulo: 'Operación',
    items: [
      item('/ocupacion', 'Hoy', 'panel'),
      item('/reservas', 'Reservas', 'lista'),
      item('/contratos', 'Contratos', 'documento'),
      item('/clientes', 'Clientes', 'personas'),
    ],
  },
  {
    titulo: 'Flota',
    items: [
      item('/flota', 'Vehículos', 'auto'),
      item('/flota/categorias', 'Categorías y precios', 'caja'),
      item('/multas', 'Multas', 'alerta'),
    ],
  },
  {
    titulo: 'Caja',
    items: [
      /* La planilla de socios (Alquileres y Mes) es el adicional de reparto entre socios: una
       * rentadora sin el adicional no la ve en el menú, así que la réplica tampoco. */
      item('/caja?tab=a-cobrar', 'A cobrar', 'tilde'),
      item('/caja?tab=caja', 'Hoy', 'billetera'),
      item('/caja?tab=cobros', 'Cobros', 'documento'),
      item('/caja?tab=echeqs', 'Echeqs', 'tarjeta'),
      item('/caja?tab=cc', 'Cuentas corrientes', 'personas'),
      item('/reportes', 'Reportes', 'barras'),
    ],
  },
  {
    titulo: 'Ventas',
    items: [
      item('/cotizador', 'Cotizador', 'calculadora'),
      item('/prospectos', 'Prospectos', 'megafono'),
      item('/precios', 'Precios', 'rango'),
      item('/adicionales', 'Adicionales', 'caja'),
      item('/fechas-especiales', 'Fechas especiales', 'calendario'),
      item('/canal-web', 'Cómo vende el sitio', 'globo'),
      item('/reservas-web', 'Bandeja de la web', 'lista'),
    ],
  },
  {
    titulo: 'Sistema',
    items: [
      item('/notificaciones', 'Notificaciones', 'campana'),
      item('/configuracion', 'Configuración', 'engranaje'),
      item('/auditoria', 'Auditoría', 'escudo'),
    ],
  },
];

/** Los ítems de todas las secciones, en orden. Son 23. */
export const ITEMS_NAV: ItemNav[] = SECCIONES.flatMap((s) => s.items);

/** Los cinco de la barra de abajo del celular. */
export const NAV_MOVIL: ItemNav[] = [
  item('/ocupacion', 'Hoy', 'panel'),
  item('/reservas', 'Reservas', 'lista'),
  item('/flota', 'Flota', 'auto'),
  item('/clientes', 'Clientes', 'personas'),
  item('/caja', 'Caja', 'billetera'),
];

/* ── Compatibilidad con la forma vieja (borrar cuando BarraLateral migre) ─────────────── */

export type GrupoNav = {
  label: string;
  icono: string;
  items: { ruta: string; label: string; icono: string }[];
  principal?: boolean;
};

export const GRUPOS: GrupoNav[] = SECCIONES.map((s) => ({
  label: s.titulo,
  icono: s.items[0].icono,
  items: s.items.map((i) => ({ ruta: i.path, label: i.label, icono: i.icono })),
}));

/** Vacío a propósito: el menú real tiene un solo acento y no uno por sección. */
export const COLOR_GRUPO: Record<string, { texto: string; fondo: string }> = {};
