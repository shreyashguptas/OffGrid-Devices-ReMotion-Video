import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../../lib/colors";
import { SPRING_CONFIG } from "../../../lib/animations";

const features = [
  { text: "10+ km Range", icon: "signal" },
  { text: "Mesh Network", icon: "network" },
  { text: "MagSafe Ready", icon: "magnet" },
];

const FeatureItem: React.FC<{
  text: string;
  startFrame: number;
  endFrame: number;
}> = ({ text, startFrame, endFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Check if this feature is active
  const isActive = frame >= startFrame && frame < endFrame;

  if (!isActive) return null;

  const localFrame = frame - startFrame;

  // Enter animation
  const enterProgress = spring({
    frame: localFrame,
    fps,
    config: SPRING_CONFIG,
  });

  const opacity = interpolate(enterProgress, [0, 1], [0, 1]);
  const y = interpolate(enterProgress, [0, 1], [40, 0]);
  const scale = interpolate(enterProgress, [0, 1], [0.9, 1]);

  // Exit animation
  const exitOpacity = interpolate(
    localFrame,
    [20, 28],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 24,
        opacity: opacity * exitOpacity,
        transform: `translateY(${y}px) scale(${scale})`,
      }}
    >
      {/* Teal accent dot */}
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          backgroundColor: COLORS.accent,
          boxShadow: "0 0 20px rgba(0, 212, 170, 0.6)",
        }}
      />
      <div
        style={{
          fontFamily: "DM Sans, sans-serif",
          fontSize: 72,
          fontWeight: 600,
          color: COLORS.text,
          letterSpacing: "-0.01em",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const FeatureFlash: React.FC = () => {
  // Each feature gets 30 frames (1 second)
  const featureDuration = 30;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {features.map((feature, index) => (
        <FeatureItem
          key={feature.text}
          text={feature.text}
          startFrame={index * featureDuration}
          endFrame={(index + 1) * featureDuration}
        />
      ))}
    </AbsoluteFill>
  );
};
