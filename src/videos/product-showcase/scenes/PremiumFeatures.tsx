import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../../lib/colors";
import { SPRING_CONFIG } from "../../../lib/animations";

const premiumFeatures = [
  { icon: "✨", text: "Premium Build Quality" },
  { icon: "🛡️", text: "IP67 Water Resistant" },
  { icon: "🔋", text: "72-Hour Battery" },
  { icon: "📡", text: "10km+ Range" },
];

export const PremiumFeatures: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [40, 0]);

  // Fade out
  const fadeOut = interpolate(frame, [70, 90], [1, 0], {
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
          fontSize: 64,
          fontWeight: 700,
          color: COLORS.text,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          marginBottom: 80,
        }}
      >
        <span style={{ color: COLORS.accent }}>Premium</span> Experience
      </div>

      {/* Features row */}
      <div
        style={{
          display: "flex",
          gap: 60,
          alignItems: "center",
        }}
      >
        {premiumFeatures.map((feature, index) => {
          const featureDelay = 15 + index * 12;

          const featureProgress = spring({
            frame: frame - featureDelay,
            fps,
            config: SPRING_CONFIG,
          });

          const featureOpacity = interpolate(featureProgress, [0, 1], [0, 1]);
          const featureY = interpolate(featureProgress, [0, 1], [50, 0]);
          const featureScale = interpolate(featureProgress, [0, 1], [0.7, 1]);

          // Icon animation
          const iconBounce = Math.sin((frame - featureDelay) * 0.1) * 5;

          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
                opacity: featureOpacity,
                transform: `translateY(${featureY}px) scale(${featureScale})`,
              }}
            >
              {/* Icon container */}
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 20,
                  backgroundColor: `${COLORS.accent}15`,
                  border: `2px solid ${COLORS.accent}40`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 48,
                  transform: `translateY(${iconBounce}px)`,
                }}
              >
                {feature.icon}
              </div>

              {/* Text */}
              <div
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: 18,
                  color: COLORS.text,
                  textAlign: "center",
                  maxWidth: 150,
                }}
              >
                {feature.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom tagline */}
      <div
        style={{
          marginTop: 80,
          fontFamily: "Syne, sans-serif",
          fontSize: 32,
          color: COLORS.accent,
          opacity: interpolate(frame, [55, 70], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          textShadow: `0 0 30px ${COLORS.accent}60`,
        }}
      >
        Uncompromising Quality
      </div>
    </AbsoluteFill>
  );
};
