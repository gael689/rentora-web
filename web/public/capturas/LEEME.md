# Las capturas ya no se pegan acá

**Esta carpeta quedó vacía a propósito.** Antes esperaba doce capturas de un sistema andando
contra una base sembrada, y los componentes dibujaban un marcador con el encuadre pedido
mientras no existieran. Ese camino se descartó el 11/09/2026.

## Qué se hace en su lugar

Las pantallas del sistema están **replicadas** dentro de la web, en
`web/components/sistema/pantallas/`, con los datos de la Rentadora del Valle
(`web/lib/sistema/valle.ts`). No son imágenes: son la pantalla, en HTML, con la marca de
Rentora. Eso trae tres cosas que una captura no tiene:

- **Se regeneran solas.** Si cambia la paleta o un rótulo, cambian las 19 pantallas a la vez.
- **No se pixelan.** El texto es texto y se achica con `transform: scale()`, no con un `resize`.
- **No hay ningún riesgo de tocar datos reales**, porque no hay base de datos en el medio.

## Y las capturas para promoción

Salen de la propia web, con el sitio andando:

```bash
npx next build web
npx next start web -p 3311          # en otra terminal
node marketing/impresos/scripts/capturas-sistema.mjs
```

Deja los archivos afuera del repo:

| Dónde | Qué |
|---|---|
| `marketing/capturas/sistema/<slug>.webp` | 2560 px — brochure, propuestas, posteos |
| `marketing/capturas/revision/<slug>.jpg` | 1400 px — para mirarlas de a una y aprobarlas |

El script verifica y se planta con `exit(1)` si el catálogo dejó de tener 19 pantallas, si un
marco salió recortado, o si aparece la marca o el azul del cliente en la página. **La revisión
final sigue siendo manual y no se delega.**
