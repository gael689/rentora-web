/* Notificaciones — `/notificaciones`.
 *
 * Réplica de `pages/notificaciones/NotificacionesPage.tsx`.
 *
 * Las 29 reglas corren cada 30 minutos y **todo queda en la plataforma**, en la campana: el
 * equipo no recibe mails ni un resumen a las 8. Lo que sí sale por mail son los mensajes a los
 * clientes, y esos se ven en la pestaña "Mails enviados".
 *
 * El detalle que hace la diferencia: la mayoría de los avisos no son urgentes y no se pintan
 * como si lo fueran. Un panel que grita todo el tiempo enseña a no mirarlo. Y un problema
 * abierto es un solo aviso, con recordatorios espaciados: no se repite cada media hora. */

import { AVISOS } from '@/lib/sistema/valle';
import { MAILS_ENVIADOS } from '@/lib/sistema/valle-extra';
import { Aviso, Cifra, Tarjeta } from '../primitivas';
import Icono from '../Icono';
import s from '../sistema.module.css';

export default function Notificaciones() {
  const urgentes = AVISOS.filter((a) => a.urgencia === 'danger').length;

  return (
    <>
      <div className={s.barraTitulo}>
        <h4 className={s.titulo}>Notificaciones</h4>
        <div className={s.acciones}>
          <span className={s.selector}>
            Hoy <Icono nombre="abajo" tam={12} />
          </span>
          <span className={s.selector}>
            Urgencia: todas <Icono nombre="abajo" tam={12} />
          </span>
        </div>
      </div>

      <div className={s.pestanas}>
        <span className={`${s.pestana} ${s.pestanaActiva}`}>En la plataforma</span>
        <span className={s.pestana}>Mails enviados</span>
      </div>

      <div className={s.cifras} style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
        <Cifra rotulo="Reglas activas" valor="29" pie="Corren cada 30 minutos" />
        <Cifra rotulo="Disparadas hoy" valor={String(AVISOS.length)} />
        <Cifra rotulo="Frenan la operación" valor={String(urgentes)} tono="danger" />
      </div>

      <div className={s.dosAncha}>
        <div className={`${s.tarjeta} ${s.scroll}`}>
          <header className={s.tarjetaCabeza}>
            <span>Lo que disparó hoy</span>
            <span className={s.secundario}>Todo queda en la campana del panel.</span>
          </header>
          <div className={s.tarjetaCuerpo}>
            <div className={s.avisoLista}>
              {AVISOS.map((a) => (
                <Aviso key={`${a.hora}-${a.regla}`} tono={a.urgencia}>
                  <span className={s.apilado} style={{ flex: 1 }}>
                    <b>{a.regla}</b>
                    <span>{a.detalle}</span>
                  </span>
                  <span className={s.secundario} style={{ whiteSpace: 'nowrap' }}>
                    {a.hora}
                  </span>
                </Aviso>
              ))}
            </div>
          </div>
        </div>

        <Tarjeta titulo="Mails enviados">
          <div className={s.avisoLista} style={{ gap: 9 }}>
            <p className={s.ayuda}>Los mensajes que salieron hacia los clientes.</p>
            {MAILS_ENVIADOS.map((m) => (
              <p key={m.asunto} className={s.apilado}>
                <b>{m.asunto}</b>
                <span className={s.secundario}>
                  {m.hora} · {m.para}
                </span>
              </p>
            ))}
          </div>
        </Tarjeta>
      </div>
    </>
  );
}
