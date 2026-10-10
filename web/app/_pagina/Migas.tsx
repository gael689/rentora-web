import Link from 'next/link';
import s from './pagina.module.css';

export default function Migas({
  items,
  actual,
}: {
  items: { href: string; texto: string }[];
  actual: string;
}) {
  return (
    <nav className={s.migas} aria-label="Migas de pan">
      {items.map((i) => (
        <span key={i.href} className={s.miga}>
          <Link href={i.href}>{i.texto}</Link>
          <span aria-hidden="true">/</span>
        </span>
      ))}
      <span aria-current="page">{actual}</span>
    </nav>
  );
}
