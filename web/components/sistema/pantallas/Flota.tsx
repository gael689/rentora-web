/* Flota — `/flota`.
 *
 * Réplica de `pages/flota/FlotaList.tsx`, `components/flota/FlotaTabs.tsx` y
 * `components/flota/VehiculoTable.tsx`.
 *
 * Tres cosas que cambiaron y que se ven:
 *
 * 1. **Tres botones grandes arriba**: Vehículos, Categorías y precios, Multas. Cada una también
 *    es un ítem del menú.
 * 2. **La tabla se lee de lejos**: la patente en un recuadro tipo chapa, los papeles (VTV y
 *    póliza) con su fecha y su semáforo siempre a la vista, y el kilometraje con cuánto falta
 *    para el service.
 * 3. **Un bloque aparte, "En alquiler de largo plazo"**, para los autos que hoy trabajan con un
 *    contrato semanal (choferes de aplicaciones o empresas). Siguen acá con sus vencimientos, services y gastos. */

import { km } from '@/lib/sistema/dominio';
import { FLOTA, FLOTA_LARGO_PLAZO, CATEGORIAS } from '@/lib/sistema/valle';
import { DETALLE_FLOTA, fechaEn } from '@/lib/sistema/valle-extra';
import { Badge } from '../primitivas';
import Icono from '../Icono';
import s from '../sistema.module.css';

const NOMBRE_CATEGORIA = Object.fromEntries(CATEGORIAS.map((c) => [c.key, c.nombre]));

type Unidad = (typeof FLOTA)[number];

function Papel({ rotulo, dias, extra }: { rotulo: string; dias?: number; extra?: string }) {
  if (dias === undefined) {
    return <span className={`${s.papel} ${s.ambar}`}>{rotulo} sin cargar</span>;
  }
  const estado = dias < 0 ? ' · vencida' : dias <= 30 ? ' · por vencer' : '';
  const clase = dias < 0 ? s.rojo : dias <= 30 ? s.ambar : '';
  return (
    <span className={`${s.papel} ${clase}`}>
      {rotulo} {fechaEn(dias)}
      {estado}
      {extra && <span className={s.secundario}> · {extra}</span>}
    </span>
  );
}

function Fila({ u, largoPlazo = false }: { u: Unidad; largoPlazo?: boolean }) {
  const d = DETALLE_FLOTA[u.patente];
  const faltan = u.servicioKm - u.km;
  const marcaModelo = u.modelo.startsWith(d.marca) ? u.modelo : `${d.marca} ${u.modelo}`;

  return (
    <tr>
      <td style={{ width: 96 }}>
        <span className={s.foto}>
          <Icono nombre="auto" tam={22} />
        </span>
      </td>
      <td>
        <span className={s.apilado} style={{ gap: 3 }}>
          <span>
            <span className={s.chapa}>{u.patente}</span>
          </span>
          <b style={{ fontSize: 13 }}>{marcaModelo}</b>
          <span className={s.secundario}>
            {d.anio} · {d.color} · {d.tipo}
          </span>
        </span>
      </td>
      <td>{NOMBRE_CATEGORIA[u.categoria]}</td>
      <td>
        <span className={s.apilado} style={{ gap: 4, alignItems: 'flex-start' }}>
          {largoPlazo ? (
            <Badge tono="info">{u.plataforma ? `En ${u.plataforma}` : 'Largo plazo'}</Badge>
          ) : u.estado === 'alquilado' ? (
            <Badge tono="info">En uso</Badge>
          ) : u.estado === 'fuera_de_servicio' ? (
            <Badge tono="danger">Fuera de servicio</Badge>
          ) : u.estado === 'en_transicion' ? (
            <Badge tono="info">En transición</Badge>
          ) : (
            <Badge tono="success">Disponible</Badge>
          )}
          {faltan < 1000 && faltan >= 0 && <Badge tono="warning">Service próximo</Badge>}
        </span>
      </td>
      <td>
        <Papel rotulo="VTV" dias={u.vtvDias} />
        <Papel rotulo="Póliza" dias={u.polizaDias} extra={u.polizaCia} />
      </td>
      <td>
        <span className={s.apilado}>
          <b style={{ fontSize: 13 }}>{km(u.km)}</b>
          <span className={faltan < 0 ? s.rojo : faltan < 1000 ? s.ambar : s.secundario}>
            {faltan < 0 ? 'Service vencido' : `Service en ${km(faltan)}`}
          </span>
        </span>
      </td>
      <td style={{ width: 28, color: '#52706F' }}>⋯</td>
    </tr>
  );
}

