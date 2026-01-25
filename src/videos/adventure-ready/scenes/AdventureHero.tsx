import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../../lib/colors";
import { SPRING_CONFIG_SLOW } from "../../../lib/animations";

export const AdventureHero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main title animation with dramatic reveal
  const titleProgress = spring({
    frame,
    fps,
    config: SPRING_CONFIG_SLOW,
  });

  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleScale = interpolate(titleProgress, [0, 1], [1.2, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [80, 0]);

  // Subtitle animation
  const subtitleProgress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 15, stiffness: 90 },
  });

  const subtitleOpacity = interpolate(subtitleProgress, [0, 1], [0, 1]);
  const subtitleY = interpolate(subtitleProgress, [0, 1], [40, 0]);

  // Glowing accent bar
  const barProgress = spring({
    frame: frame - 30,
    fps,
    config: { damping: 25, stiffness: 100 },
  });

  const barWidth = interpolate(barProgress, [0, 1], [0, 400]);

  // Particle effect positions
  const particles = Array.from({ length: 20 }, (_, i) => ({
    x: Math.sin(i * 0.7) * 800 + 960,
    y: 540 + Math.cos(i * 1.3) * 400,
    delay: i * 2,
    size: 3 + (i % 3) * 2,
  }));

  // Fade out
  const fadeOut = interpolate(frame, [70, 90], [1, 0], {
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
      {/* Animated particles */}
      {particles.map((particle, i) => {
        const particleOpacity = interpolate(
          frame,
          [particle.delay, particle.delay + 30],
          [0, 0.4],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const floatY = Math.sin((frame + i * 20) * 0.05) * 20;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: particle.x,
              top: particle.y + floatY,
              width: particle.size,
              height: particle.size,
              borderRadius: "50%",
              backgroundColor: COLORS.accent,
              opacity: particleOpacity,
              boxShadow: `0 0 ${particle.size * 3}px ${COLORS.accent}`,
            }}
          />
        );
      })}

      {/* Content container */}
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
            opacity: titleOpacity,
            transform: `translateY(${titleY}px) scale(${titleScale})`,
            letterSpacing: "-0.03em",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          Adventure
          <br />
          <span style={{ color: COLORS.accent }}>Awaits</span>
        </div>

        {/* Accent bar */}
        <div
          style={{
            width: barWidth,
            height: 5,
            backgroundColor: COLORS.accent,
            borderRadius: 3,
            boxShadow: `0 0 30px ${COLORS.accent}`,
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: 32,
            color: COLORS.textMuted,
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Stay Connected. No Signal Required.
        </div>
      </div>
    </AbsoluteFill>
  );
};
