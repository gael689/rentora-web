import type { Titular as TTitular } from '@/lib/contenido';

/* Titular de una sola oración. `{ antes, clave, despues }` sigue en los datos para que Gael pueda
 * volver a marcar la frase clave, pero en la v4b se lee entero, sin color: el color de la página
 * lo ponen los tintes, no una palabra pintada. */
export default function Titular({ t }: { t: TTitular; acento?: boolean }) {
  return (
    <>
      {t.antes}
      {t.clave}
      {t.despues}
    </>
  );
}
