import { MODULOS, FAQS, ARGENTINA, IMPLEMENTACION, ETAPAS, PROBLEMAS } from '@/lib/contenido';
import { OPERACIONES } from '@/lib/sistema/operaciones';
import { PANTALLAS } from '@/lib/sistema/pantallas';
import { GLOSARIO, PLAZAS, PARA, GUIAS, CONTRATO_PAG, PLANES_PAG, CHECKLIST, QUE_INCLUYE_PAG, WEB_A_MEDIDA_PAG, type PreguntaFaq, type Seccion, type ItemConIcono } from '@/lib/seo';
import { SITIO } from '@/lib/sitio';
import { LLMS_TITULO, LLMS_RESUMEN, LLMS_QUE_ES, LLMS_NO_HACE, LLMS_CITAR, llmsCifras, plano } from '@/lib/llms';

/* `/llms-full.txt`.
 *
 * El contenido entero del sitio en un solo Markdown, para el motor que prefiere leer un archivo a
 * recorrer 60 páginas: cada página con su párrafo citable, su prosa y sus preguntas. `llms.txt` es
 * el índice; esto es el libro.
 *
 * Sale de las mismas listas que las páginas, igual que el sitemap y `llms.txt`. **No hay un solo
 * texto escrito acá** que no esté también publicado en una página: si este archivo afirmara algo
 * que la web no dice, sería una segunda fuente de verdad, y derivan. */

export const dynamic = 'force-static';

const faq = (ps: PreguntaFaq[]) => ps.map((f) => `**${f.p}**\n${f.r}`).join('\n\n');
const prosa = (ss: Seccion[], nivel = '###') =>
  ss.map((x) => `${nivel} ${x.titulo}\n\n${x.parrafos.join('\n\n')}`).join('\n\n');
const cita = (t: string) => `> ${t}`;

