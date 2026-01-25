import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../../lib/colors";
import { SPRING_CONFIG_SLOW } from "../../../lib/animations";

export const ProductHero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Product reveal with dramatic entrance
  const productProgress = spring({
    frame,
    fps,
    config: SPRING_CONFIG_SLOW,
  });

  const productOpacity = interpolate(productProgress, [0, 1], [0, 1]);
  const productScale = interpolate(productProgress, [0, 1], [0.7, 1]);
  const productY = interpolate(productProgress, [0, 1], [100, 0]);

  // Slow rotation for product
  const rotation = interpolate(frame, [0, 120], [-5, 5]);

  // Floating animation
  const floatY = Math.sin(frame * 0.06) * 15;

  // Glow pulse
  const glowIntensity = Math.sin(frame * 0.08) * 0.3 + 0.6;

  // Orbiting particles
  const particles = Array.from({ length: 8 }, (_, i) => {
    const angle = (frame * 0.02) + (i * Math.PI * 2) / 8;
    const radius = 320;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius * 0.4, // Elliptical orbit
      delay: i * 5,
    };
  });

  // Fade out
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
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accent}${Math.floor(glowIntensity * 40).toString(16)} 0%, transparent 60%)`,
          filter: "blur(60px)",
          transform: `translateY(${floatY}px)`,
        }}
      />

      {/* Orbiting particles */}
      {particles.map((particle, i) => {
        const particleOpacity = interpolate(
          frame,
          [particle.delay, particle.delay + 20],
          [0, 0.6],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `calc(50% + ${particle.x}px)`,
              top: `calc(50% + ${particle.y}px)`,
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: COLORS.accent,
              opacity: particleOpacity,
              boxShadow: `0 0 15px ${COLORS.accent}`,
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}

      {/* Product container */}
      <div
        style={{
          position: "relative",
          opacity: productOpacity,
          transform: `translateY(${productY + floatY}px) scale(${productScale}) rotate(${rotation}deg)`,
        }}
      >
        {/* Reflection/Shadow */}
        <div
          style={{
            position: "absolute",
            bottom: -200,
            left: "50%",
            transform: "translateX(-50%) scaleY(-0.3)",
            opacity: 0.2,
            filter: "blur(10px)",
          }}
        >
          <Img
            src="https://i.etsystatic.com/61623051/r/il/9f66b4/7517364106/il_fullxfull.7517364106_5bbx.jpg"
            style={{
              width: 500,
              height: "auto",
              borderRadius: 20,
            }}
          />
        </div>

        {/* Main product image */}
        <Img
          src="https://i.etsystatic.com/61623051/r/il/9f66b4/7517364106/il_fullxfull.7517364106_5bbx.jpg"
          style={{
            width: 500,
            height: "auto",
            borderRadius: 24,
            boxShadow: `0 30px 80px ${COLORS.accent}40, 0 0 0 2px ${COLORS.accent}30`,
          }}
        />
      </div>

      {/* Tagline */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          fontFamily: "DM Sans, sans-serif",
          fontSize: 28,
          color: COLORS.textMuted,
          opacity: interpolate(frame, [40, 60], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          letterSpacing: "0.1em",
        }}
      >
        Crafted for the Modern Explorer
      </div>
    </AbsoluteFill>
  );
};
