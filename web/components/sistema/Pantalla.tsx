/* El registro de pantallas: slug → réplica, ya envuelta en su marco.
 *
 * Un solo lugar donde se conecta el catálogo de `lib/sistema/pantallas.ts` con los componentes.
 * Una pantalla que todavía no tiene réplica no rompe nada: `PANTALLAS[].lista` dice quién está,
 * y quien consume el registro filtra por eso. */

import { pantalla } from '@/lib/sistema/pantallas';
import Marco from './Marco';
import Ajustado from '@/components/home/Ajustado';
import Ocupacion from './pantallas/Ocupacion';
import Reservas from './pantallas/Reservas';
import Flota from './pantallas/Flota';
import Precios from './pantallas/Precios';
import Caja, { type TabCaja } from './pantallas/Caja';
import Prospectos from './pantallas/Prospectos';
import Cotizador from './pantallas/Cotizador';
import Contratos from './pantallas/Contratos';
import Categorias from './pantallas/Categorias';
import Multas from './pantallas/Multas';
import Clientes from './pantallas/Clientes';
import Reportes from './pantallas/Reportes';
import Notificaciones from './pantallas/Notificaciones';
import Simulador from './pantallas/Simulador';
import Adicionales from './pantallas/Adicionales';
import FechasEspeciales from './pantallas/FechasEspeciales';
import CanalWeb from './pantallas/CanalWeb';
import ReservasWeb from './pantallas/ReservasWeb';
import Auditoria from './pantallas/Auditoria';
import Configuracion from './pantallas/Configuracion';

type Replica = React.ComponentType<{ tab?: TabCaja }>;

const REPLICAS: Record<string, Replica> = {
  ocupacion: Ocupacion,
  reservas: Reservas,
  flota: Flota,
  precios: Precios,
  caja: Caja,
  prospectos: Prospectos,
  cotizador: Cotizador,
  contratos: Contratos,
  categorias: Categorias,
  multas: Multas,
  clientes: Clientes,
  reportes: Reportes,
  notificaciones: Notificaciones,
  simulador: Simulador,
  adicionales: Adicionales,
  'fechas-especiales': FechasEspeciales,
  'canal-web': CanalWeb,
  'reservas-web': ReservasWeb,
  auditoria: Auditoria,
  configuracion: Configuracion,
};

export function hayReplica(slug: string): boolean {
  return slug in REPLICAS;
}

/**
 * Una pantalla del sistema, con el marco de la aplicación alrededor.
 *
 * `conVisor` le suma el contenedor de scroll y el pie con la ruta real. Se apaga cuando la
 * pantalla va adentro de otra cosa que ya pone el marco — por ejemplo el panel de módulos de la
 * home, que tiene su propio encuadre.
 */
export default function Pantalla({
  slug,
  conVisor = true,
  pie,
  tab,
}: {
  slug: string;
  conVisor?: boolean;
  pie?: string;
  /** Sólo para `caja`: qué pestaña se muestra. Por defecto, A cobrar. */
  tab?: TabCaja;
}) {
  const meta = pantalla(slug);
  const Replica = REPLICAS[slug];
  if (!meta || !Replica) return null;
  // En la Caja el ítem activo del menú es el de la pestaña abierta.
  const ruta = slug === 'caja' ? `${meta.ruta}?tab=${tab ?? 'a-cobrar'}` : meta.ruta;

  const marco = (
    <Marco ruta={ruta} titulo={meta.titulo} completa={meta.completa}>
      <Replica tab={tab} />
    </Marco>
  );

  if (!conVisor) return marco;

  return (
    // v4: el visor se ajusta al ancho de su columna (antes 0,92 fijo, que en 1440 se pasaba de la
    // columna y cortaba la pantalla). En mobile no baja de 0,45: de ahí en más scrollea de costado.
    <Ajustado ruta={ruta} pie={pie ?? meta.resuelve} inicial={0.86} minimo={0.45}>
      {marco}
    </Ajustado>
  );
}
