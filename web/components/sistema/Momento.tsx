/* Un momento de una operación: la pantalla donde arranca, con el modal encima.
 *
 * Se muestra el modal sobre su pantalla y no recortado y solo, porque de dónde se llega es la
 * mitad de la información: el que mira tiene que poder ubicar la operación adentro del sistema.
 *
 * No todas las operaciones tienen momento replicado. Las que no, se cuentan con sus pasos y
 * listo: es preferible a inventar una pantalla para llenar el hueco. */

import { pantalla } from '@/lib/sistema/pantallas';
import Marco from './Marco';
import Ajustado from '@/components/home/Ajustado';
import { hayReplica } from './Pantalla';
import Reservas from './pantallas/Reservas';
import Precios from './pantallas/Precios';
import { OcupacionBase } from './pantallas/Ocupacion';
import Devolucion from './momentos/Devolucion';
import Alta from './momentos/Alta';
import Contrato from './momentos/Contrato';
import Entrega from './momentos/Entrega';

/** Cada momento: qué modal se muestra y sobre qué pantalla. */
const MOMENTOS: Record<string, { modal?: React.ComponentType; pantalla: string; fondo?: React.ComponentType }> = {
  devolucion: { modal: Devolucion, pantalla: 'reservas' },
  entrega: { modal: Entrega, pantalla: 'reservas' },
  alta: { modal: Alta, pantalla: 'reservas' },
  contrato: { modal: Contrato, pantalla: 'reservas' },
  // "Nueva operación": no es un modal, es el menú de tres puertas desplegado sobre el calendario.
  'nueva-operacion': { pantalla: 'ocupacion', fondo: OcupacionConMenu },
};

function OcupacionConMenu() {
  return <OcupacionBase conMenu />;
}

const FONDOS: Record<string, React.ComponentType> = {
  reservas: Reservas,
  precios: Precios,
};

export function hayMomento(slug: string | undefined): boolean {
  return Boolean(slug && slug in MOMENTOS);
}

export default function Momento({ slug, pie }: { slug: string; pie?: string }) {
  const m = MOMENTOS[slug];
  if (!m) return null;

  const meta = pantalla(m.pantalla);
  const Fondo = m.fondo ?? FONDOS[m.pantalla];
  if (!meta || !Fondo || !hayReplica(m.pantalla)) return null;

  const Modal = m.modal;

  return (
    <Ajustado ruta={meta.ruta} pie={pie} inicial={0.86} minimo={0.45}>
      <Marco ruta={meta.ruta} titulo={meta.titulo} completa={meta.completa} encima={Modal ? <Modal /> : undefined}>
        <Fondo />
      </Marco>
    </Ajustado>
  );
}
