import s from '../seo.module.css';

/* El párrafo que un motor generativo corta y cita. Va grande, solo, y no depende de nada de lo
 * que tiene alrededor: si se lee fuera de la página, tiene que seguir siendo cierto y completo. */
export default function Citable({ texto, tono = 'turq' }: { texto: string; tono?: string }) {
  return (
    <p className={s.citable} data-tono={tono}>
      {texto}
    </p>
  );
}
