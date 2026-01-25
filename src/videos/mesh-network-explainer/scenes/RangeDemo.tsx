import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../../lib/colors";
import { SPRING_CONFIG } from "../../../lib/animations";

export const RangeDemo: React.FC = () => {
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

  // Range expansion animation
  const rangeProgress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 20, stiffness: 60 },
  });

  const rangeScale = interpolate(rangeProgress, [0, 1], [0.2, 1]);

  // Km counter animation
  const kmValue = interpolate(frame, [20, 60], [0, 10], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulse rings
  const pulseOpacity = Math.sin(frame * 0.15) * 0.3 + 0.3;

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
          position: "absolute",
          top: 100,
          fontFamily: "Syne, sans-serif",
          fontSize: 56,
          fontWeight: 700,
          color: COLORS.text,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        Incredible <span style={{ color: COLORS.accent }}>Range</span>
      </div>

      {/* Range visualization */}
      <div
        style={{
          position: "relative",
          width: 600,
          height: 600,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Outer pulse rings */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 500 * rangeScale - i * 100,
              height: 500 * rangeScale - i * 100,
              borderRadius: "50%",
              border: `2px solid ${COLORS.accent}`,
              opacity: pulseOpacity * (1 - i * 0.2),
              boxShadow: `0 0 ${20 - i * 5}px ${COLORS.accent}60`,
            }}
          />
        ))}

        {/* Range area */}
        <div
          style={{
            position: "absolute",
            width: 500 * rangeScale,
            height: 500 * rangeScale,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${COLORS.accent}30 0%, ${COLORS.accent}10 50%, transparent 70%)`,
          }}
        />

        {/* Center device icon */}
        <div
          style={{
            position: "absolute",
            width: 80,
            height: 80,
            borderRadius: "50%",
            backgroundColor: COLORS.accentLight,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: `0 0 40px ${COLORS.accent}`,
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              backgroundColor: COLORS.background,
            }}
          />
        </div>

        {/* Distance markers */}
        {[2, 5, 8, 10].map((km, i) => {
          const markerOpacity = interpolate(
            frame,
            [30 + i * 10, 40 + i * 10],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const radius = (km / 10) * 230;

          return (
            <div
              key={km}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate(${radius}px, -50%)`,
                opacity: markerOpacity,
              }}
            >
              <div
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: 18,
                  color: COLORS.textMuted,
                  whiteSpace: "nowrap",
                }}
              >
                {km} km
              </div>
            </div>
          );
        })}
      </div>

      {/* Big km counter */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          display: "flex",
          alignItems: "baseline",
          gap: 15,
        }}
      >
        <div
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: 120,
            fontWeight: 800,
            color: COLORS.accent,
            textShadow: `0 0 40px ${COLORS.accent}`,
          }}
        >
          {Math.floor(kmValue)}+
        </div>
        <div
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: 36,
            color: COLORS.text,
          }}
        >
          kilometers range
        </div>
      </div>
    </AbsoluteFill>
  );
};
