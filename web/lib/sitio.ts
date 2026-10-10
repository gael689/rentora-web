/* Constantes del sitio.
 *
 * HOST CANÓNICO: www (decidido el 10/09/2026).
 *
 * El dominio raíz solo admite un registro A con IP fija; `www` es un CNAME que sigue solo
 * al hosting si cambia de rango de IPs. Con el hosting todavía sin decidir, esa
 * flexibilidad es justamente lo que hace falta: se puede apuntar a Vercel, a Cloudflare
 * Pages o a Netlify cambiando el CNAME y nada más.
 *
 * NEXT_PUBLIC_SITIO tiene que declarar el host que REALMENTE sirve el sitio, no el que
 * redirige. El apex tiene que devolver 308 hacia acá, no al revés: si acá queda el host
 * que redirige, las canónicas, el sitemap, el robots.txt, las URLs de Open Graph y los
 * @id del JSON-LD apuntan todos a una URL que devuelve 308 — señal cruzada para Google.
 *
 * Antes de dar el deploy por cerrado:
 *   curl -sI https://rentora.com.ar/ | grep -i location        # -> https://www.rentora.com.ar/
 *   curl -s https://www.rentora.com.ar/ | grep -o 'rel="canonical" href="[^"]*"'
 */
export const SITIO = process.env.NEXT_PUBLIC_SITIO ?? 'https://www.rentora.com.ar';

/** Indexable solo con el dominio definitivo andando. En el provisorio de Vercel queda en noindex. */
export const INDEXAR = process.env.NEXT_PUBLIC_INDEXAR === '1';

/** Lockup fijo. Idéntico en logo, <title>, firma de mail y portada del PDF. */
export const LOCKUP = 'RENTORA · Software para rent a car';

/** Confirmada el 11/09/2026. Es el único lugar donde Rentora enlaza a Gael. */
export const PORTFOLIO = 'https://gaelgonzalez.com.ar';

/* WhatsApp.
 *
 * Era el agujero de conversión más grande del sitio: el único camino de contacto era un
 * formulario de cuatro campos, y este público escribe por WhatsApp. El link va con el mensaje
 * ya escrito para que el que entra no tenga que redactar nada — que es exactamente donde se
 * pierde la mitad de los que iban a escribir.
 *
 * Sigue siendo canal asistido: esto abre la conversación, no la automatiza. */
export const WHATSAPP = '5492914193031';

export function linkWhatsapp(mensaje = 'Hola Gael, tengo una rentadora y quiero ver Rentora.') {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
}
export const AUTOR = 'Gael González';

/* Perfiles de Rentora en otros sitios, para el `sameAs` del JSON-LD.
 *
 * Vacíos a propósito: un `sameAs` que apunta a un perfil que no existe (o a uno de Gael en vez
 * del de Rentora) le dice a Google y a los motores generativos que la entidad es otra. Se
 * completan el día que cada perfil existe y dice lo mismo que la web — ver SEO-GEO.md, "Entidad".
 * Los vacíos se omiten solos. */
export const PERFILES: Record<'linkedin' | 'instagram' | 'facebook' | 'youtube' | 'googleBusiness' | 'capterra', string> = {
  linkedin: '', // https://www.linkedin.com/company/rentora-…
  instagram: '', // https://www.instagram.com/rentora…
  facebook: '',
  youtube: '',
  googleBusiness: '', // el link "maps.app.goo.gl/…" del perfil de empresa
  capterra: '',
};

export const SAME_AS: string[] = Object.values(PERFILES).filter((x) => x !== '');

/** La frase que define a Rentora como entidad. **La misma** en el JSON-LD, en llms.txt, en
 *  llms-full.txt y en cada perfil de terceros (LinkedIn, Google, directorios): los motores
 *  generativos arman la entidad por consenso, y tres descripciones distintas son tres entidades.
 *  BORRADOR: la decide Gael. */
export const DESCRIPCION_ENTIDAD =
  'Rentora es un software para rent a car hecho en Argentina: el sistema de gestión con el que una rentadora maneja flota, reservas, contratos y caja, más la web propia de la rentadora, que reserva y cobra online.';
