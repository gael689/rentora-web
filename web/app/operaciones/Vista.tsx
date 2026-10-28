import type { Operacion } from '@/lib/sistema/operaciones';
import Momento, { hayMomento } from '@/components/sistema/Momento';
import Pantalla, { hayReplica } from '@/components/sistema/Pantalla';

/* Qué se ve de fondo en cada operación: el momento replicado (la pantalla con el modal encima) si
 * existe, y si no, la pantalla del panel donde vive. Nada inventado.
 *   recibir → devolución · tomar → alta · firmar → contrato · entregar → entrega (la réplica
 *   existe aunque el dato `momento` de la operación no la declare) · extender → Reservas (no
 *   hay réplica del modal de extensión) · promo → Precios. */
const MOMENTO_EXTRA: Record<string, string> = { 'entregar-el-auto': 'entrega' };

export default function Vista({ o }: { o: Operacion }) {
  const momento = o.momento ?? MOMENTO_EXTRA[o.slug];
  if (momento && hayMomento(momento)) return <Momento slug={momento} conVisor={false} />;
  if (o.pantalla && hayReplica(o.pantalla)) return <Pantalla slug={o.pantalla} conVisor={false} />;
  return null;
}
