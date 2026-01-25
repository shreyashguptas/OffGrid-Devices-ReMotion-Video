import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../../lib/colors";
import { SPRING_CONFIG } from "../../../lib/animations";

export const BatterySpec: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Label animation
  const labelProgress = spring({
    frame,
    fps,
    config: SPRING_CONFIG,
  });

  const labelOpacity = interpolate(labelProgress, [0, 1], [0, 1]);
  const labelX = interpolate(labelProgress, [0, 1], [-50, 0]);

  // Counter animation (counts up to 72)
  const counterValue = interpolate(frame, [15, 55], [0, 72], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Unit animation
  const unitProgress = spring({
    frame: frame - 45,
    fps,
    config: SPRING_CONFIG,
  });

  const unitOpacity = interpolate(unitProgress, [0, 1], [0, 1]);

  // Battery fill animation
  const batteryFill = interpolate(frame, [20, 60], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glow pulse
  const glowIntensity = Math.sin(frame * 0.15) * 0.3 + 0.5;

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
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 120,
        }}
      >
        {/* Left side - Battery visualization */}
        <div
          style={{
            position: "relative",
            width: 200,
            height: 400,
          }}
        >
          {/* Battery outline */}
          <div
            style={{
              position: "absolute",
              width: 200,
              height: 380,
              bottom: 0,
              border: `4px solid ${COLORS.accent}`,
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            {/* Fill */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: `${batteryFill}%`,
                background: `linear-gradient(to top, ${COLORS.accent}, ${COLORS.accentLight})`,
                boxShadow: `0 0 30px ${COLORS.accent}${Math.floor(glowIntensity * 100).toString(16)}`,
              }}
            />

            {/* Charge segments */}
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  bottom: `${25 * i + 23}%`,
                  width: "100%",
                  height: 4,
                  backgroundColor: COLORS.background,
                  opacity: 0.3,
                }}
              />
            ))}
          </div>

          {/* Battery cap */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 80,
              height: 30,
              backgroundColor: COLORS.accent,
              borderRadius: "10px 10px 0 0",
            }}
          />

          {/* Lightning bolt icon */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: 60,
              opacity: glowIntensity,
              filter: `drop-shadow(0 0 10px ${COLORS.accent})`,
            }}
          >
            ⚡
          </div>
        </div>

        {/* Right side - Text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {/* Spec label */}
          <div
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: 24,
              color: COLORS.accent,
              opacity: labelOpacity,
              transform: `translateX(${labelX}px)`,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            Battery Life
          </div>

          {/* Big number */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 20,
            }}
          >
            <div
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: 160,
                fontWeight: 800,
                color: COLORS.text,
                lineHeight: 1,
                textShadow: `0 0 60px ${COLORS.accent}40`,
              }}
            >
              {Math.floor(counterValue)}
            </div>
            <div
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: 60,
                fontWeight: 700,
                color: COLORS.accent,
                opacity: unitOpacity,
              }}
            >
              hours
            </div>
          </div>

          {/* Additional info */}
          <div
            style={{
              marginTop: 30,
              fontFamily: "DM Sans, sans-serif",
              fontSize: 22,
              color: COLORS.textMuted,
              opacity: interpolate(frame, [55, 70], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            USB-C fast charging • Solar compatible
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
