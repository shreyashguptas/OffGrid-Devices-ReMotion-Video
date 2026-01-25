import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../../lib/colors";
import { SPRING_CONFIG_SLOW } from "../../../lib/animations";

export const SpecsIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleProgress = spring({
    frame,
    fps,
    config: SPRING_CONFIG_SLOW,
  });

  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [50, 0]);

  // Subtitle animation
  const subtitleProgress = spring({
    frame: frame - 15,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const subtitleOpacity = interpolate(subtitleProgress, [0, 1], [0, 1]);

  // Tech lines animation
  const linesProgress = spring({
    frame: frame - 25,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  // Fade out
  const fadeOut = interpolate(frame, [40, 60], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      {/* Animated tech lines */}
      <svg
        width="1920"
        height="1080"
        style={{
          position: "absolute",
          opacity: interpolate(linesProgress, [0, 1], [0, 0.15]),
        }}
      >
        {Array.from({ length: 10 }).map((_, i) => {
          const lineY = 100 + i * 100;
          const lineWidth = interpolate(linesProgress, [0, 1], [0, 1920]);
          return (
            <line
              key={i}
              x1={0}
              y1={lineY}
              x2={lineWidth}
              y2={lineY}
              stroke={COLORS.accent}
              strokeWidth={1}
              opacity={0.3}
            />
          );
        })}
        {Array.from({ length: 15 }).map((_, i) => {
          const lineX = 100 + i * 130;
          const lineHeight = interpolate(linesProgress, [0, 1], [0, 1080]);
          return (
            <line
              key={`v-${i}`}
              x1={lineX}
              y1={0}
              x2={lineX}
              y2={lineHeight}
              stroke={COLORS.accent}
              strokeWidth={1}
              opacity={0.2}
            />
          );
        })}
      </svg>

      {/* Main title */}
      <div
        style={{
          fontFamily: "Syne, sans-serif",
          fontSize: 100,
          fontWeight: 800,
          color: COLORS.text,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          letterSpacing: "-0.03em",
        }}
      >
        Tech <span style={{ color: COLORS.accent }}>Specs</span>
      </div>

      {/* Subtitle */}
      <div
        style={{
          marginTop: 30,
          fontFamily: "DM Sans, sans-serif",
          fontSize: 28,
          color: COLORS.textMuted,
          opacity: subtitleOpacity,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        Built for the Extreme
      </div>
    </AbsoluteFill>
  );
};
