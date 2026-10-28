import type { Metadata } from 'next';
import Link from 'next/link';
import { FAQS } from '@/lib/contenido';
import { PREGUNTAS_PAG } from '@/lib/paginas';
import { SITIO } from '@/lib/sitio';
import Portada from '../_pagina/Portada';
import Cierre from '../_pagina/Cierre';
import FaqLista from '../_pagina/FaqLista';
import s from '../seo.module.css';
import { alternos } from '../_pagina/meta';

/* La FAQ como página propia, en acordeón (`<details>`, todas cerradas, por categoría). El `FAQPage` sale de
 * FaqLista y es uno solo por página. */
export const metadata: Metadata = {
  title: 'Preguntas sobre el software de alquiler de autos',
  description:
    'Cuánto sale, cuánto tarda, si sirve para camionetas, si emite facturas, cómo se cobra una reserva de la web y qué pasa con los contratos firmados en papel.',
  alternates: alternos('/preguntas'),
};

/* REVISAR GAEL: las categorías y qué pregunta va en cada una. El orden dentro de cada categoría es el
 * de `FAQS` (las más comunes primero). Una pregunta nueva sin categoría cae en "Operación diaria". */
const CATEGORIAS: { titulo: string; preguntas: string[] }[] = [
  {
    titulo: 'Antes de contratar',
    preguntas: [
      '¿Cuánto sale y qué incluye?',
      '¿Cuánto tarda en estar andando?',
      '¿Puedo cargar mis datos actuales?',
      '¿Puedo verlo funcionando antes de decidir?',
      '¿Sirve si tengo varias sucursales?',
      '¿Sirve si alquilo camionetas y no solo autos?',
      '¿Sirve para alquilar a choferes de aplicaciones?',
      '¿Me ayuda a conseguir clientes?',
    ],
  },
  {
    titulo: 'Operación diaria',
    preguntas: [
      '¿Puede pasar que venda dos veces el mismo auto?',
      '¿Se puede firmar en pantalla?',
      '¿Me avisa antes de que se venza la VTV o la póliza?',
      '¿Puedo cambiar una cláusula para un cliente?',
      '¿Y la franquicia?',
      '¿Cuántos conductores puedo cargar en un contrato?',
      '¿Emite facturas?',
      '¿Qué reportes tiene?',
      '¿Sirve para repartir la plata entre socios?',
    ],
  },
  {
    titulo: 'Web de reservas',
    preguntas: ['¿Funciona la web con Mercado Pago?', '¿La web de la rentadora está incluida?'],
  },
  {
    titulo: 'Datos y seguridad',
    preguntas: ['¿Puedo reimprimir un contrato firmado hace años?'],
  },
];

export default function Preguntas() {
  /* Un solo FAQPage, el que emite FaqLista con todas las preguntas: el contenido sigue en el HTML
   * aunque los `<details>` estén cerrados. */
  const todas = FAQS.map((f) => ({ p: f.q, r: f.a }));
  const asignadas = new Set(CATEGORIAS.flatMap((c) => c.preguntas));
  const categorias = CATEGORIAS.map((c, i) => ({
    titulo: c.titulo,
    preguntas: todas.filter((f) => c.preguntas.includes(f.p) || (i === 1 && !asignadas.has(f.p))),
  }));

  return (
    <>
      <Portada titulo={PREGUNTAS_PAG.titulo} bajada={PREGUNTAS_PAG.bajada} imagen={{ src: '/heros/preguntas.webp', alt: 'Un teléfono de escritorio y un cuaderno con preguntas anotadas', pos: '70% 50%', lado: 'derecha', tinte: true }} />

      <div className={`envoltorio ${s.pagina}`}>
        <FaqLista categorias={categorias} id={`${SITIO}/preguntas`} />

        <p className={s.cierreLinea}>
          <Link href="/operaciones">{PREGUNTAS_PAG.operacionesTitulo}</Link>
        </p>
      </div>

      <Cierre titulo={PREGUNTAS_PAG.cierreTitulo} bajada={PREGUNTAS_PAG.cierreBajada} />
    </>
  );
}
