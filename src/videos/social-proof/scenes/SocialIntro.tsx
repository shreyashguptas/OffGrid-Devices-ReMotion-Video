import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../../lib/colors";
import { SPRING_CONFIG_SLOW } from "../../../lib/animations";

export const SocialIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Star rating animation
  const stars = [0, 1, 2, 3, 4];

  // Main text animation
  const textProgress = spring({
    frame,
    fps,
    config: SPRING_CONFIG_SLOW,
  });

  const textOpacity = interpolate(textProgress, [0, 1], [0, 1]);
  const textY = interpolate(textProgress, [0, 1], [50, 0]);

  // Subtitle
  const subtitleProgress = spring({
    frame: frame - 25,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const subtitleOpacity = interpolate(subtitleProgress, [0, 1], [0, 1]);

  // Fade out
  const fadeOut = interpolate(frame, [40, 60], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 40,
        opacity: fadeOut,
      }}
    >
      {/* Stars */}
      <div style={{ display: "flex", gap: 15 }}>
        {stars.map((_, index) => {
          const starDelay = index * 5;
          const starProgress = spring({
            frame: frame - starDelay,
            fps,
            config: { damping: 10, stiffness: 150 },
          });

          const starScale = interpolate(starProgress, [0, 1], [0, 1]);
          const starRotation = interpolate(starProgress, [0, 1], [-180, 0]);

          return (
            <div
              key={index}
              style={{
                fontSize: 50,
                transform: `scale(${starScale}) rotate(${starRotation}deg)`,
                filter: `drop-shadow(0 0 10px ${COLORS.accent})`,
              }}
            >
              ⭐
            </div>
          );
        })}
      </div>

      {/* Main title */}
      <div
        style={{
          fontFamily: "Syne, sans-serif",
          fontSize: 90,
          fontWeight: 800,
          color: COLORS.text,
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          letterSpacing: "-0.02em",
          textAlign: "center",
        }}
      >
        Trusted by <span style={{ color: COLORS.accent }}>Thousands</span>
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontFamily: "DM Sans, sans-serif",
          fontSize: 28,
          color: COLORS.textMuted,
          opacity: subtitleOpacity,
          letterSpacing: "0.1em",
        }}
      >
        See what our customers are saying
      </div>
    </AbsoluteFill>
  );
};
