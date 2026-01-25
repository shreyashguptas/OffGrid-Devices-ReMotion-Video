import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../../lib/colors";
import { SPRING_CONFIG } from "../../../lib/animations";

export const RangeSpec: React.FC = () => {
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

  // Counter animation (counts up to 10)
  const counterValue = interpolate(frame, [15, 50], [0, 10], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Unit animation
  const unitProgress = spring({
    frame: frame - 40,
    fps,
    config: SPRING_CONFIG,
  });

  const unitOpacity = interpolate(unitProgress, [0, 1], [0, 1]);

  // Progress bar animation
  const barProgress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 25, stiffness: 60 },
  });

  const barWidth = interpolate(barProgress, [0, 1], [0, 100]);

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
          flexDirection: "column",
          alignItems: "flex-start",
          width: 900,
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
          Maximum Range
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
              fontSize: 180,
              fontWeight: 800,
              color: COLORS.text,
              lineHeight: 1,
              textShadow: `0 0 60px ${COLORS.accent}40`,
            }}
          >
            {counterValue.toFixed(0)}
          </div>
          <div
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: 80,
              fontWeight: 700,
              color: COLORS.accent,
              opacity: unitOpacity,
            }}
          >
            km+
          </div>
        </div>

        {/* Progress bar */}
        <div
          style={{
            width: "100%",
            height: 12,
            backgroundColor: `${COLORS.accent}20`,
            borderRadius: 6,
            marginTop: 40,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${barWidth}%`,
              height: "100%",
              backgroundColor: COLORS.accent,
              borderRadius: 6,
              boxShadow: `0 0 20px ${COLORS.accent}`,
            }}
          />
        </div>

        {/* Comparison text */}
        <div
          style={{
            marginTop: 30,
            fontFamily: "DM Sans, sans-serif",
            fontSize: 22,
            color: COLORS.textMuted,
            opacity: interpolate(frame, [50, 65], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          10x further than standard Bluetooth • Line-of-sight optimized
        </div>
      </div>
    </AbsoluteFill>
  );
};