export default function Flota() {
  const enLargoPlazo = FLOTA_LARGO_PLAZO;
  const normales = FLOTA;
  const enAlquiler = FLOTA.filter((u) => u.estado === 'alquilado').length;

  const pestana = (icono: string, titulo: string, bajada: string, activa = false) => (
    <span className={`${s.botonGrande} ${activa ? s.botonGrandeActivo : ''}`}>
      <span className={s.botonGrandeIcono}>
        <Icono nombre={icono} tam={18} />
      </span>
      <span className={s.apilado}>
        <span className={s.botonGrandeTitulo}>{titulo}</span>
        <span className={s.secundario}>{bajada}</span>
      </span>
    </span>
  );

  return (
    <>
      <div className={s.botonesGrandes}>
        {pestana('auto', 'Vehículos', 'Los autos, su estado y sus papeles', true)}
        {pestana('etiquetas', 'Categorías y precios', 'Precios base y franquicias')}
        {pestana('alerta', 'Multas', 'Buscar al responsable y cobrarlas')}
      </div>

      <div className={s.barraTitulo}>
        <div className={s.apilado}>
          <h4 className={s.titulo}>Vehículos</h4>
          <span className={s.secundario}>
            Todos los autos de la flota. Los dados de baja no se borran: se ven con el filtro de inactivos, con el motivo.
          </span>
        </div>
        <span className={`${s.boton} ${s.botonPrimario}`}>
          <Icono nombre="mas" tam={13} /> Nuevo vehículo
        </span>
      </div>

      <div className={s.filtros}>
        <span className={s.campoBusca}>
          <Icono nombre="buscar" tam={13} /> Patente, marca o modelo
        </span>
        <span className={s.selector}>
          Estado: todos <Icono nombre="abajo" tam={12} />
        </span>
        <span className={s.selector}>
          Tipo: todos <Icono nombre="abajo" tam={12} />
        </span>
        <span className={s.casillaTexto}>
          <span className={s.casillaTabla} />
          Ver inactivos
        </span>
      </div>

      <div className={s.tarjeta} style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        <div className={s.scroll} style={{ flex: 1 }}>
          <table className={`${s.tabla} ${s.tablaGrande}`}>
            <thead>
              <tr>
                <th />
                <th>Vehículo</th>
                <th>Categoría</th>
                <th>Estado</th>
                <th>Papeles</th>
                <th>Kilometraje</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {normales.slice(0, 5).map((u) => (
                <Fila key={u.patente} u={u} />
              ))}
              {enLargoPlazo.length > 0 && (
                <tr>
                  <td colSpan={7} style={{ padding: 0 }}>
                    <p className={s.separadorBloque}>
                      En alquiler de largo plazo · {enLargoPlazo.length}
                      <span className={s.secundario} style={{ fontWeight: 500 }}>
                        Siguen acá con sus vencimientos, services y gastos.
                      </span>
                    </p>
                  </td>
                </tr>
              )}
              {enLargoPlazo.map((u) => (
                <Fila key={u.patente} u={u} largoPlazo />
              ))}
            </tbody>
          </table>
        </div>
        <div className={s.pieTabla}>
          <span>
            {FLOTA.length + FLOTA_LARGO_PLAZO.length} vehículos · {enAlquiler} en alquiler, {enLargoPlazo.length} de largo plazo
          </span>
        </div>
      </div>
    </>
  );
}
