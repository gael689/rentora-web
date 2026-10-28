import Link from 'next/link';
import { NO_ENCONTRADA } from '@/lib/paginas';
import Portada from './_pagina/Portada';

export default function NoEncontrada() {
  return (
    <Portada titulo={NO_ENCONTRADA.titulo} bajada={NO_ENCONTRADA.bajada}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 28, flexWrap: 'wrap' }}>
        <Link href="/" className="cta">
          {NO_ENCONTRADA.inicio}
          <span className="flecha" aria-hidden="true">
            →
          </span>
        </Link>
        <Link href="/modulos" className="btn-linea">
          {NO_ENCONTRADA.modulos}
        </Link>
      </div>
    </Portada>
  );
}
