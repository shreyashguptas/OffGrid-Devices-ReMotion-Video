import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../../lib/colors";

interface Node {
  id: number;
  x: number;
  y: number;
  delay: number;
}

interface Connection {
  from: number;
  to: number;
  delay: number;
}

const nodes: Node[] = [
  { id: 0, x: 960, y: 300, delay: 0 },      // Center top
  { id: 1, x: 600, y: 450, delay: 10 },     // Left mid
  { id: 2, x: 1320, y: 450, delay: 15 },    // Right mid
  { id: 3, x: 480, y: 650, delay: 25 },     // Bottom left
  { id: 4, x: 960, y: 700, delay: 30 },     // Center bottom
  { id: 5, x: 1440, y: 650, delay: 35 },    // Bottom right
];

const connections: Connection[] = [
  { from: 0, to: 1, delay: 20 },
  { from: 0, to: 2, delay: 25 },
  { from: 1, to: 3, delay: 35 },
  { from: 1, to: 4, delay: 40 },
  { from: 2, to: 4, delay: 45 },
  { from: 2, to: 5, delay: 50 },
  { from: 3, to: 4, delay: 55 },
  { from: 4, to: 5, delay: 60 },
];

export const NetworkVisualization: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Fade out
  const fadeOut = interpolate(frame, [100, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Data packet animation (cycles through connections)
  const packetCycle = Math.floor((frame - 60) / 15) % connections.length;
  const packetProgress = ((frame - 60) % 15) / 15;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        opacity: fadeOut,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: "Syne, sans-serif",
          fontSize: 48,
          fontWeight: 700,
          color: COLORS.text,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        Every Device <span style={{ color: COLORS.accent }}>Connects</span>
      </div>

      {/* Network visualization */}
      <svg
        width="1920"
        height="1080"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {/* Connection lines */}
        {connections.map((conn, i) => {
          const fromNode = nodes[conn.from];
          const toNode = nodes[conn.to];

          const lineProgress = spring({
            frame: frame - conn.delay,
            fps,
            config: { damping: 20, stiffness: 80 },
          });

          const lineOpacity = interpolate(lineProgress, [0, 1], [0, 0.6]);
          const dashOffset = interpolate(frame, [0, 120], [100, 0]);

          // Highlight active connection
          const isActive = frame > 60 && packetCycle === i;
          const activeGlow = isActive ? 1 : 0;

          return (
            <g key={`conn-${i}`}>
              {/* Glow effect for active connection */}
              {isActive && (
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={COLORS.accent}
                  strokeWidth={8}
                  opacity={0.3}
                  filter="url(#glow)"
                />
              )}
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={isActive ? COLORS.accentLight : COLORS.accent}
                strokeWidth={isActive ? 3 : 2}
                opacity={lineOpacity + activeGlow * 0.4}
                strokeDasharray="8 4"
                strokeDashoffset={dashOffset}
              />
            </g>
          );
        })}

        {/* Data packet animation */}
        {frame > 60 && packetCycle < connections.length && (
          (() => {
            const conn = connections[packetCycle];
            const fromNode = nodes[conn.from];
            const toNode = nodes[conn.to];
            const x = fromNode.x + (toNode.x - fromNode.x) * packetProgress;
            const y = fromNode.y + (toNode.y - fromNode.y) * packetProgress;

            return (
              <g>
                <circle
                  cx={x}
                  cy={y}
                  r={12}
                  fill={COLORS.accentLight}
                  opacity={0.8}
                />
                <circle
                  cx={x}
                  cy={y}
                  r={20}
                  fill={COLORS.accent}
                  opacity={0.3}
                  filter="url(#glow)"
                />
              </g>
            );
          })()
        )}

        {/* Nodes */}
        {nodes.map((node) => {
          const nodeProgress = spring({
            frame: frame - node.delay,
            fps,
            config: { damping: 12, stiffness: 100 },
          });

          const nodeScale = interpolate(nodeProgress, [0, 1], [0, 1]);
          const nodeOpacity = interpolate(nodeProgress, [0, 1], [0, 1]);

          // Pulse effect
          const pulse = Math.sin(frame * 0.1 + node.id) * 3 + 3;

          return (
            <g key={`node-${node.id}`} opacity={nodeOpacity}>
              {/* Outer glow */}
              <circle
                cx={node.x}
                cy={node.y}
                r={35 + pulse}
                fill={COLORS.accent}
                opacity={0.15}
              />
              {/* Inner glow */}
              <circle
                cx={node.x}
                cy={node.y}
                r={25 + pulse * 0.5}
                fill={COLORS.accent}
                opacity={0.3}
              />
              {/* Core node */}
              <circle
                cx={node.x}
                cy={node.y}
                r={18 * nodeScale}
                fill={COLORS.accentLight}
              />
              {/* Center dot */}
              <circle
                cx={node.x}
                cy={node.y}
                r={6 * nodeScale}
                fill={COLORS.background}
              />
            </g>
          );
        })}

        {/* Glow filter */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Bottom text */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: "DM Sans, sans-serif",
          fontSize: 28,
          color: COLORS.textMuted,
          opacity: interpolate(frame, [40, 60], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Self-healing network automatically routes around obstacles
      </div>
    </AbsoluteFill>
  );
};
