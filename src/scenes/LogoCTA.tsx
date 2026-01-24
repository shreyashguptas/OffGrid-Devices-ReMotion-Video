import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../lib/colors";
import { SPRING_CONFIG, SPRING_CONFIG_SLOW } from "../lib/animations";

export const LogoCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo animation
  const logoProgress = spring({
    frame,
    fps,
    config: SPRING_CONFIG_SLOW,
  });

  const logoScale = interpolate(logoProgress, [0, 1], [0.8, 1]);
  const logoOpacity = interpolate(logoProgress, [0, 1], [0, 1]);

  // Tagline animation (delayed)
  const taglineProgress = spring({
    frame: frame - 15,
    fps,
    config: SPRING_CONFIG,
  });

  const taglineOpacity = interpolate(taglineProgress, [0, 1], [0, 1]);
  const taglineY = interpolate(taglineProgress, [0, 1], [20, 0]);

  // CTA animation (more delayed)
  const ctaProgress = spring({
    frame: frame - 30,
    fps,
    config: SPRING_CONFIG,
  });

  const ctaOpacity = interpolate(ctaProgress, [0, 1], [0, 1]);

  // Subtle glow pulse on logo
  const glowIntensity = interpolate(
    Math.sin(frame * 0.15),
    [-1, 1],
    [0.3, 0.6]
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 30,
      }}
    >
      {/* Logo with glow */}
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(0, 212, 170, ${glowIntensity}) 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
        />
        <Img
          src={staticFile("logo.png")}
          style={{
            width: 200,
            height: "auto",
            transform: `scale(${logoScale})`,
            opacity: logoOpacity,
            position: "relative",
          }}
        />
      </div>

      {/* Tagline */}
      <div
        style={{
          fontFamily: "Syne, sans-serif",
          fontSize: 36,
          fontWeight: 500,
          color: COLORS.text,
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          letterSpacing: "0.05em",
        }}
      >
        Stay Connected. Go Anywhere.
      </div>

      {/* CTA */}
      <div
        style={{
          fontFamily: "DM Sans, sans-serif",
          fontSize: 24,
          fontWeight: 400,
          color: COLORS.accent,
          opacity: ctaOpacity,
          marginTop: 20,
        }}
      >
        Available Now
      </div>
    </AbsoluteFill>
  );
};
