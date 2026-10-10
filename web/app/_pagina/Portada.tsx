import { Rotulo } from '@/components/home/Piezas';
import Acento from './Titulo';
import s from './pagina.module.css';

/* Encabezado de toda página interna (v4b): migas, rótulo píldora, titular y una bajada corta,
 * sobre el resplandor de marca que pone el layout. Sin banda gris. */
export default function Portada({
  tag,
  titulo,
  bajada,
  migas,
  tono = 'turq',
  icono = 'chispa',
  children,
}: {
  tag: string;
  /** Con la frase clave entre *asteriscos*. */
  titulo: string;
  bajada?: string;
  migas?: React.ReactNode;
  tono?: 'turq' | 'azul' | 'menta' | 'petro';
  icono?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={s.portada}>
      <header className={`envoltorio ${s.portadaInterna}`}>
        {migas}
        <Rotulo texto={tag} icono={icono} tono={tono} />
        <h1 className={s.h1}>
          <Acento texto={titulo} />
        </h1>
        {bajada && <p className={`bajada ${s.bajada}`}>{bajada}</p>}
        {children}
      </header>
    </div>
  );
}
