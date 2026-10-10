/* Categorías y precios base — `/flota/categorias`.
 *
 * Réplica de `pages/flota/CategoriasPage.tsx`.
 *
 * Era la única pantalla con contenido propio que no figuraba en ningún menú: se llegaba sólo por
 * un botón adentro de Flota. Y es donde se cargan los precios base y las franquicias — o sea, a
 * donde apuntan dos de los avisos del sistema ("falta el precio real", "falta la franquicia"),
 * que mandaban a una pantalla invisible. Entró al menú por eso.
 *
 * Acá se termina la discusión de la franquicia en el mostrador: cada categoría tiene la suya
 * cargada, y cada cobertura dice exactamente a cuánto la baja. */

import { pesos } from '@/lib/sistema/dominio';
import { CATEGORIAS, ADICIONALES } from '@/lib/sistema/valle';
import { Badge } from '../primitivas';
import Icono from '../Icono';
import s from '../sistema.module.css';

const COBERTURAS = ADICIONALES.filter((a) => a.familia === 'cobertura');

export default function Categorias() {
  return (
    <>
      <div className={s.barraTitulo}>
        <h4 className={s.titulo}>Categorías y precios base</h4>
        <div className={s.acciones}>
          <span className={s.boton}>
            <Icono nombre="bajar" tam={13} /> CSV
          </span>
          <span className={`${s.boton} ${s.botonPrimario}`}>
            <Icono nombre="mas" tam={13} /> Nueva categoría
          </span>
        </div>
      </div>

      <div className={`${s.tarjeta} ${s.scroll}`}>
        <header className={s.tarjetaCabeza}>
          <span>Las {CATEGORIAS.length} categorías</span>
          <span className={s.secundario}>
            La tarifa base es desde donde arranca el motor de precios; las capas se aplican encima.
          </span>
        </header>
        <table className={s.tabla}>
          <thead>
            <tr>
              <th>Categoría</th>
              <th className={s.numero}>Unidades</th>
              <th className={s.numero}>Tarifa base por día</th>
              <th className={s.numero}>Franquicia base</th>
              <th className={s.numero}>Con cobertura ampliada</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {CATEGORIAS.map((c) => (
              <tr key={c.key}>
                <td className={s.fuerte}>{c.nombre}</td>
                <td className={s.numero}>{c.unidades}</td>
                <td className={s.numero}>{pesos(c.base)}</td>
                <td className={s.numero}>{pesos(c.franquicia)}</td>
                <td className={s.numero}>{pesos(c.franquiciaReducida)}</td>
                <td>
                  <Badge tono="success">Completa</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={`${s.tarjeta} ${s.scroll}`}>
        <header className={s.tarjetaCabeza}>
          <span>Coberturas</span>
          <span className={s.secundario}>Se elige una. Cada una dice a cuánto baja la franquicia.</span>
        </header>
        <table className={s.tabla}>
          <thead>
            <tr>
              <th>Cobertura</th>
              <th>Código</th>
              <th className={s.numero}>Precio</th>
              <th>Se cobra</th>
            </tr>
          </thead>
          <tbody>
            {COBERTURAS.map((c) => (
              <tr key={c.codigo}>
                <td className={s.fuerte}>{c.nombre}</td>
                <td className={s.secundario}>{c.codigo}</td>
                <td className={s.numero}>{c.precio === 0 ? 'Incluido' : pesos(c.precio)}</td>
                <td className={s.secundario}>{c.cobro}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
