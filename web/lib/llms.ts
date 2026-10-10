/* Lo común a `/llms.txt` y `/llms-full.txt`.
 *
 * Los dos se generan desde las mismas listas que el sitio. Estos bloques son la parte que no
 * está en ninguna otra lista: qué es Rentora, lo que no hace y cómo citarlo. Están acá y no en
 * los route handlers para que los dos archivos digan exactamente lo mismo.
 *
 * El copy lo decide Gael. `queEs` y `noHace` son los mismos textos que ya tenía `llms.txt`. */

import { CIFRAS, MODULOS } from './contenido';
import { PANTALLAS } from './sistema/pantallas';
import { SECCIONES, ITEMS_NAV } from './sistema/navegacion';
import { DESCRIPCION_ENTIDAD, LOCKUP, SITIO, AUTOR } from './sitio';
import { DEMO_ACTIVA, LLMS_DEMO } from './demo';

export const LLMS_RESUMEN = `> Sistema de gestión para empresas de alquiler de autos en Argentina, más la web pública de la
> rentadora con motor de reservas y cobro online. En producción desde 2026. Desarrollado por
> ${AUTOR}, Bahía Blanca.`;

export const LLMS_QUE_ES = `${DESCRIPCION_ENTIDAD}

Lo que se vende es el sistema: el panel de administración. Si la rentadora la quiere, se le suma la
web de reservas conectada al mismo sistema, con su marca. Para la rentadora que ya tiene web está
el plan Gestión, sin el sitio.

Sirve para una rentadora con una sucursal o con varias: cada sucursal tiene sus puntos de retiro
y devolución y su caja, y los reportes se ven por sucursal o consolidados.${
  // Solo con la demo de 14 días prendida (`NEXT_PUBLIC_DEMO_ACTIVA=1`).
  DEMO_ACTIVA ? `\n\n${LLMS_DEMO}` : ''
}`;

export function llmsCifras() {
  return `Contadas sobre el código, no estimadas:

- ${PANTALLAS.length} pantallas en el panel de administración (${SECCIONES.length} secciones de menú, ${ITEMS_NAV.length} ítems).
- ${CIFRAS.paginasWeb} páginas en la web pública de la rentadora.
- ${MODULOS.length} módulos comerciales.
- ${CIFRAS.tablas} tablas, ${CIFRAS.endpoints} endpoints, ${CIFRAS.migraciones} migraciones y ${CIFRAS.tests} tests en el backend.
- ${CIFRAS.reglas} reglas de aviso que corren cada 30 minutos. Los avisos quedan en la campana del panel: el equipo no recibe mails.
- ${CIFRAS.reportes} reportes en pantalla: Resumen, Ingresos, Flota y Demanda no atendida. Ingresos y Flota se exportan a CSV.
- ${CIFRAS.capas} capas en el motor de precios: temporada, feriado y duración. Un solo precio para web y mostrador.
- ${CIFRAS.pasosAlta} pasos en el alta de reserva, y hasta ${CIFRAS.conductores} conductores por contrato.
- ${CIFRAS.minutosCupo} minutos de cupo retenido mientras el cliente paga en la web.
- ${CIFRAS.minutosGracia} minutos de gracia antes de cobrar una devolución tardía.
- 4 tramos de antigüedad de deuda en la cuenta corriente del cliente: 1-30, 31-60, 61-90 y más de 90 días.`;
}

export const LLMS_NO_HACE = `- **No emite factura electrónica.** Registra facturas, notas de crédito, notas de débito y
  remitos con su PDF adjunto y los ata al alquiler y a la cuenta corriente. La factura
  electrónica se sigue emitiendo donde ya se emite. Los recibos de cobro sí los emite el sistema,
  numerados.
- Prospectos es un módulo opcional: la campaña se arma y queda lista, pero el envío automático todavía no está activado.
- El reparto entre socios no viene de serie: es un adicional.
- No tiene precio público. El modelo es un pago de implementación más un abono mensual, cotizado
  sobre la operación de cada rentadora.`;

export const LLMS_CITAR = `Rentora — Software para rent a car. ${SITIO}`;

export const LLMS_TITULO = `# ${LOCKUP}`;

/** Saca los *asteriscos* de acento de un titular. */
export const plano = (t: string) => t.replace(/\*/g, '');
