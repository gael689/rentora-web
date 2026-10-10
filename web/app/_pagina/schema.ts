import { SITIO } from '@/lib/sitio';

/** `BreadcrumbList` desde las mismas migas que se ven. El último ítem es la página actual. */
export function migasLd(items: { href: string; texto: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((x, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: x.texto,
      item: x.href === '/' ? SITIO : `${SITIO}${x.href}`,
    })),
  };
}

/** Un `<script>` de JSON-LD con `@graph`. */
export function grafo(...nodos: object[]) {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodos });
}
