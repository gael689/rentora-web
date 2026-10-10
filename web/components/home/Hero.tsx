import Link from 'next/link';
import { HOME } from '@/lib/contenido';
import { linkWhatsapp } from '@/lib/sitio';
import { pantalla } from '@/lib/sistema/pantallas';
import Pantalla from '@/components/sistema/Pantalla';
import Icono from '@/components/sistema/Icono';
import Ajustado from './Ajustado';
import { Rotulo, Flotante, Telefono } from './Piezas';
import s from './home.module.css';

/* Hero v4b: a la izquierda, rótulo + H1 corto + una bajada + dos acciones. A la derecha, el
 * producto real al frente (la ocupación), con chips flotantes en los bordes y la web de reservas
 * en un celular. Todo estático: los chips no flotan, se apoyan. */
export default function Hero() {
  const h = HOME.hero;
  const [c1, c2, c3, c4] = h.chips;
  return (
    <section className={s.hero} aria-labelledby="t-hero">
      <div className={`envoltorio ${s.heroGrilla}`}>
        <div className={s.heroTexto}>
          <Rotulo texto={h.tag} icono="chispa" tono="petro" />
          <h1 id="t-hero" className={`titular-hero ${s.h1}`}>
            {/* Una oración por renglón lógico: juntas, la segunda quedaba colgando a 1440 px. */}
            <span className={s.h1Frase}>{h.titular.antes.trim()}</span>{' '}
            <span className={s.h1Frase}>{h.titular.clave}</span>
          </h1>
          <p className={`bajada ${s.heroBajada}`}>{h.bajada}</p>
          <div className={s.acciones}>
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

        <div className={s.heroVisual}>
          <div className={s.heroCaptura}>
            <Ajustado ruta={pantalla('ocupacion')?.ruta} inicial={0.5}>
              <Pantalla slug="ocupacion" conVisor={false} />
            </Ajustado>
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
