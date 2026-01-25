import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../../lib/colors";
import { SPRING_CONFIG } from "../../../lib/animations";

const steps = [
  {
    number: "01",
    title: "Pair Your Device",
    description: "Quick Bluetooth setup in seconds",
    icon: "📱",
  },
  {
    number: "02",
    title: "Connect to Mesh",
    description: "Auto-join nearby OffGrid users",
    icon: "🔗",
  },
  {
    number: "03",
    title: "Communicate Freely",
    description: "Text & GPS sharing, no cell needed",
    icon: "💬",
  },
];

export const HowItWorks: React.FC = () => {
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
  const fadeOut = interpolate(frame, [100, 120], [1, 0], {
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
      {/* Title */}
      <div
        style={{
          marginTop: 100,
          fontFamily: "Syne, sans-serif",
          fontSize: 64,
          fontWeight: 700,
          color: COLORS.text,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        How It <span style={{ color: COLORS.accent }}>Works</span>
      </div>

      {/* Steps container */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 80,
          marginTop: 120,
        }}
      >
        {steps.map((step, index) => {
          const stepDelay = 20 + index * 20;

          const stepProgress = spring({
            frame: frame - stepDelay,
            fps,
            config: SPRING_CONFIG,
          });

          const stepOpacity = interpolate(stepProgress, [0, 1], [0, 1]);
          const stepY = interpolate(stepProgress, [0, 1], [50, 0]);
          const stepScale = interpolate(stepProgress, [0, 1], [0.8, 1]);

          // Icon bounce
          const iconBounce = Math.sin((frame - stepDelay) * 0.1) * 5;

          // Connector line animation
          const lineProgress = spring({
            frame: frame - stepDelay - 15,
            fps,
            config: { damping: 20, stiffness: 80 },
          });
          const lineWidth = interpolate(lineProgress, [0, 1], [0, 100]);

          return (
            <div key={step.number} style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: 320,
                  opacity: stepOpacity,
                  transform: `translateY(${stepY}px) scale(${stepScale})`,
                }}
              >
                {/* Number badge */}
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    backgroundColor: COLORS.accent,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontFamily: "Syne, sans-serif",
                    fontSize: 24,
                    fontWeight: 700,
                    color: COLORS.background,
                    boxShadow: `0 0 30px ${COLORS.accent}80`,
                  }}
                >
                  {step.number}
                </div>

                {/* Icon */}
                <div
                  style={{
                    fontSize: 80,
                    marginTop: 30,
                    transform: `translateY(${iconBounce}px)`,
                  }}
                >
                  {step.icon}
                </div>

                {/* Title */}
                <div
                  style={{
                    marginTop: 30,
                    fontFamily: "Syne, sans-serif",
                    fontSize: 28,
                    fontWeight: 600,
                    color: COLORS.text,
                    textAlign: "center",
                  }}
                >
                  {step.title}
                </div>

                {/* Description */}
                <div
                  style={{
                    marginTop: 15,
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: 20,
                    color: COLORS.textMuted,
                    textAlign: "center",
                    lineHeight: 1.4,
                  }}
                >
                  {step.description}
                </div>
              </div>

              {/* Connector line (not after last item) */}
              {index < steps.length - 1 && (
                <div
                  style={{
                    width: lineWidth,
                    height: 3,
                    backgroundColor: COLORS.accent,
                    marginLeft: -20,
                    marginRight: -20,
                    marginTop: -180,
                    opacity: 0.5,
                    boxShadow: `0 0 10px ${COLORS.accent}`,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
