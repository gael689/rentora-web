import Link from 'next/link';
import { PRIVACIDAD } from '@/lib/privacidad';
import { MODULOS, T } from '@/lib/contenido';
import { NAV } from '@/lib/nav';
import { PIE } from '@/lib/paginas';
import { PARA, PLAZAS } from '@/lib/seo';
import { PANTALLAS } from '@/lib/sistema/pantallas';
import { AUTOR, PORTFOLIO, linkWhatsapp } from '@/lib/sitio';
import AbrirCookies from '@/components/consentimiento/AbrirCookies';
import Icono from '@/components/sistema/Icono';
import estilos from './Pie.module.css';

/* Pie v4b: fondo gris claro, marca y contacto a la izquierda, las familias de links en columnas.
 * Rentora es el producto; Gael es quien lo hace. La firma va al pie, chica.
 *
 * Todas las familias de páginas tienen su columna y todas salen de los datos: así Google llega a
 * cada página desde todas las demás, y una página nueva aparece en el pie sin tocar este archivo. */
export default function Pie() {
  const N = NAV;
  const P = PIE;
  return (
    <footer className={estilos.pie}>
      <div className={`envoltorio ${estilos.cuerpo}`}>
        <div className={estilos.marcaColumna}>
          <Link href="/" className={estilos.lockup}>
            <span className={estilos.logo} aria-hidden="true" />
            <span className={estilos.marca}>
              Rent<span className={estilos.marcaAcento}>ora</span>
            </span>
          </Link>
          <p className={estilos.descripcion}>{P.descripcion}</p>
          <div className={estilos.contacto}>
            <a
              href={linkWhatsapp(T.whatsappMensaje)}
              className={`cta cta-chico ${estilos.wa}`}
              target="_blank"
              rel="noopener"
              data-cta="pie"
            >
              <Icono nombre="whatsapp" tam={18} />
              {T.whatsapp}
            </a>
            <Link href="/contacto" className={estilos.formulario}>
              {N.formulario}
            </Link>
          </div>
        </div>

        <nav className={estilos.columnas} aria-label={N.pie}>
          <div>
            <p className={estilos.rotulo}>{P.producto}</p>
            <ul className={estilos.lista}>
              <li>
                <Link href="/sistema">{N.pantallas.replace('{n}', String(PANTALLAS.length))}</Link>
              </li>
              <li>
                <Link href="/operaciones">{N.comoSeHace}</Link>
              </li>
              <li>
                <Link href="/modulos">{P.modulosTodos}</Link>
              </li>
              <li>
                <Link href="/planes">{P.planes}</Link>
              </li>
              <li>
                <Link href="/que-incluye">{P.queIncluye}</Link>
              </li>
              <li>
                <Link href="/web-a-medida">{P.webAMedida}</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className={estilos.rotulo}>{N.modulos.replace('{n}', String(MODULOS.length))}</p>
            <ul className={estilos.lista}>
              {MODULOS.map((m) => (
                <li key={m.slug}>
                  <Link href={`/modulos/${m.slug}`}>{m.nombre}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={estilos.rotulo}>
              <Link href="/para">{P.para}</Link>
            </p>
            <ul className={estilos.lista}>
              {PARA.map((x) => (
                <li key={x.slug}>
                  <Link href={`/para/${x.slug}`}>{x.nombre}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={estilos.rotulo}>
              <Link href="/software-rent-a-car">{P.ciudades}</Link>
            </p>
            <ul className={estilos.lista}>
              {PLAZAS.map((x) => (
                <li key={x.slug}>
                  <Link href={`/software-rent-a-car/${x.slug}`}>{x.ciudad}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={estilos.rotulo}>{P.recursos}</p>
            <ul className={estilos.lista}>
              <li>
                <Link href="/guias">{P.guias}</Link>
              </li>
              <li>
                <Link href="/contrato-de-alquiler-de-autos">{P.contrato}</Link>
              </li>
              <li>
                <Link href="/como-elegir">{N.comoElegir}</Link>
              </li>
              <li>
                <Link href="/glosario">{N.glosario}</Link>
              </li>
              <li>
                <Link href="/preguntas">{N.preguntas}</Link>
              </li>
              <li>
                <Link href="/privacidad">{PRIVACIDAD.enlace}</Link>
              </li>
              <li>
                <AbrirCookies />
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className={estilos.firmaBanda}>
        <div className={`envoltorio ${estilos.firma}`}>
          <p>© {new Date().getFullYear()} Rentora · {T.descriptor}</p>
          <p>
            {T.firmaPie}{' '}
            <a href={PORTFOLIO} target="_blank" rel="noopener noreferrer">
              {AUTOR}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
