'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { T, HOME } from '@/lib/contenido';
import { NAV, MEGA_PIE, SOLUCIONES_NAV, MENU_MOVIL } from '@/lib/nav';
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

type MenuMega = 'modulos' | 'soluciones';
const MENUS: { clave: MenuMega; etiqueta: string; ruta: string }[] = [
  { clave: 'modulos', etiqueta: NAV.modulosMenu, ruta: '/modulos' },
  { clave: 'soluciones', etiqueta: NAV.solucionesMenu, ruta: '/soluciones' },
];

export default function Encabezado() {
  const ruta = usePathname();
  const [arriba, setArriba] = useState(true);
  const [menu, setMenu] = useState(false);
  /** La página abre con un hero de foto (`data-hero-foto`): arriba de todo el encabezado se acopla a él. */
  const [sobreFoto, setSobreFoto] = useState(false);
  /** Qué mega-menú está abierto (hover o foco en escritorio). */
  const [mega, setMega] = useState<MenuMega | null>(null);
  /** Móvil: qué grupo del menú está desplegado ("Módulos" o "Soluciones"). */
  const [grupo, setGrupo] = useState<MenuMega | null>(null);
  /** Qué tarjeta destacada del mega de Módulos tiene el mouse encima: despliega la vista previa de abajo. */
  const [previa, setPrevia] = useState<number | null>(null);
  const cierrePrevia = useRef<number | undefined>(undefined);
  const abrirPrevia = (n: number) => {
    window.clearTimeout(cierrePrevia.current);
    setPrevia(n);
  };
  /** Con un respiro: da tiempo a llevar el mouse de la tarjeta a la vista previa sin que se cierre. */
  const cerrarPrevia = () => {
    window.clearTimeout(cierrePrevia.current);
    cierrePrevia.current = window.setTimeout(() => setPrevia(null), 320);
  };
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
    setMega(null);
  }

  useEffect(() => {
    bloquearScroll(menu);
    return () => bloquearScroll(false);
  }, [menu]);

  useEffect(() => {
    const tecla = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        setMenu(false);
        setMega(null);
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
      if (!(ev.target as HTMLElement)?.closest?.('[data-megamenu]')) setMega(null);
    };
    document.addEventListener('click', afuera);
    return () => document.removeEventListener('click', afuera);
  }, [mega]);

  const entrar = (k: MenuMega) => {
    window.clearTimeout(cierreMega.current);
    setMega(k);
  };
  const salir = () => {
    window.clearTimeout(cierreMega.current);
    cierreMega.current = window.setTimeout(() => setMega(null), 160);
  };

  const activo = (href: string) => ruta === href || ruta.startsWith(href + '/');
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
              {MENUS.map((m) => (
                <div
                  key={m.clave}
                  className={e.conMegaAncho}
                  data-megamenu=""
                  onMouseEnter={() => entrar(m.clave)}
                  onMouseLeave={salir}
                >
                  <Link
                    href={m.ruta}
                    className={`${e.link} ${activo(m.ruta) ? e.linkActivo : ''}`}
                    aria-expanded={mega === m.clave}
                    aria-controls={`mega-${m.clave}`}
                    onFocus={() => entrar(m.clave)}
                    onClick={() => setMega(null)}
                  >
                    {m.etiqueta}
                    <span className={`${e.caret} ${mega === m.clave ? e.caretAbierto : ''}`} aria-hidden="true">
                      <Icono nombre="abajo" tam={14} />
                    </span>
                  </Link>

                  {mega === m.clave && (
                    <div className={e.megaAncho} id={`mega-${m.clave}`}>
                      <div className={e.megaCaja}>
                        {m.clave === 'modulos' ? (
                          <div className={e.megaCols} data-n={HOME.todo.grupos.length}>
                            {HOME.todo.grupos.map((g) => (
                              <div key={g.titulo} className={e.megaCol}>
                                <p className={e.megaRotulo}>{g.titulo}</p>
                                <ul className={e.megaFilas}>
                                  {g.items.map((i) => (
                                    <li key={i.href}>
                                      <Link href={i.href} className={e.megaFila} onClick={() => setMega(null)}>
                                        <span className={`orbe ${e.megaOrbe}`} data-tono={g.tono} aria-hidden="true">
                                          <Icono nombre={i.icono} tam={18} />
                                        </span>
                                        <span className={e.megaTitulo}>{i.texto}</span>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <ul className={`${e.megaFilas} ${e.megaGrilla}`}>
                            {SOLUCIONES_NAV.map((i, n) => (
                              <li key={i.href}>
                                <Link href={i.href} className={e.megaFila} onClick={() => setMega(null)}>
                                  <span className={`orbe ${e.megaOrbe}`} data-tono={n % 2 ? 'azul' : 'turq'} aria-hidden="true">
                                    <Icono nombre={i.icono} tam={18} />
                                  </span>
                                  <span>
                                    <span className={e.megaTitulo}>{i.titulo}</span>
                                    <span className={e.megaDetalle}>{i.detalle}</span>
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                        {m.clave === 'modulos' && (
                          <div className={e.megaDestacados}>
                            {MEGA_PIE.modulos.destacados.map((d, n) => (
                              <Link
                                key={d.href}
                                href={d.href}
                                className={`${e.destacado} ${n === 0 ? e.destacadoMarca : e.destacadoNoche}`}
                                onClick={() => setMega(null)}
                                onMouseEnter={() => abrirPrevia(n)}
                                onFocus={() => abrirPrevia(n)}
                                onMouseLeave={cerrarPrevia}
                                onBlur={cerrarPrevia}
                              >
                                <span className={e.destacadoIcono} aria-hidden="true">
                                  <Icono nombre={d.icono} tam={24} />
                                </span>
                                <span className={e.destacadoTexto}>
                                  <b>{d.titulo}</b>
                                  <span>{d.detalle}</span>
                                </span>
                                <Icono nombre="flecha" tam={20} className={e.destacadoFlecha} />
                              </Link>
                            ))}
                          </div>
                        )}
                        {m.clave === 'modulos' && (
                          <div
                            className={`${e.megaPrevia} ${previa !== null ? e.megaPreviaAbierta : ''}`}
                            onMouseEnter={() => window.clearTimeout(cierrePrevia.current)}
                            onMouseLeave={cerrarPrevia}
                          >
                            <div className={e.megaPreviaInterior}>
                              {MEGA_PIE.modulos.destacados.map((d, n) => (
                                <Link
                                  key={d.href}
                                  href={d.href}
                                  className={`${e.previaHero} ${previa === n ? e.previaActiva : ''}`}
                                  tabIndex={-1}
                                  aria-label={d.titulo}
                                  onClick={() => setMega(null)}
                                >
                                  <Image src={d.previa.src} alt="" fill sizes="900px" className={e.previaImg} style={{ objectPosition: d.previa.pos }} />
                                  <span className={e.previaVelo} />
                                  <span className={e.previaTexto}>
                                    <b>{d.previa.titulo}</b>
                                    <span>{d.previa.bajada}</span>
                                  </span>
                                  <span className={e.previaIr} aria-hidden="true">
                                    <Icono nombre="flecha" tam={20} />
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className={e.megaPie}>
                          <span className={e.megaPieTexto}>
                            <b>{MEGA_PIE[m.clave].titulo}</b>
                            <span>{MEGA_PIE[m.clave].detalle}</span>
                          </span>
                          <span className={e.megaPieLinks}>
                            {MEGA_PIE[m.clave].links.map((l, n) => (
                              <Link
                                key={l.href}
                                href={l.href}
                                className={n === 0 ? e.megaPieBoton : e.megaPieLink}
                                onClick={() => setMega(null)}
                              >
                                {l.texto}
                                {n === 0 && <Icono nombre="flecha" tam={16} />}
                              </Link>
                            ))}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <Link href="/operaciones" className={`${e.link} ${activo('/operaciones') ? e.linkActivo : ''}`}>
                {NAV.comoSeHace}
              </Link>
              <Link href="/planes" className={`${e.link} ${activo('/planes') ? e.linkActivo : ''}`}>
                {NAV.planes}
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
                href="/modulos"
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
                  const clave: MenuMega | null = m.href === '/modulos' ? 'modulos' : m.href === '/soluciones' ? 'soluciones' : null;
                  if (clave) {
                    const abierto = grupo === clave;
                    const hijos =
                      clave === 'modulos'
                        ? HOME.todo.grupos.flatMap((g) => g.items.map((i) => ({ href: i.href, texto: i.texto })))
                        : SOLUCIONES_NAV.map((i) => ({ href: i.href, texto: i.titulo }));
                    return (
                      <li key={m.href}>
                        <button
                          type="button"
                          className={`${e.menuLink} ${e.menuGrupo} ${esta ? e.menuActivo : ''}`}
                          aria-expanded={abierto}
                          onClick={() => setGrupo(abierto ? null : clave)}
                        >
                          {m.texto}
                          <span className={`${e.menuCaret} ${abierto ? e.caretAbierto : ''}`} aria-hidden="true">
                            <Icono nombre="abajo" tam={22} />
                          </span>
                        </button>
                        {abierto && (
                          <ul className={e.menuSub}>
                            <li>
                              <Link href={m.href} className={`${e.menuSubLink} ${e.menuSubTodos}`} onClick={() => setMenu(false)}>
                                {clave === 'modulos' ? 'Ver todos los módulos' : 'Ver todas las soluciones'}
                              </Link>
                            </li>
                            {hijos.map((h) => (
                              <li key={h.href}>
                                <Link href={h.href} className={e.menuSubLink} onClick={() => setMenu(false)}>
                                  {h.texto}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  }
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
                href="/modulos"
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
