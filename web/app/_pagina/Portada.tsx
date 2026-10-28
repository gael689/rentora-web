import Image from 'next/image';
import Acento from './Titulo';
import { rv } from '@/components/animacion/Reveal';
import s from './pagina.module.css';

export type ImagenPortada = {
  src: string;
  alt: string;
  /** object-position del recorte. */
  pos?: string;
  /** Con 'derecha', la foto ocupa el lado derecho y se funde con el fondo oscuro hacia el texto. */
  lado?: 'derecha';
  /** Con `true`, la foto se pasa a los colores de la web (duotono verde petróleo / turquesa). */
  tinte?: boolean;
};

/* Encabezado de toda página interna: migas, titular y una bajada corta sobre una banda oscura que
 * sube por detrás del encabezado fijo (el encabezado se acopla a ella arriba de todo). Lo que va
 * de fondo se elige con una sola de estas props, en este orden:
 *
 *   imagen    una foto a sangre (opcional: fundida a la derecha, o pasada a los colores de la web)
 *   pantalla  una pantalla del sistema, desenfocada y en los colores del hero (el nodo, ya armado)
 *   —         por defecto: el nombre del producto, enorme y recortado por abajo
 *
 * Todo lo de fondo es decorativo (`aria-hidden`); el texto es siempre claro sobre oscuro. */
export default function Portada({
  titulo,
  bajada,
  migas,
  imagen,
  pantalla,
  children,
}: {
  /** Con la frase clave entre *asteriscos*. */
  titulo: string;
  bajada?: string;
  migas?: React.ReactNode;
  imagen?: ImagenPortada;
  pantalla?: React.ReactNode;
  children?: React.ReactNode;
  /** Se aceptan por compatibilidad con las páginas que todavía los pasan; no hacen nada. */
  tono?: string;
  icono?: string;
}) {
  const interior = (
    <header className={`envoltorio ${s.portadaInterna} ${s.sobreFoto}`}>
      {migas}
      <h1 className={`${s.h1} entrada`} style={{ ['--rv-i' as string]: 1 }}>
        <Acento texto={titulo} />
      </h1>
      {bajada && (
        <p className={`bajada ${s.bajada} entrada`} style={{ ['--rv-i' as string]: 2 }}>
          {bajada}
        </p>
      )}
      {children}
    </header>
  );

  if (imagen) {
    return (
      <div className={`${s.portada} ${s.portadaFoto}`} data-hero-foto>
        <Image
          src={imagen.src}
          alt={imagen.alt}
          fill
          sizes="100vw"
          preload
          className={[
            s.portadaImg,
            imagen.lado === 'derecha' ? s.portadaImgDerecha : '',
            imagen.tinte ? s.portadaImgTinte : '',
          ].join(' ')}
          style={{ objectPosition: imagen.pos ?? '50% 50%' }}
        />
        {imagen.tinte && <span className={s.tinte} aria-hidden="true" />}
        {interior}
      </div>
    );
  }

  return (
    <div className={`${s.portada} ${s.portadaFoto} ${s.portadaMarca}`} data-hero-foto>
      {pantalla ? (
        <div className={s.fondoPantalla} aria-hidden="true">
          {pantalla}
        </div>
      ) : (
        <span className={s.marcaFondo} aria-hidden="true" {...rv(0, 'derecha')}>
          Renta<b>Go</b>
        </span>
      )}
      {interior}
    </div>
  );
}
