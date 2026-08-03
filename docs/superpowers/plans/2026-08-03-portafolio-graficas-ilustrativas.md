# Gráficas ilustrativas en el Portafolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar la ilustración SVG estática de cada proyecto del portafolio por una gráfica ilustrativa (mockup, sin datos reales) visible tanto en la tarjeta del grid como en el modal de detalle.

**Architecture:** Cuatro componentes SVG puros y autocontenidos en `src/components/ProjectVisuals/`, cada uno con una prop `compact` que alterna entre una versión simple (tarjeta) y una detallada con leyenda (modal). `portfolio.jsx` los selecciona vía un lookup `visualType → componente` y renderiza condicionalmente: si un proyecto tiene `visualType`, usa el visual nuevo; si no, cae de vuelta a la imagen estática actual (permite migrar proyecto por proyecto sin romper los demás).

**Tech Stack:** React (SVG inline en JSX), CSS plano (`portfolio.css`). Sin dependencias nuevas.

## Global Constraints

- No agregar librerías de charts ni ninguna dependencia nueva a `package.json`.
- Usar exclusivamente estos colores (ya existentes en el sitio): `#1976d2` (azul), `#7c4dff` (morado), `#2e7d32` (verde), `#e65100` (naranja), fondos `#f0f4f8` / `#e3f2fd` / `#fafbfc`.
- Los datos que alimentan cada gráfica son inventados/ilustrativos (mismo criterio que las métricas actuales del portafolio) — no se conectan a datos reales.
- El proyecto no tiene framework de pruebas automatizadas configurado; la verificación de cada tarea es manual, con `npm run dev` en el navegador.
- No borrar del disco los assets estáticos actuales (`AlumbradoPublico.svg`, `Espiral.svg`, `censoarboreo.jpeg`, `PerdidasEnergia.svg`) — solo se deja de referenciarlos en código cuando ya no se usan.

---

### Task 1: Infraestructura + visual de Alumbrado Público (de punta a punta)

**Files:**
- Create: `src/components/ProjectVisuals/MapaLuminarias.jsx`
- Modify: `src/assets/css/portfolio.css`
- Modify: `src/components/portfolio.jsx`

**Interfaces:**
- Produces: componente `MapaLuminarias({ compact = false })` (export nombrado), que renderiza `<div className="project-visual project-visual--compact">` o `<div className="project-visual project-visual--detailed">` con un `<svg>` adentro y, si `!compact`, un `<div className="project-visual-legend">`.
- Produces: clases CSS `.project-visual`, `.project-visual--compact`, `.project-visual--detailed`, `.project-visual-legend` reutilizables por las Tasks 2-4.
- Produces: en `portfolio.jsx`, el objeto `VISUALS` (mapa `visualType → componente`) y el patrón de render condicional en tarjeta y modal — las Tasks 2-4 solo agregan entradas a `VISUALS` y el campo `visualType` a su proyecto, sin tocar de nuevo el JSX de render.

- [ ] **Step 1: Crear el componente `MapaLuminarias`**

Crear `src/components/ProjectVisuals/MapaLuminarias.jsx`:

