# Gráficas ilustrativas en el Portafolio

## Contexto

Félix (feedback vía WhatsApp) pidió que el portafolio incluya elementos visuales
tipo gráfica por proyecto — ejemplo explícito: "gráficas de las luminarias en el
mapa" para el caso de Alumbrado Público. Hoy `src/components/portfolio.jsx`
solo muestra una ilustración SVG estática por proyecto en la tarjeta, y en el
modal de detalle solo hay números en tarjetas de métricas (`.modal-metrics`),
sin ningún elemento gráfico.

## Objetivo

Agregar una gráfica ilustrativa (mockup, sin datos reales conectados) para
cada uno de los 4 proyectos del portafolio, visible tanto en la tarjeta del
grid como en el modal de detalle.

## Fuera de alcance

- Datos reales o conectados a una fuente externa — son visualizaciones de
  ejemplo, igual que las métricas actuales (`50,000+ luminarias`, etc.) ya son
  ilustrativas.
- Librerías de charts (Recharts, Chart.js, D3) — se descartó explícitamente a
  favor de SVG/CSS a medida, para no sumar dependencias ni peso al bundle.
- Cambios a los otros componentes del sitio (header, servicios, metodología).

## Diseño

### Componentes nuevos

`src/components/ProjectVisuals/`:

- `MapaLuminarias.jsx` — Alumbrado Público. Mapa esquemático (rejilla/calles
  simplificadas) con puntos de luminarias: mayoría en azul/verde
  ("operativas"), un par en naranja ("falla detectada").
- `RutaReparto.jsx` — Espiral. Puntos conectados por una línea punteada
  simulando la ruta de un vendedor en campo.
- `MapaArboles.jsx` — Censo Arbóreo. Mapa con íconos de árbol distribuidos,
  coloreados por estado fitosanitario (verde = sano, ámbar = alerta).
- `BarrasPerdidas.jsx` — Pérdidas de Energía. Barras comparando pérdidas
  técnicas vs. no técnicas, con línea de tendencia a la baja superpuesta.

Cada componente:
- Es SVG puro + CSS, sin dependencias externas.
- Acepta una prop `compact: boolean` — `true` para la versión de tarjeta
  (menos elementos, más simple), `false`/ausente para la versión detallada
  del modal (incluye pequeña leyenda de colores).
- Usa exclusivamente la paleta ya existente del sitio: `#1976d2` (azul
  primario), `#7c4dff` (morado), `#2e7d32` (verde), `#e65100` (naranja),
  fondos `#f0f4f8` / `#e3f2fd`.

Un lookup en `portfolio.jsx` mapea `visualType` → componente:

```js
const VISUALS = {
  alumbrado: MapaLuminarias,
  espiral: RutaReparto,
  censo: MapaArboles,
  perdidas: BarrasPerdidas,
};
```

Cada objeto de `projects` en `portfolio.jsx` gana la clave `visualType` con
el valor correspondiente.

### Integración

- **Tarjeta (`.project-image`)**: se reemplaza `<img src={project.image} />`
  por `<VisualComponent compact />`, dentro del mismo contenedor cuadrado
  (`aspect-ratio: 1/1`), conservando el fondo degradado y el efecto de zoom
  en hover que ya existe en `.project-card:hover .project-image img` (se
  adapta el selector para que aplique al SVG del visual en vez de a un
  `<img>`).
- **Modal**: se agrega una nueva sección `.modal-section` titulada
  "Visualización" antes de "Aspectos destacados", con
  `<VisualComponent />` (versión detallada) dentro de un panel con el mismo
  lenguaje visual que `.modal-metrics` (fondo degradado suave, borde
  redondeado, borde `#eef2f7`).

### Limpieza

Los imports estáticos actuales en `portfolio.jsx`
(`AlumbradoPublico.svg`, `Espiral.svg`, `censoarboreo.jpeg`,
`PerdidasEnergia.svg`) y el campo `image` de cada proyecto se eliminan del
componente, ya que se reemplazan por los nuevos visuales. Los archivos
físicos se quedan en `src/components/Svg/` y `src/assets/images/` sin
tocarse — solo se limpia la referencia en código.

### Estilos

Nuevas reglas en `src/assets/css/portfolio.css`:
- `.project-visual` — contenedor base, mismo fondo degradado que
  `.project-image` (`linear-gradient(135deg, #f0f4f8 0%, #e3f2fd 100%)`).
- `.project-visual--compact` — usado dentro de la tarjeta.
- `.project-visual--detailed` — usado dentro del modal, con espacio para la
  leyenda de colores.

No se agregan dependencias nuevas al `package.json`.

## Verificación

- `npm run dev` y revisión visual manual de los 4 proyectos (tarjeta + modal
  abierto) en desktop y en ~375px de ancho (mobile), confirmando que:
  - Las gráficas no se deforman ni desbordan su contenedor.
  - El hover de la tarjeta sigue funcionando (zoom sutil).
  - El modal sigue siendo scrolleable y responsive como hoy.
- No hay pruebas automatizadas existentes en este proyecto para componentes
  de UI; la verificación es visual/manual.
