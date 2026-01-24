import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../../lib/colors";
import { SPRING_CONFIG_SLOW } from "../../../lib/animations";

export const ProductReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Product scale and fade in
  const revealProgress = spring({
    frame,
    fps,
    config: SPRING_CONFIG_SLOW,
  });

  const scale = interpolate(revealProgress, [0, 1], [0.85, 1]);
  const opacity = interpolate(revealProgress, [0, 1], [0, 1]);

  // Subtle floating animation
  const floatY = Math.sin(frame * 0.08) * 8;

  // Glow pulse
  const glowIntensity = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [0.4, 0.7]
  );

  // Fade out at the end
  const fadeOut = interpolate(frame, [100, 120], [1, 0], {
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
      {/* Glow effect behind product */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(0, 212, 170, ${glowIntensity}) 0%, transparent 70%)`,
          filter: "blur(60px)",
          transform: `translateY(${floatY}px)`,
        }}
      />

      {/* Product image */}
      <Img
        src="https://i.etsystatic.com/61623051/r/il/9f66b4/7517364106/il_fullxfull.7517364106_5bbx.jpg"
        style={{
          width: 600,
          height: "auto",
          objectFit: "contain",
          transform: `scale(${scale}) translateY(${floatY}px)`,
          opacity,
          borderRadius: 20,
          boxShadow: `0 0 80px rgba(0, 212, 170, ${glowIntensity * 0.5})`,
        }}
      />
    </AbsoluteFill>
  );
};
