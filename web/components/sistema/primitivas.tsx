/* Las piezas que el sistema resuelve con shadcn y acá se resuelven a mano.
 *
 * Son cuatro y ninguna tiene estado: un badge, una tarjeta, una cifra y una barra de
 * proporción. La réplica es estática a propósito —lo que se muestra es cómo se ve el sistema,
 * no cómo se comporta— así que nada de esto necesita ser cliente. */

import { C, type Tono } from '@/lib/sistema/dominio';
import Icono from './Icono';
import s from './sistema.module.css';

const COLOR: Record<Tono, { fuerte: string; suave: string }> = {
  primary: { fuerte: C.primary, suave: C.primaryBg },
  inactivo: { fuerte: C.inactivo, suave: C.inactivoBg },
  info: { fuerte: C.info, suave: C.infoBg },
  success: { fuerte: C.success, suave: C.successBg },
  warning: { fuerte: C.warning, suave: C.warningBg },
  danger: { fuerte: C.danger, suave: C.dangerBg },
};

/**
 * El badge de estado.
 *
 * Tenue por defecto: el color clasifica, no advierte. `solido` queda para lo que requiere que
 * alguien haga algo — una multa pendiente, una reserva que pagó sin cupo.
 */
export function Badge({
  tono,
  children,
  solido = false,
  late = false,
}: {
  tono: Tono;
  children: React.ReactNode;
  solido?: boolean;
  late?: boolean;
}) {
  const c = COLOR[tono];
  const estilo = solido
    ? { background: c.fuerte, color: '#fff' }
    : { background: c.suave, color: c.fuerte, borderColor: `${c.fuerte}40` };
  return (
    <span
      className={`${s.badge} ${solido ? s.badgeSolido : ''} ${late ? s.late : ''}`}
      style={estilo}
    >
      {children}
    </span>
  );
}

/** Badge con un color literal, para los mapas que el sistema define en hexa (multas, daños). */
export function BadgeColor({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span className={`${s.badge} ${s.badgeSolido}`} style={{ background: color }}>
      {children}
    </span>
  );
}

export function Tarjeta({
  titulo,
  extra,
  children,
  className,
  sinPadding = false,
}: {
  titulo?: string;
  extra?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  sinPadding?: boolean;
}) {
  return (
    <section className={`${s.tarjeta} ${className ?? ''}`}>
      {titulo && (
        <header className={s.tarjetaCabeza}>
          <span>{titulo}</span>
          {extra}
        </header>
      )}
      <div className={sinPadding ? undefined : s.tarjetaCuerpo}>{children}</div>
    </section>
  );
}

export function Cifra({
  rotulo,
  valor,
  pie,
  tono,
  destacada = false,
  tendencia,
}: {
  rotulo: string;
  valor: string;
  pie?: string;
  tono?: Tono;
  /** Fondo de superficie y borde de marca: la cifra por la que se abrió la pantalla. */
  destacada?: boolean;
  /** Una flecha con su variación; `bueno` pinta verde, `malo` rojo. */
  tendencia?: { texto: string; sube: boolean; bueno: boolean };
}) {
  return (
    <div className={`${s.cifra} ${destacada ? s.cifraDestacada : ''}`}>
      <p className={s.cifraRotulo}>{rotulo}</p>
      <p
        className={s.cifraValor}
        style={tono ? { color: COLOR[tono].fuerte } : destacada ? { color: '#0B5D62' } : undefined}
      >
        {valor}
      </p>
      {tendencia && (
        <p
          className={s.cifraFlecha}
          style={{ color: tendencia.bueno ? COLOR.success.fuerte : COLOR.danger.fuerte }}
        >
          <Icono nombre={tendencia.sube ? 'sube' : 'baja'} tam={12} />
          {tendencia.texto}
        </p>
      )}
      {pie && <p className={s.cifraPie}>{pie}</p>}
    </div>
  );
}

/** La barra de proporción de los reportes. El porcentaje va al lado, no adentro. */
export function Barra({ porcentaje, tono = 'primary' }: { porcentaje: number; tono?: Tono }) {
  return (
    <div className={s.barra}>
      <div
        className={s.barraRelleno}
        style={{ width: `${Math.min(100, porcentaje)}%`, background: COLOR[tono].fuerte }}
      />
    </div>
  );
}

/** Un renglón del semáforo: lo que falta antes de entregar o de recibir. */
export function PuntoSemaforo({ tono, children }: { tono: Tono; children: React.ReactNode }) {
  return (
    <p className={s.semaforoItem}>
      <span className={s.semaforoPunto} style={{ background: COLOR[tono].fuerte }} />
      {children}
    </p>
  );
}

export function Aviso({ tono, children }: { tono: Tono; children: React.ReactNode }) {
  const c = COLOR[tono];
  return (
    <p className={s.aviso} style={{ background: c.suave, borderLeftColor: c.fuerte }}>
      {children}
    </p>
  );
}

export { COLOR };
