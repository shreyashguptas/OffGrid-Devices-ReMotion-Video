import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../../lib/colors";
import { SPRING_CONFIG } from "../../../lib/animations";

const useCases = [
  {
    icon: "🏔️",
    title: "Mountain Expeditions",
    description: "Summit with confidence knowing your team is connected",
  },
  {
    icon: "🏕️",
    title: "Remote Camping",
    description: "Share coordinates and check-ins from anywhere",
  },
  {
    icon: "🚴",
    title: "Group Adventures",
    description: "Keep your crew together on any trail",
  },
  {
    icon: "⛵",
    title: "Maritime Journeys",
    description: "Communicate across open water with ease",
  },
];

export const UseCaseShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Each card gets 35 frames of spotlight time
  const cardDuration = 35;
  const activeIndex = Math.min(
    Math.floor(frame / cardDuration),
    useCases.length - 1
  );

  // Fade out
  const fadeOut = interpolate(frame, [145, 165], [1, 0], {
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
        opacity: fadeOut,
      }}
    >
      {/* Section title */}
      <div
        style={{
          marginTop: 80,
          fontFamily: "Syne, sans-serif",
          fontSize: 48,
          fontWeight: 700,
          color: COLORS.text,
          opacity: interpolate(frame, [0, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Perfect <span style={{ color: COLORS.accent }}>For</span>
      </div>

      {/* Cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 50,
          marginTop: 80,
          padding: "0 150px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {useCases.map((useCase, index) => {
          const cardDelay = index * 15 + 10;
          const isActive = index === activeIndex;

          // Card entrance
          const cardProgress = spring({
            frame: frame - cardDelay,
            fps,
            config: SPRING_CONFIG,
          });

          const cardOpacity = interpolate(cardProgress, [0, 1], [0, 1]);
          const cardY = interpolate(cardProgress, [0, 1], [60, 0]);
          const cardScale = interpolate(cardProgress, [0, 1], [0.9, 1]);

          // Active state glow
          const glowIntensity = isActive
            ? interpolate(
                Math.sin((frame - index * cardDuration) * 0.2),
                [-1, 1],
                [0.3, 0.6]
              )
            : 0.1;

          // Icon bounce when active
          const iconBounce = isActive
            ? Math.sin((frame - index * cardDuration) * 0.15) * 8
            : 0;

          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 40,
                backgroundColor: isActive ? `${COLORS.accent}15` : `${COLORS.accent}08`,
                borderRadius: 24,
                border: `2px solid ${isActive ? COLORS.accent : COLORS.accent}40`,
                boxShadow: isActive
                  ? `0 0 40px ${COLORS.accent}${Math.floor(glowIntensity * 100).toString(16)}`
                  : "none",
                opacity: cardOpacity,
                transform: `translateY(${cardY}px) scale(${isActive ? 1.02 : cardScale})`,
                transition: "background-color 0.3s, border-color 0.3s",
              }}
            >
              {/* Icon */}
              <div
                style={{
                  fontSize: 72,
                  transform: `translateY(${iconBounce}px)`,
                }}
              >
                {useCase.icon}
              </div>

              {/* Title */}
              <div
                style={{
                  marginTop: 25,
                  fontFamily: "Syne, sans-serif",
                  fontSize: 28,
                  fontWeight: 600,
                  color: isActive ? COLORS.accent : COLORS.text,
                  textAlign: "center",
                }}
              >
                {useCase.title}
              </div>

              {/* Description */}
              <div
                style={{
                  marginTop: 15,
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: 18,
                  color: COLORS.textMuted,
                  textAlign: "center",
                  lineHeight: 1.5,
                  maxWidth: 280,
                }}
              >
                {useCase.description}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
