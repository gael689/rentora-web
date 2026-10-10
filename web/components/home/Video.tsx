import { SITIO } from '@/lib/sitio';
import { VIDEO } from '@/lib/video';
import s from './home.module.css';

/* El video: grabación de pantalla del sistema sobre datos ficticios, con narración y subtítulos.
 * Sin `VIDEO.src` no se dibuja nada y no se declara el VideoObject. */
export default function Video() {
  if (!VIDEO.src) return null;
  const abs = (u: string) => (u.startsWith('http') ? u : `${SITIO}${u}`);
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: VIDEO.titulo,
    description: VIDEO.descripcion,
    duration: VIDEO.duracion,
    uploadDate: VIDEO.subido,
    contentUrl: abs(VIDEO.src),
    ...(VIDEO.poster ? { thumbnailUrl: abs(VIDEO.poster) } : {}),
    inLanguage: 'es-AR',
  };
  return (
    <figure className={s.video}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <video controls preload="none" playsInline poster={VIDEO.poster ?? undefined} aria-label={VIDEO.etiqueta}>
        <source src={VIDEO.src} type="video/mp4" />
        {VIDEO.subtitulos && <track kind="captions" src={VIDEO.subtitulos} srcLang="es" label="Español" default />}
      </video>
      <figcaption>{VIDEO.etiqueta}</figcaption>
    </figure>
  );
}
