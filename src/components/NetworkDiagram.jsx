import { useState } from 'react'

/**
 * Diagrama de red del hero: nodo central conectado con cuatro nodos.
 * Las líneas se dibujan al cargar; al pasar por un nodo se resalta su conexión.
 */

const CENTER = { x: 185, y: 166, w: 150, h: 48 }
const CENTER_MID = { x: CENTER.x + CENTER.w / 2, y: CENTER.y + CENTER.h / 2 }

// Caja de cada nodo + esquina de conexión hacia el centro
const NODES = [
  { box: { x: 4, y: 24, w: 150, h: 42 }, corner: { x: 154, y: 66 }, indexAbove: true },
  { box: { x: 366, y: 24, w: 150, h: 42 }, corner: { x: 366, y: 66 }, indexAbove: true },
  { box: { x: 4, y: 314, w: 150, h: 42 }, corner: { x: 154, y: 314 }, indexAbove: false },
  { box: { x: 366, y: 314, w: 150, h: 42 }, corner: { x: 366, y: 314 }, indexAbove: false },
]

function NetworkDiagram({ labels, centerLabel, alt }) {
  const [active, setActive] = useState(null)

  return (
    <svg
      viewBox="0 0 520 380"
      className="w-full h-auto"
      role="img"
      aria-label={alt}
      onMouseLeave={() => setActive(null)}
    >
      {/* Conexiones */}
      {NODES.map((node, i) => (
        <line
          key={`l-${i}`}
          className="diagram-link diagram-line"
          x1={CENTER_MID.x}
          y1={CENTER_MID.y}
          x2={node.corner.x}
          y2={node.corner.y}
          pathLength="1"
          strokeWidth={active === i ? 2 : 1}
          stroke={active === i ? 'var(--color-signal)' : 'var(--color-steel)'}
          style={{ animationDelay: `${i * 130}ms` }}
        />
      ))}

      {/* Nodo central */}
      <g className="diagram-node" style={{ animationDelay: '60ms' }}>
        <rect
          x={CENTER.x}
          y={CENTER.y}
          width={CENTER.w}
          height={CENTER.h}
          rx="3"
          fill="var(--color-paper)"
          stroke="var(--color-ink)"
          strokeWidth="1"
        />
        <text
          x={CENTER_MID.x}
          y={CENTER_MID.y + 5}
          textAnchor="middle"
          className="mono"
          fontSize="14"
          letterSpacing="0.04em"
          fill="var(--color-ink)"
        >
          {centerLabel}
        </text>
      </g>

      {/* Nodos hoja */}
      {NODES.map((node, i) => {
        const cx = node.box.x + node.box.w / 2
        const cy = node.box.y + node.box.h / 2
        const isActive = active === i
        return (
          <g
            key={`n-${i}`}
            className="diagram-node"
            style={{ animationDelay: `${360 + i * 130}ms` }}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            <rect
              className="diagram-nodebox"
              x={node.box.x}
              y={node.box.y}
              width={node.box.w}
              height={node.box.h}
              rx="3"
              fill={isActive ? 'rgba(255,91,31,0.12)' : 'var(--color-paper)'}
              stroke={isActive ? 'var(--color-signal)' : 'var(--color-rule)'}
              strokeWidth="1"
            />
            <text
              x={cx}
              y={cy + 4}
              textAnchor="middle"
              className="mono"
              fontSize="12.5"
              fill="var(--color-ink)"
            >
              {labels[i]}
            </text>
            <text
              x={cx}
              y={node.indexAbove ? node.box.y - 8 : node.box.y + node.box.h + 15}
              textAnchor="middle"
              className="mono"
              fontSize="9"
              letterSpacing="0.12em"
              fill="var(--color-slate)"
            >
              {`N-0${i + 1}`}
            </text>
            {/* LED del puerto */}
            <circle
              cx={node.corner.x}
              cy={node.corner.y}
              r={isActive ? 4.5 : 3.2}
              fill="var(--color-signal)"
            />
          </g>
        )
      })}
    </svg>
  )
}

export default NetworkDiagram
