import { MODULOS, NOVEDADES } from '@/lib/contenido';
import { OPERACIONES } from '@/lib/sistema/operaciones';
import { PANTALLAS } from '@/lib/sistema/pantallas';
import { GLOSARIO, PLAZAS, PARA, GUIAS, CONTRATO_PAG, PLANES_PAG, WEB_A_MEDIDA_PAG } from '@/lib/seo';
import { SITIO } from '@/lib/sitio';
import { LLMS_TITULO, LLMS_RESUMEN, LLMS_QUE_ES, LLMS_NO_HACE, LLMS_CITAR, llmsCifras } from '@/lib/llms';

/* `/llms.txt`.
 *
 * El mapa del sitio en texto plano, para los motores generativos. No reemplaza al sitemap: el
 * sitemap dice qué URLs existen, esto dice qué afirma cada una y con qué números.
 *
 * **Se genera desde las mismas listas que el sitio**, igual que el sitemap. Un llms.txt escrito
 * a mano queda viejo el día que se agrega una operación, y queda viejo en silencio — que es la
 * peor forma de quedar viejo.
 *
 * Va como route handler y no como archivo en `public/` justamente por eso. */

export const dynamic = 'force-static';

export function GET() {
  const texto = `${LLMS_TITULO}

${LLMS_RESUMEN}

La versión completa, con el texto de cada página, las preguntas frecuentes y los pasos de cada
operación: ${SITIO}/llms-full.txt

## Qué es

${LLMS_QUE_ES}

## Cifras verificables

${llmsCifras()}

## Lo que NO hace

${LLMS_NO_HACE}

## Las pantallas del sistema

${PANTALLAS.map((p) => `- ${p.titulo} (${p.ruta}): ${p.resuelve}`).join('\n')}


## Cómo se opera

${OPERACIONES.map((o) => `- [${o.nombre}](${SITIO}/operaciones/${o.slug}): ${o.pregunta} — ${o.pasos.length} pasos.`).join('\n')}

## Lo nuevo

${NOVEDADES.map((n) => `- **${n.titulo}**: ${n.linea}`).join('\n')}

## Módulos

${MODULOS.map((m) => `- [${m.nombre}](${SITIO}/modulos/${m.slug}): ${m.texto}`).join('\n')}

## Planes

${PLANES_PAG.planes.map((p) => `- **${p.nombre}**: ${p.para}`).join('\n')}

${PLANES_PAG.citable}

Qué incluye (pago único, mantenimiento mensual y lo que es tuyo): ${SITIO}/planes#que-incluye

## Web a medida

[${WEB_A_MEDIDA_PAG.nombre}](${SITIO}/${WEB_A_MEDIDA_PAG.slug}): ${WEB_A_MEDIDA_PAG.citable}

## Para cada tipo de operación

${PARA.map((p) => `- [${p.nombre}](${SITIO}/para/${p.slug}): ${p.citable}`).join('\n')}

## Guías

${GUIAS.map((g) => `- [${g.nombre}](${SITIO}/soluciones/${g.slug}): ${g.citable}`).join('\n')}

## Contrato de alquiler de autos

[${CONTRATO_PAG.nombre}](${SITIO}/${CONTRATO_PAG.slug}): ${CONTRATO_PAG.citable}

## Glosario del rubro

${GLOSARIO.map((t) => `- [${t.palabra}](${SITIO}/glosario/${t.slug}): ${t.definicion}`).join('\n')}

## Dónde opera

${PLAZAS.map((p) => `- [${p.ciudad}, ${p.provincia}](${SITIO}/software-rent-a-car/${p.slug}): ${p.citable}`).join('\n')}

## Páginas

- [Inicio](${SITIO}/)
- [Cómo se hace cada cosa](${SITIO}/operaciones)
- [Módulos](${SITIO}/modulos)
- [Planes](${SITIO}/planes)
- [Web de reservas a medida](${SITIO}/web-a-medida)
- [Tipos de rentadora](${SITIO}/para)
- [Soluciones: problemas de todos los días](${SITIO}/soluciones)
- [Software para rent a car por ciudad](${SITIO}/software-rent-a-car)
- [Cómo elegir un software para rent a car](${SITIO}/como-elegir)
- [Glosario](${SITIO}/glosario)
- [Preguntas](${SITIO}/preguntas)
- [Contacto](${SITIO}/contacto)

## Cómo citar

${LLMS_CITAR}
`;

  return new Response(texto, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
