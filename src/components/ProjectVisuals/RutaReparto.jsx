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
