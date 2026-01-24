import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../../lib/colors";
import { SPRING_CONFIG } from "../../../lib/animations";

export const TaglineReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "Stay Connected." animation
  const stayConnectedProgress = spring({
    frame,
    fps,
    config: SPRING_CONFIG,
  });

  const stayConnectedOpacity = interpolate(stayConnectedProgress, [0, 1], [0, 1]);
  const stayConnectedY = interpolate(stayConnectedProgress, [0, 1], [30, 0]);
  const stayConnectedBlur = interpolate(stayConnectedProgress, [0, 1], [10, 0]);

  // "Go Anywhere." animation (delayed by 20 frames)
  const goAnywhereProgress = spring({
    frame: frame - 20,
    fps,
    config: SPRING_CONFIG,
  });

  const goAnywhereOpacity = interpolate(goAnywhereProgress, [0, 1], [0, 1]);
  const goAnywhereY = interpolate(goAnywhereProgress, [0, 1], [30, 0]);
  const goAnywhereBlur = interpolate(goAnywhereProgress, [0, 1], [10, 0]);

  // Fade out at the end
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
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          fontFamily: "Syne, sans-serif",
          fontSize: 90,
          fontWeight: 700,
          color: COLORS.text,
          opacity: stayConnectedOpacity,
          transform: `translateY(${stayConnectedY}px)`,
          filter: `blur(${stayConnectedBlur}px)`,
          letterSpacing: "-0.02em",
        }}
      >
        Stay Connected.
      </div>
      <div
        style={{
          fontFamily: "Syne, sans-serif",
          fontSize: 90,
          fontWeight: 700,
          color: COLORS.accent,
          opacity: goAnywhereOpacity,
          transform: `translateY(${goAnywhereY}px)`,
          filter: `blur(${goAnywhereBlur}px)`,
          letterSpacing: "-0.02em",
        }}
      >
        Go Anywhere.
      </div>
    </AbsoluteFill>
  );
};
