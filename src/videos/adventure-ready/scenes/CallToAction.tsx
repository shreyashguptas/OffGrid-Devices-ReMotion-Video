import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../../lib/colors";
import { SPRING_CONFIG } from "../../../lib/animations";

export const CallToAction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main text animation
  const textProgress = spring({
    frame,
    fps,
    config: SPRING_CONFIG,
  });

  const textOpacity = interpolate(textProgress, [0, 1], [0, 1]);
  const textScale = interpolate(textProgress, [0, 1], [0.85, 1]);

  // Pulse effect
  const pulse = Math.sin(frame * 0.2) * 0.1 + 1;

  // Fade out
  const fadeOut = interpolate(frame, [30, 45], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      {/* Radial glow background */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accent}20 0%, transparent 60%)`,
          transform: `scale(${pulse})`,
        }}
      />

      {/* Main CTA text */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 25,
          opacity: textOpacity,
          transform: `scale(${textScale})`,
        }}
      >
        <div
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: 72,
            fontWeight: 800,
            color: COLORS.text,
            textAlign: "center",
            letterSpacing: "-0.02em",
          }}
        >
          Your Next Adventure
        </div>
        <div
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: 72,
            fontWeight: 800,
            color: COLORS.accent,
            textAlign: "center",
            letterSpacing: "-0.02em",
            textShadow: `0 0 40px ${COLORS.accent}`,
          }}
        >
          Starts Here
        </div>
      </div>
    </AbsoluteFill>
  );
};
