import type { Metadata } from 'next';
import { SITIO } from '@/lib/sitio';
import Hero from '@/components/home/Hero';
import Confianza from '@/components/home/Confianza';
import Problemas from '@/components/home/Problemas';
import Modulos from '@/components/home/Modulos';
import Funciones from '@/components/home/Funciones';
import Video from '@/components/home/Video';
import AMedida from '@/components/home/AMedida';
import Seguridad from '@/components/home/Seguridad';
import Faq from '@/components/home/Faq';
import Cierre from '@/components/home/Cierre';
import { alternos } from './_pagina/meta';

/* La home trabaja el término cabeza. Es el único H1 del sitio que lo usa: cada módulo
 * trabaja un long-tail funcional distinto y nunca lo repite. */
export const metadata: Metadata = {
  title: { absolute: 'Software para rent a car y rentadoras de autos · RentaGo' },
  description:
    'Sistema de gestión para rentadoras de autos en Argentina: flota, reservas, contratos y caja, con tu propia web que reserva y cobra.',
  alternates: alternos('/'),
};

export default function Home() {
  /* Sin `FAQPage` acá: la home muestra 6 preguntas y el marcado tiene que reflejar lo visible.
   * El `FAQPage` completo vive en /preguntas, y es uno solo por página (lo mide verificar-seo).
   *
   * SoftwareApplication sin `offers` ni `price`: no hay precios públicos, y declarar uno
   * falso en los datos estructurados es peor que no declarar nada. */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITIO}/#software`,
        name: 'RentaGo',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description:
          'Sistema de gestión para empresas de alquiler de autos: ocupación de flota, precios por temporada, contratos, caja, sucursales y web pública con reservas.',
        url: SITIO,
        inLanguage: 'es-AR',
        publisher: { '@id': `${SITIO}/#organizacion` },
        isAccessibleForFree: false,
        featureList: [
          'Calendario de ocupación de flota con vista anual',
          'Precio único con temporadas, feriados y descuentos por duración',
          'Contratos con cláusulas editables, firma en pantalla y hasta tres conductores',
          'Contrato de largo plazo / semanal y documento de franquicia',
          'Caja por sucursal, cuentas a cobrar, cuentas corrientes y echeqs',
          'Varias sucursales, con retiro en una y devolución en otra',
          'Reportes de ingresos, flota y demanda no atendida',
          'Web pública con motor de reservas y cobro online',
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Hero />
      <Confianza />
      <Problemas />
      <Video />
      <Funciones />
      <AMedida />
      <Modulos />
      <Seguridad />
      <Faq />
      <Cierre />
    </>
  );
}