```jsx
const STREETS = [
    { x1: 20, y1: 60, x2: 280, y2: 60 },
    { x1: 20, y1: 150, x2: 280, y2: 150 },
    { x1: 20, y1: 240, x2: 280, y2: 240 },
    { x1: 70, y1: 20, x2: 70, y2: 280 },
    { x1: 150, y1: 20, x2: 150, y2: 280 },
    { x1: 230, y1: 20, x2: 230, y2: 280 },
];

const LUMINARIAS = [
    { cx: 70, cy: 60, status: "ok" },
    { cx: 150, cy: 60, status: "ok" },
    { cx: 230, cy: 60, status: "ok" },
    { cx: 70, cy: 150, status: "ok" },
    { cx: 150, cy: 150, status: "fault" },
    { cx: 230, cy: 150, status: "ok" },
    { cx: 70, cy: 240, status: "ok" },
    { cx: 150, cy: 240, status: "ok" },
    { cx: 230, cy: 240, status: "fault" },
];

const COLORS = { ok: "#1976d2", fault: "#e65100" };

export function MapaLuminarias({ compact = false }) {
    return (
        <div className={`project-visual ${compact ? "project-visual--compact" : "project-visual--detailed"}`}>
            <svg viewBox="0 0 300 300" role="img" aria-label="Mapa ilustrativo de luminarias por sector">
                {STREETS.map((s, i) => (
                    <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="#c7d2e0" strokeWidth="2" />
                ))}
                {LUMINARIAS.map((l, i) => (
                    <g key={i}>
                        <circle cx={l.cx} cy={l.cy} r={compact ? 7 : 9} fill={COLORS[l.status]} opacity="0.9" />
                        <circle cx={l.cx} cy={l.cy} r={compact ? 12 : 15} fill={COLORS[l.status]} opacity="0.2" />
                    </g>
                ))}
            </svg>
            {!compact && (
                <div className="project-visual-legend">
                    <span><i style={{ background: COLORS.ok }} /> Operativa</span>
                    <span><i style={{ background: COLORS.fault }} /> Falla detectada</span>
                </div>
            )}
        </div>
    );
}
```

- [ ] **Step 2: Agregar los estilos del contenedor visual**

Al final de `src/assets/css/portfolio.css`, agregar:

```css
/* ===== VISUALES ILUSTRATIVOS DE PROYECTO ===== */
.project-visual {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.project-visual--compact {
    padding: 24px;
}

.project-visual--compact svg {
    width: 100%;
    height: 100%;
    display: block;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-card:hover .project-visual--compact svg {
    transform: scale(1.08);
}

.project-visual--detailed {
    flex-direction: column;
    padding: 24px;
    background: linear-gradient(135deg, #fafbfc 0%, #f0f4f8 100%);
    border-radius: 16px;
    border: 1px solid #eef2f7;
    margin-bottom: 32px;
}

.project-visual--detailed svg {
    width: 100%;
    max-height: 260px;
}

.project-visual-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 16px;
    font-size: 13px;
    color: #4a5568;
    font-weight: 500;
}

.project-visual-legend span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
}

.project-visual-legend i {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
}
```

- [ ] **Step 3: Conectar el visual en `portfolio.jsx`**

En `src/components/portfolio.jsx`:

1. Agregar el import junto a los demás imports de imágenes (línea 2-6):

```jsx
import { MapaLuminarias } from "./ProjectVisuals/MapaLuminarias.jsx";
```

2. Justo antes de `export function Portfolio() {`, agregar el lookup y un pequeño helper que resuelve el componente dinámico (evita repetir la búsqueda en cada punto de uso):

```jsx
const VISUALS = {
    alumbrado: MapaLuminarias,
};

function ProjectVisual({ type, compact = false }) {
    const Visual = VISUALS[type];
    return <Visual compact={compact} />;
}
```

3. En el objeto del proyecto `id: 1` ("Alumbrado Público"), agregar la clave `visualType: "alumbrado",` (por ejemplo, justo después de `image: imagen,`).

4. Reemplazar el bloque de la tarjeta (dentro de `.project-image`):

```jsx
<div className="project-image">
    <img src={project.image} alt={project.name} loading="lazy" />
</div>
```

por:

```jsx
<div className="project-image">
    {project.visualType ? (
        <ProjectVisual type={project.visualType} compact />
    ) : (
        <img src={project.image} alt={project.name} loading="lazy" />
    )}
</div>
```

5. Dentro del modal, justo antes de `<div className="modal-section"><h3>Aspectos destacados</h3>`, agregar una nueva sección:

```jsx
{selectedProject.visualType && (
    <div className="modal-section">
        <h3>Visualización</h3>
        <ProjectVisual type={selectedProject.visualType} />
    </div>
)}
```

- [ ] **Step 4: Verificar visualmente**

Correr:

```bash
npm run dev
```

