import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../../lib/colors";
import { SPRING_CONFIG } from "../../../lib/animations";

const specs = [
  { label: "Range", value: "10+ km" },
  { label: "Battery", value: "72 hrs" },
  { label: "Weight", value: "45g" },
  { label: "Waterproof", value: "IP67" },
];

export const SpecsSummary: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Product image animation
  const productProgress = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const productOpacity = interpolate(productProgress, [0, 1], [0, 1]);
  const productScale = interpolate(productProgress, [0, 1], [0.85, 1]);

  // Floating animation
  const floatY = Math.sin(frame * 0.08) * 10;

  // Glow
  const glowIntensity = Math.sin(frame * 0.1) * 0.2 + 0.5;

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
        alignItems: "center",
        justifyContent: "center",
        gap: 120,
        opacity: fadeOut,
      }}
    >
      {/* Product image */}
      <div
        style={{
          position: "relative",
          opacity: productOpacity,
          transform: `scale(${productScale}) translateY(${floatY}px)`,
        }}
      >
        {/* Glow behind product */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${COLORS.accent}${Math.floor(glowIntensity * 60).toString(16)} 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
        />

        <Img
          src="https://i.etsystatic.com/61623051/r/il/9f66b4/7517364106/il_fullxfull.7517364106_5bbx.jpg"
          style={{
            width: 350,
            height: "auto",
            borderRadius: 20,
            position: "relative",
            boxShadow: `0 0 60px ${COLORS.accent}40`,
          }}
        />
      </div>

      {/* Specs list */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 25,
        }}
      >
        {specs.map((spec, index) => {
          const specDelay = 10 + index * 10;

          const specProgress = spring({
            frame: frame - specDelay,
            fps,
            config: SPRING_CONFIG,
          });

          const specOpacity = interpolate(specProgress, [0, 1], [0, 1]);
          const specX = interpolate(specProgress, [0, 1], [30, 0]);

          return (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 30,
                opacity: specOpacity,
                transform: `translateX(${specX}px)`,
              }}
            >
              {/* Accent dot */}
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: COLORS.accent,
                  boxShadow: `0 0 15px ${COLORS.accent}`,
                }}
              />

              {/* Label */}
              <div
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: 22,
                  color: COLORS.textMuted,
                  width: 120,
                }}
              >
                {spec.label}
              </div>

              {/* Value */}
              <div
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontSize: 36,
                  fontWeight: 700,
                  color: COLORS.text,
                }}
              >
                {spec.value}
              </div>
            </div>
          );
        })}

        {/* Title text */}
        <div
          style={{
            marginTop: 30,
            fontFamily: "Syne, sans-serif",
            fontSize: 32,
            fontWeight: 600,
            color: COLORS.accent,
            opacity: interpolate(frame, [45, 55], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Engineered for Adventure
        </div>
      </div>
    </AbsoluteFill>
  );
};
