/* Prospectos — `/prospectos`.
 *
 * Réplica de `pages/prospectos/ProspectosPage.tsx`. Una lista de empresas que podrían alquilar,
 * ya cruzada con los clientes: se elige un grupo y se arma una campaña.
 *
 * Dos cosas que hay que decir derecho, porque son lo que el sistema hace hoy:
 *
 * 1. **El cruce marca a los que ya son clientes** (por mail, teléfono, dominio o nombre) y a los
 *    que ya fueron contactados o pidieron que no los escriban. Es lo que evita escribirle a un
 *    cliente como si no lo conocieras.
 * 2. **No hay botón de enviar.** La campaña se arma, se redacta y se deja lista; el envío está
 *    apagado. Por eso esta réplica no tiene ningún botón de enviar y la pantalla no lo afirma. */

import { PROSPECTOS, PROSPECTOS_TARJETAS, type Prospecto } from '@/lib/sistema/valle-extra';
import { Badge, Cifra } from '../primitivas';
import Icono from '../Icono';
import s from '../sistema.module.css';

const SELECCIONADOS = [3, 4, 6]; // ids tildados: muestran la barra de selección

const TONO_ESTADO: Record<Prospecto['estado'], 'info' | 'inactivo' | 'success' | 'warning' | 'danger'> = {
  Nuevo: 'info',
  Contactado: 'warning',
  Respondió: 'success',
  Cliente: 'success',
  Descartado: 'inactivo',
  'No contactar': 'danger',
};

function Etiquetas({ p }: { p: Prospecto }) {
  const hay = p.cruce || p.contactadoAntes || p.noContactar;
  if (!hay) return null;
  return (
    <span className={s.etiquetasEmpresa}>
      {p.cruce?.tipo === 'nombre' ? (
        <>
          <span className={s.etVerde}>¿Es {p.cruce.con}?</span>
          <span className={s.enlace} style={{ fontSize: 10 }}>No es el mismo</span>
        </>
      ) : p.cruce ? (
        <span className={s.etVerde}>Ya es cliente ({p.cruce.tipo})</span>
      ) : null}
      {p.contactadoAntes && <span className={s.etAmbar}>Contactado antes</span>}
      {p.noContactar && <span className={s.etRojo}>No contactar</span>}
    </span>
  );
}

export default function Prospectos() {
  return (
    <>
      <div className={s.barraTitulo}>
        <div className={s.apilado}>
          <h4 className={s.titulo}>Prospectos</h4>
          <span className={s.secundario}>
            Empresas que podrían alquilar, cruzadas con tus clientes. Elegí un grupo y armá una campaña.
          </span>
        </div>
        <span className={s.segmentado}>
          <span className={`${s.segmento} ${s.segmentoActivo}`}>Prospectos</span>
          <span className={s.segmento}>Campañas</span>
        </span>
      </div>

      <div className={s.cifras}>
        <Cifra rotulo="En la base" valor={String(PROSPECTOS_TARJETAS.base)} />
        <Cifra rotulo="Se les puede escribir" valor={String(PROSPECTOS_TARJETAS.escribibles)} destacada />
        <Cifra rotulo="Ya son clientes" valor={String(PROSPECTOS_TARJETAS.clientes)} />
        <Cifra rotulo="No contactar" valor={String(PROSPECTOS_TARJETAS.noContactar)} />
      </div>

      <div className={s.filtros}>
        <span className={s.campoBusca}>
          <Icono nombre="buscar" tam={13} /> Nombre, mail, ciudad…
        </span>
        <span className={s.selector}>
          Segmento: todos <Icono nombre="abajo" tam={12} />
        </span>
        <span className={s.selector}>
          Ciudad: todas <Icono nombre="abajo" tam={12} />
        </span>
        <span className={s.selector}>
          Estado: todos <Icono nombre="abajo" tam={12} />
        </span>
        <span className={s.casillaTexto}>
          <span className={s.casillaTabla} />
          Solo a los que se les puede escribir
        </span>
        <span className={s.derecha}>
          <span className={s.boton}>
            <Icono nombre="girar" tam={13} /> Volver a cruzar
          </span>
          <span className={s.boton}>
            <Icono nombre="bajar" tam={13} /> Importar archivo
          </span>
        </span>
      </div>

      <div className={s.barraSeleccion}>
        <b>{SELECCIONADOS.length}</b> seleccionados
        <span className={s.enlace}>Seleccionar los {PROSPECTOS_TARJETAS.base} que cumplen el filtro</span>
        <span className={s.derecha}>
          <span className={`${s.boton} ${s.botonPrimario}`}>
            <Icono nombre="megafono" tam={13} /> Crear campaña
          </span>
          <span className={s.boton}>Descartar</span>
          <span className={s.boton}>Limpiar</span>
        </span>
      </div>

      <div className={s.tarjeta} style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        <div className={s.scroll} style={{ flex: 1 }}>
          <table className={s.tabla}>
            <thead>
              <tr>
                <th style={{ width: 28 }}>
                  <span className={s.casillaTabla} />
                </th>
                <th>Empresa</th>
                <th>Segmento</th>
                <th>Contacto</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {PROSPECTOS.map((p) => {
                const marcado = SELECCIONADOS.includes(p.id);
                return (
                  <tr key={p.id}>
                    <td>
                      <span className={`${s.casillaTabla} ${marcado ? s.casillaTablaMarcada : ''}`}>
                        {marcado && <Icono nombre="tilde" tam={9} />}
                      </span>
                    </td>
                    <td>
                      <span className={s.apilado}>
                        <b className={s.fuerte}>{p.nombre}</b>
                        <span className={s.secundario}>
                          {p.ciudad} · {p.direccion}
                        </span>
                        <Etiquetas p={p} />
                      </span>
                    </td>
                    <td className={s.secundario}>{p.segmento}</td>
                    <td>
                      {p.mail || p.telefono ? (
                        <span className={s.apilado}>
                          {p.mail && <span>{p.mail}</span>}
                          {p.telefono && <span className={s.secundario}>{p.telefono}</span>}
                        </span>
                      ) : (
                        <span className={s.secundario}>Sin contacto</span>
                      )}
                    </td>
                    <td>
                      <Badge tono={TONO_ESTADO[p.estado]}>{p.estado}</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className={s.pieTabla}>
          <span>{PROSPECTOS_TARJETAS.base} prospectos</span>
          <span className={s.acciones}>
            <span className={s.boton}>Anterior</span>
            <span>Página 1 de {Math.ceil(PROSPECTOS_TARJETAS.base / 50)}</span>
            <span className={s.boton}>Siguiente</span>
          </span>
        </div>
      </div>
    </>
  );
}
