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
