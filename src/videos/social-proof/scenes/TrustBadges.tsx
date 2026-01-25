import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../../lib/colors";
import { SPRING_CONFIG } from "../../../lib/animations";

const badges = [
  { icon: "🏆", label: "Award Winning Design" },
  { icon: "✅", label: "Verified Reviews" },
  { icon: "🔒", label: "Secure Purchase" },
  { icon: "🚚", label: "Fast Shipping" },
];

export const TrustBadges: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleScale = interpolate(titleProgress, [0, 1], [0.9, 1]);

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
        alignItems: "center",
        justifyContent: "center",
        gap: 60,
        opacity: fadeOut,
      }}
    >
      {/* Title */}
      <div
        style={{
          fontFamily: "Syne, sans-serif",
          fontSize: 56,
          fontWeight: 700,
          color: COLORS.text,
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
        }}
      >
        Shop With <span style={{ color: COLORS.accent }}>Confidence</span>
      </div>

      {/* Badges row */}
      <div
        style={{
          display: "flex",
          gap: 50,
        }}
      >
        {badges.map((badge, index) => {
          const badgeDelay = 15 + index * 10;

          const badgeProgress = spring({
            frame: frame - badgeDelay,
            fps,
            config: SPRING_CONFIG,
          });

          const badgeOpacity = interpolate(badgeProgress, [0, 1], [0, 1]);
          const badgeY = interpolate(badgeProgress, [0, 1], [30, 0]);
          const badgeScale = interpolate(badgeProgress, [0, 1], [0.8, 1]);

          // Icon pulse
          const iconPulse = Math.sin((frame - badgeDelay) * 0.1) * 3;

          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
                padding: "30px 40px",
                backgroundColor: `${COLORS.accent}08`,
                borderRadius: 16,
                border: `1px solid ${COLORS.accent}30`,
                opacity: badgeOpacity,
                transform: `translateY(${badgeY}px) scale(${badgeScale})`,
              }}
            >
              {/* Icon */}
              <div
                style={{
                  fontSize: 48,
                  transform: `translateY(${iconPulse}px)`,
                }}
              >
                {badge.icon}
              </div>

              {/* Label */}
              <div
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: 16,
                  color: COLORS.text,
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                {badge.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA text */}
      <div
        style={{
          fontFamily: "Syne, sans-serif",
          fontSize: 28,
          color: COLORS.accent,
          opacity: interpolate(frame, [40, 55], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Join the OffGrid Community Today
      </div>
    </AbsoluteFill>
  );
};