export function GET() {
  const partes: string[] = [];
  const h = (t: string) => partes.push(t);

  h(`${LLMS_TITULO}

${LLMS_RESUMEN}

Índice corto: ${SITIO}/llms.txt · Cómo citar: ${LLMS_CITAR}

## Qué es

${LLMS_QUE_ES}

## Cifras verificables

${llmsCifras()}

## Lo que NO hace

${LLMS_NO_HACE}`);

  h(`## Los problemas que resuelve

${PROBLEMAS.map((p) => `- ${p.dolor} → ${p.gana}`).join('\n')}`);

  h(`## Hecho en Argentina

${ARGENTINA.map((a) => `- **${a.que}**: ${a.como}`).join('\n')}`);

  h(`## El recorrido de un alquiler

${ETAPAS.map((e) => `${e.n}. **${e.titulo}**: ${e.detalle} ${e.nota}`).join('\n')}`);

  h(`## Cómo se implementa

${IMPLEMENTACION.map((e) => `${e.n}. **${e.titulo}**: ${e.detalle} (${e.tuyo}.)`).join('\n')}`);

  h(`## Módulos

${MODULOS.map(
  (m) => `### ${m.nombre}

URL: ${SITIO}/modulos/${m.slug}

${m.texto}

${m.problema}

${cita(`${m.dolor} — ${m.gana}`)}`,
).join('\n\n')}`);

  h(`## Las ${PANTALLAS.length} pantallas del sistema

Catálogo con las pantallas replicadas: ${SITIO}/sistema

${PANTALLAS.map((p) => `- **${p.titulo}** (${p.ruta}): ${p.resuelve}`).join('\n')}`);

  h(`## Cómo se opera

${OPERACIONES.map(
  (o) => `### ${o.nombre}

URL: ${SITIO}/operaciones/${o.slug}

${o.pregunta}

${o.bajada}

${o.pasos.map((p) => `${p.n}. **${p.titulo}**: ${p.detalle}${p.dato ? ` (${p.dato})` : ''}`).join('\n')}

${o.diferencial}`,
).join('\n\n')}`);

  h(`## ${plano(PLANES_PAG.h1)}

URL: ${SITIO}/planes

${cita(PLANES_PAG.citable)}

${PLANES_PAG.planes
  .map((p) => `### ${p.nombre}${p.recomendado ? ' (recomendado)' : ''}\n\n${p.para}\n\n${p.incluye.map((i) => `- ${i}`).join('\n')}`)
  .join('\n\n')}

### Adicionales

${PLANES_PAG.adicionales.map((a) => `- **${a.nombre}**: ${a.texto}`).join('\n')}

### Cómo se cotiza

${PLANES_PAG.comoSeCotiza}

### Preguntas

${faq(PLANES_PAG.preguntas)}`);

  const items = (xs: ItemConIcono[]) => xs.map((x) => `- **${x.titulo}**: ${x.texto}`).join('\n');
  const QI = QUE_INCLUYE_PAG;
  h(`## ${plano(QI.h1)}

URL: ${SITIO}/${QI.slug}

${cita(QI.citable)}

### ${QI.pagoUnico.nombre}

${QI.pagoUnico.para}

${items(QI.pagoUnico.items)}

### ${QI.mensual.nombre}

${QI.mensual.para}

${items(QI.mensual.items)}

### ${QI.tuyoTitulo}

${items(QI.tuyo)}

${prosa(QI.secciones)}

### Preguntas

${faq(QI.preguntas)}`);

  const WM = WEB_A_MEDIDA_PAG;
  h(`## ${plano(WM.h1)}

URL: ${SITIO}/${WM.slug}

${cita(WM.citable)}

### ${WM.cambiaTitulo}

${items(WM.cambia)}

### ${WM.vieneTitulo}

${items(WM.viene)}

${prosa(WM.secciones)}

### Preguntas

${faq(WM.preguntas)}`);

  h(`## Para cada tipo de operación

${PARA.map(
  (p) => `### ${plano(p.h1)}

URL: ${SITIO}/para/${p.slug}

${cita(p.citable)}

${p.necesidades.map((n) => `- **${n.titulo}**: ${n.texto}`).join('\n')}

${prosa(p.secciones, '####')}

#### Preguntas

${faq(p.preguntas)}`,
).join('\n\n')}`);

  h(`## Guías

${GUIAS.map(
  (g) => `### ${plano(g.h1)}

URL: ${SITIO}/guias/${g.slug}

${cita(g.citable)}

${prosa(g.secciones, '####')}

#### Para hacer

${g.pasos.map((x) => `- ${x}`).join('\n')}

#### En Rentora

${g.enRentora}

#### Preguntas

${faq(g.preguntas)}`,
).join('\n\n')}`);

  h(`## ${plano(CONTRATO_PAG.h1)}

URL: ${SITIO}/${CONTRATO_PAG.slug}

${cita(CONTRATO_PAG.citable)}

${CONTRATO_PAG.partes.map((p, i) => `${i + 1}. **${p.titulo}**: ${p.texto}`).join('\n')}

${prosa(CONTRATO_PAG.secciones)}

### ${CONTRATO_PAG.modelo.titulo}

${CONTRATO_PAG.modelo.texto}

### En Rentora

${CONTRATO_PAG.enRentora}

### Preguntas

${faq(CONTRATO_PAG.preguntas)}`);

  h(`## Cómo elegir un software para rent a car

URL: ${SITIO}/como-elegir

${CHECKLIST.map((c, i) => `${i + 1}. **${c.q}** ${c.porque} En Rentora: ${c.rentora}`).join('\n')}`);

  h(`## Software para rent a car por ciudad

${PLAZAS.map(
  (p) => `### ${p.ciudad}, ${p.provincia}

URL: ${SITIO}/software-rent-a-car/${p.slug}

${cita(p.citable)}

- **Mercado**: ${p.mercado}
- **Temporada**: ${p.temporada}
- **Flota**: ${p.flota}
- **Aeropuerto**: ${p.aeropuerto}

${p.operacion}

${faq(p.preguntas)}`,
).join('\n\n')}`);

  h(`## Glosario del alquiler de autos

${GLOSARIO.map(
  (t) => `### ${t.palabra}

URL: ${SITIO}/glosario/${t.slug}

${cita(t.definicion)}

${t.ampliacion}${t.enRentora ? `\n\nEn Rentora: ${t.enRentora}` : ''}

${faq(t.preguntas)}`,
).join('\n\n')}`);

  h(`## Preguntas frecuentes

URL: ${SITIO}/preguntas

${FAQS.map((f) => `**${f.q}**\n${f.a}`).join('\n\n')}`);

  h(`## Cómo citar

${LLMS_CITAR}
`);

  return new Response(partes.join('\n\n---\n\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
