import { partirAcento } from '@/lib/paginas';
import s from './pagina.module.css';

/** Texto con la frase clave entre *asteriscos* pintada en el acento. */
export default function Acento({ texto }: { texto: string }) {
  return (
    <>
      {partirAcento(texto).map((p, i) =>
        p.acento ? (
          <span key={i} className={s.acento}>
            {p.t}
          </span>
        ) : (
          <span key={i}>{p.t}</span>
        ),
      )}
    </>
  );
}
