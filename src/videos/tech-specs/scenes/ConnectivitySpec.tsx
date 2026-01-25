import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../../lib/colors";
import { SPRING_CONFIG } from "../../../lib/animations";

const connectivityFeatures = [
  { icon: "📱", label: "Bluetooth 5.0", description: "Low-energy pairing" },
  { icon: "🧲", label: "MagSafe Ready", description: "Snap-on mounting" },
  { icon: "🔗", label: "Mesh Protocol", description: "Auto-routing network" },
  { icon: "📍", label: "GPS Sharing", description: "Real-time location" },
];

export const ConnectivitySpec: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleProgress = spring({
    frame,
    fps,
    config: SPRING_CONFIG,
  });

  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

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
        <span style={{ color: COLORS.accent }}>Smart</span> Connectivity
      </div>

      {/* Features grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 40,
          padding: "0 100px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {connectivityFeatures.map((feature, index) => {
          const featureDelay = 15 + index * 12;

          const featureProgress = spring({
            frame: frame - featureDelay,
            fps,
            config: { damping: 12, stiffness: 100 },
          });

          const featureOpacity = interpolate(featureProgress, [0, 1], [0, 1]);
          const featureY = interpolate(featureProgress, [0, 1], [40, 0]);
          const featureScale = interpolate(featureProgress, [0, 1], [0.8, 1]);

          // Icon pulse
          const iconPulse = Math.sin((frame - featureDelay) * 0.12) * 5;

          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 40,
                backgroundColor: `${COLORS.accent}08`,
                borderRadius: 20,
                border: `2px solid ${COLORS.accent}30`,
                opacity: featureOpacity,
                transform: `translateY(${featureY}px) scale(${featureScale})`,
              }}
            >
              {/* Icon */}
              <div
                style={{
                  fontSize: 64,
                  transform: `translateY(${iconPulse}px)`,
                  marginBottom: 20,
                }}
              >
                {feature.icon}
              </div>

              {/* Label */}
              <div
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontSize: 24,
                  fontWeight: 600,
                  color: COLORS.text,
                  marginBottom: 10,
                  textAlign: "center",
                }}
              >
                {feature.label}
              </div>

              {/* Description */}
              <div
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: 16,
                  color: COLORS.textMuted,
                  textAlign: "center",
                }}
              >
                {feature.description}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          marginTop: 60,
          width: interpolate(
            spring({ frame: frame - 50, fps, config: { damping: 25, stiffness: 80 } }),
            [0, 1],
            [0, 600]
          ),
          height: 3,
          backgroundColor: COLORS.accent,
          borderRadius: 2,
          boxShadow: `0 0 15px ${COLORS.accent}`,
        }}
      />
    </AbsoluteFill>
  );
};
