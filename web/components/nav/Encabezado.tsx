'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { T } from '@/lib/contenido';
import { NAV, MEGA, MENU_MOVIL, type VisualMega } from '@/lib/nav';
import { DEMO_ACTIVA, DEMO_CTA, RUTA_PROBAR } from '@/lib/demo';
import { linkWhatsapp } from '@/lib/sitio';
import Icono from '@/components/sistema/Icono';
import e from './Encabezado.module.css';

/* Encabezado flotante, patrón del de ACA Villa Bordeu llevado a CSS Modules. Arriba de todo es
 * transparente sobre el resplandor del hero; al bajar se vuelve una píldora de vidrio con margen,
 * línea interior y sombra suave. Siempre fijo: nunca se esconde.
 *
 * Escritorio: links con píldora al pasar, "Producto" abre un mega-menú (lista a la izquierda,
 * captura del sistema a la derecha). Mobile: menú a pantalla completa en petróleo, con links
 * grandes y los botones abajo; la hamburguesa se vuelve X, el fondo no scrollea, y se cierra al
 * navegar y con Escape. La barra va por encima del menú (z-index), así la X siempre se puede tocar. */

function bloquearScroll(bloquear: boolean) {
  document.documentElement.classList.toggle('scroll-bloqueado', bloquear);
}

