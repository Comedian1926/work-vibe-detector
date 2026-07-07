const RADAR_LABELS = {
  sync: "拉齐",
  closure: "闭环",
  polite: "收到",
  tolerance: "接锅",
  afterwork: "下班",
};

export default function RadarChart({ result }) {
  const entries = Object.entries(result.dims);
  const center = 100;
  const radius = 50;
  const max = Math.max(8, ...entries.map(([, value]) => value));
  const point = (index, value = max, outerRadius = radius) => {
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / entries.length;
    const distance = outerRadius * (value / max);

    return {
      x: center + Math.cos(angle) * distance,
      y: center + Math.sin(angle) * distance,
    };
  };
  const pointString = (items) => items.map(({ x, y }) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const rings = [0.34, 0.67, 1].map((ratio) =>
    pointString(entries.map((_, index) => point(index, max * ratio))),
  );
  const shape = pointString(entries.map(([, value], index) => point(index, value)));

  return (
    <div className="radar-card" aria-label="班味信号雷达图">
      <svg className="radar-chart" viewBox="0 0 200 200" role="img">
        <defs>
          <linearGradient id="resultRadarFill" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#39ff88" stopOpacity="0.66" />
            <stop offset="58%" stopColor="#2f6bff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f7ff57" stopOpacity="0.42" />
          </linearGradient>
        </defs>

        {rings.map((points) => (
          <polygon className="radar-ring" key={points} points={points} />
        ))}
        {entries.map((_, index) => {
          const end = point(index);
          return (
            <line
              className="radar-axis"
              key={`axis-${index}`}
              x1={center}
              x2={end.x.toFixed(1)}
              y1={center}
              y2={end.y.toFixed(1)}
            />
          );
        })}
        <polygon className="radar-shape" points={shape} />
        {entries.map(([, value], index) => {
          const dot = point(index, value);
          return <circle className="radar-dot" cx={dot.x.toFixed(1)} cy={dot.y.toFixed(1)} key={`dot-${index}`} r="3.8" />;
        })}
        {entries.map(([key], index) => {
          const label = point(index, max, 66);
          return (
            <text
              className="radar-label"
              dominantBaseline="middle"
              key={key}
              textAnchor="middle"
              x={label.x.toFixed(1)}
              y={label.y.toFixed(1)}
            >
              {RADAR_LABELS[key] ?? key}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
