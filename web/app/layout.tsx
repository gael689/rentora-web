import type { Metadata, Viewport } from 'next';
import { Inter, Inter_Tight } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SITIO, INDEXAR, LOCKUP, PORTFOLIO, AUTOR, WHATSAPP, SAME_AS, DESCRIPCION_ENTIDAD } from '@/lib/sitio';
import { alternos, SUFIJO_TITLE } from './_pagina/meta';
import Consentimiento from '@/components/consentimiento/Consentimiento';
import Medicion from '@/components/consentimiento/Medicion';
import Encabezado from '@/components/nav/Encabezado';
import Pie from '@/components/nav/Pie';
import BarraMovil from '@/components/nav/BarraMovil';
import './globals.css';

/* v4b: Inter Tight (600/700) para los títulos e Inter para el cuerpo. Dos familias de
 * la misma raíz, así el cambio de registro se nota en el peso y no en el estilo.
 * NUNCA Geist: es la identidad personal de Gael y arrastra su marca al producto. */
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--fuente-cuerpo',
  display: 'swap',
});
const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--fuente-tight',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITIO),
  title: {
    default: LOCKUP,
    template: `%s${SUFIJO_TITLE}`,
  },
  description:
    'El sistema con el que una rentadora maneja la ocupación de la flota, los precios por temporada, los contratos firmados y la caja del día. Más la web propia, donde el cliente reserva y paga.',
  alternates: alternos('/'),
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: SITIO,
    siteName: 'RentaGo',
    title: LOCKUP,
    description:
      'Ocupación, precios por temporada, contratos y caja del día. Más tu propia web con reservas y cobro online.',
  },
  robots: { index: INDEXAR, follow: INDEXAR },
};

export const viewport: Viewport = {
  themeColor: '#0F2E31',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${inter.variable} ${interTight.variable}`}>
      <body>
        {/* La identidad de la marca, una sola vez y en el layout: Organization y WebSite. Las
            páginas referencian estos `@id` (provider, publisher) en vez de repetir el bloque, que
            es como terminan diciendo cosas distintas. La descripción es la misma frase que
            llms.txt y los perfiles de terceros: los motores buscan consenso. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': `${SITIO}/#organizacion`,
                  name: 'RentaGo',
                  alternateName: LOCKUP,
                  description: DESCRIPCION_ENTIDAD,
                  url: SITIO,
                  logo: { '@type': 'ImageObject', url: `${SITIO}/icon.png` },
                  areaServed: { '@type': 'Country', name: 'Argentina' },
                  founder: { '@type': 'Person', name: AUTOR, url: PORTFOLIO },
                  contactPoint: {
                    '@type': 'ContactPoint',
                    contactType: 'sales',
                    telephone: `+${WHATSAPP}`,
                    areaServed: 'AR',
                    availableLanguage: 'Spanish',
                  },
                  // Sin perfiles reales no hay sameAs: uno inventado confunde la entidad.
                  ...(SAME_AS.length ? { sameAs: SAME_AS } : {}),
                },
                {
                  '@type': 'WebSite',
                  '@id': `${SITIO}/#sitio`,
                  name: 'RentaGo',
                  url: SITIO,
                  inLanguage: 'es-AR',
                  publisher: { '@id': `${SITIO}/#organizacion` },
                },
              ],
            }),
          }}
        />
        <div className="resplandor" aria-hidden="true" />
        <a href="#contenido" className="saltar">
          Saltar al contenido
        </a>
        <Encabezado />
        <main id="contenido">{children}</main>
        <Pie />
        <BarraMovil />
        <Consentimiento />
        <Medicion />
        {/* Sin cookies y sin identificar a nadie: no pide consentimiento. */}
        <Analytics />
      </body>
    </html>
  );
}
