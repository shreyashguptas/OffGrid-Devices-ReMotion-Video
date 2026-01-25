import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../../lib/colors";
import { SPRING_CONFIG } from "../../../lib/animations";

const terrains = [
  { name: "Forest", icon: "🌲", color: "#2d5a3d" },
  { name: "Desert", icon: "🏜️", color: "#c4a35a" },
  { name: "Ocean", icon: "🌊", color: "#1a5276" },
  { name: "Mountain", icon: "⛰️", color: "#5d6d7e" },
  { name: "Arctic", icon: "❄️", color: "#aed6f1" },
];

export const TerrainProof: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [40, 0]);

  // Active terrain (cycles through)
  const activeIndex = Math.floor(frame / 18) % terrains.length;

  // Fade out
  const fadeOut = interpolate(frame, [85, 105], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeOut,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 120,
          fontFamily: "Syne, sans-serif",
          fontSize: 56,
          fontWeight: 700,
          color: COLORS.text,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
        }}
      >
        Works <span style={{ color: COLORS.accent }}>Everywhere</span>
      </div>

      {/* Terrain icons row */}
      <div
        style={{
          display: "flex",
          gap: 60,
          alignItems: "center",
          marginTop: 40,
        }}
      >
        {terrains.map((terrain, index) => {
          const delay = 15 + index * 8;
          const isActive = index === activeIndex;

          const itemProgress = spring({
            frame: frame - delay,
            fps,
            config: SPRING_CONFIG,
          });

          const itemOpacity = interpolate(itemProgress, [0, 1], [0, 1]);
          const itemScale = interpolate(itemProgress, [0, 1], [0.5, isActive ? 1.15 : 1]);
          const itemY = interpolate(itemProgress, [0, 1], [30, 0]);

          // Glow pulse for active
          const glowIntensity = isActive
            ? 0.4 + Math.sin(frame * 0.2) * 0.2
            : 0;

          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
                opacity: itemOpacity,
                transform: `translateY(${itemY}px) scale(${itemScale})`,
              }}
            >
              {/* Icon container */}
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  backgroundColor: isActive ? `${terrain.color}30` : `${COLORS.accent}10`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: `3px solid ${isActive ? COLORS.accent : COLORS.accent}40`,
                  boxShadow: isActive
                    ? `0 0 ${40 * glowIntensity}px ${COLORS.accent}, inset 0 0 30px ${terrain.color}40`
                    : "none",
                }}
              >
                <span style={{ fontSize: 56 }}>{terrain.icon}</span>
              </div>

              {/* Label */}
              <div
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: 18,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? COLORS.accent : COLORS.textMuted,
                }}
              >
                {terrain.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* Signal strength indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 150,
          display: "flex",
          alignItems: "center",
          gap: 30,
        }}
      >
        {/* Signal bars */}
        <div style={{ display: "flex", gap: 6, alignItems: "flex-end" }}>
          {[1, 2, 3, 4, 5].map((bar) => {
            const barDelay = 50 + bar * 5;
            const barProgress = spring({
              frame: frame - barDelay,
              fps,
              config: { damping: 12, stiffness: 150 },
            });

            const barHeight = interpolate(barProgress, [0, 1], [0, 15 + bar * 12]);
            const barOpacity = interpolate(barProgress, [0, 1], [0, 1]);

            return (
              <div
                key={bar}
                style={{
                  width: 12,
                  height: barHeight,
                  backgroundColor: COLORS.accent,
                  borderRadius: 3,
                  opacity: barOpacity,
                  boxShadow: `0 0 10px ${COLORS.accent}80`,
                }}
              />
            );
          })}
        </div>

        {/* Text */}
        <div
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: 32,
            fontWeight: 600,
            color: COLORS.text,
            opacity: interpolate(frame, [60, 75], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Full Signal, <span style={{ color: COLORS.accent }}>Any Terrain</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
