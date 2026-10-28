import type { CSSProperties, ElementType, ReactNode } from 'react';

export type Direccion = 'arriba' | 'izquierda' | 'derecha' | 'escala' | 'fade';

/* Envoltorio de aparición al hacer scroll. Es un componente de servidor: no hace nada por sí solo,
 * sólo emite `data-reveal` (que `RevealRuntime` observa) y el índice de escalonado `--rv-i`
 * (cada punto = 70 ms de retraso, tope de 6). El contenido va en el HTML siempre; el estado oculto
 * lo aplica globals.css únicamente cuando el motor ya montó (clase `rv-on` en <html>).
 *
 *   <Reveal>…</Reveal>                         arriba, sin retraso
 *   <Reveal i={2}>…</Reveal>                   escalonado: tercer elemento de una fila
 *   <Reveal dir="escala" as="figure">…</Reveal> imágenes: fade + leve escala
 *
 * Sólo anima `opacity` y `transform`: no mueve el layout (sin CLS). */
export default function Reveal({
  children,
  as,
  dir = 'arriba',
  i = 0,
  className,
  style,
  id,
  ...resto
}: {
  children?: ReactNode;
  as?: ElementType;
  dir?: Direccion;
  /** Posición en el escalonado (0, 1, 2…). */
  i?: number;
  className?: string;
  style?: CSSProperties;
  id?: string;
  [atributo: string]: unknown;
}) {
  const Tag = as ?? 'div';
  return (
    <Tag
      {...resto}
      id={id}
      className={className}
      data-reveal={dir}
      style={{ '--rv-i': Math.min(i, 6), ...style } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/** Atributos sueltos, para ponérselos a un elemento que ya existe (un `<li>`, un `<article>`). */
export function rv(i = 0, dir: Direccion = 'arriba') {
  return { 'data-reveal': dir, style: { '--rv-i': Math.min(i, 6) } as CSSProperties };
}
