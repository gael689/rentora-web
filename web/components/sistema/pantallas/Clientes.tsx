/* Clientes — `/clientes`.
 *
 * Réplica de `pages/clientes/ClientesList.tsx` y de la ficha (`ClienteFormDialog.tsx`).
 *
 * Un cliente puede ser particular o empresa, y no es un campo cosmético: **la empresa lleva
 * primero al representante** (nombre, DNI, cargo, teléfono, mail) y después los datos de la
 * empresa, y el contrato imprime quién firma. A cada contrato se le cargan **hasta tres
 * conductores**, que se eligen de la ficha o se dan de alta en el momento.
 *
 * El listado va del último al primero: lo que se cargó hoy aparece arriba.
 *
 * La ficha no guarda tarjetas: la garantía es un dato del alquiler (medio y monto), no del
 * cliente, así que acá no hay columna de garantía. */

import { CONDICION_PAGO_LABEL, pesos } from '@/lib/sistema/dominio';
import { CLIENTES } from '@/lib/sistema/valle';
import { Badge, Cifra } from '../primitivas';
import Icono from '../Icono';
import s from '../sistema.module.css';

export default function Clientes() {
  const empresas = CLIENTES.filter((c) => c.tipo === 'empresa').length;
  const conDeuda = CLIENTES.filter((c) => c.saldo > 0).length;
  const particulares = CLIENTES.filter((c) => c.tipo === 'particular').length;

  return (
    <>
      <div className={s.barraTitulo}>
        <h4 className={s.titulo}>Clientes</h4>
        <div className={s.acciones}>
          <span className={s.selector}>
            Tipo: todos <Icono nombre="abajo" tam={12} />
          </span>
          <span className={s.buscador} style={{ maxWidth: 200 }}>
            <Icono nombre="buscar" tam={13} /> Nombre, DNI o CUIT
          </span>
          <span className={`${s.boton} ${s.botonPrimario}`}>
            <Icono nombre="mas" tam={13} /> Nuevo cliente
          </span>
        </div>
      </div>

      <div className={s.cifras}>
        <Cifra rotulo="Clientes" valor={String(CLIENTES.length)} />
        <Cifra rotulo="Empresas" valor={String(empresas)} pie="Con cuenta corriente" />
        <Cifra rotulo="Con saldo abierto" valor={String(conDeuda)} tono="warning" />
        <Cifra rotulo="Particulares" valor={String(particulares)} />
      </div>

      <div className={`${s.tarjeta} ${s.scroll}`}>
        <header className={s.tarjetaCabeza}>
          <span>Clientes · del último al primero</span>
          <span className={s.secundario}>A cada contrato se le cargan hasta 3 conductores.</span>
        </header>
        <table className={s.tabla}>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Tipo</th>
              <th>Documento</th>
              <th>Representante</th>
              <th className={s.numero}>Conductores</th>
              <th>Condición de pago</th>
              <th className={s.numero}>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {[...CLIENTES].reverse().map((c) => (
              <tr key={c.id}>
                <td className={s.fuerte}>{c.nombre}</td>
                <td>
                  <Badge tono={c.tipo === 'empresa' ? 'info' : 'inactivo'}>
                    {c.tipo === 'empresa' ? 'Empresa' : 'Particular'}
                  </Badge>
                </td>
                <td className={s.secundario}>{c.documento}</td>
                <td>
                  {c.representante ? (
                    <span className={s.apilado}>
                      <span>{c.representante.nombre}</span>
                      <span className={s.secundario}>{c.representante.cargo}</span>
                    </span>
                  ) : (
                    <span className={s.secundario}>—</span>
                  )}
                </td>
                <td className={s.numero}>{c.conductores}</td>
                <td className={s.secundario}>{CONDICION_PAGO_LABEL[c.condicionPago]}</td>
                <td className={s.numero} style={c.saldo > 0 ? { fontWeight: 600 } : undefined}>
                  {c.saldo > 0 ? pesos(c.saldo) : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
