import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../../lib/colors";

export const DramaticReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Curtain animation (splits in middle)
  const curtainProgress = spring({
    frame: frame - 10,
    fps,
    config: { damping: 20, stiffness: 60 },
  });

  const leftCurtain = interpolate(curtainProgress, [0, 1], [0, -100]);
  const rightCurtain = interpolate(curtainProgress, [0, 1], [0, 100]);

  // Text reveal
  const textProgress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const textOpacity = interpolate(textProgress, [0, 1], [0, 1]);
  const textScale = interpolate(textProgress, [0, 1], [1.3, 1]);

  // Subtitle
  const subtitleProgress = spring({
    frame: frame - 35,
    fps,
    config: { damping: 15, stiffness: 90 },
  });

  const subtitleOpacity = interpolate(subtitleProgress, [0, 1], [0, 1]);

  // Light rays
  const rayOpacity = interpolate(frame, [15, 40], [0, 0.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out
  const fadeOut = interpolate(frame, [55, 75], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        overflow: "hidden",
        opacity: fadeOut,
      }}
    >
      {/* Light rays background */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 2000,
          height: 2000,
          background: `conic-gradient(from 0deg, transparent, ${COLORS.accent}20, transparent, ${COLORS.accent}20, transparent, ${COLORS.accent}20, transparent, ${COLORS.accent}20, transparent)`,
          opacity: rayOpacity,
        }}
      />

      {/* Curtain effect - left */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "50%",
          height: "100%",
          background: `linear-gradient(to right, ${COLORS.background}, ${COLORS.accent}20)`,
          transform: `translateX(${leftCurtain}%)`,
          zIndex: 10,
        }}
      />

      {/* Curtain effect - right */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          background: `linear-gradient(to left, ${COLORS.background}, ${COLORS.accent}20)`,
          transform: `translateX(${rightCurtain}%)`,
          zIndex: 10,
        }}
      />

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          gap: 30,
        }}
      >
        {/* Main title */}
        <div
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: 110,
            fontWeight: 800,
            color: COLORS.text,
            opacity: textOpacity,
            transform: `scale(${textScale})`,
            letterSpacing: "-0.03em",
            textAlign: "center",
          }}
        >
          Introducing
        </div>

        {/* Product name */}
        <div
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: 130,
            fontWeight: 800,
            color: COLORS.accent,
            opacity: textOpacity,
            transform: `scale(${textScale})`,
            letterSpacing: "-0.02em",
            textShadow: `0 0 80px ${COLORS.accent}60`,
          }}
        >
          OffGrid
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: 28,
            color: COLORS.textMuted,
            opacity: subtitleOpacity,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Redefining Off-Grid Communication
        </div>
      </div>
    </AbsoluteFill>
  );
};
