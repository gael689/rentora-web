import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /* Solo dev. Next 16 bloquea los recursos de dev pedidos desde un host distinto al que
   * levantó el server: entrando por 127.0.0.1 en vez de localhost, /_next/hmr y los chunks
   * del cliente se bloquean y la página NO HIDRATA — se ve bien y no reacciona a nada, sin
   * ningún error en la consola del navegador. El aviso solo sale en el log del server. */
  allowedDevOrigins: ['127.0.0.1'],
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'] },
  /* /que-incluye se fusionó con /planes (ancla #que-incluye). */
  async redirects() {
    return [
      { source: '/que-incluye', destination: '/planes#que-incluye', permanent: true },
      /* La sección de pantallas (/sistema) se sacó: todo lo que apuntaba ahí va a /modulos. */
      { source: '/sistema', destination: '/modulos', permanent: true },
      { source: '/sistema/:path*', destination: '/modulos', permanent: true },
      /* Las guías pasaron a llamarse Soluciones. */
      { source: '/guias', destination: '/soluciones', permanent: true },
      { source: '/guias/:slug', destination: '/soluciones/:slug', permanent: true },
    ];
  },
};

export default nextConfig;
