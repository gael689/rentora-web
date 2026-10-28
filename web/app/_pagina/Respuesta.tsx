import Icono from '@/components/sistema/Icono';
import s from './bloques.module.css';

/* Callout de la respuesta de RentaGo (/como-elegir y donde haga falta un "cómo lo resuelve"):
 * fondo tinte teal, borde izquierdo grueso, ícono que se dibuja, rótulo y texto en peso medio, con
 * sombra suave. Va aparte y rotulado para que no se lea como publicidad encubierta. */
export default function Respuesta({
  rotulo,
  texto,
  icono = 'tilde',
}: {
  rotulo: string;
  texto: string;
  icono?: string;
}) {
  return (
    <div className={s.respuesta}>
      <span className={s.respuestaIcono} aria-hidden="true">
        <Icono nombre={icono} tam={20} dibuja />
      </span>
      <div className={s.respuestaCuerpo}>
        <span className={s.respuestaRotulo}>{rotulo}</span>
        <p className={s.respuestaTexto}>{texto}</p>
      </div>
    </div>
  );
}
