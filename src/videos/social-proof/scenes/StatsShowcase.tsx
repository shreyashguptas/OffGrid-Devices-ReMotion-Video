import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../../lib/colors";
import { SPRING_CONFIG } from "../../../lib/animations";

const stats = [
  { value: 10000, suffix: "+", label: "Happy Customers" },
  { value: 4.9, suffix: "", label: "Average Rating", decimals: 1 },
  { value: 50, suffix: "+", label: "Countries" },
  { value: 98, suffix: "%", label: "Would Recommend" },
];

export const StatsShowcase: React.FC = () => {
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
          fontFamily: "Syne, sans-serif",
          fontSize: 56,
          fontWeight: 700,
          color: COLORS.text,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          marginBottom: 80,
        }}
      >
        The Numbers <span style={{ color: COLORS.accent }}>Speak</span>
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 80,
        }}
      >
        {stats.map((stat, index) => {
          const statDelay = 15 + index * 12;

          const statProgress = spring({
            frame: frame - statDelay,
            fps,
            config: SPRING_CONFIG,
          });

          const statOpacity = interpolate(statProgress, [0, 1], [0, 1]);
          const statY = interpolate(statProgress, [0, 1], [40, 0]);
          const statScale = interpolate(statProgress, [0, 1], [0.8, 1]);

          // Counter animation
          const counterEnd = frame - statDelay > 0 ? Math.min((frame - statDelay) / 40, 1) : 0;
          const displayValue = stat.decimals
            ? (stat.value * counterEnd).toFixed(stat.decimals)
            : Math.floor(stat.value * counterEnd);

          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 15,
                opacity: statOpacity,
                transform: `translateY(${statY}px) scale(${statScale})`,
              }}
            >
              {/* Value */}
              <div
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontSize: 72,
                  fontWeight: 800,
                  color: COLORS.accent,
                  textShadow: `0 0 30px ${COLORS.accent}60`,
                }}
              >
                {displayValue}
                {stat.suffix}
              </div>

              {/* Label */}
              <div
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: 20,
                  color: COLORS.textMuted,
                  textAlign: "center",
                }}
              >
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