Abrir `http://localhost:5173/` en el navegador y hacer scroll hasta la sección "Portafolio":
- Confirmar que la tarjeta "Alumbrado Público" ahora muestra un mapa esquemático con puntos de colores (azul y naranja) en vez del ícono del poste.
- Confirmar que las otras 3 tarjetas (Espiral, Censo Arbóreo, Pérdidas de Energía) siguen mostrando su imagen estática de siempre, sin cambios.
- Hacer hover sobre la tarjeta de Alumbrado Público y confirmar que el mapa hace un zoom sutil, igual que las demás tarjetas.
- Click en "Ver caso de estudio →" de Alumbrado Público y confirmar que el modal muestra una sección "Visualización" con el mismo mapa en versión más grande, con la leyenda "Operativa" / "Falla detectada" debajo.
- Cerrar el modal y probar en una ventana angosta (~375px) que la tarjeta y el modal no se deforman.

Detener el servidor de desarrollo (Ctrl+C) al terminar.

- [ ] **Step 5: Commit**

```bash
git add src/components/ProjectVisuals/MapaLuminarias.jsx src/assets/css/portfolio.css src/components/portfolio.jsx
git commit -m "feat(portafolio): agregar grafica ilustrativa de Alumbrado Publico"
```

---

### Task 2: Visual de Espiral (ruta de reparto)

**Files:**
- Create: `src/components/ProjectVisuals/RutaReparto.jsx`
- Modify: `src/components/portfolio.jsx`

**Interfaces:**
- Consumes: patrón de render condicional y objeto `VISUALS` de Task 1.
- Produces: componente `RutaReparto({ compact = false })`, misma forma que `MapaLuminarias`.

- [ ] **Step 1: Crear el componente `RutaReparto`**

Crear `src/components/ProjectVisuals/RutaReparto.jsx`:

```jsx
const STOPS = [
    { x: 30, y: 220 },
    { x: 90, y: 120 },
    { x: 160, y: 180 },
    { x: 220, y: 80 },
    { x: 270, y: 140 },
];

export function RutaReparto({ compact = false }) {
    const pathD = STOPS.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
    return (
        <div className={`project-visual ${compact ? "project-visual--compact" : "project-visual--detailed"}`}>
            <svg viewBox="0 0 300 300" role="img" aria-label="Ruta ilustrativa de reparto en campo">
                <path d={pathD} fill="none" stroke="#7c4dff" strokeWidth="3" strokeDasharray="8 6" strokeLinecap="round" />
                {STOPS.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r={compact ? 7 : 9} fill="#7c4dff" />
                ))}
            </svg>
            {!compact && (
                <div className="project-visual-legend">
                    <span><i style={{ background: "#7c4dff" }} /> Parada de venta</span>
                </div>
            )}
        </div>
    );
}
```

- [ ] **Step 2: Registrar el visual en `portfolio.jsx`**

1. Agregar el import:

```jsx
import { RutaReparto } from "./ProjectVisuals/RutaReparto.jsx";
```

2. En el objeto `VISUALS`, agregar:

```jsx
const VISUALS = {
    alumbrado: MapaLuminarias,
    espiral: RutaReparto,
};
```

3. En el objeto del proyecto `id: 2` ("Espiral"), agregar `visualType: "espiral",`.

- [ ] **Step 3: Verificar visualmente**

```bash
npm run dev
```

En `http://localhost:5173/`, sección "Portafolio":
- Confirmar que la tarjeta "Espiral" ahora muestra puntos morados conectados por una línea punteada, en vez del ícono anterior.
- Confirmar que "Censo Arbóreo" y "Pérdidas de Energía" siguen sin cambios.
- Abrir el modal de "Espiral" y confirmar la sección "Visualización" con la ruta ampliada y la leyenda "Parada de venta".

