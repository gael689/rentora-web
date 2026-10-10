/* Contratos — `/contratos`.
 *
 * Réplica de `pages/contratos/ContratosPage.tsx` y del panel de contrato
 * (`components/alquileres/ContratoPanel.tsx`).
 *
 * Lo nuevo desde septiembre, y lo que hay que ver acá:
 *
 * - **Franquicia**: el documento que firma el cliente por la franquicia, generado junto con el
 *   contrato. Es otra cosa que la garantía.
 * - **Cláusulas editables**: se revisan y se cambian antes de generar el contrato; lo cambiado
 *   vale sólo para ese contrato y queda marcado "Modificada".
 * - **Regenerar**: pide un motivo y el contrato anterior queda anulado.
 * - **Contrato de largo plazo / semanal**, para choferes de aplicaciones o empresas: se carga el
 *   valor de la semana y de ahí sale el total, una fecha de pago por semana y los kilómetros permitidos.
 * - **Firma en pantalla**, con el dedo o el mouse, o "Firmó en papel". */

import { pesos } from '@/lib/sistema/dominio';
import { CONTRATOS, CONTRATO_SEMANAL } from '@/lib/sistema/valle';
import { CLAUSULAS_EDITABLES } from '@/lib/sistema/valle-extra';
import { Badge, Cifra, Tarjeta } from '../primitivas';
import Icono from '../Icono';
import s from '../sistema.module.css';

const TONO = {
  firmado: 'success',
  pendiente: 'warning',
  anulado: 'danger',
  archivado: 'inactivo',
} as const;

const ETIQUETA = {
  firmado: 'Firmado',
  pendiente: 'Esperando firma',
  anulado: 'Anulado',
  archivado: 'Archivado',
} as const;

export default function Contratos() {
  const firmados = CONTRATOS.filter((c) => c.estado === 'firmado').length;
  const pendientes = CONTRATOS.filter((c) => c.estado === 'pendiente').length;
  const semanales = CONTRATOS.filter((c) => c.tipo === 'Semanal' || c.tipo === 'Uber').length;

  return (
    <>
      <div className={s.barraTitulo}>
        <h4 className={s.titulo}>Contratos</h4>
        <div className={s.acciones}>
          <span className={s.selector}>
            Clausulado: versión 7 <Icono nombre="abajo" tam={12} />
          </span>
          <span className={s.boton}>Ver el clausulado</span>
          <span className={`${s.boton} ${s.botonPrimario}`}>
            <Icono nombre="mas" tam={13} /> Contrato rápido
          </span>
        </div>
      </div>

      <div className={s.cifras}>
        <Cifra rotulo="Emitidos este mes" valor={String(CONTRATOS.length)} />
        <Cifra rotulo="Firmados" valor={String(firmados)} tono="success" />
        <Cifra rotulo="Esperando firma" valor={String(pendientes)} tono="warning" />
        <Cifra rotulo="Uber y largo plazo" valor={String(semanales)} />
      </div>

      <div className={`${s.tarjeta} ${s.scroll}`} style={{ flex: 1 }}>
        <table className={s.tabla}>
          <thead>
            <tr>
              <th>Contrato</th>
              <th>Cliente</th>
              <th>Vehículo</th>
              <th>Período</th>
              <th>Cláusulas</th>
              <th>Franquicia</th>
              <th>Firma</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {CONTRATOS.map((c) => (
              <tr key={c.numero}>
                <td>
                  <span className={s.apilado}>
                    <b className={s.fuerte}>{c.numero}</b>
                    <span className={s.secundario}>
                      Reserva {c.reserva}
                      {c.tipo === 'Semanal' && ' · Largo plazo'}
                      {c.tipo === 'Uber' && ' · Contrato Uber'}
                    </span>
                  </span>
                </td>
                <td>{c.cliente}</td>
                <td>{c.unidad}</td>
                <td className={s.secundario}>{c.periodo}</td>
                <td>
                  {c.clausulado.includes('congelada') ? (
                    <Badge tono="inactivo">{c.clausulado}</Badge>
                  ) : c.clausulas === 'Estándar' ? (
                    <span className={s.secundario}>{c.clausulado}</span>
                  ) : (
                    <Badge tono="warning">{c.clausulas}</Badge>
                  )}
                </td>
                <td>
                  {c.franquicia === 'Firmada' ? (
                    <Badge tono="success">Firmada</Badge>
                  ) : c.franquicia === 'Sin firmar' ? (
                    <Badge tono="warning">Sin firmar</Badge>
                  ) : (
                    <span className={s.secundario}>—</span>
                  )}
                </td>
                <td className={s.secundario}>{c.firma}</td>
                <td>
                  <Badge tono={TONO[c.estado as keyof typeof TONO]}>
                    {ETIQUETA[c.estado as keyof typeof ETIQUETA]}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12, flexShrink: 0 }}>
        <Tarjeta titulo="Cláusulas del contrato">
          <div className={s.avisoLista} style={{ gap: 5 }}>
            <p className={s.secundario}>2 cláusulas modificadas para este contrato · Revisar o editar</p>
            {CLAUSULAS_EDITABLES.map((c) => (
              <p key={c.n} className={s.semaforoItem} style={{ justifyContent: 'space-between' }}>
                <span>{c.n}</span>
                {c.modificada ? (
                  <span className={s.etAmbar}>Modificada · Volver al original</span>
                ) : (
                  <span className={s.secundario}>Original</span>
                )}
              </p>
            ))}
          </div>
        </Tarjeta>

        <Tarjeta titulo="Contrato Uber · semanal">
          <div className={s.avisoLista} style={{ gap: 4 }}>
            <p className={s.sumarioFila}>
              <span>Valor por semana</span>
              <b className={s.numero}>{pesos(CONTRATO_SEMANAL.valorSemana)}</b>
            </p>
            <p className={s.sumarioFila}>
              <span>Km permitidos por semana</span>
              <span className={s.numero}>{CONTRATO_SEMANAL.kmSemana.toLocaleString('es-AR')}</span>
            </p>
            <p className={s.sumarioFila}>
              <span>Km extra</span>
              <span className={s.numero}>{pesos(CONTRATO_SEMANAL.kmExtra)}</span>
            </p>
            <p className={s.secundario}>Pagos: {CONTRATO_SEMANAL.pagos.join(' · ')}</p>
            <p className={`${s.sumarioFila} ${s.sumarioTotal}`}>
              <span>
                Total · {CONTRATO_SEMANAL.dias} días
              </span>
              <span className={s.numero}>{pesos(CONTRATO_SEMANAL.total)}</span>
            </p>
          </div>
        </Tarjeta>

        <Tarjeta titulo="Firma">
          <div className={s.avisoLista}>
            <span className={s.lienzo}>Firmá acá con el dedo o el mouse</span>
            <span className={s.acciones} style={{ justifyContent: 'flex-start' }}>
              <span className={s.boton}>
                <Icono nombre="firma" tam={13} /> Firmar en el mostrador
              </span>
              <span className={s.boton}>Firmó en papel</span>
              <span className={s.boton}>Regenerar contrato</span>
            </span>
          </div>
        </Tarjeta>
      </div>
    </>
  );
}
