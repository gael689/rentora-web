import Image from 'next/image';
import Link from 'next/link';
import { HOME } from '@/lib/contenido';
import { linkWhatsapp } from '@/lib/sitio';
import Icono from '@/components/sistema/Icono';
import Ruta from '@/components/marca/Ruta';
import { Flotante, Telefono } from './Piezas';
import s from './home.module.css';

/* Hero v6b (28/10): claro, como el original (Gael no quiso el oscuro): malla hielo con grano, la
 * grilla técnica y la ruta de la marca, que sube por detrás del encabezado. A la izquierda el H1 grande con
 * la frase clave en degradé; a la derecha el producto real en un marco oscuro con resplandor, los
 * chips apoyados en los bordes y la web de reservas en un celular. En escritorio entra entero en la
 * pantalla junto con la cinta de abajo (`Confianza`). */
export default function Hero() {
  const h = HOME.hero;
  const [c1, c2, c3, c4] = h.chips;
  return (
    <section className={`banda-suave ${s.hero}`} aria-labelledby="t-hero">
      <Ruta tono="claro" className={s.heroRuta} />
      <div className={`envoltorio ${s.heroGrilla}`}>
        <div className={s.heroTexto}>
          <h1 id="t-hero" className={`titular-hero entrada ${s.h1}`}>
            {/* Una oración por renglón lógico: juntas, la segunda quedaba colgando a 1440 px. */}
            <span className={s.h1Frase}>{h.titular.antes.trim()}</span>{' '}
            <span className={`${s.h1Frase} degrade`}>{h.titular.clave}</span>
          </h1>
          <p className={`bajada entrada ${s.heroBajada}`} style={{ ['--rv-i' as string]: 1 }}>{h.bajada}</p>
          <div className={`entrada ${s.acciones}`} style={{ ['--rv-i' as string]: 2 }}>
            <Link href="/sistema" className="cta" data-evento="ver_sistema" data-cta="hero">
              {h.ctaPrincipal}
              <Icono nombre="flecha" tam={18} />
            </Link>
            <a
              href={linkWhatsapp(h.mensajeDemo)}
              className="btn-linea"
              target="_blank"
              rel="noopener"
              data-cta="hero"
            >
              <Icono nombre="whatsapp" tam={18} />
              {h.ctaSecundario}
            </a>
          </div>
        </div>

        <div className={`entrada ${s.heroVisual}`} style={{ ['--rv-i' as string]: 2 }}>
          {/* La captura del sistema real (capturas-reales.mjs), con su marco de navegador. */}
          <div className={`borde-vivo ${s.heroCaptura}`}>
            <Image
              src="/v4/ocupacion.webp"
              alt={h.capturaAlt}
              width={1760}
              height={1242}
              sizes="(min-width: 980px) 640px, 100vw"
              priority
              className={s.heroImagen}
            />
          </div>
          <Flotante {...c1} className={s.f1} />
          <Flotante {...c2} className={s.f2} />
          <Flotante {...c3} className={s.f3} />
          <Flotante {...c4} className={s.f4} />
          <Telefono src="/v4/valle-movil.webp" alt={h.telefonoAlt} className={s.heroTelefono} prioridad />
        </div>
      </div>
    </section>
  );
}