export default function Encabezado() {
  const ruta = usePathname();
  const [arriba, setArriba] = useState(true);
  const [menu, setMenu] = useState(false);
  /** La página abre con un hero de foto (`data-hero-foto`): arriba de todo el encabezado se acopla a él. */
  const [sobreFoto, setSobreFoto] = useState(false);
  const [mega, setMega] = useState(false);
  /** Qué ítem del mega-menú está en foco o con el mouse encima: decide la captura de la derecha. */
  const [previa, setPrevia] = useState<number | null>(null);
  const cierreMega = useRef<number | undefined>(undefined);

  useEffect(() => {
    let raf = 0;
    const medir = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setArriba(window.scrollY < 24));
    };
    medir();
    window.addEventListener('scroll', medir, { passive: true });
    return () => {
      window.removeEventListener('scroll', medir);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    setSobreFoto(document.querySelector('[data-hero-foto]') !== null);
  }, [ruta]);

  // Al navegar se cierran los menús: ajuste de estado al cambiar la ruta, sin efecto.
  const [rutaPrevia, setRutaPrevia] = useState(ruta);
  if (rutaPrevia !== ruta) {
    setRutaPrevia(ruta);
    setMenu(false);
    setMega(false);
  }

  useEffect(() => {
    bloquearScroll(menu);
    return () => bloquearScroll(false);
  }, [menu]);

  useEffect(() => {
    const tecla = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        setMenu(false);
        setMega(false);
      }
    };
    window.addEventListener('keydown', tecla);
    return () => window.removeEventListener('keydown', tecla);
  }, []);

  /* El clic ABRE el mega-menú, nunca alterna: con mouse el mouseenter ya lo abrió, y un toggle lo
   * cerraba justo en el clic. Para cerrar: Escape, salir con el mouse o tocar afuera. */
  useEffect(() => {
    if (!mega) return;
    const afuera = (ev: MouseEvent) => {
      if (!(ev.target as HTMLElement)?.closest?.('[data-megamenu]')) setMega(false);
    };
    document.addEventListener('click', afuera);
    return () => document.removeEventListener('click', afuera);
  }, [mega]);

  const entrar = () => {
    window.clearTimeout(cierreMega.current);
    setMega(true);
  };
  const salir = () => {
    window.clearTimeout(cierreMega.current);
    cierreMega.current = window.setTimeout(() => setMega(false), 160);
  };

  const activo = (href: string) => ruta === href || ruta.startsWith(href + '/');
  const enProducto = MEGA.items.some((i) => activo(i.href));
  const visual: VisualMega = previa === null ? MEGA.visual : MEGA.items[previa].visual;
  const estado = menu ? e.conMenu : arriba ? (sobreFoto ? `${e.arriba} ${e.sobreFoto}` : e.arriba) : e.flotando;

  return (
    <>
      <header className={`${e.encabezado} ${estado}`}>
        <div className={e.marco}>
          <div className={e.barra}>
            <Link href="/" className={e.lockup} aria-label="RentaGo, inicio">
              <span className={e.logo} aria-hidden="true" />
              <span className={e.marca}>
                Renta<span className={e.marcaAcento}>Go</span>
              </span>
            </Link>

            <nav className={e.nav} aria-label={NAV.principal}>
              <div className={e.conMega} data-megamenu="" onMouseEnter={entrar} onMouseLeave={salir}>
                <button
                  type="button"
                  className={`${e.link} ${enProducto ? e.linkActivo : ''}`}
                  aria-expanded={mega}
                  aria-controls="mega-producto"
                  onClick={() => setMega(true)}
                >
                  {NAV.producto}
                  <span className={`${e.caret} ${mega ? e.caretAbierto : ''}`} aria-hidden="true">
                    <Icono nombre="abajo" tam={14} />
                  </span>
                </button>

                {mega && (
                  <div className={e.mega} id="mega-producto">
                    <div className={e.megaPanel}>
                      <ul className={e.megaLista} onMouseLeave={() => setPrevia(null)}>
                        {MEGA.items.map((i, n) => (
                          <li key={i.href}>
                            <Link
                              href={i.href}
                              className={e.megaItem}
                              onClick={() => setMega(false)}
                              onMouseEnter={() => setPrevia(n)}
                              onFocus={() => setPrevia(n)}
                            >
                              <span className={`orbe ${e.megaOrbe}`} data-tono={i.tono} aria-hidden="true">
                                <Icono nombre={i.icono} tam={20} />
                              </span>
                              <span>
                                <span className={e.megaTitulo}>{i.titulo}</span>
                                <span className={e.megaDetalle}>{i.detalle}</span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={previa === null ? '/sistema' : MEGA.items[previa].href}
                        className={e.megaVisual}
                        onClick={() => setMega(false)}
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        <Image
                          key={visual.src}
                          src={visual.src}
                          alt=""
                          width={visual.movil ? 390 : 880}
                          height={visual.movil ? 844 : 621}
                          sizes="360px"
                          className={visual.movil ? e.megaImagenMovil : e.megaImagen}
                        />
                        <span className={e.megaVelo} aria-hidden="true" />
                        <span className={e.megaCaption}>
                          <span className={e.megaCaptionTitulo}>{visual.texto}</span>
                          <span className={e.megaCaptionPie}>{visual.pie}</span>
                        </span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/operaciones" className={`${e.link} ${activo('/operaciones') ? e.linkActivo : ''}`}>
                {NAV.comoSeHace}
              </Link>
              <Link href="/planes" className={`${e.link} ${activo('/planes') ? e.linkActivo : ''}`}>
                {NAV.planes}
              </Link>
              <Link href="/guias" className={`${e.link} ${activo('/guias') ? e.linkActivo : ''}`}>
                {NAV.guias}
              </Link>
              <Link href="/preguntas" className={`${e.link} ${activo('/preguntas') ? e.linkActivo : ''}`}>
                {NAV.preguntas}
              </Link>
            </nav>

            <div className={e.acciones}>
              {DEMO_ACTIVA && (
                <Link href={RUTA_PROBAR} className={e.demo} data-cta="encabezado-demo">
                  {DEMO_CTA.encabezado}
                </Link>
              )}
              <a
                href={linkWhatsapp(T.whatsappMensaje)}
                className={e.redondo}
                target="_blank"
                rel="noopener"
                aria-label={NAV.whatsapp}
                data-cta="encabezado-whatsapp"
              >
                <Icono nombre="whatsapp" tam={20} />
              </a>
              <Link
                href="/sistema"
                className={`cta cta-chico ${e.ctaEscritorio}`}
                data-evento="ver_sistema"
                data-cta="encabezado"
              >
                {NAV.cta}
              </Link>
              <button
                type="button"
                className={e.hamburguesa}
                aria-expanded={menu}
                aria-controls="menu-movil"
                aria-label={menu ? NAV.cerrar : NAV.abrir}
                onClick={() => setMenu((v) => !v)}
              >
                <span className={`${e.raya} ${menu ? e.rayaA : e.rayaArriba}`} />
                <span className={`${e.raya} ${menu ? e.rayaB : e.rayaAbajo}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {menu && (
        <div id="menu-movil" className={e.menuMovil}>
          <div className={e.menuCuerpo}>
            <nav aria-label={NAV.principal} className={e.menuNav}>
              <ul>
                {[{ href: '/', texto: NAV.inicio }, ...MENU_MOVIL].map((m) => {
                  const esta = m.href === '/' ? ruta === '/' : activo(m.href);
                  return (
                    <li key={m.href}>
                      <Link
                        href={m.href}
                        className={`${e.menuLink} ${esta ? e.menuActivo : ''}`}
                        aria-current={esta ? 'page' : undefined}
                        onClick={() => setMenu(false)}
                      >
                        {m.texto}
                        <Icono nombre="flecha" tam={22} className={e.menuFlecha} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className={e.menuAcciones}>
              <Link
                href="/sistema"
                className="btn-blanco"
                onClick={() => setMenu(false)}
                data-evento="ver_sistema"
                data-cta="menu-movil"
              >
                {NAV.cta}
              </Link>
              <div className={e.menuDos}>
                <a
                  href={linkWhatsapp(T.whatsappMensaje)}
                  className="btn-vidrio"
                  target="_blank"
                  rel="noopener"
                  data-cta="menu-movil-whatsapp"
                >
                  <Icono nombre="whatsapp" tam={18} />
                  {NAV.whatsappCorto}
                </a>
                <Link href="/contacto" className="btn-vidrio" onClick={() => setMenu(false)}>
                  {NAV.formulario}
                </Link>
              </div>
              {DEMO_ACTIVA && (
                <Link
                  href={RUTA_PROBAR}
                  className={e.menuDemo}
                  onClick={() => setMenu(false)}
                  data-cta="menu-movil-demo"
                >
                  {DEMO_CTA.encabezado}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