Detener el servidor (Ctrl+C).

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectVisuals/RutaReparto.jsx src/components/portfolio.jsx
git commit -m "feat(portafolio): agregar grafica ilustrativa de Espiral"
```

---

### Task 3: Visual de Censo Arbóreo (mapa de árboles)

**Files:**
- Create: `src/components/ProjectVisuals/MapaArboles.jsx`
- Modify: `src/components/portfolio.jsx`

**Interfaces:**
- Consumes: patrón de render condicional y objeto `VISUALS` de Task 1.
- Produces: componente `MapaArboles({ compact = false })`, misma forma que `MapaLuminarias`.

- [ ] **Step 1: Crear el componente `MapaArboles`**

Crear `src/components/ProjectVisuals/MapaArboles.jsx`:

```jsx
const TREES = [
    { x: 40, y: 60, status: "sano" },
    { x: 110, y: 90, status: "sano" },
    { x: 180, y: 50, status: "alerta" },
    { x: 240, y: 100, status: "sano" },
    { x: 70, y: 160, status: "sano" },
    { x: 150, y: 190, status: "alerta" },
    { x: 220, y: 200, status: "sano" },
    { x: 260, y: 250, status: "sano" },
    { x: 60, y: 250, status: "sano" },
];

const COLORS = { sano: "#2e7d32", alerta: "#e65100" };

export function MapaArboles({ compact = false }) {
    return (
        <div className={`project-visual ${compact ? "project-visual--compact" : "project-visual--detailed"}`}>
            <svg viewBox="0 0 300 300" role="img" aria-label="Mapa ilustrativo de arbolado urbano censado">
                <rect x="10" y="10" width="280" height="280" rx="16" fill="#eef5ee" />
                {TREES.map((t, i) => (
                    <g key={i} transform={`translate(${t.x}, ${t.y})`}>
                        <circle r={compact ? 10 : 13} fill={COLORS[t.status]} opacity="0.85" />
                        <circle cy="14" r="3" fill="#6b4423" opacity="0.6" />
                    </g>
                ))}
            </svg>
            {!compact && (
                <div className="project-visual-legend">
                    <span><i style={{ background: COLORS.sano }} /> Sano</span>
                    <span><i style={{ background: COLORS.alerta }} /> Alerta fitosanitaria</span>
                </div>
            )}
        </div>
    );
}
```

- [ ] **Step 2: Registrar el visual en `portfolio.jsx`**

1. Agregar el import:

```jsx
import { MapaArboles } from "./ProjectVisuals/MapaArboles.jsx";
```

2. En el objeto `VISUALS`, agregar:

```jsx
const VISUALS = {
    alumbrado: MapaLuminarias,
    espiral: RutaReparto,
    censo: MapaArboles,
};
```

3. En el objeto del proyecto `id: 3` ("Censo Arbóreo"), agregar `visualType: "censo",`.

- [ ] **Step 3: Verificar visualmente**

```bash
npm run dev
```

En `http://localhost:5173/`, sección "Portafolio":
- Confirmar que la tarjeta "Censo Arbóreo" ahora muestra un mapa verde con puntos representando árboles (verdes y ámbar), en vez de la foto anterior.
- Confirmar que "Pérdidas de Energía" sigue sin cambios.
- Abrir el modal de "Censo Arbóreo" y confirmar la sección "Visualización" con el mapa ampliado y la leyenda "Sano" / "Alerta fitosanitaria".

Detener el servidor (Ctrl+C).

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectVisuals/MapaArboles.jsx src/components/portfolio.jsx
git commit -m "feat(portafolio): agregar grafica ilustrativa de Censo Arboreo"
```

---

### Task 4: Visual de Pérdidas de Energía (barras) + limpieza final

**Files:**
- Create: `src/components/ProjectVisuals/BarrasPerdidas.jsx`
- Modify: `src/components/portfolio.jsx`

**Interfaces:**
- Consumes: patrón de render condicional y objeto `VISUALS` de Task 1.
- Produces: componente `BarrasPerdidas({ compact = false })`, misma forma que `MapaLuminarias`. Con esta task, los 4 proyectos tienen `visualType`, así que se elimina la rama de fallback (`<img>`) y los imports/campos que ya no se usan.

- [ ] **Step 1: Crear el componente `BarrasPerdidas`**

Crear `src/components/ProjectVisuals/BarrasPerdidas.jsx`:

```jsx
const BARS = [
    { label: "Ene", tecnica: 40, noTecnica: 70 },
    { label: "Feb", tecnica: 38, noTecnica: 60 },
    { label: "Mar", tecnica: 35, noTecnica: 50 },
    { label: "Abr", tecnica: 33, noTecnica: 42 },
    { label: "May", tecnica: 30, noTecnica: 34 },
];

