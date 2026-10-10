import { ImageResponse } from 'next/og';
import { LOCKUP, SITIO } from '@/lib/sitio';
import { HOME, T } from '@/lib/contenido';

export const alt = LOCKUP;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/* La imagen de Open Graph, v4b: blanco con los resplandores de marca, el logo, el titular del hero
 * entero en petróleo y abajo los puntos como chips teñidos, como en la web.
 *
 * Tipografía: la que trae `ImageResponse` por defecto. Leer Inter Tight acá exigiría red o un
 * archivo en el repo, y esta imagen tiene que generarse sin ninguna de las dos. Nunca Geist. */
const TINTES = [
  { fondo: '#E2F1F1', texto: '#0B6E73' },
  { fondo: '#E6F0FB', texto: '#1F5E9E' },
  { fondo: '#FCF1D2', texto: '#7A5600' },
];

export default async function OG() {
  const t = HOME.hero.titular;
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          fontFamily: 'sans-serif',
          color: '#0F2E31',
          backgroundColor: '#FFFFFF',
          backgroundImage:
            'radial-gradient(circle at 92% 6%, rgba(18,149,155,0.28), rgba(255,255,255,0) 46%), radial-gradient(circle at 70% 95%, rgba(59,130,196,0.18), rgba(255,255,255,0) 42%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 6,
              width: 52,
              height: 52,
              padding: '0 13px',
              borderRadius: 16,
              backgroundImage: 'linear-gradient(140deg, #19A9B0, #0B5D62)',
            }}
          >
            <div style={{ display: 'flex', height: 7, borderRadius: 4, background: '#FFFFFF' }} />
            <div style={{ display: 'flex', height: 7, width: 18, borderRadius: 4, background: 'rgba(255,255,255,0.75)' }} />
          </div>
          <span style={{ display: 'flex', fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>
            Rent<span style={{ color: '#0E7F85' }}>ora</span>
          </span>
          <span style={{ fontSize: 24, color: '#4A6766', marginLeft: 8 }}>{T.descriptor}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 26, maxWidth: 960 }}>
          <div style={{ display: 'flex', fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -3 }}>
            {`${t.antes}${t.clave}${t.despues}`}
          </div>
          <div style={{ display: 'flex', fontSize: 30, color: '#4A6766' }}>{HOME.og.linea}</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 12 }}>
            {HOME.hero.puntos.map((p, i) => (
              <span
                key={p}
                style={{
                  display: 'flex',
                  padding: '10px 20px',
                  borderRadius: 999,
                  fontSize: 22,
                  fontWeight: 600,
                  background: TINTES[i % TINTES.length].fondo,
                  color: TINTES[i % TINTES.length].texto,
                }}
              >
                {p}
              </span>
            ))}
          </div>
          <span style={{ fontSize: 22, color: '#4A6766' }}>{new URL(SITIO).host.replace(/^www\./, '')}</span>
        </div>
      </div>
    ),
    size,
  );
}
