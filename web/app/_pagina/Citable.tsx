import s from '../seo.module.css';

/* El párrafo que un motor generativo corta y cita. Va grande, solo, y no depende de nada de lo
 * que tiene alrededor: si se lee fuera de la página, tiene que seguir siendo cierto y completo. */
export default function Citable({ texto, tono = 'turq', aire = false }: { texto: string; tono?: string; aire?: boolean }) {
  return (
    <p className={aire ? s.citableAire : s.citable} data-tono={tono}>
      {texto}
    </p>
  );
}