export function BarrasPerdidas({ compact = false }) {
    const barWidth = 30;
    const gap = 20;
    const baseY = 260;
    return (
        <div className={`project-visual ${compact ? "project-visual--compact" : "project-visual--detailed"}`}>
            <svg viewBox="0 0 300 300" role="img" aria-label="Grafico ilustrativo de reduccion de perdidas de energia">
                <line x1="20" y1={baseY} x2="280" y2={baseY} stroke="#c7d2e0" strokeWidth="2" />
                {BARS.map((b, i) => {
                    const x = 30 + i * (barWidth * 2 + gap);
                    return (
                        <g key={b.label}>
                            <rect x={x} y={baseY - b.tecnica * 2} width={barWidth} height={b.tecnica * 2} fill="#1976d2" rx="3" />
                            <rect x={x + barWidth + 4} y={baseY - b.noTecnica * 2} width={barWidth} height={b.noTecnica * 2} fill="#e65100" rx="3" />
                        </g>
                    );
                })}
            </svg>
            {!compact && (
                <div className="project-visual-legend">
                    <span><i style={{ background: "#1976d2" }} /> Pérdida técnica</span>
                    <span><i style={{ background: "#e65100" }} /> Pérdida no técnica</span>
                </div>
            )}
        </div>
    );
}
```

- [ ] **Step 2: Registrar el visual en `portfolio.jsx`**

1. Agregar el import:

```jsx
import { BarrasPerdidas } from "./ProjectVisuals/BarrasPerdidas.jsx";
```

2. En el objeto `VISUALS`, agregar:

```jsx
const VISUALS = {
    alumbrado: MapaLuminarias,
    espiral: RutaReparto,
    censo: MapaArboles,
    perdidas: BarrasPerdidas,
};
```

3. En el objeto del proyecto `id: 4` ("Pérdidas de Energía"), agregar `visualType: "perdidas",`.

- [ ] **Step 3: Quitar el fallback y los imports/campos ya no usados**

Ahora que los 4 proyectos tienen `visualType`, simplificar el render de la tarjeta (de vuelta en `.project-image`, ya no hace falta la rama `<img>`):

```jsx
<div className="project-image">
    <ProjectVisual type={project.visualType} compact />
</div>
```

Quitar del inicio de `portfolio.jsx` los imports que ya no se usan:

```jsx
import imagen from "./Svg/AlumbradoPublico.svg";
import imagen1 from "./Svg/Espiral.svg";
import imagen2 from "../assets/images/censoarboreo.jpeg";
import imagen3 from "./Svg/PerdidasEnergia.svg";
```

Y quitar la línea `image: imagen,` (y equivalentes `image: imagen1,` / `imagen2` / `imagen3`) de cada uno de los 4 objetos en `projects`.

- [ ] **Step 4: Verificar visualmente (todas las tarjetas + responsive)**

```bash
npm run dev
```

En `http://localhost:5173/`, sección "Portafolio":
- Confirmar que las 4 tarjetas (Alumbrado Público, Espiral, Censo Arbóreo, Pérdidas de Energía) muestran su gráfica ilustrativa correspondiente, ninguna muestra imagen rota ni queda en blanco.
- Abrir el modal de cada uno de los 4 proyectos y confirmar que la sección "Visualización" aparece con su gráfica ampliada y leyenda correspondiente.
- Achicar la ventana del navegador a ~375px de ancho y confirmar que el grid pasa a una columna, las 4 gráficas se ven completas sin desbordarse, y los modales siguen siendo scrolleables.
- Revisar la consola del navegador (DevTools) y confirmar que no hay errores ni warnings nuevos de React.

Detener el servidor (Ctrl+C).

- [ ] **Step 5: Commit**

```bash
git add src/components/ProjectVisuals/BarrasPerdidas.jsx src/components/portfolio.jsx
git commit -m "feat(portafolio): agregar grafica de Perdidas de Energia y limpiar imagenes estaticas"
```
