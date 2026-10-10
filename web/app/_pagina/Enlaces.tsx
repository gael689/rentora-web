import Link from 'next/link';
import s from '../seo.module.css';

/* Los enlaces cruzados entre familias (otras ciudades, otras guías, términos relacionados). Es
 * lo que hace que Google encuentre todas las páginas sin pasar por el sitemap. */
export default function Enlaces({
  titulo,
  items,
  tono = 'turq',
}: {
  titulo: string;
  items: { href: string; texto: string }[];
  tono?: string;
}) {
  if (items.length === 0) return null;
  return (
    <section className={`${s.bloque} ${s.bloqueEnlaces}`} data-tono={tono}>
      <h2 className={s.rotulo}>{titulo}</h2>
      <nav className={s.otras} aria-label={titulo}>
        {items.map((x) => (
          <Link key={x.href} href={x.href} className={s.otra}>
            {x.texto}
          </Link>
        ))}
      </nav>
    </section>
  );
}
