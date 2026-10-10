/* Simulador de precios — `/precios/simulador`.
 *
 * Réplica de `pages/precios/SimuladorPage.tsx`.
 *
 * Estaba escondido abajo de todo dentro de la pantalla de precios, así que casi nadie sabía que
 * existía — y es lo único que contesta "¿mi promo le está ganando a la tarifa del auto?" sin
 * tener que crear una reserva de prueba. Por eso entró al menú con entrada propia.
 *
 * Desde que hay un solo precio, la consulta ya no pide el canal: una regla cargada vale para
 * la web y para el mostrador. El simulador sigue sirviendo para ver, antes de cobrar, qué capas
 * entran en un rango de fechas y cuánto da cada una. Se abre con el botón "Simulador" de la
 * pantalla Precios.
 */

import { pesos } from '@/lib/sistema/dominio';
import { SIMULACION } from '@/lib/sistema/valle';
import { Cifra } from '../primitivas';
import Icono from '../Icono';
import s from '../sistema.module.css';

export default function Simulador() {
  return (
    <>
      <div className={s.barraTitulo}>
        <h4 className={s.titulo}>Simulador de precios</h4>
        <span className={s.ayuda}>Probá un precio sin crear una reserva</span>
      </div>

      <div className={s.dos}>
        <div className={s.tarjeta}>
          <header className={s.tarjetaCabeza}>
            <span>Probar un precio</span>
          </header>
          <div className={s.tarjetaCuerpo} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <label className={s.campo}>
              <span className={s.etiqueta}>Categoría</span>
              <span className={s.control}>
                {SIMULACION.categoria} <Icono nombre="abajo" tam={12} />
              </span>
            </label>
            <div className={s.filaCampos}>
              <label className={s.campo}>
                <span className={s.etiqueta}>Retira</span>
                <span className={s.control}>{SIMULACION.desde}</span>
              </label>
              <label className={s.campo}>
                <span className={s.etiqueta}>Devuelve</span>
                <span className={s.control}>{SIMULACION.hasta}</span>
              </label>
            </div>
            <div className={s.semaforo}>
              <p className={s.semaforoItem}>
                <span className={s.semaforoPunto} style={{ background: '#B45309' }} />
                <span>
                  <b>{SIMULACION.promo.nombre}</b> ({SIMULACION.promo.efecto}). {SIMULACION.promo.gana}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className={s.tarjeta}>
          <header className={s.tarjetaCabeza}>
            <span>De dónde sale</span>
            <span className={s.secundario}>{SIMULACION.dias} días</span>
          </header>
          <div className={s.tarjetaCuerpo}>
            <div className={s.sumario} style={{ borderTop: 0, paddingTop: 0 }}>
              {SIMULACION.capas.map(([que, cuanto]) => (
                <p key={que} className={s.sumarioFila}>
                  <span>{que}</span>
                  <span className={s.numero}>{cuanto}</span>
                </p>
              ))}
              <p className={`${s.sumarioFila} ${s.sumarioTotal}`}>
                <span>Precio por día</span>
                <span className={s.numero}>{pesos(SIMULACION.porDia)}</span>
              </p>
            </div>

            <div className={s.cifras} style={{ gridTemplateColumns: '1fr 1fr', marginTop: 12 }}>
              <Cifra rotulo="Por día" valor={pesos(SIMULACION.porDia)} />
              <Cifra
                rotulo={`Total ${SIMULACION.dias} días`}
                valor={pesos(SIMULACION.total)}
                tono="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
