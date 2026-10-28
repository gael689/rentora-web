/* Lo común a `/llms.txt` y `/llms-full.txt`.
 *
 * Los dos se generan desde las mismas listas que el sitio. Estos bloques son la parte que no
 * está en ninguna otra lista: qué es RentaGo, lo que no hace y cómo citarlo. Están acá y no en
 * los route handlers para que los dos archivos digan exactamente lo mismo.
 *
 * El copy lo decide Gael. `queEs` y `noHace` son los mismos textos que ya tenía `llms.txt`. */

import { CIFRAS } from './contenido';
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
  return `Lo que trae, verificado sobre el código :

- Un panel de administración con pantallas para ocupación, reservas, contratos, clientes, flota, caja, precios, cotizador, multas, avisos y reportes.
- Una web pública de reservas para cada rentadora, con su marca.
- Reglas de aviso que corren cada 30 minutos. Los avisos quedan en la campana del panel: el equipo no recibe mails.
- Reportes en pantalla: Resumen, Ingresos, Flota y Demanda no atendida. Ingresos y Flota se exportan a CSV.
- Un motor de precios de ${CIFRAS.capas} capas: temporada, feriado y duración. Un solo precio para web y mostrador.
- Alta de reserva en ${CIFRAS.pasosAlta} pasos, y hasta ${CIFRAS.conductores} conductores por contrato.
- ${CIFRAS.minutosCupo} minutos de cupo retenido mientras el cliente paga en la web.
- ${CIFRAS.minutosGracia} minutos de gracia antes de cobrar una devolución tardía.
- 4 tramos de antigüedad de deuda en la cuenta corriente del cliente: 1-30, 31-60, 61-90 y más de 90 días.`;
}

export const LLMS_NO_HACE = `- Prospectos es un módulo opcional: la campaña se arma y queda lista, pero el envío automático todavía no está activado.
- El reparto entre socios no viene de serie: es un adicional.
- No tiene precio público. El modelo es un pago único (web a medida, implementación,
  capacitación, dominio y hosting en marcha) más un mantenimiento mensual (hosting,
  actualizaciones, soporte y uso del sistema), cotizado sobre la operación de
  cada rentadora.`;

export const LLMS_CITAR = `RentaGo — Software para rent a car. ${SITIO}`;

export const LLMS_TITULO = `# ${LOCKUP}`;

/** Saca los *asteriscos* de acento de un titular. */
export const plano = (t: string) => t.replace(/\*/g, '');
