import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../../lib/colors";
import { SPRING_CONFIG, SPRING_CONFIG_SLOW } from "../../../lib/animations";

export const HeroTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main title animation
  const titleProgress = spring({
    frame,
    fps,
    config: SPRING_CONFIG_SLOW,
  });

  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [60, 0]);
  const titleScale = interpolate(titleProgress, [0, 1], [0.9, 1]);

  // Subtitle animation (delayed)
  const subtitleProgress = spring({
    frame: frame - 15,
    fps,
    config: SPRING_CONFIG,
  });

  const subtitleOpacity = interpolate(subtitleProgress, [0, 1], [0, 1]);
  const subtitleY = interpolate(subtitleProgress, [0, 1], [30, 0]);

  // Accent line animation
  const lineProgress = spring({
    frame: frame - 25,
    fps,
    config: { damping: 20, stiffness: 120 },
  });

  const lineWidth = interpolate(lineProgress, [0, 1], [0, 200]);

  // Fade out
  const fadeOut = interpolate(frame, [55, 75], [1, 0], {
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
        gap: 25,
        opacity: fadeOut,
      }}
    >
      {/* Main title */}
      <div
        style={{
          fontFamily: "Syne, sans-serif",
          fontSize: 100,
          fontWeight: 800,
          color: COLORS.text,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px) scale(${titleScale})`,
          letterSpacing: "-0.03em",
          textAlign: "center",
        }}
      >
        Mesh <span style={{ color: COLORS.accent }}>Networking</span>
      </div>

      {/* Accent line */}
      <div
        style={{
          width: lineWidth,
          height: 4,
          backgroundColor: COLORS.accent,
          borderRadius: 2,
          boxShadow: `0 0 20px ${COLORS.accent}`,
        }}
      />

      {/* Subtitle */}
      <div
        style={{
          fontFamily: "DM Sans, sans-serif",
          fontSize: 32,
          fontWeight: 400,
          color: COLORS.textMuted,
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        Communication Without Limits
      </div>
    </AbsoluteFill>
  );
};
